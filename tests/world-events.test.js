import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createInitialState, hydrateState } from '../src/domain/state.js';
import { WORLD_EVENTS, advanceWorldEvents, eligibleWorldEvents, hasWorldBuff, startWorldEvent, wholesaleUnitCost } from '../src/domain/worldEvents.js';
import { advanceSimulation } from '../src/domain/simulation.js';
import { makeLocation, reserveStock } from '../src/domain/inventory.js';
import { quoteWholesaleOrder, placeWholesaleOrder } from '../src/domain/procurement.js';
import { ITEMS, MONEY_ATOMS, PROCUREMENT_CATALOG, STATIONS } from '../src/domain/catalog.js';
import { worldEventAlert } from '../src/presentation/WorldEventAlert.js';
import { WorldEventVisuals } from '../src/presentation/WorldEventVisuals.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';
import { tipForMood } from '../src/domain/customerExperience.js';

function seasoned() {
  const state = createInitialState(42);
  state.worldEvents.activeTicks = 6000; state.worldEvents.nextAt = 100000;
  state.player.x = -45; state.player.z = 10;
  return state;
}
function ticks(state, n, simulate = false) {
  const all = [];
  for (let i = 0; i < n; i++) {
    if (simulate) all.push(...advanceSimulation(state).events); else advanceWorldEvents(state, {}, all);
    if (!state.paused) state.tick += 1;
  }
  return all;
}
function jamState() {
  const state = seasoned(); state.unlocked.paste = true;
  state.machines.paste = { progressTicks: 10, recipe: 'paste', speedModifier: 1 };
  makeLocation(state.stock, 'machine:paste:input', 8).items.TOMATO = 4;
  makeLocation(state.stock, 'machine:paste:output', 8);
  return state;
}

test('director is seeded, bounded to 3.5–5 min, and forbids early/repeated crises and overlaps', () => {
  const a = createInitialState(42), b = createInitialState(42);
  assert.deepEqual(a.worldEvents, b.worldEvents);
  assert.ok(a.worldEvents.nextAt >= 2100 && a.worldEvents.nextAt <= 3000);
  assert.ok(eligibleWorldEvents(a).every(type => WORLD_EVENTS[type].good));
  assert.equal(startWorldEvent(a, 'blackout'), false);
  a.worldEvents.activeTicks = 6000;
  assert.equal(startWorldEvent(a, 'blackout'), true);
  assert.equal(startWorldEvent(a, 'goldenHarvest'), false);
  a.player = { ...a.player, x: a.worldEvents.active.x, z: a.worldEvents.active.z };
  ticks(a, 10);
  assert.ok(eligibleWorldEvents(a).every(type => WORLD_EVENTS[type].good));
  assert.equal(startWorldEvent(a, 'goldenHarvest'), true);
  assert.ok(a.worldEvents.nextAt - a.worldEvents.activeTicks >= 2100);
});

test('automatic director schedules positive events before ten minutes and resumes deterministically', () => {
  const a = createInitialState(57); a.worldEvents.nextAt = 1;
  advanceSimulation(a); a.tick++;
  assert.ok(a.worldEvents.active); assert.equal(WORLD_EVENTS[a.worldEvents.active.type].good, true);
  const b = hydrateState(structuredClone(a));
  // Compare event state, not hydration migration details in unrelated fields.
  ticks(a, 20, true); ticks(b, 20, true);
  assert.deepEqual(a.worldEvents, b.worldEvents);
});

test('pause freezes timers, repair progress, customer checkout and production', () => {
  const state = jamState(); startWorldEvent(state, 'machineJam');
  state.player.x = state.worldEvents.active.x; state.player.z = state.worldEvents.active.z;
  state.paused = true;
  const snapshot = structuredClone(state);
  for (let i = 0; i < 40; i++) advanceSimulation(state);
  assert.deepEqual(state, snapshot);
});

test('unlocked but queued facilities do not trigger jam, harvest or critic events', () => {
  const state = jamState(); state.pendingStationIds = ['paste', 'tomatoFarm'];
  assert.equal(eligibleWorldEvents(state).includes('machineJam'), false);
  assert.equal(eligibleWorldEvents(state).includes('goldenHarvest'), false);
  assert.equal(eligibleWorldEvents(state).includes('critic'), false);
});

test('shoplifter takes exactly one available item, leaves reservations intact, and pays reward once after reload', () => {
  const state = seasoned(); state.stock['shelf:TOMATO'].items.TOMATO = 2;
  makeLocation(state.stock, 'customer:reserved', 4);
  assert.equal(reserveStock(state, { reservationId: 'hold', from: 'shelf:TOMATO', to: 'customer:reserved', item: 'TOMATO', quantity: 1 }).ok, true);
  const balance = state.economy.balanceAtoms;
  assert.equal(startWorldEvent(state, 'shoplifter'), true);
  assert.equal(state.stock['shelf:TOMATO'].items.TOMATO, 1);
  assert.equal(state.stock['shelf:TOMATO'].reserved.TOMATO, 1);
  const restored = hydrateState(structuredClone(state));
  restored.player.x = restored.worldEvents.active.x; restored.player.z = restored.worldEvents.active.z;
  ticks(restored, 1);
  assert.equal(restored.stock['shelf:TOMATO'].items.TOMATO, 2);
  assert.equal(restored.economy.balanceAtoms, balance + 50 * MONEY_ATOMS);
  ticks(restored, 3);
  assert.equal(restored.economy.balanceAtoms, balance + 50 * MONEY_ATOMS);
});

test('fully reserved shelves cannot be robbed; escape removes only one item', () => {
  const state = seasoned(); state.stock['shelf:TOMATO'].items.TOMATO = 2;
  state.stock['shelf:TOMATO'].reserved.TOMATO = 2;
  assert.equal(startWorldEvent(state, 'shoplifter'), false);
  state.stock['shelf:TOMATO'].reserved = {};
  startWorldEvent(state, 'shoplifter'); const id = state.worldEvents.active.id;
  ticks(state, 300);
  assert.equal(state.stock['shelf:TOMATO'].items.TOMATO, 1);
  assert.equal(state.stock[`event:${id}`], undefined);
  assert.equal(state.economy.balanceAtoms, 100 * MONEY_ATOMS);
});

test('recovering into a full shelf returns the item safely to the warehouse', () => {
  const state = seasoned(); state.stock['shelf:TOMATO'].items.TOMATO = 1;
  startWorldEvent(state, 'shoplifter');
  state.stock['shelf:TOMATO'].items.TOMATO = state.stock['shelf:TOMATO'].capacity;
  Object.assign(state.player, { x: state.worldEvents.active.x, z: state.worldEvents.active.z });
  ticks(state, 1);
  assert.equal(state.stock['warehouse:main'].items.TOMATO, 1);
});

test('jam stops real production; continuous 1.5s repair restores progress and 25% bonus', () => {
  const state = jamState(); startWorldEvent(state, 'machineJam');
  ticks(state, 5, true); assert.equal(state.machines.paste.progressTicks, 10);
  Object.assign(state.player, STATIONS.paste);
  ticks(state, 8, true); state.player.x = -45; ticks(state, 1, true);
  assert.equal(state.worldEvents.active.holdTicks, 0);
  Object.assign(state.player, STATIONS.paste); ticks(state, 15, true);
  assert.equal(state.worldEvents.active, null); assert.equal(hasWorldBuff(state, 'maintenance', 'paste'), true);
  assert.equal(state.machines.paste.progressTicks, 11.25);
  const restored = hydrateState(structuredClone(state));
  assert.equal(hasWorldBuff(restored, 'maintenance', 'paste'), true);
});

test('unrepaired jam expires and cannot leave production disabled indefinitely', () => {
  const state = jamState(); startWorldEvent(state, 'machineJam');
  ticks(state, 600, true);
  assert.equal(state.worldEvents.active, null);
  assert.equal(state.machines.paste.progressTicks, 11);
  assert.equal(hasWorldBuff(state, 'maintenance'), false);
});

test('golden harvest ripens faster with doubled real yield without breaking field capacity or reload', () => {
  const normal = createInitialState(4), gold = createInitialState(4);
  startWorldEvent(gold, 'goldenHarvest');
  ticks(normal, 15, true); ticks(gold, 15, true);
  assert.equal(normal.farms.tomatoFarm.harvestCount, 0);
  assert.equal(gold.farms.tomatoFarm.harvestCount, 2);
  assert.equal(gold.stock['farm:TOMATO'].items.TOMATO, 2);
  ticks(gold, 70, true);
  assert.equal(gold.stock['farm:TOMATO'].items.TOMATO, 4);
  assert.equal(gold.farms.tomatoFarm.readyCount, 4);
  assert.equal(hydrateState(structuredClone(gold)).stock['farm:TOMATO'].items.TOMATO, 4);
});

test('flash sale discounts only two imports and preserves paid order prices across expiry/reload', () => {
  const state = seasoned(); state.unlocked.managerOffice = true;
  startWorldEvent(state, 'flashCargo');
  const [item, other] = state.worldEvents.active.items;
  assert.notEqual(item, other); assert.ok(ITEMS[item].imported && ITEMS[other].imported);
  assert.equal(wholesaleUnitCost(state, item), PROCUREMENT_CATALOG[item].unitCostAtoms / 2);
  assert.equal(wholesaleUnitCost(state, 'TOMATO'), PROCUREMENT_CATALOG.TOMATO.unitCostAtoms);
  const quote = quoteWholesaleOrder(state, { [item]: 1 });
  // Ensure arbitrary imported case is affordable without bypassing the ledger.
  assert.equal(placeWholesaleOrder(state, { [item]: 1 }).ok, true);
  const restored = hydrateState(structuredClone(state)); ticks(restored, 1200);
  assert.equal(wholesaleUnitCost(restored, item), PROCUREMENT_CATALOG[item].unitCostAtoms);
  assert.equal(restored.procurement.orders[0].totalAtoms, quote.totalAtoms);
});

test('inspection allows recovery, requires actual stock and rested workers, awards certificate without fines', () => {
  const state = seasoned(); state.workers.push({ id: 'w', energy: 49 });
  startWorldEvent(state, 'inspection'); ticks(state, 10);
  assert.ok(state.worldEvents.active);
  state.stock['shelf:TOMATO'].items.TOMATO = 1; state.workers[0].energy = 51;
  ticks(state, 1); assert.equal(hasWorldBuff(state, 'certificate'), true);
  const failed = seasoned(); startWorldEvent(failed, 'inspection'); ticks(failed, 600);
  assert.equal(failed.economy.balanceAtoms, 100 * MONEY_ATOMS);
  assert.equal(hasWorldBuff(failed, 'certificate'), false);
});

function payer(state, id, role) {
  const customer = { id, kind: 'shopper', phase: 'paying', x: 5, z: -2.65, basket: ['TOMATO'],
    shoppingList: ['TOMATO'], shoppingIndex: 0, demand: 'TOMATO', checkoutOrder: state.nextEntityId++,
    targetRegisterId: 'register', payTicks: 100, queueIndex: 0, eventRole: role };
  makeLocation(state.stock, `customer:${id}`, 4).items.TOMATO = 1; state.customers.push(customer);
  return customer;
}
test('blackout freezes checkout inventory and patience, then restores processing on breaker repair', () => {
  const state = seasoned(), customer = payer(state, 'customer-100');
  startWorldEvent(state, 'blackout'); ticks(state, 40, true);
  assert.equal(customer.payTicks, 100); assert.equal(customer.checkoutWaitTicks, undefined);
  assert.equal(state.stock['customer:customer-100'].items.TOMATO, 1);
  Object.assign(state.player, { x: state.worldEvents.active.x, z: state.worldEvents.active.z });
  ticks(state, 10, true);
  assert.equal(state.worldEvents.active, null); assert.equal(customer.eventPaid, true);
  assert.equal(state.stock['customer:customer-100'].items.TOMATO, undefined);
});

test('billionaire settles actual queued baskets once and deposits $500 collectible cash', () => {
  const state = seasoned(); const rich = payer(state, 'customer-200', 'billionaire');
  const queued = payer(state, 'customer-201'); queued.phase = 'queueing'; queued.checkoutOrder += 100;
  startWorldEvent(state, 'billionaire', { spawnCustomer: () => rich });
  Object.assign(state.player, { x: 5, z: -5.75 });
  ticks(state, 2, true);
  assert.equal(rich.eventPaid, true); assert.equal(queued.eventPaid, true);
  assert.equal(state.stock['customer:customer-201'].items.TOMATO, undefined);
  assert.ok(state.cashAtRegisters.register >= 500 * MONEY_ATOMS);
  const cash = state.cashAtRegisters.register; ticks(state, 3, true);
  assert.equal(state.cashAtRegisters.register, cash);
  assert.equal(state.economy.balanceAtoms, 100 * MONEY_ATOMS); // Cash must still be collected normally.
});

test('VIP served within deadline earns a single tip and popularity; late service earns neither', () => {
  const state = seasoned(); state.unlocked.breadShelf = true; state.unlockedProducts.push('BREAD');
  makeLocation(state.stock, 'shelf:BREAD', 8);
  const vip = { id: 'vip', kind: 'shopper', phase: 'entering', x: 5, z: 10 };
  state.customers.push(vip); startWorldEvent(state, 'critic', { spawnCustomer: () => vip });
  const expectedTip = tipForMood(vip, ((Math.imul(state.worldEvents.rng, 1664525) + 1013904223) >>> 0) / 4294967296) * 10;
  vip.eventPaid = true; ticks(state, 1);
  assert.equal(hasWorldBuff(state, 'popularity'), true);
  assert.equal(state.economy.balanceAtoms, (100 + expectedTip) * MONEY_ATOMS);
  ticks(state, 3); assert.equal(state.economy.entries.filter(e => e.reason === 'vip-tip').length, 1);
  const late = seasoned(); late.unlocked.breadShelf = true; late.unlockedProducts.push('BREAD');
  const guest = { ...vip, id: 'late', eventPaid: false }; late.customers.push(guest);
  startWorldEvent(late, 'critic', { spawnCustomer: () => guest }); ticks(late, 600);
  assert.equal(hasWorldBuff(late, 'popularity'), false); assert.equal(late.economy.balanceAtoms, 100 * MONEY_ATOMS);
});

test('tourists enter through real simulation with a strict ten visitor budget and premium shopping lists', () => {
  const state = seasoned(); startWorldEvent(state, 'tourBus'); ticks(state, 150, true);
  assert.equal(state.worldEvents.active.spawned, 10);
  assert.equal(state.customers.filter(c => c.eventRole === 'tourist').length, 10);
  assert.ok(state.customers.filter(c => c.eventRole === 'tourist').every(c => c.archetype === 'tourist' && c.shoppingList[0] === 'TOMATO'));
  ticks(state, 150, true); assert.equal(state.worldEvents.active.spawned, 10);
});

test('petting the cat consumes no stock and creates a persistent mascot with satisfaction reward', () => {
  const state = seasoned(); state.stock['shelf:TOMATO'].items.TOMATO = 2;
  startWorldEvent(state, 'strayCat');
  Object.assign(state.player, { x: state.worldEvents.active.x, z: state.worldEvents.active.z });
  const satisfaction = state.customerSatisfaction; ticks(state, 10);
  assert.equal(state.stock['shelf:TOMATO'].items.TOMATO, 2);
  assert.equal(state.worldEvents.mascot, true); assert.equal(state.customerSatisfaction, satisfaction + 5);
  assert.equal(hydrateState(structuredClone(state)).worldEvents.mascot, true);
  assert.equal(eligibleWorldEvents(state).includes('strayCat'), false);
});

test('old saves migrate safely, invalid event records fail visibly, alert exposes countdown and counterplay', () => {
  const state = seasoned(); const old = structuredClone(state); delete old.worldEvents; old.saveVersion = 12;
  assert.equal(hydrateState(old).worldEvents.activeTicks, 0);
  const broken = structuredClone(state); broken.worldEvents.activeTicks = -1;
  assert.throws(() => hydrateState(broken), /Olay/);
  startWorldEvent(state, 'blackout'); const view = worldEventAlert(state);
  assert.equal(view.seconds, 60); assert.equal(view.good, false); assert.ok(view.target); assert.match(view.hint, /şalter/);
  state.settings.language = 'en'; assert.equal(worldEventAlert(state).title, 'Register blackout!');
});

test('event visuals reuse fixed meshes, freeze on pause and expose bus, smoke, cat and certificate', () => {
  const scene = new THREE.Scene(), visual = new WorldEventVisuals(scene), state = jamState(), cat = new THREE.Group();
  const count = () => { let n = 0; scene.traverse(() => n++); return n; }, budget = count();
  startWorldEvent(state, 'machineJam'); visual.update(state, 1, null, cat);
  assert.equal(visual.wrench.visible, true); const time = visual.time;
  state.paused = true; visual.update(state, 10, null, cat); assert.equal(visual.time, time);
  state.paused = false; state.worldEvents.active.type = 'tourBus'; visual.update(state, 1, null, cat);
  assert.equal(visual.bus.visible, true); assert.equal(visual.wrench.visible, false);
  for (let i = 0; i < 30; i++) visual.update(state, 0.03, null, cat);
  assert.equal(count(), budget);
});

test('security can be hired and restored with salary; only an on-duty nearby guard catches thieves', () => {
  const values = new Map(), storage = { getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k) };
  const app = new GameApplication(new SaveService(storage), 21);
  app.state.availableUpgrades.push('security');
  const candidate = app.openStaffCandidates('security').candidates[0];
  app.state.economy.balanceAtoms = 1000 * MONEY_ATOMS;
  assert.equal(app.hireStaffCandidate('security', candidate.id).ok, true);
  const restored = new GameApplication(new SaveService(storage));
  const guard = restored.state.workers.find(w => w.type === 'security');
  assert.ok(guard); assert.ok(guard.salaryAtoms > 0); assert.equal(guard.z, 8.5);
  restored.state.worldEvents.activeTicks = 6000; restored.state.worldEvents.nextAt = 100000;
  restored.state.player.x = -45; restored.state.stock['shelf:TOMATO'].items.TOMATO = 1;
  startWorldEvent(restored.state, 'shoplifter');
  const active = restored.state.worldEvents.active;
  guard.x = active.x; guard.z = active.z; guard.waitingForSalary = true;
  advanceWorldEvents(restored.state); assert.ok(restored.state.worldEvents.active);
  guard.waitingForSalary = false; guard.break = { phase: 'resting' };
  advanceWorldEvents(restored.state); assert.ok(restored.state.worldEvents.active);
  guard.break = null; advanceWorldEvents(restored.state);
  assert.equal(restored.state.worldEvents.active, null); assert.equal(restored.state.stock['shelf:TOMATO'].items.TOMATO, 1);
});

test('a recovery parcel survives a full warehouse and reload without losing or multiplying the stolen item', () => {
  const state = seasoned(); state.stock['shelf:TOMATO'].items.TOMATO = 1;
  startWorldEvent(state, 'shoplifter');
  state.stock['shelf:TOMATO'].items.TOMATO = state.stock['shelf:TOMATO'].capacity;
  state.stock['warehouse:main'].items.TOMATO = 500;
  Object.assign(state.player, { x: state.worldEvents.active.x, z: state.worldEvents.active.z });
  ticks(state, 1);
  const restored = hydrateState(structuredClone(state)), parcel = restored.worldEvents.recoveredParcel;
  assert.ok(parcel); assert.equal(restored.stock[parcel.location].items.TOMATO, 1);
  assert.equal(eligibleWorldEvents(restored).includes('shoplifter'), false);
  restored.stock['warehouse:main'].items.TOMATO -= 1;
  ticks(restored, 1); assert.equal(restored.stock['warehouse:main'].items.TOMATO, 500);
  assert.equal(restored.stock[parcel.location], undefined); assert.equal(restored.worldEvents.recoveredParcel, undefined);
});

test('certificate applies to real restaurant tips; popularity and maintenance expire on active time', () => {
  const state = seasoned();
  state.worldEvents.buffs = [{ type: 'certificate', until: 6010 }, { type: 'popularity', until: 6010 }, { type: 'maintenance', targetId: 'paste', until: 6010 }];
  state.diningTables.table1 = { customerId: 'guest', tipAtoms: 0 };
  const guest = { id: 'guest', kind: 'diner', phase: 'eating', tableId: 'table1', x: -37, z: 0,
    demand: 'BURGER', meal: 'BURGER', eatTicks: 79, vipTip: true, waitTicks: 0, mealWaitTicks: 0, checkoutWaitTicks: 0 };
  state.customers.push(guest); makeLocation(state.stock, 'customer:guest', 4).items.BURGER = 1;
  const control = structuredClone(state); control.worldEvents.buffs = [];
  advanceSimulation(control); advanceSimulation(state);
  assert.equal(state.diningTables.table1.tipAtoms, Math.round(control.diningTables.table1.tipAtoms / MONEY_ATOMS * 1.25) * MONEY_ATOMS);
  ticks(state, 10); assert.equal(hasWorldBuff(state, 'certificate'), false); assert.equal(hasWorldBuff(state, 'popularity'), false);
  assert.equal(hasWorldBuff(state, 'maintenance', 'paste'), false);
});

test('2× game speed preserves real event durations and repair hold time across reload', () => {
  const state = jamState(); state.speedMultiplier = 2; startWorldEvent(state, 'machineJam');
  Object.assign(state.player, STATIONS.paste);
  ticks(state, 1); assert.equal(state.worldEvents.active.holdTicks, 0);
  const restored = hydrateState(structuredClone(state));
  assert.equal(restored.worldEvents.clockRemainder, 0.5);
  ticks(restored, 28); assert.ok(restored.worldEvents.active);
  ticks(restored, 1); assert.equal(restored.worldEvents.active, null);
  assert.equal(restored.worldEvents.activeTicks, 6015);
});

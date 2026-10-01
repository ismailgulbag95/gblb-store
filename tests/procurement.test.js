import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, hydrateState } from '../src/domain/state.js';
import { ITEMS, MONEY_ATOMS } from '../src/domain/catalog.js';
import { quoteWholesaleOrder, placeWholesaleOrder, advanceProcurement, normalizeProcurement, configureProcurementAutomation } from '../src/domain/procurement.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';
import { advanceSimulation } from '../src/domain/simulation.js';
import { quantityAt, makeLocation } from '../src/domain/inventory.js';
import { normalizeWorkerWelfare } from '../src/domain/staff.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
const opened = () => {
  const state = createInitialState(77);
  state.unlocked.managerOffice = true;
  state.unlocked.loadingDock = true; state.unlocked.warehouse = true;
  state.economy.balanceAtoms = 10_000 * MONEY_ATOMS;
  return state;
};
const advance = (state, count) => { for (let i = 0; i < count; i++) { advanceProcurement(state); state.tick++; } };

test('wholesale quote is paid, finite and rejects empty, negative, fractional and unknown SKU carts', () => {
  const state = opened();
  for (const cart of [{}, { COLA: -1 }, { COLA: 0.5 }, { UNKNOWN: 1 }, { COLA: 11 }]) assert.equal(quoteWholesaleOrder(state, cart).ok, false);
  const quote = quoteWholesaleOrder(state, { TOMATO: 1, COLA: 2 });
  assert.equal(quote.ok, true);
  assert.equal(quote.quantity, 18);
  assert.ok(quote.totalAtoms > ITEMS.COLA.price * MONEY_ATOMS);
  assert.equal(placeWholesaleOrder(createInitialState(), { COLA: 1 }).reason, 'locked');
});

test('confirmation debits one quote, unaffordable purchase does not mutate queue or ledger', () => {
  const state = opened();
  const before = state.economy.balanceAtoms;
  const quote = quoteWholesaleOrder(state, { COLA: 2 });
  const result = placeWholesaleOrder(state, { COLA: 2 });
  assert.equal(result.ok, true);
  assert.equal(state.economy.balanceAtoms, before - quote.totalAtoms);
  assert.equal(state.procurement.orders.length, 1);
  assert.equal(state.economy.entries.length, 1);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 0);
  state.economy.balanceAtoms = 1;
  const orders = structuredClone(state.procurement.orders);
  assert.equal(placeWholesaleOrder(state, { COLA: 1 }).reason, 'insufficient-funds');
  assert.deepEqual(state.procurement.orders, orders);
  assert.equal(state.economy.entries.length, 1);
});

test('truck phases release cargo at unload completion exactly once, including replay and reload', () => {
  let state = opened();
  placeWholesaleOrder(state, { COLA: 1, CHIPS: 1 });
  advanceProcurement(state);
  assert.equal(state.procurement.delivery.phase, 'arriving');
  state.tick = 30; advanceProcurement(state);
  assert.equal(state.procurement.delivery.phase, 'unloading');
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 0);
  state.tick = 70; advanceProcurement(state);
  assert.equal(state.procurement.delivery.phase, 'departing');
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 6);
  advanceProcurement(state);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 6);
  state = hydrateState(state);
  advanceProcurement(state);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 6);
  state.tick = 100; advanceProcurement(state);
  assert.equal(state.procurement.delivery, null);
  assert.equal(state.procurement.orders[0].status, 'delivered');
  assert.equal(state.stockTransactions.filter(entry => entry.id.includes('procurement-unload')).length, 2);
});

test('bounded orders reserve incoming capacity and full docks defer cargo without loss', () => {
  const state = opened();
  state.stock['dock:incoming'].items.COLA = 238;
  assert.equal(placeWholesaleOrder(state, { COLA: 1 }).reason, 'dock-capacity');
  state.stock['dock:incoming'].items.COLA = 0;
  placeWholesaleOrder(state, { COLA: 1 });
  advance(state, 31);
  state.stock['dock:incoming'].items.COLA = 240;
  advance(state, 45);
  assert.equal(state.procurement.delivery.phase, 'unloading');
  assert.equal(state.procurement.delivery.cargoReleased, false);
  state.stock['dock:incoming'].items.COLA = 0;
  advance(state, 1);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 6);
});

test('manager automation needs a manager and counts pending/dock/warehouse stock before ordering', () => {
  const state = opened();
  state.unlockedProducts.push('COLA');
  state.layout.colaShelf = { x: 9.6, z: 4.7 };
  assert.equal(configureProcurementAutomation(state, { enabled: true, threshold: 2, items: ['COLA'] }).reason, 'manager-required');
  state.workers.push(normalizeWorkerWelfare({ id: 'manager', type: 'storeManager', x: 22, z: 1 }));
  assert.equal(configureProcurementAutomation(state, { enabled: true, threshold: 2, items: ['COLA'] }).ok, true);
  assert.equal(configureProcurementAutomation(state, { enabled: true, threshold: -1 }).ok, false);
  advance(state, 250);
  assert.equal(state.procurement.orders.length, 1);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), 6);
  state.stock['dock:incoming'].items.COLA = 0;
  state.stock['warehouse:main'].items.COLA = 6;
  advance(state, 180);
  assert.equal(state.procurement.orders.length, 1);
  state.stock['warehouse:main'].items.COLA = 0;
  state.workers[0].break = { phase: 'resting', facilityId: 'rest' };
  advance(state, 180);
  assert.equal(state.procurement.orders.length, 1);
  state.workers[0].break = null;
  advance(state, 180);
  assert.equal(state.procurement.orders.length, 2);
});

test('automation refuses unplaced shelves and insufficient funds without new orders', () => {
  const state = opened();
  state.unlockedProducts.push('COLA'); state.pendingShelfIds.push('colaShelf');
  state.workers.push({ id: 'manager', type: 'storeManager' });
  configureProcurementAutomation(state, { enabled: true, threshold: 2, items: ['COLA'] });
  advance(state, 120);
  assert.equal(state.procurement.orders.length, 0);
  state.pendingShelfIds = []; state.economy.balanceAtoms = 1;
  advance(state, 120);
  assert.equal(state.procurement.orders.length, 0);
});

test('domain normalization preserves released cargo and rebuilds pending truck state safely', () => {
  const state = opened();
  placeWholesaleOrder(state, { COLA: 1 }); advance(state, 71);
  const before = quantityAt(state.stock, 'dock:incoming', 'COLA');
  normalizeProcurement(state);
  advanceProcurement(state);
  assert.equal(quantityAt(state.stock, 'dock:incoming', 'COLA'), before);
  assert.equal(state.procurement.delivery.cargoReleased, true);
});

test('application exposes terminal and purchases shelf without bypassing unlock or charging twice', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  assert.equal(app.placeWholesaleOrder({ COLA: 1 }).ok, false);
  app.state.economy.balanceAtoms = 10000 * MONEY_ATOMS;
  app.state.availableUpgrades.push('logisticsOffice');
  assert.equal(app.buyUpgrade('logisticsOffice').ok, true);
  assert.equal(app.buyImportedShelf('COLA').ok, true);
  assert.equal(app.buyImportedShelf('COLA').ok, false);
  assert.ok(app.state.unlockedProducts.includes('COLA'));
  app.state.player.x = 22; app.state.player.z = 1.2;
  assert.equal(app.getNearbyAction().id, 'managerOffice');
  const events = []; app.setEventHandler(event => events.push(event));
  assert.equal(app.interact('managerOffice').ok, true);
  assert.ok(events.some(event => event.type === 'procurement-open'));
});

test('player and warehouse operator move delivered products using stock reservations', () => {
  const state = opened();
  state.unlockedProducts.push('COLA'); state.layout.colaShelf = { x: 9.6, z: 4.7 };
  state.stock['dock:incoming'].items.COLA = 6;
  state.workers.push(normalizeWorkerWelfare({ id: 'warehouse-worker', type: 'warehouseOperator', x: 15.3, z: 1.8, task: null }));
  for (let i = 0; i < 900; i++) { advanceSimulation(state); state.tick++; }
  assert.ok(state.stockTransactions.some(entry => entry.from === 'worker:warehouse-worker' && entry.to === 'shelf:COLA'));
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.state = opened(); app.state.stock['dock:incoming'].items.COLA = 6;
  app.state.player.x = 15.3; app.state.player.z = 1.8;
  assert.equal(app.interact('loadingDock').ok, true);
  assert.equal(quantityAt(app.state.stock, 'player', 'COLA'), 6);
  assert.equal(quantityAt(app.state.stock, 'dock:incoming', 'COLA'), 0);
  app.state.player.x = 16.1; app.state.player.z = 5;
  assert.equal(app.interact('warehouse').ok, true);
  assert.equal(quantityAt(app.state.stock, 'warehouse:main', 'COLA'), 6);
});

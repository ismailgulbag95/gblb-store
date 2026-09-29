import test from 'node:test';
import assert from 'node:assert/strict';
import { GameApplication } from '../src/application/GameApplication.js';
import { advanceSimulation, findCustomerMarketRoute } from '../src/domain/simulation.js';
import { createInitialState, hydrateState } from '../src/domain/state.js';
import {
  canTransfer,
  makeLocation,
  pickUpReservedStock,
  quantityAt,
  reserveStock,
  transferStock,
} from '../src/domain/inventory.js';
import { EconomyLedger, InsufficientBalanceError } from '../src/domain/ledger.js';
import { SaveRecoveryError, SaveService } from '../src/infrastructure/SaveService.js';
import { SHELVES, STATIONS } from '../src/domain/catalog.js';
import { canPlaceStation, getDecorationDimensions, getMarketCollisionBoxes, getStationDimensions } from '../src/domain/layout.js';
import { CharacterFactory } from '../src/presentation/CharacterFactory.js';
import { customerMood, saleMoodMultiplier, tipForMood } from '../src/domain/customerExperience.js';
import { decorationPrice, nextOrder, orderProgress } from '../src/domain/orders.js';
import { FURNITURE_TYPES, calculateParabolicPrice, getFurnitureCount, getFurniturePrice, getStaffCount, getStaffHirePrice, isFurnitureUnlocked } from '../src/domain/furnitureCatalog.js';
import { getAvailableRegisters } from '../src/domain/simulation.js';

class MemoryStorage {
  values = new Map();

  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

function makeApp(seed = 1) {
  return new GameApplication(new SaveService(new MemoryStorage()));
}

test('older v2 saves migrate customer and order fields without losing inventory', () => {
  const old = createInitialState(42);
  old.saveVersion = 2;
  delete old.activeOrder;
  delete old.ordersCompleted;
  old.stock.player.items.TOMATO = 2;
  old.customers.push({ id: 'customer-90', kind: 'shopper', x: 5, z: 5, phase: 'leaving',
    shoppingList: ['TOMATO'], basket: [], demand: 'TOMATO' });
  const migrated = hydrateState(old);
  assert.equal(migrated.saveVersion, 3);
  assert.equal(migrated.stock.player.items.TOMATO, 2);
  assert.equal(migrated.customers[0].checkoutWaitTicks, 0);
  assert.equal(migrated.ordersCompleted, 0);
});

test('customer mood changes sale and tip rewards only after meaningful waits', () => {
  assert.equal(customerMood({}), 100);
  assert.equal(saleMoodMultiplier({ checkoutWaitTicks: 10 }), 1);
  assert.equal(customerMood({ missedItems: 1, checkoutWaitTicks: 100 }), 65);
  assert.equal(saleMoodMultiplier({ missedItems: 1, checkoutWaitTicks: 100 }), 0.95);
  assert.equal(tipForMood({ mealWaitTicks: 240 }), 10);
});

test('optional order consumes bag stock and credits reward exactly once', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  const state = app.getState();
  state.stats.tomatoSold = 1;
  state.stock.player.items.TOMATO = 3;
  app.tick();
  const order = app.getState().activeOrder;
  assert.deepEqual(order, nextOrder(app.getState()));
  assert.equal(orderProgress(app.getState()), 3);
  const before = app.getBalance();
  assert.equal(app.fulfillOrder().ok, true);
  assert.equal(app.getBalance(), before + order.reward);
  assert.equal(app.getState().stock.player.items.TOMATO, undefined);
  assert.equal(app.getState().ordersCompleted, 1);
  assert.equal(app.fulfillOrder().reason, 'order-stock');
});

test('three completed orders grant and redeem one decoration voucher', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.getState().stats.tomatoSold = 1;
  app.tick();
  for (let index = 0; index < 3; index += 1) {
    const order = app.getState().activeOrder;
    app.getState().stock.player.items[order.item] = order.quantity;
    assert.equal(app.fulfillOrder().ok, true);
  }
  assert.equal(app.getState().decorVouchers, 1);
  assert.equal(decorationPrice(app.getState(), 85), 65);
  const before = app.getBalance();
  assert.equal(app.buyDecoration('welcomeMat').ok, true);
  assert.equal(app.getBalance(), before - 65);
  assert.equal(app.getState().decorVouchers, 0);
});

function runTicks(state, count) {
  for (let index = 0; index < count; index += 1) {
    advanceSimulation(state);
    state.tick += 1;
  }
  return state;
}

test('10 Hz farm production is deterministic and independent of rendering', () => {
  const first = runTicks(createInitialState(123), 22);
  const second = runTicks(createInitialState(123), 22);

  assert.equal(quantityAt(first.stock, 'farm:TOMATO', 'TOMATO'), 4);
  assert.deepEqual(first, second);
});

test('a harvested plot becomes empty and ripens again after a full growth cycle', () => {
  const storage = new MemoryStorage();
  const app = new GameApplication(new SaveService(storage));
  for (let tick = 0; tick < 22; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 4);
  app.getState().player.x = STATIONS.tomatoFarm.x;
  app.getState().player.z = STATIONS.tomatoFarm.z;
  assert.equal(app.interact('tomatoFarm').ok, true);
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  assert.equal(quantityAt(app.getState().stock, 'farm:TOMATO', 'TOMATO'), 0);
  assert.equal(new GameApplication(new SaveService(storage)).getState().farms.tomatoFarm.readyCount, 0);
  for (let tick = 0; tick < 21; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 4);
});

test('harvesting one of two plots leaves the other plot ripe', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  assert.equal(app.buyUpgrade('tomatoFarm2').ok, true);
  for (let tick = 0; tick < 22; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 4);
  assert.equal(app.getState().farms.tomatoFarm2.readyCount, 4);
  Object.assign(app.getState().player, { x: STATIONS.tomatoFarm.x, z: STATIONS.tomatoFarm.z });
  assert.equal(app.interact('tomatoFarm').ok, true);
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  assert.equal(app.getState().farms.tomatoFarm2.readyCount, 4);
  assert.equal(quantityAt(app.getState().stock, 'farm:TOMATO', 'TOMATO'), 4);
});

test('stock reservations protect both source quantity and destination capacity through pickup and delivery', () => {
  const state = createInitialState(2);
  state.stock['farm:TOMATO'].items.TOMATO = 3;
  makeLocation(state.stock, 'worker:harvester-1', 6);

  assert.equal(reserveStock(state, {
    reservationId: 'worker-job-1', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 2,
  }).ok, true);
  assert.equal(canTransfer(state, 'farm:TOMATO', 'shelf:TOMATO', 'TOMATO', 2), false);
  assert.equal(transferStock(state, {
    transactionId: 'unreserved-transfer', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 2,
  }).ok, false);

  assert.equal(pickUpReservedStock(state, 'worker-job-1', 'worker:harvester-1').ok, true);
  assert.equal(quantityAt(state.stock, 'farm:TOMATO', 'TOMATO'), 1);
  assert.equal(quantityAt(state.stock, 'worker:harvester-1', 'TOMATO'), 2);
  assert.equal(transferStock(state, {
    transactionId: 'worker-delivery-1', from: 'worker:harvester-1', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 2,
    reservationId: 'worker-job-1',
  }).ok, true);
  assert.equal(quantityAt(state.stock, 'shelf:TOMATO', 'TOMATO'), 2);
  assert.equal(state.reservations['worker-job-1'], undefined);
  assert.equal(transferStock(state, {
    transactionId: 'worker-delivery-1', from: 'worker:harvester-1', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 2,
    reservationId: 'worker-job-1',
  }).duplicate, true);
});

test('failed debits leave the balance and ledger unchanged', () => {
  const economy = { balanceAtoms: 25_000, entries: [] };
  const before = structuredClone(economy);

  assert.throws(() => new EconomyLedger(economy).debit('too-expensive', 3, 'upgrade'), InsufficientBalanceError);
  assert.deepEqual(economy, before);
});

test('a shopper purchase consumes one shelf item and credits the ledger once', () => {
  const storage = new MemoryStorage();
  const initial = createInitialState(7);
  initial.stock['shelf:TOMATO'].items.TOMATO = 1;
  makeLocation(initial.stock, 'customer:buyer-1', 2);
  initial.customers.push({
    id: 'buyer-1', kind: 'shopper', x: 3, z: 2, targetX: 3, targetZ: 2,
    phase: 'to-shelf', demand: 'TOMATO', payTicks: 0,
  });
  initial.workers.push({ id: 'cashier-test', type: 'cashier', x: 5, z: -4, task: null });
  new SaveService(storage).commit(initial, 'fixture:sale');

  const app = new GameApplication(new SaveService(storage));
  for (let index = 0; index < 40; index += 1) app.tick();

  assert.equal(app.getBalance(), 103);
  assert.equal(app.getState().stats.tomatoSold, 1);
  assert.equal(quantityAt(app.getState().stock, 'shelf:TOMATO', 'TOMATO'), 0);
  assert.equal(app.getState().economy.entries.filter((entry) => entry.reason === 'sale:TOMATO').length, 1);
});

test('legacy multi-product baskets collect each item and credit the total once', () => {
  const storage = new MemoryStorage();
  const initial = createInitialState(17);
  initial.unlockedProducts.push('ORANGE');
  initial.stock['shelf:TOMATO'].items.TOMATO = 1;
  initial.stock['shelf:ORANGE'].items.ORANGE = 1;
  initial.customers.push({
    id: 'buyer-2', kind: 'shopper', x: 3, z: 3.3, phase: 'waiting-stock',
    shoppingList: ['TOMATO', 'ORANGE'], shoppingIndex: 0, demand: 'TOMATO', basket: [],
    checkoutOrder: 1, waitTicks: 0,
  });
  makeLocation(initial.stock, 'customer:buyer-2', 4);
  initial.workers.push({ id: 'cashier-test', type: 'cashier', x: 5, z: -4, task: null });
  new SaveService(storage).commit(initial, 'fixture:multi-sale');

  const app = new GameApplication(new SaveService(storage));
  for (let index = 0; index < 100; index += 1) app.tick();

  const sold = app.getState().economy.entries.filter((entry) => entry.reason.startsWith('sale:'));
  assert.equal(app.getBalance(), 107);
  assert.equal(sold.length, 2);
  assert.deepEqual(sold.map((entry) => entry.reason), ['sale:TOMATO', 'sale:ORANGE']);
  assert.equal(app.getState().stats.tomatoSold, 1);
});

test('customers wait at checkout until a cashier or the player is at the register', () => {
  const state = createInitialState(18);
  makeLocation(state.stock, 'customer:buyer-3', 4);
  state.stock['customer:buyer-3'].items.TOMATO = 1;
  state.customers.push({
    id: 'buyer-3', kind: 'shopper', x: 5, z: -2.8, phase: 'paying', queueIndex: 0,
    demand: 'TOMATO', shoppingList: ['TOMATO'], shoppingIndex: 1, basket: ['TOMATO'],
    checkoutOrder: 1, payTicks: 0,
  });

  runTicks(state, 80);

  assert.equal(state.economy.balanceAtoms, 100 * 10_000);
  assert.equal(state.customers[0].phase, 'paying');
  assert.equal(state.customers[0].payTicks, 0);
  assert.equal(quantityAt(state.stock, 'customer:buyer-3', 'TOMATO'), 1);
});

test('the selected character from the original game is imported into a fresh save', () => {
  const storage = new MemoryStorage();
  storage.setItem('player_character', 'cat');

  const app = new GameApplication(new SaveService(storage));

  assert.equal(app.getState().player.character, 'cat');
  assert.equal(JSON.parse(storage.getItem('gblb.orbit.save.current')).body.includes('"character":"cat"'), true);
});

test('all five original player models build and animate as complete character rigs', () => {
  for (const type of ['shopkeeper', 'cat', 'robot', 'panda', 'penguin']) {
    const character = new CharacterFactory(type);
    assert.ok(character.group.children.length >= 3, `${type} has a visible model`);
    assert.ok(character.leftLeg && character.rightLeg, `${type} has walk-cycle legs`);
    character.animate(0.1, true);
    assert.notEqual(character.leftLeg.rotation.x, 0, `${type} animates while moving`);
  }
});

test('staff hiring options unlock from saved progress and purchasing adds a working employee', () => {
  const storage = new MemoryStorage();
  const saved = createInitialState(19);
  saved.stats.tomatoSold = 1;
  saved.availableUpgrades = ['tomatoFarm2'];
  new SaveService(storage).commit(saved, 'fixture:staff-unlock');

  const app = new GameApplication(new SaveService(storage));
  assert.equal(app.getAvailableUpgrades().some((upgrade) => upgrade.id === 'cashier'), true);
  assert.equal(app.buyUpgrade('cashier').ok, true);
  assert.equal(app.getBalance(), 65);
  assert.deepEqual(app.getState().workers.map((worker) => worker.type), ['cashier']);
});

test('worker jobs survive save/load while carrying reserved goods and finish exactly once', () => {
  const storage = new MemoryStorage();
  const initial = createInitialState(44);
  initial.stock['farm:TOMATO'].items.TOMATO = 1;
  initial.stock['farm:TOMATO'].capacity = 0;
  initial.unlockedProducts = [];
  makeLocation(initial.stock, 'worker:harvester-1', 6);
  reserveStock(initial, {
    reservationId: 'worker-job-1', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1,
  });
  pickUpReservedStock(initial, 'worker-job-1', 'worker:harvester-1');
  initial.workers.push({ id: 'harvester-1', type: 'harvester', x: -10, z: 5, facing: 0, task: {
    from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1,
    reservationId: 'worker-job-1', carrier: 'worker:harvester-1', phase: 'to-target',
  } });
  const seeder = new SaveService(storage);
  seeder.commit(initial, 'fixture:worker');

  const app = new GameApplication(new SaveService(storage));
  for (let index = 0; index < 10; index += 1) app.tick();
  const carrying = app.getState();
  assert.equal(carrying.workers[0].task?.phase, 'to-target');
  assert.equal(quantityAt(carrying.stock, 'worker:harvester-1', 'TOMATO'), 1);

  const restored = new GameApplication(new SaveService(storage));
  assert.equal(restored.getState().workers[0].task?.phase, 'to-target');
  for (let index = 0; index < 55; index += 1) restored.tick();
  const completed = restored.getState();
  assert.equal(quantityAt(completed.stock, 'shelf:TOMATO', 'TOMATO'), 1);
  assert.equal(quantityAt(completed.stock, 'worker:harvester-1', 'TOMATO'), 0);
  assert.equal(Object.keys(completed.reservations).length, 0);
});

test('new purchases are committed before publication and recovered from a damaged current slot', () => {
  const storage = new MemoryStorage();
  const app = new GameApplication(new SaveService(storage));
  assert.equal(app.debugCredit(25).ok, true);
  assert.equal(app.getBalance(), 125);

  storage.setItem('gblb.orbit.save.current', '{truncated');
  const recovered = new GameApplication(new SaveService(storage));
  assert.equal(recovered.getBalance(), 125);
  assert.equal(recovered.recovered, true);
});

test('save loading rejects data when every checksummed copy is corrupt', () => {
  const storage = new MemoryStorage();
  const service = new SaveService(storage);
  service.commit(createInitialState(8), 'seed');
  storage.setItem('gblb.orbit.save.current', 'broken');
  storage.setItem('gblb.orbit.save.journal', 'broken');

  assert.throws(() => new SaveService(storage).load(), SaveRecoveryError);
});

test('hydration rejects capacity overflow and invalid active-worker reservation links', () => {
  const full = createInitialState(5);
  full.stock.player.items.TOMATO = 7;
  assert.throws(() => hydrateState(full), /kapasite|stok/i);

  const orphan = createInitialState(5);
  orphan.workers.push({ id: 'w1', type: 'harvester', x: 0, z: 0, task: {
    from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1,
    reservationId: 'missing', phase: 'to-target', carrier: 'worker:w1',
  } });
  assert.throws(() => hydrateState(orphan), /görevi|rezervasyon/i);
});

test('tomatoes can be loaded, cooked into paste, collected, and stocked', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.getState().stats.tomatoSold = 1;
  app.tick();
  assert.equal(app.buyUpgrade('paste').ok, true);
  app.getState().stock.player.items.TOMATO = 4;
  app.getState().player.x = -10;
  app.getState().player.z = 1.8;
  assert.equal(app.interact('paste').ok, true);
  assert.equal(quantityAt(app.getState().stock, 'machine:paste:input', 'TOMATO'), 4);
  for (let index = 0; index < 30; index += 1) app.tick();
  assert.equal(quantityAt(app.getState().stock, 'machine:paste:output', 'TOMATO_PASTE'), 1);
  assert.equal(app.getState().stats.pasteProduced, 1);
  assert.equal(app.interact('paste').ok, true);
  app.getState().player.x = 7.5;
  app.getState().player.z = 2;
  assert.equal(app.interact('pasteShelf').ok, true);
  assert.equal(quantityAt(app.getState().stock, 'shelf:TOMATO_PASTE', 'TOMATO_PASTE'), 1);
});

test('factory worker carries intermediate bread to the next recipe', () => {
  const state = createInitialState(51);
  state.machines.bakery = { recipe: 'bakery', progressTicks: 0, blocked: false };
  state.machines.burgerKitchen = { recipe: 'burger', progressTicks: 0, blocked: false };
  state.workers.push({ id: 'feeder-1', type: 'factoryFeeder', x: -23, z: 0, task: null });
  state.stock['machine:bakery:output'].items.BREAD = 1;
  state.stock['farm:WHEAT'].items.WHEAT = 3;
  runTicks(state, 100);
  assert.equal(quantityAt(state.stock, 'machine:burgerKitchen:input', 'BREAD'), 1);
});

test('existing cashier is moved clear of the register on load', () => {
  const storage = new MemoryStorage();
  const state = createInitialState(71);
  state.workers.push({ id: 'cashier-1', type: 'cashier', x: 5, z: -4, facing: 1, task: null });
  new SaveService(storage).commit(state, 'fixture:old-cashier');
  const app = new GameApplication(new SaveService(storage));
  assert.equal(app.getState().workers[0].x, STATIONS.register.x);
  assert.ok(app.getState().workers[0].z < STATIONS.register.z - 1.5);
  assert.equal(new GameApplication(new SaveService(storage)).getState().workers[0].z, app.getState().workers[0].z);
});

test('caretaker stocks eggs even when the coop feed bin is full', () => {
  const state = createInitialState(73);
  makeLocation(state.stock, 'coop:feed', 20);
  makeLocation(state.stock, 'coop:eggs', 20);
  state.stock['coop:feed'].items.CHICKEN_FEED = 20;
  state.stock['machine:feed:output'].items.CHICKEN_FEED = 1;
  state.stock['coop:eggs'].items.EGG = 1;
  state.workers.push({ id: 'caretaker-1', type: 'caretaker', x: -23, z: 3.5, task: null });
  runTicks(state, 140);
  assert.equal(quantityAt(state.stock, 'shelf:EGG', 'EGG'), 1);
  assert.equal(quantityAt(state.stock, 'coop:eggs', 'EGG'), 0);
});

test('corn production unlocks the full feed, egg, bread, and restaurant chain', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.debugCredit(2000);
  const state = app.getState();
  state.stats.tomatoSold = 1;
  state.stats.juiceSold = 1;
  state.workers.push({ id: 'cashier-chain', type: 'cashier', x: 5, z: -5.75, task: null });
  app.tick();
  const at = (id) => Object.assign(app.getState().player, { x: STATIONS[id].x, z: STATIONS[id].z });
  const sell = (item, stat) => {
    const before = app.getState().stats[stat];
    const shelf = SHELVES[item].id;
    app.getState().stock[shelf].items[item] = (app.getState().stock[shelf].items[item] ?? 0) + 1;
    const id = `chain-${item}`;
    makeLocation(app.getState().stock, `customer:${id}`, 4);
    app.getState().customers.push({
      id, kind: 'shopper', x: SHELVES[item].x, z: SHELVES[item].z + 1.3,
      phase: 'waiting-stock', shoppingList: [item], shoppingIndex: 0, demand: item,
      basket: [], checkoutOrder: app.getState().nextEntityId++, waitTicks: 0, payTicks: 0,
    });
    for (let tick = 0; tick < 90 && app.getState().stats[stat] === before; tick += 1) app.tick();
    assert.equal(app.getState().stats[stat], before + 1, `${item} satışa ulaşmalı`);
  };
  const make = (upgrade, machine, inputs, seconds) => {
    assert.equal(app.buyUpgrade(upgrade).ok, true, `${upgrade} açılmalı`);
    for (const [item, count] of Object.entries(inputs)) app.getState().stock.player.items[item] = count;
    at(machine);
    assert.equal(app.interact(machine).ok, true, `${machine} malzeme almalı`);
    for (let tick = 0; tick < seconds * 10; tick += 1) app.tick();
    assert.equal(quantityAt(app.getState().stock, `machine:${machine}:output`, {
      popcorn: 'POPCORN', feed: 'CHICKEN_FEED', bakery: 'BREAD', burgerKitchen: 'BURGER', pizzaKitchen: 'PIZZA',
    }[machine]), 1, `${machine} çıktı vermeli`);
  };

  assert.equal(app.buyUpgrade('corn').ok, true);
  sell('CORN', 'cornSold');
  make('popcorn', 'popcorn', { CORN: 1 }, 2.5);
  sell('POPCORN', 'popcornSold');
  make('feed', 'feed', { CORN: 1 }, 2.2);
  assert.equal(app.buyUpgrade('coop').ok, true);
  at('feed');
  assert.equal(app.interact('feed').ok, true);
  at('coop');
  assert.equal(app.interact('coop').ok, true);
  for (let tick = 0; tick < 180; tick += 1) app.tick();
  assert.equal(quantityAt(app.getState().stock, 'coop:eggs', 'EGG'), 1);
  sell('EGG', 'eggSold');
  make('bakery', 'bakery', { WHEAT: 2, EGG: 1 }, 4);
  sell('BREAD', 'breadSold');
  assert.equal(app.buyUpgrade('restaurant').ok, true);
  assert.deepEqual(Object.keys(app.getState().diningTables), ['table1', 'table2', 'table3', 'table4']);
  for (const [machine, inputs, seconds] of [
    ['burgerKitchen', { BREAD: 1, TOMATO: 1 }, 4.5],
    ['pizzaKitchen', { WHEAT: 1, TOMATO: 2 }, 5],
  ]) {
    for (const [item, count] of Object.entries(inputs)) app.getState().stock.player.items[item] = count;
    at(machine);
    assert.equal(app.interact(machine).ok, true);
    for (let tick = 0; tick < seconds * 10; tick += 1) app.tick();
    assert.equal(quantityAt(app.getState().stock, `machine:${machine}:output`, machine === 'burgerKitchen' ? 'BURGER' : 'PIZZA'), 1);
  }
  at('burgerKitchen');
  assert.equal(app.interact('burgerKitchen').ok, true);
  const dinerId = 'chain-diner';
  makeLocation(app.getState().stock, `customer:${dinerId}`, 4);
  app.getState().diningTables.table1.customerId = dinerId;
  app.getState().customers.push({
    id: dinerId, kind: 'diner', x: STATIONS.table1.x, z: STATIONS.table1.z,
    phase: 'waiting-meal', demand: 'BURGER', tableId: 'table1', waitTicks: 0, eatTicks: 0,
  });
  at('table1');
  assert.equal(app.interact('table1').ok, true);
  for (let tick = 0; tick < 80; tick += 1) app.tick();
  assert.ok(app.getState().diningTables.table1.tipAtoms > 0);
  assert.equal(app.interact('table1').ok, true);
  assert.equal(app.buyUpgrade('chefWaiter').ok, true);
  assert.deepEqual(app.getState().workers.filter((worker) => ['chefWaiter', 'waiter'].includes(worker.type)).map((worker) => worker.type), ['chefWaiter', 'waiter']);
});

test('specialized display fixtures categorize products into produce, cooler, bakery, and gondola types', () => {
  assert.equal(SHELVES.TOMATO.displayType, 'produce');
  assert.equal(SHELVES.ORANGE.displayType, 'produce');
  assert.equal(SHELVES.CORN.displayType, 'produce');
  assert.equal(SHELVES.TOMATO_PASTE.displayType, 'gondola');
  assert.equal(SHELVES.POPCORN.displayType, 'gondola');
  assert.equal(SHELVES.ORANGE_JUICE.displayType, 'cooler');
  assert.equal(SHELVES.EGG.displayType, 'cooler');
  assert.equal(SHELVES.BREAD.displayType, 'bakery');
});

test('customer orders dynamically vary among available unlocked products', () => {
  const state = createInitialState(101);
  state.stats.tomatoSold = 5;
  state.unlockedProducts = ['TOMATO', 'ORANGE', 'BREAD', 'EGG'];
  const items = new Set();
  for (let i = 0; i < 15; i += 1) {
    state.ordersCompleted = i;
    const order = nextOrder(state);
    assert.ok(state.unlockedProducts.includes(order.item));
    items.add(order.item);
  }
  assert.ok(items.size > 1, 'orders vary among unlocked products');
});

test('player movement safely navigates and collides with solid fixtures without freezing', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  const initialX = app.getState().player.x;
  const initialZ = app.getState().player.z;
  app.setPlayerMove({ x: 1, z: 0 }, 0.05);
  assert.ok(app.getState().player.x > initialX, 'player moves forward');
  assert.equal(app.getState().player.z, initialZ);

  // Rotate a station
  const rotRes = app.rotateSelected('tomatoShelf');
  assert.equal(rotRes.ok, true);
  assert.equal(app.getState().layout.tomatoShelf.rotation, Math.PI / 2);
});

test('stations and items adhere to exact visual footprints and boundaries during placement and rotation', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  const state = app.getState();

  // Test dimension getters
  const defaultTomatoDims = getStationDimensions('tomatoShelf', 0);
  assert.equal(defaultTomatoDims.width, 2.35);
  assert.equal(defaultTomatoDims.depth, 1.35);

  // When rotated 90 degrees, width and depth swap to match visual volume
  const rotatedTomatoDims = getStationDimensions('tomatoShelf', Math.PI / 2);
  assert.equal(rotatedTomatoDims.width, 1.35);
  assert.equal(rotatedTomatoDims.depth, 2.35);

  // Boundary checks: An item cannot be placed where its visual bounds extend outside zone walls
  // Market zone max X is 13.5. tomatoShelf (width 2.35, halfW = 1.175) placed at x = 13.0 would reach 14.175 (outside)
  assert.equal(canPlaceStation(state, 'tomatoShelf', 13.0, 0, 0), false, 'cannot extend beyond market right wall');
  // Safe position within zone bounds
  assert.equal(canPlaceStation(state, 'tomatoShelf', 12.0, 0, 0), true, 'can place within safe bounds');

  // Moving a station via GameApplication honors these boundaries
  const moveOutside = app.moveStation('tomatoShelf', 13.0, 0);
  assert.equal(moveOutside.ok, false);

  const moveSafe = app.moveStation('tomatoShelf', 12.0, 0);
  assert.equal(moveSafe.ok, true);
  assert.equal(app.getState().layout.tomatoShelf.x, 12.0);
  assert.equal(app.getState().layout.tomatoShelf.z, 0);
});

test('customers navigate around foreground shelves when heading to background shelves without getting stuck', () => {
  const state = createInitialState(42);
  state.unlockedProducts = ['TOMATO', 'ORANGE'];
  state.stock['shelf:ORANGE'] = { items: { ORANGE: 5 }, capacity: 8, reserved: {} };
  state.layout = {
    ...state.layout,
    tomatoShelf: { x: 3, z: 2 },
    orangeShelf: { x: 3, z: -1 },
  };
  SHELVES.TOMATO.x = 3;
  SHELVES.TOMATO.z = 2;
  SHELVES.ORANGE.x = 3;
  SHELVES.ORANGE.z = -1;

  // Foreground shelf: TOMATO at (3, 2)
  // Background shelf: ORANGE at (3, -1)
  // Customer starts at market entrance corridor (5, 3.5) and wants ORANGE
  const orangeTarget = { x: 3, z: 0.3 };
  const route = findCustomerMarketRoute(state, { x: 5, z: 3.5 }, orangeTarget, 'ORANGE');

  // Verify route does not walk straight through tomato shelf (x: 3, z: 2)
  assert.ok(route.length >= 2, 'Route should contain intermediate waypoint around obstacle');
  // First waypoint should guide through main corridor (e.g. x around 4.5 - 5.0, z around 0.5 - 1.0)
  assert.ok(route[0].x > 3.8, 'Route guides customer through aisle rather than through foreground shelf');

  // Now simulate customer moving along route
  const customerId = 'shopper-background-test';
  makeLocation(state.stock, `customer:${customerId}`, 4);
  state.customers.push({
    id: customerId,
    kind: 'shopper',
    x: 5,
    z: 3.5,
    phase: 'to-shelf',
    shoppingList: ['ORANGE'],
    shoppingIndex: 0,
    demand: 'ORANGE',
    basket: [],
    route,
    routeIndex: 0,
    checkoutOrder: 1,
    waitTicks: 0,
  });

  // Track positions over simulation steps
  let enteredTomatoFixture = false;
  for (let tick = 0; tick < 60; tick += 1) {
    advanceSimulation(state, 1);
    const customer = state.customers.find((c) => c.id === customerId);
    if (!customer) break;

    // Check if customer ever clipped inside the tomato shelf fixture body: [1.9, 4.1] x [1.4, 2.6]
    if (customer.x > 2.0 && customer.x < 4.0 && customer.z > 1.35 && customer.z < 2.65) {
      enteredTomatoFixture = true;
    }
  }

  assert.equal(enteredTomatoFixture, false, 'Customer should never walk through the foreground shelf body');
  const customer = state.customers.find((c) => c.id === customerId);
  assert.ok(
    customer.phase === 'waiting-stock' || customer.basket.includes('ORANGE'),
    'Customer successfully reached the background shelf without bugging'
  );
});

test('adjacent shelves block gaps when less than 1 grid apart and allow passage when at least 1 grid apart', () => {
  const state = createInitialState(101);
  state.unlockedProducts = ['TOMATO', 'ORANGE'];

  // Case 1: Adjacent shelves placed with < 1 grid gap (e.g. 0.15m apart)
  // tomatoShelf at x=2.0 (width 2.35, right edge = 3.175)
  // orangeShelf at x=4.5 (width 2.35, left edge = 3.325) -> gap = 0.15m < 0.5
  state.layout = {
    tomatoShelf: { x: 2.0, z: 0 },
    orangeShelf: { x: 4.5, z: 0 },
  };
  let boxes = getMarketCollisionBoxes(state);
  const gapBlocker = boxes.find((b) => b.id?.startsWith('gap:x:'));
  assert.ok(gapBlocker, 'Gap blocker should be created between adjacent shelves');
  assert.ok(gapBlocker.minX <= 3.25 && gapBlocker.maxX >= 3.25, 'Gap between shelves is blocked');

  // Case 2: Shelves placed with >= 1 grid gap (e.g. 0.65m apart)
  // orangeShelf at x=5.0 (left edge = 3.825) -> gap = 3.825 - 3.175 = 0.65m >= 0.5
  state.layout.orangeShelf = { x: 5.0, z: 0 };
  boxes = getMarketCollisionBoxes(state);
  const gapBlocker2 = boxes.find((b) => b.id?.startsWith('gap:x:'));
  assert.equal(gapBlocker2, undefined, 'No gap blocker when shelves are at least 1 grid apart');
});

test('shelves placed adjacent to walls block gap, while 1 grid away allows passage', () => {
  const state = createInitialState(102);
  state.unlockedProducts = ['TOMATO'];

  // Right wall is at x = 13.5
  // Case 1: Shelf adjacent to wall (< 1 grid gap, e.g. x = 12.0 -> maxX = 13.175 -> gap = 0.325m < 0.5)
  state.layout = { tomatoShelf: { x: 12.0, z: 0 } };
  let boxes = getMarketCollisionBoxes(state);
  const shelfBox = boxes.find((b) => b.id === 'tomatoShelf');
  assert.ok(shelfBox, 'Tomato shelf box exists');
  assert.equal(shelfBox.maxX, 13.5, 'Shelf box extends to wall to block passage when adjacent');

  // Case 2: Shelf placed 1 grid further away (gap >= 0.5, e.g. x = 11.5 -> maxX = 12.675 -> gap = 0.825m >= 0.5)
  state.layout = { tomatoShelf: { x: 11.5, z: 0 } };
  boxes = getMarketCollisionBoxes(state);
  const shelfBox2 = boxes.find((b) => b.id === 'tomatoShelf');
  assert.ok(shelfBox2.maxX < 13.0, 'Shelf box does not extend to wall when >= 1 grid gap exists');
});

test('furniture store unlocks items when produced and scales prices parabolically with unlimited purchases', () => {
  const app = makeApp(201);
  let state = app.getState();

  // Initially: TOMATO is unlocked, ORANGE is locked
  assert.equal(isFurnitureUnlocked(state, 'tomatoShelf'), true);
  assert.equal(isFurnitureUnlocked(state, 'tomatoFarm'), true);
  assert.equal(isFurnitureUnlocked(state, 'orangeShelf'), false);

  // Parabolic price verification
  const basePrice = FURNITURE_TYPES.tomatoFarm.basePrice;
  const p0 = calculateParabolicPrice(basePrice, 0);
  const p1 = calculateParabolicPrice(basePrice, 1);
  const p2 = calculateParabolicPrice(basePrice, 2);
  assert.equal(p0, basePrice);
  assert.ok(p1 > p0, 'price increases for count 1');
  assert.ok(p2 - p1 > p1 - p0, 'price increases parabolically (second derivative is positive)');

  // Give player ample funds to purchase multiple furniture items
  app.debugCredit(50_000);
  state = app.getState();

  // Buy a new tomato farm
  const buyFarm = app.buyFurniture('tomatoFarm');
  assert.equal(buyFarm.ok, true);
  assert.ok(buyFarm.stationId.startsWith('tomatoFarm_'));
  state = app.getState();
  assert.ok(state.farms[buyFarm.stationId], 'New farm added to farms state');
  assert.ok(state.layout[buyFarm.stationId], 'New farm placed on layout');

  // Buy a second tomato shelf
  const buyShelf = app.buyFurniture('tomatoShelf');
  assert.equal(buyShelf.ok, true);
  assert.ok(buyShelf.stationId.startsWith('tomatoShelf_'));
  state = app.getState();
  assert.ok(state.stock[`shelf:${buyShelf.stationId}`], 'New shelf stock initialized');

  // Next purchase price increases parabolically
  const nextPrice = getFurniturePrice(state, 'tomatoShelf');
  assert.ok(nextPrice > (buyShelf.price ?? basePrice));

  // Unlock orange product and verify orange furniture becomes unlocked in the store
  state.unlockedProducts.push('ORANGE');
  assert.equal(isFurnitureUnlocked(state, 'orangeShelf'), true);
  assert.equal(isFurnitureUnlocked(state, 'orangeFarm'), true);
});

test('staff count can be increased with parabolic hiring costs', () => {
  const app = makeApp(202);
  let state = app.getState();
  app.debugCredit(50_000);
  state = app.getState();

  // Cashier is not yet unlocked
  assert.equal(app.hireExtraStaff('cashier').ok, false);

  // Complete cashier upgrade
  state.availableUpgrades.push('cashier');
  const hireFirst = app.buyUpgrade('cashier');
  assert.equal(hireFirst.ok, true);
  state = app.getState();
  assert.equal(getStaffCount(state, 'cashier'), 1);

  const price1 = getStaffHirePrice(state, 'cashier');
  // Hire extra cashier
  const hireSecond = app.hireExtraStaff('cashier');
  assert.equal(hireSecond.ok, true);
  state = app.getState();
  assert.equal(getStaffCount(state, 'cashier'), 2);

  const price2 = getStaffHirePrice(state, 'cashier');
  assert.ok(price2 > price1, 'Price increases for subsequent staff hires');

  // Hire third cashier
  const hireThird = app.hireExtraStaff('cashier');
  assert.equal(hireThird.ok, true);
  state = app.getState();
  assert.equal(getStaffCount(state, 'cashier'), 3);
  const price3 = getStaffHirePrice(state, 'cashier');
  assert.ok(price3 - price2 > price2 - price1, 'Cost grows parabolically');
});

test('self-checkout kiosk operates automatically without cashier or player present', () => {
  const app = makeApp(203);
  let state = app.getState();
  app.debugCredit(50_000);

  // Purchase self-checkout kiosk
  const buyKiosk = app.buyFurniture('selfRegister');
  assert.equal(buyKiosk.ok, true);
  assert.ok(buyKiosk.stationId.startsWith('selfRegister_'));
  state = app.getState();
  assert.ok(state.selfRegisters[buyKiosk.stationId], 'Self register registered in state');

  const registers = getAvailableRegisters(state);
  assert.ok(registers.some((r) => r.id === buyKiosk.stationId && r.isSelfCheckout === true));

  // Position player far away from checkout
  state.player.x = -15;
  state.player.z = -5;
  // Ensure no cashier workers exist
  state.workers = state.workers.filter((w) => w.type !== 'cashier');

  // Place customer directly paying at the selfRegister
  const customerId = 'shopper-kiosk-test';
  makeLocation(state.stock, `customer:${customerId}`, 4);
  state.stock[`customer:${customerId}`].items.TOMATO = 1;

  const kioskPos = state.layout[buyKiosk.stationId];
  const customer = {
    id: customerId,
    kind: 'shopper',
    x: kioskPos.x,
    z: kioskPos.z + 1.2,
    phase: 'paying',
    targetRegisterId: buyKiosk.stationId,
    queueIndex: 0,
    checkoutOrder: 1,
    payTicks: 0,
    checkoutWaitTicks: 0,
    basket: ['TOMATO'],
    shoppingList: ['TOMATO'],
    shoppingIndex: 1,
    demand: 'TOMATO',
  };
  state.customers.push(customer);

  const initialBalance = state.economy.balanceAtoms;

  // Advance simulation for 10 ticks (self-checkout payDuration is 7 ticks)
  for (let tick = 0; tick < 10; tick += 1) {
    advanceSimulation(state);
    state.tick += 1;
  }

  // Assert payment completed and ledger credited WITHOUT cashier or player
  assert.ok(state.economy.balanceAtoms > initialBalance, 'Sale completed automatically at self-checkout kiosk');
  assert.equal(state.stats.tomatoSold, 1);
});







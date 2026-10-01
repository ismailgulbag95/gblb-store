import test from 'node:test';
import assert from 'node:assert/strict';
import { GameApplication } from '../src/application/GameApplication.js';
import { advanceSimulation, findCustomerMarketRoute, routeCustomerToShelf } from '../src/domain/simulation.js';
import { createInitialState, hydrateState, SAVE_VERSION } from '../src/domain/state.js';
import { createFarmState } from '../src/domain/farm.js';
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
import { getStaffCount, SHELVES, STATIONS } from '../src/domain/catalog.js';
import { canPlaceStation, getDecorationDimensions, getMarketCollisionBoxes, getShelfLocations, getStationDimensions } from '../src/domain/layout.js';
import { CharacterFactory } from '../src/presentation/CharacterFactory.js';
import { customerMood, saleMoodMultiplier, tipForMood } from '../src/domain/customerExperience.js';
import { decorationPrice, nextOrder, orderProgress } from '../src/domain/orders.js';
import { machineProductionSeconds, machineSpeedMultiplier, machineUpgradeCost, staffSpeedMultiplier, staffUpgradeCost } from '../src/domain/progression.js';
import { AdMobRewardedProvider, DevelopmentRewardedProvider, RewardedAdService } from '../src/infrastructure/RewardedAdProvider.js';

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
  assert.equal(migrated.saveVersion, SAVE_VERSION);
  assert.equal(migrated.stock.player.items.TOMATO, 2);
  assert.equal(migrated.customers[0].checkoutWaitTicks, 0);
  assert.equal(migrated.ordersCompleted, 0);
});

test('v6 saves migrate to the bonus-offer defaults without losing player capacity', () => {
  const old = createInitialState(43);
  old.saveVersion = 6;
  delete old.bonusOffers;
  const migrated = hydrateState(old);

  assert.equal(migrated.saveVersion, SAVE_VERSION);
  assert.deepEqual(migrated.bonusOffers, {
    activePlayMs: 0,
    nextOfferAtActiveMs: 180_000,
    nextOfferId: 1,
    currentOffer: null,
    walkSpeedExpiresAt: 0,
  });
  assert.equal(migrated.player.capacity, 6);
  assert.equal(migrated.stock.player.capacity, 6);
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

test('four farm plants ripen independently at their persisted phase times', () => {
  const state = createInitialState(123);
  runTicks(state, 44);
  assert.equal(state.farms.tomatoFarm.readyCount, 0);
  runTicks(state, 1);
  assert.equal(state.farms.tomatoFarm.readyCount, 1);
  runTicks(state, 11);
  assert.equal(state.farms.tomatoFarm.readyCount, 2);
  runTicks(state, 11);
  assert.equal(state.farms.tomatoFarm.readyCount, 3);
  runTicks(state, 11);
  assert.equal(state.farms.tomatoFarm.readyCount, 4);
  assert.equal(quantityAt(state.stock, 'farm:TOMATO', 'TOMATO'), 4);
});

test('farm stock stops at four until the ripe plants are collected', () => {
  const state = runTicks(createInitialState(123), 600);

  assert.equal(state.farms.tomatoFarm.readyCount, 4);
  assert.equal(quantityAt(state.stock, 'farm:TOMATO', 'TOMATO'), 4);
  assert.equal(state.farms.tomatoFarm.harvestCount, 4);
});

test('collecting a partial ripe batch gives the exact amount and preserves each plant schedule', () => {
  const storage = new MemoryStorage();
  const app = new GameApplication(new SaveService(storage));
  for (let tick = 0; tick < 67; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 3);
  app.getState().player.x = STATIONS.tomatoFarm.x;
  app.getState().player.z = STATIONS.tomatoFarm.z;
  assert.equal(app.interact('tomatoFarm').ok, true);
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 3);
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  assert.equal(quantityAt(app.getState().stock, 'farm:TOMATO', 'TOMATO'), 0);
  const savedPlants = structuredClone(app.getState().farms.tomatoFarm.plants);
  const reloaded = new GameApplication(new SaveService(storage));
  assert.equal(reloaded.getState().farms.tomatoFarm.readyCount, 0);
  assert.deepEqual(reloaded.getState().farms.tomatoFarm.plants, savedPlants);
  for (let tick = 0; tick < 10; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 1);
  assert.equal(app.interact('tomatoFarm').ok, true);
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 4);
  for (let tick = 0; tick < 11; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 1);
});

test('harvesting one of two plots leaves the other plot ripe', async () => {
  const { app } = makeAdApp();
  assert.equal((await app.watchRewardedAd('farm-unlock', { upgradeId: 'tomatoFarm2' })).ok, true);
  assert.deepEqual(app.getState().farms.tomatoFarm2.plants.map((plant) => plant.nextReadyTick), [52, 63, 74, 85]);
  for (let tick = 0; tick < 85; tick += 1) app.tick();
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 4);
  assert.equal(app.getState().farms.tomatoFarm2.readyCount, 4);
  Object.assign(app.getState().player, { x: STATIONS.tomatoFarm.x, z: STATIONS.tomatoFarm.z });
  assert.equal(app.interact('tomatoFarm').ok, true);
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
  assert.equal(app.getState().farms.tomatoFarm2.readyCount, 4);
  assert.equal(quantityAt(app.getState().stock, 'farm:TOMATO', 'TOMATO'), 4);
});

test('legacy farm saves retain ripe quantity and upgrade to independent timers', () => {
  const legacy = createInitialState(124);
  legacy.saveVersion = 3;
  legacy.stock['farm:TOMATO'].items.TOMATO = 3;
  legacy.farms.tomatoFarm.readyCount = 3;
  delete legacy.farms.tomatoFarm.plants;

  const migrated = hydrateState(legacy);
  assert.equal(migrated.saveVersion, SAVE_VERSION);
  assert.equal(migrated.farms.tomatoFarm.plants.length, 4);
  assert.equal(migrated.farms.tomatoFarm.plants.filter((plant) => plant.ready).length, 3);
  assert.equal(migrated.stock['farm:TOMATO'].items.TOMATO, 3);
});

test('version four farm timers migrate to one evenly phased cycle without losing ripe stock', () => {
  const legacy = createInitialState(125);
  legacy.saveVersion = 4;
  legacy.tick = 68;
  legacy.stock['farm:TOMATO'].items.TOMATO = 1;
  legacy.farms.tomatoFarm.readyCount = 1;
  legacy.farms.tomatoFarm.plants = [
    { ready: true, phaseOffsetTicks: 1, cycleTicks: 38, nextReadyTick: 77 },
    { ready: false, phaseOffsetTicks: 11, cycleTicks: 43, nextReadyTick: 97 },
    { ready: false, phaseOffsetTicks: 21, cycleTicks: 47, nextReadyTick: 115 },
    { ready: false, phaseOffsetTicks: 31, cycleTicks: 52, nextReadyTick: 135 },
  ];

  const migrated = hydrateState(legacy);
  const plants = migrated.farms.tomatoFarm.plants;
  assert.equal(migrated.saveVersion, SAVE_VERSION);
  assert.equal(migrated.farms.tomatoFarm.readyCount, 1);
  assert.equal(migrated.stock['farm:TOMATO'].items.TOMATO, 1);
  assert.deepEqual(plants.map((plant) => plant.cycleTicks), [45, 45, 45, 45]);
  assert.deepEqual(plants.map((plant) => plant.phaseOffsetTicks), [0, 11, 22, 33]);
  assert.equal(new Set(plants.map((plant) => (plant.nextReadyTick - plant.phaseOffsetTicks) % 45)).size, 1);
});

test('new flour and orange tart recipes use the existing machine inventory flow', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.debugCredit(1000);
  app.getState().stats.breadSold = 1;
  app.getState().stats.juiceSold = 1;
  app.tick();
  assert.equal(app.buyUpgrade('flourMill').ok, true);
  Object.assign(app.getState().stock.player.items, { WHEAT: 2 });
  Object.assign(app.getState().player, { x: STATIONS.flourMill.x, z: STATIONS.flourMill.z });
  assert.equal(app.interact('flourMill').ok, true);
  for (let tick = 0; tick < 60; tick += 1) app.tick();
  assert.equal(app.getState().stats.flourProduced, 1);
  assert.equal(app.interact('flourMill').ok, true);
  assert.equal(app.buyUpgrade('orangeTartKitchen').ok, true);

  Object.assign(app.getState().stock.player.items, { EGG: 1, ORANGE: 1 });
  Object.assign(app.getState().player, { x: STATIONS.orangeTartKitchen.x, z: STATIONS.orangeTartKitchen.z });
  assert.equal(app.interact('orangeTartKitchen').ok, true);
  for (let tick = 0; tick < 50; tick += 1) app.tick();
  assert.equal(app.getState().stats.orangeTartProduced, 1);
  assert.equal(quantityAt(app.getState().stock, 'machine:orangeTartKitchen:output', 'ORANGE_TART'), 1);
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
    id: 'buyer-1', kind: 'shopper', x: 3, z: 3.3, targetX: 3, targetZ: 3.3,
    phase: 'waiting-stock', targetShelfId: 'tomatoShelf', shoppingList: ['TOMATO'], shoppingIndex: 0,
    demand: 'TOMATO', basket: [], checkoutOrder: 1, waitTicks: 0, payTicks: 0,
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

test('staff hiring is ad-only and rewarded hire adds a working employee without spending cash', async () => {
  const storage = new MemoryStorage();
  const saved = createInitialState(19);
  saved.stats.tomatoSold = 1;
  saved.availableUpgrades = ['tomatoFarm2'];
  new SaveService(storage).commit(saved, 'fixture:staff-unlock');

  const app = new GameApplication(new SaveService(storage));
  app.rewardedAdService = new RewardedAdService(new FakeRewardedProvider());
  app.adSessionTicks = 1_800;
  app.getState().ordersCompleted = 1;
  assert.equal(app.getAvailableUpgrades().some((upgrade) => upgrade.id === 'cashier'), false);
  assert.equal(app.buyUpgrade('cashier').reason, 'rewarded-ad-required');
  assert.equal((await app.watchRewardedAd('staff-hire', { role: 'cashier' })).ok, true);
  assert.equal(app.getBalance(), 100);
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
  const pos = app.getState().layout?.pasteShelf ?? STATIONS.pasteShelf;
  app.getState().player.x = pos.x;
  app.getState().player.z = pos.z;
  assert.equal(app.interact('pasteShelf').ok, true);
  assert.equal(quantityAt(app.getState().stock, 'shelf:TOMATO_PASTE', 'TOMATO_PASTE'), 1);
});

test('factory worker carries intermediate bread to the next recipe', () => {
  const state = createInitialState(51);
  state.machines.bakery = { recipe: 'bakery', progressTicks: 0, blocked: false };
  state.machines.burgerKitchen = { recipe: 'burger', progressTicks: 0, blocked: false };
  state.workers.push({ id: 'feeder-1', type: 'factoryFeeder', x: -10, z: 0, task: null });
  state.stock['machine:bakery:output'].items.BREAD = 1;
  state.stock['farm:WHEAT'].items.WHEAT = 3;
  runTicks(state, 220);
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
  makeLocation(state.stock, 'shelf:EGG', SHELVES.EGG.capacity);
  state.stock['coop:feed'].items.CHICKEN_FEED = 20;
  state.stock['machine:feed:output'].items.CHICKEN_FEED = 1;
  state.stock['coop:eggs'].items.EGG = 1;
  state.unlockedProducts.push('EGG');
  state.workers.push({ id: 'caretaker-1', type: 'caretaker', x: -18, z: 0, task: null });
  runTicks(state, 220);
  assert.equal(state.stockTransactions.some((entry) => entry.to === 'shelf:EGG' && entry.item === 'EGG'
    && entry.id.startsWith('worker-delivery:')), true);
  assert.equal(quantityAt(state.stock, 'coop:eggs', 'EGG'), 0);
});

test('corn production unlocks the full feed, egg, bread, and restaurant chain', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.debugCredit(2000);
  const state = app.getState();
  state.customerSpawnTicks = -10_000;
  state.stats.tomatoSold = 1;
  state.stats.juiceSold = 1;
  state.workers.push({ id: 'cashier-chain', type: 'cashier', x: 5, z: -5.75, task: null });
  app.tick();
  const at = (id) => {
    const p = app.getState().layout?.[id] ?? STATIONS[id];
    Object.assign(app.getState().player, { x: p.x, z: p.z });
  };
  const sell = (item, stat) => {
    const before = app.getState().stats[stat];
    const shelf = SHELVES[item].id;
    app.getState().stock[shelf].items[item] = (app.getState().stock[shelf].items[item] ?? 0) + 1;
    const id = `chain-${item}`;
    makeLocation(app.getState().stock, `customer:${id}`, 4);
    app.getState().customers.push({
      id, kind: 'shopper', x: 5, z: 6,
      phase: 'to-shelf', shoppingList: [item], shoppingIndex: 0, demand: item,
      targetShelfId: Object.entries(STATIONS).find(([, station]) => station.kind === 'shelf' && station.item === item)?.[0],
      basket: [], checkoutOrder: app.getState().nextEntityId++, waitTicks: 0, payTicks: 0,
    });
    const targetShelfId = Object.entries(STATIONS).find(([, station]) => station.kind === 'shelf' && station.item === item)?.[0];
    const targetPos = targetShelfId ? app.getState().layout?.[targetShelfId] ?? STATIONS[targetShelfId] : null;
    console.log('Spawning customer for', item, 'target:', targetShelfId, 'pos:', targetPos);
    for (let tick = 0; tick < 90 && app.getState().stats[stat] === before; tick += 1) app.tick();
    if (app.getState().stats[stat] === before) {
       const c = app.getState().customers.find(x => x.id === `chain-${item}`);
       console.log('Customer stuck! phase:', c?.phase, 'pos:', c?.x, c?.z, 'route:', c?.route);
    }
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
  app.moveStation('cornShelf', STATIONS.cornShelf.x, STATIONS.cornShelf.z);
  sell('CORN', 'cornSold');
  make('popcorn', 'popcorn', { CORN: 1 }, 2.5);
  app.moveStation('popcornShelf', STATIONS.popcornShelf.x, STATIONS.popcornShelf.z);
  sell('POPCORN', 'popcornSold');
  make('feed', 'feed', { CORN: 1 }, 2.2);
  assert.equal(app.buyUpgrade('coop').ok, true);
  app.moveStation('eggShelf', STATIONS.eggShelf.x, STATIONS.eggShelf.z);
  at('feed');
  assert.equal(app.interact('feed').ok, true);
  at('coop');
  assert.equal(app.interact('coop').ok, true);
  for (let tick = 0; tick < 180; tick += 1) app.tick();
  assert.equal(quantityAt(app.getState().stock, 'coop:eggs', 'EGG'), 1);
  sell('EGG', 'eggSold');
  make('bakery', 'bakery', { WHEAT: 2, EGG: 1 }, 4);
  app.moveStation('breadShelf', STATIONS.breadShelf.x, STATIONS.breadShelf.z);
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
  assert.equal(app.buyUpgrade('chefWaiter').reason, 'rewarded-ad-required');
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
  app.moveStation('tomatoShelf', 3, 2);
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

test('customers can route from entrance door to all unlocked market shelves without blocking', () => {
  const state = createInitialState(1234);
  const products = [
    'TOMATO', 'TOMATO_PASTE', 'ORANGE', 'ORANGE_JUICE',
    'CORN', 'POPCORN', 'EGG', 'BREAD', 'FLOUR', 'ORANGE_TART'
  ];
  state.unlockedProducts = [...products];

  for (const prod of products) {
    const shelves = getShelfLocations(state, prod);
    assert.ok(shelves.length > 0, `Shelf for ${prod} should exist`);
    const shelf = shelves[0];
    const customer = {
      id: `test-shopper-${prod}`,
      kind: 'shopper',
      x: 5,
      z: 6.6,
      phase: 'to-shelf',
      demand: prod,
      shoppingList: [prod],
      shoppingIndex: 0,
      basket: [],
      route: [],
      routeIndex: 0,
      checkoutOrder: 1,
      targetShelfId: shelf.id,
      shelfQueueIndex: 0,
    };
    routeCustomerToShelf(state, customer, prod, 0);
    assert.equal(customer.routeBlocked, false, `Customer for ${prod} should not be route-blocked`);
    assert.ok(customer.route.length > 0, `Customer for ${prod} should have a non-empty route`);
  }
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

class FakeRewardedProvider {
  constructor(mode = 'complete', ready = true, receipts = []) {
    this.mode = mode;
    this.ready = ready;
    this.receipts = receipts;
    this.showCount = 0;
    this.context = null;
  }

  isReady() { return this.ready; }

  async show(_placement, callbacks, context) {
    this.showCount += 1;
    this.context = context;
    callbacks.onLoaded?.();
    callbacks.onStarted?.();
    if (this.mode === 'complete') {
      callbacks.onCompleted?.({ rewardId: context.rewardId, rewarded: true });
      callbacks.onCompleted?.({ rewardId: context.rewardId, rewarded: true });
      return { rewarded: true, rewardId: context.rewardId };
    }
    if (this.mode === 'closed') callbacks.onClosed?.();
    else callbacks.onFailed?.(new Error('ad failed'));
    return false;
  }

  async getCompletedRewardReceipts() { return this.receipts; }
}

function makeAdApp(provider = new FakeRewardedProvider(), storage = new MemoryStorage()) {
  const app = new GameApplication(new SaveService(storage), 1, new RewardedAdService(provider));
  app.adSessionTicks = 1_800;
  app.getState().ordersCompleted = 1;
  return { app, provider, storage };
}

test('legacy furniture save migration removes dynamic assets, their stock, and incomplete work without refund', () => {
  const legacy = createInitialState(555);
  legacy.saveVersion = 5;
  legacy.customStations.legacyFarm = { id: 'legacyFarm', kind: 'farm', item: 'TOMATO', title: 'Old farm' };
  legacy.customStations.legacyShelf = { id: 'legacyShelf', kind: 'shelf', item: 'TOMATO_PASTE', title: 'Old shelf' };
  legacy.customStations.legacyMachine = { id: 'legacyMachine', kind: 'machine', recipe: 'paste', title: 'Old machine' };
  legacy.customStations.legacyTable = { id: 'legacyTable', kind: 'table', title: 'Old table' };
  legacy.selfRegisters.legacyRegister = { id: 'legacyRegister', title: 'Old register' };
  legacy.farms.legacyFarm = createFarmState(legacy.tick, 'legacyFarm');
  legacy.farms.legacyFarm.plants[0].ready = true;
  legacy.farms.legacyFarm.readyCount = 1;
  legacy.farms.tomatoFarm.plants[0].ready = true;
  legacy.farms.tomatoFarm.readyCount = 1;
  legacy.stock['farm:TOMATO'].items.TOMATO = 2;
  legacy.machines.legacyMachine = { recipe: 'paste', progressTicks: 4, blocked: false };
  makeLocation(legacy.stock, 'shelf:legacyShelf', 6);
  makeLocation(legacy.stock, 'machine:legacyMachine:input', 12);
  makeLocation(legacy.stock, 'machine:legacyMachine:output', 8);
  legacy.stock['machine:legacyMachine:output'].items.TOMATO_PASTE = 1;
  legacy.stock['machine:legacyMachine:output'].reserved.TOMATO_PASTE = 1;
  legacy.stock['shelf:legacyShelf'].reservedCapacity = 1;
  makeLocation(legacy.stock, 'worker:legacy-worker', 6);
  legacy.stock['worker:legacy-worker'].items.TOMATO_PASTE = 1;
  legacy.reservations['legacy-reservation'] = {
    from: 'machine:legacyMachine:output',
    to: 'shelf:legacyShelf',
    origin: 'machine:legacyMachine:output',
    item: 'TOMATO_PASTE',
    quantity: 1,
  };
  legacy.workers.push({
    id: 'legacy-worker', type: 'harvester', x: -10, z: 5, task: {
      reservationId: 'legacy-reservation', from: 'machine:legacyMachine:output',
      to: 'shelf:legacyShelf', item: 'TOMATO_PASTE', quantity: 1,
      phase: 'to-source', carrier: 'worker:legacy-worker', farmId: 'legacyFarm',
    },
  });
  legacy.diningTables.legacyTable = { customerId: 'legacy-diner', meal: 'BURGER', tipAtoms: 0, eatTicks: 0 };
  legacy.customers.push({
    id: 'legacy-diner', kind: 'diner', x: -38, z: 4, demand: 'BURGER', basket: [], shoppingList: [],
    phase: 'eating', tableId: 'legacyTable',
  });
  legacy.layout = {
    legacyFarm: { x: -3, z: -3 }, legacyShelf: { x: 4, z: 4 }, legacyMachine: { x: 5, z: 5 },
    legacyRegister: { x: 6, z: 6 }, tomatoFarm: { x: -10, z: 5 },
  };

  const storage = new MemoryStorage();
  const originalBalance = legacy.economy.balanceAtoms;
  new SaveService(storage).commit(legacy, 'legacy-furniture-save');
  const app = new GameApplication(new SaveService(storage), 1);
  const state = app.getState();

  assert.equal(state.economy.balanceAtoms, originalBalance, 'migration does not refund old purchases');
  assert.deepEqual(state.customStations, {});
  assert.deepEqual(state.selfRegisters, {});
  assert.equal(state.farms.legacyFarm, undefined);
  assert.equal(state.farms.tomatoFarm.readyCount, 1, 'the built-in farm keeps its ripe product');
  assert.equal(state.stock['farm:TOMATO'].items.TOMATO, 1, 'the removed farm contribution is discarded');
  assert.equal(state.machines.legacyMachine, undefined);
  assert.equal(state.stock['shelf:legacyShelf'], undefined);
  assert.equal(state.stock['machine:legacyMachine:input'], undefined);
  assert.equal(state.stock['machine:legacyMachine:output'], undefined);
  assert.equal(state.stock['worker:legacy-worker'], undefined);
  assert.equal(state.workers[0].task, null, 'unfinished furniture-related job is canceled');
  assert.equal(Object.keys(state.reservations).length, 0);
  assert.equal(state.diningTables.legacyTable, undefined);
  assert.equal(state.customers.some((customer) => customer.id === 'legacy-diner'), false);
  assert.deepEqual(state.layout, { tomatoFarm: { x: -10, z: 5 } });
  assert.equal(state.saveVersion, SAVE_VERSION);
});

test('AdMob browser adapter remains not ready until a native bridge is supplied', async () => {
  const provider = new AdMobRewardedProvider(null);
  assert.equal(provider.isReady('farm-unlock'), false);
  assert.equal(await provider.show('farm-unlock', { onCompleted() {} }), false);
  assert.deepEqual(await provider.getCompletedRewardReceipts(), []);
});

test('development ad simulation waits before its marked reward and never overrides a configured AdMob bridge', async () => {
  const native = new AdMobRewardedProvider(null);
  const simulated = new DevelopmentRewardedProvider(native, true, 15);
  const service = new RewardedAdService(simulated);
  const rewardId = 'development-reward-1';
  let completed = null;
  const startedAt = Date.now();
  const result = await service.show('farm-unlock', {
    onCompleted: (receipt) => { completed = receipt; },
  }, { rewardId });

  assert.equal(result, true);
  assert.ok(Date.now() - startedAt >= 10);
  assert.deepEqual(completed, { rewardId, rewarded: true, source: 'development-simulation' });
  assert.equal(service.isSimulated(), true);

  const notReadyNative = new AdMobRewardedProvider({
    isRewardedReady: () => false,
    showRewarded: () => assert.fail('unready AdMob should not be shown'),
  });
  const noFallback = new DevelopmentRewardedProvider(notReadyNative, true, 1);
  assert.equal(noFallback.isSimulated(), false);
  assert.equal(noFallback.isReady('staff-hire'), false);
  assert.equal(await noFallback.show('staff-hire', {}, { rewardId: 'must-not-grant' }), false);

  let nativeShows = 0;
  const configuredNative = new AdMobRewardedProvider({
    isRewardedReady: () => true,
    showRewarded: (_placement, callbacks, context) => {
      nativeShows += 1;
      callbacks.onCompleted({ rewardId: context.rewardId, rewarded: true });
    },
  });
  const nativeFirst = new RewardedAdService(new DevelopmentRewardedProvider(configuredNative, true, 1));
  assert.equal(nativeFirst.isSimulated(), false);
  assert.equal(await nativeFirst.show('staff-hire', {}, { rewardId: 'native-reward-1' }), true);
  assert.equal(nativeShows, 1);
});

test('development simulation makes progression-eligible ad unlocks available and awards only after its delay', async () => {
  const provider = new DevelopmentRewardedProvider(new AdMobRewardedProvider(null), true, 25);
  const app = new GameApplication(new SaveService(new MemoryStorage()), 1, new RewardedAdService(provider));
  app.getState().availableUpgrades.push('cashier');
  assert.equal(app.getState().ordersCompleted, 0);
  assert.equal(app.adSessionTicks, 0);
  assert.equal(app.isRewardedAdSimulated(), true);
  assert.equal(app.canOfferRewardedAd('staff-hire', { role: 'cashier' }), true);
  const pendingReward = app.watchRewardedAd('staff-hire', { role: 'cashier' });
  assert.equal(getStaffCount(app.getState(), 'cashier'), 0);
  const result = await pendingReward;
  assert.equal(result.ok, true);
  assert.equal(getStaffCount(app.getState(), 'cashier'), 1);
});

test('rewarded service rejects a completion receipt for another request', async () => {
  const invalidProvider = {
    isReady: () => true,
    show: (_placement, callbacks) => callbacks.onCompleted({ rewardId: 'wrong-id', rewarded: true }),
  };
  const service = new RewardedAdService(invalidProvider);
  assert.equal(await service.show('staff-hire', {}, { rewardId: 'expected-id' }), false);
});

test('rewarded order completion grants the order reward only once despite duplicate callbacks', async () => {
  const { app } = makeAdApp();
  const state = app.getState();
  state.lastOrderReward = { id: 'order:12', reward: 24, item: 'TOMATO', quantity: 2, claimed: false };
  const before = app.getBalance();

  const result = await app.watchRewardedAd('order-double', { orderId: 'order:12' });

  assert.equal(result.ok, true);
  assert.equal(result.rewardAmount, 24);
  assert.equal(app.getBalance(), before + 24);
  assert.equal(app.getState().lastOrderReward.claimed, true);
  assert.equal(app.getState().ads.grantedRewardIds.length, 1);
  assert.equal(app.getState().ads.events.filter((event) => event.type === 'reward_granted').length, 1);
});

test('surprise bonus offers wait for three active minutes and persist a 5–8 minute follow-up interval', () => {
  const { app, storage } = makeAdApp();
  app.advanceBonusOfferClock(179_999);
  assert.equal(app.getPendingBonusOffer(), null);
  assert.equal(app.getState().bonusOffers.activePlayMs, 179_999);

  const offer = app.advanceBonusOfferClock(1);
  assert.ok(['walk-speed', 'bag-capacity', 'character-unlock'].includes(offer.type));
  assert.equal(offer.id, 'bonus-1');
  const wait = app.getState().bonusOffers.nextOfferAtActiveMs - app.getState().bonusOffers.activePlayMs;
  assert.ok(wait >= 300_000 && wait <= 480_000);

  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.deepEqual(loaded.getPendingBonusOffer(), offer);
  assert.equal(loaded.getState().bonusOffers.nextOfferAtActiveMs, app.getState().bonusOffers.nextOfferAtActiveMs);
});

test('surprise bonus clock does not advance during pauses or when layout/modal eligibility is false', () => {
  const { app } = makeAdApp();
  app.setPaused(true);
  app.advanceBonusOfferClock(10_000);
  app.setPaused(false);
  app.advanceBonusOfferClock(10_000, false);
  assert.equal(app.getState().bonusOffers.activePlayMs, 0);
});

test('speed bonus is player-only, persists its wall-clock expiry, and repeated ads add five minutes', async () => {
  const { app, storage } = makeAdApp();
  const state = app.getState();
  state.bonusOffers.activePlayMs = 180_000;
  state.bonusOffers.currentOffer = { id: 'speed-1', type: 'walk-speed' };
  app.setPaused(true); // The opt-in bonus modal pauses the simulation while its button is used.

  const first = await app.watchRewardedAd('bonus-offer', { offerId: 'speed-1', bonusType: 'walk-speed' });
  assert.equal(first.ok, true);
  assert.match(first.message, /5 dakika/);
  const firstExpiry = app.getState().bonusOffers.walkSpeedExpiresAt;
  assert.equal(app.getWalkSpeedMultiplier(firstExpiry - 1), 1.5);
  assert.equal(app.getWalkSpeedMultiplier(firstExpiry), 1);
  assert.equal(app.getState().speedMultiplier, 1, 'the bonus does not accelerate the simulation');
  const unboosted = new GameApplication(new SaveService(new MemoryStorage()), 1);
  unboosted.getState().player.x = -30;
  unboosted.getState().player.z = 0;
  unboosted.setPlayerMove({ x: 1, z: 0 }, 1);
  const boosted = new GameApplication(new SaveService(new MemoryStorage()), 1);
  boosted.getState().player.x = -30;
  boosted.getState().player.z = 0;
  boosted.getState().bonusOffers.walkSpeedExpiresAt = Date.now() + 10_000;
  boosted.setPlayerMove({ x: 1, z: 0 }, 1);
  assert.ok(Math.abs(boosted.getState().player.x + 18.75) < 0.01);
  assert.ok(Math.abs(unboosted.getState().player.x + 22.5) < 0.01);

  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.equal(loaded.getState().bonusOffers.walkSpeedExpiresAt, firstExpiry);
  assert.equal(loaded.getWalkSpeedMultiplier(firstExpiry - 1), 1.5);

  const nextState = app.getState();
  nextState.ads.recentCompletions = [];
  nextState.ads.lastStartedAt = Date.now() - 90_001;
  nextState.bonusOffers.currentOffer = { id: 'speed-2', type: 'walk-speed' };
  const second = await app.watchRewardedAd('bonus-offer', { offerId: 'speed-2', bonusType: 'walk-speed' });
  assert.equal(second.ok, true);
  assert.ok(app.getState().bonusOffers.walkSpeedExpiresAt >= firstExpiry + 299_000);
});

test('bag bonus adds one permanent slot up to twenty and failed ads grant nothing', async () => {
  const { app, storage } = makeAdApp();
  const state = app.getState();
  state.player.capacity = 19;
  state.stock.player.capacity = 19;
  state.bonusOffers.activePlayMs = 180_000;
  state.bonusOffers.currentOffer = { id: 'bag-19', type: 'bag-capacity' };
  app.setPaused(true);

  const granted = await app.watchRewardedAd('bonus-offer', { offerId: 'bag-19', bonusType: 'bag-capacity' });
  assert.equal(granted.ok, true);
  assert.equal(app.getState().player.capacity, 20);
  assert.equal(app.getState().stock.player.capacity, 20);
  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.equal(loaded.getState().player.capacity, 20);
  assert.equal(loaded.getState().stock.player.capacity, 20);

  const retry = app.getState();
  retry.ads.recentCompletions = [];
  retry.ads.lastStartedAt = Date.now() - 90_001;
  retry.bonusOffers.currentOffer = { id: 'bag-cap', type: 'bag-capacity' };
  assert.equal(app.canOfferRewardedAd('bonus-offer', { offerId: 'bag-cap', bonusType: 'bag-capacity' }), false);
  retry.bonusOffers.currentOffer = { id: 'failed-speed', type: 'walk-speed' };
  app.setPaused(false);

  const failed = makeAdApp(new FakeRewardedProvider('closed'));
  failed.app.getState().bonusOffers.activePlayMs = 180_000;
  failed.app.getState().bonusOffers.currentOffer = { id: 'failed-speed', type: 'walk-speed' };
  failed.app.setPaused(true);
  const closed = await failed.app.watchRewardedAd('bonus-offer', { offerId: 'failed-speed', bonusType: 'walk-speed' });
  assert.equal(closed.ok, false);
  assert.equal(failed.app.getState().bonusOffers.walkSpeedExpiresAt, 0);
  assert.equal(failed.app.getState().bonusOffers.currentOffer, null);
});

test('development bonus ads still obey daily and recent frequency limits', () => {
  const provider = new DevelopmentRewardedProvider(new AdMobRewardedProvider(null), true, 1);
  const app = new GameApplication(new SaveService(new MemoryStorage()), 1, new RewardedAdService(provider));
  app.getState().bonusOffers.activePlayMs = 180_000;
  app.getState().bonusOffers.currentOffer = { id: 'limited', type: 'walk-speed' };
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  app.getState().ads.dailyCounts[today] = { completed: 6, placements: {} };
  assert.equal(app.canOfferRewardedAd('bonus-offer', { offerId: 'limited', bonusType: 'walk-speed' }), false);
  app.getState().ads.dailyCounts[today].completed = 1;
  app.getState().ads.recentCompletions = [Date.now() - 1_000, Date.now() - 2_000];
  assert.equal(app.canOfferRewardedAd('bonus-offer', { offerId: 'limited', bonusType: 'walk-speed' }), false);
});

test('interrupted rewarded ads grant after reload only when AdMob returns a matching completion receipt', async () => {
  for (const completed of [true, false]) {
    const storage = new MemoryStorage();
    const interrupted = createInitialState(801);
    interrupted.ordersCompleted = 1;
    interrupted.lastOrderReward = { id: 'order:resume', reward: 19, item: 'TOMATO', quantity: 2, claimed: false };
    interrupted.ads.pending = {
      rewardId: `resume-${completed}`, placement: 'order-double', payload: { orderId: 'order:resume' },
      createdAt: Date.now(), started: true,
    };
    const initialBalance = interrupted.economy.balanceAtoms;
    new SaveService(storage).commit(interrupted, `interrupted-ad:${completed}`);
    const receipts = completed ? [{ rewardId: `resume-${completed}`, rewarded: true }] : [];
    const provider = new FakeRewardedProvider('idle', true, receipts);
    const app = new GameApplication(new SaveService(storage), 1, new RewardedAdService(provider));
    for (let index = 0; index < 4; index += 1) await Promise.resolve();

    assert.equal(app.getState().economy.balanceAtoms, initialBalance + (completed ? 190_000 : 0));
    assert.equal(app.getState().ads.pending, null);
    assert.equal(Boolean(app.getState().lastOrderReward.claimed), completed);
  }
});

test('failed and closed rewarded ads clear pending state without granting any reward', async () => {
  for (const mode of ['failed', 'closed']) {
    const { app } = makeAdApp(new FakeRewardedProvider(mode));
    app.getState().lastOrderReward = { id: 'order-' + mode, reward: 17, item: 'TOMATO', quantity: 1, claimed: false };
    const before = app.getBalance();

    const result = await app.watchRewardedAd('order-double', { orderId: 'order-' + mode });

    assert.equal(result.ok, false);
    assert.equal(app.getBalance(), before);
    assert.equal(app.getState().lastOrderReward.claimed, false);
    assert.equal(app.getState().ads.pending, null);
    assert.equal(app.getState().ads.grantedRewardIds.length, 0);
    assert.equal(app.getState().ads.events.some((event) => event.type === 'ad_failed'), true);
  }
});

test('not-ready ads cannot be started or rewarded', async () => {
  const { app, provider } = makeAdApp(new FakeRewardedProvider('complete', false));
  app.getState().lastOrderReward = { id: 'order-unready', reward: 17, item: 'TOMATO', quantity: 1, claimed: false };
  const before = app.getBalance();

  const result = await app.watchRewardedAd('order-double', { orderId: 'order-unready' });

  assert.equal(result.reason, 'ad-not-ready');
  assert.equal(provider.showCount, 0);
  assert.equal(app.getBalance(), before);
  assert.equal(app.getState().ads.pending, null);
});

test('second farm and staff hire use rewarded ads, never game cash', async () => {
  const { app, storage } = makeAdApp();
  const startBalance = app.getBalance();
  assert.equal(app.buyUpgrade('tomatoFarm2').reason, 'rewarded-ad-required');

  const farmResult = await app.watchRewardedAd('farm-unlock', { upgradeId: 'tomatoFarm2' });
  assert.equal(farmResult.ok, true);
  assert.ok(app.getState().farms.tomatoFarm2);
  assert.equal(app.getBalance(), startBalance);

  for (const [baseId, upgradeId, item, gate] of [
    ['orangeFarm', 'orangeFarm2', 'ORANGE', 'juiceSold'],
    ['cornFarm', 'cornFarm2', 'CORN', 'cornSold'],
    ['wheatFarm', 'wheatFarm2', 'WHEAT', 'eggSold'],
  ]) {
    app.getState().farms[baseId] ??= createFarmState(app.getState().tick, baseId);
    makeLocation(app.getState().stock, `farm:${item}`, 60);
    app.getState().stats[gate] = 1;
  }
  app.tick();
  for (const upgradeId of ['orangeFarm2', 'cornFarm2', 'wheatFarm2']) {
    app.getState().ads.lastStartedAt = Date.now() - 90_001;
    app.getState().ads.recentCompletions = [];
    assert.equal(app.canOfferRewardedAd('farm-unlock', { upgradeId }), true);
    assert.equal((await app.watchRewardedAd('farm-unlock', { upgradeId })).ok, true);
    assert.ok(app.getState().farms[upgradeId]);
    assert.equal(app.getBalance(), startBalance);
  }

  app.getState().availableUpgrades.push('cashier');
  app.getState().ads.lastStartedAt = Date.now() - 90_001;
  app.getState().ads.recentCompletions = [];
  const hireResult = await app.watchRewardedAd('staff-hire', { role: 'cashier' });
  assert.equal(hireResult.ok, true);
  assert.equal(getStaffCount(app.getState(), 'cashier'), 1);
  assert.equal(app.getBalance(), startBalance);
  assert.equal(app.getState().workers[0].upgradeLevel, 0);
  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.ok(loaded.getState().farms.tomatoFarm2);
  assert.equal(getStaffCount(loaded.getState(), 'cashier'), 1);
});

test('sponsored machine input grants only the missing recipe ingredients after a blocked interval', async () => {
  const { app } = makeAdApp();
  app.getState().stats.tomatoSold = 1;
  app.tick();
  assert.equal(app.buyUpgrade('paste').ok, true);
  for (let index = 0; index < 200; index += 1) app.tick();
  assert.equal(app.getState().machines.paste.blocked, 'missing-input');
  app.getState().stock.player.items.TOMATO = 1;
  assert.equal(reserveStock(app.getState(), {
    reservationId: 'supplier-inbound-tomato', from: 'player', to: 'machine:paste:input', item: 'TOMATO', quantity: 1,
  }).ok, true);
  assert.equal(app.canOfferRewardedAd('supplier-drop', { machineId: 'paste' }), true);

  const result = await app.watchRewardedAd('supplier-drop', { machineId: 'paste' });

  assert.equal(result.ok, true);
  assert.equal(quantityAt(app.getState().stock, 'machine:paste:input', 'TOMATO'), 1);
  const rewardEvent = app.getState().ads.events.find((event) => event.type === 'reward_granted' && event.placement === 'supplier-drop');
  assert.deepEqual(rewardEvent.details.inputs, { TOMATO: 1 });
  assert.equal(rewardEvent.details.machineId, 'paste');
});

test('machine upgrades keep timer progress, increase costs, stay bounded, and survive save/load', () => {
  const storage = new MemoryStorage();
  const app = makeApp(300);
  app.saveService = new SaveService(storage);
  app.debugCredit(50_000);
  const state = app.getState();
  state.machines.paste = {
    recipe: 'paste', progressTicks: 11.375, blocked: false, blockedTicks: 0,
    blockedSinceTick: null, upgradeLevel: 0, speedModifier: 1,
  };
  const originalProgress = state.machines.paste.progressTicks;
  const firstCost = machineUpgradeCost('paste', 0);
  assert.equal(app.upgradeMachine('paste').ok, true);
  assert.equal(app.getState().machines.paste.progressTicks, originalProgress);
  assert.ok(machineUpgradeCost('paste', 1) > firstCost);

  for (let index = 1; index < 10; index += 1) assert.equal(app.upgradeMachine('paste').ok, true);
  const upgraded = app.getState().machines.paste;
  assert.equal(upgraded.upgradeLevel, 10);
  assert.ok(machineProductionSeconds('paste', 10) < machineProductionSeconds('paste', 0));
  assert.ok(machineProductionSeconds('paste', 0) / machineProductionSeconds('paste', 10) < 2);
  assert.ok(machineSpeedMultiplier(10) <= 1.25);
  assert.ok(machineSpeedMultiplier(10_000) <= 1.25);
  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.equal(loaded.getState().machines.paste.upgradeLevel, 10);
  assert.equal(loaded.getState().machines.paste.speedModifier, machineSpeedMultiplier(10));
});

test('each worker has an independent money upgrade and a safe diminishing speed cap', () => {
  const storage = new MemoryStorage();
  const app = new GameApplication(new SaveService(storage), 1);
  app.debugCredit(10_000);
  app.getState().workers = [
    { id: 'worker-a', type: 'cashier', x: 0, z: 0, task: null, upgradeLevel: 0, speedModifier: 1 },
    { id: 'worker-b', type: 'cashier', x: 0, z: 1, task: null, upgradeLevel: 0, speedModifier: 1 },
  ];
  const state = app.getState();
  state.stock['farm:TOMATO'].items.TOMATO = 1;
  state.farms.tomatoFarm.plants[0].ready = true;
  state.farms.tomatoFarm.readyCount = 1;
  makeLocation(state.stock, 'worker:worker-a', 6);
  assert.equal(reserveStock(state, {
    reservationId: 'staff-upgrade-active-task', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1,
  }).ok, true);
  state.workers[0].task = {
    from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', reservationId: 'staff-upgrade-active-task',
    carrier: 'worker:worker-a', quantity: 1, phase: 'to-source', farmId: 'tomatoFarm',
  };
  const price0 = staffUpgradeCost('cashier', 0);
  assert.equal(app.upgradeStaff('worker-a').ok, true);
  assert.equal(app.getState().workers.find((worker) => worker.id === 'worker-a').upgradeLevel, 1);
  assert.equal(app.getState().workers.find((worker) => worker.id === 'worker-b').upgradeLevel, 0);
  app.tick();
  const movingWorker = app.getState().workers.find((worker) => worker.id === 'worker-a');
  assert.ok(Math.hypot(movingWorker.x, movingWorker.z) > 0.34, 'the upgraded worker uses its new speed while a task is active');
  assert.ok(staffUpgradeCost('cashier', 1) > price0);
  assert.ok(staffSpeedMultiplier(1) > 1);
  assert.ok(staffSpeedMultiplier(10_000) <= 1.2);
  const loaded = new GameApplication(new SaveService(storage), 1);
  assert.equal(loaded.getState().workers.find((worker) => worker.id === 'worker-a').upgradeLevel, 1);
  assert.equal(loaded.getState().workers.find((worker) => worker.id === 'worker-b').upgradeLevel, 0);
});

test('a second farm keeps separate plant timers and ripe counts', () => {
  const state = createInitialState(303);
  state.farms.tomatoFarm2 = createFarmState(0, 'tomatoFarm2');
  for (let tick = 0; tick < 45; tick += 1) {
    advanceSimulation(state);
    state.tick += 1;
  }
  assert.equal(state.farms.tomatoFarm.readyCount, 1);
  assert.equal(state.farms.tomatoFarm2.readyCount, 0);
  for (let tick = 0; tick < 7; tick += 1) {
    advanceSimulation(state);
    state.tick += 1;
  }
  assert.equal(state.farms.tomatoFarm.readyCount, 1);
  assert.equal(state.farms.tomatoFarm2.readyCount, 1);
  assert.notDeepEqual(state.farms.tomatoFarm.plants.map((plant) => plant.nextReadyTick),
    state.farms.tomatoFarm2.plants.map((plant) => plant.nextReadyTick));
});

test('machine upgrades reject insufficient balance and can be bought repeatedly without state corruption', () => {
  const app = makeApp(304);
  app.getState().machines.paste = { recipe: 'paste', progressTicks: 0, upgradeLevel: 0, speedModifier: 1 };
  app.getState().economy.balanceAtoms = 0;
  assert.equal(app.upgradeMachine('paste').reason, 'insufficient-funds');
  assert.equal(app.getState().machines.paste.upgradeLevel, 0);
});

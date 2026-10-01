import test from 'node:test';
import assert from 'node:assert/strict';
import { ITEMS, IMPORTED_SHELVES, PROCUREMENT_CATALOG, MONEY_ATOMS, SHELVES, STATIONS, UPGRADES, STAFF_HIRES, staffDailySalaryAtoms } from '../src/domain/catalog.js';
import { createInitialState, hydrateState, SAVE_VERSION } from '../src/domain/state.js';
import { ZONES, STATION_FOOTPRINTS, stationZone, isStationUnlocked, canPlaceStation, getShelfLocations } from '../src/domain/layout.js';

const imports = ['COLA', 'SODA', 'CHIPS', 'BISCUIT', 'CHOCOLATE', 'CANNED_FISH', 'DETERGENT', 'SHAMPOO'];

test('wholesale cases cover farm and imported catalogue with modest positive resale margins', () => {
  assert.deepEqual(Object.keys(PROCUREMENT_CATALOG).sort(), Object.keys(ITEMS).sort());
  assert.equal(Object.keys(ITEMS).length, 22);
  for (const [item, entry] of Object.entries(PROCUREMENT_CATALOG)) {
    assert.equal(entry.item, item);
    assert.equal(entry.caseSize, 6);
    assert.equal(entry.unitCostAtoms, Math.round(ITEMS[item].price * MONEY_ATOMS * 0.82));
    assert.ok(entry.unitCostAtoms > 0 && entry.unitCostAtoms < ITEMS[item].price * MONEY_ATOMS);
    assert.ok(['farm', 'food', 'drinks', 'care'].includes(entry.category));
    if (!ITEMS[item].imported) assert.equal(entry.category, 'farm');
  }
});

test('imported merchandise is locked until shelf purchase and has safe market furniture positions', () => {
  const state = createInitialState();
  assert.deepEqual(Object.keys(IMPORTED_SHELVES).sort(), imports.sort());
  for (const item of imports) {
    const shelf = IMPORTED_SHELVES[item];
    assert.equal(ITEMS[item].imported, true);
    assert.equal(shelf.item, item);
    assert.equal(STATIONS[shelf.stationId].kind, 'shelf');
    assert.equal(STATIONS[shelf.stationId].item, item);
    assert.ok(['gondola', 'cooler'].includes(shelf.displayType));
    assert.equal(shelf.price, shelf.displayType === 'cooler' ? 120 : 80);
    assert.equal(isStationUnlocked(state, shelf.stationId), false);
    assert.deepEqual(getShelfLocations(state, item), []);
    assert.deepEqual(state.stock[SHELVES[item].id].items, {});
  }
  state.unlockedProducts = Object.keys(ITEMS);
  for (const shelf of Object.values(IMPORTED_SHELVES)) {
    const station = STATIONS[shelf.stationId];
    assert.equal(canPlaceStation(state, shelf.stationId, station.x, station.z), true, `${shelf.stationId} must fit existing shelf footprints`);
    assert.equal(getShelfLocations(state, shelf.item)[0].stockId, SHELVES[shelf.item].id);
  }
});

test('logistics stations require the office unlock and stay in the east layout zone', () => {
  const state = createInitialState();
  assert.deepEqual(ZONES.logistics, { minX: 14.5, maxX: 26.5, minZ: -8, maxZ: 8 });
  const upgrade = UPGRADES.find(entry => entry.id === 'logisticsOffice');
  assert.equal(upgrade.price, 650);
  assert.deepEqual(upgrade.unlocks, ['managerOffice', 'loadingDock', 'warehouse']);
  for (const id of upgrade.unlocks) {
    assert.equal(stationZone(id), 'logistics');
    assert.equal(isStationUnlocked(state, id), false);
    assert.ok(STATION_FOOTPRINTS[id].width > 0);
    state.unlocked[id] = true;
  }
  for (const id of upgrade.unlocks) {
    assert.equal(canPlaceStation(state, id, STATIONS[id].x, STATIONS[id].z), true);
    assert.equal(canPlaceStation(state, id, 5, 0), false);
  }
  assert.equal(canPlaceStation(state, 'managerOffice', STATIONS.loadingDock.x, STATIONS.loadingDock.z), false);
  assert.equal(STATIONS.loadingDock.x, 16.5);
  assert.equal(STATIONS.managerOffice.x, 22);
});

test('warehouse operator and store manager reuse the candidate salary catalogue', () => {
  for (const role of ['warehouseOperator', 'storeManager']) {
    assert.deepEqual(STAFF_HIRES.find(hire => hire.upgradeId === role).staffTypes, [role]);
    assert.ok(staffDailySalaryAtoms(role) > 0);
  }
});

test('version 10 saves migrate empty logistics without altering wallet, workers or existing cargo', () => {
  const old = createInitialState();
  old.saveVersion = 10;
  old.stock.player.items.TOMATO = 2;
  old.workers.push({ id: 'worker-old', type: 'harvester', x: -10, z: 7, energy: 37, salaryAtoms: 60_000, task: null });
  delete old.procurement;
  delete old.stock['dock:incoming'];
  delete old.stock['warehouse:main'];
  for (const item of imports) delete old.stock[`shelf:${item}`];
  const migrated = hydrateState(old);
  assert.equal(SAVE_VERSION, 11);
  assert.equal(migrated.saveVersion, 11);
  assert.equal(migrated.economy.balanceAtoms, old.economy.balanceAtoms);
  assert.equal(migrated.stock.player.items.TOMATO, 2);
  assert.equal(migrated.workers[0].energy, 37);
  assert.equal(migrated.workers[0].salaryAtoms, 60_000);
  assert.deepEqual(migrated.procurement, { nextOrderId: 1, orders: [], delivery: null,
    automation: { enabled: false, threshold: 2, items: [] }, nextAutoTick: 0 });
  assert.equal(migrated.stock['dock:incoming'].capacity, 240);
  assert.equal(migrated.stock['warehouse:main'].capacity, 500);
  assert.equal(isStationUnlocked(migrated, 'loadingDock'), false);
});

test('logistics saves preserve delivered stock and an unloading receipt across reload', () => {
  const state = createInitialState();
  state.unlocked.loadingDock = true;
  state.procurement.orders.push({ id: 'procurement-1', lines: [{ item: 'COLA', cases: 1, quantity: 6, unitCostAtoms: 65_600 }],
    totalAtoms: 393_600, status: 'unloading', createdTick: 0 });
  state.procurement.nextOrderId = 2;
  state.procurement.delivery = { orderId: 'procurement-1', phase: 'unloading', phaseStartTick: 12, cargoReleased: true };
  state.stock['dock:incoming'].items.COLA = 6;
  const saved = structuredClone(state);
  const hydrated = hydrateState(saved);
  assert.deepEqual(hydrated.procurement.orders, state.procurement.orders);
  assert.deepEqual(hydrated.procurement.delivery, state.procurement.delivery);
  assert.equal(hydrated.stock['dock:incoming'].items.COLA, 6);
  assert.notEqual(hydrated.procurement, saved.procurement);
});

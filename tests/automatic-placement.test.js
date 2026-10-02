import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, hydrateState } from '../src/domain/state.js';
import { STATIONS, MONEY_ATOMS } from '../src/domain/catalog.js';
import { nextStationPlacement, placeNewStation, pendingPlacementIds, stationPosition, canPlaceAccessibleStation } from '../src/domain/layout.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
const blockMarket = state => {
  state.decorations = [];
  for (let x = -3.5; x <= 13.5; x += 1) for (let z = -8.5; z <= 8.5; z += 1) {
    state.decorations.push({ id: `block:${x}:${z}`, type: 'cardboardBoxes', x, z });
  }
};

test('new shelf uses its catalogue position before delivery staging', () => {
  const state = createInitialState(91);
  state.unlockedProducts.push('TOMATO_PASTE');
  const expected = { x: STATIONS.pasteShelf.x, z: STATIONS.pasteShelf.z };
  assert.deepEqual(nextStationPlacement(state, 'pasteShelf'), expected);
  assert.equal(placeNewStation(state, 'pasteShelf'), true);
  assert.deepEqual(state.layout.pasteShelf, expected);
  assert.deepEqual(pendingPlacementIds(state), []);
});

test('occupied default finds a deterministic accessible grid position without moving existing fixtures', () => {
  const state = createInitialState(91);
  state.unlockedProducts.push('TOMATO_PASTE');
  state.decorations.push({ id: 'blocking-box', type: 'cardboardBoxes', x: STATIONS.pasteShelf.x, z: STATIONS.pasteShelf.z });
  const before = structuredClone(state.layout);
  const a = nextStationPlacement(state, 'pasteShelf');
  assert.ok(a);
  assert.notDeepEqual(a, { x: STATIONS.pasteShelf.x, z: STATIONS.pasteShelf.z });
  assert.deepEqual(nextStationPlacement(state, 'pasteShelf'), a);
  assert.equal(canPlaceAccessibleStation(state, 'pasteShelf', a.x, a.z), true);
  assert.deepEqual(state.layout, before);
});

test('full area keeps an unplaced shelf in a durable queue; freeing space places it once', () => {
  const state = createInitialState(91);
  state.unlockedProducts.push('TOMATO_PASTE'); blockMarket(state);
  assert.equal(placeNewStation(state, 'pasteShelf'), false);
  assert.equal(placeNewStation(state, 'pasteShelf'), false);
  assert.equal(stationPosition(state, 'pasteShelf'), null);
  assert.deepEqual(pendingPlacementIds(state), ['pasteShelf']);
  const restored = hydrateState(state);
  assert.deepEqual(pendingPlacementIds(restored), ['pasteShelf']);
  restored.decorations = [];
  assert.equal(placeNewStation(restored, 'pasteShelf'), true);
  const placed = structuredClone(restored.layout.pasteShelf);
  assert.equal(placeNewStation(restored, 'pasteShelf'), true);
  assert.deepEqual(restored.layout.pasteShelf, placed);
  assert.deepEqual(pendingPlacementIds(restored), []);
});

test('old pending shelf queue migrates through the same placement helper', () => {
  const state = createInitialState(91);
  state.unlockedProducts.push('TOMATO_PASTE'); state.pendingShelfIds = ['pasteShelf'];
  assert.equal(placeNewStation(state, 'pasteShelf'), true);
  assert.deepEqual(pendingPlacementIds(state), []);
});

test('normal upgrade places its machine and shelf separately; repeated purchase cannot duplicate', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.state.availableUpgrades = ['paste']; app.state.economy.balanceAtoms = 1000 * MONEY_ATOMS;
  assert.equal(app.buyUpgrade('paste').ok, true);
  assert.ok(stationPosition(app.state, 'paste'));
  assert.ok(stationPosition(app.state, 'pasteShelf'));
  assert.equal(pendingPlacementIds(app.state).length, 0);
  const balance = app.state.economy.balanceAtoms;
  assert.equal(app.buyUpgrade('paste').ok, false);
  assert.equal(app.state.economy.balanceAtoms, balance);
});

test('pending machines survive save hydration and cannot rotate into an occupied default', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.state.machines.paste = { recipe: 'paste', progressTicks: 0 };
  app.state.pendingStationIds = ['paste']; delete app.state.layout.paste;
  assert.equal(stationPosition(app.state, 'paste'), null);
  assert.equal(app.rotateSelected('paste').ok, false);
  assert.deepEqual(hydrateState(app.state).pendingStationIds, ['paste']);
});

test('manual placement removes a queued shelf without charging or losing its stock', () => {
  const app = new GameApplication(new SaveService(new MemoryStorage()));
  app.state.unlockedProducts.push('TOMATO_PASTE');
  app.state.pendingStationIds = ['pasteShelf'];
  app.state.stock['shelf:TOMATO_PASTE'] = { capacity: 6, items: { TOMATO_PASTE: 2 }, reserved: {}, reservedCapacity: 0 };
  const balance = app.state.economy.balanceAtoms;
  assert.equal(app.moveStation('pasteShelf', 3, 2).ok, false);
  assert.equal(app.moveStation('pasteShelf', 7.5, 2).ok, true);
  assert.deepEqual(pendingPlacementIds(app.state), []);
  assert.equal(app.state.economy.balanceAtoms, balance);
  assert.equal(app.state.stock['shelf:TOMATO_PASTE'].items.TOMATO_PASTE, 2);
});

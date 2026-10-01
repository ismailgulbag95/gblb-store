import test from 'node:test';
import assert from 'node:assert/strict';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';
import { canPlaceStation, stationPosition } from '../src/domain/layout.js';
import { hydrateState } from '../src/domain/state.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

function makeApp() {
  return new GameApplication(new SaveService(new MemoryStorage()));
}

test('moveStation moves tomato shelf to a valid snapped coordinate in market zone', () => {
  const app = makeApp();
  const initialPos = stationPosition(app.getState(), 'tomatoShelf');
  assert.ok(initialPos);

  // Valid location inside market zone (x: 1, z: 2)
  const result = app.moveStation('tomatoShelf', 1, 2);
  assert.equal(result.ok, true);

  const updatedPos = stationPosition(app.getState(), 'tomatoShelf');
  assert.equal(updatedPos.x, 1);
  assert.equal(updatedPos.z, 2);
  assert.equal(app.getState().layout.tomatoShelf.x, 1);
  assert.equal(app.getState().layout.tomatoShelf.z, 2);
});

test('moveStation rejects out-of-zone and overlapping coordinates', () => {
  const app = makeApp();

  // Out of market zone (far west x: -30 is farm/restaurant)
  const outOfZone = app.moveStation('tomatoShelf', -30, 2);
  assert.equal(outOfZone.ok, false);
  assert.equal(outOfZone.reason, 'invalid-placement');

  // Overlapping with register at (x: 5, z: -4)
  const overlap = app.moveStation('tomatoShelf', 5, -4);
  assert.equal(overlap.ok, false);
  assert.equal(overlap.reason, 'invalid-placement');
});

test('rotateSelected rotates station by 90 degrees', () => {
  const app = makeApp();
  const result = app.rotateSelected('tomatoShelf');
  assert.equal(result.ok, true);
  assert.equal(result.rotation, Math.PI / 2);
  assert.equal(app.getState().layout.tomatoShelf.rotation, Math.PI / 2);

  const result2 = app.rotateSelected('tomatoShelf');
  assert.equal(result2.ok, true);
  assert.equal(result2.rotation, Math.PI);
});

test('moved and rotated station positions survive hydration / save-load', () => {
  const app = makeApp();
  app.moveStation('tomatoShelf', 2, 4);
  app.rotateSelected('tomatoShelf');

  const savedState = app.getState();
  const reloaded = hydrateState(savedState);

  assert.equal(reloaded.layout.tomatoShelf.x, 2);
  assert.equal(reloaded.layout.tomatoShelf.z, 4);
  assert.equal(reloaded.layout.tomatoShelf.rotation, Math.PI / 2);

  const pos = stationPosition(reloaded, 'tomatoShelf');
  assert.equal(pos.x, 2);
  assert.equal(pos.z, 4);
});

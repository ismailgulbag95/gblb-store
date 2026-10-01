import test from 'node:test';
import assert from 'node:assert/strict';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';
import { quantityAt } from '../src/domain/inventory.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

function makeApp() {
  return new GameApplication(new SaveService(new MemoryStorage()));
}

test('autoPickup setting defaults to true and can be toggled via setSetting', () => {
  const app = makeApp();
  assert.equal(app.getState().settings.autoPickup, true);

  app.setSetting('autoPickup', false);
  assert.equal(app.getState().settings.autoPickup, false);

  app.setSetting('autoPickup', true);
  assert.equal(app.getState().settings.autoPickup, true);
});

test('tryAutoPickup collects ripe harvest when enabled and ignores when disabled', () => {
  const app = makeApp();
  // Move player right onto tomatoFarm (x: -10, z: 5)
  app.state.player.x = -10;
  app.state.player.z = 5;
  app.state.farms.tomatoFarm.readyCount = 4;
  app.state.stock['farm:TOMATO'].items.TOMATO = 4;

  // With autoPickup: false, it does not pick up
  app.setSetting('autoPickup', false);
  const disabledResult = app.tryAutoPickup();
  assert.equal(disabledResult, null);
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 0);

  // With autoPickup: true, it collects ripe tomatoes into player stock
  app.setSetting('autoPickup', true);
  const enabledResult = app.tryAutoPickup();
  assert.ok(enabledResult);
  assert.equal(enabledResult.ok, true);
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 4);
  assert.equal(app.getState().farms.tomatoFarm.readyCount, 0);
});

test('tryAutoPickup does not steal items from shelves when player has 0 items', () => {
  const app = makeApp();
  // Move player near tomato shelf (x: 3, z: 2)
  app.state.player.x = 3;
  app.state.player.z = 2;
  app.state.stock['shelf:TOMATO'].items.TOMATO = 5;
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 0);

  const result = app.tryAutoPickup();
  assert.equal(result, null);
  assert.equal(quantityAt(app.getState().stock, 'player', 'TOMATO'), 0);
  assert.equal(quantityAt(app.getState().stock, 'shelf:TOMATO', 'TOMATO'), 5);
});

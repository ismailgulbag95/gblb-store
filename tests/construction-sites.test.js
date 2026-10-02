import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ConstructionSites, CONSTRUCTION_SITES, constructionStatus, constructionPlotOccupied } from '../src/environment/ConstructionSites.js';
import { createInitialState, hydrateState } from '../src/domain/state.js';

const restaurant = CONSTRUCTION_SITES.find(site => site.id === 'restaurant');

test('screens yield to manually moved fixtures and decorations', () => {
  const state = createInitialState();
  assert.equal(constructionPlotOccupied(state, restaurant), false);
  state.layout.tomatoFarm = { x: restaurant.x, z: restaurant.z };
  assert.equal(constructionPlotOccupied(state, restaurant), true);
  const sites = new ConstructionSites(new THREE.Scene()); sites.sync(state, 0.016);
  assert.equal(sites.entries.find(entry => entry.site.id === 'restaurant').group.visible, false);
});

test('construction follows existing availability and waits for actual placement', () => {
  const state = createInitialState();
  assert.equal(constructionStatus(state, restaurant), 'locked');
  state.availableUpgrades.push('restaurant');
  assert.equal(constructionStatus(state, restaurant), 'ready');
  state.completedUpgrades.push('restaurant'); state.unlocked.restaurant = true;
  state.pendingStationIds.push('pizzaKitchen'); delete state.layout.pizzaKitchen;
  assert.equal(constructionStatus(state, restaurant), 'waiting');
  state.layout.pizzaKitchen = { x: -37, z: 0 }; state.layout.burgerKitchen = { x: -37, z: 4 };
  assert.equal(constructionStatus(state, restaurant), 'open');
});

test('restored open sites do not celebrate again', () => {
  const state = createInitialState();
  state.completedUpgrades.push('logisticsOffice'); state.unlocked.managerOffice = true;
  const restored = hydrateState(state);
  const sites = new ConstructionSites(new THREE.Scene());
  sites.sync(restored, 0.016);
  const entry = sites.entries.find(entry => entry.site.id === 'logisticsOffice');
  assert.equal(entry.status, 'open'); assert.equal(entry.group.visible, false);
  assert.equal(entry.particles, null);
});

test('opening effect is bounded and only runs on the closed-to-open transition', () => {
  const state = createInitialState(); const scene = new THREE.Scene();
  const sites = new ConstructionSites(scene); sites.sync(state, 0.016);
  state.unlocked.managerOffice = true;
  sites.sync(state, 0.016);
  const entry = sites.entries.find(entry => entry.site.id === 'logisticsOffice');
  assert.equal(entry.particles.children.length, 18);
  for (let i = 0; i < 20; i++) sites.sync(state, 0.1);
  assert.equal(entry.particles, null); assert.equal(entry.group.visible, false);
  sites.sync(state, 0.016); assert.equal(entry.particles, null);
  assert.equal(scene.children.filter(group => group.name.startsWith('construction:')).length, CONSTRUCTION_SITES.length);
});

test('only pizza and warehouse destinations have discovery screens', () => {
  assert.deepEqual(CONSTRUCTION_SITES.map(site => site.id), ['restaurant', 'logisticsOffice']);
});

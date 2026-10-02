import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { AmbientLife, birdIsStartled } from '../src/environment/AmbientLife.js';
import { addContactShadow } from '../src/presentation/ContactShadow.js';
import { customerHasPaid, customerExpression } from '../src/presentation/CustomerExpressions.js';
import { updateShelfFeedback } from '../src/presentation/ShelfFeedback.js';
import { createProductionAtmosphere } from '../src/presentation/ProductionAtmosphere.js';
import { createInitialState } from '../src/domain/state.js';
import { LightingManager } from '../src/presentation/LightingManager.js';
import { createCustomerMesh } from '../src/presentation/HumanoidFactory.js';
import { CharacterAnimator } from '../src/presentation/CharacterAnimator.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';

test('contact shadow is soft, shared and owned by its movable parent', () => {
  const first = new THREE.Group(), second = new THREE.Group();
  const a = addContactShadow(first), b = addContactShadow(second);
  assert.equal(addContactShadow(first), a); assert.equal(first.children.length, 1);
  assert.equal(a.geometry, b.geometry); assert.equal(a.material, b.material);
  assert.equal(a.material.depthWrite, false); assert.equal(a.geometry.userData.sharedAsset, true);
  const pixels = a.material.map.image.data;
  assert.equal(pixels[3], 0); assert.ok(pixels[(16 * 32 + 16) * 4 + 3] > 220);
  first.position.set(4, 0, -2); first.updateMatrixWorld(true);
  const world = a.getWorldPosition(new THREE.Vector3()); assert.equal(world.x, 4); assert.equal(world.z, -2);
});

test('birds react to actual nearby actors, land and freeze while paused', () => {
  assert.equal(birdIsStartled({ x: 0, z: 0 }, { x: 3, z: 0 }, [{ x: 1, z: 0 }]), true);
  const life = new AmbientLife(new THREE.Scene()), state = createInitialState();
  const bird = life.birds[0]; state.player.x = bird.x; state.player.z = bird.z;
  life.update(state, 0.1, 1); assert.equal(bird.phase, 'flying');
  const position = bird.group.position.clone(); state.paused = true;
  for (let i = 0; i < 30; i++) life.update(state, 0.1, 1);
  assert.deepEqual(bird.group.position, position);
  state.paused = false; state.player.x = 20; state.player.z = 20;
  for (let i = 0; i < 60; i++) life.update(state, 0.1, 1);
  assert.equal(bird.phase, 'ground'); assert.equal(bird.group.position.y, 0);
  assert.equal(bird.shadow.visible, true);
});

test('ecology has a fixed object budget and respects day/night and reduced motion', () => {
  const life = new AmbientLife(new THREE.Scene()), state = createInitialState();
  let count = 0; life.group.traverse(() => count++);
  for (let i = 0; i < 600; i++) life.update(state, 0.016, 1);
  let after = 0; life.group.traverse(() => after++); assert.equal(after, count);
  life.update(state, 0.1, 0); assert.equal(life.insects[0].glow.visible, true);
  const time = life.time; life.update(state, 0.1, 1, true); assert.equal(life.time, time);
  assert.equal(life.insects[0].wings[0].visible, true);
});

test('paper bags require paid inventory and expressions reflect successful shopping or waiting', () => {
  const customer = { kind: 'shopper', phase: 'leaving', basket: ['TOMATO'] };
  assert.equal(customerHasPaid(customer, { TOMATO: 1 }), false);
  assert.equal(customerHasPaid(customer, {}), true);
  assert.equal(customerHasPaid({ ...customer, basket: [] }, {}), false);
  assert.equal(customerExpression({ phase: 'queueing', checkoutWaitTicks: 31 }), 'waiting');
  assert.equal(customerExpression({ phase: 'waiting-stock' }), 'missing');
  assert.equal(customerExpression({}, { type: 'shop', elapsed: 1.5 }), 'happy');
});

test('paid customer rigs replace carried stock with bags and pause their expressions', () => {
  const factory = new Item3DFactory();
  const customer = { id: 'paid-actor', kind: 'shopper', archetype: 'shopperBasket', x: 0, z: 0, phase: 'queueing', basket: ['TOMATO'] };
  const actor = createCustomerMesh(customer, null, factory);
  const animator = new CharacterAnimator(actor, factory, 'customer');
  animator.update(customer, 0.016, { paid: false });
  assert.ok(actor.cargo[0].visible); assert.ok(actor.shoppingBags.every(bag => !bag.visible));
  customer.phase = 'leaving'; animator.update(customer, 0.016, { paid: true });
  assert.ok(actor.shoppingBags.every(bag => bag.visible)); assert.ok(actor.cargo.every(mesh => !mesh.visible));
  const eyes = animator.eyes.map(eye => eye.scale.y);
  animator.update(customer, 0, { paid: true }); assert.deepEqual(animator.eyes.map(eye => eye.scale.y), eyes);
  animator.update(customer, 0.016, { paid: true, reducedMotion: true });
  assert.ok(animator.eyes.every(eye => eye.scale.y === 1));
});

test('shelf feedback skips initial hydration, fires once at full stock and settles', () => {
  const shelf = { group: new THREE.Group() };
  assert.equal(updateShelfFeedback(shelf, 8, 8, 0.016, 0, false, false), false);
  updateShelfFeedback(shelf, 3, 8, 0.016, 0, false, false);
  assert.equal(updateShelfFeedback(shelf, 8, 8, 0.016, 0, false, false), true);
  assert.equal(updateShelfFeedback(shelf, 8, 8, 0.016, 0, false, false), false);
  for (let i = 0; i < 30; i++) updateShelfFeedback(shelf, 8, 8, 0.016, 0, false, false);
  assert.equal(shelf.group.scale.y, 1);
  updateShelfFeedback(shelf, 0, 8, 0.016, 0, false, true);
  assert.equal(updateShelfFeedback(shelf, 8, 8, 0.016, 0, false, true), false);
});

test('production puffs follow working state and reuse their resources', () => {
  const group = new THREE.Group(), atmosphere = createProductionAtmosphere(group, 'bakery');
  const resources = atmosphere.puffs.map(puff => [puff.geometry, puff.material]);
  for (let i = 0; i < 500; i++) atmosphere.update(i * 0.016, true);
  assert.equal(group.children.length, 4); assert.ok(atmosphere.puffs.every(puff => puff.visible));
  atmosphere.puffs.forEach((puff, i) => { assert.equal(puff.geometry, resources[i][0]); assert.equal(puff.material, resources[i][1]); });
  atmosphere.update(9, false); assert.ok(atmosphere.puffs.every(puff => !puff.visible));
});

test('rim lighting preserves one shadow casting light and dims at night', () => {
  const scene = new THREE.Scene(), lighting = new LightingManager(scene);
  assert.equal(scene.children.filter(light => light.isLight && light.castShadow).length, 1);
  lighting.updateDaylight(() => 1, 0, THREE); const day = lighting.rimLight.intensity;
  lighting.updateDaylight(() => 0, 0, THREE); assert.ok(lighting.rimLight.intensity < day);
});

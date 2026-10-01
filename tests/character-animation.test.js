import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCustomerMesh, createWorkerMesh } from '../src/presentation/HumanoidFactory.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { CharacterAnimator } from '../src/presentation/CharacterAnimator.js';

const factory = new Item3DFactory();
function fixture(kind = 'customer', id = 'actor-a') {
  const entity = { id, kind: 'shopper', x: 0, z: 0, facing: 0, phase: 'queueing', basket: [] };
  const actor = kind === 'customer'
    ? createCustomerMesh({ ...entity, archetype: 'shopperBasket' }, null, factory)
    : createWorkerMesh('stockClerk', factory);
  const animation = new CharacterAnimator(actor, factory, kind);
  const context = { items: {}, resolveTarget: () => ({ point: new THREE.Vector3(0, 0.75, 0.52) }) };
  animation.update(entity, 1 / 60, context);
  return { entity, actor, animation, context };
}
function frames(f, seconds) {
  for (let n = 0; n < Math.ceil(seconds * 60); n++) f.animation.update(f.entity, 1 / 60, f.context);
}
function cue(f, type, extra = {}) {
  f.entity.animationCues = [{ id: `cue-${type}`, type, item: 'TOMATO', x: 0, z: 0, location: 'shelf:TOMATO', ...extra }];
}

test('queued and blocked customers stand still; stride phase advances by distance', () => {
  const f = fixture();
  frames(f, 1);
  const phase = f.actor.walkCycle;
  f.entity.phase = 'to-shelf';
  f.entity.routeBlocked = true;
  frames(f, 1);
  assert.equal(f.actor.walkCycle, phase);
  assert.ok(Math.abs(f.actor.legs[0].rotation.x) < 0.01);
  f.entity.routeBlocked = false;
  f.entity.z = 0.36;
  frames(f, 0.15);
  assert.ok(f.actor.group.position.z > 0);
  assert.ok(f.actor.walkCycle > phase);
  frames(f, 1);
  const stopped = f.actor.walkCycle;
  frames(f, 1);
  assert.equal(f.actor.walkCycle, stopped);
});

test('turning crosses the angle wrap smoothly and large frame gaps stay finite', () => {
  const f = fixture();
  f.actor.group.rotation.y = Math.PI - 0.02;
  f.entity.facing = -Math.PI + 0.02;
  f.animation.update(f.entity, 1 / 60, f.context);
  assert.ok(Math.abs(f.actor.group.rotation.y - (Math.PI - 0.02)) < 0.04);
  f.animation.update(f.entity, 3, f.context);
  assert.ok(Number.isFinite(f.actor.group.position.y));
  assert.ok(Math.abs(f.actor.legs[0].rotation.x) < 0.8);
});

test('shop pickup uses one mesh from shelf through hand to basket, then releases action', () => {
  const f = fixture();
  f.entity.basket = ['TOMATO'];
  cue(f, 'shop', { basketIndex: 0 });
  frames(f, 0.85);
  assert.equal(f.actor.cargo[0].visible, false);
  assert.equal(f.actor.inspectMesh.visible, true);
  frames(f, 0.45);
  assert.equal(f.actor.inspectMesh.parent, f.actor.wrists[0]);
  frames(f, 2);
  assert.equal(f.actor.inspectMesh.visible, false);
  assert.equal(f.actor.cargo[0].visible, true);
  assert.equal(f.animation.action, null);
  assert.equal(f.animation.pending.length, 0);
});

test('cancelling a committed pickup settles its mesh in the basket without replay', () => {
  const f = fixture();
  f.entity.basket = ['TOMATO'];
  cue(f, 'shop', { basketIndex: 0 });
  frames(f, 1.2);
  f.animation.cancel();
  assert.equal(f.actor.inspectMesh.visible, false);
  assert.equal(f.actor.cargo[0].visible, true);
  frames(f, 2);
  assert.equal(f.animation.action, null);
});

test('staff restock conceals destination until hand contact, then faces and scans once', () => {
  const f = fixture('worker');
  const shelfProduct = new THREE.Mesh();
  shelfProduct.visible = true;
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.72, 0.5), mesh: shelfProduct });
  cue(f, 'deliver', { shelf: true });
  frames(f, 0.3);
  assert.equal(shelfProduct.visible, false);
  assert.equal(f.actor.cargo.visible, true);
  frames(f, 1);
  assert.equal(shelfProduct.visible, true);
  frames(f, 2);
  assert.equal(f.animation.action, null);
  assert.equal(f.actor.cargo.visible, false);
  assert.equal(f.actor.propObjects.terminal.visible, false);
  assert.ok(Math.abs(f.actor.group.position.y) < 0.03);
});

test('task cancellation restores concealed products and leaves no floating cargo', () => {
  const f = fixture('worker');
  const shelfProduct = new THREE.Mesh();
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.7, 0.5), mesh: shelfProduct });
  cue(f, 'deliver', { shelf: true });
  frames(f, 0.2);
  f.animation.dispose();
  assert.equal(shelfProduct.visible, true);
  assert.equal(f.actor.cargo.visible, false);
  assert.equal(f.actor.cargo.parent, f.actor.group);
  assert.equal(f.animation.pending.length, 0);
});

test('idle staff do not stock shelves or carry phantom boxes', () => {
  const f = fixture('worker');
  frames(f, 3);
  assert.equal(f.actor.cargo.visible, false);
  assert.equal(f.actor.propObjects.box.visible, false);
  assert.ok(Math.abs(f.actor.arms[0].rotation.x) < 0.1);
});

test('articulated hands reach reachable targets for adults and children', () => {
  for (const archetype of ['shopperBasket', 'child']) {
    const actor = createCustomerMesh({ id: archetype, kind: 'shopper', archetype }, null, factory);
    const animation = new CharacterAnimator(actor, factory, 'customer');
    const target = new THREE.Vector3(-0.15, 0.78, 0.32).multiplyScalar(actor.group.scale.x);
    animation.reach(0, target, 1);
    actor.group.updateMatrixWorld(true);
    assert.ok(actor.wrists[0].getWorldPosition(new THREE.Vector3()).distanceTo(target) < 0.035);
  }
});

test('characters have independent breathing timing and dispose their actions', () => {
  const a = fixture('customer', 'a');
  const b = fixture('customer', 'b');
  frames(a, 1);
  frames(b, 1);
  assert.notEqual(a.actor.head.rotation.y, b.actor.head.rotation.y);
  a.animation.dispose();
  a.animation.update(a.entity, 0.1, a.context);
  assert.equal(a.animation.action, null);
});

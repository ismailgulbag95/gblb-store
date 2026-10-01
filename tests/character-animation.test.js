import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createCustomerMesh, createWorkerMesh } from '../src/presentation/HumanoidFactory.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { CharacterAnimator } from '../src/presentation/CharacterAnimator.js';
import { createInitialState } from '../src/domain/state.js';
import { advanceSimulation } from '../src/domain/simulation.js';
import { makeLocation, reserveStock } from '../src/domain/inventory.js';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';

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

test('pausing an interaction freezes the wrist and product; one receipt never replays', () => {
  const f = fixture();
  f.entity.basket = ['TOMATO'];
  cue(f, 'shop', { basketIndex: 0 });
  frames(f, 1.2);
  const rotation = f.actor.wrists[0].quaternion.clone();
  const time = f.animation.action.elapsed;
  f.animation.update(f.entity, 0, f.context);
  assert.ok(f.actor.wrists[0].quaternion.equals(rotation));
  assert.equal(f.animation.action.elapsed, time);
  frames(f, 4);
  assert.equal(f.animation.action, null);
});

test('delivery cargo stays visible while approaching its delayed presentation anchor', () => {
  const f = fixture('worker');
  const mesh = new THREE.Mesh();
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.75, 1.5), mesh });
  f.entity.z = 1;
  cue(f, 'deliver', { x: 0, z: 1, shelf: true });
  f.animation.update(f.entity, 1 / 60, f.context);
  assert.equal(f.actor.cargo.visible, true);
  assert.equal(mesh.visible, false);
  frames(f, 4);
  assert.equal(mesh.visible, true);
  assert.equal(f.actor.cargo.visible, false);
});

test('changed source task cancels pickup and preserves stock that is still carried', () => {
  const f = fixture('worker');
  f.entity.task = { phase: 'to-target' };
  f.context.items = { TOMATO: 1 };
  cue(f, 'pickup');
  frames(f, 0.4);
  f.entity.task = null;
  f.animation.update(f.entity, 1 / 60, f.context);
  assert.equal(f.animation.action, null);
  assert.equal(f.actor.cargo.parent, f.actor.group);
  assert.equal(f.actor.cargo.visible, true);
});

test('simulation emits cues only after successful inventory transfers and keeps economics', () => {
  const state = createInitialState(7);
  state.farms = {};
  state.stock['shelf:TOMATO'].items.TOMATO = 2;
  makeLocation(state.stock, 'customer:buyer', 4);
  const customer = { id: 'buyer', kind: 'shopper', x: 3, z: 3.3, phase: 'waiting-stock',
    targetShelfId: 'tomatoShelf', shoppingList: ['TOMATO'], shoppingIndex: 0,
    demand: 'TOMATO', basket: [], checkoutOrder: 1, waitTicks: 0, payTicks: 0 };
  state.customers.push(customer);
  state.workers.push({ id: 'cashier', type: 'cashier', x: 5, z: -4, task: null });
  advanceSimulation(state);
  assert.equal(customer.animationCues.length, 1);
  assert.equal(customer.animationCues[0].location, 'shelf:TOMATO');
  assert.equal(state.stock['shelf:TOMATO'].items.TOMATO, 1);
  assert.deepEqual(customer.basket, ['TOMATO']);
  for (let i = 0; i < 80; i++) { state.tick++; state.customerSpawnTicks = 0; advanceSimulation(state); }
  assert.equal(state.stats.tomatoSold, 1);
  assert.equal(state.economy.balanceAtoms, 1030000);
});

test('real staff job emits ordered pickup/delivery receipts exactly once', () => {
  const state = createInitialState();
  state.farms = {};
  state.stock['farm:TOMATO'].items.TOMATO = 1;
  const id = 'worker-test';
  makeLocation(state.stock, `worker:${id}`, 6);
  reserveStock(state, { reservationId: 'job-test', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1 });
  const worker = { id, type: 'factoryFeeder', x: -10, z: 5, task: { from: 'farm:TOMATO', to: 'shelf:TOMATO',
    carrier: `worker:${id}`, item: 'TOMATO', quantity: 1, reservationId: 'job-test', phase: 'to-source' } };
  state.workers.push(worker);
  for (let i = 0; i < 160; i++) { state.tick++; state.customerSpawnTicks = 0; advanceSimulation(state); }
  assert.deepEqual(worker.animationCues.map((cue) => cue.type), ['pickup', 'deliver']);
  assert.equal(state.stock['shelf:TOMATO'].items.TOMATO, 1);
  assert.equal(state.stock[`worker:${id}`].items.TOMATO ?? 0, 0);
});

test('a 40-character scene leaves finite poses, bounded queues and independent actions', () => {
  const fixtures = Array.from({ length: 40 }, (_, i) => fixture(i < 32 ? 'customer' : 'worker', `crowd-${i}`));
  for (let i = 0; i < fixtures.length; i++) {
    const f = fixtures[i];
    if (i < 32) { f.entity.basket = ['TOMATO']; cue(f, 'shop', { basketIndex: 0 }); }
    else cue(f, 'deliver', { shelf: true });
  }
  for (let n = 0; n < 240; n++) for (const f of fixtures) f.animation.update(f.entity, 1 / 60, f.context);
  for (const f of fixtures) {
    assert.equal(f.animation.action, null);
    assert.equal(f.animation.pending.length, 0);
    assert.equal(f.animation.path.length, 0);
    assert.ok(Number.isFinite(f.actor.arms[0].quaternion.x));
  }
});

test('coalesced simulation ticks preserve delivery after its source job has finished', () => {
  const f = fixture('worker');
  f.entity.task = null;
  f.entity.animationCues = [
    { id: 'source', type: 'pickup', item: 'TOMATO', x: 0, z: 0 },
    { id: 'target', type: 'deliver', item: 'TOMATO', x: 0, z: 0, shelf: true },
  ];
  frames(f, 0.4);
  assert.equal(f.animation.action.type, 'deliver');
  frames(f, 2);
  assert.equal(f.animation.action, null);
});

test('cart hands remain on its correctly oriented handle and diner poses recover to idle', () => {
  const actor = createCustomerMesh({ id: 'cart', kind: 'shopper', archetype: 'shopperCart' },
    { props: new EnvironmentProps() }, factory);
  const animation = new CharacterAnimator(actor, factory, 'customer');
  const entity = { id: 'cart', x: 0, z: 0, facing: 0, phase: 'queueing', basket: [] };
  for (let i = 0; i < 120; i++) animation.update(entity, 1 / 60);
  actor.group.updateMatrixWorld(true);
  const grip = actor.cartMesh.localToWorld(new THREE.Vector3(-0.31, 0.78, 0.2));
  assert.ok(actor.wrists[0].getWorldPosition(new THREE.Vector3()).distanceTo(grip) < 0.04);
  assert.equal(actor.cartMesh.rotation.y, -Math.PI / 2);
  entity.phase = 'eating';
  for (let i = 0; i < 60; i++) animation.update(entity, 1 / 60);
  assert.ok(actor.knees[0].rotation.x > 1);
  entity.phase = 'waiting-table';
  for (let i = 0; i < 120; i++) animation.update(entity, 1 / 60);
  assert.ok(Math.abs(actor.knees[0].rotation.x) < 0.01);
  assert.ok(Math.abs(actor.group.position.y) < 0.01);
});

test('delivery releases a shelf claim once, even throughout facing and barcode scanning', () => {
  const f = fixture('worker');
  let releases = 0;
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.75, 0.5), mesh: new THREE.Mesh(), release: () => releases++ });
  cue(f, 'deliver', { shelf: true });
  frames(f, 3);
  assert.equal(releases, 1);
});

test('staff presentation follows a real source-to-shelf route and drains its actions', () => {
  const state = createInitialState();
  state.farms = {};
  state.stock['farm:TOMATO'].items.TOMATO = 1;
  makeLocation(state.stock, 'worker:route-worker', 6);
  reserveStock(state, { reservationId: 'route-job', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1 });
  const worker = { id: 'route-worker', type: 'factoryFeeder', x: -7, z: 5, task: { from: 'farm:TOMATO', to: 'shelf:TOMATO',
    carrier: 'worker:route-worker', item: 'TOMATO', quantity: 1, reservationId: 'route-job', phase: 'to-source' } };
  state.workers.push(worker);
  const actor = createWorkerMesh(worker.type, factory);
  const animation = new CharacterAnimator(actor, factory, 'worker');
  const shelfMesh = new THREE.Mesh();
  const context = { items: {}, resolveTarget: (receipt) => ({ point: new THREE.Vector3(receipt.x, 0.75, receipt.z + 0.4),
    mesh: receipt.type === 'deliver' ? shelfMesh : null }) };
  animation.update(worker, 1 / 60, context);
  const observed = new Set();
  for (let i = 0; i < 200; i++) {
    state.tick++;
    state.customerSpawnTicks = 0;
    advanceSimulation(state);
    context.items = state.stock['worker:route-worker'].items;
    for (let frame = 0; frame < 6; frame++) {
      animation.update(worker, 1 / 60, context);
      if (animation.action) observed.add(animation.action.type);
    }
  }
  assert.deepEqual([...observed], ['pickup', 'deliver']);
  assert.equal(animation.action, null);
  assert.equal(animation.pending.length, 0);
  assert.equal(animation.path.length, 0);
  assert.equal(shelfMesh.visible, true);
  assert.equal(actor.cargo.visible, false);
  assert.ok(Math.hypot(actor.group.position.x - worker.x, actor.group.position.z - worker.z) < 0.01);
});

test('customer waits for the staff hand to release the same shelf product', () => {
  const f = fixture();
  let delivering = true;
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.75, 0.5), waitForDelivery: () => delivering });
  f.entity.basket = ['TOMATO'];
  cue(f, 'shop', { basketIndex: 0 });
  frames(f, 1);
  assert.equal(f.animation.action, null);
  assert.equal(f.actor.cargo[0].visible, false);
  delivering = false;
  frames(f, 3);
  assert.equal(f.actor.cargo[0].visible, true);
  assert.equal(f.animation.pending.length, 0);
});

test('removing an interaction target cancels its pose and restores its claim', () => {
  const f = fixture('worker');
  let valid = true;
  let released = false;
  const mesh = new THREE.Mesh();
  f.context.resolveTarget = () => ({ point: new THREE.Vector3(0, 0.7, 0.5), mesh, isValid: () => valid,
    release: () => { released = true; } });
  cue(f, 'deliver', { shelf: true });
  frames(f, 0.2);
  valid = false;
  frames(f, 0.1);
  assert.equal(f.animation.action, null);
  assert.equal(f.actor.cargo.visible, false);
  assert.equal(mesh.visible, true);
  assert.equal(released, true);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createStaffFacilityModel } from '../src/presentation/StaffFacilityModel.js';
import { MarketGrid } from '../src/environment/MarketGrid.js';
import { createWorkerMesh, updateWorkerEnergyBar } from '../src/presentation/HumanoidFactory.js';
import { CharacterAnimator } from '../src/presentation/CharacterAnimator.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';

const definitions = ['wc', 'rest', 'kitchen'].map((id, index) => ({
  id, x: index * 5, z: -15, width: 3.2, depth: 4,
}));

test('facilities use distinct procedural fixtures, north footprints and usable entrance rest spots', () => {
  for (const definition of definitions) {
    const model = createStaffFacilityModel(definition);
    assert.equal(model.userData.facilityId, definition.id);
    assert.equal(model.position.z, -15);
    assert.deepEqual(model.userData.footprint, { width: 3.2, depth: 4 });
    assert.ok(model.getObjectByName(`staff-${definition.id}-fixture`));
    assert.ok(model.getObjectByName('staff-facility-sign'));
    const landing = model.getObjectByName('staff-facility-landing');
    assert.equal(landing.position.z + model.position.z, -12.4);
    let meshes = 0;
    model.traverse((object) => { if (object.isMesh) meshes++; });
    assert.ok(meshes > 10 && meshes < 90);
  }
});

test('facility synchronization does not duplicate models or obstacles and removes old resources', () => {
  const grid = Object.create(MarketGrid.prototype);
  grid.scene = new THREE.Scene();
  grid.obstacles = [];
  grid.staffFacilities = new Map();
  grid.staffLand = null;
  grid.staffPlotTrees = [];
  const state = { staffLandCleared: true, staffFacilities: { rest: { id: 'rest' } }, layout: {} };
  grid.syncStaffFacilities(state);
  const model = grid.staffFacilities.get('rest');
  const obstacleArray = grid.obstacles;
  let disposals = 0;
  model.traverse((object) => object.geometry?.addEventListener('dispose', () => { disposals++; }));
  const children = grid.scene.children.length;
  for (let i = 0; i < 5; i++) grid.syncStaffFacilities(state);
  assert.equal(grid.scene.children.length, children);
  assert.equal(grid.obstacles.length, 1);
  assert.strictEqual(grid.staffFacilities.get('rest'), model);
  assert.strictEqual(grid.obstacles, obstacleArray);
  state.layout['staff-rest'] = { x: 6, z: -15 };
  grid.syncStaffFacilities(state);
  assert.equal(model.position.x, 6);
  assert.equal(grid.obstacles[0].min.x, 4.4);
  delete state.staffFacilities.rest;
  grid.syncStaffFacilities(state);
  assert.equal(grid.staffFacilities.size, 0);
  assert.equal(grid.obstacles.length, 0);
  assert.ok(disposals > 0);
});

test('north plot clearing and save reset show or hide trees without changing the rest of the scene', () => {
  const grid = Object.create(MarketGrid.prototype);
  grid.scene = new THREE.Scene();
  grid.obstacles = [];
  grid.staffFacilities = new Map();
  grid.staffLand = null;
  const tree = new THREE.Group();
  grid.staffPlotTrees = [tree];
  grid.scene.add(tree);
  const state = { staffLandCleared: false, staffFacilities: { wc: { id: 'wc' } }, layout: {} };
  grid.syncStaffFacilities(state);
  assert.equal(grid.staffFacilities.size, 0);
  assert.equal(tree.visible, true);
  state.staffLandCleared = true;
  grid.syncStaffFacilities(state);
  assert.equal(tree.visible, false);
  assert.equal(grid.staffFacilities.size, 1);
  state.staffLandCleared = false;
  grid.syncStaffFacilities(state);
  assert.equal(tree.visible, true);
  assert.equal(grid.staffLand, null);
  assert.equal(grid.staffFacilities.size, 0);
  assert.equal(grid.obstacles.length, 0);
  assert.strictEqual(tree.parent, grid.scene);
});

test('energy bar is clamped, reads worker state and faces the viewing camera', () => {
  const actor = createWorkerMesh('harvester', new Item3DFactory());
  actor.group.rotation.y = 1.2;
  const camera = new THREE.PerspectiveCamera();
  camera.rotation.set(-0.7, 0.6, 0);
  camera.updateMatrixWorld();
  updateWorkerEnergyBar(actor, { energy: 10 }, camera.quaternion);
  assert.equal(actor.energyBar.fill.scale.x, 0.1);
  assert.equal(actor.energyBar.fill.material.color.getHex(), 0xef5350);
  actor.group.updateMatrixWorld(true);
  assert.ok(actor.energyBar.group.getWorldQuaternion(new THREE.Quaternion()).angleTo(camera.quaternion) < 0.0001);
  updateWorkerEnergyBar(actor, { energy: 140 }, camera.quaternion);
  assert.equal(actor.energyBar.fill.scale.x, 1);
  updateWorkerEnergyBar(actor, { energy: -50 }, camera.quaternion);
  assert.equal(actor.energyBar.fill.scale.x, 0);
});

test('workers sit only at a reached lounge and smoothly recover their working stance', () => {
  const factory = new Item3DFactory();
  const actor = createWorkerMesh('harvester', factory);
  const animator = new CharacterAnimator(actor, factory, 'worker');
  const worker = { id: 'worker-rest', x: 0, z: 0, facing: 0, energy: 15,
    break: { facilityId: 'rest', phase: 'to-facility' } };
  const frames = () => { for (let i = 0; i < 60; i++) animator.update(worker, 1 / 60, { items: {} }); };
  frames();
  assert.ok(Math.abs(actor.legs[0].rotation.x) < 0.01);
  worker.break.phase = 'resting';
  frames();
  assert.ok(actor.legs[0].rotation.x < -1.3);
  worker.break.phase = 'returning';
  animator.update(worker, 1 / 60, { items: {} });
  assert.ok(actor.legs[0].rotation.x < -1);
  frames();
  assert.ok(Math.abs(actor.legs[0].rotation.x) < 0.01);
  animator.dispose();
});

test('kitchen cup is attached to the wrist only during actual recovery and pause preserves its pose', () => {
  const factory = new Item3DFactory();
  const actor = createWorkerMesh('cashier', factory);
  const animator = new CharacterAnimator(actor, factory, 'worker');
  const worker = { id: 'worker-kitchen', x: 0, z: 0, facing: 0,
    break: { facilityId: 'kitchen', phase: 'resting' } };
  for (let i = 0; i < 30; i++) animator.update(worker, 1 / 60, { items: {}, paying: true });
  assert.equal(actor.propObjects.breakMug.visible, true);
  assert.strictEqual(actor.propObjects.breakMug.parent, actor.wrists[1]);
  const wrist = actor.wrists[1].quaternion.clone();
  animator.update(worker, 0, { items: {} });
  assert.ok(wrist.angleTo(actor.wrists[1].quaternion) < 0.0001);
  worker.break = null;
  animator.update(worker, 1 / 60, { items: {} });
  assert.equal(actor.propObjects.breakMug.visible, false);
  assert.equal(actor.cargo.visible, false);
  animator.dispose();
});

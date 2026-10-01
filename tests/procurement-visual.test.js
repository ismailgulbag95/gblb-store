import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { MarketGrid } from '../src/environment/MarketGrid.js';
import { WorldScene } from '../src/presentation/WorldScene.js';
import { createProcurementDeliveryModel, syncProcurementDelivery, syncProcurementStock, disposeLogisticsModel } from '../src/environment/LogisticsModels.js';

const state = (phase, tick, released = false) => ({ tick, procurement: {
  delivery: { orderId: 'bulk-1', phase, phaseStartTick: 100, cargoReleased: released },
  orders: [{ id: 'bulk-1', lines: [{ item: 'COLA', quantity: 12 }, { item: 'CHIPS', quantity: 6 }] }],
} });

test('manager office exposes a glass cutaway, wooden desk and emissive interactive CRT', () => {
  const scene = new THREE.Scene();
  const office = new EnvironmentProps(scene).createManagerOffice(22, 0);
  assert.equal(office.position.x, 22);
  assert.equal(office.parent, scene);
  assert.equal(office.getObjectByName('procurement-terminal').userData.stationId, 'managerOffice');
  assert.ok(office.getObjectByName('office-window').material.transparent);
  assert.ok(office.getObjectByName('office-desk'));
  const screen = office.getObjectByName('crt-screen');
  assert.ok(screen.material.emissive.g > 0 && screen.material.emissiveIntensity > 0);
  disposeLogisticsModel(office);
  assert.equal(office.parent, null);
});

test('truck and pallets follow authoritative ticks and remain frozen when simulation pauses', () => {
  const scene = new THREE.Scene();
  const model = createProcurementDeliveryModel(new EnvironmentProps(scene).createDeliveryTruck(0, 0));
  scene.add(model);
  const arriving = state('arriving', 115);
  syncProcurementDelivery(model, arriving);
  const position = model.userData.truck.position.clone();
  syncProcurementDelivery(model, arriving);
  assert.deepEqual(model.userData.truck.position, position);
  assert.equal(model.userData.cargo.visible, false);
  syncProcurementDelivery(model, state('unloading', 120));
  assert.equal(model.userData.cargo.visible, true);
  const halfway = model.userData.cargo.position.clone();
  syncProcurementDelivery(model, state('unloading', 130));
  assert.ok(model.userData.cargo.position.y < halfway.y);
  assert.ok(model.userData.cargo.position.z < halfway.z);
  syncProcurementDelivery(model, state('departing', 115, true));
  assert.equal(model.userData.cargo.visible, false);
  syncProcurementDelivery(model, { tick: 150, procurement: { delivery: null } });
  assert.equal(model.visible, false);
  disposeLogisticsModel(model);
});

test('a full dock keeps uncommitted cargo on the truck lift rather than inside existing stock', () => {
  const model = createProcurementDeliveryModel(new EnvironmentProps(new THREE.Scene()).createDeliveryTruck(0, 0));
  const blocked = { ...state('unloading', 150), stock: { 'dock:incoming': { capacity: 20, items: { COLA: 19 } } } };
  syncProcurementDelivery(model, blocked);
  assert.equal(model.userData.cargo.visible, true);
  assert.equal(model.userData.cargo.position.y, 0.95);
  assert.equal(model.userData.cargo.position.z, 1.18);
  blocked.stock['dock:incoming'].items = {};
  syncProcurementDelivery(model, blocked);
  assert.ok(model.userData.cargo.position.y < 0.2);
  disposeLogisticsModel(model);
});

test('dock pallets represent stock quantities, empty cleanly and reuse bounded geometry', () => {
  const root = new THREE.Group();
  syncProcurementStock(root, { items: { COLA: 12, CHIPS: 7 } });
  const boxes = root.children.filter(child => child.userData.quantity);
  assert.equal(boxes.reduce((sum, child) => sum + child.userData.quantity, 0), 19);
  const firstGeometry = boxes[0].geometry;
  syncProcurementStock(root, { items: { COLA: 6 } });
  assert.equal(root.children.filter(child => child.visible && child.userData.quantity).reduce((sum, child) => sum + child.userData.quantity, 0), 6);
  assert.equal(root.children.find(child => child.userData.quantity).geometry, firstGeometry);
  for (let i = 0; i < 100; i++) syncProcurementStock(root, { items: { COLA: i * 10 } });
  assert.ok(root.children.length <= 17);
  syncProcurementStock(root, { items: {} });
  assert.equal(root.visible, false);
  disposeLogisticsModel(root);
});

test('all eight imported products have package geometries rather than generic fallback shapes', () => {
  const factory = new Item3DFactory();
  for (const item of ['COLA', 'SODA', 'CHIPS', 'BISCUIT', 'CHOCOLATE', 'CANNED_FISH', 'DETERGENT', 'SHAMPOO']) {
    const geometry = factory.getItemGeometry(item);
    assert.notEqual(geometry.type, 'DodecahedronGeometry', item);
    assert.equal(geometry.userData.sharedAsset, true);
    assert.equal(factory.getItemGeometry(item), geometry);
  }
});

test('logistics visuals unlock once, keep real stock and remove their colliders on reset', () => {
  const scene = new THREE.Scene();
  const grid = { scene, props: new EnvironmentProps(scene), obstacles: [], logistics: null };
  const current = { tick: 0, unlocked: { managerOffice: true }, stock: {
    'dock:incoming': { items: { COLA: 12 } }, 'warehouse:main': { items: { CHIPS: 6 } },
  }, procurement: { delivery: null } };
  MarketGrid.prototype.syncLogistics.call(grid, current);
  const logistics = grid.logistics;
  assert.equal(logistics.dockStock.userData.quantity, 12);
  assert.equal(logistics.warehouseStock.userData.quantity, 6);
  assert.equal(logistics.delivery.visible, false);
  const obstacleCount = grid.obstacles.length;
  MarketGrid.prototype.syncLogistics.call(grid, current);
  assert.equal(grid.logistics, logistics);
  assert.equal(grid.obstacles.length, obstacleCount);
  assert.ok(!grid.obstacles.some(box => 22 > box.min.x && 22 < box.max.x && 1.2 > box.min.z && 1.2 < box.max.z));
  for (const point of [{ x: 15.3, z: 0.7 }, { x: 18.9, z: 5 }]) {
    assert.ok(!grid.obstacles.some(box => point.x > box.min.x && point.x < box.max.x && point.z > box.min.z && point.z < box.max.z));
  }
  MarketGrid.prototype.syncLogistics.call(grid, { unlocked: {} });
  assert.equal(grid.logistics, null);
  assert.equal(grid.obstacles.length, 0);
  assert.equal(scene.children.length, 0);
});

test('the visible delivery truck blocks walking, follows its position and frees the lane on departure', () => {
  const scene = new THREE.Scene();
  const grid = { scene, props: new EnvironmentProps(scene), obstacles: [], logistics: null };
  const current = { ...state('arriving', 100), unlocked: { managerOffice: true }, stock: {} };
  MarketGrid.prototype.syncLogistics.call(grid, current);
  const obstacle = grid.obstacles.find(box => box.logisticsId === 'procurementTruck');
  assert.ok(obstacle);
  assert.equal(obstacle.min.z, 12.6);
  current.procurement.delivery.phase = 'unloading'; current.tick = 115;
  MarketGrid.prototype.syncLogistics.call(grid, current);
  assert.equal(grid.obstacles.find(box => box.logisticsId === 'procurementTruck'), obstacle);
  assert.equal(obstacle.min.z, 1.1);
  assert.equal(obstacle.max.z, 5.75);
  assert.ok(18.9 > obstacle.max.x);
  current.procurement.delivery = null;
  MarketGrid.prototype.syncLogistics.call(grid, current);
  assert.ok(!grid.obstacles.some(box => box.logisticsId === 'procurementTruck'));
  disposeLogisticsModel(grid.logistics.group);
});

test('CRT can be raycast at the real monitor screen and stays inactive before unlock', () => {
  const office = new EnvironmentProps(new THREE.Scene()).createManagerOffice();
  office.updateMatrixWorld(true);
  const screen = office.getObjectByName('crt-screen').getWorldPosition(new THREE.Vector3());
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.copy(screen).add(new THREE.Vector3(0, 0.2, 4));
  camera.lookAt(screen); camera.updateMatrixWorld(true);
  const world = { environment: { logistics: { office } }, engine: {
    camera, renderer: { domElement: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 200 }) } },
  }, pointer: new THREE.Vector2(), raycaster: new THREE.Raycaster() };
  assert.equal(WorldScene.prototype.terminalAtScreen.call(world, 100, 100, { unlocked: {} }), null);
  assert.equal(WorldScene.prototype.terminalAtScreen.call(world, 100, 100, { unlocked: { managerOffice: true } }), 'managerOffice');
  assert.equal(WorldScene.prototype.terminalAtScreen.call(world, 0, 0, { unlocked: { managerOffice: true } }), null);
  disposeLogisticsModel(office);
});

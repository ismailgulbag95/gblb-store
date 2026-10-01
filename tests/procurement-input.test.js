import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { InputManager } from '../src/presentation/InputManager.js';
import { WorldScene } from '../src/presentation/WorldScene.js';
import { createManagerOfficeModel } from '../src/environment/LogisticsModels.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';

function surface() {
  const listeners = new Map();
  return { listeners, style: {}, clientHeight: 800,
    addEventListener(type, callback) { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(callback); },
    getBoundingClientRect: () => ({ left: 10, top: 20, width: 1000, height: 800 }),
    setPointerCapture() {}, closest: () => null,
    dispatch(type, event) { for (const listener of listeners.get(type) ?? []) listener(event); },
  };
}

function withInput(run) {
  // Build the real office before installing minimal DOM mocks, so labels use their headless materials.
  const office = createManagerOfficeModel();
  const originalDocument = globalThis.document, originalWindow = globalThis.window;
  const canvas = surface(), nodes = new Map();
  globalThis.document = { addEventListener() {}, getElementById(id) { if (!nodes.has(id)) nodes.set(id, surface()); return nodes.get(id); } };
  globalThis.window = { addEventListener() {} };
  try {
    const records = new Map();
    const app = new GameApplication(new SaveService({ getItem: (key) => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) }));
    app.state.unlocked.managerOffice = true;
    const events = [];
    app.setEventHandler((event) => events.push(event));
    const camera = new THREE.PerspectiveCamera(45, 1000 / 800, 0.1, 100);
    camera.position.set(22, 3.2, 8);
    camera.lookAt(21.88, 1.38, -0.273);
    camera.updateMatrixWorld(true);
    office.updateMatrixWorld(true);
    const selections = [], placements = [];
    const world = Object.create(WorldScene.prototype);
    Object.assign(world, {
      environment: { logistics: { office } },
      engine: { camera, renderer: { domElement: canvas }, zoomBy() {} },
      pointer: new THREE.Vector2(), raycaster: new THREE.Raycaster(),
      groundPlane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), intersectPoint: new THREE.Vector3(), worldCoords: { x: 0, z: 0 },
      selectStation: (id) => selections.push(id), setLayoutMode() {},
      decorationAt: () => null, stationAt: () => 'tomatoShelf',
      previewPlacement: (_, x, z) => placements.push({ x, z }),
    });
    const input = new InputManager(canvas, world, app, () => {});
    const projected = office.getObjectByName('crt-screen').getWorldPosition(new THREE.Vector3()).project(camera);
    const crt = { clientX: 10 + (projected.x + 1) * 500, clientY: 20 + (1 - projected.y) * 400 };
    const event = (point, overrides = {}) => ({ ...point, pointerId: 1, pointerType: 'mouse', button: 0, target: canvas, preventDefault() {}, ...overrides });
    const tap = (point, overrides = {}) => { canvas.dispatch('pointerdown', event(point, overrides)); canvas.dispatch('pointerup', event(point, overrides)); };
    run({ app, input, world, events, crt, tap, canvas, event, selections, placements });
  } finally {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
    office.traverse((object) => { object.geometry?.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; for (const material of materials) material?.dispose(); });
  }
}

test('clicking the real CRT screen opens procurement once and never sets a walking target', () => withInput(({ app, world, events, crt, tap }) => {
  assert.equal(world.terminalAtScreen(crt.clientX, crt.clientY, app.getState()), 'managerOffice');
  assert.equal(app.target == null, true);
  tap(crt);
  assert.deepEqual(events, [{ type: 'procurement-open' }]);
  assert.equal(app.target == null, true);
}));

test('locked or absent office rejects terminal picking and does not open procurement', () => withInput(({ app, world, events, crt, tap }) => {
  app.state.unlocked.managerOffice = false;
  assert.equal(world.terminalAtScreen(crt.clientX, crt.clientY, app.getState()), null);
  tap(crt);
  assert.equal(events.length, 0);
  app.state.unlocked.managerOffice = true;
  world.environment.logistics.office = null;
  assert.equal(world.terminalAtScreen(crt.clientX, crt.clientY, app.getState()), null);
  tap(crt);
  assert.equal(events.length, 0);
}));

test('east ground taps reach logistics only after the office upgrade and ignore outer bounds', () => withInput(({ app, world, events, tap }) => {
  world.terminalAtScreen = () => null;
  world.screenToWorld = () => ({ x: 22, z: 0 });
  tap({ clientX: 100, clientY: 100 });
  assert.deepEqual(app.target, { x: 22, z: 0 });
  assert.equal(events.length, 0);
  app.clearPlayerTarget();
  app.state.unlocked.managerOffice = false;
  tap({ clientX: 100, clientY: 100 });
  assert.equal(app.target, null);
  app.state.unlocked.managerOffice = true;
  world.screenToWorld = () => ({ x: 28, z: 0 });
  tap({ clientX: 100, clientY: 100 });
  assert.equal(app.target, null);
}));

test('layout mode bypasses terminal clicks and keeps station selection and placement intact', () => withInput(({ app, input, world, events, crt, tap, selections }) => {
  world.screenToWorld = () => ({ x: 1, z: 2 });
  input.setLayoutMode(true);
  tap(crt);
  assert.equal(events.length, 0);
  assert.equal(input.selectedStation, 'tomatoShelf');
  assert.equal(selections.at(-1), 'tomatoShelf');
  tap(crt);
  assert.equal(input.selectedStation, null);
  assert.equal(app.getState().layout.tomatoShelf.x, 1);
  assert.equal(app.getState().layout.tomatoShelf.z, 2);
  assert.equal(events.filter(event => event.type === 'procurement-open').length, 0);
}));

test('disabled input, UI taps, drags and right clicks do not open the office terminal', () => withInput(({ input, events, crt, tap, canvas, event }) => {
  input.setEnabled(false);
  tap(crt);
  input.setEnabled(true);
  tap(crt, { target: { closest: () => ({}) } });
  tap(crt, { button: 2 });
  canvas.dispatch('pointerdown', event(crt));
  canvas.dispatch('pointerup', event({ clientX: crt.clientX + 30, clientY: crt.clientY }));
  assert.equal(events.length, 0);
}));

test('pinch and cancellation suppress terminal clicks rather than creating procurement events', () => withInput(({ events, crt, canvas, event }) => {
  canvas.dispatch('pointerdown', event(crt, { pointerId: 1, pointerType: 'touch' }));
  canvas.dispatch('pointerdown', event({ clientX: crt.clientX + 60, clientY: crt.clientY }, { pointerId: 2, pointerType: 'touch' }));
  canvas.dispatch('pointerup', event(crt, { pointerId: 1, pointerType: 'touch' }));
  canvas.dispatch('pointerup', event({ clientX: crt.clientX + 60, clientY: crt.clientY }, { pointerId: 2, pointerType: 'touch' }));
  assert.equal(events.length, 0);
  canvas.dispatch('pointerdown', event(crt));
  canvas.dispatch('pointercancel', event(crt));
  canvas.dispatch('pointerup', event(crt));
  assert.equal(events.length, 0);
}));

import * as THREE from 'three';
import { WorldScene } from '../../src/presentation/WorldScene.js';
import { createInitialState } from '../../src/domain/state.js';
import { advanceSimulation, routeCustomerToShelf } from '../../src/domain/simulation.js';
import { makeLocation, reserveStock } from '../../src/domain/inventory.js';

// Disposable fixture: never loads or writes the player's saved game.
const mode = new URLSearchParams(location.search).get('mode') ?? 'shop';
const captureTick = Number(new URLSearchParams(location.search).get('captureTick')) || 0;
const state = createInitialState(91);
state.farms = {};
state.stock['farm:TOMATO'].items.TOMATO = 8;
state.stock['shelf:TOMATO'].items.TOMATO = mode === 'shop' ? 8 : 0;
state.player.x = 3;
state.player.z = 3;
const world = new WorldScene();
world.engine.camera.zoom = 2.1;
world.engine.camera.updateProjectionMatrix();
const seen = new Set();
const seenActions = new Set();
const samples = [];
let running = false;
let accumulator = 0;
let last = performance.now();
let manualFrame = false;
function customer(index) {
  const entity = { id: `qa-customer-${index}`, kind: 'shopper', x: 2 + index % 8 * 0.5,
    z: 5 + Math.floor(index / 8) * 0.7, phase: 'to-shelf', shoppingList: ['TOMATO'],
    shoppingIndex: 0, demand: 'TOMATO', basket: [], checkoutOrder: index + 1,
    waitTicks: 0, payTicks: 0, archetype: index % 2 ? 'shopperBasket' : 'shopperCart' };
  makeLocation(state.stock, `customer:${entity.id}`, 4);
  state.customers.push(entity);
  routeCustomerToShelf(state, entity, 'TOMATO');
  return entity;
}
if (mode !== 'restock') for (let i = 0; i < (mode === 'crowd' ? 32 : 1); i++) customer(i);
state.workers.push({ id: 'qa-cashier', type: 'cashier', x: 5, z: -4, task: null });
if (mode !== 'shop') for (let i = 0; i < (mode === 'crowd' ? 7 : 1); i++) {
  const id = `qa-worker-${i}`;
  const reservationId = `qa-job-${i}`;
  makeLocation(state.stock, `worker:${id}`, 6);
  reserveStock(state, { reservationId, from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1 });
  state.workers.push({ id, type: 'factoryFeeder', x: -7 - i * 0.5, z: 5,
    task: { reservationId, from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO',
      carrier: `worker:${id}`, quantity: 1, phase: 'to-source' } });
}
function render(dt) {
  const start = performance.now();
  // For deterministic pose/step inspection only; normal runs use the real clock.
  if (manualFrame) world.clock.getDelta = () => dt;
  state.paused = false;
  world.render(state);
  samples.push(performance.now() - start);
  if (samples.length > 300) samples.shift();
  for (const actor of [...world.customers.values(), ...world.workers.values()]) {
    if (actor.animator?.action) seenActions.add(actor.animator.action.type);
  }
  for (const entity of [...state.customers, ...state.workers]) for (const cue of entity.animationCues ?? []) seen.add(cue.type);
  const sorted = [...samples].sort((a, b) => a - b);
  const actors = [...world.customers.values(), ...world.workers.values()];
  document.querySelector('#status').textContent = JSON.stringify({ mode, tick: state.tick,
    characters: actors.length, sold: state.stats.tomatoSold, shelf: state.stock['shelf:TOMATO'].items.TOMATO ?? 0,
    receipts: [...seen], observedActions: [...seenActions],
    actions: actors.filter((actor) => actor.animator?.action).map((actor) => `${actor.animator.action.type}:${actor.animator.action.elapsed.toFixed(2)}`),
    queuedActions: actors.reduce((n, actor) => n + (actor.animator?.pending.length ?? 0), 0),
    claimedProducts: world.animationClaims.size,
    renderMedianMs: sorted[Math.floor(sorted.length / 2)]?.toFixed(2),
    renderP95Ms: sorted[Math.floor(sorted.length * 0.95)]?.toFixed(2),
    finitePoses: actors.every((actor) => Number.isFinite(actor.group.position.y)),
  }, null, 2);
}
function step() {
  state.tick++;
  // Keep spontaneous spawning out of this reproducible fixture.
  state.customerSpawnTicks = 0;
  advanceSimulation(state);
  manualFrame = true;
  for (let i = 0; i < 6; i++) render(1 / 60);
}
document.querySelector('#run').onclick = () => { manualFrame = false; world.clock.getDelta = THREE.Clock.prototype.getDelta.bind(world.clock); running = true; last = performance.now(); };
document.querySelector('#pause').onclick = () => { running = false; };
document.querySelector('#step').onclick = step;
async function pose(kind, elapsed) {
  running = false;
  manualFrame = true;
  for (let i = 0; i < 350; i++) {
    const actor = [...world.customers.values(), ...world.workers.values()].find((a) => a.animator?.action?.type === kind);
    if (actor && actor.animator.action.elapsed >= elapsed) {
      state.player.x = actor.group.position.x;
      state.player.z = actor.group.position.z;
      world.engine.camera.zoom = 6;
      world.engine.camera.updateProjectionMatrix();
      for (let j = 0; j < 80; j++) render(0);
      return;
    }
    state.tick++;
    state.customerSpawnTicks = 0;
    advanceSimulation(state);
    for (let j = 0; j < 6; j++) {
      render(1 / 60);
      const candidate = [...world.customers.values(), ...world.workers.values()].find((a) => a.animator?.action?.type === kind);
      if (candidate?.animator.action.elapsed >= elapsed) break;
    }
    await new Promise(requestAnimationFrame);
  }
}
document.querySelector('#shop-pose').onclick = () => pose('shop', 1.15);
document.querySelector('#scan-pose').onclick = () => pose('deliver', 1.5);
document.querySelector('#wide').onclick = () => { world.engine.camera.zoom = 2.1; world.engine.camera.updateProjectionMatrix(); render(0); };
render(1 / 60);
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (running) {
    accumulator += dt;
    while (accumulator >= 0.1) { state.tick++; state.customerSpawnTicks = 0; advanceSimulation(state); accumulator -= 0.1; }
    render(dt);
    if (captureTick > 0 && state.tick >= captureTick) running = false;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

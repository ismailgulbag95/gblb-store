import '/src/style.css';
import { GameApplication } from '/src/application/GameApplication.js';
import { SaveService } from '/src/infrastructure/SaveService.js';
import { WorldScene } from '/src/presentation/WorldScene.js';
import { InputManager } from '/src/presentation/InputManager.js';
import { HUD } from '/src/presentation/HUD.js';
import { WORLD_EVENTS, eligibleWorldEvents } from '/src/domain/worldEvents.js';
import { ITEMS, RECIPES, STATIONS } from '/src/domain/catalog.js';
import { getShelfLocations } from '/src/domain/layout.js';
const values = new Map();
const app = new GameApplication(new SaveService({ getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k) }));
app.debugUnlockAllUpgrades(); app.state.customers = []; app.state.workers = []; app.state.tick = 1500;
// Keep the preview representative and small enough for interactive inspection.
const keep = new Set(['tomatoFarm', 'tomatoShelf', 'register', 'paste', 'bakery', 'breadShelf', 'restaurant', 'table1', 'burgerKitchen', 'pizzaKitchen', 'managerOffice', 'warehouse', 'loadingDock']);
app.state.unlocked = Object.fromEntries([...keep].map(id => [id, true]));
app.state.farms = { tomatoFarm: app.state.farms.tomatoFarm };
app.state.machines = Object.fromEntries(Object.entries(app.state.machines).filter(([id]) => keep.has(id)));
app.state.diningTables = { table1: app.state.diningTables.table1 };
app.state.unlockedProducts = ['TOMATO', 'BREAD']; app.state.pendingShelfIds = []; app.state.pendingStationIds = [];

const world = new WorldScene(), input = new InputManager(world.getCanvas(), world, app, () => {}), hud = new HUD(app, input);
app.onEvent = event => { if (event.type === 'world-event') hud.showEvent(event); };
document.getElementById('loading-screen').classList.add('hidden');
document.getElementById('btn-layout').onclick = () => input.setLayoutMode(!input.layoutMode);
function trigger(type) {
  app.state.paused = false;
  if (app.state.worldEvents.active) { app.state.worldEvents.active.ends = app.state.worldEvents.activeTicks; app.tick(); }
  app.state.worldEvents.activeTicks = Math.max(6000, app.state.worldEvents.activeTicks);
  app.state.worldEvents.lastGood = true; app.state.worldEvents.mascot = false;
  app.state.worldEvents.buffs = [];
  for (const item of Object.keys(ITEMS)) for (const shelf of getShelfLocations(app.state, item)) app.state.stock[shelf.stockId].items[item] = 4;
  for (const [id, machine] of Object.entries(app.state.machines)) {
    const recipe = RECIPES[machine.recipe ?? STATIONS[id]?.recipe];
    if (recipe) for (const [item, n] of Object.entries(recipe.inputs)) app.state.stock[`machine:${id}:input`].items[item] = n * 2;
  }
  const choices = eligibleWorldEvents(app.state), index = choices.indexOf(type);
  if (index < 0) throw new Error(`Event not eligible: ${type}`);
  for (let seed = 1; ; seed++) if (Math.floor(((Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296 * choices.length) === index) {
    app.state.worldEvents.rng = seed; break;
  }
  app.state.worldEvents.nextAt = app.state.worldEvents.activeTicks;
  app.tick();
  const active = app.state.worldEvents.active;
  if (type === 'goldenHarvest') Object.assign(app.state.player, { x: -13, z: 3 });
  else if (type === 'machineJam') Object.assign(app.state.player, { x: active.x - 3.3, z: active.z + 1.2 });
  else if (type === 'flashCargo') Object.assign(app.state.player, { x: 20, z: 10 });
  else if (active) Object.assign(app.state.player, { x: 5, z: 9.5 });
  app.state.paused = true;
}
for (const [type, definition] of Object.entries(WORLD_EVENTS)) {
  const button = document.createElement('button'); button.textContent = definition.title; button.dataset.event = type;
  button.onclick = () => trigger(type); document.getElementById('event-buttons').appendChild(button);
}
document.getElementById('event-pause').onclick = () => app.setPaused(!app.state.paused);
let last = performance.now(), accumulator = 0;
function render(now) {
  const dt = Math.min((now - last) / 1000, 0.1); last = now;
  if (!app.state.paused) { accumulator += dt; while (accumulator >= 0.1) { app.tick(); accumulator -= 0.1; } app.updateTargetMove(dt); }
  world.render(app.state, [], null); hud.render(app.state, null);
  document.getElementById('event-proof').textContent = `${app.state.worldEvents.active?.type ?? 'idle'} · tick ${app.state.worldEvents.activeTicks} · pause ${app.state.paused} · memory save only`;
  requestAnimationFrame(render);
}
trigger('tourBus'); requestAnimationFrame(render);

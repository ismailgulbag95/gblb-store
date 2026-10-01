import '../../src/style.css';
import { GameApplication } from '../../src/application/GameApplication.js';
import { SaveService } from '../../src/infrastructure/SaveService.js';
import { HUD } from '../../src/presentation/HUD.js';
import { WorldScene } from '../../src/presentation/WorldScene.js';
import { normalizeWorkerWelfare } from '../../src/domain/staff.js';
import { getStaffFacilityAccess } from '../../src/domain/layout.js';

// Isolated QA fixture: all persistence stays in memory; never reads player saves.
class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
const app = new GameApplication(new SaveService(new MemoryStorage()), 93);
app.state.economy.balanceAtoms = 5000 * 10_000;
app.state.availableUpgrades.push('cashier', 'harvester', 'caretaker');
app.state.player.x = 5; app.state.player.z = -13;
app.state.workers.push(normalizeWorkerWelfare({ id: 'qa-harvester', type: 'harvester', name: 'Deniz', archetypeId: 'diligent', x: -10, z: 7, energy: 12, task: null }));
app.state.stock['farm:TOMATO'].items.TOMATO = 20;
app.state.farms.tomatoFarm.readyCount = 20;
const world = new WorldScene();
const hud = new HUD(app);
app.setObstacles(world.environment.obstacles);
document.getElementById('loading-screen').classList.add('hidden');
document.getElementById('game-container').setAttribute('aria-busy', 'false');
let cycles = 0;
let seenRest = false;
document.getElementById('qa-cycle').onclick = async () => {
  app.state.paused = false;
  for (let i = 0; i < 500; i++) {
    app.tick();
    if (app.state.workers.some(worker => worker.break?.phase === 'resting')) seenRest = true;
    if (i % 20 === 0) await new Promise(requestAnimationFrame);
  }
  cycles++;
};
document.getElementById('qa-needs').onclick = () => {
  app.state.paused = false;
  for (const id of ['wc', 'rest', 'kitchen']) {
    if (!app.state.staffFacilities[id]) continue;
    const point = getStaffFacilityAccess(app.state, id);
    app.state.workers.push(normalizeWorkerWelfare({ id: `qa-pose-${id}`, type: 'caretaker', ...point, energy: 30, task: null,
      break: { facilityId: id, phase: 'resting', returnTo: { x: -10, z: 7 }, ticks: 0 } }));
  }
};
document.getElementById('qa-overview').onclick = () => {
  hud.closeAll(); app.state.player.x = 5; app.state.player.z = -13;
};
function frame() {
  try {
    world.render(app.getState(), app.getAvailableUpgrades());
    hud.render(app.getState(), null);
    document.getElementById('qa-status').textContent = JSON.stringify({ cycles, seenRest,
      land: app.state.staffLandCleared, facilities: Object.keys(app.state.staffFacilities),
      workers: app.state.workers.map(worker => ({ id: worker.id, energy: +worker.energy.toFixed(1), phase: worker.break?.phase ?? 'work' })),
      finite: [...world.workers.values()].every(actor => Number.isFinite(actor.group.position.x)) });
  } catch (error) { document.getElementById('qa-status').textContent = error.stack; }
  requestAnimationFrame(frame);
}
frame();

import '../../src/style.css';
import { GameApplication } from '../../src/application/GameApplication.js';
import { SaveService } from '../../src/infrastructure/SaveService.js';
import { HUD } from '../../src/presentation/HUD.js';
import { InputManager } from '../../src/presentation/InputManager.js';
import { WorldScene } from '../../src/presentation/WorldScene.js';
import { normalizeWorkerWelfare } from '../../src/domain/staff.js';

// QA only: no player saves are read or written.
class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
const app = new GameApplication(new SaveService(new MemoryStorage()), 93);
app.state.economy.balanceAtoms = 5000 * 10_000;
app.state.availableUpgrades.push('logisticsOffice');
app.buyUpgrade('logisticsOffice');
app.state.player.x = 19; app.state.player.z = 3;
const world = new WorldScene();
const input = new InputManager(world.engine.renderer.domElement, world, app, () => app.interact(app.getNearbyAction()?.id));
const hud = new HUD(app, input, open => { input.enabled = !open; });
app.setObstacles(world.environment.obstacles);
app.setEventHandler(event => { if (event.type === 'procurement-open') hud.openProcurement(); else hud.showEvent(event); });
document.getElementById('loading-screen').classList.add('hidden');
document.getElementById('game-container').setAttribute('aria-busy', 'false');
document.getElementById('qa-terminal').onclick = () => app.openProcurement();
document.getElementById('qa-office').onclick = () => { hud.closeAll(); app.state.player.x = 19; app.state.player.z = 3; };
let running = false;
async function advance(ticks) {
  if (running) return;
  running = true; hud.closeAll();
  for (let i = 0; i < ticks; i++) { app.tick(); if (i % 2 === 0) await new Promise(requestAnimationFrame); }
  running = false;
}
document.getElementById('qa-step').onclick = () => advance(30);
document.getElementById('qa-cycle').onclick = () => {
  if (!app.state.workers.some(worker => worker.type === 'warehouseOperator')) app.state.workers.push(normalizeWorkerWelfare({
    id: 'qa-warehouse', type: 'warehouseOperator', name: 'Deniz', x: 15.3, z: .7, task: null, salaryDueDay: null,
  }));
  advance(900);
};
document.getElementById('qa-manager').onclick = () => {
  if (!app.state.workers.some(worker => worker.type === 'storeManager')) app.state.workers.push(normalizeWorkerWelfare({
    id: 'qa-manager', type: 'storeManager', name: 'Ece', x: 22, z: 1.2, task: null,
  }));
  app.openProcurement();
};
function frame() {
  try {
    if (!app.state.paused && !running) {
      const movement = input.getMovementVector();
      if (Math.hypot(movement.x, movement.z) > .02) app.setPlayerMove(movement, .016);
      else app.updateTargetMove(.016);
    }
    world.render(app.getState(), app.getAvailableUpgrades());
    hud.render(app.getState(), app.getNearbyAction());
    document.getElementById('qa-status').textContent = JSON.stringify({ tick: app.state.tick, balance: app.state.economy.balanceAtoms / 10_000,
      phase: app.state.procurement.delivery?.phase ?? 'idle', orders: app.state.procurement.orders.map(order => order.status),
      dock: app.state.stock['dock:incoming'].items, warehouse: app.state.stock['warehouse:main'].items, shelf: app.state.stock['shelf:COLA']?.items,
      shelfTransfers: app.state.stockTransactions.filter(receipt => receipt.to === 'shelf:COLA').length,
      customerCola: Object.entries(app.state.stock).filter(([id]) => id.startsWith('customer:')).reduce((sum, [, stock]) => sum + (stock.items.COLA ?? 0), 0),
      workers: app.state.workers.map(worker => ({ x: +worker.x.toFixed(1), z: +worker.z.toFixed(1), task: worker.task?.phase })),
      geometry: world.engine.renderer.info.memory.geometries, finite: [...world.workers.values()].every(actor => Number.isFinite(actor.group.position.x)) });
  } catch (error) { document.getElementById('qa-status').textContent = error.stack; }
  requestAnimationFrame(frame);
}
frame();

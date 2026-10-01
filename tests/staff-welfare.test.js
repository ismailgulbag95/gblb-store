import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, hydrateState, SAVE_VERSION } from '../src/domain/state.js';
import { STAFF_ARCHETYPES, STAFF_FACILITIES, staffDailySalaryAtoms, MONEY_ATOMS } from '../src/domain/catalog.js';
import { generateStaffCandidates, normalizeWorkerWelfare, tickWorkerNeeds, workerWorkSpeed, chooseStaffFacility } from '../src/domain/staff.js';
import { getStaffFacilityAccess, getStaffFacilityCollisionBoxes, ZONES } from '../src/domain/layout.js';
import { advanceSimulation } from '../src/domain/simulation.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';
import { reserveStock, pickUpReservedStock, quantityAt } from '../src/domain/inventory.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}
const worker = (overrides = {}) => normalizeWorkerWelfare({ id: 'worker-1', type: 'harvester', x: -10, z: 7, task: null, ...overrides });
const tick = (state, count) => { for (let i = 0; i < count; i++) advanceSimulation(state); };
const openFacilities = (state, ids = ['wc', 'rest', 'kitchen']) => {
  state.staffLandCleared = true;
  for (const id of ids) state.staffFacilities[id] = { id };
};

test('candidate pools are seeded, unique, persistent and contain explicit tradeoffs', () => {
  const a = createInitialState(72), b = createInitialState(72);
  const pool = generateStaffCandidates(a, 'cashier');
  assert.equal(pool.length, 3);
  assert.equal(new Set(pool.map(c => c.archetypeId)).size, 3);
  assert.deepEqual(pool, generateStaffCandidates(b, 'cashier'));
  assert.deepEqual(pool, generateStaffCandidates(a, 'cashier'));
  assert.equal(Object.keys(STAFF_ARCHETYPES).length, 5);
  for (const candidate of pool) {
    const archetype = STAFF_ARCHETYPES[candidate.archetypeId];
    assert.equal(candidate.salaryAtoms, Math.round(staffDailySalaryAtoms('cashier') * archetype.salary));
    assert.ok(candidate.hireCostAtoms > 0 && candidate.traits.includes(candidate.archetypeId));
  }
  assert.deepEqual(generateStaffCandidates(a, 'invalid-role'), []);
});

test('work drains bounded energy and traits affect speed and drain, idle recovers', () => {
  const ordinary = worker(), diligent = worker({ archetypeId: 'diligent' }), meticulous = worker({ archetypeId: 'meticulous' });
  for (let i = 0; i < 100; i++) {
    tickWorkerNeeds(ordinary, true); tickWorkerNeeds(diligent, true); tickWorkerNeeds(meticulous, true);
  }
  assert.ok(ordinary.energy < 100 && meticulous.energy > ordinary.energy);
  assert.ok(workerWorkSpeed(diligent) > workerWorkSpeed(ordinary));
  const exhausted = worker({ energy: 0 });
  assert.ok(workerWorkSpeed(exhausted) > 0 && workerWorkSpeed(exhausted) < 1);
  tickWorkerNeeds(exhausted, false);
  assert.ok(exhausted.energy > 0);
  for (let i = 0; i < 10_000; i++) tickWorkerNeeds(ordinary, true);
  for (const key of ['energy', 'hunger', 'morale', 'comfort']) assert.ok(ordinary[key] >= 0 && ordinary[key] <= 100);
});

test('facilities require cleared land and exist inside the north layout with safe access points', () => {
  const state = createInitialState();
  state.staffFacilities.rest = { id: 'rest' };
  assert.equal(getStaffFacilityAccess(state, 'rest'), null);
  assert.equal(chooseStaffFacility(state, worker({ energy: 5 })), null);
  openFacilities(state);
  const boxes = getStaffFacilityCollisionBoxes(state);
  assert.equal(boxes.length, 3);
  for (const box of boxes) {
    assert.ok(box.minZ >= ZONES.staff.minZ && box.maxZ <= ZONES.staff.maxZ);
    const access = getStaffFacilityAccess(state, box.id.slice(6));
    assert.ok(access.z > box.maxZ && access.z <= -9);
  }
  assert.equal(chooseStaffFacility(state, worker({ energy: 5 })).id, 'rest');
  assert.equal(chooseStaffFacility(state, worker({ energy: 100, comfort: 0 })).id, 'wc');
  assert.equal(chooseStaffFacility(state, worker({ energy: 100, hunger: 0 })).id, 'kitchen');
  state.workers = [worker({ break: { facilityId: 'wc', phase: 'resting' } })];
  assert.notEqual(chooseStaffFacility(state, worker({ comfort: 0 }))?.id, 'wc');
});

test('exhaustion without facilities continues delivering stock and never locks a worker', () => {
  const state = createInitialState();
  state.farms.tomatoFarm.readyCount = 10;
  state.stock['farm:TOMATO'].items.TOMATO = 10;
  state.workers = [worker({ energy: 0 })];
  tick(state, 350);
  assert.ok(quantityAt(state, 'shelf:TOMATO', 'TOMATO') > 0);
  assert.equal(state.workers[0].break, null);
});

test('a worker finishes a carried reservation before resting and returns to work', () => {
  const state = createInitialState();
  openFacilities(state, ['rest']);
  state.stock['farm:TOMATO'].items.TOMATO = 2;
  const task = { reservationId: 'welfare-delivery', from: 'farm:TOMATO', to: 'shelf:TOMATO', item: 'TOMATO', quantity: 1,
    carrier: 'worker:worker-1', phase: 'to-target' };
  assert.equal(reserveStock(state, task).ok, true);
  assert.equal(pickUpReservedStock(state, task.reservationId, task.carrier).ok, true);
  state.workers = [worker({ x: 1, z: 2, energy: 5, task })];
  let delivered = false, rested = false, returned = false;
  for (let i = 0; i < 550; i++) {
    advanceSimulation(state);
    const employee = state.workers[0];
    if (employee.break) {
      assert.equal(quantityAt(state, task.carrier, 'TOMATO'), 0);
      assert.equal(state.reservations[task.reservationId], undefined);
      delivered = true;
    }
    if (employee.break?.phase === 'resting') rested = true;
    if (rested && !employee.break && employee.energy > 60) { returned = true; break; }
  }
  assert.ok(delivered && rested && returned);
  assert.equal(state.stockTransactions.filter(t => t.id === 'worker-delivery:welfare-delivery').length, 1);
});

test('an unreachable or removed facility releases its break without losing stock', () => {
  const state = createInitialState();
  openFacilities(state, ['rest']);
  state.workers = [worker({ energy: 10, break: { facilityId: 'rest', phase: 'resting', returnTo: { x: -10, z: 7 }, ticks: 0 } })];
  delete state.staffFacilities.rest;
  tick(state, 2);
  assert.equal(state.workers[0].break, null);
  assert.ok(workerWorkSpeed(state.workers[0]) > 0);
});

test('legacy saves retain stock, worker salary and task while gaining neutral welfare fields', () => {
  const old = createInitialState();
  old.saveVersion = 9;
  delete old.staffFacilities; delete old.staffLandCleared; delete old.staffCandidates;
  old.workers = [{ id: 'old-worker', type: 'cashier', x: 5, z: -6, task: null }];
  old.stock.player.items.TOMATO = 3;
  const state = hydrateState(old);
  assert.ok(SAVE_VERSION > 9);
  assert.equal(state.saveVersion, SAVE_VERSION);
  assert.equal(state.stock.player.items.TOMATO, 3);
  assert.equal(state.workers[0].energy, 100);
  assert.equal(state.workers[0].salaryAtoms, staffDailySalaryAtoms('cashier'));
  assert.equal(state.workers[0].archetypeId, null);
  assert.deepEqual(state.staffFacilities, {});
  assert.equal(state.staffLandCleared, false);
});

test('paid selection stores traits and personal wages once; facilities debit once after clearing', () => {
  const storage = new MemoryStorage();
  const app = new GameApplication(new SaveService(storage), 12);
  app.state.availableUpgrades.push('cashier');
  app.state.economy.balanceAtoms = 10000 * MONEY_ATOMS;
  const pool = app.openStaffCandidates('cashier').candidates;
  const candidate = pool[0];
  const before = app.state.economy.balanceAtoms;
  assert.equal(app.hireStaffCandidate('cashier', candidate.id).ok, true);
  assert.equal(app.state.economy.balanceAtoms, before - candidate.hireCostAtoms);
  assert.equal(app.state.workers[0].salaryAtoms, candidate.salaryAtoms);
  assert.equal(app.state.workers[0].archetypeId, candidate.archetypeId);
  assert.equal(app.hireStaffCandidate('cashier', candidate.id).ok, false);
  assert.equal(app.buildStaffFacility('rest').ok, false);
  assert.equal(app.clearStaffLand().ok, true);
  const cleared = app.state.economy.balanceAtoms;
  assert.equal(app.buildStaffFacility('rest').ok, true);
  assert.equal(app.state.economy.balanceAtoms, cleared - STAFF_FACILITIES.rest.price * MONEY_ATOMS);
  assert.equal(app.buildStaffFacility('rest').ok, false);
  assert.ok(app.state.layout['staff-rest']);
  const restored = new GameApplication(new SaveService(storage));
  assert.equal(restored.state.workers[0].salaryAtoms, candidate.salaryAtoms);
  assert.ok(restored.state.staffFacilities.rest);
});

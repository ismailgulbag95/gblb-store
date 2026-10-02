import { MONEY_ATOMS, STAFF_ARCHETYPES, STAFF_FACILITIES, STAFF_HIRES, UPGRADES, staffDailySalaryAtoms } from './catalog.js';
import { getStaffFacilityAccess } from './layout.js';
import { staffSpeedMultiplier } from './progression.js';

const clampNeed = (value) => Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 100;
const NAMES = ['Deniz', 'Ece', 'Mert', 'Derya', 'Can', 'Selin', 'Arda', 'Aslı', 'Eren', 'Ayça'];

function random(state) {
  let value = state.rng += 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  state.rng >>>= 0;
  return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
}

export function generateStaffCandidates(state, role) {
  const hire = STAFF_HIRES.find(entry => entry.upgradeId === role);
  if (!hire) return [];
  state.staffCandidates ??= {};
  if (state.staffCandidates[role]?.length === 3) return state.staffCandidates[role];
  const ids = Object.keys(STAFF_ARCHETYPES);
  const price = UPGRADES.find(entry => entry.id === role).price;
  const candidates = [];
  while (candidates.length < 3) {
    const archetypeId = ids.splice(Math.floor(random(state) * ids.length), 1)[0];
    const archetype = STAFF_ARCHETYPES[archetypeId];
    candidates.push({ id: `candidate-${state.nextEntityId++}`, role, name: NAMES[Math.floor(random(state) * NAMES.length)],
      archetypeId, traits: [archetypeId], salaryAtoms: Math.round(staffDailySalaryAtoms(hire.staffTypes[0]) * archetype.salary),
      hireCostAtoms: Math.round(price * MONEY_ATOMS * archetype.hire) });
  }
  state.staffCandidates[role] = candidates;
  return candidates;
}

export function normalizeWorkerWelfare(worker) {
  const archetypeId = STAFF_ARCHETYPES[worker.archetypeId] ? worker.archetypeId : null;
  return { ...worker, archetypeId, traits: archetypeId ? [archetypeId] : [],
    salaryAtoms: Number.isSafeInteger(worker.salaryAtoms) && worker.salaryAtoms > 0 ? worker.salaryAtoms
      : Math.round(staffDailySalaryAtoms(worker.type) * (STAFF_ARCHETYPES[archetypeId]?.salary ?? 1)),
    energy: clampNeed(worker.energy), hunger: clampNeed(worker.hunger), morale: clampNeed(worker.morale), comfort: clampNeed(worker.comfort),
    break: worker.break && STAFF_FACILITIES[worker.break.facilityId]
      && ['to-facility', 'resting', 'returning'].includes(worker.break.phase)
      && Number.isFinite(worker.break.returnTo?.x) && Number.isFinite(worker.break.returnTo?.z)
      ? { facilityId: worker.break.facilityId, phase: worker.break.phase, returnTo: { ...worker.break.returnTo },
        slot: worker.break.slot === 1 ? 1 : 0,
        ticks: Number.isFinite(worker.break.ticks) ? Math.max(0, worker.break.ticks) : 0 } : null,
    breakCooldownUntil: Number.isSafeInteger(worker.breakCooldownUntil) ? worker.breakCooldownUntil : 0 };
}

export function tickWorkerNeeds(worker, working) {
  const drain = STAFF_ARCHETYPES[worker.archetypeId]?.drain ?? 1;
  worker.energy = clampNeed((worker.energy ?? 100) + (working ? -0.035 * drain : 0.065));
  worker.hunger = clampNeed((worker.hunger ?? 100) - (working ? 0.018 : 0.006));
  worker.comfort = clampNeed((worker.comfort ?? 100) - 0.02);
  worker.morale = clampNeed((worker.morale ?? 100) - (worker.hunger < 20 ? 0.025 : 0.003));
}

export function workerWorkSpeed(worker) {
  const upgrade = Math.min(1.2, Math.max(1, worker.speedModifier ?? staffSpeedMultiplier(worker.upgradeLevel ?? 0)));
  const fatigue = worker.energy < 20 ? 0.45 + 0.55 * Math.max(0, worker.energy) / 20 : 1;
  const needs = worker.hunger < 20 || worker.morale < 20 ? 0.85 : 1;
  return upgrade * (STAFF_ARCHETYPES[worker.archetypeId]?.speed ?? 1) * fatigue * needs;
}

export function chooseStaffFacility(state, worker) {
  const critical = worker.energy <= (STAFF_ARCHETYPES[worker.archetypeId]?.breakAt ?? 20);
  const desired = critical ? ['rest', 'gazebo', 'kitchen', 'wc']
    : worker.comfort < 25 ? ['wc', 'gazebo'] : worker.hunger < 25 || worker.morale < 25 ? ['kitchen', 'gazebo'] : ['gazebo', 'rest'];
  return desired.map(id => STAFF_FACILITIES[id]).filter(Boolean).find(facility => getStaffFacilityAccess(state, facility.id)
    && state.workers.filter(other => other.id !== worker.id && other.break?.facilityId === facility.id
      && other.break.phase !== 'returning').length < facility.capacity) ?? null;
}

// Recovery uses simulation ticks (0.1 s), never wall-clock or render timing.
export function recoverWorker(worker, facilityId) {
  const rest = worker.break;
  rest.ticks = (rest.ticks ?? 0) + 1;
  worker.energy = clampNeed(worker.energy + (facilityId === 'rest' ? 0.55 : facilityId === 'gazebo' ? 0.35 : 0.15));
  worker.morale = clampNeed(worker.morale + (facilityId === 'kitchen' ? 0.7 : facilityId === 'gazebo' ? 0.85 : 0.15));
  if (facilityId === 'wc') worker.comfort = clampNeed(worker.comfort + 2);
  if (facilityId === 'kitchen') worker.hunger = clampNeed(worker.hunger + 1.2);
  if (facilityId === 'gazebo') worker.comfort = clampNeed(worker.comfort + 0.9);
  return facilityId === 'rest' ? worker.energy >= 85
    : facilityId === 'gazebo' ? (worker.energy >= 70 && worker.morale >= 85)
    : facilityId === 'wc' ? rest.ticks >= 45 : rest.ticks >= 75;
}

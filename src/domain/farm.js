import { STATIONS } from './catalog.js';

export const FARM_CAPACITY = 4;
export const FARM_CYCLE_TICKS = Object.freeze([45, 45, 45, 45]);
export const FARM_PHASE_OFFSETS = Object.freeze([0, 11, 22, 33]);
const LEGACY_CYCLE_TICKS = 22;
const LEGACY_FARM_CYCLE_TICKS = Object.freeze([38, 43, 47, 52]);
const LEGACY_FARM_PHASE_OFFSETS = Object.freeze([1, 11, 21, 31]);
const BUILTIN_FARM_PHASE_SHIFTS = Object.freeze({
  tomatoFarm: 0,
  tomatoFarm2: 7,
  orangeFarm: 2,
  orangeFarm2: 9,
  cornFarm: 4,
  wheatFarm: 6,
});

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function nextPhaseTick(currentTick, epoch, phaseOffset, cycleTicks) {
  const phase = positiveModulo(epoch + phaseOffset - currentTick, cycleTicks);
  return currentTick + (phase || cycleTicks);
}

function tickAfter(nextTick, currentTick, cycleTicks) {
  if (nextTick > currentTick) return nextTick;
  return nextTick + (Math.floor((currentTick - nextTick) / cycleTicks) + 1) * cycleTicks;
}

function migrateLegacyPlants(plants, currentTick, phaseOffsets) {
  const oldPhaseShift = Number.isSafeInteger(plants[0]?.phaseOffsetTicks)
    ? plants[0].phaseOffsetTicks - LEGACY_FARM_PHASE_OFFSETS[0] : 0;
  const isLegacyProfile = plants.every((plant, index) => (
    (!Number.isSafeInteger(plant?.cycleTicks) || plant.cycleTicks === LEGACY_FARM_CYCLE_TICKS[index])
    && (!Number.isSafeInteger(plant?.phaseOffsetTicks)
      || plant.phaseOffsetTicks === LEGACY_FARM_PHASE_OFFSETS[index] + oldPhaseShift)
  ));
  if (!isLegacyProfile) return null;

  const referenceTicks = plants.map((plant, index) => {
    const oldCycle = Number.isSafeInteger(plant?.cycleTicks) && plant.cycleTicks > 0
      ? plant.cycleTicks : LEGACY_FARM_CYCLE_TICKS[index];
    let referenceTick = Number.isSafeInteger(plant?.nextReadyTick) && plant.nextReadyTick >= 0
      ? plant.nextReadyTick : currentTick + oldCycle + LEGACY_FARM_PHASE_OFFSETS[index] + oldPhaseShift;
    return tickAfter(referenceTick, currentTick, oldCycle);
  });

  let bestEpoch = 0;
  let bestScore = Infinity;
  for (let epoch = 0; epoch < FARM_CYCLE_TICKS[0]; epoch += 1) {
    const score = phaseOffsets.reduce((sum, offset, index) => (
      sum + Math.abs(nextPhaseTick(currentTick, epoch, offset, FARM_CYCLE_TICKS[index]) - referenceTicks[index])
    ), 0);
    if (score < bestScore) {
      bestScore = score;
      bestEpoch = epoch;
    }
  }

  return plants.map((plant, index) => ({
    ready: Boolean(plant?.ready),
    phaseOffsetTicks: phaseOffsets[index],
    cycleTicks: FARM_CYCLE_TICKS[index],
    nextReadyTick: nextPhaseTick(currentTick, bestEpoch, phaseOffsets[index], FARM_CYCLE_TICKS[index]),
  }));
}

export function farmPhaseOffsets(farmId = '') {
  const id = String(farmId);
  let phaseShift = BUILTIN_FARM_PHASE_SHIFTS[id];
  if (phaseShift === undefined) {
    const ordinalMatch = id.match(/(?:Farm|_)(\d+)$/i);
    const parsedOrdinal = ordinalMatch ? Number(ordinalMatch[1]) : 0;
    if (Number.isSafeInteger(parsedOrdinal) && parsedOrdinal > 0) {
      phaseShift = ((parsedOrdinal - 1) * 7) % 11;
    } else {
      phaseShift = [...id].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) % 11, 0);
    }
  }
  return FARM_PHASE_OFFSETS.map((offset) => offset + phaseShift);
}

export function createFarmState(currentTick = 0, farmId = '') {
  const plants = farmPhaseOffsets(farmId).map((phaseOffsetTicks, index) => ({
    ready: false,
    phaseOffsetTicks,
    cycleTicks: FARM_CYCLE_TICKS[index],
    nextReadyTick: currentTick + FARM_CYCLE_TICKS[index] + phaseOffsetTicks,
  }));
  return { harvestCount: 0, readyCount: 0, plants };
}

// Adds independent plant timers to legacy farms while preserving their ripe stock.
export function ensureFarmState(farm, currentTick = 0, farmId = '') {
  const phaseOffsets = farmPhaseOffsets(farmId);
  farm.harvestCount = Number.isSafeInteger(farm.harvestCount) && farm.harvestCount >= 0 ? farm.harvestCount : 0;
  const legacyReadyCount = Math.min(FARM_CAPACITY,
    Number.isSafeInteger(farm.readyCount) && farm.readyCount >= 0 ? farm.readyCount : 0);
  if (!Array.isArray(farm.plants) || farm.plants.length !== FARM_CAPACITY) {
    const legacyProgress = Number.isFinite(farm.progressTicks ?? farm.progress)
      ? Math.max(0, Math.min(LEGACY_CYCLE_TICKS, farm.progressTicks ?? farm.progress)) : 0;
    const migratedProgress = Math.round(legacyProgress / LEGACY_CYCLE_TICKS * FARM_CYCLE_TICKS[0]);
    farm.plants = phaseOffsets.map((phaseOffsetTicks, index) => ({
      ready: index < legacyReadyCount,
      phaseOffsetTicks,
      cycleTicks: FARM_CYCLE_TICKS[index],
      nextReadyTick: currentTick + Math.max(1, FARM_CYCLE_TICKS[index] - migratedProgress) + phaseOffsetTicks,
    }));
  } else {
    farm.plants = migrateLegacyPlants(farm.plants, currentTick, phaseOffsets)
      ?? farm.plants.map((plant, index) => {
        const phaseOffsetTicks = Number.isSafeInteger(plant?.phaseOffsetTicks) && plant.phaseOffsetTicks >= 0
          ? plant.phaseOffsetTicks : phaseOffsets[index];
        const cycleTicks = Number.isSafeInteger(plant?.cycleTicks) && plant.cycleTicks > 0
          ? plant.cycleTicks : FARM_CYCLE_TICKS[index];
        let nextReadyTick = Number.isSafeInteger(plant?.nextReadyTick) && plant.nextReadyTick >= 0
          ? plant.nextReadyTick : currentTick + cycleTicks + phaseOffsetTicks;
        if (!plant?.ready) nextReadyTick = tickAfter(nextReadyTick, currentTick, cycleTicks);
        return { ready: Boolean(plant?.ready), phaseOffsetTicks, cycleTicks, nextReadyTick };
      });
    const currentReadyCount = farm.plants.filter((plant) => plant.ready).length;
    if (currentReadyCount !== legacyReadyCount) {
      farm.plants.forEach((plant, index) => { plant.ready = index < legacyReadyCount; });
    }
  }
  farm.readyCount = farm.plants.filter((plant) => plant.ready).length;
  return farm;
}

export function removeFarmReady(farm, quantity, currentTick = 0) {
  ensureFarmState(farm, currentTick);
  let remaining = Math.max(0, Math.floor(quantity));
  for (const plant of farm.plants) {
    if (!remaining || !plant.ready) continue;
    plant.ready = false;
    // Ripening already advanced this plant's schedule by one cycle. Keep its phase
    // so repeated collection across fields does not synchronize their timers.
    plant.nextReadyTick = tickAfter(plant.nextReadyTick, currentTick, plant.cycleTicks);
    remaining -= 1;
  }
  farm.readyCount = farm.plants.filter((plant) => plant.ready).length;
  return Math.max(0, Math.floor(quantity)) - remaining;
}

// Farm inventory is pooled by item, so reconcile it with the per-field ripe plants.
export function syncFarmHarvest(state) {
  const byItem = new Map();
  for (const [farmId, farm] of Object.entries(state.farms ?? {})) {
    const station = STATIONS[farmId] ?? state.customStations?.[farmId];
    const item = farm.item ?? station?.item;
    if (!item) continue;
    ensureFarmState(farm, state.tick ?? 0, farmId);
    if (!byItem.has(item)) byItem.set(item, []);
    byItem.get(item).push(farm);
  }

  for (const [item, farms] of byItem) {
    const location = state.stock[`farm:${item}`];
    let stock = location?.items[item] ?? 0;
    const maximumStock = farms.length * FARM_CAPACITY;
    if (stock > maximumStock && location) {
      const reserved = location.reserved?.[item] ?? 0;
      const removed = Math.min(stock - maximumStock, stock - reserved);
      stock -= removed;
      if (stock) location.items[item] = stock;
      else delete location.items[item];
    }
    let difference = stock - farms.reduce((sum, farm) => sum + farm.readyCount, 0);
    if (difference > 0) {
      for (const farm of farms) {
        for (const plant of farm.plants) {
          if (!difference) break;
          if (plant.ready) continue;
          plant.ready = true;
          plant.nextReadyTick = tickAfter(plant.nextReadyTick, state.tick ?? 0, plant.cycleTicks);
          farm.readyCount += 1;
          difference -= 1;
        }
        if (!difference) break;
      }
    } else if (difference < 0) {
      difference = -difference;
      for (const farm of [...farms].reverse()) {
        for (const plant of [...farm.plants].reverse()) {
          if (!difference) break;
          if (!plant.ready) continue;
          plant.ready = false;
          plant.nextReadyTick = tickAfter(plant.nextReadyTick, state.tick ?? 0, plant.cycleTicks);
          farm.readyCount -= 1;
          difference -= 1;
        }
        if (!difference) break;
      }
    }
    for (const farm of farms) farm.readyCount = farm.plants.filter((plant) => plant.ready).length;
  }
}

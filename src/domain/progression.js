import { ITEMS, MONEY_ATOMS, RECIPES, STATIONS, UPGRADES } from './catalog.js';

export const MACHINE_SPEED_BONUS_CAP = 0.25;
export const STAFF_SPEED_BONUS_CAP = 0.20;
export const PROGRESSION_DIMINISHING_RATE = 0.12;
export const PROGRESSION_COST_GROWTH = 1.22;

const MAX_UPGRADE_PRICE = Math.floor(Number.MAX_SAFE_INTEGER / MONEY_ATOMS);

function levelValue(level) {
  return Number.isSafeInteger(level) && level > 0 ? level : 0;
}

function diminishingGain(level, cap) {
  return cap * -Math.expm1(-PROGRESSION_DIMINISHING_RATE * levelValue(level));
}

export function machineSpeedMultiplier(level = 0) {
  return 1 + diminishingGain(level, MACHINE_SPEED_BONUS_CAP);
}

export function staffSpeedMultiplier(level = 0) {
  return 1 + diminishingGain(level, STAFF_SPEED_BONUS_CAP);
}

export function machineProductionSeconds(machineId, level = 0) {
  const station = STATIONS[machineId];
  const recipe = RECIPES[station?.recipe];
  return recipe ? recipe.seconds / machineSpeedMultiplier(level) : 0;
}

export function progressionUpgradeCost(baseCost, level = 0) {
  const safeBase = Number.isFinite(baseCost) && baseCost > 0 ? baseCost : 1;
  const safeLevel = levelValue(level);
  const scaled = safeBase * Math.pow(PROGRESSION_COST_GROWTH, safeLevel);
  return Math.min(MAX_UPGRADE_PRICE, Math.max(1, Math.ceil(scaled)));
}

export function machineUpgradeBaseCost(machineId) {
  const station = STATIONS[machineId];
  const recipe = RECIPES[station?.recipe];
  if (!recipe) return 1;
  const salePrice = ITEMS[recipe.output]?.price ?? 1;
  const expansion = UPGRADES.find((upgrade) => upgrade.id === machineId || upgrade.unlocks.includes(machineId));
  const progressionAnchor = expansion?.price ?? 0;
  return Math.ceil(Math.max(18, salePrice * 1.35, progressionAnchor * 0.18));
}

export function staffUpgradeBaseCost(role) {
  const expansion = UPGRADES.find((upgrade) => upgrade.id === role);
  return Math.ceil(Math.max(25, (expansion?.price ?? 50) * 0.45));
}

export function machineUpgradeCost(machineId, level = 0) {
  return progressionUpgradeCost(machineUpgradeBaseCost(machineId), level);
}

export function staffUpgradeCost(role, level = 0) {
  return progressionUpgradeCost(staffUpgradeBaseCost(role), level);
}

export function percentGain(currentValue, nextValue) {
  if (!Number.isFinite(currentValue) || currentValue <= 0 || !Number.isFinite(nextValue) || nextValue <= 0) return 0;
  return Math.max(0, (nextValue / currentValue - 1) * 100);
}

// ponytail: hedefe yakınlık ve PRP önleme yardımcıları
export function goalProximityPercent(currentAtoms, targetCostAtoms) {
  if (!Number.isFinite(targetCostAtoms) || targetCostAtoms <= 0) return 100;
  if (!Number.isFinite(currentAtoms) || currentAtoms <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((currentAtoms / targetCostAtoms) * 100)));
}

export function isNearMissGoal(currentAtoms, targetCostAtoms, minPercent = 85, maxPercent = 99) {
  const percent = goalProximityPercent(currentAtoms, targetCostAtoms);
  return percent >= minPercent && percent <= maxPercent;
}

export function endowedGoalProgress(currentAtoms, targetCostAtoms, bonusPercent = 20) {
  const actual = goalProximityPercent(currentAtoms, targetCostAtoms);
  return Math.min(100, Math.max(actual, bonusPercent));
}

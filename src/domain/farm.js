import { STATIONS } from './catalog.js';

// Farm stock is pooled by item. Keep each plot's ripe batch in step with that pool.
export function syncFarmHarvest(state) {
  const byItem = new Map();
  for (const [farmId, farm] of Object.entries(state.farms)) {
    const item = STATIONS[farmId]?.item;
    if (!item) continue;
    farm.readyCount = Number.isSafeInteger(farm.readyCount) && farm.readyCount >= 0 ? farm.readyCount : 0;
    if (!byItem.has(item)) byItem.set(item, []);
    byItem.get(item).push(farm);
  }
  for (const [item, farms] of byItem) {
    const stock = state.stock[`farm:${item}`]?.items[item] ?? 0;
    let difference = stock - farms.reduce((sum, farm) => sum + farm.readyCount, 0);
    if (difference > 0) {
      for (const farm of farms) {
        const added = Math.min(difference, Math.max(0, 3 - farm.readyCount));
        farm.readyCount += added;
        difference -= added;
        if (!difference) break;
      }
      if (difference) farms[0].readyCount += difference;
    } else if (difference < 0) {
      difference = -difference;
      for (const farm of farms) {
        const removed = Math.min(farm.readyCount, difference);
        farm.readyCount -= removed;
        difference -= removed;
        if (!difference) break;
      }
    }
  }
}

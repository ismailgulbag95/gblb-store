import { SHELVES, STATIONS, STAFF_FACILITIES } from './catalog.js';
import { STAFF_WAITING_AREA } from './dayCycle.js';

export const GRID_SIZE = 0.5;
const DEFAULT_POSITIONS = Object.fromEntries(Object.entries(STATIONS).map(([id, station]) => [id, { x: station.x, z: station.z }]));

export const ZONES = {
  farm: { minX: -25.5, maxX: -4.5, minZ: -8.5, maxZ: 8.5 },
  market: { minX: -3.5, maxX: 13.5, minZ: -8.5, maxZ: 8.5 },
  restaurant: { minX: -47.5, maxX: -26.5, minZ: -8.5, maxZ: 8.5 },
  staff: { minX: -4.5, maxX: 17.5, minZ: -20.5, maxZ: -9 },
  logistics: { minX: 14.5, maxX: 26.5, minZ: -8, maxZ: 8 },
};

export const HANGING_SIGN_DEFAULT_POSITIONS = Object.freeze({
  produce: Object.freeze({ x: -1, z: 0 }),
  drinks: Object.freeze({ x: 3, z: 0 }),
  bakery: Object.freeze({ x: 7, z: 0 }),
  grocery: Object.freeze({ x: 11, z: 0 }),
});

export const HANGING_SIGN_FOOTPRINT = Object.freeze({ width: 1.8, depth: 0.5 });

export function hangingSignPosition(state, id) {
  return state.hangingSigns?.[id] ?? HANGING_SIGN_DEFAULT_POSITIONS[id] ?? null;
}

export function normalizeHangingSignPositions(savedPositions) {
  const halfWidth = HANGING_SIGN_FOOTPRINT.width / 2;
  const halfDepth = HANGING_SIGN_FOOTPRINT.depth / 2;
  const bounds = ZONES.market;
  const minX = bounds.minX + halfWidth + 0.15;
  const maxX = bounds.maxX - halfWidth - 0.15;
  const minZ = bounds.minZ + halfDepth + 0.15;
  const maxZ = bounds.maxZ - halfDepth - 0.15;

  return Object.fromEntries(Object.entries(HANGING_SIGN_DEFAULT_POSITIONS).map(([id, fallback]) => {
    const saved = savedPositions?.[id];
    const snappedX = Math.round(saved?.x * 2) / 2;
    const snappedZ = Math.round(saved?.z * 2) / 2;
    const inBounds = Number.isFinite(saved?.x) && Number.isFinite(saved?.z)
      && snappedX >= minX && snappedX <= maxX && snappedZ >= minZ && snappedZ <= maxZ;
    return [id, inBounds
      ? { x: snappedX, z: snappedZ }
      : { ...fallback }];
  }));
}

export function canPlaceHangingSign(state, id, x, z) {
  if (!HANGING_SIGN_DEFAULT_POSITIONS[id] || !Number.isFinite(x) || !Number.isFinite(z)) return false;

  const halfWidth = HANGING_SIGN_FOOTPRINT.width / 2;
  const halfDepth = HANGING_SIGN_FOOTPRINT.depth / 2;
  const bounds = ZONES.market;
  if (x - halfWidth < bounds.minX + 0.15 || x + halfWidth > bounds.maxX - 0.15
    || z - halfDepth < bounds.minZ + 0.15 || z + halfDepth > bounds.maxZ - 0.15) return false;

  const positions = state.hangingSigns ?? HANGING_SIGN_DEFAULT_POSITIONS;
  return Object.entries(positions).every(([otherId, other]) => {
    if (otherId === id || !Number.isFinite(other?.x) || !Number.isFinite(other?.z)) return true;
    const enoughXSpace = Math.abs(x - other.x) >= HANGING_SIGN_FOOTPRINT.width + 0.55;
    const enoughZSpace = Math.abs(z - other.z) >= HANGING_SIGN_FOOTPRINT.depth + 0.35;
    return enoughXSpace || enoughZSpace;
  });
}

export const SHELF_STAGING_AREA = Object.freeze({
  bounds: Object.freeze({ minX: -2.75, maxX: -0.25, minZ: -8.475, maxZ: -6.525 }),
  slots: Object.freeze([
    Object.freeze({ x: -1.5, z: -7.5 }),
  ]),
});

/**
 * 3D modellerin gerçek görsel taban boyutları (genişlik: x ekseni, derinlik: z ekseni).
 */
export const STATION_FOOTPRINTS = Object.freeze({
  // Manav Tezgâhları (Produce)
  tomatoShelf: { width: 3.5, depth: 1.9 },
  orangeShelf: { width: 3.5, depth: 1.9 },
  cornShelf: { width: 3.5, depth: 1.9 },

  // Gondol Reyonlar (Gondola)
  pasteShelf: { width: 1.86, depth: 0.98 },
  popcornShelf: { width: 1.86, depth: 0.98 },

  // Soğutucu Dolaplar (Cooler)
  juiceShelf: { width: 2.34, depth: 1.25 },
  eggShelf: { width: 2.34, depth: 1.25 },
  colaShelf: { width: 2.34, depth: 1.25 },
  sodaShelf: { width: 2.34, depth: 1.25 },
  chipsShelf: { width: 1.86, depth: 0.98 },
  biscuitShelf: { width: 1.86, depth: 0.98 },
  chocolateShelf: { width: 1.86, depth: 0.98 },
  cannedFishShelf: { width: 1.86, depth: 0.98 },
  detergentShelf: { width: 1.86, depth: 0.98 },
  shampooShelf: { width: 1.86, depth: 0.98 },
  managerOffice: { width: 5, depth: 3.6 },
  loadingDock: { width: 2.6, depth: 2.3 },
  warehouse: { width: 3, depth: 3 },

  // Fırın Tezgâhı (Bakery)
  breadShelf: { width: 2.34, depth: 0.95 },

  // Kasa (Register & Self-Register)
  register: { width: 2.56, depth: 1.16 },
  selfRegister: { width: 1.4, depth: 1.1 },

  // Tarlalar (Farms)
  tomatoFarm: { width: 3.35, depth: 3.35 },
  tomatoFarm2: { width: 3.35, depth: 3.35 },
  orangeFarm: { width: 3.35, depth: 3.35 },
  orangeFarm2: { width: 3.35, depth: 3.35 },
  cornFarm: { width: 3.35, depth: 3.35 },
  cornFarm2: { width: 3.35, depth: 3.35 },
  wheatFarm: { width: 3.35, depth: 3.35 },
  wheatFarm2: { width: 3.35, depth: 3.35 },

  // Fabrika ve Mutfak Makineleri
  paste: { width: 3.2, depth: 2.9 },
  juice: { width: 3.2, depth: 2.9 },
  popcorn: { width: 3.2, depth: 2.9 },
  feed: { width: 3.2, depth: 2.9 },
  bakery: { width: 3.2, depth: 2.9 },
  flourMill: { width: 3.2, depth: 2.9 },
  orangeTartKitchen: { width: 3.2, depth: 2.9 },
  burgerKitchen: { width: 3.2, depth: 2.9 },
  pizzaKitchen: { width: 3.2, depth: 2.9 },

  // Tavuk Kümesi
  coop: { width: 3.3, depth: 3.2 },

  // Restoran Masaları
  table1: { width: 1.85, depth: 2.4 },
  table2: { width: 1.85, depth: 2.4 },
  table3: { width: 1.85, depth: 2.4 },
  table4: { width: 1.85, depth: 2.4 },
});

export const DEFAULT_STATION_FOOTPRINT = Object.freeze({ width: 2.0, depth: 2.0 });

export const DECORATION_FOOTPRINTS = Object.freeze({
  trashBin: { width: 0.8, depth: 0.8 },
  welcomeMat: { width: 1.65, depth: 1.05 },
  petalPlanter: { width: 1.0, depth: 1.0 },
  farmhouseSign: { width: 1.1, depth: 0.9 },
  orchardLantern: { width: 0.9, depth: 0.9 },
  pennantBanner: { width: 1.2, depth: 0.8 },
  harvestBasket: { width: 1.0, depth: 1.0 },
  citrusTopiary: { width: 1.0, depth: 1.0 },
  windowDisplay: { width: 1.6, depth: 1.0 },
  cardboardBoxes: { width: 1.2, depth: 1.1 },
  stoneWell: { width: 1.95, depth: 1.85, zone: 'farm' },
  scarecrow: { width: 1.9, depth: 1.7, zone: 'farm' },
  farmWindmill: { width: 2.0, depth: 1.9, zone: 'farm' },
  flowerTrellis: { width: 1.85, depth: 1.75, zone: 'farm' },
  hayBales: { width: 1.75, depth: 1.65, zone: 'farm' },
  harvestWagon: { width: 1.95, depth: 2.35, zone: 'farm' },
  roosterVane: { width: 1.9, depth: 1.7, zone: 'farm' },
  gardenPond: { width: 2.0, depth: 1.9, zone: 'farm' },
});

export const DEFAULT_DECORATION_FOOTPRINT = Object.freeze({ width: 1.0, depth: 1.0 });

export function resolveStationBaseId(id) {
  if (STATION_FOOTPRINTS[id]) return id;
  const base = id.split('_')[0];
  if (STATION_FOOTPRINTS[base]) return base;
  if (id.startsWith('table')) return 'table1';
  return id;
}

export function getStationDimensions(id, rotation = 0) {
  if (id.startsWith('staff-') && STAFF_FACILITIES[id.slice(6)]) {
    const facility = STAFF_FACILITIES[id.slice(6)];
    return { width: facility.width, depth: facility.depth };
  }
  const baseId = resolveStationBaseId(id);
  const base = STATION_FOOTPRINTS[id] ?? STATION_FOOTPRINTS[baseId] ?? DEFAULT_STATION_FOOTPRINT;
  const isRotated90 = Math.round(rotation / (Math.PI / 2)) % 2 !== 0;
  return isRotated90 ? { width: base.depth, depth: base.width } : { width: base.width, depth: base.depth };
}

export function getDecorationDimensions(type, rotation = 0) {
  const base = DECORATION_FOOTPRINTS[type] ?? DEFAULT_DECORATION_FOOTPRINT;
  const isRotated90 = Math.round(rotation / (Math.PI / 2)) % 2 !== 0;
  return isRotated90 ? { width: base.depth, depth: base.width } : { width: base.width, depth: base.depth };
}

export function getDecorationZone(type) {
  return DECORATION_FOOTPRINTS[type]?.zone ?? 'market';
}

export function stationZone(id) {
  if (id.startsWith('staff-')) return 'staff';
  if (['office', 'dock', 'warehouse'].includes(STATIONS[id]?.kind)) return 'logistics';
  const baseId = id.split('_')[0];
  if (baseId === 'register' || baseId === 'selfRegister' || STATIONS[baseId]?.kind === 'shelf' || baseId.endsWith('Shelf')) return 'market';
  if (baseId.startsWith('table') || baseId.endsWith('Kitchen')) return 'restaurant';
  return 'farm';
}

export function stationPosition(state, id) {
  if (state.pendingStationIds?.includes(id) && !state.layout?.[id]) return null;
  if (id.startsWith('staff-')) return state.layout?.[id] ?? STAFF_FACILITIES[id.slice(6)];
  if (state.pendingShelfIds?.includes(id) && !state.layout?.[id]) return null;
  return state.layout?.[id] ?? state.checkoutRegisters?.[id] ?? state.customStations?.[id] ?? STATIONS[id];
}

export function registerCashierPosition(register) {
  const rotation = register.rotation ?? 0;
  const behindOffset = 1.75;
  return {
    x: register.x - Math.sin(rotation) * behindOffset,
    z: register.z - Math.cos(rotation) * behindOffset,
    facing: rotation,
  };
}

export function registerCashPosition(register) {
  const rotation = register.rotation ?? 0;
  const sideOffset = register.isSelfCheckout ? 1.05 : 1.75;
  return {
    x: register.x + Math.cos(rotation) * sideOffset,
    z: register.z - Math.sin(rotation) * sideOffset,
  };
}

export function getShelfLocations(state, item) {
  const locations = [];
  const stations = { ...STATIONS, ...(state.customStations ?? {}) };
  for (const [id, station] of Object.entries(stations)) {
    if (station.kind !== 'shelf' || station.item !== item || !isStationUnlocked(state, id)) continue;
    const position = stationPosition(state, id);
    if (!position) continue;
    locations.push({
      id,
      stockId: state.customStations?.[id] ? `shelf:${id}` : SHELVES[item]?.id,
      x: position.x,
      z: position.z,
      rotation: position.rotation ?? 0,
    });
  }
  return locations.filter((shelf) => shelf.stockId);
}

export function getAllStationIds(state) {
  const ids = new Set(Object.keys(STATIONS));
  if (state?.customStations) {
    for (const id of Object.keys(state.customStations)) ids.add(id);
  }
  if (state?.selfRegisters) {
    for (const id of Object.keys(state.selfRegisters)) ids.add(id);
  }
  if (state?.checkoutRegisters) {
    for (const id of Object.keys(state.checkoutRegisters)) ids.add(id);
  }
  if (state?.layout) {
    for (const id of Object.keys(state.layout)) ids.add(id);
  }
  return [...ids];
}

export function syncCatalogLayout(state) {
  for (const [id, station] of Object.entries(STATIONS)) {
    const position = state.layout?.[id] ?? DEFAULT_POSITIONS[id];
    station.x = position.x;
    station.z = position.z;
    if (station.kind === 'shelf' && SHELVES[station.item]) {
      SHELVES[station.item].x = position.x;
      SHELVES[station.item].z = position.z;
    }
  }
}

export function isStationUnlocked(state, id) {
  if (id.startsWith('staff-')) return Boolean(state.staffLandCleared && state.staffFacilities?.[id.slice(6)]);
  if (state.checkoutRegisters?.[id]) return true;
  if (state.customStations?.[id]) return true;
  if (id.startsWith('selfRegister')) return true;
  const baseId = resolveStationBaseId(id);
  const station = STATIONS[id] ?? STATIONS[baseId] ?? state.customStations?.[id];
  if (!station) {
    if (state.farms?.[id]) return true;
    if (state.machines?.[id]) return true;
    if (state.diningTables?.[id]) return true;
    if (state.layout?.[id]) return true;
    return true;
  }
  if (station.kind === 'farm') return Boolean(state.farms?.[id] ?? state.farms?.[baseId] ?? state.unlocked?.[id] ?? false);
  if (station.kind === 'machine') return Boolean(state.machines?.[id] ?? state.machines?.[baseId] ?? state.unlocked?.[id] ?? false);
  if (station.kind === 'shelf') return state.unlockedProducts.includes(station.item);
  if (station.kind === 'coop') return Boolean(state.coops?.coop);
  if (station.kind === 'table') return Boolean(state.diningTables?.[id] || state.unlocked?.restaurant);
  if (['office', 'dock', 'warehouse'].includes(station.kind)) return Boolean(state.unlocked?.[id]);
  return true;
}

export function getStaffFacilityCollisionBoxes(state) {
  if (!state.staffLandCleared) return [];
  return Object.keys(state.staffFacilities ?? {}).filter(id => STAFF_FACILITIES[id]).map(id => {
    const facility = STAFF_FACILITIES[id];
    const point = stationPosition(state, `staff-${id}`);
    return { id: `staff-${id}`, minX: point.x - facility.width / 2, maxX: point.x + facility.width / 2,
      minZ: point.z - facility.depth / 2, maxZ: point.z + facility.depth / 2 };
  });
}

export function getStaffFacilityAccess(state, id, slot = 0) {
  const facility = STAFF_FACILITIES[id];
  if (!facility || !state.staffLandCleared || !state.staffFacilities?.[id]) return null;
  const point = stationPosition(state, `staff-${id}`);
  // Recovery spots are on the south porch, outside the blocked building footprint.
  return { x: point.x + (facility.capacity > 1 ? (slot % 2 ? 0.65 : -0.65) : 0),
    z: point.z + facility.depth / 2 + 0.6 };
}

export function canPlaceStation(state, id, x, z, rotation = undefined) {
  if (!isStationUnlocked(state, id) || !Number.isFinite(x) || !Number.isFinite(z)) return false;
  const rot = rotation ?? state.layout?.[id]?.rotation ?? 0;
  const dims = getStationDimensions(id, rot);
  const halfW = dims.width / 2;
  const halfD = dims.depth / 2;

  const overlaps = (bounds) => x + halfW > bounds.minX && x - halfW < bounds.maxX
    && z + halfD > bounds.minZ && z - halfD < bounds.maxZ;
  if (overlaps(STAFF_WAITING_AREA.bounds)) return false;
  if (STATIONS[id]?.kind !== 'shelf' && state.customStations?.[id]?.kind !== 'shelf'
    && overlaps(SHELF_STAGING_AREA.bounds)) return false;

  const zone = ZONES[stationZone(id)];
  if (!zone) return false;

  // Görsel sınırların zone alanı içinde kalması kontrolü
  if (
    x - halfW < zone.minX - 0.001 ||
    x + halfW > zone.maxX + 0.001 ||
    z - halfD < zone.minZ - 0.001 ||
    z + halfD > zone.maxZ + 0.001
  ) {
    return false;
  }

  // İstasyonlarla AABB çakışma kontrolü
  const allIds = getAllStationIds(state);
  const freeFromStations = allIds.every((otherId) => {
    if (otherId === id || !isStationUnlocked(state, otherId)) return true;
    const other = stationPosition(state, otherId);
    if (!other) return true;
    const otherRot = state.layout?.[otherId]?.rotation ?? 0;
    const otherDims = getStationDimensions(otherId, otherRot);

    const overlapX = (halfW + otherDims.width / 2) - Math.abs(x - other.x);
    const overlapZ = (halfD + otherDims.depth / 2) - Math.abs(z - other.z);
    return overlapX <= 0.001 || overlapZ <= 0.001;
  });

  if (!freeFromStations) return false;

  // Dekorasyonlarla AABB çakışma kontrolü
  const freeFromDecorations = (state.decorations ?? []).every((entry) => {
    const entryRot = entry.rotation ?? 0;
    const entryDims = getDecorationDimensions(entry.type, entryRot);
    const overlapX = (halfW + entryDims.width / 2) - Math.abs(x - entry.x);
    const overlapZ = (halfD + entryDims.depth / 2) - Math.abs(z - entry.z);
    return overlapX <= 0.001 || overlapZ <= 0.001;
  });

  return freeFromDecorations;
}

export function canPlaceDecoration(state, decorationId, x, z, rotation = undefined) {
  const entry = state.decorations?.find((candidate) => candidate.id === decorationId);
  if (!entry || !Number.isFinite(x) || !Number.isFinite(z)) return false;
  const rot = rotation ?? entry.rotation ?? 0;
  const dims = getDecorationDimensions(entry.type, rot);
  const halfW = dims.width / 2;
  const halfD = dims.depth / 2;

  const overlaps = (bounds) => x + halfW > bounds.minX && x - halfW < bounds.maxX
    && z + halfD > bounds.minZ && z - halfD < bounds.maxZ;
  if (overlaps(STAFF_WAITING_AREA.bounds) || overlaps(SHELF_STAGING_AREA.bounds)) return false;

  const zone = ZONES[getDecorationZone(entry.type)];
  if (
    x - halfW < zone.minX - 0.001 ||
    x + halfW > zone.maxX + 0.001 ||
    z - halfD < zone.minZ - 0.001 ||
    z + halfD > zone.maxZ + 0.001
  ) {
    return false;
  }

  // İstasyonlarla AABB çakışma kontrolü
  const freeFromStations = Object.keys(STATIONS).every((id) => {
    if (!isStationUnlocked(state, id)) return true;
    const point = stationPosition(state, id);
    if (!point) return true;
    const stRot = state.layout?.[id]?.rotation ?? 0;
    const stDims = getStationDimensions(id, stRot);

    const overlapX = (halfW + stDims.width / 2) - Math.abs(x - point.x);
    const overlapZ = (halfD + stDims.depth / 2) - Math.abs(z - point.z);
    return overlapX <= 0.001 || overlapZ <= 0.001;
  });

  if (!freeFromStations) return false;

  // Diğer dekorasyonlarla AABB çakışma kontrolü
  const freeFromDecorations = (state.decorations ?? []).every((other) => {
    if (other.id === decorationId) return true;
    const otherRot = other.rotation ?? 0;
    const otherDims = getDecorationDimensions(other.type, otherRot);

    const overlapX = (halfW + otherDims.width / 2) - Math.abs(x - other.x);
    const overlapZ = (halfD + otherDims.depth / 2) - Math.abs(z - other.z);
    return overlapX <= 0.001 || overlapZ <= 0.001;
  });

  return freeFromDecorations;
}

export function nextShelfStagingPosition(state, stationId) {
  return SHELF_STAGING_AREA.slots.find(({ x, z }) => canPlaceStation(state, stationId, x, z)) ?? null;
}

export function pendingPlacementIds(state) {
  return [...new Set([...(state.pendingShelfIds ?? []), ...(state.pendingStationIds ?? [])])];
}

// New fixtures must leave at least one grid cell between obstacles, and their
// front access point must be reachable from the area's entrance.
export function canPlaceAccessibleStation(state, id, x, z) {
  if (!canPlaceStation(state, id, x, z)) return false;
  const zone = ZONES[stationZone(id)];
  const dims = getStationDimensions(id, state.layout?.[id]?.rotation ?? 0);
  const obstacles = getAllStationIds(state).filter(other => other !== id && isStationUnlocked(state, other))
    .map(other => {
      const point = stationPosition(state, other);
      return point && { ...point, ...getStationDimensions(other, point.rotation ?? 0) };
    }).filter(Boolean);
  for (const entry of state.decorations ?? []) obstacles.push({ ...entry, ...getDecorationDimensions(entry.type, entry.rotation ?? 0) });
  if (obstacles.some(other => Math.abs(x - other.x) < (dims.width + other.width) / 2 + GRID_SIZE
    && Math.abs(z - other.z) < (dims.depth + other.depth) / 2 + GRID_SIZE)) return false;
  const rotation = state.layout?.[id]?.rotation ?? 0;
  const target = { x: x + Math.sin(rotation) * (dims.width / 2 + GRID_SIZE),
    z: z + Math.cos(rotation) * (dims.depth / 2 + GRID_SIZE) };
  const snap = value => Math.round(value / GRID_SIZE) * GRID_SIZE;
  const entrance = stationZone(id) === 'market' ? { x: 5, z: 8 }
    : { x: snap(zone.maxX - 1), z: 0 };
  const flood = boxes => {
    const free = (px, pz) => px >= zone.minX + 0.2 && px <= zone.maxX - 0.2
      && pz >= zone.minZ + 0.2 && pz <= zone.maxZ - 0.2
      && !boxes.some(o => Math.abs(px - o.x) < o.width / 2 + 0.2 && Math.abs(pz - o.z) < o.depth / 2 + 0.2);
    if (!free(entrance.x, entrance.z)) return new Set();
    const queue = [entrance], seen = new Set([`${entrance.x},${entrance.z}`]);
    for (let index = 0; index < queue.length; index++) {
      const p = queue[index];
      for (const [dx, dz] of [[GRID_SIZE, 0], [-GRID_SIZE, 0], [0, GRID_SIZE], [0, -GRID_SIZE]]) {
        const px = p.x + dx, pz = p.z + dz, key = `${px},${pz}`;
        if (!seen.has(key) && free(px, pz)) { seen.add(key); queue.push({ x: px, z: pz }); }
      }
    }
    return seen;
  };
  const reachable = flood([...obstacles, { x, z, ...dims }]);
  const keyAt = p => `${snap(p.x)},${snap(p.z)}`;
  if (!reachable.has(keyAt(target))) return false;
  const previouslyReachable = flood(obstacles);
  // Do not close access to another fixture that was reachable before placement.
  return obstacles.every(o => {
    const rot = o.rotation ?? 0;
    const access = { x: o.x + Math.sin(rot) * (o.width / 2 + GRID_SIZE),
      z: o.z + Math.cos(rot) * (o.depth / 2 + GRID_SIZE) };
    const key = keyAt(access);
    return !previouslyReachable.has(key) || reachable.has(key);
  });
}

export function nextStationPlacement(state, id) {
  const preferred = DEFAULT_POSITIONS[id] ?? state.customStations?.[id];
  if (!preferred) return null;
  if (canPlaceAccessibleStation(state, id, preferred.x, preferred.z)) return { x: preferred.x, z: preferred.z };
  const zone = ZONES[stationZone(id)], candidates = [];
  for (let x = Math.ceil(zone.minX / GRID_SIZE) * GRID_SIZE; x <= zone.maxX; x += GRID_SIZE) {
    for (let z = Math.ceil(zone.minZ / GRID_SIZE) * GRID_SIZE; z <= zone.maxZ; z += GRID_SIZE) {
      candidates.push({ x, z });
    }
  }
  candidates.sort((a, b) => Math.hypot(a.x - preferred.x, a.z - preferred.z)
    - Math.hypot(b.x - preferred.x, b.z - preferred.z) || a.x - b.x || a.z - b.z);
  return candidates.find(p => canPlaceAccessibleStation(state, id, p.x, p.z)) ?? null;
}

export function placeNewStation(state, id) {
  if (state.layout?.[id]) return true;
  state.pendingStationIds ??= [];
  if (!state.pendingStationIds.includes(id)) state.pendingStationIds.push(id);
  const position = nextStationPlacement(state, id);
  if (!position) return false;
  state.layout ??= {};
  state.layout[id] = position;
  state.pendingStationIds = state.pendingStationIds.filter(other => other !== id);
  state.pendingShelfIds = (state.pendingShelfIds ?? []).filter(other => other !== id);
  return true;
}

export function getMarketCollisionBoxes(state) {
  const boxes = [];
  const marketZone = ZONES.market;
  const GAP_THRESHOLD = 0.49; // 1 grid (0.5) altındaki boşluklar bitişik sayılır

  // 1. Açık market istasyonlarının sınır kutuları ve duvar bitişikliği kontrolü
  const allStations = {
    ...STATIONS,
    ...(state.customStations ?? {}),
    ...Object.fromEntries(Object.entries(state.checkoutRegisters ?? {}).map(([id, register]) => [id, { ...register, kind: 'register' }])),
  };
  for (const regId of Object.keys(state.selfRegisters ?? {})) {
    if (!allStations[regId]) {
      allStations[regId] = { kind: 'selfRegister', title: 'Otomatik Kasa' };
    }
  }

  for (const [id, station] of Object.entries(allStations)) {
    if (!['shelf', 'register', 'selfRegister'].includes(station.kind)) continue;
    if (!isStationUnlocked(state, id)) continue;

    const pos = stationPosition(state, id);
    if (!pos) continue;
    const rot = state.layout?.[id]?.rotation ?? 0;
    const dims = getStationDimensions(id, rot);
    const halfW = dims.width / 2;
    const halfD = Math.min(0.55, dims.depth / 2);

    let minX = pos.x - halfW;
    let maxX = pos.x + halfW;
    let minZ = pos.z - halfD;
    let maxZ = pos.z + halfD;

    // Duvar ile tezgah aralığı kontrolü (< 1 grid ise duvara kadar aralığı kapat)
    // Sol duvar (x = marketZone.minX = -3.5)
    const gapLeft = minX - marketZone.minX;
    if (gapLeft >= 0 && gapLeft < GAP_THRESHOLD) {
      minX = marketZone.minX;
    }
    // Sağ duvar (x = marketZone.maxX = 13.5)
    const gapRight = marketZone.maxX - maxX;
    if (gapRight >= 0 && gapRight < GAP_THRESHOLD) {
      maxX = marketZone.maxX;
    }
    // Arka duvar (z = marketZone.minZ = -8.5)
    const gapBack = minZ - marketZone.minZ;
    if (gapBack >= 0 && gapBack < GAP_THRESHOLD) {
      minZ = marketZone.minZ;
    }
    // Ön duvar (z = marketZone.maxZ = 8.5) - kapı açıklığı [0.9, 9.1] dışındaysa
    if (maxX < 1.0 || minX > 9.0) {
      const gapFront = marketZone.maxZ - maxZ;
      if (gapFront >= 0 && gapFront < GAP_THRESHOLD) {
        maxZ = marketZone.maxZ;
      }
    }

    boxes.push({ id, item: station.item, minX, maxX, minZ, maxZ });
  }

  // 2. Tezgahlar arası bitişiklik kontrolü (< 1 grid ise aradaki boşluğu kapat)
  const gapBlockers = [];
  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const b1 = boxes[i];
      const b2 = boxes[j];

      // Yan yana (X ekseninde boşluk, Z ekseninde örtüşme)
      const overlapZ = Math.min(b1.maxZ, b2.maxZ) - Math.max(b1.minZ, b2.minZ);
      if (overlapZ > 0.1) {
        const left = b1.minX < b2.minX ? b1 : b2;
        const right = b1.minX < b2.minX ? b2 : b1;
        const gapX = right.minX - left.maxX;
        if (gapX >= -0.01 && gapX < GAP_THRESHOLD) {
          gapBlockers.push({
            id: `gap:x:${left.id}:${right.id}`,
            minX: left.maxX,
            maxX: right.minX,
            minZ: Math.max(left.minZ, right.minZ),
            maxZ: Math.min(left.maxZ, right.maxZ),
          });
        }
      }

      // Ön-arka (Z ekseninde boşluk, X ekseninde örtüşme)
      const overlapX = Math.min(b1.maxX, b2.maxX) - Math.max(b1.minX, b2.minX);
      if (overlapX > 0.1) {
        const back = b1.minZ < b2.minZ ? b1 : b2;
        const front = b1.minZ < b2.minZ ? b2 : b1;
        const gapZ = front.minZ - back.maxZ;
        if (gapZ >= -0.01 && gapZ < GAP_THRESHOLD) {
          gapBlockers.push({
            id: `gap:z:${back.id}:${front.id}`,
            minX: Math.max(back.minX, front.minX),
            maxX: Math.min(back.maxX, front.maxX),
            minZ: back.maxZ,
            maxZ: front.minZ,
          });
        }
      }
    }
  }

  return [...boxes, ...gapBlockers];
}

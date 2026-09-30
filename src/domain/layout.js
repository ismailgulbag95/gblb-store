import { SHELVES, STATIONS } from './catalog.js';

export const GRID_SIZE = 0.5;
const DEFAULT_POSITIONS = Object.fromEntries(Object.entries(STATIONS).map(([id, station]) => [id, { x: station.x, z: station.z }]));

export const ZONES = {
  farm: { minX: -25.5, maxX: -4.5, minZ: -8.5, maxZ: 8.5 },
  market: { minX: -3.5, maxX: 13.5, minZ: -8.5, maxZ: 8.5 },
  restaurant: { minX: -47.5, maxX: -26.5, minZ: -8.5, maxZ: 8.5 },
};

/**
 * 3D modellerin gerçek görsel taban boyutları (genişlik: x ekseni, derinlik: z ekseni).
 */
export const STATION_FOOTPRINTS = Object.freeze({
  // Manav Tezgâhları (Produce)
  tomatoShelf: { width: 2.35, depth: 1.35 },
  orangeShelf: { width: 2.35, depth: 1.35 },
  cornShelf: { width: 2.35, depth: 1.35 },

  // Gondol Reyonlar (Gondola)
  pasteShelf: { width: 1.86, depth: 0.98 },
  popcornShelf: { width: 1.86, depth: 0.98 },

  // Soğutucu Dolaplar (Cooler)
  juiceShelf: { width: 2.34, depth: 1.25 },
  eggShelf: { width: 2.34, depth: 1.25 },

  // Fırın Tezgâhı (Bakery)
  breadShelf: { width: 2.34, depth: 0.95 },

  // Kasa (Register & Self-Register)
  register: { width: 2.56, depth: 1.16 },
  selfRegister: { width: 1.4, depth: 1.1 },

  // Tarlalar (Farms)
  tomatoFarm: { width: 1.95, depth: 2.55 },
  tomatoFarm2: { width: 1.95, depth: 2.55 },
  orangeFarm: { width: 1.95, depth: 2.55 },
  orangeFarm2: { width: 1.95, depth: 2.55 },
  cornFarm: { width: 1.95, depth: 2.55 },
  wheatFarm: { width: 1.95, depth: 2.55 },

  // Fabrika ve Mutfak Makineleri
  paste: { width: 2.6, depth: 1.8 },
  juice: { width: 2.6, depth: 1.8 },
  popcorn: { width: 2.6, depth: 1.8 },
  feed: { width: 2.6, depth: 1.8 },
  bakery: { width: 2.6, depth: 1.8 },
  burgerKitchen: { width: 2.6, depth: 1.8 },
  pizzaKitchen: { width: 2.6, depth: 1.8 },

  // Tavuk Kümesi
  coop: { width: 2.6, depth: 2.2 },

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

export function stationZone(id) {
  const baseId = id.split('_')[0];
  if (baseId === 'register' || baseId === 'selfRegister' || STATIONS[baseId]?.kind === 'shelf' || baseId.endsWith('Shelf')) return 'market';
  if (baseId.startsWith('table') || baseId.endsWith('Kitchen')) return 'restaurant';
  return 'farm';
}

export function stationPosition(state, id) {
  return state.layout?.[id] ?? state.customStations?.[id] ?? STATIONS[id];
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
  return true;
}

export function canPlaceStation(state, id, x, z, rotation = undefined) {
  if (!isStationUnlocked(state, id) || !Number.isFinite(x) || !Number.isFinite(z)) return false;
  const rot = rotation ?? state.layout?.[id]?.rotation ?? 0;
  const dims = getStationDimensions(id, rot);
  const halfW = dims.width / 2;
  const halfD = dims.depth / 2;

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

  const zone = ZONES.market;
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

export function getMarketCollisionBoxes(state) {
  const boxes = [];
  const marketZone = ZONES.market;
  const GAP_THRESHOLD = 0.49; // 1 grid (0.5) altındaki boşluklar bitişik sayılır

  // 1. Açık market istasyonlarının sınır kutuları ve duvar bitişikliği kontrolü
  const allStations = { ...STATIONS, ...(state.customStations ?? {}) };
  for (const regId of Object.keys(state.selfRegisters ?? {})) {
    if (!allStations[regId]) {
      allStations[regId] = { kind: 'selfRegister', title: 'Otomatik Kasa' };
    }
  }

  for (const [id, station] of Object.entries(allStations)) {
    if (!['shelf', 'register', 'selfRegister'].includes(station.kind)) continue;
    if (!isStationUnlocked(state, id)) continue;

    const pos = stationPosition(state, id);
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

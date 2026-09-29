import { ITEMS, RECIPES, SHELVES, STATIONS } from './catalog.js';

/**
 * Parabolik (kuadratik) fiyat hesaplama formülü:
 * Fiyat = basePrice * (1 + 0.45 * count + 0.35 * count^2)
 * Adet arttıkça maliyet parabolik olarak yükselir.
 */
export function calculateParabolicPrice(basePrice, currentCount) {
  const count = Math.max(0, currentCount);
  const multiplier = 1 + 0.45 * count + 0.35 * count * count;
  return Math.round(basePrice * multiplier);
}

export const FURNITURE_TYPES = Object.freeze({
  // --- Tarlalar & Bahçeler ---
  tomatoFarm: {
    id: 'tomatoFarm',
    kind: 'farm',
    item: 'TOMATO',
    name: 'Domates Tarlası',
    nameEn: 'Tomato Field',
    icon: '🍅',
    basePrice: 35,
    category: 'farm',
    unlockItem: 'TOMATO',
    zone: 'farm',
    footprint: { width: 1.95, depth: 2.55 },
    description: 'Sürekli taze domates üretir.',
  },
  orangeFarm: {
    id: 'orangeFarm',
    kind: 'farm',
    item: 'ORANGE',
    name: 'Portakal Bahçesi',
    nameEn: 'Orange Grove',
    icon: '🍊',
    basePrice: 55,
    category: 'farm',
    unlockItem: 'ORANGE',
    zone: 'farm',
    footprint: { width: 1.95, depth: 2.55 },
    description: 'Sıkmalık sulu portakallar yetiştirir.',
  },
  cornFarm: {
    id: 'cornFarm',
    kind: 'farm',
    item: 'CORN',
    name: 'Mısır Tarlası',
    nameEn: 'Corn Field',
    icon: '🌽',
    basePrice: 75,
    category: 'farm',
    unlockItem: 'CORN',
    zone: 'farm',
    footprint: { width: 1.95, depth: 2.55 },
    description: 'Patlatmalık ve yemlik mısır üretir.',
  },
  wheatFarm: {
    id: 'wheatFarm',
    kind: 'farm',
    item: 'WHEAT',
    name: 'Buğday Tarlası',
    nameEn: 'Wheat Field',
    icon: '🌾',
    basePrice: 95,
    category: 'farm',
    unlockItem: 'WHEAT',
    zone: 'farm',
    footprint: { width: 1.95, depth: 2.55 },
    description: 'Fırın için altın sarısı buğday başakları yetiştirir.',
  },

  // --- Reyonlar & Raflar ---
  tomatoShelf: {
    id: 'tomatoShelf',
    kind: 'shelf',
    item: 'TOMATO',
    name: 'Domates Tezgâhı',
    nameEn: 'Tomato Produce Shelf',
    icon: '🧺',
    basePrice: 30,
    category: 'shelf',
    unlockItem: 'TOMATO',
    zone: 'market',
    footprint: { width: 2.35, depth: 1.35 },
    capacity: 8,
    displayType: 'produce',
    description: 'Müşterilerin taze domates aldığı manav tezgâhı.',
  },
  pasteShelf: {
    id: 'pasteShelf',
    kind: 'shelf',
    item: 'TOMATO_PASTE',
    name: 'Salça Reyonu',
    nameEn: 'Tomato Paste Shelf',
    icon: '🥫',
    basePrice: 45,
    category: 'shelf',
    unlockItem: 'TOMATO_PASTE',
    zone: 'market',
    footprint: { width: 1.86, depth: 0.98 },
    capacity: 6,
    displayType: 'gondola',
    description: 'Salça kavanozlarının dizildiği gondol reyon.',
  },
  orangeShelf: {
    id: 'orangeShelf',
    kind: 'shelf',
    item: 'ORANGE',
    name: 'Portakal Tezgâhı',
    nameEn: 'Orange Produce Shelf',
    icon: '🍊',
    basePrice: 40,
    category: 'shelf',
    unlockItem: 'ORANGE',
    zone: 'market',
    footprint: { width: 2.35, depth: 1.35 },
    capacity: 8,
    displayType: 'produce',
    description: 'Taze portakalların sergilendiği manav reyonu.',
  },
  juiceShelf: {
    id: 'juiceShelf',
    kind: 'shelf',
    item: 'ORANGE_JUICE',
    name: 'Meyve Suyu Soğutucusu',
    nameEn: 'Juice Cooler',
    icon: '🧃',
    basePrice: 50,
    category: 'shelf',
    unlockItem: 'ORANGE_JUICE',
    zone: 'market',
    footprint: { width: 2.34, depth: 1.25 },
    capacity: 6,
    displayType: 'cooler',
    description: 'Soğuk meyve suyu kutularını serin tutan dolap.',
  },
  cornShelf: {
    id: 'cornShelf',
    kind: 'shelf',
    item: 'CORN',
    name: 'Mısır Tezgâhı',
    nameEn: 'Corn Produce Shelf',
    icon: '🌽',
    basePrice: 55,
    category: 'shelf',
    unlockItem: 'CORN',
    zone: 'market',
    footprint: { width: 2.35, depth: 1.35 },
    capacity: 8,
    displayType: 'produce',
    description: 'Taze koçan mısırların yer aldığı tezgâh.',
  },
  popcornShelf: {
    id: 'popcornShelf',
    kind: 'shelf',
    item: 'POPCORN',
    name: 'Popcorn Reyonu',
    nameEn: 'Popcorn Shelf',
    icon: '🍿',
    basePrice: 65,
    category: 'shelf',
    unlockItem: 'POPCORN',
    zone: 'market',
    footprint: { width: 1.86, depth: 0.98 },
    capacity: 6,
    displayType: 'gondola',
    description: 'Sıcak patlamış mısır paketleri için reyon.',
  },
  eggShelf: {
    id: 'eggShelf',
    kind: 'shelf',
    item: 'EGG',
    name: 'Yumurta Dolabı',
    nameEn: 'Egg Cooler',
    icon: '🥚',
    basePrice: 70,
    category: 'shelf',
    unlockItem: 'EGG',
    zone: 'market',
    footprint: { width: 2.34, depth: 1.25 },
    capacity: 6,
    displayType: 'cooler',
    description: 'Kümesten gelen taze çiftlik yumurtaları dolabı.',
  },
  breadShelf: {
    id: 'breadShelf',
    kind: 'shelf',
    item: 'BREAD',
    name: 'Fırın Ekmek Tezgâhı',
    nameEn: 'Bakery Bread Stand',
    icon: '🍞',
    basePrice: 85,
    category: 'shelf',
    unlockItem: 'BREAD',
    zone: 'market',
    footprint: { width: 2.34, depth: 0.95 },
    capacity: 6,
    displayType: 'bakery',
    description: 'Taş fırından çıkan sıcacık somun ekmekler.',
  },
  flourShelf: {
    id: 'flourShelf',
    kind: 'shelf',
    item: 'FLOUR',
    name: 'Un Reyonu',
    nameEn: 'Flour Shelf',
    icon: '🛍️',
    basePrice: 75,
    category: 'shelf',
    unlockItem: 'FLOUR',
    zone: 'market',
    footprint: { width: 1.86, depth: 0.98 },
    capacity: 6,
    displayType: 'gondola',
    description: 'Değirmende öğütülmüş unu müşterilere sunar.',
  },
  orangeTartShelf: {
    id: 'orangeTartShelf',
    kind: 'shelf',
    item: 'ORANGE_TART',
    name: 'Pastane Tezgâhı',
    nameEn: 'Pastry Counter',
    icon: '🥧',
    basePrice: 95,
    category: 'shelf',
    unlockItem: 'ORANGE_TART',
    zone: 'market',
    footprint: { width: 2.34, depth: 0.95 },
    capacity: 6,
    displayType: 'bakery',
    description: 'Taze portakallı tartları sergiler.',
  },

  // --- Üretim Makineleri ---
  paste: {
    id: 'paste',
    kind: 'machine',
    recipe: 'paste',
    name: 'Salça Kazanı',
    nameEn: 'Tomato Paste Vat',
    icon: '🥫',
    basePrice: 60,
    category: 'machine',
    unlockItem: 'TOMATO_PASTE',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Domatesleri kaynatarak nefis salça üretir.',
  },
  juice: {
    id: 'juice',
    kind: 'machine',
    recipe: 'juice',
    name: 'Meyve Sıkacağı',
    nameEn: 'Juice Extractor',
    icon: '🧃',
    basePrice: 75,
    category: 'machine',
    unlockItem: 'ORANGE_JUICE',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Portakalları sıkarak kutu meyve suyu hazırlar.',
  },
  popcorn: {
    id: 'popcorn',
    kind: 'machine',
    recipe: 'popcorn',
    name: 'Popcorn Makinesi',
    nameEn: 'Popcorn Machine',
    icon: '🍿',
    basePrice: 90,
    category: 'machine',
    unlockItem: 'POPCORN',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Mısırları çıtır çıtır patlatır.',
  },
  feed: {
    id: 'feed',
    kind: 'machine',
    recipe: 'feed',
    name: 'Yem Değirmeni',
    nameEn: 'Feed Grinder',
    icon: '🌾',
    basePrice: 95,
    category: 'machine',
    unlockItem: 'CHICKEN_FEED',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Mısırı öğüterek besleyici tavuk yemi üretir.',
  },
  bakery: {
    id: 'bakery',
    kind: 'machine',
    recipe: 'bakery',
    name: 'Taş Fırın',
    nameEn: 'Stone Oven',
    icon: '🍞',
    basePrice: 130,
    category: 'machine',
    unlockItem: 'BREAD',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Buğday ve yumurtayı odun ateşinde ekmeğe dönüştürür.',
  },
  flourMill: {
    id: 'flourMill',
    kind: 'machine',
    recipe: 'flour',
    name: 'Un Değirmeni',
    nameEn: 'Flour Mill',
    icon: '🛍️',
    basePrice: 145,
    category: 'machine',
    unlockItem: 'FLOUR',
    zone: 'farm',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Buğdayı öğüterek un üretir.',
  },
  orangeTartKitchen: {
    id: 'orangeTartKitchen',
    kind: 'machine',
    recipe: 'orangeTart',
    name: 'Pastane Tezgâhı',
    nameEn: 'Pastry Kitchen',
    icon: '🥧',
    basePrice: 185,
    category: 'machine',
    unlockItem: 'ORANGE_TART',
    zone: 'restaurant',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Un, yumurta ve portakalı taze tartlara dönüştürür.',
  },
  burgerKitchen: {
    id: 'burgerKitchen',
    kind: 'machine',
    recipe: 'burger',
    name: 'Burger Izgarası',
    nameEn: 'Burger Grill',
    icon: '🍔',
    basePrice: 175,
    category: 'machine',
    unlockItem: 'BURGER',
    zone: 'restaurant',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Gurme restoran müşterileri için leziz burgerler pişirir.',
  },
  pizzaKitchen: {
    id: 'pizzaKitchen',
    kind: 'machine',
    recipe: 'pizza',
    name: 'Pizza Fırını',
    nameEn: 'Pizza Oven',
    icon: '🍕',
    basePrice: 190,
    category: 'machine',
    unlockItem: 'PIZZA',
    zone: 'restaurant',
    footprint: { width: 2.6, depth: 1.8 },
    description: 'Taş tabanlı fırında nefis çıtır pizzalar hazırlar.',
  },

  // --- Restoran Donanımları ---
  table: {
    id: 'table',
    kind: 'table',
    name: 'Restoran Masası',
    nameEn: 'Dining Table',
    icon: '🍽️',
    basePrice: 90,
    category: 'restaurant',
    unlockCondition: (state) => Boolean(state.unlocked.restaurant),
    zone: 'restaurant',
    footprint: { width: 1.85, depth: 2.4 },
    description: 'Gelen gurme misafirlerin oturup bahşiş bıraktığı masa.',
  },

  // --- Kasalar (Otomatik Kasa / Self-Checkout) ---
  selfRegister: {
    id: 'selfRegister',
    kind: 'selfRegister',
    name: 'Otomatik Kasa',
    nameEn: 'Self-Checkout Kiosk',
    icon: '🤖',
    basePrice: 120,
    category: 'register',
    unlockCondition: (state) => Boolean(state.unlocked.register),
    zone: 'market',
    footprint: { width: 1.4, depth: 1.1 },
    description: 'Personelsiz otomatik kasa! Müşteriler kasiyere ihtiyaç duymadan hızla ödeme yapar.',
  },
});

/**
 * Bir mobilyanın kilidinin açık olup olmadığını kontrol eder.
 * Yeni bir ürün/yapı kilidi açıldığında (artık üretilebilir olduğunda) mobilya dükkanında açılır.
 */
export function isFurnitureUnlocked(state, type) {
  const definition = FURNITURE_TYPES[type];
  if (!definition) return false;
  if (typeof definition.unlockCondition === 'function') {
    return definition.unlockCondition(state);
  }
  if (definition.unlockItem) {
    if (definition.unlockItem === 'TOMATO') return true;
    return state.unlockedProducts.includes(definition.unlockItem);
  }
  return false;
}

/**
 * Sahip olunan eşya adedini hesaplar.
 */
export function getFurnitureCount(state, type) {
  const definition = FURNITURE_TYPES[type];
  if (!definition) return 0;

  let count = 0;
  if (definition.kind === 'farm') {
    for (const [farmId, farm] of Object.entries(state.farms ?? {})) {
      const station = STATIONS[farmId] ?? state.customStations?.[farmId];
      if (station?.item === definition.item || farmId.startsWith(type)) count += 1;
    }
  } else if (definition.kind === 'shelf') {
    // Normal ve özel reyonlar
    for (const [key, station] of Object.entries({ ...STATIONS, ...(state.customStations ?? {}) })) {
      if (station.kind === 'shelf' && station.item === definition.item) count += 1;
    }
  } else if (definition.kind === 'machine') {
    for (const [machineId, machine] of Object.entries(state.machines ?? {})) {
      const station = STATIONS[machineId] ?? state.customStations?.[machineId];
      if (station?.recipe === definition.recipe || machineId.startsWith(type)) count += 1;
    }
  } else if (definition.kind === 'table') {
    count = Object.keys(state.diningTables ?? {}).length;
  } else if (definition.kind === 'selfRegister') {
    count = Object.keys(state.selfRegisters ?? {}).length;
  }
  return count;
}

/**
 * Mobilyanın anlık parabolik fiyatını hesaplar.
 */
export function getFurniturePrice(state, type) {
  const definition = FURNITURE_TYPES[type];
  if (!definition) return 0;
  const count = getFurnitureCount(state, type);
  return calculateParabolicPrice(definition.basePrice, count);
}

/**
 * Personel baz fiyatları ve parabolik fiyat hesaplama.
 */
export const STAFF_BASE_PRICES = Object.freeze({
  cashier: 35,
  harvester: 60,
  factoryFeeder: 90,
  caretaker: 150,
  chefWaiter: 220,
});

export function getStaffCount(state, role) {
  if (role === 'chefWaiter') {
    return state.workers.filter((worker) => worker.type === 'chefWaiter' || worker.type === 'waiter').length / 2;
  }
  return state.workers.filter((worker) => worker.type === role).length;
}

export function getStaffHirePrice(state, role) {
  const basePrice = STAFF_BASE_PRICES[role] ?? 50;
  const count = Math.floor(getStaffCount(state, role));
  return calculateParabolicPrice(basePrice, count);
}

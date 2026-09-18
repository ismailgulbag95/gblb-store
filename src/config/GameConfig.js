// Central data-driven game configuration
export const ITEM_TYPES = {
  // --- TIER 1: TEMEL TARIM & SALÇA ---
  TOMATO: {
    id: 'TOMATO',
    nameKey: 'item_tomato',
    name: 'Domates',
    price: 3,
    color: 0xff4757, // Vibrant ruby red
    size: [0.35, 0.35, 0.35],
    icon: '🍅'
  },
  TOMATO_PASTE: {
    id: 'TOMATO_PASTE',
    nameKey: 'item_tomato_paste',
    name: 'Salça Kavanozu',
    price: 12, // 4x value
    color: 0xeb2f06,
    accentColor: 0xffc048, // Gold lid
    size: [0.32, 0.45, 0.32],
    icon: '🥫'
  },

  // --- TIER 2: MEYVE & İÇECEK ---
  ORANGE: {
    id: 'ORANGE',
    nameKey: 'item_orange',
    name: 'Portakal',
    price: 4,
    color: 0xff9f1a, // Bright tangerine orange
    size: [0.35, 0.35, 0.35],
    icon: '🍊'
  },
  ORANGE_JUICE: {
    id: 'ORANGE_JUICE',
    nameKey: 'item_orange_juice',
    name: 'Taze Portakal Suyu',
    price: 16, // 4x value
    color: 0xffa502,
    accentColor: 0x00d2d3, // Cyan cap
    size: [0.3, 0.5, 0.3],
    icon: '🧃'
  },

  // --- TIER 3: ÇİFTLİK, MISIR & TAVUK KÜMESİ ---
  CORN: {
    id: 'CORN',
    nameKey: 'item_corn',
    name: 'Taze Mısır',
    price: 5,
    color: 0xffc048, // Bright golden corn
    size: [0.3, 0.45, 0.3],
    icon: '🌽'
  },
  POPCORN: {
    id: 'POPCORN',
    nameKey: 'item_popcorn',
    name: 'Sıcak Popcorn',
    price: 20, // 4x value
    color: 0xfff275,
    accentColor: 0xff4757,
    size: [0.35, 0.4, 0.35],
    icon: '🍿'
  },
  CHICKEN_FEED: {
    id: 'CHICKEN_FEED',
    nameKey: 'item_chicken_feed',
    name: 'Tavuk Yemi Çuvalı',
    price: 8,
    color: 0xf1c40f,
    accentColor: 0x8d6e63,
    size: [0.32, 0.42, 0.32],
    icon: '🌾'
  },
  EGG: {
    id: 'EGG',
    nameKey: 'item_egg',
    name: 'Çiftlik Yumurtası',
    price: 18,
    color: 0xffffff,
    accentColor: 0xffa502,
    size: [0.28, 0.35, 0.28],
    icon: '🥚'
  },

  // --- TIER 4: BUĞDAY & FIRIN ---
  WHEAT: {
    id: 'WHEAT',
    nameKey: 'item_wheat',
    name: 'Altın Buğday',
    price: 4,
    color: 0xffda79,
    accentColor: 0xff9f1a,
    size: [0.3, 0.45, 0.3],
    icon: '🌾'
  },
  BREAD: {
    id: 'BREAD',
    nameKey: 'item_bread',
    name: 'Taş Fırın Ekmek',
    price: 24, // High value
    color: 0xe58e26,
    accentColor: 0xf8c291,
    size: [0.4, 0.3, 0.35],
    icon: '🍞'
  },

  // --- TIER 5: GURME RESTORAN & KOMBİNASYONLU YEMEKLER ---
  BURGER: {
    id: 'BURGER',
    nameKey: 'item_burger',
    name: 'Gurme Burger',
    price: 75, // Mega value!
    color: 0xff9f43,
    accentColor: 0x2ed573,
    size: [0.45, 0.4, 0.45],
    icon: '🍔'
  },
  PIZZA: {
    id: 'PIZZA',
    nameKey: 'item_pizza',
    name: 'İtalyan Pizza',
    price: 90, // Ultimate value!
    color: 0xff4757,
    accentColor: 0xffc048,
    size: [0.5, 0.15, 0.5],
    icon: '🍕'
  },
  COFFEE: {
    id: 'COFFEE',
    nameKey: 'item_coffee',
    name: 'Kremalı Latte',
    price: 50,
    color: 0x833471,
    accentColor: 0xffffff,
    size: [0.3, 0.45, 0.3],
    icon: '☕'
  }
};

export const GAME_CONFIG = {
  PLAYER: {
    speed: 7.5,
    baseStackCapacity: 6,
    turnSpeed: 14.0
  },
  FARM: {
    growTime: 2.2,
    yieldCount: 3
  },
  PROCESSING: {
    tomatoPasteTime: 3.0,
    inputRequired: 2,
    orangeJuiceTime: 3.5,
    orangeInputRequired: 2,
    popcornTime: 2.5,
    popcornInputRequired: 1,
    feedTime: 2.2,
    feedInputRequired: 1,
    breadTime: 4.0,
    breadInputRequired: 2,
    burgerTime: 4.5,
    pizzaTime: 5.0
  },
  CUSTOMER: {
    spawnInterval: 4.0,
    maxActive: 8,
    walkSpeed: 3.6,
    payTime: 1.4
  },
  COLORS: {
    FLOOR_STORE: 0xffffff, // Crisp clean white floor
    FLOOR_FARM: 0x10ac84, // Rich vibrant fertile pasture green
    FLOOR_RESTAURANT: 0x6d4c41, // Warm rich timber wood
    WALLS: 0x2f3640,
    WOOD_SHELF: 0xb87333,
    REGISTER: 0x3867d6, // Vibrant Cobalt Blue counter
    ZONE_UNLOCK: 0x2ed573 // Duolingo Green
  }
};

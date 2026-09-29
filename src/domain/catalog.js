export const MONEY_ATOMS = 10_000;

export const ITEMS = Object.freeze({
  TOMATO: { id: 'TOMATO', name: 'Domates', icon: '🍅', price: 3, color: 0xef4444 },
  TOMATO_PASTE: { id: 'TOMATO_PASTE', name: 'Salça', icon: '🥫', price: 12, color: 0xc2410c },
  ORANGE: { id: 'ORANGE', name: 'Portakal', icon: '🍊', price: 4, color: 0xf97316 },
  ORANGE_JUICE: { id: 'ORANGE_JUICE', name: 'Portakal suyu', icon: '🧃', price: 16, color: 0xfbbf24 },
  CORN: { id: 'CORN', name: 'Mısır', icon: '🌽', price: 5, color: 0xfacc15 },
  POPCORN: { id: 'POPCORN', name: 'Popcorn', icon: '🍿', price: 20, color: 0xfde68a },
  CHICKEN_FEED: { id: 'CHICKEN_FEED', name: 'Tavuk yemi', icon: '🌾', price: 8, color: 0xa16207 },
  EGG: { id: 'EGG', name: 'Yumurta', icon: '🥚', price: 18, color: 0xfef3c7 },
  WHEAT: { id: 'WHEAT', name: 'Buğday', icon: '🌾', price: 4, color: 0xfbbf24 },
  BREAD: { id: 'BREAD', name: 'Ekmek', icon: '🍞', price: 24, color: 0xc2410c },
  BURGER: { id: 'BURGER', name: 'Gurme burger', icon: '🍔', price: 75, color: 0xfb923c },
  PIZZA: { id: 'PIZZA', name: 'Pizza', icon: '🍕', price: 90, color: 0xdc2626 },
});

export const RECIPES = Object.freeze({
  paste: { inputs: { TOMATO: 2 }, output: 'TOMATO_PASTE', seconds: 3 },
  juice: { inputs: { ORANGE: 2 }, output: 'ORANGE_JUICE', seconds: 3.5 },
  popcorn: { inputs: { CORN: 1 }, output: 'POPCORN', seconds: 2.5 },
  feed: { inputs: { CORN: 1 }, output: 'CHICKEN_FEED', seconds: 2.2 },
  bakery: { inputs: { WHEAT: 2, EGG: 1 }, output: 'BREAD', seconds: 4 },
  burger: { inputs: { BREAD: 1, TOMATO: 1 }, output: 'BURGER', seconds: 4.5 },
  pizza: { inputs: { WHEAT: 1, TOMATO: 2 }, output: 'PIZZA', seconds: 5 },
});

export const STATIONS = Object.freeze({
  tomatoFarm: { kind: 'farm', item: 'TOMATO', x: -10, z: 5, title: 'Domates tarlası' },
  tomatoFarm2: { kind: 'farm', item: 'TOMATO', x: -6.5, z: 5, title: '2. domates tarlası' },
  paste: { kind: 'machine', recipe: 'paste', x: -10, z: 1.8, title: 'Salça kazanı' },
  orangeFarm: { kind: 'farm', item: 'ORANGE', x: -10, z: -7, title: 'Portakal bahçesi' },
  orangeFarm2: { kind: 'farm', item: 'ORANGE', x: -6.5, z: -7, title: '2. portakal bahçesi' },
  juice: { kind: 'machine', recipe: 'juice', x: -10, z: -1.8, title: 'Meyve sıkacağı' },
  cornFarm: { kind: 'farm', item: 'CORN', x: -18, z: 5, title: 'Mısır tarlası' },
  popcorn: { kind: 'machine', recipe: 'popcorn', x: -18, z: 1.8, title: 'Popcorn makinesi' },
  feed: { kind: 'machine', recipe: 'feed', x: -18, z: -1.8, title: 'Yem değirmeni' },
  coop: { kind: 'coop', x: -23, z: 3.5, title: 'Tavuk kümesi' },
  wheatFarm: { kind: 'farm', item: 'WHEAT', x: -18, z: -7, title: 'Buğday tarlası' },
  bakery: { kind: 'machine', recipe: 'bakery', x: -23, z: 0, title: 'Taş fırın' },
  burgerKitchen: { kind: 'machine', recipe: 'burger', x: -30, z: 4, title: 'Burger mutfağı' },
  pizzaKitchen: { kind: 'machine', recipe: 'pizza', x: -30, z: -4, title: 'Pizza fırını' },
  register: { kind: 'register', x: 5, z: -4, title: 'Kasa' },
  tomatoShelf: { kind: 'shelf', item: 'TOMATO', x: 3, z: 2, title: 'Manav Tezgâhı (Domates)' },
  pasteShelf: { kind: 'shelf', item: 'TOMATO_PASTE', x: 7.5, z: 2, title: 'Gondol Reyon (Salça)' },
  orangeShelf: { kind: 'shelf', item: 'ORANGE', x: 3, z: -1, title: 'Manav Tezgâhı (Portakal)' },
  juiceShelf: { kind: 'shelf', item: 'ORANGE_JUICE', x: 7.5, z: -1, title: 'Soğutucu Dolap (Meyve Suyu)' },
  cornShelf: { kind: 'shelf', item: 'CORN', x: 11, z: 2, title: 'Manav Tezgâhı (Mısır)' },
  popcornShelf: { kind: 'shelf', item: 'POPCORN', x: 11, z: 0, title: 'Gondol Reyon (Popcorn)' },
  eggShelf: { kind: 'shelf', item: 'EGG', x: 11, z: -2, title: 'Soğutucu Dolap (Yumurta)' },
  breadShelf: { kind: 'shelf', item: 'BREAD', x: 8.6, z: -2.2, title: 'Fırın Tezgâhı (Ekmek)' },
  table1: { kind: 'table', x: -38, z: 4, title: 'Masa 1' },
  table2: { kind: 'table', x: -38, z: -4, title: 'Masa 2' },
  table3: { kind: 'table', x: -44, z: 4, title: 'Masa 3' },
  table4: { kind: 'table', x: -44, z: -4, title: 'Masa 4' },
});

export const SHELVES = Object.freeze({
  TOMATO: { id: 'shelf:TOMATO', x: 3, z: 2, capacity: 8, displayType: 'produce' },
  TOMATO_PASTE: { id: 'shelf:TOMATO_PASTE', x: 7.5, z: 2, capacity: 6, displayType: 'gondola' },
  ORANGE: { id: 'shelf:ORANGE', x: 3, z: -1, capacity: 8, displayType: 'produce' },
  ORANGE_JUICE: { id: 'shelf:ORANGE_JUICE', x: 7.5, z: -1, capacity: 6, displayType: 'cooler' },
  CORN: { id: 'shelf:CORN', x: 11, z: 2, capacity: 8, displayType: 'produce' },
  POPCORN: { id: 'shelf:POPCORN', x: 11, z: 0, capacity: 6, displayType: 'gondola' },
  EGG: { id: 'shelf:EGG', x: 11, z: -2, capacity: 6, displayType: 'cooler' },
  BREAD: { id: 'shelf:BREAD', x: 8.6, z: -2.2, capacity: 6, displayType: 'bakery' },
});

export const UPGRADES = Object.freeze([
  { id: 'tomatoFarm2', title: '2. Domates tarlası', price: 25, x: -6.5, z: 5, visible: true, unlocks: ['tomatoFarm2'] },
  { id: 'cashier', title: 'Kasiyer işe al', price: 35, x: 8.5, z: -4, when: 'tomatoSold', unlocks: ['cashier'] },
  { id: 'paste', title: 'Salça kazanı ve reyon', price: 45, x: 0, z: -4, when: 'tomatoSold', unlocks: ['paste'] },
  { id: 'harvester', title: 'Tarla işçisi işe al', price: 60, x: -5, z: -4, when: 'pasteSold', unlocks: ['harvester'] },
  { id: 'orange', title: 'Portakal bahçesi ve sıkacak', price: 85, x: -10, z: -7, when: 'pasteSold', unlocks: ['orange'] },
  { id: 'factoryFeeder', title: 'Fabrika lojistikçisi işe al', price: 90, x: -8, z: -1, when: 'juiceSold', unlocks: ['factoryFeeder'] },
  { id: 'orangeFarm2', title: '2. portakal bahçesi', price: 45, x: -6.5, z: -7, when: 'juiceSold', unlocks: ['orangeFarm2'] },
  { id: 'corn', title: 'Mısır tarlası ve reyon', price: 110, x: -18, z: 5, when: 'juiceSold', unlocks: ['corn'] },
  { id: 'popcorn', title: 'Popcorn makinesi ve reyon', price: 125, x: -18, z: 1.8, when: 'cornSold', unlocks: ['popcorn'] },
  { id: 'feed', title: 'Yem değirmeni', price: 135, x: -18, z: -1.8, when: 'popcornSold', unlocks: ['feed'] },
  { id: 'coop', title: 'Tavuk kümesi ve yumurta reyonu', price: 150, x: -23, z: 3.5, when: 'feedProduced', unlocks: ['coop'] },
  { id: 'chicken2', title: 'İkinci tavuk', price: 70, x: -23, z: 6.2, when: 'eggSold', unlocks: ['chicken2'] },
  { id: 'chicken3', title: 'Üçüncü tavuk', price: 95, x: -23, z: 6.2, when: 'chicken2', unlocks: ['chicken3'] },
  { id: 'caretaker', title: 'Çiftlik bakıcısı işe al', price: 150, x: -18, z: 0, when: 'eggSold', unlocks: ['caretaker'] },
  { id: 'bakery', title: 'Buğday tarlası ve taş fırın', price: 180, x: -23, z: 0, when: 'eggSold', unlocks: ['bakery'] },
  { id: 'restaurant', title: 'Gurme restoran', price: 250, x: -30, z: 0, when: 'breadSold', unlocks: ['restaurant'] },
  { id: 'chefWaiter', title: 'Şef ve garson işe al', price: 220, x: -34, z: 0, when: 'tipCollected', unlocks: ['chefWaiter'] },
]);

export const STAFF = Object.freeze({
  cashier: { title: 'Kasiyer', icon: '🧑‍💼' },
  harvester: { title: 'Hasat işçisi', icon: '🧑‍🌾' },
  factoryFeeder: { title: 'Fabrika lojistikçisi', icon: '🧑‍🔧' },
  caretaker: { title: 'Çiftlik bakıcısı', icon: '🧑‍🌾' },
  chefWaiter: { title: 'Şef ve garson', icon: '🧑‍🍳' },
});

export const STAFF_HIRES = Object.freeze([
  { upgradeId: 'cashier', staffTypes: ['cashier'], effect: 'Kasada müşteri ödemelerini otomatik alır.', unlock: 'İlk domates satışından sonra açılır.' },
  { upgradeId: 'harvester', staffTypes: ['harvester'], effect: 'Tarladaki ürünü uygun reyonlara taşır.', unlock: 'İlk salça satışından sonra açılır.' },
  { upgradeId: 'factoryFeeder', staffTypes: ['factoryFeeder'], effect: 'Üretim hatlarına malzeme taşır.', unlock: 'İlk portakal suyu satışından sonra açılır.' },
  { upgradeId: 'caretaker', staffTypes: ['caretaker'], effect: 'Yemi kümese, yumurtaları reyona taşır.', unlock: 'İlk yumurta satışından sonra açılır.' },
  { upgradeId: 'chefWaiter', staffTypes: ['chefWaiter', 'waiter'], effect: 'Restoran mutfağını ve masa servisini otomatikleştirir.', unlock: 'Restoran müşterisinden bahşiş alınca açılır.' },
]);

export const ITEM_ORDER = Object.keys(ITEMS);

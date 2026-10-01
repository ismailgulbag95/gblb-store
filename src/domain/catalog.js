export const MONEY_ATOMS = 10_000;

export const ITEMS = Object.freeze({
  TOMATO: { id: 'TOMATO', name: 'Domates', icon: 'tomato', price: 3, color: 0xef4444 },
  TOMATO_PASTE: { id: 'TOMATO_PASTE', name: 'Salça', icon: 'tomatoPaste', price: 12, color: 0xc2410c },
  ORANGE: { id: 'ORANGE', name: 'Portakal', icon: 'orange', price: 4, color: 0xf97316 },
  ORANGE_JUICE: { id: 'ORANGE_JUICE', name: 'Portakal suyu', icon: 'orangeJuice', price: 16, color: 0xfbbf24 },
  CORN: { id: 'CORN', name: 'Mısır', icon: 'corn', price: 5, color: 0xfacc15 },
  POPCORN: { id: 'POPCORN', name: 'Popcorn', icon: 'popcorn', price: 20, color: 0xfde68a },
  CHICKEN_FEED: { id: 'CHICKEN_FEED', name: 'Tavuk yemi', icon: 'chickenFeed', price: 8, color: 0xa16207 },
  EGG: { id: 'EGG', name: 'Yumurta', icon: 'egg', price: 18, color: 0xfef3c7 },
  WHEAT: { id: 'WHEAT', name: 'Buğday', icon: 'wheat', price: 4, color: 0xfbbf24 },
  FLOUR: { id: 'FLOUR', name: 'Un', icon: 'flour', price: 10, color: 0xf5deb3 },
  BREAD: { id: 'BREAD', name: 'Ekmek', icon: 'bread', price: 24, color: 0xc2410c },
  ORANGE_TART: { id: 'ORANGE_TART', name: 'Portakallı tart', icon: 'orangeTart', price: 42, color: 0xf59e0b },
  BURGER: { id: 'BURGER', name: 'Gurme burger', icon: 'burger', price: 75, color: 0xfb923c },
  PIZZA: { id: 'PIZZA', name: 'Pizza', icon: 'pizza', price: 90, color: 0xdc2626 },
  COLA: { id: 'COLA', name: 'Kola', icon: 'orangeJuice', price: 8, color: 0x991b1b, imported: true },
  SODA: { id: 'SODA', name: 'Gazoz', icon: 'orangeJuice', price: 6, color: 0x22c55e, imported: true },
  CHIPS: { id: 'CHIPS', name: 'Cips', icon: 'popcorn', price: 12, color: 0xf59e0b, imported: true },
  BISCUIT: { id: 'BISCUIT', name: 'Bisküvi', icon: 'bread', price: 10, color: 0xd97706, imported: true },
  CHOCOLATE: { id: 'CHOCOLATE', name: 'Çikolata', icon: 'tomatoPaste', price: 15, color: 0x713f12, imported: true },
  CANNED_FISH: { id: 'CANNED_FISH', name: 'Konserve balık', icon: 'tomatoPaste', price: 20, color: 0x64748b, imported: true },
  DETERGENT: { id: 'DETERGENT', name: 'Deterjan', icon: 'chickenFeed', price: 25, color: 0x3b82f6, imported: true },
  SHAMPOO: { id: 'SHAMPOO', name: 'Şampuan', icon: 'orangeJuice', price: 22, color: 0xa855f7, imported: true },
});

export const IMPORTED_SHELVES = Object.freeze({
  COLA: { item: 'COLA', stationId: 'colaShelf', price: 120, displayType: 'cooler', x: 9.6, z: 4.7 },
  SODA: { item: 'SODA', stationId: 'sodaShelf', price: 120, displayType: 'cooler', x: 9.6, z: 7 },
  CHIPS: { item: 'CHIPS', stationId: 'chipsShelf', price: 80, displayType: 'gondola', x: -0.8, z: 6.4 },
  BISCUIT: { item: 'BISCUIT', stationId: 'biscuitShelf', price: 80, displayType: 'gondola', x: 1.7, z: 6.4 },
  CHOCOLATE: { item: 'CHOCOLATE', stationId: 'chocolateShelf', price: 80, displayType: 'gondola', x: 4.2, z: 6.4 },
  CANNED_FISH: { item: 'CANNED_FISH', stationId: 'cannedFishShelf', price: 80, displayType: 'gondola', x: 6.7, z: 6.4 },
  DETERGENT: { item: 'DETERGENT', stationId: 'detergentShelf', price: 80, displayType: 'gondola', x: -0.8, z: 4.2 },
  SHAMPOO: { item: 'SHAMPOO', stationId: 'shampooShelf', price: 80, displayType: 'gondola', x: 1.7, z: 4.2 },
});

export const PROCUREMENT_CATALOG = Object.freeze(Object.fromEntries(Object.entries(ITEMS).map(([item, definition]) => [item, {
  item,
  category: !definition.imported ? 'farm' : ['COLA', 'SODA'].includes(item) ? 'drinks'
    : ['DETERGENT', 'SHAMPOO'].includes(item) ? 'care' : 'food',
  caseSize: 6,
  // Buying is convenient, while farm production retains its higher margin.
  unitCostAtoms: Math.round(definition.price * MONEY_ATOMS * 0.82),
}])));

export const RECIPES = Object.freeze({
  paste: { inputs: { TOMATO: 2 }, output: 'TOMATO_PASTE', seconds: 3 },
  juice: { inputs: { ORANGE: 2 }, output: 'ORANGE_JUICE', seconds: 3.5 },
  popcorn: { inputs: { CORN: 1 }, output: 'POPCORN', seconds: 2.5 },
  feed: { inputs: { CORN: 1 }, output: 'CHICKEN_FEED', seconds: 2.2 },
  bakery: { inputs: { WHEAT: 2, EGG: 1 }, output: 'BREAD', seconds: 4 },
  flour: { inputs: { WHEAT: 2 }, output: 'FLOUR', seconds: 6 },
  orangeTart: { inputs: { FLOUR: 1, EGG: 1, ORANGE: 1 }, output: 'ORANGE_TART', seconds: 5 },
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
  cornFarm2: { kind: 'farm', item: 'CORN', x: -14.5, z: 5, title: '2. mısır tarlası' },
  popcorn: { kind: 'machine', recipe: 'popcorn', x: -18, z: 1.8, title: 'Popcorn makinesi' },
  feed: { kind: 'machine', recipe: 'feed', x: -18, z: -1.8, title: 'Yem değirmeni' },
  coop: { kind: 'coop', x: -23, z: 3.5, title: 'Tavuk kümesi' },
  wheatFarm: { kind: 'farm', item: 'WHEAT', x: -18, z: -7, title: 'Buğday tarlası' },
  wheatFarm2: { kind: 'farm', item: 'WHEAT', x: -14.5, z: -7, title: '2. buğday tarlası' },
  bakery: { kind: 'machine', recipe: 'bakery', x: -23, z: 0, title: 'Taş fırın' },
  flourMill: { kind: 'machine', recipe: 'flour', x: -23, z: -4, title: 'Un değirmeni' },
  orangeTartKitchen: { kind: 'machine', recipe: 'orangeTart', x: -40, z: 0, title: 'Pastane tezgâhı' },
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
  flourShelf: { kind: 'shelf', item: 'FLOUR', x: 11, z: -4, title: 'Un Reyonu' },
  orangeTartShelf: { kind: 'shelf', item: 'ORANGE_TART', x: 8.6, z: -4.5, title: 'Pastane Reyonu' },
  table1: { kind: 'table', x: -38, z: 4, title: 'Masa 1' },
  table2: { kind: 'table', x: -38, z: -4, title: 'Masa 2' },
  table3: { kind: 'table', x: -44, z: 4, title: 'Masa 3' },
  table4: { kind: 'table', x: -44, z: -4, title: 'Masa 4' },
  managerOffice: { kind: 'office', x: 22, z: 0, title: 'Yönetici Ofisi', access: { x: 22, z: 1.2 } },
  loadingDock: { kind: 'dock', x: 16.5, z: 0, title: 'Kamyon Teslimat Rampası', access: { x: 15.3, z: 0.7 } },
  warehouse: { kind: 'warehouse', x: 18, z: 5, title: 'İthal Ürün Deposu', access: { x: 18.9, z: 5 } },
  ...Object.fromEntries(Object.values(IMPORTED_SHELVES).map(shelf => [shelf.stationId, {
    kind: 'shelf', item: shelf.item, x: shelf.x, z: shelf.z,
    title: `${ITEMS[shelf.item].name} ${shelf.displayType === 'cooler' ? 'Soğutucu Reyonu' : 'Gondol Reyonu'}`,
  }])),
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
  FLOUR: { id: 'shelf:FLOUR', x: 11, z: -4, capacity: 6, displayType: 'gondola' },
  ORANGE_TART: { id: 'shelf:ORANGE_TART', x: 8.6, z: -4.5, capacity: 6, displayType: 'bakery' },
  ...Object.fromEntries(Object.values(IMPORTED_SHELVES).map(shelf => [shelf.item, {
    id: `shelf:${shelf.item}`, x: shelf.x, z: shelf.z, capacity: 12, displayType: shelf.displayType,
  }])),
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
  { id: 'cornFarm2', title: '2. Mısır tarlası', price: 0, x: -14.5, z: 5, when: 'cornSold', unlocks: ['cornFarm2'] },
  { id: 'popcorn', title: 'Popcorn makinesi ve reyon', price: 125, x: -18, z: 1.8, when: 'cornSold', unlocks: ['popcorn'] },
  { id: 'feed', title: 'Yem değirmeni', price: 135, x: -18, z: -1.8, when: 'popcornSold', unlocks: ['feed'] },
  { id: 'coop', title: 'Tavuk kümesi ve yumurta reyonu', price: 150, x: -23, z: 3.5, when: 'feedProduced', unlocks: ['coop'] },
  { id: 'chicken2', title: 'İkinci tavuk', price: 70, x: -23, z: 6.2, when: 'eggSold', unlocks: ['chicken2'] },
  { id: 'chicken3', title: 'Üçüncü tavuk', price: 95, x: -23, z: 6.2, when: 'chicken2', unlocks: ['chicken3'] },
  { id: 'caretaker', title: 'Çiftlik bakıcısı işe al', price: 150, x: -18, z: 0, when: 'eggSold', unlocks: ['caretaker'] },
  { id: 'bakery', title: 'Buğday tarlası ve taş fırın', price: 180, x: -23, z: 0, when: 'eggSold', unlocks: ['bakery'] },
  { id: 'wheatFarm2', title: '2. Buğday tarlası', price: 0, x: -14.5, z: -7, when: 'eggSold', unlocks: ['wheatFarm2'] },
  { id: 'flourMill', title: 'Un değirmeni ve reyon', price: 220, x: -23, z: -4, when: 'breadSold', unlocks: ['flourMill'] },
  { id: 'orangeTartKitchen', title: 'Portakallı tart pastanesi', price: 300, x: -40, z: 0, when: 'flourProduced', unlocks: ['orangeTartKitchen'] },
  { id: 'restaurant', title: 'Gurme restoran', price: 250, x: -30, z: 0, when: 'breadSold', unlocks: ['restaurant'] },
  { id: 'chefWaiter', title: 'Şef ve garson işe al', price: 220, x: -34, z: 0, when: 'tipCollected', unlocks: ['chefWaiter'] },
  { id: 'logisticsOffice', title: 'Yönetici Ofisi ve Lojistik Hattı', price: 650, x: 22, z: 0, when: 'eggSold', unlocks: ['managerOffice', 'loadingDock', 'warehouse'] },
  { id: 'warehouseOperator', title: 'Depocu işe al', price: 160, x: 18, z: 5, when: 'logisticsOffice', unlocks: ['warehouseOperator'] },
  { id: 'storeManager', title: 'Mağaza müdürü işe al', price: 200, x: 22, z: 0, when: 'logisticsOffice', unlocks: ['storeManager'] },
]);

export const STAFF = Object.freeze({
  cashier: { title: 'Kasiyer', icon: 'cashier' },
  harvester: { title: 'Hasat işçisi', icon: 'workerAvatar' },
  factoryFeeder: { title: 'Fabrika lojistikçisi', icon: 'courierAvatar' },
  caretaker: { title: 'Çiftlik bakıcısı', icon: 'workerAvatar' },
  chefWaiter: { title: 'Şef ve garson', icon: 'chef' },
  warehouseOperator: { title: 'Depocu', icon: 'courierAvatar' },
  storeManager: { title: 'Mağaza müdürü', icon: 'cashier' },
});

export const STAFF_HIRES = Object.freeze([
  { upgradeId: 'cashier', staffTypes: ['cashier'], effect: 'Kasada müşteri ödemelerini otomatik alır.', unlock: 'İlk domates satışından sonra açılır.' },
  { upgradeId: 'harvester', staffTypes: ['harvester'], effect: 'Önce reyonları doldurur, ardından üretim hatlarına malzeme taşır.', unlock: 'İlk salça satışından sonra açılır.' },
  { upgradeId: 'factoryFeeder', staffTypes: ['factoryFeeder'], effect: 'Reyon stoklarını tamamlayıp üretim hatlarını besler.', unlock: 'İlk portakal suyu satışından sonra açılır.' },
  { upgradeId: 'caretaker', staffTypes: ['caretaker'], effect: 'Yemi kümese, yumurtaları reyona taşır.', unlock: 'İlk yumurta satışından sonra açılır.' },
  { upgradeId: 'chefWaiter', staffTypes: ['chefWaiter', 'waiter'], effect: 'Restoran mutfağını ve masa servisini otomatikleştirir.', unlock: 'Restoran müşterisinden bahşiş alınca açılır.' },
  { upgradeId: 'warehouseOperator', staffTypes: ['warehouseOperator'], effect: 'Rampadan kolileri depoya ve reyonlara taşır.', unlock: 'Yönetici Ofisi ve Lojistik Hattı açılınca kullanılabilir.' },
  { upgradeId: 'storeManager', staffTypes: ['storeManager'], effect: 'Terminaldeki asgari stok eşiğine göre toptan sipariş verir.', unlock: 'Yönetici Ofisi ve Lojistik Hattı açılınca kullanılabilir.' },
]);

export const STAFF_ARCHETYPES = Object.freeze({
  diligent: { title: 'Çalışkan', titleEn: 'Diligent', speed: 1.25, salary: 1.3, drain: 1, hire: 1,
    breakAt: 20, effect: '+%25 hız / +%30 maaş', effectEn: '+25% speed / +30% salary' },
  lazy: { title: 'Rahatına düşkün', titleEn: 'Easygoing', speed: 1, salary: 0.85, drain: 1.15, hire: 0.9,
    breakAt: 35, effect: '-%15 maaş / daha sık mola', effectEn: '-15% salary / more frequent breaks' },
  meticulous: { title: 'Titiz', titleEn: 'Meticulous', speed: 1, salary: 1, drain: 0.7, hire: 1.4,
    breakAt: 20, effect: '-%30 enerji kaybı / +%40 işe alım ücreti', effectEn: '-30% energy drain / +40% hiring fee' },
  sociable: { title: 'Sosyal', titleEn: 'Sociable', speed: 1, salary: 1.1, drain: 1, hire: 0.85,
    breakAt: 25, effect: '-%15 işe alım ücreti / +%10 maaş', effectEn: '-15% hiring fee / +10% salary' },
  resilient: { title: 'Dayanıklı', titleEn: 'Resilient', speed: 0.9, salary: 1, drain: 0.6, hire: 1.1,
    breakAt: 15, effect: '-%40 enerji kaybı / -%10 hız', effectEn: '-40% energy drain / -10% speed' },
});

export const STAFF_LAND_PRICE = 500;
export const STAFF_FACILITIES = Object.freeze({
  wc: { id: 'wc', title: 'Personel WC', titleEn: 'Staff WC', price: 220, x: 0, z: -15,
    width: 3.2, depth: 4, capacity: 1, effect: 'Hızlı rahatlama', effectEn: 'Quick relief' },
  rest: { id: 'rest', title: 'Dinlenme alanı', titleEn: 'Staff lounge', price: 400, x: 5, z: -15,
    width: 3.2, depth: 4, capacity: 2, effect: 'Enerji yenileme', effectEn: 'Energy recovery' },
  kitchen: { id: 'kitchen', title: 'Personel mutfağı', titleEn: 'Staff kitchen', price: 350, x: 10, z: -15,
    width: 3.2, depth: 4, capacity: 2, effect: 'Açlık ve moral yenileme', effectEn: 'Hunger and morale recovery' },
});

export const FARM_AD_UPGRADE_IDS = Object.freeze(UPGRADES
  .filter((upgrade) => upgrade.id.endsWith('Farm2') && STATIONS[upgrade.id]?.kind === 'farm'
    && upgrade.unlocks.includes(upgrade.id))
  .map((upgrade) => upgrade.id));

export const AD_ONLY_UPGRADE_IDS = Object.freeze([
  ...FARM_AD_UPGRADE_IDS,
  ...STAFF_HIRES.map((hire) => hire.upgradeId),
]);

export function getStaffCount(state, role) {
  const hire = STAFF_HIRES.find((entry) => entry.upgradeId === role);
  if (!hire) return state.workers.filter((worker) => worker.type === role).length;
  return state.workers.filter((worker) => hire.staffTypes.includes(worker.type)).length;
}

export function staffDailySalaryAtoms(workerType) {
  const role = workerType === 'waiter' ? 'chefWaiter' : workerType;
  const upgrade = UPGRADES.find((entry) => entry.id === role);
  if (!upgrade) return 0;
  const hire = STAFF_HIRES.find((entry) => entry.upgradeId === role);
  const workerCount = Math.max(1, hire?.staffTypes.length ?? 1);
  return Math.round(upgrade.price * MONEY_ATOMS * 0.1 / workerCount);
}

export const ITEM_ORDER = Object.keys(ITEMS);

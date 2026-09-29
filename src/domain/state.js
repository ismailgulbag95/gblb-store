import { ITEMS, SHELVES, STATIONS } from './catalog.js';
import { createFarmState, ensureFarmState, syncFarmHarvest } from './farm.js';

export const SAVE_VERSION = 5;

function emptyStock(capacity) {
  return { capacity, items: {}, reserved: {}, reservedCapacity: 0 };
}

export function createInitialState(seed = 0x51f15e) {
  const stock = {
    player: emptyStock(6),
    'farm:TOMATO': emptyStock(60),
    'shelf:TOMATO': emptyStock(SHELVES.TOMATO.capacity),
    'checkout:queue': emptyStock(12),
    'order:delivery': emptyStock(500),
  };
  const farms = {
    tomatoFarm: createFarmState(0, 'tomatoFarm'),
  };
  const state = {
    saveVersion: SAVE_VERSION,
    revision: 0,
    tick: 0,
    customerSpawnTicks: 0,
    customerDemandBag: [],
    rng: seed >>> 0,
    paused: false,
    speedMultiplier: 1,
    economy: { balanceAtoms: 100 * 10_000, entries: [] },
    stock,
    stockTransactions: [],
    reservations: {},
    player: { x: 5, z: 6, facing: 0, capacity: 6, character: 'shopkeeper' },
    farms,
    machines: {},
    customStations: {},
    selfRegisters: {},
    layout: {},
    decorations: [
      { id: 'decoration-boxes', type: 'cardboardBoxes', x: -3.8, z: -7.5, rotation: 0 },
    ],
    activeOrder: null,
    ordersCompleted: 0,
    decorVouchers: 0,
    coops: {},
    diningTables: {},
    customers: [],
    workers: [],
    nextEntityId: 1,
    unlocked: { tomatoFarm: true, register: true, tomatoShelf: true },
    availableUpgrades: ['tomatoFarm2'],
    completedUpgrades: [],
    unlockedProducts: ['TOMATO'],
    stats: {
      tomatoSold: 0, pasteProduced: 0, pasteSold: 0, juiceProduced: 0, juiceSold: 0,
      cornSold: 0, popcornProduced: 0, popcornSold: 0, feedProduced: 0,
      eggSold: 0, flourProduced: 0, flourSold: 0, breadProduced: 0, breadSold: 0,
      orangeTartProduced: 0, orangeTartSold: 0, burgerCooked: 0, pizzaCooked: 0,
      tablesServed: 0, tipsCollected: 0,
      customersSatisfied: 0, customersUnhappy: 0,
    },
    quest: 'Domates topla, reyonu doldur ve ilk satışını yap.',
    settings: { language: 'tr', sound: true, haptics: true },
  };

  for (const [itemId, shelf] of Object.entries(SHELVES)) {
    state.stock[shelf.id] = emptyStock(shelf.capacity);
    if (itemId === 'TOMATO') state.stock[shelf.id].items.TOMATO = 0;
  }
  for (const [id, station] of Object.entries(STATIONS)) {
    if (station.kind === 'farm') state.stock[`farm:${station.item}`] ??= emptyStock(60);
    if (station.kind === 'machine') {
      state.stock[`machine:${id}:input`] = emptyStock(12);
      state.stock[`machine:${id}:output`] = emptyStock(8);
    }
  }
  return state;
}

export function hydrateState(candidate) {
  if (!candidate || typeof candidate !== 'object') throw new Error('Kayıt boş veya bozuk.');
  if (![2, 3, 4, SAVE_VERSION].includes(candidate.saveVersion)) throw new Error(`Bu kayıt sürümü desteklenmiyor (${candidate.saveVersion ?? 'bilinmiyor'}).`);
  const initial = createInitialState(candidate.rng);
  const hydrated = { ...initial, ...candidate };
  hydrated.saveVersion = SAVE_VERSION;
  hydrated.ordersCompleted = Number.isSafeInteger(candidate.ordersCompleted) && candidate.ordersCompleted >= 0 ? candidate.ordersCompleted : 0;
  hydrated.decorVouchers = Number.isSafeInteger(candidate.decorVouchers) && candidate.decorVouchers >= 0 ? candidate.decorVouchers : 0;
  hydrated.activeOrder = candidate.activeOrder && ITEMS[candidate.activeOrder.item]
    && Number.isSafeInteger(candidate.activeOrder.quantity) && candidate.activeOrder.quantity > 0
    && Number.isSafeInteger(candidate.activeOrder.reward) && candidate.activeOrder.reward > 0
    ? { ...candidate.activeOrder } : null;
  hydrated.player = { ...initial.player, ...(candidate.player ?? {}) };
  hydrated.economy = { ...initial.economy, ...(candidate.economy ?? {}) };
  hydrated.settings = { ...initial.settings, ...(candidate.settings ?? {}) };
  hydrated.unlocked = { ...initial.unlocked, ...(candidate.unlocked ?? {}) };
  hydrated.stats = { ...initial.stats, ...(candidate.stats ?? {}) };
  hydrated.availableUpgrades = Array.isArray(candidate.availableUpgrades) ? [...candidate.availableUpgrades] : [...initial.availableUpgrades];
  hydrated.completedUpgrades = Array.isArray(candidate.completedUpgrades) ? [...candidate.completedUpgrades] : [];
  hydrated.stock = { ...initial.stock, ...(candidate.stock ?? {}) };
  hydrated.farms = { ...initial.farms, ...(candidate.farms ?? {}) };
  hydrated.machines = { ...initial.machines, ...(candidate.machines ?? {}) };
  hydrated.customStations = { ...(candidate.customStations ?? {}) };
  hydrated.selfRegisters = { ...(candidate.selfRegisters ?? {}) };
  hydrated.layout = Object.fromEntries(Object.entries(candidate.layout ?? {}).filter(([id, point]) =>
    (STATIONS[id] || candidate.customStations?.[id] || candidate.selfRegisters?.[id] || id.includes('_') || id.startsWith('selfRegister') || id.startsWith('custom_')) && Number.isFinite(point?.x) && Number.isFinite(point?.z)));
  hydrated.decorations = (Array.isArray(candidate.decorations) ? candidate.decorations : []).filter((entry) =>
    entry && typeof entry.id === 'string' && typeof entry.type === 'string'
      && Number.isFinite(entry.x) && Number.isFinite(entry.z) && entry.placed !== false);
  hydrated.coops = { ...initial.coops, ...(candidate.coops ?? {}) };
  hydrated.diningTables = { ...initial.diningTables, ...(candidate.diningTables ?? {}) };
  hydrated.reservations = { ...initial.reservations, ...(candidate.reservations ?? {}) };
  hydrated.customerDemandBag = Array.isArray(candidate.customerDemandBag) ? [...candidate.customerDemandBag] : [];
  hydrated.customers = (Array.isArray(candidate.customers) ? candidate.customers : []).map((customer, index) => {
    const legacyDemand = typeof customer.demand === 'string' ? customer.demand : customer.demand?.id;
    const legacyShoppingList = Array.isArray(customer.shoppingList) ? customer.shoppingList
      : Array.isArray(customer.desiredItemTypes) ? customer.desiredItemTypes.map((item) => typeof item === 'string' ? item : item.id)
        : legacyDemand && customer.kind !== 'diner' ? [legacyDemand] : [];
    const idOrder = Number(String(customer.id ?? '').split('-').at(-1));
    return {
      ...customer,
      id: customer.id ?? `customer-migrated-${index}`,
      demand: legacyDemand ?? legacyShoppingList[0] ?? 'TOMATO',
      shoppingList: legacyShoppingList,
      shoppingIndex: customer.shoppingIndex ?? 0,
      basket: Array.isArray(customer.basket) ? [...customer.basket]
        : Array.isArray(customer.carriedItems) ? [...customer.carriedItems] : [],
      checkoutOrder: Number.isFinite(customer.checkoutOrder) ? customer.checkoutOrder : (Number.isFinite(idOrder) ? idOrder : index),
      routeIndex: customer.routeIndex ?? 0,
      missedItems: customer.missedItems ?? 0,
      checkoutWaitTicks: customer.checkoutWaitTicks ?? 0,
      mealWaitTicks: customer.mealWaitTicks ?? 0,
    };
  });
  hydrated.farms = Object.fromEntries(Object.entries(hydrated.farms).map(([id, farm]) => [id,
    ensureFarmState({ ...farm }, hydrated.tick, id)]));
  hydrated.workers = hydrated.workers.map((worker) => ({
    ...worker,
    task: worker.task === 'idle' ? null : (worker.task ?? null),
  }));
  for (const [key, value] of Object.entries(hydrated.player)) {
    if (['x', 'z', 'facing', 'capacity'].includes(key) && !Number.isFinite(value)) throw new Error(`Oyuncu kaydındaki ${key} değeri geçerli değil.`);
  }
  if (!Number.isSafeInteger(hydrated.tick) || hydrated.tick < 0 || !Number.isSafeInteger(hydrated.revision) || hydrated.revision < 0) {
    throw new Error('Kayıttaki saat veya sürüm sayacı geçerli değil.');
  }
  if (!Number.isSafeInteger(hydrated.rng) || hydrated.rng < 0 || hydrated.rng > 0xffffffff) throw new Error('Kayıttaki rastgele sayı tohumu geçerli değil.');
  for (const [id, base] of Object.entries(initial.stock)) {
    const saved = hydrated.stock[id];
    if (!saved || typeof saved.items !== 'object') hydrated.stock[id] = structuredClone(base);
    else hydrated.stock[id] = { ...base, ...saved, items: { ...saved.items } };
  }
  for (const customer of hydrated.customers) {
    if (!customer.id || !['shopper', 'diner'].includes(customer.kind)
      || !Number.isFinite(customer.x) || !Number.isFinite(customer.z)) throw new Error('Kayıttaki müşteri bilgisi geçersiz.');
    const stockId = `customer:${customer.id}`;
    const customerStock = hydrated.stock[stockId];
    if (customer.kind === 'shopper' || ['to-table', 'waiting-meal', 'eating', 'ready-tip'].includes(customer.phase)) {
      if (!customerStock) hydrated.stock[stockId] = emptyStock(4);
      else customerStock.capacity = Math.max(4, customerStock.capacity);
    }
    const itemIds = [...customer.shoppingList, ...customer.basket];
    if (itemIds.some((itemId) => !ITEMS[itemId])) throw new Error(`Müşteri ${customer.id} sepetinde bilinmeyen ürün var.`);
    if (customer.kind === 'diner' && !ITEMS[customer.demand]) throw new Error(`Müşteri ${customer.id} yemek talebi geçersiz.`);
  }
  if (!Number.isSafeInteger(hydrated.economy.balanceAtoms) || hydrated.economy.balanceAtoms < 0) {
    throw new Error('Kayıttaki bakiye geçerli değil.');
  }
  for (const itemId of Object.keys(ITEMS)) {
    for (const location of Object.values(hydrated.stock)) {
      if (location.items[itemId] !== undefined && (!Number.isInteger(location.items[itemId]) || location.items[itemId] < 0)) {
        throw new Error(`Kayıttaki ${itemId} stoğu geçerli değil.`);
      }
    }
  }
  for (const [locationId, location] of Object.entries(hydrated.stock)) {
    if (!Number.isSafeInteger(location.capacity) || location.capacity < 0) throw new Error(`Kayıttaki ${locationId} kapasitesi geçerli değil.`);
    location.reserved ??= {};
    location.reservedCapacity ??= 0;
    const total = Object.values(location.items).reduce((sum, count) => sum + count, 0);
    const reserved = Object.values(location.reserved).reduce((sum, count) => sum + count, 0);
    if (!Number.isSafeInteger(location.reservedCapacity) || location.reservedCapacity < 0
      || total + location.reservedCapacity > location.capacity || !Number.isSafeInteger(reserved) || reserved < 0) {
      throw new Error(`Kayıttaki ${locationId} stok veya rezervasyon sınırı geçersiz.`);
    }
    for (const [itemId, count] of Object.entries(location.reserved)) {
      if (!ITEMS[itemId] || !Number.isSafeInteger(count) || count < 0 || count > (location.items[itemId] ?? 0)) {
        throw new Error(`Kayıttaki ${locationId} rezervasyonu geçerli değil.`);
      }
    }
    for (const itemId of Object.keys(location.items)) if (!ITEMS[itemId]) throw new Error(`Bilinmeyen ürün kaydı: ${itemId}`);
  }
  if (!Array.isArray(hydrated.economy.entries) || hydrated.economy.entries.some((entry) => (
    !entry || typeof entry.id !== 'string' || !Number.isSafeInteger(entry.amountAtoms) || entry.amountAtoms <= 0
    || !['CREDIT', 'DEBIT'].includes(entry.type)
  ))) throw new Error('Kayıttaki işlem günlüğü geçerli değil.');
  const transactionIds = hydrated.economy.entries.map((entry) => entry.id);
  if (new Set(transactionIds).size !== transactionIds.length) throw new Error('Kayıttaki işlem kimlikleri yineleniyor.');
  if (hydrated.economy.entries.length && hydrated.economy.entries.at(-1).balanceAtoms !== hydrated.economy.balanceAtoms) {
    throw new Error('Kayıt bakiyesi ile son işlem bakiyesi eşleşmiyor.');
  }
  if (hydrated.player.capacity !== hydrated.stock.player?.capacity) throw new Error('Oyuncu kapasitesi ile çanta stoğu eşleşmiyor.');
  const sourceReservations = new Map();
  const destinationReservations = new Map();
  for (const [id, reservation] of Object.entries(hydrated.reservations)) {
    if (typeof id !== 'string' || !hydrated.stock[reservation.from] || !hydrated.stock[reservation.to]
      || !hydrated.stock[reservation.origin] || !ITEMS[reservation.item]
      || !Number.isSafeInteger(reservation.quantity) || reservation.quantity < 1) {
      throw new Error('Kayıttaki stok rezervasyonu geçersiz.');
    }
    const sourceKey = `${reservation.from}|${reservation.item}`;
    sourceReservations.set(sourceKey, (sourceReservations.get(sourceKey) ?? 0) + reservation.quantity);
    destinationReservations.set(reservation.to, (destinationReservations.get(reservation.to) ?? 0) + reservation.quantity);
  }
  for (const [locationId, location] of Object.entries(hydrated.stock)) {
    for (const [itemId, quantity] of Object.entries(location.reserved)) {
      if (quantity !== (sourceReservations.get(`${locationId}|${itemId}`) ?? 0)) throw new Error(`Kayıttaki ${locationId} ürün rezervasyonu eşleşmiyor.`);
    }
    for (const [key, quantity] of sourceReservations) {
      if (key.startsWith(`${locationId}|`) && quantity !== (location.reserved[key.slice(locationId.length + 1)] ?? 0)) {
        throw new Error(`Kayıttaki ${locationId} kaynak rezervasyonu kayıp.`);
      }
    }
    if ((location.reservedCapacity ?? 0) !== (destinationReservations.get(locationId) ?? 0)) {
      throw new Error(`Kayıttaki ${locationId} hedef kapasitesi rezervasyonla eşleşmiyor.`);
    }
  }
  for (const worker of hydrated.workers) {
    if (!worker.task) continue;
    const task = worker.task;
    const reservation = hydrated.reservations[task.reservationId];
    if (!reservation || reservation.origin !== task.from || reservation.to !== task.to
      || reservation.item !== task.item || reservation.quantity !== task.quantity
      || !['to-source', 'to-target'].includes(task.phase)) throw new Error(`Çalışan ${worker.id} görevi ile rezervasyonu uyuşmuyor.`);
  }
  const stockTransactionIds = hydrated.stockTransactions.map((entry) => typeof entry === 'string' ? entry : entry?.id);
  if (new Set(stockTransactionIds).size !== stockTransactionIds.length || stockTransactionIds.some((id) => typeof id !== 'string')) {
    throw new Error('Kayıttaki stok işlem kimlikleri yineleniyor veya geçersiz.');
  }
  syncFarmHarvest(hydrated);
  return hydrated;
}

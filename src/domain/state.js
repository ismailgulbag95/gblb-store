import { ITEMS, SHELVES, STATIONS } from './catalog.js';
import { createFarmState, ensureFarmState, syncFarmHarvest } from './farm.js';
import { canPlaceDecoration } from './layout.js';
import { machineSpeedMultiplier, staffSpeedMultiplier } from './progression.js';

export const SAVE_VERSION = 7;

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
    ads: {
      lastStartedAt: 0,
      lastPlacementStarts: {},
      recentCompletions: [],
      dailyCounts: {},
      dismissedUntil: {},
      grantedRewardIds: [],
      completedAdIds: [],
      shownOfferKeys: [],
      events: [],
      pending: null,
    },
    bonusOffers: {
      activePlayMs: 0,
      nextOfferAtActiveMs: 180_000,
      nextOfferId: 1,
      currentOffer: null,
      walkSpeedExpiresAt: 0,
    },
    player: { x: 5, z: 6, facing: 0, capacity: 6, character: 'shopkeeper' },
    farms,
    machines: {},
    customStations: {},
    selfRegisters: {},
    layout: {},
    decorations: [
      { id: 'decoration-boxes', type: 'cardboardBoxes', x: -3.8, z: -7.5, rotation: 0 },
      { id: 'trash-bin', type: 'trashBin', x: -2.5, z: -7.5, rotation: 0 },
    ],
    activeOrder: null,
    lastOrderReward: null,
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

function removeLegacyFurniture(candidate) {
  const legacyStations = candidate.customStations && typeof candidate.customStations === 'object'
    ? candidate.customStations : {};
  const removedIds = new Set(Object.keys(legacyStations));
  const removedStockIds = new Set();
  const removedCustomers = new Set();
  const removedReservations = new Set();
  const removedFarmStock = new Map();
  const state = structuredClone(candidate);
  state.stock ??= {};
  state.farms ??= {};
  state.machines ??= {};
  state.selfRegisters ??= {};
  state.diningTables ??= {};
  for (const id of [...Object.keys(state.farms), ...Object.keys(state.machines), ...Object.keys(state.selfRegisters), ...Object.keys(state.diningTables)]) {
    if (!STATIONS[id]) removedIds.add(id);
  }

  for (const [id, station] of Object.entries(legacyStations)) {
    if (station.kind === 'farm') {
      const farm = state.farms[id];
      const item = farm?.item ?? station.item;
      if (item && farm) removedFarmStock.set(item,
        (removedFarmStock.get(item) ?? 0) + Math.max(0, Math.floor(farm.readyCount ?? 0)));
      delete state.farms[id];
    }
    if (station.kind === 'shelf') removedStockIds.add(`shelf:${id}`);
    if (station.kind === 'machine') {
      delete state.machines[id];
      removedStockIds.add(`machine:${id}:input`);
      removedStockIds.add(`machine:${id}:output`);
    }
    if (station.kind === 'selfRegister') delete state.selfRegisters[id];
    if (station.kind === 'table') {
      const dinerId = state.diningTables[id]?.customerId;
      if (dinerId) removedCustomers.add(dinerId);
      delete state.diningTables[id];
    }
  }

  // Older furniture saves sometimes kept these maps even when customStations
  // had already been partially removed.
  for (const id of Object.keys(state.selfRegisters)) {
    removedIds.add(id);
    delete state.selfRegisters[id];
  }
  for (const id of Object.keys(state.diningTables)) {
    if (STATIONS[id]?.kind === 'table') continue;
    const dinerId = state.diningTables[id]?.customerId;
    if (dinerId) removedCustomers.add(dinerId);
    removedIds.add(id);
    delete state.diningTables[id];
  }
  for (const id of Object.keys(state.farms)) {
    if (STATIONS[id]) continue;
    if (!removedIds.has(id)) continue;
    const farm = state.farms[id];
    const item = farm.item ?? legacyStations[id]?.item;
    if (item) removedFarmStock.set(item,
      (removedFarmStock.get(item) ?? 0) + Math.max(0, Math.floor(farm.readyCount ?? 0)));
    delete state.farms[id];
  }
  for (const id of Object.keys(state.machines)) {
    if (STATIONS[id]) continue;
    if (!removedIds.has(id)) continue;
    delete state.machines[id];
  }

  for (const stockId of Object.keys(state.stock)) {
    if (stockId.startsWith('shelf:')) {
      const stationId = stockId.slice('shelf:'.length);
      const isSharedProductShelf = Object.values(SHELVES).some((shelf) => shelf.id === stockId);
      if (!isSharedProductShelf && (removedIds.has(stationId) || STATIONS[stationId]?.kind !== 'shelf')) removedStockIds.add(stockId);
    }
    if (stockId.startsWith('machine:')) {
      const stationId = stockId.slice('machine:'.length).split(':')[0];
      if (removedIds.has(stationId) || STATIONS[stationId]?.kind !== 'machine') removedStockIds.add(stockId);
    }
  }
  for (const customer of state.customers ?? []) {
    if (removedCustomers.has(customer.id) || removedIds.has(customer.tableId) || removedIds.has(customer.targetShelfId)
      || removedIds.has(customer.registerId) || removedIds.has(customer.targetRegisterId)) {
      removedCustomers.add(customer.id);
    }
  }
  const removedWorkers = new Set();
  for (const worker of state.workers ?? []) {
    const task = worker.task;
    if (task && (removedIds.has(task.farmId) || removedIds.has(task.tableId) || removedCustomers.has(task.customerId)
      || removedStockIds.has(task.from) || removedStockIds.has(task.to))) {
      removedWorkers.add(worker.id);
      if (task.reservationId) removedReservations.add(task.reservationId);
      if (task.carrier) removedStockIds.add(task.carrier);
      removedStockIds.add(`worker:${worker.id}`);
      worker.task = null;
      worker.carrying = null;
    }
  }
  for (const id of removedCustomers) removedStockIds.add(`customer:${id}`);
  for (const id of removedWorkers) removedStockIds.add(`worker:${id}`);
  for (const id of removedStockIds) delete state.stock[id];

  state.customers = (state.customers ?? []).filter((customer) => !removedCustomers.has(customer.id));
  state.reservations = Object.fromEntries(Object.entries(state.reservations ?? {}).filter(([id, reservation]) => (
    !removedStockIds.has(reservation.from) && !removedStockIds.has(reservation.to)
      && !removedStockIds.has(reservation.origin) && !removedWorkers.has(reservation.workerId)
      && !removedReservations.has(id) && state.stock[reservation.from] && state.stock[reservation.to]
      && state.stock[reservation.origin]
  )));
  for (const location of Object.values(state.stock)) {
    location.reserved = {};
    location.reservedCapacity = 0;
  }
  for (const reservation of Object.values(state.reservations)) {
    const source = state.stock[reservation.from];
    const target = state.stock[reservation.to];
    if (!source || !target) continue;
    source.reserved[reservation.item] = (source.reserved[reservation.item] ?? 0) + reservation.quantity;
    target.reservedCapacity += reservation.quantity;
  }
  for (const [item, quantity] of removedFarmStock) {
    const location = state.stock[`farm:${item}`];
    if (!location) continue;
    const stored = location.items?.[item] ?? 0;
    const reserved = location.reserved?.[item] ?? 0;
    const remaining = stored - Math.min(quantity, Math.max(0, stored - reserved));
    if (remaining > 0) location.items[item] = remaining;
    else delete location.items[item];
  }

  state.customStations = {};
  state.layout = Object.fromEntries(Object.entries(state.layout ?? {}).filter(([id]) => Boolean(STATIONS[id])));
  return state;
}

export function hydrateState(candidate) {
  if (!candidate || typeof candidate !== 'object') throw new Error('Kayıt boş veya bozuk.');
  if (![2, 3, 4, 5, 6, SAVE_VERSION].includes(candidate.saveVersion)) throw new Error(`Bu kayıt sürümü desteklenmiyor (${candidate.saveVersion ?? 'bilinmiyor'}).`);
  candidate = removeLegacyFurniture(candidate);
  const initial = createInitialState(candidate.rng);
  const hydrated = { ...initial, ...candidate };
  hydrated.saveVersion = SAVE_VERSION;
  hydrated.ordersCompleted = Number.isSafeInteger(candidate.ordersCompleted) && candidate.ordersCompleted >= 0 ? candidate.ordersCompleted : 0;
  hydrated.decorVouchers = Number.isSafeInteger(candidate.decorVouchers) && candidate.decorVouchers >= 0 ? candidate.decorVouchers : 0;
  hydrated.activeOrder = candidate.activeOrder && ITEMS[candidate.activeOrder.item]
    && Number.isSafeInteger(candidate.activeOrder.quantity) && candidate.activeOrder.quantity > 0
    && Number.isSafeInteger(candidate.activeOrder.reward) && candidate.activeOrder.reward > 0
    ? { ...candidate.activeOrder } : null;
  hydrated.lastOrderReward = candidate.lastOrderReward && typeof candidate.lastOrderReward.id === 'string'
    && Number.isSafeInteger(candidate.lastOrderReward.reward) && candidate.lastOrderReward.reward > 0
    ? { ...candidate.lastOrderReward, claimed: Boolean(candidate.lastOrderReward.claimed) } : null;
  hydrated.player = { ...initial.player, ...(candidate.player ?? {}) };
  const savedBonusOffers = candidate.bonusOffers && typeof candidate.bonusOffers === 'object' ? candidate.bonusOffers : {};
  const savedBonusOffer = savedBonusOffers.currentOffer;
  hydrated.bonusOffers = {
    ...initial.bonusOffers,
    activePlayMs: Number.isFinite(savedBonusOffers.activePlayMs) && savedBonusOffers.activePlayMs >= 0
      ? savedBonusOffers.activePlayMs : 0,
    nextOfferAtActiveMs: Number.isFinite(savedBonusOffers.nextOfferAtActiveMs) && savedBonusOffers.nextOfferAtActiveMs >= 180_000
      ? savedBonusOffers.nextOfferAtActiveMs : 180_000,
    nextOfferId: Number.isSafeInteger(savedBonusOffers.nextOfferId) && savedBonusOffers.nextOfferId > 0
      ? savedBonusOffers.nextOfferId : 1,
    currentOffer: savedBonusOffer && typeof savedBonusOffer.id === 'string'
      && ['walk-speed', 'bag-capacity'].includes(savedBonusOffer.type)
      ? { id: savedBonusOffer.id, type: savedBonusOffer.type } : null,
    walkSpeedExpiresAt: Number.isFinite(savedBonusOffers.walkSpeedExpiresAt) && savedBonusOffers.walkSpeedExpiresAt > 0
      ? savedBonusOffers.walkSpeedExpiresAt : 0,
  };
  hydrated.economy = { ...initial.economy, ...(candidate.economy ?? {}) };
  hydrated.settings = { ...initial.settings, ...(candidate.settings ?? {}) };
  hydrated.unlocked = { ...initial.unlocked, ...(candidate.unlocked ?? {}) };
  hydrated.stats = { ...initial.stats, ...(candidate.stats ?? {}) };
  hydrated.availableUpgrades = Array.isArray(candidate.availableUpgrades) ? [...candidate.availableUpgrades] : [...initial.availableUpgrades];
  hydrated.completedUpgrades = Array.isArray(candidate.completedUpgrades) ? [...candidate.completedUpgrades] : [];
  hydrated.stock = { ...initial.stock, ...(candidate.stock ?? {}) };
  hydrated.farms = { ...initial.farms, ...(candidate.farms ?? {}) };
  hydrated.machines = Object.fromEntries(Object.entries({ ...initial.machines, ...(candidate.machines ?? {}) }).map(([id, machine]) => {
    const upgradeLevel = Number.isSafeInteger(machine?.upgradeLevel) && machine.upgradeLevel >= 0 ? machine.upgradeLevel : 0;
    return [id, {
      ...machine,
      upgradeLevel,
      speedModifier: machineSpeedMultiplier(upgradeLevel),
      blockedTicks: Number.isSafeInteger(machine?.blockedTicks) && machine.blockedTicks >= 0 ? machine.blockedTicks : 0,
      blockedSinceTick: Number.isSafeInteger(machine?.blockedSinceTick) ? machine.blockedSinceTick : null,
    }];
  }));
  hydrated.customStations = { ...(candidate.customStations ?? {}) };
  hydrated.selfRegisters = { ...(candidate.selfRegisters ?? {}) };
  hydrated.layout = Object.fromEntries(Object.entries(candidate.layout ?? {}).filter(([id, point]) =>
    (STATIONS[id] || candidate.customStations?.[id] || candidate.selfRegisters?.[id] || id.includes('_') || id.startsWith('selfRegister') || id.startsWith('custom_')) && Number.isFinite(point?.x) && Number.isFinite(point?.z)));
  hydrated.decorations = (Array.isArray(candidate.decorations) ? candidate.decorations : []).filter((entry) =>
    entry && typeof entry.id === 'string' && typeof entry.type === 'string'
      && Number.isFinite(entry.x) && Number.isFinite(entry.z) && entry.placed !== false);
  if (!hydrated.decorations.some((entry) => entry.type === 'trashBin')) {
    const trashBin = initial.decorations.find((entry) => entry.type === 'trashBin');
    hydrated.decorations.push({ ...trashBin });
    if (!canPlaceDecoration(hydrated, trashBin.id, trashBin.x, trashBin.z)) {
      let slot = null;
      for (let row = 0; row <= 32 && !slot; row += 1) {
        for (let column = 0; column <= 32; column += 1) {
          const x = -3 + column * 0.5;
          const z = -8 + row * 0.5;
          if (canPlaceDecoration(hydrated, trashBin.id, x, z)) { slot = { x, z }; break; }
        }
      }
      if (slot) Object.assign(hydrated.decorations.at(-1), slot);
    }
  }
  hydrated.coops = { ...initial.coops, ...(candidate.coops ?? {}) };
  hydrated.diningTables = { ...initial.diningTables, ...(candidate.diningTables ?? {}) };
  hydrated.reservations = { ...initial.reservations, ...(candidate.reservations ?? {}) };
  hydrated.ads = {
    ...initial.ads,
    ...(candidate.ads ?? {}),
    lastPlacementStarts: candidate.ads?.lastPlacementStarts && typeof candidate.ads.lastPlacementStarts === 'object'
      ? { ...candidate.ads.lastPlacementStarts } : {},
    recentCompletions: Array.isArray(candidate.ads?.recentCompletions) ? candidate.ads.recentCompletions.filter(Number.isFinite).slice(-32) : [],
    dailyCounts: candidate.ads?.dailyCounts && typeof candidate.ads.dailyCounts === 'object' ? { ...candidate.ads.dailyCounts } : {},
    dismissedUntil: candidate.ads?.dismissedUntil && typeof candidate.ads.dismissedUntil === 'object' ? { ...candidate.ads.dismissedUntil } : {},
    grantedRewardIds: Array.isArray(candidate.ads?.grantedRewardIds) ? [...new Set(candidate.ads.grantedRewardIds.filter((id) => typeof id === 'string'))].slice(-256) : [],
    completedAdIds: Array.isArray(candidate.ads?.completedAdIds) ? [...new Set(candidate.ads.completedAdIds.filter((id) => typeof id === 'string'))].slice(-256) : [],
    shownOfferKeys: Array.isArray(candidate.ads?.shownOfferKeys) ? [...new Set(candidate.ads.shownOfferKeys.filter((id) => typeof id === 'string'))].slice(-128) : [],
    events: Array.isArray(candidate.ads?.events) ? candidate.ads.events.slice(-500) : [],
    // Startup reconciliation may grant only a provider-persisted completion receipt.
    pending: candidate.ads?.pending && typeof candidate.ads.pending.rewardId === 'string'
      && typeof candidate.ads.pending.placement === 'string' ? { ...candidate.ads.pending } : null,
  };
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
    unlocked: true,
    upgradeLevel: Number.isSafeInteger(worker.upgradeLevel) && worker.upgradeLevel >= 0 ? worker.upgradeLevel : 0,
    speedModifier: staffSpeedMultiplier(Number.isSafeInteger(worker.upgradeLevel) && worker.upgradeLevel >= 0 ? worker.upgradeLevel : 0),
    salaryDebtAtoms: Number.isSafeInteger(worker.salaryDebtAtoms) && worker.salaryDebtAtoms > 0 ? worker.salaryDebtAtoms : 0,
    salaryDueDay: Number.isSafeInteger(worker.salaryDueDay) && worker.salaryDueDay > 0 ? worker.salaryDueDay : null,
    waitingForSalary: Number.isSafeInteger(worker.salaryDebtAtoms) && worker.salaryDebtAtoms > 0,
    salaryWaitRoute: null,
    salaryWaitRouteIndex: 0,
    salaryWaitTarget: null,
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

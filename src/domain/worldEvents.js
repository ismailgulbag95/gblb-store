import { ITEMS, PROCUREMENT_CATALOG, RECIPES, STATIONS } from './catalog.js';
import { getShelfLocations, stationPosition, registerCashierPosition } from './layout.js';
import { makeLocation, quantityAt, totalAt, transferStock } from './inventory.js';
import { EconomyLedger } from './ledger.js';
import { adjustCustomerSatisfaction, tipForMood } from './customerExperience.js';

// All durations use active simulation ticks (10 Hz), never wall clock time.
export const WORLD_EVENTS = Object.freeze({
  tourBus: { good: true, ticks: 900, title: 'Turist otobüsü!', en: 'Tour bus rush!', hint: '10 turist · pahalı reyonları doldur · turist kasaları 2× hızlı', hintEn: '10 tourists · stock premium shelves · tourist checkout 2× faster' },
  critic: { good: true, ticks: 600, title: 'Ünlü gurme geldi!', en: 'VIP food critic!', hint: '60 saniyede siparişini karşıla: 10× bahşiş ve 3 dk +%50 müşteri', hintEn: 'Serve within 60s: 10× tip and +50% arrivals for 3 min' },
  goldenHarvest: { good: true, ticks: 600, title: 'Altın hasat!', en: 'Golden harvest!', hint: '3× büyüme · 2× ürün · tarla kapasitesine kadar', hintEn: '3× growth · 2× yield · limited by field capacity' },
  flashCargo: { good: true, ticks: 1200, title: 'Toptancı fırsatı!', en: 'Flash cargo sale!', hint: 'Terminalde işaretli iki ithal ürün %50 indirimli', hintEn: 'Two marked imports are 50% off in the terminal' },
  billionaire: { good: true, ticks: 900, title: 'Cömert milyarder!', en: 'Generous billionaire!', hint: 'Kasaya ulaşınca sıranın hesabı + $500 kasada birikir', hintEn: 'At checkout: pays the queue and leaves $500 cash' },
  shoplifter: { good: false, ticks: 300, title: 'Hırsızı yakala!', en: 'Catch the shoplifter!', hint: 'Çıkmadan yanına koş: ürünü geri al ve $50 kazan', hintEn: 'Approach before escape: recover the item and earn $50' },
  machineJam: { good: false, ticks: 600, title: 'Makine sıkıştı!', en: 'Machine jam!', hint: 'Makinenin yanında 1,5 sn bekle: 2 dk +%25 hız', hintEn: 'Stand beside it for 1.5s: +25% speed for 2 min' },
  inspection: { good: false, ticks: 600, title: 'Hijyen denetimi!', en: 'Health inspection!', hint: 'Tüm reyonlarda stok ve çalışan enerjisi >%50: A+ ve +%25 bahşiş', hintEn: 'Stock every shelf and keep staff energy >50%: A+ and +25% tips' },
  blackout: { good: false, ticks: 600, title: 'Kasa sigortası attı!', en: 'Register blackout!', hint: 'Kırmızı şalterin yanında 1 sn bekle: kasaları yeniden aç', hintEn: 'Stand by the red breaker for 1s to restore checkout' },
  strayCat: { good: false, ticks: 450, title: 'Yaramaz kedi!', en: 'Mischievous cat!', hint: 'Yanında 1 sn bekleyip sev: maskot ve mutlu müşteriler', hintEn: 'Stand beside it for 1s to pet it: mascot and happy customers' },
});

function random(director) {
  director.rng = (Math.imul(director.rng, 1664525) + 1013904223) >>> 0;
  return director.rng / 4294967296;
}
const interval = (director) => 2100 + Math.floor(random(director) * 901);
export function createWorldEvents(seed = 1) {
  const director = { rng: (seed ^ 0x7e57a11) >>> 0, activeTicks: 0, clockRemainder: 0, nextId: 1,
    nextAt: 0, lastGood: true, active: null, buffs: [], lastResult: null, mascot: false };
  director.nextAt = interval(director);
  return director;
}

export function normalizeWorldEvents(state, saved) {
  if (!saved) return createWorldEvents(state.rng);
  const integer = n => Number.isSafeInteger(n) && n >= 0;
  if (!integer(saved.activeTicks) || !integer(saved.nextAt) || !integer(saved.rng)
    || !integer(saved.nextId) || saved.nextId < 1 || typeof saved.lastGood !== 'boolean'
    || !Array.isArray(saved.buffs)) throw new Error('Olay kaydı bozuk.');
  const director = structuredClone(saved);
  director.buffs = director.buffs.filter(b => b && ['popularity', 'maintenance', 'certificate', 'mascot'].includes(b.type)
    && integer(b.until) && b.until > director.activeTicks && (b.type !== 'maintenance' || typeof b.targetId === 'string'));
  director.mascot = Boolean(saved.mascot);
  director.lastResult = saved.lastResult && WORLD_EVENTS[saved.lastResult.type]
    && typeof saved.lastResult.success === 'boolean' && integer(saved.lastResult.until)
    ? structuredClone(saved.lastResult) : null;
  director.clockRemainder = saved.clockRemainder ?? 0;
  if (!Number.isFinite(director.clockRemainder) || director.clockRemainder < 0 || director.clockRemainder >= 1) throw new Error('Olay saati geçersiz.');
  const active = director.active;
  if (active && (!WORLD_EVENTS[active.type] || active.id !== `world-event-${active.ordinal}`
    || !integer(active.ordinal) || active.ordinal < 1 || active.ordinal >= director.nextId
    || !integer(active.started) || !integer(active.ends) || active.ends < director.activeTicks
    || !integer(active.holdTicks) || !integer(active.spawned)
    || !Number.isFinite(active.x) || !Number.isFinite(active.z)
    || (active.type === 'shoplifter' && (!ITEMS[active.item] || !state.stock[`event:${active.id}`])))) {
    throw new Error('Aktif olay kaydı bozuk.');
  }
  if (active?.type === 'flashCargo' && (!Array.isArray(active.items) || active.items.length !== 2
    || new Set(active.items).size !== 2 || active.items.some(item => !ITEMS[item]?.imported))) throw new Error('İndirim kaydı bozuk.');
  if (active && ['critic', 'billionaire'].includes(active.type) && typeof active.customerId !== 'string') throw new Error('Olay müşterisi geçersiz.');
  if (active?.type === 'machineJam' && typeof active.targetId !== 'string') throw new Error('Olay makinesi geçersiz.');
  if (active?.type === 'shoplifter' && (typeof active.source !== 'string' || !Array.isArray(active.route)
    || active.route.some(p => !Number.isFinite(p.x) || !Number.isFinite(p.z)) || !integer(active.routeIndex))) throw new Error('Hırsız rotası geçersiz.');
  if (director.recoveredParcel && (typeof director.recoveredParcel.location !== 'string'
    || !ITEMS[director.recoveredParcel.item] || !state.stock[director.recoveredParcel.location])) throw new Error('Kurtarılan paket geçersiz.');
  return director;
}

export const activeWorldEvent = (state, type) => state.worldEvents?.active?.type === type ? state.worldEvents.active : null;
export const hasWorldBuff = (state, type, targetId) => Boolean(state.worldEvents?.buffs.some(b =>
  b.type === type && b.until > state.worldEvents.activeTicks && (!targetId || b.targetId === targetId)));
export function wholesaleUnitCost(state, item) {
  const base = PROCUREMENT_CATALOG[item]?.unitCostAtoms ?? 0;
  const sale = activeWorldEvent(state, 'flashCargo');
  return sale?.items.includes(item) ? Math.max(1, Math.round(base * 0.5)) : base;
}

function shelves(state) {
  return Object.keys(ITEMS).flatMap(item => getShelfLocations(state, item).map(s => ({ ...s, item, location: s.stockId })));
}
function stockToSteal(state) {
  return shelves(state).filter(s => quantityAt(state.stock, s.location, s.item)
    - (state.stock[s.location]?.reserved?.[s.item] ?? 0) >= 1).sort((a, b) => ITEMS[b.item].price - ITEMS[a.item].price)[0];
}
function workingMachines(state) {
  return Object.keys(state.machines).filter(id => {
    const recipe = RECIPES[state.machines[id].recipe ?? STATIONS[id]?.recipe ?? state.customStations?.[id]?.recipe];
    return stationPosition(state, id) && recipe && Object.entries(recipe.inputs).every(([item, n]) =>
      quantityAt(state.stock, `machine:${id}:input`, item) >= n)
      && totalAt(state.stock, `machine:${id}:output`) < (state.stock[`machine:${id}:output`]?.capacity ?? 0);
  });
}
function criticMeal(state) {
  if (state.unlocked.restaurant && Object.keys(state.diningTables).length) {
    const kitchens = ['BURGER', 'PIZZA'].filter(item => Object.keys(state.machines).some(id =>
      stationPosition(state, id) && RECIPES[state.machines[id].recipe ?? STATIONS[id]?.recipe]?.output === item));
    if (kitchens.length) return { item: kitchens[0], kind: 'diner' };
  }
  const item = ['ORANGE_TART', 'BREAD'].find(item => state.unlockedProducts.includes(item) && getShelfLocations(state, item).length);
  return item ? { item, kind: 'shopper' } : null;
}
export function eligibleWorldEvents(state) {
  const director = state.worldEvents;
  const retail = shelves(state);
  return Object.keys(WORLD_EVENTS).filter(type => {
    if (!WORLD_EVENTS[type].good && (director.activeTicks < 6000 || !director.lastGood)) return false;
    if (['tourBus', 'billionaire'].includes(type)) return retail.length && state.customers.length < 8;
    if (type === 'critic') return Boolean(criticMeal(state)) && state.customers.length < 8;
    if (type === 'goldenHarvest') return Object.keys(state.farms).some(id => stationPosition(state, id));
    if (type === 'flashCargo') return Boolean(state.unlocked.managerOffice);
    if (type === 'shoplifter') return !director.recoveredParcel && Boolean(stockToSteal(state));
    if (type === 'machineJam') return workingMachines(state).length > 0;
    if (type === 'inspection') return retail.length > 0;
    if (type === 'strayCat') return !director.mascot && retail.some(s => ['TOMATO', 'ORANGE', 'CORN', 'CANNED_FISH'].includes(s.item));
    return type === 'blackout';
  });
}

// Hooks reuse normal customer routing/sale code without circular module imports.
export function startWorldEvent(state, type, hooks = {}, events = []) {
  state.worldEvents ??= createWorldEvents(state.rng);
  const director = state.worldEvents;
  if (state.paused || director.active || !eligibleWorldEvents(state).includes(type)) return false;
  const ordinal = director.nextId++;
  const active = { id: `world-event-${ordinal}`, ordinal, type, started: director.activeTicks,
    ends: director.activeTicks + WORLD_EVENTS[type].ticks, holdTicks: 0, spawned: 0, x: 5, z: 10.4 };
  if (type === 'machineJam') {
    const ids = workingMachines(state);
    active.targetId = ids[Math.floor(random(director) * ids.length)];
    const point = stationPosition(state, active.targetId);
    active.x = point.x; active.z = point.z;
  } else if (type === 'shoplifter' || type === 'strayCat') {
    const shelf = type === 'shoplifter' ? stockToSteal(state)
      : shelves(state).find(s => ['TOMATO', 'ORANGE', 'CORN', 'CANNED_FISH'].includes(s.item));
    active.targetId = shelf.id; active.item = shelf.item;
    Object.assign(active, hooks.shelfPoint?.(shelf.item, shelf.id) ?? { x: shelf.x, z: shelf.z + 1.6 });
    if (type === 'shoplifter') {
      makeLocation(state.stock, `event:${active.id}`, 1);
      transferStock(state, { transactionId: `${active.id}:steal`, from: shelf.location,
        to: `event:${active.id}`, item: active.item, quantity: 1 });
      active.source = shelf.location;
      active.route = hooks.escapeRoute?.(active) ?? [{ x: 5, z: 6.6 }, { x: 5, z: 10.4 }];
      active.routeIndex = 0;
    }
  } else if (type === 'blackout') {
    // An accessible breaker attached to the current register, even after relocation.
    Object.assign(active, registerCashierPosition(stationPosition(state, 'register')));
  } else if (type === 'flashCargo') {
    const imports = Object.keys(ITEMS).filter(item => ITEMS[item].imported);
    const first = imports.splice(Math.floor(random(director) * imports.length), 1)[0];
    active.items = [first, imports[Math.floor(random(director) * imports.length)]];
  } else if (type === 'critic' || type === 'billionaire') {
    const meal = type === 'critic' ? criticMeal(state) : { kind: 'shopper' };
    const customer = hooks.spawnCustomer?.({ ...meal, eventRole: type });
    if (!customer) return false;
    active.customerId = customer.id;
    if (meal.item) active.item = meal.item;
  }
  director.active = active;
  director.lastGood = WORLD_EVENTS[type].good;
  director.nextAt = director.activeTicks + interval(director);
  events.push({ type: 'world-event', message: WORLD_EVENTS[type].title, eventType: type, tone: WORLD_EVENTS[type].good ? 'success' : 'error' });
  return true;
}

function inspectionReady(state) {
  return shelves(state).every(s => quantityAt(state.stock, s.location, s.item) > 0)
    && state.workers.every(w => (w.energy ?? 100) > 50);
}
function buff(state, type, ticks, targetId) {
  const director = state.worldEvents;
  director.buffs = director.buffs.filter(b => b.type !== type || b.targetId !== targetId);
  director.buffs.push({ type, until: director.activeTicks + ticks, ...(targetId ? { targetId } : {}) });
}
function finish(state, success, events) {
  const director = state.worldEvents, active = director.active;
  if (!active) return;
  if (active.type === 'shoplifter') {
    const holding = `event:${active.id}`;
    if (success) {
      // If the original shelf filled meanwhile, safely return to the warehouse.
      makeLocation(state.stock, 'warehouse:main', 500);
      let result = transferStock(state, { transactionId: `${active.id}:return`, from: holding,
        to: active.source, item: active.item, quantity: 1 });
      if (!result.ok) result = transferStock(state, { transactionId: `${active.id}:recover`, from: holding,
        to: 'warehouse:main', item: active.item, quantity: 1 });
      if (!result.ok) {
        // Keep a bounded recovery parcel if both destinations are full.
        director.recoveredParcel = { location: holding, item: active.item };
      }
      new EconomyLedger(state.economy).credit(`${active.id}:reward`, 50, 'world-event-recovery');
    }
    if (!director.recoveredParcel || director.recoveredParcel.location !== holding) delete state.stock[holding];
  }
  if (success && active.type === 'machineJam') buff(state, 'maintenance', 1200, active.targetId);
  if (success && active.type === 'critic') buff(state, 'popularity', 1800);
  if (success && active.type === 'inspection') buff(state, 'certificate', 1800);
  if (success && active.type === 'blackout') adjustCustomerSatisfaction(state, 3);
  if (success && active.type === 'strayCat') {
    director.mascot = true; buff(state, 'mascot', 1800); adjustCustomerSatisfaction(state, 5);
  }
  const rewards = { shoplifter: 'Ürün kurtarıldı · +$50', machineJam: 'Onarıldı · 2 dk +%25 üretim',
    critic: 'VIP memnun · 10× bahşiş · 3 dk +%50 müşteri', inspection: 'A+ belgesi · 3 dk +%25 bahşiş',
    blackout: 'Kasalar açıldı · +3 memnuniyet', strayCat: 'Yeni maskot · +5 memnuniyet', billionaire: '+$500 ve sıra ödemeleri kasada' };
  const message = success ? rewards[active.type] ?? 'Fırsat tamamlandı.'
    : active.type === 'shoplifter' ? 'Hırsız tek ürünle kaçtı.' : 'Olay sona erdi · ek ceza yok.';
  director.lastResult = { type: active.type, success, message, until: director.activeTicks + 80, registerId: active.type === 'billionaire' ? active.registerId : undefined };
  director.active = null;
  events.push({ type: 'world-event', message, eventType: active.type, success });
}

export function advanceWorldEvents(state, hooks = {}, events = []) {
  if (state.paused) return false;
  state.worldEvents ??= createWorldEvents(state.rng);
  const director = state.worldEvents;
  // Main loop accelerates production ticks at 2×. Keep pacing/counterplay in
  // active real play time so fast mode does not shorten the newcomer grace period.
  const speed = [1, 2, 5].includes(state.speedMultiplier) ? state.speedMultiplier : 1;
  const clock = Math.round(((director.clockRemainder ?? 0) + 1 / speed) * 10) / 10;
  const elapsedTicks = Math.floor(clock);
  director.clockRemainder = clock - elapsedTicks;
  director.activeTicks += elapsedTicks;
  director.buffs = director.buffs.filter(b => b.until > director.activeTicks);
  const parcel = director.recoveredParcel;
  if (parcel && transferStock(state, { transactionId: `${parcel.location}:parcel`, from: parcel.location,
    to: 'warehouse:main', item: parcel.item, quantity: 1 }).ok) {
    delete state.stock[parcel.location]; delete director.recoveredParcel;
  }
  let active = director.active;
  if (!active && director.activeTicks >= director.nextAt) {
    const choices = eligibleWorldEvents(state);
    if (choices.length) startWorldEvent(state, choices[Math.floor(random(director) * choices.length)], hooks, events);
    else director.nextAt = director.activeTicks + 100;
    active = director.active;
  }
  if (hasWorldBuff(state, 'mascot') && elapsedTicks > 0 && director.activeTicks % 100 === 0) adjustCustomerSatisfaction(state, 1);
  if (!active) return events.length > 0;
  const previousSpawned = active.spawned;
  if (active.type === 'tourBus' && elapsedTicks > 0 && active.spawned < 10 && (director.activeTicks - active.started) % 15 === 0
    && state.customers.length < 18) {
    if (hooks.spawnCustomer?.({ kind: 'shopper', eventRole: 'tourist' })) active.spawned += 1;
  }
  const customer = state.customers.find(c => c.id === active.customerId);
  if (customer) { active.x = customer.x; active.z = customer.z; }
  if (active.type === 'critic' && customer && (customer.phase === 'eating' || customer.eventPaid)) {
    customer.vipTip = true;
    if (customer.kind === 'shopper') new EconomyLedger(state.economy).credit(`${active.id}:vip-tip`, Math.round(tipForMood(customer, random(director)) * 10 * (hasWorldBuff(state, 'certificate') ? 1.25 : 1)), 'vip-tip');
    finish(state, true, events); return true;
  }
  if (active.type === 'billionaire' && customer?.eventPaid) {
    hooks.payQueue?.(customer.targetRegisterId ?? 'register');
    const registerId = customer.targetRegisterId ?? 'register';
    active.registerId = registerId;
    state.cashAtRegisters[registerId] = (state.cashAtRegisters[registerId] ?? 0) + 500 * 10_000;
    state.cashBundleCounts[registerId] = (state.cashBundleCounts[registerId] ?? 0) + 1;
    finish(state, true, events); return true;
  }
  if (active.type === 'inspection' && inspectionReady(state)) { finish(state, true, events); return true; }
  if (active.type === 'shoplifter') {
    const near = Math.hypot(state.player.x - active.x, state.player.z - active.z) <= 1.5;
    const security = state.workers.some(w => w.type === 'security' && !w.break && !w.waitingForSalary && Math.hypot(w.x - active.x, w.z - active.z) <= 3);
    if (near || security) { finish(state, true, events); return true; }
    const point = active.route?.[active.routeIndex];
    if (point) {
      const d = Math.hypot(point.x - active.x, point.z - active.z), step = 0.055 / speed;
      if (d <= step) { active.x = point.x; active.z = point.z; active.routeIndex += 1; }
      else { active.x += (point.x - active.x) / d * step; active.z += (point.z - active.z) / d * step; }
    } else if (active.route?.length && active.routeIndex >= active.route.length) {
      finish(state, false, events); return true;
    }
  }
  if (['machineJam', 'blackout', 'strayCat'].includes(active.type)) {
    if (active.type === 'machineJam') {
      const point = stationPosition(state, active.targetId);
      if (!point) { finish(state, false, events); return true; }
      active.x = point.x; active.z = point.z;
    }
    const radius = active.type === 'machineJam' ? 3 : 1.8;
    active.holdTicks = Math.hypot(state.player.x - active.x, state.player.z - active.z) <= radius ? active.holdTicks + elapsedTicks : 0;
    if (active.holdTicks >= (active.type === 'machineJam' ? 15 : 10)) { finish(state, true, events); return true; }
  }
  if (director.activeTicks >= active.ends) {
    finish(state, WORLD_EVENTS[active.type].good && !['critic', 'billionaire'].includes(active.type), events);
    return true;
  }
  return events.length > 0 || active.spawned !== previousSpawned;
}

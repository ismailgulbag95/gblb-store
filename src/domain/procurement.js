import { wholesaleUnitCost } from './worldEvents.js';
import { MONEY_ATOMS, PROCUREMENT_CATALOG } from './catalog.js';
import { EconomyLedger } from './ledger.js';
import { getShelfLocations } from './layout.js';
import { makeLocation, totalAt, transferStock, quantityAt } from './inventory.js';

export const PROCUREMENT_PHASE_TICKS = Object.freeze({ arriving: 30, unloading: 40, departing: 30 });
const PENDING_STATUSES = ['queued', 'arriving', 'unloading'];
const tickValue = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
const orderNumber = id => /^procurement-[1-9]\d*$/.test(id) && Number.isSafeInteger(Number(id.slice(12))) ? Number(id.slice(12)) : 0;

export function normalizeProcurement(state) {
  const saved = state.procurement ?? {};
  const ids = new Set();
  const orders = (Array.isArray(saved.orders) ? saved.orders : []).filter(order => {
    if (!order || !orderNumber(order.id) || orderNumber(order.id) >= Number.MAX_SAFE_INTEGER || ids.has(order.id) || ![...PENDING_STATUSES, 'delivered'].includes(order.status)
      || !Array.isArray(order.lines) || !order.lines.length) return false;
    const items = new Set();
    const valid = order.lines.every(line => {
      if (!PROCUREMENT_CATALOG[line.item] || items.has(line.item) || !Number.isSafeInteger(line.cases) || line.cases < 1 || line.cases > 10
        || line.quantity !== line.cases * PROCUREMENT_CATALOG[line.item].caseSize
        || !Number.isSafeInteger(line.unitCostAtoms) || line.unitCostAtoms < 1) return false;
      items.add(line.item); return true;
    }) && Number.isSafeInteger(order.totalAtoms) && order.totalAtoms > 0
      && order.lines.reduce((sum, line) => sum + line.quantity, 0) <= 120
      && order.totalAtoms === order.lines.reduce((sum, line) => sum + line.quantity * line.unitCostAtoms, 0);
    if (valid) ids.add(order.id);
    return valid;
  }).map(order => ({ ...order, lines: order.lines.map(line => ({ ...line })), createdTick: tickValue(order.createdTick) }));
  const historic = orders.filter(order => order.status === 'delivered').slice(-64);
  const pending = orders.filter(order => order.status !== 'delivered');
  const maxId = Math.max(0, ...orders.map(order => orderNumber(order.id)),
    ...state.economy.entries.map(entry => entry.id.startsWith('procurement-payment:') ? orderNumber(entry.id.slice(20)) : 0));
  const automation = saved.automation ?? {};
  let delivery = saved.delivery;
  if (!delivery || !orders.some(order => order.id === delivery.orderId)
    || !Object.hasOwn(PROCUREMENT_PHASE_TICKS, delivery.phase)) delivery = null;
  else delivery = { orderId: delivery.orderId, phase: delivery.phase,
    phaseStartTick: Math.min(tickValue(delivery.phaseStartTick), tickValue(state.tick)),
    cargoReleased: delivery.cargoReleased === true || orders.find(order => order.id === delivery.orderId).status === 'delivered' };
  if (!delivery) {
    const active = pending.find(order => ['arriving', 'unloading'].includes(order.status));
    if (active) delivery = { orderId: active.id, phase: active.status, phaseStartTick: tickValue(state.tick), cargoReleased: false };
  }
  state.procurement = { nextOrderId: Math.max(1, tickValue(saved.nextOrderId), maxId + 1), orders: [...historic, ...pending], delivery,
    automation: { enabled: automation.enabled === true,
      threshold: Number.isSafeInteger(automation.threshold) && automation.threshold >= 1 && automation.threshold <= 12 ? automation.threshold : 2,
      items: [...new Set((Array.isArray(automation.items) ? automation.items : []).filter(item => PROCUREMENT_CATALOG[item]))] },
    nextAutoTick: tickValue(saved.nextAutoTick) };
  makeLocation(state.stock, 'dock:incoming', 240);
  makeLocation(state.stock, 'warehouse:main', 500);
  return state.procurement;
}

export function quoteWholesaleOrder(state, cart) {
  if (!state.unlocked.managerOffice) return { ok: false, reason: 'locked' };
  if (!cart || typeof cart !== 'object' || Array.isArray(cart)) return { ok: false, reason: 'invalid-cart' };
  const entries = Object.entries(cart);
  if (!entries.length) return { ok: false, reason: 'empty-cart' };
  const lines = [];
  for (const [item, cases] of entries) {
    const product = PROCUREMENT_CATALOG[item];
    if (!product || !Number.isSafeInteger(cases) || cases < 1 || cases > 10) return { ok: false, reason: 'invalid-cart' };
    lines.push({ item, cases, quantity: cases * product.caseSize, unitCostAtoms: wholesaleUnitCost(state, item) });
  }
  const quantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  if (quantity > 120) return { ok: false, reason: 'order-too-large' };
  const totalAtoms = lines.reduce((sum, line) => sum + line.quantity * line.unitCostAtoms, 0);
  return { ok: true, lines, quantity, totalAtoms };
}

export function placeWholesaleOrder(state, cart) {
  const quote = quoteWholesaleOrder(state, cart);
  if (!quote.ok) return quote;
  const procurement = state.procurement;
  const pending = procurement.orders.filter(order => PENDING_STATUSES.includes(order.status));
  if (pending.length >= 4) return { ok: false, reason: 'queue-full' };
  const promised = pending.reduce((sum, order) => sum + order.lines.reduce((n, line) => n + line.quantity, 0), 0);
  if (totalAt(state.stock, 'dock:incoming') + promised + quote.quantity > state.stock['dock:incoming'].capacity) return { ok: false, reason: 'dock-capacity' };
  if (state.economy.balanceAtoms < quote.totalAtoms) return { ok: false, reason: 'insufficient-funds' };
  const id = `procurement-${procurement.nextOrderId}`;
  if (!Number.isSafeInteger(procurement.nextOrderId) || procurement.nextOrderId >= Number.MAX_SAFE_INTEGER
    || procurement.orders.some(order => order.id === id)
    || state.economy.entries.some(entry => entry.id === `procurement-payment:${id}`)) return { ok: false, reason: 'invalid-order-id' };
  new EconomyLedger(state.economy).debit(`procurement-payment:${id}`, quote.totalAtoms / MONEY_ATOMS, 'wholesale-procurement');
  procurement.nextOrderId++;
  procurement.orders.push({ id, lines: quote.lines, totalAtoms: quote.totalAtoms, status: 'queued', createdTick: state.tick });
  return { ok: true, id, totalAtoms: quote.totalAtoms };
}

export function configureProcurementAutomation(state, settings) {
  if (!state.unlocked.managerOffice) return { ok: false, reason: 'locked' };
  if (!settings || typeof settings.enabled !== 'boolean' || !Number.isSafeInteger(settings.threshold)
    || settings.threshold < 1 || settings.threshold > 12) return { ok: false, reason: 'invalid-threshold' };
  if (settings.enabled && !state.workers.some(worker => worker.type === 'storeManager')) return { ok: false, reason: 'manager-required' };
  const items = settings.items ?? state.procurement.automation.items;
  if (!Array.isArray(items) || items.some(item => !PROCUREMENT_CATALOG[item])) return { ok: false, reason: 'invalid-items' };
  state.procurement.automation = { enabled: settings.enabled, threshold: settings.threshold, items: [...new Set(items)] };
  state.procurement.nextAutoTick = state.tick;
  return { ok: true };
}

function supplyPosition(state, item) {
  const stock = Object.entries(state.stock).reduce((sum, [id, location]) => {
    const availableSource = id === 'dock:incoming' || id === 'warehouse:main' || id === 'player'
      || id.startsWith('shelf:') || id.startsWith('worker:') || id.startsWith('farm:')
      || id.startsWith('machine:') && id.endsWith(':output') || id === 'coop:eggs';
    return sum + (availableSource ? location.items[item] ?? 0 : 0);
  }, 0);
  return stock + state.procurement.orders.filter(order => PENDING_STATUSES.includes(order.status))
    .reduce((sum, order) => sum + order.lines.filter(line => line.item === item).reduce((n, line) => n + line.quantity, 0), 0);
}

function automate(state) {
  const procurement = state.procurement;
  if (!procurement.automation.enabled || state.tick < procurement.nextAutoTick) return false;
  procurement.nextAutoTick = state.tick + 50;
  if (!state.workers.some(worker => worker.type === 'storeManager' && !worker.waitingForSalary && !worker.break)) return false;
  const cart = {};
  for (const item of procurement.automation.items) {
    const shelves = getShelfLocations(state, item);
    if (!shelves.length) continue;
    const onShelf = shelves.reduce((sum, shelf) => sum + quantityAt(state.stock, shelf.stockId, item), 0);
    if (onShelf < procurement.automation.threshold && supplyPosition(state, item) < procurement.automation.threshold) cart[item] = 1;
    if (Object.keys(cart).length >= 20) break;
  }
  return Object.keys(cart).length > 0 && placeWholesaleOrder(state, cart).ok;
}

export function advanceProcurement(state, events = []) {
  if (!state.unlocked.managerOffice) return false;
  const procurement = state.procurement;
  let durable = automate(state);
  if (!procurement.delivery) {
    const next = procurement.orders.find(order => order.status === 'queued');
    if (!next) return durable;
    next.status = 'arriving';
    procurement.delivery = { orderId: next.id, phase: 'arriving', phaseStartTick: state.tick, cargoReleased: false };
    return true;
  }
  const delivery = procurement.delivery;
  const order = procurement.orders.find(entry => entry.id === delivery.orderId);
  if (!order) { procurement.delivery = null; return true; }
  const elapsed = state.tick - delivery.phaseStartTick;
  if (delivery.phase === 'arriving' && elapsed >= PROCUREMENT_PHASE_TICKS.arriving) {
    delivery.phase = 'unloading'; delivery.phaseStartTick = state.tick; order.status = 'unloading'; durable = true;
  } else if (delivery.phase === 'unloading' && elapsed >= PROCUREMENT_PHASE_TICKS.unloading) {
    if (!delivery.cargoReleased) {
      const remaining = order.lines.filter(line => !state.stockTransactions.some(entry => (typeof entry === 'string' ? entry : entry.id) === `procurement-unload:${order.id}:${line.item}`));
      const quantity = remaining.reduce((sum, line) => sum + line.quantity, 0);
      if (totalAt(state.stock, 'dock:incoming') + quantity + (state.stock['dock:incoming'].reservedCapacity ?? 0) > state.stock['dock:incoming'].capacity) return durable;
      const sourceId = `procurement:${order.id}`;
      const existed = state.stock[sourceId];
      const source = makeLocation(state.stock, sourceId, 120);
      if (!existed) source.items = Object.fromEntries(remaining.map(line => [line.item, line.quantity]));
      for (const line of remaining) {
        const result = transferStock(state, { transactionId: `procurement-unload:${order.id}:${line.item}`, from: sourceId,
          to: 'dock:incoming', item: line.item, quantity: line.quantity });
        if (!result.ok) throw new Error('Teslimat stok aktarımı tamamlanamadı.');
      }
      delete state.stock[sourceId];
      delivery.cargoReleased = true;
      events.push({ type: 'toast', message: 'Toptan sipariş rampaya indirildi.' });
    }
    order.status = 'delivered'; order.deliveredTick = state.tick;
    delivery.phase = 'departing'; delivery.phaseStartTick = state.tick; durable = true;
    procurement.orders = procurement.orders.filter(entry => entry.status !== 'delivered')
      .concat(procurement.orders.filter(entry => entry.status === 'delivered').slice(-64));
  } else if (delivery.phase === 'departing' && elapsed >= PROCUREMENT_PHASE_TICKS.departing) {
    procurement.delivery = null; durable = true;
  }
  return durable;
}

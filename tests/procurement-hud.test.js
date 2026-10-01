import test from 'node:test';
import assert from 'node:assert/strict';
import { HUD } from '../src/presentation/HUD.js';
import { MONEY_ATOMS, PROCUREMENT_CATALOG } from '../src/domain/catalog.js';

function game() {
  return { settings: { language: 'tr' }, unlocked: { managerOffice: true }, workers: [],
    economy: { balanceAtoms: 1000 * MONEY_ATOMS },
    procurement: { orders: [], delivery: null, automation: { enabled: false, threshold: 2, items: [] } } };
}

function view(state = game()) {
  const hud = Object.create(HUD.prototype);
  hud.elements = { 'procurement-content': { innerHTML: '' } };
  hud.procurementCart = {};
  hud.procurementCategory = 'drinks';
  hud.app = { getState: () => state };
  hud.toast = () => {};
  return hud;
}

test('procurement terminal has accessible category tabs, imported cases and furniture controls', () => {
  const hud = view();
  hud.renderProcurement(game());
  const html = hud.elements['procurement-content'].innerHTML;
  assert.equal((html.match(/role="tab"/g) ?? []).length, 4);
  assert.match(html, /data-procurement-category="drinks"[^>]*aria-selected="true"/);
  assert.match(html, /Kola/);
  assert.match(html, /data-procurement-add="COLA"/);
  assert.match(html, /data-imported-shelf="COLA"/);
  assert.match(html, /Siparişi Onayla/);
  assert.match(html, /id="procurement-confirm"[^>]*disabled/);
});

test('cart changes use catalogue cases and stay bounded without changing the domain state', () => {
  const state = game(), hud = view(state);
  const before = structuredClone(state);
  hud.updateProcurementCart('COLA', 1);
  assert.equal(hud.procurementCart.COLA, 1);
  hud.updateProcurementCart('UNKNOWN', 1);
  assert.equal(hud.procurementCart.UNKNOWN, undefined);
  for (let index = 0; index < 20; index++) hud.updateProcurementCart('COLA', 1);
  assert.equal(hud.procurementCart.COLA, 10);
  hud.updateProcurementCart('COLA', -10);
  assert.equal(hud.procurementCart.COLA, undefined);
  assert.deepEqual(state, before);
});

test('cart respects the shipment limit of twenty cases across different products', () => {
  const hud = view();
  hud.updateProcurementCart('COLA', 10);
  hud.updateProcurementCart('SODA', 10);
  hud.updateProcurementCart('SHAMPOO', 1);
  assert.equal(hud.procurementCart.SHAMPOO, undefined);
  assert.match(hud.elements['procurement-content'].innerHTML, /data-procurement-add="COLA"[^>]*disabled/);
  hud.updateProcurementCart('COLA', -1);
  hud.updateProcurementCart('SHAMPOO', 1);
  assert.equal(hud.procurementCart.SHAMPOO, 1);
  assert.equal(Object.values(hud.procurementCart).reduce((total, cases) => total + cases, 0), 20);
});

test('confirm sends an item-to-case cart, preserves failed orders and clears only successful orders', () => {
  const state = game(), hud = view(state), calls = [];
  hud.procurementCart = { COLA: 2 };
  hud.app.placeWholesaleOrder = (cart) => { calls.push(structuredClone(cart)); return { ok: false, reason: 'insufficient-funds' }; };
  hud.submitProcurement();
  assert.deepEqual(hud.procurementCart, { COLA: 2 });
  hud.app.placeWholesaleOrder = (cart) => { calls.push(structuredClone(cart)); return { ok: true, id: 'wholesale-1', totalAtoms: 100 }; };
  hud.submitProcurement();
  assert.deepEqual(hud.procurementCart, {});
  assert.deepEqual(calls, [{ COLA: 2 }, { COLA: 2 }]);
});

test('automation requires a manager and shows saved threshold with an explanatory lock', () => {
  const state = game(), hud = view(state);
  hud.renderProcurement(state);
  assert.match(hud.elements['procurement-content'].innerHTML, /id="procurement-auto-enabled"[^>]*disabled/);
  assert.match(hud.elements['procurement-content'].innerHTML, /Mağaza Müdürü/);
  state.workers.push({ type: 'storeManager' });
  state.procurement.automation = { enabled: true, threshold: 4, items: ['COLA'] };
  hud.renderProcurement(state, true);
  const html = hud.elements['procurement-content'].innerHTML;
  assert.match(html, /id="procurement-auto-enabled"[^>]*checked/);
  assert.doesNotMatch(html, /id="procurement-auto-enabled"[^>]*disabled/);
  assert.match(html, /id="procurement-auto-threshold"[^>]*value="4"/);
  assert.match(html, /data-procurement-auto-item="COLA"[^>]*checked/);
});

test('queue rendering escapes identifiers and distinguishes arriving and delivered orders', () => {
  const state = game(), hud = view(state);
  state.procurement.orders = [
    { id: '<truck>', status: 'arriving', lines: [{ item: 'COLA', cases: 1, quantity: 6 }], totalAtoms: MONEY_ATOMS },
    { id: 'wholesale-2', status: 'delivered', lines: [{ item: 'COLA', cases: 1, quantity: 6 }], totalAtoms: MONEY_ATOMS },
  ];
  hud.renderProcurement(state);
  const html = hud.elements['procurement-content'].innerHTML;
  assert.match(html, /&lt;truck&gt;/);
  assert.match(html, /Yolda/);
  assert.match(html, /Rampaya indirildi/);
  assert.match(html, /TESLİMAT KAYDI.*\[2\]/);
  assert.doesNotMatch(html, /<truck>/);
});

test('opening the terminal requires office access and uses the existing modal pause path', () => {
  const state = game(), hud = view(state), calls = [];
  hud.open = (id) => calls.push(id);
  hud.openProcurement();
  assert.deepEqual(calls, ['procurement-modal']);
  state.unlocked.managerOffice = false;
  hud.openProcurement();
  assert.deepEqual(calls, ['procurement-modal']);
});

test('case cart displays exact price and disables payment when balance drops below total', () => {
  const state = game(), hud = view(state);
  hud.procurementCart = { COLA: 2, SHAMPOO: 1 };
  const total = PROCUREMENT_CATALOG.COLA.unitCostAtoms * PROCUREMENT_CATALOG.COLA.caseSize * 2
    + PROCUREMENT_CATALOG.SHAMPOO.unitCostAtoms * PROCUREMENT_CATALOG.SHAMPOO.caseSize;
  state.economy.balanceAtoms = total;
  hud.renderProcurement(state);
  const money = (total / MONEY_ATOMS).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  assert.ok(hud.elements['procurement-content'].innerHTML.includes(`<strong>$${money}</strong>`));
  assert.doesNotMatch(hud.elements['procurement-content'].innerHTML, /id="procurement-confirm"[^>]*disabled/);
  state.economy.balanceAtoms = total - 1;
  hud.renderProcurement(state);
  assert.match(hud.elements['procurement-content'].innerHTML, /id="procurement-confirm"[^>]*disabled/);
});

test('manager automation saves explicit selected items through the application API', () => {
  const state = game(), hud = view(state), config = { enabled: true, threshold: 3, items: ['COLA', 'SODA'] };
  state.workers = [{ type: 'storeManager' }];
  hud.app.configureProcurementAutomation = (received) => {
    assert.deepEqual(received, config);
    state.procurement.automation = structuredClone(received);
    return { ok: true };
  };
  assert.deepEqual(hud.applyProcurementAutomation(config), { ok: true });
  assert.deepEqual(hud.procurementAutomationDraft, config);
  state.procurement.automation.items.push('SHAMPOO');
  assert.deepEqual(hud.procurementAutomationDraft.items, ['COLA', 'SODA']);
});

test('saved automation draft survives a cart update and English furniture names render', () => {
  const state = game(), hud = view(state);
  state.settings.language = 'en';
  state.workers = [{ type: 'storeManager' }];
  hud.procurementAutomationDraft = { enabled: true, threshold: 5, items: ['COLA'] };
  hud.updateProcurementCart('COLA', 1);
  const html = hud.elements['procurement-content'].innerHTML;
  assert.match(html, /id="procurement-auto-threshold"[^>]*value="5"/);
  assert.match(html, /data-procurement-auto-item="COLA"[^>]*checked/);
  assert.match(html, /Place cooler/);
  assert.match(html, /Confirm Order/);
  assert.match(html, /1 cases \(6\)/);
});

test('terminal event delegation opens, selects cases, pays once and returns to the game', () => {
  const originalDocument = globalThis.document, originalWindow = globalThis.window;
  const nodes = new Map();
  const node = (id) => {
    if (!nodes.has(id)) {
      const classes = new Set(['hidden']);
      nodes.set(id, { dataset: {}, listeners: {}, innerHTML: '', textContent: '',
        classList: { add: (value) => classes.add(value), contains: (value) => classes.has(value),
          toggle: (value, force = !classes.has(value)) => { force ? classes.add(value) : classes.delete(value); return force; } },
        setAttribute() {}, focus() {}, querySelector: node, querySelectorAll: () => [],
        addEventListener(type, listener) { this.listeners[type] = listener; },
      });
    }
    return nodes.get(id);
  };
  globalThis.document = { getElementById: node, querySelector: node, querySelectorAll: () => [] };
  globalThis.window = { matchMedia: () => ({ matches: false, addEventListener() {} }), addEventListener() {} };
  try {
    const state = game(), paused = [], carts = [];
    const app = { getState: () => state, placeWholesaleOrder(cart) { carts.push(cart); return { ok: true, id: 'procurement-1' }; } };
    const hud = new HUD(app, {}, (value) => paused.push(value));
    hud.toast = () => {};
    node('btn-procurement').listeners.click();
    assert.equal(node('procurement-modal').classList.contains('hidden'), false);
    assert.equal(paused.at(-1), true);
    const click = (selector, dataset = {}) => node('procurement-content').listeners.click({ target: { closest: (query) => query === selector ? { dataset } : null } });
    click('[data-procurement-category]', { procurementCategory: 'drinks' });
    click('[data-procurement-add]', { procurementAdd: 'COLA' });
    assert.deepEqual(hud.procurementCart, { COLA: 1 });
    assert.equal(carts.length, 0);
    click('#procurement-confirm');
    assert.deepEqual(carts, [{ COLA: 1 }]);
    assert.deepEqual(hud.procurementCart, {});
    assert.equal(paused.at(-1), true);
    hud.close('procurement-modal');
    assert.equal(paused.at(-1), false);
    assert.equal(node('procurement-modal').classList.contains('hidden'), true);
  } finally {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  }
});

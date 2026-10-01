import test from 'node:test';
import assert from 'node:assert/strict';
import { HUD } from '../src/presentation/HUD.js';
import { MONEY_ATOMS } from '../src/domain/catalog.js';

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

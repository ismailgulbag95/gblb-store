import test from 'node:test';
import assert from 'node:assert/strict';
import { HUD } from '../src/presentation/HUD.js';
import { MONEY_ATOMS, STAFF_FACILITIES } from '../src/domain/catalog.js';
import { GameApplication } from '../src/application/GameApplication.js';
import { SaveService } from '../src/infrastructure/SaveService.js';

function state() {
  return {
    settings: { language: 'tr' }, economy: { balanceAtoms: 1000 * MONEY_ATOMS },
    availableUpgrades: ['cashier'], completedUpgrades: [], workers: [],
    staffLandCleared: false, staffFacilities: {}, staffCandidates: {},
  };
}

function hud() {
  const view = Object.create(HUD.prototype);
  view.elements = { 'staff-list': { innerHTML: '' }, 'staff-candidate-list': { innerHTML: '' } };
  return view;
}

test('staff hiring UI opens candidates without requiring an ad provider', () => {
  const view = hud();
  view.renderStaff(state());
  assert.match(view.elements['staff-list'].innerHTML, /data-staff-candidates="cashier"/);
  assert.doesNotMatch(view.elements['staff-list'].innerHTML, /data-ad-accept="staff-hire"/);
});

test('facility UI requires north land and marks built facilities', () => {
  const view = hud();
  const game = state();
  view.renderStaff(game);
  assert.match(view.elements['staff-list'].innerHTML, /data-staff-land/);
  assert.match(view.elements['staff-list'].innerHTML, /data-staff-facility="rest" disabled/);
  game.staffLandCleared = true;
  game.staffFacilities.rest = { id: 'rest', ...STAFF_FACILITIES.rest };
  view.renderStaff(game);
  assert.match(view.elements['staff-list'].innerHTML, /data-staff-facility="wc" >/);
  assert.match(view.elements['staff-list'].innerHTML, /İnşa edildi/);
});

test('candidate popup exposes exact personal salary, total fee and all three selections safely', () => {
  const view = hud();
  const game = state();
  game.staffCandidates.cashier = ['A <test>', 'B', 'C'].map((name, index) => ({
    id: `candidate-${index}`, role: 'cashier', name, archetypeId: 'diligent', traits: ['diligent'],
    salaryAtoms: 13 * MONEY_ATOMS, hireCostAtoms: (index + 1) * 100 * MONEY_ATOMS,
  }));
  view.renderStaffCandidates(game, 'cashier');
  const html = view.elements['staff-candidate-list'].innerHTML;
  assert.equal((html.match(/data-hire-candidate=/g) ?? []).length, 3);
  assert.match(html, /A &lt;test&gt;/);
  assert.match(html, /13,00/);
  assert.match(html, /300,00/);
  assert.match(html, /Çalışkan/);
  assert.match(html, /data-candidate-role="cashier"/);
});

test('unaffordable candidate remains visible with disabled hiring', () => {
  const view = hud();
  const game = state();
  game.economy.balanceAtoms = 0;
  game.staffCandidates.cashier = [{ id: 'candidate-1', role: 'cashier', name: 'A', archetypeId: 'lazy', traits: ['lazy'], salaryAtoms: 100, hireCostAtoms: 100 }];
  view.renderStaffCandidates(game, 'cashier');
  assert.match(view.elements['staff-candidate-list'].innerHTML, /data-hire-candidate="candidate-1"[^>]*disabled/);
});

test('worker UI shows personal wage and low energy from the real worker state', () => {
  const view = hud();
  const game = state();
  game.workers = [{ id: 'worker-1', type: 'cashier', name: 'Deniz', archetypeId: 'diligent',
    salaryAtoms: 17 * MONEY_ATOMS, energy: 9, hunger: 80, comfort: 45, morale: 70, break: { phase: 'resting', facilityId: 'rest' } }];
  view.renderStaff(game);
  const html = view.elements['staff-list'].innerHTML;
  assert.match(html, /17,00/);
  assert.match(html, /data-worker-energy="worker-1"[^>]*value="9"/);
  assert.match(html, /Dinleniyor/);
  assert.match(html, /Deniz/);
});

test('needs updates keep existing staff card nodes and clamp live energy', () => {
  const view = hud();
  const game = state();
  game.workers = [{ id: 'worker-1', type: 'cashier', energy: -2, hunger: 50, morale: 65, comfort: 72, break: { phase: 'returning' } }];
  let lowEnergy;
  const progress = { dataset: { workerEnergy: 'worker-1' }, classList: { toggle: (_, on) => { lowEnergy = on; } } };
  const label = { dataset: { workerEnergyLabel: 'worker-1' } };
  const status = { dataset: { workerBreak: 'worker-1' } };
  const needs = { dataset: { workerNeeds: 'worker-1' } };
  view.elements['staff-list'].innerHTML = 'original cards';
  view.elements['staff-list'].querySelectorAll = (selector) => ({
    '[data-worker-energy]': [progress], '[data-worker-energy-label]': [label],
    '[data-worker-break]': [status], '[data-worker-needs]': [needs],
  })[selector];
  view.updateStaffNeeds(game);
  assert.equal(view.elements['staff-list'].innerHTML, 'original cards');
  assert.equal(progress.value, 0);
  assert.equal(lowEnergy, true);
  assert.equal(label.textContent, 'Enerji 0/100');
  assert.equal(status.textContent, 'İşe dönüyor');
  assert.match(needs.textContent, /Tokluk 50/);
  game.workers[0].energy = 105;
  view.updateStaffNeeds(game);
  assert.equal(progress.value, 100);
  assert.equal(lowEnergy, false);
});

test('opening candidates delegates pool generation and opens a dialog without hiring', () => {
  const view = hud();
  const game = state();
  const actions = [];
  view.app = {
    openStaffCandidates: (role) => { actions.push(['pool', role]); return { ok: true }; },
    getState: () => game,
    hireStaffCandidate: () => { throw new Error('Opening must never hire'); },
  };
  view.open = (id) => actions.push(['open', id]);
  view.openStaffCandidates('cashier');
  assert.deepEqual(actions, [['pool', 'cashier'], ['open', 'staff-candidates-modal']]);
});

test('locked staff candidate action explains the lock without opening a dialog', () => {
  const view = hud();
  const messages = [];
  view.app = { openStaffCandidates: () => ({ ok: false, reason: 'locked' }), getState: state };
  view.open = () => { throw new Error('Locked profession must not open'); };
  view.toast = (message, tone) => messages.push([message, tone]);
  view.openStaffCandidates('cashier');
  assert.deepEqual(messages, [['Bu meslek henüz açılmadı.', 'error']]);
});

test('candidate close keeps the pool and pause; failed hire is immutable and reopening refreshes funds', () => {
  const originalDocument = globalThis.document, originalWindow = globalThis.window;
  const nodes = new Map();
  const node = (id) => {
    if (!nodes.has(id)) {
      const classes = new Set(['hidden']);
      nodes.set(id, { dataset: {}, listeners: {}, innerHTML: '', textContent: '',
        classList: { add: (value) => classes.add(value), contains: (value) => classes.has(value),
          toggle: (value, force = !classes.has(value)) => { force ? classes.add(value) : classes.delete(value); return force; } },
        setAttribute() {}, querySelector: node, querySelectorAll: () => [],
        addEventListener(type, listener) { this.listeners[type] = listener; },
      });
    }
    return nodes.get(id);
  };
  const tab = node('staff-tab'); tab.dataset.upgradeTab = 'staff';
  const panel = node('staff-panel'); panel.dataset.upgradePanel = 'staff';
  globalThis.document = { getElementById: node, querySelector: node,
    querySelectorAll: (selector) => selector === '[data-upgrade-tab]' ? [tab] : selector === '[data-upgrade-panel]' ? [panel] : [] };
  globalThis.window = { matchMedia: () => ({ matches: false, addEventListener() {} }), addEventListener() {} };
  try {
    const records = new Map();
    const app = new GameApplication(new SaveService({ getItem: (key) => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) }), 18);
    app.state.availableUpgrades.push('cashier');
    app.state.economy.balanceAtoms = 0;
    const paused = [];
    const view = new HUD(app, {}, (value) => paused.push(value));
    view.render = (game) => view.renderStaff(game);
    view.toast = () => {};
    view.openStaffCandidates('cashier');
    const pool = structuredClone(app.state.staffCandidates.cashier);
    assert.match(node('staff-candidate-list').innerHTML, /disabled/);
    const button = { disabled: false, dataset: { candidateRole: 'cashier', hireCandidate: pool[0].id } };
    node('staff-candidates-modal').listeners.click({ target: { closest: () => button } });
    assert.deepEqual(app.state.staffCandidates.cashier, pool);
    assert.equal(app.state.workers.length, 0);
    assert.equal(node('staff-candidates-modal').classList.contains('hidden'), false);
    view.close('staff-candidates-modal');
    assert.equal(node('staff-candidates-modal').classList.contains('hidden'), true);
    assert.equal(node('expansion-modal').classList.contains('hidden'), false);
    assert.equal(tab.classList.contains('active'), true);
    assert.equal(paused.at(-1), true);
    app.state.economy.balanceAtoms = 10_000 * MONEY_ATOMS;
    view.openStaffCandidates('cashier');
    assert.deepEqual(app.state.staffCandidates.cashier, pool);
    assert.doesNotMatch(node('staff-candidate-list').innerHTML, /disabled/);
    const balance = app.state.economy.balanceAtoms;
    node('staff-candidates-modal').listeners.click({ target: { closest: () => button } });
    assert.equal(app.state.workers.length, 1);
    assert.equal(app.state.economy.balanceAtoms, balance - pool[0].hireCostAtoms);
    assert.equal(node('staff-candidates-modal').classList.contains('hidden'), true);
    assert.equal(node('expansion-modal').classList.contains('hidden'), false);
    assert.equal(paused.at(-1), true);
    view.closeAll();
    assert.equal(paused.at(-1), false);
    assert.equal(app.state.staffCandidates.cashier, undefined);
  } finally {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  }
});

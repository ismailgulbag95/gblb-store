import * as THREE from 'three';

const STORAGE_KEY = 'tohumdan-sofraya:scene-freeze-diagnostics:v1';
const MAX_EVENTS = 18;
const DRAW_TRACE_HOOK = Symbol.for('tohumdan-sofraya.scene-diagnostic-draw-trace');

function installLastDrawTrace() {
  const prototype = THREE.Material.prototype;
  if (prototype[DRAW_TRACE_HOOK]) return;

  const original = prototype.onBeforeRender;
  Object.defineProperty(prototype, DRAW_TRACE_HOOK, { value: true });
  prototype.onBeforeRender = function (renderer, scene, camera, geometry, object, group) {
    if (renderer) {
      const trace = renderer.__tohumdanSceneLastDraw ?? (renderer.__tohumdanSceneLastDraw = {});
      trace.objectId = object?.id ?? null;
      trace.objectUuid = object?.uuid ?? null;
      trace.objectName = object?.name || null;
      trace.objectType = object?.type ?? null;
      const userId = object?.userData?.id;
      trace.objectUserId = typeof userId === 'string' || typeof userId === 'number' ? userId : null;
      trace.geometryType = geometry?.type ?? null;
      trace.geometryUuid = geometry?.uuid ?? null;
      trace.materialId = this.id ?? null;
      trace.materialUuid = this.uuid ?? null;
      trace.materialName = this.name || null;
      trace.materialType = this.type ?? null;
      trace.materialOpacity = this.opacity ?? null;
      trace.isMeshBasicMaterial = Boolean(this.isMeshBasicMaterial);
      trace.isMeshLambertMaterial = Boolean(this.isMeshLambertMaterial);
      trace.isMeshPhongMaterial = Boolean(this.isMeshPhongMaterial);
      trace.isMeshStandardMaterial = Boolean(this.isMeshStandardMaterial);
      trace.isMeshPhysicalMaterial = Boolean(this.isMeshPhysicalMaterial);
      trace.isSpriteMaterial = Boolean(this.isSpriteMaterial);
      trace.hasMap = Boolean(this.map);
      trace.hasEmissiveMap = Boolean(this.emissiveMap);
      trace.groupMaterialIndex = group?.materialIndex ?? null;
    }
    return original?.call(this, renderer, scene, camera, geometry, object, group);
  };
}

function readSavedRecord() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function describeError(error) {
  if (error instanceof Error) return { name: error.name, message: error.message, stack: error.stack ?? null };
  return { name: 'Error', message: String(error), stack: null };
}

function mountPreviousRunReport(record) {
  const panel = document.createElement('section');
  panel.setAttribute('role', 'alert');
  panel.style.cssText = [
    'position:fixed', 'z-index:2147483647', 'top:12px', 'right:12px',
    'width:min(620px,calc(100vw - 24px))', 'max-height:72vh', 'overflow:auto',
    'padding:14px', 'border:3px solid #171717', 'border-radius:8px',
    'background:#fff4cc', 'color:#171717', 'box-shadow:6px 6px 0 #171717',
    'font:13px/1.45 ui-monospace,SFMono-Regular,Consolas,monospace',
  ].join(';');

  const title = document.createElement('strong');
  title.textContent = 'Önceki oturumun tanı kaydı';
  title.style.cssText = 'display:block;margin-bottom:8px;font:700 15px/1.3 system-ui,sans-serif';
  const note = document.createElement('p');
  note.textContent = 'Oyun yeniden yüklenmeden önceki son işlem ve hata kaydı. Bu metni Codex’e gönderebilirsin.';
  note.style.cssText = 'margin:0 0 8px;font:13px/1.4 system-ui,sans-serif';

  const details = document.createElement('pre');
  details.textContent = JSON.stringify(record, null, 2);
  details.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere;margin:0 0 10px';

  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.textContent = 'Tanı kaydını kopyala';
  copy.style.cssText = 'padding:7px 10px;border:2px solid #171717;background:#fff;color:#171717;font-weight:700;cursor:pointer';
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(details.textContent);
      copy.textContent = 'Kopyalandı';
    } catch {
      copy.textContent = 'Metni seçip kopyala';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(details);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  });

  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Kapat';
  close.style.cssText = copy.style.cssText;
  close.addEventListener('click', () => panel.remove(), { once: true });

  actions.append(copy, close);
  panel.append(title, note, details, actions);
  const append = () => (document.body ?? document.documentElement).append(panel);
  if (document.body) append();
  else window.addEventListener('DOMContentLoaded', append, { once: true });
}

export function createSceneFreezeDiagnostics() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null;

  installLastDrawTrace();
  const previous = readSavedRecord();
  if (previous?.activeOperation || previous?.lastError) mountPreviousRunReport(previous);

  const session = {
    version: 1,
    sessionStartedAt: new Date().toISOString(),
    activeOperation: null,
    lastCheckpoint: null,
    lastError: null,
    events: [],
  };

  const persist = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Diagnostics must never interfere with the game if storage is unavailable.
    }
  };

  const record = (name, details = {}) => {
    const event = { at: new Date().toISOString(), name, details };
    session.events = [...session.events.slice(-(MAX_EVENTS - 1)), event];
    session.lastCheckpoint = event;
    persist();
  };

  const begin = (name, details = {}) => {
    session.activeOperation = { name, startedAt: new Date().toISOString(), details };
    record(`${name}:started`, details);
  };

  const finish = (name, details = {}) => {
    record(`${name}:finished`, details);
    if (session.activeOperation?.name === name) session.activeOperation = null;
    persist();
  };

  const fail = (where, error, details = {}) => {
    session.lastError = { at: new Date().toISOString(), where, ...describeError(error), details };
    record(`${where}:error`, { ...session.lastError });
    persist();
  };

  window.addEventListener('error', (event) => {
    fail('window.error', event.error ?? event.message, { source: event.filename, line: event.lineno, column: event.colno });
  });
  window.addEventListener('unhandledrejection', (event) => fail('unhandledrejection', event.reason));

  record('session:started');
  return { record, begin, finish, fail };
}

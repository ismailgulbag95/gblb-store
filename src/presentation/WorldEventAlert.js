import { WORLD_EVENTS } from '../domain/worldEvents.js';
import { ITEMS, STATIONS } from '../domain/catalog.js';

export function worldEventAlert(state) {
  const director = state.worldEvents;
  if (!director) return null;
  const english = state.settings.language === 'en', active = director.active;
  if (!active) {
    const result = director.lastResult;
    const buffs = director.buffs.filter(b => b.until > director.activeTicks);
    const names = english ? { popularity: '+50% arrivals', maintenance: '+25% production', certificate: 'A+ · +25% tips', mascot: 'Friendly mascot' }
      : { popularity: '+%50 müşteri', maintenance: '+%25 üretim', certificate: 'A+ · +%25 bahşiş', mascot: 'Dost maskot' };
    if (result?.until > director.activeTicks) return { title: english ? (result.success ? 'Event completed!' : 'Event ended') : result.message,
      hint: english ? WORLD_EVENTS[result.type].en : '', good: result.success, seconds: Math.ceil((result.until - director.activeTicks) / 10) };
    if (!buffs.length) return null;
    return { title: buffs.map(b => names[b.type]).join(' · '), hint: english ? 'Active bonuses' : 'Aktif bonuslar', good: true,
      seconds: Math.ceil((Math.max(...buffs.map(b => b.until)) - director.activeTicks) / 10) };
  }
  const definition = WORLD_EVENTS[active.type];
  let hint = english ? definition.hintEn : definition.hint;
  if (active.targetId && active.type === 'machineJam') hint = `${STATIONS[active.targetId]?.title ?? state.customStations?.[active.targetId]?.title ?? active.targetId} · ${hint}`;
  if (active.item) hint = `${ITEMS[active.item].name} · ${hint}`;
  if (active.items) hint = `${active.items.map(item => ITEMS[item].name).join(' + ')} · ${hint}`;
  const move = ['shoplifter', 'machineJam', 'blackout', 'strayCat', 'critic'].includes(active.type);
  const target = active.type === 'machineJam' ? { x: active.x, z: active.z + 2.4 } : { x: active.x, z: active.z };
  return { title: english ? definition.en : definition.title, hint, good: definition.good,
    seconds: Math.max(0, Math.ceil((active.ends - director.activeTicks) / 10)), target: move ? target : null,
    progress: ['machineJam', 'blackout', 'strayCat'].includes(active.type) ? active.holdTicks / (active.type === 'machineJam' ? 15 : 10) : null };
}

export class WorldEventAlert {
  constructor(app) { this.app = app; this.element = null; }
  render(state) {
    const view = worldEventAlert(state);
    if (!this.element && !view) return;
    if (!this.element) {
      this.element = document.createElement('aside');
      this.element.className = 'world-event-alert'; this.element.dataset.ui = 'true';
      this.element.innerHTML = '<strong role="status" aria-live="polite"></strong><time></time><p></p><progress max="1"></progress><button type="button"></button>';
      document.getElementById('ui-layer').appendChild(this.element);
      this.element.querySelector('button').addEventListener('click', () => {
        if (this.target && !this.app.getState().paused) this.app.setPlayerTarget(this.target.x, this.target.z);
      });
    }
    this.element.hidden = !view;
    if (!view) return;
    this.target = view.target;
    this.element.classList.toggle('world-event-alert--crisis', !view.good);
    const title = this.element.querySelector('strong');
    if (title.textContent !== view.title) title.textContent = view.title;
    this.element.querySelector('p').textContent = view.hint;
    this.element.querySelector('time').textContent = `${Math.floor(view.seconds / 60)}:${String(view.seconds % 60).padStart(2, '0')}`;
    const progress = this.element.querySelector('progress');
    progress.hidden = view.progress === null || view.progress === undefined; progress.value = view.progress ?? 0;
    progress.setAttribute('aria-label', state.settings.language === 'en' ? 'Event recovery progress' : 'Olay çözüm ilerlemesi');
    const button = this.element.querySelector('button');
    button.hidden = !view.target; button.disabled = state.paused;
    button.textContent = state.settings.language === 'en' ? 'Move to event' : 'Olaya doğru git';
  }
}

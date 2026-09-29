import './style.css';
import { GameApplication } from './application/GameApplication.js';
import { SaveService } from './infrastructure/SaveService.js';
import { HUD } from './presentation/HUD.js';
import { InputManager } from './presentation/InputManager.js';
import { WorldScene } from './presentation/WorldScene.js';

const SIMULATION_STEP = 0.1;
const MAX_TICKS_PER_FRAME = 5;

function showFatal(message) {
  const container = document.getElementById('game-container');
  container.innerHTML = `<section class="fatal-card"><span>⚠️</span><h1>Oyun başlatılamadı</h1><p></p><small>Sayfayı yenileyip tekrar deneyebilirsin.</small></section>`;
  container.querySelector('p').textContent = message;
}

function showRecovery(saveService, error) {
  const modal = document.getElementById('recovery-modal');
  modal.classList.remove('hidden');
  document.getElementById('recovery-message').textContent = error.message;
  document.getElementById('btn-recovery-reset').addEventListener('click', () => {
    if (!window.confirm('Kayıt ve yedekleri silip yeni oyun başlatmak istiyor musun?')) return;
    try {
      saveService.clear();
      window.location.reload();
    } catch (clearError) {
      document.getElementById('recovery-message').textContent = `${error.message} ${clearError.message}`;
    }
  }, { once: true });
}

function boot() {
  let saveService;
  let app;
  try {
    saveService = new SaveService();
    app = new GameApplication(saveService);
  } catch (error) {
    if (saveService && error.name === 'SaveRecoveryError') showRecovery(saveService, error);
    else showFatal(error.message);
    return;
  }

  let world;
  try {
    world = new WorldScene();
  } catch (error) {
    showFatal(`3B sahne oluşturulamadı. ${error.message}`);
    return;
  }
  world.setObstacles(app);

  const pauseReasons = new Set();
  let input;
  const setPaused = () => {
    const paused = pauseReasons.size > 0;
    app.setPaused(paused);
    input?.setEnabled(!paused);
  };
  const hud = new HUD(app, null, (open) => {
    if (open) pauseReasons.add('modal');
    else {
      pauseReasons.delete('modal');
      pauseReasons.delete('resume-required');
    }
    setPaused();
  });
  input = new InputManager(world.getCanvas(), world, app, () => document.getElementById('btn-interact').click());
  const layoutButton = document.getElementById('btn-layout');
  const layoutHelp = document.getElementById('layout-help');
  const layoutHelpText = document.getElementById('layout-help-text');
  const rotateButton = document.getElementById('btn-rotate-layout');
  input.onLayoutMessage = (message) => {
    if (layoutHelpText) layoutHelpText.textContent = message;
    else layoutHelp.textContent = message;
  };
  input.onSelectionChange = (selected) => {
    if (rotateButton) rotateButton.classList.toggle('hidden', !selected);
  };
  rotateButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    input.rotateCurrentSelection();
  });
  layoutButton.addEventListener('click', () => {
    const enabled = !input.layoutMode;
    input.setLayoutMode(enabled);
    layoutButton.setAttribute('aria-pressed', String(enabled));
    layoutHelp.classList.toggle('hidden', !enabled);
    if (layoutHelpText) layoutHelpText.textContent = 'Taşımak için bir yapıya dokun, sonra boş bir kareye dokun. Bitirmek için ▦ düğmesine bas.';
    else layoutHelp.textContent = 'Taşımak için bir yapıya dokun, sonra boş bir kareye dokun. Bitirmek için ▦ düğmesine bas.';
    if (rotateButton) rotateButton.classList.add('hidden');
  });
  if (app.recovered) hud.toast('Yedek kayıttan devam edildi.');
  if (app.getState().paused) {
    pauseReasons.add('resume-required');
    setPaused();
    hud.open('settings-modal');
    hud.toast('Oyun duraklatılmış olarak kaydedilmiş. Devam etmek için “Oyuna dön” düğmesine bas.');
  }

  app.setEventHandler((event) => {
    if (event.type === 'toast' || event.type === 'sale' || event.type === 'production' || event.type === 'tip-ready') {
      hud.showEvent(event);
      if (event.tone !== 'error') world.playEvent(event, app.getState());
    }
    if (event.type === 'save-error') {
      pauseReasons.add('save-error');
      setPaused();
      hud.toast(`Kayıt başarısız. Simülasyon duraklatıldı: ${event.message}`, 'error');
    }
    if (event.type === 'reset') {
      pauseReasons.delete('save-error');
      setPaused();
      hud.toast('Yeni oyun hazır.');
    }
  });

  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      pauseReasons.add('background');
      setPaused();
      try { app.checkpoint(); } catch (error) { hud.toast(`Kayıt başarısız: ${error.message}`, 'error'); }
      input.reset();
    } else if (hiddenAt) {
      hiddenAt = 0;
      pauseReasons.delete('background');
      pauseReasons.add('resume-required');
      setPaused();
      hud.open('settings-modal');
      hud.toast('Oyun duraklatıldı. Devam etmek için “Oyuna dön” düğmesine bas.');
    }
  });
  const checkpointOnExit = () => {
    try { app.checkpoint(); } catch (error) { /* the visible app reports save failures */ }
  };
  window.addEventListener('pagehide', checkpointOnExit);

  const canvas = world.getCanvas();
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    pauseReasons.add('webgl');
    setPaused();
    hud.toast('3B görüntü durakladı; ekran geri geldiğinde yeniden bağlanacak.', 'error');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    pauseReasons.delete('webgl');
    setPaused();
    hud.toast('3B görüntü yeniden bağlandı.');
  });

  let previousTime = performance.now();
  let simulationAccumulator = 0;
  let hudElapsed = 0;
  function frame(now) {
    const elapsed = Math.min((now - previousTime) / 1000, 0.1);
    previousTime = now;
    const paused = pauseReasons.size > 0;

    if (!paused) {
      const movement = input.getMovementVector();
      if (Math.hypot(movement.x, movement.z) > 0.02) {
        app.clearPlayerTarget();
        app.setPlayerMove(movement, elapsed);
      } else {
        app.updateTargetMove(elapsed);
      }
      simulationAccumulator = Math.min(0.5, simulationAccumulator + elapsed * app.getState().speedMultiplier);
      let ticks = 0;
      while (simulationAccumulator >= SIMULATION_STEP && ticks < MAX_TICKS_PER_FRAME) {
        app.tick();
        simulationAccumulator -= SIMULATION_STEP;
        ticks += 1;
        if (pauseReasons.size > 0) break;
      }
      if (ticks === MAX_TICKS_PER_FRAME && simulationAccumulator >= SIMULATION_STEP) simulationAccumulator = 0;
    }

    const state = app.getState();
    const upgrades = app.getAvailableUpgrades();
    try {
      if (!pauseReasons.has('render-error') && !pauseReasons.has('webgl')) world.render(state, upgrades);
    } catch (error) {
      pauseReasons.add('render-error');
      setPaused();
      hud.toast(`Sahne çizilemedi: ${error.message}`, 'error');
    }
    hudElapsed += elapsed;
    if (hudElapsed >= 0.12) {
      hudElapsed = 0;
      hud.render(state, app.getNearbyAction());
    }
    window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
}

if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();

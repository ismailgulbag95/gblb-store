import './style.css';
import { GameApplication } from './application/GameApplication.js';
import { SaveService } from './infrastructure/SaveService.js';
import { AdMobRewardedProvider, DevelopmentRewardedProvider, RewardedAdService } from './infrastructure/RewardedAdProvider.js';
import { HUD } from './presentation/HUD.js';
import { InputManager } from './presentation/InputManager.js';
import { WorldScene } from './presentation/WorldScene.js';
import { createSceneFreezeDiagnostics } from './diagnostics/SceneFreezeDiagnostics.js';
import { hydrateAssetIcons, preloadAssetAtlas } from './ui/AssetIcons.js';

const sceneFreezeDiagnostics = createSceneFreezeDiagnostics();
hydrateAssetIcons();

const SIMULATION_STEP = 0.1;
const MAX_TICKS_PER_FRAME = 5;
const MIN_LOADING_VISIBLE_MS = 850;
const loadingStartedAt = performance.now();
const loadingScreen = document.getElementById('loading-screen');
const loadingStatus = document.getElementById('loading-status');
const loadingCopy = {
  tr: {
    resources: 'Oyun kaynakları hazırlanıyor…',
    save: 'Çiftliğin kaydı yükleniyor…',
    scene: 'Pazar ve çiftlik sahnesi kuruluyor…',
    ready: 'Son hazırlıklar…',
  },
  en: {
    resources: 'Preparing game resources…',
    save: 'Loading your farm…',
    scene: 'Setting up your farm and market…',
    ready: 'Almost ready…',
  },
};
let loadingLanguage = 'tr';
let loadingDismissed = false;

function setLoadingLanguage(language) {
  loadingLanguage = language === 'en' ? 'en' : 'tr';
  document.documentElement.lang = loadingLanguage;
}

function setLoadingStatus(step) {
  if (loadingStatus) loadingStatus.textContent = loadingCopy[loadingLanguage][step];
}

function hideLoadingScreen() {
  if (loadingDismissed) return;
  loadingDismissed = true;
  document.getElementById('game-container')?.setAttribute('aria-busy', 'false');
  loadingScreen?.classList.add('is-hidden');
  loadingScreen?.setAttribute('aria-hidden', 'true');
}

function revealGameWhenReady() {
  const remaining = Math.max(0, MIN_LOADING_VISIBLE_MS - (performance.now() - loadingStartedAt));
  window.setTimeout(hideLoadingScreen, remaining);
}

function showFatal(message) {
  hideLoadingScreen();
  const container = document.getElementById('game-container');
  container.innerHTML = `<section class="fatal-card"><span data-asset-icon="warning" data-asset-size="54"></span><h1>Oyun başlatılamadı</h1><p></p><small>Sayfayı yenileyip tekrar deneyebilirsin.</small></section>`;
  hydrateAssetIcons(container);
  container.querySelector('p').textContent = message;
}

function showRecovery(saveService, error) {
  hideLoadingScreen();
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

function sceneDiagnosisSnapshot(app, world = null) {
  const state = app.getState();
  const renderer = world?.engine?.renderer;
  const rendererInfo = renderer?.info;
  const lastDraw = renderer?.__tohumdanSceneLastDraw;
  return {
    revision: state.revision,
    tick: state.tick,
    player: { x: state.player?.x, z: state.player?.z },
    balanceAtoms: state.economy?.balanceAtoms,
    completedUpgrades: [...(state.completedUpgrades ?? [])],
    availableUpgrades: [...(state.availableUpgrades ?? [])],
    unlocked: Object.keys(state.unlocked ?? {}).filter((key) => state.unlocked[key]),
    farms: Object.keys(state.farms ?? {}),
    machines: Object.keys(state.machines ?? {}),
    coop: state.coops?.coop ? {
      chickens: state.coops.coop.chickens,
      eggs: state.coops.coop.eggs,
      feed: state.coops.coop.feed,
    } : null,
    sceneCollections: world ? Object.fromEntries(
      ['farms', 'machines', 'shelves', 'customers', 'workers', 'tables', 'upgradeMarkers']
        .map((name) => [name, world[name]?.size ?? null]),
    ) : null,
    renderer: rendererInfo ? {
      calls: rendererInfo.render?.calls,
      triangles: rendererInfo.render?.triangles,
      geometries: rendererInfo.memory?.geometries,
      textures: rendererInfo.memory?.textures,
    } : null,
    lastDraw: lastDraw ? { ...lastDraw } : null,
  };
}

async function boot() {
  sceneFreezeDiagnostics?.record('boot:started');
  let saveService;
  let app;
  try {
    setLoadingStatus('resources');
    await preloadAssetAtlas();
    setLoadingStatus('save');
    saveService = new SaveService();
    const admobProvider = new AdMobRewardedProvider();
    const rewardedProvider = import.meta.env.DEV
      ? new DevelopmentRewardedProvider(admobProvider, true, 3_000)
      : admobProvider;
    app = new GameApplication(saveService, undefined, new RewardedAdService(rewardedProvider));
    setLoadingLanguage(app.getState().settings.language);
    sceneFreezeDiagnostics?.record('application:ready', sceneDiagnosisSnapshot(app));
  } catch (error) {
    sceneFreezeDiagnostics?.fail('application:init', error);
    if (saveService && error.name === 'SaveRecoveryError') showRecovery(saveService, error);
    else showFatal(error.message);
    return;
  }

  let world;
  try {
    setLoadingStatus('scene');
    world = new WorldScene();
    sceneFreezeDiagnostics?.record('scene:ready', sceneDiagnosisSnapshot(app, world));
  } catch (error) {
    sceneFreezeDiagnostics?.fail('scene:init', error, sceneDiagnosisSnapshot(app));
    showFatal(`3B sahne oluşturulamadı. ${error.message}`);
    return;
  }
  world.setObstacles(app);

  const pauseReasons = new Set();
  let input;
  let hud;
  const showPendingBonusOffer = () => queueMicrotask(() => {
    if (!hud || pauseReasons.size || document.hidden || app.getState().ads.pending) return;
    const offer = app.getPendingBonusOffer();
    if (offer && app.canOfferRewardedAd('bonus-offer', {
      offerId: offer.id,
      bonusType: offer.type,
      characterId: offer.characterId,
    })) hud.openBonusOffer(offer);
  });
  const setPaused = () => {
    const paused = pauseReasons.size > 0;
    app.setPaused(paused);
    input?.setEnabled(!paused);
  };
  hud = new HUD(app, null, (open) => {
    if (open) pauseReasons.add('modal');
    else {
      pauseReasons.delete('modal');
      pauseReasons.delete('resume-required');
    }
    setPaused();
    if (!open) showPendingBonusOffer();
  });
  world.onVisualError = (visualId, error) => {
    sceneFreezeDiagnostics?.fail('world.visual-build', error, {
      visualId,
      state: sceneDiagnosisSnapshot(app, world),
    });
    hud.toast(`3B yapı yüklenemedi (${visualId}): ${error.message}`, 'error');
  };
  input = new InputManager(world.getCanvas(), world, app, () => document.getElementById('btn-interact').click());
  const layoutButton = document.getElementById('btn-layout');
  const layoutHelp = document.getElementById('layout-help');
  const layoutHelpText = document.getElementById('layout-help-text');
  const rotateButton = document.getElementById('btn-rotate-layout');
  const cancelButton = document.getElementById('btn-cancel-layout');
  input.onLayoutMessage = (message) => {
    if (layoutHelpText) layoutHelpText.textContent = message;
    else if (layoutHelp) layoutHelp.textContent = message;
  };
  input.onSelectionChange = (selected) => {
    if (rotateButton) rotateButton.classList.toggle('hidden', !selected || selected.startsWith('hanging-sign:'));
    if (cancelButton) cancelButton.classList.toggle('hidden', !selected);
  };
  rotateButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    input.rotateCurrentSelection();
  });
  cancelButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    input.cancelCurrentSelection();
  });
  layoutButton?.addEventListener('click', () => {
    const enabled = !input.layoutMode;
    input.setLayoutMode(enabled);
    layoutButton.setAttribute('aria-pressed', String(enabled));
    layoutHelp?.classList.toggle('hidden', !enabled);
    const initialMsg = 'Taşımak istediğin yapıya veya asılı tabelaya dokun, ardından yeni konumu seç. Bitirmek için düzenle düğmesine bas.';
    if (layoutHelpText) layoutHelpText.textContent = initialMsg;
    else if (layoutHelp) layoutHelp.textContent = initialMsg;
    if (rotateButton) rotateButton.classList.add('hidden');
    if (cancelButton) cancelButton.classList.add('hidden');
  });
  if (app.recovered) hud.toast('Yedek kayıttan devam edildi.');
  if (app.getState().paused) {
    pauseReasons.add('resume-required');
    setPaused();
    hud.open('settings-modal');
    hud.toast('Oyun duraklatılmış olarak kaydedilmiş. Devam etmek için “Oyuna dön” düğmesine bas.');
  }

  app.setEventHandler((event) => {
    if (event.type === 'production') return;
    if (event.type === 'procurement-open') { hud.openProcurement(); return; }
    if (event.type === 'bonus-offer-ready') {
      if (!pauseReasons.size && !document.hidden && !app.getState().ads.pending) hud.openBonusOffer(event.offer);
      return;
    }
    if (event.type === 'ad-start') {
      pauseReasons.add('rewarded-ad');
      setPaused();
    }
    if (event.type === 'ad-end') {
      pauseReasons.delete('rewarded-ad');
      setPaused();
    }
    if (event.type === 'toast' || event.type === 'sale'
      || event.type === 'tip-ready' || event.type === 'payroll') {
      hud.showEvent(event);
      if (event.type !== 'payroll' && event.tone !== 'error') world.playEvent(event, app.getState());
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
  if (!app.getState().paused && !app.getState().ads.pending) showPendingBonusOffer();

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
    sceneFreezeDiagnostics?.record('webgl:context-lost', sceneDiagnosisSnapshot(app, world));
    pauseReasons.add('webgl');
    setPaused();
    hud.toast('3B görüntü durakladı; ekran geri geldiğinde yeniden bağlanacak.', 'error');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    sceneFreezeDiagnostics?.record('webgl:context-restored', sceneDiagnosisSnapshot(app, world));
    pauseReasons.delete('webgl');
    setPaused();
    hud.toast('3B görüntü yeniden bağlandı.');
  });

  let previousTime = performance.now();
  let simulationAccumulator = 0;
  let hudElapsed = 0;
  let autoPickupElapsed = 0;
  let firstFrameRendered = false;
  let insideTerminal = false;
  let pendingUpgradeRender = null;
  let diagnosisWatchUntil = 0;
  let lastSlowFrameRecordedAt = 0;
  let nextWorldRenderAt = 0;
  let lastWorldRenderFailure = null;
  function frame(now) {
    const frameStartedAt = performance.now();
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
      autoPickupElapsed += elapsed;
      if (autoPickupElapsed >= 0.15) {
        autoPickupElapsed = 0;
        const autoResult = app.tryAutoPickup();
        if (autoResult) {
          hud.feedback();
          hud.render(app.getState(), app.getNearbyAction(), true);
        }
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
      const nearbyUpgradeAction = app.getNearbyAction();
      const upgradePurchaseWillComplete = nearbyUpgradeAction?.kind === 'upgrade'
        && nearbyUpgradeAction.paymentSecondsRemaining <= elapsed
        && !nearbyUpgradeAction.insufficientFunds
        && !nearbyUpgradeAction.rearmRequired
        && !input.layoutMode;
      if (upgradePurchaseWillComplete) {
        sceneFreezeDiagnostics?.begin('unlock-flow', {
          phase: 'purchase',
          upgradeId: nearbyUpgradeAction.id,
          title: nearbyUpgradeAction.title,
          before: sceneDiagnosisSnapshot(app, world),
        });
      }
      const upgradePurchase = app.advanceUpgradeMarkerPurchase(nearbyUpgradeAction, elapsed, !input.layoutMode);
      if (upgradePurchase?.completed) {
        const purchaseDetails = {
          upgradeId: upgradePurchase.id,
          ok: Boolean(upgradePurchase.result?.ok),
          reason: upgradePurchase.result?.reason ?? null,
          after: sceneDiagnosisSnapshot(app, world),
        };
        if (upgradePurchaseWillComplete && !upgradePurchase.result?.ok) {
          sceneFreezeDiagnostics?.finish('unlock-flow', { phase: 'purchase-failed', ...purchaseDetails });
        }
        if (upgradePurchase.result?.ok) {
          sceneFreezeDiagnostics?.record('unlock:completed', purchaseDetails);
          pendingUpgradeRender = upgradePurchase.id;
          diagnosisWatchUntil = performance.now() + 5_000;
        }
      }
      if (upgradePurchase?.completed && upgradePurchase.result?.ok) hud.feedback();
      const pendingBonusOffer = app.getPendingBonusOffer();
      if (pendingBonusOffer && !input.layoutMode
        && app.canOfferRewardedAd('bonus-offer', {
          offerId: pendingBonusOffer.id,
          bonusType: pendingBonusOffer.type,
          characterId: pendingBonusOffer.characterId,
        })) {
        hud.openBonusOffer(pendingBonusOffer);
      } else {
        app.advanceBonusOfferClock(elapsed * 1000, !input.layoutMode && pauseReasons.size === 0);
      }
    }

    const state = app.getState();
    const nearbyAction = app.getNearbyAction();
    const nearTerminal = nearbyAction?.kind === 'office' && nearbyAction.distance <= 1.1;
    if (nearTerminal && !insideTerminal && pauseReasons.size === 0 && !input.layoutMode) app.openProcurement();
    insideTerminal = nearTerminal;
    const upgrades = app.getAvailableUpgrades();
    try {
      if (!pauseReasons.has('webgl') && now >= nextWorldRenderAt) {
        if (pendingUpgradeRender) {
          sceneFreezeDiagnostics?.record('unlock-flow:render-start', {
            upgradeId: pendingUpgradeRender,
            state: sceneDiagnosisSnapshot(app, world),
          });
        }
        world.render(state, upgrades, nearbyAction);
        if (pauseReasons.delete('render-error')) {
          setPaused();
          nextWorldRenderAt = 0;
          lastWorldRenderFailure = null;
          sceneFreezeDiagnostics?.record('world.render:recovered', sceneDiagnosisSnapshot(app, world));
        }
        if (pendingUpgradeRender) {
          sceneFreezeDiagnostics?.finish('unlock-flow', {
            phase: 'render-complete',
            upgradeId: pendingUpgradeRender,
            state: sceneDiagnosisSnapshot(app, world),
          });
          pendingUpgradeRender = null;
        }
      }
    } catch (error) {
      const signature = `${error?.name ?? 'Error'}: ${error?.message ?? String(error)}`;
      const firstFailure = !pauseReasons.has('render-error') || signature !== lastWorldRenderFailure;
      const isMissingThreeUniform = error instanceof TypeError
        && error.message.includes("reading 'value'")
        && error.stack?.includes('refreshUniformsCommon');
      const drawTrace = world.engine.renderer.__tohumdanSceneLastDraw;
      const failedObject = isMissingThreeUniform && drawTrace?.objectUuid
        ? world.scene.getObjectByProperty('uuid', drawTrace.objectUuid)
        : null;

      if (failedObject) {
        failedObject.visible = false;
        sceneFreezeDiagnostics?.fail('world.render', error, {
          upgradeId: pendingUpgradeRender,
          state: sceneDiagnosisSnapshot(app, world),
          isolatedObject: failedObject.name || failedObject.type,
        });
        sceneFreezeDiagnostics?.record('world.render:object-isolated', {
          drawTrace: { ...drawTrace },
          objectName: failedObject.name || failedObject.type,
        });
        if (firstFailure) hud.toast('Çizilemeyen bir 3B nesne geçici olarak gizlendi; sahne yeniden deneniyor.', 'error');
      } else if (firstFailure) {
        sceneFreezeDiagnostics?.fail('world.render', error, {
          upgradeId: pendingUpgradeRender,
          state: sceneDiagnosisSnapshot(app, world),
          drawTrace: drawTrace ? { ...drawTrace } : null,
        });
        hud.toast(`Sahne çizilemedi: ${error.message}`, 'error');
      }
      lastWorldRenderFailure = signature;
      nextWorldRenderAt = now + 250;
      pauseReasons.add('render-error');
      setPaused();
    }
    hudElapsed += elapsed;
    if (hudElapsed >= 0.12) {
      hudElapsed = 0;
      hud.render(state, nearbyAction);
    }
    const frameDuration = performance.now() - frameStartedAt;
    if (sceneFreezeDiagnostics && performance.now() < diagnosisWatchUntil
      && frameDuration > 100 && now - lastSlowFrameRecordedAt >= 1_000) {
      lastSlowFrameRecordedAt = now;
      sceneFreezeDiagnostics.record('frame:slow-after-unlock', {
        durationMs: Math.round(frameDuration),
        state: sceneDiagnosisSnapshot(app, world),
      });
    }
    if (!firstFrameRendered) {
      firstFrameRendered = true;
      revealGameWhenReady();
    }
    window.requestAnimationFrame(frame);
  }
  setLoadingStatus('ready');
  window.requestAnimationFrame(frame);
}

if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();

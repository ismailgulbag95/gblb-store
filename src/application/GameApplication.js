import { AD_ONLY_UPGRADE_IDS, FARM_AD_UPGRADE_IDS, IMPORTED_SHELVES, ITEMS, MONEY_ATOMS, RECIPES, SHELVES, STAFF, STAFF_HIRES, STATIONS, UPGRADES, getStaffCount, staffDailySalaryAtoms } from '../domain/catalog.js';
import { EconomyLedger } from '../domain/ledger.js';
import { canTransfer, makeLocation, quantityAt, transferStock } from '../domain/inventory.js';
import { createInitialState, hydrateState } from '../domain/state.js';
import { advanceSimulation } from '../domain/simulation.js';
import { gameDayNumber } from '../domain/dayCycle.js';
import { createFarmState, removeFarmReady, syncFarmHarvest } from '../domain/farm.js';
import { ZONES, canPlaceDecoration, canPlaceHangingSign, canPlaceStation, getAllStationIds, getDecorationDimensions, getDecorationZone, getMarketCollisionBoxes, getShelfLocations, getStationDimensions, isStationUnlocked, nextShelfStagingPosition, registerCashierPosition, stationPosition, syncCatalogLayout } from '../domain/layout.js';
import { DECORATIONS } from '../domain/decorCatalog.js';
import { decorationPrice, nextOrder } from '../domain/orders.js';
import { machineProductionSeconds, machineSpeedMultiplier, machineUpgradeCost, percentGain, staffSpeedMultiplier, staffUpgradeCost } from '../domain/progression.js';
import { PLAYER_CHARACTERS, PLAYER_CHARACTER_IDS } from '../domain/characters.js';
import { STAFF_FACILITIES, STAFF_LAND_PRICE } from '../domain/catalog.js';
import { generateStaffCandidates, normalizeWorkerWelfare } from '../domain/staff.js';
import { placeWholesaleOrder, configureProcurementAutomation } from '../domain/procurement.js';

const LOGISTICS_KINDS = ['office', 'dock', 'warehouse'];
const UPGRADE_MARKER_PURCHASE_SECONDS = 3;
const ADDITIONAL_REGISTER_POSITIONS = Object.freeze([
  Object.freeze({ x: 1.25, z: -5.75 }),
  Object.freeze({ x: 9.25, z: 5.75 }),
  Object.freeze({ x: 1.25, z: 5.75 }),
  Object.freeze({ x: 9.25, z: -5.75 }),
]);

function clone(value) {
  return structuredClone(value);
}

function availablePlayerItems(state) {
  const playerStock = state.stock.player;
  return Object.entries(playerStock.items).reduce((total, [item, count]) =>
    total + Math.max(0, count - (playerStock.reserved?.[item] ?? 0)), 0);
}

function carriedPlayerItems(state) {
  return Object.values(state.stock.player.items).reduce((total, count) => total + count, 0);
}

const UPGRADE_MESSAGES = {
  tomatoFarm2: 'İkinci domates tarlası açıldı. Hasat kapasiten arttı.',
  cornFarm2: 'İkinci mısır tarlası açıldı. Hasat kapasiten arttı.',
  wheatFarm2: 'İkinci buğday tarlası açıldı. Hasat kapasiten arttı.',
  cashier: 'Kasiyer işe alındı. Ödemeler daha hızlı işleniyor.',
  paste: 'Salça kazanı ve yeni reyon açıldı.',
  harvester: 'Hasat işçisi önce rafları dolduruyor, ardından üretim makinelerini besliyor.',
  orange: 'Portakal bahçesi ve meyve sıkacağı açıldı.',
  factoryFeeder: 'Fabrika lojistikçisi üretim hatlarını besliyor.',
  orangeFarm2: 'İkinci portakal bahçesi açıldı.',
  corn: 'Mısır tarlası ve reyon açıldı.',
  popcorn: 'Popcorn makinesi ve reyon açıldı.',
  feed: 'Yem değirmeni kuruldu.',
  coop: 'Tavuk kümesi ve yumurta reyonu açıldı.',
  chicken2: 'İkinci tavuk kümese katıldı.',
  chicken3: 'Üçüncü tavuk kümese katıldı.',
  caretaker: 'Çiftlik bakıcısı işe alındı.',
  bakery: 'Buğday tarlası ve taş fırın açıldı.',
  flourMill: 'Un değirmeni ve un reyonu açıldı. Buğday için yeni bir kullanım alanı hazır.',
  orangeTartKitchen: 'Pastane tezgâhı ve tart reyonu açıldı.',
  restaurant: 'Gurme restoran ve masalar açıldı.',
  chefWaiter: 'Şef ve garson işe alındı. Restoran otomasyona geçti.',
};

const AD_LIMITS = Object.freeze({
  totalPerDay: 6,
  recentWindowMs: 15 * 60_000,
  recentLimit: 2,
  globalCooldownMs: 90_000,
  orderDoublePerDay: 3,
  supplierDropPerDay: 2,
  supplierCooldownMs: 15 * 60_000,
  declinedCooldownMs: 5 * 60_000,
});
const BONUS_FIRST_OFFER_MS = 3 * 60_000;
const BONUS_NEXT_OFFER_MIN_MS = 5 * 60_000;
const BONUS_NEXT_OFFER_MAX_MS = 8 * 60_000;
const BONUS_BAG_CAPACITY_MAX = 20;
const WALK_SPEED_BONUS_MULTIPLIER = 1.5;
const WALK_SPEED_BONUS_DURATION_MS = 5 * 60_000;

function localDayKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function addAdEvent(ads, type, placement, rewardId = null, rewardAmount = 0, timestamp = Date.now(), details = null) {
  ads.events.push({ type, placement, rewardId, rewardAmount, at: timestamp, ...(details ? { details: clone(details) } : {}) });
  if (ads.events.length > 500) ads.events.splice(0, ads.events.length - 500);
}

export class GameApplication {
  constructor(saveService, seed, rewardedAdService = null) {
    this.saveService = saveService;
    this.rewardedAdService = rewardedAdService;
    this.upgradeMarkerPurchase = null;
    this.upgradeMarkerPurchaseLockPosition = null;
    this.adSessionTicks = 0;
    this.adOfferSequence = 0;
    this.shownAdOffers = new Set();
    const loaded = saveService.load();
    this.state = loaded.state ?? createInitialState(seed);
    syncCatalogLayout(this.state);
    const legacyCharacter = saveService.storage?.getItem('player_character');
    const validCharacter = ['shopkeeper', 'cat', 'robot', 'panda', 'penguin'].includes(legacyCharacter);
    const migrateLegacyCharacter = validCharacter && this.state.player.character === 'shopkeeper' && legacyCharacter !== 'shopkeeper';
    if (migrateLegacyCharacter) {
      this.state.player.character = legacyCharacter;
      this.state.player.unlockedCharacters = [...new Set([...(this.state.player.unlockedCharacters ?? ['shopkeeper']), legacyCharacter])];
    }
    const previousAvailableUpgrades = this.state.availableUpgrades.join(',');
    this.#refreshUpgrades(this.state);
    const needsUnlockRefresh = previousAvailableUpgrades !== this.state.availableUpgrades.join(',');
    const cashierPosition = (worker) => {
      const register = stationPosition(this.state, worker.registerId ?? 'register') ?? STATIONS.register;
      return registerCashierPosition(register);
    };
    const movedCashier = this.state.workers.some((worker) => {
      if (worker.type !== 'cashier' || worker.break) return false;
      const position = cashierPosition(worker);
      return worker.x !== position.x || worker.z !== position.z || worker.facing !== position.facing;
    });
    if (movedCashier) {
      for (const worker of this.state.workers) {
        if (worker.type === 'cashier' && !worker.break) Object.assign(worker, cashierPosition(worker));
      }
    }
    this.recovered = loaded.recovered;
    this.onEvent = () => {};
    this.lastDurableTick = this.state.tick;
    if (!loaded.state) this.#persist('new-game');
    else if (loaded.migrated || migrateLegacyCharacter || needsUnlockRefresh || movedCashier) {
      this.#persist(`migration:${this.state.tick}:${legacyCharacter ?? 'none'}:${this.state.availableUpgrades.join(',')}`);
    }
    if (this.state.ads.pending) void this.#reconcilePendingReward();
    if (loaded.recovered) this.onEvent({ type: 'toast', message: 'Yedek kayıttan devam edildi.' });
  }

  setEventHandler(handler) {
    this.onEvent = handler;
  }

  getState() {
    return this.state;
  }

  getBalance() {
    return this.state.economy.balanceAtoms / 10_000;
  }

  getPendingBonusOffer() {
    return this.state.bonusOffers.currentOffer ? clone(this.state.bonusOffers.currentOffer) : null;
  }

  getWalkSpeedMultiplier(now = Date.now()) {
    return this.state.bonusOffers.walkSpeedExpiresAt > now ? WALK_SPEED_BONUS_MULTIPLIER : 1;
  }

  getWalkSpeedBonusRemainingMs(now = Date.now()) {
    return Math.max(0, this.state.bonusOffers.walkSpeedExpiresAt - now);
  }

  advanceBonusOfferClock(deltaMs, eligible = true) {
    if (!Number.isFinite(deltaMs) || deltaMs <= 0 || !eligible || this.state.paused
      || globalThis.document?.hidden || this.state.ads.pending) return null;
    const offers = this.state.bonusOffers;
    offers.activePlayMs += deltaMs;
    if (offers.currentOffer || offers.activePlayMs < offers.nextOfferAtActiveMs
      || !this.canOfferRewardedAd('bonus-offer', { scheduled: true })) return null;

    const availableTypes = [{ type: 'walk-speed' }];
    if (this.state.player.capacity < BONUS_BAG_CAPACITY_MAX) availableTypes.push({ type: 'bag-capacity' });
    const unlockedCharacters = new Set(this.state.player.unlockedCharacters ?? ['shopkeeper']);
    for (const characterId of PLAYER_CHARACTER_IDS) {
      if (characterId !== 'shopkeeper' && !unlockedCharacters.has(characterId)) {
        availableTypes.push({ type: 'character-unlock', characterId });
      }
    }
    const selectedOffer = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const result = this.#command(`bonus-offer:${offers.nextOfferId}`, (draft) => {
      if (draft.bonusOffers.currentOffer || draft.ads.pending) return { ok: false, reason: 'offer-unavailable' };
      const offer = { id: `bonus-${draft.bonusOffers.nextOfferId}`, ...selectedOffer };
      draft.bonusOffers.nextOfferId += 1;
      draft.bonusOffers.currentOffer = offer;
      const interval = BONUS_NEXT_OFFER_MIN_MS
        + Math.floor(Math.random() * (BONUS_NEXT_OFFER_MAX_MS - BONUS_NEXT_OFFER_MIN_MS + 1));
      draft.bonusOffers.nextOfferAtActiveMs = draft.bonusOffers.activePlayMs + interval;
      addAdEvent(draft.ads, 'offer_shown', 'bonus-offer', null, 0, Date.now(), {
        bonusId: offer.id,
        bonusType: offer.type,
        ...(offer.characterId ? { characterId: offer.characterId } : {}),
      });
      return { ok: true, offer };
    });
    if (!result.ok) return null;
    this.onEvent({ type: 'bonus-offer-ready', offer: clone(result.offer) });
    return result.offer;
  }

  dismissBonusOffer(offerId) {
    return this.#command(`bonus-offer-dismissed:${offerId}`, (draft) => {
      const offer = draft.bonusOffers.currentOffer;
      if (!offer || offer.id !== offerId || draft.ads.pending?.placement === 'bonus-offer') {
        return { ok: false, reason: 'offer-unavailable' };
      }
      draft.bonusOffers.currentOffer = null;
      draft.ads.dismissedUntil['bonus-offer'] = Date.now() + AD_LIMITS.declinedCooldownMs;
      addAdEvent(draft.ads, 'offer_declined', 'bonus-offer', null, 0, Date.now(), {
        bonusId: offer.id,
        bonusType: offer.type,
        ...(offer.characterId ? { characterId: offer.characterId } : {}),
      });
      return { ok: true };
    });
  }

  isRewardedAdReady(placement) {
    return this.rewardedAdService?.isReady(placement) === true;
  }

  isRewardedAdSimulated() {
    return this.rewardedAdService?.isSimulated?.() === true;
  }

  canOfferRewardedAd(placement, payload = {}) {
    const state = this.state;
    const simulated = this.isRewardedAdSimulated();
    const bypassLimits = simulated && placement !== 'bonus-offer';
    if (!this.rewardedAdService?.isReady(placement) || globalThis.document?.hidden || state.ads.pending
      || (placement === 'bonus-offer' && state.bonusOffers.activePlayMs < BONUS_FIRST_OFFER_MS)
      || (!bypassLimits && placement !== 'bonus-offer' && (state.ordersCompleted < 1 || this.adSessionTicks < 1_800))) return false;
    const now = Date.now();
    const ads = state.ads;
    const today = ads.dailyCounts[localDayKey(now)] ?? { completed: 0, placements: {} };
    const recent = ads.recentCompletions.filter((at) => now - at < AD_LIMITS.recentWindowMs);
    if (!bypassLimits && (today.completed >= AD_LIMITS.totalPerDay || recent.length >= AD_LIMITS.recentLimit
      || (ads.lastStartedAt && now - ads.lastStartedAt < AD_LIMITS.globalCooldownMs)
      || (ads.dismissedUntil[placement] ?? 0) > now)) return false;
    if (placement === 'bonus-offer') {
      const offer = state.bonusOffers.currentOffer;
      if (payload.scheduled) return Boolean(!offer && state.bonusOffers.activePlayMs >= state.bonusOffers.nextOfferAtActiveMs);
      if (!offer || offer.id !== payload.offerId || offer.type !== payload.bonusType
        || (offer.type === 'character-unlock' && offer.characterId !== payload.characterId)) return false;
      if (offer.type === 'bag-capacity') return state.player.capacity < BONUS_BAG_CAPACITY_MAX;
      if (offer.type === 'character-unlock') {
        return PLAYER_CHARACTER_IDS.includes(offer.characterId)
          && !state.player.unlockedCharacters.includes(offer.characterId);
      }
      return offer.type === 'walk-speed';
    }
    if (placement === 'character-unlock') {
      return PLAYER_CHARACTER_IDS.includes(payload.characterId)
        && payload.characterId !== 'shopkeeper'
        && !state.player.unlockedCharacters.includes(payload.characterId);
    }
    if (placement === 'order-double') {
      const orderReward = state.lastOrderReward;
      return Boolean(orderReward && !orderReward.claimed && orderReward.id === payload.orderId
        && (today.placements?.[placement] ?? 0) < AD_LIMITS.orderDoublePerDay);
    }
    if (placement === 'supplier-drop') {
      const machine = state.machines[payload.machineId];
      const station = STATIONS[payload.machineId];
      const recipe = RECIPES[station?.recipe ?? machine?.recipe];
      const lastPlacementAt = ads.lastPlacementStarts[placement] ?? 0;
      return Boolean(machine && recipe && machine.blocked === 'missing-input'
        && Number.isSafeInteger(machine.blockedTicks) && machine.blockedTicks >= 200
        && (simulated || (now - lastPlacementAt >= AD_LIMITS.supplierCooldownMs
          && (today.placements?.[placement] ?? 0) < AD_LIMITS.supplierDropPerDay))
        && this.#supplierDropItems(state, payload.machineId, recipe));
    }
    if (placement === 'farm-unlock') {
      const upgrade = UPGRADES.find((entry) => entry.id === payload.upgradeId);
      const baseId = payload.upgradeId?.replace(/2$/, '');
      return Boolean(upgrade && AD_ONLY_UPGRADE_IDS.includes(upgrade.id)
        && state.availableUpgrades.includes(upgrade.id) && !state.completedUpgrades.includes(upgrade.id)
        && state.farms[baseId] && !state.farms[payload.upgradeId]);
    }
    if (placement === 'staff-hire') {
      const hire = STAFF_HIRES.find((entry) => entry.upgradeId === payload.role);
      const canHireFirstByAd = payload.role !== 'cashier' && state.availableUpgrades.includes(payload.role);
      const canHireExtraByAd = state.completedUpgrades.includes(payload.role) && getStaffCount(state, payload.role) > 0
        && (payload.role !== 'cashier' || ADDITIONAL_REGISTER_POSITIONS.some(({ x, z }) =>
          canPlaceStation(state, 'register_reward_preview', x, z, 0)));
      return Boolean(hire && (canHireFirstByAd || canHireExtraByAd));
    }
    return false;
  }

  markRewardedOfferShown(placement, payload = {}) {
    if (!this.canOfferRewardedAd(placement, payload)) return false;
    const key = `${placement}:${payload.orderId ?? payload.upgradeId ?? payload.role ?? payload.machineId ?? payload.characterId ?? ''}:${Math.floor(Date.now() / AD_LIMITS.declinedCooldownMs)}`;
    if (this.shownAdOffers.has(key) || this.state.ads.shownOfferKeys.includes(key)) return true;
    this.shownAdOffers.add(key);
    return this.#command(`ad-offer-shown:${key}`, (draft) => {
      draft.ads.shownOfferKeys.push(key);
      if (draft.ads.shownOfferKeys.length > 128) draft.ads.shownOfferKeys.splice(0, draft.ads.shownOfferKeys.length - 128);
      addAdEvent(draft.ads, 'offer_shown', placement);
      return { ok: true };
    }).ok;
  }

  declineRewardedOffer(placement, payload = {}) {
    const key = `${placement}:${payload.orderId ?? payload.upgradeId ?? payload.role ?? payload.machineId ?? ''}:${Math.floor(Date.now() / AD_LIMITS.declinedCooldownMs)}`;
    return this.#command(`ad-decline:${key}:${this.state.revision + 1}`, (draft) => {
      draft.ads.dismissedUntil[placement] = Date.now() + AD_LIMITS.declinedCooldownMs;
      addAdEvent(draft.ads, 'offer_declined', placement);
      return { ok: true };
    });
  }

  async watchRewardedAd(placement, payload = {}) {
    if (!this.canOfferRewardedAd(placement, payload)) {
      return { ok: false, reason: this.rewardedAdService?.isReady(placement) ? 'offer-unavailable' : 'ad-not-ready' };
    }
    const sequence = ++this.adOfferSequence;
    const rewardId = globalThis.crypto?.randomUUID?.() ?? `reward-${Date.now()}-${this.state.revision}-${sequence}`;
    const pending = { rewardId, placement, payload: clone(payload), createdAt: Date.now(), started: false };
    const accepted = this.#command(`ad-accepted:${rewardId}`, (draft) => {
      if (draft.ads.pending) return { ok: false, reason: 'ad-already-active' };
      draft.ads.pending = pending;
      addAdEvent(draft.ads, 'offer_accepted', placement, rewardId);
      return { ok: true };
    });
    if (!accepted.ok) return accepted;

    let outcome = null;
    const result = await this.rewardedAdService.show(placement, {
      onLoaded: () => this.#recordAdLifecycle(rewardId, 'ad_loaded'),
      onStarted: () => this.#startRewardedAd(pending),
      onCompleted: (receipt) => { outcome = this.#completeRewardedAd(pending, receipt); },
      onFailed: (error) => this.#failRewardedAd(pending, error),
      onClosed: () => this.#failRewardedAd(pending, new Error('Ad closed before reward completion.')),
    }, { rewardId, payload: clone(payload) });
    return result && outcome?.ok && outcome.granted
      ? { ok: true, rewardId, rewardAmount: outcome.rewardAmount ?? 0, message: outcome.message ?? null }
      : { ok: false, reason: result ? 'reward-unavailable' : 'ad-not-completed' };
  }

  async #reconcilePendingReward() {
    const pending = clone(this.state.ads.pending);
    if (!pending) return;
    this.state.paused = true;
    let receipts = [];
    try { receipts = await this.rewardedAdService?.getCompletedRewardReceipts?.() ?? []; } catch { /* unresolved means no reward */ }
    const receipt = receipts.find((entry) => entry.rewardId === pending.rewardId && entry.rewarded === true);
    if (receipt) this.#completeRewardedAd(pending, receipt);
    else this.#failRewardedAd(pending, new Error('Interrupted rewarded ad was not completed.'));
  }

  #recordAdLifecycle(rewardId, eventType) {
    const pending = this.state.ads.pending;
    if (!pending || pending.rewardId !== rewardId) return;
    this.#command(`ad-event:${eventType}:${rewardId}`, (draft) => {
      addAdEvent(draft.ads, eventType, pending.placement, rewardId);
      return { ok: true };
    });
  }

  #startRewardedAd(pending) {
    if (this.state.ads.pending?.rewardId !== pending.rewardId) return;
    const now = Date.now();
    this.#command(`ad-start:${pending.rewardId}`, (draft) => {
      if (draft.ads.pending?.rewardId !== pending.rewardId) return { ok: false, reason: 'stale-ad' };
      draft.ads.pending.started = true;
      draft.ads.lastStartedAt = now;
      draft.ads.lastPlacementStarts[pending.placement] = now;
      addAdEvent(draft.ads, 'ad_started', pending.placement, pending.rewardId, 0, now);
      return { ok: true };
    });
    this.onEvent({ type: 'ad-start' });
  }

  #failRewardedAd(pending, error) {
    if (this.state.ads.pending?.rewardId !== pending.rewardId) return;
    this.#command(`ad-failed:${pending.rewardId}`, (draft) => {
      if (draft.ads.pending?.rewardId !== pending.rewardId) return { ok: false, reason: 'stale-ad' };
      addAdEvent(draft.ads, 'ad_failed', pending.placement, pending.rewardId);
      if (pending.placement === 'bonus-offer'
        && draft.bonusOffers.currentOffer?.id === pending.payload.offerId) {
        draft.bonusOffers.currentOffer = null;
      }
      draft.ads.pending = null;
      return { ok: true };
    });
    this.onEvent({ type: 'ad-end' });
    if (error) this.onEvent({ type: 'ad-failed', message: error.message });
  }

  #completeRewardedAd(pending) {
    if (this.state.ads.completedAdIds.includes(pending.rewardId)) {
      const granted = this.state.ads.grantedRewardIds.includes(pending.rewardId);
      return { ok: granted, granted, duplicate: true };
    }
    const now = Date.now();
    let granted = false;
    let rewardAmount = 0;
    let rewardMessage = null;
    const result = this.#command(`ad-complete:${pending.rewardId}`, (draft) => {
      if (draft.ads.pending?.rewardId !== pending.rewardId) return { ok: false, reason: 'stale-ad' };
      draft.ads.completedAdIds.push(pending.rewardId);
      if (draft.ads.completedAdIds.length > 256) draft.ads.completedAdIds.splice(0, draft.ads.completedAdIds.length - 256);
      draft.ads.recentCompletions = draft.ads.recentCompletions.filter((at) => now - at < AD_LIMITS.recentWindowMs);
      draft.ads.recentCompletions.push(now);
      const day = localDayKey(now);
      draft.ads.dailyCounts[day] ??= { completed: 0, placements: {} };
      draft.ads.dailyCounts[day].completed += 1;
      draft.ads.dailyCounts[day].placements ??= {};
      draft.ads.dailyCounts[day].placements[pending.placement] = (draft.ads.dailyCounts[day].placements[pending.placement] ?? 0) + 1;
      addAdEvent(draft.ads, 'ad_completed', pending.placement, pending.rewardId, 0, now);
      const reward = this.#applyRewardedPlacement(draft, pending);
      granted = reward.ok;
      rewardAmount = reward.amount ?? 0;
      rewardMessage = reward.message ?? null;
      if (granted) {
        draft.ads.grantedRewardIds.push(pending.rewardId);
        if (draft.ads.grantedRewardIds.length > 256) draft.ads.grantedRewardIds.splice(0, draft.ads.grantedRewardIds.length - 256);
        addAdEvent(draft.ads, 'reward_granted', pending.placement, pending.rewardId, rewardAmount, now, reward.details);
      }
      draft.ads.pending = null;
      return { ok: true, granted };
    });
    if (result.ok) this.onEvent({ type: 'ad-end' });
    return result.ok && granted
      ? { ok: true, granted: true, rewardAmount, message: rewardMessage }
      : { ok: false, granted: false, reason: 'reward-no-longer-available' };
  }

  #applyRewardedPlacement(state, pending) {
    const { placement, payload } = pending;
    if (placement === 'order-double') {
      const order = state.lastOrderReward;
      if (!order || order.claimed || order.id !== payload.orderId) return { ok: false };
      new EconomyLedger(state.economy).credit(`order-ad-bonus:${pending.rewardId}`, order.reward, 'rewarded-ad:order-double');
      order.claimed = true;
      return { ok: true, amount: order.reward, details: { orderId: order.id }, message: `Sipariş reklam ödülü: +$${order.reward}.` };
    }
    if (placement === 'supplier-drop') {
      const station = STATIONS[payload.machineId];
      const machine = state.machines[payload.machineId];
      const recipe = RECIPES[station?.recipe ?? machine?.recipe];
      const missing = recipe && this.#supplierDropItems(state, payload.machineId, recipe);
      if (!missing || machine.blockedTicks < 200) return { ok: false };
      const input = state.stock[`machine:${payload.machineId}:input`];
      for (const [item, quantity] of Object.entries(missing)) input.items[item] = (input.items[item] ?? 0) + quantity;
      machine.blockedTicks = 0;
      machine.blockedSinceTick = null;
      return { ok: true, amount: 0, details: { machineId: payload.machineId, inputs: missing }, message: 'Bir tariflik girdi makineye teslim edildi.' };
    }
    if (placement === 'farm-unlock') {
      const id = payload.upgradeId;
      if (!state.availableUpgrades.includes(id) || state.completedUpgrades.includes(id) || state.farms[id]) return { ok: false };
      state.completedUpgrades.push(id);
      state.unlocked[id] = true;
      this.#applyUpgrade(state, id);
      state.quest = this.#questFor(state);
      return { ok: true, amount: 0, details: { upgradeId: id }, message: UPGRADE_MESSAGES[id] };
    }
    if (placement === 'staff-hire') {
      const role = payload.role;
      const hire = STAFF_HIRES.find((entry) => entry.upgradeId === role);
      if (!hire || (!state.availableUpgrades.includes(role) && !state.completedUpgrades.includes(role))
        || role === 'cashier' && !state.completedUpgrades.includes(role)) return { ok: false };
      if (!state.completedUpgrades.includes(role)) {
        state.completedUpgrades.push(role);
        state.unlocked[role] = true;
        this.#applyUpgrade(state, role);
      } else if (role === 'chefWaiter') {
        this.#hire(state, 'chefWaiter');
        this.#hire(state, 'waiter');
      } else if (role === 'cashier') {
        const registerId = this.#addCheckoutRegister(state);
        if (!registerId) return { ok: false };
        this.#hire(state, role, null, registerId);
      } else {
        this.#hire(state, role);
      }
      return { ok: true, amount: 0, details: { role }, message: role === 'cashier'
        ? 'Kasiyer reklamla kasaya atandı.'
        : `${STAFF[role]?.title ?? role} reklamla ekibe katıldı.` };
    }
    if (placement === 'character-unlock') {
      return this.#grantCharacterUnlock(state, payload.characterId);
    }
    if (placement === 'bonus-offer') {
      const offer = state.bonusOffers.currentOffer;
      if (!offer || offer.id !== payload.offerId || offer.type !== payload.bonusType
        || (offer.type === 'character-unlock' && offer.characterId !== payload.characterId)) return { ok: false };
      if (offer.type === 'walk-speed') {
        const now = Date.now();
        const expiresAt = Math.max(now, state.bonusOffers.walkSpeedExpiresAt) + WALK_SPEED_BONUS_DURATION_MS;
        state.bonusOffers.walkSpeedExpiresAt = expiresAt;
        state.bonusOffers.currentOffer = null;
        return {
          ok: true, amount: 0,
          details: { bonusId: offer.id, bonusType: offer.type, multiplier: WALK_SPEED_BONUS_MULTIPLIER, durationAddedMs: WALK_SPEED_BONUS_DURATION_MS, expiresAt },
          message: 'Yürüyüş hızın 5 dakika boyunca 1,5 katına çıktı.',
        };
      }
      if (offer.type === 'bag-capacity' && state.player.capacity < BONUS_BAG_CAPACITY_MAX) {
        state.player.capacity += 1;
        state.stock.player.capacity = state.player.capacity;
        state.bonusOffers.currentOffer = null;
        return {
          ok: true, amount: 0,
          details: { bonusId: offer.id, bonusType: offer.type, capacity: state.player.capacity },
          message: `Çanta kapasiten kalıcı olarak ${state.player.capacity} oldu.`,
        };
      }
      if (offer.type === 'character-unlock') {
        const reward = this.#grantCharacterUnlock(state, offer.characterId, offer.id);
        if (reward.ok) state.bonusOffers.currentOffer = null;
        return reward;
      }
    }
    return { ok: false };
  }

  #grantCharacterUnlock(state, characterId, bonusId = null) {
    if (!PLAYER_CHARACTER_IDS.includes(characterId) || characterId === 'shopkeeper'
      || state.player.unlockedCharacters.includes(characterId)) return { ok: false };
    state.player.unlockedCharacters.push(characterId);
    state.player.character = characterId;
    const name = PLAYER_CHARACTERS[characterId].label[state.settings.language] ?? PLAYER_CHARACTERS[characterId].label.tr;
    return {
      ok: true,
      amount: 0,
      details: { ...(bonusId ? { bonusId } : {}), bonusType: 'character-unlock', characterId },
      message: state.settings.language === 'en'
        ? `${name} is unlocked and ready to play.`
        : `${name} karakteri reklamla açıldı ve seçildi.`,
    };
  }

  #supplierDropItems(state, machineId, recipe) {
    const input = state.stock[`machine:${machineId}:input`];
    const output = state.stock[`machine:${machineId}:output`];
    if (!input || !output || output.capacity - Object.values(output.items).reduce((sum, value) => sum + value, 0)
      - (output.reservedCapacity ?? 0) < 1) return null;
    const incoming = {};
    for (const reservation of Object.values(state.reservations)) {
      if (reservation.to === `machine:${machineId}:input`) {
        incoming[reservation.item] = (incoming[reservation.item] ?? 0) + reservation.quantity;
      }
    }
    const missing = Object.fromEntries(Object.entries(recipe.inputs).map(([item, amount]) => [item,
      Math.max(0, amount - (input.items[item] ?? 0) - (incoming[item] ?? 0))]).filter(([, amount]) => amount > 0));
    const needed = Object.values(missing).reduce((sum, amount) => sum + amount, 0);
    const inputUsed = Object.values(input.items).reduce((sum, value) => sum + value, 0);
    if (!needed || needed > 12 || input.capacity - inputUsed - (input.reservedCapacity ?? 0) < needed) return null;
    return missing;
  }

  fulfillOrder() {
    const order = this.state.activeOrder;
    if (!order) return { ok: false, reason: 'no-order' };
    if (quantityAt(this.state.stock, 'player', order.item) - (this.state.stock.player.reserved?.[order.item] ?? 0) < order.quantity) return { ok: false, reason: 'order-stock' };
    return this.#command(`order:${this.state.ordersCompleted + 1}`, (draft) => {
      const current = draft.activeOrder;
      const moved = transferStock(draft, {
        transactionId: `order-stock:${draft.ordersCompleted + 1}`, from: 'player', to: 'order:delivery',
        item: current.item, quantity: current.quantity,
      });
      if (!moved.ok) return moved;
      delete draft.stock['order:delivery'].items[current.item];
      new EconomyLedger(draft.economy).credit(`order-reward:${draft.ordersCompleted + 1}`, current.reward, 'customer-order');
      draft.ordersCompleted += 1;
      draft.lastOrderReward = {
        id: `order:${draft.ordersCompleted}`,
        reward: current.reward,
        item: current.item,
        quantity: current.quantity,
        claimed: false,
      };
      if (draft.ordersCompleted % 3 === 0) draft.decorVouchers += 1;
      draft.activeOrder = nextOrder(draft);
      return { ok: true, message: `Sipariş teslim edildi: +$${current.reward}.` };
    });
  }

  moveStation(id, x, z) {
    if (LOGISTICS_KINDS.includes(STATIONS[id]?.kind)) return { ok: false, reason: 'fixed-station' };
    const snappedX = Math.round(x * 2) / 2;
    const snappedZ = Math.round(z * 2) / 2;
    if (!canPlaceStation(this.state, id, snappedX, snappedZ)) return { ok: false, reason: 'invalid-placement' };
    const result = this.#command(`layout:${id}:${this.state.revision + 1}`, (draft) => {
      const existing = draft.layout[id] ?? {};
      draft.layout[id] = { ...existing, x: snappedX, z: snappedZ };
      if (id === 'register' || draft.checkoutRegisters?.[id]) {
        const register = stationPosition(draft, id);
        const cashierPosition = registerCashierPosition(register);
        for (const worker of draft.workers) {
          if (worker.type === 'cashier' && (worker.registerId ?? 'register') === id && !worker.break) {
            Object.assign(worker, cashierPosition);
          }
        }
      }
      this.#stageNextPendingShelf(draft);
      const title = STATIONS[id]?.title ?? draft.customStations?.[id]?.title ?? 'Yapı';
      return { ok: true, message: `${title} taşındı.` };
    });
    if (result.ok) syncCatalogLayout(this.state);
    return result;
  }

  moveHangingSign(id, x, z) {
    const snappedX = Math.round(x * 2) / 2;
    const snappedZ = Math.round(z * 2) / 2;
    if (!canPlaceHangingSign(this.state, id, snappedX, snappedZ)) {
      return { ok: false, reason: 'invalid-placement' };
    }

    return this.#command(`hanging-sign-layout:${id}:${this.state.revision + 1}`, (draft) => {
      if (!draft.hangingSigns?.[id]) return { ok: false, reason: 'unknown-hanging-sign' };
      draft.hangingSigns[id] = { x: snappedX, z: snappedZ };
      return { ok: true, message: 'Asılı reyon tabelası taşındı.' };
    });
  }

  rotateSelected(id) {
    if (!id) return { ok: false, reason: 'nothing-selected' };
    if (LOGISTICS_KINDS.includes(STATIONS[id]?.kind)) return { ok: false, reason: 'fixed-station' };
    if (id.startsWith('decor:')) {
      const decorId = id.slice(6);
      return this.#command(`decoration-rotate:${decorId}:${this.state.revision + 1}`, (draft) => {
        const decor = draft.decorations.find((item) => item.id === decorId);
        if (!decor) return { ok: false, reason: 'unknown-decoration' };
        decor.rotation = ((decor.rotation ?? 0) + Math.PI / 2) % (Math.PI * 2);
        return { ok: true, rotation: decor.rotation, message: 'Dekorasyon döndürüldü.' };
      });
    }
    return this.#command(`layout-rotate:${id}:${this.state.revision + 1}`, (draft) => {
      const current = stationPosition(draft, id) ?? { x: STATIONS[id]?.x ?? 0, z: STATIONS[id]?.z ?? 0 };
      const nextRot = ((current.rotation ?? 0) + Math.PI / 2) % (Math.PI * 2);
      draft.layout[id] = { ...current, rotation: nextRot };
      if (id === 'register' || draft.checkoutRegisters?.[id]) {
        const register = stationPosition(draft, id);
        const cashierPosition = registerCashierPosition(register);
        for (const worker of draft.workers) {
          if (worker.type === 'cashier' && (worker.registerId ?? 'register') === id && !worker.break && !worker.waitingForSalary) {
            Object.assign(worker, cashierPosition);
          }
        }
      }
      return { ok: true, rotation: nextRot, message: `${STATIONS[id]?.title ?? 'Yapı'} döndürüldü.` };
    });
  }

  canPlaceDecoration(id, x, z) {
    return canPlaceDecoration(this.state, id, Math.round(x * 2) / 2, Math.round(z * 2) / 2);
  }

  moveDecoration(id, x, z) {
    const snappedX = Math.round(x * 2) / 2;
    const snappedZ = Math.round(z * 2) / 2;
    if (!canPlaceDecoration(this.state, id, snappedX, snappedZ)) return { ok: false, reason: 'invalid-placement' };
    return this.#command(`decoration-move:${id}:${this.state.revision + 1}`, (draft) => {
      const decoration = draft.decorations.find((entry) => entry.id === id);
      if (!decoration) return { ok: false, reason: 'unknown-decoration' };
      decoration.x = snappedX;
      decoration.z = snappedZ;
      this.#stageNextPendingShelf(draft);
      return { ok: true, message: 'Dekorasyon taşındı.' };
    });
  }

  buyDecoration(type) {
    const definition = DECORATIONS[type];
    if (!definition) return { ok: false, reason: 'unknown-decoration' };
    return this.#command(`decoration-buy:${type}:${this.state.revision + 1}`, (draft) => {
      const id = `decoration-${draft.nextEntityId++}`;
      const decoration = { id, type, x: 0, z: 0 };
      draft.decorations.push(decoration);
      const zone = ZONES[getDecorationZone(type)];
      const minX = Math.ceil((zone.minX + 0.5) * 2) / 2;
      const minZ = Math.ceil((zone.minZ + 0.5) * 2) / 2;
      const columns = Math.floor((zone.maxX - 0.5 - minX) * 2) + 1;
      const rows = Math.floor((zone.maxZ - 0.5 - minZ) * 2) + 1;
      let slot = null;
      for (let row = 0; row < rows && !slot; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = minX + column * 0.5;
          const z = minZ + row * 0.5;
          if (canPlaceDecoration(draft, id, x, z)) { slot = { x, z }; break; }
        }
      }
      if (!slot) { draft.decorations.pop(); return { ok: false, reason: 'no-decoration-space' }; }
      const price = decorationPrice(draft, definition.price);
      new EconomyLedger(draft.economy).debit(`decoration-purchase:${id}`, price, `decoration:${type}`);
      if (draft.decorVouchers > 0) draft.decorVouchers -= 1;
      Object.assign(decoration, slot);
      const language = this.state.settings.language;
      const destination = getDecorationZone(type) === 'farm'
        ? { tr: 'çiftliğe', en: 'to your farm' }
        : { tr: 'mağazana', en: 'to your market' };
      return {
        ok: true,
        message: language === 'en'
          ? `${definition.name.en} added ${destination.en}.`
          : `${definition.name.tr} ${destination.tr} eklendi.`,
        decorationId: id,
      };
    });
  }

  hireExtraStaff(role) {
    return this.watchRewardedAd('staff-hire', { role });
  }

  openStaffCandidates(role) {
    if (!STAFF_HIRES.some(hire => hire.upgradeId === role)
      || !this.state.availableUpgrades.includes(role) && !this.state.completedUpgrades.includes(role)) {
      return { ok: false, reason: 'locked' };
    }
    if (this.state.staffCandidates[role]?.length === 3) return { ok: true, candidates: clone(this.state.staffCandidates[role]) };
    const result = this.#command(`staff-candidates:${role}:${this.state.revision + 1}`, draft => ({ ok: true,
      candidates: generateStaffCandidates(draft, role) }));
    return result.ok ? { ...result, candidates: clone(result.candidates) } : result;
  }

  hireStaffCandidate(role, candidateId) {
    return this.#command(`staff-candidate:${candidateId}`, draft => {
      const hire = STAFF_HIRES.find(entry => entry.upgradeId === role);
      const candidate = draft.staffCandidates[role]?.find(entry => entry.id === candidateId);
      if (!hire || !candidate
        || (!draft.availableUpgrades.includes(role) && !draft.completedUpgrades.includes(role))) {
        return { ok: false, reason: 'invalid-candidate' };
      }
      if (draft.economy.balanceAtoms < candidate.hireCostAtoms) return { ok: false, reason: 'insufficient-funds' };
      new EconomyLedger(draft.economy).debit(`hire:${candidate.id}`, candidate.hireCostAtoms / MONEY_ATOMS, `staff-hire:${role}`);
      for (const type of hire.staffTypes) this.#hire(draft, type, candidate);
      if (!draft.completedUpgrades.includes(role)) draft.completedUpgrades.push(role);
      draft.unlocked[role] = true;
      delete draft.staffCandidates[role];
      return { ok: true, message: `${candidate.name} ekibe katıldı.` };
    });
  }

  clearStaffLand() {
    return this.#command('staff-land-clearing', draft => {
      if (draft.staffLandCleared) return { ok: false, reason: 'already-cleared' };
      if (draft.economy.balanceAtoms < STAFF_LAND_PRICE * MONEY_ATOMS) return { ok: false, reason: 'insufficient-funds' };
      new EconomyLedger(draft.economy).debit('staff-land-clearing', STAFF_LAND_PRICE, 'staff-land');
      draft.staffLandCleared = true;
      return { ok: true, message: 'Kuzey arsası personel tesislerine açıldı.' };
    });
  }

  buildStaffFacility(id) {
    return this.#command(`staff-facility:${id}`, draft => {
      const facility = STAFF_FACILITIES[id];
      if (!facility || !draft.staffLandCleared || draft.staffFacilities[id]) return { ok: false, reason: 'facility-unavailable' };
      if (draft.economy.balanceAtoms < facility.price * MONEY_ATOMS) return { ok: false, reason: 'insufficient-funds' };
      new EconomyLedger(draft.economy).debit(`staff-facility:${id}`, facility.price, `staff-facility:${id}`);
      draft.staffFacilities[id] = { id };
      draft.layout[`staff-${id}`] = { x: facility.x, z: facility.z, rotation: 0 };
      return { ok: true, message: `${facility.title} inşa edildi.` };
    });
  }

  getAvailableUpgrades() {
    return UPGRADES.filter((upgrade) => this.state.availableUpgrades.includes(upgrade.id)
      && !this.state.completedUpgrades.includes(upgrade.id)
      && !AD_ONLY_UPGRADE_IDS.includes(upgrade.id));
  }

  #persist(transactionId, draft = this.state) {
    this.saveService.commit(draft, transactionId);
    this.state = draft;
    this.lastDurableTick = draft.tick;
  }

  #command(transactionId, action) {
    const draft = clone(this.state);
    try {
      const result = action(draft);
      if (!result?.ok) return result ?? { ok: false, reason: 'rejected' };
      draft.revision += 1;
      this.#persist(transactionId, draft);
      if (result.message) this.onEvent({ type: 'toast', message: result.message });
      return { ...result, state: this.state };
    } catch (error) {
      this.onEvent({ type: 'toast', message: error.message, tone: 'error' });
      return { ok: false, reason: 'command-failed', error };
    }
  }

  buyUpgrade(upgradeId) {
    if (AD_ONLY_UPGRADE_IDS.includes(upgradeId)) return { ok: false, reason: 'rewarded-ad-required' };
    const upgrade = UPGRADES.find((entry) => entry.id === upgradeId);
    if (!upgrade) return { ok: false, reason: 'unknown-upgrade' };
    const playerWasNearUpgrade = Math.hypot(this.state.player.x - upgrade.x, this.state.player.z - upgrade.z) <= 2.2;
    const result = this.#command(`upgrade:${upgradeId}:${this.state.revision + 1}`, (draft) => {
      if (!draft.availableUpgrades.includes(upgradeId) || draft.completedUpgrades.includes(upgradeId)) {
        return { ok: false, reason: 'locked' };
      }
      new EconomyLedger(draft.economy).debit(`purchase:${upgradeId}`, upgrade.price, `upgrade:${upgradeId}`);
      draft.completedUpgrades.push(upgradeId);
      for (const unlockedId of upgrade.unlocks) draft.unlocked[unlockedId] = true;
      this.#applyUpgrade(draft, upgradeId);
      draft.quest = this.#questFor(draft);
      return { ok: true, message: UPGRADE_MESSAGES[upgradeId] };
    });
    if (result.ok && playerWasNearUpgrade) {
      this.upgradeMarkerPurchase = null;
      this.upgradeMarkerPurchaseLockPosition = { x: upgrade.x, z: upgrade.z };
    }
    return result;
  }

  upgradeMachine(machineId) {
    const machine = this.state.machines[machineId];
    if (!machine || !STATIONS[machineId]) return { ok: false, reason: 'unknown-machine' };
    return this.#command(`machine-upgrade:${machineId}:${this.state.revision + 1}`, (draft) => {
      const current = draft.machines[machineId];
      const level = current.upgradeLevel ?? 0;
      const cost = machineUpgradeCost(machineId, level);
      if (draft.economy.balanceAtoms < cost * 10_000) return { ok: false, reason: 'insufficient-funds', cost };
      new EconomyLedger(draft.economy).debit(`machine-upgrade:${machineId}:${level + 1}`, cost, `machine-upgrade:${machineId}`);
      current.upgradeLevel = level + 1;
      current.speedModifier = machineSpeedMultiplier(current.upgradeLevel);
      const nextSeconds = machineProductionSeconds(machineId, current.upgradeLevel);
      return { ok: true, level: current.upgradeLevel, cost, nextSeconds, message: `${STATIONS[machineId].title} geliştirildi.` };
    });
  }

  upgradeStaff(workerId) {
    const worker = this.state.workers.find((entry) => entry.id === workerId);
    if (!worker) return { ok: false, reason: 'unknown-staff' };
    return this.#command(`staff-upgrade:${workerId}:${this.state.revision + 1}`, (draft) => {
      const current = draft.workers.find((entry) => entry.id === workerId);
      const level = current.upgradeLevel ?? 0;
      const cost = staffUpgradeCost(current.type === 'waiter' ? 'chefWaiter' : current.type, level);
      if (draft.economy.balanceAtoms < cost * 10_000) return { ok: false, reason: 'insufficient-funds', cost };
      new EconomyLedger(draft.economy).debit(`staff-upgrade:${workerId}:${level + 1}`, cost, `staff-upgrade:${current.type}`);
      current.upgradeLevel = level + 1;
      current.speedModifier = staffSpeedMultiplier(current.upgradeLevel);
      return { ok: true, level: current.upgradeLevel, cost, message: `${STAFF[current.type]?.title ?? current.type} geliştirildi.` };
    });
  }

  #applyUpgrade(state, upgradeId) {
    const newStationIds = new Set();
    const shelfFor = (itemId) => {
      const definition = SHELVES[itemId];
      if (!definition) return;
      makeLocation(state.stock, definition.id, definition.capacity);
      state.unlocked[`${itemId.toLowerCase()}Shelf`] = true;
      const shelfId = Object.entries(STATIONS).find(([, station]) => station.kind === 'shelf' && station.item === itemId)?.[0];
      if (shelfId && state.unlockedProducts.includes(itemId) && !state.layout?.[shelfId]) {
        const stagingPosition = nextShelfStagingPosition(state, shelfId);
        if (stagingPosition) {
          state.layout ??= {};
          state.layout[shelfId] = { ...stagingPosition };
          newStationIds.add(shelfId);
        } else {
          state.pendingShelfIds ??= [];
          if (!state.pendingShelfIds.includes(shelfId)) state.pendingShelfIds.push(shelfId);
        }
      }
    };
    const addMachine = (id) => {
      const station = STATIONS[id];
      const recipe = RECIPES[station.recipe];
      state.machines[id] = { progressTicks: 0, recipe: station.recipe, blocked: false, blockedTicks: 0, blockedSinceTick: null, upgradeLevel: 0, speedModifier: 1 };
      newStationIds.add(id);
      makeLocation(state.stock, `machine:${id}:input`, 12);
      makeLocation(state.stock, `machine:${id}:output`, 8);
      if (recipe.output !== 'CHICKEN_FEED') shelfFor(recipe.output);
    };
    const addFarm = (id) => {
      const station = STATIONS[id];
      state.farms[id] = createFarmState(state.tick, id);
      newStationIds.add(id);
      makeLocation(state.stock, `farm:${station.item}`, 60);
    };
    const unlockProduct = (itemId) => {
      if (!state.unlockedProducts.includes(itemId)) state.unlockedProducts.push(itemId);
      shelfFor(itemId);
    };

    if (FARM_AD_UPGRADE_IDS.includes(upgradeId)) addFarm(upgradeId);
    if (upgradeId === 'cashier') this.#hire(state, 'cashier');
    if (upgradeId === 'warehouseOperator' || upgradeId === 'storeManager') this.#hire(state, upgradeId);
    if (upgradeId === 'paste') { addMachine('paste'); unlockProduct('TOMATO_PASTE'); }
    if (upgradeId === 'harvester') this.#hire(state, 'harvester');
    if (upgradeId === 'orange') {
      addFarm('orangeFarm'); addMachine('juice');
      unlockProduct('ORANGE'); unlockProduct('ORANGE_JUICE');
    }
    if (upgradeId === 'factoryFeeder') this.#hire(state, 'factoryFeeder');
    if (upgradeId === 'corn') { addFarm('cornFarm'); unlockProduct('CORN'); }
    if (upgradeId === 'popcorn') { addMachine('popcorn'); unlockProduct('POPCORN'); }
    if (upgradeId === 'feed') addMachine('feed');
    if (upgradeId === 'coop') {
      makeLocation(state.stock, 'coop:feed', 20);
      makeLocation(state.stock, 'coop:eggs', 20);
      state.coops.coop = { chickens: 1, progressTicks: 0 };
      unlockProduct('EGG');
    }
    if (upgradeId === 'chicken2') state.coops.coop.chickens = 2;
    if (upgradeId === 'chicken3') state.coops.coop.chickens = 3;
    if (upgradeId === 'caretaker') this.#hire(state, 'caretaker');
    if (upgradeId === 'bakery') {
      addFarm('wheatFarm'); addMachine('bakery'); unlockProduct('BREAD');
    }
    if (upgradeId === 'flourMill') { addMachine('flourMill'); unlockProduct('FLOUR'); }
    if (upgradeId === 'orangeTartKitchen') { addMachine('orangeTartKitchen'); unlockProduct('ORANGE_TART'); }
    if (upgradeId === 'restaurant') {
      addMachine('burgerKitchen'); addMachine('pizzaKitchen');
      state.unlockedProducts.push('BURGER', 'PIZZA');
      state.diningTables = Object.fromEntries(['table1', 'table2', 'table3', 'table4'].map((id) => [id, {
        customerId: null, meal: null, tipAtoms: 0, eatTicks: 0,
      }]));
      for (const id of Object.keys(state.diningTables)) newStationIds.add(id);
    }
    if (upgradeId === 'chefWaiter') {
      this.#hire(state, 'chefWaiter');
      this.#hire(state, 'waiter');
    }
    this.#refreshUpgrades(state);
    for (const id of newStationIds) this.#pushPlayerClearOfStation(state, id);
  }

  #stageNextPendingShelf(state) {
    const stationId = state.pendingShelfIds?.[0];
    if (!stationId) return;
    const stagingPosition = nextShelfStagingPosition(state, stationId);
    if (!stagingPosition) return;
    state.layout ??= {};
    state.layout[stationId] = { ...stagingPosition };
    state.pendingShelfIds = state.pendingShelfIds.slice(1);
    this.#pushPlayerClearOfStation(state, stationId);
  }

  #pushPlayerClearOfStation(state, stationId) {
    const position = stationPosition(state, stationId);
    if (!position) return;
    const dimensions = getStationDimensions(stationId, position.rotation ?? 0);
    const clearance = 0.4;
    const player = state.player;
    if (Math.abs(player.x - position.x) >= dimensions.width / 2 + clearance
      || Math.abs(player.z - position.z) >= dimensions.depth / 2 + clearance) return;

    const directions = [
      { x: -1, z: 0 }, { x: 1, z: 0 }, { x: 0, z: -1 }, { x: 0, z: 1 },
      { x: -1, z: -1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: 1, z: 1 },
    ];
    const candidates = [];
    for (const extraSpace of [0.62, 1, 1.5, 2, 2.8, 3.6]) {
      for (const direction of directions) {
        const x = position.x + direction.x * (dimensions.width / 2 + extraSpace);
        const z = position.z + direction.z * (dimensions.depth / 2 + extraSpace);
        candidates.push({ x, z, distance: Math.hypot(player.x - x, player.z - z) });
      }
    }

    candidates.sort((a, b) => a.distance - b.distance);
    const destination = candidates.find(({ x, z }) => this.#isPlayerPositionClear(state, x, z));
    if (!destination) return;
    player.x = Math.max(-49, Math.min(state.unlocked.managerOffice ? 26.3 : 13.2, destination.x));
    player.z = Math.max(-8.2, Math.min(state.unlocked.managerOffice ? 18 : 11.8, destination.z));
    this.target = null;
  }

  #isPlayerPositionClear(state, x, z) {
    if (x < -49 || x > (state.unlocked.managerOffice ? 26.3 : 13.2) || z < -8.2 || z > (state.unlocked.managerOffice ? 18 : 11.8)) return false;
    const radius = 0.38;
    const marketBoxes = getMarketCollisionBoxes(state);
    if (marketBoxes.some((box) => x > box.minX - radius && x < box.maxX + radius
      && z > box.minZ - radius && z < box.maxZ + radius)) return false;

    for (const id of getAllStationIds(state)) {
      if (!isStationUnlocked(state, id)) continue;
      const station = stationPosition(state, id);
      if (!station) continue;
      const dimensions = getStationDimensions(id, station.rotation ?? 0);
      if (Math.abs(x - station.x) < dimensions.width / 2 + radius
        && Math.abs(z - station.z) < dimensions.depth / 2 + radius) return false;
    }

    for (const decoration of state.decorations ?? []) {
      if (decoration.type === 'welcomeMat') continue;
      const dimensions = getDecorationDimensions(decoration.type, decoration.rotation ?? 0);
      if (Math.abs(x - decoration.x) < dimensions.width / 2 + radius
        && Math.abs(z - decoration.z) < dimensions.depth / 2 + radius) return false;
    }
    return true;
  }

  #hire(state, type, candidate = null, registerId = null) {
    const fallbackCashierPosition = registerCashierPosition(STATIONS.register);
    const positions = {
      cashier: [fallbackCashierPosition.x, fallbackCashierPosition.z], harvester: [-10, 7], factoryFeeder: [-10, 0],
      caretaker: [-18, 0], chefWaiter: [-30, 0], waiter: [-35, 0],
      warehouseOperator: [STATIONS.loadingDock.access.x, STATIONS.loadingDock.access.z],
      storeManager: [STATIONS.managerOffice.access.x, STATIONS.managerOffice.access.z],
    };
    const workerRegisterId = type === 'cashier' ? registerId ?? 'register' : null;
    const register = workerRegisterId ? stationPosition(state, workerRegisterId) : null;
    const cashierPosition = type === 'cashier' && register ? registerCashierPosition(register) : null;
    const [x, z] = cashierPosition
      ? [cashierPosition.x, cashierPosition.z]
      : positions[type] ?? [-8, 0];
    state.workers.push(normalizeWorkerWelfare({
      id: `worker-${state.nextEntityId++}`, type, x, z, facing: cashierPosition?.facing ?? 0, unlocked: true,
      upgradeLevel: 0, speedModifier: 1, salaryDebtAtoms: 0, salaryDueDay: null,
      waitingForSalary: false, task: null,
      ...(workerRegisterId ? { registerId: workerRegisterId } : {}),
      ...(candidate ? { name: candidate.name, archetypeId: candidate.archetypeId, salaryAtoms: candidate.salaryAtoms } : {}),
    }));
  }

  #addCheckoutRegister(state) {
    state.checkoutRegisters ??= {};
    state.cashAtRegisters ??= { register: 0 };
    const registerId = `register_${state.nextEntityId++}`;
    const registerNumber = Object.keys(state.checkoutRegisters).length + 2;
    for (const candidate of ADDITIONAL_REGISTER_POSITIONS) {
      state.checkoutRegisters[registerId] = { ...candidate, rotation: 0, number: registerNumber };
      if (!canPlaceStation(state, registerId, candidate.x, candidate.z, 0)) continue;
      state.cashAtRegisters[registerId] = 0;
      return registerId;
    }
    delete state.checkoutRegisters[registerId];
    return null;
  }

  #refreshUpgrades(state) {
    const statRequirements = {
      cashier: state.stats.pasteSold > 0,
      paste: state.stats.tomatoSold > 0,
      harvester: state.stats.pasteSold > 0,
      orange: state.stats.pasteSold > 0,
      factoryFeeder: state.stats.juiceSold > 0,
      orangeFarm2: state.stats.juiceSold > 0,
      corn: state.stats.juiceSold > 0,
      cornFarm2: state.stats.cornSold > 0,
      popcorn: state.stats.cornSold > 0,
      feed: state.stats.popcornSold > 0,
      coop: state.stats.feedProduced > 0,
      chicken2: state.stats.eggSold > 0,
      caretaker: state.stats.eggSold > 0,
      bakery: state.stats.eggSold > 0,
      wheatFarm2: state.stats.eggSold > 0,
      flourMill: state.stats.breadSold > 0,
      orangeTartKitchen: state.stats.flourProduced > 0 && state.stats.juiceSold > 0,
      chicken3: state.completedUpgrades.includes('chicken2'),
      restaurant: state.stats.breadSold > 0,
      chefWaiter: state.stats.tipsCollected > 0,
      logisticsOffice: state.stats.eggSold > 0,
      warehouseOperator: state.completedUpgrades.includes('logisticsOffice'),
      storeManager: state.completedUpgrades.includes('logisticsOffice'),
    };
    if (!statRequirements.cashier && !state.completedUpgrades.includes('cashier')) {
      state.availableUpgrades = state.availableUpgrades.filter((id) => id !== 'cashier');
    }
    for (const [id, available] of Object.entries(statRequirements)) {
      if (available && !state.completedUpgrades.includes(id) && !state.availableUpgrades.includes(id)) {
        state.availableUpgrades.push(id);
      }
    }
  }

  #questFor(state) {
    if (!state.unlocked.paste) return state.stats.tomatoSold > 0 ? 'Salça kazanı ve reyonu aç.' : 'İlk domates satışını yap.';
    if (state.stats.pasteSold === 0) return '2 domatesi salça kazanına bırak, salçayı rafa taşı ve sat.';
    if (!state.unlocked.orange) return 'Portakal bahçesi ve meyve sıkacağını aç.';
    if (state.stats.juiceSold === 0) return 'Portakalları sıkıp meyve suyunu rafa taşı.';
    if (!state.unlocked.corn) return 'Mısır tarlasını ve reyonunu aç.';
    if (state.stats.cornSold === 0) return 'Mısır hasat et, reyona koy ve sat.';
    if (!state.unlocked.popcorn) return 'Popcorn makinesini aç.';
    if (state.stats.popcornSold === 0) return 'Mısırı popcorn makinesine yükle; popcorn üretip sat.';
    if (!state.unlocked.feed) return 'Yem değirmenini aç.';
    if (state.stats.feedProduced === 0) return 'Mısırı değirmene yükle ve tavuk yemi üret.';
    if (!state.unlocked.coop) return 'Tavuk kümesini aç.';
    if (state.stats.eggSold === 0) return 'Yemi kümese bırak, yumurtaları toplayıp sat.';
    if (!state.unlocked.bakery) return 'Buğday tarlası ve taş fırını aç.';
    if (state.stats.breadSold === 0) return '2 buğday ve 1 yumurtayı fırına yükle; ekmek üretip sat.';
    if (!state.unlocked.restaurant) return 'Gurme restoranı aç.';
    if (!state.unlocked.chefWaiter) return 'Burger veya pizza pişir, müşteriye servis et ve bahşiş topla.';
    return 'Tebrikler! Marketini üretimden restorana kadar büyüttün.';
  }

  #processPayroll(state, dayStarted) {
    let changed = false;
    let paidAtoms = 0;
    let paidCount = 0;
    let newlyWaitingCount = 0;
    let resumedCount = 0;
    const day = gameDayNumber(state.tick);

    const pay = (worker, amountAtoms, dueDay) => {
      const transactionId = `salary:${worker.id}:${dueDay}`;
      new EconomyLedger(state.economy).debit(transactionId, amountAtoms / MONEY_ATOMS, `salary:${worker.type}`);
      worker.salaryDebtAtoms = 0;
      worker.salaryDueDay = null;
      worker.waitingForSalary = false;
      worker.salaryWaitRoute = null;
      worker.salaryWaitRouteIndex = 0;
      worker.salaryWaitTarget = null;
      worker.salaryWaitObstacles = null;
      paidAtoms += amountAtoms;
      paidCount += 1;
      changed = true;
    };

    for (const worker of state.workers) {
      const debtAtoms = worker.salaryDebtAtoms ?? 0;
      if (debtAtoms > 0) {
        if (state.economy.balanceAtoms < debtAtoms) continue;
        const wasWaiting = Boolean(worker.waitingForSalary);
        pay(worker, debtAtoms, worker.salaryDueDay ?? day);
        if (wasWaiting) resumedCount += 1;
        continue;
      }
      if (!dayStarted) continue;

      const salaryAtoms = worker.salaryAtoms ?? staffDailySalaryAtoms(worker.type);
      if (!salaryAtoms) continue;
      if (state.economy.balanceAtoms < salaryAtoms) {
        worker.salaryDebtAtoms = salaryAtoms;
        worker.salaryDueDay = day;
        worker.waitingForSalary = true;
        worker.salaryWaitRoute = null;
        worker.salaryWaitRouteIndex = 0;
        worker.salaryWaitTarget = null;
        worker.salaryWaitObstacles = null;
        newlyWaitingCount += 1;
        changed = true;
        continue;
      }
      pay(worker, salaryAtoms, day);
    }

    const waitingCount = state.workers.filter((worker) => worker.waitingForSalary).length;
    const shouldReport = (dayStarted && (paidCount > 0 || newlyWaitingCount > 0 || resumedCount > 0))
      || (!dayStarted && resumedCount > 0);
    return { changed, paidAtoms, paidCount, newlyWaitingCount, resumedCount, waitingCount, day, shouldReport };
  }

  openProcurement() {
    if (!this.state.unlocked.managerOffice) return { ok: false, reason: 'locked' };
    this.onEvent?.({ type: 'procurement-open' });
    return { ok: true };
  }

  placeWholesaleOrder(cart) {
    return this.#command(`wholesale:${this.state.revision + 1}`, draft => placeWholesaleOrder(draft, cart));
  }

  configureProcurementAutomation(settings) {
    return this.#command(`procurement-policy:${this.state.revision + 1}`, draft => configureProcurementAutomation(draft, settings));
  }

  buyImportedShelf(item) {
    const definition = IMPORTED_SHELVES[item];
    if (!this.state.unlocked.managerOffice) return { ok: false, reason: 'locked' };
    if (!definition) return { ok: false, reason: 'unknown-product' };
    if (this.state.unlockedProducts.includes(item)) return { ok: false, reason: 'already-owned' };
    return this.#command(`imported-shelf:${item}`, draft => {
      if (draft.economy.balanceAtoms < definition.price * MONEY_ATOMS) return { ok: false, reason: 'insufficient-funds' };
      new EconomyLedger(draft.economy).debit(`imported-shelf:${item}`, definition.price, 'shelf-purchase');
      draft.unlockedProducts.push(item);
      draft.unlocked[definition.stationId] = true;
      const station = STATIONS[definition.stationId];
      makeLocation(draft.stock, SHELVES[item].id, SHELVES[item].capacity);
      if (canPlaceStation(draft, definition.stationId, station.x, station.z)) draft.layout[definition.stationId] = { x: station.x, z: station.z };
      else {
        draft.pendingShelfIds.push(definition.stationId);
        this.#stageNextPendingShelf(draft);
      }
      this.#pushPlayerClearOfStation(draft, definition.stationId);
      return { ok: true, stationId: definition.stationId, message: `${ITEMS[item].name} reyonu alındı.` };
    });
  }

  interact(targetId) {
    const state = this.state;
    const player = state.player;
    const upgrade = UPGRADES.find((entry) => entry.id === targetId);
    if (upgrade && !state.completedUpgrades.includes(targetId)) return { ok: false, reason: 'automatic-purchase' };
    const trashBin = state.decorations.find((entry) => entry.id === targetId && entry.type === 'trashBin');
    if (trashBin) {
      if (Math.hypot(player.x - trashBin.x, player.z - trashBin.z) > 2.5) return { ok: false, reason: 'too-far' };
      return this.#command(`trash-bin:${targetId}:${state.revision + 1}`, (draft) => {
        const playerStock = draft.stock.player;
        let discarded = 0;
        for (const [item, count] of Object.entries(playerStock.items)) {
          const reserved = Math.min(count, Math.max(0, playerStock.reserved?.[item] ?? 0));
          const available = count - reserved;
          if (available <= 0) continue;
          discarded += available;
          if (reserved > 0) playerStock.items[item] = reserved;
          else delete playerStock.items[item];
        }
        if (!discarded) {
          return { ok: false, reason: Object.keys(playerStock.items).length ? 'items-reserved' : 'empty' };
        }
        const message = state.settings.language === 'en'
          ? `${discarded} item(s) thrown away.`
          : `${discarded} ürün çöpe atıldı.`;
        return { ok: true, discarded, message };
      });
    }
    const station = STATIONS[targetId] ?? state.customStations?.[targetId];
    if (!station) return { ok: false, reason: 'unknown-station' };
    const isUnlocked = isStationUnlocked(state, targetId);
    if (!isUnlocked) return { ok: false, reason: 'locked' };
    const pos = stationPosition(state, targetId);
    if (!pos) return { ok: false, reason: 'pending-delivery' };
    const access = LOGISTICS_KINDS.includes(station.kind) ? station.access : pos;
    const distance = Math.hypot(player.x - access.x, player.z - access.z);
    if (distance > 2.5) return { ok: false, reason: 'too-far' };
    if (station.kind === 'office') return this.openProcurement();

    return this.#command(`interact:${targetId}:${state.revision + 1}`, (draft) => {
      let moved = 0;
      if (station.kind === 'dock' || station.kind === 'warehouse') {
        const depot = station.kind === 'dock' ? 'dock:incoming' : 'warehouse:main';
        const deposit = station.kind === 'warehouse' && availablePlayerItems(draft) > 0;
        const from = deposit ? 'player' : depot;
        const to = deposit ? depot : 'player';
        for (const item of Object.keys(draft.stock[from].items)) moved += this.#transferUpTo(draft, from, to, item, draft.stock[from].items[item]);
        return moved ? { ok: true, moved, message: `${moved} ürün ${deposit ? 'depoya bırakıldı' : 'alındı'}.` } : { ok: false, reason: 'empty' };
      }
      if (station.kind === 'farm') {
        syncFarmHarvest(draft);
        const from = `farm:${station.item}`;
        moved += this.#transferUpTo(draft, from, 'player', station.item, draft.farms[targetId].readyCount);
        removeFarmReady(draft.farms[targetId], moved, draft.tick);
        return moved ? { ok: true, message: `${moved} ürün alındı.` } : { ok: false, reason: 'empty' };
      }
      if (station.kind === 'machine') {
        const machine = draft.machines[targetId];
        if (!machine) return { ok: false, reason: 'locked' };
        const recipe = RECIPES[station.recipe];
        const output = `machine:${targetId}:output`;
        const outputItem = recipe.output;
        moved = this.#transferUpTo(draft, output, 'player', outputItem, draft.player.capacity);
        if (moved) return { ok: true, message: `${moved} ${ITEMS[outputItem].name} alındı.` };
        if (!moved) {
          const input = `machine:${targetId}:input`;
          for (const [itemId] of Object.entries(recipe.inputs)) {
            const amount = quantityAt(draft.stock, 'player', itemId);
            if (amount > 0) moved += this.#transferUpTo(draft, 'player', input, itemId, amount);
          }
        }
        return moved ? { ok: true, message: `${moved} malzeme ${station.title} girişine yüklendi.` } : { ok: false, reason: 'no-compatible-stock' };
      }
      if (station.kind === 'coop') {
        moved += this.#transferUpTo(draft, 'player', 'coop:feed', 'CHICKEN_FEED', draft.player.capacity);
        moved += this.#transferUpTo(draft, 'coop:eggs', 'player', 'EGG', draft.player.capacity);
        return moved ? { ok: true, message: 'Kümes stoğu aktarıldı.' } : { ok: false, reason: 'no-compatible-stock' };
      }
      if (station.kind === 'shelf') {
        const shelf = getShelfLocations(draft, station.item).find((entry) => entry.id === targetId);
        const stockId = shelf?.stockId ?? SHELVES[station.item]?.id;
        const carried = quantityAt(draft.stock, 'player', station.item);
        if (carried > 0) {
          moved = stockId ? this.#transferUpTo(draft, 'player', stockId, station.item, carried) : 0;
          return moved ? { ok: true, message: 'Reyon dolduruldu.' } : { ok: false, reason: 'destination-full' };
        }
        moved = stockId ? this.#transferUpTo(draft, stockId, 'player', station.item, draft.player.capacity) : 0;
        return moved ? { ok: true, message: `${moved} ürün alındı.` } : { ok: false, reason: 'empty' };
      }
      if (station.kind === 'table') return this.#serveOrCollectTip(draft, targetId);
      if (station.kind === 'register') return { ok: false, reason: 'passive-station' };
      return { ok: false, reason: 'no-action' };
    });
  }

  #transferUpTo(state, from, to, item, requested) {
    const available = quantityAt(state.stock, from, item) - (state.stock[from].reserved?.[item] ?? 0);
    const space = state.stock[to].capacity - Object.values(state.stock[to].items).reduce((a, b) => a + b, 0)
      - (state.stock[to].reservedCapacity ?? 0);
    const count = Math.min(available, Math.max(0, space), requested);
    if (count < 1 || !canTransfer(state, from, to, item, count)) return 0;
    const id = `transfer:${state.tick}:${state.revision}:${from}:${to}:${item}`;
    return transferStock(state, { transactionId: id, from, to, item, quantity: count }).ok ? count : 0;
  }

  #serveOrCollectTip(state, tableId) {
    const table = state.diningTables[tableId];
    if (!table) return { ok: false, reason: 'locked' };
    if (table.tipAtoms > 0) {
      const ledger = new EconomyLedger(state.economy);
      ledger.credit(`tip:${tableId}:${state.tick}`, table.tipAtoms / 10_000, 'restaurant-tip');
      const diner = state.customers.find((entry) => entry.id === table.customerId);
      if (diner) {
        diner.phase = 'leaving';
        diner.route = [{ x: -37, z: 7 }, { x: -37, z: 10.4 }, { x: -37, z: 16 }];
        diner.routeIndex = 0;
        diner.tableId = null;
      }
      table.customerId = null;
      table.meal = null;
      table.tipAtoms = 0;
      state.stats.tipsCollected += 1;
      this.#refreshUpgrades(state);
        return { ok: true, message: 'Bahşiş alındı.' };
    }
    if (!table.customerId) return { ok: false, reason: 'table-empty' };
    const customer = state.customers.find((entry) => entry.id === table.customerId);
    if (!customer || customer.phase !== 'waiting-meal') return { ok: false, reason: 'customer-not-waiting' };
    const meal = customer.demand;
    if (quantityAt(state.stock, 'player', meal) < 1) return { ok: false, reason: 'meal-needed', item: meal };
    const transfer = transferStock(state, {
      transactionId: `serve:${customer.id}:${state.tick}`,
      from: 'player', to: `customer:${customer.id}`, item: meal, quantity: 1,
    });
    if (!transfer.ok) return { ok: false, reason: 'meal-transfer-failed' };
    customer.phase = 'eating';
    customer.eatTicks = 0;
    customer.meal = meal;
    table.meal = meal;
    table.eatTicks = 0;
    table.customerId = customer.id;
    state.stats.tablesServed += 1;
      return { ok: true, message: 'Yemek servis edildi.' };
  }

  setPlayerMove(vector, delta) {
    const player = { ...this.state.player };
    const speed = 7.5 * (this.state.speedMultiplier || 1) * this.getWalkSpeedMultiplier();
    let dx = vector.x * speed * delta;
    let dz = vector.z * speed * delta;
    const length = Math.hypot(dx, dz);
    if (length > speed * delta) { dx *= speed * delta / length; dz *= speed * delta / length; }
    const obstacles = this.obstacles ?? [];
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.18));
    const stepX = dx / steps;
    const stepZ = dz / steps;
    const blocked = (x, z) => {
      if (obstacles.some((o) => x > o.min.x - 0.45 && x < o.max.x + 0.45 && z > o.min.z - 0.45 && z < o.max.z + 0.45)) {
        return true;
      }
      const playerRadius = 0.35;
      const marketBoxes = getMarketCollisionBoxes(this.state);
      for (const box of marketBoxes) {
        if (x > box.minX - playerRadius && x < box.maxX + playerRadius &&
            z > box.minZ - playerRadius && z < box.maxZ + playerRadius) {
          return true;
        }
      }
      for (const [id, station] of Object.entries(STATIONS)) {
        if (!['machine', 'table', 'coop'].includes(station.kind)) continue;
        if (!isStationUnlocked(this.state, id)) continue;
        const pos = this.state.layout?.[id] ?? station;
        const hw = station.kind === 'coop' ? 1.4 : station.kind === 'machine' ? 1.0 : 1.0;
        const hd = station.kind === 'coop' ? 1.2 : station.kind === 'machine' ? 0.9 : 0.72;
        if (x > pos.x - hw && x < pos.x + hw && z > pos.z - hd && z < pos.z + hd) {
          return true;
        }
      }
      for (const dec of this.state.decorations ?? []) {
        if (dec.type === 'welcomeMat') continue;
        if (x > dec.x - 0.65 && x < dec.x + 0.65 && z > dec.z - 0.65 && z < dec.z + 0.65) {
          return true;
        }
      }
      return false;
    };
    for (let index = 0; index < steps; index += 1) {
      const nextX = player.x + stepX;
      const nextZ = player.z + stepZ;
      if (!blocked(nextX, player.z)) player.x = nextX;
      if (!blocked(player.x, nextZ)) player.z = nextZ;
    }
    if (vector.x || vector.z) player.facing = Math.atan2(vector.x, vector.z);
    player.x = Math.max(-49, Math.min(this.state.unlocked.managerOffice ? 26.3 : 13.2, player.x));
    player.z = Math.max(-8.2, Math.min(this.state.unlocked.managerOffice ? 18 : 11.8, player.z));
    this.state.player = player;
  }

  setPlayerTarget(x, z) {
    this.target = { x, z };
  }

  clearPlayerTarget() {
    this.target = null;
  }

  updateTargetMove(delta) {
    if (!this.target) return;
    const dx = this.target.x - this.state.player.x;
    const dz = this.target.z - this.state.player.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.25) { this.target = null; return; }
    const speed = 7.5 * (this.state.speedMultiplier || 1) * this.getWalkSpeedMultiplier();
    const step = Math.min(distance, speed * delta);
    this.setPlayerMove({ x: dx / distance, z: dz / distance }, step / speed);
  }

  advanceUpgradeMarkerPurchase(action, deltaSeconds, eligible = true) {
    const player = this.state.player;
    const lockPosition = this.upgradeMarkerPurchaseLockPosition;
    if (lockPosition) {
      if (Math.hypot(player.x - lockPosition.x, player.z - lockPosition.z) <= 2.2) {
        this.upgradeMarkerPurchase = null;
        return null;
      }
      this.upgradeMarkerPurchaseLockPosition = null;
    }

    if (!eligible || action?.kind !== 'upgrade') {
      this.upgradeMarkerPurchase = null;
      return null;
    }
    const upgrade = UPGRADES.find((entry) => entry.id === action.id);
    if (!upgrade || !this.state.availableUpgrades.includes(upgrade.id)
      || this.state.completedUpgrades.includes(upgrade.id)) {
      this.upgradeMarkerPurchase = null;
      return null;
    }
    const priceAtoms = Math.round(upgrade.price * MONEY_ATOMS);
    if (this.state.economy.balanceAtoms < priceAtoms) {
      this.upgradeMarkerPurchase = null;
      return null;
    }

    if (this.upgradeMarkerPurchase?.id !== upgrade.id) {
      this.upgradeMarkerPurchase = { id: upgrade.id, elapsed: 0 };
    }
    const elapsed = Number.isFinite(deltaSeconds) ? Math.max(0, Math.min(0.1, deltaSeconds)) : 0;
    this.upgradeMarkerPurchase.elapsed += elapsed;
    if (this.upgradeMarkerPurchase.elapsed < UPGRADE_MARKER_PURCHASE_SECONDS) {
      return { id: upgrade.id, progress: this.upgradeMarkerPurchase.elapsed / UPGRADE_MARKER_PURCHASE_SECONDS };
    }

    this.upgradeMarkerPurchase = null;
    const result = this.buyUpgrade(upgrade.id);
    return { id: upgrade.id, progress: 1, completed: result.ok, result };
  }

  getNearbyAction() {
    const player = this.state.player;
    if (this.upgradeMarkerPurchaseLockPosition
      && Math.hypot(player.x - this.upgradeMarkerPurchaseLockPosition.x, player.z - this.upgradeMarkerPurchaseLockPosition.z) > 2.2) {
      this.upgradeMarkerPurchaseLockPosition = null;
    }
    const candidates = [];
    const state = this.state;
    for (const id of getAllStationIds(state)) {
      const station = STATIONS[id] ?? state.customStations?.[id]
        ?? (state.checkoutRegisters?.[id] ? { ...state.checkoutRegisters[id], kind: 'register', title: 'Kasa' } : null)
        ?? (state.selfRegisters?.[id] ? { ...state.selfRegisters[id], kind: 'selfRegister', title: 'Otomatik Kasa' } : null);
      if (!station || station.kind === 'selfRegister') continue;
      const unlocked = station.kind === 'farm' ? Boolean(this.state.farms[id])
        : station.kind === 'machine' ? Boolean(this.state.machines[id])
          : station.kind === 'shelf' ? this.state.unlockedProducts.includes(station.item)
          : station.kind === 'coop' ? Boolean(this.state.coops.coop)
            : station.kind === 'table' ? Boolean(this.state.diningTables[id])
              : isStationUnlocked(state, id);
      const position = stationPosition(state, id);
      const access = LOGISTICS_KINDS.includes(station.kind) ? station.access : position;
      if (unlocked && position) candidates.push({ id, ...station, ...position, distance: Math.hypot(player.x - access.x, player.z - access.z) });
    }
    for (const upgrade of this.getAvailableUpgrades()) {
      candidates.push({ ...upgrade, kind: 'upgrade', distance: Math.hypot(player.x - upgrade.x, player.z - upgrade.z) });
    }
    for (const trashBin of state.decorations.filter((entry) => entry.type === 'trashBin')) {
      const available = availablePlayerItems(state);
      const carried = carriedPlayerItems(state);
      candidates.push({
        id: trashBin.id,
        kind: 'trashBin',
        x: trashBin.x,
        z: trashBin.z,
        distance: Math.hypot(player.x - trashBin.x, player.z - trashBin.z),
        label: available ? 'Çöp kovası · Çantayı boşalt' : carried ? 'Çöp kovası · Ürünler ayrılmış' : 'Çöp kovası · Çanta boş',
        actionable: available > 0,
      });
    }
    candidates.sort((a, b) => a.distance - b.distance);
    const nearest = candidates[0];
    if (!nearest || nearest.distance > 2.2) return null;
    if (nearest.kind === 'upgrade') {
      const priceAtoms = Math.round(nearest.price * MONEY_ATOMS);
      const balanceAtoms = state.economy.balanceAtoms;
      const insufficientFunds = balanceAtoms < priceAtoms;
      const rearmRequired = Boolean(this.upgradeMarkerPurchaseLockPosition);
      const progress = this.upgradeMarkerPurchase?.id === nearest.id
        ? Math.min(1, this.upgradeMarkerPurchase.elapsed / UPGRADE_MARKER_PURCHASE_SECONDS)
        : 0;
      const paymentAmount = Math.round(priceAtoms * progress) / MONEY_ATOMS;
      const shortfall = Math.max(0, priceAtoms - balanceAtoms) / MONEY_ATOMS;
      const label = rearmRequired ? 'Tekrar yaklaşmak için biraz uzaklaş'
        : insufficientFunds ? `Bakiye yetersiz · $${shortfall.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} eksik`
          : progress > 0 ? `Ödeme alınıyor · $${paymentAmount.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} / $${nearest.price}`
            : `Yanında dur · 3 sn · $${nearest.price}`;
      return {
        ...nearest,
        label,
        actionable: false,
        paymentProgress: progress,
        paymentAmount,
        paymentSecondsRemaining: Math.max(0, UPGRADE_MARKER_PURCHASE_SECONDS - (this.upgradeMarkerPurchase?.elapsed ?? 0)),
        insufficientFunds,
        shortfall,
        rearmRequired,
      };
    }
    if (nearest.kind === 'trashBin') return nearest;
    if (nearest.kind === 'office') return { ...nearest, label: 'Toptan sipariş terminalini aç', actionable: true };
    if (nearest.kind === 'dock' || nearest.kind === 'warehouse') {
      const depot = nearest.kind === 'dock' ? 'dock:incoming' : 'warehouse:main';
      const available = Object.values(state.stock[depot].items).some(count => count > 0);
      const deposit = nearest.kind === 'warehouse' && availablePlayerItems(state) > 0;
      return { ...nearest, label: deposit ? 'Ürünleri depoya bırak' : nearest.kind === 'dock' ? 'Teslimat kolilerini al' : 'Depodan ürün al', actionable: deposit || available };
    }
    if (nearest.kind === 'farm') {
      const ready = state.farms[nearest.id]?.readyCount ?? 0;
      const carried = Object.values(state.stock.player.items).reduce((total, count) => total + count, 0);
      const full = carried >= state.player.capacity;
      return { ...nearest, label: full ? 'Çanta dolu' : ready ? `Hasat et · ${nearest.title}` : 'Ürünler büyüyor', actionable: ready > 0 && !full };
    }
    if (nearest.kind === 'machine') {
      const recipe = RECIPES[nearest.recipe];
      const output = quantityAt(state.stock, `machine:${nearest.id}:output`, recipe.output);
      const input = Object.keys(recipe.inputs).some((item) => quantityAt(state.stock, 'player', item) > 0);
      const missing = Object.entries(recipe.inputs).filter(([item, count]) => quantityAt(state.stock, `machine:${nearest.id}:input`, item) < count);
      const label = output > 0 ? `${ITEMS[recipe.output].name} hazır · ${output} ürün al`
        : input ? 'Malzemeleri makineye yükle'
          : missing.length ? `Gerekli: ${missing.map(([item, count]) => `${count} ${ITEMS[item].name}`).join(' + ')}`
            : `Üretiliyor · ${Math.round((state.machines[nearest.id].progressTicks / (recipe.seconds * 10)) * 100)}%`;
      return { ...nearest, label, actionable: output > 0 || input };
    }
    if (nearest.kind === 'shelf') {
      const carried = quantityAt(state.stock, 'player', nearest.item);
      const shelf = getShelfLocations(state, nearest.item).find((entry) => entry.id === nearest.id);
      const stocked = quantityAt(state.stock, shelf?.stockId ?? SHELVES[nearest.item]?.id, nearest.item);
      return { ...nearest, label: carried > 0 ? 'Reyonu doldur' : stocked > 0 ? `${ITEMS[nearest.item].name} al` : 'Reyon boş', actionable: carried > 0 || stocked > 0 };
    }
    if (nearest.kind === 'coop') {
      const eggs = quantityAt(state.stock, 'coop:eggs', 'EGG');
      const playerCount = Object.values(state.stock.player.items).reduce((total, count) => total + count, 0);
      const hasPlayerSpace = playerCount < state.player.capacity;
      const feedInBag = Math.max(0, quantityAt(state.stock, 'player', 'CHICKEN_FEED') - (state.stock.player.reserved?.CHICKEN_FEED ?? 0));
      const feedStock = state.stock['coop:feed'];
      const feedSpace = (feedStock?.capacity ?? 0) - Object.values(feedStock?.items ?? {}).reduce((total, count) => total + count, 0);
      const canCollectEggs = eggs > 0 && hasPlayerSpace;
      const canDeliverFeed = feedInBag > 0 && feedSpace > 0;
      const label = canCollectEggs ? 'Yumurtaları otomatik al'
        : canDeliverFeed ? 'Yemi kümese bırak'
          : eggs > 0 ? 'Çanta dolu' : 'Kümeste yapılacak iş yok';
      return { ...nearest, label, actionable: canCollectEggs || canDeliverFeed };
    }
    if (nearest.kind === 'table') {
      const table = state.diningTables[nearest.id];
      return { ...nearest, label: table.tipAtoms ? 'Bahşişi al' : table.customerId ? 'Yemeği servis et' : nearest.title };
    }
    return { ...nearest, label: 'Müşteriler kasada ödeme yapıyor', actionable: false };
  }

  tryAutoPickup() {
    if (!this.state.settings?.autoPickup) return null;
    const action = this.getNearbyAction();
    if (!action || !action.actionable) return null;
    if (['upgrade', 'trashBin', ...LOGISTICS_KINDS].includes(action.kind)) return null;
    if (action.kind === 'shelf' && quantityAt(this.state.stock, 'player', action.item) <= 0) return null;
    if (action.kind === 'machine') {
      const carried = Object.values(this.state.stock.player.items).reduce((a, b) => a + b, 0);
      const full = carried >= this.state.player.capacity;
      const recipe = RECIPES[action.recipe];
      const input = recipe && Object.keys(recipe.inputs).some((item) => quantityAt(this.state.stock, 'player', item) > 0);
      if (full && !input) return null;
    }
    if (action.kind === 'coop') {
      const carried = Object.values(this.state.stock.player.items).reduce((a, b) => a + b, 0);
      const full = carried >= this.state.player.capacity;
      const feed = quantityAt(this.state.stock, 'player', 'CHICKEN_FEED');
      const eggs = quantityAt(this.state.stock, 'coop:eggs', 'EGG');
      if ((full || eggs <= 0) && feed <= 0) return null;
    }
    const result = this.interact(action.id);
    return result.ok ? result : null;
  }

  tick() {
    const draft = clone(this.state);
    this.adSessionTicks += 1;
    const { events, durable } = advanceSimulation(draft, this.obstacles ?? []);
    const previousDay = gameDayNumber(draft.tick);
    draft.tick += 1;
    const dayStarted = gameDayNumber(draft.tick) > previousDay;
    const payroll = this.#processPayroll(draft, dayStarted);
    this.#refreshUpgrades(draft);
    draft.quest = this.#questFor(draft);
    if (durable || payroll.changed) {
      draft.revision += 1;
      try { this.#persist(`simulation:${draft.tick}`, draft); }
      catch (error) {
        this.onEvent({ type: 'save-error', message: error.message });
        return;
      }
    } else {
      this.state = draft;
    }
    for (const event of events) this.onEvent(event);
    if (payroll.shouldReport) this.onEvent({ type: 'payroll', ...payroll, dayStarted });
    if (draft.tick - this.lastDurableTick >= 300) {
      try { this.#persist(`checkpoint:${draft.tick}:${this.saveService.sequence + 1}`, this.state); }
      catch (error) { this.onEvent({ type: 'save-error', message: error.message }); }
    }
  }

  setObstacles(obstacles) {
    this.obstacles = obstacles;
  }

  setPaused(paused) {
    this.state.paused = paused;
  }

  checkpoint() {
    const draft = clone(this.state);
    draft.revision += 1;
    this.#persist(`checkpoint:${draft.tick}:${this.saveService.sequence + 1}`, draft);
  }

  setLanguage(language) {
    if (!['tr', 'en'].includes(language)) return { ok: false, reason: 'unsupported-language' };
    return this.#command(`language:${language}:${this.state.revision + 1}`, (draft) => {
      draft.settings.language = language;
      return { ok: true };
    });
  }

  setSetting(key, value) {
    if (!['sound', 'haptics', 'autoPickup'].includes(key)) return;
    return this.#command(`setting:${key}:${this.state.revision + 1}`, (draft) => {
      draft.settings[key] = Boolean(value);
      return { ok: true };
    });
  }

  setCharacter(character) {
    if (!PLAYER_CHARACTER_IDS.includes(character)) return { ok: false, reason: 'unsupported-character' };
    if (!this.state.player.unlockedCharacters.includes(character)) return { ok: false, reason: 'locked-character' };
    const result = this.#command(`character:${character}:${this.state.revision + 1}`, (draft) => {
      draft.player.character = character;
      return { ok: true };
    });
    if (result.ok) {
      try { this.saveService.storage?.setItem('player_character', character); } catch { /* the committed game save is authoritative */ }
    }
    return result;
  }

  setSpeedMultiplier(multiplier) {
    if (![1, 2, 5].includes(multiplier)) return;
    this.state.speedMultiplier = multiplier;
  }

  debugCredit(amount) {
    return this.#command(`debug-credit:${this.state.revision + 1}`, (draft) => {
      new EconomyLedger(draft.economy).credit(`debug-credit:${draft.revision + 1}`, amount, 'debug');
      return { ok: true, message: `$${amount.toLocaleString('tr-TR')} eklendi.` };
    });
  }

  debugCapacity(amount) {
    return this.#command(`debug-capacity:${this.state.revision + 1}`, (draft) => {
      draft.player.capacity = amount;
      draft.stock.player.capacity = amount;
      return { ok: true, message: `Taşıma kapasitesi ${amount} oldu.` };
    });
  }

  debugUnlockAllUpgrades() {
    return this.#command(`debug-all-upgrades:${this.state.revision + 1}`, (draft) => {
      for (const upgrade of UPGRADES) {
        for (const unlockedId of upgrade.unlocks) draft.unlocked[unlockedId] = true;
        if (draft.completedUpgrades.includes(upgrade.id)) continue;
        draft.completedUpgrades.push(upgrade.id);
        this.#applyUpgrade(draft, upgrade.id);
      }

      draft.availableUpgrades = draft.availableUpgrades.filter((id) => !draft.completedUpgrades.includes(id));

      draft.unlockedProducts ??= [];
      draft.layout ??= {};
      draft.pendingShelfIds ??= [];
      for (const [itemId, shelf] of Object.entries(IMPORTED_SHELVES)) {
        if (!draft.unlockedProducts.includes(itemId)) draft.unlockedProducts.push(itemId);
        draft.unlocked[shelf.stationId] = true;
        makeLocation(draft.stock, SHELVES[itemId].id, SHELVES[itemId].capacity);
        if (!draft.layout[shelf.stationId] && !draft.pendingShelfIds.includes(shelf.stationId)) {
          const station = STATIONS[shelf.stationId];
          if (canPlaceStation(draft, shelf.stationId, station.x, station.z)) {
            draft.layout[shelf.stationId] = { x: station.x, z: station.z };
          } else {
            draft.pendingShelfIds.push(shelf.stationId);
          }
        }
        this.#stageNextPendingShelf(draft);
        if (draft.layout[shelf.stationId]) this.#pushPlayerClearOfStation(draft, shelf.stationId);
      }

      draft.staffLandCleared = true;
      draft.staffFacilities ??= {};
      for (const facility of Object.values(STAFF_FACILITIES)) {
        draft.staffFacilities[facility.id] = { id: facility.id };
        draft.layout[`staff-${facility.id}`] = { x: facility.x, z: facility.z, rotation: 0 };
      }

      const message = draft.settings.language === 'en'
        ? 'All upgrades, imported shelves, and staff facilities are now unlocked and built.'
        : 'Tüm geliştirmeler, ithal reyonlar ve personel tesisleri açılıp kuruldu.';
      return { ok: true, message };
    });
  }

  reset() {
    this.saveService.clear();
    this.state = createInitialState();
    syncCatalogLayout(this.state);
    this.target = null;
    this.#persist('new-game');
    this.onEvent({ type: 'reset' });
  }
}

import { FARM_AD_UPGRADE_IDS, ITEMS, MONEY_ATOMS, RECIPES, SHELVES, STAFF, STAFF_ARCHETYPES, STAFF_FACILITIES, STAFF_HIRES, STAFF_LAND_PRICE, STATIONS, UPGRADES, staffDailySalaryAtoms } from '../domain/catalog.js';
import { DECORATIONS, decorBonus, decorScore } from '../domain/decorCatalog.js';
import { decorationPrice, orderProgress } from '../domain/orders.js';
import { machineProductionSeconds, machineSpeedMultiplier, machineUpgradeCost, percentGain, staffSpeedMultiplier, staffUpgradeCost } from '../domain/progression.js';
import { gameDayNumber } from '../domain/dayCycle.js';
import { PLAYER_CHARACTERS } from '../domain/characters.js';
import { assetIconMarkup, hydrateAssetIcons } from '../ui/AssetIcons.js';
import { mountCharacterPreviews } from './CharacterPreviews.js';
import { ToastManager } from '../ui/ToastManager.js';

const UPGRADE_ICONS = {
  tomatoFarm2: 'tomato', cornFarm2: 'corn', wheatFarm2: 'wheat', cashier: 'cashier', paste: 'tomatoPaste', harvester: 'workerAvatar', orange: 'orange',
  factoryFeeder: 'courierAvatar', orangeFarm2: 'orange', corn: 'corn', popcorn: 'popcorn', feed: 'chickenFeed',
  coop: 'coop', chicken2: 'coop', chicken3: 'coop', caretaker: 'workerAvatar', bakery: 'bread',
  flourMill: 'flour', orangeTartKitchen: 'orangeTart',
  restaurant: 'table', chefWaiter: 'chef',
};

const EN = {
  business: 'BUSINESS', customers: 'Customers', workers: 'Staff', shelfStock: 'Shelf stock',
  viewProducts: 'View products', upgrades: 'Business upgrades', settings: 'Settings',
  nextGoal: 'NEXT GOAL', inventory: 'Inventory', language: 'Interface language',
  normal: 'Normal speed', resume: 'Resume game', noUpgrade: 'No upgrades available right now. Make a sale to unlock the next step.',
  live: 'LIVE', grow: 'GROW YOUR BUSINESS', newUpgrades: 'New upgrades', stock: 'STOCK STATUS',
  general: 'General', character: 'Character', developer: 'Developer', sound: 'Sound effects',
  haptics: 'Haptic feedback', autoPickup: 'Auto-pickup', backgroundNote: 'The simulation pauses while the app is in the background. Tap resume when you return.',
  resetGame: 'Start a new game', orTap: 'or tap to move', businessTab: 'Business', staffTab: 'Staff',
  staffEffect: {
    cashier: 'Handles customer payments at the register.', harvester: 'Stocks shelves first, then supplies production machines.',
    factoryFeeder: 'Refills retail stock before carrying production ingredients.', caretaker: 'Supplies the coop and stocks eggs on the shelf.',
    chefWaiter: 'Automates restaurant cooking and table service.',
  },
  staffUnlock: {
    cashier: 'Unlocks after your first tomato sale.', harvester: 'Unlocks after your first paste sale.',
    factoryFeeder: 'Unlocks after your first orange juice sale.', caretaker: 'Unlocks after your first egg sale.',
    chefWaiter: 'Unlocks after collecting a restaurant tip.',
  },
};

const escapeMarkup = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const staffNeed = (value) => Math.round(Math.min(100, Math.max(0, Number.isFinite(value) ? value : 100)));
const staffMoney = (atoms, english) => (atoms / MONEY_ATOMS).toLocaleString(english ? 'en-US' : 'tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function staffBreakText(worker, english) {
  const phase = worker.break?.phase;
  if (phase === 'resting') return english ? 'Resting' : 'Dinleniyor';
  if (phase === 'to-facility') return english ? 'Heading to facility' : 'Tesise gidiyor';
  if (phase === 'returning') return english ? 'Returning to work' : 'İşe dönüyor';
  if (staffNeed(worker.energy) <= 20) return english ? 'Tired · slower pace' : 'Yorgun · yavaş çalışıyor';
  return english ? 'On duty' : 'Görevde';
}

export class HUD {
  constructor(app, input, onModalChange = () => {}) {
    this.app = app;
    this.input = input;
    this.onModalChange = onModalChange;
    this.modals = ['expansion-modal', 'staff-candidates-modal', 'settings-modal', 'inventory-modal', 'decor-modal', 'recovery-modal', 'bonus-offer-modal'];
    this.lastUpgradeSignature = '';
    this.lastInventorySignature = '';
    this.lastLanguage = null;
    this.elements = {};
    this.toasts = new ToastManager(app);
    hydrateAssetIcons();
    this.#cacheElements();
    this.characterPreviewSources = mountCharacterPreviews();
    this.#bind();
  }

  #cacheElements() {
    const ids = [
      'money-display', 'day-display', 'stack-display', 'walk-speed-buff',
      'customer-count', 'worker-count', 'shelf-count', 'mood-count',
      'business-toggle-score', 'order-card', 'order-item', 'order-reward',
      'order-progress', 'order-progress-fill', 'btn-deliver-order',
      'order-bonus-progress', 'decor-score', 'quest-text', 'progress-count',
      'progress-fill', 'btn-interact', 'action-label', 'upgrade-count',
      'order-ad-offer', 'order-ad-copy', 'btn-order-ad', 'machine-ad-offer', 'machine-ad-copy', 'btn-machine-ad',
      'decor-shop-score', 'decor-score-caption', 'decor-list',
      'setting-sound', 'setting-haptics', 'setting-autopickup',
      'upgrade-list', 'staff-list', 'staff-candidate-list', 'staff-candidate-title', 'staff-candidate-intro', 'staff-candidate-eyebrow', 'inventory-list'
    ];
    for (const id of ids) {
      this.elements[id] = document.getElementById(id);
    }
    this.elements.moneyPill = document.querySelector('.money-pill');
  }

  #bind() {
    const compactOrderMedia = window.matchMedia('(max-width: 720px) and (orientation: portrait)');
    const orderCard = document.getElementById('order-card');
    const orderToggle = document.getElementById('btn-order-toggle');
    const syncOrderLayout = () => {
      const compact = compactOrderMedia.matches;
      orderCard.classList.toggle('collapsed', compact);
      orderToggle.setAttribute('aria-expanded', String(!compact));
      const english = this.app.getState().settings.language === 'en';
      orderToggle.setAttribute('aria-label', english
        ? (compact ? 'Expand customer order' : 'Collapse customer order')
        : (compact ? 'Sipariş ayrıntılarını aç' : 'Sipariş ayrıntılarını kapat'));
      orderToggle.innerHTML = assetIconMarkup(compact ? 'chevronDown' : 'chevronUp', 18);
    };
    syncOrderLayout();
    compactOrderMedia.addEventListener('change', syncOrderLayout);
    const toggleOrderCard = () => {
      const collapsed = orderCard.classList.toggle('collapsed');
      const english = this.app.getState().settings.language === 'en';
      orderToggle.setAttribute('aria-expanded', String(!collapsed));
      orderToggle.setAttribute('aria-label', english
        ? (collapsed ? 'Expand customer order' : 'Collapse customer order')
        : (collapsed ? 'Sipariş ayrıntılarını aç' : 'Sipariş ayrıntılarını kapat'));
      orderToggle.innerHTML = assetIconMarkup(collapsed ? 'chevronDown' : 'chevronUp', 18);
    };
    orderCard.querySelector('.order-heading').addEventListener('click', (event) => {
      if (!event.target.closest('button')) toggleOrderCard();
    });

    document.getElementById('btn-expansions').addEventListener('click', () => this.open('expansion-modal'));
    document.getElementById('btn-settings').addEventListener('click', () => this.open('settings-modal'));
    document.getElementById('btn-inventory').addEventListener('click', () => this.open('inventory-modal'));
    document.getElementById('btn-decor').addEventListener('click', () => this.open('decor-modal'));
    document.getElementById('btn-business-toggle').addEventListener('click', () => {
      const open = document.getElementById('business-card').classList.toggle('mobile-open');
      const button = document.getElementById('btn-business-toggle');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'İşletme özetini kapat' : 'İşletme özetini aç');
    });
    orderToggle.addEventListener('click', toggleOrderCard);
    document.getElementById('btn-deliver-order').addEventListener('click', () => {
      const result = this.app.fulfillOrder();
      if (!result.ok) this.toast('Sipariş için çantanda yeterli ürün yok.', 'error');
      this.render(this.app.getState(), this.app.getNearbyAction(), true);
    });
    document.getElementById('btn-order-ad').addEventListener('click', (event) => this.#watchAd('order-double', { orderId: this.app.getState().lastOrderReward?.id }, event.currentTarget));
    document.getElementById('btn-machine-ad').addEventListener('click', (event) => this.#watchAd('supplier-drop', { machineId: this.currentSupplierMachineId }, event.currentTarget));
    document.getElementById('btn-bonus-ad').addEventListener('click', (event) => {
      if (!this.currentBonusOffer) return;
      this.#watchAd('bonus-offer', {
        offerId: this.currentBonusOffer.id,
        bonusType: this.currentBonusOffer.type,
        characterId: this.currentBonusOffer.characterId,
      }, event.currentTarget);
    });
    document.getElementById('btn-bonus-decline').addEventListener('click', () => this.close('bonus-offer-modal'));
    document.getElementById('btn-decor-top').addEventListener('click', () => this.open('decor-modal'));
    document.getElementById('decor-list').addEventListener('click', (event) => {
      const button = event.target.closest('[data-buy-decoration]');
      if (!button) return;
      const result = this.app.buyDecoration(button.dataset.buyDecoration);
      if (result.ok) {
        this.render(this.app.getState(), this.app.getNearbyAction(), true);
        this.toast(result.message);
      } else {
        this.toast(result.reason === 'no-decoration-space'
          ? (this.app.getState().settings.language === 'en' ? 'There is no open space for this decoration.' : 'Yerleştirilecek boş alan kalmadı.')
          : 'Bakiye yetersiz.', 'error');
      }
    });
    document.getElementById('btn-interact').addEventListener('click', () => this.#interact());
    document.getElementById('btn-resume').addEventListener('click', () => this.closeAll());
    document.getElementById('btn-reset').addEventListener('click', () => this.#confirmReset());
    document.getElementById('btn-recovery-reset').addEventListener('click', () => this.#confirmReset(true));

    document.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => this.close(button.dataset.close));
    });
    this.modals.forEach((id) => {
      const modal = document.getElementById(id);
      modal.addEventListener('pointerdown', (event) => {
        if (event.target === modal && id !== 'recovery-modal') this.close(id);
      });
    });
    document.querySelectorAll('.settings-tab').forEach((button) => button.addEventListener('click', () => this.#selectSettingsTab(button.dataset.tab)));
    document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
      this.app.setLanguage(button.dataset.language);
      this.render(this.app.getState(), this.app.getNearbyAction());
    }));
    document.querySelectorAll('[data-character]').forEach((button) => button.addEventListener('click', () => {
      const characterId = button.dataset.character;
      const state = this.app.getState();
      if (!state.player.unlockedCharacters.includes(characterId)) {
        if (!this.app.canOfferRewardedAd('character-unlock', { characterId })) {
          this.toast(state.settings.language === 'en' ? 'Character ads are not available right now.' : 'Karakter reklamı şu anda hazır değil.', 'error');
          return;
        }
        button.disabled = true;
        void this.#watchAd('character-unlock', { characterId });
        return;
      }
      const result = this.app.setCharacter(characterId);
      if (result.ok) this.render(this.app.getState(), this.app.getNearbyAction(), true);
    }));
    document.getElementById('setting-sound').addEventListener('change', (event) => this.app.setSetting('sound', event.target.checked));
    document.getElementById('setting-haptics').addEventListener('change', (event) => this.app.setSetting('haptics', event.target.checked));
    document.getElementById('setting-autopickup').addEventListener('change', (event) => this.app.setSetting('autoPickup', event.target.checked));
    document.querySelectorAll('[data-debug]').forEach((button) => button.addEventListener('click', () => this.#debug(button.dataset.debug)));
    document.getElementById('expansion-modal').addEventListener('click', (event) => {
      const candidatesButton = event.target.closest('[data-staff-candidates]');
      if (candidatesButton) {
        this.openStaffCandidates(candidatesButton.dataset.staffCandidates);
        return;
      }
      const facilityButton = event.target.closest('[data-staff-facility]');
      const landButton = event.target.closest('[data-staff-land]');
      if (facilityButton || landButton) {
        const result = facilityButton ? this.app.buildStaffFacility(facilityButton.dataset.staffFacility) : this.app.clearStaffLand();
        const english = this.app.getState().settings.language === 'en';
        if (!result.ok) this.toast(result.reason === 'insufficient-funds'
          ? (english ? 'Insufficient funds.' : 'Bakiye yetersiz.')
          : (english ? 'Clear the north land before construction.' : 'İnşaattan önce kuzey arsasını aç.'), 'error');
        this.render(this.app.getState(), this.app.getNearbyAction(), true);
        return;
      }
      const adButton = event.target.closest('[data-ad-accept]');
      if (adButton) {
        this.#watchAd(adButton.dataset.adAccept, this.#adPayload(adButton), adButton);
        return;
      }
      const machineUpgradeButton = event.target.closest('[data-upgrade-machine]');
      if (machineUpgradeButton) {
        const result = this.app.upgradeMachine(machineUpgradeButton.dataset.upgradeMachine);
        if (!result.ok) this.toast(result.reason === 'insufficient-funds' ? 'Bakiye yetersiz.' : 'Makine geliştirilemedi.', 'error');
        this.render(this.app.getState(), this.app.getNearbyAction(), true);
        return;
      }
      const staffUpgradeButton = event.target.closest('[data-upgrade-staff]');
      if (staffUpgradeButton) {
        const result = this.app.upgradeStaff(staffUpgradeButton.dataset.upgradeStaff);
        if (!result.ok) this.toast(result.reason === 'insufficient-funds' ? 'Bakiye yetersiz.' : 'Personel geliştirilemedi.', 'error');
        this.render(this.app.getState(), this.app.getNearbyAction(), true);
        return;
      }

      const button = event.target.closest('[data-buy-upgrade]');
      if (!button) return;
      const result = this.app.buyUpgrade(button.dataset.buyUpgrade);
      if (result.ok) this.render(this.app.getState(), this.app.getNearbyAction(), true);
      else this.toast(result.reason === 'locked' ? 'Bu geliştirme henüz açılmadı.' : 'Bakiye yetersiz.', 'error');
    });
    document.getElementById('staff-candidates-modal').addEventListener('click', (event) => {
      const button = event.target.closest('[data-hire-candidate]');
      if (!button || button.disabled) return;
      const result = this.app.hireStaffCandidate(button.dataset.candidateRole, button.dataset.hireCandidate);
      if (result.ok) this.close('staff-candidates-modal');
      else {
        const english = this.app.getState().settings.language === 'en';
        this.toast(result.reason === 'insufficient-funds'
          ? (english ? 'Insufficient funds.' : 'Bakiye yetersiz.')
          : (english ? 'This candidate is no longer available.' : 'Bu aday artık mevcut değil.'), 'error');
        this.renderStaffCandidates(this.app.getState(), button.dataset.candidateRole);
      }
    });
    document.querySelectorAll('[data-upgrade-tab]').forEach((button) => button.addEventListener('click', () => this.#selectUpgradeTab(button.dataset.upgradeTab)));
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        event.preventDefault();
        const modalOpen = this.modals.some((id) => !document.getElementById(id).classList.contains('hidden'));
        if (modalOpen) this.closeAll();
        else this.open('settings-modal');
      }
    });
  }

  #interact() {
    const action = this.app.getNearbyAction();
    if (!action) return;
    const result = this.app.interact(action.id);
    if (result.ok) { this.#feedback(); return; }
    if (action.kind === 'trashBin') {
      const english = this.app.getState().settings.language === 'en';
      const message = result.reason === 'items-reserved'
        ? (english ? 'Those items are reserved for staff.' : 'Bu ürünler personel için ayrılmış.')
        : (english ? 'There is nothing to throw away.' : 'Çantanda atılacak ürün yok.');
      this.toast(message, 'error');
      return;
    }
    const messages = {
      empty: 'Burada alınacak ürün yok.',
      'no-compatible-stock': 'Çantanda bu istasyon için uygun ürün yok.',
      locked: 'Bu istasyon henüz açılmadı.',
      'meal-needed': `Servis için ${ITEMS[result.item]?.name ?? 'ürün'} gerekli.`,
      'table-empty': 'Bu masa şu anda boş.',
      'customer-not-waiting': 'Müşteri sipariş beklemiyor.',
      'too-far': 'Biraz daha yaklaş.',
    };
    this.toast(messages[result.reason] ?? 'Bu işlem şu anda yapılamıyor.', 'error');
  }

  #adPayload(button) {
    return {
      orderId: button.dataset.adOrder,
      upgradeId: button.dataset.adUpgrade,
      role: button.dataset.adRole,
      machineId: button.dataset.adMachine,
    };
  }

  async #watchAd(placement, payload = {}, button = null) {
    if (!placement || this.rewardedAdRequestActive) return;
    this.rewardedAdRequestActive = true;
    if (button) {
      button.disabled = true;
      const english = this.app.getState().settings.language === 'en';
      button.textContent = this.app.isRewardedAdSimulated()
        ? (english ? 'Simulation · 3 sec…' : 'Simülasyon · 3 sn…')
        : (english ? 'Opening ad…' : 'Reklam açılıyor…');
    }
    let result;
    try {
      result = await this.app.watchRewardedAd(placement, payload);
    } catch {
      result = { ok: false, reason: 'ad-not-completed' };
    } finally {
      this.rewardedAdRequestActive = false;
      if (placement === 'bonus-offer') this.close('bonus-offer-modal');
      this.render(this.app.getState(), this.app.getNearbyAction(), true);
    }
    if (result.ok) {
      const message = result.message ?? (result.rewardAmount
        ? `Reklam ödülü alındı: +$${result.rewardAmount}.`
        : 'Ödül başarıyla alındı.');
      this.toast(message);
    } else if (result.reason === 'ad-not-completed') {
      this.toast('Reklam tamamlanmadı; ödül verilmedi.', 'error');
    } else if (result.reason === 'ad-not-ready') {
      this.toast('Reklam şu anda hazır değil.', 'error');
    }
  }

  #debug(action) {
    if (action === 'credit') this.app.debugCredit(1_000);
    if (action === 'creditLarge') this.app.debugCredit(99_999);
    if (action === 'capacity') this.app.debugCapacity(this.app.getState().player.capacity + 50);
    if (action === 'speed2') this.app.setSpeedMultiplier(2);
    if (action === 'speed5') this.app.setSpeedMultiplier(5);
    if (action === 'speed1') this.app.setSpeedMultiplier(1);
    this.render(this.app.getState(), this.app.getNearbyAction(), true);
  }

  feedback() {
    this.#feedback();
  }

  #feedback() {
    const settings = this.app.getState().settings;
    if (settings.haptics && navigator.vibrate) navigator.vibrate(12);
    if (!settings.sound) return;
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextType) return;
    try {
      this.audioContext ??= new AudioContextType();
      if (this.audioContext.state === 'suspended') this.audioContext.resume();
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 680;
      gain.gain.setValueAtTime(0.025, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.055);
      oscillator.connect(gain);
      gain.connect(this.audioContext.destination);
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.055);
    } catch { /* audio is optional */ }
  }

  #confirmReset(fromRecovery = false) {
    const prompt = this.app.getState().settings.language === 'en'
      ? 'The current save will be erased. Start a new game?'
      : 'Mevcut oyun kaydı silinecek. Yeni oyun başlatılsın mı?';
    if (!window.confirm(prompt)) return;
    try {
      this.app.reset();
      this.closeAll();
      if (fromRecovery) document.getElementById('recovery-modal').classList.add('hidden');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  open(id) {
    this.modals.forEach((modalId) => document.getElementById(modalId).classList.toggle('hidden', modalId !== id));
    this.onModalChange(true);
    if (id === 'expansion-modal') this.render(this.app.getState(), this.app.getNearbyAction(), true);
    if (id === 'inventory-modal') this.renderInventory(this.app.getState(), true);
    if (id === 'decor-modal') this.renderDecorations(this.app.getState(), true);
    if (id === 'settings-modal') this.#syncSettings(this.app.getState());
  }

  openStaffCandidates(role) {
    const result = this.app.openStaffCandidates(role);
    if (!result.ok) {
      this.toast(this.app.getState().settings.language === 'en' ? 'This profession is not unlocked yet.' : 'Bu meslek henüz açılmadı.', 'error');
      return;
    }
    this.renderStaffCandidates(this.app.getState(), role);
    this.open('staff-candidates-modal');
  }

  openBonusOffer(offer) {
    if (!offer || !['walk-speed', 'bag-capacity', 'character-unlock'].includes(offer.type)) return;
    this.currentBonusOffer = offer;
    const english = this.app.getState().settings.language === 'en';
    const speed = offer.type === 'walk-speed';
    const character = offer.type === 'character-unlock' ? PLAYER_CHARACTERS[offer.characterId] : null;
    document.querySelector('#bonus-offer-modal .eyebrow').textContent = english ? 'DAILY BONUS' : 'GÜNLÜK BONUS';
    const icon = document.getElementById('bonus-offer-icon');
    if (character) {
      const source = this.characterPreviewSources[offer.characterId];
      icon.innerHTML = source ? `<img src="${source}" alt="" />` : assetIconMarkup('workerAvatar', 58);
    } else {
      icon.innerHTML = assetIconMarkup(speed ? 'clock' : 'capacity', 58);
    }
    document.getElementById('bonus-offer-title').textContent = character
      ? (english ? 'A new character is waiting' : 'Yeni bir karakter seni bekliyor')
      : (english ? 'Surprise bonus!' : 'Sürpriz bonus!');
    document.getElementById('bonus-offer-name').textContent = character
      ? (english ? `Unlock ${character.label.en}` : `${character.label.tr} karakterini aç`)
      : speed
        ? (english ? '1.5× walking speed' : 'Yürüyüş hızın 1,5 katına çıksın')
        : (english ? 'Permanently expand your bag' : 'Çanta kapasiteni kalıcı artır');
    document.getElementById('bonus-offer-description').textContent = character
      ? (english ? `Watch a rewarded ad to unlock and play as ${character.label.en}.` : `Ödüllü reklamı izleyerek ${character.label.tr} karakterini açıp onunla oynayabilirsin.`)
      : speed
        ? (english ? 'Watch a rewarded ad to walk 1.5× faster for 5 minutes. Watch again to add 5 minutes to the remaining time.' : 'Ödüllü reklamı izle, 5 dakika boyunca 1,5 kat hızlı yürü. Tekrar izleyerek kalan süreye 5 dakika ekleyebilirsin.')
        : (english ? `Watch a rewarded ad to permanently add 1 bag slot. Repeat up to ${20} slots total.` : 'Ödüllü reklamı izle, çanta kapasiten kalıcı olarak +1 artsın. Toplam 20 slota kadar tekrarlayabilirsin.');
    document.getElementById('btn-bonus-ad').textContent = speed
      ? (english ? 'Watch ad · +5 min' : 'Reklamı izle · +5 dk')
      : character
        ? (english ? `Watch ad · Unlock ${character.label.en}` : `Reklam izle · ${character.label.tr} karakterini aç`)
        : (english ? 'Watch ad · +1 slot' : 'Reklamı izle · +1 yer');
    document.getElementById('btn-bonus-decline').textContent = english ? 'Maybe later' : 'Şimdi değil';
    this.open('bonus-offer-modal');
  }

  close(id) {
    if (id === 'staff-candidates-modal') {
      this.open('expansion-modal');
      this.#selectUpgradeTab('staff');
      return;
    }
    if (id === 'bonus-offer-modal' && this.currentBonusOffer
      && this.app.getState().ads.pending?.placement !== 'bonus-offer') {
      this.app.dismissBonusOffer(this.currentBonusOffer.id);
      this.currentBonusOffer = null;
    }
    document.getElementById(id)?.classList.add('hidden');
    this.#notifyModalState();
  }

  closeAll() {
    if (!document.getElementById('bonus-offer-modal').classList.contains('hidden') && this.currentBonusOffer
      && this.app.getState().ads.pending?.placement !== 'bonus-offer') {
      this.app.dismissBonusOffer(this.currentBonusOffer.id);
      this.currentBonusOffer = null;
    }
    this.modals.forEach((id) => document.getElementById(id).classList.add('hidden'));
    this.#notifyModalState();
  }

  #notifyModalState() {
    const open = this.modals.some((id) => !document.getElementById(id).classList.contains('hidden'));
    this.onModalChange(open);
  }

  #selectSettingsTab(tab) {
    document.querySelectorAll('.settings-tab').forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
    document.querySelectorAll('.settings-content').forEach((panel) => panel.classList.toggle('hidden', panel.dataset.panel !== tab));
  }

  #selectUpgradeTab(tab) {
    document.querySelectorAll('[data-upgrade-tab]').forEach((button) => {
      const active = button.dataset.upgradeTab === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-upgrade-panel]').forEach((panel) => panel.classList.toggle('hidden', panel.dataset.upgradePanel !== tab));
  }

  #syncSettings(state) {
    if (this.elements['setting-sound']) this.elements['setting-sound'].checked = state.settings.sound;
    if (this.elements['setting-haptics']) this.elements['setting-haptics'].checked = state.settings.haptics;
    if (this.elements['setting-autopickup']) this.elements['setting-autopickup'].checked = Boolean(state.settings.autoPickup);
    document.querySelectorAll('[data-character]').forEach((button) => {
      const characterId = button.dataset.character;
      const unlocked = state.player.unlockedCharacters.includes(characterId);
      const adReady = unlocked || this.app.canOfferRewardedAd('character-unlock', { characterId });
      const active = characterId === state.player.character;
      button.classList.toggle('active', active);
      button.classList.toggle('locked', !unlocked);
      button.disabled = !adReady;
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', unlocked
        ? (state.settings.language === 'en' ? `Select ${PLAYER_CHARACTERS[characterId].label.en}` : `${PLAYER_CHARACTERS[characterId].label.tr} karakterini seç`)
        : (state.settings.language === 'en' ? `Watch an ad to unlock ${PLAYER_CHARACTERS[characterId].label.en}` : `Reklam izleyerek ${PLAYER_CHARACTERS[characterId].label.tr} karakterini aç`));
      const stateLabel = button.querySelector('[data-character-state]');
      if (stateLabel) stateLabel.textContent = unlocked
        ? (state.settings.language === 'en' ? (active ? 'Selected' : 'Select') : (active ? 'Seçili' : 'Seç'))
        : (state.settings.language === 'en' ? (adReady ? 'Watch ad' : 'Ad unavailable') : (adReady ? 'Reklamla aç' : 'Reklam hazır değil'));
    });
    document.querySelectorAll('[data-language]').forEach((button) => button.classList.toggle('active', button.dataset.language === state.settings.language));
  }

  render(state, action, force = false) {
    const language = state.settings.language;
    this.#applyLanguage(language);
    const balance = state.economy.balanceAtoms / 10_000;
    const moneyLabel = `$${balance.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 2 })}`;
    if (this.elements['money-display']) this.elements['money-display'].textContent = moneyLabel;
    if (this.elements.moneyPill) this.elements.moneyPill.classList.toggle('compact', moneyLabel.length >= 8);
    if (this.elements['day-display']) {
      this.elements['day-display'].textContent = language === 'en'
        ? `Day ${gameDayNumber(state.tick)}` : `Gün ${gameDayNumber(state.tick)}`;
    }
    const playerCount = Object.values(state.stock.player.items).reduce((sum, count) => sum + count, 0);
    if (this.elements['stack-display']) this.elements['stack-display'].textContent = `${playerCount} / ${state.player.capacity}`;
    const walkSpeedRemaining = this.app.getWalkSpeedBonusRemainingMs();
    const walkSpeedBadge = this.elements['walk-speed-buff'];
    if (walkSpeedBadge) {
      walkSpeedBadge.classList.toggle('hidden', walkSpeedRemaining <= 0);
      if (walkSpeedRemaining > 0) {
        const seconds = Math.ceil(walkSpeedRemaining / 1000);
        const timer = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
        walkSpeedBadge.textContent = `${language === 'en' ? 'Walk x1.5' : 'Yürüyüş x1,5'} · ${timer}`;
      }
    }
    if (this.elements['customer-count']) this.elements['customer-count'].textContent = String(state.customers.length);
    if (this.elements['worker-count']) this.elements['worker-count'].textContent = String(state.workers.length);
    let shelfTotal = 0;
    for (const [id, stock] of Object.entries(state.stock)) if (id.startsWith('shelf:')) shelfTotal += Object.values(stock.items).reduce((a, b) => a + b, 0);
    if (this.elements['shelf-count']) this.elements['shelf-count'].textContent = String(shelfTotal);
    const reviews = state.stats.customersSatisfied + state.stats.customersUnhappy;
    const satisfaction = reviews ? Math.round(state.stats.customersSatisfied / reviews * 100) : null;
    if (this.elements['mood-count']) this.elements['mood-count'].textContent = satisfaction === null ? '—' : `${satisfaction}%`;
    if (this.elements['business-toggle-score']) this.elements['business-toggle-score'].textContent = satisfaction === null ? '—' : `${satisfaction}%`;
    const order = state.activeOrder;
    const orderCard = this.elements['order-card'];
    if (orderCard) orderCard.classList.toggle('hidden', !order);
    if (order) {
      const held = orderProgress(state);
      const itemName = language === 'en' ? this.#itemNameEnglish(order.item, ITEMS[order.item].name) : ITEMS[order.item].name;
      if (this.elements['order-item']) this.elements['order-item'].innerHTML = `${assetIconMarkup(ITEMS[order.item].icon, 28)} ${itemName} × ${order.quantity}`;
      if (this.elements['order-reward']) this.elements['order-reward'].textContent = `+$${order.reward}`;
      if (this.elements['order-progress']) this.elements['order-progress'].textContent = `${held} / ${order.quantity}`;
      if (this.elements['order-progress-fill']) this.elements['order-progress-fill'].style.width = `${held / order.quantity * 100}%`;
      if (this.elements['btn-deliver-order']) this.elements['btn-deliver-order'].disabled = held < order.quantity;
      if (this.elements['order-bonus-progress']) {
        this.elements['order-bonus-progress'].textContent = language === 'en'
          ? `${state.ordersCompleted % 3}/3 toward a $20 decor voucher`
          : `$20 dekor kuponuna ${state.ordersCompleted % 3}/3`;
      }
    }
    const score = decorScore(state);
    const bonus = decorBonus(state);
    if (this.elements['decor-score']) this.elements['decor-score'].textContent = `${score} · +${(bonus * 100).toFixed(1)}%`;
    this.renderDecorations(state);
    if (this.elements['quest-text']) this.elements['quest-text'].textContent = this.#questText(state, language);
    if (this.elements['progress-count']) this.elements['progress-count'].textContent = `${state.completedUpgrades.length} / ${UPGRADES.length}`;
    if (this.elements['progress-fill']) this.elements['progress-fill'].style.width = `${Math.min(100, state.completedUpgrades.length / UPGRADES.length * 100)}%`;
    const actionButton = this.elements['btn-interact'];
    const actionLabel = this.elements['action-label'];
    if (actionButton) actionButton.disabled = !action || action.actionable === false;
    if (actionLabel) actionLabel.textContent = action ? this.#actionText(action, state) : (language === 'en' ? 'Move closer to a station' : 'Bir istasyona yaklaş');
    if (this.elements['upgrade-count']) this.elements['upgrade-count'].textContent = String(this.app.getAvailableUpgrades().length);
    this.renderAdOffers(state, action);
    this.#syncSettings(state);
    const signature = `${state.revision}:${balance}:${this.app.getAvailableUpgrades().map((upgrade) => upgrade.id).join(',')}:${state.completedUpgrades.join(',')}:${state.workers.map((worker) => worker.type).join(',')}:${Object.keys(state.layout ?? {}).length}:${Object.keys(state.selfRegisters ?? {}).length}`;
    if (force || signature !== this.lastUpgradeSignature) {
      this.lastUpgradeSignature = signature;
      this.renderUpgrades(state);
      this.renderStaff(state);
    }
    this.updateStaffNeeds(state);
    if (force) this.renderInventory(state, true);
  }

  renderAdOffers(state, action) {
    const english = state.settings.language === 'en';
    const orderOffer = this.elements['order-ad-offer'];
    const orderReward = state.lastOrderReward;
    const orderReady = Boolean(orderReward && !orderReward.claimed
      && this.app.canOfferRewardedAd('order-double', { orderId: orderReward.id }));
    if (orderOffer) orderOffer.classList.toggle('hidden', !orderReady);
    if (orderReady) {
      this.app.markRewardedOfferShown('order-double', { orderId: orderReward.id });
      if (this.elements['order-ad-copy']) {
        this.elements['order-ad-copy'].textContent = english
          ? `Watch a rewarded ad to double this order bonus (+$${orderReward.reward}).`
          : `Ödüllü reklamı izle, bu sipariş kazancını ikiye katla (+$${orderReward.reward}).`;
      }
      if (this.elements['btn-order-ad']) {
        this.elements['btn-order-ad'].dataset.adOrder = orderReward.id;
        const adLabel = this.app.isRewardedAdSimulated()
          ? (english ? 'Wait 3 sec · ' : '3 sn bekle · ')
          : (english ? 'Watch · ' : 'İzle · ');
        this.elements['btn-order-ad'].textContent = `${adLabel}+$${orderReward.reward}`;
      }
    }

    const machineOffer = this.elements['machine-ad-offer'];
    const machine = action?.kind === 'machine' ? state.machines[action.id] : null;
    const supplierPayload = machine ? { machineId: action.id } : null;
    const supplierReady = Boolean(!orderReady && supplierPayload
      && this.app.canOfferRewardedAd('supplier-drop', supplierPayload));
    if (machineOffer) machineOffer.classList.toggle('hidden', !supplierReady);
    this.currentSupplierMachineId = supplierReady ? action.id : null;
    if (supplierReady) {
      const recipe = RECIPES[machine.recipe ?? STATIONS[action.id]?.recipe];
      const input = state.stock[`machine:${action.id}:input`];
      const incoming = {};
      for (const reservation of Object.values(state.reservations)) {
        if (reservation.to === `machine:${action.id}:input`) {
          incoming[reservation.item] = (incoming[reservation.item] ?? 0) + reservation.quantity;
        }
      }
      const missing = Object.entries(recipe.inputs)
        .map(([item, amount]) => [item, Math.max(0, amount - (input.items[item] ?? 0) - (incoming[item] ?? 0))])
        .filter(([, amount]) => amount > 0);
      const supplies = missing.map(([item, amount]) => `${amount} ${ITEMS[item].name}`).join(' + ');
      this.app.markRewardedOfferShown('supplier-drop', supplierPayload);
      if (this.elements['machine-ad-copy']) {
        this.elements['machine-ad-copy'].textContent = english
          ? `Machine stopped for missing inputs. Watch to deliver ${supplies} for one recipe batch.`
          : `Makine girdisiz durdu. Bir tariflik ${supplies} girdiyi reklamla al.`;
      }
      if (this.elements['btn-machine-ad']) {
        this.elements['btn-machine-ad'].dataset.adMachine = action.id;
        this.elements['btn-machine-ad'].textContent = this.app.isRewardedAdSimulated()
          ? (english ? 'Wait 3 sec · Get inputs' : '3 sn bekle · Girdiyi al')
          : (english ? 'Watch and get inputs' : 'İzle ve girdiyi al');
      }
    }
  }

  #applyLanguage(language) {
    if (language === this.lastLanguage) return;
    this.lastLanguage = language;
    const english = language === 'en';
    document.title = english ? 'Seed to Serve: Market Tycoon' : 'Tohumdan Sofraya: Market Oyunu';
    document.getElementById('game-container').setAttribute('aria-label', english ? 'Seed to Serve game world' : 'Tohumdan Sofraya oyun dünyası');
    document.querySelector('.business-heading strong').textContent = english ? EN.business : 'İŞLETME';
    document.querySelector('.business-heading small').textContent = english ? EN.live : 'CANLI';
    document.querySelectorAll('.business-row')[0].children[0].innerHTML = `${assetIconMarkup('customers', 28)} ${english ? EN.customers : 'Müşteriler'}`;
    document.querySelectorAll('.business-row')[1].children[0].innerHTML = `${assetIconMarkup('staff', 28)} ${english ? EN.workers : 'Çalışanlar'}`;
    document.querySelectorAll('.business-row')[2].children[0].innerHTML = `${assetIconMarkup('stock', 28)} ${english ? EN.shelfStock : 'Reyon stoğu'}`;
    document.getElementById('mood-label').innerHTML = `${assetIconMarkup('satisfied', 28)} ${english ? 'Satisfaction' : 'Memnuniyet'}`;
    const orderTitle = document.getElementById('order-title');
    const orderCard = document.getElementById('order-card');
    const orderToggle = document.getElementById('btn-order-toggle');
    const orderCollapsed = orderCard.classList.contains('collapsed');
    orderTitle.textContent = english ? 'CUSTOMER ORDER' : 'MÜŞTERİ SİPARİŞİ';
    orderTitle.dataset.shortLabel = english ? 'ORDER' : 'SİPARİŞ';
    orderToggle.setAttribute('aria-expanded', String(!orderCollapsed));
    orderToggle.setAttribute('aria-label', english
      ? (orderCollapsed ? 'Expand customer order' : 'Collapse customer order')
      : (orderCollapsed ? 'Sipariş ayrıntılarını aç' : 'Sipariş ayrıntılarını kapat'));
    orderToggle.innerHTML = assetIconMarkup(orderCollapsed ? 'chevronDown' : 'chevronUp', 18);
    document.getElementById('btn-deliver-order').textContent = english ? 'Deliver order' : 'Siparişi teslim et';
    document.getElementById('btn-inventory').innerHTML = `<span>${english ? EN.viewProducts : 'Ürünleri gör'}</span> ${assetIconMarkup('chevronRight', 18)}`;
    document.querySelector('#btn-settings').setAttribute('aria-label', english ? EN.settings : 'Ayarlar');
    document.getElementById('btn-expansions').setAttribute('aria-label', english ? EN.upgrades : 'İşletme geliştirmeleri');
    document.getElementById('btn-decor-top').setAttribute('aria-label', english ? 'Decoration shop' : 'Dekorasyon mağazası');
    document.getElementById('btn-decor-top').title = english ? 'Decoration shop' : 'Dekorasyon mağazası';
    document.getElementById('btn-decor').innerHTML = `<span>${assetIconMarkup('decoration', 26)} ${english ? 'Decoration shop' : 'Dekorasyon mağazası'}</span> ${assetIconMarkup('chevronRight', 18)}`;
    document.getElementById('decor-title').textContent = english ? 'Decoration shop' : 'Dekorasyon mağazası';
    document.getElementById('decor-intro').textContent = english
      ? 'Add decorative pieces to your market and farm. Each placed piece adds style and a small sales bonus.'
      : 'Mağazana ve çiftliğine dekorasyon ekle. Yerleştirilen her parça tarz katar ve satış kârını artırır.';
    document.getElementById('decor-score-caption').textContent = english
      ? 'Decorations make your farm and market more welcoming.'
      : 'Dekorasyonlar çiftliğini ve mağazanı daha davetkâr yapar.';
    document.querySelector('.decor-score-row > span').innerHTML = `${assetIconMarkup('decorScore', 24)} ${english ? 'Decor score' : 'Dekor puanı'}`;
    document.querySelector('.quest-copy .eyebrow').textContent = english ? EN.nextGoal : 'SIRADAKİ HEDEF';
    document.querySelector('#inventory-title').textContent = english ? EN.inventory : 'Ürünler';
    document.querySelector('#settings-title').textContent = english ? EN.settings : 'Ayarlar';
    document.querySelector('.settings-content[data-panel="language"] .modal-intro').textContent = english ? EN.language : 'Arayüz dili';
    document.querySelector('.settings-tabs [data-tab="general"]').textContent = english ? EN.general : 'Genel';
    document.querySelector('.settings-tabs [data-tab="character"]').textContent = english ? EN.character : 'Karakter';
    document.querySelector('.settings-tabs [data-tab="language"]').textContent = english ? 'Language' : 'Dil';
    document.querySelector('.settings-tabs [data-tab="debug"]').textContent = english ? EN.developer : 'Geliştirici';
    const generalLabels = english
      ? [EN.sound, EN.haptics, EN.autoPickup]
      : ['Ses efektleri', 'Dokunsal geri bildirim', 'Otomatik üstüne alma'];
    document.querySelectorAll('.settings-content[data-panel="general"] .setting-row span').forEach((node, index) => {
      if (generalLabels[index]) node.textContent = generalLabels[index];
    });
    document.querySelector('.settings-content[data-panel="general"] .setting-note').textContent = english ? EN.backgroundNote : 'Oyun arka plana geçtiğinde simülasyon durur. Döndüğünde kaldığın yerden devam eder.';
    document.getElementById('btn-reset').textContent = english ? EN.resetGame : 'Yeni oyuna başla';
    document.querySelector('.settings-content[data-panel="character"] .modal-intro').textContent = english ? 'Choose your character' : 'Oyuncu karakterini seç';
    document.querySelectorAll('[data-character-label]').forEach((node) => {
      const characterId = node.closest('[data-character]').dataset.character;
      node.textContent = PLAYER_CHARACTERS[characterId].label[language];
    });
    document.getElementById('btn-recovery-reset').textContent = english ? 'Erase saves and start a new game' : 'Yedekleri sil ve yeni oyun başlat';
    document.querySelector('#expansion-modal .modal-header .eyebrow').textContent = english ? EN.grow : 'İŞLETMEYİ BÜYÜT';
    document.querySelector('#settings-modal .modal-header .eyebrow').textContent = english ? 'GAME MENU' : 'OYUN MENÜSÜ';
    document.querySelector('#inventory-modal .modal-header .eyebrow').textContent = english ? EN.stock : 'STOK DURUMU';
    document.querySelector('#expansion-modal .modal-intro').textContent = english
      ? 'Invest earnings in production and staff. Every purchase adds a station to the world.'
      : 'Kazancını yeni üretim hatlarına ve ekibe yatır. Açılan her istasyon dünyaya eklenir.';
    document.querySelector('[data-upgrade-tab="business"]').textContent = english ? EN.businessTab : 'İşletme';
    document.querySelector('[data-upgrade-tab="staff"]').textContent = english ? EN.staffTab : 'Personel';
    document.querySelector('.control-hint span').textContent = english ? EN.orTap : 'veya dokunup yürü';
    document.getElementById('btn-resume').textContent = english ? EN.resume : 'Oyuna dön';
    document.getElementById('expansion-title').textContent = english ? EN.newUpgrades : 'Yeni geliştirmeler';
  }

  #questText(state, language) {
    if (language !== 'en') return state.quest;
    if (!state.unlocked.paste) return 'Make your first tomato sale to unlock the paste kitchen.';
    if (state.stats.pasteSold === 0) return 'Load two tomatoes into the paste vat, stock the shelf, and make a sale.';
    if (!state.unlocked.orange) return 'Open the orange grove and juicer.';
    if (state.stats.juiceSold === 0) return 'Harvest oranges, make juice, and stock its shelf.';
    if (!state.unlocked.corn) return 'Open the corn field and shelf.';
    if (state.stats.cornSold === 0) return 'Harvest corn, stock its shelf, and sell it.';
    if (!state.unlocked.popcorn) return 'Open the popcorn machine.';
    if (state.stats.popcornSold === 0) return 'Load corn, make popcorn, and sell it.';
    if (!state.unlocked.feed) return 'Open the chicken feed mill.';
    if (state.stats.feedProduced === 0) return 'Load corn into the mill and make chicken feed.';
    if (!state.unlocked.coop) return 'Open the chicken coop.';
    if (state.stats.eggSold === 0) return 'Feed the coop, collect eggs, and sell one.';
    if (!state.unlocked.bakery) return 'Open the wheat field and stone oven.';
    if (state.stats.breadSold === 0) return 'Bake bread from two wheat and one egg, then sell it.';
    if (!state.unlocked.restaurant) return 'Open the gourmet restaurant.';
    if (!state.unlocked.chefWaiter) return 'Cook a burger or pizza, serve a guest, and collect a tip.';
    return 'Well done! Your market and gourmet restaurant are open.';
  }

  renderUpgrades(state) {
    const staffIds = new Set(STAFF_HIRES.map((entry) => entry.upgradeId));
    const upgrades = this.app.getAvailableUpgrades().filter((upgrade) => !staffIds.has(upgrade.id));
    const list = this.elements['upgrade-list'];
    const english = state.settings.language === 'en';
    const expansionCards = upgrades.map((upgrade) => {
      const affordable = state.economy.balanceAtoms >= upgrade.price * 10_000;
      const title = english ? this.#upgradeNameEnglish(upgrade.id, upgrade.title) : upgrade.title;
      return `<article class="upgrade-card"><div class="upgrade-icon">${assetIconMarkup(UPGRADE_ICONS[upgrade.id] ?? 'decorScore', 38)}</div><div class="upgrade-copy"><strong>${title}</strong><small>${english ? 'Unlock a new production step' : 'Yeni bir üretim aşaması aç'}</small></div><button class="buy-button" data-buy-upgrade="${upgrade.id}" ${affordable ? '' : 'disabled'}>$${upgrade.price}</button></article>`;
    }).join('');
    const farmCards = this.#farmUnlockCards(state);
    const machineCards = Object.entries(state.machines).filter(([id]) => STATIONS[id]?.kind === 'machine').map(([id, machine]) => {
      const level = machine.upgradeLevel ?? 0;
      const currentSeconds = machineProductionSeconds(id, level);
      const nextSeconds = machineProductionSeconds(id, level + 1);
      const speedGain = percentGain(machineSpeedMultiplier(level), machineSpeedMultiplier(level + 1));
      const cost = machineUpgradeCost(id, level);
      const affordable = state.economy.balanceAtoms >= cost * 10_000;
      const title = english ? this.#upgradeNameEnglish(id, STATIONS[id].title) : STATIONS[id].title;
      const number = (value) => value.toLocaleString(english ? 'en-US' : 'tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
      return `<article class="upgrade-card machine-upgrade-card">
        <div class="upgrade-icon">${assetIconMarkup('machine', 38)}</div><div class="upgrade-copy">
          <strong>${title}</strong><small>${english ? `Level ${level + 1} · ${number(currentSeconds)}s → ${number(nextSeconds)}s · +${speedGain.toFixed(2)}% speed` : `Seviye ${level + 1} · ${number(currentSeconds)} sn → ${number(nextSeconds)} sn · +%${speedGain.toFixed(2)} hız`}</small>
          <small>${english ? 'Small permanent production-time reduction' : 'Kalıcı ve küçük üretim süresi azalması'}</small>
        </div><button class="buy-button" data-upgrade-machine="${id}" ${affordable ? '' : 'disabled'}>${english ? 'Upgrade' : 'Geliştir'} · $${cost}</button>
      </article>`;
    }).join('');
    const sections = [
      expansionCards ? `<h2 class="upgrade-section-title">${english ? 'New capacity' : 'Yeni kapasite'}</h2>${expansionCards}` : '',
      farmCards,
      machineCards ? `<h2 class="upgrade-section-title">${english ? 'Machine progression' : 'Makine geliştirmeleri'}</h2>${machineCards}` : '',
    ].filter(Boolean).join('');
    list.innerHTML = sections || `<div class="empty-upgrades">${english ? EN.noUpgrade : 'Şimdilik yeni geliştirme yok. Yeni aşamalar satış yaptıkça açılır.'}</div>`;
  }

  #farmUnlockCards(state) {
    const english = state.settings.language === 'en';
    return FARM_AD_UPGRADE_IDS.map((id) => {
      const upgrade = UPGRADES.find((entry) => entry.id === id);
      const station = STATIONS[id];
      const icon = ITEMS[station?.item]?.icon ?? 'farm';
      const title = english ? this.#upgradeNameEnglish(id, `Second ${station?.item?.toLowerCase() ?? 'farm'} field`)
        : upgrade?.title ?? station?.title ?? id;
      const baseId = id.replace(/2$/, '');
      if (!state.farms[baseId]) return '';
      if (state.farms[id]) return `<article class="upgrade-card farm-ad-card hired"><div class="upgrade-icon">${assetIconMarkup(icon, 38)}</div><div class="upgrade-copy"><strong>${title}</strong><small>${english ? 'Permanently unlocked' : 'Kalıcı olarak açık'}</small></div><span class="ad-open-badge">${english ? 'Opened' : 'Açıldı'}</span></article>`;
      const available = state.availableUpgrades.includes(id);
      const payload = { upgradeId: id };
      const ready = available && this.app.canOfferRewardedAd('farm-unlock', payload);
      if (ready) this.app.markRewardedOfferShown('farm-unlock', payload);
      const buttonText = !available ? (english ? 'Locked by progress' : 'İlerleme bekleniyor')
        : !this.app.isRewardedAdReady('farm-unlock') ? (english ? 'AdMob setup pending' : 'AdMob bağlantısı bekleniyor')
          : (english ? 'Rewarded ad not ready' : 'Reklam şu anda hazır değil');
      const simulated = this.app.isRewardedAdSimulated();
      return `<article class="upgrade-card farm-ad-card"><div class="upgrade-icon">${assetIconMarkup(icon, 38)}</div><div class="upgrade-copy"><strong>${title}</strong><small>${simulated ? (english ? 'Development simulation · grants after 3 seconds.' : 'Geliştirme simülasyonu · 3 saniye sonra açılır.') : (english ? 'Unlock permanently by completing a rewarded ad.' : 'Ödüllü reklamı tamamlayarak kalıcı aç.')}</small></div>
        ${ready ? `<button class="buy-button ad-reward-button" data-ad-accept="farm-unlock" data-ad-upgrade="${id}">${simulated ? (english ? 'Wait 3 sec · Unlock' : '3 sn bekle · Aç') : (english ? 'Watch ad · Unlock' : 'Reklam izle · Aç')}</button>` : `<button class="buy-button" disabled>${buttonText}</button>`}
      </article>`;
    }).join('');
  }

  renderDecorations(state, force = false) {
    const signature = `${state.settings.language}:${state.economy.balanceAtoms}:${state.decorations?.length ?? 0}:${decorScore(state)}:${state.decorVouchers}`;
    if (!force && signature === this.lastDecorSignature) return;
    this.lastDecorSignature = signature;
    const english = state.settings.language === 'en';
    const score = decorScore(state);
    const bonus = decorBonus(state);
    const scoreLabel = english ? `${score} points · +${(bonus * 100).toFixed(1)}% sales` : `${score} puan · +${(bonus * 100).toFixed(1)}% satış`;
    if (this.elements['decor-shop-score']) this.elements['decor-shop-score'].textContent = scoreLabel;
    if (this.elements['decor-score-caption']) {
      this.elements['decor-score-caption'].textContent = state.decorVouchers
        ? (english ? `${state.decorVouchers} voucher(s): $20 off your next decoration.` : `${state.decorVouchers} kupon: sonraki dekorasyonda $20 indirim.`)
        : (english ? 'Decorations make your farm and market more welcoming.' : 'Dekorasyonlar çiftliğini ve mağazanı daha davetkâr yapar.');
    }
    if (this.elements['decor-score']) this.elements['decor-score'].textContent = `${score} · +${(bonus * 100).toFixed(1)}%`;
    if (this.elements['decor-list']) {
      this.elements['decor-list'].innerHTML = Object.entries(DECORATIONS).map(([id, item]) => {
        const owned = state.decorations.filter((entry) => entry.type === id).length;
        const name = item.name[state.settings.language];
        const price = decorationPrice(state, item.price);
        return `<article class="decor-item"><div class="decor-item-icon">${assetIconMarkup(this.#decorationIcon(id), 38)}</div><div class="upgrade-copy"><strong>${name}</strong><small>${assetIconMarkup('decorScore', 18)} +${item.score} ${english ? 'style points' : 'dekor puanı'} · ${owned} ${english ? 'placed' : 'mağazada'}</small></div><button class="buy-button" data-buy-decoration="${id}" ${state.economy.balanceAtoms < price * 10_000 ? 'disabled' : ''}>$ ${price}</button></article>`;
      }).join('');
    }
  }

  #decorationIcon(id) {
    return ({
      petalPlanter: 'planter',
      farmhouseSign: 'farmSign',
      orchardLantern: 'lamp',
      welcomeMat: 'welcomeMat',
      pennantBanner: 'pennant',
      harvestBasket: 'shoppingCart',
      citrusTopiary: 'orange',
      windowDisplay: 'flowers',
      cardboardBoxes: 'pallet',
      stoneWell: 'farm',
      scarecrow: 'workerAvatar',
      farmWindmill: 'farm',
      flowerTrellis: 'flowers',
      hayBales: 'pallet',
      harvestWagon: 'shoppingCart',
      roosterVane: 'farmSign',
      gardenPond: 'flowers',
    })[id] ?? 'decorScore';
  }

  renderStaff(state) {
    const list = this.elements['staff-list'];
    if (!list) return;
    const english = state.settings.language === 'en';
    const hireCards = STAFF_HIRES.map((hire) => {
      const hiredCount = state.workers.filter((worker) => hire.staffTypes.includes(worker.type)).length;
      const hired = hiredCount > 0 || state.completedUpgrades.includes(hire.upgradeId);
      const unlocked = state.availableUpgrades.includes(hire.upgradeId) && !state.completedUpgrades.includes(hire.upgradeId);
      const canHire = unlocked || state.completedUpgrades.includes(hire.upgradeId);
      const title = STAFF[hire.upgradeId]?.title ?? hire.staffTypes.map((type) => STAFF[type]?.title ?? type).join(' ve ');
      const englishTitle = hire.staffTypes.length > 1 ? 'Chef and waiter' : ({ cashier: 'Cashier', harvester: 'Harvester', factoryFeeder: 'Factory feeder', caretaker: 'Farm caretaker' })[hire.staffTypes[0]];
      const effect = state.settings.language === 'en' ? EN.staffEffect[hire.upgradeId] : hire.effect;
      const unlock = state.settings.language === 'en' ? EN.staffUnlock[hire.upgradeId] : hire.unlock;
      const subtitle = hired ? (state.settings.language === 'en' ? `On staff · ${hiredCount || hire.staffTypes.length}` : `Ekibinde · ${hiredCount || hire.staffTypes.length} kişi`)
        : unlocked ? effect : unlock;
      const salaryAtoms = staffDailySalaryAtoms(hire.staffTypes[0]);
      const salary = staffMoney(salaryAtoms, english);
      const salaryText = english
        ? `Base salary $${salary}/day${hire.staffTypes.length > 1 ? ' per person' : ''} · varies by candidate`
        : `Temel maaş $${salary}/gün${hire.staffTypes.length > 1 ? ' kişi başı' : ''} · adaya göre değişir`;
      const button = `<button class="buy-button" data-staff-candidates="${hire.upgradeId}" ${canHire ? '' : 'disabled'}>${canHire ? (english ? 'View 3 candidates' : '3 adayı gör') : (english ? 'Locked' : 'Kilitli')}</button>`;
      return `<article class="upgrade-card staff-card${hired ? ' hired' : ''}"><div class="upgrade-icon">${assetIconMarkup(STAFF[hire.staffTypes[0]]?.icon ?? 'workerAvatar', 50)}</div><div class="upgrade-copy"><strong>${english ? englishTitle : title}</strong><small>${subtitle}</small><small>${salaryText}</small></div>${button}</article>`;
    }).join('');
    const staffUpgrades = state.workers.map((worker) => {
      const level = worker.upgradeLevel ?? 0;
      const cost = staffUpgradeCost(worker.type === 'waiter' ? 'chefWaiter' : worker.type, level);
      const affordable = state.economy.balanceAtoms >= cost * MONEY_ATOMS;
      const archetype = STAFF_ARCHETYPES[worker.archetypeId];
      const currentSpeed = 3.4 * staffSpeedMultiplier(level) * (archetype?.speed ?? 1);
      const nextSpeed = 3.4 * staffSpeedMultiplier(level + 1) * (archetype?.speed ?? 1);
      const gain = percentGain(currentSpeed, nextSpeed);
      const title = english ? ({ cashier: 'Cashier', harvester: 'Harvester', factoryFeeder: 'Factory feeder', caretaker: 'Farm caretaker', chefWaiter: 'Chef', waiter: 'Waiter' })[worker.type] : (STAFF[worker.type]?.title ?? (worker.type === 'waiter' ? 'Garson' : worker.type));
      const number = (value) => value.toLocaleString(english ? 'en-US' : 'tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const salaryAtoms = worker.salaryAtoms ?? staffDailySalaryAtoms(worker.type);
      const salaryStatus = worker.waitingForSalary
        ? (english ? `Waiting for salary · $${number((worker.salaryDebtAtoms ?? 0) / MONEY_ATOMS)} due` : `Maaş bekliyor · $${number((worker.salaryDebtAtoms ?? 0) / MONEY_ATOMS)} ödenmemiş`)
        : (english ? `Salary $${number(salaryAtoms / MONEY_ATOMS)}/day` : `Maaş $${number(salaryAtoms / MONEY_ATOMS)}/gün`);
      const id = escapeMarkup(worker.id);
      const energy = staffNeed(worker.energy);
      const traits = archetype ? (english ? archetype.titleEn : archetype.title) : (english ? 'Experienced staff' : 'Mevcut personel');
      return `<article class="upgrade-card staff-upgrade-card${worker.waitingForSalary ? ' salary-waiting' : ''}"><div class="upgrade-icon">${assetIconMarkup(STAFF[worker.type]?.icon ?? 'workerAvatar', 50)}</div><div class="upgrade-copy"><strong>${escapeMarkup(worker.name ?? title)} · ${escapeMarkup(title)}</strong><small>${escapeMarkup(traits)} · ${english ? `Level ${level + 1} · base speed ${number(currentSpeed)} → ${number(nextSpeed)} units/s · +${gain.toFixed(2)}%` : `Seviye ${level + 1} · temel hız ${number(currentSpeed)} → ${number(nextSpeed)} birim/sn · +%${gain.toFixed(2)}`}</small><small>${salaryStatus}</small><div class="staff-energy"><span data-worker-energy-label="${id}">${english ? 'Energy' : 'Enerji'} ${energy}/100</span><progress data-worker-energy="${id}" max="100" value="${energy}" aria-label="${english ? 'Energy' : 'Enerji'}" ${energy <= 20 ? 'class="low-energy"' : ''}></progress></div><small data-worker-break="${id}">${staffBreakText(worker, english)}</small><small data-worker-needs="${id}">${this.staffNeedsText(worker, english)}</small></div><button class="buy-button" data-upgrade-staff="${id}" ${affordable ? '' : 'disabled'}>${english ? 'Upgrade' : 'Geliştir'} · $${cost}</button></article>`;
    }).join('');
    const landReady = !state.staffLandCleared && state.economy.balanceAtoms >= STAFF_LAND_PRICE * MONEY_ATOMS;
    const landCard = `<article class="upgrade-card staff-card"><div class="upgrade-icon">${assetIconMarkup('farm', 50)}</div><div class="upgrade-copy"><strong>${english ? 'North staff land' : 'Kuzey personel arsası'}</strong><small>${english ? 'Clear the land behind the market for staff facilities.' : 'Marketin arkasındaki alanı personel tesislerine aç.'}</small></div><button class="buy-button" data-staff-land ${landReady ? '' : 'disabled'}>${state.staffLandCleared ? (english ? 'Land cleared' : 'Arsa açıldı') : `${english ? 'Clear land' : 'Arsayı aç'} · $${STAFF_LAND_PRICE}`}</button></article>`;
    const facilities = Object.values(STAFF_FACILITIES).map((facility) => {
      const built = Boolean(state.staffFacilities?.[facility.id]);
      const ready = state.staffLandCleared && !built && state.economy.balanceAtoms >= facility.price * MONEY_ATOMS;
      const label = built ? (english ? 'Built' : 'İnşa edildi') : !state.staffLandCleared ? (english ? 'Clear land first' : 'Önce arsayı aç') : `${english ? 'Build' : 'İnşa et'} · $${facility.price}`;
      return `<article class="upgrade-card staff-card${built ? ' hired' : ''}"><div class="upgrade-icon">${assetIconMarkup(facility.id === 'kitchen' ? 'chef' : 'staff', 50)}</div><div class="upgrade-copy"><strong>${english ? facility.titleEn : facility.title}</strong><small>${english ? facility.effectEn : facility.effect}</small><small>${english ? 'Capacity' : 'Kapasite'}: ${facility.capacity}</small></div><button class="buy-button" data-staff-facility="${facility.id}" ${ready ? '' : 'disabled'}>${label}</button></article>`;
    }).join('');
    list.innerHTML = `<h2 class="upgrade-section-title">${english ? 'Hire new staff' : 'Yeni personel al'}</h2>${hireCards}${staffUpgrades ? `<h2 class="upgrade-section-title">${english ? 'Your team' : 'Ekibin'}</h2>${staffUpgrades}` : ''}<h2 class="upgrade-section-title">${english ? 'North staff facilities' : 'Kuzey personel tesisleri'}</h2><p class="staff-facility-note">${english ? 'Tired staff work more slowly without facilities. Facilities restore their needs during breaks.' : 'Tesisler yokken yorgun personel daha yavaş çalışır. Tesislerde mola vererek ihtiyaçlarını yeniler.'}</p>${landCard}${facilities}`;
  }

  staffNeedsText(worker, english) {
    return english ? `Fullness ${staffNeed(worker.hunger)} · morale ${staffNeed(worker.morale)} · comfort ${staffNeed(worker.comfort)}`
      : `Tokluk ${staffNeed(worker.hunger)} · moral ${staffNeed(worker.morale)} · rahatlık ${staffNeed(worker.comfort)}`;
  }

  updateStaffNeeds(state) {
    const list = this.elements['staff-list'];
    if (!list?.querySelectorAll) return;
    const workers = new Map(state.workers.map((worker) => [String(worker.id), worker]));
    const english = state.settings.language === 'en';
    for (const progress of list.querySelectorAll('[data-worker-energy]')) {
      const worker = workers.get(progress.dataset.workerEnergy);
      if (!worker) continue;
      progress.value = staffNeed(worker.energy);
      progress.classList.toggle('low-energy', progress.value <= 20);
    }
    for (const label of list.querySelectorAll('[data-worker-energy-label]')) {
      const worker = workers.get(label.dataset.workerEnergyLabel);
      if (worker) label.textContent = `${english ? 'Energy' : 'Enerji'} ${staffNeed(worker.energy)}/100`;
    }
    for (const label of list.querySelectorAll('[data-worker-break]')) {
      const worker = workers.get(label.dataset.workerBreak);
      if (worker) label.textContent = staffBreakText(worker, english);
    }
    for (const label of list.querySelectorAll('[data-worker-needs]')) {
      const worker = workers.get(label.dataset.workerNeeds);
      if (worker) label.textContent = this.staffNeedsText(worker, english);
    }
  }

  renderStaffCandidates(state, role) {
    const list = this.elements['staff-candidate-list'];
    if (!list) return;
    const english = state.settings.language === 'en';
    const hire = STAFF_HIRES.find((entry) => entry.upgradeId === role);
    const bundle = (hire?.staffTypes.length ?? 1) > 1;
    if (this.elements['staff-candidate-eyebrow']) this.elements['staff-candidate-eyebrow'].textContent = english ? 'STAFF' : 'PERSONEL';
    if (this.elements['staff-candidate-title']) this.elements['staff-candidate-title'].textContent = english ? 'Choose your staff' : 'Personelini seç';
    if (this.elements['staff-candidate-intro']) this.elements['staff-candidate-intro'].textContent = bundle
      ? (english ? 'Choose a chef and waiter team. The hiring fee covers both; salary is per person. Closing keeps the same candidates.' : 'Şef ve garson ekibini seç. İşe alım ücreti ikisini kapsar; maaş kişi başıdır. Kapatınca adaylar değişmez.')
      : (english ? 'Compare three candidates. Payment is taken only when you hire. Closing keeps the same candidates.' : 'Üç adayı karşılaştır. Yalnızca işe alınca ödeme yapılır. Kapatınca adaylar değişmez.');
    list.innerHTML = (state.staffCandidates?.[role] ?? []).map((candidate) => {
      const archetype = STAFF_ARCHETYPES[candidate.archetypeId];
      const affordable = state.economy.balanceAtoms >= candidate.hireCostAtoms;
      return `<article class="staff-candidate-card"><div class="staff-candidate-heading">${assetIconMarkup(STAFF[hire?.staffTypes[0]]?.icon ?? 'workerAvatar', 44)}<div><h2>${escapeMarkup(candidate.name)}</h2><strong>${escapeMarkup(english ? archetype?.titleEn : archetype?.title)}</strong></div></div><p>${escapeMarkup(english ? archetype?.effectEn : archetype?.effect)}</p><div class="staff-candidate-costs"><span>${english ? 'Daily salary' : 'Günlük maaş'}${bundle ? (english ? ' / person' : ' / kişi') : ''}<strong>$${staffMoney(candidate.salaryAtoms, english)}</strong></span><span>${english ? 'Hiring fee' : 'İşe alım ücreti'}<strong>$${staffMoney(candidate.hireCostAtoms, english)}</strong></span></div><button class="buy-button" data-hire-candidate="${escapeMarkup(candidate.id)}" data-candidate-role="${escapeMarkup(role)}" ${affordable ? '' : 'disabled'}>${affordable ? (english ? 'Hire' : 'İşe al') : (english ? 'Insufficient funds' : 'Bakiye yetersiz')}</button></article>`;
    }).join('');
  }

  #upgradeNameEnglish(id, fallback) {
    const names = {
      tomatoFarm2: 'Second tomato field', cornFarm2: 'Second corn field', wheatFarm2: 'Second wheat field',
      cashier: 'Hire a cashier', paste: 'Tomato paste kitchen', harvester: 'Hire a harvester',
      orange: 'Orange grove and juicer', factoryFeeder: 'Hire a factory feeder', orangeFarm2: 'Second orange grove',
      corn: 'Corn field and shelf', popcorn: 'Popcorn machine and shelf', feed: 'Chicken feed grinder',
      coop: 'Chicken coop and egg shelf', chicken2: 'Second chicken', chicken3: 'Third chicken',
      caretaker: 'Hire a farm caretaker', bakery: 'Wheat field and stone oven',
      flourMill: 'Flour mill and shelf', orangeTartKitchen: 'Orange tart pastry kitchen',
      restaurant: 'Gourmet restaurant', chefWaiter: 'Hire chef and waiter',
    };
    return names[id] ?? fallback;
  }

  #actionText(action, state) {
    if (state.settings.language !== 'en') return action.label;
    if (action.kind === 'upgrade') return `${this.#upgradeNameEnglish(action.id, action.title)} · $${action.price}`;
    if (action.kind === 'trashBin') {
      if (action.actionable !== false) return 'Discard bag items';
      return action.label.includes('ayrılmış') ? 'Items reserved for staff' : 'Bag is empty';
    }
    if (action.kind === 'farm') {
      if (action.actionable === false) return action.label === 'Çanta dolu' ? 'Bag full' : 'Crops growing';
      const names = { TOMATO: 'Harvest tomatoes', ORANGE: 'Harvest oranges', CORN: 'Harvest corn', WHEAT: 'Harvest wheat' };
      return names[action.item] ?? 'Harvest';
    }
    if (action.kind === 'machine') {
      const outputItems = {
        paste: 'TOMATO_PASTE', juice: 'ORANGE_JUICE', popcorn: 'POPCORN', feed: 'CHICKEN_FEED',
        bakery: 'BREAD', flourMill: 'FLOUR', orangeTartKitchen: 'ORANGE_TART',
        burgerKitchen: 'BURGER', pizzaKitchen: 'PIZZA',
      };
      const outputId = outputItems[action.id];
      return state.stock[`machine:${action.id}:output`]?.items?.[outputId] ? 'Collect product' : 'Load ingredients';
    }
    if (action.kind === 'shelf') {
      if (state.stock.player.items[action.item]) return 'Restock shelf';
      return state.stock[SHELVES[action.item].id]?.items?.[action.item] ? 'Collect product' : 'Shelf empty';
    }
    if (action.kind === 'coop') return state.stock['coop:eggs']?.items?.EGG ? 'Collect eggs' : 'Add chicken feed';
    if (action.kind === 'table') {
      const table = state.diningTables[action.id];
      return table?.tipAtoms ? 'Collect tip' : table?.customerId ? 'Serve meal' : `Table ${action.id.slice(-1)}`;
    }
    if (action.kind === 'register') return 'Register';
    return action.label;
  }

  renderInventory(state, force = false) {
    const items = new Map();
    for (const [item, count] of Object.entries(state.stock.player.items)) if (count > 0) items.set(item, { carried: count, shelf: 0, machine: 0 });
    for (const [location, stock] of Object.entries(state.stock)) {
      if (!location.startsWith('shelf:') && !location.startsWith('machine:')) continue;
      for (const [item, count] of Object.entries(stock.items)) {
        const entry = items.get(item) ?? { carried: 0, shelf: 0, machine: 0 };
        if (location.startsWith('shelf:')) entry.shelf += count;
        else entry.machine += count;
        items.set(item, entry);
      }
    }
    const signature = JSON.stringify([...items.entries()]);
    if (!force && signature === this.lastInventorySignature) return;
    this.lastInventorySignature = signature;
    const list = this.elements['inventory-list'];
    if (!items.size) {
      list.innerHTML = `<div class="empty-upgrades">${state.settings.language === 'en' ? 'No goods in stock yet.' : 'Henüz stokta ürün yok.'}</div>`;
      return;
    }
    list.innerHTML = [...items.entries()].map(([itemId, amounts]) => {
      const item = ITEMS[itemId];
      const total = amounts.carried + amounts.shelf + amounts.machine;
      const stockLabel = state.settings.language === 'en' ? `bag ${amounts.carried} · shelves ${amounts.shelf} · machines ${amounts.machine}` : `çanta ${amounts.carried} · raf ${amounts.shelf} · makine ${amounts.machine}`;
      return `<div class="inventory-row"><span>${assetIconMarkup(item.icon, 34)} ${state.settings.language === 'en' ? this.#itemNameEnglish(itemId, item.name) : item.name}<small>${stockLabel}</small></span><strong>${total}</strong></div>`;
    }).join('');
  }

  #itemNameEnglish(itemId, fallback) {
    return ({
      TOMATO: 'Tomato', TOMATO_PASTE: 'Tomato paste', ORANGE: 'Orange', ORANGE_JUICE: 'Orange juice',
      CORN: 'Corn', POPCORN: 'Popcorn', CHICKEN_FEED: 'Chicken feed', EGG: 'Egg', WHEAT: 'Wheat',
      FLOUR: 'Flour', BREAD: 'Bread', ORANGE_TART: 'Orange tart', BURGER: 'Gourmet burger', PIZZA: 'Pizza',
    })[itemId] ?? fallback;
  }

  toast(message, tone = 'success', iconId = null) {
    this.toasts.toast(message, tone, iconId);
  }

  showEvent(event) {
    this.toasts.showEvent(event);
  }

  showRecovery(message) {
    document.getElementById('recovery-message').textContent = message;
    this.open('recovery-modal');
  }
}

import { ITEMS, SHELVES, STAFF, STAFF_HIRES, UPGRADES } from '../domain/catalog.js';
import { FURNITURE_TYPES, getFurnitureCount, getFurniturePrice, getStaffCount, getStaffHirePrice, isFurnitureUnlocked } from '../domain/furnitureCatalog.js';
import { DECORATIONS, decorBonus, decorScore } from '../domain/decorCatalog.js';
import { decorationPrice, orderProgress } from '../domain/orders.js';

const UPGRADE_ICONS = {
  tomatoFarm2: '🍅', cashier: '🧑‍💼', paste: '🥫', harvester: '🧑‍🌾', orange: '🍊',
  factoryFeeder: '🧑‍🔧', orangeFarm2: '🍊', corn: '🌽', popcorn: '🍿', feed: '🌾',
  coop: '🐔', chicken2: '🐔', chicken3: '🐔', caretaker: '🧑‍🌾', bakery: '🍞',
  restaurant: '🍽️', chefWaiter: '🧑‍🍳',
};

const EN = {
  business: 'BUSINESS', customers: 'Customers', workers: 'Staff', shelfStock: 'Shelf stock',
  viewProducts: 'View products', upgrades: 'Business upgrades', settings: 'Settings',
  nextGoal: 'NEXT GOAL', inventory: 'Inventory', language: 'Interface language',
  normal: 'Normal speed', resume: '▶ Resume game', noUpgrade: 'No upgrades available right now. Make a sale to unlock the next step.',
  live: 'LIVE', grow: 'GROW YOUR BUSINESS', newUpgrades: 'New upgrades', stock: 'STOCK STATUS',
  general: 'General', character: 'Character', developer: 'Developer', sound: 'Sound effects',
  haptics: 'Haptic feedback', backgroundNote: 'The simulation pauses while the app is in the background. Tap resume when you return.',
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

export class HUD {
  constructor(app, input, onModalChange = () => {}) {
    this.app = app;
    this.input = input;
    this.onModalChange = onModalChange;
    this.modals = ['expansion-modal', 'settings-modal', 'inventory-modal', 'decor-modal', 'recovery-modal'];
    this.lastUpgradeSignature = '';
    this.lastInventorySignature = '';
    this.lastLanguage = null;
    this.#bind();
  }

  #bind() {
    document.getElementById('btn-expansions').addEventListener('click', () => this.open('expansion-modal'));
    document.getElementById('btn-furniture')?.addEventListener('click', () => {
      this.open('expansion-modal');
      this.#selectUpgradeTab('furniture');
    });
    document.getElementById('btn-settings').addEventListener('click', () => this.open('settings-modal'));
    document.getElementById('btn-inventory').addEventListener('click', () => this.open('inventory-modal'));
    document.getElementById('btn-decor').addEventListener('click', () => this.open('decor-modal'));
    document.getElementById('btn-business-toggle').addEventListener('click', () => {
      const open = document.getElementById('business-card').classList.toggle('mobile-open');
      const button = document.getElementById('btn-business-toggle');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'İşletme özetini kapat' : 'İşletme özetini aç');
    });
    document.getElementById('btn-order-toggle').addEventListener('click', () => {
      const card = document.getElementById('order-card');
      const collapsed = card.classList.toggle('collapsed');
      document.getElementById('btn-order-toggle').setAttribute('aria-expanded', String(!collapsed));
    });
    document.getElementById('btn-deliver-order').addEventListener('click', () => {
      const result = this.app.fulfillOrder();
      if (!result.ok) this.toast('Sipariş için çantanda yeterli ürün yok.', 'error');
      this.render(this.app.getState(), this.app.getNearbyAction(), true);
    });
    document.getElementById('btn-decor-top').addEventListener('click', () => this.open('decor-modal'));
    document.getElementById('decor-list').addEventListener('click', (event) => {
      const button = event.target.closest('[data-buy-decoration]');
      if (!button) return;
      const result = this.app.buyDecoration(button.dataset.buyDecoration);
      if (result.ok) {
        this.render(this.app.getState(), this.app.getNearbyAction(), true);
        this.toast(result.message);
      } else {
        this.toast(result.reason === 'no-decoration-space' ? 'Mağazada boş yer kalmadı.' : 'Bakiye yetersiz.', 'error');
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
      this.app.setCharacter(button.dataset.character);
      document.querySelectorAll('[data-character]').forEach((option) => option.classList.toggle('active', option.dataset.character === button.dataset.character));
    }));
    document.getElementById('setting-sound').addEventListener('change', (event) => this.app.setSetting('sound', event.target.checked));
    document.getElementById('setting-haptics').addEventListener('change', (event) => this.app.setSetting('haptics', event.target.checked));
    document.querySelectorAll('[data-debug]').forEach((button) => button.addEventListener('click', () => this.#debug(button.dataset.debug)));
    document.getElementById('expansion-modal').addEventListener('click', (event) => {
      const furnButton = event.target.closest('[data-buy-furniture]');
      if (furnButton) {
        const result = this.app.buyFurniture(furnButton.dataset.buyFurniture);
        if (result.ok) {
          this.render(this.app.getState(), this.app.getNearbyAction(), true);
          this.toast(result.message);
        } else {
          const msgs = {
            locked: 'Bu mobilya/istasyon henüz açılmadı.',
            'no-space': 'Uygun boş alan bulunamadı. Önce mevcut alanı düzenleyin.',
            'insufficient-funds': 'Bakiye yetersiz.',
          };
          this.toast(msgs[result.reason] ?? 'Satın alma yapılamadı.', 'error');
        }
        return;
      }

      const hireExtraButton = event.target.closest('[data-hire-extra]');
      if (hireExtraButton) {
        const result = this.app.hireExtraStaff(hireExtraButton.dataset.hireExtra);
        if (result.ok) {
          this.render(this.app.getState(), this.app.getNearbyAction(), true);
          this.toast(result.message);
        } else {
          this.toast(result.reason === 'locked' ? 'Önce temel personel yükseltmesini açmalısın.' : 'Bakiye yetersiz.', 'error');
        }
        return;
      }

      const button = event.target.closest('[data-buy-upgrade]');
      if (!button) return;
      const result = this.app.buyUpgrade(button.dataset.buyUpgrade);
      if (result.ok) this.render(this.app.getState(), this.app.getNearbyAction(), true);
      else this.toast(result.reason === 'locked' ? 'Bu geliştirme henüz açılmadı.' : 'Bakiye yetersiz.', 'error');
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

  #debug(action) {
    if (action === 'credit') this.app.debugCredit(1_000);
    if (action === 'creditLarge') this.app.debugCredit(99_999);
    if (action === 'capacity') this.app.debugCapacity(this.app.getState().player.capacity + 50);
    if (action === 'speed2') this.app.setSpeedMultiplier(2);
    if (action === 'speed5') this.app.setSpeedMultiplier(5);
    if (action === 'speed1') this.app.setSpeedMultiplier(1);
    this.render(this.app.getState(), this.app.getNearbyAction(), true);
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

  close(id) {
    document.getElementById(id)?.classList.add('hidden');
    this.#notifyModalState();
  }

  closeAll() {
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
    document.getElementById('setting-sound').checked = state.settings.sound;
    document.getElementById('setting-haptics').checked = state.settings.haptics;
    document.querySelectorAll('[data-character]').forEach((button) => button.classList.toggle('active', button.dataset.character === state.player.character));
    document.querySelectorAll('[data-language]').forEach((button) => button.classList.toggle('active', button.dataset.language === state.settings.language));
  }

  render(state, action, force = false) {
    const language = state.settings.language;
    this.#applyLanguage(language);
    const balance = state.economy.balanceAtoms / 10_000;
    document.getElementById('money-display').textContent = `$${balance.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', { maximumFractionDigits: 2 })}`;
    const playerCount = Object.values(state.stock.player.items).reduce((sum, count) => sum + count, 0);
    document.getElementById('stack-display').textContent = `${playerCount} / ${state.player.capacity}`;
    document.getElementById('customer-count').textContent = String(state.customers.length);
    document.getElementById('worker-count').textContent = String(state.workers.length);
    let shelfTotal = 0;
    for (const [id, stock] of Object.entries(state.stock)) if (id.startsWith('shelf:')) shelfTotal += Object.values(stock.items).reduce((a, b) => a + b, 0);
    document.getElementById('shelf-count').textContent = String(shelfTotal);
    const reviews = state.stats.customersSatisfied + state.stats.customersUnhappy;
    const satisfaction = reviews ? Math.round(state.stats.customersSatisfied / reviews * 100) : null;
    document.getElementById('mood-count').textContent = satisfaction === null ? '—' : `${satisfaction}%`;
    document.getElementById('business-toggle-score').textContent = satisfaction === null ? '—' : `${satisfaction}%`;
    const order = state.activeOrder;
    const orderCard = document.getElementById('order-card');
    orderCard.classList.toggle('hidden', !order);
    if (order) {
      const held = orderProgress(state);
      const itemName = language === 'en' ? this.#itemNameEnglish(order.item, ITEMS[order.item].name) : ITEMS[order.item].name;
      document.getElementById('order-item').textContent = `${ITEMS[order.item].icon} ${itemName} × ${order.quantity}`;
      document.getElementById('order-reward').textContent = `+$${order.reward}`;
      document.getElementById('order-progress').textContent = `${held} / ${order.quantity}`;
      document.getElementById('order-progress-fill').style.width = `${held / order.quantity * 100}%`;
      document.getElementById('btn-deliver-order').disabled = held < order.quantity;
      document.getElementById('order-bonus-progress').textContent = language === 'en'
        ? `${state.ordersCompleted % 3}/3 toward a $20 decor voucher`
        : `$20 dekor kuponuna ${state.ordersCompleted % 3}/3`;
    }
    const score = decorScore(state);
    const bonus = decorBonus(state);
    document.getElementById('decor-score').textContent = `${score} · +${(bonus * 100).toFixed(1)}%`;
    this.renderDecorations(state);
    document.getElementById('quest-text').textContent = this.#questText(state, language);
    document.getElementById('progress-count').textContent = `${state.completedUpgrades.length} / ${UPGRADES.length}`;
    document.getElementById('progress-fill').style.width = `${Math.min(100, state.completedUpgrades.length / UPGRADES.length * 100)}%`;
    const actionButton = document.getElementById('btn-interact');
    const actionLabel = document.getElementById('action-label');
    actionButton.disabled = !action || action.actionable === false;
    document.querySelector('#btn-interact .action-icon').textContent = action
      ? ({ farm: '🌱', machine: '⚙️', shelf: '📦', coop: '🐔', table: '🍽️', register: '💵', upgrade: '🏗️' })[action.kind] ?? '✋' : '✋';
    actionLabel.textContent = action ? this.#actionText(action, state) : (language === 'en' ? 'Move closer to a station' : 'Bir istasyona yaklaş');
    document.getElementById('upgrade-count').textContent = String(this.app.getAvailableUpgrades().length);
    this.#syncSettings(state);
    const signature = `${state.revision}:${balance}:${this.app.getAvailableUpgrades().map((upgrade) => upgrade.id).join(',')}:${state.completedUpgrades.join(',')}:${state.workers.map((worker) => worker.type).join(',')}:${Object.keys(state.layout ?? {}).length}:${Object.keys(state.selfRegisters ?? {}).length}`;
    if (force || signature !== this.lastUpgradeSignature) {
      this.lastUpgradeSignature = signature;
      this.renderUpgrades(state);
      this.renderStaff(state);
      this.renderFurniture(state);
    }
    if (force) this.renderInventory(state, true);
  }

  #applyLanguage(language) {
    if (language === this.lastLanguage) return;
    this.lastLanguage = language;
    const english = language === 'en';
    document.querySelector('.business-heading strong').textContent = english ? EN.business : 'İŞLETME';
    document.querySelector('.business-heading small').textContent = english ? EN.live : 'CANLI';
    document.querySelectorAll('.business-row')[0].children[0].textContent = `🧑‍🤝‍🧑 ${english ? EN.customers : 'Müşteriler'}`;
    document.querySelectorAll('.business-row')[1].children[0].textContent = `🧑‍🔧 ${english ? EN.workers : 'Çalışanlar'}`;
    document.querySelectorAll('.business-row')[2].children[0].textContent = `📦 ${english ? EN.shelfStock : 'Reyon stoğu'}`;
    document.getElementById('mood-label').textContent = english ? '😊 Satisfaction' : '😊 Memnuniyet';
    document.getElementById('order-title').textContent = english ? 'CUSTOMER ORDER' : 'MÜŞTERİ SİPARİŞİ';
    document.getElementById('btn-deliver-order').textContent = english ? 'Deliver order' : 'Siparişi teslim et';
    document.getElementById('btn-inventory').innerHTML = `${english ? EN.viewProducts : 'Ürünleri gör'} <span>›</span>`;
    document.querySelector('#btn-settings').setAttribute('aria-label', english ? EN.settings : 'Ayarlar');
    document.getElementById('btn-expansions').setAttribute('aria-label', english ? EN.upgrades : 'İşletme geliştirmeleri');
    const btnFurn = document.getElementById('btn-furniture');
    if (btnFurn) {
      btnFurn.setAttribute('aria-label', english ? 'Furniture shop' : 'Mobilya dükkanı');
      btnFurn.title = english ? 'Furniture shop' : 'Mobilya dükkanı';
    }
    document.getElementById('btn-decor-top').setAttribute('aria-label', english ? 'Decoration shop' : 'Dekorasyon mağazası');
    document.getElementById('btn-decor-top').title = english ? 'Decoration shop' : 'Dekorasyon mağazası';
    document.getElementById('btn-decor').innerHTML = `${english ? '🎨 Decoration shop' : '🎨 Dekorasyon mağazası'} <span>›</span>`;
    document.getElementById('decor-title').textContent = english ? 'Decoration shop' : 'Dekorasyon mağazası';
    document.getElementById('decor-intro').textContent = english
      ? 'Buy decorations for your market. Each placed piece adds style and a small sales bonus.'
      : 'Mağazan için dekorasyon satın al. Yerleştirilen her parça mağazana tarz katar ve satış kârını artırır.';
    document.getElementById('decor-score-caption').textContent = english
      ? 'More decorations create a more welcoming shopping experience.'
      : 'Dekorasyon arttıkça mağaza daha davetkâr olur.';
    document.querySelector('.decor-score-row span').textContent = english ? '✨ Decor score' : '✨ Dekor puanı';
    document.querySelector('.quest-copy .eyebrow').textContent = english ? EN.nextGoal : 'SIRADAKİ HEDEF';
    document.querySelector('#inventory-title').textContent = english ? EN.inventory : 'Ürünler';
    document.querySelector('#settings-title').textContent = english ? EN.settings : 'Ayarlar';
    document.querySelector('.settings-content[data-panel="language"] .modal-intro').textContent = english ? EN.language : 'Arayüz dili';
    document.querySelector('.settings-tabs [data-tab="general"]').textContent = english ? EN.general : 'Genel';
    document.querySelector('.settings-tabs [data-tab="character"]').textContent = english ? EN.character : 'Karakter';
    document.querySelector('.settings-tabs [data-tab="language"]').textContent = english ? 'Language' : 'Dil';
    document.querySelector('.settings-tabs [data-tab="debug"]').textContent = english ? EN.developer : 'Geliştirici';
    document.querySelectorAll('.settings-content[data-panel="general"] .setting-row span').forEach((node, index) => {
      node.textContent = english ? (index === 0 ? EN.sound : EN.haptics) : (index === 0 ? 'Ses efektleri' : 'Dokunsal geri bildirim');
    });
    document.querySelector('.settings-content[data-panel="general"] .setting-note').textContent = english ? EN.backgroundNote : 'Oyun arka plana geçtiğinde simülasyon durur. Döndüğünde kaldığın yerden devam eder.';
    document.getElementById('btn-reset').textContent = english ? EN.resetGame : 'Yeni oyuna başla';
    document.querySelector('.settings-content[data-panel="character"] .modal-intro').textContent = english ? 'Choose your character' : 'Oyuncu karakterini seç';
    document.querySelectorAll('[data-character] span').forEach((node, index) => {
      node.textContent = english ? ['Shopkeeper', 'Cat', 'Robot', 'Panda', 'Penguin'][index] : ['Marketçi', 'Kedi', 'Robot', 'Panda', 'Penguen'][index];
    });
    document.getElementById('btn-recovery-reset').textContent = english ? 'Erase saves and start a new game' : 'Yedekleri sil ve yeni oyun başlat';
    document.querySelector('#expansion-modal .modal-header .eyebrow').textContent = english ? EN.grow : 'İŞLETMEYİ BÜYÜT';
    document.querySelector('#settings-modal .modal-header .eyebrow').textContent = english ? 'GAME MENU' : 'OYUN MENÜSÜ';
    document.querySelector('#inventory-modal .modal-header .eyebrow').textContent = english ? EN.stock : 'STOK DURUMU';
    document.querySelector('#expansion-modal .modal-intro').textContent = english
      ? 'Invest earnings in production and staff. Every purchase adds a station to the world.'
      : 'Kazancını yeni üretim hatlarına ve ekibe yatır. Açılan her istasyon dünyaya eklenir.';
    document.querySelector('[data-upgrade-tab="business"]').textContent = english ? EN.businessTab : 'İşletme';
    document.querySelector('[data-upgrade-tab="furniture"]').textContent = english ? 'Furniture' : 'Mobilya Dükkanı';
    document.querySelector('[data-upgrade-tab="staff"]').textContent = english ? EN.staffTab : 'Personel';
    document.querySelector('.control-hint span').textContent = english ? EN.orTap : 'veya dokunup yürü';
    document.getElementById('btn-resume').textContent = english ? EN.resume : '▶ Oyuna dön';
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
    const list = document.getElementById('upgrade-list');
    if (!upgrades.length) {
      list.innerHTML = `<div class="empty-upgrades">${state.settings.language === 'en' ? EN.noUpgrade : 'Şimdilik yeni geliştirme yok. Yeni aşamalar satış yaptıkça açılır.'}</div>`;
      return;
    }
    list.innerHTML = upgrades.map((upgrade) => {
      const affordable = state.economy.balanceAtoms >= upgrade.price * 10_000;
      const title = state.settings.language === 'en' ? this.#upgradeNameEnglish(upgrade.id, upgrade.title) : upgrade.title;
      return `<article class="upgrade-card"><div class="upgrade-icon">${UPGRADE_ICONS[upgrade.id] ?? '✨'}</div><div class="upgrade-copy"><strong>${title}</strong><small>${state.settings.language === 'en' ? 'Unlock a new production step' : 'Yeni bir üretim aşaması aç'}</small></div><button class="buy-button" data-buy-upgrade="${upgrade.id}" ${affordable ? '' : 'disabled'}>$${upgrade.price}</button></article>`;
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
    document.getElementById('decor-shop-score').textContent = scoreLabel;
    document.getElementById('decor-score-caption').textContent = state.decorVouchers
      ? (english ? `${state.decorVouchers} voucher(s): $20 off your next decoration.` : `${state.decorVouchers} kupon: sonraki dekorasyonda $20 indirim.`)
      : (english ? 'More decorations create a more welcoming shopping experience.' : 'Dekorasyon arttıkça mağaza daha davetkâr olur.');
    document.getElementById('decor-score').textContent = `${score} · +${(bonus * 100).toFixed(1)}%`;
    document.getElementById('decor-list').innerHTML = Object.entries(DECORATIONS).map(([id, item]) => {
      const owned = state.decorations.filter((entry) => entry.type === id).length;
      const name = item.name[state.settings.language];
      const price = decorationPrice(state, item.price);
      return `<article class="decor-item"><div class="decor-item-icon">${this.#decorationIcon(id)}</div><div class="upgrade-copy"><strong>${name}</strong><small>✨ +${item.score} ${english ? 'style points' : 'dekor puanı'} · ${owned} ${english ? 'placed' : 'mağazada'}</small></div><button class="buy-button" data-buy-decoration="${id}" ${state.economy.balanceAtoms < price * 10_000 ? 'disabled' : ''}>$ ${price}</button></article>`;
    }).join('');
  }

  #decorationIcon(id) {
    return ({
      petalPlanter: '🪴',
      farmhouseSign: '🪧',
      orchardLantern: '💡',
      welcomeMat: '🚪',
      pennantBanner: '🚩',
      harvestBasket: '🛒',
      citrusTopiary: '🍊',
      windowDisplay: '💐',
      cardboardBoxes: '📦',
    })[id] ?? '✨';
  }

  renderStaff(state) {
    const list = document.getElementById('staff-list');
    if (!list) return;
    const english = state.settings.language === 'en';
    list.innerHTML = STAFF_HIRES.map((hire) => {
      const upgrade = UPGRADES.find((entry) => entry.id === hire.upgradeId);
      const hiredCount = state.workers.filter((worker) => hire.staffTypes.includes(worker.type)).length;
      const hired = hiredCount > 0 || state.completedUpgrades.includes(hire.upgradeId);
      const unlocked = state.availableUpgrades.includes(hire.upgradeId) && !state.completedUpgrades.includes(hire.upgradeId);
      const affordable = state.economy.balanceAtoms >= upgrade.price * 10_000;
      const title = STAFF[hire.upgradeId]?.title ?? hire.staffTypes.map((type) => STAFF[type]?.title ?? type).join(' ve ');
      const englishTitle = hire.staffTypes.length > 1 ? 'Chef and waiter' : ({ cashier: 'Cashier', harvester: 'Harvester', factoryFeeder: 'Factory feeder', caretaker: 'Farm caretaker' })[hire.staffTypes[0]];
      const effect = state.settings.language === 'en' ? EN.staffEffect[hire.upgradeId] : hire.effect;
      const unlock = state.settings.language === 'en' ? EN.staffUnlock[hire.upgradeId] : hire.unlock;
      const subtitle = hired ? (state.settings.language === 'en' ? `On staff · ${hiredCount || hire.staffTypes.length}` : `Ekibinde · ${hiredCount || hire.staffTypes.length} kişi`)
        : unlocked ? effect : unlock;

      let button = '';
      if (!hired) {
        button = `<button class="buy-button" data-buy-upgrade="${hire.upgradeId}" ${unlocked && affordable ? '' : 'disabled'}>${!unlocked ? (english ? 'Locked' : 'Kilitli') : !affordable ? (english ? 'Need funds' : 'Bakiye yok') : (english ? 'Hire' : 'İşe al')} · $${upgrade.price}</button>`;
      } else {
        const extraPrice = getStaffHirePrice(state, hire.upgradeId);
        const extraAffordable = state.economy.balanceAtoms >= extraPrice * 10_000;
        button = `<button class="buy-button extra-staff-btn" data-hire-extra="${hire.upgradeId}" ${extraAffordable ? '' : 'disabled'}>${extraAffordable ? (english ? '+1 Hire' : '+1 Ekle') : (english ? 'Need funds' : 'Bakiye yok')} · $${extraPrice}</button>`;
      }

      return `<article class="upgrade-card staff-card${hired ? ' hired' : ''}"><div class="upgrade-icon">${STAFF[hire.staffTypes[0]]?.icon ?? '🧑‍🔧'}</div><div class="upgrade-copy"><strong>${state.settings.language === 'en' ? englishTitle : title}</strong><small>${subtitle}</small></div>${button}</article>`;
    }).join('');
  }

  renderFurniture(state) {
    const list = document.getElementById('furniture-list');
    if (!list) return;
    const english = state.settings.language === 'en';

    list.innerHTML = Object.entries(FURNITURE_TYPES).map(([type, item]) => {
      const unlocked = isFurnitureUnlocked(state, type);
      const count = getFurnitureCount(state, type);
      const price = getFurniturePrice(state, type);
      const affordable = state.economy.balanceAtoms >= price * 10_000;
      const title = english ? item.nameEn : item.name;
      const desc = item.description;
      const countLabel = english ? `Owned: ${count}` : `Sahip olunan: ${count} adet`;
      const isSelfReg = type === 'selfRegister';

      const button = unlocked
        ? `<button class="buy-button" data-buy-furniture="${type}" ${affordable ? '' : 'disabled'}>${affordable ? (english ? 'Buy' : 'Satın Al') : (english ? 'Need funds' : 'Bakiye yok')} · $${price}</button>`
        : `<button class="buy-button" disabled>${english ? 'Locked' : 'Kilitli'}</button>`;

      const badge = isSelfReg
        ? `<span class="furniture-badge auto-badge">🤖 ${english ? 'Automated' : 'Personelsiz Kasa'}</span>`
        : `<span class="furniture-badge">${countLabel}</span>`;

      return `<article class="upgrade-card furniture-card${isSelfReg ? ' self-register-card' : ''}">
        <div class="upgrade-icon">${item.icon}</div>
        <div class="upgrade-copy">
          <div class="furniture-title-row">
            <strong>${title}</strong>
            ${badge}
          </div>
          <small>${unlocked ? desc : (english ? 'Unlocks when this product is available.' : 'Bu ürünün üretimi açıldığında kullanılabilir.')}</small>
          ${isSelfReg && unlocked ? `<small class="highlight-text">${countLabel} · Kasiyersiz otomatik çalışır</small>` : ''}
        </div>
        ${button}
      </article>`;
    }).join('');
  }

  #upgradeNameEnglish(id, fallback) {
    const names = {
      tomatoFarm2: 'Second tomato field', cashier: 'Hire a cashier', paste: 'Tomato paste kitchen', harvester: 'Hire a harvester',
      orange: 'Orange grove and juicer', factoryFeeder: 'Hire a factory feeder', orangeFarm2: 'Second orange grove',
      corn: 'Corn field and shelf', popcorn: 'Popcorn machine and shelf', feed: 'Chicken feed grinder',
      coop: 'Chicken coop and egg shelf', chicken2: 'Second chicken', chicken3: 'Third chicken',
      caretaker: 'Hire a farm caretaker', bakery: 'Wheat field and stone oven', restaurant: 'Gourmet restaurant', chefWaiter: 'Hire chef and waiter',
    };
    return names[id] ?? fallback;
  }

  #actionText(action, state) {
    if (state.settings.language !== 'en') return action.label;
    if (action.kind === 'upgrade') return `${this.#upgradeNameEnglish(action.id, action.title)} · $${action.price}`;
    if (action.kind === 'farm') {
      if (action.actionable === false) return action.label === 'Çanta dolu' ? 'Bag full' : 'Crops growing';
      const names = { TOMATO: 'Harvest tomatoes', ORANGE: 'Harvest oranges', CORN: 'Harvest corn', WHEAT: 'Harvest wheat' };
      return names[action.item] ?? 'Harvest';
    }
    if (action.kind === 'machine') {
      const outputItems = { paste: 'TOMATO_PASTE', juice: 'ORANGE_JUICE', popcorn: 'POPCORN', feed: 'CHICKEN_FEED', bakery: 'BREAD', burgerKitchen: 'BURGER', pizzaKitchen: 'PIZZA' };
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
    const list = document.getElementById('inventory-list');
    if (!items.size) {
      list.innerHTML = `<div class="empty-upgrades">${state.settings.language === 'en' ? 'No goods in stock yet.' : 'Henüz stokta ürün yok.'}</div>`;
      return;
    }
    list.innerHTML = [...items.entries()].map(([itemId, amounts]) => {
      const item = ITEMS[itemId];
      const total = amounts.carried + amounts.shelf + amounts.machine;
      const stockLabel = state.settings.language === 'en' ? `bag ${amounts.carried} · shelves ${amounts.shelf} · machines ${amounts.machine}` : `çanta ${amounts.carried} · raf ${amounts.shelf} · makine ${amounts.machine}`;
      return `<div class="inventory-row"><span>${item.icon} ${state.settings.language === 'en' ? this.#itemNameEnglish(itemId, item.name) : item.name}<small>${stockLabel}</small></span><strong>${total}</strong></div>`;
    }).join('');
  }

  #itemNameEnglish(itemId, fallback) {
    return ({ TOMATO: 'Tomato', TOMATO_PASTE: 'Tomato paste', ORANGE: 'Orange', ORANGE_JUICE: 'Orange juice', CORN: 'Corn', POPCORN: 'Popcorn', CHICKEN_FEED: 'Chicken feed', EGG: 'Egg', WHEAT: 'Wheat', BREAD: 'Bread', BURGER: 'Gourmet burger', PIZZA: 'Pizza' })[itemId] ?? fallback;
  }

  toast(message, tone = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast-msg${tone === 'error' ? ' error' : ''}`;
    toast.textContent = message;
    container.appendChild(toast);
    while (container.children.length > 3) {
      container.firstElementChild.remove();
    }
    window.setTimeout(() => toast.remove(), 2600);
  }

  showEvent(event) {
    let message = event.message;
    if (event.type === 'sale' || event.type === 'production' || event.type === 'tip-ready') {
      this.#eventSound(event.type);
    }
    if (this.app.getState().settings.language === 'en') {
      if (event.type === 'sale') {
        const sold = (event.items ?? [event.item]).map((itemId) => `${ITEMS[itemId]?.icon ?? '📦'} ${this.#itemNameEnglish(itemId, ITEMS[itemId]?.name ?? itemId)}`);
        message = `+$${event.amount.toFixed(2)} · ${sold.join(', ')} sold${event.decorationBonus ? ` · +${(event.decorationBonus * 100).toFixed(1)}% decor bonus` : ''}.`;
      }
      if (event.type === 'production') message = `${ITEMS[event.item]?.icon ?? '📦'} ${this.#itemNameEnglish(event.item, ITEMS[event.item]?.name ?? event.item)} ready.`;
      if (event.type === 'tip-ready') message = '💵 A customer left a tip.';
      if (message === 'Yedek kayıttan devam edildi.') message = 'Recovered from the backup save.';
      if (message === 'Yeni oyun hazır.') message = 'A new game is ready.';
      if (message === 'Müşteriler kasada ödeme yapıyor.') message = 'Customers are paying at the register.';
      if (message.includes('ürün alındı.')) message = 'Products collected.';
      if (message.includes('Reyon dolduruldu.')) message = 'Shelf restocked.';
      if (message.includes('Ürün makineye aktarıldı')) message = 'Ingredients moved to the machine.';
      if (message.includes('Bahşiş alındı.')) message = 'Tip collected.';
      if (message.includes('Yemek servis edildi.')) message = 'Meal served.';
      if (message.includes('eklendi.')) message = 'Credits added.';
    }
    this.toast(message, event.tone);
  }

  #eventSound(type) {
    if (!this.app.getState().settings.sound) return;
    const now = performance.now();
    if (now - (this.lastEventSoundTime ?? 0) < 180) return;
    this.lastEventSoundTime = now;
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextType) return;
    try {
      this.audioContext ??= new AudioContextType();
      if (this.audioContext.state === 'suspended') this.audioContext.resume();
      const frequencies = { sale: [620, 840], production: [450, 580], 'tip-ready': [740, 980] };
      const tones = frequencies[type] ?? [600];
      tones.forEach((frequency, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const start = this.audioContext.currentTime + index * 0.075;
        oscillator.type = 'sine'; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.025, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
        oscillator.connect(gain); gain.connect(this.audioContext.destination);
        oscillator.start(start); oscillator.stop(start + 0.12);
      });
    } catch { /* sound is optional */ }
  }

  showRecovery(message) {
    document.getElementById('recovery-message').textContent = message;
    this.open('recovery-modal');
  }
}

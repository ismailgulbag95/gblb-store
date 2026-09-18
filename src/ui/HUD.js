import gsap from 'gsap';
import { i18n } from '../i18n/LanguageManager.js';

export class HUD {
  constructor() {
    this.moneyEl = document.getElementById('money-display');
    this.stackEl = document.getElementById('stack-display');
    this.questTextEl = document.getElementById('quest-desc');
    this.toastContainer = document.getElementById('toast-container');
    this.boostBtn = document.getElementById('btn-boost');
    this.settingsBtn = document.getElementById('btn-settings');
    this.settingsModal = document.getElementById('settings-modal');
    this.closeSettingsBtn = document.getElementById('btn-close-settings');

    this.displayedMoney = 0;
    this.setupModalEvents();
    this.setupLanguageEvents();
    this.setupTactileHaptics();
  }

  setupTactileHaptics() {
    // Tactile vibration on all interactive buttons
    document.querySelectorAll('.stat-pill, .icon-btn, .tab-btn, .lang-btn, .char-card, .debug-btn, .close-btn').forEach(btn => {
      btn.addEventListener('pointerdown', () => {
        if (navigator.vibrate) {
          navigator.vibrate(12);
        }
      });
    });
  }

  setupModalEvents() {
    if (this.settingsBtn && this.settingsModal) {
      this.settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.settingsModal.classList.remove('hidden');
      });
    }

    if (this.closeSettingsBtn && this.settingsModal) {
      this.closeSettingsBtn.addEventListener('click', () => {
        this.settingsModal.classList.add('hidden');
      });
    }

    if (this.settingsModal) {
      this.settingsModal.addEventListener('click', (e) => {
        if (e.target === this.settingsModal) {
          this.settingsModal.classList.add('hidden');
        }
      });
    }

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = tab.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  setupLanguageEvents() {
    const btnTr = document.getElementById('btn-lang-tr');
    const btnEn = document.getElementById('btn-lang-en');

    if (btnTr) {
      btnTr.addEventListener('click', () => {
        i18n.setLanguage('tr');
        btnTr.classList.add('active');
        if (btnEn) btnEn.classList.remove('active');
        this.updateLanguageUI();
        this.showToast('🇹🇷 Dil: Türkçe olarak ayarlandı!', '#3498db');
      });
    }

    if (btnEn) {
      btnEn.addEventListener('click', () => {
        i18n.setLanguage('en');
        btnEn.classList.add('active');
        if (btnTr) btnTr.classList.remove('active');
        this.updateLanguageUI();
        this.showToast('🇬🇧 Language set to English!', '#3498db');
      });
    }
  }

  setupCharacterEvents(player) {
    const charIds = ['shopkeeper', 'cat', 'robot', 'panda', 'penguin'];
    const cards = {};
    charIds.forEach(id => {
      cards[id] = document.getElementById(`char-card-${id}`);
    });

    const updateActiveCards = (activeType) => {
      const isTr = (i18n.currentLang || 'tr') === 'tr';
      charIds.forEach(id => {
        const card = cards[id];
        if (card) {
          const badge = card.querySelector('.char-badge');
          if (id === activeType) {
            card.classList.add('active');
            if (badge) badge.innerText = isTr ? '✓ SEÇİLDİ' : '✓ SELECTED';
          } else {
            card.classList.remove('active');
            if (badge) badge.innerText = isTr ? 'SEÇ' : 'SELECT';
          }
        }
      });
    };

    updateActiveCards(player.characterType);

    const charToasts = {
      shopkeeper: { msg: '👨‍🌾 Market Çalışanı seçildi!', color: '#3498db' },
      cat: { msg: '🐱 Maceracı Kedi seçildi! 🐾', color: '#e67e22' },
      robot: { msg: '🤖 Siber Lojistik Botu devrede! ⚡', color: '#00d9ff' },
      panda: { msg: '🐼 Şef Panda mutfağa geçti! 🥐', color: '#2ecc71' },
      penguin: { msg: '👑 Kral Penguen göreve hazır! ❄️', color: '#9b59b6' }
    };

    charIds.forEach(id => {
      const card = cards[id];
      if (card) {
        card.addEventListener('click', () => {
          player.setCharacterType(id);
          updateActiveCards(id);
          const t = charToasts[id];
          if (t) this.showToast(t.msg, t.color);
        });
      }
    });
  }

  updateLanguageUI() {
    // Top bar boost
    const boostText = document.getElementById('boost-text');
    if (boostText) boostText.innerText = i18n.t('speed_boost');

    // Quest badge
    const questBadge = document.getElementById('quest-title-badge');
    if (questBadge) questBadge.innerText = i18n.t('quest_title');

    // Settings Modal
    const title = document.getElementById('settings-modal-title');
    if (title) title.innerText = `⚙️ ${i18n.t('settings_title')}`;

    const tabGen = document.getElementById('tab-btn-gen');
    if (tabGen) tabGen.innerText = i18n.t('tab_general');

    const tabChar = document.getElementById('tab-btn-char');
    if (tabChar) tabChar.innerText = i18n.t('tab_character');

    const tabLang = document.getElementById('tab-btn-lang');
    if (tabLang) tabLang.innerText = i18n.t('tab_language');

    const tabDeb = document.getElementById('tab-btn-deb');
    if (tabDeb) tabDeb.innerText = i18n.t('tab_debug');

    // Character tab labels
    const charTitle = document.getElementById('char-title');
    if (charTitle) charTitle.innerText = i18n.t('char_select_title');

    const updateCharLabels = (id, nameKey, descKey) => {
      const nameEl = document.getElementById(`char-name-${id}`);
      if (nameEl) nameEl.innerText = i18n.t(nameKey);
      const descEl = document.getElementById(`char-desc-${id}`);
      if (descEl) descEl.innerText = i18n.t(descKey);
    };

    updateCharLabels('shopkeeper', 'char_shopkeeper', 'char_shopkeeper_desc');
    updateCharLabels('cat', 'char_cat', 'char_cat_desc');
    updateCharLabels('robot', 'char_robot', 'char_robot_desc');
    updateCharLabels('panda', 'char_panda', 'char_panda_desc');
    updateCharLabels('penguin', 'char_penguin', 'char_penguin_desc');

    const lblSfx = document.getElementById('label-sfx');
    if (lblSfx) lblSfx.innerText = i18n.t('sfx');

    const lblMusic = document.getElementById('label-music');
    if (lblMusic) lblMusic.innerText = i18n.t('music');

    const lblHaptics = document.getElementById('label-haptics');
    if (lblHaptics) lblHaptics.innerText = i18n.t('haptics');
  }

  bindDebugActions(game) {
    const btn1k = document.getElementById('debug-btn-money-1k');
    if (btn1k) {
      btn1k.addEventListener('click', () => {
        game.playerMoney += 1000;
        this.updateMoney(game.playerMoney);
        this.showToast('💵 +1.000$!', '#2ecc71');
      });
    }

    const btnInf = document.getElementById('debug-btn-money-inf');
    if (btnInf) {
      btnInf.addEventListener('click', () => {
        game.playerMoney = 99999;
        this.updateMoney(game.playerMoney);
        this.showToast('♾️ 99.999$!', '#f1c40f');
      });
    }

    const btn2x = document.getElementById('debug-btn-speed-2x');
    if (btn2x) {
      btn2x.addEventListener('click', () => {
        game.debugSpeedMultiplier = 2.0;
        this.showToast('⚡ 2x Speed!', '#e67e22');
      });
    }

    const btn5x = document.getElementById('debug-btn-speed-5x');
    if (btn5x) {
      btn5x.addEventListener('click', () => {
        game.debugSpeedMultiplier = 5.0;
        this.showToast('🚀 5x Super Speed!', '#9b59b6');
      });
    }

    const btnCap = document.getElementById('debug-btn-capacity');
    if (btnCap) {
      btnCap.addEventListener('click', () => {
        game.player.stack.maxCapacity += 50;
        this.updateStack(game.player.stack.getCount(), game.player.stack.maxCapacity);
        this.showToast('🎒 +50 Capacity!', '#3498db');
      });
    }

    const btnReset = document.getElementById('debug-btn-reset-money');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        game.playerMoney = 0;
        this.updateMoney(0);
        this.showToast('🧹 0$!', '#e74c3c');
      });
    }
  }

  updateMoney(actualMoney) {
    if (!this.moneyEl) return;
    gsap.to(this, {
      displayedMoney: actualMoney,
      duration: 0.35,
      ease: 'power1.out',
      onUpdate: () => {
        this.moneyEl.innerText = Math.floor(this.displayedMoney);
      }
    });
  }

  updateStack(current, max) {
    if (!this.stackEl) return;
    this.stackEl.innerText = `${current} / ${max}`;
    const pill = this.stackEl.parentElement;
    if (pill) {
      if (current >= max && max > 0) {
        pill.style.borderColor = '#ff4b4b';
        pill.style.boxShadow = '0 4px 0 #e53238, 0 6px 14px rgba(255, 75, 75, 0.25)';
        gsap.fromTo(pill, { scale: 1.0 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' });
      } else {
        pill.style.borderColor = '#e5e5e5';
        pill.style.boxShadow = '0 4px 0 #e5e5e5, 0 6px 14px rgba(0, 0, 0, 0.08)';
      }
    }
  }

  setQuest(text) {
    if (this.questTextEl) {
      this.questTextEl.innerText = text;
    }
  }

  showToast(message, color = '#2ecc71') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.background = color;
    toast.innerText = message;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 1600);
  }
}

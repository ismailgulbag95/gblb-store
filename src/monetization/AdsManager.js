import { LuckyRewardDrop } from './LuckyRewardDrop.js';

export class AdsManager {
  constructor(game, scene, hud) {
    this.game = game;
    this.scene = scene;
    this.hud = hud;

    this.isBoostActive = false;
    this.boostTimer = 0;
    this.boostDuration = 30; // 30 seconds 2x boost
    this.boostMultiplier = 2.0;

    this.currentDrop = null;
    this.nextDropTimer = 15.0; // First drop in 15 seconds!
    this.minDropInterval = 35.0;
    this.maxDropInterval = 55.0;

    this.pendingRewardDrop = null;

    this.setupBoostButton();
    this.setupRewardModal();
  }

  setupBoostButton() {
    const btn = document.getElementById('btn-boost');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.triggerRewardedBoost();
    });
  }

  setupRewardModal() {
    this.modal = document.getElementById('reward-modal');
    this.iconEl = document.getElementById('reward-modal-icon');
    this.titleEl = document.getElementById('reward-modal-title');
    this.descEl = document.getElementById('reward-modal-desc');
    this.claimBtn = document.getElementById('btn-claim-reward');
    this.cancelBtn = document.getElementById('btn-cancel-reward');

    if (this.claimBtn) {
      this.claimBtn.addEventListener('click', () => {
        this.claimPendingReward();
      });
    }

    if (this.cancelBtn) {
      this.cancelBtn.addEventListener('click', () => {
        this.closeRewardModal();
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeRewardModal();
        }
      });
    }
  }

  openRewardModal(drop) {
    if (!this.modal || !drop) return;
    this.pendingRewardDrop = drop;

    const reward = drop.selectedReward;
    if (this.iconEl) this.iconEl.innerText = reward.icon;
    if (this.titleEl) this.titleEl.innerText = reward.title;
    if (this.descEl) this.descEl.innerText = `${reward.desc}\n(Kısa bir ödüllü video izleyin!)`;

    this.modal.classList.remove('hidden');
  }

  closeRewardModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
    this.pendingRewardDrop = null;
  }

  claimPendingReward() {
    if (!this.pendingRewardDrop) {
      this.closeRewardModal();
      return;
    }

    const drop = this.pendingRewardDrop;
    const reward = drop.selectedReward;
    this.closeRewardModal();

    drop.claim();

    // Reward Logic Execution
    if (reward.id === 'MONEY_BURST') {
      const rewardAmount = 500;
      this.game.playerMoney += rewardAmount;
      this.hud.updateMoney(this.game.playerMoney);
      this.hud.showToast(`🎉 +${rewardAmount}$ Nakit Para Kazandınız! 💵`, '#58cc02');
    } else if (reward.id === 'SUPER_SPEED') {
      this.isBoostActive = true;
      this.boostMultiplier = 2.5;
      this.boostTimer = 35.0;
      this.hud.showToast('🚀 35sn 2.5x Süper Hız Aktif Edildi! ⚡', '#ff9600');
    } else if (reward.id === 'MAX_STACK') {
      this.game.player.stack.maxCapacity += 10;
      this.hud.updateStack(this.game.player.stack.getCount(), this.game.player.stack.maxCapacity);
      this.hud.showToast('🎒 +10 Ekstra Çanta Kapasitesi Kazandınız!', '#1cb0f6');
    }

    this.currentDrop = null;
    this.scheduleNextDrop();
  }

  triggerRewardedBoost() {
    if (this.isBoostActive) {
      this.hud.showToast('⚡ 2x Hız Takviyesi Zaten Aktif!', '#ff9600');
      return;
    }

    // Rewarded Ad trigger
    this.hud.showToast('🎬 Reklam İzlendi! 30sn 2x Hız Aktif!', '#58cc02');
    this.isBoostActive = true;
    this.boostMultiplier = 2.0;
    this.boostTimer = this.boostDuration;

    const btn = document.getElementById('btn-boost');
    if (btn) {
      btn.style.background = '#58cc02';
      btn.style.borderColor = '#79d72e';
      btn.style.borderBottomColor = '#46a302';
      btn.querySelector('.pill-value').innerText = `${Math.ceil(this.boostTimer)}s`;
    }
  }

  scheduleNextDrop() {
    const delay = this.minDropInterval + Math.random() * (this.maxDropInterval - this.minDropInterval);
    this.nextDropTimer = delay;
  }

  spawnLuckyDrop(playerPos) {
    if (this.currentDrop) {
      this.currentDrop.destroy();
      this.currentDrop = null;
    }

    // Spawn 3.5 to 5.5 units ahead/near of player on the walkable floor
    const angle = Math.random() * Math.PI * 2;
    const dist = 3.5 + Math.random() * 2.5;
    let spawnX = playerPos.x + Math.cos(angle) * dist;
    let spawnZ = playerPos.z + Math.sin(angle) * dist;

    // Clamp within walkable store bounds (x: -12 to +10, z: -10 to +8)
    spawnX = Math.max(-12, Math.min(10, spawnX));
    spawnZ = Math.max(-10, Math.min(8, spawnZ));

    this.currentDrop = new LuckyRewardDrop(this.scene, spawnX, spawnZ, () => {
      this.currentDrop = null;
      this.scheduleNextDrop();
    });

    this.hud.showToast('🎁 Önünüze Sürpriz Bir Hediye Düştü!', '#ff9600');
  }

  update(delta, playerPos) {
    // 1. Update Boost Timer
    if (this.isBoostActive) {
      this.boostTimer -= delta;

      const btn = document.getElementById('btn-boost');
      if (btn) {
        btn.querySelector('.pill-value').innerText = `${Math.ceil(this.boostTimer)}s`;
      }

      if (this.boostTimer <= 0) {
        this.isBoostActive = false;
        this.boostMultiplier = 1.0;
        this.hud.showToast('⏳ Hız Takviyesi Sona Erdi', '#777777');
        if (btn) {
          btn.style.background = '#ff9600';
          btn.style.borderColor = '#ffc800';
          btn.style.borderBottomColor = '#e58500';
          btn.querySelector('.pill-value').innerText = '2x HIZ';
        }
      }
    }

    // 2. Lucky Drop Spawn Timer
    if (!this.currentDrop) {
      this.nextDropTimer -= delta;
      if (this.nextDropTimer <= 0 && playerPos) {
        this.spawnLuckyDrop(playerPos);
      }
    } else {
      // 3. Update Existing Active Drop
      this.currentDrop.update(delta, playerPos, (drop) => {
        this.openRewardModal(drop);
      });

      if (this.currentDrop.isExpired) {
        this.currentDrop = null;
        this.scheduleNextDrop();
      }
    }
  }

  getSpeedMultiplier() {
    return this.isBoostActive ? this.boostMultiplier : 1.0;
  }
}

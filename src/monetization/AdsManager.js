export class AdsManager {
  constructor(hud) {
    this.hud = hud;
    this.isBoostActive = false;
    this.boostTimer = 0;
    this.boostDuration = 30; // 30 seconds 2x boost

    this.setupBoostButton();
  }

  setupBoostButton() {
    const btn = document.getElementById('btn-boost');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.triggerRewardedBoost();
    });
  }

  triggerRewardedBoost() {
    if (this.isBoostActive) {
      this.hud.showToast('⚡ 2x Hız Takviyesi Zaten Aktif!', '#f39c12');
      return;
    }

    // Simulated rewarded video prompt/ad
    this.hud.showToast('🎬 Reklam İzlendi! 30sn 2x Hız Aktif!', '#e67e22');
    this.isBoostActive = true;
    this.boostTimer = this.boostDuration;

    const btn = document.getElementById('btn-boost');
    if (btn) {
      btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
      btn.querySelector('.pill-value').innerText = `${Math.ceil(this.boostTimer)}s`;
    }
  }

  update(delta) {
    if (this.isBoostActive) {
      this.boostTimer -= delta;

      const btn = document.getElementById('btn-boost');
      if (btn) {
        btn.querySelector('.pill-value').innerText = `${Math.ceil(this.boostTimer)}s`;
      }

      if (this.boostTimer <= 0) {
        this.isBoostActive = false;
        this.hud.showToast('⏳ 2x Hız Takviyesi Sona Erdi', '#7f8c8d');
        if (btn) {
          btn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
          btn.querySelector('.pill-value').innerText = '2x HIZ';
        }
      }
    }
  }

  getSpeedMultiplier() {
    return this.isBoostActive ? 2.0 : 1.0;
  }
}

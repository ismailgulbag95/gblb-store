import * as THREE from 'three';

/**
 * WorldBadge renders a crisp, high-DPI HTML Canvas texture mapped onto a 3D Sprite or Plane,
 * oriented towards the camera. Used for showing zone costs, item recipes, and machine progress.
 */
export class WorldBadge {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.title = options.title || 'Upgrade';
    this.icon = options.icon || '⭐';
    this.cost = options.cost || 0;
    this.currentCost = options.cost || 0;
    this.unit = options.unit || '💵';
    this.subtitle = options.subtitle || '';
    this.color = options.color || '#2ed573';
    this.badgeType = options.type || 'ZONE'; // 'ZONE', 'RECIPE', 'INFO'

    this.canvas = document.createElement('canvas');
    this.canvas.width = 512;
    this.canvas.height = 256;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // Sprite Material is always camera-facing
    const spriteMat = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });

    this.sprite = new THREE.Sprite(spriteMat);
    this.sprite.scale.set(2.4, 1.2, 1.0);
    this.sprite.position.set(0, 2.0, 0);

    this.group = new THREE.Group();
    this.group.add(this.sprite);
    if (options.position) {
      this.group.position.copy(options.position);
    }
    this.scene.add(this.group);

    this.render();
  }

  updateCost(remainingCost) {
    this.currentCost = Math.max(0, remainingCost);
    this.render();
  }

  updateRecipe(progressPercent, currentInput, maxInput, isProcessing = false) {
    this.progressPercent = progressPercent;
    this.currentInput = currentInput;
    this.maxInput = maxInput;
    this.isProcessing = isProcessing;
    this.renderRecipe();
  }

  setPosition(x, y, z) {
    this.group.position.set(x, y, z);
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Chunky Pill Bubble Container
    const rx = 24;
    const ry = 24;
    const rw = w - 48;
    const rh = h - 48;
    const radius = 32;

    // Outer Glow / Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;

    // Background: Clean Snowy White Cloud Card
    ctx.fillStyle = '#ffffff';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.fill();
    ctx.restore();

    // Duolingo 3D Chunky Bottom Shadow Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = this.color || '#58cc02';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.stroke();

    // 2. Icon & Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title text (Fredoka / Nunito Bold)
    ctx.font = '900 36px "Fredoka", "Nunito", sans-serif';
    ctx.fillStyle = '#4b4b4b';
    ctx.fillText(`${this.icon} ${this.title}`, w / 2, ry + 46);

    // 3. Cost / Price Tag (Duolingo 3D Button Pill)
    if (this.cost > 0) {
      const isFree = this.currentCost <= 0;
      const costText = isFree ? 'TAMAMLANDI! 🎉' : `${this.unit} ${this.currentCost}`;
      
      // Cost Pill
      const pillW = 270;
      const pillH = 56;
      const pillX = (w - pillW) / 2;
      const pillY = ry + 92;

      // Duolingo 3D Pill Base
      ctx.fillStyle = isFree ? '#58cc02' : '#f7f7f7';
      this.roundRect(ctx, pillX, pillY, pillW, pillH, 18);
      ctx.fill();

      // Progress fill inside cost pill (Duolingo XP Bar)
      if (!isFree) {
        const spent = this.cost - this.currentCost;
        const pct = Math.min(1.0, Math.max(0, spent / this.cost));
        if (pct > 0) {
          ctx.fillStyle = '#58cc02';
          this.roundRect(ctx, pillX, pillY, pillW * pct, pillH, 18);
          ctx.fill();
        }
      }

      ctx.lineWidth = 3;
      ctx.strokeStyle = isFree ? '#46a302' : '#e5e5e5';
      this.roundRect(ctx, pillX, pillY, pillW, pillH, 18);
      ctx.stroke();

      ctx.font = '900 32px "Fredoka", "Nunito", sans-serif';
      const spent = this.cost - this.currentCost;
      ctx.fillStyle = isFree || (spent / this.cost > 0.4) ? '#ffffff' : '#ff9600';
      ctx.fillText(costText, w / 2, pillY + pillH / 2 + 2);
    }

    this.texture.needsUpdate = true;
  }

  renderRecipe() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    const rx = 24;
    const ry = 24;
    const rw = w - 48;
    const rh = h - 48;
    const radius = 32;

    // Background (Duolingo White Card)
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#ffffff';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.fill();
    ctx.restore();

    // Border (Duolingo Sky Blue or Orange)
    ctx.lineWidth = 6;
    ctx.strokeStyle = this.isProcessing ? '#ff9600' : '#1cb0f6';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.stroke();

    // Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 34px "Fredoka", "Nunito", sans-serif';
    ctx.fillStyle = '#4b4b4b';
    ctx.fillText(`${this.icon} ${this.title}`, w / 2, ry + 44);

    // Status / Input Stock
    const statusText = this.isProcessing 
      ? `⚙️ Pişiyor... %${Math.floor(this.progressPercent * 100)}` 
      : `Stok: ${this.currentInput || 0} / ${this.maxInput || 0}`;
    
    ctx.font = '800 24px "Fredoka", sans-serif';
    ctx.fillStyle = this.isProcessing ? '#ff9600' : '#777777';
    ctx.fillText(statusText, w / 2, ry + 90);

    // Progress Bar (Duolingo Smooth XP Bar)
    const barW = 320;
    const barH = 20;
    const barX = (w - barW) / 2;
    const barY = ry + 120;

    ctx.fillStyle = '#e5e5e5';
    this.roundRect(ctx, barX, barY, barW, barH, 10);
    ctx.fill();

    if (this.progressPercent > 0) {
      ctx.fillStyle = this.isProcessing ? '#ff9600' : '#58cc02';
      this.roundRect(ctx, barX, barY, Math.max(barW * Math.min(1.0, this.progressPercent), 14), barH, 10);
      ctx.fill();
    }

    this.texture.needsUpdate = true;
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  destroy() {
    if (this.group && this.group.parent) {
      this.group.parent.remove(this.group);
    }
    if (this.texture) {
      this.texture.dispose();
    }
  }
}

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
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, ry, 0, ry + rh);
    bgGrad.addColorStop(0, '#2c3e50');
    bgGrad.addColorStop(1, '#1a252f');
    ctx.fillStyle = bgGrad;
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.fill();
    ctx.restore();

    // Chunky Golden/Emerald Border
    ctx.lineWidth = 8;
    ctx.strokeStyle = this.color;
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.stroke();

    // 2. Icon & Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title text
    ctx.font = 'bold 36px "Fredoka", "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${this.icon} ${this.title}`, w / 2, ry + 50);

    // 3. Cost / Price Tag
    if (this.cost > 0) {
      const isFree = this.currentCost <= 0;
      const costText = isFree ? 'TAMAMLANDI! 🎉' : `${this.unit} ${this.currentCost}`;
      
      // Cost Pill
      const pillW = 260;
      const pillH = 54;
      const pillX = (w - pillW) / 2;
      const pillY = ry + 95;

      ctx.fillStyle = isFree ? '#27ae60' : 'rgba(0, 0, 0, 0.6)';
      this.roundRect(ctx, pillX, pillY, pillW, pillH, 20);
      ctx.fill();

      // Progress fill inside cost pill
      if (!isFree) {
        const spent = this.cost - this.currentCost;
        const pct = Math.min(1.0, Math.max(0, spent / this.cost));
        if (pct > 0) {
          ctx.fillStyle = 'rgba(46, 204, 113, 0.75)';
          this.roundRect(ctx, pillX, pillY, pillW * pct, pillH, 20);
          ctx.fill();
        }
      }

      ctx.font = 'bold 34px "Fredoka", "Segoe UI", sans-serif';
      ctx.fillStyle = isFree ? '#ffffff' : '#f1c40f';
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

    // Background
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = 'rgba(26, 37, 47, 0.94)';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.fill();
    ctx.restore();

    // Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = this.isProcessing ? '#e67e22' : '#3498db';
    this.roundRect(ctx, rx, ry, rw, rh, radius);
    ctx.stroke();

    // Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 34px "Fredoka", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${this.icon} ${this.title}`, w / 2, ry + 45);

    // Status / Input Stock
    const statusText = this.isProcessing 
      ? `⚙️ Pişiyor... %${Math.floor(this.progressPercent * 100)}` 
      : `Giriş: ${this.currentInput} / ${this.maxInput}`;
    
    ctx.font = '600 28px "Fredoka", sans-serif';
    ctx.fillStyle = this.isProcessing ? '#f39c12' : '#ecf0f1';
    ctx.fillText(statusText, w / 2, ry + 95);

    // Progress Bar
    const barW = 320;
    const barH = 20;
    const barX = (w - barW) / 2;
    const barY = ry + 125;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    this.roundRect(ctx, barX, barY, barW, barH, 10);
    ctx.fill();

    if (this.progressPercent > 0) {
      ctx.fillStyle = this.isProcessing ? '#e67e22' : '#2ecc71';
      this.roundRect(ctx, barX, barY, barW * Math.min(1.0, this.progressPercent), barH, 10);
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

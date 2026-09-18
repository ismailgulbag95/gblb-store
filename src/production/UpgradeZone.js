import * as THREE from 'three';
import { WorldBadge } from '../ui/WorldBadge.js';

export class UpgradeZone {
  constructor(scene, x, z, cost, title, onUnlockedCallback, icon = '✨') {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);
    this.totalCost = cost;
    this.remainingCost = cost;
    this.title = title;
    this.icon = icon;
    this.onUnlocked = onUnlockedCallback;

    this.isUnlocked = false;
    this.radius = 1.35;
    this.drainTimer = 0;
    this.dwellTimer = 0; // Requires standing inside before draining

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    // Active flying particle coins
    this.flyingCoins = [];

    this.buildZoneMesh();
    this.buildWorldBadge();
  }

  buildZoneMesh() {
    // 1. Glowing Outer Ring
    const ringGeo = new THREE.RingGeometry(0.85, 1.25, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2ed573,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.03;
    this.meshGroup.add(this.ring);

    // 2. Inner Pulsing Circle Mat
    const innerGeo = new THREE.CircleGeometry(0.82, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x2ed573,
      transparent: true,
      opacity: 0.3
    });
    this.innerCircle = new THREE.Mesh(innerGeo, innerMat);
    this.innerCircle.rotation.x = -Math.PI / 2;
    this.innerCircle.position.y = 0.02;
    this.meshGroup.add(this.innerCircle);

    // 3. Arrow / Dollar Center Icon
    const centerDiscGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xf1c40f,
      metalness: 0.7,
      roughness: 0.2
    });
    this.centerDisc = new THREE.Mesh(centerDiscGeo, centerMat);
    this.centerDisc.position.y = 0.06;
    this.meshGroup.add(this.centerDisc);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: this.title,
      icon: this.icon,
      cost: this.totalCost,
      color: '#2ed573',
      position: new THREE.Vector3(this.position.x, 2.2, this.position.z)
    });
  }

  update(delta, player, playerMoney, onMoneySpentCallback) {
    if (this.isUnlocked) return;

    // Pulsing visual ring
    const scale = 1.0 + Math.sin(Date.now() * 0.006) * 0.07;
    this.ring.scale.set(scale, scale, 1);
    this.centerDisc.rotation.y += delta * 2.0;

    // Check Player proximity and drain money ONLY when standing inside (> 0.30s)
    if (player) {
      const dist = this.position.distanceTo(player.mesh.position);
      if (dist <= this.radius && playerMoney > 0 && this.remainingCost > 0) {
        this.dwellTimer += delta;

        // Player must intentionally stay inside the zone
        if (this.dwellTimer >= 0.30) {
          this.drainTimer += delta;
          if (this.drainTimer >= 0.06) {
            this.drainTimer = 0;
            const spendAmount = Math.min(Math.min(3, playerMoney), this.remainingCost);
            this.remainingCost -= spendAmount;
            
            if (onMoneySpentCallback) onMoneySpentCallback(spendAmount);

            // Update 3D Floating Badge
            this.badge.updateCost(this.remainingCost);

            // Spawn Flying Cash Particle from Player to Zone Center
            this.spawnFlyingCash(player.mesh.position);

            if (this.remainingCost <= 0) {
              this.unlock();
            }
          }
        }
      } else {
        // Reset dwell timer when player steps out or passes through
        this.dwellTimer = 0;
        this.drainTimer = 0;
      }
    }

    // Animate Flying Cash Particles
    this.updateFlyingCash(delta);
  }

  spawnFlyingCash(playerPos) {
    const geo = new THREE.PlaneGeometry(0.25, 0.14);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x2ecc71,
      side: THREE.DoubleSide
    });
    const cash = new THREE.Mesh(geo, mat);
    
    // Start slightly above player
    cash.position.copy(playerPos);
    cash.position.y += 0.8 + Math.random() * 0.2;
    cash.rotation.x = Math.random() * Math.PI;

    this.scene.add(cash);

    this.flyingCoins.push({
      mesh: cash,
      target: new THREE.Vector3(this.position.x, 0.1, this.position.z),
      progress: 0,
      speed: 3.5 + Math.random() * 1.5,
      startPos: cash.position.clone()
    });
  }

  updateFlyingCash(delta) {
    for (let i = this.flyingCoins.length - 1; i >= 0; i--) {
      const p = this.flyingCoins[i];
      p.progress += delta * p.speed;

      // Parabolic arc path
      const t = Math.min(1.0, p.progress);
      p.mesh.position.lerpVectors(p.startPos, p.target, t);
      p.mesh.position.y += Math.sin(t * Math.PI) * 0.5;
      p.mesh.rotation.y += delta * 15.0;

      if (t >= 1.0) {
        this.scene.remove(p.mesh);
        this.flyingCoins.splice(i, 1);
      }
    }
  }

  unlock() {
    this.isUnlocked = true;
    this.scene.remove(this.meshGroup);

    // Clean up particles
    this.flyingCoins.forEach(c => this.scene.remove(c.mesh));
    this.flyingCoins = [];

    // Destroy World Badge
    if (this.badge) {
      this.badge.destroy();
    }

    // Spawn Confetti Celebration
    this.spawnCelebrationConfetti();

    if (this.onUnlocked) this.onUnlocked();
  }

  spawnCelebrationConfetti() {
    const colors = [0xf1c40f, 0xe74c3c, 0x3498db, 0x2ecc71, 0x9b59b6];
    for (let i = 0; i < 20; i++) {
      const geo = new THREE.PlaneGeometry(0.12, 0.12);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        side: THREE.DoubleSide
      });
      const conf = new THREE.Mesh(geo, mat);
      conf.position.copy(this.position);
      conf.position.y = 0.5;

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        4.0 + Math.random() * 3.0,
        (Math.random() - 0.5) * 6
      );

      this.scene.add(conf);

      let life = 0;
      const animateConfetti = () => {
        life += 0.03;
        vel.y -= 0.15; // gravity
        conf.position.addScaledVector(vel, 0.03);
        conf.rotation.x += 0.2;
        conf.rotation.y += 0.3;

        if (life < 1.0 && conf.position.y > 0.05) {
          requestAnimationFrame(animateConfetti);
        } else {
          this.scene.remove(conf);
        }
      };
      animateConfetti();
    }
  }
}

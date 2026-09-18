import * as THREE from 'three';
import { WorldBadge } from '../ui/WorldBadge.js';
import gsap from 'gsap';

export class LuckyRewardDrop {
  constructor(scene, x, z, onClaimCallback) {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);
    this.onClaimCallback = onClaimCallback;
    this.lifespan = 18.0; // 18 seconds before it disappears
    this.isClaimed = false;
    this.isExpired = false;
    this.interactionRadius = 1.6;
    this.dwellTimer = 0;
    this.requiredDwell = 0.25;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.set(x, 4.0, z); // Starts from sky
    this.scene.add(this.meshGroup);

    this.rewardTypes = [
      { id: 'MONEY_BURST', title: '500$ Para Yağmuru', icon: '💰', desc: 'Anında kasanıza 500$ ekler!' },
      { id: 'SUPER_SPEED', title: '30sn Süper Hız (2.5x)', icon: '⚡', desc: '30 saniye boyunca turbo hızlı koşun!' },
      { id: 'MAX_STACK', title: 'Full Çanta Doldurma', icon: '🎒', desc: 'Sırt çantanızı anında maksimum ürünle doldurur!' }
    ];

    this.selectedReward = this.rewardTypes[Math.floor(Math.random() * this.rewardTypes.length)];

    this.buildMesh();
    this.buildBadge();
    this.animateSpawn();
  }

  buildMesh() {
    // 1. Glowing Floor Ring
    const ringGeo = new THREE.RingGeometry(0.8, 1.3, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff9600,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.04;
    this.scene.add(this.ring);
    this.ring.position.set(this.position.x, 0.04, this.position.z);

    // 2. Gift Box Base (Golden/Coral Clay Box)
    const boxGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xffc800,
      roughness: 0.3,
      metalness: 0.1
    });
    this.box = new THREE.Mesh(boxGeo, boxMat);
    this.box.position.y = 0.45;
    this.box.castShadow = true;
    this.meshGroup.add(this.box);

    // 3. Ribbon (Red/Coral Cross)
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xff4b4b, roughness: 0.4 });
    const rib1 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.92, 0.22), ribbonMat);
    rib1.position.y = 0.45;
    this.meshGroup.add(rib1);

    const rib2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.92, 0.92), ribbonMat);
    rib2.position.y = 0.45;
    this.meshGroup.add(rib2);

    // 4. Ribbon Bow on Top
    const bowGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const bow = new THREE.Mesh(bowGeo, ribbonMat);
    bow.position.y = 0.98;
    this.meshGroup.add(bow);
  }

  buildBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `${this.selectedReward.icon} SÜRPRİZ 🎬`,
      icon: '🎁',
      cost: 0,
      type: 'INFO',
      color: '#ff9600',
      position: new THREE.Vector3(this.position.x, 2.4, this.position.z)
    });
  }

  animateSpawn() {
    // Parachute / Drop Animation from Sky to Ground
    gsap.to(this.meshGroup.position, {
      y: 0,
      duration: 0.8,
      ease: 'bounce.out'
    });
  }

  update(delta, playerPos, onTriggerPrompt) {
    if (this.isClaimed || this.isExpired) return;

    this.lifespan -= delta;

    // Rotate box and pulse ring
    if (this.box) {
      this.box.rotation.y += delta * 1.5;
    }
    if (this.ring) {
      this.ring.rotation.z += delta * 1.2;
      const s = 1.0 + Math.sin(Date.now() * 0.006) * 0.12;
      this.ring.scale.set(s, s, 1.0);
    }

    if (this.lifespan <= 0) {
      this.destroy();
      this.isExpired = true;
      return;
    }

    // Check Player Proximity & Dwell
    if (playerPos) {
      const dist = this.position.distanceTo(playerPos);
      if (dist < this.interactionRadius) {
        this.dwellTimer += delta;
        if (this.dwellTimer >= this.requiredDwell) {
          this.dwellTimer = 0;
          if (onTriggerPrompt) {
            onTriggerPrompt(this);
          }
        }
      } else {
        this.dwellTimer = 0;
      }
    }
  }

  claim() {
    if (this.isClaimed) return;
    this.isClaimed = true;

    // Pop scale animation before removal
    gsap.to(this.meshGroup.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.destroy();
      }
    });

    if (this.onClaimCallback) {
      this.onClaimCallback(this.selectedReward);
    }
  }

  destroy() {
    if (this.ring) {
      this.scene.remove(this.ring);
      if (this.ring.geometry) this.ring.geometry.dispose();
      if (this.ring.material) this.ring.material.dispose();
    }
    if (this.badge) {
      if (this.badge.group) this.scene.remove(this.badge.group);
      if (this.badge.texture) this.badge.texture.dispose();
    }
    if (this.meshGroup) {
      this.scene.remove(this.meshGroup);
    }
  }
}

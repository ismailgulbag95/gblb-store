import * as THREE from 'three';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class BakeryOven {
  constructor(scene, x, z, environment = null) {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);

    this.wheatStock = 0;
    this.eggStock = 0;
    this.breadStock = [];
    this.maxCapacity = 6;
    this.bakeDuration = GAME_CONFIG.PROCESSING.breadTime;
    this.bakeTimer = 0;
    this.isBaking = false;

    this.inputZonePos = new THREE.Vector3(x - 1.4, 0, z);
    this.outputZonePos = new THREE.Vector3(x + 1.4, 0, z);
    this.interactionRadius = 1.85;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    if (environment) {
      environment.registerObstacle(x, z, 2.4, 1.8);
    }

    this.breadMeshes = [];
    this.buildOvenMesh();
    this.buildWorldBadge();
  }

  buildOvenMesh() {
    // 1. Cobblestone Stone Base
    const baseGeo = new THREE.BoxGeometry(2.2, 0.6, 1.8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.9 });
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 0.3;
    base.castShadow = true;
    base.receiveShadow = true;
    this.meshGroup.add(base);

    // 2. Brick Oven Dome
    const domeGeo = new THREE.SphereGeometry(0.9, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    const brickMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.8 });
    const dome = new THREE.Mesh(domeGeo, brickMat);
    dome.position.set(0, 0.6, 0);
    dome.castShadow = true;
    this.meshGroup.add(dome);

    // 3. Glowing Fire Hearth Opening
    const hearthGeo = new THREE.BoxGeometry(0.7, 0.4, 0.4);
    const hearthMat = new THREE.MeshBasicMaterial({ color: 0xff793f }); // Glowing orange fire
    this.hearth = new THREE.Mesh(hearthGeo, hearthMat);
    this.hearth.position.set(0, 0.75, 0.8);
    this.meshGroup.add(this.hearth);

    // 4. Chimney
    const chimney = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.18, 0.9, 8),
      new THREE.MeshStandardMaterial({ color: 0x57606f })
    );
    chimney.position.set(0.5, 1.6, -0.3);
    chimney.castShadow = true;
    this.meshGroup.add(chimney);

    // 5. Input Table (Flour & Eggs)
    const inTable = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.3, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xe67e22 })
    );
    inTable.position.set(-1.4, 0.15, 0);
    this.meshGroup.add(inTable);

    // 6. Output Bread Basket
    const outBasket = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.3, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x27ae60 })
    );
    outBasket.position.set(1.4, 0.15, 0);
    this.meshGroup.add(outBasket);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `🍞 ${i18n.t('unlock_bakery')}`,
      icon: '🍞',
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.8, this.position.z)
    });
    this.updateWorldBadge(0);
  }

  updateWorldBadge(progress = 0) {
    if (this.badge) {
      this.badge.updateRecipe(progress, `${this.wheatStock}🌾 + ${this.eggStock}🥚`, '2🌾 + 1🥚', this.isBaking);
    }
  }

  update(delta, player, time, speedMultiplier = 1.0) {
    // Hearth flame flicker
    if (this.hearth) {
      const flicker = 0.8 + Math.sin(time * 15) * 0.2;
      this.hearth.material.color.setRGB(1.0, 0.45 * flicker, 0.2 * flicker);
    }

    // Player Interactions
    if (player) {
      const distIn = this.inputZonePos.distanceTo(player.mesh.position);
      if (distIn <= this.interactionRadius) {
        if (this.wheatStock < 4) {
          const w = player.stack.popItem(ITEM_TYPES.WHEAT);
          if (w) this.wheatStock++;
        }
        if (this.eggStock < 3) {
          const e = player.stack.popItem(ITEM_TYPES.EGG);
          if (e) this.eggStock++;
        }
        this.updateWorldBadge();
      }

      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.breadStock.length > 0 && player.stack.canAdd()) {
        const bread = this.breadStock.pop();
        const mesh = this.breadMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(bread);
      }
    }

    // Baking logic: 2 Wheat + 1 Egg -> 1 Bread
    if (!this.isBaking && this.wheatStock >= 2 && this.eggStock >= 1 && this.breadStock.length < this.maxCapacity) {
      this.isBaking = true;
      this.wheatStock -= 2;
      this.eggStock -= 1;
      this.bakeTimer = 0;
    }

    if (this.isBaking) {
      this.bakeTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.bakeTimer / this.bakeDuration);
      this.updateWorldBadge(progress);

      if (this.bakeTimer >= this.bakeDuration) {
        this.isBaking = false;
        this.bakeTimer = 0;
        this.breadStock.push(ITEM_TYPES.BREAD);
        this.spawnBreadMesh();
        this.updateWorldBadge(0);
      }
    }
  }

  spawnBreadMesh() {
    const geo = new THREE.BoxGeometry(0.3, 0.18, 0.25);
    const mat = new THREE.MeshStandardMaterial({ color: ITEM_TYPES.BREAD.color, roughness: 0.5 });
    const bread = new THREE.Mesh(geo, mat);

    const idx = this.breadStock.length - 1;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    bread.position.set(1.25 + col * 0.35, 0.4, -0.25 + row * 0.3);
    bread.castShadow = true;

    this.meshGroup.add(bread);
    this.breadMeshes.push(bread);
  }
}

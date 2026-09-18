import * as THREE from 'three';
import { ITEM_TYPES } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class ChickenCoop {
  constructor(scene, x, z, environment = null) {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);

    this.feedStock = 0;
    this.eggStock = [];
    this.maxEggCapacity = 6;
    this.layDuration = 3.0;
    this.layTimer = 0;

    this.inputZonePos = new THREE.Vector3(x - 1.3, 0, z);
    this.outputZonePos = new THREE.Vector3(x + 1.3, 0, z);
    this.interactionRadius = 1.85;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    if (environment) {
      environment.registerObstacle(x, z, 2.4, 1.8);
    }

    this.eggMeshes = [];
    this.chickens = [];
    this.buildCoopMesh();
    this.buildWorldBadge();
  }

  buildCoopMesh() {
    // 1. Wooden Barn Shed
    const shedGeo = new THREE.BoxGeometry(2.0, 1.4, 1.6);
    const shedMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.7 }); // Red barn wood
    const shed = new THREE.Mesh(shedGeo, shedMat);
    shed.position.y = 0.7;
    shed.castShadow = true;
    shed.receiveShadow = true;
    this.meshGroup.add(shed);

    // 2. Straw Roof
    const roofGeo = new THREE.ConeGeometry(1.6, 0.8, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.9 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 1.8;
    roof.castShadow = true;
    this.meshGroup.add(roof);

    // 3. Hay Nests & Fence Pen
    const hayGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.2, 8);
    const hayMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.9 });
    const hay = new THREE.Mesh(hayGeo, hayMat);
    hay.position.set(0, 0.1, 0.8);
    this.meshGroup.add(hay);

    // 4. Low-Poly Chickens (2 animated chickens)
    this.createChicken(-0.3, 0.25, 0.8);
    this.createChicken(0.3, 0.25, 0.7);

    // 5. Input Hopper (Mısır Yemliği)
    const hopper = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xe67e22 })
    );
    hopper.position.set(-1.3, 0.1, 0);
    this.meshGroup.add(hopper);

    // 6. Output Nest Basket (Yumurta Sepeti)
    const outBasket = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x27ae60 })
    );
    outBasket.position.set(1.3, 0.1, 0);
    this.meshGroup.add(outBasket);
  }

  createChicken(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // White Body
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), bodyMat);
    body.scale.set(1, 1.2, 1.4);
    body.castShadow = true;
    group.add(body);

    // Red Comb
    const combMat = new THREE.MeshBasicMaterial({ color: 0xe74c3c });
    const comb = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 4), combMat);
    comb.position.set(0, 0.2, 0.1);
    group.add(comb);

    // Yellow Beak
    const beakMat = new THREE.MeshBasicMaterial({ color: 0xf39c12 });
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), beakMat);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.08, 0.26);
    group.add(beak);

    this.meshGroup.add(group);
    this.chickens.push(group);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `🐔 ${i18n.t('unlock_coop')}`,
      icon: '🥚',
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.7, this.position.z)
    });
    this.badge.updateRecipe(0, this.feedStock, 6, false);
  }

  update(delta, player, time, speedMultiplier = 1.0) {
    // 1. Bobbing Chicken pecking animation
    this.chickens.forEach((chk, i) => {
      chk.rotation.x = Math.sin(time * 6.0 + i) * 0.2;
      chk.position.y = 0.25 + Math.abs(Math.sin(time * 8.0 + i)) * 0.04;
    });

    // 2. Player Input Interaction (Deposit Corn)
    if (player) {
      const distIn = this.inputZonePos.distanceTo(player.mesh.position);
      if (distIn <= this.interactionRadius && this.feedStock < 6) {
        const corn = player.stack.popItem(ITEM_TYPES.CORN);
        if (corn) {
          this.feedStock++;
          this.badge.updateRecipe(0, this.feedStock, 6, this.feedStock > 0);
        }
      }

      // 3. Player Output Interaction (Collect Eggs)
      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.eggStock.length > 0 && player.stack.canAdd()) {
        const egg = this.eggStock.pop();
        const mesh = this.eggMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(egg);
      }
    }

    // 4. Egg laying process
    if (this.feedStock > 0 && this.eggStock.length < this.maxEggCapacity) {
      this.layTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.layTimer / this.layDuration);
      this.badge.updateRecipe(progress, this.feedStock, 6, true);

      if (this.layTimer >= this.layDuration) {
        this.layTimer = 0;
        this.feedStock--;
        this.eggStock.push(ITEM_TYPES.EGG);
        this.spawnEggMesh();
        this.badge.updateRecipe(0, this.feedStock, 6, this.feedStock > 0);
      }
    }
  }

  spawnEggMesh() {
    const geo = new THREE.SphereGeometry(0.1, 8, 8);
    geo.scale(1, 1.3, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.3 });
    const egg = new THREE.Mesh(geo, mat);

    const idx = this.eggStock.length - 1;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    egg.position.set(1.15 + col * 0.3, 0.3, -0.25 + row * 0.3);
    egg.castShadow = true;

    this.meshGroup.add(egg);
    this.eggMeshes.push(egg);
  }
}

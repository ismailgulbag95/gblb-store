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
    this.maxEggCapacity = 8;
    this.chickenCount = 1;
    this.layDuration = 4.2; // Base for 1 chicken
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
    // 1. Wooden Barn Shed (Red Barn Wood)
    const shedGeo = new THREE.BoxGeometry(2.0, 1.4, 1.6);
    const shedMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.7 });
    const shed = new THREE.Mesh(shedGeo, shedMat);
    shed.position.y = 0.7;
    shed.castShadow = true;
    shed.receiveShadow = true;
    this.meshGroup.add(shed);

    // Barn Door Opening Frame
    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.9, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x3e2723 })
    );
    doorFrame.position.set(0, 0.45, 0.81);
    this.meshGroup.add(doorFrame);

    // 2. Straw Thatched Roof
    const roofGeo = new THREE.ConeGeometry(1.65, 0.85, 4);
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

    // 4. Initial Chickens (Starts with 1 Chicken)
    this.createChicken(0, 0.25, 0.75);

    // 5. Input Hopper (Tavuk Yemi Bunkeri)
    const hopper = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.2, 0.85),
      new THREE.MeshStandardMaterial({ color: 0xd4ac0d, roughness: 0.5 })
    );
    hopper.position.set(-1.3, 0.1, 0);
    this.meshGroup.add(hopper);

    // 6. Output Nest Basket (Yumurta Sepeti)
    const outBasket = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.2, 0.85),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5 })
    );
    outBasket.position.set(1.3, 0.1, 0);
    this.meshGroup.add(outBasket);
  }

  addChicken() {
    this.chickenCount++;
    if (this.chickenCount === 2) {
      this.createChicken(-0.35, 0.25, 0.7);
      this.layDuration = 2.6; // 2x faster with 2 chickens
    } else if (this.chickenCount >= 3) {
      this.createChicken(0.35, 0.25, 0.7);
      this.layDuration = 1.5; // Super fast with 3 chickens
    }
    this.updateWorldBadge(0);
  }

  createChicken(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // White Plump Body
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

    // Tail Feather
    const tailMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9 });
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 4), tailMat);
    tail.rotation.x = -Math.PI / 3;
    tail.position.set(0, 0.12, -0.22);
    group.add(tail);

    this.meshGroup.add(group);
    this.chickens.push(group);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `🐔 ${i18n.t('item_egg')}`,
      icon: '🥚',
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.7, this.position.z)
    });
    this.updateWorldBadge(0);
  }

  updateWorldBadge(progress = 0) {
    if (this.badge) {
      const label = `${this.feedStock} Yem (${this.chickenCount} 🐔)`;
      this.badge.updateRecipe(progress, label, `${this.chickenCount}x Hız`, this.feedStock > 0);
    }
  }

  update(delta, player, time, speedMultiplier = 1.0, onEggCollectedCallback = null) {
    // 1. Bobbing Chicken pecking animation
    this.chickens.forEach((chk, i) => {
      chk.rotation.x = Math.sin(time * 6.0 + i * 2.0) * 0.2;
      chk.position.y = 0.25 + Math.abs(Math.sin(time * 8.0 + i * 1.5)) * 0.04;
    });

    // 2. Player Input Interaction (Deposit CHICKEN_FEED)
    if (player) {
      const distIn = this.inputZonePos.distanceTo(player.mesh.position);
      if (distIn <= this.interactionRadius && this.feedStock < 8) {
        const feed = player.stack.popItem(ITEM_TYPES.CHICKEN_FEED);
        if (feed) {
          this.feedStock++;
          this.updateWorldBadge(0);
        }
      }

      // 3. Player Output Interaction (Collect Eggs)
      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.eggStock.length > 0 && player.stack.canAdd()) {
        const egg = this.eggStock.pop();
        const mesh = this.eggMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(egg);
        if (onEggCollectedCallback) {
          onEggCollectedCallback(egg);
        }
      }
    }

    // 4. Egg laying process
    if (this.feedStock > 0 && this.eggStock.length < this.maxEggCapacity) {
      this.layTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.layTimer / this.layDuration);
      this.updateWorldBadge(progress);

      if (this.layTimer >= this.layDuration) {
        this.layTimer = 0;
        this.feedStock--;
        this.eggStock.push(ITEM_TYPES.EGG);
        this.spawnEggMesh();
        this.updateWorldBadge(0);
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
    egg.position.set(1.15 + col * 0.3, 0.35, -0.25 + row * 0.3);
    egg.castShadow = true;

    this.meshGroup.add(egg);
    this.eggMeshes.push(egg);
  }
}

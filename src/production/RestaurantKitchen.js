import * as THREE from 'three';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class RestaurantKitchen {
  constructor(scene, x, z, mealType = ITEM_TYPES.BURGER, environment = null) {
    this.scene = scene;
    this.mealType = mealType;
    this.position = new THREE.Vector3(x, 0, z);

    this.inputStock1 = 0; // Primary (e.g. Bread or Wheat)
    this.inputStock2 = 0; // Secondary (e.g. Tomato or Paste)
    this.mealStock = [];
    this.maxCapacity = 4;
    this.cookDuration = mealType.id === 'BURGER' ? GAME_CONFIG.PROCESSING.burgerTime : GAME_CONFIG.PROCESSING.pizzaTime;
    this.cookTimer = 0;
    this.isCooking = false;

    this.inputZonePos = new THREE.Vector3(x - 1.4, 0, z);
    this.outputZonePos = new THREE.Vector3(x + 1.4, 0, z);
    this.interactionRadius = 1.85;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    if (environment) {
      environment.registerObstacle(x, z, 2.4, 1.6);
    }

    this.mealMeshes = [];
    this.buildKitchenMesh();
    this.buildWorldBadge();
  }

  buildKitchenMesh() {
    // 1. Stainless Steel Modern Kitchen Counter Base
    const baseGeo = new THREE.BoxGeometry(2.4, 0.9, 1.4);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xbdc3c7,
      metalness: 0.8,
      roughness: 0.2
    });
    const base = new THREE.Mesh(baseGeo, steelMat);
    base.position.y = 0.45;
    base.castShadow = true;
    base.receiveShadow = true;
    this.meshGroup.add(base);

    // 2. Grill Top / Oven Chamber
    const grillGeo = new THREE.BoxGeometry(1.4, 0.2, 0.9);
    const grillMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.4 });
    const grill = new THREE.Mesh(grillGeo, grillMat);
    grill.position.set(0, 0.95, 0);
    this.meshGroup.add(grill);

    // 3. Glowing Heated Plate
    const plateGeo = new THREE.PlaneGeometry(1.2, 0.7);
    const plateMat = new THREE.MeshBasicMaterial({
      color: this.mealType.id === 'BURGER' ? 0xe74c3c : 0xf39c12
    });
    this.plate = new THREE.Mesh(plateGeo, plateMat);
    this.plate.rotation.x = -Math.PI / 2;
    this.plate.position.set(0, 1.06, 0);
    this.meshGroup.add(this.plate);

    // 4. Input Chopping Board (Left)
    const inBoard = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.15, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xe67e22 })
    );
    inBoard.position.set(-1.4, 0.1, 0);
    this.meshGroup.add(inBoard);

    // 5. Output Serving Platter (Right)
    const outPlatter = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.15, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x27ae60 })
    );
    outPlatter.position.set(1.4, 0.1, 0);
    this.meshGroup.add(outPlatter);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `${this.mealType.icon} ${i18n.t(this.mealType.nameKey)}`,
      icon: this.mealType.icon,
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.7, this.position.z)
    });
    this.updateWorldBadge(0);
  }

  updateWorldBadge(progress = 0) {
    if (this.badge) {
      const isBurger = this.mealType.id === 'BURGER';
      const label = isBurger 
        ? `${this.inputStock1}🍞 + ${this.inputStock2}🍅`
        : `${this.inputStock1}🌾 + ${this.inputStock2}🥫`;
      const needed = isBurger ? '1🍞 + 1🍅' : '1🌾 + 1🥫';
      this.badge.updateRecipe(progress, label, needed, this.isCooking);
    }
  }

  update(delta, player, time, speedMultiplier = 1.0, onMealCollectedCallback = null, onIngredientAddedCallback = null) {
    if (this.plate) {
      this.plate.material.opacity = 0.7 + Math.sin(time * 10) * 0.3;
    }

    if (player) {
      const isBurger = this.mealType.id === 'BURGER';
      const type1 = isBurger ? ITEM_TYPES.BREAD : ITEM_TYPES.WHEAT;
      const type2 = isBurger ? ITEM_TYPES.TOMATO : ITEM_TYPES.TOMATO_PASTE;

      const distIn = this.inputZonePos.distanceTo(player.mesh.position);
      if (distIn <= this.interactionRadius) {
        if (this.inputStock1 < 3) {
          const item1 = player.stack.popItem(type1);
          if (item1) {
            this.inputStock1++;
            if (onIngredientAddedCallback) onIngredientAddedCallback(item1, this.mealType);
          }
        }
        if (this.inputStock2 < 3) {
          const item2 = player.stack.popItem(type2);
          if (item2) {
            this.inputStock2++;
            if (onIngredientAddedCallback) onIngredientAddedCallback(item2, this.mealType);
          }
        }
        this.updateWorldBadge();
      }

      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.mealStock.length > 0 && player.stack.canAdd()) {
        const meal = this.mealStock.pop();
        const mesh = this.mealMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(meal);
        if (onMealCollectedCallback) {
          onMealCollectedCallback(meal);
        }
      }
    }

    // Cooking condition: 1 Primary + 1 Secondary
    if (!this.isCooking && this.inputStock1 >= 1 && this.inputStock2 >= 1 && this.mealStock.length < this.maxCapacity) {
      this.isCooking = true;
      this.inputStock1--;
      this.inputStock2--;
      this.cookTimer = 0;
    }

    if (this.isCooking) {
      this.cookTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.cookTimer / this.cookDuration);
      this.updateWorldBadge(progress);

      if (this.cookTimer >= this.cookDuration) {
        this.isCooking = false;
        this.cookTimer = 0;
        this.mealStock.push(this.mealType);
        this.spawnMealMesh();
        this.updateWorldBadge(0);
      }
    }
  }

  spawnMealMesh() {
    const mat = new THREE.MeshStandardMaterial({ color: this.mealType.color, roughness: 0.3 });
    let mesh;

    if (this.mealType.id === 'BURGER') {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 8), mat);
    } else {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 12), mat);
    }

    const idx = this.mealStock.length - 1;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    mesh.position.set(1.25 + col * 0.35, 0.35, -0.25 + row * 0.3);
    mesh.castShadow = true;

    this.meshGroup.add(mesh);
    this.mealMeshes.push(mesh);
  }
}

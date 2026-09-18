import * as THREE from 'three';
import { ITEM_TYPES } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class DiningTable {
  constructor(scene, x, z, tableIndex = 1, environment = null) {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);
    this.tableIndex = tableIndex;

    this.isOccupied = false;
    this.seatedCustomer = null;
    this.desiredMeal = null;
    this.servedMeal = null;

    this.isEating = false;
    this.eatDuration = 3.5;
    this.eatTimer = 0;

    this.uncollectedTip = 0;
    this.tipCoins = [];
    this.interactionRadius = 2.0;

    this.seatPos = new THREE.Vector3(x, 0, z - 0.7); // Customer chair position

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    if (environment) {
      environment.registerObstacle(x, z, 1.8, 1.8);
    }

    this.buildTableMesh();
    this.buildWorldBadge();
  }

  buildTableMesh() {
    // 1. Table Top & Legs (Rich Teak Wood)
    const tableTopGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.08, 16);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.6 });
    const tableTop = new THREE.Mesh(tableTopGeo, woodMat);
    tableTop.position.y = 0.85;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    this.meshGroup.add(tableTop);

    // Table Leg
    const legGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.82, 8);
    const leg = new THREE.Mesh(legGeo, woodMat);
    leg.position.y = 0.41;
    leg.castShadow = true;
    this.meshGroup.add(leg);

    // Table Base Ring
    const baseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 12);
    const base = new THREE.Mesh(baseGeo, woodMat);
    base.position.y = 0.03;
    this.meshGroup.add(base);

    // 2. Tablecloth / Centerpiece
    const clothGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.09, 16);
    const clothMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa });
    const cloth = new THREE.Mesh(clothGeo, clothMat);
    cloth.position.y = 0.86;
    this.meshGroup.add(cloth);

    // 3. Two Low-Poly Wooden Chairs
    this.createChair(0, -0.7, 0); // Front chair
    this.createChair(0, 0.7, Math.PI); // Back chair
  }

  createChair(x, z, rotationY) {
    const chairGroup = new THREE.Group();
    chairGroup.position.set(x, 0, z);
    chairGroup.rotation.y = rotationY;

    const mat = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.7 });
    
    // Seat
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.5), mat);
    seat.position.y = 0.45;
    seat.castShadow = true;

    // Backrest
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.06), mat);
    back.position.set(0, 0.7, -0.22);
    back.castShadow = true;

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 6);
    const l1 = new THREE.Mesh(legGeo, mat);
    l1.position.set(-0.2, 0.22, -0.2);
    const l2 = l1.clone(); l2.position.x = 0.2;
    const l3 = l1.clone(); l3.position.z = 0.2;
    const l4 = l2.clone(); l4.position.z = 0.2;

    chairGroup.add(seat, back, l1, l2, l3, l4);
    this.meshGroup.add(chairGroup);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `🍽️ Masa #${this.tableIndex}`,
      icon: '🍽️',
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.3, this.position.z)
    });
    this.updateWorldBadge();
  }

  updateWorldBadge() {
    if (!this.badge) return;

    if (!this.isOccupied) {
      this.badge.updateRecipe(0, 'Boş Masa', 'Müşteri Bekleniyor', false);
    } else if (this.isEating) {
      const pct = Math.min(1.0, this.eatTimer / this.eatDuration);
      this.badge.updateRecipe(pct, '🍽️ Yiyor...', `${Math.floor(pct * 100)}%`, true);
    } else if (this.desiredMeal) {
      this.badge.updateRecipe(0, `${this.desiredMeal.icon} Sipariş`, 'Servis Bekleniyor', false);
    }
  }

  seatGuest(customer, mealType = ITEM_TYPES.BURGER) {
    this.isOccupied = true;
    this.seatedCustomer = customer;
    this.desiredMeal = mealType;
    this.servedMeal = null;
    this.isEating = false;
    this.eatTimer = 0;
    this.updateWorldBadge();
  }

  serveMeal(mealType) {
    if (!this.isOccupied || this.isEating || !this.desiredMeal) return false;
    if (mealType.id === this.desiredMeal.id) {
      this.servedMeal = mealType;
      this.isEating = true;
      this.eatTimer = 0;

      // Spawn meal on table
      const mat = new THREE.MeshStandardMaterial({ color: mealType.color });
      this.tableMealMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8), mat);
      this.tableMealMesh.position.set(0, 0.95, 0);
      this.meshGroup.add(this.tableMealMesh);

      this.updateWorldBadge();
      return true;
    }
    return false;
  }

  update(delta, player, time, onTipCollectedCallback) {
    // 1. Eating animation & process
    if (this.isEating) {
      this.eatTimer += delta;
      this.updateWorldBadge();

      if (this.eatTimer >= this.eatDuration) {
        this.isEating = false;
        if (this.tableMealMesh) {
          this.meshGroup.remove(this.tableMealMesh);
          this.tableMealMesh = null;
        }

        // Spawn Big Tip Coins on table! (Price + 25$ Tip)
        const totalEarnings = (this.desiredMeal ? this.desiredMeal.price : 50) + 25;
        this.spawnTipBurst(totalEarnings, onTipCollectedCallback);

        // Release Customer
        if (this.seatedCustomer) {
          this.seatedCustomer.state = 'LEAVING';
          this.seatedCustomer = null;
        }
        this.isOccupied = false;
        this.desiredMeal = null;
        this.updateWorldBadge();
      }
    }

    // 2. Player proximity check to deliver meal from stack
    if (player && this.isOccupied && !this.isEating && this.desiredMeal) {
      const dist = this.position.distanceTo(player.mesh.position);
      if (dist <= this.interactionRadius) {
        const item = player.stack.popItem(this.desiredMeal);
        if (item) {
          this.serveMeal(item);
        }
      }
    }

    // 3. Animate tip coins
    this.updateTipCoins(delta, player);
  }

  spawnTipBurst(amount, onTipCollectedCallback) {
    if (onTipCollectedCallback) {
      onTipCollectedCallback(amount);
    }

    for (let i = 0; i < 4; i++) {
      const geo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 10);
      const mat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8 });
      const coin = new THREE.Mesh(geo, mat);
      coin.position.set(
        this.position.x + (Math.random() - 0.5) * 0.6,
        1.0,
        this.position.z + (Math.random() - 0.5) * 0.6
      );
      this.scene.add(coin);
      this.tipCoins.push({ mesh: coin, isMagnet: false });
    }
  }

  updateTipCoins(delta, player) {
    for (let i = this.tipCoins.length - 1; i >= 0; i--) {
      const c = this.tipCoins[i];
      if (player) {
        const dist = c.mesh.position.distanceTo(player.mesh.position);
        if (dist < 4.5) c.isMagnet = true;
      }

      if (c.isMagnet && player) {
        c.mesh.position.lerp(player.mesh.position, delta * 15.0);
        c.mesh.position.y += 0.8 * delta;
        if (c.mesh.position.distanceTo(player.mesh.position) < 0.6) {
          this.scene.remove(c.mesh);
          this.tipCoins.splice(i, 1);
        }
      }
    }
  }
}

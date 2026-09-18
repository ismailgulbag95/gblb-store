import * as THREE from 'three';
import { ITEM_TYPES } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class Shelf {
  constructor(scene, x, z, acceptedItemType = ITEM_TYPES.TOMATO, capacity = 8, label = 'Reyon', environment = null) {
    this.scene = scene;
    this.acceptedType = acceptedItemType;
    this.capacity = capacity;
    this.label = label;
    this.position = new THREE.Vector3(x, 0, z);
    this.stock = [];
    this.itemMeshes = [];

    this.interactionRadius = 1.9;
    this.restockCooldown = 0.1;
    this.lastRestockTime = 0;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    // Register Solid Box Obstacle
    if (environment) {
      environment.registerObstacle(x, z, 2.0, 1.2);
    }

    this.waitingCustomers = [];
    this.buildShelfMesh();
    this.buildWorldBadge();
  }

  getWaitQueuePosition(index = 0) {
    // Front of shelf facing customers
    return new THREE.Vector3(this.position.x, 0, this.position.z + 1.3 + index * 0.85);
  }

  buildShelfMesh() {
    // 1. Wooden Stand Base (Warm Rich Oak / Pine Wood)
    const standGeo = new THREE.BoxGeometry(2.0, 1.0, 1.2);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xb87333, // Rich warm wood base
      roughness: 0.75,
      metalness: 0.1
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.5;
    stand.castShadow = true;
    stand.receiveShadow = true;
    this.meshGroup.add(stand);

    // Front Decorative Wood Panel Strip
    const panelGeo = new THREE.BoxGeometry(1.8, 0.4, 0.04);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(0, 0.5, 0.61);
    this.meshGroup.add(panel);

    // 2. Distinct Deep Wooden / Market Tray (Produce Bed) - Clearly differentiated from white floor
    const trayBedGeo = new THREE.BoxGeometry(1.86, 0.08, 1.06);
    const trayBedMat = new THREE.MeshStandardMaterial({
      color: 0x3e2723, // Deep rich dark walnut wood bed (high contrast with floor & products)
      roughness: 0.9,
      metalness: 0.05
    });
    const trayBed = new THREE.Mesh(trayBedGeo, trayBedMat);
    trayBed.position.y = 1.04;
    trayBed.receiveShadow = true;
    this.meshGroup.add(trayBed);

    // 3. Wooden Slats / Planks Texture on the Countertop (Gives distinct wooden crate groove look)
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.85 });
    [-0.55, -0.18, 0.18, 0.55].forEach(posX => {
      const slatGeo = new THREE.BoxGeometry(0.32, 0.02, 1.02);
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(posX, 1.08, 0);
      slat.receiveShadow = true;
      this.meshGroup.add(slat);
    });

    // 4. Raised Wooden Rim / Borders (Prevents products from falling & creates unmistakable counter look)
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.7 });
    
    // Front & Back Rims
    const longRimGeo = new THREE.BoxGeometry(1.98, 0.16, 0.08);
    const frontRim = new THREE.Mesh(longRimGeo, rimMat);
    frontRim.position.set(0, 1.1, 0.56);
    frontRim.castShadow = true;
    this.meshGroup.add(frontRim);

    const backRim = new THREE.Mesh(longRimGeo, rimMat);
    backRim.position.set(0, 1.1, -0.56);
    backRim.castShadow = true;
    this.meshGroup.add(backRim);

    // Left & Right Side Rims
    const sideRimGeo = new THREE.BoxGeometry(0.08, 0.16, 1.18);
    const leftRim = new THREE.Mesh(sideRimGeo, rimMat);
    leftRim.position.set(-0.95, 1.1, 0);
    leftRim.castShadow = true;
    this.meshGroup.add(leftRim);

    const rightRim = new THREE.Mesh(sideRimGeo, rimMat);
    rightRim.position.set(0.95, 1.1, 0);
    rightRim.castShadow = true;
    this.meshGroup.add(rightRim);

    // 5. Product Category Front Tag Board
    const tagGeo = new THREE.BoxGeometry(0.85, 0.22, 0.05);
    const tagMat = new THREE.MeshStandardMaterial({
      color: this.acceptedType.color,
      roughness: 0.3,
      metalness: 0.1
    });
    const tag = new THREE.Mesh(tagGeo, tagMat);
    tag.position.set(0, 0.92, 0.63);
    this.meshGroup.add(tag);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `${this.acceptedType.icon} ${i18n.t(this.acceptedType.nameKey) || this.label}`,
      icon: this.acceptedType.icon,
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.3, this.position.z)
    });
    this.updateBadge();
  }

  updateBadge() {
    if (this.badge) {
      const pct = this.stock.length / this.capacity;
      this.badge.updateRecipe(pct, this.stock.length, this.capacity, false);
    }
  }

  canAccept(itemType) {
    return this.stock.length < this.capacity && itemType.id === this.acceptedType.id;
  }

  hasStock() {
    return this.stock.length > 0;
  }

  getStockCount() {
    return this.stock.length;
  }

  takeItem() {
    if (this.stock.length === 0) return null;
    const item = this.stock.pop();
    const mesh = this.itemMeshes.pop();
    if (mesh) this.meshGroup.remove(mesh);
    this.updateBadge();
    return item;
  }

  addItem(itemType) {
    if (this.stock.length >= this.capacity) return false;

    this.stock.push(itemType);

    const index = this.stock.length - 1;
    const row = Math.floor(index / 4);
    const col = index % 4;

    const posX = (col - 1.5) * 0.4;
    const posZ = (row - 0.5) * 0.4;
    const posY = 1.25;

    const mesh = this.createShelfItemMesh(itemType);
    mesh.position.set(posX, posY, posZ);
    mesh.scale.set(0.1, 0.1, 0.1);
    this.meshGroup.add(mesh);
    this.itemMeshes.push(mesh);

    let p = 0;
    const pop = () => {
      p += 0.2;
      const s = 1.0 + Math.sin(p * Math.PI) * 0.3;
      mesh.scale.set(s, s, s);
      if (p < 1) requestAnimationFrame(pop);
      else mesh.scale.set(1, 1, 1);
    };
    pop();

    this.updateBadge();
    return true;
  }

  createShelfItemMesh(itemType) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.3 });

    if (itemType.id === 'TOMATO' || itemType.id === 'ORANGE') {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), mat);
      mesh.castShadow = true;
      group.add(mesh);
    } else if (itemType.id === 'TOMATO_PASTE') {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 8), mat);
      mesh.castShadow = true;
      group.add(mesh);
    } else if (itemType.id === 'ORANGE_JUICE') {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.3, 8), mat);
      mesh.castShadow = true;
      group.add(mesh);
    } else if (itemType.id === 'CORN') {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.32, 6), mat);
      mesh.castShadow = true;
      group.add(mesh);
    } else if (itemType.id === 'POPCORN') {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.28, 0.25), mat);
      box.castShadow = true;
      group.add(box);
    } else if (itemType.id === 'CHICKEN_FEED') {
      const bag = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 8), mat);
      bag.castShadow = true;
      group.add(bag);
    } else if (itemType.id === 'EGG') {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mat);
      mesh.scale.set(1, 1.3, 1);
      mesh.castShadow = true;
      group.add(mesh);
    } else if (itemType.id === 'BREAD') {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.25), mat);
      mesh.castShadow = true;
      group.add(mesh);
    } else {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), mat);
      box.castShadow = true;
      group.add(box);
    }

    return group;
  }

  update(delta, player, time) {
    if (!player) return;

    const dist = this.position.distanceTo(player.mesh.position);
    if (dist <= this.interactionRadius && this.stock.length < this.capacity) {
      if (time - this.lastRestockTime > this.restockCooldown) {
        const item = player.stack.popItem(this.acceptedType);
        if (item) {
          this.addItem(item);
          this.lastRestockTime = time;
        }
      }
    }
  }
}

import * as THREE from 'three';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';
import { i18n } from '../i18n/LanguageManager.js';

export class FarmPlot {
  constructor(scene, x, z, itemType = ITEM_TYPES.TOMATO, label = 'Tarla', environment = null) {
    this.scene = scene;
    this.itemType = itemType;
    this.label = label;
    this.position = new THREE.Vector3(x, 0, z);
    this.radius = 1.85;

    this.growDuration = GAME_CONFIG.FARM.growTime;
    this.growTimer = 0;
    this.ripeCount = 3;
    this.maxCount = 3;

    this.plants = [];
    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    // Register Solid Obstacle for the raised garden bed
    if (environment) {
      environment.registerObstacle(x, z, 2.2, 2.2);
    }

    this.buildSoilBed();
  }

  buildSoilBed() {
    // 1. Wooden raised bed frame
    const frameGeo = new THREE.BoxGeometry(2.4, 0.25, 2.4);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
    const frame = new THREE.Mesh(frameGeo, woodMat);
    frame.position.y = 0.12;
    frame.castShadow = true;
    frame.receiveShadow = true;
    this.meshGroup.add(frame);

    // 2. Rich soil
    const soilGeo = new THREE.BoxGeometry(2.1, 0.22, 2.1);
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.95 });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.15;
    this.meshGroup.add(soil);

    // 3. Plant stalks
    const plantPositions = [
      { x: -0.5, z: 0 },
      { x: 0.5, z: -0.5 },
      { x: 0.5, z: 0.5 }
    ];

    plantPositions.forEach((pos) => {
      const plantGroup = new THREE.Group();
      plantGroup.position.set(pos.x, 0.2, pos.z);

      // Stalk
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, 0.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
      );
      stem.position.y = 0.25;
      stem.castShadow = true;

      // Leaves
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 6, 6),
        new THREE.MeshStandardMaterial({ color: 0x4caf50 })
      );
      leaves.position.y = 0.45;

      // Crop Fruit
      let fruit;
      if (this.itemType.id === 'CORN') {
        const cornGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.35, 6);
        const cornMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3 });
        fruit = new THREE.Mesh(cornGeo, cornMat);
        fruit.position.set(0, 0.5, 0);
      } else if (this.itemType.id === 'WHEAT') {
        const wheatGeo = new THREE.ConeGeometry(0.12, 0.4, 6);
        const wheatMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.5 });
        fruit = new THREE.Mesh(wheatGeo, wheatMat);
        fruit.position.set(0, 0.55, 0);
      } else {
        const fruitGeo = new THREE.SphereGeometry(0.15, 8, 8);
        const fruitMat = new THREE.MeshStandardMaterial({ color: this.itemType.color, roughness: 0.3 });
        fruit = new THREE.Mesh(fruitGeo, fruitMat);
        fruit.position.set(0.12, 0.45, 0.12);
      }
      fruit.castShadow = true;

      plantGroup.add(stem, leaves, fruit);
      this.meshGroup.add(plantGroup);

      this.plants.push({
        group: plantGroup,
        fruit: fruit,
        isRipe: true,
        scale: 1.0
      });
    });
  }

  update(delta, player, speedMultiplier = 1.0) {
    if (this.ripeCount < this.maxCount) {
      this.growTimer += delta * speedMultiplier;
      const progress = Math.min(this.growTimer / this.growDuration, 1.0);

      this.plants.forEach((p) => {
        if (!p.isRipe) {
          p.group.scale.set(progress, progress, progress);
          if (progress >= 1.0) {
            p.isRipe = true;
            this.ripeCount++;
            p.group.scale.set(1.15, 1.15, 1.15);
            setTimeout(() => p.group.scale.set(1, 1, 1), 150);
          }
        }
      });

      if (progress >= 1.0) {
        this.growTimer = 0;
      }
    }

    // Player proximity check (Harvest on contact)
    if (player) {
      const dist = this.position.distanceTo(player.mesh.position);
      if (dist <= this.radius && this.ripeCount > 0 && player.stack.canAdd()) {
        this.harvest(player);
      }
    }
  }

  harvest(collector) {
    const ripePlant = this.plants.find(p => p.isRipe);
    if (!ripePlant) return;

    if (collector.stack.addItem(this.itemType)) {
      ripePlant.isRipe = false;
      this.ripeCount--;
      ripePlant.group.scale.set(0.1, 0.1, 0.1);
      this.growTimer = 0;
    }
  }
}

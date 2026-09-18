import * as THREE from 'three';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';
import { WorldBadge } from '../ui/WorldBadge.js';
import { i18n } from '../i18n/LanguageManager.js';

export class ProcessingMachine {
  constructor(scene, x, z, inputType = ITEM_TYPES.TOMATO, outputType = ITEM_TYPES.TOMATO_PASTE, label = 'İmalat Kazanı', environment = null) {
    this.scene = scene;
    this.inputType = inputType;
    this.outputType = outputType;
    this.label = label;
    this.position = new THREE.Vector3(x, 0, z);

    this.inputRequired = inputType.id === 'ORANGE' 
      ? GAME_CONFIG.PROCESSING.orangeInputRequired 
      : inputType.id === 'CORN'
      ? GAME_CONFIG.PROCESSING.popcornInputRequired
      : GAME_CONFIG.PROCESSING.inputRequired;

    this.processDuration = inputType.id === 'ORANGE'
      ? GAME_CONFIG.PROCESSING.orangeJuiceTime
      : inputType.id === 'CORN'
      ? GAME_CONFIG.PROCESSING.popcornTime
      : GAME_CONFIG.PROCESSING.tomatoPasteTime;

    this.inputStock = 0;
    this.outputStock = [];
    this.outputMaxCapacity = 6;
    this.processTimer = 0;
    this.isProcessing = false;

    this.inputZonePos = new THREE.Vector3(x - 1.3, 0, z);
    this.outputZonePos = new THREE.Vector3(x + 1.3, 0, z);
    this.interactionRadius = 1.85;

    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    // Register Solid Obstacle
    if (environment) {
      environment.registerObstacle(x, z, 2.4, 1.6);
    }

    this.outputMeshes = [];
    this.buildMachineMesh();
    this.buildWorldBadge();
  }

  buildMachineMesh() {
    // 1. Heavy Metal Base
    const baseGeo = new THREE.CylinderGeometry(1.0, 1.2, 0.4, 16);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, metalness: 0.6, roughness: 0.3 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.2;
    base.castShadow = true;
    base.receiveShadow = true;
    this.meshGroup.add(base);

    // 2. Cooking Tank / Mixer Vat
    const vatGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.2, 16);
    const vatMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, metalness: 0.7, roughness: 0.2 });
    this.vat = new THREE.Mesh(vatGeo, vatMat);
    this.vat.position.y = 1.0;
    this.vat.castShadow = true;
    this.meshGroup.add(this.vat);

    // 3. Brass / Copper Steam Chimney
    const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xd35400, metalness: 0.8 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(0.4, 1.7, 0);
    this.meshGroup.add(pipe);

    // 4. Output Tray / Basket (Green)
    const outTray = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5 })
    );
    outTray.position.set(1.3, 0.1, 0);
    outTray.receiveShadow = true;
    this.meshGroup.add(outTray);

    // 5. Input Hopper (Orange)
    const inHopper = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.2, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.5 })
    );
    inHopper.position.set(-1.3, 0.1, 0);
    inHopper.receiveShadow = true;
    this.meshGroup.add(inHopper);
  }

  buildWorldBadge() {
    this.badge = new WorldBadge(this.scene, {
      title: `${this.outputType.icon} ${i18n.t(this.outputType.nameKey) || this.label}`,
      icon: this.outputType.icon,
      cost: 0,
      type: 'RECIPE',
      position: new THREE.Vector3(this.position.x, 2.7, this.position.z)
    });
    this.badge.updateRecipe(0, this.inputStock, this.inputRequired * 3, false);
  }

  update(delta, player, time, speedMultiplier = 1.0) {
    if (player) {
      const distIn = this.inputZonePos.distanceTo(player.mesh.position);
      if (distIn <= this.interactionRadius && this.inputStock < this.inputRequired * 3) {
        const item = player.stack.popItem(this.inputType);
        if (item) {
          this.inputStock++;
          this.badge.updateRecipe(
            this.isProcessing ? (this.processTimer / this.processDuration) : 0,
            this.inputStock,
            this.inputRequired * 3,
            this.isProcessing
          );
        }
      }

      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.outputStock.length > 0 && player.stack.canAdd()) {
        const finishedItem = this.outputStock.pop();
        const mesh = this.outputMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(finishedItem);
      }
    }

    if (!this.isProcessing && this.inputStock >= this.inputRequired && this.outputStock.length < this.outputMaxCapacity) {
      this.isProcessing = true;
      this.inputStock -= this.inputRequired;
      this.processTimer = 0;
    }

    if (this.isProcessing) {
      this.processTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.processTimer / this.processDuration);

      this.vat.position.y = 1.0 + Math.sin(this.processTimer * 20) * 0.04;
      this.vat.rotation.y += delta * 2.0;

      this.badge.updateRecipe(progress, this.inputStock, this.inputRequired * 3, true);

      if (this.processTimer >= this.processDuration) {
        this.isProcessing = false;
        this.processTimer = 0;
        this.vat.position.y = 1.0;

        this.outputStock.push(this.outputType);
        this.spawnOutputMesh(this.outputType);

        this.badge.updateRecipe(0, this.inputStock, this.inputRequired * 3, false);
      }
    }
  }

  spawnOutputMesh(itemType) {
    const mat = new THREE.MeshStandardMaterial({ color: itemType.color });
    let mesh;

    if (itemType.id === 'POPCORN') {
      mesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.2), mat);
    } else {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 8), mat);
    }

    const idx = this.outputStock.length - 1;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    mesh.position.set(1.15 + col * 0.3, 0.35, -0.25 + row * 0.3);
    mesh.castShadow = true;

    this.meshGroup.add(mesh);
    this.outputMeshes.push(mesh);
  }
}

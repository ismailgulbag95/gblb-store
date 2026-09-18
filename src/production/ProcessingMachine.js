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
      : inputType.id === 'CORN' && outputType.id === 'POPCORN'
      ? GAME_CONFIG.PROCESSING.popcornInputRequired
      : inputType.id === 'CORN' && outputType.id === 'CHICKEN_FEED'
      ? GAME_CONFIG.PROCESSING.feedInputRequired
      : GAME_CONFIG.PROCESSING.inputRequired;

    this.processDuration = inputType.id === 'ORANGE'
      ? GAME_CONFIG.PROCESSING.orangeJuiceTime
      : inputType.id === 'CORN' && outputType.id === 'POPCORN'
      ? GAME_CONFIG.PROCESSING.popcornTime
      : inputType.id === 'CORN' && outputType.id === 'CHICKEN_FEED'
      ? GAME_CONFIG.PROCESSING.feedTime
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
    this.animatedParts = {};

    this.buildMachineMesh();
    this.buildWorldBadge();
  }

  buildMachineMesh() {
    // Determine machine type and build distinct aesthetic architecture
    if (this.outputType.id === 'ORANGE_JUICE') {
      this.buildJuicerMachine();
    } else if (this.outputType.id === 'POPCORN') {
      this.buildPopcornMachine();
    } else if (this.outputType.id === 'CHICKEN_FEED') {
      this.buildFeedGrinderMachine();
    } else {
      this.buildPasteVatMachine();
    }

    // Common Input Hopper & Output Tray on sides
    this.buildCommonHopperAndTray();
  }

  // --- 1. SALÇA İMALAT KAZANI (Heavy Cast Iron & Copper Steam Vat) ---
  buildPasteVatMachine() {
    // Base Stand (Heavy Granite / Cast Iron)
    const baseGeo = new THREE.CylinderGeometry(1.0, 1.15, 0.4, 16);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.6, roughness: 0.4 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.2;
    base.castShadow = true;
    this.meshGroup.add(base);

    // Copper Red Vat Body
    const vatGeo = new THREE.CylinderGeometry(0.85, 0.8, 1.1, 16);
    const vatMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, metalness: 0.3, roughness: 0.3 });
    this.vat = new THREE.Mesh(vatGeo, vatMat);
    this.vat.position.y = 0.95;
    this.vat.castShadow = true;
    this.meshGroup.add(this.vat);

    // Gold Vat Rim
    const rimGeo = new THREE.TorusGeometry(0.86, 0.06, 8, 24);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 1.5;
    this.meshGroup.add(rim);

    // Brass Steam Chimney
    const pipeGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.65, 8);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xd35400, metalness: 0.8 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(0.45, 1.7, -0.2);
    this.meshGroup.add(pipe);

    // Rotary Mixing Paddle (Karıştırıcı Pervane)
    const paddleGroup = new THREE.Group();
    paddleGroup.position.set(0, 1.5, 0);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8), rimMat);
    shaft.position.y = -0.15;
    const blade1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.04), rimMat);
    blade1.position.y = -0.3;
    const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.6), rimMat);
    blade2.position.y = -0.3;
    paddleGroup.add(shaft, blade1, blade2);
    this.meshGroup.add(paddleGroup);
    this.animatedParts.paddle = paddleGroup;
  }

  // --- 2. TAZE PORTAKAL SIKMA MAKİNESİ (Sleek Citrus Juicer with Glass Tank & Reamer) ---
  buildJuicerMachine() {
    // Modern White & Chrome Counter Base
    const baseGeo = new THREE.CylinderGeometry(0.9, 0.95, 0.45, 16);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, metalness: 0.2, roughness: 0.2 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.22;
    base.castShadow = true;
    this.meshGroup.add(base);

    // Orange Accent Ring
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xff793f, roughness: 0.3 });
    const accentRing = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.08, 16), accentMat);
    accentRing.position.y = 0.45;
    this.meshGroup.add(accentRing);

    // Transparent Glass/Acrylic Juice Jar Tank
    const glassGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.9, 16);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1
    });
    const glassJar = new THREE.Mesh(glassGeo, glassMat);
    glassJar.position.y = 0.95;
    this.meshGroup.add(glassJar);

    // Inner Orange Juice Liquid
    const liquidGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.6, 16);
    const liquidMat = new THREE.MeshStandardMaterial({ color: 0xff9f1a, roughness: 0.3, transparent: true, opacity: 0.85 });
    this.juiceLiquid = new THREE.Mesh(liquidGeo, liquidMat);
    this.juiceLiquid.position.y = 0.8;
    this.meshGroup.add(this.juiceLiquid);
    this.animatedParts.juiceLiquid = this.juiceLiquid;

    // Top Citrus Press Reamer Cone (Spiral Sıkıcı)
    const reamerGeo = new THREE.ConeGeometry(0.35, 0.45, 8);
    const reamerMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.4 });
    const reamer = new THREE.Mesh(reamerGeo, reamerMat);
    reamer.position.y = 1.45;
    this.meshGroup.add(reamer);
    this.animatedParts.reamer = reamer;

    // Top Orange Feed Chute / Slide (Meyve Rampası)
    const chuteGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.45, 10);
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdfe4ea, metalness: 0.8, roughness: 0.2 });
    const chute = new THREE.Mesh(chuteGeo, chromeMat);
    chute.position.set(-0.35, 1.65, 0);
    chute.rotation.z = Math.PI / 4;
    this.meshGroup.add(chute);

    // Chrome Dispenser Spout (Krom Musluk)
    const spout = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.25), chromeMat);
    spout.position.set(0, 0.6, 0.78);
    this.meshGroup.add(spout);
  }

  // --- 3. MISIR PATLATMA (POPCORN) MAKİNESİ (Vintage Cinema Glass Cabinet) ---
  buildPopcornMachine() {
    // Red Cinema Cabinet Base
    const baseGeo = new THREE.BoxGeometry(1.6, 0.5, 1.4);
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });
    const base = new THREE.Mesh(baseGeo, redMat);
    base.position.y = 0.25;
    base.castShadow = true;
    this.meshGroup.add(base);

    // Gold Corner Pillars (4 Köşe Direği)
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });
    [[-0.65, -0.55], [0.65, -0.55], [-0.65, 0.55], [0.65, 0.55]].forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 0.08), goldMat);
      pillar.position.set(px, 0.95, pz);
      this.meshGroup.add(pillar);
    });

    // Glass Enclosure (Şeffaf Cam Kabin)
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1
    });
    const glassBox = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.95, 1.16), glassMat);
    glassBox.position.y = 0.95;
    this.meshGroup.add(glassBox);

    // Suspended Popping Kettle (Asılı Paslanmaz Tencere)
    const kettleGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.32, 12);
    const kettleMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, metalness: 0.8, roughness: 0.2 });
    const kettle = new THREE.Mesh(kettleGeo, kettleMat);
    kettle.position.set(0, 1.15, 0);
    this.meshGroup.add(kettle);
    this.animatedParts.kettle = kettle;

    // Popcorn Kernels Group inside glass (Patlayan Mısırlar)
    const kernelsGroup = new THREE.Group();
    kernelsGroup.position.set(0, 0.6, 0);
    const kernelMat = new THREE.MeshStandardMaterial({ color: 0xf6e58d, roughness: 0.8 });
    this.kernels = [];
    for (let k = 0; k < 12; k++) {
      const kMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 6, 6), kernelMat);
      kMesh.position.set(
        (Math.random() - 0.5) * 0.9,
        0.05 + Math.random() * 0.1,
        (Math.random() - 0.5) * 0.7
      );
      kernelsGroup.add(kMesh);
      this.kernels.push(kMesh);
    }
    this.meshGroup.add(kernelsGroup);
    this.animatedParts.kernels = this.kernels;

    // Red Cinema Roof Canopy (Kırmızı Çatı)
    const roofGeo = new THREE.BoxGeometry(1.65, 0.2, 1.45);
    const roof = new THREE.Mesh(roofGeo, redMat);
    roof.position.y = 1.55;
    this.meshGroup.add(roof);
  }

  // --- 4. TAVUK YEMİ / PELET DEĞİRMENİ (Industrial Mill & Rotary Gears) ---
  buildFeedGrinderMachine() {
    // Heavy Industrial Steel Base
    const baseGeo = new THREE.BoxGeometry(1.6, 0.45, 1.4);
    const indusMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 }); // Mill Green
    const base = new THREE.Mesh(baseGeo, indusMat);
    base.position.y = 0.22;
    base.castShadow = true;
    this.meshGroup.add(base);

    // Large Feed Grinding Funnel Hopper (Büyük Huni)
    const funnelGeo = new THREE.CylinderGeometry(0.75, 0.45, 0.85, 10);
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x57606f, metalness: 0.6, roughness: 0.4 });
    const funnel = new THREE.Mesh(funnelGeo, steelMat);
    funnel.position.y = 0.95;
    funnel.castShadow = true;
    this.meshGroup.add(funnel);

    // Visible Rotary Big Gear (Büyük Dönen Dişli Çark)
    const gearGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 12);
    const gearMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, metalness: 0.8, roughness: 0.3 });
    const gear1 = new THREE.Mesh(gearGeo, gearMat);
    gear1.rotation.z = Math.PI / 2;
    gear1.position.set(0.65, 0.9, 0);
    this.meshGroup.add(gear1);
    this.animatedParts.gear1 = gear1;

    const gear2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 8), gearMat);
    gear2.rotation.z = Math.PI / 2;
    gear2.position.set(0.65, 1.35, 0);
    this.meshGroup.add(gear2);
    this.animatedParts.gear2 = gear2;

    // Chute Output Spout (Yem Boşaltma Ağzı)
    const spout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.4), steelMat);
    spout.position.set(0, 0.45, 0.65);
    this.meshGroup.add(spout);
  }

  buildCommonHopperAndTray() {
    // Input Hopper (Orange Left Side)
    const inHopper = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.2, 0.85),
      new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.5 })
    );
    inHopper.position.set(-1.3, 0.1, 0);
    inHopper.receiveShadow = true;
    this.meshGroup.add(inHopper);

    // Output Tray (Green Right Side)
    const outTray = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.2, 0.85),
      new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5 })
    );
    outTray.position.set(1.3, 0.1, 0);
    outTray.receiveShadow = true;
    this.meshGroup.add(outTray);
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

  update(delta, player, time, speedMultiplier = 1.0, onOutputCollectedCallback = null) {
    if (player) {
      // 1. Input Deposit
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

      // 2. Output Collect
      const distOut = this.outputZonePos.distanceTo(player.mesh.position);
      if (distOut <= this.interactionRadius && this.outputStock.length > 0 && player.stack.canAdd()) {
        const finishedItem = this.outputStock.pop();
        const mesh = this.outputMeshes.pop();
        if (mesh) this.meshGroup.remove(mesh);
        player.stack.addItem(finishedItem);
        if (onOutputCollectedCallback) {
          onOutputCollectedCallback(finishedItem, this.outputType);
        }
      }
    }

    // 3. Trigger processing condition
    if (!this.isProcessing && this.inputStock >= this.inputRequired && this.outputStock.length < this.outputMaxCapacity) {
      this.isProcessing = true;
      this.inputStock -= this.inputRequired;
      this.processTimer = 0;
    }

    // 4. Processing Animation Loops
    if (this.isProcessing) {
      this.processTimer += delta * speedMultiplier;
      const progress = Math.min(1.0, this.processTimer / this.processDuration);

      // Animate unique parts based on machine type
      if (this.animatedParts.paddle) {
        this.animatedParts.paddle.rotation.y += delta * 8.0;
        if (this.vat) this.vat.position.y = 0.95 + Math.sin(time * 25) * 0.03;
      }

      if (this.animatedParts.reamer) {
        this.animatedParts.reamer.rotation.y += delta * 15.0;
        if (this.juiceLiquid) {
          this.juiceLiquid.scale.y = 0.4 + progress * 0.6;
          this.juiceLiquid.position.y = 0.6 + progress * 0.25;
        }
      }

      if (this.animatedParts.kettle) {
        this.animatedParts.kettle.rotation.z = Math.sin(time * 18) * 0.15;
        if (this.animatedParts.kernels) {
          this.animatedParts.kernels.forEach((k, idx) => {
            k.position.y = 0.08 + Math.abs(Math.sin(time * 12 + idx)) * 0.35;
            k.rotation.x += delta * 5.0;
          });
        }
      }

      if (this.animatedParts.gear1 && this.animatedParts.gear2) {
        this.animatedParts.gear1.rotation.x += delta * 6.0;
        this.animatedParts.gear2.rotation.x -= delta * 10.0;
      }

      this.badge.updateRecipe(progress, this.inputStock, this.inputRequired * 3, true);

      if (this.processTimer >= this.processDuration) {
        this.isProcessing = false;
        this.processTimer = 0;

        if (this.vat) this.vat.position.y = 0.95;

        this.outputStock.push(this.outputType);
        this.spawnOutputMesh(this.outputType);

        this.badge.updateRecipe(0, this.inputStock, this.inputRequired * 3, false);
      }
    }
  }

  spawnOutputMesh(itemType) {
    const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.3 });
    let mesh;

    if (itemType.id === 'POPCORN') {
      mesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.22), mat);
    } else if (itemType.id === 'CHICKEN_FEED') {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.32, 8), mat); // Feed Bag
    } else if (itemType.id === 'ORANGE_JUICE') {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.3, 8), mat); // Juice bottle
    } else {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 8), mat); // Paste jar
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


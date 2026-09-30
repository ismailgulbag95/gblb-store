import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Engine } from '../core/Engine.js';
import { MarketGrid } from '../environment/MarketGrid.js';
import { ITEMS, RECIPES, SHELVES, STATIONS } from '../domain/catalog.js';
import { CharacterFactory } from './CharacterFactory.js';
import { ZONES, canPlaceDecoration, canPlaceStation, getAllStationIds, getDecorationDimensions, getStationDimensions, isStationUnlocked, stationPosition } from '../domain/layout.js';
import { DECORATIONS } from '../domain/decorCatalog.js';

const CUSTOMER_SHIRTS = [0xff4757, 0xffa502, 0x2ed573, 0x1e90ff, 0xa55eea, 0xff6b81, 0x00d2d3, 0xffc048];
const CUSTOMER_HAIR = [0x2c3e50, 0x6d4c41, 0xdfe6e9, 0xf1c40f, 0xb33939];

export class WorldScene {
  constructor(containerId = 'game-container') {
    this.engine = new Engine(containerId);
    this.scene = this.engine.scene;
    this.environment = new MarketGrid(this.scene);
    this.farms = new Map();
    this.machines = new Map();
    this.shelves = new Map();
    this.customShelves = new Map();
    this.selfRegisters = new Map();
    this.customers = new Map();
    this.workers = new Map();
    this.tables = new Map();
    this.decorItems = new Map();
    this.decorationModels = new Map();
    this.decorationLoader = new GLTFLoader();
    this.coop = null;
    this.upgradeMarkers = new Map();
    this.itemGeometry = new Map();
    this.itemMaterials = new Map();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.clock = new THREE.Clock();
    this.effects = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.#createPlayer();
    this.#createAtmosphere();
    this.#createRegister();
    this.#loadDecorationModels();
    this.layoutGrid = new THREE.GridHelper(74, 148, 0x4ba7e4, 0x8ec7e6);
    this.layoutGrid.position.set(-17, 0.035, 0);
    this.layoutGrid.visible = false;
    this.scene.add(this.layoutGrid);
    this.selectedStation = null;
    this.selectionRing = new THREE.Mesh(
      new THREE.RingGeometry(1.15, 1.36, 48),
      new THREE.MeshBasicMaterial({ color: 0x00d9ff, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false }),
    );
    this.selectionRing.rotation.x = -Math.PI / 2;
    this.selectionRing.visible = false;
    this.scene.add(this.selectionRing);
    this.placementPreview = new THREE.Group();
    const previewPlaneGeo = new THREE.PlaneGeometry(1, 1);
    this.placementFill = new THREE.Mesh(
      previewPlaneGeo,
      new THREE.MeshBasicMaterial({ color: 0x2ed573, transparent: true, opacity: 0.42, depthWrite: false, side: THREE.DoubleSide }),
    );
    this.placementFill.rotation.x = -Math.PI / 2;
    this.placementPreview.add(this.placementFill);

    this.placementBorder = new THREE.LineSegments(
      new THREE.EdgesGeometry(previewPlaneGeo),
      new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.95, depthWrite: false }),
    );
    this.placementBorder.rotation.x = -Math.PI / 2;
    this.placementPreview.add(this.placementBorder);

    this.placementPreview.position.y = 0.045;
    this.placementPreview.visible = false;
    this.lastPreviewSnapped = null;
    this.scene.add(this.placementPreview);
  }

  #createPlayer() {
    this.playerCharacter = new CharacterFactory('shopkeeper');
    this.playerMesh = this.playerCharacter.group;
    this.#createPlayerCargo();
    this.scene.add(this.playerMesh);
  }

  #createPlayerCargo() {
    const cargo = new THREE.Group();
    cargo.position.set(0, 0, -0.47);
    const packMaterial = new THREE.MeshStandardMaterial({ color: 0x775037, roughness: 0.9 });
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.5, 0.16), packMaterial);
    pack.position.y = 0.71;
    pack.castShadow = true;
    cargo.add(pack);
    for (const x of [-0.16, 0.16]) {
      const strap = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.54, 0.08), packMaterial);
      strap.position.set(x, 0.73, 0.11);
      cargo.add(strap);
    }
    this.playerMesh.add(cargo);
    this.playerCargo = cargo;
    this.playerCargoSignature = null;
  }

  #syncPlayerCargo(items) {
    const signature = JSON.stringify(items);
    if (signature === this.playerCargoSignature) return;
    this.playerCargoSignature = signature;
    while (this.playerCargo.children.length > 3) this.playerCargo.remove(this.playerCargo.children[3]);
    let index = 0;
    for (const [itemId, count] of Object.entries(items)) {
      if (!ITEMS[itemId]) continue;
      for (let i = 0; i < count && index < 24; i += 1, index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        mesh.scale.setScalar(0.78);
        mesh.position.set((index % 2 ? 0.14 : -0.14), 0.99 + Math.floor(index / 4) * 0.23, -0.12 - (Math.floor(index / 2) % 2) * 0.24);
        mesh.castShadow = true;
        this.playerCargo.add(mesh);
      }
    }
  }

  #createAtmosphere() {
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xfff4c7 }),
    );
    sun.position.set(-54, 24, -36);
    this.scene.add(sun);
  }

  #createRegister() {
    const group = new THREE.Group();
    group.position.set(STATIONS.register.x, 0, STATIONS.register.z);

    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.35 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.25 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.6 });
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const bagMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 }); // Kraft grocery paper bag

    // 1. Red counter body with dark base kickplate
    const counterBody = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.82, 1.1), redMat);
    counterBody.position.y = 0.41;
    counterBody.castShadow = true;
    counterBody.receiveShadow = true;
    group.add(counterBody);

    const kickplate = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.1, 1.14), darkMat);
    kickplate.position.y = 0.05;
    group.add(kickplate);

    // 2. Clean white countertop with raised edges
    const counterTop = new THREE.Mesh(new THREE.BoxGeometry(2.56, 0.1, 1.16), whiteMat);
    counterTop.position.y = 0.87;
    counterTop.castShadow = true;
    group.add(counterTop);

    // 3. Black conveyor belt inset with silver divider bars
    const conveyorBelt = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.02, 0.55), beltMat);
    conveyorBelt.position.set(-0.4, 0.93, 0.16);
    group.add(conveyorBelt);

    // Silver divider sticks on conveyor
    for (const sx of [-0.85, -0.15]) {
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), chromeMat);
      stick.rotation.x = Math.PI / 2;
      stick.position.set(sx, 0.95, 0.16);
      group.add(stick);
    }

    // 4. Modern dual-screen POS cash register unit
    const posPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.28, 8), darkMat);
    posPedestal.position.set(0.38, 1.05, -0.22);
    group.add(posPedestal);

    // Cashier touchscreen (tilted towards cashier at z < -4)
    const cashierScreen = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.08), darkMat);
    cashierScreen.position.set(0.38, 1.25, -0.22);
    cashierScreen.rotation.x = 0.25;
    group.add(cashierScreen);

    const touchGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.32, 0.22),
      new THREE.MeshBasicMaterial({ color: 0x00d2d3 })
    );
    touchGlass.position.set(0.38, 1.25, -0.265);
    touchGlass.rotation.y = Math.PI;
    touchGlass.rotation.x = -0.25;
    group.add(touchGlass);

    // Customer-facing price display
    const customerDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.06), darkMat);
    customerDisplay.position.set(0.38, 1.22, -0.15);
    const priceText = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x2ed573 })
    );
    priceText.position.set(0.38, 1.22, -0.115);
    group.add(customerDisplay, priceText);

    // Flush-mount laser barcode scanner glass plate
    const scannerPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.02, 0.22),
      new THREE.MeshStandardMaterial({
        color: 0x2ed573,
        emissive: 0x2ed573,
        emissiveIntensity: 0.6,
        roughness: 0.1,
      })
    );
    scannerPlate.position.set(0.38, 0.93, 0.16);
    group.add(scannerPlate);

    // PIN pad payment terminal on customer side
    const pinPad = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.18), darkMat);
    pinPad.position.set(0.72, 0.96, 0.35);
    pinPad.rotation.x = -0.25;
    group.add(pinPad);

    // 5. Packing station with standing brown paper grocery bags
    for (const [bx, bz] of [[0.95, -0.15], [1.12, 0.18]]) {
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.38, 0.2), bagMat);
      bag.position.set(bx, 1.11, bz);
      bag.castShadow = true;
      group.add(bag);

      // Leek/celery green tops sticking out of bag
      const greenTop = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.18, 5),
        new THREE.MeshStandardMaterial({ color: 0x2ed573 })
      );
      greenTop.position.set(bx - 0.04, 1.35, bz + 0.03);
      greenTop.rotation.z = -0.2;
      group.add(greenTop);

      // Crusty baguette sticking out
      const baguette = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.035, 0.32, 6),
        new THREE.MeshStandardMaterial({ color: 0xc27c38 })
      );
      baguette.position.set(bx + 0.05, 1.38, bz - 0.02);
      baguette.rotation.z = 0.25;
      group.add(baguette);
    }

    // 6. Polished chrome queue guide stanchions & rails (Image 1 & 6)
    const railingGroup = new THREE.Group();
    for (const rx of [-1.15, 0.15, 1.25]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.95, 8), chromeMat);
      post.position.set(rx, 0.475, 0.72);
      post.castShadow = true;
      railingGroup.add(post);

      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), chromeMat);
      cap.position.set(rx, 0.96, 0.72);
      railingGroup.add(cap);
    }
    const railTop = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.4, 8), chromeMat);
    railTop.rotation.z = Math.PI / 2;
    railTop.position.set(0.05, 0.88, 0.72);
    const railMid = railTop.clone();
    railMid.position.y = 0.45;
    railingGroup.add(railTop, railMid);
    group.add(railingGroup);

    this.scene.add(group);
    this.registerMesh = group;
  }

  #createSelfRegister(id) {
    const group = new THREE.Group();
    const state = this.app?.getState();
    const p = state ? stationPosition(state, id) : { x: 5, z: -4 };
    if (p) group.position.set(p.x, 0, p.z);

    const whiteBodyMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.55 });
    const screenGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00d2d3,
      emissive: 0x00d2d3,
      emissiveIntensity: 0.5,
      roughness: 0.1,
    });
    const laserScannerMat = new THREE.MeshStandardMaterial({
      color: 0x2ed573,
      emissive: 0x2ed573,
      emissiveIntensity: 0.75,
      roughness: 0.1,
    });
    const bannerBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0984e3,
      roughness: 0.3,
    });

    // 1. Compact pedestal stand
    const stand = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.84, 0.88, 3, 0.05), whiteBodyMat);
    stand.position.y = 0.42;
    stand.castShadow = true;
    stand.receiveShadow = true;
    group.add(stand);

    const kickplate = new THREE.Mesh(new RoundedBoxGeometry(1.24, 0.08, 0.92, 2, 0.02), darkMat);
    kickplate.position.y = 0.04;
    group.add(kickplate);

    const counterTop = new THREE.Mesh(new RoundedBoxGeometry(1.26, 0.08, 0.94, 2, 0.03), darkMat);
    counterTop.position.y = 0.88;
    counterTop.castShadow = true;
    group.add(counterTop);

    // 2. Barcode scanner glass
    const scanner = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.02, 0.3), laserScannerMat);
    scanner.position.set(-0.24, 0.93, 0.1);
    group.add(scanner);

    // 3. Touchscreen POS terminal pedestal & display
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.38, 12), darkMat);
    post.position.set(0.18, 1.07, -0.12);
    group.add(post);

    const screenBezel = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.4, 0.07, 2, 0.03), darkMat);
    screenBezel.position.set(0.18, 1.34, -0.08);
    screenBezel.rotation.x = -0.3;
    screenBezel.castShadow = true;
    group.add(screenBezel);

    const screenGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.32), screenGlowMat);
    screenGlass.position.set(0.18, 1.345, -0.042);
    screenGlass.rotation.x = -0.3;
    group.add(screenGlass);

    // Illuminated "SELF-CHECKOUT" top sign
    const signBox = new THREE.Mesh(new RoundedBoxGeometry(0.68, 0.13, 0.08, 2, 0.02), bannerBlueMat);
    signBox.position.set(0.18, 1.63, -0.14);
    group.add(signBox);

    const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), laserScannerMat);
    led.position.set(0.18, 1.72, -0.14);
    group.add(led);

    // 4. PIN Pad on side
    const pinPadArm = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.18, 8), darkMat);
    pinPadArm.position.set(0.44, 0.96, 0.18);
    pinPadArm.rotation.z = -0.22;
    group.add(pinPadArm);

    const pinPad = new THREE.Mesh(new RoundedBoxGeometry(0.13, 0.035, 0.2, 2, 0.015), darkMat);
    pinPad.position.set(0.47, 1.03, 0.2);
    pinPad.rotation.x = -0.32;
    group.add(pinPad);

    // 5. Bagging shelf area
    const baggingTray = new THREE.Mesh(new RoundedBoxGeometry(0.4, 0.03, 0.48), whiteBodyMat);
    baggingTray.position.set(-0.24, 0.93, -0.2);
    baggingTray.castShadow = true;
    group.add(baggingTray);

    this.scene.add(group);
    return group;
  }

  #addCustomShelf(id, station) {
    if (this.customShelves.has(id)) return;
    const baseShelf = this.#addShelf(station.item);
    // Clonlanmış grup veya yeni grup
    const group = this.shelves.get(station.item)?.group.clone();
    if (!group) return;
    const productMeshes = [];
    group.traverse((child) => {
      if (child.isMesh && child.geometry === this.#getItemGeometry(station.item)) {
        productMeshes.push(child);
      }
    });
    const state = this.app?.getState();
    const p = state ? stationPosition(state, id) : station;
    if (p) group.position.set(p.x, 0, p.z);
    this.scene.add(group);
    this.customShelves.set(id, { group, productMeshes, item: station.item, id });
  }

  setObstacles(app) {
    app.setObstacles(this.environment.getObstacles());
  }

  setLayoutMode(enabled) {
    this.layoutGrid.visible = enabled;
    if (!enabled) this.selectStation(null);
  }

  #loadDecorationModels() {
    for (const item of Object.values(DECORATIONS)) {
      if (!item.model) continue;
      this.decorationLoader.load('/models/' + item.model + '.glb', (asset) => {
        this.decorationModels.set(item.model, asset.scene);
      }, undefined, (error) => console.warn('Dekorasyon modeli yüklenemedi:', item.model, error));
    }
  }

  selectStation(id, state = null) {
    this.selectedStation = id;
    this.selectionRing.visible = Boolean(id);
    if (!id) {
      this.placementPreview.visible = false;
      this.lastPreviewSnapped = null;
    } else if (state) {
      const point = this.#selectionPosition(state, id);
      this.previewPlacement(state, point.x, point.z);
    }
  }

  refreshPreview(state) {
    if (this.lastPreviewSnapped && state && this.selectedStation) {
      this.previewPlacement(state, this.lastPreviewSnapped.x, this.lastPreviewSnapped.z);
    }
  }

  previewPlacement(state, x, z) {
    if (!this.selectedStation) return;
    const snappedX = Math.round(x * 2) / 2;
    const snappedZ = Math.round(z * 2) / 2;
    this.lastPreviewSnapped = { x: snappedX, z: snappedZ };

    const isDecor = this.selectedStation.startsWith('decor:');
    let rotation = 0;
    let dims = { width: 2, depth: 2 };

    if (isDecor) {
      const decorId = this.selectedStation.slice(6);
      const decor = state.decorations?.find((item) => item.id === decorId);
      rotation = decor?.rotation ?? 0;
      dims = getDecorationDimensions(decor?.type, rotation);
    } else {
      rotation = state.layout?.[this.selectedStation]?.rotation ?? 0;
      dims = getStationDimensions(this.selectedStation, rotation);
    }

    this.placementPreview.position.set(snappedX, 0.045, snappedZ);
    this.placementFill.scale.set(dims.width, dims.depth, 1);
    this.placementBorder.scale.set(dims.width, dims.depth, 1);

    const valid = isDecor
      ? canPlaceDecoration(state, this.selectedStation.slice(6), snappedX, snappedZ, rotation)
      : canPlaceStation(state, this.selectedStation, snappedX, snappedZ, rotation);

    const fillColor = valid ? 0x2ed573 : 0xff4757;
    const borderColor = valid ? 0x00ff88 : 0xff3838;
    this.placementFill.material.color.setHex(fillColor);
    this.placementBorder.material.color.setHex(borderColor);
    this.placementPreview.visible = true;
  }

  #selectedGroup(id) {
    if (id.startsWith('decor:')) return this.decorItems.get(id.slice(6))?.group;
    if (id === 'register') return this.registerMesh;
    if (id.startsWith('selfRegister') || this.selfRegisters.has(id)) return this.selfRegisters.get(id);
    if (id === 'coop') return this.coop?.group;
    if (this.customShelves.has(id)) return this.customShelves.get(id)?.group;
    if (this.farms.has(id)) return this.farms.get(id)?.group;
    if (this.machines.has(id)) return this.machines.get(id)?.group;
    if (this.tables.has(id)) return this.tables.get(id);
    const station = STATIONS[id] ?? this.app?.getState()?.customStations?.[id];
    if (station?.kind === 'farm') return this.farms.get(id)?.group;
    if (station?.kind === 'machine') return this.machines.get(id)?.group;
    if (station?.kind === 'shelf') return this.shelves.get(station.item)?.group;
    if (station?.kind === 'table') return this.tables.get(id);
    return null;
  }

  stationAt(state, x, z) {
    let nearest = null;
    let distance = 2.2;
    const allIds = getAllStationIds(state);
    for (const id of allIds) {
      if (!isStationUnlocked(state, id)) continue;
      const point = stationPosition(state, id);
      if (!point) continue;
      const current = Math.hypot(x - point.x, z - point.z);
      if (current < distance) { nearest = id; distance = current; }
    }
    return nearest;
  }

  decorationAt(state, x, z) {
    let nearest = null;
    let distance = 1.05;
    for (const entry of state.decorations ?? []) {
      const current = Math.hypot(x - entry.x, z - entry.z);
      if (current < distance) { nearest = entry.id; distance = current; }
    }
    return nearest;
  }

  #selectionPosition(state, id) {
    if (!id.startsWith('decor:')) return stationPosition(state, id);
    const entry = state.decorations?.find((item) => item.id === id.slice(6));
    return entry ? { x: entry.x, z: entry.z } : { x: 0, z: 0 };
  }

  #getItemGeometry(itemId) {
    if (!this.itemGeometry.has(itemId)) {
      // High-detail lathe profiles matching commercial supermarket goods in Image 3
      const tomatoProfile = [
        new THREE.Vector2(0.015, -0.15),
        new THREE.Vector2(0.12, -0.145),
        new THREE.Vector2(0.185, -0.06),
        new THREE.Vector2(0.19, 0.05),
        new THREE.Vector2(0.15, 0.135),
        new THREE.Vector2(0.025, 0.15),
      ];
      const canProfile = [
        new THREE.Vector2(0.01, -0.175),
        new THREE.Vector2(0.122, -0.175),
        new THREE.Vector2(0.128, -0.16),
        new THREE.Vector2(0.12, -0.145),
        new THREE.Vector2(0.12, 0.145),
        new THREE.Vector2(0.128, 0.16),
        new THREE.Vector2(0.122, 0.175),
        new THREE.Vector2(0.01, 0.175),
      ];
      const orangeProfile = [
        new THREE.Vector2(0.015, -0.17),
        new THREE.Vector2(0.12, -0.15),
        new THREE.Vector2(0.18, -0.05),
        new THREE.Vector2(0.182, 0.06),
        new THREE.Vector2(0.125, 0.15),
        new THREE.Vector2(0.02, 0.17),
      ];
      const juiceBottleProfile = [
        new THREE.Vector2(0.01, -0.19),
        new THREE.Vector2(0.095, -0.19),
        new THREE.Vector2(0.098, 0.10),
        new THREE.Vector2(0.055, 0.15),
        new THREE.Vector2(0.048, 0.20),
        new THREE.Vector2(0.01, 0.20),
      ];
      const cornProfile = [
        new THREE.Vector2(0.02, -0.18),
        new THREE.Vector2(0.095, -0.14),
        new THREE.Vector2(0.118, 0.02),
        new THREE.Vector2(0.08, 0.15),
        new THREE.Vector2(0.03, 0.20),
        new THREE.Vector2(0.01, 0.21),
      ];
      const popcornProfile = [
        new THREE.Vector2(0.01, -0.18),
        new THREE.Vector2(0.095, -0.18),
        new THREE.Vector2(0.142, 0.11),
        new THREE.Vector2(0.152, 0.13),
        new THREE.Vector2(0.14, 0.17),
        new THREE.Vector2(0.085, 0.22),
        new THREE.Vector2(0.01, 0.23),
      ];
      const sackProfile = [
        new THREE.Vector2(0.02, -0.19),
        new THREE.Vector2(0.135, -0.17),
        new THREE.Vector2(0.165, -0.04),
        new THREE.Vector2(0.085, 0.11),
        new THREE.Vector2(0.128, 0.18),
        new THREE.Vector2(0.02, 0.19),
      ];
      const eggProfile = [
        new THREE.Vector2(0.01, -0.17),
        new THREE.Vector2(0.10, -0.12),
        new THREE.Vector2(0.14, -0.02),
        new THREE.Vector2(0.125, 0.09),
        new THREE.Vector2(0.065, 0.16),
        new THREE.Vector2(0.01, 0.19),
      ];
      const wheatProfile = [
        new THREE.Vector2(0.03, -0.18),
        new THREE.Vector2(0.065, -0.04),
        new THREE.Vector2(0.055, 0.02),
        new THREE.Vector2(0.135, 0.16),
        new THREE.Vector2(0.02, 0.22),
      ];
      const loafProfile = [
        new THREE.Vector2(0.02, -0.12),
        new THREE.Vector2(0.11, -0.13),
        new THREE.Vector2(0.16, -0.06),
        new THREE.Vector2(0.17, 0.04),
        new THREE.Vector2(0.12, 0.13),
        new THREE.Vector2(0.02, 0.15),
      ];
      const burgerProfile = [
        new THREE.Vector2(0.02, -0.14),
        new THREE.Vector2(0.16, -0.13),
        new THREE.Vector2(0.175, -0.03),
        new THREE.Vector2(0.165, 0.08),
        new THREE.Vector2(0.02, 0.14),
      ];
      const pizzaProfile = [
        new THREE.Vector2(0.01, -0.04),
        new THREE.Vector2(0.20, -0.04),
        new THREE.Vector2(0.21, 0.03),
        new THREE.Vector2(0.17, 0.02),
        new THREE.Vector2(0.01, 0.02),
      ];

      const geometry = {
        TOMATO: new THREE.LatheGeometry(tomatoProfile, 16),
        TOMATO_PASTE: new THREE.LatheGeometry(canProfile, 16),
        ORANGE: new THREE.LatheGeometry(orangeProfile, 16),
        ORANGE_JUICE: new THREE.LatheGeometry(juiceBottleProfile, 14),
        CORN: new THREE.LatheGeometry(cornProfile, 12),
        POPCORN: new THREE.LatheGeometry(popcornProfile, 16),
        CHICKEN_FEED: new THREE.LatheGeometry(sackProfile, 14),
        EGG: new THREE.LatheGeometry(eggProfile, 16),
        WHEAT: new THREE.LatheGeometry(wheatProfile, 10),
        BREAD: new THREE.LatheGeometry(loafProfile, 16),
        BURGER: new THREE.LatheGeometry(burgerProfile, 16),
        PIZZA: new THREE.LatheGeometry(pizzaProfile, 20),
      }[itemId] ?? new THREE.DodecahedronGeometry(0.17, 1);

      geometry.userData.sharedAsset = true;
      this.itemGeometry.set(itemId, geometry);
    }
    return this.itemGeometry.get(itemId);
  }

  #getItemMaterial(itemId) {
    if (!this.itemMaterials.has(itemId)) {
      let material;

      if (itemId === 'TOMATO_PASTE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#bdc3c7'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 36, 256, 184);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 34, 256, 5); ctx.fillRect(0, 217, 256, 5);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('SALÇA', 128, 115);
        ctx.font = '32px sans-serif'; ctx.fillText('🥫', 128, 165);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35, metalness: 0.3 });
      } else if (itemId === 'POPCORN') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        for (let x = 0; x < 256; x += 32) {
          ctx.fillStyle = (x / 32) % 2 === 0 ? '#e74c3c' : '#ffffff';
          ctx.fillRect(x, 48, 32, 208);
        }
        ctx.fillStyle = '#f5cd79'; ctx.fillRect(0, 0, 256, 55);
        ctx.fillStyle = '#f1c40f';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath(); ctx.arc(i * 34 + 17, 26, 18, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#2980b9'; ctx.beginPath(); ctx.arc(128, 140, 48, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f1c40f'; ctx.font = 'bold 22px Fredoka, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('POPCORN', 128, 140);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'ORANGE_JUICE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#f39c12'); grad.addColorStop(1, '#f1c40f');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(128, 130, 45, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e67e22'; ctx.beginPath(); ctx.arc(128, 130, 40, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('MEYVE', 128, 60); ctx.fillText('SUYU', 128, 205);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35 });
      } else if (itemId === 'BURGER') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e58e26'; ctx.fillRect(0, 0, 256, 95);
        ctx.fillStyle = '#fffdf0';
        for (let i = 0; i < 20; i++) ctx.fillRect(20 + (i * 37) % 216, 20 + (i * 23) % 65, 4, 3);
        ctx.fillStyle = '#2ecc71'; ctx.fillRect(0, 95, 256, 24);
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 119, 256, 22);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 141, 256, 20);
        ctx.fillStyle = '#4a2711'; ctx.fillRect(0, 161, 256, 42);
        ctx.fillStyle = '#e58e26'; ctx.fillRect(0, 203, 256, 53);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'PIZZA') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#d35400'; ctx.beginPath(); ctx.arc(128, 128, 126, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f9f6e8'; ctx.beginPath(); ctx.arc(128, 128, 98, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#96281b';
        for (let i = 0; i < 6; i++) {
          const angle = i * Math.PI / 3;
          ctx.beginPath(); ctx.arc(128 + Math.cos(angle) * 55, 128 + Math.sin(angle) * 55, 18, 0, Math.PI * 2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(128, 128, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#27ae60';
        for (let i = 0; i < 14; i++) ctx.fillRect(50 + (i * 47) % 156, 50 + (i * 39) % 156, 6, 6);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.45 });
      } else if (itemId === 'CHICKEN_FEED') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#d4a373'; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#c29263'; ctx.lineWidth = 2;
        for (let p = 0; p < 256; p += 16) {
          ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(256, p); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 256); ctx.stroke();
        }
        ctx.fillStyle = '#5c3a21'; ctx.fillRect(0, 185, 256, 16);
        ctx.fillStyle = '#3e2723'; ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('🌾 YEM', 128, 120);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.85 });
      } else if (itemId === 'BREAD') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const bg = ctx.createLinearGradient(0, 0, 256, 0);
        bg.addColorStop(0, '#c27c38'); bg.addColorStop(0.5, '#e09852'); bg.addColorStop(1, '#c27c38');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f8f9fa'; ctx.fillRect(0, 30, 256, 8); ctx.fillRect(0, 120, 256, 12);
        ctx.fillStyle = '#7a3e14';
        for (let i = 0; i < 4; i++) ctx.fillRect(30 + i * 55, 60, 35, 130);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7 });
      } else if (itemId === 'CORN') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f39c12';
        for (let r = 0; r < 256; r += 16) {
          for (let c = 0; c < 256; c += 16) if ((r / 16 + c / 16) % 2 === 0) ctx.fillRect(c, r, 15, 15);
        }
        ctx.fillStyle = '#27ae60';
        ctx.beginPath(); ctx.moveTo(0, 256); ctx.lineTo(60, 120); ctx.lineTo(0, 0); ctx.fill();
        ctx.beginPath(); ctx.moveTo(256, 256); ctx.lineTo(196, 120); ctx.lineTo(256, 0); ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.55 });
      } else if (itemId === 'TOMATO') {
        material = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.22, metalness: 0.05 });
      } else if (itemId === 'ORANGE') {
        material = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.42 });
      } else if (itemId === 'EGG') {
        material = new THREE.MeshStandardMaterial({ color: 0xfffcf2, roughness: 0.35 });
      } else if (itemId === 'WHEAT') {
        material = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.65 });
      } else {
        material = new THREE.MeshStandardMaterial({ color: ITEMS[itemId]?.color ?? 0x58cc02, roughness: 0.5 });
      }

      material.userData.sharedAsset = true;
      this.itemMaterials.set(itemId, material);
    }
    return this.itemMaterials.get(itemId);
  }

  #statusBadge(group, label, tone, visible, height = 2.45) {
    let sprite = group.getObjectByName('status-badge');
    if (!visible) { if (sprite) sprite.visible = false; return; }
    if (!sprite) {
      const canvas = document.createElement('canvas');
      canvas.width = 384; canvas.height = 96;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
      sprite.name = 'status-badge';
      sprite.userData.canvas = canvas;
      sprite.position.y = height;
      sprite.scale.set(3.1, 0.78, 1);
      group.add(sprite);
    }
    sprite.visible = true;
    sprite.position.y = height;
    const signature = `${label}:${tone}`;
    if (sprite.userData.signature === signature) return;
    sprite.userData.signature = signature;
    const context = sprite.userData.canvas.getContext('2d');
    context.clearRect(0, 0, 384, 96);
    context.fillStyle = '#ffffff';
    context.beginPath(); context.roundRect(5, 7, 374, 77, 29); context.fill();
    context.lineWidth = 8; context.strokeStyle = tone; context.stroke();
    context.fillStyle = '#405264'; context.textAlign = 'center'; context.textBaseline = 'middle';
    context.font = 'bold 35px Fredoka, sans-serif';
    context.fillText(label, 192, 45, 340);
    sprite.material.map.needsUpdate = true;
  }

  playEvent(event, state) {
    if (this.reducedMotion.matches || this.effects.length > 36) return;
    let point = { x: state.player.x, z: state.player.z };
    if (event.type === 'sale') point = stationPosition(state, 'register');
    if (event.type === 'production') {
      if (event.farmId) point = stationPosition(state, event.farmId);
      else {
        const machineId = Object.keys(state.machines).find((id) => RECIPES[STATIONS[id]?.recipe]?.output === event.item);
        if (machineId) point = stationPosition(state, machineId);
      }
    }
    const color = event.type === 'sale' || event.type === 'tip-ready' ? 0xffc800
      : event.type === 'production' ? 0x1cb0f6 : 0x58cc02;
    for (let index = 0; index < 5; index += 1) {
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.075, 6, 5), new THREE.MeshBasicMaterial({ color, transparent: true }));
      particle.position.set(point.x, 1.3, point.z);
      this.scene.add(particle);
      this.effects.push({ mesh: particle, age: 0, vx: Math.cos(index * Math.PI * 0.4) * 1.3,
        vz: Math.sin(index * Math.PI * 0.4) * 1.3 });
    }
  }

  #part(group, geometry, color, x, y, z, options = {}) {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color, roughness: options.metal ? 0.35 : 0.78, metalness: options.metal ? 0.5 : 0,
      emissive: options.glow ? color : 0x000000, emissiveIntensity: options.glow ? 0.25 : 0,
    }));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  #addFarm(id) {
    if (this.farms.has(id)) return;
    const state = this.app?.getState();
    const station = STATIONS[id] ?? state?.customStations?.[id];
    if (!station) return;
    const group = new THREE.Group();
    const farmPos = state ? (state.layout?.[id] ?? state.customStations?.[id] ?? STATIONS[id]) : station;
    group.position.set(farmPos?.x ?? station.x ?? 0, 0, farmPos?.z ?? station.z ?? 0);
    const bed = new THREE.Mesh(new RoundedBoxGeometry(1.95, 0.24, 2.55, 3, 0.13), new THREE.MeshStandardMaterial({ color: 0x8b5a3d, roughness: 0.9 }));
    bed.position.y = 0.13;
    bed.receiveShadow = true;
    bed.castShadow = true;
    group.add(bed);
    const soil = new THREE.Mesh(new RoundedBoxGeometry(1.67, 0.1, 2.18, 3, 0.07), new THREE.MeshStandardMaterial({ color: 0x50372d, roughness: 1 }));
    soil.position.y = 0.29;
    group.add(soil);
    const timber = new THREE.MeshStandardMaterial({ color: 0xc28a54, roughness: 0.88 });
    for (const x of [-0.87, 0.87]) {
      const rim = new THREE.Mesh(new RoundedBoxGeometry(0.085, 0.13, 2.3, 2, 0.035), timber);
      rim.position.set(x, 0.3, 0);
      rim.castShadow = true;
      group.add(rim);
    }
    for (const z of [-1.14, 1.14]) {
      const rim = new THREE.Mesh(new RoundedBoxGeometry(1.72, 0.13, 0.085, 2, 0.035), timber);
      rim.position.set(0, 0.3, z);
      group.add(rim);
    }
    for (let row = 0; row < 5; row += 1) {
      const furrow = new THREE.Mesh(new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([new THREE.Vector3(-0.72, 0.345, -0.76 + row * 0.38), new THREE.Vector3(-0.3, 0.35, -0.72 + row * 0.38), new THREE.Vector3(0.2, 0.345, -0.78 + row * 0.38), new THREE.Vector3(0.72, 0.35, -0.73 + row * 0.38)]),
        14, 0.018, 5, false,
      ), new THREE.MeshStandardMaterial({ color: 0x79523b, roughness: 1 }));
      group.add(furrow);
    }
    const produce = [];
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x55a947, roughness: 0.8, side: THREE.DoubleSide });
    const leafLight = new THREE.MeshStandardMaterial({ color: 0x83c75c, roughness: 0.76, side: THREE.DoubleSide });
    const makeLeaf = (x, y, z, angle, length = 0.38, color = leafMaterial) => {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 7), color);
      leaf.scale.set(0.09, length, 0.025);
      leaf.position.set(x, y, z);
      leaf.rotation.z = angle;
      leaf.rotation.x = angle * 0.28;
      leaf.castShadow = true;
      group.add(leaf);
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.014, length * 1.55, 5), new THREE.MeshStandardMaterial({ color: 0xc6d985, roughness: 0.8 }));
      vein.position.set(x, y, z + 0.018);
      vein.rotation.z = angle;
      group.add(vein);
    };
    const createCob = (x, y, z) => {
      const cob = new THREE.Group();
      const kernelMat = new THREE.MeshStandardMaterial({ color: 0xffd44f, roughness: 0.48 });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf3b82f, roughness: 0.55 }));
      core.scale.set(0.76, 1.35, 0.78);
      cob.add(core);
      for (let row = 0; row < 4; row += 1) for (let col = 0; col < 7; col += 1) {
        const angle = col / 7 * Math.PI * 2 + row * 0.18;
        const kernel = new THREE.Mesh(new THREE.SphereGeometry(0.036, 7, 6), kernelMat);
        kernel.position.set(Math.cos(angle) * 0.106, -0.15 + row * 0.1, Math.sin(angle) * 0.106);
        kernel.scale.set(0.78, 1, 0.78);
        cob.add(kernel);
      }
      cob.position.set(x, y, z);
      cob.rotation.z = -0.15;
      cob.traverse((part) => { if (part.isMesh) part.castShadow = true; });
      group.add(cob);
      return cob;
    };
    if (station.item === 'ORANGE') {
      const trunkCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.34, 0), new THREE.Vector3(-0.06, 0.72, 0.02), new THREE.Vector3(0.05, 1.16, 0)]);
      const trunk = new THREE.Mesh(new THREE.TubeGeometry(trunkCurve, 14, 0.14, 9, false), new THREE.MeshStandardMaterial({ color: 0x875536, roughness: 0.95 }));
      trunk.castShadow = true;
      group.add(trunk);
      for (const [x, y, z, angle] of [[-0.42, 0.88, 0.02, -1.1], [0.43, 0.99, 0.05, 1.05], [-0.27, 1.34, -0.03, -0.82], [0.31, 1.44, 0.02, 0.84], [0, 1.65, 0, 0.1]]) {
        const branch = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.02, 0.84, 0), new THREE.Vector3(x * 0.5, y - 0.2, z), new THREE.Vector3(x, y, z)]), 10, 0.045, 7, false), timber);
        group.add(branch);
      }
      for (let i = 0; i < 22; i += 1) {
        const angle = i * 2.399;
        const y = 0.95 + (i % 7) * 0.12;
        const x = Math.cos(angle) * (0.34 + (i % 3) * 0.08);
        const z = Math.sin(angle) * 0.32;
        makeLeaf(x, y, z, angle, 0.25 + (i % 3) * 0.045, i % 2 ? leafMaterial : leafLight);
      }
      for (const [x, y, z] of [[-0.47, 1.13, 0.15], [0.48, 1.27, 0.18], [-0.23, 1.55, 0.29], [0.19, 1.67, 0.24]]) {
        const orange = new THREE.Group();
        const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 11), new THREE.MeshStandardMaterial({ color: 0xff972f, roughness: 0.36 }));
        fruit.scale.set(0.94, 1, 0.88);
        orange.add(fruit);
        this.#part(orange, new THREE.SphereGeometry(0.045, 7, 5), 0x648a3d, 0, 0.15, 0);
        orange.position.set(x, y, z);
        group.add(orange);
        produce.push(orange);
      }
    } else {
      for (const x of [-0.38, 0.38]) for (const z of [-0.57, 0.57]) {
        if (station.item === 'TOMATO') {
          const vine = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x, 0.34, z), new THREE.Vector3(x - 0.04, 0.68, z + 0.03), new THREE.Vector3(x + 0.06, 0.98, z)]), 10, 0.055, 7, false), new THREE.MeshStandardMaterial({ color: 0x4e963e }));
          group.add(vine);
          for (let node = 0; node < 7; node += 1) {
            const y = 0.43 + node * 0.085;
            const side = node % 2 ? 1 : -1;
            makeLeaf(x + side * (0.11 + node % 3 * 0.045), y, z + (node % 2 ? 0.08 : -0.08), side * (0.65 + node % 2 * 0.35), 0.2 + (node % 3) * 0.035, node % 2 ? leafMaterial : leafLight);
          }
          const fruit = new THREE.Group();
          const tomato = this.#part(fruit, new THREE.SphereGeometry(0.155, 14, 11), 0xe8493e, 0, 0.87, z + 0.14);
          tomato.scale.set(1.06, 0.92, 0.96);
          for (let leafIndex = 0; leafIndex < 5; leafIndex += 1) {
            const calyx = this.#part(fruit, new THREE.ConeGeometry(0.035, 0.12, 5), 0x47873a, 0, 1.02, z + 0.14);
            calyx.rotation.z = leafIndex * Math.PI * 0.4;
            calyx.rotation.x = Math.PI * 0.5;
          }
          fruit.position.set(x, 0, 0);
          group.add(fruit);
          produce.push(fruit);
        } else if (station.item === 'CORN') {
          const stalk = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x, 0.32, z), new THREE.Vector3(x + 0.04, 0.81, z), new THREE.Vector3(x + 0.08, 1.3, z)]), 12, 0.055, 7, false), new THREE.MeshStandardMaterial({ color: 0x4d983e }));
          group.add(stalk);
          for (let l = 0; l < 7; l += 1) {
            const side = l % 2 ? 1 : -1;
            const y = 0.48 + Math.floor(l / 2) * 0.22;
            makeLeaf(x + side * 0.13, y, z + (l % 3) * 0.035, side * (0.72 + (l % 3) * 0.22), 0.39 + (l % 2) * 0.08, l % 2 ? leafMaterial : leafLight);
          }
          const cob = createCob(x + 0.2, 0.88, z + 0.1);
          for (let husk = 0; husk < 3; husk += 1) {
            const leafHusk = this.#part(cob, new THREE.ConeGeometry(0.09, 0.52, 5), 0x5caa47, 0.01, -0.07 + husk * 0.08, -0.09);
            leafHusk.rotation.z = -0.45 + husk * 0.45;
          }
          produce.push(cob);
        } else {
          const stem = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(x, 0.34, z), new THREE.Vector3(x - 0.04, 0.78, z), new THREE.Vector3(x + 0.035, 1.2, z)]), 9, 0.023, 5, false), new THREE.MeshStandardMaterial({ color: 0x9caf48 }));
          group.add(stem);
          for (let side = -1; side <= 1; side += 2) makeLeaf(x + side * 0.11, 0.64, z + side * 0.02, side * 1.05, 0.28, leafLight);
          const head = new THREE.Group();
          for (let grain = 0; grain < 11; grain += 1) {
            const berry = this.#part(head, new THREE.SphereGeometry(0.055, 8, 6), grain % 3 ? 0xe7bd52 : 0xf3d779, (grain % 2 ? 0.045 : -0.045), grain * 0.06, 0);
            berry.scale.set(0.74, 1.25, 0.72);
          }
          head.position.set(x + 0.03, 1.05, z + 0.06);
          head.rotation.z = -0.18;
          group.add(head);
          produce.push(head);
        }
      }
    }
    const marker = new THREE.Mesh(new THREE.RingGeometry(1.13, 1.24, 48), new THREE.MeshBasicMaterial({ color: 0x90d869, side: THREE.DoubleSide, transparent: true, opacity: 0.45 }));
    marker.rotation.x = -Math.PI / 2;
    marker.scale.x = 0.68;
    marker.position.y = 0.06;
    group.add(marker);
    this.scene.add(group);
    this.farms.set(id, { group, produce, item: station.item });
  }

  #addMachine(id) {
    if (this.machines.has(id)) return;
    const state = this.app?.getState();
    const station = STATIONS[id] ?? state?.customStations?.[id];
    if (!station) return;
    const recipe = RECIPES[station.recipe];
    if (!recipe) return;
    const group = new THREE.Group();
    // Custom machine için pozisyonu layout'tan al, sabit station için x/z'den al
    const pos = state ? (state.layout?.[id] ?? state.customStations?.[id] ?? STATIONS[id]) : station;
    group.position.set(pos?.x ?? station.x ?? 0, 0, pos?.z ?? station.z ?? 0);
    const baseId = station.baseType ?? id.split('_')[0];

    const steel = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.35, metalness: 0.65 });
    const darkSteel = new THREE.MeshStandardMaterial({ color: 0x353b48, roughness: 0.55, metalness: 0.4 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.18, metalness: 0.85 });
    const brass = new THREE.MeshStandardMaterial({ color: 0xfbc531, roughness: 0.3, metalness: 0.7 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.1, metalness: 0.1 });

    // 1. Heavy industrial equipment foundation
    const base = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.32, 1.75, 3, 0.08), darkSteel);
    base.position.y = 0.16;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Bumper rail along machine base
    const bumper = new THREE.Mesh(new RoundedBoxGeometry(2.24, 0.08, 1.79, 2, 0.03), new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.8 }));
    bumper.position.y = 0.06;
    group.add(bumper);

    // Operator digital control console
    const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.2), darkSteel);
    consoleBox.position.set(-0.95, 0.52, 0.65);
    consoleBox.rotation.y = 0.25;
    group.add(consoleBox);

    const screenMat = new THREE.MeshBasicMaterial({ color: 0x00d2d3 });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.15), screenMat);
    screen.position.set(-0.94, 0.58, 0.76);
    screen.rotation.y = 0.25;
    group.add(screen);

    // Console buttons
    for (let b = 0; b < 3; b++) {
      const btnMat = new THREE.MeshStandardMaterial({ color: [0x4cd137, 0xfbc531, 0xe84118][b] });
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.04, 8), btnMat);
      btn.rotation.x = Math.PI / 2;
      btn.position.set(-1.02 + b * 0.07, 0.43, 0.77);
      group.add(btn);
    }

    // Industrial Andon signal tower / status lamp
    const towerPole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.65, 8), darkSteel);
    towerPole.position.set(-0.96, 0.95, -0.68);
    group.add(towerPole);

    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), new THREE.MeshStandardMaterial({
      color: 0x4cd137, emissive: 0x4cd137, emissiveIntensity: 0.6, roughness: 0.2,
    }));
    lamp.position.set(-0.96, 1.32, -0.68);
    group.add(lamp);

    // Specialized Machine Architecture (Matching Image 3 & Image 6)
    if (id === 'paste' || baseId === 'paste') {
      // Tomato Paste Cooker & Canning Unit (Image 3)
      const mainTank = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 1.15, 18), new THREE.MeshStandardMaterial({ color: 0xe84118, roughness: 0.4, metalness: 0.15 }));
      mainTank.position.set(0, 0.88, -0.05);
      mainTank.castShadow = true;
      group.add(mainTank);

      // Stainless steel banding on tank
      for (const y of [0.45, 0.88, 1.32]) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.69, 0.025, 6, 24), chrome);
        band.rotation.x = Math.PI / 2;
        band.position.set(0, y, -0.05);
        group.add(band);
      }

      // Upper cone hopper for tomatoes
      const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.28, 0.55, 16, 1, true), steel);
      hopper.position.set(0, 1.68, -0.05);
      hopper.castShadow = true;
      group.add(hopper);

      // Pressure gauge dial
      const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 12), chrome);
      gauge.rotation.x = Math.PI / 2;
      gauge.position.set(0, 1.15, 0.66);
      group.add(gauge);
      const dial = new THREE.Mesh(new THREE.CircleGeometry(0.09, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      dial.position.set(0, 1.15, 0.70);
      group.add(dial);

      // Steam pipe and valve handwheel
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.55, 1.25, -0.05),
        new THREE.Vector3(0.85, 1.45, -0.05),
        new THREE.Vector3(0.85, 1.95, -0.05),
      ]);
      const steamPipe = new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 12, 0.045, 8, false), chrome);
      group.add(steamPipe);

      const valveWheel = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 6, 12), new THREE.MeshStandardMaterial({ color: 0xe84118 }));
      valveWheel.rotation.y = Math.PI / 2;
      valveWheel.position.set(0.85, 1.65, -0.05);
      group.add(valveWheel);

    } else if (id === 'juice' || baseId === 'juice') {
      // Citrus Juicer & Bottling Station (Image 3)
      // Stainless lower body
      const juicerBody = new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.75, 1.1, 2, 0.08), steel);
      juicerBody.position.set(0, 0.68, 0);
      juicerBody.castShadow = true;
      group.add(juicerBody);

      // Transparent acrylic extraction bowl with orange juice inside
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.42, 0.72, 16), glass);
      bowl.position.set(0, 1.38, 0);
      group.add(bowl);

      const juiceLevel = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.4, 0.52, 16), new THREE.MeshStandardMaterial({ color: 0xff9f1a, roughness: 0.2 }));
      juiceLevel.position.set(0, 1.28, 0);
      group.add(juiceLevel);

      // Squeezing reamer cone inside
      const reamer = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.42, 10), new THREE.MeshStandardMaterial({ color: 0xffd32a, roughness: 0.5 }));
      reamer.position.set(0, 1.45, 0);
      group.add(reamer);

      // Orange feeder chute at top
      const chute = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.5, 12), chrome);
      chute.rotation.z = 0.35;
      chute.position.set(-0.25, 1.88, 0);
      group.add(chute);

      // Bottling dispenser tap
      const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), chrome);
      tap.position.set(0.55, 0.95, 0.28);
      group.add(tap);

    } else if (id === 'popcorn' || baseId === 'popcorn') {
      // Popcorn Machine Kiosk (Image 3)
      // Vintage red supermarket cabinet base
      const stand = new THREE.Mesh(new RoundedBoxGeometry(1.42, 0.65, 1.15, 2, 0.06), new THREE.MeshStandardMaterial({ color: 0xe84118, roughness: 0.4 }));
      stand.position.set(0, 0.64, 0);
      stand.castShadow = true;
      group.add(stand);

      // Gold vintage corner pillars
      for (const x of [-0.62, 0.62]) for (const z of [-0.48, 0.48]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.95, 8), brass);
        pillar.position.set(x, 1.44, z);
        group.add(pillar);
      }

      // Clear tempered glass display cube
      const glassCube = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.92, 0.96), glass);
      glassCube.position.set(0, 1.44, 0);
      group.add(glassCube);

      // Hanging stainless popping kettle inside
      const kettle = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.34, 14), chrome);
      kettle.position.set(0, 1.62, 0);
      group.add(kettle);
      const kettleLid = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 14), brass);
      kettleLid.position.set(0, 1.8, 0);
      group.add(kettleLid);

      // Piles of popped corn kernels on warm deck
      for (let i = 0; i < 9; i++) {
        const cornCluster = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 1), new THREE.MeshStandardMaterial({ color: 0xfff2a3, roughness: 0.8 }));
        cornCluster.position.set(-0.35 + (i % 3) * 0.32, 1.04, -0.22 + Math.floor(i / 3) * 0.22);
        group.add(cornCluster);
      }

      // Curved red canopy roof
      const roof = new THREE.Mesh(new RoundedBoxGeometry(1.48, 0.16, 1.22, 2, 0.06), new THREE.MeshStandardMaterial({ color: 0xe84118, roughness: 0.3 }));
      roof.position.set(0, 1.96, 0);
      roof.castShadow = true;
      group.add(roof);

    } else if (id === 'feed' || baseId === 'feed') {
      // Industrial Feed Mill & Bagging Station (Image 3)
      const millBody = new THREE.Mesh(new RoundedBoxGeometry(1.35, 0.72, 1.1, 2, 0.06), darkSteel);
      millBody.position.set(0, 0.67, 0);
      millBody.castShadow = true;
      group.add(millBody);

      // Large intake hopper
      const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.22, 0.68, 14, 1, true), steel);
      hopper.position.set(-0.15, 1.35, 0);
      group.add(hopper);

      // Heavy industrial cast-iron gear wheels
      const gear1 = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.065, 8, 16), steel);
      gear1.rotation.y = Math.PI / 2;
      gear1.position.set(0.72, 0.88, -0.12);
      group.add(gear1);

      const gear2 = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 8, 14), brass);
      gear2.rotation.y = Math.PI / 2;
      gear2.position.set(0.72, 0.58, 0.24);
      group.add(gear2);

      // Discharge snout / bagging chute
      const snout = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.38, 10), steel);
      snout.position.set(0.42, 0.82, 0.48);
      group.add(snout);

    } else if (id === 'bakery' || baseId === 'bakery' || id === 'pizzaKitchen' || baseId === 'pizzaKitchen') {
      // Commercial Deck/Stone Hearth Oven (Image 3 & 6)
      const ovenBody = new THREE.Mesh(new RoundedBoxGeometry(1.68, 1.38, 1.35, 3, 0.1), new THREE.MeshStandardMaterial({ color: 0xc87b48, roughness: 0.88 }));
      ovenBody.position.set(0, 0.98, 0);
      ovenBody.castShadow = true;
      group.add(ovenBody);

      // Stainless top surround
      const topPlate = new THREE.Mesh(new RoundedBoxGeometry(1.72, 0.14, 1.38, 2, 0.04), steel);
      topPlate.position.set(0, 1.72, 0);
      group.add(topPlate);

      // Arched oven opening with glowing embers inside
      const openingFrame = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.58, 0.15), darkSteel);
      openingFrame.position.set(0, 0.95, 0.65);
      group.add(openingFrame);

      const ovenMouth = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.46), new THREE.MeshBasicMaterial({ color: 0x1e150a }));
      ovenMouth.position.set(0, 0.95, 0.73);
      group.add(ovenMouth);

      // Glowing fire core
      const fireGlow = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), new THREE.MeshStandardMaterial({
        color: 0xff6b35, emissive: 0xff4d00, emissiveIntensity: 0.9, roughness: 0.1,
      }));
      fireGlow.scale.set(1.4, 0.5, 0.4);
      fireGlow.position.set(0, 0.85, 0.68);
      group.add(fireGlow);

      // Stainless exhaust hood chimney
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.65, 12), darkSteel);
      chimney.position.set(-0.48, 2.08, -0.32);
      group.add(chimney);

      // Pizza peel / Baker's wooden paddle on side
      const peelHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6), new THREE.MeshStandardMaterial({ color: 0xcd8d56 }));
      peelHandle.rotation.x = 0.2;
      peelHandle.position.set(0.88, 1.1, 0.15);
      group.add(peelHandle);

    } else if (id === 'burgerKitchen' || baseId === 'burgerKitchen') {
      // Gourmet Flat-Top Burger Griddle & Prep Station (Image 3)
      const kitchenCounter = new THREE.Mesh(new RoundedBoxGeometry(1.65, 0.82, 1.25, 2, 0.08), steel);
      kitchenCounter.position.set(0, 0.72, 0);
      kitchenCounter.castShadow = true;
      group.add(kitchenCounter);

      // Cast iron heavy cooking griddle plate
      const griddle = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.08, 0.78), new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.3, metalness: 0.7 }));
      griddle.position.set(0, 1.15, 0.12);
      group.add(griddle);

      // Sizzling burger patties on griddle
      for (const [bx, bz] of [[-0.34, 0.05], [0.12, 0.05], [0.38, 0.18], [-0.15, 0.22]]) {
        const patty = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.045, 12), new THREE.MeshStandardMaterial({ color: 0x4a2711, roughness: 0.75 }));
        patty.position.set(bx, 1.2, bz);
        group.add(patty);
      }

      // Stainless overhead ventilation hood
      const hood = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 1.1), chrome);
      hood.position.set(0, 1.95, 0);
      group.add(hood);

      // Squeeze sauce dispenser bottles (Ketchup red & Mustard yellow)
      const ketchup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.24, 10), new THREE.MeshStandardMaterial({ color: 0xe84118 }));
      ketchup.position.set(-0.62, 1.24, -0.38);
      const mustard = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.24, 10), new THREE.MeshStandardMaterial({ color: 0xfbc531 }));
      mustard.position.set(-0.48, 1.24, -0.38);
      group.add(ketchup, mustard);
    }

    // Input staging area with metal tray
    const input = new THREE.Group();
    input.position.set(-0.95, 0.42, 0.65);
    const inputTray = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.08, 0.65, 2, 0.03), steel);
    inputTray.position.set(0.18, -0.06, 0.12);
    input.add(inputTray);

    const inputMeshes = [];
    for (const [itemId, quantity] of Object.entries(recipe.inputs)) {
      for (let index = 0; index < quantity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        mesh.position.set((inputMeshes.length % 2) * 0.32, 0.12 + Math.floor(inputMeshes.length / 2) * 0.26, 0.12);
        mesh.castShadow = true;
        input.add(mesh);
        inputMeshes.push({ mesh, itemId, index });
      }
    }
    group.add(input);

    // Output staging area with roller conveyor or delivery deck
    const output = new THREE.Group();
    output.position.set(1.12, 0.42, 0.45);
    const outTray = new THREE.Mesh(new RoundedBoxGeometry(0.88, 0.08, 0.72, 2, 0.03), steel);
    outTray.position.set(0.16, -0.06, 0.12);
    output.add(outTray);
    group.add(output);

    this.scene.add(group);
    this.machines.set(id, { group, inputMeshes, output, outputItem: recipe.output, lamp });
  }

  #addShelf(itemId) {
    if (this.shelves.has(itemId) || !SHELVES[itemId]) return;
    const shelfDef = SHELVES[itemId];
    const group = new THREE.Group();
    group.position.set(shelfDef.x, 0, shelfDef.z);

    const type = shelfDef.displayType ?? 'gondola';
    const productMeshes = [];

    // Shared label canvas for all fixtures
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 128;
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.58, 0.34), new THREE.MeshBasicMaterial({ map: labelTexture, toneMapped: false }));

    if (type === 'produce') {
      // 1. PRODUCE STAND (Ahşap Eğimli Manav Tezgâhı - TOMATO, ORANGE, CORN)
      const woodDark = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });
      const woodLight = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.75 });
      const crateMat = new THREE.MeshStandardMaterial({ color: 0xc28d53, roughness: 0.8 });
      const greenTrim = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.4 });

      // Table legs
      for (const lx of [-0.95, 0.95]) for (const lz of [-0.5, 0.5]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), woodDark);
        leg.position.set(lx, 0.4, lz);
        leg.castShadow = true;
        group.add(leg);
      }

      // Slanted deck
      const deck = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.08, 1.35), woodLight);
      deck.position.set(0, 0.78, 0);
      deck.rotation.x = 0.18;
      deck.castShadow = true;
      group.add(deck);

      // Wooden produce crates
      for (let c = 0; c < 3; c++) {
        const crate = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 1.25), crateMat);
        crate.position.set(-0.75 + c * 0.75, 0.86, 0);
        crate.rotation.x = 0.18;
        crate.castShadow = true;
        group.add(crate);
      }

      // Canopy banner posts and sign
      for (const px of [-1.05, 1.05]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.05, 8), woodDark);
        post.position.set(px, 1.02, -0.48);
        post.castShadow = true;
        group.add(post);
      }

      const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.28, 0.42, 0.12, 2, 0.04), greenTrim);
      canopy.position.set(0, 2.05, -0.42);
      canopy.castShadow = true;
      group.add(canopy);

      label.position.set(0, 2.05, -0.34);
      group.add(label);

      // Stacked produce items inside crates
      for (let index = 0; index < shelfDef.capacity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        const col = index % 3;
        const row = Math.floor(index / 3);
        const cx = -0.75 + col * 0.75;
        const cz = 0.28 - row * 0.38;
        const cy = 0.84 + (row === 0 ? 0.02 : 0.12) + (index >= 6 ? 0.15 : 0);
        mesh.position.set(cx, cy, cz);
        mesh.rotation.x = 0.18;
        mesh.scale.setScalar(itemId === 'CORN' ? 1.15 : 0.95);
        mesh.castShadow = true;
        group.add(mesh);
        productMeshes.push(mesh);
      }

    } else if (type === 'cooler') {
      // 2. COOLER / ISLAND FREEZER (Cam Kapaklı Soğutucu / Dondurucu Dolap - ORANGE_JUICE, EGG)
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f2f6, roughness: 0.25 });
      const blueTrim = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.35 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
      const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, transparent: true, opacity: 0.45, roughness: 0.08, metalness: 0.2 });

      // Body cabinet
      const body = new THREE.Mesh(new RoundedBoxGeometry(2.28, 0.92, 1.25, 3, 0.08), whiteMat);
      body.position.y = 0.46;
      body.castShadow = true;
      group.add(body);

      // Blue accent bumper
      const stripe = new THREE.Mesh(new RoundedBoxGeometry(2.32, 0.1, 1.29, 2, 0.04), blueTrim);
      stripe.position.y = 0.76;
      group.add(stripe);

      const kickplate = new THREE.Mesh(new RoundedBoxGeometry(2.34, 0.12, 1.31, 2, 0.04), darkMat);
      kickplate.position.y = 0.06;
      group.add(kickplate);

      // Sliding glass lids
      const glassLid1 = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.03, 1.1), glassMat);
      glassLid1.position.set(-0.54, 0.94, 0);
      const glassLid2 = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.03, 1.1), glassMat);
      glassLid2.position.set(0.54, 0.95, 0);
      group.add(glassLid1, glassLid2);

      // Chrome handles
      for (const hx of [-0.54, 0.54]) {
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 0.06), chromeMat);
        handle.position.set(hx, 0.97, 0.38);
        group.add(handle);
      }

      // Overhead category sign supported by sleek chrome arch
      for (const ax of [-0.98, 0.98]) {
        const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.2, 8), chromeMat);
        arch.position.set(ax, 1.45, 0);
        group.add(arch);
      }

      const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.1, 0.4, 0.12, 3, 0.06), blueTrim);
      canopy.position.set(0, 2.05, 0);
      canopy.castShadow = true;
      group.add(canopy);

      label.position.set(0, 2.05, 0.08);
      group.add(label);

      // Chilled products on internal racks
      for (let index = 0; index < shelfDef.capacity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        const col = index % 3;
        const row = Math.floor(index / 3);
        mesh.position.set(-0.62 + col * 0.62, 0.72 + (itemId === 'EGG' ? 0.08 : 0.14), (row === 0 ? 0.26 : -0.26));
        mesh.scale.setScalar(itemId === 'EGG' ? 1.05 : 0.95);
        mesh.castShadow = true;
        group.add(mesh);
        productMeshes.push(mesh);
      }

    } else if (type === 'bakery') {
      // 3. BAKERY RACK (Artisan Ahşap Fırın & Ekmek Tezgâhı - BREAD)
      const woodDark = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.85 });
      const woodWarm = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
      const wicker = new THREE.MeshStandardMaterial({ color: 0xc29263, roughness: 0.9 });
      const goldTrim = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.7, roughness: 0.25 });

      // Back timber wall
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(2.28, 2.05, 0.12), woodDark);
      backWall.position.set(0, 1.05, -0.32);
      backWall.castShadow = true;
      group.add(backWall);

      // Side carved pillars
      for (const px of [-1.1, 1.1]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.1, 0.16), woodDark);
        pillar.position.set(px, 1.05, -0.28);
        pillar.castShadow = true;
        group.add(pillar);
      }

      // 2 Tiers of sloped bakery shelves with front retention lips
      const bakeryRows = [0.65, 1.25];
      for (const y of bakeryRows) {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.08, 0.78), woodWarm);
        shelf.position.set(0, y, 0.08);
        shelf.rotation.x = 0.12;
        shelf.castShadow = true;
        group.add(shelf);

        const lip = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.09, 0.04), goldTrim);
        lip.position.set(0, y + 0.06, 0.46);
        group.add(lip);
      }

      // Vertical baguette wicker baskets on right
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.65, 12), wicker);
      basket.position.set(0.85, 0.62, 0.15);
      group.add(basket);

      // Overhead bakery chalkboard canopy
      const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.42, 0.14, 3, 0.06), woodDark);
      canopy.position.set(0, 2.05, -0.15);
      canopy.castShadow = true;
      group.add(canopy);

      label.position.set(0, 2.05, -0.06);
      group.add(label);

      // Fresh bread loaves neatly arrayed
      for (let index = 0; index < shelfDef.capacity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        const col = index % 3;
        const row = Math.floor(index / 3);
        mesh.position.set(-0.58 + col * 0.58, bakeryRows[row % bakeryRows.length] + 0.18, 0.12);
        mesh.scale.setScalar(0.95);
        mesh.castShadow = true;
        group.add(mesh);
        productMeshes.push(mesh);
      }

    } else {
      // 4. GONDOLA SHELF (Beyaz Metal Gondol Reyon - TOMATO_PASTE, POPCORN, CHICKEN_FEED)
      const whiteSteel = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.35, metalness: 0.1 });
      const uprightSteel = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.3, metalness: 0.65 });
      const bumperDark = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
      const goldTrim = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.8, roughness: 0.2 });

      const priceRailMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 });

      // Heavy base deck
      const base = new THREE.Mesh(new RoundedBoxGeometry(1.82, 0.22, 0.95, 3, 0.06), whiteSteel);
      base.position.set(0, 0.13, 0);
      base.castShadow = true;
      group.add(base);

      const bumper = new THREE.Mesh(new RoundedBoxGeometry(1.86, 0.09, 0.98, 2, 0.03), bumperDark);
      bumper.position.set(0, 0.055, 0);
      group.add(bumper);

      // White backboard panel
      const backPanel = new THREE.Mesh(new THREE.BoxGeometry(1.72, 1.85, 0.08), whiteSteel);
      backPanel.position.set(0, 1.05, -0.18);
      backPanel.castShadow = true;
      group.add(backPanel);

      // Slotted steel upright posts
      for (const x of [-0.78, 0.78]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.88, 0.12), uprightSteel);
        post.position.set(x, 1.05, -0.16);
        post.castShadow = true;
        group.add(post);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.14), goldTrim);
        cap.position.set(x, 2.01, -0.16);
        group.add(cap);
      }

      // 3 Tiers of Retail Shelves
      const rows = [];
      for (const y of [0.52, 0.98, 1.45]) {
        const shelfPlank = new THREE.Mesh(new RoundedBoxGeometry(1.68, 0.07, 0.72, 2, 0.03), whiteSteel);
        shelfPlank.position.set(0, y, 0.08);
        shelfPlank.castShadow = true;
        shelfPlank.receiveShadow = true;
        group.add(shelfPlank);

        const priceRail = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.045, 0.035), priceRailMat);
        priceRail.position.set(0, y + 0.025, 0.45);
        group.add(priceRail);

        rows.push(y + 0.16);
      }

      // Canopy Sign
      const canopy = new THREE.Mesh(new RoundedBoxGeometry(1.72, 0.42, 0.14, 3, 0.06), bumperDark);
      canopy.position.set(0, 2.05, 0.02);
      canopy.castShadow = true;
      group.add(canopy);

      const goldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.46, 0.06), goldTrim);
      goldBorder.position.set(0, 2.05, -0.02);
      group.add(goldBorder);

      label.position.set(0, 2.05, 0.1);
      group.add(label);

      // Packaged / canned goods
      for (let index = 0; index < shelfDef.capacity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        const row = Math.floor(index / 3);
        const column = index % 3;
        mesh.position.set(-0.5 + column * 0.5, rows[row % rows.length], 0.12);
        mesh.scale.setScalar(0.95);
        mesh.castShadow = true;
        group.add(mesh);
        productMeshes.push(mesh);
      }
    }

    this.scene.add(group);
    this.shelves.set(itemId, { group, productMeshes, id: shelfDef.id, labelCanvas, labelTexture });
  }

  #drawShelfLabel(shelf, itemId, language) {
    if (shelf.labelLanguage === language) return;
    shelf.labelLanguage = language;
    const context = shelf.labelCanvas.getContext('2d');
    context.clearRect(0, 0, 512, 128);
    const labels = {
      TOMATO: ['MANAV • DOMATES', 'PRODUCE • TOMATOES'],
      ORANGE: ['MANAV • PORTAKAL', 'PRODUCE • ORANGES'],
      CORN: ['MANAV • TAZE MISIR', 'PRODUCE • SWEET CORN'],
      TOMATO_PASTE: ['REYON • SALÇA', 'GROCERY • TOMATO PASTE'],
      POPCORN: ['REYON • POPCORN', 'SNACKS • POPCORN'],
      ORANGE_JUICE: ['DOLAP • MEYVE SUYU', 'CHILLED • COLD JUICE'],
      EGG: ['DOLAP • TAZE YUMURTA', 'CHILLED • FARM EGGS'],
      FLOUR: ['REYON • UN', 'GROCERY • FLOUR'],
      BREAD: ['FIRIN • TAZE EKMEK', 'BAKERY • FRESH BREAD'],
      ORANGE_TART: ['PASTANE • PORTAKALLI TART', 'BAKERY • ORANGE TART'],
    };
    const colors = {
      TOMATO: '#27ae60', ORANGE: '#e67e22', TOMATO_PASTE: '#c0392b',
      ORANGE_JUICE: '#f39c12', CORN: '#f1c40f', POPCORN: '#e74c3c',
      EGG: '#8e44ad', FLOUR: '#bca47a', BREAD: '#d35400', ORANGE_TART: '#e67e22',
    };
    context.fillStyle = colors[itemId] ?? '#286f70';
    context.beginPath();
    context.roundRect(8, 8, 496, 112, 16);
    context.fill();

    context.lineWidth = 6;
    context.strokeStyle = '#ffffff';
    context.stroke();

    context.fillStyle = '#ffffff';
    context.font = 'bold 44px Fredoka, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const text = labels[itemId]?.[language === 'en' ? 1 : 0] ?? itemId;
    context.fillText(text, 256, 64, 460);
    shelf.labelTexture.needsUpdate = true;
  }

  #addTable(id) {
    if (this.tables.has(id)) return;
    const state = this.app?.getState();
    const station = STATIONS[id] ?? state?.customStations?.[id];
    const position = state ? stationPosition(state, id) : station;
    if (!position) return;
    const group = new THREE.Group();
    group.position.set(position.x, 0, position.z);

    // 1. Polished Hardwood Dining Table with Linen Runner
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x8d5b4c, roughness: 0.4 });
    const runnerMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.8 });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x4a2e22, roughness: 0.6 });

    const top = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.12, 1.25), tableTopMat);
    top.position.y = 0.85;
    top.castShadow = true;
    group.add(top);

    const runner = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.125, 1.27), runnerMat);
    runner.position.y = 0.855;
    group.add(runner);

    for (const x of [-0.72, 0.72]) for (const z of [-0.42, 0.42]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.8, 8), legMat);
      leg.position.set(x, 0.4, z);
      leg.castShadow = true;
      group.add(leg);
    }

    // 2. Realistic 3D Dining Chair (Customer seat behind table, z = 0.95, facing table)
    const customerChair = this.#createDiningChair();
    customerChair.position.set(0, 0, 0.95);
    customerChair.rotation.y = 0;
    group.add(customerChair);

    // Opposite decorative chair (z = -0.95, facing table)
    const oppositeChair = this.#createDiningChair();
    oppositeChair.position.set(0, 0, -0.95);
    oppositeChair.rotation.y = Math.PI;
    group.add(oppositeChair);

    // 3. Table Place Setting (Ceramic Plate, Dish Mesh, and Tip Coins)
    const mealGroup = new THREE.Group();
    mealGroup.position.set(0, 0.91, 0.15);

    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.22, 0.035, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.05 })
    );
    plate.receiveShadow = true;
    mealGroup.add(plate);

    const foodMesh = new THREE.Mesh(this.#getItemGeometry('BURGER'), this.#getItemMaterial('BURGER'));
    foodMesh.position.y = 0.08;
    foodMesh.scale.setScalar(0.7);
    foodMesh.visible = false;
    mealGroup.add(foodMesh);

    const tipGroup = new THREE.Group();
    tipGroup.position.set(0.32, 0.02, -0.05);
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.05, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.85, roughness: 0.2, emissive: 0x332200 })
    );
    coin.position.y = 0.025;
    tipGroup.add(coin);
    tipGroup.visible = false;
    mealGroup.add(tipGroup);

    group.add(mealGroup);
    group.userData = { foodMesh, tipGroup, plate };

    this.scene.add(group);
    this.tables.set(id, group);
  }

  #createDiningChair() {
    const chair = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.5 });
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0x9b2226, roughness: 0.4 }); // Rich Burgundy Velvet / Leather

    // 4 Turned chair legs
    for (const cx of [-0.22, 0.22]) {
      for (const cz of [-0.22, 0.22]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.022, 0.46, 6), woodMat);
        leg.position.set(cx, 0.23, cz);
        leg.castShadow = true;
        chair.add(leg);
      }
    }

    // Wooden seat base
    const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.04, 0.54), woodMat);
    seatBase.position.y = 0.46;
    chair.add(seatBase);

    // Padded burgundy seat cushion
    const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.08, 0.5, 2, 0.04), cushionMat);
    cushion.position.y = 0.5;
    cushion.castShadow = true;
    chair.add(cushion);

    // Backrest posts (2 vertical supports)
    for (const cx of [-0.2, 0.2]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.54, 0.04), woodMat);
      post.position.set(cx, 0.77, 0.22);
      chair.add(post);
    }

    // Padded curved backrest
    const backRest = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.28, 0.06, 2, 0.03), cushionMat);
    backRest.position.set(0, 0.88, 0.21);
    backRest.castShadow = true;
    chair.add(backRest);

    return chair;
  }

  #addCoop() {
    const station = STATIONS.coop;
    const group = new THREE.Group();
    group.position.set(station.x, 0, station.z);
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.25, 2.2), new THREE.MeshStandardMaterial({ color: 0x9b7045, roughness: 0.9 }));
    base.position.y = 0.15;
    base.receiveShadow = true;
    group.add(base);
    const fenceMaterial = new THREE.MeshStandardMaterial({ color: 0xe7c58d, roughness: 0.88 });
    for (let index = 0; index < 4; index += 1) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.78, 0.12), fenceMaterial);
      post.position.set(index < 2 ? (index ? 1.15 : -1.15) : 0, 0.54, index < 2 ? -0.92 : (index === 2 ? -0.92 : 0.92));
      group.add(post);
    }
    const chickens = [];
    for (let index = 0; index < 3; index += 1) {
      const chicken = new THREE.Group();
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.25, 9, 8), new THREE.MeshStandardMaterial({ color: 0xfffbeb, roughness: 0.9 }));
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 5), new THREE.MeshStandardMaterial({ color: 0xf97316 }));
      beak.rotation.z = -Math.PI / 2;
      beak.position.set(0.22, 0.07, 0);
      body.position.y = 0.18;
      chicken.add(body, beak);
      chicken.position.set(-0.55 + index * 0.55, 0.3, index % 2 ? 0.38 : -0.3);
      group.add(chicken);
      chickens.push(chicken);
    }
    this.scene.add(group);
    this.coop = { group, chickens };
  }

  #addDecoration(entry) {
    const definition = DECORATIONS[entry.type];
    if (!definition && entry.type !== 'trashBin') return;
    const group = new THREE.Group();
    // Build specialized modern supermarket procedural 3D decoration
    this.#buildDecorationFallback(group, entry.type);
    group.position.set(entry.x, 0, entry.z);
    this.scene.add(group);
    this.decorItems.set(entry.id, { group, type: entry.type, modelReady: true });
  }

  #buildDecorationFallback(group, type) {
    if (type === 'trashBin') {
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.72, metalness: 0.18 });
      const lidMaterial = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.42, metalness: 0.28 });
      const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x17212b, roughness: 0.9 });
      const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.24, 0.68, 18), bodyMaterial);
      bin.position.y = 0.38;
      bin.castShadow = true;
      bin.receiveShadow = true;
      group.add(bin);

      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.33, 0.08, 18), lidMaterial);
      lid.position.y = 0.76;
      lid.castShadow = true;
      group.add(lid);
      const opening = new THREE.Mesh(new THREE.CircleGeometry(0.15, 18), darkMaterial);
      opening.rotation.x = -Math.PI / 2;
      opening.position.y = 0.805;
      group.add(opening);

      const pedal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.12), lidMaterial);
      pedal.position.set(0, 0.08, 0.31);
      group.add(pedal);

      const badgeCanvas = document.createElement('canvas');
      badgeCanvas.width = 128;
      badgeCanvas.height = 128;
      const badgeContext = badgeCanvas.getContext('2d');
      badgeContext.fillStyle = '#d1fae5';
      badgeContext.beginPath();
      badgeContext.arc(64, 64, 60, 0, Math.PI * 2);
      badgeContext.fill();
      badgeContext.fillStyle = '#15803d';
      badgeContext.font = 'bold 78px sans-serif';
      badgeContext.textAlign = 'center';
      badgeContext.textBaseline = 'middle';
      badgeContext.fillText('♻', 64, 67);
      const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
      badgeTexture.colorSpace = THREE.SRGBColorSpace;
      const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshBasicMaterial({ map: badgeTexture }));
      badge.position.set(0, 0.48, 0.299);
      group.add(badge);
    } else if (type === 'welcomeMat') {
      // 1. Modern Supermarket Heavy-Duty Entrance Mat (Image 6)
      const aluminumFrame = new THREE.Mesh(
        new RoundedBoxGeometry(1.65, 0.04, 1.05, 3, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.8, roughness: 0.25 })
      );
      aluminumFrame.position.y = 0.02;
      group.add(aluminumFrame);

      const rubberMat = new THREE.Mesh(
        new RoundedBoxGeometry(1.52, 0.045, 0.92, 2, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.9 })
      );
      rubberMat.position.y = 0.025;
      group.add(rubberMat);

      // Welcome sign badge in center of mat
      const matCanvas = document.createElement('canvas');
      matCanvas.width = 512;
      matCanvas.height = 256;
      const ctx = matCanvas.getContext('2d');
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 224, 28);
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#f1c40f';
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🛒 GBLB SUPERMARKET', 256, 95);
      ctx.fillStyle = '#f1c40f';
      ctx.font = 'bold 28px Fredoka, sans-serif';
      ctx.fillText('HOŞ GELDİNİZ • WELCOME', 256, 160);

      const matTexture = new THREE.CanvasTexture(matCanvas);
      matTexture.colorSpace = THREE.SRGBColorSpace;
      const matPlate = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 0.6),
        new THREE.MeshBasicMaterial({ map: matTexture, toneMapped: false })
      );
      matPlate.rotation.x = -Math.PI / 2;
      matPlate.position.set(0, 0.05, 0);
      group.add(matPlate);

    } else if (type === 'farmhouseSign') {
      // 2. Modern Retail Promotional A-Frame Sidewalk Sign (Image 6)
      const blackMetal = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.4 });
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });

      // Left & right tilted sign boards
      for (const [side, angle] of [[-1, 0.22], [1, -0.22]]) {
        const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.25, 0.05), blackMetal);
        boardFrame.position.set(0, 0.72, side * 0.22);
        boardFrame.rotation.x = angle;
        boardFrame.castShadow = true;
        group.add(boardFrame);

        // Poster texture
        const posterCanvas = document.createElement('canvas');
        posterCanvas.width = 256;
        posterCanvas.height = 384;
        const pCtx = posterCanvas.getContext('2d');
        pCtx.fillStyle = '#ff4757';
        pCtx.fillRect(0, 0, 256, 384);
        pCtx.fillStyle = '#f1c40f';
        pCtx.fillRect(12, 12, 232, 70);
        pCtx.fillStyle = '#ffffff';
        pCtx.font = 'bold 36px Fredoka, sans-serif';
        pCtx.textAlign = 'center';
        pCtx.fillText('FIRSAT!', 128, 62);
        pCtx.fillStyle = '#ffffff';
        pCtx.font = 'bold 54px Fredoka, sans-serif';
        pCtx.fillText('%50', 128, 175);
        pCtx.font = 'bold 30px Fredoka, sans-serif';
        pCtx.fillText('İNDİRİM', 128, 225);
        pCtx.fillStyle = '#2f3542';
        pCtx.fillRect(20, 260, 216, 90);
        pCtx.fillStyle = '#2ed573';
        pCtx.font = 'bold 24px sans-serif';
        pCtx.fillText('🛒 SÜPER FİYAT', 128, 315);

        const posterTexture = new THREE.CanvasTexture(posterCanvas);
        posterTexture.colorSpace = THREE.SRGBColorSpace;
        const poster = new THREE.Mesh(
          new THREE.PlaneGeometry(0.72, 1.08),
          new THREE.MeshBasicMaterial({ map: posterTexture, toneMapped: false })
        );
        poster.position.set(0, 0.72, side * 0.25);
        poster.rotation.x = angle;
        if (side === 1) poster.rotation.y = Math.PI;
        group.add(poster);
      }

      // Top hinge & handle
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8), chromeMat);
      hinge.rotation.z = Math.PI / 2;
      hinge.position.set(0, 1.34, 0);
      group.add(hinge);

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 12), chromeMat);
      handle.position.set(0, 1.42, 0);
      group.add(handle);

    } else if (type === 'petalPlanter') {
      // 3. Luxury Lobby & Supermarket Entrance Planter (Image 6)
      const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.15 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.8, roughness: 0.2 });
      const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.9 });
      const palmLeafMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5, side: THREE.DoubleSide });

      // Pot with gold trim
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.65, 16), ceramicMat);
      pot.position.y = 0.45;
      pot.castShadow = true;
      group.add(pot);

      const goldRing = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.025, 6, 24), goldMat);
      goldRing.rotation.x = Math.PI / 2;
      goldRing.position.y = 0.75;
      group.add(goldRing);

      // Gold tripod legs
      for (let i = 0; i < 3; i++) {
        const angle = i * Math.PI * 2 / 3;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.45, 8), goldMat);
        leg.position.set(Math.cos(angle) * 0.34, 0.2, Math.sin(angle) * 0.34);
        leg.castShadow = true;
        group.add(leg);
      }

      // Soil & Plant
      const soil = new THREE.Mesh(new THREE.CircleGeometry(0.38, 14), soilMat);
      soil.rotation.x = -Math.PI / 2;
      soil.position.y = 0.74;
      group.add(soil);

      // Lush Monstera / Areca Palm foliage
      for (let i = 0; i < 9; i++) {
        const angle = i * 2.399;
        const y = 0.82 + (i % 3) * 0.18;
        const length = 0.42 + (i % 3) * 0.12;
        const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 7), palmLeafMat);
        palm.scale.set(0.18, length, 0.025);
        palm.position.set(Math.cos(angle) * 0.22, y, Math.sin(angle) * 0.22);
        palm.rotation.z = Math.cos(angle) * 0.65;
        palm.rotation.x = Math.sin(angle) * 0.65;
        palm.castShadow = true;
        group.add(palm);
      }

      // Pink orchid blossoms
      for (const [ox, oy, oz] of [[-0.12, 1.15, 0.14], [0.15, 1.25, -0.1], [0.05, 1.35, 0.12]]) {
        const blossom = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshStandardMaterial({ color: 0xff7675 }));
        blossom.position.set(ox, oy, oz);
        group.add(blossom);
      }

    } else if (type === 'orchardLantern') {
      // 4. Modern Retail Architectural Lighting Beacon (Image 6)
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.3, metalness: 0.6 });
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0xfffa65, emissive: 0xffa502, emissiveIntensity: 0.85, roughness: 0.1,
      });

      // Heavy base
      const poleBase = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.12, 0.48, 2, 0.03), poleMat);
      poleBase.position.y = 0.06;
      group.add(poleBase);

      // Square minimalist pillar
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.45, 0.12), poleMat);
      pillar.position.y = 0.8;
      pillar.castShadow = true;
      group.add(pillar);

      // Illuminated acrylic lantern cube
      const lanternBox = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.55, 0.42, 2, 0.05), glowMat);
      lanternBox.position.y = 1.62;
      group.add(lanternBox);

      // Top roof cap
      const cap = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.08, 0.48, 2, 0.02), poleMat);
      cap.position.y = 1.92;
      group.add(cap);

      // Soft ambient light
      const pointLight = new THREE.PointLight(0xfffa65, 0.7, 4.5);
      pointLight.position.set(0, 1.62, 0);
      group.add(pointLight);

    } else if (type === 'pennantBanner') {
      // 5. Store Promotional Bunting Banners (Image 6)
      const colors = [0xff4757, 0xffa502, 0x2ed573, 0x1e90ff, 0xa55eea];
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });

      // Stanchion posts on left and right
      for (const px of [-1.1, 1.1]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.85, 8), chromeMat);
        post.position.set(px, 0.925, 0);
        post.castShadow = true;
        group.add(post);

        const finial = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), chromeMat);
        finial.position.set(px, 1.86, 0);
        group.add(finial);
      }

      // Cable catenary
      const cordPoints = [
        new THREE.Vector3(-1.1, 1.82, 0),
        new THREE.Vector3(-0.55, 1.72, 0),
        new THREE.Vector3(0, 1.68, 0),
        new THREE.Vector3(0.55, 1.72, 0),
        new THREE.Vector3(1.1, 1.82, 0),
      ];
      group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cordPoints), 20, 0.015, 6, false), chromeMat));

      // Triangular promotional bunting flags
      for (let i = 0; i < 7; i++) {
        const shape = new THREE.Shape();
        shape.moveTo(-0.12, 0.05);
        shape.lineTo(0.12, 0.05);
        shape.lineTo(0, -0.32);
        shape.closePath();
        const flag = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshStandardMaterial({
          color: colors[i % colors.length], side: THREE.DoubleSide, roughness: 0.6,
        }));
        const t = (i - 3) * 0.3;
        const cy = 1.7 + Math.pow((i - 3) / 3, 2) * 0.12;
        flag.position.set(t, cy, 0.01);
        flag.rotation.x = 0.1;
        group.add(flag);
      }

    } else if (type === 'harvestBasket') {
      // 6. Retail Promo Display Dump-Bin / Promo Basket (Image 6)
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
      const redPromo = new THREE.MeshStandardMaterial({ color: 0xe84118, roughness: 0.4 });

      // Chrome stanchion pedestal
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.08, 16), chromeMat);
      base.position.y = 0.04;
      group.add(base);

      const standPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8), chromeMat);
      standPole.position.y = 0.38;
      group.add(standPole);

      // Retail wire promo basket
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.42, 0.48, 16, 1, true), chromeMat);
      basket.position.y = 0.82;
      basket.castShadow = true;
      group.add(basket);

      const basketFloor = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), chromeMat);
      basketFloor.rotation.x = -Math.PI / 2;
      basketFloor.position.y = 0.62;
      group.add(basketFloor);

      // Colorful promo goods inside basket
      const itemColors = [0xff4757, 0x2ed573, 0xffa502, 0x1e90ff, 0xf1c40f];
      for (let i = 0; i < 7; i++) {
        const item = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.18), new THREE.MeshStandardMaterial({
          color: itemColors[i % itemColors.length], roughness: 0.5,
        }));
        item.position.set(-0.2 + (i % 3) * 0.2, 0.72 + (i > 3 ? 0.12 : 0), -0.15 + Math.floor(i / 3) * 0.2);
        item.rotation.set((i * 0.2), (i * 0.4), (i * 0.1));
        group.add(item);
      }

      // Promotional "FIRSAT / SALE" sign clipped to rim
      const promoTag = new THREE.Mesh(new RoundedBoxGeometry(0.35, 0.22, 0.03, 2, 0.02), redPromo);
      promoTag.position.set(0, 1.15, 0.52);
      group.add(promoTag);

    } else if (type === 'citrusTopiary') {
      // 7. Modern Retail Citrus Topiary Tree (Image 6)
      const potMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.6 });
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
      const crownMat = new THREE.MeshStandardMaterial({ color: 0x20bf6b, roughness: 0.7 });
      const fruitMat = new THREE.MeshStandardMaterial({ color: 0xffa502, roughness: 0.4 });
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });

      // Geometric square tapered pot
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.26, 0.58, 4), potMat);
      pot.rotation.y = Math.PI / 4;
      pot.position.y = 0.32;
      pot.castShadow = true;
      group.add(pot);

      // White river pebbles in pot
      for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.06), stoneMat);
        pebble.position.set(Math.cos(angle) * 0.18, 0.62, Math.sin(angle) * 0.18);
        group.add(pebble);
      }

      // Straight trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.95, 8), trunkMat);
      trunk.position.y = 1.05;
      trunk.castShadow = true;
      group.add(trunk);

      // Perfect topiary spherical crown
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.46, 14, 12), crownMat);
      crown.position.y = 1.68;
      crown.castShadow = true;
      group.add(crown);

      // Bright glossy oranges distributed on canopy
      for (let i = 0; i < 8; i++) {
        const angle = i * 2.399;
        const orange = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), fruitMat);
        orange.position.set(
          Math.cos(angle) * 0.38,
          1.68 + ((i % 3) - 1) * 0.18,
          Math.sin(angle) * 0.38
        );
        group.add(orange);
      }

    } else if (type === 'windowDisplay') {
      // 8. Supermarket Corner Flower & Gift Feature Display (Image 6)
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.5 });
      const darkWood = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });

      // 3-Tiered corner riser stand
      for (let s = 0; s < 3; s++) {
        const step = new THREE.Mesh(
          new RoundedBoxGeometry(1.6 - s * 0.35, 0.28, 0.9 - s * 0.22, 2, 0.03),
          s % 2 ? woodMat : darkWood
        );
        step.position.set(0, 0.14 + s * 0.28, -s * 0.12);
        step.castShadow = true;
        group.add(step);
      }

      // Sunflower & flower pots on tiers
      const flowerColors = [0xf1c40f, 0xff4757, 0xffa502, 0x9b59b6];
      for (let i = 0; i < 5; i++) {
        const potGroup = new THREE.Group();
        const potY = 0.3 + (i % 3) * 0.28;
        potGroup.position.set(-0.5 + (i % 3) * 0.5, potY, -(i % 3) * 0.12);

        const fPot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.2, 10), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
        fPot.position.y = 0.1;
        potGroup.add(fPot);

        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), new THREE.MeshStandardMaterial({
          color: flowerColors[i % flowerColors.length], roughness: 0.4,
        }));
        flower.position.y = 0.25;
        potGroup.add(flower);

        group.add(potGroup);
      }

      // Decorative wrapped gift packages
      for (let g = 0; g < 3; g++) {
        const gift = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.24), new THREE.MeshStandardMaterial({
          color: [0x2ed573, 0xff4757, 0x1e90ff][g], roughness: 0.3,
        }));
        gift.position.set(0.48 - g * 0.45, 0.74, 0.05);
        gift.rotation.y = g * 0.3;
        group.add(gift);
      }

    } else if (type === 'cardboardBoxes') {
      // 9. Warehouse Shipping Pallet with Stacked Cardboard Cartons & Pallet Jack
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.8 });
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xc89666, roughness: 0.85 });
      const tapeMat = new THREE.MeshStandardMaterial({ color: 0x8d5b4c, roughness: 0.5 });
      const jackYellow = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.4 });
      const jackBlack = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.7 });

      // Wooden Euro-Pallet base
      for (const bz of [-0.42, 0, 0.42]) {
        const stringer = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.1), woodMat);
        stringer.position.set(0, 0.04, bz);
        group.add(stringer);
      }
      for (let i = 0; i < 5; i++) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 1.0), woodMat);
        plank.position.set(-0.48 + i * 0.24, 0.1, 0);
        plank.castShadow = true;
        group.add(plank);
      }

      // Stacked corrugated shipping boxes
      const createBox = (bx, by, bz, w, h, d, rotY = 0) => {
        const bGroup = new THREE.Group();
        bGroup.position.set(bx, by, bz);
        bGroup.rotation.y = rotY;

        const carton = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), boxMat);
        carton.castShadow = true;
        bGroup.add(carton);

        const tape = new THREE.Mesh(new THREE.BoxGeometry(w + 0.005, 0.03, d + 0.005), tapeMat);
        bGroup.add(tape);

        group.add(bGroup);
      };

      createBox(-0.25, 0.35, -0.22, 0.48, 0.45, 0.48);
      createBox(0.24, 0.32, -0.22, 0.45, 0.4, 0.45, 0.08);
      createBox(-0.22, 0.35, 0.24, 0.46, 0.44, 0.46, -0.05);
      createBox(0.24, 0.35, 0.24, 0.46, 0.45, 0.46);
      createBox(0, 0.76, 0, 0.52, 0.42, 0.52, 0.12);

      // Hydraulic Pallet Jack
      const jack = new THREE.Group();
      jack.position.set(1.1, 0, 0);
      jack.rotation.y = -Math.PI / 4;
      for (const fx of [-0.15, 0.15]) {
        const fork = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.8), jackYellow);
        fork.position.set(fx, 0.07, 0.25);
        fork.castShadow = true;
        jack.add(fork);
      }
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.85, 8), jackYellow);
      column.position.set(0, 0.48, -0.22);
      jack.add(column);
      const handleT = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.04), jackBlack);
      handleT.position.set(0, 0.9, -0.22);
      jack.add(handleT);
      group.add(jack);
    }
  }

  #syncDecorations(state) {
    const entries = state.decorations ?? [];
    const activeIds = new Set(entries.map((entry) => entry.id));
    for (const [id, visual] of this.decorItems) {
      if (activeIds.has(id)) continue;
      this.scene.remove(visual.group);
      this.decorItems.delete(id);
    }
    for (const entry of entries) {
      let visual = this.decorItems.get(entry.id);
      if (!visual) {
        this.#addDecoration(entry);
        visual = this.decorItems.get(entry.id);
      } else {
        const model = DECORATIONS[entry.type]?.model;
        if (model && this.decorationModels.has(model) && !visual.modelReady) {
          this.scene.remove(visual.group);
          this.decorItems.delete(entry.id);
          this.#addDecoration(entry);
          visual = this.decorItems.get(entry.id);
        }
      }
      visual?.group.position.set(entry.x, 0, entry.z);
      if (entry.rotation !== undefined && visual?.group) visual.group.rotation.y = entry.rotation;
    }
  }

  #makeHumanoid(group, shirtColor, hairColor, style, profession = '') {
    const skin = new THREE.MeshStandardMaterial({ color: [0xffdfc4, 0xf1c19b, 0xd49a73, 0x9e684f][style % 4], roughness: 0.78 });
    const shirt = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.58 });
    const trim = new THREE.MeshStandardMaterial({ color: [0xf8e6c4, 0xffd35e, 0x57c1b8, 0xf48e7a][style % 4], roughness: 0.52 });
    const trousers = new THREE.MeshStandardMaterial({ color: [0x465b78, 0x55624b, 0x795c72, 0x59616a][style % 4], roughness: 0.76 });
    const shoe = new THREE.MeshStandardMaterial({ color: 0x75503e, roughness: 0.8 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x543c34, roughness: 0.84 });
    const part = (geometry, material, x, y, z, scale = [1, 1, 1]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      group.add(mesh);
      return mesh;
    };
    // The jacket silhouette is sculpted from overlapping padded forms.
    part(new THREE.SphereGeometry(0.31, 14, 11), shirt, 0, 0.77, 0, [0.88, 1.12, 0.65]);
    part(new THREE.SphereGeometry(0.255, 14, 11), shirt, 0, 0.57, 0, [0.91, 0.74, 0.7]);
    part(new THREE.SphereGeometry(0.065, 10, 8), skin, 0, 1.04, 0, [0.85, 1.4, 0.9]);
    const collar = part(new THREE.SphereGeometry(0.105, 10, 7), trim, 0, 0.985, 0.171, [1.7, 0.48, 0.3]);
    collar.rotation.z = Math.PI;
    part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.78, 0.197, [0.58, 1.4, 0.42]);
    part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.66, 0.195, [0.58, 1.4, 0.42]);
    const pocket = part(new RoundedBoxGeometry(0.12, 0.12, 0.045, 2, 0.025), trim, 0.16, 0.75, 0.17);
    pocket.rotation.z = -0.12;
    let leftLeg;
    let rightLeg;
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.135, 0.43, 0);
      const pants = new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.25, 4, 8), trousers);
      pants.position.y = -0.15;
      pants.castShadow = true;
      const boot = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.12, 0.3, 3, 0.055), shoe);
      boot.position.set(0, -0.31, 0.065);
      boot.castShadow = true;
      leg.add(pants, boot);
      group.add(leg);
      if (side < 0) leftLeg = leg;
      else rightLeg = leg;
    }
    const arms = [];
    for (const side of [-1, 1]) {
      const arm = new THREE.Group();
      arm.position.set(side * 0.26, 0.91, 0);
      arm.rotation.z = side * -0.08;
      const sleeve = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 9), shirt);
      sleeve.scale.set(0.88, 1.7, 0.8);
      sleeve.position.y = -0.14;
      const cuff = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), trim);
      cuff.scale.set(0.8, 0.48, 0.75);
      cuff.position.y = -0.28;
      const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.16, 3, 8), skin);
      forearm.position.y = -0.36;
      forearm.rotation.z = -side * 0.12;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.082, 10, 8), skin);
      hand.position.set(0, -0.48, 0.035);
      const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), skin);
      thumb.position.set(side * -0.045, -0.43, 0.095);
      arm.add(sleeve, cuff, forearm, hand, thumb);
      group.add(arm);
      arms.push(arm);
    }
    const head = new THREE.Group();
    head.position.set(0, 1.31, 0.015);
    partInHead(new THREE.SphereGeometry(0.245, 16, 13), skin, 0, 0, 0, [0.92, 1.08, 0.9]);
    function partInHead(geometry, material, x, y, z, scale = [1, 1, 1]) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      head.add(mesh);
      return mesh;
    }
    for (const side of [-1, 1]) {
      partInHead(new THREE.SphereGeometry(0.054, 9, 7), skin, side * 0.224, -0.01, 0, [0.64, 0.9, 0.55]);
      partInHead(new THREE.SphereGeometry(0.059, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffaaa1, roughness: 0.9 }), side * 0.135, -0.06, 0.187, [1, 0.62, 0.24]);
      partInHead(new THREE.SphereGeometry(0.053, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfffaf1 }), side * 0.086, 0.034, 0.213, [0.83, 1, 0.42]);
      partInHead(new THREE.SphereGeometry(0.027, 8, 6), new THREE.MeshBasicMaterial({ color: 0x39404d }), side * 0.081, 0.031, 0.234, [0.82, 1, 0.45]);
      const browCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(side * 0.14, 0.11, 0.21), new THREE.Vector3(side * 0.085, 0.13, 0.225), new THREE.Vector3(side * 0.04, 0.115, 0.22)]);
      head.add(new THREE.Mesh(new THREE.TubeGeometry(browCurve, 6, 0.014, 5, false), dark));
    }
    partInHead(new THREE.SphereGeometry(0.048, 9, 7), skin, 0, -0.015, 0.232, [0.72, 0.64, 0.7]);
    const smile = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.052, -0.105, 0.211), new THREE.Vector3(0, -0.129, 0.226), new THREE.Vector3(0.052, -0.105, 0.211)]);
    head.add(new THREE.Mesh(new THREE.TubeGeometry(smile, 8, 0.012, 5, false), dark));
    const hairMaterial = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.92 });
    if (profession === 'chefWaiter') {
      for (const [x, y, radius] of [[0, 0.25, 0.145], [-0.09, 0.21, 0.11], [0.09, 0.21, 0.11], [0, 0.34, 0.11]]) {
        partInHead(new THREE.SphereGeometry(radius, 10, 8), new THREE.MeshStandardMaterial({ color: 0xfff9e9, roughness: 0.86 }), x, y, 0);
      }
      partInHead(new THREE.SphereGeometry(0.19, 10, 6), trim, 0, 0.18, 0, [1, 0.18, 1]);
    } else if (profession === 'harvester' || profession === 'caretaker') {
      partInHead(new THREE.SphereGeometry(0.26, 12, 8), trim, 0, 0.19, -0.015, [1.35, 0.15, 1.05]);
      const crown = partInHead(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshStandardMaterial({ color: profession === 'harvester' ? 0xc79850 : 0x58bba0 }), 0, 0.22, -0.025, [1, 0.55, 0.95]);
      crown.rotation.z = 0.04;
    } else {
      const cap = partInHead(new THREE.SphereGeometry(0.205, 12, 9), hairMaterial, 0, 0.14, -0.035, [1.15, 0.7, 1.1]);
      cap.rotation.z = style % 2 ? 0.15 : -0.08;
      for (const side of [-1, 1]) partInHead(new THREE.SphereGeometry(0.09, 9, 7), hairMaterial, side * (0.16 + (style % 2) * 0.025), -0.055, -0.025, [0.72, 1.45, 0.85]);
      if (style % 3 === 0) partInHead(new THREE.SphereGeometry(0.11, 10, 8), hairMaterial, 0.16, -0.12, -0.02, [0.8, 1.1, 0.8]);
    }
    group.add(head);
    if (profession === 'cashier') {
      const apron = part(new RoundedBoxGeometry(0.35, 0.36, 0.055, 3, 0.045), trim, 0, 0.59, 0.184);
      apron.rotation.z = 0.015;
      part(new THREE.SphereGeometry(0.055, 9, 7), new THREE.MeshStandardMaterial({ color: 0xf8f5e8, metalness: 0.35, roughness: 0.4 }), 0.19, 0.62, 0.2, [1, 0.78, 0.25]);
    } else if (profession === 'waiter' || profession === 'chefWaiter') {
      part(new THREE.SphereGeometry(0.16, 10, 8), trim, 0, 0.61, 0.186, [0.98, 0.95, 0.22]);
      part(new THREE.SphereGeometry(0.06, 8, 6), trim, 0, 0.96, 0.205, [1.25, 0.65, 0.35]);
    } else if (!profession) {
      const outfit = style % 4;
      if (outfit === 0) part(new RoundedBoxGeometry(0.34, 0.31, 0.05, 2, 0.035), trim, 0, 0.62, 0.183);
      if (outfit === 1) {
        part(new THREE.TorusGeometry(0.23, 0.045, 7, 16), trim, 0, 0.94, 0.015);
      }
      if (outfit === 2) {
        const vest = part(new THREE.SphereGeometry(0.255, 12, 9), trim, 0, 0.75, 0.035, [0.72, 0.94, 0.63]);
        vest.scale.z = 0.44;
      }
    }
    return { legs: [leftLeg, rightLeg], arms };
  }

  #createWorker(type) {
    const group = new THREE.Group();
    const uniforms = {
      cashier: [0xff4757, 0xff3838], // Cashier in red apron (Image 1 & 2)
      harvester: [0x2ed573, 0x26af5f], // Stocker/clerk in green apron (Image 2)
      factoryFeeder: [0xff9600, 0xe58500], // Logistics in safety vest (Image 2)
      caretaker: [0xffc800, 0xe5b200], // Farm caretaker
      chefWaiter: [0xfaf5e8, 0x6d4c41], // Chef in white toque & brown apron (Image 2)
      waiter: [0x2f3640, 0xa55eea],
    };
    const [uniformColor] = uniforms[type] ?? uniforms.cashier;
    const body = this.#makeHumanoid(group, uniformColor, 0x6d4c41, type.length, type);
    const cargo = new THREE.Mesh(this.#getItemGeometry('TOMATO'), this.#getItemMaterial('TOMATO'));
    cargo.name = 'worker-cargo';
    cargo.position.set(0.36, 0.68, 0.18);
    cargo.scale.setScalar(0.8);
    group.add(cargo);
    this.scene.add(group);
    return { group, cargo, legs: body.legs, arms: body.arms, walkCycle: 0 };
  }

  #createCustomer(customer) {
    const group = new THREE.Group();
    const hash = [...customer.id].reduce((value, char) => (Math.imul(value, 31) + char.charCodeAt(0)) >>> 0, 7);
    const body = this.#makeHumanoid(group, CUSTOMER_SHIRTS[hash % CUSTOMER_SHIRTS.length], CUSTOMER_HAIR[(hash >>> 4) % CUSTOMER_HAIR.length], hash >>> 7);
    const legs = body.legs;
    const arms = body.arms;

    // Shoppers carry either a metal shopping cart or a red hand basket (matching Image 1, 2, 5, 6!)
    const isShopper = customer.kind === 'shopper';
    const hasCart = isShopper && (hash % 2 === 0);
    const hasBasket = isShopper && !hasCart;

    let cartMesh = null;
    let basketMesh = null;

    if (hasCart) {
      cartMesh = this.environment.props.createShoppingCartModel(0.92);
      cartMesh.position.set(0, 0, 0.58);
      group.add(cartMesh);
      // Pose arms forward holding the cart handle
      arms[0].rotation.set(-0.55, 0, 0.08);
      arms[1].rotation.set(-0.55, 0, -0.08);
    } else if (hasBasket) {
      basketMesh = this.environment.props.createRedBasketModel(0.85);
      basketMesh.position.set(0.3, 0.38, 0.08);
      group.add(basketMesh);
      arms[1].rotation.set(0.12, 0, -0.15);
    }

    const bubble = new THREE.Group();
    bubble.position.set(0, 2.08, 0);
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 128;
    bubbleCanvas.height = 128;
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture, transparent: true }));
    sprite.scale.set(0.65, 0.65, 1);
    bubble.add(sprite);

    // Items collected into cart or basket
    const cargo = [];
    for (let index = 0; index < 3; index += 1) {
      const mesh = new THREE.Mesh(this.#getItemGeometry('TOMATO'), this.#getItemMaterial('TOMATO'));
      if (hasCart) {
        mesh.scale.setScalar(0.7);
        mesh.position.set((index === 1 ? 0.12 : index === 2 ? -0.12 : 0), 0.52 + Math.floor(index / 2) * 0.16, 0.58 + (index % 2 ? 0.08 : -0.06));
      } else if (hasBasket) {
        mesh.scale.setScalar(0.6);
        mesh.position.set(0.3, 0.44 + index * 0.13, 0.08);
      } else {
        mesh.scale.setScalar(0.58);
        mesh.position.set(-0.22 + index * 0.2, 0.48 + index * 0.12, 0.36);
      }
      mesh.visible = false;
      cargo.push(mesh);
      group.add(mesh);
    }
    group.add(bubble);
    this.scene.add(group);
    return { group, legs, arms, bubble, bubbleCanvas, bubbleTexture, cargo, walkCycle: 0, lastWish: null, hasCart, hasBasket, cartMesh, basketMesh };
  }

  #syncCustomer(actor, customer, time, frameDelta) {
    actor.group.position.set(customer.x, 0, customer.z);
    actor.group.rotation.y = customer.facing ?? 0;
    const isSitting = ['waiting-meal', 'eating', 'ready-tip'].includes(customer.phase);
    const moving = !['paying', 'waiting-stock', 'waiting-meal', 'waiting-table', 'eating', 'ready-tip'].includes(customer.phase);

    if (isSitting) {
      // 1. Leg posture: Bent 90 degrees forward over chair seat
      actor.legs[0].rotation.x = THREE.MathUtils.lerp(actor.legs[0].rotation.x, -Math.PI / 2.15, frameDelta * 12);
      actor.legs[1].rotation.x = THREE.MathUtils.lerp(actor.legs[1].rotation.x, -Math.PI / 2.15, frameDelta * 12);

      // 2. Vertical posture: Lower hip onto chair cushion (cushion y ~ 0.54, humanoid hip pivot y = 0.43)
      actor.group.position.y = 0.11;

      // 3. Dynamic upper-body & arm animation depending on diner phase
      if (customer.phase === 'eating') {
        // Chewing / dining motion with rhythmic arm elevation towards table
        actor.arms[0].rotation.x = -0.76 + Math.sin(time * 6.5) * 0.14;
        actor.arms[1].rotation.x = -0.76 - Math.sin(time * 6.5) * 0.14;
        actor.arms[0].rotation.z = -0.16;
        actor.arms[1].rotation.z = 0.16;
        actor.group.position.y += Math.sin(time * 6.5) * 0.007; // Natural chewing head sway
      } else if (customer.phase === 'ready-tip') {
        // Finished meal, satisfied wave/gesture
        actor.arms[0].rotation.x = -1.2 + Math.sin(time * 4) * 0.12;
        actor.arms[1].rotation.x = -0.52;
        actor.arms[0].rotation.z = -0.22;
        actor.arms[1].rotation.z = 0.12;
      } else {
        // Waiting for order with hands placed neatly towards the table
        actor.arms[0].rotation.x = THREE.MathUtils.lerp(actor.arms[0].rotation.x, -0.64, frameDelta * 8);
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, -0.64, frameDelta * 8);
        actor.arms[0].rotation.z = -0.14;
        actor.arms[1].rotation.z = 0.14;
        actor.group.position.y += Math.sin(time * 2.5 + customer.id.length) * 0.006;
      }
    } else if (moving) {
      actor.walkCycle += frameDelta * 12;
      actor.legs[0].rotation.x = Math.sin(actor.walkCycle) * 0.5;
      actor.legs[1].rotation.x = -Math.sin(actor.walkCycle) * 0.5;

      if (actor.hasCart) {
        // Subtle natural push sway on cart handle
        actor.arms[0].rotation.x = -0.55 + Math.sin(actor.walkCycle) * 0.06;
        actor.arms[1].rotation.x = -0.55 - Math.sin(actor.walkCycle) * 0.06;
      } else if (actor.hasBasket) {
        // Free left arm swings, right arm holding basket stays steady
        actor.arms[0].rotation.x = -Math.sin(actor.walkCycle) * 0.34;
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, 0.08, frameDelta * 8);
      } else {
        actor.arms[0].rotation.x = -Math.sin(actor.walkCycle) * 0.32;
        actor.arms[1].rotation.x = Math.sin(actor.walkCycle) * 0.32;
      }
      actor.group.position.y = Math.abs(Math.sin(actor.walkCycle * 2)) * 0.05;
    } else {
      actor.legs[0].rotation.x = THREE.MathUtils.lerp(actor.legs[0].rotation.x, 0, frameDelta * 10);
      actor.legs[1].rotation.x = THREE.MathUtils.lerp(actor.legs[1].rotation.x, 0, frameDelta * 10);
      if (actor.hasCart) {
        actor.arms[0].rotation.x = THREE.MathUtils.lerp(actor.arms[0].rotation.x, -0.55, frameDelta * 10);
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, -0.55, frameDelta * 10);
      } else if (actor.hasBasket) {
        actor.arms[0].rotation.x = THREE.MathUtils.lerp(actor.arms[0].rotation.x, 0.04, frameDelta * 8);
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, 0.08, frameDelta * 8);
      } else {
        actor.arms[0].rotation.x = THREE.MathUtils.lerp(actor.arms[0].rotation.x, 0.04, frameDelta * 8);
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, -0.04, frameDelta * 8);
      }
      actor.group.position.y += Math.sin(time * 3 + customer.id.length) * 0.012;
    }

    const wish = customer.reaction ? (customer.reaction === 'happy' ? '😊' : '😕') : customer.kind === 'diner'
      ? (customer.phase === 'waiting-meal' ? customer.demand : null)
      : (['entering', 'to-shelf', 'waiting-stock', 'to-next-shelf'].includes(customer.phase)
        ? customer.shoppingList?.[customer.shoppingIndex ?? 0] ?? customer.demand : null);
    if (wish !== actor.lastWish) {
      const context = actor.bubbleCanvas.getContext('2d');
      context.clearRect(0, 0, 128, 128);
      if (wish) {
        context.beginPath();
        context.arc(64, 60, 48, 0, Math.PI * 2);
        context.fillStyle = '#fff';
        context.fill();
        context.lineWidth = 6;
        context.strokeStyle = '#2c3e50';
        context.stroke();
        context.font = '52px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(ITEMS[wish]?.icon ?? wish, 64, 62);
        actor.bubbleTexture.needsUpdate = true;
      }
      actor.bubble.visible = Boolean(wish);
      actor.lastWish = wish;
    }

    (customer.basket ?? []).forEach((itemId, index) => {
      const mesh = actor.cargo[index];
      if (!mesh || !ITEMS[itemId]) return;
      mesh.geometry = this.#getItemGeometry(itemId);
      mesh.material = this.#getItemMaterial(itemId);
      mesh.visible = true;
    });
    for (let index = customer.basket?.length ?? 0; index < actor.cargo.length; index += 1) actor.cargo[index].visible = false;
  }

  #addUpgradeMarker(upgrade) {
    if (this.upgradeMarkers.has(upgrade.id)) return;
    const group = new THREE.Group();
    group.position.set(upgrade.x, 0, upgrade.z);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.92, 0.18, 12), new THREE.MeshStandardMaterial({ color: 0xffc800, roughness: 0.45, metalness: 0.16 }));
    pad.position.y = 0.12;
    pad.castShadow = true;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.42), new THREE.MeshStandardMaterial({ color: 0x58cc02, emissive: 0x143b00, roughness: 0.3 }));
    gem.position.y = 0.95;
    gem.castShadow = true;
    group.add(pad, gem);
    this.scene.add(group);
    this.upgradeMarkers.set(upgrade.id, { group, gem });
  }

  #syncCollection(map, ids, create, dispose) {
    const idSet = new Set(ids);
    for (const [id, value] of map) {
      if (idSet.has(id)) continue;
      dispose?.(value);
      this.scene.remove(value.group ?? value);
      map.delete(id);
    }
    for (const id of ids) if (!map.has(id)) create(id);
  }

  #disposeVisual(value) {
    const root = value.group ?? value;
    root.traverse((object) => {
      if (!object.geometry?.userData?.sharedAsset) object.geometry?.dispose();
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        if (!material?.userData?.sharedAsset) {
          material?.map?.dispose();
          material?.dispose();
        }
      }
    });
  }

  render(state, availableUpgrades = []) {
    const frameDelta = Math.min(this.clock.getDelta(), 0.05);
    const time = this.clock.elapsedTime;
    this.environment.update(frameDelta, time);
    const wasMoving = Math.hypot(state.player.x - this.playerMesh.position.x, state.player.z - this.playerMesh.position.z) > 0.001;
    if (this.playerCharacter.type !== state.player.character) {
      this.#disposeVisual(this.playerMesh);
      this.scene.remove(this.playerMesh);
      this.playerCharacter = new CharacterFactory(state.player.character);
      this.playerMesh = this.playerCharacter.group;
      this.#createPlayerCargo();
      this.scene.add(this.playerMesh);
    }
    this.playerMesh.position.set(state.player.x, 0, state.player.z);
    this.playerMesh.rotation.y = state.player.facing;
    this.playerCharacter.animate(frameDelta, wasMoving);
    this.#syncPlayerCargo(state.stock.player?.items ?? {});
    const nearby = this.stationAt(state, state.player.x, state.player.z);
    const cameraFocus = this.playerMesh.position.clone();
    if (nearby) {
      const target = stationPosition(state, nearby);
      cameraFocus.x += (target.x - cameraFocus.x) * 0.18;
      cameraFocus.z += (target.z - cameraFocus.z) * 0.18;
    }
    this.engine.followTarget(cameraFocus, frameDelta);

    this.#syncCollection(this.farms, Object.keys(state.farms), (id) => this.#addFarm(id), (entry) => this.#disposeVisual(entry));
    for (const [farmId, farm] of this.farms) {
      const farmState = state.farms[farmId];
      const count = farmState?.readyCount ?? 0;
      farm.produce.forEach((mesh, index) => {
        mesh.visible = farmState?.plants?.[index]?.ready ?? index < count;
      });
      const distance = Math.hypot(state.player.x - farm.group.position.x, state.player.z - farm.group.position.z);
      this.#statusBadge(farm.group, count ? (state.settings.language === 'en' ? `READY ${count}` : `HAZIR ${count}`)
        : (state.settings.language === 'en' ? 'GROWING' : 'BÜYÜYOR'), count ? '#58cc02' : '#1cb0f6', distance < 10, 2.1);
    }
    this.#syncCollection(this.machines, Object.keys(state.machines), (id) => this.#addMachine(id), (entry) => this.#disposeVisual(entry));
    const shelfItems = state.unlockedProducts.filter((item) => SHELVES[item]);
    if (!shelfItems.includes('TOMATO')) shelfItems.push('TOMATO');
    this.#syncCollection(this.shelves, shelfItems, (id) => this.#addShelf(id), (entry) => this.#disposeVisual(entry));
    this.#syncCollection(this.tables, Object.keys(state.diningTables), (id) => this.#addTable(id), (entry) => this.#disposeVisual(entry));
    this.#syncDecorations(state);
    for (const [id, farm] of this.farms) {
      const p = stationPosition(state, id);
      farm.group.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) farm.group.rotation.y = p.rotation;
    }
    for (const [id, machine] of this.machines) {
      const p = stationPosition(state, id);
      machine.group.position.set(p.x, 0, p.z);
      const baseRot = p.rotation ?? 0;
      const wobble = (state.machines[id]?.progressTicks ? Math.sin(time * 1.5) * 0.025 : 0);
      machine.group.rotation.y = baseRot + wobble;
    }
    for (const [item, shelf] of this.shelves) {
      const id = Object.keys(STATIONS).find((key) => STATIONS[key].kind === 'shelf' && STATIONS[key].item === item);
      const p = stationPosition(state, id);
      shelf.group.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) shelf.group.rotation.y = p.rotation;
    }
    for (const [id, table] of this.tables) {
      const p = stationPosition(state, id);
      table.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) table.rotation.y = p.rotation;
    }
    {
      const p = stationPosition(state, 'register');
      this.registerMesh.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) this.registerMesh.rotation.y = p.rotation;
    }
    // Otomatik Kasalar (Self-Checkouts)
    const selfRegIds = Object.keys(state.selfRegisters ?? {});
    this.#syncCollection(this.selfRegisters, selfRegIds, (id) => this.#createSelfRegister(id), (entry) => this.#disposeVisual(entry));
    for (const [id, regGroup] of this.selfRegisters) {
      const p = stationPosition(state, id);
      if (p) {
        regGroup.position.set(p.x, 0, p.z);
        if (p.rotation !== undefined) regGroup.rotation.y = p.rotation;
      }
    }
    // Ekstra Satın Alınan Reyonlar (Custom Shelves)
    const customShelfIds = Object.keys(state.customStations ?? {}).filter((id) => state.customStations[id].kind === 'shelf');
    this.#syncCollection(this.customShelves, customShelfIds, (id) => this.#addCustomShelf(id, state.customStations[id]), (entry) => this.#disposeVisual(entry));
    for (const [id, shelf] of this.customShelves) {
      const p = stationPosition(state, id);
      if (p) {
        shelf.group.position.set(p.x, 0, p.z);
        if (p.rotation !== undefined) shelf.group.rotation.y = p.rotation;
      }
      const shelfStock = state.stock[`shelf:${id}`];
      const count = shelfStock
        ? (shelfStock.items[shelf.item] ?? 0)
        : (state.stock[`shelf:${shelf.item}`]?.items[shelf.item] ?? 0);
      shelf.productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
    }
    if (this.coop) {
      const p = stationPosition(state, 'coop');
      this.coop.group.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) this.coop.group.rotation.y = p.rotation;
    }
    if (state.coops.coop && !this.coop) this.#addCoop();
    if (!state.coops.coop && this.coop) {
      this.scene.remove(this.coop.group);
      this.coop = null;
    }
    if (this.coop) {
      this.coop.chickens.forEach((chicken, index) => {
        chicken.visible = index < state.coops.coop.chickens;
        chicken.rotation.y = Math.sin(time * 2 + index * 2) * 0.1;
      });
    }
    if (this.selectedStation) {
      const group = this.#selectedGroup(this.selectedStation);
      const point = this.#selectionPosition(state, this.selectedStation);
      if (group) group.position.y = 0.55 + Math.sin(time * 4) * 0.08;
      this.selectionRing.position.set(point.x, 0.07, point.z);

      const isDecor = this.selectedStation.startsWith('decor:');
      const rot = isDecor
        ? (state.decorations?.find((item) => item.id === this.selectedStation.slice(6))?.rotation ?? 0)
        : (state.layout?.[this.selectedStation]?.rotation ?? 0);
      const dims = isDecor
        ? getDecorationDimensions(state.decorations?.find((item) => item.id === this.selectedStation.slice(6))?.type, rot)
        : getStationDimensions(this.selectedStation, rot);
      const baseScale = Math.max(dims.width, dims.depth) * 0.55;
      this.selectionRing.scale.setScalar(baseScale * (1 + Math.sin(time * 4) * 0.06));
    }
    this.#syncCollection(this.upgradeMarkers, availableUpgrades.map((entry) => entry.id), (id) => {
      const upgrade = availableUpgrades.find((entry) => entry.id === id);
      if (upgrade) this.#addUpgradeMarker(upgrade);
    }, (marker) => this.#disposeVisual(marker));

    for (const [itemId, shelf] of this.shelves) {
      const count = state.stock[shelf.id]?.items[itemId] ?? 0;
      this.#drawShelfLabel(shelf, itemId, state.settings.language);
      shelf.productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
      const distance = Math.hypot(state.player.x - shelf.group.position.x, state.player.z - shelf.group.position.z);
      this.#statusBadge(shelf.group, count ? `${count}/${SHELVES[itemId].capacity}`
        : (state.settings.language === 'en' ? 'EMPTY' : 'BOŞ'), count ? '#58cc02' : '#ff4b4b', distance < 8, 2.65);
    }
    for (const [machineId, machine] of this.machines) {
      const count = state.stock[`machine:${machineId}:output`]?.items[machine.outputItem] ?? 0;
      const shown = Math.min(count, 5);
      while (machine.output.children.length < shown) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(machine.outputItem), this.#getItemMaterial(machine.outputItem));
        machine.output.add(mesh);
      }
      machine.output.children.forEach((mesh, index) => {
        mesh.visible = index < shown;
        mesh.position.set((index % 2) * 0.34, 0.15 + Math.floor(index / 2) * 0.3, Math.floor(index / 2) * 0.2);
      });
      const entry = state.machines[machineId];
      for (const { mesh, itemId, index } of machine.inputMeshes) {
        mesh.visible = index < (state.stock[`machine:${machineId}:input`]?.items[itemId] ?? 0);
      }
      machine.lamp.material.color.setHex(entry?.blocked === 'output-full' ? 0xff4b4b
        : entry?.progressTicks ? 0xffc800 : 0x58cc02);
      machine.group.rotation.y = Math.sin(time * 1.5) * (entry && entry.progressTicks ? 0.025 : 0);
      const distance = Math.hypot(state.player.x - machine.group.position.x, state.player.z - machine.group.position.z);
      const status = count ? (state.settings.language === 'en' ? `READY ${count}` : `HAZIR ${count}`)
        : entry?.progressTicks ? (state.settings.language === 'en' ? 'WORKING' : 'ÜRETİYOR')
          : (state.settings.language === 'en' ? 'NEEDS STOCK' : 'MALZEME GEREK');
      this.#statusBadge(machine.group, status, count ? '#58cc02' : entry?.progressTicks ? '#ffc800' : '#ff9600', distance < 10, 2.85);
    }

    for (const [id, table] of this.tables) {
      const customer = state.customers.find((entry) => entry.id === state.diningTables[id]?.customerId);
      const waiting = customer?.phase === 'waiting-meal';
      const eating = customer?.phase === 'eating';
      const ready = (state.diningTables[id]?.tipAtoms ?? 0) > 0;

      // Update place setting visuals on table
      if (table.userData?.foodMesh) {
        const mealItem = customer?.meal ?? customer?.demand;
        if (eating && mealItem && ITEMS[mealItem]) {
          table.userData.foodMesh.geometry = this.#getItemGeometry(mealItem);
          table.userData.foodMesh.material = this.#getItemMaterial(mealItem);
          table.userData.foodMesh.visible = true;
          table.userData.foodMesh.rotation.y = time * 0.5;
        } else {
          table.userData.foodMesh.visible = false;
        }
      }
      if (table.userData?.tipGroup) {
        table.userData.tipGroup.visible = ready;
        if (ready) {
          table.userData.tipGroup.rotation.y = time * 2.5;
        }
      }

      const distance = Math.hypot(state.player.x - table.position.x, state.player.z - table.position.z);
      this.#statusBadge(table, ready ? (state.settings.language === 'en' ? 'TIP READY' : 'BAHŞİŞ HAZIR')
        : waiting ? `${ITEMS[customer.demand]?.icon ?? '🍽️'} ${state.settings.language === 'en' ? 'ORDER' : 'SİPARİŞ'}` : '',
      ready ? '#58cc02' : '#ff9600', (ready || waiting) && distance < 12, 2.1);
    }

    for (let index = this.effects.length - 1; index >= 0; index -= 1) {
      const effect = this.effects[index];
      effect.age += frameDelta;
      effect.mesh.position.x += effect.vx * frameDelta;
      effect.mesh.position.z += effect.vz * frameDelta;
      effect.mesh.position.y += 1.1 * frameDelta;
      effect.mesh.material.opacity = Math.max(0, 1 - effect.age / 0.55);
      if (effect.age >= 0.55) {
        this.scene.remove(effect.mesh);
        effect.mesh.geometry.dispose(); effect.mesh.material.dispose();
        this.effects.splice(index, 1);
      }
    }

    const customerIds = state.customers.map((customer) => customer.id);
    this.#syncCollection(this.customers, customerIds, (id) => {
      const customer = state.customers.find((entry) => entry.id === id);
      if (customer) this.customers.set(id, this.#createCustomer(customer));
    }, (group) => this.#disposeVisual(group));
    for (const customer of state.customers) {
      const actor = this.customers.get(customer.id);
      if (actor) this.#syncCustomer(actor, customer, time, frameDelta);
    }

    const workerIds = state.workers.map((worker) => worker.id);
    this.#syncCollection(this.workers, workerIds, (id) => {
      const worker = state.workers.find((entry) => entry.id === id);
      if (worker) this.workers.set(id, this.#createWorker(worker.type));
    });
    state.workers.forEach((worker, index) => {
      const actor = this.workers.get(worker.id);
      if (!actor) return;
      const x = worker.x ?? -8 + (index % 3) * 0.65;
      const z = worker.z ?? (index % 2 ? 0.7 : -0.7);
      const moving = Math.hypot(x - actor.group.position.x, z - actor.group.position.z) > 0.025;
      if (moving) {
        actor.walkCycle += frameDelta * 12;
        actor.legs[0].rotation.x = Math.sin(actor.walkCycle) * 0.48;
        actor.legs[1].rotation.x = -Math.sin(actor.walkCycle) * 0.48;
        actor.arms[0].rotation.x = -Math.sin(actor.walkCycle) * 0.3;
        actor.arms[1].rotation.x = Math.sin(actor.walkCycle) * 0.3;
        actor.group.position.y = Math.abs(Math.sin(actor.walkCycle * 2)) * 0.045;
      } else {
        actor.legs[0].rotation.x = THREE.MathUtils.lerp(actor.legs[0].rotation.x, 0, frameDelta * 10);
        actor.legs[1].rotation.x = THREE.MathUtils.lerp(actor.legs[1].rotation.x, 0, frameDelta * 10);
        actor.arms[0].rotation.x = THREE.MathUtils.lerp(actor.arms[0].rotation.x, 0.04, frameDelta * 8);
        actor.arms[1].rotation.x = THREE.MathUtils.lerp(actor.arms[1].rotation.x, -0.08, frameDelta * 8);
        actor.group.position.y = THREE.MathUtils.lerp(actor.group.position.y, 0, frameDelta * 10);
      }
      actor.group.position.x = x;
      actor.group.position.z = z;
      actor.group.rotation.y = worker.facing ?? 0;
      const stock = state.stock[`worker:${worker.id}`]?.items ?? {};
      const carriedItem = Object.keys(stock)[0];
      actor.cargo.visible = Boolean(carriedItem);
      if (carriedItem) {
        actor.cargo.geometry = this.#getItemGeometry(carriedItem);
        actor.cargo.material = this.#getItemMaterial(carriedItem);
      }
    });

    for (const marker of this.upgradeMarkers.values()) {
      marker.gem.position.y = 0.98 + Math.sin(time * 2.5) * 0.12;
      marker.gem.rotation.y += frameDelta;
    }
    this.engine.render();
  }

  screenToWorld(clientX, clientY) {
    const rect = this.engine.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.engine.camera);
    const point = new THREE.Vector3();
    return this.raycaster.ray.intersectPlane(this.groundPlane, point) ? { x: point.x, z: point.z } : null;
  }

  getCanvas() {
    return this.engine.renderer.domElement;
  }
}

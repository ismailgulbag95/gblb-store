import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Engine } from '../core/Engine.js';
import { MarketGrid } from '../environment/MarketGrid.js';
import { ITEMS, RECIPES, SHELVES, STATIONS } from '../domain/catalog.js';
import { gameDaylight } from '../domain/dayCycle.js';
import { CharacterFactory } from './CharacterFactory.js';
import { animateCoopChicken, createChickenCoopModel } from './ChickenCoopModel.js';
import { createFarmBuildModel } from './FarmBuildModel.js';
import { buildFarmDecorationModel } from './FarmDecorationModels.js';
import { createProductionBuildModel } from './ProductionBuildModel.js';
import { ZONES, canPlaceDecoration, canPlaceStation, getAllStationIds, getDecorationDimensions, getStationDimensions, isStationUnlocked, stationPosition } from '../domain/layout.js';
import { DECORATIONS } from '../domain/decorCatalog.js';
import { drawAssetIcon } from '../ui/AssetIcons.js';

import { LightingManager } from './LightingManager.js';
import { Item3DFactory } from './Item3DFactory.js';
import { createRegisterModel } from './RegisterModel.js';
import { createShelfModel } from './ShelfModel.js';
import { buildDecorationModel } from './DecorationModel.js';

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
    this.itemFactory = new Item3DFactory();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.clock = new THREE.Clock();
    this.effects = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.#createPlayer();
    this.lighting = new LightingManager(this.scene);
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
        const mesh = new THREE.Mesh(this.itemFactory.getItemGeometry(itemId), this.itemFactory.getItemMaterial(itemId));
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
      new THREE.MeshBasicMaterial({ color: 0xfff4c7, transparent: true, depthWrite: false }),
    );
    sun.position.set(-54, 24, -36);
    this.sun = sun;
    this.scene.add(sun);
  }

  #createRegister() {
    const group = createRegisterModel();
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
      if (child.isMesh && child.geometry === this.itemFactory.getItemGeometry(station.item)) {
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
    const farmPos = state ? (state.layout?.[id] ?? state.customStations?.[id] ?? STATIONS[id]) : station;
    const farm = createFarmBuildModel(station.item);
    farm.group.position.set(farmPos?.x ?? station.x ?? 0, 0, farmPos?.z ?? station.z ?? 0);
    if (farmPos?.rotation !== undefined) farm.group.rotation.y = farmPos.rotation;
    this.scene.add(farm.group);
    this.farms.set(id, farm);
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

    const { lamp, input, output, badgeY } = createProductionBuildModel(group, baseId);

    const inputMeshes = [];
    for (const [itemId, quantity] of Object.entries(recipe.inputs)) {
      for (let index = 0; index < quantity; index += 1) {
        const mesh = new THREE.Mesh(this.itemFactory.getItemGeometry(itemId), this.itemFactory.getItemMaterial(itemId));
        mesh.position.set((inputMeshes.length % 2) * 0.24 - 0.12,
          0.12 + Math.floor(inputMeshes.length / 2) * 0.2, (inputMeshes.length % 2) * 0.12 - 0.04);
        mesh.castShadow = true;
        input.add(mesh);
        inputMeshes.push({ mesh, itemId, index });
      }
    }

    this.scene.add(group);
    this.machines.set(id, { group, inputMeshes, output, outputItem: recipe.output, lamp, badgeY });
  }

  #addShelf(itemId) {
    if (this.shelves.has(itemId) || !SHELVES[itemId]) return;
    const shelfDef = SHELVES[itemId];
    const { group, productMeshes, labelCanvas, labelTexture } = createShelfModel(itemId, shelfDef, this.itemFactory);
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

    const foodMesh = new THREE.Mesh(this.itemFactory.getItemGeometry('BURGER'), this.itemFactory.getItemMaterial('BURGER'));
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
    const coop = createChickenCoopModel();
    const { group } = coop;
    group.position.set(station.x, 0, station.z);
    this.scene.add(group);
    this.coop = coop;
  }

  #addDecoration(entry) {
    const definition = DECORATIONS[entry.type];
    if (!definition && entry.type !== 'trashBin') return;
    const group = new THREE.Group();
    buildDecorationModel(group, entry.type);
    group.position.set(entry.x, 0, entry.z);
    this.scene.add(group);
    this.decorItems.set(entry.id, { group, type: entry.type, modelReady: true });
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
    const cargo = new THREE.Mesh(this.itemFactory.getItemGeometry('TOMATO'), this.itemFactory.getItemMaterial('TOMATO'));
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
      const mesh = new THREE.Mesh(this.itemFactory.getItemGeometry('TOMATO'), this.itemFactory.getItemMaterial('TOMATO'));
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

    const wish = customer.reaction ? (customer.reaction === 'happy' ? 'satisfied' : 'unhappy') : customer.kind === 'diner'
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
        drawAssetIcon(context, ITEMS[wish]?.icon ?? wish, 32, 28, 64, 64);
        actor.bubbleTexture.needsUpdate = true;
      }
      actor.bubble.visible = Boolean(wish);
      actor.lastWish = wish;
    }

    (customer.basket ?? []).forEach((itemId, index) => {
      const mesh = actor.cargo[index];
      if (!mesh || !ITEMS[itemId]) return;
      mesh.geometry = this.itemFactory.getItemGeometry(itemId);
      mesh.material = this.itemFactory.getItemMaterial(itemId);
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
    this.lighting.updateDaylight(gameDaylight, state.tick, THREE);
    this.environment.setRestaurantUnlocked(state.unlocked?.restaurant);
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
        : (state.settings.language === 'en' ? 'GROWING' : 'BÜYÜYOR'), count ? '#58cc02' : '#1cb0f6', distance < 10, farm.badgeY ?? 3.05);
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
      shelf.group.visible = Boolean(p);
      if (!p) continue;
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
        chicken.group.visible = index < state.coops.coop.chickens;
        chicken.group.rotation.y = Math.sin(time * 1.1 + index * 2) * 0.08;
        animateCoopChicken(chicken, time);
      });
      const storedEggs = state.stock['coop:eggs']?.items?.EGG ?? 0;
      this.coop.eggMeshes.forEach((egg, index) => { egg.visible = index < storedEggs; });
      const feedAvailable = state.stock['coop:feed']?.items?.CHICKEN_FEED ?? 0;
      this.coop.feedBits.forEach((grain, index) => { grain.visible = index < Math.min(7, feedAvailable * 2); });
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
        const mesh = new THREE.Mesh(this.itemFactory.getItemGeometry(machine.outputItem), this.itemFactory.getItemMaterial(machine.outputItem));
        machine.output.add(mesh);
      }
      machine.output.children.forEach((mesh, index) => {
        mesh.visible = index < shown;
        mesh.position.set((index % 2) * 0.25 - 0.12,
          0.15 + Math.floor(index / 2) * 0.26, Math.floor(index / 2) * 0.18 - 0.06);
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
      this.#statusBadge(machine.group, status, count ? '#58cc02' : entry?.progressTicks ? '#ffc800' : '#ff9600', distance < 10, machine.badgeY ?? 3.25);
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
          table.userData.foodMesh.geometry = this.itemFactory.getItemGeometry(mealItem);
          table.userData.foodMesh.material = this.itemFactory.getItemMaterial(mealItem);
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
        : waiting ? (state.settings.language === 'en' ? 'ORDER' : 'SİPARİŞ') : '',
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
        actor.cargo.geometry = this.itemFactory.getItemGeometry(carriedItem);
        actor.cargo.material = this.itemFactory.getItemMaterial(carriedItem);
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

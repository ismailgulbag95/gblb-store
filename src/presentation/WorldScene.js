import { WorldEventVisuals } from './WorldEventVisuals.js';
import { activeWorldEvent } from '../domain/worldEvents.js';
import * as THREE from 'three';
import { animate } from 'animejs';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { updateShelfFeedback } from './ShelfFeedback.js';
import { addContactShadow } from './ContactShadow.js';
import { Engine } from '../core/Engine.js';
import { MarketGrid } from '../environment/MarketGrid.js';
import { ITEMS, RECIPES, SHELVES, STATIONS, UPGRADES } from '../domain/catalog.js';
import { gameDaylight } from '../domain/dayCycle.js';
import { workerWorkSpeed } from '../domain/staff.js';
import { getAvailableRegisters } from '../domain/simulation.js';
import { CharacterFactory } from './CharacterFactory.js';
import { animateCoopChicken, createChickenCoopModel } from './ChickenCoopModel.js';
import { createFarmBuildModel } from './FarmBuildModel.js';
import { buildFarmDecorationModel } from './FarmDecorationModels.js';
import { createProductionBuildModel } from './ProductionBuildModel.js';
import { ZONES, canPlaceAccessibleStation, pendingPlacementIds, canPlaceDecoration, canPlaceHangingSign, canPlaceStation, getAllStationIds, getDecorationDimensions, getStationDimensions, HANGING_SIGN_FOOTPRINT, hangingSignPosition, isStationUnlocked, registerCashPosition, stationPosition } from '../domain/layout.js';
import { DECORATIONS } from '../domain/decorCatalog.js';
import { drawAssetIcon } from '../ui/AssetIcons.js';

import { LightingManager } from './LightingManager.js';
import { Item3DFactory } from './Item3DFactory.js';
import { createRegisterModel } from './RegisterModel.js';
import { createCashPileModel, updateCashPileModel, disposeCashPileModel } from './CashPileModel.js';
import { createShelfModel } from './ShelfModel.js';
import { buildDecorationModel } from './DecorationModel.js';
import { createWorkerMesh, createCustomerMesh, updateWorkerEnergyBar } from './HumanoidFactory.js';
import { createDiningTableModel } from './DiningTableModel.js';
import { customerHasPaid, customerExpression } from './CustomerExpressions.js';
import { CharacterAnimator } from './CharacterAnimator.js';

const SCENE_VISUALS_PER_FRAME = 1;
const SCENE_VISUAL_BATCH_THRESHOLD = 6;

function countMissingVisuals(map, ids) {
  let count = 0;
  for (const id of ids) if (!map.has(id)) count += 1;
  return count;
}

export class WorldScene {
  constructor(containerId = 'game-container') {
    this.engine = new Engine(containerId);
    this.scene = this.engine.scene;
    this.environment = new MarketGrid(this.scene);
    this.worldEventVisuals = new WorldEventVisuals(this.scene);
    this.farms = new Map();
    this.machines = new Map();
    this.shelves = new Map();
    this.customShelves = new Map();
    this.selfRegisters = new Map();
    this.checkoutRegisters = new Map();
    this.cashPiles = new Map();
    this.customers = new Map();
    this.workers = new Map();
    this.animationClaims = new Set();
    this.tables = new Map();
    this.decorItems = new Map();
    this.decorationModels = new Map();
    this.decorationLoader = new GLTFLoader();
    this.coop = null;
    this.upgradeMarkers = new Map();
    this.visualBuildFailures = new Map();
    this.dynamicVisualFailures = new Set();
    this.onVisualError = null;
    this.itemFactory = new Item3DFactory();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.intersectPoint = new THREE.Vector3();
    this.cameraFocus = new THREE.Vector3();
    this.worldCoords = { x: 0, z: 0 };
    this.clock = new THREE.Clock();
    this.effects = [];
    this.particleGeometry = new THREE.SphereGeometry(0.075, 6, 5);
    this.particleMaterials = {
      gold: new THREE.MeshBasicMaterial({ color: 0xffc800, transparent: true }),
      blue: new THREE.MeshBasicMaterial({ color: 0x1cb0f6, transparent: true }),
      green: new THREE.MeshBasicMaterial({ color: 0x58cc02, transparent: true }),
    };
    this.particleMaterials.white = new THREE.MeshBasicMaterial({ color: 0xfff8dc, transparent: true });
    const star = new THREE.Shape();
    for (let i = 0; i < 10; i++) { const angle = i * Math.PI / 5 + Math.PI / 2; const r = i % 2 ? 0.035 : 0.09; const x = Math.cos(angle) * r, y = Math.sin(angle) * r; if (i === 0) star.moveTo(x, y); else star.lineTo(x, y); }
    star.closePath(); this.starGeometry = new THREE.ShapeGeometry(star);
    this.ringGeometry = new THREE.RingGeometry(0.1, 0.15, 16);
    this.particlePool = [];
    for (let i = 0; i < 30; i += 1) {
      const p = new THREE.Mesh(this.particleGeometry, this.particleMaterials.gold);
      p.userData.materials = Object.fromEntries(Object.entries(this.particleMaterials).map(([key, material]) => [key, material.clone()]));
      p.visible = false;
      this.scene.add(p);
      this.particlePool.push(p);
    }
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
    addContactShadow(this.playerMesh);
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

  #createCheckoutRegister(id, state) {
    const register = state.checkoutRegisters[id];
    const group = createRegisterModel({ x: register.x, z: register.z, number: register.number ?? 2 });
    this.scene.add(group);
    this.checkoutRegisters.set(id, group);
    return group;
  }

  #createCashPile(id) {
    const pile = createCashPileModel();
    this.scene.add(pile.group);
    this.cashPiles.set(id, pile);
    return pile;
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
    group.scale.y = 1;
    this.customShelves.set(id, { group, productMeshes, item: station.item, id, wobbler: group.getObjectByName('shelf-wobbler') });
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
      if (point) this.previewPlacement(state, point.x, point.z);
      else this.placementPreview.visible = false;
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

    const isHangingSign = this.selectedStation.startsWith('hanging-sign:');
    const isDecor = this.selectedStation.startsWith('decor:');
    let rotation = 0;
    let dims = { width: 2, depth: 2 };

    if (isHangingSign) {
      dims = HANGING_SIGN_FOOTPRINT;
    } else if (isDecor) {
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

    const valid = isHangingSign
      ? canPlaceHangingSign(state, this.selectedStation.slice('hanging-sign:'.length), snappedX, snappedZ)
      : isDecor
        ? canPlaceDecoration(state, this.selectedStation.slice(6), snappedX, snappedZ, rotation)
        : pendingPlacementIds(state).includes(this.selectedStation)
          ? canPlaceAccessibleStation(state, this.selectedStation, snappedX, snappedZ)
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
    if (this.checkoutRegisters.has(id)) return this.checkoutRegisters.get(id);
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

  hangingSignAtScreen(clientX, clientY) {
    const rect = this.engine.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.engine.camera);
    const signs = this.environment?.hangingSigns ? [...this.environment.hangingSigns.values()] : [];
    const hit = this.raycaster.intersectObjects(signs, true)[0];
    let object = hit?.object;
    while (object && !object.userData.hangingSignId) object = object.parent;
    return object?.userData.hangingSignId ?? null;
  }

  #selectionPosition(state, id) {
    if (id.startsWith('hanging-sign:')) return hangingSignPosition(state, id.slice('hanging-sign:'.length)) ?? { x: 0, z: 0 };
    if (!id.startsWith('decor:')) return stationPosition(state, id);
    const entry = state.decorations?.find((item) => item.id === id.slice(6));
    return entry ? { x: entry.x, z: entry.z } : { x: 0, z: 0 };
  }



  #drawBadgeIcon(context, iconId, x, y, size) {
    if (iconId && drawAssetIcon(context, iconId, x, y, size, size)) {
      return;
    }
    const itemEntry = Object.values(ITEMS).find((it) => it.icon === iconId || it.id === iconId);
    const colorHex = itemEntry ? `#${itemEntry.color.toString(16).padStart(6, '0')}` : '#ffd35e';
    context.save();
    context.beginPath();
    context.arc(x + size / 2, y + size / 2, size * 0.44, 0, Math.PI * 2);
    context.fillStyle = colorHex;
    context.fill();
    context.lineWidth = 2.2;
    context.strokeStyle = '#000000';
    context.stroke();
    context.fillStyle = '#000000';
    context.font = `bold ${Math.round(size * 0.38)}px Fredoka, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const initial = (itemEntry?.name || iconId || '?').slice(0, 2).toUpperCase();
    context.fillText(initial, x + size / 2, y + size / 2 + 1);
    context.restore();
  }

  #statusBadge(group, optionsOrLabel, legacyTone = '#ffd35e', legacyVisible = true, legacyHeight = 2.45) {
    const opts = typeof optionsOrLabel === 'object' && optionsOrLabel !== null
      ? optionsOrLabel
      : {
        label: String(optionsOrLabel ?? ''),
        tone: legacyTone,
        visible: legacyVisible,
        height: legacyHeight,
        type: String(optionsOrLabel ?? '').includes('HAZIR') || String(optionsOrLabel ?? '').includes('READY') ? 'ready'
          : String(optionsOrLabel ?? '').includes('MALZEME') || String(optionsOrLabel ?? '').includes('EMPTY') || String(optionsOrLabel ?? '').includes('BOŞ') ? 'missing'
          : String(optionsOrLabel ?? '').includes('ÜRETİYOR') || String(optionsOrLabel ?? '').includes('WORKING') || String(optionsOrLabel ?? '').includes('BÜYÜYOR') ? 'working'
          : 'custom',
        distance: 8,
      };

    let sprite = group.getObjectByName('status-badge');
    if (!opts.visible) {
      if (sprite) sprite.visible = false;
      return;
    }

    const height = opts.height ?? 2.45;
    if (!sprite) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, toneMapped: false, transparent: true, depthTest: false }));
      sprite.name = 'status-badge';
      sprite.userData.canvas = canvas;
      sprite.position.y = height;
      sprite.scale.set(1.5, 0.75, 1);
      group.add(sprite);
    }

    sprite.visible = true;
    sprite.position.y = height;

    const type = opts.type ?? 'custom';
    const count = opts.count ?? 0;
    const maxCount = opts.maxCount;
    const progress = Math.max(0, Math.min(1, opts.progress ?? 0));
    const itemIcon = opts.itemIcon ?? '';
    const label = opts.label ?? '';
    const tone = opts.tone ?? '#ffd35e';
    const isClose = (opts.distance ?? 10) < 4.5;
    const progressBucket = Math.round(progress * 5);
    const signature = `${type}:${itemIcon}:${count}:${maxCount}:${progressBucket}:${tone}:${isClose ? 1 : 0}:${label}`;
    if (sprite.userData.signature === signature) return;
    sprite.userData.signature = signature;

    const canvas = sprite.userData.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 256, 128);

    const bx = 36;
    const by = 10;
    const bw = 184;
    const bh = 54;
    const radius = 12;
    const arrowW = 11;
    const arrowH = 15;
    const stemH = 10;
    const cx = bx + bw / 2;

    const drawPath = (ctx) => {
      ctx.beginPath();
      ctx.moveTo(bx + radius, by);
      ctx.lineTo(bx + bw - radius, by);
      ctx.arcTo(bx + bw, by, bx + bw, by + radius, radius);
      ctx.lineTo(bx + bw, by + bh - radius);
      ctx.arcTo(bx + bw, by + bh, bx + bw - radius, by + bh, radius);
      ctx.lineTo(cx + arrowW, by + bh);
      ctx.lineTo(cx, by + bh + arrowH);
      ctx.lineTo(cx - arrowW, by + bh);
      ctx.lineTo(bx + radius, by + bh);
      ctx.arcTo(bx, by + bh, bx, by + bh - radius, radius);
      ctx.lineTo(bx, by + radius);
      ctx.arcTo(bx, by, bx + radius, by, radius);
      ctx.closePath();
    };

    // 1. Drop-shadow (+4px, +4px)
    context.save();
    context.translate(4, 4);
    drawPath(context);
    context.fillStyle = '#000000';
    context.fill();
    context.beginPath();
    context.moveTo(cx, by + bh + arrowH);
    context.lineTo(cx, by + bh + arrowH + stemH);
    context.lineWidth = 4;
    context.strokeStyle = '#000000';
    context.stroke();
    context.restore();

    // 2. Main Neobrutalist Badge Body (Warm Cream #fffdf5)
    drawPath(context);
    context.fillStyle = '#fffdf5';
    context.fill();
    context.lineWidth = 3.5;
    context.strokeStyle = '#000000';
    context.stroke();

    // Downward stem line linking the badge to the building
    context.beginPath();
    context.moveTo(cx, by + bh + arrowH);
    context.lineTo(cx, by + bh + arrowH + stemH);
    context.lineWidth = 3.5;
    context.strokeStyle = '#000000';
    context.stroke();
    context.beginPath();
    context.arc(cx, by + bh + arrowH + stemH, 3, 0, Math.PI * 2);
    context.fillStyle = '#000000';
    context.fill();

    // 3. Left Indicator Pill
    const px = bx + 8;
    const py = by + 7;
    const pw = 40;
    const ph = 40;
    const pradius = 8;
    const pillColor = type === 'ready' ? '#2ed573'
      : type === 'missing' ? '#ff4757'
      : type === 'working' ? '#ffd35e'
      : tone;

    // Pill Shadow
    context.fillStyle = '#000000';
    context.beginPath();
    context.roundRect(px + 2, py + 2, pw, ph, pradius);
    context.fill();

    // Pill Body
    context.fillStyle = pillColor;
    context.beginPath();
    context.roundRect(px, py, pw, ph, pradius);
    context.fill();
    context.lineWidth = 2.5;
    context.strokeStyle = '#000000';
    context.stroke();

    // Inside the Pill
    const pcx = px + pw / 2;
    const pcy = py + ph / 2;
    if (type === 'ready') {
      if (maxCount > 0) {
        context.beginPath(); context.arc(pcx, pcy, 16, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, count / maxCount));
        context.lineWidth = 2.5; context.strokeStyle = '#ffffff'; context.stroke();
      }
      // Bold black checkmark ✓
      context.beginPath();
      context.moveTo(pcx - 9, pcy);
      context.lineTo(pcx - 3, pcy + 7);
      context.lineTo(pcx + 10, pcy - 7);
      context.lineWidth = 3.8;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = '#000000';
      context.stroke();
    } else if (type === 'missing') {
      // Bold white exclamation !
      context.beginPath();
      context.moveTo(pcx, pcy - 10);
      context.lineTo(pcx, pcy + 3);
      context.lineWidth = 4.2;
      context.lineCap = 'round';
      context.strokeStyle = '#ffffff';
      context.stroke();
      context.beginPath();
      context.arc(pcx, pcy + 9, 2.5, 0, Math.PI * 2);
      context.fillStyle = '#ffffff';
      context.fill();
    } else if (type === 'working') {
      // Circular progress ring
      context.beginPath();
      context.arc(pcx, pcy, 12, 0, Math.PI * 2);
      context.lineWidth = 3.5;
      context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      context.stroke();

      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + Math.PI * 2 * Math.max(0.08, Math.min(1, progress));
      context.beginPath();
      context.arc(pcx, pcy, 12, startAngle, endAngle);
      context.lineWidth = 4;
      context.strokeStyle = '#000000';
      context.stroke();
      context.beginPath();
      context.arc(pcx, pcy, 2.5, 0, Math.PI * 2);
      context.fillStyle = '#000000';
      context.fill();
    } else {
      this.#drawBadgeIcon(context, itemIcon || 'goal', px + 4, py + 4, 32);
    }

    // 4. Content Area
    if (type === 'ready') {
      const iconX = bx + 56;
      const iconY = by + 9;
      this.#drawBadgeIcon(context, itemIcon, iconX, iconY, 36);

      context.fillStyle = '#000000';
      context.font = '900 28px Fredoka, sans-serif';
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      const countText = maxCount ? `${count}/${maxCount}` : `×${count}`;
      context.fillText(countText, iconX + 42, by + bh / 2 + 1);

      if (isClose) {
        context.save();
        context.fillStyle = '#2ed573';
        context.beginPath();
        context.roundRect(bx + bw - 52, by - 7, 46, 15, 4);
        context.fill();
        context.lineWidth = 1.8;
        context.strokeStyle = '#000000';
        context.stroke();
        context.fillStyle = '#000000';
        context.font = '900 10px Fredoka, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('HAZIR', bx + bw - 29, by);
        context.restore();
      }
    } else if (type === 'missing') {
      const iconX = bx + 56;
      const iconY = by + 9;
      this.#drawBadgeIcon(context, itemIcon, iconX, iconY, 36);

      context.fillStyle = '#000000';
      context.font = '900 28px Fredoka, sans-serif';
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      const countText = maxCount !== undefined ? `${count}/${maxCount}` : `×${count}`;
      context.fillText(countText, iconX + 42, by + bh / 2 + 1);

      if (isClose) {
        context.save();
        context.fillStyle = '#ff4757';
        context.beginPath();
        context.roundRect(bx + bw - 52, by - 7, 46, 15, 4);
        context.fill();
        context.lineWidth = 1.8;
        context.strokeStyle = '#000000';
        context.stroke();
        context.fillStyle = '#ffffff';
        context.font = '900 10px Fredoka, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(label || 'EKSİK', bx + bw - 29, by);
        context.restore();
      }
    } else if (type === 'working') {
      const barX = bx + 56;
      const barY = by + 20;
      const barW = 72;
      const barH = 14;

      context.fillStyle = '#ffffff';
      context.beginPath();
      context.roundRect(barX, barY, barW, barH, 4);
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#000000';
      context.stroke();

      const fillW = Math.max(0, Math.min(barW, barW * progress));
      if (fillW > 0) {
        context.fillStyle = '#ffd35e';
        context.beginPath();
        context.roundRect(barX, barY, fillW, barH, 4);
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.stroke();
      }

      context.fillStyle = '#000000';
      context.font = '900 16px Fredoka, sans-serif';
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      context.fillText(`${Math.round(progress * 100)}%`, barX + barW + 8, by + bh / 2 + 1);

      if (isClose) {
        context.save();
        context.fillStyle = '#ffd35e';
        context.beginPath();
        context.roundRect(bx + bw - 62, by - 7, 56, 15, 4);
        context.fill();
        context.lineWidth = 1.8;
        context.strokeStyle = '#000000';
        context.stroke();
        context.fillStyle = '#000000';
        context.font = '900 9px Fredoka, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(label || 'ÜRETİYOR', bx + bw - 34, by);
        context.restore();
      }
    } else {
      context.fillStyle = '#000000';
      context.font = 'bold 22px Fredoka, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(label, bx + 56 + (bw - 56) / 2, by + bh / 2 + 1, bw - 64);
    }

    sprite.material.map.needsUpdate = true;
  }

  playEvent(event, state) {
    if (this.reducedMotion.matches || this.effects.length > 30) return;
    let point = { x: state.player.x, z: state.player.z };
    if (event.type === 'sale') point = stationPosition(state, 'register');
    if (event.type === 'cash-collected') {
      const register = getAvailableRegisters(state).find(register => register.id === event.registerId);
      point = register ? registerCashPosition(register) : stationPosition(state, 'register');
    }
    if (event.type === 'production') {
      if (event.farmId) point = stationPosition(state, event.farmId);
      else {
        const machineId = Object.keys(state.machines).find((id) => RECIPES[STATIONS[id]?.recipe]?.output === event.item);
        if (machineId) point = stationPosition(state, machineId);
      }
    }
    if (event.point) point = event.point;
    if (!point) return;
    const color = ['sale', 'tip-ready', 'cash-collected'].includes(event.type) ? 'gold' : event.type === 'production' ? 'blue' : 'green';
    for (let index = 0; index < (event.type === 'unlock' ? 15 : 5); index += 1) {
      const particle = this.particlePool.pop();
      if (!particle) break;
      particle.material = particle.userData.materials[event.type === 'unlock' ? ['gold', 'blue', 'green'][index % 3] : color];
      particle.geometry = color === 'gold' ? this.starGeometry : this.particleGeometry;
      particle.quaternion.copy(this.engine.camera.quaternion);
      particle.scale.setScalar(1);
      particle.material.opacity = 1;
      particle.position.set(point.x, 1.3, point.z);
      particle.visible = true;
      this.effects.push({ mesh: particle, age: 0, kind: event.type === 'cash-collected' ? 'cash' : 'burst', lead: index === 0, originX: point.x, originZ: point.z, vx: Math.cos(index * Math.PI * 0.4) * 1.3,
        vz: Math.sin(index * Math.PI * 0.4) * 1.3 });
    }
  }

  #emitGlint(x, z, kind = 'glint') {
    if (this.reducedMotion.matches) return;
    const mesh = this.particlePool.pop(); if (!mesh) return;
    mesh.material = mesh.userData.materials[kind === 'ring' ? 'gold' : 'white']; mesh.material.opacity = 1;
    mesh.geometry = kind === 'dust' ? this.particleGeometry : kind === 'ring' ? this.ringGeometry : this.starGeometry;
    mesh.scale.setScalar(kind === 'dust' ? 0.65 : 1.8);
    mesh.position.set(x, ['dust', 'ring'].includes(kind) ? 0.08 : 1.9, z); mesh.visible = true;
    this.effects.push({ mesh, age: 0, vx: 0, vz: 0, kind });
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

    const { lamp, input, output, badgeY, update } = createProductionBuildModel(group, baseId);
    addContactShadow(group, 3.4, 2.8);

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
    this.machines.set(id, { group, inputMeshes, output, outputItem: recipe.output, lamp, badgeY, update });
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

    const group = createDiningTableModel(this.itemFactory, id);
    group.position.set(position.x, 0, position.z);
    this.scene.add(group);
    this.tables.set(id, group);
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
    for (const failure of this.dynamicVisualFailures) {
      if (failure.startsWith('decoration:') && !activeIds.has(failure.slice('decoration:'.length))) {
        this.dynamicVisualFailures.delete(failure);
      }
    }
    for (const [id, visual] of this.decorItems) {
      if (activeIds.has(id)) continue;
      this.scene.remove(visual.group);
      this.decorItems.delete(id);
    }
    for (const entry of entries) {
      let visual = this.decorItems.get(entry.id);
      if (!visual) {
        if (this.dynamicVisualFailures.has(`decoration:${entry.id}`)) continue;
        if (!this.sceneBuildBudget.take()) continue;
        this.#guardDynamicVisual(`decoration:${entry.id}`, () => this.#addDecoration(entry));
        visual = this.decorItems.get(entry.id);
      } else {
        const model = DECORATIONS[entry.type]?.model;
        if (model && this.decorationModels.has(model) && !visual.modelReady) {
          if (this.dynamicVisualFailures.has(`decoration:${entry.id}`)) continue;
          if (!this.sceneBuildBudget.take()) continue;
          this.scene.remove(visual.group);
          this.decorItems.delete(entry.id);
          this.#guardDynamicVisual(`decoration:${entry.id}`, () => this.#addDecoration(entry));
          visual = this.decorItems.get(entry.id);
        }
      }
      visual?.group.position.set(entry.x, 0, entry.z);
      if (entry.rotation !== undefined && visual?.group) visual.group.rotation.y = entry.rotation;
    }
  }

  #createWorker(type) {
    const actor = createWorkerMesh(type, this.itemFactory);
    this.scene.add(actor.group);
    return actor;
  }

  #createCustomer(customer) {
    const actor = createCustomerMesh(customer, this.environment, this.itemFactory);
    this.scene.add(actor.group);
    return actor;
  }

  #guardDynamicVisual(id, create) {
    if (this.dynamicVisualFailures.has(id)) return false;
    try {
      create();
      return true;
    } catch (error) {
      this.dynamicVisualFailures.add(id);
      this.onVisualError?.(id, error);
      return false;
    }
  }

  #animationTarget(cue, state, actor) {
    const logisticsStock = cue.location === 'dock:incoming' ? this.environment.logistics?.dockStock
      : cue.location === 'warehouse:main' ? this.environment.logistics?.warehouseStock : null;
    if (logisticsStock) {
      logisticsStock.updateMatrixWorld(true);
      const origin = new THREE.Vector3(cue.x ?? actor.group.position.x, 0.65, cue.z ?? actor.group.position.z);
      const cartons = (logisticsStock.userData.boxes ?? []).filter(mesh => mesh.visible && mesh.userData.items?.[cue.item]);
      cartons.sort((a, b) => a.getWorldPosition(new THREE.Vector3()).distanceToSquared(origin)
        - b.getWorldPosition(new THREE.Vector3()).distanceToSquared(origin));
      const point = cartons[0]?.getWorldPosition(new THREE.Vector3())
        ?? logisticsStock.localToWorld(new THREE.Vector3(-0.215, 0.32, 0.22));
      // Cartons summarize multiple units: inventory owns their count, so do not hide a whole carton for one unit.
      return { point, isValid: () => Boolean(this.environment.logistics) && logisticsStock.parent !== null };
    }
    const shelf = [...this.shelves.values(), ...this.customShelves.values()]
      .find((entry) => entry.id === cue.location || `shelf:${entry.id}` === cue.location
        || entry.id === `shelf:${STATIONS[cue.location?.slice(6)]?.item}`);
    if (shelf) {
      shelf.group.updateMatrixWorld(true);
      const count = state.stock[cue.location]?.items[cue.item] ?? 0;
      let candidates = shelf.productMeshes;
      if (cue.type === 'shop') candidates = shelf.productMeshes.slice(Math.min(count, shelf.productMeshes.length - 1));
      if (cue.type === 'deliver') candidates = shelf.productMeshes.slice(0, count)
        .filter((mesh) => !this.animationClaims.has(mesh));
      candidates = [...candidates];
      const origin = new THREE.Vector3(cue.x ?? actor.group.position.x, 0.8, cue.z ?? actor.group.position.z);
      // Use the accessible outer product, not a random item buried in a rack.
      candidates.sort((a, b) => a.getWorldPosition(new THREE.Vector3()).distanceToSquared(origin)
        - b.getWorldPosition(new THREE.Vector3()).distanceToSquared(origin));
      const mesh = candidates[0];
      const point = mesh?.getWorldPosition(new THREE.Vector3())
        ?? shelf.group.localToWorld(new THREE.Vector3(0, 0.75, 0.6));
      const barcode = point.clone().setY(0.34);
      if (cue.type === 'deliver' && mesh) this.animationClaims.add(mesh);
      return { point, barcode, mesh: cue.type === 'deliver' ? mesh : null,
        isValid: () => shelf.group.parent === this.scene,
        waitForDelivery: cue.type === 'shop' ? () => this.animationClaims.has(mesh) : null,
        release: () => this.animationClaims.delete(mesh) };
    }
    const id = cue.location?.split(':')[1];
    const customer = cue.location?.startsWith('customer:') ? state.customers.find((entry) => entry.id === id) : null;
    if (customer) {
      const table = this.tables.get(customer.tableId);
      const food = table?.userData?.foodMesh;
      if (food) return { point: food.getWorldPosition(new THREE.Vector3()), mesh: cue.type === 'deliver' ? food : null };
    }
    const stationId = cue.location?.startsWith('farm:')
      ? Object.keys(state.farms).find((farmId) => (STATIONS[farmId]?.item ?? state.farms[farmId].item) === cue.item)
        ?? Object.keys(STATIONS).find((farmId) => STATIONS[farmId].kind === 'farm' && STATIONS[farmId].item === cue.item)
      : id;
    const position = customer ?? stationPosition(state, stationId);
    return position ? { point: new THREE.Vector3(position.x, customer ? 0.85 : 0.75, position.z) } : null;
  }

  #syncCustomer(actor, customer, state, frameDelta) {
    actor.animator ??= new CharacterAnimator(actor, this.itemFactory, 'customer');
    actor.animator.update(customer, state.paused ? 0 : frameDelta, {
      reducedMotion: this.reducedMotion.matches,
      paid: customerHasPaid(customer, state.stock[`customer:${customer.id}`]?.items),
      resolveTarget: (cue) => this.#animationTarget(cue, state, actor),
      speed: state.speedMultiplier,
      lookTarget: customer.phase === 'waiting-stock' ? this.#animationTarget({ location: 'shelf:' + (customer.targetShelfId?.replace('shelf:', '') ?? customer.demand), item: customer.demand }, state, actor)?.point : null,
    });

    const expression = customerExpression(customer, actor.animator.action);
    if (actor.lastExpression !== expression) { actor.lastExpression = expression; actor.expressionStartedAt = actor.animator.clock; }
    const transientHappy = expression === 'happy' && actor.animator.clock - actor.expressionStartedAt < 1;
    const expressionSymbol = transientHappy ? '♥' : { waiting: '⌛', unhappy: '…' }[expression];
    const wish = expressionSymbol ?? (customer.reaction ? null : customer.kind === 'diner'
      ? (customer.phase === 'waiting-meal' ? customer.demand : null)
      : (['entering', 'to-shelf', 'waiting-stock', 'to-next-shelf'].includes(customer.phase)
        ? customer.shoppingList?.[customer.shoppingIndex ?? 0] ?? customer.demand : null));
    if (wish !== actor.lastWish) {
      if (actor.bubbleCanvas) {
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
          if (expressionSymbol) {
            context.fillStyle = expression === 'happy' ? '#ed6c98' : '#8b693e';
            context.font = 'bold 65px sans-serif'; context.textAlign = 'center'; context.textBaseline = 'middle';
            context.fillText(expressionSymbol, 64, 64);
          } else {
            drawAssetIcon(context, ITEMS[wish]?.icon ?? wish, 32, 28, 64, 64);
            if (expression === 'missing') {
              context.fillStyle = '#c47427'; context.font = 'bold 32px sans-serif'; context.textAlign = 'center'; context.fillText('?', 102, 28);
            }
          }
          actor.bubbleTexture.needsUpdate = true;
        }
      }
      actor.bubble.visible = Boolean(wish);
      actor.lastWish = wish;
    }
  }

  #addUpgradeMarker(upgrade, language = 'tr') {
    if (this.upgradeMarkers.has(upgrade.id)) return;
    const group = new THREE.Group();
    group.position.set(upgrade.x, 0, upgrade.z);

    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.78, 0.9, 0.14, 24),
      new THREE.MeshStandardMaterial({ color: 0x74543a, roughness: 0.9 }),
    );
    soil.position.y = 0.08;
    soil.castShadow = true;
    soil.receiveShadow = true;

    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.76, 0.055, 24),
      new THREE.MeshStandardMaterial({ color: 0xc8b797, roughness: 0.94 }),
    );
    stone.position.y = 0.17;
    stone.castShadow = true;
    stone.receiveShadow = true;

    const turf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.54, 0.56, 0.035, 24),
      new THREE.MeshStandardMaterial({ color: 0x59734d, roughness: 0.96 }),
    );
    turf.position.y = 0.215;
    turf.receiveShadow = true;

    const goldTrim = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.035, 7, 32),
      new THREE.MeshStandardMaterial({ color: 0xd0a957, roughness: 0.72, metalness: 0.08 }),
    );
    goldTrim.rotation.x = -Math.PI / 2;
    goldTrim.position.y = 0.238;

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.94, 0.025, 6, 40),
      new THREE.MeshStandardMaterial({
        color: 0x8fa276,
        emissive: 0x344628,
        emissiveIntensity: 0.14,
        roughness: 0.82,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.04;

    const sprout = new THREE.Group();
    sprout.position.y = 0.22;
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.04, 0.25, 7),
      new THREE.MeshStandardMaterial({ color: 0x426b43, roughness: 0.88 }),
    );
    stem.position.y = 0.22;
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x82a76b, roughness: 0.82 });
    const leftLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.13, 9, 7), leafMaterial);
    leftLeaf.position.set(-0.1, 0.34, 0);
    leftLeaf.scale.set(1.25, 0.55, 0.72);
    leftLeaf.rotation.z = 0.58;
    const rightLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.13, 9, 7), leafMaterial.clone());
    rightLeaf.position.set(0.1, 0.4, 0);
    rightLeaf.scale.set(1.25, 0.55, 0.72);
    rightLeaf.rotation.z = -0.58;
    sprout.add(stem, leftLeaf, rightLeaf);
    sprout.traverse((object) => {
      if (object.isMesh) object.castShadow = true;
    });

    const coins = Array.from({ length: 3 }, () => {
      const coin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.085, 0.085, 0.035, 12),
        new THREE.MeshStandardMaterial({ color: 0xf0c45e, emissive: 0x543a0d, emissiveIntensity: 0.18, metalness: 0.28, roughness: 0.48 }),
      );
      coin.rotation.x = Math.PI / 2;
      coin.visible = false;
      coin.castShadow = true;
      group.add(coin);
      return coin;
    });

    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 720;
    badgeCanvas.height = 190;
    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
    badgeTexture.colorSpace = THREE.SRGBColorSpace;
    const badge = new THREE.Sprite(new THREE.SpriteMaterial({
      map: badgeTexture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }));
    badge.scale.set(2.8, 0.74, 1);
    badge.position.y = 1.55;
    badge.visible = false;
    this.#drawUpgradeBadge(badgeCanvas, upgrade, language);

    group.add(soil, stone, turf, goldTrim, halo, sprout, badge);
    this.scene.add(group);
    this.upgradeMarkers.set(upgrade.id, {
      group,
      sprout,
      halo,
      badge,
      badgeCanvas,
      badgeStateKey: '',
      coins,
      upgrade,
      language,
    });
  }

  #drawUpgradeBadge(canvas, upgrade, language, paymentProgress = 0, paymentAmount = 0, insufficientFunds = false, shortfall = 0, rearmRequired = false) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.roundRect(8, 8, canvas.width - 16, canvas.height - 16, 28);
    context.fillStyle = insufficientFunds ? '#60413a' : '#3c4d3c';
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = insufficientFunds ? '#d78369' : '#d0ad69';
    context.stroke();

    context.beginPath();
    context.arc(80, 88, 48, 0, Math.PI * 2);
    context.fillStyle = '#617b53';
    context.fill();
    context.strokeStyle = '#26392a';
    context.lineWidth = 4;
    context.stroke();

    context.save();
    context.translate(80, 88);
    context.rotate(-0.35);
    context.beginPath();
    context.ellipse(-9, -3, 13, 25, -0.7, 0, Math.PI * 2);
    context.ellipse(11, 5, 12, 21, 0.72, 0, Math.PI * 2);
    context.fillStyle = '#d8e3bd';
    context.fill();
    context.restore();

    context.textBaseline = 'middle';
    context.textAlign = 'left';
    context.fillStyle = insufficientFunds ? '#ffd2c4' : '#f3eddb';
    context.font = 'bold 37px Fredoka, sans-serif';
    const heading = rearmRequired ? (language === 'en' ? 'STEP AWAY' : 'BİRAZ UZAKLAŞ')
      : insufficientFunds ? (language === 'en' ? 'NEED MORE CASH' : 'BAKİYE YETERSİZ')
        : paymentProgress > 0 ? (language === 'en' ? 'CHARGING' : 'PARA ÇEKİLİYOR')
          : (language === 'en' ? 'NEW UNLOCK' : 'YENİ AÇILIM');
    context.fillText(heading, 154, 68);

    context.beginPath();
    context.arc(538, 72, 38, 0, Math.PI * 2);
    context.fillStyle = '#e2bd66';
    context.fill();
    context.strokeStyle = '#76582f';
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = '#463b29';
    context.textAlign = 'center';
    context.font = 'bold 38px Fredoka, sans-serif';
    context.fillText('$', 538, 73);

    context.fillStyle = '#f3eddb';
    context.textAlign = 'left';
    context.font = 'bold 43px Fredoka, sans-serif';
    context.fillText(String(upgrade.price), 594, 73);

    context.textAlign = 'left';
    context.fillStyle = insufficientFunds ? '#ffd2c4' : '#e3ddcd';
    context.font = 'bold 24px Fredoka, sans-serif';
    const locale = language === 'en' ? 'en-US' : 'tr-TR';
    const detail = rearmRequired ? (language === 'en' ? 'Move away, then return to unlock' : 'Yeniden açmak için uzaklaşıp tekrar gel')
      : insufficientFunds ? (language === 'en' ? `$${shortfall.toLocaleString(locale, { maximumFractionDigits: 2 })} more needed` : `$${shortfall.toLocaleString(locale, { maximumFractionDigits: 2 })} daha gerekli`)
        : paymentProgress > 0 ? `${language === 'en' ? 'Paid' : 'Çekilen'}  $${paymentAmount.toLocaleString(locale, { maximumFractionDigits: 2 })} / $${upgrade.price}`
          : (language === 'en' ? 'Stay close for 3 seconds' : 'Yanında 3 saniye bekle');
    context.fillText(detail, 154, 119);

    context.beginPath();
    context.roundRect(154, 151, 510, 16, 8);
    context.fillStyle = '#253127';
    context.fill();
    if (paymentProgress > 0) {
      context.beginPath();
      context.roundRect(154, 151, Math.max(12, 510 * paymentProgress), 16, 8);
      context.fillStyle = insufficientFunds ? '#d78369' : '#f0c45e';
      context.fill();
    }
  }

  #syncUpgradeMarkerFocus(upgradeMarkers, state, nearbyAction, time, frameDelta) {
    const activeId = nearbyAction?.kind === 'upgrade' ? nearbyAction.id : null;
    const language = state.settings.language;
    const motionScale = this.reducedMotion.matches ? 0 : 1;
    for (const [id, marker] of upgradeMarkers) {
      const focused = id === activeId;
      const progress = focused ? (nearbyAction.paymentProgress ?? 0) : 0;
      const charging = focused && progress > 0;
      const insufficientFunds = focused && Boolean(nearbyAction.insufficientFunds);
      marker.badge.visible = focused;
      const pulse = Math.sin(time * 5) * motionScale;
      const bounce = focused ? 0.06 : 0.025;
      marker.sprout.position.y = 0.22 + Math.sin(time * (charging ? 5.8 : 2.4) + marker.group.position.x) * bounce * motionScale;
      marker.sprout.rotation.y += frameDelta * (charging ? 2.2 : focused ? 0.9 : 0.4) * motionScale;
      marker.sprout.scale.setScalar(focused ? 1.08 + pulse * 0.035 : 1);
      marker.halo.material.color.setHex(insufficientFunds ? 0xc56b57 : 0x8fa276);
      marker.halo.material.emissive.setHex(insufficientFunds ? 0x5b2018 : 0x344628);
      marker.halo.material.emissiveIntensity = charging ? 0.95 + pulse * 0.18 : focused ? 0.5 + pulse * 0.12 : 0.14;
      marker.halo.material.opacity = focused ? (charging ? 0.82 + pulse * 0.1 : 0.65 + pulse * 0.12) : 0.4;
      marker.halo.scale.setScalar(focused ? 1.06 + pulse * (charging ? 0.08 : 0.045) : 1);

      marker.coins.forEach((coin, index) => {
        coin.visible = charging;
        if (!charging) return;
        const angle = time * 3.4 * motionScale + index * Math.PI * 2 / marker.coins.length;
        const radius = 0.66;
        coin.position.set(Math.cos(angle) * radius, 0.47 + Math.sin(time * 4 + index) * 0.035 * motionScale, Math.sin(angle) * radius);
        coin.rotation.y = angle;
      });

      const progressBucket = Math.floor(progress * 20);
      const badgeStateKey = `${language}:${progressBucket}:${insufficientFunds}:${nearbyAction?.shortfall ?? 0}:${nearbyAction?.rearmRequired ?? false}`;
      if (marker.badgeStateKey !== badgeStateKey) {
        this.#drawUpgradeBadge(
          marker.badgeCanvas,
          marker.upgrade,
          language,
          progress,
          nearbyAction?.paymentAmount ?? 0,
          insufficientFunds,
          nearbyAction?.shortfall ?? 0,
          Boolean(nearbyAction?.rearmRequired),
        );
        marker.badge.material.map.needsUpdate = true;
        marker.badgeStateKey = badgeStateKey;
        marker.language = language;
      }
    }
  }

  #syncCollection(map, ids, create, dispose) {
    let failedIds = this.visualBuildFailures.get(map);
    if (map.size === ids.length && (!failedIds || failedIds.size === 0)) {
      let identical = true;
      for (let i = 0; i < ids.length; i += 1) {
        if (!map.has(ids[i])) { identical = false; break; }
      }
      if (identical) return;
    }
    const idSet = new Set(ids);
    for (const [id, value] of map) {
      if (idSet.has(id)) continue;
      value.animator?.dispose();
      dispose?.(value);
      this.scene.remove(value.group ?? value);
      map.delete(id);
    }
    if (failedIds) {
      for (const id of failedIds) if (!idSet.has(id)) failedIds.delete(id);
    }
    for (const id of ids) {
      if (map.has(id) || failedIds?.has(id)) continue;
      if (!this.sceneBuildBudget.take()) break;
      try {
        create(id);
      } catch (error) {
        failedIds ??= new Set();
        failedIds.add(id);
        this.visualBuildFailures.set(map, failedIds);
        this.onVisualError?.(id, error);
      }
    }
  }

  #disposeVisual(value) {
    if (value?.billGeometry && value?.bandGeometry) {
      disposeCashPileModel(value);
      return;
    }
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

  render(state, availableUpgrades = [], nearbyAction = null) {
    const shelfItems = state.unlockedProducts.filter((item) => SHELVES[item]);
    if (!shelfItems.includes('TOMATO')) shelfItems.push('TOMATO');
    const selfRegIds = Object.keys(state.selfRegisters ?? {});
    const checkoutRegisterIds = Object.keys(state.checkoutRegisters ?? {});
    const availableRegisters = getAvailableRegisters(state);
    const cashPileIds = availableRegisters.map((register) => register.id);
    const customShelfIds = Object.keys(state.customStations ?? {})
      .filter((id) => state.customStations[id].kind === 'shelf');
    const upgradeIds = availableUpgrades.map((entry) => entry.id);
    const customerIds = state.customers.map((customer) => customer.id);
    const workerIds = state.workers.map((worker) => worker.id);
    const decorationIds = (state.decorations ?? []).map((entry) => entry.id);
    const pendingVisuals = countMissingVisuals(this.farms, Object.keys(state.farms))
      + countMissingVisuals(this.machines, Object.keys(state.machines))
      + countMissingVisuals(this.shelves, shelfItems)
      + countMissingVisuals(this.tables, Object.keys(state.diningTables))
      + countMissingVisuals(this.selfRegisters, selfRegIds)
      + countMissingVisuals(this.checkoutRegisters, checkoutRegisterIds)
      + countMissingVisuals(this.cashPiles, cashPileIds)
      + countMissingVisuals(this.customShelves, customShelfIds)
      + countMissingVisuals(this.upgradeMarkers, upgradeIds)
      + countMissingVisuals(this.customers, customerIds)
      + countMissingVisuals(this.workers, workerIds)
      + countMissingVisuals(this.decorItems, decorationIds)
      + Number(Boolean(state.coops.coop && !this.coop))
      + Number(Boolean(state.unlocked?.managerOffice && !this.environment.logistics))
      + Number(Boolean(state.staffLandCleared && !this.environment.staffLand))
      + countMissingVisuals(this.environment.staffFacilities, Object.keys(state.staffFacilities ?? {}))
      + Number(this.playerCharacter.type !== state.player.character);
    const visualBuildLimit = pendingVisuals > SCENE_VISUAL_BATCH_THRESHOLD
      ? SCENE_VISUALS_PER_FRAME
      : Number.POSITIVE_INFINITY;
    this.sceneBuildBudget = {
      remaining: visualBuildLimit,
      take() {
        if (this.remaining <= 0) return false;
        this.remaining -= 1;
        return true;
      },
    };
    const frameDelta = Math.min(this.clock.getDelta(), 0.05);
    const time = this.clock.elapsedTime;
    this.lighting.updateDaylight(gameDaylight, state.tick, THREE);
    this.engine.setDaylight(gameDaylight(state.tick));
    this.environment.setDaylight(gameDaylight(state.tick));
    this.environment.syncHangingSigns(state.hangingSigns);
    this.environment.setRestaurantUnlocked(state.unlocked?.restaurant);
    this.#guardDynamicVisual('staff-facilities', () => this.environment.syncStaffFacilities(state, this.sceneBuildBudget));
    this.#guardDynamicVisual('east-logistics', () => this.environment.syncLogistics(state, this.sceneBuildBudget));
    this.environment.constructionSites.sync(state, state.paused ? 0 : frameDelta, this.reducedMotion.matches);
    this.visualTime = (this.visualTime ?? 0) + (state.paused ? 0 : frameDelta);
    this.environment.update(state.paused || this.reducedMotion.matches ? 0 : frameDelta, this.reducedMotion.matches ? 0 : this.visualTime);
    this.environment.ambientLife.update(state, frameDelta, gameDaylight(state.tick), this.reducedMotion.matches);
    this.worldEventVisuals.update(state, frameDelta, this.engine.camera, this.environment.ambientLife.cat, this.reducedMotion.matches);
    if (activeWorldEvent(state, 'goldenHarvest')) {
      this.lighting.dirLight.color.setHex(0xffcf55);
      this.lighting.hemiLight.color.setHex(0xffdf88);
    }

    const wasMoving = Math.hypot(state.player.x - this.playerMesh.position.x, state.player.z - this.playerMesh.position.z) > 0.001;
    if (this.playerCharacter.type !== state.player.character && this.sceneBuildBudget.take()) {
      this.#disposeVisual(this.playerMesh);
      this.scene.remove(this.playerMesh);
      this.playerCharacter = new CharacterFactory(state.player.character);
      this.playerMesh = this.playerCharacter.group;
      this.#createPlayerCargo();
      addContactShadow(this.playerMesh);
      this.scene.add(this.playerMesh);
    }
    this.playerMesh.position.set(state.player.x, 0, state.player.z);
    this.playerMesh.rotation.y = state.player.facing;
    this.playerCharacter.animate(state.paused ? 0 : frameDelta, wasMoving);
    if (wasMoving && !state.paused && this.visualTime - (this.lastPlayerDust ?? 0) > 0.24) {
      this.lastPlayerDust = this.visualTime;
      this.#emitGlint(state.player.x - Math.sin(state.player.facing) * 0.3, state.player.z - Math.cos(state.player.facing) * 0.3, 'dust');
    }
    this.#syncPlayerCargo(state.stock.player?.items ?? {});
    const nearby = this.stationAt(state, state.player.x, state.player.z);
    this.cameraFocus.copy(this.playerMesh.position);
    if (nearby) {
      const target = stationPosition(state, nearby);
      this.cameraFocus.x += (target.x - this.cameraFocus.x) * 0.18;
      this.cameraFocus.z += (target.z - this.cameraFocus.z) * 0.18;
    }
    this.engine.followTarget(this.cameraFocus, frameDelta);

    this.#syncCollection(this.farms, Object.keys(state.farms).filter(id => stationPosition(state, id)), (id) => this.#addFarm(id), (entry) => this.#disposeVisual(entry));
    for (const [farmId, farm] of this.farms) {
      const farmState = state.farms[farmId];
      const count = farmState?.readyCount ?? 0;
      farm.produce.forEach((mesh, index) => {
        mesh.visible = farmState?.plants?.[index]?.ready ?? index < count;
      });
      const distance = Math.hypot(state.player.x - farm.group.position.x, state.player.z - farm.group.position.z);
      const station = STATIONS[farmId];
      const cropItem = station?.item ?? 'TOMATO';
      const cropIcon = ITEMS[cropItem]?.icon ?? cropItem.toLowerCase();
      const unready = farmState?.plants?.filter((p) => !p.ready) ?? [];
      let growProgress = 0.5;
      if (unready.length > 0) {
        const nextReady = Math.min(...unready.map((p) => p.nextReadyTick ?? (state.tick + 45)));
        const remaining = Math.max(0, nextReady - state.tick);
        growProgress = Math.max(0.08, Math.min(0.95, 1 - remaining / 45));
      }
      farm.update?.(time, frameDelta, growProgress, count > 0);
      if (count > 0) {
        this.#statusBadge(farm.group, {
          type: 'ready',
          itemIcon: cropIcon,
          count,
          tone: '#2ed573',
          visible: distance < 11,
          height: farm.badgeY ?? 3.05,
          distance,
          label: state.settings.language === 'en' ? 'READY' : 'HAZIR',
        });
      } else {
        this.#statusBadge(farm.group, {
          type: 'working',
          itemIcon: cropIcon,
          progress: growProgress,
          tone: '#ffd35e',
          visible: distance < 11,
          height: farm.badgeY ?? 3.05,
          distance,
          label: state.settings.language === 'en' ? 'GROWING' : 'BÜYÜYOR',
        });
      }
    }
    this.#syncCollection(this.machines, Object.keys(state.machines).filter(id => stationPosition(state, id)), (id) => this.#addMachine(id), (entry) => this.#disposeVisual(entry));
    this.#syncCollection(this.shelves, shelfItems, (id) => this.#addShelf(id), (entry) => this.#disposeVisual(entry));
    this.#syncCollection(this.tables, Object.keys(state.diningTables).filter(id => stationPosition(state, id)), (id) => this.#addTable(id), (entry) => this.#disposeVisual(entry));
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
    this.#syncCollection(this.checkoutRegisters, checkoutRegisterIds,
      (id) => this.#createCheckoutRegister(id, state), (entry) => this.#disposeVisual(entry));
    for (const [id, registerGroup] of this.checkoutRegisters) {
      const p = stationPosition(state, id);
      if (p) {
        registerGroup.position.set(p.x, 0, p.z);
        if (p.rotation !== undefined) registerGroup.rotation.y = p.rotation;
      }
    }
    // Otomatik Kasalar (Self-Checkouts)
    this.#syncCollection(this.selfRegisters, selfRegIds, (id) => this.#createSelfRegister(id), (entry) => this.#disposeVisual(entry));
    for (const [id, regGroup] of this.selfRegisters) {
      const p = stationPosition(state, id);
      if (p) {
        regGroup.position.set(p.x, 0, p.z);
        if (p.rotation !== undefined) regGroup.rotation.y = p.rotation;
      }
    }
    this.#syncCollection(this.cashPiles, cashPileIds, (id) => this.#createCashPile(id), (entry) => this.#disposeVisual(entry));
    for (const register of availableRegisters) {
      const pile = this.cashPiles.get(register.id);
      if (!pile) continue;
      const point = registerCashPosition(register);
      const amountAtoms = state.cashAtRegisters?.[register.id] ?? 0;
      const bundleCount = state.cashBundleCounts?.[register.id] ?? 0;
      updateCashPileModel(pile, amountAtoms, bundleCount);
      pile.group.rotation.y = register.rotation ?? 0;
      pile.group.position.set(point.x, 0.025 + (amountAtoms > 0 ? Math.sin(time * 4) * 0.018 : 0), point.z);
    }
    // Ekstra Satın Alınan Reyonlar (Custom Shelves)
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
      const near = Math.hypot(state.player.x - shelf.group.position.x, state.player.z - shelf.group.position.z) < 2;
      if (updateShelfFeedback(shelf, count, shelf.productMeshes.length, state.paused ? 0 : frameDelta,
        this.visualTime, near, this.reducedMotion.matches)) this.#emitGlint(shelf.group.position.x, shelf.group.position.z);
    }
    if (this.coop) {
      const p = stationPosition(state, 'coop');
      this.coop.group.position.set(p.x, 0, p.z);
      if (p.rotation !== undefined) this.coop.group.rotation.y = p.rotation;
    }
    if (state.coops.coop && !this.coop && !this.dynamicVisualFailures.has('coop') && this.sceneBuildBudget.take()) {
      this.#guardDynamicVisual('coop', () => this.#addCoop());
    }
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
      const point = this.#selectionPosition(state, this.selectedStation) ?? this.lastPreviewSnapped ?? state.player;
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
    this.#syncCollection(this.upgradeMarkers, upgradeIds, (id) => {
      const upgrade = availableUpgrades.find((entry) => entry.id === id);
      if (upgrade) this.#addUpgradeMarker(upgrade, state.settings.language);
    }, (marker) => this.#disposeVisual(marker));
    for (const upgrade of availableUpgrades) {
      const marker = this.upgradeMarkers.get(upgrade.id);
      if (marker) marker.group.position.set(upgrade.x, 0, upgrade.z);
    }
    this.#syncUpgradeMarkerFocus(this.upgradeMarkers, state, nearbyAction, time, frameDelta);

    for (const [itemId, shelf] of this.shelves) {
      const count = state.stock[shelf.id]?.items[itemId] ?? 0;
      const capacity = SHELVES[itemId]?.capacity ?? 8;
      this.#drawShelfLabel(shelf, itemId, state.settings.language);
      shelf.productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
      const distance = Math.hypot(state.player.x - shelf.group.position.x, state.player.z - shelf.group.position.z);
      const full = updateShelfFeedback(shelf, count, capacity, state.paused ? 0 : frameDelta, this.visualTime,
        distance < 2 || state.customers.some(customer => Math.hypot(customer.x - shelf.group.position.x, customer.z - shelf.group.position.z) < 1.5), this.reducedMotion.matches);
      if (full) this.#emitGlint(shelf.group.position.x, shelf.group.position.z);
      const iconId = ITEMS[itemId]?.icon ?? itemId.toLowerCase();
      if (count > 0) {
        this.#statusBadge(shelf.group, {
          type: 'ready',
          itemIcon: iconId,
          count,
          maxCount: capacity,
          tone: '#2ed573',
          visible: distance < 8.5,
          height: 2.65,
          distance,
          label: `${count}/${capacity}`,
        });
      } else {
        this.#statusBadge(shelf.group, {
          type: 'missing',
          itemIcon: iconId,
          count: 0,
          maxCount: capacity,
          tone: '#ff4757',
          visible: distance < 8.5,
          height: 2.65,
          distance,
          label: state.settings.language === 'en' ? 'EMPTY' : 'BOŞ',
        });
      }
    }
    for (const [machineId, machine] of this.machines) {
      const count = state.stock[`machine:${machineId}:output`]?.items[machine.outputItem] ?? 0;
      const shown = Math.min(count, 5);
      while (machine.output.children.length < shown) {
        const mesh = new THREE.Mesh(this.itemFactory.getItemGeometry(machine.outputItem), this.itemFactory.getItemMaterial(machine.outputItem));
        mesh.scale.set(0.01, 0.01, 0.01);
        machine.output.add(mesh);
        animate(mesh.scale, {
          x: [0.01, 1.25, 1],
          y: [0.01, 1.35, 1],
          z: [0.01, 1.25, 1],
          duration: 380,
          ease: 'outBack',
        });
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
      machine.group.rotation.y = (state.layout?.[machineId]?.rotation ?? 0) + (this.reducedMotion.matches ? 0 : Math.sin(this.visualTime * 1.5) * (entry && entry.progressTicks ? 0.025 : 0));
      const isWorking = Boolean(entry && entry.progressTicks);
      machine.update?.(this.visualTime, state.paused || this.reducedMotion.matches ? 0 : frameDelta, isWorking && !this.reducedMotion.matches);
      const distance = Math.hypot(state.player.x - machine.group.position.x, state.player.z - machine.group.position.z);
      const recipe = RECIPES[STATIONS[machineId]?.recipe];
      const prodThreshold = (recipe?.seconds ?? 3) * 10;
      const workProgress = entry?.progressTicks ? Math.min(0.99, entry.progressTicks / prodThreshold) : 0;
      const outputDef = ITEMS[machine.outputItem];
      const outputIconId = outputDef?.icon ?? machine.outputItem?.toLowerCase();

      if (count > 0) {
        this.#statusBadge(machine.group, {
          type: 'ready',
          itemIcon: outputIconId,
          count,
          tone: '#2ed573',
          visible: distance < 11,
          height: machine.badgeY ?? 3.25,
          distance,
          label: state.settings.language === 'en' ? 'READY' : 'HAZIR',
        });
      } else if (entry?.progressTicks) {
        this.#statusBadge(machine.group, {
          type: 'working',
          itemIcon: outputIconId,
          progress: workProgress,
          tone: '#ffd35e',
          visible: distance < 11,
          height: machine.badgeY ?? 3.25,
          distance,
          label: state.settings.language === 'en' ? 'WORKING' : 'ÜRETİYOR',
        });
      } else {
        const missing = [];
        if (recipe?.inputs) {
          const currentInputs = state.stock[`machine:${machineId}:input`]?.items ?? {};
          for (const [inItem, needCount] of Object.entries(recipe.inputs)) {
            const has = currentInputs[inItem] ?? 0;
            if (has < needCount) {
              const inDef = ITEMS[inItem];
              missing.push({
                item: inItem,
                icon: inDef?.icon ?? inItem.toLowerCase(),
                count: needCount - has,
              });
            }
          }
        }
        const primary = missing[0];
        this.#statusBadge(machine.group, {
          type: 'missing',
          itemIcon: primary?.icon ?? 'tomato',
          count: primary?.count ?? 1,
          tone: '#ff4757',
          visible: distance < 11,
          height: machine.badgeY ?? 3.25,
          distance,
          label: state.settings.language === 'en' ? 'NEEDS STOCK' : 'EKSİK',
        });
      }
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
      if (ready) {
        this.#statusBadge(table, {
          type: 'ready',
          itemIcon: 'tip',
          count: 1,
          tone: '#2ed573',
          visible: distance < 12,
          height: 2.1,
          distance,
          label: state.settings.language === 'en' ? 'TIP READY' : 'BAHŞİŞ',
        });
      } else if (waiting) {
        const mealItem = customer?.meal ?? customer?.demand;
        const itemDef = ITEMS[mealItem];
        this.#statusBadge(table, {
          type: 'missing',
          itemIcon: itemDef?.icon ?? 'orders',
          count: 1,
          tone: '#ffa502',
          visible: distance < 12,
          height: 2.1,
          distance,
          label: state.settings.language === 'en' ? 'ORDER' : 'SİPARİŞ',
        });
      } else {
        this.#statusBadge(table, { visible: false });
      }
    }

    for (let index = this.effects.length - 1; index >= 0; index -= 1) {
      const effect = this.effects[index];
      const dt = state.paused ? 0 : frameDelta;
      effect.age += dt;
      if (effect.kind === 'cash') {
        const t = Math.min(1, effect.age / 0.55);
        effect.mesh.position.set(THREE.MathUtils.lerp(effect.originX, state.player.x, t) + Math.sin(t * Math.PI) * effect.vx * 0.2,
          0.9 + Math.sin(t * Math.PI) * 0.9, THREE.MathUtils.lerp(effect.originZ, state.player.z, t) + Math.sin(t * Math.PI) * effect.vz * 0.2);
        effect.mesh.scale.setScalar(1 - t * 0.8);
      } else {
        effect.mesh.position.x += effect.vx * dt;
        effect.mesh.position.z += effect.vz * dt;
        effect.mesh.position.y += (effect.kind === 'dust' ? 0.25 : 1.1) * dt;
      }
      if (effect.kind === 'ring') { effect.mesh.rotation.set(-Math.PI / 2, 0, 0); effect.mesh.scale.setScalar(1 + effect.age * 7); }
      else effect.mesh.quaternion.copy(this.engine.camera.quaternion);
      effect.mesh.material.opacity = Math.max(0, 1 - effect.age / 0.55);
      if (effect.age >= 0.55 || this.reducedMotion.matches) {
        if (effect.kind === 'cash' && effect.lead) this.#emitGlint(state.player.x, state.player.z, 'ring');
        effect.mesh.visible = false;
        this.particlePool.push(effect.mesh);
        this.effects.splice(index, 1);
      }
    }

    this.#syncCollection(this.customers, customerIds, (id) => {
      const customer = state.customers.find((entry) => entry.id === id);
      if (customer) this.customers.set(id, this.#createCustomer(customer));
    }, (group) => this.#disposeVisual(group));
    for (const customer of state.customers) {
      const actor = this.customers.get(customer.id);
      if (actor) this.#syncCustomer(actor, customer, state, frameDelta);
    }

    this.#syncCollection(this.workers, workerIds, (id) => {
      const worker = state.workers.find((entry) => entry.id === id);
      if (worker) this.workers.set(id, this.#createWorker(worker.type));
    }, (actor) => this.#disposeVisual(actor));
    state.workers.forEach((worker) => {
      const actor = this.workers.get(worker.id);
      if (!actor) return;
      actor.animator ??= new CharacterAnimator(actor, this.itemFactory, 'worker');
      actor.animator.update(worker, state.paused ? 0 : frameDelta, {
        items: state.stock['worker:' + worker.id]?.items ?? {},
        reducedMotion: this.reducedMotion.matches,
        speed: state.speedMultiplier * workerWorkSpeed(worker),
        resolveTarget: (cue) => this.#animationTarget(cue, state, actor),
        paying: worker.type === 'cashier' && state.customers.some((customer) => customer.phase === 'paying'
          && (customer.targetRegisterId ?? 'register') === (worker.registerId ?? 'register')),
      });
      if (!state.paused && actor.animator.path.length && this.visualTime - (actor.lastDust ?? 0) > 0.45) {
        actor.lastDust = this.visualTime;
        this.#emitGlint(actor.group.position.x, actor.group.position.z, 'dust');
      }
      updateWorkerEnergyBar(actor, worker, this.engine.camera.quaternion);
    });

    if (this.lastCompletedUpgrades) {
      for (const id of state.completedUpgrades) if (!this.lastCompletedUpgrades.has(id)) {
        const definition = UPGRADES.find(upgrade => upgrade.id === id);
        if (definition && !this.reducedMotion.matches) {
          this.playEvent({ type: 'unlock', point: definition }, state);
          this.cameraPunch = 0.12;
        }
      }
    }
    if (!this.lastCompletedUpgrades || state.completedUpgrades.length < this.lastCompletedUpgrades.size) this.lastCompletedUpgrades = new Set(state.completedUpgrades);
    else for (const id of state.completedUpgrades) this.lastCompletedUpgrades.add(id);
    const punch = !this.reducedMotion.matches && !state.paused && this.cameraPunch > 0
      ? Math.sin(this.cameraPunch * 70) * 0.035 : 0;
    this.cameraPunch = Math.max(0, (this.cameraPunch ?? 0) - (state.paused ? 0 : frameDelta));
    this.engine.camera.position.x += punch;
    this.engine.render();
    this.engine.camera.position.x -= punch;
  }

  screenToWorld(clientX, clientY) {
    const rect = this.engine.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.engine.camera);
    if (this.raycaster.ray.intersectPlane(this.groundPlane, this.intersectPoint)) {
      this.worldCoords.x = this.intersectPoint.x;
      this.worldCoords.z = this.intersectPoint.z;
      return this.worldCoords;
    }
    return null;
  }

  terminalAtScreen(clientX, clientY, state) {
    const office = this.environment.logistics?.office;
    if (!state.unlocked?.managerOffice || !office) return null;
    const rect = this.engine.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.engine.camera);
    for (const intersection of this.raycaster.intersectObject(office, true)) {
      let object = intersection.object;
      while (object && object !== office) {
        if (object.userData.stationId === 'managerOffice') return 'managerOffice';
        object = object.parent;
      }
    }
    return null;
  }

  getCanvas() {
    return this.engine.renderer.domElement;
  }
}

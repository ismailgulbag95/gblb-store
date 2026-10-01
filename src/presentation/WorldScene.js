import * as THREE from 'three';
import { animate } from 'animejs';
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
import { createWorkerMesh, createCustomerMesh } from './HumanoidFactory.js';
import { createDiningTableModel } from './DiningTableModel.js';
import { CharacterAnimator } from './CharacterAnimator.js';

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
    this.animationClaims = new Set();
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
    this.intersectPoint = new THREE.Vector3();
    this.cameraFocus = new THREE.Vector3();
    this.worldCoords = { x: 0, z: 0 };
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
      sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
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

    const signature = `${type}:${itemIcon}:${count}:${maxCount}:${Math.round(progress * 20)}:${tone}:${isClose}:${label}`;
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

    const { lamp, input, output, badgeY, update } = createProductionBuildModel(group, baseId);

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

  #animationTarget(cue, state, actor) {
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
      resolveTarget: (cue) => this.#animationTarget(cue, state, actor),
      speed: state.speedMultiplier,
      lookTarget: customer.phase === 'waiting-stock' ? this.#animationTarget({ location: 'shelf:' + (customer.targetShelfId?.replace('shelf:', '') ?? customer.demand), item: customer.demand }, state, actor)?.point : null,
    });

    const wish = customer.reaction ? (customer.reaction === 'happy' ? 'satisfied' : 'unhappy') : customer.kind === 'diner'
      ? (customer.phase === 'waiting-meal' ? customer.demand : null)
      : (['entering', 'to-shelf', 'waiting-stock', 'to-next-shelf'].includes(customer.phase)
        ? customer.shoppingList?.[customer.shoppingIndex ?? 0] ?? customer.demand : null);
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
          drawAssetIcon(context, ITEMS[wish]?.icon ?? wish, 32, 28, 64, 64);
          actor.bubbleTexture.needsUpdate = true;
        }
      }
      actor.bubble.visible = Boolean(wish);
      actor.lastWish = wish;
    }
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
      value.animator?.dispose();
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
    this.cameraFocus.copy(this.playerMesh.position);
    if (nearby) {
      const target = stationPosition(state, nearby);
      this.cameraFocus.x += (target.x - this.cameraFocus.x) * 0.18;
      this.cameraFocus.z += (target.z - this.cameraFocus.z) * 0.18;
    }
    this.engine.followTarget(this.cameraFocus, frameDelta);

    this.#syncCollection(this.farms, Object.keys(state.farms), (id) => this.#addFarm(id), (entry) => this.#disposeVisual(entry));
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
      const capacity = SHELVES[itemId]?.capacity ?? 8;
      this.#drawShelfLabel(shelf, itemId, state.settings.language);
      shelf.productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
      const distance = Math.hypot(state.player.x - shelf.group.position.x, state.player.z - shelf.group.position.z);
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
      machine.group.rotation.y = Math.sin(time * 1.5) * (entry && entry.progressTicks ? 0.025 : 0);
      const isWorking = Boolean(entry && entry.progressTicks);
      machine.update?.(time, frameDelta, isWorking);
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
      if (actor) this.#syncCustomer(actor, customer, state, frameDelta);
    }

    const workerIds = state.workers.map((worker) => worker.id);
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
        speed: state.speedMultiplier,
        resolveTarget: (cue) => this.#animationTarget(cue, state, actor),
        paying: worker.type === 'cashier' && state.customers.some((customer) => customer.phase === 'paying'),
      });
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
    if (this.raycaster.ray.intersectPlane(this.groundPlane, this.intersectPoint)) {
      this.worldCoords.x = this.intersectPoint.x;
      this.worldCoords.z = this.intersectPoint.z;
      return this.worldCoords;
    }
    return null;
  }

  getCanvas() {
    return this.engine.renderer.domElement;
  }
}

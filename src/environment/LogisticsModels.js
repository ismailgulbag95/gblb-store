import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ITEMS } from '../domain/catalog.js';
import { PROCUREMENT_PHASE_TICKS } from '../domain/procurement.js';

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };

function box(group, name, width, height, depth, x, y, z, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.name = name;
  mesh.position.set(x, y, z);
  mesh.castShadow = height > 0.1;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function textMaterial(text, background, foreground) {
  const material = new THREE.MeshStandardMaterial({ color: background, roughness: 0.7 });
  if (typeof document === 'undefined') return material;
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return material;
  ctx.fillStyle = `#${background.toString(16).padStart(6, '0')}`;
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = foreground;
  ctx.font = 'bold 34px monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);
  material.map = new THREE.CanvasTexture(canvas);
  material.map.colorSpace = THREE.SRGBColorSpace;
  material.color.setHex(0xffffff);
  return material;
}

export function createManagerOfficeModel(x = 22, z = 0) {
  const group = new THREE.Group();
  group.name = 'manager-office';
  group.position.set(x, 0, z);
  const wall = new THREE.MeshStandardMaterial({ color: 0xe5e1d6, roughness: 0.82 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x40545c, roughness: 0.5, metalness: 0.4 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x9a663d, roughness: 0.7 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xc6e9e1, transparent: true, opacity: 0.19, roughness: 0.12, depthWrite: false, side: THREE.DoubleSide });
  box(group, 'office-floor', 5, 0.09, 3.6, 0, 0.045, 0, new THREE.MeshStandardMaterial({ color: 0xcfc4aa }));
  box(group, 'office-back-wall', 5, 2.2, 0.12, 0, 1.15, -1.74, wall);
  for (const side of [-1, 1]) {
    box(group, 'office-window-sill', 0.12, 0.65, 3.6, side * 2.44, 0.39, 0, wall);
    box(group, 'office-window', 0.035, 1.28, 3.25, side * 2.44, 1.35, 0, glass);
    for (const edge of [-1.68, 1.68]) box(group, 'office-window-post', 0.12, 2.18, 0.12, side * 2.44, 1.17, edge, trim);
    box(group, 'office-door-side', 1.65, 0.65, 0.12, side * 1.65, 0.39, 1.74, wall);
    box(group, 'office-front-glass', 1.6, 1.35, 0.035, side * 1.66, 1.4, 1.75, glass);
    box(group, 'office-door-post', 0.09, 2.18, 0.14, side * 0.81, 1.17, 1.74, trim);
  }
  box(group, 'office-lintel', 5, 0.18, 0.2, 0, 2.21, 1.75, trim);
  // Cutaway roof leaves the desk and CRT visible from the existing camera.
  box(group, 'office-roof', 5.1, 0.12, 0.72, 0, 2.35, -1.45, trim);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 0.35), textMaterial('MANAGER / YÖNETİCİ', 0x273c35, '#c8f4ce'));
  sign.position.set(0, 2.2, 1.865); group.add(sign);
  box(group, 'office-desk', 2.2, 0.12, 0.8, 0, 0.88, -0.5, wood);
  for (const side of [-1, 1]) box(group, 'office-desk-leg', 0.14, 0.8, 0.62, side * 0.9, 0.43, -0.5, wood);
  box(group, 'office-drawer', 0.45, 0.44, 0.6, 0.72, 0.59, -0.5, wood);
  box(group, 'office-chair-seat', 0.54, 0.11, 0.54, 0, 0.5, -1.2, trim);
  box(group, 'office-chair-back', 0.54, 0.48, 0.1, 0, 0.76, -1.42, trim);
  box(group, 'office-chair-base', 0.08, 0.44, 0.08, 0, 0.25, -1.2, trim);

  const terminal = new THREE.Group();
  terminal.name = 'procurement-terminal';
  terminal.userData.stationId = 'managerOffice';
  terminal.position.set(-0.12, 0.94, -0.52);
  group.add(terminal);
  const beige = new THREE.MeshStandardMaterial({ color: 0xd6d0af, roughness: 0.73 });
  box(terminal, 'crt-base', 0.46, 0.07, 0.42, 0, 0.035, -0.05, beige);
  box(terminal, 'crt-neck', 0.16, 0.1, 0.16, 0, 0.12, -0.05, beige);
  const casing = new THREE.Mesh(new RoundedBoxGeometry(0.69, 0.56, 0.58, 2, 0.06), beige);
  casing.position.set(0, 0.43, -0.06); casing.castShadow = true; terminal.add(casing);
  const screenMaterial = textMaterial('PROCUREMENT >_', 0x06250e, '#4aff73');
  screenMaterial.emissive.setHex(0x1aef53);
  screenMaterial.emissiveIntensity = 0.75;
  screenMaterial.roughness = 0.15;
  const screen = new THREE.Mesh(new RoundedBoxGeometry(0.55, 0.39, 0.04, 2, 0.035), screenMaterial);
  screen.name = 'crt-screen'; screen.position.set(0, 0.44, 0.247); terminal.add(screen);
  box(terminal, 'crt-keyboard', 0.63, 0.05, 0.23, 0, 0.035, 0.4, beige);
  const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8e74 });
  for (let row = 0; row < 3; row++) {
    box(terminal, 'crt-key-row', 0.51, 0.012, 0.034, 0, 0.064, 0.33 + row * 0.052, keyMaterial);
  }
  const glow = new THREE.PointLight(0x35ff77, 0.5, 2.8);
  glow.position.set(0, 0.45, 0.54); terminal.add(glow);
  // Exact thin collision boxes mirror the domain layout; the central door remains open.
  group.userData.collisionBoxes = [
    [-2.5, -1.8, 2.5, -1.68], [-2.5, -1.8, -2.38, 1.8], [2.38, -1.8, 2.5, 1.8],
    [-2.5, 1.68, -0.84, 1.8], [0.84, 1.68, 2.5, 1.8], [-1.1, -0.9, 1.1, -0.1],
  ].map(([minX, minZ, maxX, maxZ]) => ({ min: { x: x + minX, z: z + minZ }, max: { x: x + maxX, z: z + maxZ } }));
  return group;
}

export function syncProcurementStock(group, stock) {
  const entries = Object.entries(stock?.items ?? {}).filter(([, quantity]) => quantity > 0);
  const total = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  group.visible = total > 0;
  group.userData.quantity = total;
  if (!total) {
    for (const child of group.children) if (child.userData.isCarton) { child.visible = false; child.userData.quantity = 0; }
    return;
  }
  if (!group.userData.boxes) {
    const wood = new THREE.MeshStandardMaterial({ color: 0x98734a, roughness: 0.88 });
    const pallet = new THREE.Group(); pallet.name = 'delivery-euro-pallet';
    for (let i = 0; i < 5; i++) box(pallet, 'pallet-plank', 1.05, 0.055, 0.17, 0, 0.13, -0.38 + i * 0.19, wood);
    for (const side of [-0.37, 0.37]) box(pallet, 'pallet-runner', 0.12, 0.1, 0.95, side, 0.05, 0, wood);
    group.add(pallet);
    const geometry = new THREE.BoxGeometry(0.43, 0.29, 0.39);
    const tapeGeometry = new THREE.BoxGeometry(0.048, 0.297, 0.395);
    const tapeMaterial = new THREE.MeshStandardMaterial({ color: 0xe6c783, roughness: 0.82 });
    group.userData.boxes = Array.from({ length: 16 }, (_, index) => {
      const carton = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xb99561, roughness: 0.85 }));
      carton.userData.isCarton = true;
      carton.name = 'procurement-carton';
      carton.position.set((index % 2 - 0.5) * 0.48, 0.32 + Math.floor(index / 4) * 0.3, (Math.floor(index / 2) % 2 - 0.5) * 0.44);
      carton.castShadow = true;
      carton.add(new THREE.Mesh(tapeGeometry, tapeMaterial));
      group.add(carton);
      return carton;
    });
  }
  const count = Math.min(16, Math.ceil(total / 6));
  const remaining = entries.map(([item, quantity]) => ({ item, quantity }));
  let entryIndex = 0;
  for (let index = 0; index < 16; index++) {
    const carton = group.userData.boxes[index];
    carton.visible = index < count;
    carton.userData.quantity = 0; carton.userData.items = {};
    if (!carton.visible) continue;
    let capacity = index === count - 1 ? total : 6;
    while (capacity > 0 && entryIndex < remaining.length) {
      const entry = remaining[entryIndex];
      const quantity = Math.min(capacity, entry.quantity);
      carton.userData.items[entry.item] = quantity;
      carton.userData.quantity += quantity;
      capacity -= quantity; entry.quantity -= quantity;
      if (!entry.quantity) entryIndex++;
    }
    const item = Object.keys(carton.userData.items)[0];
    carton.material.color.setHex(ITEMS[item]?.color ?? 0xb99561).lerp(new THREE.Color(0xb99561), 0.72);
  }
}

export function createProcurementDeliveryModel(truck) {
  const group = new THREE.Group();
  group.name = 'procurement-delivery';
  group.add(truck);
  const cargo = new THREE.Group(); cargo.name = 'moving-delivery-pallet';
  group.add(cargo);
  const platform = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.08, 1.2), new THREE.MeshStandardMaterial({ color: 0x465257, metalness: 0.65, roughness: 0.5 }));
  platform.name = 'truck-tail-lift'; group.add(platform);
  group.userData.truck = truck; group.userData.cargo = cargo; group.userData.platform = platform;
  group.visible = false;
  return group;
}

export function syncProcurementDelivery(model, state) {
  const delivery = state.procurement?.delivery;
  model.visible = Boolean(delivery);
  if (!delivery) return;
  const { truck, cargo, platform } = model.userData;
  const ticks = PROCUREMENT_PHASE_TICKS[delivery.phase] ?? 1;
  const progress = clamp((state.tick - delivery.phaseStartTick) / ticks);
  truck.rotation.y = -Math.PI / 2;
  cargo.visible = false; platform.visible = delivery.phase === 'unloading';
  if (delivery.phase === 'arriving') {
    // Reverse into the south-facing dock without crossing the office or warehouse.
    truck.position.set(16.5, 0, 15 - 11.5 * smooth(progress));
  } else if (delivery.phase === 'unloading') {
    truck.position.set(16.5, 0, 3.5);
    const order = state.procurement.orders?.find(entry => entry.id === delivery.orderId);
    const items = {};
    for (const line of order?.lines ?? []) items[line.item] = (items[line.item] ?? 0) + line.quantity;
    syncProcurementStock(cargo, { items });
    cargo.visible = !delivery.cargoReleased && cargo.userData.quantity > 0;
    const dockStock = state.stock?.['dock:incoming'];
    const occupied = Object.values(dockStock?.items ?? {}).reduce((sum, quantity) => sum + quantity, 0);
    const freeCapacity = (dockStock?.capacity ?? Infinity) - occupied - (dockStock?.reservedCapacity ?? 0);
    // A full ramp holds the pallet on the lift until domain delivery can commit.
    const transfer = cargo.userData.quantity <= freeCapacity ? smooth(progress) : 0;
    cargo.position.set(16.5, 0.95 - 0.76 * transfer, 1.18 - 0.78 * transfer);
    platform.position.set(cargo.position.x, cargo.position.y - 0.045, cargo.position.z);
    const door = truck.getObjectByName('delivery-rear-door');
    if (door) door.position.y = 1.45 + smooth(progress / 0.2) * 1.45;
  } else {
    truck.position.set(16.5, 0, 3.5 + 11.5 * smooth(progress));
  }
  if (delivery.phase !== 'unloading') {
    const door = truck.getObjectByName('delivery-rear-door');
    if (door) door.position.y = 1.45;
  }
}

export function disposeLogisticsModel(group) {
  const geometries = new Set(), materials = new Set(), textures = new Set();
  group.traverse(object => {
    if (object.geometry && !object.geometry.userData.sharedAsset) geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if (!material || material.userData.sharedAsset) continue;
      materials.add(material);
      if (material.map) textures.add(material.map);
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
  group.removeFromParent();
}

import * as THREE from 'three';
import { Engine } from '../core/Engine.js';
import { MarketGrid } from '../environment/MarketGrid.js';
import { ITEMS, RECIPES, SHELVES, STATIONS } from '../domain/catalog.js';
import { CharacterFactory } from './CharacterFactory.js';

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
    this.customers = new Map();
    this.workers = new Map();
    this.tables = new Map();
    this.coop = null;
    this.upgradeMarkers = new Map();
    this.itemGeometry = new Map();
    this.itemMaterials = new Map();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.clock = new THREE.Clock();
    this.#createPlayer();
    this.#createAtmosphere();
    this.#createRegister();
  }

  #createPlayer() {
    this.playerCharacter = new CharacterFactory('shopkeeper');
    this.playerMesh = this.playerCharacter.group;
    this.scene.add(this.playerMesh);
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
    const counter = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.85, 0.95), new THREE.MeshStandardMaterial({ color: 0x2878c7, roughness: 0.48 }));
    counter.position.y = 0.44;
    counter.castShadow = true;
    counter.receiveShadow = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.05), new THREE.MeshStandardMaterial({ color: 0xeaf2f7, roughness: 0.35 }));
    top.position.y = 0.93;
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.32, 0.12), new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x0b2333 }));
    screen.position.set(-0.5, 1.17, -0.2);
    group.add(counter, top, screen);
    this.scene.add(group);
    this.registerMesh = group;
  }

  setObstacles(app) {
    app.setObstacles(this.environment.getObstacles());
  }

  #getItemGeometry(itemId) {
    if (!this.itemGeometry.has(itemId)) {
      const sphereItems = ['TOMATO', 'ORANGE', 'EGG', 'CORN'];
      const geometry = sphereItems.includes(itemId)
        ? new THREE.SphereGeometry(0.17, 8, 7)
        : new THREE.BoxGeometry(0.28, 0.28, 0.28);
      geometry.userData.sharedAsset = true;
      this.itemGeometry.set(itemId, geometry);
    }
    return this.itemGeometry.get(itemId);
  }

  #getItemMaterial(itemId) {
    if (!this.itemMaterials.has(itemId)) {
      const material = new THREE.MeshStandardMaterial({ color: ITEMS[itemId].color, roughness: 0.66 });
      material.userData.sharedAsset = true;
      this.itemMaterials.set(itemId, material);
    }
    return this.itemMaterials.get(itemId);
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
    const station = STATIONS[id];
    const group = new THREE.Group();
    group.position.set(station.x, 0, station.z);
    const bed = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.22, 2.5), new THREE.MeshStandardMaterial({ color: 0x85593b, roughness: 1 }));
    bed.position.y = 0.14;
    bed.receiveShadow = true;
    bed.castShadow = true;
    group.add(bed);
    const soil = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.08, 2.05), new THREE.MeshStandardMaterial({ color: 0x5a382b, roughness: 1 }));
    soil.position.y = 0.29;
    group.add(soil);
    const produce = [];
    if (station.item === 'ORANGE') {
      for (const x of [-0.88, 0.88]) {
        this.#part(group, new THREE.CylinderGeometry(0.14, 0.19, 1.35, 8), 0x82512c, x, 0.91, 0);
        for (const [dx, dy, dz, radius] of [[0, 1.69, 0, 0.75], [-0.3, 1.48, 0.22, 0.5], [0.3, 1.51, -0.2, 0.5]]) {
          this.#part(group, new THREE.SphereGeometry(radius, 10, 8), 0x4caa36, x + dx, dy, dz);
        }
        for (const [dx, dy, dz] of [[-0.5, 1.38, 0.4], [0.45, 1.52, 0.42], [-0.2, 1.88, 0.52], [0.25, 1.25, -0.48], [0.05, 2.05, -0.15], [-0.48, 1.7, -0.26]]) {
          produce.push(this.#part(group, new THREE.SphereGeometry(0.17, 9, 8), 0xff9600, x + dx, dy, dz));
        }
      }
    } else {
      for (const x of [-1.12, -0.38, 0.38, 1.12]) for (const z of [-0.57, 0.57]) {
        const isWheat = station.item === 'WHEAT';
        const stemHeight = isWheat ? 0.8 : station.item === 'CORN' ? 1.05 : 0.6;
        this.#part(group, new THREE.CylinderGeometry(0.04, 0.07, stemHeight, 6), isWheat ? 0x9fba41 : 0x49a334, x, 0.29 + stemHeight / 2, z);
        for (const side of [-1, 1]) {
          const leaf = this.#part(group, new THREE.ConeGeometry(0.16, 0.44, 5), 0x60bd42, x + side * 0.15, 0.44 + stemHeight * 0.4, z);
          leaf.rotation.z = side * 0.9;
        }
        const color = station.item === 'TOMATO' ? 0xff4b4b : station.item === 'CORN' ? 0xffd12a : 0xf5cc68;
        const geometry = isWheat ? new THREE.ConeGeometry(0.13, 0.4, 7)
          : station.item === 'CORN' ? new THREE.CylinderGeometry(0.11, 0.13, 0.38, 8)
            : new THREE.SphereGeometry(0.21, 9, 8);
        produce.push(this.#part(group, geometry, color, x, 0.34 + stemHeight, z + 0.13));
      }
    }
    const marker = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.045, 6, 28), new THREE.MeshBasicMaterial({ color: 0x90d869 }));
    marker.rotation.x = -Math.PI / 2;
    marker.position.y = 0.06;
    group.add(marker);
    this.scene.add(group);
    this.farms.set(id, { group, produce, item: station.item });
  }

  #addMachine(id) {
    if (this.machines.has(id)) return;
    const station = STATIONS[id];
    const recipe = RECIPES[station.recipe];
    const color = ITEMS[recipe.output]?.color ?? 0xf59e0b;
    const group = new THREE.Group();
    group.position.set(station.x, 0, station.z);
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.42, 1.65), new THREE.MeshStandardMaterial({ color: 0x647783, roughness: 0.55, metalness: 0.18 }));
    base.position.y = 0.22;
    base.castShadow = true;
    base.receiveShadow = true;
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.4, 1.2), new THREE.MeshStandardMaterial({ color: color, roughness: 0.5, metalness: 0.12 }));
    body.position.y = 1.05;
    body.castShadow = true;
    const opening = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.25, 10), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, metalness: 0.25 }));
    opening.rotation.x = Math.PI / 2;
    opening.position.set(0, 1.35, 0.63);
    group.add(base, body, opening);
    const metal = 0xd9e6e9;
    const dark = 0x334155;
    const cylinder = (top, bottom, height, sides = 12) => new THREE.CylinderGeometry(top, bottom, height, sides);
    const box = (width, height, depth) => new THREE.BoxGeometry(width, height, depth);
    if (id === 'paste') {
      this.#part(group, cylinder(0.7, 0.63, 0.58), 0xb94825, 0, 1.65, 0);
      this.#part(group, cylinder(0.76, 0.76, 0.1), metal, 0, 1.97, 0, { metal: true });
      this.#part(group, cylinder(0.08, 0.08, 0.42), metal, 0, 2.22, 0, { metal: true });
      for (const x of [-0.42, 0.42]) this.#part(group, cylinder(0.06, 0.06, 0.72), metal, x, 1.72, 0.35, { metal: true });
      this.#part(group, box(0.5, 0.12, 0.15), dark, 0, 1.35, 0.88);
    } else if (id === 'juice') {
      this.#part(group, cylinder(0.45, 0.3, 0.42), 0xf8fafc, 0, 1.67, 0);
      this.#part(group, cylinder(0.1, 0.4, 0.37), 0xffc800, 0, 1.98, 0);
      this.#part(group, box(0.82, 0.13, 0.12), dark, 0, 2.32, 0);
      this.#part(group, cylinder(0.24, 0.22, 0.36), 0xffd876, 0.52, 0.72, 0.48);
    } else if (id === 'popcorn') {
      this.#part(group, box(1.38, 1.28, 0.12), 0xfff5db, 0, 1.08, 0.68);
      this.#part(group, box(1.15, 0.88, 0.08), 0x9bd8f0, 0, 1.12, 0.75, { metal: true });
      this.#part(group, box(1.62, 0.18, 1.36), 0xff4b4b, 0, 1.84, 0);
      for (const x of [-0.53, 0.53]) this.#part(group, box(0.13, 1.25, 0.14), 0xffffff, x, 1.08, 0.72);
      for (const x of [-0.3, 0, 0.3]) this.#part(group, new THREE.SphereGeometry(0.15, 7, 6), 0xfff5d6, x, 1.26, 0.83);
    } else if (id === 'feed') {
      this.#part(group, cylinder(0.53, 0.2, 0.72), 0xe3b454, 0, 1.75, 0);
      const wheel = this.#part(group, new THREE.TorusGeometry(0.34, 0.09, 8, 16), dark, 0.86, 1.19, 0, { metal: true });
      wheel.rotation.y = Math.PI / 2;
      this.#part(group, box(0.25, 0.6, 0.37), 0x946138, 0.42, 0.76, 0.55);
    } else if (id === 'bakery' || id === 'pizzaKitchen') {
      this.#part(group, box(1.65, 0.16, 1.48), 0xe7a65b, 0, 1.83, 0);
      this.#part(group, box(1.04, 0.58, 0.1), 0x5c3425, 0, 0.96, 0.66);
      const fire = this.#part(group, new THREE.SphereGeometry(0.25, 8, 7), 0xff9600, 0, 0.88, 0.73, { glow: true });
      fire.scale.set(1.3, 0.65, 0.35);
      this.#part(group, cylinder(0.2, 0.24, 0.72), dark, -0.5, 2.2, -0.37);
      if (id === 'pizzaKitchen') this.#part(group, cylinder(0.45, 0.45, 0.07), 0xf5c47c, 0.4, 1.94, 0.25);
    } else if (id === 'burgerKitchen') {
      this.#part(group, box(1.3, 0.16, 1.13), dark, 0, 1.8, 0);
      this.#part(group, box(1.1, 0.08, 0.4), 0x252b35, 0, 1.9, 0.37, { metal: true });
      for (const x of [-0.36, 0.36]) this.#part(group, cylinder(0.2, 0.2, 0.05), 0x683b27, x, 1.95, 0.32);
      this.#part(group, box(0.3, 0.09, 0.3), 0xffc800, -0.45, 1.88, -0.24);
    }
    const lamp = this.#part(group, new THREE.SphereGeometry(0.1, 8, 6), 0x58cc02, -0.63, 1.55, 0.68, { glow: true });
    const input = new THREE.Group();
    input.position.set(-0.9, 0.42, 0.72);
    const inputMeshes = [];
    for (const [itemId, quantity] of Object.entries(recipe.inputs)) {
      for (let index = 0; index < quantity; index += 1) {
        const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
        mesh.position.set((inputMeshes.length % 2) * 0.34, Math.floor(inputMeshes.length / 2) * 0.29, 0);
        mesh.castShadow = true;
        input.add(mesh);
        inputMeshes.push({ mesh, itemId, index });
      }
    }
    group.add(input);
    const output = new THREE.Group();
    output.position.set(1.1, 0.5, 0.5);
    group.add(output);
    this.scene.add(group);
    this.machines.set(id, { group, inputMeshes, output, outputItem: recipe.output, lamp });
  }

  #addShelf(itemId) {
    if (this.shelves.has(itemId) || !SHELVES[itemId]) return;
    const shelfDef = SHELVES[itemId];
    const group = new THREE.Group();
    group.position.set(shelfDef.x, 0, shelfDef.z);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x9a663d, roughness: 0.85 });
    const plankMaterial = new THREE.MeshStandardMaterial({ color: 0xd4a06b, roughness: 0.75 });
    for (const x of [-0.65, 0.65]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.75, 0.13), frameMaterial);
      post.position.set(x, 0.95, 0);
      post.castShadow = true;
      group.add(post);
    }
    const rows = [];
    for (const y of [0.48, 0.94, 1.4]) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 0.78), plankMaterial);
      plank.position.set(0, y, -0.02);
      plank.castShadow = true;
      plank.receiveShadow = true;
      group.add(plank);
      rows.push(y + 0.2);
    }
    const productMeshes = [];
    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(this.#getItemGeometry(itemId), this.#getItemMaterial(itemId));
      const row = Math.floor(index / 3);
      const column = index % 3;
      mesh.position.set(-0.45 + column * 0.45, rows[row % rows.length], 0.02);
      mesh.scale.setScalar(itemId === 'CORN' ? 1.2 : 0.9);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }
    this.scene.add(group);
    this.shelves.set(itemId, { group, productMeshes, id: shelfDef.id });
  }

  #addTable(id) {
    if (this.tables.has(id)) return;
    const station = STATIONS[id];
    const group = new THREE.Group();
    group.position.set(station.x, 0, station.z);
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 1.35), new THREE.MeshStandardMaterial({ color: 0x9d5b35, roughness: 0.65 }));
    top.position.y = 0.92;
    top.castShadow = true;
    group.add(top);
    for (const x of [-0.68, 0.68]) for (const z of [-0.43, 0.43]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.85, 0.13), new THREE.MeshStandardMaterial({ color: 0x5b392c }));
      leg.position.set(x, 0.45, z);
      group.add(leg);
    }
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.55, 0.62), new THREE.MeshStandardMaterial({ color: 0x7e3f2e }));
    seat.position.set(0, 0.46, 1.1);
    group.add(seat);
    this.scene.add(group);
    this.tables.set(id, group);
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

  #createWorker(type) {
    const group = new THREE.Group();
    const uniforms = {
      cashier: [0x1cb0f6, 0x1899d6], harvester: [0x58cc02, 0x46a302],
      factoryFeeder: [0xff9600, 0xe58500], caretaker: [0xffc800, 0xe5b200],
      chefWaiter: [0xffffff, 0xff4757], waiter: [0x2f3640, 0xa55eea],
    };
    const [uniformColor, hatColor] = uniforms[type] ?? uniforms.cashier;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.65, 10), new THREE.MeshStandardMaterial({ color: uniformColor, roughness: 0.5 }));
    body.position.y = 0.6;
    body.castShadow = true;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 }));
    head.position.y = 1.18;
    head.castShadow = true;
    const hat = type === 'chefWaiter'
      ? new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.45, 10), new THREE.MeshStandardMaterial({ color: 0xffffff }))
      : new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.12, 10), new THREE.MeshStandardMaterial({ color: hatColor }));
    hat.position.y = type === 'chefWaiter' ? 1.55 : 1.4;
    const legs = new THREE.Group();
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.32, 6), legMaterial);
    leftLeg.position.set(-0.14, 0.16, 0);
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.14;
    legs.add(leftLeg, rightLeg);
    const cargo = new THREE.Mesh(this.#getItemGeometry('TOMATO'), this.#getItemMaterial('TOMATO'));
    cargo.name = 'worker-cargo';
    cargo.position.set(0.36, 0.68, 0.05);
    cargo.scale.setScalar(0.8);
    group.add(body, head, hat, legs, cargo);
    this.scene.add(group);
    return { group, cargo, legs: [leftLeg, rightLeg], walkCycle: 0 };
  }

  #createCustomer(customer) {
    const group = new THREE.Group();
    const hash = [...customer.id].reduce((value, char) => (Math.imul(value, 31) + char.charCodeAt(0)) >>> 0, 7);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.65, 10), new THREE.MeshStandardMaterial({ color: CUSTOMER_SHIRTS[hash % CUSTOMER_SHIRTS.length], roughness: 0.4 }));
    body.position.y = 0.6;
    body.castShadow = true;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 }));
    head.position.y = 1.18;
    head.castShadow = true;
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshStandardMaterial({ color: CUSTOMER_HAIR[(hash >>> 4) % CUSTOMER_HAIR.length] }));
    hair.position.set(0, 1.25, -0.04);
    const legs = new THREE.Group();
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.32, 6), legMaterial);
    leftLeg.position.set(-0.14, 0.16, 0);
    const rightLeg = leftLeg.clone();
    rightLeg.position.x = 0.14;
    legs.add(leftLeg, rightLeg);

    const bubble = new THREE.Group();
    bubble.position.set(0, 1.75, 0);
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 128;
    bubbleCanvas.height = 128;
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture, transparent: true }));
    sprite.scale.set(0.65, 0.65, 1);
    bubble.add(sprite);
    const cargo = [];
    for (let index = 0; index < 3; index += 1) {
      const mesh = new THREE.Mesh(this.#getItemGeometry('TOMATO'), this.#getItemMaterial('TOMATO'));
      mesh.scale.setScalar(0.58);
      mesh.position.set(-0.22 + index * 0.2, 0.48 + index * 0.12, 0.36);
      mesh.visible = false;
      cargo.push(mesh);
      group.add(mesh);
    }
    group.add(body, head, hair, legs, bubble);
    this.scene.add(group);
    return { group, legs: [leftLeg, rightLeg], bubble, bubbleCanvas, bubbleTexture, cargo, walkCycle: 0, lastWish: null };
  }

  #syncCustomer(actor, customer, time, frameDelta) {
    actor.group.position.set(customer.x, 0, customer.z);
    actor.group.rotation.y = customer.facing ?? 0;
    const moving = !['paying', 'waiting-stock', 'waiting-meal', 'waiting-table', 'eating', 'ready-tip'].includes(customer.phase);
    if (moving) {
      actor.walkCycle += frameDelta * 12;
      actor.legs[0].rotation.x = Math.sin(actor.walkCycle) * 0.5;
      actor.legs[1].rotation.x = -Math.sin(actor.walkCycle) * 0.5;
      actor.group.position.y = Math.abs(Math.sin(actor.walkCycle * 2)) * 0.05;
    } else {
      actor.legs[0].rotation.x = THREE.MathUtils.lerp(actor.legs[0].rotation.x, 0, frameDelta * 10);
      actor.legs[1].rotation.x = THREE.MathUtils.lerp(actor.legs[1].rotation.x, 0, frameDelta * 10);
    }
    actor.group.position.y += Math.sin(time * 3 + customer.id.length) * 0.012;

    const wish = customer.kind === 'diner'
      ? (customer.phase === 'waiting-meal' ? customer.demand : null)
      : (['entering', 'to-shelf', 'waiting-stock', 'to-next-shelf'].includes(customer.phase)
        ? customer.shoppingList?.[customer.shoppingIndex ?? 0] ?? customer.demand : null);
    if (wish !== actor.lastWish) {
      const context = actor.bubbleCanvas.getContext('2d');
      context.clearRect(0, 0, 128, 128);
      if (wish && ITEMS[wish]) {
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
        context.fillText(ITEMS[wish].icon, 64, 62);
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
        if (!material?.userData?.sharedAsset) material?.dispose();
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
      this.scene.add(this.playerMesh);
    }
    this.playerMesh.position.set(state.player.x, 0, state.player.z);
    this.playerMesh.rotation.y = state.player.facing;
    this.playerCharacter.animate(frameDelta, wasMoving);
    this.engine.followTarget(this.playerMesh.position, frameDelta);

    this.#syncCollection(this.farms, Object.keys(state.farms), (id) => this.#addFarm(id));
    for (const [farmId, farm] of this.farms) {
      const count = state.farms[farmId]?.readyCount ?? 0;
      farm.produce.forEach((mesh, index) => { mesh.visible = index < count; });
    }
    this.#syncCollection(this.machines, Object.keys(state.machines), (id) => this.#addMachine(id));
    const shelfItems = state.unlockedProducts.filter((item) => SHELVES[item]);
    if (!shelfItems.includes('TOMATO')) shelfItems.push('TOMATO');
    this.#syncCollection(this.shelves, shelfItems, (id) => this.#addShelf(id));
    this.#syncCollection(this.tables, Object.keys(state.diningTables), (id) => this.#addTable(id));
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
    this.#syncCollection(this.upgradeMarkers, availableUpgrades.map((entry) => entry.id), (id) => {
      const upgrade = availableUpgrades.find((entry) => entry.id === id);
      if (upgrade) this.#addUpgradeMarker(upgrade);
    }, (marker) => this.#disposeVisual(marker));

    for (const [itemId, shelf] of this.shelves) {
      const count = state.stock[shelf.id]?.items[itemId] ?? 0;
      shelf.productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
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
        actor.group.position.y = Math.abs(Math.sin(actor.walkCycle * 2)) * 0.045;
      } else {
        actor.legs[0].rotation.x = THREE.MathUtils.lerp(actor.legs[0].rotation.x, 0, frameDelta * 10);
        actor.legs[1].rotation.x = THREE.MathUtils.lerp(actor.legs[1].rotation.x, 0, frameDelta * 10);
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

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const mat = (color, roughness = 0.84) => new THREE.MeshStandardMaterial({ color, roughness });

function add(parent, geometry, material, position, rotation = undefined, scale = undefined) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (rotation) mesh.rotation.set(...rotation);
  if (scale) mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function box(parent, size, material, position, radiusOrRotation = 0.035, rotationOrRadius = undefined) {
  const rotation = Array.isArray(radiusOrRotation) ? radiusOrRotation
    : (Array.isArray(rotationOrRadius) ? rotationOrRadius : undefined);
  const requestedRadius = Array.isArray(radiusOrRotation)
    ? (typeof rotationOrRadius === 'number' ? rotationOrRadius : 0.035)
    : radiusOrRotation;
  const radius = Number.isFinite(requestedRadius) ? requestedRadius : 0.035;
  return add(parent, new RoundedBoxGeometry(size[0], size[1], size[2], 3,
    Math.min(radius, size[0] * 0.23, size[1] * 0.23, size[2] * 0.23)), material, position, rotation);
}

function buildMaterials() {
  return {
    earth: mat(0xd8b170), grass: mat(0x67c943), grassBright: mat(0x85d651),
    soil: mat(0x765035), wood: mat(0xa96d38), woodLight: mat(0xd8a05b),
    woodPale: mat(0xf0d5a3), woodDark: mat(0x704329), roof: mat(0xe84231),
    roofLight: mat(0xff6041), roofDark: mat(0xb92e27), straw: mat(0xf3c84f),
    strawLight: mat(0xffdc72), dark: mat(0x342920), glass: mat(0x9bd8e4, 0.35),
    iron: mat(0x6d5540), leaf: mat(0x358f3d), leafBright: mat(0x69c846),
    stone: mat(0xa49d89), cream: mat(0xfff2dc), wing: mat(0xf4e2c2),
    comb: mat(0xe43b35), beak: mat(0xf4aa16), feet: mat(0xe88912),
    eye: new THREE.MeshStandardMaterial({ color: 0x171921, roughness: 0.28 }),
    eyeGlint: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    egg: mat(0xfff8e8, 0.6), grain: mat(0xe2a725),
  };
}

function leaf(parent, m, position, size, rotation = undefined) {
  const mesh = add(parent, new THREE.SphereGeometry(1, 7, 5), m.leafBright, position, rotation, size);
  mesh.castShadow = false;
  return mesh;
}

function addPlant(group, m, x, z, scale = 1) {
  const plant = new THREE.Group();
  plant.position.set(x, 0.29, z);
  for (let blade = 0; blade < 4; blade += 1) {
    const angle = blade * Math.PI / 2;
    leaf(plant, m, [Math.cos(angle) * 0.07, 0.12 + (blade % 2) * 0.035, Math.sin(angle) * 0.05],
      [0.075 * scale, 0.2 * scale, 0.05 * scale], [0, 0, angle - 0.4]);
  }
  group.add(plant);
}

function createEgg(material, size = 1) {
  const egg = new THREE.Mesh(new THREE.SphereGeometry(0.075 * size, 9, 7), material);
  egg.scale.set(0.83, 1.1, 0.83);
  egg.castShadow = true;
  egg.receiveShadow = true;
  return egg;
}

function createChicken(m, index, position) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar([1, 0.94, 0.82][index]);
  const body = new THREE.Group();
  group.add(body);

  const torso = add(body, new THREE.SphereGeometry(0.34, 12, 9), index === 2 ? m.strawLight : m.cream, [0, 0.34, 0]);
  torso.scale.set(0.86, 0.9, 1.04);
  const chest = add(body, new THREE.SphereGeometry(0.24, 10, 8), m.cream, [0, 0.27, 0.18]);
  chest.scale.set(0.9, 0.82, 0.82);

  const head = new THREE.Group();
  head.position.set(0, 0.59, 0.13);
  body.add(head);
  const headSize = index === 2 ? 0.16 : 0.19;
  add(head, new THREE.SphereGeometry(headSize, 11, 9), index === 2 ? m.strawLight : m.cream,
    [0, 0.035, 0.07], undefined, [1, 1.03, 0.97]);

  for (const side of [-1, 1]) {
    add(head, new THREE.SphereGeometry(0.034, 8, 6), m.eye, [side * 0.12, 0.055, 0.19]);
    add(head, new THREE.SphereGeometry(0.009, 6, 5), m.eyeGlint, [side * 0.12 - side * 0.009, 0.069, 0.2]);
    const wattle = add(head, new THREE.SphereGeometry(0.06, 8, 6), m.comb, [side * 0.045, -0.14, 0.16]);
    wattle.scale.set(0.72, 1.15, 0.68);
  }
  add(head, new THREE.ConeGeometry(0.07, 0.15, 6), m.beak, [0, 0, 0.28], [Math.PI / 2, 0, 0]);

  if (index !== 2) {
    for (const [x, y, radius] of [[-0.085, 0.2, 0.085], [0, 0.25, 0.1], [0.085, 0.2, 0.085]]) {
      const comb = add(head, new THREE.SphereGeometry(radius, 8, 6), m.comb, [x, y, 0.02]);
      comb.scale.set(0.85, 1.1, 0.75);
    }
  } else {
    add(head, new THREE.SphereGeometry(0.09, 8, 6), m.straw, [0, 0.18, 0.02], undefined, [0.8, 1.25, 0.8]);
  }

  const wings = [];
  for (const side of [-1, 1]) {
    const wing = new THREE.Group();
    wing.position.set(side * 0.23, 0.37, -0.02);
    const feather = add(wing, new THREE.SphereGeometry(0.16, 9, 7), m.wing, [0, 0, 0], undefined, [0.65, 0.98, 1.2]);
    feather.rotation.z = -side * 0.1;
    for (let detail = 0; detail < 2; detail += 1) {
      add(wing, new THREE.SphereGeometry(0.08, 8, 6), m.cream, [0, -0.05 + detail * 0.09, 0.08 + detail * 0.07], undefined, [0.7, 0.72, 0.94]);
    }
    body.add(wing);
    wings.push(wing);
  }

  const tail = new THREE.Group();
  tail.position.set(0, 0.47, -0.29);
  for (const side of [-1, 0, 1]) {
    const plume = add(tail, new THREE.SphereGeometry(0.11, 8, 6), m.cream, [side * 0.1, side === 0 ? 0.08 : 0.02, -0.03],
      undefined, [0.72, 1.15, 0.78]);
    plume.rotation.z = -side * 0.42;
  }
  body.add(tail);

  const legs = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.12, 0.16, 0.04);
    add(leg, new THREE.CylinderGeometry(0.024, 0.03, 0.13, 7), m.feet, [0, -0.055, 0]);
    const foot = add(leg, new THREE.SphereGeometry(0.072, 8, 6), m.feet, [0, -0.12, 0.06], undefined, [0.9, 0.34, 1.25]);
    for (const toe of [-1, 0, 1]) {
      add(leg, new THREE.SphereGeometry(0.039, 7, 5), m.feet,
        [toe * 0.044, -0.12, 0.13 - Math.abs(toe) * 0.014], undefined, [0.65, 0.35, 1.3]);
    }
    group.add(leg);
    legs.push(leg);
  }

  return { group, body, head, tail, wings, legs, phase: index * 2.1 };
}

export function createChickenCoopModel() {
  const m = buildMaterials();
  const group = new THREE.Group();

  // A complete fenced chicken yard with an elevated timber henhouse and egg nest wing.
  const foundation = add(group, new RoundedBoxGeometry(3.3, 0.2, 3.2, 3, 0.1), m.earth, [0, 0.12, 0]);
  foundation.receiveShadow = true;
  const grass = add(group, new RoundedBoxGeometry(3.2, 0.09, 3.1, 3, 0.08), m.grass, [0, 0.265, 0]);
  grass.receiveShadow = true;
  const dirt = add(group, new THREE.SphereGeometry(0.8, 12, 7), m.soil, [-0.05, 0.315, 0.55], undefined, [1.4, 0.045, 0.92]);
  dirt.receiveShadow = true;

  const coopX = -0.27;
  const coopZ = -0.35;
  const floorY = 0.78;
  for (const x of [coopX - 0.64, coopX + 0.64]) {
    for (const z of [coopZ - 0.52, coopZ + 0.52]) {
      box(group, [0.16, 0.67, 0.16], m.woodDark, [x, 0.48, z], 0.03);
      box(group, [0.2, 0.08, 0.2], m.woodLight, [x, 0.22, z], 0.025);
    }
  }

  box(group, [1.66, 0.17, 1.38], m.woodDark, [coopX, floorY, coopZ], 0.045);
  box(group, [1.53, 0.88, 1.24], m.woodLight, [coopX, 1.28, coopZ], 0.04);
  box(group, [1.58, 0.11, 1.29], m.wood, [coopX, 0.91, coopZ], 0.03);

  // Front gable and a tall arched hen door are separate pieces, leaving the opening readable.
  const gable = new THREE.Shape();
  gable.moveTo(-0.79, 0);
  gable.lineTo(0.79, 0);
  gable.lineTo(0, 0.59);
  gable.closePath();
  add(group, new THREE.ShapeGeometry(gable), m.wood, [coopX, 1.7, coopZ + 0.626]);
  const doorway = new THREE.Shape();
  doorway.moveTo(-0.23, 0);
  doorway.lineTo(-0.23, 0.48);
  doorway.quadraticCurveTo(-0.23, 0.68, 0, 0.68);
  doorway.quadraticCurveTo(0.23, 0.68, 0.23, 0.48);
  doorway.lineTo(0.23, 0);
  doorway.closePath();
  add(group, new THREE.ShapeGeometry(doorway), m.dark, [coopX, 0.93, coopZ + 0.645]);
  box(group, [0.09, 0.82, 0.09], m.woodDark, [coopX - 0.56, 1.32, coopZ + 0.65], 0.02);
  box(group, [0.09, 0.82, 0.09], m.woodDark, [coopX + 0.56, 1.32, coopZ + 0.65], 0.02);
  box(group, [0.18, 0.74, 0.08], m.woodLight, [coopX - 0.17, 1.32, coopZ + 0.66], 0.02);
  box(group, [0.18, 0.74, 0.08], m.woodLight, [coopX + 0.17, 1.32, coopZ + 0.66], 0.02);
  box(group, [0.56, 0.08, 0.12], m.woodLight, [coopX, 0.89, coopZ + 0.68], 0.02);

  const roofPitch = 0.62;
  for (const side of [-1, 1]) {
    box(group, [1.05, 0.15, 1.68], m.roof, [coopX + side * 0.39, 2.02, coopZ], 0.035,
      [0, 0, side < 0 ? roofPitch : -roofPitch]);
    for (let row = 0; row < 4; row += 1) {
      const z = coopZ - 0.73 + row * 0.48;
      box(group, [0.99, 0.045, 0.06], row % 2 ? m.roofLight : m.roofDark,
        [coopX + side * 0.4, 2.11, z], 0.012, [0, 0, side < 0 ? roofPitch : -roofPitch]);
    }
    for (let tile = 0; tile < 3; tile += 1) {
      box(group, [0.3, 0.055, 0.33], tile % 2 ? m.roofLight : m.roofDark,
        [coopX + side * (0.2 + tile * 0.18), 2.1 - tile * 0.12, coopZ - 0.58 + (tile % 2) * 0.18],
        0.012, [0, 0, side < 0 ? roofPitch : -roofPitch]);
    }
  }
  add(group, new THREE.CylinderGeometry(0.07, 0.07, 1.74, 8), m.roofLight, [coopX, 2.34, coopZ], [Math.PI / 2, 0, 0]);

  // Attached nest box sits lower on the open right side; the row of eggs remains visible.
  const nestX = 0.93;
  const nestZ = coopZ - 0.05;
  box(group, [0.82, 0.56, 1.15], m.woodDark, [nestX, 1.08, nestZ], 0.035);
  box(group, [0.87, 0.1, 1.2], m.woodLight, [nestX, 0.79, nestZ], 0.025);
  box(group, [0.1, 0.6, 1.16], m.wood, [nestX - 0.39, 1.12, nestZ], 0.02);
  box(group, [0.1, 0.26, 1.16], m.woodPale, [nestX + 0.39, 0.96, nestZ], 0.02);
  box(group, [0.82, 0.09, 0.08], m.woodLight, [nestX, 1.37, nestZ - 0.53], 0.015);
  box(group, [0.82, 0.09, 0.08], m.woodLight, [nestX, 1.37, nestZ + 0.53], 0.015);
  for (const z of [nestZ - 0.34, nestZ, nestZ + 0.34]) {
    const straw = add(group, new THREE.SphereGeometry(0.15, 8, 5), m.straw, [nestX, 0.89, z], undefined, [1.25, 0.19, 0.8]);
    straw.castShadow = false;
  }
  const eggMeshes = [];
  for (let row = 0; row < 3; row += 1) {
    for (let egg = 0; egg < 2; egg += 1) {
      const mesh = createEgg(m.egg, egg ? 0.95 : 1);
      mesh.position.set(nestX - 0.13 + egg * 0.26, 0.99, nestZ - 0.27 + row * 0.27);
      group.add(mesh);
      eggMeshes.push(mesh);
    }
  }

  // Wide plank ramp and straw lip echo the reference coop's walk-up entrance.
  for (let step = 0; step < 6; step += 1) {
    const y = 0.72 - step * 0.09;
    const z = coopZ + 0.76 + step * 0.16;
    box(group, [0.55 + step * 0.025, 0.095, 0.18], step % 2 ? m.woodLight : m.wood, [coopX, y, z], 0.025);
  }
  for (const side of [-1, 1]) {
    box(group, [0.075, 0.48, 0.11], m.woodDark, [coopX + side * 0.29, 0.53, coopZ + 1.12], [0.48, 0, 0], 0.018);
  }
  for (let straw = 0; straw < 7; straw += 1) {
    const piece = add(group, new THREE.SphereGeometry(0.08, 7, 5), straw % 2 ? m.strawLight : m.straw,
      [coopX - 0.23 + straw * 0.08, 0.97, coopZ + 0.69], undefined, [1.1, 0.3, 0.62]);
    piece.castShadow = false;
  }

  // Timber rails enclose the yard while leaving the ramp gate clear.
  const posts = [
    [-1.48, -1.36], [1.48, -1.36], [-1.48, 1.36], [1.48, 1.36],
    [-0.55, 1.36], [0.23, 1.36],
  ];
  for (const [x, z] of posts) {
    box(group, [0.14, 0.65, 0.14], m.woodDark, [x, 0.52, z], 0.025);
    box(group, [0.17, 0.09, 0.17], m.woodLight, [x, 0.88, z], 0.02);
  }
  for (const y of [0.37, 0.64]) {
    for (const x of [-1.48, 1.48]) box(group, [0.1, 0.14, 2.7], m.woodPale, [x, y, 0], 0.02);
    box(group, [2.88, 0.14, 0.1], m.woodPale, [0, y, -1.36], 0.02);
    box(group, [0.72, 0.14, 0.1], m.woodPale, [-1.12, y, 1.36], 0.02);
    box(group, [0.7, 0.14, 0.1], m.woodPale, [1.12, y, 1.36], 0.02);
  }

  box(group, [0.5, 0.14, 0.38], m.woodDark, [-0.99, 0.39, 0.55], 0.035);
  box(group, [0.45, 0.07, 0.33], m.woodLight, [-0.99, 0.48, 0.55], 0.025);
  const feedBits = [];
  for (let bit = 0; bit < 7; bit += 1) {
    const grain = add(group, new THREE.SphereGeometry(0.035, 6, 5), m.grain,
      [-1.15 + (bit % 4) * 0.1, 0.52, 0.43 + Math.floor(bit / 4) * 0.14], undefined, [0.9, 0.7, 1.2]);
    feedBits.push(grain);
  }

  for (const [x, z, scale] of [[-1.27, -1.12, 0.9], [1.27, -1.12, 0.86], [-1.27, 0.96, 0.82], [1.26, 0.95, 0.9]]) addPlant(group, m, x, z, scale);
  for (const [x, z] of [[-0.7, 0.8], [0.68, 0.82], [0.4, -1.08], [-0.47, -1.06]]) {
    const stone = add(group, new THREE.DodecahedronGeometry(0.1, 0), m.stone, [x, 0.3, z], undefined, [1.2, 0.4, 0.9]);
    stone.rotation.y = x * 0.4;
  }

  const chickens = [
    createChicken(m, 0, [-0.68, 0.29, 0.62]),
    createChicken(m, 1, [0.72, 0.29, 0.53]),
    createChicken(m, 2, [0.33, 0.29, -0.2]),
  ];
  chickens.forEach((chicken) => group.add(chicken.group));

  return { group, chickens, eggMeshes, feedBits };
}

export function animateCoopChicken(chicken, time) {
  const cycle = time * 1.6 + chicken.phase;
  const peck = Math.pow(Math.max(0, Math.sin(cycle * 0.36)), 12);
  chicken.body.position.y = Math.abs(Math.sin(cycle * 1.7)) * 0.018;
  chicken.head.rotation.x = 0.025 + peck * 0.42 + Math.sin(cycle * 0.7) * 0.025;
  chicken.tail.rotation.x = -0.06 + Math.sin(cycle * 0.8) * 0.045;
  chicken.wings.forEach((wing, index) => {
    wing.rotation.z = (index ? -1 : 1) * (0.025 + Math.sin(cycle * 0.8 + index) * 0.025);
  });
  chicken.legs.forEach((leg, index) => {
    leg.rotation.x = Math.sin(cycle * 1.4 + index * Math.PI) * 0.045;
  });
}


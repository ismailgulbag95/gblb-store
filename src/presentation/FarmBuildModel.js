import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GAME_CONFIG } from '../config/GameConfig.js';
import { createGrassMaterial } from './SurfaceTextures.js';

const mat = (color, roughness = 0.82, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });

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

function box(parent, size, material, position, radius = 0.035, rotation = undefined) {
  const geometry = new RoundedBoxGeometry(size[0], size[1], size[2], 3,
    Math.min(radius, size[0] * 0.24, size[1] * 0.24, size[2] * 0.24));
  return add(parent, geometry, material, position, rotation);
}

function cylinder(parent, rTop, rBot, height, material, position, segments = 8, rotation = undefined) {
  return add(parent, new THREE.CylinderGeometry(rTop, rBot, height, segments), material, position, rotation);
}

function sphere(parent, radius, material, position, scale = undefined, segments = 9) {
  return add(parent, new THREE.SphereGeometry(radius, segments, Math.max(5, segments - 2)), material, position, undefined, scale);
}

function leaf(parent, material, position, size, rotation = undefined) {
  const mesh = add(parent, new THREE.SphereGeometry(1, 7, 5), material, position, rotation, size);
  mesh.castShadow = false;
  return mesh;
}

function addFarmIsland(group, m) {
  box(group, [3.35, 0.2, 3.35], m.sand, [0, 0.12, 0], 0.11);
  box(group, [3.25, 0.09, 3.25], m.grass, [0, 0.265, 0], 0.07);
  box(group, [2.58, 0.12, 2.58], m.soil, [0, 0.355, 0], 0.05);

  // Wooden perimeter fence matching the reference art
  for (const x of [-1.42, 1.42]) {
    for (const z of [-1.34, -0.45, 0.45, 1.34]) {
      box(group, [0.16, 0.72, 0.16], m.post, [x, 0.56, z], 0.035);
      box(group, [0.19, 0.08, 0.19], m.postCap, [x, 0.94, z], 0.025);
    }
    for (const y of [0.38, 0.66]) box(group, [0.12, 0.16, 2.68], m.fence, [x, y, 0], 0.025);
  }
  for (const z of [-1.34, 1.34]) {
    for (const y of [0.38, 0.66]) box(group, [2.7, 0.16, 0.12], m.fence, [0, y, z], 0.025);
  }

  // Corner stone accents
  for (const [x, z, scale] of [[-1.12, -0.96, 1], [1.14, 0.95, 0.85], [-1.12, 0.92, 0.8], [1.12, -0.84, 0.9]]) {
    const stone = add(group, new THREE.DodecahedronGeometry(0.13, 0), m.stone, [x, 0.36, z], undefined, [1.3 * scale, 0.5, 0.95 * scale]);
    stone.rotation.y = x * 0.6;
  }
}

function addFurrows(group, m, rows = 5) {
  for (let row = 0; row < rows; row += 1) {
    const z = -0.95 + row * (1.9 / Math.max(1, rows - 1));
    box(group, [2.22, 0.03, 0.07], m.furrow, [0, 0.43, z], 0.015);
  }
}

function leafRibbon(parent, start, direction, width, surface, arch = 0.08) {
  const base = new THREE.Vector3(...start);
  const axis = new THREE.Vector3(...direction);
  let across = new THREE.Vector3().crossVectors(axis, new THREE.Vector3(0, 0, 1));
  if (across.lengthSq() < 0.02) across.set(1, 0, 0);
  across.normalize();

  const vertices = [];
  const indices = [];
  const steps = 5;
  for (let step = 0; step <= steps; step += 1) {
    const t = step / steps;
    const center = base.clone().addScaledVector(axis, t);
    center.y += Math.sin(t * Math.PI) * arch;
    const halfWidth = Math.sin(t * Math.PI) * width * 0.5;
    const left = center.clone().addScaledVector(across, halfWidth);
    const right = center.clone().addScaledVector(across, -halfWidth);
    vertices.push(left.x, left.y, left.z, right.x, right.y, right.z);
    if (step < steps) {
      const offset = step * 2;
      indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const blade = add(parent, geometry, surface, [0, 0, 0]);
  blade.castShadow = false;
  return blade;
}

// -------------------------------------------------------------
// 1. TOMATO FARM (Domates Parseli)
// -------------------------------------------------------------
function tomatoFarm(group, m, produce) {
  addFurrows(group, m, 5);

  // Vertical timber trellises & overhead wire rails
  for (const z of [-0.75, 0, 0.75]) {
    for (const x of [-0.92, 0, 0.92]) {
      box(group, [0.08, 1.48, 0.08], m.wood, [x, 1.15, z], 0.02);
      cylinder(group, 0.045, 0.045, 0.04, m.woodDark, [x, 1.9, z], 6);
    }
    box(group, [1.94, 0.05, 0.05], m.woodLight, [0, 1.76, z], 0.015);
    for (const y of [0.85, 1.25]) {
      box(group, [1.88, 0.02, 0.02], m.rope, [0, y, z], 0.005);
    }
  }

  const plants = [];
  const plantCoords = [
    [-0.55, -0.75], [0.55, -0.75],
    [-0.55, 0], [0.55, 0],
    [-0.55, 0.75], [0.55, 0.75],
  ];

  // 4 Harvestable slots map to the corner & center plants
  const harvestSlots = [0, 1, 4, 5];

  plantCoords.forEach(([px, pz], idx) => {
    const plant = new THREE.Group();
    plant.position.set(px, 0.43, pz);
    group.add(plant);

    // Stems & climbing foliage
    cylinder(plant, 0.03, 0.05, 1.25, m.vine, [0, 0.62, 0], 6);
    for (let l = 0; l < 8; l += 1) {
      const angle = (l * Math.PI * 2) / 8 + idx * 0.4;
      const ly = 0.25 + l * 0.13;
      leaf(plant, l % 2 ? m.leafBright : m.leaf,
        [Math.cos(angle) * 0.16, ly, Math.sin(angle) * 0.16],
        [0.12, 0.22, 0.045], [0, angle, 0.6]);
    }

    // Tomato fruit clusters
    const isHarvestable = harvestSlots.includes(idx);
    if (isHarvestable) {
      const ripe = new THREE.Group();
      ripe.position.set(0, 0.72, 0.1);
      // Cluster of 4 juicy ripe tomatoes
      const fruitOffsets = [
        [-0.1, -0.05, 0.02, 0.14],
        [0.08, -0.08, 0.03, 0.15],
        [-0.02, 0.08, 0.02, 0.13],
        [0.12, 0.06, -0.01, 0.12],
      ];
      fruitOffsets.forEach(([fx, fy, fz, fr]) => {
        sphere(ripe, fr, m.tomato, [fx, fy, fz], [1, 0.94, 0.94], 9);
        // Green star calyx
        for (let star = 0; star < 5; star += 1) {
          const sAngle = (star * Math.PI * 2) / 5;
          leaf(ripe, m.leafBright,
            [fx + Math.cos(sAngle) * 0.04, fy + fr * 0.88, fz + Math.sin(sAngle) * 0.04],
            [0.025, 0.055, 0.012], [0, 0, -sAngle]);
        }
      });
      plant.add(ripe);
      produce.push(ripe);
    }

    plants.push(plant);
  });

  return (time) => {
    plants.forEach((plant, i) => {
      plant.rotation.z = Math.sin(time * 2.2 + i * 1.1) * 0.035;
      plant.rotation.x = Math.cos(time * 1.8 + i * 0.9) * 0.02;
    });
  };
}

// -------------------------------------------------------------
// 2. CORN FARM (Mısır Tarlası)
// -------------------------------------------------------------
function cornFarm(group, m, produce) {
  addFurrows(group, m, 5);

  const stalks = [];
  const rows = [-0.75, 0, 0.75];
  const cols = [-0.85, -0.28, 0.28, 0.85];
  const harvestIndices = [1, 4, 7, 10]; // 4 harvest slots

  let count = 0;
  for (const z of rows) {
    for (const x of cols) {
      const plant = new THREE.Group();
      plant.position.set(x, 0.43, z);
      group.add(plant);

      const height = 1.35 + (count % 3) * 0.08;
      cylinder(plant, 0.035, 0.07, height, m.cornStem, [0, height / 2, 0], 7);

      // Ribbed arching corn leaves
      for (let l = 0; l < 8; l += 1) {
        const angle = (l * Math.PI * 2) / 8 + count * 0.5;
        const ly = 0.28 + Math.floor(l / 2) * 0.22;
        const length = 0.52 + (l % 3) * 0.05;
        const dir = [Math.cos(angle) * length, -0.04, Math.sin(angle) * length * 0.7];
        leafRibbon(plant, [0, ly, 0], dir, 0.16, l % 2 ? m.cornLeafBright : m.cornLeaf, 0.18);
      }

      // Top golden tassel plumes
      for (let t = 0; t < 6; t += 1) {
        const tAngle = (t * Math.PI * 2) / 6 + count;
        const end = [Math.cos(tAngle) * 0.12, height + 0.32, Math.sin(tAngle) * 0.1];
        cylinder(plant, 0.008, 0.014, 0.32, m.tassel, [Math.cos(tAngle) * 0.06, height + 0.15, Math.sin(tAngle) * 0.05], 4);
        sphere(plant, 0.024, m.tasselBright, end, [0.8, 1.4, 0.8], 6);
      }

      // Corn cobs
      if (harvestIndices.includes(count)) {
        const harvest = new THREE.Group();
        // 2 big ripe corn cobs poking out from green husk
        for (const [side, earY, lean] of [[-1, 0.72, -0.45], [1, 0.92, 0.4]]) {
          const ear = new THREE.Group();
          ear.position.set(side * 0.12, earY, 0.08);
          ear.rotation.z = lean;
          // Cob kernels
          sphere(ear, 0.13, m.cob, [0, 0, 0], [0.82, 1.45, 0.82], 8);
          // Green husk leaves wrapped around base
          for (const hs of [-1, 1]) {
            leafRibbon(ear, [hs * 0.03, -0.22, 0], [hs * 0.07, 0.32, 0], 0.1, m.cornLeafBright, 0.02);
          }
          // Golden silk tuft at tip
          cylinder(ear, 0.015, 0.025, 0.12, m.silk, [0, 0.22, 0], 5);
          harvest.add(ear);
        }
        plant.add(harvest);
        produce.push(harvest);
      }

      stalks.push(plant);
      count += 1;
    }
  }

  return (time) => {
    stalks.forEach((stalk, i) => {
      stalk.rotation.z = Math.sin(time * 2.4 + stalk.position.x * 2) * 0.045;
      stalk.rotation.x = Math.cos(time * 2.0 + stalk.position.z * 2) * 0.03;
    });
  };
}

// -------------------------------------------------------------
// 3. WHEAT FARM (Buğday Tarlası)
// -------------------------------------------------------------
function wheatFarm(group, m, produce) {
  addFurrows(group, m, 6);

  const patches = [];
  const rows = [-0.88, -0.52, -0.16, 0.2, 0.56, 0.92];
  const cols = [-0.92, -0.62, -0.32, 0, 0.32, 0.62, 0.92];

  for (const z of rows) {
    for (const x of cols) {
      const patch = new THREE.Group();
      patch.position.set(x, 0.43, z);
      const height = 0.86 + ((Math.round((x + z) * 10) % 3) + 3) % 3 * 0.07;
      cylinder(patch, 0.012, 0.02, height, m.wheatStem, [0, height / 2, 0], 5);

      // Wheat grain head with bearded awns
      const head = new THREE.Group();
      head.position.set(0, height - 0.05, 0);
      cylinder(head, 0.016, 0.022, 0.46, m.wheatStem, [0, 0.2, 0], 5);
      for (let r = 0; r < 7; r += 1) {
        const ry = r * 0.06;
        for (const side of [-1, 1]) {
          sphere(head, 0.04, r % 2 ? m.wheatLight : m.wheat,
            [side * 0.038, ry, 0], [0.85, 1.25, 0.8], 6);
        }
      }
      for (const side of [-1, 1]) {
        cylinder(head, 0.005, 0.008, 0.36, m.wheatLight, [side * 0.04, 0.58, 0], 4, [0, 0, side * 0.15]);
      }
      patch.add(head);
      group.add(patch);
      patches.push({ patch, x, z });
    }
  }

  // 4 Produce sections
  const secSize = Math.floor(patches.length / 4);
  for (let s = 0; s < 4; s += 1) {
    const secGroup = new THREE.Group();
    const slice = patches.slice(s * secSize, (s + 1) * secSize);
    slice.forEach(({ patch }) => {
      // Golden harvest glow mesh per section
      const icon = sphere(secGroup, 0.07, m.wheatLight, [patch.position.x, 1.25, patch.position.z], [1, 1.4, 0.8], 6);
      icon.visible = false;
    });
    group.add(secGroup);
    produce.push(secGroup);
  }

  // Mesmerizing wind ripple wave animation
  return (time) => {
    patches.forEach(({ patch, x, z }) => {
      const wave = Math.sin(time * 3.2 + x * 2.4 + z * 1.8);
      patch.rotation.z = wave * 0.075;
      patch.rotation.x = Math.cos(time * 2.6 + x * 1.8 + z * 2.2) * 0.045;
    });
  };
}

// -------------------------------------------------------------
// 4. ORANGE ORCHARD (Meyve Bahçesi)
// -------------------------------------------------------------
function orangeFarm(group, m, produce) {
  // 2 Lush foreground fruit trees
  const treeCenters = [
    [-0.55, -0.2],
    [0.55, 0.25],
  ];

  const treeCrowns = [];
  const orangeClusters = [];

  treeCenters.forEach(([tx, tz], tIdx) => {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(tx, 0.38, tz);
    group.add(treeGroup);

    // Gnarled organic woody trunk with roots
    cylinder(treeGroup, 0.13, 0.22, 1.65, m.bark, [0, 0.82, 0], 9);
    for (const rAngle of [0, 2.1, 4.2]) {
      cylinder(treeGroup, 0.07, 0.11, 0.42, m.barkDark,
        [Math.cos(rAngle) * 0.18, 0.2, Math.sin(rAngle) * 0.18], 6, [0.3, rAngle, 0]);
    }

    // Branching limbs
    const branchDirs = [
      [-0.32, 1.35, 0.18], [0.35, 1.38, -0.15],
      [-0.15, 1.55, -0.3], [0.18, 1.58, 0.32],
    ];
    branchDirs.forEach(([bx, by, bz]) => {
      cylinder(treeGroup, 0.06, 0.09, 0.58, m.barkLight, [bx / 2, by - 0.2, bz / 2], 7, [bz, 0, -bx]);
    });

    // Rounded spherical layered leafy crowns
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 1.75, 0);
    treeGroup.add(crownGroup);
    treeCrowns.push(crownGroup);

    const canopySpheres = [
      [0, 0.25, 0, 0.65, m.leaf],
      [-0.38, 0.05, 0.18, 0.46, m.leafDark],
      [0.38, 0.08, -0.16, 0.46, m.leafDark],
      [-0.18, 0.12, -0.36, 0.44, m.leaf],
      [0.2, 0.15, 0.34, 0.44, m.leafBright],
      [0, 0.58, 0, 0.42, m.leafBright],
    ];
    canopySpheres.forEach(([cx, cy, cz, cr, cMat]) => {
      sphere(crownGroup, cr, cMat, [cx, cy, cz], [1.1, 0.92, 1.05], 11);
    });

    // Hanging ripe orange fruit clusters (2 per tree = 4 produce slots!)
    for (const side of [-1, 1]) {
      const cluster = new THREE.Group();
      cluster.position.set(side * 0.42, 1.55, (side * 0.25) * (tIdx ? -1 : 1));
      // 3 Oranges per cluster
      for (const [ox, oy, oz] of [[-0.08, -0.12, 0], [0.09, -0.16, 0.04], [0, -0.22, -0.05]]) {
        cylinder(cluster, 0.012, 0.016, 0.08, m.barkLight, [ox, oy + 0.12, oz], 5);
        leaf(cluster, m.leafBright, [ox - 0.03, oy + 0.15, oz], [0.045, 0.02, 0.03]);
        sphere(cluster, 0.125, m.orange, [ox, oy, oz], [1, 0.95, 0.95], 9);
      }
      treeGroup.add(cluster);
      orangeClusters.push(cluster);
      produce.push(cluster);
    }
  });

  // Authentic orchard ground props from reference image:
  // Wooden fruit-picking ladder leaning against tree
  const ladder = new THREE.Group();
  ladder.position.set(0.85, 0.38, 0.05);
  ladder.rotation.z = -0.32;
  ladder.rotation.y = 0.2;
  for (const lx of [-0.15, 0.15]) {
    box(ladder, [0.04, 1.65, 0.05], m.woodDark, [lx, 0.8, 0], 0.015);
  }
  for (let rung = 0; rung < 5; rung += 1) {
    box(ladder, [0.32, 0.03, 0.04], m.woodLight, [0, 0.35 + rung * 0.25, 0], 0.01);
  }
  group.add(ladder);

  // Harvest crate filled with oranges
  box(group, [0.65, 0.32, 0.52], m.woodDark, [-0.98, 0.45, 0.72], 0.03);
  box(group, [0.59, 0.28, 0.46], m.woodLight, [-0.98, 0.47, 0.72], 0.02);
  for (let oi = 0; oi < 6; oi += 1) {
    sphere(group, 0.08, m.orange,
      [-1.12 + (oi % 3) * 0.14, 0.64, 0.62 + Math.floor(oi / 3) * 0.18], [1, 0.95, 0.95], 8);
  }

  // Woven wicker basket overflowing with picked oranges
  cylinder(group, 0.22, 0.16, 0.24, m.basket, [0.12, 0.48, 0.88], 10);
  for (let bi = 0; bi < 4; bi += 1) {
    const bAngle = (bi * Math.PI) / 2;
    sphere(group, 0.075, m.orange,
      [0.12 + Math.cos(bAngle) * 0.09, 0.62, 0.88 + Math.sin(bAngle) * 0.09], [1, 0.95, 0.95], 8);
  }

  // Animated butterfly fluttering above orchard
  const butterfly = new THREE.Group();
  butterfly.position.set(0, 2.5, 0);
  cylinder(butterfly, 0.015, 0.02, 0.1, m.darkMetal, [0, 0, 0], 5, [Math.PI / 2, 0, 0]);
  const bWingL = leaf(butterfly, m.butterfly, [-0.08, 0, 0], [0.09, 0.01, 0.07]);
  const bWingR = leaf(butterfly, m.butterfly, [0.08, 0, 0], [0.09, 0.01, 0.07]);
  group.add(butterfly);

  return (time) => {
    treeCrowns.forEach((crown, i) => {
      crown.rotation.z = Math.sin(time * 1.8 + i) * 0.025;
      crown.rotation.x = Math.cos(time * 1.5 + i) * 0.02;
    });
    orangeClusters.forEach((cl, i) => {
      cl.rotation.x = Math.sin(time * 2.6 + i * 1.4) * 0.04;
    });
    // Fluttering butterfly flight
    butterfly.position.x = Math.sin(time * 1.4) * 0.75;
    butterfly.position.z = Math.cos(time * 1.1) * 0.65;
    butterfly.position.y = 2.4 + Math.sin(time * 3.5) * 0.18;
    bWingL.rotation.z = Math.sin(time * 24) * 0.65;
    bWingR.rotation.z = -Math.sin(time * 24) * 0.65;
  };
}

// -------------------------------------------------------------
// Main Factory Export
// -------------------------------------------------------------
export function createFarmBuildModel(item) {
  const group = new THREE.Group();
  const m = {
    sand: mat(0xdcb775), grass: createGrassMaterial(GAME_CONFIG.COLORS.FLOOR_FARM, 1.2, 1.2), grassLight: mat(0x83d955),
    soil: mat(0x62412b), furrow: mat(0x7b5336), post: mat(0x8c512b), postCap: mat(0xb5793f),
    fence: mat(0xf1d6a7), wood: mat(0xa56a39), woodLight: mat(0xd9a15d), woodDark: mat(0x6b3f20),
    rope: mat(0x9d784e), stone: mat(0x918d80), leaf: mat(0x369a3e), leafBright: mat(0x63c742),
    leafDark: mat(0x277b38), vine: mat(0x398941), tomato: mat(0xed3d2e), bark: mat(0x6e4325),
    barkDark: mat(0x50301a), barkLight: mat(0x965e34), orange: mat(0xff8c19),
    basket: mat(0xc99351), butterfly: mat(0xfff056), darkMetal: mat(0x222a2a),
    cornStem: mat(0x347f32), cornNode: mat(0x80a942),
    cornLeaf: new THREE.MeshStandardMaterial({ color: 0x238f37, roughness: 0.88, side: THREE.DoubleSide }),
    cornLeafBright: new THREE.MeshStandardMaterial({ color: 0x65bd3e, roughness: 0.86, side: THREE.DoubleSide }),
    tassel: mat(0x8b7631), tasselBright: mat(0xf2cf50),
    cob: mat(0xe5a90e), cobBright: mat(0xffd84b),
    silk: new THREE.MeshStandardMaterial({ color: 0xefe2a0, roughness: 0.9, side: THREE.DoubleSide }),
    wheatStem: mat(0xb6903b), wheatLeaf: mat(0xe1b84d), wheat: mat(0xe7ad32), wheatLight: mat(0xffd458),
  };

  addFarmIsland(group, m);
  const produce = [];
  let updateAnim = null;

  if (item === 'TOMATO') updateAnim = tomatoFarm(group, m, produce);
  else if (item === 'ORANGE') updateAnim = orangeFarm(group, m, produce);
  else if (item === 'CORN') updateAnim = cornFarm(group, m, produce);
  else updateAnim = wheatFarm(group, m, produce);

  const glow = new THREE.Mesh(
    new THREE.RingGeometry(1.43, 1.48, 40),
    new THREE.MeshBasicMaterial({ color: 0xa4e76e, side: THREE.DoubleSide, transparent: true, opacity: 0.2 }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.045;
  group.add(glow);

  return {
    group,
    produce,
    item,
    badgeY: 3.05,
    update(time) {
      updateAnim?.(time);
    },
  };
}

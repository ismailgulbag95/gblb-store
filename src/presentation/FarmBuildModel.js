import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const mat = (color, roughness = 0.86) => new THREE.MeshStandardMaterial({ color, roughness });

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

function sphere(parent, radius, material, position, scale = undefined, segments = 8) {
  return add(parent, new THREE.SphereGeometry(radius, segments, Math.max(4, segments - 2)), material, position,
    undefined, scale);
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

  // A low, square timber fence frames the planted bed like the reference set.
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

  for (const [x, z, scale] of [
    [-1.3, -1.22, 1], [1.28, -1.14, 0.9], [-1.29, 1.17, 0.86], [1.3, 1.24, 1],
    [-1.27, 0.02, 0.78], [1.28, -0.02, 0.8],
  ]) {
    for (let blade = 0; blade < 3; blade += 1) {
      const angle = blade * Math.PI / 3;
      leaf(group, blade % 2 ? m.grassLight : m.grass, [x + Math.cos(angle) * 0.055, 0.37 + blade * 0.025, z + Math.sin(angle) * 0.055],
        [0.075 * scale, 0.19 * scale, 0.055 * scale], [0, 0, angle - 0.3]);
    }
  }
  for (const [x, z, scale] of [[-1.08, -0.92, 1], [1.1, 0.91, 0.82], [-1.08, 0.88, 0.75], [1.08, -0.8, 0.9]]) {
    const stone = add(group, new THREE.DodecahedronGeometry(0.12, 0), m.stone, [x, 0.36, z], undefined, [1.2 * scale, 0.48, 0.9 * scale]);
    stone.rotation.y = x * 0.6;
  }
}

function addFurrows(group, m, rows = 5) {
  for (let row = 0; row < rows; row += 1) {
    const z = -0.95 + row * (1.9 / Math.max(1, rows - 1));
    box(group, [2.22, 0.025, 0.055], m.furrow, [0, 0.43, z], 0.01);
  }
}

function tomatoPlant(group, x, z, m, fruitCluster = false, produce = null) {
  const plant = new THREE.Group();
  plant.position.set(x, 0.43, z);
  group.add(plant);

  for (const [dx, height] of [[-0.12, 0.62], [0, 0.82], [0.12, 0.68]]) {
    const stalk = add(plant, new THREE.CylinderGeometry(0.026, 0.045, height, 6), m.vine,
      [dx, height / 2, 0], [0, 0, -dx * 1.5]);
    stalk.castShadow = false;
  }
  for (let i = 0; i < 7; i += 1) {
    const side = i % 2 ? 1 : -1;
    const y = 0.2 + Math.floor(i / 2) * 0.18;
    leaf(plant, i % 3 ? m.leaf : m.leafBright,
      [side * (0.14 + (i % 3) * 0.025), y, (i % 2) * 0.055],
      [0.11, 0.21 + (i % 2) * 0.035, 0.045], [0, 0, side * 0.72]);
  }
  if (fruitCluster) {
    const ripe = new THREE.Group();
    ripe.position.set(0.015, 0.55, 0.12);
    for (const [dx, dy, dz, size] of [[-0.11, 0, 0, 0.14], [0.06, -0.1, 0.025, 0.15], [0.13, 0.11, -0.015, 0.13]]) {
      add(ripe, new THREE.SphereGeometry(size, 9, 7), m.tomato, [dx, dy, dz], undefined, [1, 0.92, 0.95]);
      for (let leaflet = 0; leaflet < 5; leaflet += 1) {
        const angle = leaflet * Math.PI * 0.4;
        leaf(ripe, m.leaf, [dx + Math.cos(angle) * 0.045, dy + size * 0.76, dz + Math.sin(angle) * 0.045],
          [0.025, 0.055, 0.014], [0, 0, -angle]);
      }
    }
    plant.add(ripe);
    if (produce) produce.push(ripe);
  }
}

function tomatoFarm(group, m, produce) {
  addFurrows(group, m, 5);
  for (const z of [-0.72, 0, 0.72]) {
    for (const x of [-0.68, 0, 0.68]) {
      const isHarvested = Math.abs(x) === 0.68 && Math.abs(z) === 0.72;
      tomatoPlant(group, x, z, m, isHarvested, produce);
    }
  }
  // Tall timber stakes and cross ties make the tomato rows legible at game scale.
  for (const z of [-0.88, -0.1, 0.68]) {
    for (const x of [-0.9, 0, 0.9]) {
      box(group, [0.075, 1.5, 0.075], m.wood, [x, 1.15, z], 0.018);
    }
    box(group, [1.9, 0.07, 0.07], m.woodLight, [0, 1.75, z], 0.018);
  }
  for (const [x, z] of [[-0.45, -0.72], [0.45, -0.72], [-0.45, 0], [0.45, 0], [-0.45, 0.72], [0.45, 0.72]]) {
    const tie = add(group, new THREE.CylinderGeometry(0.013, 0.013, 0.76, 5), m.rope, [x, 1.13, z], [0, 0, Math.PI / 2]);
    tie.castShadow = false;
  }
}

function treeBranch(group, m, points, radius) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const branch = add(group, new THREE.TubeGeometry(curve, 12, radius, 7, false), m.bark, [0, 0, 0]);
  branch.castShadow = true;
  return branch;
}

function leafRibbon(parent, start, direction, width, surface, vein = null, arch = 0.08) {
  const base = new THREE.Vector3(...start);
  const axis = new THREE.Vector3(...direction);
  let across = new THREE.Vector3().crossVectors(axis, new THREE.Vector3(0, 0, 1));
  if (across.lengthSq() < 0.02) across.set(1, 0, 0);
  across.normalize();

  const vertices = [];
  const indices = [];
  const centers = [];
  const steps = 6;
  for (let step = 0; step <= steps; step += 1) {
    const t = step / steps;
    const center = base.clone().addScaledVector(axis, t);
    center.y += Math.sin(t * Math.PI) * arch;
    centers.push(center);
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
  blade.receiveShadow = false;

  if (vein) {
    const curve = new THREE.CatmullRomCurve3(centers);
    const midrib = add(parent, new THREE.TubeGeometry(curve, steps, 0.006, 4, false), vein, [0, 0, 0]);
    midrib.castShadow = false;
    midrib.receiveShadow = false;
  }
  return blade;
}

function orangeTree(group, m) {
  // A clear trunk, a handful of branches, and a compact rounded crown keep the tree readable in the isometric view.
  add(group, new THREE.CylinderGeometry(0.105, 0.19, 1.78, 8), m.bark, [0, 1.29, 0]);

  const harvestBranches = [
    {
      points: [[0, 1.26, 0], [-0.29, 1.49, 0.17], [-0.58, 1.67, 0.43]],
    },
    {
      points: [[-0.02, 1.47, 0], [-0.19, 1.73, 0.17], [-0.29, 2.02, 0.42]],
    },
    {
      points: [[0.02, 1.28, 0], [0.33, 1.49, 0.17], [0.59, 1.68, 0.42]],
    },
    {
      points: [[0.03, 1.52, -0.02], [0.27, 1.83, 0.15], [0.37, 2.1, 0.4]],
    },
  ];
  harvestBranches.forEach(({ points }, index) => treeBranch(group, m, points, index < 2 ? 0.068 : 0.064));

  for (const [x, y, z, radius, material] of [
    [0, 1.99, -0.02, 0.63, m.leaf],
    [-0.43, 1.82, 0.01, 0.43, m.leafDark],
    [0.43, 1.83, 0.01, 0.43, m.leafDark],
    [0, 2.32, 0.02, 0.39, m.leafBright],
  ]) {
    const crown = add(group, new THREE.SphereGeometry(radius, 10, 7), material,
      [x, y, z], undefined, [1.12, 0.88, 0.96]);
    crown.castShadow = true;
  }

  return harvestBranches.map(({ points }) => points[points.length - 1]);
}

function orangeFruitCluster(parent, m, position) {
  const cluster = new THREE.Group();
  cluster.position.set(...position);
  parent.add(cluster);
  const fruits = [
    [-0.09, -0.235, 0.015],
    [0.09, -0.265, 0.045],
  ];
  for (const [x, y, z] of fruits) {
    const twigCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x * 0.52, -0.065, z * 0.35),
      new THREE.Vector3(x, y + 0.14, z),
    ]);
    add(cluster, new THREE.TubeGeometry(twigCurve, 5, 0.014, 5, false), m.barkLight, [0, 0, 0]);
    add(cluster, new THREE.CylinderGeometry(0.012, 0.017, 0.05, 5), m.barkLight,
      [x, y + 0.13, z]);
    leaf(cluster, m.leafBright, [x - 0.035, y + 0.16, z], [0.055, 0.022, 0.03], [0, 0, -0.3]);
    add(cluster, new THREE.SphereGeometry(0.14, 9, 7), m.orange,
      [x, y, z], undefined, [1, 0.96, 0.92]);
  }
  return cluster;
}

function orangeFarm(group, materials, produce) {
  const fruitPoints = orangeTree(group, materials);
  fruitPoints.forEach((position) => produce.push(orangeFruitCluster(group, materials, position)));
}

function cornStalk(group, materials, x, z, phase, makeCobs, produce) {
  const plant = new THREE.Group();
  plant.position.set(x, 0.43, z);
  group.add(plant);

  const height = 1.26 + (Math.round((x + z) * 10) % 3) * 0.06;
  const stem = add(plant, new THREE.CylinderGeometry(0.035, 0.075, height, 7), materials.cornStem,
    [0, height / 2, 0]);
  stem.castShadow = false;
  for (const y of [0.34, 0.63, 0.92]) {
    const node = add(plant, new THREE.TorusGeometry(0.057, 0.012, 5, 8), materials.cornNode,
      [0, y, 0], [Math.PI / 2, 0, 0]);
    node.castShadow = false;
  }

  for (let leafIndex = 0; leafIndex < 8; leafIndex += 1) {
    const angle = leafIndex * Math.PI * 2 / 8 + phase;
    const tier = Math.floor(leafIndex / 2);
    const startY = 0.26 + tier * 0.2;
    const length = 0.5 + (leafIndex % 3) * 0.055;
    const direction = [Math.cos(angle) * length, -0.025 + (tier % 2) * 0.04, Math.sin(angle) * length * 0.68];
    const bladeMaterial = leafIndex % 3 === 0 ? materials.cornLeafBright : materials.cornLeaf;
    leafRibbon(plant, [0, startY, 0], direction, 0.16 + (leafIndex % 2) * 0.025,
      bladeMaterial, leafIndex % 3 === 0 ? materials.cornVein : null, 0.19);
  }

  // Golden tassels at the top identify each stalk even when its ears are not ripe.
  for (let tassel = 0; tassel < 7; tassel += 1) {
    const angle = tassel * Math.PI * 2 / 7 + phase;
    const end = [Math.cos(angle) * 0.13, height + 0.34 + (tassel % 2) * 0.06, Math.sin(angle) * 0.1];
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, height - 0.02, 0),
      new THREE.Vector3(Math.cos(angle) * 0.07, height + 0.13, Math.sin(angle) * 0.06),
      new THREE.Vector3(...end),
    ]);
    const strand = add(plant, new THREE.TubeGeometry(curve, 5, 0.012, 4, false), materials.tassel, [0, 0, 0]);
    strand.castShadow = false;
    sphere(plant, 0.026, materials.tasselBright, end, [0.9, 1.4, 0.9], 6);
  }

  if (makeCobs) {
    const harvest = new THREE.Group();
    const addEar = (side, y, lean) => {
      const ear = new THREE.Group();
      ear.position.set(side * 0.12, y, 0.09);
      ear.rotation.z = lean;
      const cob = add(ear, new THREE.SphereGeometry(0.13, 8, 6), materials.cob,
        [0, 0, 0], undefined, [0.83, 1.38, 0.83]);
      for (let row = 0; row < 6; row += 1) {
        const localY = -0.26 + row * 0.1;
        const radius = 0.092 * Math.sqrt(Math.max(0.2, 1 - (localY / 0.37) ** 2));
        for (let kernel = 0; kernel < 6; kernel += 1) {
          const angle = kernel * Math.PI / 3 + (row % 2) * 0.18;
          add(ear, new THREE.SphereGeometry(0.028, 5, 4), row % 2 ? materials.cobBright : materials.cob,
            [Math.cos(angle) * radius, localY, Math.sin(angle) * radius], undefined, [1, 0.9, 0.92]);
        }
      }
      for (const huskSide of [-1, 1]) {
        leafRibbon(ear, [huskSide * 0.035, -0.25, -0.015], [huskSide * 0.08, 0.35, 0],
          0.11, materials.cornLeafBright, null, 0.025);
      }
      for (let silk = 0; silk < 3; silk += 1) {
        leafRibbon(ear, [0, 0.29, 0], [(silk - 1) * 0.035, 0.13, 0.015], 0.018, materials.silk, null, 0.01);
      }
      harvest.add(ear);
      cob.castShadow = true;
    };
    addEar(-1, 0.69, -0.52);
    addEar(1, 0.9, 0.4);
    plant.add(harvest);
    produce.push(harvest);
  }
}

function cornFarm(group, materials, produce) {
  addFurrows(group, materials, 5);
  const rows = [-0.72, 0, 0.72];
  const columns = [-0.88, -0.3, 0.3, 0.88];
  let index = 0;
  for (const z of rows) {
    for (const x of columns) {
      cornStalk(group, materials, x, z, index * 0.39, [1, 4, 7, 10].includes(index), produce);
      index += 1;
    }
  }
}
function wheatHead(parent, m, position, scale = 1) {
  const head = new THREE.Group();
  head.position.set(...position);
  head.scale.setScalar(scale);
  const spine = add(head, new THREE.CylinderGeometry(0.018, 0.025, 0.52, 5), m.wheatStem, [0, 0.22, 0]);
  spine.castShadow = false;
  for (let row = 0; row < 7; row += 1) {
    const y = -0.01 + row * 0.065;
    for (const side of [-1, 1]) {
      const grain = add(head, new THREE.SphereGeometry(0.043, 6, 5), row % 2 ? m.wheatLight : m.wheat,
        [side * (0.043 - row * 0.002), y, 0], [0, 0, side * 0.2], [0.85, 1.25, 0.8]);
      grain.castShadow = false;
    }
  }
  for (const side of [-1, 1]) {
    const awn = add(head, new THREE.CylinderGeometry(0.005, 0.01, 0.4, 4), m.wheatLight,
      [side * 0.045, 0.65, 0], [0, 0, side * 0.16]);
    awn.castShadow = false;
  }
  parent.add(head);
  return head;
}

function wheatFarm(group, m, produce) {
  addFurrows(group, m, 6);
  const locations = [];
  for (const z of [-0.85, -0.48, -0.1, 0.28, 0.66, 0.9]) {
    for (const x of [-0.92, -0.62, -0.32, 0, 0.32, 0.62, 0.92]) {
      const patch = new THREE.Group();
      patch.position.set(x, 0.43, z);
      const height = 0.82 + ((Math.round((x + z) * 10) % 4) + 4) % 4 * 0.08;
      const stem = add(patch, new THREE.CylinderGeometry(0.012, 0.02, height, 5), m.wheatStem, [0, height / 2, 0]);
      stem.castShadow = false;
      for (const [side, y, lean] of [[-1, 0.28, -0.7], [1, 0.46, 0.72], [-1, 0.64, -0.52]]) {
        leaf(patch, m.wheatLeaf, [side * 0.08, y, 0], [0.052, 0.3, 0.018], [0, 0, lean]);
      }
      group.add(patch);
      locations.push({ patch, height });
    }
  }
  const sections = [
    locations.slice(0, 9), locations.slice(9, 18), locations.slice(18, 27), locations.slice(27, 36),
  ];
  sections.forEach((section, index) => {
    const heads = new THREE.Group();
    section.forEach(({ patch, height }, stalkIndex) => {
      const localHead = wheatHead(heads, m, [
        patch.position.x, 0.43 + height - 0.05, patch.position.z,
      ], 0.78 + (stalkIndex % 3) * 0.1);
      localHead.rotation.z = ((stalkIndex + index) % 2 ? -1 : 1) * 0.12;
    });
    group.add(heads);
    produce.push(heads);
  });
}

export function createFarmBuildModel(item) {
  const group = new THREE.Group();
  const m = {
    sand: mat(0xdcb775), grass: mat(0x69c840), grassLight: mat(0x83d955),
    soil: mat(0x67442d), furrow: mat(0x835b3d), post: mat(0x8c512b), postCap: mat(0xb5793f),
    fence: mat(0xf1d6a7), wood: mat(0xa56a39), woodLight: mat(0xd9a15d), rope: mat(0x9d784e),
    stone: mat(0x918d80), leaf: mat(0x369a3e), leafBright: mat(0x63c742), leafDark: mat(0x277b38),
    vine: mat(0x398941), tomato: mat(0xed3d2e), bark: mat(0x74472a), barkLight: mat(0x9c6235),
    orange: mat(0xff8c19),
    cornStem: mat(0x347f32), cornNode: mat(0x80a942),
    cornLeaf: new THREE.MeshStandardMaterial({ color: 0x238f37, roughness: 0.88, side: THREE.DoubleSide }),
    cornLeafBright: new THREE.MeshStandardMaterial({ color: 0x65bd3e, roughness: 0.86, side: THREE.DoubleSide }),
    cornVein: mat(0xa6ca59), tassel: mat(0x8b7631), tasselBright: mat(0xf2cf50),
    cob: mat(0xe5a90e), cobBright: mat(0xffd84b), silk: new THREE.MeshStandardMaterial({ color: 0xefe2a0, roughness: 0.9, side: THREE.DoubleSide }),
    wheatStem: mat(0xb6903b), wheatLeaf: mat(0xe1b84d), wheat: mat(0xe7ad32), wheatLight: mat(0xffd458),
  };

  addFarmIsland(group, m);
  const produce = [];
  if (item === 'TOMATO') tomatoFarm(group, m, produce);
  else if (item === 'ORANGE') orangeFarm(group, m, produce);
  else if (item === 'CORN') cornFarm(group, m, produce);
  else wheatFarm(group, m, produce);

  const glow = new THREE.Mesh(
    new THREE.RingGeometry(1.43, 1.48, 40),
    new THREE.MeshBasicMaterial({ color: 0xa4e76e, side: THREE.DoubleSide, transparent: true, opacity: 0.2 }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.045;
  group.add(glow);

  return { group, produce, item, badgeY: 3.05 };
}


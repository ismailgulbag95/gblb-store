import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const material = (color, roughness = 0.78, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });

function add(parent, geometry, surface, position, rotation = undefined, scale = undefined) {
  const mesh = new THREE.Mesh(geometry, surface);
  mesh.position.set(...position);
  if (rotation) mesh.rotation.set(...rotation);
  if (scale) mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function box(parent, size, surface, position, radius = 0.045, rotation = undefined) {
  const geometry = new RoundedBoxGeometry(size[0], size[1], size[2], 3,
    Math.min(radius, size[0] * 0.23, size[1] * 0.23, size[2] * 0.23));
  return add(parent, geometry, surface, position, rotation);
}

function cylinder(parent, radiusTop, radiusBottom, height, surface, position, segments = 10, rotation = undefined, openEnded = false) {
  return add(parent, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, openEnded), surface, position, rotation);
}

function sphere(parent, radius, surface, position, scale = [1, 1, 1], segments = 9) {
  return add(parent, new THREE.SphereGeometry(radius, segments, Math.max(6, segments - 2)), surface, position, undefined, scale);
}

function tube(parent, points, radius, surface, segments = 14) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  return add(parent, new THREE.TubeGeometry(curve, segments, radius, 7, false), surface, [0, 0, 0]);
}

function anchor(group, position) {
  const display = new THREE.Group();
  display.position.set(...position);
  group.add(display);
  return display;
}

function baseIsland(group, m, width = 3.05, depth = 2.7) {
  box(group, [width, 0.2, depth], m.sand, [0, 0.13, 0], 0.1);
  box(group, [width - 0.12, 0.09, depth - 0.12], m.grass, [0, 0.275, 0], 0.07);
  for (const [x, z] of [[-width * 0.39, depth * 0.36], [width * 0.34, depth * 0.37], [-width * 0.4, -depth * 0.35], [width * 0.39, -depth * 0.36]]) {
    const paver = add(group, new THREE.DodecahedronGeometry(0.16, 0), m.stoneLight,
      [x, 0.34, z], undefined, [1.45, 0.32, 0.83]);
    paver.rotation.y = x + z;
  }
  for (const [x, z] of [[-width * 0.47, 0.02], [width * 0.46, -0.06]]) {
    for (let blade = 0; blade < 3; blade += 1) {
      const leaf = sphere(group, 0.08, blade % 2 ? m.leafBright : m.leaf,
        [x + (blade - 1) * 0.055, 0.38 + blade * 0.04, z], [0.52, 1.35, 0.4], 7);
      leaf.rotation.z = (blade - 1) * 0.45;
      leaf.castShadow = false;
    }
  }
}

function crate(group, m, position, size, wood = m.wood, plank = m.woodLight) {
  const [w, h, d] = size;
  const [x, y, z] = position;
  box(group, [w, 0.1, d], wood, [x, y + 0.05, z], 0.025);
  for (const side of [-1, 1]) {
    for (let row = 0; row < 3; row += 1) {
      const boardY = y + 0.15 + row * (h - 0.17) / 3;
      box(group, [w, (h - 0.17) / 3 - 0.018, 0.055], row % 2 ? plank : wood,
        [x, boardY, z + side * (d / 2 - 0.03)], 0.014);
      box(group, [0.055, (h - 0.17) / 3 - 0.018, d - 0.08], wood,
        [x + side * (w / 2 - 0.03), boardY, z], 0.014);
    }
  }
  for (const dx of [-1, 1]) for (const dz of [-1, 1]) {
    box(group, [0.075, h + 0.02, 0.075], m.woodDark, [x + dx * (w / 2 - 0.045), y + h / 2, z + dz * (d / 2 - 0.045)], 0.018);
  }
  return anchor(group, [x, y + h - 0.04, z]);
}

function crateStack(group, m, position, size, count = 2) {
  const [w, h, d] = size;
  for (let row = 0; row < count; row += 1) {
    const x = position[0] + (row % 2) * w * 0.12;
    const y = position[1] + row * (h * 0.82);
    const z = position[2] - Math.floor(row / 2) * d * 0.1;
    crate(group, m, [x, y, z], [w, h, d]);
  }
}

function fruit(group, m, type, position, radius = 0.13) {
  const color = type === 'orange' ? m.orange : type === 'corn' ? m.corn : type === 'tomato' ? m.tomato : type === 'apple' ? m.tomato : m.leaf;
  const body = sphere(group, radius, color, position, [1, 0.9, 0.92], 8);
  if (type === 'orange' || type === 'apple') {
    cylinder(group, 0.018, 0.023, 0.075, m.woodDark, [position[0], position[1] + radius * 0.78, position[2]], 5);
    sphere(group, 0.06, m.leafBright, [position[0] + 0.05, position[1] + radius, position[2]], [1.2, 0.4, 0.55], 6);
  }
  return body;
}

function tileRoof(group, m, center, width, depth, color = m.roof) {
  const [x, y, z] = center;
  const pitch = 0.54;
  for (const side of [-1, 1]) {
    const panel = box(group, [width * 0.56, 0.15, depth], color,
      [x + side * width * 0.24, y, z], 0.025, [0, 0, side * pitch]);
    panel.castShadow = true;
    for (const row of [0, 1, 2, 3]) {
      const rowZ = z - depth * 0.42 + row * depth * 0.28;
      box(group, [width * 0.53, 0.045, 0.055], m.roofLight,
        [x + side * width * 0.25, y + 0.1, rowZ], 0.015, [0, 0, side * pitch]);
    }
    for (const strip of [0, 1, 2]) {
      const stripX = x + side * (0.07 + strip * width * 0.18);
      box(group, [0.055, 0.045, depth * 0.95], m.roofDark, [stripX, y + 0.09, z], 0.012, [0, 0, side * pitch]);
    }
  }
  cylinder(group, 0.075, 0.075, depth + 0.08, m.roofLight, [x, y + 0.2, z], 8, [Math.PI / 2, 0, 0]);
}

function archShape(width, height) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(-width / 2, height * 0.56);
  shape.quadraticCurveTo(-width / 2, height, 0, height);
  shape.quadraticCurveTo(width / 2, height, width / 2, height * 0.56);
  shape.lineTo(width / 2, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function statusJewel(group, m, position = [1.25, 0.63, 0.84]) {
  cylinder(group, 0.09, 0.09, 0.06, m.brass, [position[0], position[1] - 0.06, position[2]], 8);
  const lamp = sphere(group, 0.055, m.signal, position, [1, 0.9, 1], 8);
  lamp.material.emissive = new THREE.Color(0x267e2c);
  lamp.material.emissiveIntensity = 0.4;
  return lamp;
}

function addLogPile(group, m, x, z, count = 4) {
  for (let index = 0; index < count; index += 1) {
    const log = cylinder(group, 0.075, 0.082, 0.58, m.log,
      [x + (index % 2) * 0.1, 0.26 + Math.floor(index / 2) * 0.12, z + (index % 2) * 0.035],
      7, [Math.PI / 2, 0, 0]);
    cylinder(group, 0.074, 0.074, 0.012, m.logCut,
      [x + (index % 2) * 0.1, 0.26 + Math.floor(index / 2) * 0.12, z + 0.27 + (index % 2) * 0.035], 7, [Math.PI / 2, 0, 0]);
    log.castShadow = true;
  }
}

function tomatoPaste(group, m) {
  baseIsland(group, m, 3.15, 2.75);

  // Red copper kettle over a little brick firebox, with the feed chute overhead.
  box(group, [1.28, 0.38, 1.12], m.brick, [-0.16, 0.58, -0.08], 0.08);
  box(group, [0.42, 0.3, 0.04], m.dark, [-0.16, 0.55, 0.51], 0.035);
  sphere(group, 0.18, m.fireGlow, [-0.16, 0.53, 0.55], [1, 0.85, 0.16], 8);
  for (const x of [-0.54, -0.34, 0.02, 0.22]) cylinder(group, 0.06, 0.07, 0.22, m.log,
    [x, 0.34, 0.72], 7, [Math.PI / 2, 0, 0]);

  cylinder(group, 0.58, 0.56, 0.98, m.kettle, [-0.16, 1.19, -0.08], 12);
  cylinder(group, 0.61, 0.61, 0.09, m.steel, [-0.16, 1.68, -0.08], 12);
  cylinder(group, 0.53, 0.53, 0.025, m.paste, [-0.16, 1.735, -0.08], 12);
  cylinder(group, 0.62, 0.62, 0.08, m.steel, [-0.16, 0.75, -0.08], 12);
  for (const y of [0.86, 1.2, 1.53]) {
    const hoop = add(group, new THREE.TorusGeometry(0.59, 0.025, 6, 18), m.rivetSteel, [-0.16, y, -0.08], [Math.PI / 2, 0, 0]);
    hoop.castShadow = false;
  }
  const chimney = cylinder(group, 0.12, 0.15, 0.78, m.steel, [-0.77, 1.68, -0.42], 8);
  cylinder(group, 0.2, 0.18, 0.08, m.rivetSteel, [-0.77, 2.08, -0.42], 8);
  tube(group, [[-0.68, 1.52, -0.08], [-0.88, 1.52, -0.08], [-0.88, 1.83, -0.08]], 0.045, m.steel);
  crate(group, m, [-0.98, 0.36, -0.84], [0.82, 0.65, 0.7]);
  for (const [x, z] of [[-1.22, -0.68], [-0.98, -0.75], [-0.78, -0.66]]) fruit(group, m, 'tomato', [x, 0.96, z], 0.16);

  // An open jar shelf makes the finished paste part of the model, not a detached tray.
  box(group, [0.78, 0.1, 0.78], m.wood, [0.94, 0.55, 0.19], 0.025);
  box(group, [0.08, 0.55, 0.78], m.woodDark, [1.29, 0.79, 0.19], 0.02);
  for (const y of [0.68, 1.06]) box(group, [0.76, 0.06, 0.72], m.woodLight, [0.94, y, 0.19], 0.02);
  const output = anchor(group, [0.66, 0.77, 0.19]);
  const input = anchor(group, [-1.02, 0.97, -0.82]);
  for (const x of [0.71, 0.94, 1.17]) {
    cylinder(group, 0.075, 0.082, 0.24, m.glass, [x, 0.84, 0.25], 8);
    cylinder(group, 0.068, 0.068, 0.025, m.gold, [x, 0.97, 0.25], 8);
    cylinder(group, 0.064, 0.064, 0.12, m.paste, [x, 0.78, 0.25], 8);
  }
  const lamp = statusJewel(group, m, [0.26, 0.82, 0.92]);
  return { input, output, lamp, badgeY: 2.75 };
}

function citrusPress(group, m) {
  baseIsland(group, m, 3.08, 2.65);
  crate(group, m, [-0.65, 0.35, -0.63], [1.05, 0.62, 0.82]);
  for (const [x, z] of [[-0.98, -0.5], [-0.67, -0.5], [-0.38, -0.5], [-0.82, -0.76]]) fruit(group, m, 'orange', [x, 1.02, z], 0.15);
  for (const x of [-0.95, -0.35]) box(group, [0.09, 1.08, 0.09], m.woodDark, [x, 0.9, -0.16], 0.02);
  box(group, [0.88, 0.13, 0.8], m.wood, [-0.65, 1.5, -0.16], 0.04);

  // Hand-driven citrus press with a visible cone, clear juice chamber and cup.
  cylinder(group, 0.43, 0.46, 0.12, m.steel, [0.13, 0.92, -0.1], 11);
  cylinder(group, 0.36, 0.39, 0.57, m.glass, [0.13, 1.25, -0.1], 10);
  cylinder(group, 0.34, 0.34, 0.24, m.juice, [0.13, 1.12, -0.1], 10);
  cylinder(group, 0.2, 0.29, 0.19, m.gold, [0.13, 1.66, -0.1], 9);
  cylinder(group, 0.26, 0.26, 0.06, m.woodDark, [0.13, 1.79, -0.1], 9);
  cylinder(group, 0.055, 0.06, 0.72, m.steel, [0.13, 2.13, -0.1], 8);
  box(group, [0.85, 0.1, 0.12], m.wood, [0.36, 2.39, -0.1], 0.035, [0, 0, -0.12]);
  sphere(group, 0.1, m.woodLight, [0.81, 2.39, -0.1], [1.25, 0.85, 1], 8);
  tube(group, [[0.49, 1.03, 0.1], [0.68, 0.98, 0.1], [0.68, 0.72, 0.1]], 0.035, m.steel);
  cylinder(group, 0.13, 0.14, 0.25, m.glass, [0.68, 0.58, 0.1], 8);
  cylinder(group, 0.12, 0.12, 0.13, m.juice, [0.68, 0.56, 0.1], 8);
  crate(group, m, [0.91, 0.35, -0.63], [0.83, 0.53, 0.75]);
  for (const [x, z] of [[0.65, -0.55], [0.9, -0.69], [1.13, -0.52]]) fruit(group, m, 'orange', [x, 0.9, z], 0.14);
  box(group, [0.62, 0.1, 0.5], m.woodDark, [0.96, 0.45, 0.48], 0.025);
  box(group, [0.58, 0.06, 0.46], m.woodLight, [0.96, 0.53, 0.48], 0.02);
  const input = anchor(group, [-0.65, 0.96, -0.63]);
  const output = anchor(group, [0.96, 0.55, 0.48]);
  const lamp = statusJewel(group, m, [0.91, 0.67, 0.25]);
  return { input, output, lamp, badgeY: 3.05 };
}

function popcornPopper(group, m) {
  baseIsland(group, m, 3.12, 2.8);
  // Red carnival cart and glass case under a bright, tiled awning.
  box(group, [1.47, 0.76, 1.12], m.red, [-0.1, 0.7, -0.13], 0.08);
  box(group, [1.52, 0.12, 1.18], m.gold, [-0.1, 1.09, -0.13], 0.025);
  for (const x of [-0.82, 0.62]) for (const z of [-0.62, 0.42]) {
    cylinder(group, 0.045, 0.055, 1.04, m.woodDark, [x, 1.66, z], 7);
  }
  for (const z of [-0.62, 0.42]) box(group, [1.4, 0.04, 0.04], m.gold, [-0.1, 1.92, z], 0.012);
  box(group, [1.54, 0.12, 1.23], m.redDark, [-0.1, 2.08, -0.13], 0.04);
  box(group, [1.65, 0.1, 1.34], m.red, [-0.1, 2.18, -0.13], 0.045);
  for (const x of [-0.53, 0.34]) {
    const wheel = cylinder(group, 0.34, 0.34, 0.14, m.woodDark, [x, 0.53, 0.56], 10, [Math.PI / 2, 0, 0]);
    cylinder(group, 0.12, 0.12, 0.16, m.brass, [x, 0.53, 0.56], 8, [Math.PI / 2, 0, 0]);
    for (let spoke = 0; spoke < 8; spoke += 1) {
      const angle = spoke * Math.PI / 4;
      box(group, [0.045, 0.55, 0.045], m.woodLight,
        [x, 0.53, 0.56], 0.01, [0, 0, angle]);
    }
    wheel.castShadow = true;
  }

  // Glass-sided warmer with a brass kettle and fluffy piles of popcorn.
  box(group, [1.18, 0.06, 0.9], m.steel, [-0.1, 1.15, -0.13], 0.025);
  for (const x of [-0.66, 0.46]) box(group, [0.045, 0.82, 0.045], m.brass, [x, 1.58, -0.13], 0.01);
  for (const z of [-0.56, 0.3]) box(group, [1.15, 0.045, 0.045], m.brass, [-0.1, 1.58, z], 0.01);
  for (const z of [-0.55, 0.28]) box(group, [1.12, 0.72, 0.025], m.glass, [-0.1, 1.57, z], 0.008);
  for (const x of [-0.65, 0.45]) box(group, [0.025, 0.72, 0.8], m.glass, [x, 1.57, -0.13], 0.008);
  cylinder(group, 0.31, 0.37, 0.32, m.brass, [-0.1, 1.42, -0.13], 10);
  cylinder(group, 0.36, 0.36, 0.045, m.gold, [-0.1, 1.61, -0.13], 10);
  for (let puff = 0; puff < 18; puff += 1) {
    const x = -0.54 + (puff % 6) * 0.17;
    const z = -0.43 + Math.floor(puff / 6) * 0.22;
    const popcorn = add(group, new THREE.DodecahedronGeometry(0.095, 0), m.popcorn, [x, 1.18 + (puff % 3) * 0.035, z]);
    popcorn.scale.set(1, 1.12, 0.92);
  }
  box(group, [0.52, 0.12, 0.46], m.wood, [0.84, 0.82, 0.26], 0.025);
  for (const x of [0.72, 0.9, 1.08]) cylinder(group, 0.08, 0.08, 0.18, m.paperRed, [x, 0.98, 0.25], 8);
  box(group, [0.66, 0.12, 0.48], m.woodDark, [0.88, 0.61, 0.62], 0.03);
  box(group, [0.62, 0.06, 0.44], m.woodLight, [0.88, 0.7, 0.62], 0.02);
  const input = anchor(group, [-0.1, 1.18, -0.13]);
  const output = anchor(group, [0.88, 0.72, 0.62]);
  const lamp = statusJewel(group, m, [0.75, 0.67, -0.52]);
  return { input, output, lamp, badgeY: 2.85 };
}

function feedMill(group, m) {
  baseIsland(group, m, 3.1, 2.72);
  // Open oak frame carries the dark hopper, exposed wheel and descending grain spout.
  for (const x of [-0.74, 0.55]) {
    for (const z of [-0.52, 0.38]) box(group, [0.16, 1.36, 0.16], m.woodDark, [x, 0.95, z], 0.035);
  }
  box(group, [1.54, 0.14, 1.1], m.wood, [-0.1, 0.48, -0.08], 0.045);
  const hopper = add(group, new THREE.CylinderGeometry(0.53, 0.2, 0.75, 8, 1, false), m.darkMetal, [-0.1, 1.82, -0.1]);
  cylinder(group, 0.55, 0.55, 0.08, m.steel, [-0.1, 2.2, -0.1], 8);
  box(group, [1.2, 0.07, 0.88], m.steelDark, [-0.1, 2.29, -0.1], 0.035);
  for (const z of [-0.33, 0.18]) {
    const gear = cylinder(group, 0.42, 0.42, 0.14, m.gear, [0.75, 0.98, z], 12, [0, 0, Math.PI / 2]);
    cylinder(group, 0.16, 0.16, 0.18, m.brass, [0.85, 0.98, z], 8, [0, 0, Math.PI / 2]);
    for (let tooth = 0; tooth < 10; tooth += 1) {
      const angle = tooth * Math.PI / 5;
      box(group, [0.08, 0.15, 0.15], m.steelDark,
        [0.81, 0.98 + Math.cos(angle) * 0.42, z + Math.sin(angle) * 0.42], 0.014, [angle, 0, 0]);
    }
    gear.castShadow = true;
  }
  const chute = cylinder(group, 0.15, 0.22, 0.5, m.gold, [0.43, 0.68, 0.48], 8, [Math.PI / 2, 0, 0]);
  chute.castShadow = true;
  crate(group, m, [-0.91, 0.35, 0.58], [0.74, 0.54, 0.72]);
  for (const [x, z] of [[-1.1, 0.53], [-0.87, 0.58], [-0.66, 0.5]]) fruit(group, m, 'corn', [x, 0.88, z], 0.12);
  for (const x of [0.58, 1.02]) {
    sphere(group, 0.23, m.sack, [x, 0.63, 0.55], [0.85, 1.23, 0.8], 8);
    cylinder(group, 0.15, 0.17, 0.08, m.sackLight, [x, 0.88, 0.55], 8);
    box(group, [0.25, 0.035, 0.04], m.rope, [x, 0.94, 0.55], 0.008);
  }
  const input = anchor(group, [-0.91, 0.87, 0.58]);
  const output = anchor(group, [0.8, 0.9, 0.58]);
  const lamp = statusJewel(group, m, [-0.83, 1.25, -0.55]);
  hopper.castShadow = true;
  return { input, output, lamp, badgeY: 3.15 };
}

function flourMill(group, m) {
  baseIsland(group, m, 3.05, 2.68);
  // Timber gantry, square grain bin and the paired grindstones are the whole silhouette.
  for (const x of [-0.72, 0.6]) {
    box(group, [0.15, 1.5, 0.15], m.woodDark, [x, 0.94, -0.22], 0.03);
    box(group, [0.17, 0.16, 1.18], m.wood, [x, 1.44, -0.22], 0.025);
  }
  box(group, [1.48, 0.14, 1.34], m.wood, [-0.06, 0.48, -0.12], 0.04);
  crate(group, m, [-0.06, 1.72, -0.22], [1.02, 0.62, 0.92], m.woodDark, m.woodLight);
  for (let grain = 0; grain < 12; grain += 1) {
    sphere(group, 0.052, m.wheat, [-0.43 + (grain % 4) * 0.24, 2.39 + (Math.floor(grain / 4) % 2) * 0.03, -0.5 + Math.floor(grain / 4) * 0.24], [0.8, 1.25, 0.8], 6);
  }
  cylinder(group, 0.54, 0.57, 0.22, m.stone, [-0.06, 0.82, -0.12], 12);
  cylinder(group, 0.48, 0.48, 0.18, m.stoneLight, [-0.06, 1.03, -0.12], 12);
  cylinder(group, 0.29, 0.36, 0.46, m.woodDark, [-0.06, 1.35, -0.12], 9);
  cylinder(group, 0.4, 0.4, 0.07, m.woodLight, [-0.06, 1.59, -0.12], 10);
  cylinder(group, 0.38, 0.38, 0.04, m.stoneLight, [-0.06, 1.06, -0.12], 12);
  for (const x of [-0.84, 0.73]) {
    sphere(group, 0.23, m.sack, [x, 0.58, 0.55], [0.85, 1.15, 0.8], 8);
    cylinder(group, 0.15, 0.17, 0.08, m.sackLight, [x, 0.83, 0.55], 8);
  }
  box(group, [0.63, 0.09, 0.46], m.wood, [0.58, 0.37, 0.62], 0.025);
  sphere(group, 0.16, m.flour, [0.58, 0.44, 0.62], [1.3, 0.22, 0.9], 8);
  const crank = cylinder(group, 0.19, 0.19, 0.1, m.steelDark, [0.48, 1.02, -0.12], 8, [0, 0, Math.PI / 2]);
  box(group, [0.48, 0.06, 0.06], m.woodLight, [0.71, 1.17, -0.12], 0.02);
  const input = anchor(group, [-0.06, 2.3, -0.22]);
  const output = anchor(group, [0.58, 0.48, 0.62]);
  const lamp = statusJewel(group, m, [0.93, 1.0, -0.62]);
  crank.castShadow = true;
  return { input, output, lamp, badgeY: 3.1 };
}

function breadOven(group, m) {
  baseIsland(group, m, 3.12, 2.86);
  // Large stone oven with a true open arch, tiled roof, smoke stack and front work pad.
  box(group, [1.72, 1.08, 1.3], m.stoneDark, [-0.22, 0.82, -0.23], 0.12);
  box(group, [1.6, 0.1, 1.22], m.stoneLight, [-0.22, 1.38, -0.23], 0.04);
  add(group, new THREE.SphereGeometry(0.84, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), m.brick,
    [-0.22, 1.38, -0.28], undefined, [1.04, 0.82, 0.92]);
  box(group, [0.92, 0.72, 0.1], m.stone, [-0.22, 0.77, 0.47], 0.06);
  add(group, archShape(0.68, 0.55), m.dark, [-0.22, 0.5, 0.53]);
  sphere(group, 0.12, m.fireGlow, [-0.22, 0.61, 0.58], [1.1, 1, 0.22], 8);
  const loaf = sphere(group, 0.19, m.bread, [-0.22, 0.67, 0.67], [1.28, 0.74, 0.8], 9);
  for (const x of [-0.31, -0.22, -0.13]) box(group, [0.025, 0.025, 0.15], m.breadLight, [x, 0.81, 0.69], 0.01, [0.1, 0, 0.4]);
  tileRoof(group, m, [-0.22, 1.92, -0.26], 2.15, 1.66, m.roof);
  const chimney = box(group, [0.42, 0.95, 0.42], m.stoneDark, [-0.75, 2.17, -0.51], 0.035);
  box(group, [0.58, 0.12, 0.58], m.stoneLight, [-0.75, 2.68, -0.51], 0.035);
  for (const y of [1.95, 2.18, 2.4]) box(group, [0.44, 0.035, 0.44], m.stone, [-0.75, y, -0.51], 0.01);
  addLogPile(group, m, -0.9, 0.82, 4);
  box(group, [0.92, 0.12, 0.68], m.wood, [0.85, 0.48, 0.15], 0.04);
  box(group, [0.78, 0.06, 0.58], m.woodLight, [0.85, 0.57, 0.15], 0.025);
  for (const x of [0.62, 0.85, 1.08]) {
    const bread = sphere(group, 0.13, m.bread, [x, 0.72, 0.17], [1.2, 0.85, 0.9], 8);
    bread.rotation.z = 0.16;
  }
  cylinder(group, 0.026, 0.026, 0.8, m.wood, [0.65, 0.78, 0.66], 6, [0, 0, 0.63]);
  const peel = add(group, new THREE.CircleGeometry(0.18, 8), m.woodLight, [0.43, 0.56, 0.74], [-0.2, 0, 0]);
  crate(group, m, [0.95, 0.35, 0.72], [0.58, 0.42, 0.5]);
  const input = anchor(group, [0.95, 0.73, 0.72]);
  const output = anchor(group, [0.85, 0.64, 0.15]);
  const lamp = statusJewel(group, m, [0.77, 1.26, 0.53]);
  loaf.castShadow = true;
  chimney.castShadow = true;
  peel.castShadow = false;
  return { input, output, lamp, badgeY: 3.35 };
}

function orangeTartKitchen(group, m) {
  baseIsland(group, m, 3.15, 2.8);
  // An open-front cottage bakery rather than a freestanding rectangular appliance.
  for (const x of [-0.88, 0.5]) {
    for (const z of [-0.58, 0.34]) box(group, [0.13, 1.6, 0.13], m.woodDark, [x, 1.03, z], 0.025);
  }
  box(group, [1.48, 0.12, 1.02], m.wood, [-0.18, 0.85, -0.1], 0.035);
  box(group, [1.62, 0.08, 1.12], m.cream, [-0.18, 1.27, 0.04], 0.03);
  tileRoof(group, m, [-0.18, 2.05, -0.13], 2.05, 1.52, m.roof);
  box(group, [0.72, 0.58, 0.58], m.brick, [-0.21, 0.57, -0.4], 0.05);
  box(group, [0.57, 0.42, 0.045], m.stoneDark, [-0.21, 0.53, -0.09], 0.03);
  add(group, archShape(0.42, 0.32), m.fireGlow, [-0.21, 0.32, -0.062]);
  cylinder(group, 0.1, 0.13, 0.57, m.stoneDark, [-0.43, 1.55, -0.42], 7);
  box(group, [0.42, 0.07, 0.42], m.stoneLight, [-0.43, 1.85, -0.42], 0.02);
  for (const x of [-0.83, -0.53, 0.38]) {
    const bottle = cylinder(group, 0.055, 0.07, 0.3, x < -0.7 ? m.orange : m.glass,
      [x, 1.47, 0.37], 8);
    cylinder(group, 0.025, 0.035, 0.07, m.gold, [x, 1.65, 0.37], 7);
    bottle.castShadow = true;
  }
  box(group, [0.82, 0.1, 0.68], m.woodDark, [0.71, 0.51, 0.1], 0.03);
  box(group, [0.78, 0.07, 0.62], m.cream, [0.71, 0.61, 0.1], 0.025);
  for (const x of [0.42, 0.68, 0.94]) {
    box(group, [0.075, 0.64, 0.075], m.wood, [x, 0.89, 0.34], 0.02);
  }
  for (let stripe = 0; stripe < 6; stripe += 1) {
    box(group, [0.12, 0.34, 0.018], stripe % 2 ? m.red : m.cream, [0.42 + stripe * 0.12, 0.69, 0.46], 0.008);
  }
  // Full orange tart on the counter; dynamic orders collect at the same pastry stand.
  cylinder(group, 0.36, 0.38, 0.12, m.tartCrust, [0.71, 0.74, 0.03], 12);
  cylinder(group, 0.31, 0.31, 0.045, m.tart, [0.71, 0.82, 0.03], 12);
  add(group, new THREE.TorusGeometry(0.28, 0.025, 6, 16), m.cream, [0.71, 0.85, 0.03]);
  for (let slice = 0; slice < 10; slice += 1) {
    const angle = slice * Math.PI / 5;
    sphere(group, 0.05, m.orange, [0.71 + Math.cos(angle) * 0.2, 0.855, 0.03 + Math.sin(angle) * 0.2], [1, 0.55, 0.72], 7);
  }
  box(group, [0.52, 0.09, 0.46], m.woodDark, [1.12, 0.52, 0.49], 0.03);
  box(group, [0.48, 0.06, 0.42], m.woodLight, [1.12, 0.6, 0.49], 0.02);
  const input = anchor(group, [-0.18, 1.32, 0.04]);
  const output = anchor(group, [1.12, 0.62, 0.49]);
  const lamp = statusJewel(group, m, [1.15, 0.73, -0.4]);
  return { input, output, lamp, badgeY: 3.2 };
}

function burgerGrill(group, m) {
  baseIsland(group, m, 3.15, 2.8);
  // Compact stainless grill, extractor hood and a side counter stocked with produce.
  box(group, [1.38, 0.95, 1.08], m.steel, [-0.34, 0.79, -0.12], 0.1);
  box(group, [1.22, 0.12, 0.9], m.steelDark, [-0.34, 1.31, -0.08], 0.045);
  for (const x of [-0.78, 0.12]) box(group, [0.06, 0.8, 0.06], m.steelDark, [x, 1.83, -0.48], 0.02);
  box(group, [1.58, 0.18, 1.13], m.steelLight, [-0.34, 2.27, -0.48], 0.06);
  box(group, [1.38, 0.07, 0.92], m.steelDark, [-0.34, 2.14, -0.48], 0.025);
  cylinder(group, 0.17, 0.2, 0.48, m.steelDark, [-0.34, 2.63, -0.48], 8);
  cylinder(group, 0.24, 0.24, 0.06, m.steelLight, [-0.34, 2.88, -0.48], 8);
  for (const x of [-0.75, -0.46, -0.17, 0.12]) {
    cylinder(group, 0.15, 0.15, 0.045, m.patty, [x, 1.44, 0.02], 10);
    if (x === -0.46 || x === 0.12) cylinder(group, 0.15, 0.15, 0.035, m.cheese, [x, 1.48, 0.02], 10);
  }
  for (const x of [-0.7, -0.34, 0.02]) {
    cylinder(group, 0.05, 0.06, 0.25, x === -0.7 ? m.red : m.gold, [x, 0.87, 0.55], 8);
    cylinder(group, 0.04, 0.04, 0.05, m.steelDark, [x, 1.02, 0.55], 8);
  }
  // Wooden produce counter and assembled burger make this station read as a kitchen.
  box(group, [1.03, 0.13, 0.95], m.woodDark, [0.84, 0.68, 0.1], 0.04);
  box(group, [1.08, 0.1, 1.0], m.woodLight, [0.84, 0.79, 0.1], 0.035);
  crate(group, m, [0.58, 0.9, -0.39], [0.55, 0.42, 0.45]);
  for (const [x, z, type] of [[0.43, -0.3, 'tomato'], [0.64, -0.36, 'lettuce'], [0.82, -0.29, 'tomato']]) {
    if (type === 'lettuce') sphere(group, 0.12, m.leafBright, [x, 1.38, z], [1.1, 0.65, 1], 7);
    else fruit(group, m, type, [x, 1.38, z], 0.11);
  }
  cylinder(group, 0.25, 0.27, 0.05, m.cream, [0.86, 0.89, 0.11], 12);
  cylinder(group, 0.19, 0.2, 0.12, m.bread, [0.86, 0.98, 0.11], 10);
  cylinder(group, 0.2, 0.2, 0.04, m.leafBright, [0.86, 1.06, 0.11], 10);
  cylinder(group, 0.18, 0.19, 0.08, m.patty, [0.86, 1.12, 0.11], 10);
  cylinder(group, 0.2, 0.2, 0.11, m.bread, [0.86, 1.21, 0.11], 10);
  sphere(group, 0.2, m.breadLight, [0.86, 1.28, 0.11], [1, 0.45, 1], 8);
  box(group, [0.45, 0.09, 0.4], m.steelLight, [1.16, 0.54, 0.53], 0.025);
  const input = anchor(group, [0.58, 1.3, -0.39]);
  const output = anchor(group, [1.16, 0.59, 0.53]);
  const lamp = statusJewel(group, m, [0.52, 1.05, 0.53]);
  return { input, output, lamp, badgeY: 3.25 };
}

function pizzaOven(group, m) {
  baseIsland(group, m, 3.15, 2.85);
  // Broad masonry dome with a red tile cap, chimney, wood store and prep counter.
  box(group, [1.64, 0.88, 1.35], m.brick, [-0.24, 0.76, -0.23], 0.08);
  add(group, new THREE.SphereGeometry(0.83, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), m.brickLight,
    [-0.24, 1.18, -0.28], undefined, [1.04, 0.95, 0.98]);
  box(group, [1.03, 0.66, 0.08], m.stoneDark, [-0.24, 0.72, 0.46], 0.04);
  add(group, archShape(0.76, 0.48), m.dark, [-0.24, 0.43, 0.51]);
  sphere(group, 0.16, m.fireGlow, [-0.24, 0.53, 0.54], [1.15, 0.82, 0.25], 8);
  cylinder(group, 0.18, 0.22, 0.7, m.brickDark, [0.35, 1.73, -0.44], 7);
  box(group, [0.49, 0.09, 0.46], m.brickLight, [0.35, 2.09, -0.44], 0.03);
  for (const y of [1.58, 1.83]) box(group, [0.42, 0.04, 0.4], m.brick, [0.35, y, -0.44], 0.012);
  tileRoof(group, m, [-0.24, 1.94, -0.25], 1.95, 1.6, m.roof);
  addLogPile(group, m, -0.88, 0.86, 6);

  box(group, [1.2, 0.14, 0.76], m.woodDark, [0.78, 0.51, 0.2], 0.04);
  box(group, [1.13, 0.07, 0.7], m.woodLight, [0.78, 0.62, 0.2], 0.025);
  for (const x of [0.39, 0.66, 0.93, 1.2]) {
    box(group, [0.05, 0.48, 0.06], m.wood, [x, 0.31, 0.45], 0.015);
  }
  sphere(group, 0.29, m.dough, [0.78, 0.76, 0.16], [1, 0.24, 0.84], 10);
  cylinder(group, 0.25, 0.25, 0.035, m.cheese, [0.78, 0.79, 0.16], 12);
  for (const [x, z] of [[0.63, 0.1], [0.9, 0.22], [0.77, 0.04], [0.96, 0.04], [0.59, 0.25]]) {
    sphere(group, 0.055, m.tomato, [x, 0.82, z], [1, 0.44, 0.8], 7);
  }
  for (const x of [0.6, 0.91]) fruit(group, m, 'tomato', [x, 0.4, 0.72], 0.12);
  crate(group, m, [1.04, 0.35, 0.75], [0.5, 0.38, 0.44]);
  box(group, [0.5, 0.09, 0.42], m.woodDark, [1.03, 0.49, -0.78], 0.025);
  box(group, [0.46, 0.06, 0.38], m.woodLight, [1.03, 0.57, -0.78], 0.02);
  const peel = cylinder(group, 0.025, 0.025, 0.86, m.woodDark, [0.98, 0.86, 0.67], 6, [0, 0, 0.62]);
  add(group, new THREE.CircleGeometry(0.18, 9), m.woodLight, [0.73, 0.6, 0.73], [-0.15, 0, 0]);
  const input = anchor(group, [1.04, 0.69, 0.75]);
  const output = anchor(group, [1.03, 0.59, -0.78]);
  const lamp = statusJewel(group, m, [1.02, 1.05, -0.55]);
  peel.castShadow = true;
  return { input, output, lamp, badgeY: 3.45 };
}

export function createProductionBuildModel(group, id) {
  const m = {
    sand: material(0xdcb976), grass: material(0x69c843), leaf: material(0x329544),
    leafBright: material(0x69c849), wood: material(0xa86a35), woodLight: material(0xd59a54),
    woodDark: material(0x744629), rope: material(0x90704d), red: material(0xe94131),
    redDark: material(0xb92f27), roof: material(0xe94332), roofLight: material(0xff6a42),
    roofDark: material(0xc52e28), gold: material(0xe5a52c, 0.42), brass: material(0xb7822c, 0.42, 0.34),
    steel: material(0xb6c3c4, 0.34, 0.46), steelLight: material(0xe0e6e5, 0.28, 0.48),
    steelDark: material(0x586466, 0.42, 0.38), rivetSteel: material(0x778686, 0.3, 0.5),
    darkMetal: material(0x333f40, 0.45, 0.32), glass: new THREE.MeshPhysicalMaterial({
      color: 0xdffbff, transparent: true, opacity: 0.28, roughness: 0.13, metalness: 0.08, side: THREE.DoubleSide,
    }),
    kettle: material(0xd93c2b, 0.5), paste: material(0xb93527), fireGlow: new THREE.MeshBasicMaterial({ color: 0xff8132 }),
    brick: material(0x9b4936), brickLight: material(0xd39d7f), brickDark: material(0x733e34),
    stone: material(0xc2b197), stoneLight: material(0xe2d3b7), stoneDark: material(0x70645b),
    orange: material(0xff951e), tomato: material(0xe84731), corn: material(0xffd355),
    goldLight: material(0xffcd50), juice: material(0xffaa25), popcorn: material(0xfff0ae),
    woodGrain: material(0xc18a4b), gear: material(0x424b4c, 0.45, 0.34), sack: material(0xc9a77d),
    sackLight: material(0xe1c69c), wheat: material(0xf1c24b), wheatLight: material(0xffdc74),
    log: material(0x83502f), logCut: material(0xc18a51), bread: material(0xb96c36),
    breadLight: material(0xf4d398), tartCrust: material(0xd59842), tart: material(0xf4b538),
    cream: material(0xffe8b4), red: material(0xe94131), paperRed: material(0xd94532),
    patty: material(0x633920), cheese: material(0xffca45), dough: material(0xf0ddad),
    signal: material(0x4dcc65),
  };

  const builders = {
    paste: tomatoPaste,
    juice: citrusPress,
    popcorn: popcornPopper,
    feed: feedMill,
    flourMill,
    bakery: breadOven,
    orangeTartKitchen,
    burgerKitchen: burgerGrill,
    pizzaKitchen: pizzaOven,
  };
  const builder = builders[id];
  const result = builder ? builder(group, m) : { input: anchor(group, [-1, 0.6, 0.5]), output: anchor(group, [1, 0.6, 0.5]), badgeY: 3 };

  return { ...result, trayMaterial: m.woodLight };
}


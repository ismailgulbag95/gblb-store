import * as THREE from 'three';
import { createProductionAtmosphere } from './ProductionAtmosphere.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const material = (color, roughness = 0.76, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });

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
    Math.min(radius, size[0] * 0.24, size[1] * 0.24, size[2] * 0.24));
  return add(parent, geometry, surface, position, rotation);
}

function cylinder(parent, radiusTop, radiusBottom, height, surface, position, segments = 12, rotation = undefined, openEnded = false) {
  return add(parent, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, openEnded), surface, position, rotation);
}

function sphere(parent, radius, surface, position, scale = [1, 1, 1], segments = 10) {
  return add(parent, new THREE.SphereGeometry(radius, segments, Math.max(6, segments - 2)), surface, position, undefined, scale);
}

function tube(parent, points, radius, surface, segments = 14) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return add(parent, new THREE.TubeGeometry(curve, segments, radius, 7, false), surface, [0, 0, 0]);
}

function anchor(group, position) {
  const display = new THREE.Group();
  display.position.set(...position);
  group.add(display);
  return display;
}

function baseIsland(group, m, width = 3.1, depth = 2.8) {
  box(group, [width, 0.2, depth], m.sand, [0, 0.1, 0], 0.1);
  box(group, [width - 0.12, 0.09, depth - 0.12], m.soil, [0, 0.24, 0], 0.07);
  for (const [x, z] of [[-width * 0.38, depth * 0.36], [width * 0.36, depth * 0.37], [-width * 0.4, -depth * 0.35], [width * 0.39, -depth * 0.36]]) {
    const paver = add(group, new THREE.DodecahedronGeometry(0.15, 0), m.stoneLight,
      [x, 0.3, z], undefined, [1.4, 0.3, 0.8]);
    paver.rotation.y = x + z;
  }
  for (const [x, z] of [[-width * 0.46, 0.04], [width * 0.44, -0.06]]) {
    for (let blade = 0; blade < 3; blade += 1) {
      const leaf = sphere(group, 0.08, blade % 2 ? m.leafBright : m.leaf,
        [x + (blade - 1) * 0.055, 0.34 + blade * 0.04, z], [0.5, 1.3, 0.4], 7);
      leaf.rotation.z = (blade - 1) * 0.42;
      leaf.castShadow = false;
    }
  }
}

function crate(group, m, position, size, wood = m.wood, plank = m.woodLight) {
  const [w, h, d] = size;
  const [x, y, z] = position;
  box(group, [w, 0.08, d], wood, [x, y + 0.04, z], 0.02);
  for (const side of [-1, 1]) {
    for (let row = 0; row < 3; row += 1) {
      const boardY = y + 0.12 + row * (h - 0.14) / 3;
      box(group, [w, (h - 0.15) / 3 - 0.015, 0.05], row % 2 ? plank : wood,
        [x, boardY, z + side * (d / 2 - 0.028)], 0.012);
      box(group, [0.05, (h - 0.15) / 3 - 0.015, d - 0.07], wood,
        [x + side * (w / 2 - 0.028), boardY, z], 0.012);
    }
  }
  for (const dx of [-1, 1]) for (const dz of [-1, 1]) {
    box(group, [0.07, h + 0.02, 0.07], m.woodDark, [x + dx * (w / 2 - 0.04), y + h / 2, z + dz * (d / 2 - 0.04)], 0.015);
  }
  return anchor(group, [x, y + h - 0.04, z]);
}

function fruit(group, m, type, position, radius = 0.13) {
  const color = type === 'orange' ? m.orange : type === 'corn' ? m.corn : type === 'tomato' ? m.tomato : m.leaf;
  const body = sphere(group, radius, color, position, [1, 0.94, 0.94], 9);
  if (type === 'orange') {
    cylinder(group, 0.016, 0.02, 0.06, m.woodDark, [position[0], position[1] + radius * 0.8, position[2]], 5);
    sphere(group, 0.05, m.leafBright, [position[0] + 0.04, position[1] + radius * 0.92, position[2]], [1.2, 0.4, 0.55], 6);
  } else if (type === 'tomato') {
    sphere(group, 0.045, m.leafBright, [position[0], position[1] + radius * 0.9, position[2]], [1.4, 0.35, 1.4], 6);
  }
  return body;
}

function orangeSlice(group, m, position, rotation = [0, 0, 0]) {
  const root = new THREE.Group();
  root.position.set(...position);
  root.rotation.set(...rotation);
  cylinder(root, 0.14, 0.14, 0.04, m.orangeDark, [0, 0, 0], 12);
  cylinder(root, 0.13, 0.13, 0.042, m.white, [0, 0, 0], 12);
  cylinder(root, 0.115, 0.115, 0.044, m.orange, [0, 0, 0], 12);
  for (let s = 0; s < 6; s += 1) {
    const angle = (s * Math.PI) / 3;
    box(root, [0.012, 0.045, 0.22], m.white, [0, 0, 0], 0.005, [0, angle, 0]);
  }
  group.add(root);
  return root;
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

// -------------------------------------------------------------
// 1. SALÇA KAZANI (Tomato Paste Cooker)
// -------------------------------------------------------------
function tomatoPaste(group, m) {
  baseIsland(group, m, 3.15, 2.75);

  // Front access steps
  box(group, [0.72, 0.1, 0.46], m.stoneDark, [-0.16, 0.27, 0.84], 0.04);
  box(group, [0.62, 0.1, 0.36], m.stone, [-0.16, 0.37, 0.72], 0.03);

  // Main cooker boiler
  cylinder(group, 0.64, 0.68, 0.16, m.steelDark, [-0.16, 0.42, -0.08], 16);
  for (const angle of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
    box(group, [0.12, 0.32, 0.14], m.steelDark,
      [-0.16 + Math.cos(angle) * 0.62, 0.36, -0.08 + Math.sin(angle) * 0.62], 0.02, [0, angle, 0]);
  }
  cylinder(group, 0.62, 0.62, 0.96, m.kettle, [-0.16, 0.98, -0.08], 16);
  cylinder(group, 0.66, 0.66, 0.1, m.steel, [-0.16, 1.48, -0.08], 16);
  cylinder(group, 0.63, 0.63, 0.06, m.rivetSteel, [-0.16, 0.98, -0.08], 16);

  // White front badge with tomato motif
  box(group, [0.38, 0.38, 0.04], m.white, [-0.16, 0.98, 0.55], 0.03);
  sphere(group, 0.12, m.tomato, [-0.16, 0.98, 0.58], [1, 0.92, 0.5], 10);
  sphere(group, 0.04, m.leafBright, [-0.16, 1.1, 0.59], [1.3, 0.4, 0.5], 6);

  // Vat boiling paste surface
  cylinder(group, 0.58, 0.58, 0.02, m.paste, [-0.16, 1.5, -0.08], 16);

  // Dynamic animated boiling bubbles
  const bubbleList = [];
  const bubbleOffsets = [
    [-0.2, 0.15, 0.09], [0.18, 0.12, 0.11], [-0.08, -0.22, 0.08],
    [0.16, -0.16, 0.1], [-0.28, -0.06, 0.07], [0.02, 0.24, 0.09], [0, 0, 0.12],
  ];
  for (let i = 0; i < bubbleOffsets.length; i += 1) {
    const [dx, dz, r] = bubbleOffsets[i];
    const b = sphere(group, r, m.paste, [-0.16 + dx, 1.51, -0.08 + dz], [1, 0.65, 1], 8);
    bubbleList.push({ mesh: b, baseScale: 1, phase: i * 0.9, baseR: r });
  }

  // Side piping and pressure gauges
  tube(group, [[-0.78, 0.7, -0.08], [-0.88, 1.3, -0.08], [-0.88, 1.62, -0.08], [-0.62, 1.62, -0.08]], 0.05, m.red);
  tube(group, [[0.46, 0.7, -0.08], [0.58, 1.25, -0.08], [0.58, 1.55, -0.08], [0.34, 1.55, -0.08]], 0.045, m.red);
  // Dial gauge & needle
  cylinder(group, 0.09, 0.09, 0.05, m.steelLight, [-0.89, 1.45, -0.08], 10, [0, 0, Math.PI / 2]);
  cylinder(group, 0.08, 0.08, 0.02, m.white, [-0.92, 1.45, -0.08], 10, [0, 0, Math.PI / 2]);
  const needle = box(group, [0.015, 0.065, 0.015], m.redDark, [-0.93, 1.45, -0.08], 0.005);
  // Valve wheel
  cylinder(group, 0.08, 0.08, 0.03, m.brass, [0.59, 1.42, -0.08], 8, [0, 0, Math.PI / 2]);

  // Dispenser chute in front
  const chute = box(group, [0.22, 0.12, 0.28], m.steel, [-0.16, 0.72, 0.58], 0.02, [0.22, 0, 0]);
  const pasteDrip = sphere(group, 0.055, m.paste, [-0.16, 0.62, 0.72], [1, 1.4, 0.8], 8);

  // Left tomato crate (input)
  crate(group, m, [-0.98, 0.35, -0.65], [0.82, 0.58, 0.72]);
  for (const [x, z] of [[-1.22, -0.56], [-0.98, -0.52], [-0.76, -0.56], [-1.1, -0.74], [-0.86, -0.76]]) {
    fruit(group, m, 'tomato', [x, 0.94, z], 0.14);
  }

  // Right jar table (output)
  box(group, [0.85, 0.1, 0.76], m.woodDark, [0.92, 0.54, 0.24], 0.03);
  box(group, [0.8, 0.07, 0.7], m.woodLight, [0.92, 0.62, 0.24], 0.02);
  for (const [x, z] of [[0.72, 0.12], [0.94, 0.12], [1.16, 0.12], [0.83, 0.36], [1.05, 0.36]]) {
    cylinder(group, 0.075, 0.082, 0.22, m.glass, [x, 0.75, z], 8);
    cylinder(group, 0.068, 0.068, 0.12, m.paste, [x, 0.72, z], 8);
    cylinder(group, 0.072, 0.072, 0.03, m.gold, [x, 0.88, z], 8);
  }

  const input = anchor(group, [-0.98, 0.96, -0.65]);
  const output = anchor(group, [0.92, 0.64, 0.24]);
  const lamp = statusJewel(group, m, [0.28, 0.82, 0.92]);

  return {
    input, output, lamp, badgeY: 2.75,
    update(time, frameDelta, isWorking) {
      const speed = isWorking ? 6.5 : 1.8;
      for (const b of bubbleList) {
        const s = Math.sin(time * speed + b.phase);
        b.mesh.position.y = 1.5 + Math.max(0, s) * 0.045;
        b.mesh.scale.set(1 + s * 0.25, 0.8 + s * 0.4, 1 + s * 0.25);
      }
      needle.rotation.x = Math.sin(time * (isWorking ? 18 : 2)) * 0.4;
      pasteDrip.scale.setScalar(isWorking ? 1 + Math.sin(time * 8) * 0.3 : 0.8);
      chute.rotation.x = 0.22 + (isWorking ? Math.sin(time * 12) * 0.015 : 0);
    },
  };
}

// -------------------------------------------------------------
// 2. MEYVE SIKACAĞI (Juicer / Citrus Press)
// -------------------------------------------------------------
function citrusPress(group, m) {
  baseIsland(group, m, 3.1, 2.7);

  // Sturdy timber frame
  for (const x of [-0.58, 0.58]) {
    box(group, [0.14, 1.45, 0.14], m.woodDark, [x, 1.05, -0.15], 0.03);
  }
  box(group, [1.36, 0.14, 0.16], m.wood, [0, 1.76, -0.15], 0.035);

  // Central brass press tank
  cylinder(group, 0.45, 0.48, 0.14, m.brass, [0, 0.62, -0.15], 14);
  cylinder(group, 0.42, 0.42, 0.7, m.gold, [0, 1.04, -0.15], 14);
  cylinder(group, 0.44, 0.44, 0.08, m.brass, [0, 1.42, -0.15], 14);

  // Overhead lever & piston group
  const leverGroup = new THREE.Group();
  leverGroup.position.set(0, 1.78, -0.15);
  box(leverGroup, [0.98, 0.09, 0.11], m.wood, [0.46, 0, 0], 0.03);
  cylinder(leverGroup, 0.065, 0.07, 0.18, m.woodLight, [0.92, 0, 0], 8, [Math.PI / 2, 0, 0]);
  group.add(leverGroup);

  const piston = cylinder(group, 0.06, 0.06, 0.62, m.steel, [0, 1.52, -0.15], 10);
  cylinder(group, 0.36, 0.36, 0.08, m.steelDark, [0, 1.25, -0.15], 12);

  // Juice spout and pouring decanter
  tube(group, [[0.28, 0.85, -0.15], [0.48, 0.85, 0.02], [0.48, 0.68, 0.02]], 0.035, m.steel);
  cylinder(group, 0.14, 0.16, 0.3, m.glass, [0.48, 0.52, 0.02], 10);
  cylinder(group, 0.13, 0.13, 0.18, m.juice, [0.48, 0.48, 0.02], 10);
  const juiceStream = cylinder(group, 0.015, 0.018, 0.18, m.juice, [0.48, 0.67, 0.02], 6);

  // Left orange crate (input)
  crate(group, m, [-0.85, 0.35, -0.58], [0.86, 0.58, 0.78]);
  for (const [x, z] of [[-1.1, -0.48], [-0.86, -0.44], [-0.62, -0.48], [-0.98, -0.72], [-0.74, -0.72]]) {
    fruit(group, m, 'orange', [x, 0.94, z], 0.14);
  }

  // Front cut orange slices on grass
  orangeSlice(group, m, [-0.44, 0.32, 0.72], [-0.2, 0.3, 0.1]);
  orangeSlice(group, m, [-0.12, 0.32, 0.82], [0.1, -0.4, 0.25]);

  // Right juice bottles on table (output)
  box(group, [0.78, 0.1, 0.68], m.woodDark, [0.92, 0.52, 0.25], 0.03);
  box(group, [0.72, 0.06, 0.62], m.woodLight, [0.92, 0.6, 0.25], 0.02);
  for (const [x, z] of [[0.76, 0.15], [0.96, 0.15], [1.14, 0.15], [0.86, 0.38], [1.06, 0.38]]) {
    cylinder(group, 0.065, 0.07, 0.25, m.glass, [x, 0.74, z], 8);
    cylinder(group, 0.06, 0.06, 0.16, m.juice, [x, 0.7, z], 8);
    cylinder(group, 0.04, 0.04, 0.04, m.gold, [x, 0.88, z], 8);
  }

  const input = anchor(group, [-0.85, 0.94, -0.58]);
  const output = anchor(group, [0.92, 0.62, 0.25]);
  const lamp = statusJewel(group, m, [0.86, 0.72, -0.35]);

  return {
    input, output, lamp, badgeY: 3.05,
    update(time, frameDelta, isWorking) {
      if (isWorking) {
        const pressCycle = Math.sin(time * 4);
        leverGroup.rotation.z = -0.15 + pressCycle * 0.22;
        piston.position.y = 1.52 - Math.max(0, -pressCycle) * 0.18;
        juiceStream.scale.y = 1 + Math.sin(time * 12) * 0.3;
        juiceStream.visible = true;
      } else {
        leverGroup.rotation.z = -0.06;
        piston.position.y = 1.52;
        juiceStream.visible = false;
      }
    },
  };
}

// -------------------------------------------------------------
// 3. PATLAMIŞ MISIR MAKİNESİ (Popcorn Machine)
// -------------------------------------------------------------
function popcornPopper(group, m) {
  baseIsland(group, m, 3.15, 2.8);

  // Vintage red carnival cart body
  box(group, [1.42, 0.76, 1.08], m.red, [-0.12, 0.68, -0.1], 0.08);
  box(group, [1.46, 0.08, 1.12], m.gold, [-0.12, 1.08, -0.1], 0.03);

  // Vintage spoke wheel on the right
  const wheelHub = cylinder(group, 0.35, 0.35, 0.1, m.redDark, [0.46, 0.52, 0.54], 14, [Math.PI / 2, 0, 0]);
  cylinder(group, 0.33, 0.33, 0.11, m.gold, [0.46, 0.52, 0.54], 14, [Math.PI / 2, 0, 0]);
  cylinder(group, 0.12, 0.12, 0.13, m.brass, [0.46, 0.52, 0.54], 10, [Math.PI / 2, 0, 0]);
  for (let spoke = 0; spoke < 8; spoke += 1) {
    const angle = (spoke * Math.PI) / 4;
    box(group, [0.035, 0.62, 0.035], m.woodDark, [0.46, 0.52, 0.54], 0.01, [0, 0, angle]);
  }

  // Clear glass showcase cabinet
  box(group, [1.16, 0.06, 0.88], m.steelLight, [-0.12, 1.14, -0.1], 0.02);
  for (const x of [-0.66, 0.42]) for (const z of [-0.5, 0.3]) {
    cylinder(group, 0.035, 0.035, 0.95, m.brass, [x, 1.62, z], 8);
  }
  // Glass panels
  for (const z of [-0.49, 0.29]) box(group, [1.08, 0.86, 0.02], m.glass, [-0.12, 1.62, z], 0.01);
  for (const x of [-0.65, 0.41]) box(group, [0.02, 0.86, 0.78], m.glass, [x, 1.62, -0.1], 0.01);

  // Suspended brass popping kettle inside
  const kettle = cylinder(group, 0.28, 0.32, 0.28, m.brass, [-0.12, 1.68, -0.1], 10);
  cylinder(group, 0.32, 0.32, 0.04, m.gold, [-0.12, 1.83, -0.1], 10);

  // Fluffy popcorn base bed
  box(group, [1.04, 0.14, 0.74], m.popcorn, [-0.12, 1.22, -0.1], 0.06);

  // Jumping animated popcorn kernels
  const poppers = [];
  for (let i = 0; i < 9; i += 1) {
    const p = add(group, new THREE.DodecahedronGeometry(0.065, 0), i % 2 ? m.popcornLight : m.popcorn,
      [-0.45 + (i % 3) * 0.32, 1.32, -0.35 + Math.floor(i / 3) * 0.25]);
    poppers.push({ mesh: p, baseX: p.position.x, baseZ: p.position.z, seed: i * 1.37 });
  }

  // Striped awning canopy roof
  const canopyY = 2.15;
  box(group, [1.44, 0.1, 1.15], m.redDark, [-0.12, canopyY, -0.1], 0.04);
  for (let stripe = 0; stripe < 8; stripe += 1) {
    const sx = -0.7 + stripe * 0.175;
    box(group, [0.175, 0.12, 1.2], stripe % 2 === 0 ? m.red : m.white, [-0.12 + sx + 0.087, canopyY + 0.08, -0.1], 0.03);
  }

  // Dispenser chute & popcorn buckets (output)
  box(group, [0.24, 0.1, 0.34], m.steel, [0.44, 1.15, 0.26], 0.02, [-0.35, 0, 0]);
  box(group, [0.65, 0.1, 0.55], m.woodDark, [0.88, 0.62, 0.52], 0.03);
  box(group, [0.6, 0.06, 0.5], m.woodLight, [0.88, 0.7, 0.52], 0.02);
  // Red & white striped buckets
  for (const [bx, bz] of [[0.74, 0.42], [0.98, 0.42], [0.86, 0.62]]) {
    cylinder(group, 0.11, 0.08, 0.22, m.red, [bx, 0.82, bz], 10);
    cylinder(group, 0.112, 0.082, 0.04, m.white, [bx, 0.86, bz], 10);
    add(group, new THREE.DodecahedronGeometry(0.12, 0), m.popcorn, [bx, 0.95, bz]);
  }

  // Left corn crate (input)
  crate(group, m, [-0.92, 0.35, 0.28], [0.72, 0.54, 0.72]);
  for (const [x, z] of [[-1.1, 0.22], [-0.88, 0.25], [-0.68, 0.22], [-0.98, 0.42], [-0.78, 0.42]]) {
    fruit(group, m, 'corn', [x, 0.88, z], 0.12);
  }

  const input = anchor(group, [-0.92, 0.88, 0.28]);
  const output = anchor(group, [0.88, 0.72, 0.52]);
  const lamp = statusJewel(group, m, [0.76, 0.68, -0.48]);

  return {
    input, output, lamp, badgeY: 2.85,
    update(time, frameDelta, isWorking) {
      if (isWorking) {
        kettle.rotation.z = Math.sin(time * 15) * 0.06;
        for (const p of poppers) {
          const jump = Math.abs(Math.sin(time * 9 + p.seed));
          p.mesh.position.y = 1.32 + jump * 0.38;
          p.mesh.rotation.x = time * 8 + p.seed;
          p.mesh.rotation.y = time * 6 + p.seed;
        }
      } else {
        kettle.rotation.z = 0;
        for (const p of poppers) {
          p.mesh.position.y = 1.32;
        }
      }
    },
  };
}

// -------------------------------------------------------------
// 4. YEM DEĞİRMENİ (Feed Mill)
// -------------------------------------------------------------
function feedMill(group, m) {
  baseIsland(group, m, 3.12, 2.75);

  // Timber post frame and fence rails
  for (const x of [-0.76, 0.56]) for (const z of [-0.54, 0.38]) {
    box(group, [0.15, 1.45, 0.15], m.woodDark, [x, 1.0, z], 0.03);
  }
  for (const z of [-0.54, 0.38]) {
    box(group, [1.4, 0.08, 0.06], m.wood, [-0.1, 1.25, z], 0.02);
    box(group, [1.4, 0.08, 0.06], m.wood, [-0.1, 0.75, z], 0.02);
  }
  box(group, [1.55, 0.14, 1.12], m.wood, [-0.1, 0.48, -0.08], 0.04);

  // Bright yellow feed hopper on top
  const hopper = cylinder(group, 0.56, 0.22, 0.75, m.goldLight, [-0.1, 1.88, -0.08], 10);
  cylinder(group, 0.58, 0.58, 0.08, m.gold, [-0.1, 2.26, -0.08], 10);
  // Feed corn kernels inside hopper
  cylinder(group, 0.5, 0.5, 0.04, m.corn, [-0.1, 2.22, -0.08], 10);

  // Central milling crusher drum
  const drum = cylinder(group, 0.4, 0.4, 0.85, m.steelDark, [-0.1, 1.12, -0.08], 12, [0, 0, Math.PI / 2]);
  for (let ridge = 0; ridge < 8; ridge += 1) {
    const angle = (ridge * Math.PI) / 4;
    box(group, [0.82, 0.05, 0.08], m.steel,
      [-0.1, 1.12 + Math.cos(angle) * 0.4, -0.08 + Math.sin(angle) * 0.4], 0.015, [angle, 0, 0]);
  }

  // Side yellow motor gearbox & gear wheel
  box(group, [0.28, 0.38, 0.38], m.goldLight, [0.55, 1.12, -0.08], 0.04);
  const gear = cylinder(group, 0.22, 0.22, 0.08, m.darkMetal, [0.72, 1.12, -0.08], 10, [0, 0, Math.PI / 2]);
  for (let c = 0; c < 8; c += 1) {
    const a = (c * Math.PI) / 4;
    box(group, [0.06, 0.08, 0.08], m.gold,
      [0.72, 1.12 + Math.cos(a) * 0.22, -0.08 + Math.sin(a) * 0.22], 0.01, [a, 0, 0]);
  }

  // Downward chute & wooden feed trough (output)
  cylinder(group, 0.16, 0.24, 0.52, m.gold, [0.28, 0.72, 0.35], 8, [Math.PI / 3, 0, 0]);
  box(group, [0.88, 0.24, 0.52], m.woodDark, [0.45, 0.45, 0.58], 0.03);
  box(group, [0.82, 0.18, 0.46], m.woodLight, [0.45, 0.48, 0.58], 0.02);
  // Feed pellets in trough
  const feedSurface = box(group, [0.76, 0.08, 0.4], m.goldLight, [0.45, 0.52, 0.58], 0.02);

  // Left burlap feed sacks (input)
  for (const [x, z] of [[-0.88, 0.48], [-1.15, 0.28]]) {
    sphere(group, 0.24, m.sack, [x, 0.62, z], [0.85, 1.25, 0.85], 8);
    cylinder(group, 0.16, 0.18, 0.09, m.sackLight, [x, 0.88, z], 8);
    box(group, [0.24, 0.035, 0.04], m.rope, [x, 0.94, z], 0.008);
  }

  const input = anchor(group, [-0.1, 2.3, -0.08]);
  const output = anchor(group, [0.55, 0.62, 0.58]);
  const lamp = statusJewel(group, m, [-0.84, 1.25, -0.52]);

  return {
    input, output, lamp, badgeY: 3.15,
    update(time, frameDelta, isWorking) {
      if (isWorking) {
        drum.rotation.x += frameDelta * 7;
        gear.rotation.x += frameDelta * 14;
        hopper.position.x = -0.1 + Math.sin(time * 30) * 0.006;
        feedSurface.scale.y = 1 + Math.sin(time * 12) * 0.08;
      } else {
        hopper.position.x = -0.1;
        feedSurface.scale.y = 1;
      }
    },
  };
}

// -------------------------------------------------------------
// 5. TAŞ FIRIN (Bakery Bread Oven)
// -------------------------------------------------------------
function breadOven(group, m) {
  baseIsland(group, m, 3.15, 2.85);

  // Stone path leading to hearth
  for (const [x, z] of [[-0.2, 0.78], [0.15, 0.82], [-0.05, 1.02]]) {
    add(group, new THREE.DodecahedronGeometry(0.18, 0), m.stoneLight, [x, 0.28, z], undefined, [1.3, 0.25, 0.9]);
  }

  // Rounded masonry stone dome oven
  box(group, [1.55, 0.72, 1.3], m.stoneDark, [-0.2, 0.68, -0.2], 0.12);
  sphere(group, 0.85, m.stone, [-0.2, 1.15, -0.2], [1.06, 0.88, 1.02], 14);

  // Square stone chimney with layered cap
  box(group, [0.38, 0.85, 0.38], m.stoneDark, [-0.2, 2.05, -0.2], 0.03);
  box(group, [0.46, 0.1, 0.46], m.stoneLight, [-0.2, 2.48, -0.2], 0.02);

  // Arched hearth opening
  box(group, [0.86, 0.64, 0.1], m.stoneLight, [-0.2, 0.76, 0.46], 0.05);
  box(group, [0.62, 0.46, 0.25], m.brickDark, [-0.2, 0.64, 0.35], 0.04);
  // Glowing fire inside hearth
  const firebed = sphere(group, 0.16, m.fireGlow, [-0.2, 0.58, 0.42], [1.2, 0.8, 0.4], 8);
  firebed.material.emissive = new THREE.Color(0xff6600);
  firebed.material.emissiveIntensity = 0.8;

  // Firewood logs under oven
  addLogPile(group, m, -0.2, 0.15, 4);

  // Baker's peel sliding into the oven
  const peelGroup = new THREE.Group();
  peelGroup.position.set(-0.2, 0.66, 0.45);
  cylinder(peelGroup, 0.022, 0.022, 1.1, m.woodDark, [0, 0, 0.45], 6, [Math.PI / 2, 0, 0]);
  box(peelGroup, [0.38, 0.03, 0.34], m.woodLight, [0, 0, -0.05], 0.015);
  // Freshly baked loaves on peel
  for (const bx of [-0.09, 0.09]) {
    sphere(peelGroup, 0.08, m.bread, [bx, 0.05, -0.05], [1.3, 0.85, 0.95], 8);
    box(peelGroup, [0.015, 0.015, 0.09], m.breadLight, [bx, 0.09, -0.05], 0.005);
  }
  group.add(peelGroup);

  // Left bread cooling rack (output)
  for (const x of [-1.15, -0.72]) for (const z of [-0.45, 0.25]) {
    box(group, [0.08, 1.35, 0.08], m.woodDark, [x, 0.95, z], 0.02);
  }
  for (const y of [0.55, 0.88, 1.22]) {
    box(group, [0.52, 0.05, 0.72], m.wood, [-0.94, y, -0.1], 0.02);
    // Artisan loaves on rack
    for (const [lx, lz] of [[-1.04, -0.25], [-0.84, -0.25], [-1.04, 0.05], [-0.84, 0.05]]) {
      sphere(group, 0.09, m.bread, [lx, y + 0.09, lz], [1.3, 0.8, 0.9], 8);
      box(group, [0.02, 0.015, 0.08], m.breadLight, [lx, y + 0.14, lz], 0.006);
    }
  }

  // Front dough prep table (input)
  box(group, [0.82, 0.1, 0.52], m.woodDark, [0.65, 0.48, 0.45], 0.03);
  box(group, [0.76, 0.06, 0.46], m.woodLight, [0.65, 0.56, 0.45], 0.02);
  for (const [dx, dz] of [[0.45, 0.38], [0.65, 0.38], [0.85, 0.38], [0.55, 0.52], [0.75, 0.52]]) {
    sphere(group, 0.065, m.dough, [dx, 0.63, dz], [1.1, 0.75, 1.1], 8);
  }

  // Right flour sack
  sphere(group, 0.22, m.sack, [0.95, 0.58, -0.35], [0.9, 1.25, 0.9], 8);
  cylinder(group, 0.15, 0.16, 0.08, m.sackLight, [0.95, 0.82, -0.35], 8);

  const input = anchor(group, [0.65, 0.68, 0.45]);
  const output = anchor(group, [-0.94, 0.95, -0.1]);
  const lamp = statusJewel(group, m, [0.82, 0.95, 0.45]);

  return {
    input, output, lamp, badgeY: 3.35,
    update(time, frameDelta, isWorking) {
      const flicker = Math.sin(time * 8) * 0.2 + Math.sin(time * 23) * 0.1;
      firebed.material.emissiveIntensity = isWorking ? 0.9 + flicker : 0.4 + flicker * 0.3;
      peelGroup.position.z = 0.45 + (isWorking ? Math.sin(time * 2) * 0.12 : 0);
    },
  };
}

// -------------------------------------------------------------
// 6. UN DEĞİRMENİ (Flour Mill)
// -------------------------------------------------------------
function flourMill(group, m) {
  baseIsland(group, m, 3.1, 2.7);

  // Heavy timber A-frame and gantry
  for (const x of [-0.68, 0.58]) {
    box(group, [0.15, 1.6, 0.15], m.woodDark, [x, 1.05, -0.15], 0.03);
    box(group, [0.16, 0.16, 1.18], m.wood, [x, 1.55, -0.15], 0.025);
  }
  box(group, [1.46, 0.14, 1.34], m.wood, [-0.05, 0.48, -0.1], 0.04);

  // Square wooden hopper box on top
  crate(group, m, [-0.05, 1.82, -0.15], [0.98, 0.58, 0.88], m.woodDark, m.woodLight);
  // Golden wheat grains in hopper
  for (let g = 0; g < 9; g += 1) {
    sphere(group, 0.05, m.wheat,
      [-0.3 + (g % 3) * 0.25, 2.44, -0.35 + Math.floor(g / 3) * 0.22], [0.8, 1.25, 0.8], 6);
  }

  // Paired circular stone millstones
  cylinder(group, 0.56, 0.58, 0.22, m.stoneDark, [-0.05, 0.78, -0.1], 16);
  const topStone = cylinder(group, 0.52, 0.52, 0.2, m.stoneLight, [-0.05, 0.99, -0.1], 16);
  cylinder(group, 0.12, 0.12, 0.48, m.darkMetal, [-0.05, 1.25, -0.1], 10);

  // Side drive shaft & wooden hand crank
  const crank = cylinder(group, 0.18, 0.18, 0.1, m.steelDark, [0.55, 1.02, -0.1], 8, [0, 0, Math.PI / 2]);
  box(crank, [0.06, 0.45, 0.06], m.woodLight, [0, 0.22, 0], 0.02);

  // Angled white flour chute & collection box (output)
  box(group, [0.22, 0.12, 0.48], m.white, [0.28, 0.68, 0.35], 0.02, [-0.4, 0, 0]);
  box(group, [0.72, 0.22, 0.52], m.woodDark, [0.55, 0.42, 0.58], 0.03);
  box(group, [0.66, 0.16, 0.46], m.woodLight, [0.55, 0.45, 0.58], 0.02);
  // Flour heap in collection box
  sphere(group, 0.24, m.flour, [0.55, 0.55, 0.58], [1.25, 0.35, 0.9], 10);

  // Left wheat crate with standing stalks (input)
  crate(group, m, [-0.92, 0.35, 0.15], [0.65, 0.54, 0.68]);
  for (let s = 0; s < 7; s += 1) {
    const sx = -1.05 + (s % 3) * 0.14;
    const sz = 0.02 + Math.floor(s / 3) * 0.15;
    cylinder(group, 0.015, 0.015, 0.52, m.wheat, [sx, 1.08, sz], 6);
    sphere(group, 0.045, m.wheatLight, [sx, 1.34, sz], [0.8, 1.8, 0.8], 6);
  }

  // Right flour sacks
  for (const [fx, fz] of [[0.92, -0.35], [1.14, 0.05]]) {
    sphere(group, 0.22, m.sack, [fx, 0.58, fz], [0.9, 1.25, 0.9], 8);
    cylinder(group, 0.14, 0.16, 0.08, m.sackLight, [fx, 0.82, fz], 8);
  }

  const input = anchor(group, [-0.05, 2.4, -0.15]);
  const output = anchor(group, [0.55, 0.58, 0.58]);
  const lamp = statusJewel(group, m, [0.94, 0.96, -0.55]);

  return {
    input, output, lamp, badgeY: 3.15,
    update(time, frameDelta, isWorking) {
      if (isWorking) {
        topStone.rotation.y += frameDelta * 3.8;
        crank.rotation.x += frameDelta * 3.8;
      }
    },
  };
}

// -------------------------------------------------------------
// 7. PASTANE TEZGÂHI (Orange Tart / Pastry Showcase)
// -------------------------------------------------------------
function orangeTartKitchen(group, m) {
  baseIsland(group, m, 3.15, 2.8);

  // Elegant wooden counter base with brass trim
  box(group, [1.58, 0.68, 1.15], m.woodDark, [-0.08, 0.58, -0.05], 0.06);
  box(group, [1.64, 0.08, 1.22], m.woodLight, [-0.08, 0.94, -0.05], 0.03);

  // Modern angled glass bakery showcase counter
  const showcaseGroup = new THREE.Group();
  showcaseGroup.position.set(-0.08, 0.98, -0.05);
  // Corner brass posts
  for (const x of [-0.72, 0.72]) for (const z of [-0.48, 0.48]) {
    cylinder(showcaseGroup, 0.025, 0.025, 0.72, m.brass, [x, 0.36, z], 8);
  }
  // Glass panels
  box(showcaseGroup, [1.44, 0.68, 0.02], m.glass, [0, 0.36, 0.47], 0.01);
  box(showcaseGroup, [1.44, 0.02, 0.96], m.glass, [0, 0.72, 0], 0.01);
  for (const x of [-0.71, 0.71]) box(showcaseGroup, [0.02, 0.68, 0.94], m.glass, [x, 0.36, 0], 0.01);

  // 3 Display shelves inside glass
  for (const y of [0.18, 0.42]) {
    box(showcaseGroup, [1.38, 0.025, 0.88], m.glass, [0, y, 0], 0.01);
  }

  // Top Shelf: Cupcakes with frosting swirl & chocolate
  for (let c = 0; c < 5; c += 1) {
    const cx = -0.52 + c * 0.26;
    cylinder(showcaseGroup, 0.06, 0.045, 0.07, m.breadLight, [cx, 0.48, -0.15], 8);
    sphere(showcaseGroup, 0.055, c % 2 === 0 ? m.cupcakeFrostingPink : m.cupcakeFrosting, [cx, 0.53, -0.15], [1, 1.1, 1], 8);
  }

  // Middle Shelf: Glazed ring donuts
  for (let d = 0; d < 4; d += 1) {
    const dx = -0.42 + d * 0.28;
    add(showcaseGroup, new THREE.TorusGeometry(0.065, 0.03, 8, 16), d % 2 === 0 ? m.donutPink : m.donutChoc,
      [dx, 0.24, 0.05], [Math.PI / 2, 0, 0]);
  }

  // Bottom Shelf: Flaky golden croissants & orange fruit tarts
  for (let cr = 0; cr < 3; cr += 1) {
    const rx = -0.42 + cr * 0.32;
    add(showcaseGroup, new THREE.TorusGeometry(0.08, 0.035, 6, 12, Math.PI * 0.9), m.bread,
      [rx, 0.06, 0.2], [Math.PI / 2, 0, 0.3]);
  }
  // Signature Orange Tart
  const tartTurnTable = new THREE.Group();
  tartTurnTable.position.set(0.38, 0.06, 0.15);
  cylinder(tartTurnTable, 0.14, 0.15, 0.05, m.tartCrust, [0, 0.02, 0], 12);
  cylinder(tartTurnTable, 0.12, 0.12, 0.02, m.tart, [0, 0.05, 0], 12);
  for (let s = 0; s < 5; s += 1) {
    const a = (s * Math.PI * 2) / 5;
    sphere(tartTurnTable, 0.03, m.orange, [Math.cos(a) * 0.07, 0.065, Math.sin(a) * 0.07], [1, 0.5, 1], 6);
  }
  showcaseGroup.add(tartTurnTable);
  group.add(showcaseGroup);

  // Top chalkboard menu & potted plant
  box(group, [0.38, 0.28, 0.03], m.woodDark, [-0.45, 1.86, -0.05], 0.02, [-0.15, 0, 0]);
  box(group, [0.32, 0.22, 0.015], m.chalkboard, [-0.45, 1.86, -0.04], 0.01, [-0.15, 0, 0]);
  cylinder(group, 0.07, 0.05, 0.12, m.brick, [0.45, 1.76, -0.05], 8);
  sphere(group, 0.08, m.leafBright, [0.45, 1.86, -0.05], [1.1, 1.2, 1.1], 8);

  // Left stacked bakery pastry boxes
  for (let b = 0; b < 3; b += 1) {
    box(group, [0.42, 0.12, 0.42], m.cream, [-0.98, 0.42 + b * 0.13, 0.35], 0.02);
    box(group, [0.43, 0.02, 0.04], m.red, [-0.98, 0.48 + b * 0.13, 0.35], 0.01);
  }

  const input = anchor(group, [-0.92, 0.85, -0.05]);
  const output = anchor(group, [0.95, 0.72, 0.35]);
  const lamp = statusJewel(group, m, [1.02, 0.85, -0.38]);

  return {
    input, output, lamp, badgeY: 3.2,
    update(time, frameDelta, isWorking) {
      tartTurnTable.rotation.y += frameDelta * (isWorking ? 1.8 : 0.6);
    },
  };
}

// -------------------------------------------------------------
// 8. BURGER MUTFAĞI (Burger Kitchen / Grill)
// -------------------------------------------------------------
function burgerGrill(group, m) {
  baseIsland(group, m, 3.15, 2.8);

  // Professional stainless steel & red canopy kitchen
  box(group, [1.45, 0.88, 1.05], m.steel, [-0.18, 0.74, -0.1], 0.08);

  // Red & white striped front counter facade with burger logo medallion
  box(group, [1.25, 0.65, 0.04], m.woodDark, [-0.18, 0.58, 0.44], 0.03);
  for (let stripe = 0; stripe < 7; stripe += 1) {
    const sx = -0.54 + stripe * 0.18;
    box(group, [0.18, 0.63, 0.02], stripe % 2 === 0 ? m.red : m.white, [-0.18 + sx + 0.09, 0.58, 0.47], 0.01);
  }
  // Burger medallion on front
  cylinder(group, 0.16, 0.16, 0.03, m.gold, [-0.18, 0.58, 0.49], 12, [Math.PI / 2, 0, 0]);
  sphere(group, 0.08, m.bread, [-0.18, 0.58, 0.51], [1.3, 0.7, 0.5], 8);

  // Overhead red exhaust range hood with chimney flue
  box(group, [1.56, 0.22, 1.15], m.red, [-0.18, 2.25, -0.38], 0.05);
  box(group, [1.35, 0.08, 0.95], m.redDark, [-0.18, 2.12, -0.38], 0.03);
  cylinder(group, 0.18, 0.2, 0.48, m.steelDark, [-0.18, 2.58, -0.38], 8);
  cylinder(group, 0.24, 0.24, 0.06, m.steel, [-0.18, 2.82, -0.38], 8);

  // Central heavy iron flat-top grill
  box(group, [0.86, 0.08, 0.62], m.darkMetal, [-0.18, 1.22, -0.05], 0.02);

  // 4 Sizzling burger patties on grill
  const pattyList = [];
  const pattyPositions = [[-0.42, 0.08], [-0.18, 0.08], [0.06, 0.08], [-0.3, -0.15]];
  for (let i = 0; i < pattyPositions.length; i += 1) {
    const [px, pz] = pattyPositions[i];
    const p = cylinder(group, 0.12, 0.12, 0.045, m.patty, [-0.18 + px, 1.28, -0.05 + pz], 10);
    if (i % 2 === 1) cylinder(group, 0.12, 0.12, 0.03, m.cheese, [-0.18 + px, 1.32, -0.05 + pz], 10);
    pattyList.push({ mesh: p, seed: i * 2.1 });
  }

  // Steam/smoke puffs rising from grill
  const smokePuffs = [];
  for (let s = 0; s < 3; s += 1) {
    const puff = sphere(group, 0.06, m.white, [-0.3 + s * 0.22, 1.45, -0.05], [1, 1, 1], 6);
    puff.material.transparent = true;
    puff.material.opacity = 0.4;
    smokePuffs.push(puff);
  }

  // Right side stainless condiment & topping station
  box(group, [0.65, 0.82, 0.95], m.steelLight, [0.88, 0.72, -0.05], 0.04);
  // Inset gastro pans with fresh ingredients
  for (const [ix, iz, col] of [[0.74, -0.25, m.lettuce], [0.98, -0.25, m.cheese], [0.86, 0.08, m.tomato]]) {
    box(group, [0.22, 0.08, 0.28], m.steelDark, [ix, 1.15, iz], 0.02);
    box(group, [0.18, 0.06, 0.24], col, [ix, 1.17, iz], 0.015);
  }
  // Ketchup and mustard squeeze bottles
  for (const [kx, kz, kCol] of [[0.76, 0.32, m.ketchup], [0.96, 0.32, m.mustard]]) {
    cylinder(group, 0.05, 0.06, 0.24, kCol, [kx, 1.26, kz], 8);
    cylinder(group, 0.02, 0.04, 0.08, m.white, [kx, 1.4, kz], 6);
  }

  // Front cutting board with gourmet hamburgers (output)
  box(group, [0.62, 0.05, 0.38], m.woodLight, [-0.18, 1.21, 0.46], 0.02);
  for (const bx of [-0.32, -0.04]) {
    cylinder(group, 0.12, 0.13, 0.04, m.bread, [bx, 1.25, 0.46], 10); // bottom bun
    cylinder(group, 0.13, 0.13, 0.02, m.lettuce, [bx, 1.28, 0.46], 8); // lettuce
    cylinder(group, 0.12, 0.12, 0.045, m.patty, [bx, 1.32, 0.46], 10); // patty
    cylinder(group, 0.125, 0.125, 0.02, m.cheese, [bx, 1.36, 0.46], 8); // cheese
    sphere(group, 0.125, m.bread, [bx, 1.41, 0.46], [1, 0.65, 1], 10); // top bun
  }

  // Left golden burger bun basket (input)
  box(group, [0.55, 0.18, 0.52], m.woodDark, [-1.02, 0.48, 0.15], 0.03);
  for (const [ux, uz] of [[-1.12, 0.05], [-0.92, 0.05], [-1.02, 0.25]]) {
    sphere(group, 0.09, m.bread, [ux, 0.62, uz], [1.1, 0.75, 1.1], 8);
  }

  const input = anchor(group, [-1.02, 0.85, 0.15]);
  const output = anchor(group, [-0.18, 1.35, 0.46]);
  const lamp = statusJewel(group, m, [0.88, 1.05, 0.45]);

  return {
    input, output, lamp, badgeY: 3.25,
    update(time, frameDelta, isWorking) {
      if (isWorking) {
        for (const p of pattyList) {
          p.mesh.scale.y = 1 + Math.sin(time * 26 + p.seed) * 0.14;
        }
        for (let s = 0; s < smokePuffs.length; s += 1) {
          const puff = smokePuffs[s];
          const progress = ((time * 1.6 + s * 0.33) % 1);
          puff.position.y = 1.35 + progress * 0.7;
          puff.scale.setScalar(0.5 + progress * 1.1);
          puff.material.opacity = Math.sin(progress * Math.PI) * 0.45;
          puff.visible = true;
        }
      } else {
        for (const p of pattyList) p.mesh.scale.y = 1;
        for (const puff of smokePuffs) puff.visible = false;
      }
    },
  };
}

// -------------------------------------------------------------
// 9. PİZZA FIRINI (Pizza Oven)
// -------------------------------------------------------------
function pizzaOven(group, m) {
  baseIsland(group, m, 3.15, 2.85);

  // Red terracotta brick domed pizza oven
  box(group, [1.58, 0.76, 1.35], m.brick, [-0.22, 0.72, -0.22], 0.08);
  sphere(group, 0.85, m.roof, [-0.22, 1.18, -0.22], [1.05, 0.94, 1.02], 16);

  // Black stovepipe chimney on top
  cylinder(group, 0.16, 0.18, 0.72, m.darkMetal, [-0.22, 2.12, -0.22], 10);
  cylinder(group, 0.22, 0.22, 0.08, m.steelDark, [-0.22, 2.52, -0.22], 10);

  // Arched portal opening with glowing fire hearth
  box(group, [0.88, 0.65, 0.1], m.brickDark, [-0.22, 0.74, 0.46], 0.04);
  box(group, [0.65, 0.48, 0.22], m.darkMetal, [-0.22, 0.65, 0.38], 0.04);
  const pizzaFire = sphere(group, 0.18, m.fireGlow, [-0.22, 0.6, 0.42], [1.2, 0.85, 0.35], 8);
  pizzaFire.material.emissive = new THREE.Color(0xff4400);
  pizzaFire.material.emissiveIntensity = 0.9;

  // Stacked firewood logs under oven
  addLogPile(group, m, -0.92, 0.78, 6);

  // Pizza peel with baking pizza entering the oven
  const peelGroup = new THREE.Group();
  peelGroup.position.set(-0.22, 0.66, 0.46);
  cylinder(peelGroup, 0.022, 0.022, 1.15, m.woodDark, [0, 0, 0.48], 6, [Math.PI / 2, 0, 0]);
  cylinder(peelGroup, 0.22, 0.22, 0.02, m.woodLight, [0, 0, -0.05], 12);
  // Pizza on peel
  cylinder(peelGroup, 0.2, 0.2, 0.025, m.pizzaCrust, [0, 0.02, -0.05], 12);
  cylinder(peelGroup, 0.18, 0.18, 0.028, m.pizzaSauce, [0, 0.025, -0.05], 12);
  cylinder(peelGroup, 0.16, 0.16, 0.032, m.pizzaCheese, [0, 0.028, -0.05], 12);
  group.add(peelGroup);

  // Front rustic table with fresh whole sliced pizza (output)
  box(group, [1.05, 0.12, 0.75], m.woodDark, [0.72, 0.52, 0.24], 0.04);
  box(group, [0.98, 0.07, 0.68], m.woodLight, [0.72, 0.62, 0.24], 0.025);
  // Round wooden pizza board & whole pizza
  cylinder(group, 0.32, 0.32, 0.03, m.woodLight, [0.72, 0.67, 0.24], 14);
  cylinder(group, 0.28, 0.28, 0.035, m.pizzaCrust, [0.72, 0.7, 0.24], 14);
  cylinder(group, 0.25, 0.25, 0.04, m.pizzaCheese, [0.72, 0.72, 0.24], 14);
  // Toppings: pepperoni slices & green peppers
  for (let top = 0; top < 6; top += 1) {
    const angle = (top * Math.PI) / 3;
    cylinder(group, 0.04, 0.04, 0.015, m.tomato,
      [0.72 + Math.cos(angle) * 0.15, 0.74, 0.24 + Math.sin(angle) * 0.15], 8);
    cylinder(group, 0.035, 0.035, 0.018, m.leafBright,
      [0.72 + Math.cos(angle + 0.5) * 0.11, 0.74, 0.24 + Math.sin(angle + 0.5) * 0.11], 6);
  }

  // Left prep station with 3 topping trays & olive oil bottle (input)
  for (const [tx, tz, tCol] of [[0.42, -0.45, m.leafBright], [0.66, -0.45, m.cheese], [0.9, -0.45, m.tomato]]) {
    box(group, [0.2, 0.08, 0.24], m.steelLight, [tx, 0.72, tz], 0.02);
    box(group, [0.16, 0.06, 0.2], tCol, [tx, 0.74, tz], 0.015);
  }
  // Olive oil bottle
  cylinder(group, 0.04, 0.05, 0.22, m.glass, [0.38, 0.82, -0.22], 8);
  cylinder(group, 0.035, 0.04, 0.16, m.oliveOil, [0.38, 0.78, -0.22], 8);
  cylinder(group, 0.018, 0.022, 0.06, m.woodDark, [0.38, 0.95, -0.22], 6);

  // Right stack of cardboard pizza delivery boxes
  for (let boxIdx = 0; boxIdx < 4; boxIdx += 1) {
    box(group, [0.55, 0.08, 0.55], m.sackLight, [1.05, 0.42 + boxIdx * 0.085, -0.15], 0.02);
  }

  const input = anchor(group, [0.66, 0.85, -0.45]);
  const output = anchor(group, [0.72, 0.75, 0.24]);
  const lamp = statusJewel(group, m, [1.05, 1.05, -0.45]);

  return {
    input, output, lamp, badgeY: 3.45,
    update(time, frameDelta, isWorking) {
      const flicker = Math.sin(time * 9) * 0.2 + Math.sin(time * 21) * 0.1;
      pizzaFire.material.emissiveIntensity = isWorking ? 1.0 + flicker : 0.45 + flicker * 0.3;
      peelGroup.position.z = 0.46 + (isWorking ? Math.sin(time * 1.8) * 0.14 : 0);
    },
  };
}

// -------------------------------------------------------------
// Model Factory Export
// -------------------------------------------------------------
export function createProductionBuildModel(group, id) {
  const m = {
    sand: material(0xdcb976), soil: material(0x62412b), leaf: material(0x329544),
    leafBright: material(0x69c849), wood: material(0xa86a35), woodLight: material(0xd59a54),
    woodDark: material(0x744629), rope: material(0x90704d), red: material(0xe83a2d),
    redDark: material(0xb92f27), white: material(0xf8f9fa), roof: material(0xe94332),
    roofLight: material(0xff6a42), roofDark: material(0xc52e28), gold: material(0xe5a52c, 0.42),
    goldLight: material(0xffcd50, 0.4), brass: material(0xc49339, 0.42, 0.34),
    steel: material(0xb6c3c4, 0.34, 0.46), steelLight: material(0xe0e6e5, 0.28, 0.48),
    steelDark: material(0x485254, 0.42, 0.38), rivetSteel: material(0x778686, 0.3, 0.5),
    darkMetal: material(0x2b3334, 0.45, 0.32), glass: new THREE.MeshPhysicalMaterial({
      color: 0xdffbff, transparent: true, opacity: 0.32, roughness: 0.12, metalness: 0.08, side: THREE.DoubleSide,
    }),
    kettle: material(0xd93c2b, 0.5), paste: material(0xb93527),
    fireGlow: new THREE.MeshStandardMaterial({ color: 0xff7020, emissive: 0xff6600, emissiveIntensity: 0.8, roughness: 0.8 }),
    fireYellow: new THREE.MeshBasicMaterial({ color: 0xffd030 }),
    brick: material(0x9b4936), brickLight: material(0xd39d7f), brickDark: material(0x733e34),
    stone: material(0xc2b197), stoneLight: material(0xe2d3b7), stoneDark: material(0x70645b),
    orange: material(0xff951e), orangeDark: material(0xe67e22), tomato: material(0xe84731),
    corn: material(0xffd355), cornHusk: material(0x7eb338), juice: material(0xffaa25),
    popcorn: material(0xfff6cf), popcornLight: material(0xfffbee),
    sack: material(0xc9a77d), sackLight: material(0xe1c69c),
    wheat: material(0xf1c24b), wheatLight: material(0xffdc74),
    flour: material(0xfdfdfc), flourPile: material(0xf6f6f2),
    log: material(0x83502f), logCut: material(0xc18a51),
    bread: material(0xb96c36), breadLight: material(0xf4d398), dough: material(0xf2dfbe),
    cupcakeFrosting: material(0x6d4022), cupcakeFrostingPink: material(0xff8fab),
    donutPink: material(0xff70a6), donutChoc: material(0x582f1b),
    tartCrust: material(0xd59842), tart: material(0xf4b538), cream: material(0xffe8b4),
    patty: material(0x522f1b), cheese: material(0xffca45), lettuce: material(0x48b835),
    ketchup: material(0xd92d20), mustard: material(0xfdb022),
    pizzaCrust: material(0xdca462), pizzaSauce: material(0xc92a1e), pizzaCheese: material(0xffe066),
    basil: material(0x2f855a), oliveOil: material(0x85992c), chalkboard: material(0x222a28),
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

  const atmosphere = createProductionAtmosphere(group, id);
  return { ...result, trayMaterial: m.woodLight, update(time, delta, active) {
    result.update?.(time, delta, active);
    atmosphere.update(time, active);
  } };
}

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const mat = (color, roughness = 0.86, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });

function add(parent, geometry, material, position = [0, 0, 0], rotation = undefined, scale = undefined) {
  const mesh = new THREE.Mesh(geometry, material);
  if (position) mesh.position.set(...position);
  if (rotation) mesh.rotation.set(...rotation);
  if (scale) mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function box(parent, size, material, position, rotation = undefined, radius = 0.035) {
  return add(parent, new RoundedBoxGeometry(size[0], size[1], size[2], 3,
    Math.min(radius, size[0] * 0.23, size[1] * 0.23, size[2] * 0.23)), material, position, rotation);
}

function sphere(parent, radius, material, position, scale = [1, 1, 1], segments = 8) {
  return add(parent, new THREE.SphereGeometry(radius, segments, Math.max(5, segments - 2)), material, position, undefined, scale);
}

function cylinder(parent, radiusTop, radiusBottom, height, material, position, segments = 10, rotation = undefined, openEnded = false) {
  return add(parent, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, openEnded), material, position, rotation);
}

function island(group, m, width = 1.9, depth = 1.65) {
  box(group, [width, 0.15, depth], m.sand, [0, 0.11, 0], undefined, 0.09);
  box(group, [width - 0.1, 0.08, depth - 0.1], m.grass, [0, 0.225, 0], undefined, 0.06);
  for (const [x, z] of [[-0.72, -0.56], [0.72, -0.52], [-0.75, 0.53], [0.74, 0.55]]) {
    for (let leaf = 0; leaf < 3; leaf += 1) {
      const angle = leaf * Math.PI / 3;
      const tuft = sphere(group, 0.075, leaf % 2 ? m.leafBright : m.leaf,
        [x + Math.cos(angle) * 0.06, 0.32 + leaf * 0.035, z + Math.sin(angle) * 0.06],
        [0.55, 1.4, 0.45], 7);
      tuft.rotation.z = angle - 0.35;
      tuft.castShadow = false;
    }
  }
  for (const [x, z] of [[-0.76, 0.1], [0.72, -0.02], [0.24, 0.66]]) {
    const stone = add(group, new THREE.DodecahedronGeometry(0.13, 0), m.stone,
      [x, 0.29, z], undefined, [1.35, 0.48, 0.9]);
    stone.rotation.y = x;
  }
}

function fence(group, m, width = 1.55, depth = 1.3, openFront = false) {
  for (const x of [-width / 2, width / 2]) {
    for (const z of [-depth / 2, depth / 2]) box(group, [0.12, 0.64, 0.12], m.woodDark, [x, 0.52, z], undefined, 0.022);
    for (const y of [0.38, 0.62]) box(group, [0.09, 0.12, depth], m.woodLight, [x, y, 0], undefined, 0.02);
  }
  for (const z of [-depth / 2, depth / 2]) {
    for (const y of [0.38, 0.62]) {
      if (openFront && z > 0) {
        box(group, [width * 0.28, 0.12, 0.09], m.woodLight, [-width * 0.36, y, z], undefined, 0.02);
        box(group, [width * 0.28, 0.12, 0.09], m.woodLight, [width * 0.36, y, z], undefined, 0.02);
      } else box(group, [width, 0.12, 0.09], m.woodLight, [0, y, z], undefined, 0.02);
    }
  }
}

function flowers(group, m, x, z, count = 3) {
  for (let index = 0; index < count; index += 1) {
    const px = x + (index - (count - 1) / 2) * 0.14;
    const height = 0.28 + (index % 2) * 0.08;
    add(group, new THREE.CylinderGeometry(0.014, 0.02, height, 5), m.leaf, [px, 0.31 + height / 2, z]);
    for (let leafIndex = 0; leafIndex < 2; leafIndex += 1) {
      sphere(group, 0.07, m.leafBright, [px + (leafIndex ? 0.07 : -0.07), 0.35 + height * 0.35, z],
        [1.2, 0.55, 0.55], 6);
    }
    sphere(group, 0.055, index % 2 ? m.flower : m.flowerWarm, [px, 0.31 + height, z], [1, 0.72, 0.9], 7);
    for (let petal = 0; petal < 5; petal += 1) {
      const angle = petal * Math.PI * 0.4;
      sphere(group, 0.035, index % 2 ? m.flower : m.flowerWarm,
        [px + Math.cos(angle) * 0.058, 0.31 + height, z + Math.sin(angle) * 0.058], [1, 0.8, 0.9], 6);
    }
  }
}

function stoneWell(group, m) {
  island(group, m, 1.95, 1.85);
  fence(group, m, 1.65, 1.48, true);

  // Individual pale stones form an open well mouth around dark, visible water.
  add(group, new THREE.CylinderGeometry(0.43, 0.48, 0.08, 10), m.waterDark, [0, 0.36, -0.05]);
  add(group, new THREE.CylinderGeometry(0.54, 0.55, 0.12, 10), m.stoneDark, [0, 0.4, -0.05]);
  for (let row = 0; row < 2; row += 1) {
    for (let stone = 0; stone < 10; stone += 1) {
      const angle = (stone + row * 0.5) * Math.PI / 5;
      const block = add(group, new THREE.DodecahedronGeometry(0.18, 0), row ? m.stoneLight : m.stone,
        [Math.cos(angle) * 0.47, 0.47 + row * 0.2, -0.05 + Math.sin(angle) * 0.47],
        undefined, [1.25, 0.72, 0.82]);
      block.rotation.y = angle;
    }
  }
  for (const x of [-0.49, 0.49]) box(group, [0.1, 1.48, 0.12], m.woodDark, [x, 1.17, -0.15], undefined, 0.022);
  box(group, [1.05, 0.12, 0.16], m.wood, [0, 1.83, -0.15], undefined, 0.025);
  box(group, [0.86, 0.1, 0.92], m.roof, [0, 2.04, -0.15], [0, 0, -0.08], 0.025);
  box(group, [0.36, 0.08, 0.98], m.roofBright, [0, 2.12, -0.15], [0, 0, -0.08], 0.02);
  for (const x of [-0.55, 0.55]) {
    cylinder(group, 0.045, 0.045, 0.62, m.woodLight, [x, 1.46, -0.15], 6, [0, 0, Math.PI / 2]);
  }
  const axle = cylinder(group, 0.052, 0.052, 0.92, m.woodDark, [0, 1.32, -0.15], 8, [0, 0, Math.PI / 2]);
  cylinder(group, 0.15, 0.15, 0.1, m.woodLight, [0.46, 1.32, -0.15], 8, [0, 0, Math.PI / 2]);
  box(group, [0.07, 0.72, 0.07], m.wood, [0.48, 1.32, -0.15], undefined, 0.018);
  cylinder(group, 0.018, 0.018, 0.58, m.rope, [0, 0.95, -0.15], 5);
  const bucket = add(group, new THREE.CylinderGeometry(0.12, 0.09, 0.18, 8), m.woodLight, [0, 0.61, 0.0]);
  add(group, new THREE.TorusGeometry(0.12, 0.014, 5, 10), m.iron, [0, 0.7, 0], [Math.PI / 2, 0, 0]);
  flowers(group, m, -0.68, 0.68, 3);
  axle.castShadow = true;
  bucket.castShadow = true;
}

function scarecrow(group, m) {
  island(group, m, 1.9, 1.58);
  fence(group, m, 1.6, 1.3, true);

  cylinder(group, 0.07, 0.09, 2.0, m.wood, [0, 1.22, -0.12], 7);
  box(group, [1.35, 0.12, 0.13], m.woodDark, [0, 1.48, -0.12], undefined, 0.025);
  // Bright patched shirt, straw collar and cuffs replace the old bare post silhouette.
  box(group, [0.68, 0.65, 0.32], m.shirt, [0, 1.4, -0.02], [0, 0, -0.03], 0.1);
  box(group, [0.73, 0.16, 0.35], m.scarf, [0, 1.69, -0.01], undefined, 0.04);
  for (const x of [-0.48, 0.48]) {
    box(group, [0.18, 0.2, 0.35], m.straw, [x, 1.48, -0.03], undefined, 0.03);
    for (let straw = 0; straw < 4; straw += 1) {
      const side = x < 0 ? -1 : 1;
      box(group, [0.045, 0.27, 0.045], m.strawLight,
        [x + side * (0.12 + straw * 0.018), 1.43 + (straw % 2) * 0.02, -0.03], [0, 0, side * (0.3 + straw * 0.12)], 0.01);
    }
  }
  for (const x of [-0.15, 0.15]) {
    box(group, [0.14, 0.55, 0.18], m.trouser, [x, 0.81, -0.04], [0, 0, x < 0 ? -0.06 : 0.06], 0.04);
    box(group, [0.24, 0.08, 0.32], m.boot, [x, 0.54, 0.08], undefined, 0.025);
  }
  sphere(group, 0.27, m.straw, [0, 2.0, -0.05], [1, 1.03, 0.84], 9);
  cylinder(group, 0.34, 0.34, 0.08, m.hat, [0, 2.21, -0.05], 9);
  add(group, new THREE.ConeGeometry(0.24, 0.35, 8), m.hat, [0, 2.4, -0.05]);
  box(group, [0.55, 0.075, 0.12], m.scarfDark, [0, 2.24, -0.05], undefined, 0.02);
  for (const x of [-0.09, 0.09]) sphere(group, 0.035, m.eye, [x, 2.02, 0.19], [1, 1, 0.5], 7);
  add(group, new THREE.ConeGeometry(0.07, 0.17, 5), m.beak, [0, 1.97, 0.24], [Math.PI / 2, 0, 0]);
  for (let stitch = 0; stitch < 6; stitch += 1) {
    const x = -0.19 + stitch * 0.075;
    box(group, [0.04, 0.016, 0.02], m.thread, [x, 1.32 - (stitch % 2) * 0.13, 0.15], undefined, 0.004);
  }
  flowers(group, m, -0.62, 0.62, 3);
}

function windmill(group, m) {
  island(group, m, 2.0, 1.84);
  fence(group, m, 1.72, 1.55, true);
  add(group, new THREE.CylinderGeometry(0.28, 0.48, 1.42, 8), m.wood, [0, 0.98, -0.02]);
  add(group, new THREE.CylinderGeometry(0.51, 0.54, 0.2, 8), m.stone, [0, 0.35, -0.02]);
  for (const side of [-1, 1]) {
    box(group, [0.1, 1.13, 0.1], m.woodLight, [side * 0.14, 0.94, 0.28], [0, 0, side * 0.15], 0.02);
    box(group, [0.08, 0.88, 0.08], m.woodDark, [side * 0.14, 0.94, 0.34], [0, 0, -side * 0.15], 0.02);
  }
  add(group, new THREE.ConeGeometry(0.37, 0.42, 8), m.roof, [0, 1.82, -0.02]);
  const center = [0, 1.72, 0.42];
  // Four framed canvas sails with an inset cream panel and cross braces.
  for (let blade = 0; blade < 4; blade += 1) {
    const angle = blade * Math.PI / 2 + Math.PI / 4;
    const x = center[0] + Math.cos(angle) * 0.47;
    const y = center[1] + Math.sin(angle) * 0.47;
    box(group, [0.34, 0.86, 0.085], m.woodDark, [x, y, center[2]], [0, 0, -angle + Math.PI / 2], 0.025);
    box(group, [0.24, 0.68, 0.045], m.canvas, [x, y, center[2] + 0.052], [0, 0, -angle + Math.PI / 2], 0.014);
    box(group, [0.08, 0.85, 0.07], m.woodLight, [x, y, center[2] + 0.09], [0, 0, -angle + Math.PI / 2], 0.012);
    box(group, [0.31, 0.07, 0.07], m.woodLight, [x, y, center[2] + 0.09], [0, 0, -angle + Math.PI / 2], 0.012);
  }
  cylinder(group, 0.17, 0.17, 0.32, m.iron, [0, center[1], center[2] + 0.11], 9, [Math.PI / 2, 0, 0]);
  sphere(group, 0.14, m.gold, [0, center[1], center[2] + 0.29], [1, 1, 0.65], 8);
  flowers(group, m, -0.7, 0.65, 3);
}

function trellis(group, m) {
  island(group, m, 1.85, 1.75);
  // A walk-through arbor with a real opening, trellis lattice and trailing blossoms.
  for (const x of [-0.58, 0.58]) {
    box(group, [0.13, 1.62, 0.13], m.woodDark, [x, 1.04, -0.05], undefined, 0.025);
    for (const y of [0.58, 0.82, 1.06, 1.3]) box(group, [0.56, 0.045, 0.06], m.woodLight, [x * 0.73, y, 0], undefined, 0.01);
  }
  const arch = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.58, 1.34, -0.05), new THREE.Vector3(-0.58, 1.65, -0.05),
    new THREE.Vector3(-0.43, 1.92, -0.05), new THREE.Vector3(0, 2.04, -0.05),
    new THREE.Vector3(0.43, 1.92, -0.05), new THREE.Vector3(0.58, 1.65, -0.05),
    new THREE.Vector3(0.58, 1.34, -0.05),
  ]);
  add(group, new THREE.TubeGeometry(arch, 20, 0.07, 7, false), m.wood, [0, 0, 0]);
  for (let rung = 0; rung < 7; rung += 1) {
    const t = rung / 6;
    const x = -0.5 + t;
    const y = 1.52 + Math.sin(t * Math.PI) * 0.42;
    box(group, [0.055, 0.27, 0.055], m.woodLight, [x, y, -0.03], [0, 0, (t - 0.5) * 0.55], 0.012);
  }
  for (let leaf = 0; leaf < 26; leaf += 1) {
    const t = leaf / 25;
    const x = -0.56 + t * 1.12;
    const y = 1.46 + Math.sin(t * Math.PI) * 0.48;
    const offset = (leaf % 2) * 0.12;
    sphere(group, 0.095, leaf % 4 ? m.leaf : m.leafBright, [x, y + offset, 0.06], [1.1, 0.72, 0.86], 7);
    if (leaf % 3 === 0) {
      const bloom = sphere(group, 0.07, m.flower, [x, y + offset + 0.02, 0.14], [1, 0.75, 1], 7);
      for (let petal = 0; petal < 5; petal += 1) {
        const a = petal * Math.PI * 0.4;
        sphere(group, 0.04, m.flower, [x + Math.cos(a) * 0.07, y + offset + 0.02, 0.14 + Math.sin(a) * 0.07], [1, 0.8, 1], 6);
      }
      bloom.castShadow = false;
    }
  }
  for (let stone = 0; stone < 3; stone += 1) {
    const paver = add(group, new THREE.CylinderGeometry(0.21, 0.24, 0.06, 7), m.stoneLight,
      [0, 0.31, 0.54 - stone * 0.48], undefined, [1.15, 1, 0.72]);
    paver.rotation.y = stone * 0.3;
  }
  flowers(group, m, -0.78, 0.55, 3);
  flowers(group, m, 0.77, 0.55, 3);
}

function hayBales(group, m) {
  island(group, m, 1.75, 1.62);
  const balePositions = [[-0.29, 0.55, -0.04], [0.29, 0.55, -0.04], [0, 1.04, -0.08]];
  balePositions.forEach(([x, y, z], index) => {
    box(group, [0.72, 0.56, 0.62], index === 2 ? m.strawBright : m.straw, [x, y, z], undefined, 0.09);
    for (const bandX of [-0.22, 0.22]) {
      box(group, [0.055, 0.58, 0.66], m.rope, [x + bandX, y, z], undefined, 0.015);
    }
    for (let tuft = 0; tuft < 22; tuft += 1) {
      const side = tuft % 2 ? 1 : -1;
      const faceZ = tuft % 3 ? z + 0.33 : z - 0.33;
      const strand = box(group, [0.035, 0.08 + (tuft % 3) * 0.02, 0.04], m.strawLight,
        [x + side * (0.27 + (tuft % 4) * 0.02), y - 0.22 + (tuft % 6) * 0.08, faceZ], undefined, 0.008);
      strand.rotation.z = (tuft % 2 ? 1 : -1) * 0.18;
    }
  });
  // Leaning pitchfork with a steel head and three tapered tines.
  const handle = add(group, new THREE.CylinderGeometry(0.025, 0.03, 1.05, 6), m.wood,
    [0.63, 0.64, 0.36], [0, 0, -0.47]);
  box(group, [0.38, 0.065, 0.055], m.iron, [0.45, 1.02, 0.36], [0, 0, -0.47], 0.012);
  for (let tine = 0; tine < 3; tine += 1) {
    add(group, new THREE.CylinderGeometry(0.012, 0.018, 0.27, 5), m.iron,
      [0.29 + tine * 0.14, 1.17, 0.36], [0, 0, 0.05]);
  }
  handle.castShadow = true;
}

function wagon(group, m) {
  island(group, m, 1.92, 1.75);
  // Four-spoked orchard cart; the box is open and brim-full of harvested produce.
  box(group, [1.06, 0.15, 0.88], m.woodDark, [0, 0.79, -0.05], undefined, 0.04);
  box(group, [0.08, 0.48, 0.9], m.wood, [-0.49, 1.08, -0.05], undefined, 0.025);
  box(group, [0.08, 0.48, 0.9], m.wood, [0.49, 1.08, -0.05], undefined, 0.025);
  for (const z of [-0.46, 0.36]) {
    for (let plank = 0; plank < 3; plank += 1) {
      box(group, [1.0, 0.12, 0.07], plank % 2 ? m.woodLight : m.wood, [0, 0.92 + plank * 0.14, z], undefined, 0.018);
    }
  }
  for (const side of [-1, 1]) {
    const axle = add(group, new THREE.CylinderGeometry(0.055, 0.055, 1.4, 7), m.iron, [0, 0.55, side * 0.42], [0, 0, Math.PI / 2]);
    axle.castShadow = true;
    for (const x of [-0.66, 0.66]) {
      const wheel = add(group, new THREE.CylinderGeometry(0.31, 0.31, 0.14, 10), m.woodDark,
        [x, 0.58, side * 0.42], [0, 0, Math.PI / 2]);
      add(group, new THREE.CylinderGeometry(0.12, 0.12, 0.16, 8), m.iron,
        [x + (x > 0 ? 0.08 : -0.08), 0.58, side * 0.42], [0, 0, Math.PI / 2]);
      for (let spoke = 0; spoke < 8; spoke += 1) {
        const angle = spoke * Math.PI / 4;
        box(group, [0.04, 0.5, 0.045], m.woodLight, [x, 0.58, side * 0.42], [0, 0, angle], 0.01);
      }
      wheel.castShadow = true;
    }
  }
  for (let item = 0; item < 12; item += 1) {
    const x = -0.35 + (item % 4) * 0.22;
    const z = -0.28 + Math.floor(item / 4) * 0.24;
    const y = 1.26 + (item % 3) * 0.06;
    const type = item % 3 === 0 ? 'orange' : item % 3 === 1 ? 'apple' : 'pumpkin';
    const color = type === 'orange' ? m.orange : type === 'apple' ? m.red : m.pumpkin;
    sphere(group, 0.13, color, [x, y, z], [1.05, 0.8, 0.9], 8);
    if (item % 2 === 0) sphere(group, 0.055, m.leafBright, [x + 0.04, y + 0.11, z], [1, 0.35, 0.8], 6);
  }
  for (const x of [-0.18, 0.18]) box(group, [0.09, 0.09, 0.9], m.woodDark, [x, 0.55, 0.81], [0.12, 0, 0], 0.02);
  const drawbar = add(group, new THREE.CylinderGeometry(0.045, 0.055, 0.8, 6), m.wood,
    [0, 0.47, 1.12], [Math.PI / 2, 0, 0]);
  const hitch = add(group, new THREE.TorusGeometry(0.11, 0.03, 6, 10), m.iron, [0, 0.48, 1.52], [Math.PI / 2, 0, 0]);
  drawbar.castShadow = true;
  hitch.castShadow = true;
}

function roosterVane(group, m) {
  island(group, m, 1.9, 1.65);
  fence(group, m, 1.66, 1.36, true);
  box(group, [0.34, 0.16, 0.34], m.wood, [0, 0.34, -0.04], undefined, 0.035);
  box(group, [0.22, 0.55, 0.22], m.woodDark, [0, 0.66, -0.04], undefined, 0.025);
  box(group, [0.34, 0.13, 0.34], m.woodLight, [0, 0.96, -0.04], undefined, 0.025);
  cylinder(group, 0.045, 0.07, 1.58, m.wood, [0, 1.77, -0.04], 7);
  // Arrow and tail share a horizontal axis; the rooster sits on the turning bearing.
  const arrow = cylinder(group, 0.025, 0.025, 1.5, m.iron, [0, 2.48, 0.1], 6, [0, 0, Math.PI / 2]);
  for (const side of [-1, 1]) {
    add(group, new THREE.ConeGeometry(0.085, 0.2, 5), m.iron,
      [side * 0.78, 2.48, 0.1], [0, 0, side * Math.PI / 2]);
  }
  const body = sphere(group, 0.24, m.cream, [0.02, 2.7, 0.18], [1.25, 0.88, 0.8], 9);
  sphere(group, 0.145, m.cream, [0.27, 2.79, 0.2], [1, 1, 0.85], 8);
  add(group, new THREE.ConeGeometry(0.075, 0.15, 5), m.gold, [0.43, 2.77, 0.22], [0, 0, -Math.PI / 2]);
  for (let lobe = 0; lobe < 3; lobe += 1) sphere(group, 0.075, m.comb, [0.18 + lobe * 0.08, 2.96 + (lobe === 1 ? 0.04 : 0), 0.2], [0.9, 1.35, 0.8], 7);
  for (let feather = 0; feather < 4; feather += 1) {
    const tail = sphere(group, 0.13, m.blue, [-0.23 - feather * 0.05, 2.78 + feather * 0.1, 0.13],
      [0.75, 1.45, 0.85], 8);
    tail.rotation.z = -0.4;
  }
  box(group, [0.1, 0.23, 0.1], m.gold, [0, 2.48, 0.18], undefined, 0.02);
  body.castShadow = true;
  arrow.castShadow = true;
  flowers(group, m, -0.62, 0.56, 3);
}

function pond(group, m) {
  island(group, m, 2.0, 1.85);
  add(group, new THREE.CylinderGeometry(0.77, 0.82, 0.16, 12), m.soil, [0, 0.31, 0], undefined, [1.18, 1, 0.86]);
  add(group, new THREE.CylinderGeometry(0.72, 0.73, 0.055, 16), m.water, [0, 0.41, 0], undefined, [1.2, 1, 0.86]);
  for (let rock = 0; rock < 16; rock += 1) {
    const angle = rock * Math.PI * 2 / 16;
    const pebble = add(group, new THREE.DodecahedronGeometry(0.15, 0), rock % 4 ? m.stone : m.stoneLight,
      [Math.cos(angle) * 0.83, 0.43, Math.sin(angle) * 0.59], undefined, [1.25, 0.68, 0.9]);
    pebble.rotation.y = angle * 0.7;
  }
  for (const [x, z, rotation] of [[-0.25, -0.08, 0.2], [0.26, 0.18, 0.8], [0.04, -0.3, 0.45]]) {
    const pad = add(group, new THREE.CircleGeometry(0.18, 9), m.lily, [x, 0.455, z], [-Math.PI / 2, 0, rotation], [1.05, 0.75, 1]);
    pad.castShadow = false;
    sphere(group, 0.07, m.flower, [x, 0.49, z], [1, 0.42, 1], 7);
    for (let petal = 0; petal < 5; petal += 1) {
      const angle = petal * Math.PI * 2 / 5;
      sphere(group, 0.045, m.flower, [x + Math.cos(angle) * 0.07, 0.49, z + Math.sin(angle) * 0.07],
        [1, 0.55, 0.8], 6);
    }
  }
  for (const [x, z] of [[-0.61, 0.2], [0.61, -0.2], [0.49, 0.4], [-0.48, -0.34]]) {
    for (const side of [-1, 1]) {
      const reed = add(group, new THREE.CylinderGeometry(0.018, 0.025, 0.63, 5), m.leafDark,
        [x + side * 0.07, 0.64, z], [0, 0, side * 0.16]);
      add(group, new THREE.CapsuleGeometry(0.045, 0.18, 3, 6), m.reed,
        [x + side * 0.07, 1.02, z]);
      reed.castShadow = true;
    }
  }
  flowers(group, m, -0.78, -0.72, 3);
}

export function buildFarmDecorationModel(group, type) {
  const m = {
    sand: mat(0xd9b16d), grass: mat(0x70c843), grassLight: mat(0x8bd851),
    wood: mat(0xa86a35), woodLight: mat(0xd99b51), woodDark: mat(0x754428),
    stone: mat(0x989588), stoneLight: mat(0xc8c1b2), stoneDark: mat(0x68655d),
    water: mat(0x31b7d5, 0.24, 0.08), waterDark: mat(0x2789a2, 0.34, 0.05),
    iron: mat(0x5d6562, 0.42, 0.4), rope: mat(0x97754d),
    roof: mat(0xdf3f31), roofBright: mat(0xf75a3c), leaf: mat(0x328b3c),
    leafBright: mat(0x66c447), leafDark: mat(0x287d39), flower: mat(0xfff0dc),
    flowerWarm: mat(0xffd653), shirt: mat(0xd9533b), scarf: mat(0x4b90c1),
    scarfDark: mat(0x326b94), straw: mat(0xe3b947), strawBright: mat(0xf3cf5d),
    hat: mat(0x8d633b), eye: mat(0x282522), beak: mat(0xf0a112), boot: mat(0x704630),
    thread: mat(0x69a8d1), canvas: mat(0xf2d7a6), gold: mat(0xe6a72e), blue: mat(0x3569a2),
    red: mat(0xe64a35), pumpkin: mat(0xef8d2c), lily: mat(0x55b655), reed: mat(0x855d35),
    soil: mat(0x8a6043),
  };
  const builders = {
    stoneWell,
    scarecrow,
    farmWindmill: windmill,
    flowerTrellis: trellis,
    hayBales,
    harvestWagon: wagon,
    roosterVane,
    gardenPond: pond,
  };
  builders[type]?.(group, m);
}


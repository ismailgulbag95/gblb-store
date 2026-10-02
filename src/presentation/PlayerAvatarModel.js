import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Single-segment bevels and faceted details keep the five avatars in the same
// chunky visual family without changing their animation pivots or identities.
export function createPlayerAvatar(type) {
  const group = new THREE.Group();
  const palette = {
    shopkeeper: [0xe74732, 0x31506e, 0xffd6ac],
    cat: [0x398bc5, 0x304966, 0xef9b38],
    robot: [0xe3edef, 0x344952, 0xe3edef],
    panda: [0xf5f0e5, 0x282d36, 0xf5f0e5],
    penguin: [0x283541, 0xffbc36, 0x283541],
  }[type];
  const mat = (color, glow = false) => new THREE.MeshStandardMaterial({
    color, roughness: 0.78, flatShading: true,
    ...(glow ? { emissive: color, emissiveIntensity: 0.5 } : {}),
  });
  const bodyMat = mat(palette[0]), legMat = mat(palette[1]), faceMat = mat(palette[2]);
  const dark = mat(0x28313b), white = mat(0xfff7e8), red = mat(0xea5445);
  const green = mat(0x319859), gold = mat(0xffbf3f), pink = mat(0xf397a5);
  const blue = mat(0x4cd7f4, true);
  const box = (parent, material, size, position, bevel = 0.025) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 1, bevel), material);
    mesh.position.set(...position); mesh.castShadow = true; parent.add(mesh); return mesh;
  };
  const facet = (parent, material, radius, position, scale = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 0), material);
    mesh.position.set(...position); mesh.scale.set(...scale); mesh.castShadow = true; parent.add(mesh); return mesh;
  };
  box(group, bodyMat, [0.48, 0.47, 0.34], [0, 0.76, 0], 0.055);
  box(group, legMat, [0.42, 0.13, 0.3], [0, 0.47, 0]);

  const head = new THREE.Group(); head.position.set(0, 1.27, 0); group.add(head);
  box(head, faceMat, [0.64, 0.55, 0.5], [0, 0, 0], 0.065);
  const legs = [], arms = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group(); leg.position.set(side * 0.14, 0.43, 0); group.add(leg); legs.push(leg);
    box(leg, legMat, [0.19, 0.29, 0.22], [0, -0.14, 0]);
    const footMat = type === 'penguin' ? gold : type === 'panda' ? dark : type === 'shopkeeper' ? red : legMat;
    box(leg, footMat, [0.23, 0.13, 0.33], [0, -0.345, 0.055]);
    if (!['panda', 'penguin'].includes(type)) box(leg, white, [0.24, 0.035, 0.34], [0, -0.393, 0.055], 0.01);
    const arm = new THREE.Group(); arm.position.set(side * 0.31, 0.93, 0); group.add(arm); arms.push(arm);
    if (type === 'penguin') {
      const wing = box(arm, dark, [0.12, 0.39, 0.22], [0, -0.17, 0], 0.035); wing.rotation.z = -side * 0.15;
    } else {
      box(arm, type === 'panda' ? dark : bodyMat, [0.19, 0.26, 0.25], [0, -0.12, 0], 0.035);
      box(arm, type === 'robot' ? dark : type === 'cat' ? white : faceMat, [0.17, 0.17, 0.18], [0, -0.32, 0.02], 0.035);
    }
    if (type !== 'robot') {
      if (type === 'panda') {
        const patch = box(head, dark, [0.16, 0.16, 0.035], [side * 0.14, 0.025, 0.252], 0.035);
        patch.rotation.z = side * 0.2;
      }
      if (type === 'penguin') box(head, white, [0.16, 0.2, 0.035], [side * 0.135, 0.025, 0.252], 0.035);
      const eyeMat = type === 'panda' ? white : dark;
      box(head, eyeMat, [0.04, 0.085, 0.02], [side * 0.135, 0.015, type === 'panda' || type === 'penguin' ? 0.28 : 0.257], 0.008);
    }
  }

  let tailGroup = null, antennaGroup = null;
  if (type === 'shopkeeper') {
    box(group, green, [0.37, 0.4, 0.045], [0, 0.7, 0.189]);
    box(group, mat(0x237647), [0.25, 0.13, 0.025], [0, 0.6, 0.22]);
    for (const side of [-1, 1]) box(group, green, [0.04, 0.28, 0.02], [side * 0.14, 0.88, 0.182], 0.005);
    box(group, gold, [0.065, 0.035, 0.025], [-0.1, 0.84, 0.225], 0.006);
    box(head, red, [0.67, 0.17, 0.54], [0, 0.245, -0.01], 0.045);
    box(head, red, [0.53, 0.035, 0.24], [0, 0.17, 0.28], 0.015);
    box(head, white, [0.1, 0.065, 0.02], [0, 0.25, 0.269], 0.006);
    facet(head, faceMat, 0.045, [0, -0.045, 0.278]);
    box(head, dark, [0.065, 0.018, 0.015], [0, -0.13, 0.257], 0.005);
  } else if (type === 'cat') {
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.26, 4), faceMat);
      ear.position.set(side * 0.23, 0.34, 0); ear.rotation.z = -side * 0.15; ear.castShadow = true; head.add(ear);
      facet(head, pink, 0.075, [side * 0.23, 0.34, 0.07], [0.8, 1.3, 0.3]);
      box(head, white, [0.15, 0.09, 0.045], [side * 0.075, -0.12, 0.271]);
      for (const y of [-0.08, -0.13]) box(head, dark, [0.12, 0.009, 0.012], [side * 0.245, y, 0.266], 0.003);
    }
    facet(head, pink, 0.04, [0, -0.075, 0.307], [1, 0.7, 0.5]);
    box(group, red, [0.49, 0.07, 0.37], [0, 0.985, 0]);
    box(group, red, [0.09, 0.18, 0.03], [0.1, 0.89, 0.19]);
    tailGroup = new THREE.Group(); tailGroup.position.set(0, 0.53, -0.17); group.add(tailGroup);
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.13, -0.2), new THREE.Vector3(0, 0.38, -0.3), new THREE.Vector3(0, 0.45, -0.18)]);
    tailGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 7, 0.065, 5, false), faceMat));
    facet(tailGroup, white, 0.075, [0, 0.45, -0.18]);
  } else if (type === 'robot') {
    box(head, dark, [0.55, 0.25, 0.035], [0, 0, 0.259]);
    for (const side of [-1, 1]) {
      box(head, blue, [0.07, 0.1, 0.02], [side * 0.14, 0.025, 0.283], 0.008);
      box(head, gold, [0.07, 0.15, 0.24], [side * 0.34, 0, 0]);
    }
    box(head, blue, [0.09, 0.015, 0.02], [0, -0.075, 0.283], 0.004);
    box(group, dark, [0.29, 0.28, 0.04], [0, 0.77, 0.184]);
    facet(group, blue, 0.09, [0, 0.77, 0.218], [1, 1, 0.3]);
    antennaGroup = new THREE.Group(); antennaGroup.position.set(0.18, 0.275, 0); head.add(antennaGroup);
    box(antennaGroup, gold, [0.025, 0.18, 0.025], [0, 0.09, 0], 0.004);
    facet(antennaGroup, red, 0.055, [0, 0.21, 0]);
  } else if (type === 'panda') {
    for (const side of [-1, 1]) facet(head, dark, 0.13, [side * 0.28, 0.25, 0], [1, 1, 0.7]);
    box(head, white, [0.21, 0.11, 0.055], [0, -0.12, 0.275]);
    facet(head, dark, 0.04, [0, -0.085, 0.31], [1, 0.7, 0.5]);
    box(group, red, [0.36, 0.36, 0.045], [0, 0.66, 0.192]);
    box(group, white, [0.22, 0.1, 0.02], [0, 0.59, 0.224]);
    box(head, red, [0.38, 0.09, 0.32], [0, 0.28, 0], 0.025);
    for (const x of [-0.13, 0, 0.13]) facet(head, white, 0.15, [x, 0.42, 0]);
  } else if (type === 'penguin') {
    box(group, white, [0.34, 0.37, 0.05], [0, 0.74, 0.185], 0.04);
    for (const side of [-1, 1]) {
      const bow = box(group, red, [0.095, 0.07, 0.025], [side * 0.045, 0.94, 0.21], 0.012); bow.rotation.z = side * 0.2;
    }
    for (const y of [0.68, 0.79]) box(group, dark, [0.025, 0.025, 0.015], [0, y, 0.219], 0.005);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.16, 4), gold);
    beak.rotation.x = Math.PI / 2; beak.position.set(0, -0.095, 0.31); head.add(beak);
    box(head, gold, [0.34, 0.06, 0.3], [0, 0.3, 0]);
    for (const x of [-0.13, 0, 0.13]) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.13, 4), gold); spike.position.set(x, 0.39, 0.1); head.add(spike);
    }
  }
  return { group, legs, arms, tailGroup, antennaGroup };
}

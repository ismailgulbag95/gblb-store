import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addContactShadow } from '../presentation/ContactShadow.js';

export function createRetailDetails(scene) {
  const group = new THREE.Group(); group.name = 'retail-street-details'; scene.add(group);
  const materials = {};
  const mat = (color, metal = false) => materials[color] ??= new THREE.MeshStandardMaterial({ color, roughness: metal ? 0.3 : 0.8, metalness: metal ? 0.75 : 0 });
  const box = (w, h, d, x, y, z, color, bevel = 0) => {
    const mesh = new THREE.Mesh(bevel ? new RoundedBoxGeometry(w, h, d, 1, bevel) : new THREE.BoxGeometry(w, h, d), mat(color));
    mesh.position.set(x, y, z); mesh.castShadow = h > 0.1; mesh.receiveShadow = true; group.add(mesh); return mesh;
  };
  // Existing zebra crossing is retained by MarketGrid.
  for (const x of [-1.2, 0, 12.5, 13.7]) box(0.95, 0.1, 0.24, x, 0.05, 11.15, x % 1 ? 0xe9ba46 : 0x45484b, 0.02);
  box(0.7, 0.025, 0.45, 10.5, 0.02, 11.25, 0x41494d);
  for (let x = 10.2; x <= 10.8; x += 0.1) box(0.035, 0.015, 0.4, x, 0.043, 11.25, 0x889196);
  const manhole = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.035, 12), mat(0x555f63, true));
  manhole.position.set(1, 0.015, 14); group.add(manhole);
  const hydrant = new THREE.Group(); hydrant.position.set(12.3, 0, 12.1); group.add(hydrant);
  const red = mat(0xe45443);
  for (const [radius, height, y] of [[0.16, 0.65, 0.35], [0.22, 0.08, 0.08], [0.2, 0.12, 0.7]]) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 8), red); mesh.position.y = y; hydrant.add(mesh);
  }
  const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 8), red); valve.rotation.z = Math.PI / 2; valve.position.y = 0.45; hydrant.add(valve);
  addContactShadow(hydrant, 0.9, 0.8);
  box(0.1, 0.75, 0.1, -0.8, 0.375, 12.3, 0x5f645d);
  box(0.6, 0.45, 0.38, -0.8, 0.95, 12.3, 0x387898, 0.06);
  box(0.35, 0.035, 0.02, -0.8, 1, 12.51, 0x263e4a);
  // Exterior props are visual only and stay outside fixture placement zones.
  box(1.05, 1.85, 0.8, 14.4, 0.925, 11.3, 0xd94746, 0.06);
  box(0.7, 1.12, 0.035, 14.28, 1.05, 11.72, 0x354c58, 0.02);
  for (const x of [14.08, 14.33, 14.58]) for (const y of [0.85, 1.25, 1.55]) {
    box(0.12, 0.2, 0.025, x, y, 11.75, y > 1 ? 0xf6c35f : 0x80c8b5, 0.01);
  }
  box(0.55, 0.12, 0.07, 14.3, 0.3, 11.75, 0x232c36, 0.02);
  box(1.7, 0.2, 0.85, 16.2, 0.1, 11.3, 0xa9d7dc, 0.04);
  for (const z of [10.9, 11.7]) {
    box(1.7, 0.65, 0.06, 16.2, 0.525, z, 0xa9d7dc, 0.02);
    box(1.7, 0.04, 0.06, 16.2, 0.87, z, 0xe9f1e9, 0.01);
  }
  for (const x of [15.38, 17.02]) {
    box(0.06, 0.65, 0.75, x, 0.525, 11.3, 0xa9d7dc, 0.02);
    box(0.06, 0.04, 0.85, x, 0.87, 11.3, 0xe9f1e9, 0.01);
  }
  const glass = box(1.45, 0.04, 0.6, 16.2, 0.91, 11.3, 0xbfe4e9, 0.01);
  glass.material = new THREE.MeshStandardMaterial({ color: 0xbfe4e9, transparent: true, opacity: 0.38, roughness: 0.18 });
  for (let i = 0; i < 4; i++) box(0.24, 0.16, 0.3, 15.7 + i * 0.32, 0.82, 11.3, [0xf9b7c9, 0xf5d989, 0xb0dba6, 0xd0b8dd][i], 0.02);
  return group;
}

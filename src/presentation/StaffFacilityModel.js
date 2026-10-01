import * as THREE from 'three';

// Small, open cutaway buildings keep the existing procedural world readable.
// The landing is the domain's exterior service point; the room remains solid.
export function createStaffFacilityModel(definition) {
  const { id, x, z, width = 3.2, depth = 4 } = definition;
  const group = new THREE.Group();
  group.name = `staff-${id}`;
  group.position.set(x, 0, z);
  group.userData.facilityId = id;
  group.userData.footprint = { width, depth };
  const colors = { wc: 0x48a9cd, rest: 0x70a95c, kitchen: 0xe5a44d };
  const material = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.75 });
  const wall = material(0xf6efd9);
  const accent = material(colors[id] ?? colors.rest);
  const wood = material(0x916d48);
  const metal = material(0x526568);
  const white = material(0xf8faf7);
  const dark = material(0x293b40);
  function box(name, sx, sy, sz, px, py, pz, mat = wall) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    mesh.name = name;
    mesh.position.set(px, py, pz);
    mesh.castShadow = sy > 0.1;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  box('staff-facility-floor', width, 0.08, depth, 0, 0.04, 0, material(0xddd9c9));
  box('staff-facility-back-wall', width, 1.7, 0.12, 0, 0.89, -halfDepth + 0.06);
  for (const side of [-1, 1]) {
    box('staff-facility-side-wall', 0.12, 1.15, depth, side * (halfWidth - 0.06), 0.615, 0);
    box('staff-facility-post', 0.13, 1.8, 0.13, side * (halfWidth - 0.1), 0.94, halfDepth - 0.1, accent);
  }
  box('staff-facility-lintel', width, 0.22, 0.18, 0, 1.75, halfDepth - 0.08, accent);
  // Partial roof reveals fixtures from the isometric camera without a new camera mode.
  box('staff-facility-roof', width, 0.1, 1.1, 0, 1.89, -halfDepth + 0.55, accent);
  box('staff-facility-landing', 1.75, 0.06, 1.2, 0, 0.03, 2.6, material(0xcacabb));

  const label = { wc: 'WC', rest: 'DİNLENME / REST', kitchen: 'PERSONEL MUTFAĞI / KITCHEN' }[id] ?? id;
  const signMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 112;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#29454b';
      ctx.fillRect(0, 0, 512, 112);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${id === 'kitchen' ? 27 : 36}px sans-serif`;
      ctx.fillText(label, 256, 57);
      signMaterial.map = new THREE.CanvasTexture(canvas);
      signMaterial.map.colorSpace = THREE.SRGBColorSpace;
    }
  }
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.3, 0.32), signMaterial);
  sign.name = 'staff-facility-sign';
  sign.position.set(0, 1.74, halfDepth + 0.025);
  group.add(sign);

  if (id === 'wc') {
    // Door panels frame the cutaway WC, with a cistern, bowl and small washbasin.
    for (const side of [-1, 1]) box('wc-front-panel', 0.9, 1.45, 0.12, side * 1.04, 0.81, halfDepth - 0.06, accent);
    box('staff-wc-fixture', 0.48, 0.61, 0.22, -0.6, 0.385, -1.45, white);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.17, 0.25, 12), white);
    bowl.position.set(-0.6, 0.39, -1.08);
    group.add(bowl);
    box('wc-seat', 0.52, 0.05, 0.55, -0.6, 0.535, -1.08, dark);
    box('wc-basin', 0.62, 0.12, 0.45, 0.75, 0.77, -1.4, white);
    box('wc-basin-pedestal', 0.19, 0.62, 0.19, 0.75, 0.39, -1.4, white);
    box('wc-tap', 0.04, 0.14, 0.04, 0.75, 0.9, -1.56, metal);
    box('wc-mirror', 0.62, 0.46, 0.03, 0.75, 1.26, -1.86, material(0x9dcccf));
  } else if (id === 'rest') {
    // Entrance bench aligns with the actual resting location (z = -12.4).
    box('staff-rest-fixture', 2.35, 0.12, 0.58, 0, 0.48, 2.6, wood);
    box('rest-bench-back', 2.35, 0.45, 0.1, 0, 0.78, 2.31, wood);
    for (const side of [-1, 1]) box('rest-bench-leg', 0.1, 0.42, 0.42, side * 0.98, 0.25, 2.6, metal);
    box('rest-cushion', 2.2, 0.06, 0.48, 0, 0.57, 2.62, accent);
    box('rest-sofa', 2.25, 0.36, 0.77, 0, 0.34, -1.12, accent);
    box('rest-sofa-back', 2.25, 0.47, 0.16, 0, 0.67, -1.46, accent);
    for (const side of [-1, 1]) box('rest-sofa-arm', 0.15, 0.43, 0.77, side * 1.06, 0.55, -1.12, accent);
    box('rest-coffee-table', 1.28, 0.1, 0.6, 0, 0.49, 0.16, wood);
    box('rest-table-leg', 0.16, 0.38, 0.16, 0, 0.24, 0.16, metal);
    box('rest-magazine', 0.29, 0.025, 0.23, 0.19, 0.56, 0.16, white);
  } else if (id === 'kitchen') {
    box('staff-kitchen-fixture', 2.5, 0.76, 0.68, -0.1, 0.46, -1.52, accent);
    box('kitchen-countertop', 2.6, 0.09, 0.73, -0.1, 0.885, -1.5, white);
    for (const px of [-0.75, 0.45]) box('kitchen-cabinet-handle', 0.25, 0.025, 0.04, px, 0.66, -1.157, metal);
    box('kitchen-sink', 0.65, 0.025, 0.4, -0.73, 0.943, -1.5, metal);
    box('kitchen-tap', 0.045, 0.22, 0.045, -0.73, 1.04, -1.73, metal);
    box('kitchen-coffee-machine', 0.43, 0.48, 0.35, 0.65, 1.17, -1.5, dark);
    box('kitchen-coffee-spout', 0.16, 0.1, 0.1, 0.65, 1.12, -1.275, metal);
    box('kitchen-fridge', 0.67, 1.45, 0.66, 1.11, 0.8, -0.48, white);
    box('kitchen-fridge-handle', 0.05, 0.43, 0.06, 0.86, 1.01, -0.115, metal);
    box('kitchen-service-shelf', 1.3, 0.1, 0.24, 0, 0.93, halfDepth - 0.08, wood);
    for (const px of [-0.34, 0.25]) {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.13, 10), white);
      cup.position.set(px, 1.045, halfDepth - 0.08);
      group.add(cup);
    }
  }
  return group;
}

export function disposeStaffFacilityModel(group) {
  const geometries = new Set();
  const materials = new Set();
  group.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    for (const mat of Array.isArray(object.material) ? object.material : [object.material]) if (mat) materials.add(mat);
  });
  for (const geometry of geometries) geometry.dispose();
  for (const mat of materials) { mat.map?.dispose(); mat.dispose(); }
  group.removeFromParent();
}

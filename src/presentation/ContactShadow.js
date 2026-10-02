import * as THREE from 'three';

let geometry;
let material;

export function addContactShadow(group, width = 0.9, depth = 0.65) {
  const existing = group.contactShadow ?? group.children.find(child => child.name === 'contact-shadow');
  if (existing) { group.contactShadow = existing; return existing; }
  if (!geometry) {
    const size = 32;
    const pixels = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const radius = Math.hypot((x + 0.5) / size * 2 - 1, (y + 0.5) / size * 2 - 1);
      const index = (y * size + x) * 4;
      pixels[index] = 37; pixels[index + 1] = 30; pixels[index + 2] = 28;
      pixels[index + 3] = Math.round(Math.max(0, 1 - radius) ** 1.6 * 255);
    }
    const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat);
    texture.magFilter = texture.minFilter = THREE.LinearFilter; texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    geometry = new THREE.PlaneGeometry(1, 1); geometry.userData.sharedAsset = true;
    material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.36,
      depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -1 });
    material.userData.sharedAsset = true;
  }
  const shadow = new THREE.Mesh(geometry, material);
  shadow.name = 'contact-shadow'; shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.015; shadow.scale.set(width, depth, 1);
  shadow.userData.baseWidth = width; shadow.userData.baseDepth = depth;
  group.add(shadow); group.contactShadow = shadow;
  return shadow;
}

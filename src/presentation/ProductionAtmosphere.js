import * as THREE from 'three';

// Four reusable puffs per machine; the frame loop never creates geometry/materials.
export function createProductionAtmosphere(group, id) {
  const source = id === 'bakery' ? [-0.2, 2.6, -0.2]
    : id === 'flourMill' ? [0.55, 0.7, 0.58]
      : ['paste', 'burgerKitchen', 'pizzaKitchen', 'orangeTartKitchen'].includes(id) ? [0, 1.8, 0] : null;
  if (!source) return { update() {} };
  const puffs = Array.from({ length: 4 }, (_, index) => {
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 1),
      new THREE.MeshBasicMaterial({ color: id === 'flourMill' ? 0xfff4da : 0xece5d5,
        transparent: true, opacity: 0, depthWrite: false }));
    mesh.visible = false; group.add(mesh); return mesh;
  });
  return {
    puffs,
    update(time, active) {
      puffs.forEach((mesh, index) => {
        mesh.visible = active;
        if (!active) return;
        const phase = (time * 0.45 + index / 4) % 1;
        mesh.position.set(source[0] + Math.sin(phase * 4 + index) * 0.12,
          source[1] + phase * 0.7, source[2] + Math.cos(phase * 3 + index) * 0.08);
        mesh.scale.setScalar(0.6 + phase * 2);
        mesh.material.opacity = Math.sin(phase * Math.PI) * 0.16;
      });
    },
  };
}

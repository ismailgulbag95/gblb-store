import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createDiningChair() {
  const chair = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.5 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: 0x9b2226, roughness: 0.4 });

  for (const cx of [-0.22, 0.22]) {
    for (const cz of [-0.22, 0.22]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.022, 0.46, 6), woodMat);
      leg.position.set(cx, 0.23, cz);
      leg.castShadow = true;
      chair.add(leg);
    }
  }

  const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.04, 0.54), woodMat);
  seatBase.position.y = 0.46;
  chair.add(seatBase);

  const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.08, 0.5, 2, 0.04), cushionMat);
  cushion.position.y = 0.5;
  cushion.castShadow = true;
  chair.add(cushion);

  for (const cx of [-0.2, 0.2]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.54, 0.04), woodMat);
    post.position.set(cx, 0.77, 0.22);
    chair.add(post);
  }

  const backRest = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.28, 0.06, 2, 0.03), cushionMat);
  backRest.position.set(0, 0.88, 0.21);
  backRest.castShadow = true;
  chair.add(backRest);

  return chair;
}

export function createDiningTableModel(itemFactory) {
  const group = new THREE.Group();

  const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x8d5b4c, roughness: 0.4 });
  const runnerMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.8 });
  const legMat = new THREE.MeshStandardMaterial({ color: 0x4a2e22, roughness: 0.6 });

  const top = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.12, 1.25), tableTopMat);
  top.position.y = 0.85;
  top.castShadow = true;
  group.add(top);

  const runner = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.125, 1.27), runnerMat);
  runner.position.y = 0.855;
  group.add(runner);

  for (const x of [-0.72, 0.72]) {
    for (const z of [-0.42, 0.42]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.8, 8), legMat);
      leg.position.set(x, 0.4, z);
      leg.castShadow = true;
      group.add(leg);
    }
  }

  const customerChair = createDiningChair();
  customerChair.position.set(0, 0, 0.95);
  customerChair.rotation.y = 0;
  group.add(customerChair);

  const oppositeChair = createDiningChair();
  oppositeChair.position.set(0, 0, -0.95);
  oppositeChair.rotation.y = Math.PI;
  group.add(oppositeChair);

  const mealGroup = new THREE.Group();
  mealGroup.position.set(0, 0.91, 0.15);

  const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.22, 0.035, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.05 })
  );
  plate.receiveShadow = true;
  mealGroup.add(plate);

  const foodMesh = new THREE.Mesh(itemFactory.getItemGeometry('BURGER'), itemFactory.getItemMaterial('BURGER'));
  foodMesh.position.y = 0.08;
  foodMesh.scale.setScalar(0.7);
  foodMesh.visible = false;
  mealGroup.add(foodMesh);

  const tipGroup = new THREE.Group();
  tipGroup.position.set(0.32, 0.02, -0.05);
  const coin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.05, 12),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.85, roughness: 0.2, emissive: 0x332200 })
  );
  coin.position.y = 0.025;
  tipGroup.add(coin);
  tipGroup.visible = false;
  mealGroup.add(tipGroup);

  group.add(mealGroup);
  group.userData = { foodMesh, tipGroup, plate };

  return group;
}

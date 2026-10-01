import * as THREE from 'three';
import { STATIONS } from '../domain/catalog.js';

export function createRegisterModel() {
  const group = new THREE.Group();
  group.position.set(STATIONS.register.x, 0, STATIONS.register.z);

  const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.35 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.25 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.6 });
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
  const bagMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 });

  const counterBody = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.82, 1.1), redMat);
  counterBody.position.y = 0.41;
  counterBody.castShadow = true;
  counterBody.receiveShadow = true;
  group.add(counterBody);

  const kickplate = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.1, 1.14), darkMat);
  kickplate.position.y = 0.05;
  group.add(kickplate);

  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(2.56, 0.1, 1.16), whiteMat);
  counterTop.position.y = 0.87;
  counterTop.castShadow = true;
  group.add(counterTop);

  const conveyorBelt = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.02, 0.55), beltMat);
  conveyorBelt.position.set(-0.4, 0.93, 0.16);
  group.add(conveyorBelt);

  for (const sx of [-0.85, -0.15]) {
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), chromeMat);
    stick.rotation.x = Math.PI / 2;
    stick.position.set(sx, 0.95, 0.16);
    group.add(stick);
  }

  const posPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.28, 8), darkMat);
  posPedestal.position.set(0.38, 1.05, -0.22);
  group.add(posPedestal);

  const cashierScreen = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.08), darkMat);
  cashierScreen.position.set(0.38, 1.25, -0.22);
  cashierScreen.rotation.x = 0.25;
  group.add(cashierScreen);

  const touchGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.32, 0.22),
    new THREE.MeshBasicMaterial({ color: 0x00d2d3 })
  );
  touchGlass.position.set(0.38, 1.25, -0.265);
  touchGlass.rotation.y = Math.PI;
  touchGlass.rotation.x = -0.25;
  group.add(touchGlass);

  const customerDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.06), darkMat);
  customerDisplay.position.set(0.38, 1.22, -0.15);
  const priceText = new THREE.Mesh(
    new THREE.PlaneGeometry(0.28, 0.12),
    new THREE.MeshBasicMaterial({ color: 0x2ed573 })
  );
  priceText.position.set(0.38, 1.22, -0.115);
  group.add(customerDisplay, priceText);

  const scannerPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.02, 0.22),
    new THREE.MeshStandardMaterial({
      color: 0x2ed573,
      emissive: 0x2ed573,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    })
  );
  scannerPlate.position.set(0.38, 0.93, 0.16);
  group.add(scannerPlate);

  const pinPad = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.18), darkMat);
  pinPad.position.set(0.72, 0.96, 0.35);
  pinPad.rotation.x = -0.25;
  group.add(pinPad);

  for (const [bx, bz] of [[0.95, -0.15], [1.12, 0.18]]) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.38, 0.2), bagMat);
    bag.position.set(bx, 1.11, bz);
    bag.castShadow = true;
    group.add(bag);

    const greenTop = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.18, 5),
      new THREE.MeshStandardMaterial({ color: 0x2ed573 })
    );
    greenTop.position.set(bx - 0.04, 1.35, bz + 0.03);
    greenTop.rotation.z = -0.2;
    group.add(greenTop);

    const baguette = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.035, 0.32, 6),
      new THREE.MeshStandardMaterial({ color: 0xc27c38 })
    );
    baguette.position.set(bx + 0.05, 1.38, bz - 0.02);
    baguette.rotation.z = 0.25;
    group.add(baguette);
  }

  const railingGroup = new THREE.Group();
  for (const rx of [-1.15, 0.15, 1.25]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.95, 8), chromeMat);
    post.position.set(rx, 0.475, 0.72);
    post.castShadow = true;
    railingGroup.add(post);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), chromeMat);
    cap.position.set(rx, 0.96, 0.72);
    railingGroup.add(cap);
  }
  const railTop = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.4, 8), chromeMat);
  railTop.rotation.z = Math.PI / 2;
  railTop.position.set(0.05, 0.88, 0.72);
  const railMid = railTop.clone();
  railMid.position.y = 0.45;
  railingGroup.add(railTop, railMid);
  group.add(railingGroup);

  return group;
}

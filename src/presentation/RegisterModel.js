import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { STATIONS } from '../domain/catalog.js';

export function createRegisterModel() {
  const group = new THREE.Group();
  group.position.set(STATIONS.register.x, 0, STATIONS.register.z);

  // High-Grade Materials
  const counterRed = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.35, metalness: 0.1 });
  const kickplateDark = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.7 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.18 });
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
  const posDarkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.5 });
  const screenTeal = new THREE.MeshStandardMaterial({
    color: 0x00cec9,
    emissive: 0x00cec9,
    emissiveIntensity: 0.6,
    roughness: 0.1,
  });
  const scannerGreen = new THREE.MeshStandardMaterial({
    color: 0x2ed573,
    emissive: 0x2ed573,
    emissiveIntensity: 0.8,
    roughness: 0.1,
  });
  const kraftBagMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 });
  const leafGreenMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.4 });
  const breadCrustMat = new THREE.MeshStandardMaterial({ color: 0xc27c38, roughness: 0.8 });
  const celeryMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3 });
  const signRedMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 });

  // 1. Main Checkout Counter Body (Vibrant Red Painted Steel with Chrome Corner Protectors)
  const counterBody = new THREE.Mesh(new RoundedBoxGeometry(2.6, 0.82, 1.15, 3, 0.06), counterRed);
  counterBody.position.y = 0.41;
  counterBody.castShadow = true;
  counterBody.receiveShadow = true;
  group.add(counterBody);

  // Dark Recessed Base Kickplate
  const kickplate = new THREE.Mesh(new RoundedBoxGeometry(2.64, 0.1, 1.18, 2, 0.03), kickplateDark);
  kickplate.position.y = 0.05;
  group.add(kickplate);

  // Chrome Corner Impact Bumpers
  for (const bx of [-1.28, 1.28]) {
    for (const bz of [-0.56, 0.56]) {
      const bumper = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), chromeMat);
      bumper.position.set(bx, 0.42, bz);
      group.add(bumper);
    }
  }

  // Brushed Stainless Steel Countertop Slab
  const counterTop = new THREE.Mesh(new RoundedBoxGeometry(2.66, 0.08, 1.22, 2, 0.03), chromeMat);
  counterTop.position.y = 0.86;
  counterTop.castShadow = true;
  group.add(counterTop);

  // 2. Motorized Conveyor Belt System with Chrome Border Rails
  const conveyorBelt = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.025, 0.56), beltMat);
  conveyorBelt.position.set(-0.46, 0.915, 0.18);
  conveyorBelt.receiveShadow = true;
  group.add(conveyorBelt);

  // Chrome side guide rails
  for (const rz of [-0.12, 0.48]) {
    const guideRail = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.04, 0.025), chromeMat);
    guideRail.position.set(-0.46, 0.935, rz);
    group.add(guideRail);
  }

  // Red & Chrome Item Divider Bars
  for (const dx of [-0.95, -0.25]) {
    const divider = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.52, 8), signRedMat);
    divider.rotation.x = Math.PI / 2;
    divider.position.set(dx, 0.94, 0.18);
    divider.castShadow = true;
    group.add(divider);

    for (const endZ of [-0.07, 0.43]) {
      const dividerTip = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 8), chromeMat);
      dividerTip.rotation.x = Math.PI / 2;
      dividerTip.position.set(dx, 0.94, endZ);
      group.add(dividerTip);
    }
  }

  // Groceries on the Conveyor Belt advancing towards Cashier
  // Bananas
  const bananaCluster = new THREE.Group();
  bananaCluster.position.set(-0.75, 0.94, 0.18);
  for (let b = 0; b < 4; b++) {
    const bMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.22, 6),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.35 })
    );
    bMesh.rotation.z = Math.PI / 2 + (b - 1.5) * 0.15;
    bMesh.position.set((b - 1.5) * 0.04, 0.04, 0);
    bMesh.castShadow = true;
    bananaCluster.add(bMesh);
  }
  group.add(bananaCluster);

  // Red grocery box
  const redBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.22, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 })
  );
  redBox.position.set(-0.52, 1.03, 0.12);
  redBox.castShadow = true;
  group.add(redBox);

  // Blue milk carton
  const milkCarton = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.24, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.3 })
  );
  milkCarton.position.set(-0.48, 1.04, 0.28);
  milkCarton.castShadow = true;
  group.add(milkCarton);

  // Yellow cereal box
  const yellowBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.25, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.4 })
  );
  yellowBox.position.set(-0.06, 1.04, 0.18);
  yellowBox.castShadow = true;
  group.add(yellowBox);

  // 3. Cashier POS Terminal & Scanner System
  // Cashier POS Pedestal & Main Touchscreen
  const posPole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.35, 8), posDarkMat);
  posPole.position.set(0.38, 1.05, -0.24);
  posPole.castShadow = true;
  group.add(posPole);

  const posHead = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.3, 0.06, 2, 0.015), posDarkMat);
  posHead.position.set(0.38, 1.26, -0.24);
  posHead.rotation.x = 0.28;
  posHead.castShadow = true;
  group.add(posHead);

  // Touchscreen Display Glass
  const posGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.26), screenTeal);
  posGlass.position.set(0.38, 1.26, -0.275);
  posGlass.rotation.y = Math.PI;
  posGlass.rotation.x = -0.28;
  group.add(posGlass);

  // Customer-facing Price Display
  const custDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.05), posDarkMat);
  custDisplay.position.set(0.38, 1.22, -0.16);
  custDisplay.castShadow = true;
  group.add(custDisplay);

  const priceGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.26, 0.11),
    new THREE.MeshBasicMaterial({ color: 0x2ed573 })
  );
  priceGlass.position.set(0.38, 1.22, -0.132);
  group.add(priceGlass);

  // Built-in Flatbed Barcode Scanner / Optical Scale Window
  const scannerBed = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.28), posDarkMat);
  scannerBed.position.set(0.42, 0.915, 0.18);
  group.add(scannerBed);

  const scannerGlass = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.025, 0.22), scannerGreen);
  scannerGlass.position.set(0.42, 0.918, 0.18);
  group.add(scannerGlass);

  // Customer Payment PIN Pad / Contactless Terminal on Angled Swivel Arm
  const pinPole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.14, 6), chromeMat);
  pinPole.position.set(0.72, 0.97, 0.38);
  group.add(pinPole);

  const pinPad = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.04, 0.2, 2, 0.01), posDarkMat);
  pinPad.position.set(0.72, 1.04, 0.38);
  pinPad.rotation.x = -0.32;
  pinPad.castShadow = true;
  group.add(pinPad);

  const pinScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.07), screenTeal);
  pinScreen.position.set(0.72, 1.055, 0.34);
  pinScreen.rotation.x = -0.32;
  group.add(pinScreen);

  // 4. Bagging Well & Upright Kraft Grocery Bags
  const baggingStand = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.04, 0.62), chromeMat);
  baggingStand.position.set(1.02, 0.88, 0.05);
  group.add(baggingStand);

  // Upright Kraft Paper Bags with Green Leaf Eco Emblem
  for (const [bx, bz, rotY] of [[0.95, -0.12, 0.1], [1.12, 0.2, -0.15]]) {
    const bagGroup = new THREE.Group();
    bagGroup.position.set(bx, 0.9, bz);
    bagGroup.rotation.y = rotY;

    const bag = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.44, 0.22, 2, 0.02), kraftBagMat);
    bag.position.y = 0.22;
    bag.castShadow = true;
    bagGroup.add(bag);

    // Green Leaf Eco Logo on front of bag
    const leafLogo = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), leafGreenMat);
    leafLogo.position.set(0, 0.24, 0.115);
    bagGroup.add(leafLogo);

    // Groceries peeking out of bag
    const baguette = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.038, 0.38, 8), breadCrustMat);
    baguette.position.set(0.06, 0.46, -0.02);
    baguette.rotation.z = 0.22;
    baguette.castShadow = true;
    bagGroup.add(baguette);

    const celery = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.24, 5), celeryMat);
    celery.position.set(-0.06, 0.45, 0.04);
    celery.rotation.z = -0.25;
    bagGroup.add(celery);

    group.add(bagGroup);
  }

  // 5. Customer Queue Barrier Rail & Security Swing Gate
  const railingGroup = new THREE.Group();
  for (const rx of [-1.22, 0.12, 1.28]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.96, 8), chromeMat);
    post.position.set(rx, 0.48, 0.76);
    post.castShadow = true;
    railingGroup.add(post);

    const ballCap = new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 8), chromeMat);
    ballCap.position.set(rx, 0.98, 0.76);
    railingGroup.add(ballCap);
  }

  const railTop = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.5, 8), chromeMat);
  railTop.rotation.z = Math.PI / 2;
  railTop.position.set(0.03, 0.9, 0.76);
  const railMid = railTop.clone();
  railMid.position.y = 0.46;
  railingGroup.add(railTop, railMid);

  // Security Swing Gate with Red/White "No Entry / Stop" disk
  const gateFrame = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.02), chromeMat);
  gateFrame.position.set(-0.7, 0.68, 0.76);
  railingGroup.add(gateFrame);

  const stopSign = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 16), signRedMat);
  stopSign.rotation.x = Math.PI / 2;
  stopSign.position.set(-0.7, 0.68, 0.775);
  railingGroup.add(stopSign);

  const stopWhiteBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.025), whiteMat);
  stopWhiteBar.position.set(-0.7, 0.68, 0.78);
  railingGroup.add(stopWhiteBar);

  group.add(railingGroup);

  // 6. Front Impulse Candy & Snack Merchandising Rack
  const impulseShelfMat = new THREE.MeshStandardMaterial({ color: 0x353b48, roughness: 0.5 });
  for (const sy of [0.36, 0.62]) {
    const shelfTray = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.03, 0.2), impulseShelfMat);
    shelfTray.position.set(-0.35, sy, 0.62);
    group.add(shelfTray);

    const shelfLip = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.06, 0.02), chromeMat);
    shelfLip.position.set(-0.35, sy + 0.03, 0.72);
    group.add(shelfLip);

    // Colorful snack bars & candy packets
    const candyColors = [0xe74c3c, 0xf1c40f, 0x2ecc71, 0x3498db, 0x9b59b6, 0xe67e22];
    for (let c = 0; c < 7; c++) {
      const candyMat = new THREE.MeshStandardMaterial({
        color: candyColors[c % candyColors.length],
        roughness: 0.4,
      });
      const candy = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.12), candyMat);
      candy.position.set(-1.02 + c * 0.23, sy + 0.05, 0.63);
      candy.castShadow = true;
      group.add(candy);
    }
  }

  // 7. Overhead Lane Indicator Tower with illuminated "1" sign
  const lanePole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.45, 8), chromeMat);
  lanePole.position.set(1.2, 1.5, -0.48);
  lanePole.castShadow = true;
  group.add(lanePole);

  const laneSignMat = new THREE.MeshStandardMaterial({
    color: 0x2ed573,
    emissive: 0x2ed573,
    emissiveIntensity: 0.4,
    roughness: 0.2,
  });
  const laneSign = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.38, 0.12, 2, 0.02), laneSignMat);
  laneSign.position.set(1.2, 2.2, -0.48);
  laneSign.castShadow = true;
  group.add(laneSign);

  const laneSignCanvas = typeof document !== 'undefined'
    ? document.createElement('canvas')
    : { width: 128, height: 128, getContext: () => ({ fillText: () => {}, fillRect: () => {} }) };
  laneSignCanvas.width = 128;
  laneSignCanvas.height = 128;
  const lctx = laneSignCanvas.getContext ? laneSignCanvas.getContext('2d') : null;
  if (lctx) {
    lctx.fillStyle = '#2ed573';
    lctx.fillRect(0, 0, 128, 128);
    lctx.fillStyle = '#ffffff';
    lctx.font = 'bold 84px Fredoka, sans-serif';
    lctx.textAlign = 'center';
    lctx.textBaseline = 'middle';
    lctx.fillText('1', 64, 64);
  }
  const laneSignTexture = new THREE.CanvasTexture(laneSignCanvas);
  laneSignTexture.colorSpace = THREE.SRGBColorSpace;
  const laneNumPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.34),
    new THREE.MeshBasicMaterial({ map: laneSignTexture, toneMapped: false })
  );
  laneNumPlane.position.set(1.2, 2.2, -0.415);
  group.add(laneNumPlane);

  return group;
}

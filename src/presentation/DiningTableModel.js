import * as THREE from 'three';
import { addContactShadow } from './ContactShadow.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createDiningChair(cushionColor = 0xd63031, woodColor = 0x6d4c41) {
  const chair = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.55 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: cushionColor, roughness: 0.45 });

  // 4 Tapered Wooden Legs with subtle natural splay
  const legPositions = [
    [-0.2, -0.2],
    [0.2, -0.2],
    [-0.2, 0.2],
    [0.2, 0.2],
  ];

  for (const [lx, lz] of legPositions) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 0.46, 8), woodMat);
    leg.position.set(lx, 0.23, lz);
    leg.rotation.z = (lx > 0 ? -0.04 : 0.04);
    leg.rotation.x = (lz > 0 ? 0.04 : -0.04);
    leg.castShadow = true;
    chair.add(leg);
  }

  // Wooden Seat Base Frame
  const seatBase = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.04, 0.52, 2, 0.015), woodMat);
  seatBase.position.y = 0.46;
  seatBase.castShadow = true;
  chair.add(seatBase);

  // Soft Upholstered Cushion (Red or Green)
  const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.08, 0.48, 3, 0.03), cushionMat);
  cushion.position.y = 0.51;
  cushion.castShadow = true;
  chair.add(cushion);

  // Rear Uprights
  for (const rx of [-0.18, 0.18]) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.48, 8), woodMat);
    post.position.set(rx, 0.73, 0.2);
    post.rotation.x = 0.05;
    post.castShadow = true;
    chair.add(post);
  }

  // Ergonomic Curved Wooden Backrest
  const backRest = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.18, 0.04, 2, 0.015), woodMat);
  backRest.position.set(0, 0.88, 0.22);
  backRest.rotation.x = 0.05;
  backRest.castShadow = true;
  chair.add(backRest);

  return chair;
}

export function createDiningTableModel(itemFactory, tableId = 'table1') {
  const group = new THREE.Group();
  addContactShadow(group, 2.8, 2.1);

  // Fine Restaurant Materials
  const honeyOakMat = new THREE.MeshStandardMaterial({ color: 0xb3743a, roughness: 0.45 });
  const darkPedestalMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.6, metalness: 0.3 });
  const ceramicWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.25 });
  const plantGreenMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5 });
  const metalSilverMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.8, roughness: 0.2 });

  let mealY = 0.86;

  if (tableId === 'table2') {
    // -------------------------------------------------------------
    // Set B: Round Bistro Cafe Table Set with Forest Green Chairs
    // -------------------------------------------------------------
    const roundTop = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.08, 24), honeyOakMat);
    roundTop.position.y = 0.82;
    roundTop.castShadow = true;
    group.add(roundTop);

    // Dark Pedestal & Weighted Round Base
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.76, 12), darkPedestalMat);
    pedestal.position.y = 0.4;
    pedestal.castShadow = true;
    group.add(pedestal);

    const baseDisk = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.4, 0.04, 16), darkPedestalMat);
    baseDisk.position.y = 0.02;
    group.add(baseDisk);

    // 2 Chairs with Forest Green Cushions
    const chairNorth = createDiningChair(0x27ae60);
    chairNorth.position.set(0, 0, -0.88);
    chairNorth.rotation.y = Math.PI;
    group.add(chairNorth);

    const chairSouth = createDiningChair(0x27ae60);
    chairSouth.position.set(0, 0, 0.88);
    chairSouth.rotation.y = 0;
    group.add(chairSouth);

    // Tabletop Centerpiece: Mini Ceramic Succulent Planter & Napkin Holder
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, 0.1, 10), ceramicWhiteMat);
    pot.position.set(0.18, 0.91, -0.05);
    group.add(pot);

    const succulent = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), plantGreenMat);
    succulent.position.set(0.18, 0.98, -0.05);
    succulent.scale.set(1.1, 0.8, 1.1);
    group.add(succulent);

    const napkin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.06), metalSilverMat);
    napkin.position.set(-0.18, 0.92, -0.05);
    group.add(napkin);

    mealY = 0.86;

  } else if (tableId === 'table3') {
    // -------------------------------------------------------------
    // Set C: Long Communal Banquet Table Set with Planter Centerpiece
    // -------------------------------------------------------------
    const longTop = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.09, 1.1, 3, 0.02), honeyOakMat);
    longTop.position.y = 0.82;
    longTop.castShadow = true;
    group.add(longTop);

    // Heavy Architectural Trapezoidal Trestle Legs
    for (const lx of [-0.85, 0.85]) {
      const trestle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.78, 0.85), darkPedestalMat);
      trestle.position.set(lx, 0.39, 0);
      trestle.castShadow = true;
      group.add(trestle);

      const footBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.95), darkPedestalMat);
      footBeam.position.set(lx, 0.025, 0);
      group.add(footBeam);
    }

    // 6 Dining Chairs (3 on each side)
    for (let c = 0; c < 3; c++) {
      const cx = -0.7 + c * 0.7;
      const color = c % 2 === 0 ? 0xd63031 : 0x27ae60;

      const chairFront = createDiningChair(color);
      chairFront.position.set(cx, 0, 0.88);
      chairFront.rotation.y = 0;
      group.add(chairFront);

      const chairBack = createDiningChair(color);
      chairBack.position.set(cx, 0, -0.88);
      chairBack.rotation.y = Math.PI;
      group.add(chairBack);
    }

    // Long Succulent Planter Box Centerpiece
    const planterBox = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.08, 0.22, 2, 0.01), honeyOakMat);
    planterBox.position.set(0, 0.9, -0.15);
    group.add(planterBox);

    for (let p = 0; p < 4; p++) {
      const succ = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), plantGreenMat);
      succ.position.set(-0.3 + p * 0.2, 0.96, -0.15);
      succ.scale.set(1.1, 0.85, 1.1);
      group.add(succ);
    }

    // Salt / Pepper Shakers & Napkin Dispenser
    const napkinDispenser = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.06), metalSilverMat);
    napkinDispenser.position.set(0.62, 0.93, -0.15);
    group.add(napkinDispenser);

    mealY = 0.865;

  } else {
    // -------------------------------------------------------------
    // Set A: Square 4-Seater Dining Set with Vibrant Red Chairs
    // -------------------------------------------------------------
    const squareTop = new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.08, 1.4, 3, 0.02), honeyOakMat);
    squareTop.position.y = 0.82;
    squareTop.castShadow = true;
    group.add(squareTop);

    // Dark Pedestal & Square Floor Base
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.76, 12), darkPedestalMat);
    pedestal.position.y = 0.4;
    pedestal.castShadow = true;
    group.add(pedestal);

    const floorPlate = new THREE.Mesh(new RoundedBoxGeometry(0.65, 0.04, 0.65, 2, 0.015), darkPedestalMat);
    floorPlate.position.y = 0.02;
    group.add(floorPlate);

    // 4 Dining Chairs with Vibrant Red Cushions (North, South, East, West)
    const chairSouth = createDiningChair(0xd63031);
    chairSouth.position.set(0, 0, 0.92);
    chairSouth.rotation.y = 0;
    group.add(chairSouth);

    const chairNorth = createDiningChair(0xd63031);
    chairNorth.position.set(0, 0, -0.92);
    chairNorth.rotation.y = Math.PI;
    group.add(chairNorth);

    const chairEast = createDiningChair(0xd63031);
    chairEast.position.set(0.92, 0, 0);
    chairEast.rotation.y = -Math.PI / 2;
    group.add(chairEast);

    const chairWest = createDiningChair(0xd63031);
    chairWest.position.set(-0.92, 0, 0);
    chairWest.rotation.y = Math.PI / 2;
    group.add(chairWest);

    // Tabletop Centerpiece: Potted Plant & Napkin Dispenser
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.1, 10), ceramicWhiteMat);
    pot.position.set(0.2, 0.91, -0.15);
    group.add(pot);

    const plant = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), plantGreenMat);
    plant.position.set(0.2, 0.98, -0.15);
    plant.scale.set(1.1, 0.85, 1.1);
    group.add(plant);

    const napkin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.06), metalSilverMat);
    napkin.position.set(-0.2, 0.92, -0.15);
    group.add(napkin);

    mealY = 0.86;
  }

  // Meal & Tip Components (Preserving interface for WorldScene.js)
  const mealGroup = new THREE.Group();
  mealGroup.position.set(0, mealY, 0.15);

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

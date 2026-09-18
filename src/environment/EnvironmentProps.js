import * as THREE from 'three';

/**
 * EnvironmentProps creates stylized low-poly environmental assets:
 * - Trees (Oak, Pine, Fruit trees)
 * - Parking lot with colorful cars
 * - Striped store awning & 3D sign
 * - Wooden fences, street lamps, hedges and flowerbeds
 */
export class EnvironmentProps {
  constructor(scene) {
    this.scene = scene;
    this.animatedTrees = [];
  }

  // --- 1. TREES & VEGETATION ---
  createOakTree(x, z, scale = 1.0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.scale.set(scale, scale, scale);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.4, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.7;
    trunk.castShadow = true;
    group.add(trunk);

    // Foliage layers (multi-tier fluffy spheres)
    const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6, flatShading: true });
    const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6, flatShading: true });

    const fol1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9, 1), leafMat1);
    fol1.position.y = 1.8;
    fol1.castShadow = true;

    const fol2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.75, 1), leafMat2);
    fol2.position.set(0.2, 2.3, 0.1);
    fol2.castShadow = true;

    const fol3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6, 1), leafMat1);
    fol3.position.set(-0.25, 2.0, -0.2);
    fol3.castShadow = true;

    group.add(fol1, fol2, fol3);
    this.scene.add(group);
    this.animatedTrees.push(group);
    return group;
  }

  createPineTree(x, z, scale = 1.0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.scale.set(scale, scale, scale);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.22, 1.0, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.5;
    trunk.castShadow = true;
    group.add(trunk);

    // Pine cones layers
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20, roughness: 0.6, flatShading: true });
    
    const cone1 = new THREE.Mesh(new THREE.ConeGeometry(1.1, 1.2, 6), pineMat);
    cone1.position.y = 1.4;
    cone1.castShadow = true;

    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.0, 6), pineMat);
    cone2.position.y = 2.1;
    cone2.castShadow = true;

    const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.8, 6), pineMat);
    cone3.position.y = 2.7;
    cone3.castShadow = true;

    group.add(cone1, cone2, cone3);
    this.scene.add(group);
    this.animatedTrees.push(group);
    return group;
  }

  createHedge(x, z, width = 3, height = 0.8, depth = 0.6) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8, flatShading: true });
    const hedge = new THREE.Mesh(geo, mat);
    hedge.position.set(x, height / 2, z);
    hedge.castShadow = true;
    hedge.receiveShadow = true;
    this.scene.add(hedge);
    return hedge;
  }

  // --- 2. STORE AWNING & ARCHITECTURE ---
  createStoreAwning(x, y, z, width = 8, depth = 1.8) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Awning stripes (Red and White alternating ribs)
    const stripeCount = 10;
    const stripeWidth = width / stripeCount;

    for (let i = 0; i < stripeCount; i++) {
      const isRed = i % 2 === 0;
      const color = isRed ? 0xe74c3c : 0xf5f6fa;
      const mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.4 });
      const geo = new THREE.BoxGeometry(stripeWidth * 0.96, 0.12, depth);
      const stripe = new THREE.Mesh(geo, mat);
      stripe.position.set((i - stripeCount / 2 + 0.5) * stripeWidth, 0, depth / 2);
      stripe.rotation.x = 0.35; // slope down
      stripe.castShadow = true;
      group.add(stripe);

      // Frill edge
      const frillGeo = new THREE.BoxGeometry(stripeWidth * 0.96, 0.25, 0.08);
      const frill = new THREE.Mesh(frillGeo, mat);
      frill.position.set((i - stripeCount / 2 + 0.5) * stripeWidth, -0.15 - depth * 0.32, depth * 0.9);
      group.add(frill);
    }

    // Support metal brackets
    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x34495e, metalness: 0.7 });
    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4), bracketMat);
    b1.position.set(-width / 2 + 0.2, -0.4, depth * 0.6);
    b1.rotation.x = -0.7;

    const b2 = b1.clone();
    b2.position.x = width / 2 - 0.2;

    group.add(b1, b2);
    this.scene.add(group);
    return group;
  }

  createStoreSign(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Signboard back
    const boardGeo = new THREE.BoxGeometry(5.2, 1.1, 0.3);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.3 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.castShadow = true;
    group.add(board);

    // Gold frame
    const frameGeo = new THREE.BoxGeometry(5.4, 1.25, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    group.add(frame);

    // Canvas text texture for crisp signboard
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 52px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛒 MINI MART', 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const textMat = new THREE.MeshBasicMaterial({ map: texture });
    const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 0.9), textMat);
    textPlane.position.z = 0.16;
    group.add(textPlane);

    this.scene.add(group);
    return group;
  }

  // --- 3. PARKING LOT & CARS ---
  createCar(x, z, rotationY = 0, carColor = 0xe74c3c) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Body chassis
    const bodyMat = new THREE.MeshStandardMaterial({ color: carColor, roughness: 0.2, metalness: 0.3 });
    const chassisGeo = new THREE.BoxGeometry(2.2, 0.6, 1.2);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.45;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    // Cabin / Roof & Windows
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.1 });
    const cabinGeo = new THREE.BoxGeometry(1.2, 0.55, 1.05);
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(-0.15, 0.95, 0);
    cabin.castShadow = true;
    group.add(cabin);

    // Windshield (tinted cyan glass)
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x81ecec, roughness: 0.1, metalness: 0.8 });
    const windGeo = new THREE.PlaneGeometry(0.9, 0.4);
    const frontWind = new THREE.Mesh(windGeo, glassMat);
    frontWind.rotation.y = Math.PI / 2;
    frontWind.position.set(0.46, 0.92, 0);
    group.add(frontWind);

    // Headlights
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });
    const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.2), lightMat);
    hl1.position.set(1.11, 0.48, 0.38);
    const hl2 = hl1.clone();
    hl2.position.z = -0.38;
    group.add(hl1, hl2);

    // Taillights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xff3838 });
    const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.18), tailMat);
    tl1.position.set(-1.11, 0.52, 0.4);
    const tl2 = tl1.clone();
    tl2.position.z = -0.4;
    group.add(tl1, tl2);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.8 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.8 });

    const wheelPositions = [
      { x: 0.65, z: 0.6 },
      { x: -0.65, z: 0.6 },
      { x: 0.65, z: -0.6 },
      { x: -0.65, z: -0.6 }
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos.x, 0.24, pos.z);
      wheel.castShadow = true;

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.17, 8), rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(pos.x, 0.24, pos.z);

      group.add(wheel, rim);
    });

    this.scene.add(group);
    return group;
  }

  // --- 4. STREET LAMPS & FENCES ---
  createStreetLamp(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Metal pole
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.12, 3.2, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.8 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 1.6;
    pole.castShadow = true;
    group.add(pole);

    // Lamp head / Lantern
    const headGeo = new THREE.BoxGeometry(0.45, 0.35, 0.45);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x1a252f, metalness: 0.9 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0.2, 3.2, 0);
    group.add(head);

    // Glowing bulb
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfffa65 })
    );
    bulb.position.set(0.2, 3.05, 0);
    group.add(bulb);

    // Warm Point Light
    const light = new THREE.PointLight(0xfffa65, 0.6, 6);
    light.position.set(0.2, 3.0, 0);
    group.add(light);

    this.scene.add(group);
    return group;
  }

  createWoodenFence(x, z, length = 6, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 });
    const postCount = Math.floor(length / 1.5) + 1;

    // Vertical posts
    for (let i = 0; i < postCount; i++) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.75, 0.12), woodMat);
      post.position.set((i - (postCount - 1) / 2) * 1.5, 0.375, 0);
      post.castShadow = true;
      group.add(post);
    }

    // Horizontal rails
    const rail1 = new THREE.Mesh(new THREE.BoxGeometry(length, 0.08, 0.06), woodMat);
    rail1.position.set(0, 0.5, 0);
    rail1.castShadow = true;

    const rail2 = rail1.clone();
    rail2.position.y = 0.25;

    group.add(rail1, rail2);
    this.scene.add(group);
    return group;
  }

  update(delta, time) {
    // Gentle wind breeze swaying foliage
    const sway = Math.sin(time * 1.5) * 0.03;
    this.animatedTrees.forEach((t, i) => {
      t.rotation.z = sway * ((i % 2 === 0) ? 1 : -0.8);
    });
  }
}

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

    // Foliage layers (multi-tier fluffy spheres - rich vibrant emerald and lime greens)
    const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5, flatShading: true });
    const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.5, flatShading: true });

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

    // Pine cones layers (Vibrant forest pine green)
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x009432, roughness: 0.5, flatShading: true });
    
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
    const mat = new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.7, flatShading: true });
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

    // Awning stripes (Vibrant Red and Crisp White alternating ribs)
    const stripeCount = 10;
    const stripeWidth = width / stripeCount;

    for (let i = 0; i < stripeCount; i++) {
      const isRed = i % 2 === 0;
      const color = isRed ? 0xff4757 : 0xffffff;
      const mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3 });
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
    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, metalness: 0.7 });
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
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.3 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.castShadow = true;
    group.add(board);

    // Gold frame
    const frameGeo = new THREE.BoxGeometry(5.4, 1.25, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.85, roughness: 0.15 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    group.add(frame);

    // Canvas text texture for crisp signboard
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = '#ffc048';
    ctx.font = 'bold 52px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛒 GBLB STORE', 256, 64);

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

  // --- 5. SUPERMARKET SPECIFIC ASSETS (MATCHING REFERENCE IMAGES) ---

  /**
   * Builds a detailed low-poly metal wire shopping cart (used for world decor & customer cart pushing).
   */
  createShoppingCartModel(scale = 1.0) {
    const group = new THREE.Group();
    group.scale.set(scale, scale, scale);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xdcdde1,
      metalness: 0.85,
      roughness: 0.25,
    });
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x57606f,
      metalness: 0.7,
      roughness: 0.4,
    });
    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff3838,
      roughness: 0.35,
    });

    // 1. Lower chassis frame
    const baseChassis = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.44), metalMat);
    baseChassis.position.y = 0.12;
    baseChassis.castShadow = true;
    group.add(baseChassis);

    // 2. Four caster wheels with little brackets
    const wheelPositions = [
      [-0.22, 0.18],
      [0.22, 0.18],
      [-0.22, -0.18],
      [0.22, -0.18],
    ];
    for (const [wx, wz] of wheelPositions) {
      const fork = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.08, 6), darkMetal);
      fork.position.set(wx, 0.08, wz);
      group.add(fork);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.025, 8), darkMetal);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.045, wz);
      group.add(wheel);
    }

    // 3. Lower storage wire shelf
    const lowerShelf = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.02, 0.38), metalMat);
    lowerShelf.position.y = 0.18;
    group.add(lowerShelf);

    // 4. Upright support pillars connecting chassis to main basket
    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.55, 6), metalMat);
      pillar.position.set(-0.18, 0.42, side * 0.19);
      pillar.rotation.x = side * -0.08;
      pillar.rotation.z = 0.22;
      group.add(pillar);

      const frontPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), metalMat);
      frontPillar.position.set(0.18, 0.35, side * 0.19);
      group.add(frontPillar);
    }

    // 5. Wire Mesh Shopping Basket (tapered top)
    const basketBottom = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.02, 0.42), metalMat);
    basketBottom.position.set(0.02, 0.45, 0);
    group.add(basketBottom);

    // Wire perimeter rails around top rim
    const topRim = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.035, 0.46), metalMat);
    topRim.position.set(0.02, 0.76, 0);
    topRim.castShadow = true;
    group.add(topRim);

    // Mid wire rail
    const midRim = new THREE.Mesh(new THREE.BoxGeometry(0.59, 0.02, 0.44), metalMat);
    midRim.position.set(0.02, 0.6, 0);
    group.add(midRim);

    // Corner vertical wire posts
    for (const cx of [-0.27, 0.29]) {
      for (const cz of [-0.2, 0.2]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.32, 6), metalMat);
        post.position.set(cx, 0.6, cz);
        group.add(post);
      }
    }

    // Semi-transparent fine wire mesh sides (gives that authentic wire grid look)
    const wireMeshMat = new THREE.MeshStandardMaterial({
      color: 0xc8d6e5,
      metalness: 0.6,
      roughness: 0.4,
      wireframe: true,
    });
    const meshSides = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.3, 0.43), wireMeshMat);
    meshSides.position.set(0.02, 0.61, 0);
    group.add(meshSides);

    // 6. Rear fold-down child flap with red plastic bumper
    const childFlap = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.34), redAccentMat);
    childFlap.position.set(-0.25, 0.63, 0);
    group.add(childFlap);

    // 7. Red plastic handle bar across the back top
    const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.48, 8), redAccentMat);
    handleBar.rotation.x = Math.PI / 2;
    handleBar.position.set(-0.31, 0.78, 0);
    handleBar.castShadow = true;

    // Handle brackets
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.04), metalMat);
    b1.position.set(-0.27, 0.77, 0.22);
    const b2 = b1.clone();
    b2.position.z = -0.22;
    group.add(handleBar, b1, b2);

    return group;
  }

  createShoppingCart(x, z, rotationY = 0, scale = 1.0) {
    const cart = this.createShoppingCartModel(scale);
    cart.position.set(x, 0, z);
    cart.rotation.y = rotationY;
    this.scene.add(cart);
    return cart;
  }

  createCartStack(x, z, count = 4, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    for (let i = 0; i < count; i++) {
      const cart = this.createShoppingCartModel(1.0);
      // Nested offset: each subsequent cart nests partially inside the previous cart
      cart.position.set(i * 0.26, 0, 0);
      group.add(cart);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Creates a single red plastic handheld shopping basket.
   */
  createRedBasketModel(scale = 1.0) {
    const group = new THREE.Group();
    group.scale.set(scale, scale, scale);

    const redPlastic = new THREE.MeshStandardMaterial({
      color: 0xff3838,
      roughness: 0.35,
    });
    const darkHandle = new THREE.MeshStandardMaterial({
      color: 0x2f3542,
      roughness: 0.5,
    });

    // Perforated plastic basket body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.26), redPlastic);
    body.position.y = 0.12;
    body.castShadow = true;
    group.add(body);

    // Rim
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.3), redPlastic);
    rim.position.y = 0.24;
    group.add(rim);

    // Black folding handles (folded to sides)
    const handle1 = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.014, 6, 12, Math.PI), darkHandle);
    handle1.position.set(0, 0.24, 0.14);
    handle1.rotation.x = Math.PI * 0.35;
    const handle2 = handle1.clone();
    handle2.position.z = -0.14;
    handle2.rotation.x = -Math.PI * 0.35;
    group.add(handle1, handle2);

    return group;
  }

  /**
   * Creates a chrome stand holding a tall nested stack of red shopping baskets.
   */
  createBasketStack(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Chrome wire stand
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.9, roughness: 0.2 });
    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.06, 12), chromeMat);
    standBase.position.y = 0.03;
    group.add(standBase);

    // 4 vertical guide rods
    for (const [rx, rz] of [[-0.18, -0.12], [0.18, -0.12], [-0.18, 0.12], [0.18, 0.12]]) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 6), chromeMat);
      rod.position.set(rx, 0.48, rz);
      group.add(rod);
    }

    // Stack of 6 nested red baskets
    const redMat = new THREE.MeshStandardMaterial({ color: 0xff3838, roughness: 0.4 });
    for (let i = 0; i < 6; i++) {
      const basket = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.26), redMat);
      basket.position.set(0, 0.15 + i * 0.09, 0);
      basket.castShadow = true;
      group.add(basket);

      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 0.29), redMat);
      rim.position.set(0, 0.23 + i * 0.09, 0);
      group.add(rim);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Automatic sliding glass entrance doors with aluminum frames & welcome mats.
   */
  createSlidingGlassDoors(x, z, width = 6.0, height = 2.7) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const metalFrameMat = new THREE.MeshStandardMaterial({ color: 0x747d8c, metalness: 0.8, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x81ecec,
      roughness: 0.08,
      metalness: 0.85,
      transparent: true,
      opacity: 0.38,
    });

    // Top automatic operator transom box
    const operatorBox = new THREE.Mesh(new THREE.BoxGeometry(width, 0.32, 0.35), metalFrameMat);
    operatorBox.position.y = height + 0.16;
    operatorBox.castShadow = true;
    group.add(operatorBox);

    // Motion sensor sensor eyes
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });
    const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.08), sensorMat);
    sensor.position.set(0, height + 0.24, 0.18);
    group.add(sensor);

    // Left and right fixed frame posts
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, height, 0.2), metalFrameMat);
      post.position.set(side * (width / 2 - 0.1), height / 2, 0);
      post.castShadow = true;
      group.add(post);
    }

    // Floor track threshold
    const threshold = new THREE.Mesh(new THREE.BoxGeometry(width, 0.04, 0.28), metalFrameMat);
    threshold.position.y = 0.02;
    group.add(threshold);

    // 2 Fixed glass side panels
    const panelWidth = (width - 0.4) / 4;
    for (const side of [-1, 1]) {
      const pane = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, height - 0.06, 0.05), glassMat);
      pane.position.set(side * (width / 2 - panelWidth / 2 - 0.2), height / 2, 0);
      group.add(pane);
    }

    // 2 Center sliding door panels (slightly open or closed with decals)
    const doorWidth = panelWidth * 1.05;
    for (const side of [-1, 1]) {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(side * (doorWidth * 0.48), height / 2, 0);

      // Aluminum border
      const doorBorder = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, height - 0.08, 0.08), metalFrameMat);
      // Glass center
      const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(doorWidth - 0.14, height - 0.22, 0.04), glassMat);
      doorGroup.add(doorBorder, doorGlass);

      // Vertical handle bar
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.8, 6), metalFrameMat);
      handle.position.set(side * -doorWidth * 0.38, 0, 0.06);
      doorGroup.add(handle);

      group.add(doorGroup);
    }

    // Charcoal ribbed entrance mat inside and outside
    const matGeo = new THREE.PlaneGeometry(width * 0.75, 1.6);
    const matColor = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.95 });
    const outsideMat = new THREE.Mesh(matGeo, matColor);
    outsideMat.rotation.x = -Math.PI / 2;
    outsideMat.position.set(0, 0.015, 0.9);
    outsideMat.receiveShadow = true;

    const insideMat = new THREE.Mesh(matGeo, matColor);
    insideMat.rotation.x = -Math.PI / 2;
    insideMat.position.set(0, 0.015, -0.9);
    insideMat.receiveShadow = true;

    group.add(outsideMat, insideMat);

    this.scene.add(group);
    return group;
  }

  /**
   * 3-Tier Wooden Produce Market Table (Manav Tezgâhı) filled with fruits and vegetables.
   */
  createProduceDisplayStand(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb87945, roughness: 0.75 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xd29a58, roughness: 0.8 });

    // Table legs & frame (length: 2.8, depth: 1.6, height: 0.85)
    for (const lx of [-1.2, 1.2]) {
      for (const lz of [-0.65, 0.65]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.12), woodMat);
        leg.position.set(lx, 0.425, lz);
        leg.castShadow = true;
        group.add(leg);
      }
    }

    // Slanted tiered tabletop deck
    const deck = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.1, 1.5), woodMat);
    deck.position.set(0, 0.85, 0);
    deck.rotation.x = 0.14; // sloped forward towards aisle
    deck.castShadow = true;
    group.add(deck);

    // Wooden produce crates with colorful fruits & vegetables
    const createCrate = (cx, cz, produceColor, produceType) => {
      const crateGroup = new THREE.Group();
      crateGroup.position.set(cx, 0.94, cz);
      crateGroup.rotation.x = 0.14;

      // Wooden crate box
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.58), crateMat);
      box.castShadow = true;
      crateGroup.add(box);

      // Produce items inside crate
      const pMat = new THREE.MeshStandardMaterial({ color: produceColor, roughness: 0.4 });
      if (produceType === 'watermelons') {
        // Striped green watermelons
        const melonMat = new THREE.MeshStandardMaterial({ color: 0x1e824c, roughness: 0.3 });
        for (let i = 0; i < 3; i++) {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), melonMat);
          m.scale.set(1.2, 0.95, 0.95);
          m.position.set(-0.2 + i * 0.2, 0.14, (i % 2 ? 0.05 : -0.05));
          crateGroup.add(m);
        }
      } else if (produceType === 'pineapples') {
        const pineMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.6 });
        const crownMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
        for (let i = 0; i < 3; i++) {
          const pine = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.2, 8), pineMat);
          pine.position.set(-0.2 + i * 0.2, 0.12, 0);
          const crown = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.16, 6), crownMat);
          crown.position.set(-0.2 + i * 0.2, 0.26, 0);
          crateGroup.add(pine, crown);
        }
      } else {
        // Spherical produce (apples, oranges, tomatoes)
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 3; col++) {
            const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), pMat);
            fruit.position.set(-0.22 + col * 0.22, 0.12, -0.12 + row * 0.24);
            fruit.castShadow = true;
            crateGroup.add(fruit);
          }
        }
      }
      group.add(crateGroup);
    };

    // Front row crates: Apples (green) and Oranges
    createCrate(-0.85, 0.38, 0x2ed573, 'apples');
    createCrate(0, 0.38, 0xffa502, 'oranges');
    createCrate(0.85, 0.38, 0xff4757, 'tomatoes');

    // Back row crates: Watermelons and Pineapples
    createCrate(-0.85, -0.32, 0x1e824c, 'watermelons');
    createCrate(0, -0.32, 0xf1c40f, 'pineapples');
    createCrate(0.85, -0.32, 0xf6e58d, 'bananas');

    this.scene.add(group);
    return group;
  }

  /**
   * Supermarket Island Chest Freezer with glass sliding lids and cool cyan glow.
   */
  createIslandChestFreezer(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f2f6, roughness: 0.2 });
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.5 });
    const blueTrim = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x81ecec,
      roughness: 0.05,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
    });

    // Insulated body
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.2), whiteMat);
    body.position.y = 0.425;
    body.castShadow = true;
    group.add(body);

    // Blue accent stripe
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.08, 1.24), blueTrim);
    stripe.position.y = 0.72;
    group.add(stripe);

    // Protective floor bumper kickplate
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.12, 1.26), bumperMat);
    bumper.position.y = 0.06;
    group.add(bumper);

    // Glass top sliding lids
    const glassLid1 = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.03, 1.05), glassMat);
    glassLid1.position.set(-0.58, 0.88, 0);
    const glassLid2 = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.03, 1.05), glassMat);
    glassLid2.position.set(0.58, 0.89, 0); // slightly overlapping
    group.add(glassLid1, glassLid2);

    // Handles on glass lids
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    const h1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.05), handleMat);
    h1.position.set(-0.58, 0.91, 0.4);
    const h2 = h1.clone();
    h2.position.x = 0.58;
    group.add(h1, h2);

    // Cool cyan interior lighting glow
    const freezerLight = new THREE.PointLight(0x00d2d3, 0.8, 3.5);
    freezerLight.position.set(0, 0.8, 0);
    group.add(freezerLight);

    // Frozen products visible inside
    const boxMat1 = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const boxMat2 = new THREE.MeshStandardMaterial({ color: 0x2ecc71 });
    const boxMat3 = new THREE.MeshStandardMaterial({ color: 0xf39c12 });
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.28), [boxMat1, boxMat2, boxMat3][i % 3]);
      p.position.set(-0.8 + (i % 3) * 0.8, 0.72, (i < 3 ? -0.25 : 0.25));
      group.add(p);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Multi-Door Upright Beverage & Dairy Cooler Wall with illuminated glass doors and LED lights.
   */
  createDrinkCoolerWall(x, z, width = 7.0, height = 2.4, depth = 0.85) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.35 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x81ecec,
      roughness: 0.06,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
    });

    // Cabinet outer carcass
    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), frameMat);
    backPanel.position.set(0, height / 2, 0);
    backPanel.castShadow = true;
    group.add(backPanel);

    // Lit interior cavity
    const cavityMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const cavity = new THREE.Mesh(new THREE.BoxGeometry(width - 0.2, height - 0.3, depth - 0.1), cavityMat);
    cavity.position.set(0, height / 2, 0.05);
    group.add(cavity);

    // 4 Illuminated internal wire shelves
    const shelfCount = 4;
    const doorCount = Math.floor(width / 1.8);
    for (let s = 1; s <= shelfCount; s++) {
      const shelfY = s * (height / (shelfCount + 1));
      const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(width - 0.25, 0.03, depth - 0.2), chromeMat);
      shelfMesh.position.set(0, shelfY, 0.1);
      group.add(shelfMesh);

      // Rows of colorful beverage bottles and cans on shelves
      const drinkColors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf1c40f, 0x9b59b6, 0xffffff];
      const itemsPerRow = Math.floor((width - 0.4) / 0.28);
      for (let i = 0; i < itemsPerRow; i++) {
        const canColor = drinkColors[(i + s) % drinkColors.length];
        const canMat = new THREE.MeshStandardMaterial({ color: canColor, metalness: 0.7, roughness: 0.3 });
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.22, 8), canMat);
        can.position.set(-width / 2 + 0.3 + i * 0.28, shelfY + 0.12, 0.12);
        group.add(can);
      }
    }

    // Glass door frames with long vertical chrome handles
    const doorWidth = (width - 0.2) / doorCount;
    for (let d = 0; d < doorCount; d++) {
      const dx = -width / 2 + 0.1 + doorWidth * (d + 0.5);

      const glassPane = new THREE.Mesh(new THREE.BoxGeometry(doorWidth - 0.06, height - 0.35, 0.04), glassMat);
      glassPane.position.set(dx, height / 2, depth / 2 + 0.02);
      group.add(glassPane);

      // Vertical LED strip light on each door mullion
      const led = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, height - 0.3, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      led.position.set(dx - doorWidth / 2 + 0.03, height / 2, depth / 2 - 0.02);
      group.add(led);

      // Vertical chrome handle
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.75, 6), chromeMat);
      handle.position.set(dx + doorWidth * 0.38, height / 2, depth / 2 + 0.06);
      group.add(handle);
    }

    // Bright interior cooler light
    const interiorLight = new THREE.PointLight(0xffffff, 1.1, 7);
    interiorLight.position.set(0, height * 0.75, depth / 2);
    group.add(interiorLight);

    this.scene.add(group);
    return group;
  }

  /**
   * Rustic Wooden Bakery Display Rack with baguettes, bread loaves, croissants, and donuts.
   */
  createBakeryWallRack(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const woodDark = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.8 });
    const woodLight = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.6 });
    const breadMat = new THREE.MeshStandardMaterial({ color: 0xc27c38, roughness: 0.7 });
    const pastryMat = new THREE.MeshStandardMaterial({ color: 0xf5cd79, roughness: 0.5 });
    const donutChocMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.4 });

    // Multi-tier timber rack
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.15), woodDark);
    backWall.position.set(0, 1.1, -0.35);
    backWall.castShadow = true;
    group.add(backWall);

    for (const [y, depth] of [[0.4, 0.75], [0.95, 0.65], [1.5, 0.55]]) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, depth), woodLight);
      shelf.position.set(0, y, depth / 2 - 0.35);
      shelf.castShadow = true;
      group.add(shelf);
    }

    // Top tier: Glazed donuts & croissants
    for (let i = 0; i < 5; i++) {
      const donut = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.045, 8, 14), donutChocMat);
      donut.rotation.x = Math.PI / 2;
      donut.position.set(-0.8 + i * 0.4, 1.58, -0.08);
      donut.castShadow = true;
      group.add(donut);
    }

    // Middle tier: Golden crusty bread loaves
    for (let i = 0; i < 4; i++) {
      const loaf = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), breadMat);
      loaf.scale.set(1.4, 0.85, 0.9);
      loaf.position.set(-0.75 + i * 0.5, 1.06, -0.04);
      loaf.castShadow = true;
      group.add(loaf);
    }

    // Bottom tier: Woven wicker baskets with tall crusty baguettes
    const wickerMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.9 });
    for (const bx of [-0.65, 0.65]) {
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.35, 10), wickerMat);
      basket.position.set(bx, 0.58, 0.05);
      group.add(basket);

      // 3 baguettes standing in basket
      for (let b = 0; b < 3; b++) {
        const baguette = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.65, 8), pastryMat);
        baguette.position.set(bx + (b - 1) * 0.08, 0.82, 0.05 + (b % 2 ? 0.04 : -0.04));
        baguette.rotation.z = (b - 1) * 0.15;
        baguette.castShadow = true;
        group.add(baguette);
      }
    }

    // Warm ambient glow
    const warmLight = new THREE.PointLight(0xffbe76, 0.7, 4);
    warmLight.position.set(0, 1.8, 0.2);
    group.add(warmLight);

    this.scene.add(group);
    return group;
  }

  /**
   * Curved Glass Refrigerated Deli Counter with fresh meat cuts, cheeses, and cold cuts.
   */
  createDeliCounter(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const steelMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.25 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x81ecec,
      roughness: 0.05,
      metalness: 0.7,
      transparent: true,
      opacity: 0.35,
    });

    // Base counter body
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.82, 1.15), whiteMat);
    base.position.y = 0.41;
    base.castShadow = true;
    group.add(base);

    // Stainless steel front kickplate
    const kick = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.12, 1.17), steelMat);
    kick.position.y = 0.06;
    group.add(kick);

    // Refrigerated food display tray
    const tray = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.05, 0.95), steelMat);
    tray.position.y = 0.84;
    group.add(tray);

    // Curved glass sneeze-guard canopy
    const glassFront = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.48, 0.04), glassMat);
    glassFront.position.set(0, 1.08, 0.46);
    glassFront.rotation.x = -0.15;
    const glassTop = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.04, 0.55), glassMat);
    glassTop.position.set(0, 1.32, 0.18);
    group.add(glassFront, glassTop);

    // Fresh meat steaks, sausages, and cheese inside
    const meatMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.5 });
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 });
    const sausageMat = new THREE.MeshStandardMaterial({ color: 0x96281b, roughness: 0.6 });

    // Prime ribeye meat cuts
    for (let i = 0; i < 4; i++) {
      const steak = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.34), meatMat);
      steak.position.set(-1.0 + i * 0.3, 0.88, 0.1);
      steak.rotation.y = 0.15;
      group.add(steak);
    }

    // Big cheese wheel
    const cheese = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.14, 14), cheeseMat);
    cheese.position.set(0.4, 0.92, 0.08);
    group.add(cheese);

    // Links of sausages
    for (let s = 0; s < 3; s++) {
      const sausage = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.18, 4, 8), sausageMat);
      sausage.rotation.z = Math.PI / 2;
      sausage.position.set(1.0, 0.89 + s * 0.06, 0.1);
      group.add(sausage);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Warehouse / Backroom Pallet Stack & Logistic staging corner.
   */
  createWarehouseCorner(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const timberMat = new THREE.MeshStandardMaterial({ color: 0xc28a54, roughness: 0.85 });
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.8 });
    const tapeMat = new THREE.MeshStandardMaterial({ color: 0xfaedcd, roughness: 0.6 });

    // 1. Euro-pallets
    const createPallet = (py) => {
      const pallet = new THREE.Group();
      pallet.position.y = py;
      // 3 bottom runners
      for (const rx of [-0.45, 0, 0.45]) {
        const runner = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 1.1), timberMat);
        runner.position.set(rx, 0.04, 0);
        pallet.add(runner);
      }
      // Top slats
      for (let s = 0; s < 5; s++) {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.03, 0.12), timberMat);
        slat.position.set(0, 0.09, -0.45 + s * 0.22);
        pallet.add(slat);
      }
      return pallet;
    };

    const p1 = createPallet(0);
    group.add(p1);

    // Stacked corrugated shipping boxes
    const createBox = (bx, by, bz, w, h, d, rotY = 0) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(bx, by, bz);
      bGroup.rotation.y = rotY;

      const carton = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), boxMat);
      carton.castShadow = true;
      bGroup.add(carton);

      // Packing tape strip
      const tape = new THREE.Mesh(new THREE.BoxGeometry(w + 0.005, 0.03, d + 0.005), tapeMat);
      bGroup.add(tape);

      group.add(bGroup);
    };

    createBox(-0.25, 0.35, -0.22, 0.48, 0.45, 0.48);
    createBox(0.24, 0.32, -0.22, 0.45, 0.4, 0.45, 0.08);
    createBox(-0.22, 0.35, 0.24, 0.46, 0.44, 0.46, -0.05);
    createBox(0.24, 0.35, 0.24, 0.46, 0.45, 0.46);

    // Second tier box on top
    createBox(0, 0.76, 0, 0.52, 0.42, 0.52, 0.12);

    // 2. Yellow Hydraulic Pallet Jack (Transpalet)
    const jackYellow = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.4 });
    const jackBlack = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.7 });

    const jack = new THREE.Group();
    jack.position.set(1.4, 0, 0);
    jack.rotation.y = -Math.PI / 4;

    // Forks
    for (const fx of [-0.18, 0.18]) {
      const fork = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.95), jackYellow);
      fork.position.set(fx, 0.08, 0.3);
      fork.castShadow = true;
      jack.add(fork);
    }
    // Pump cylinder & steering column
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.45, 8), jackYellow);
    cylinder.position.set(0, 0.32, -0.25);
    jack.add(cylinder);

    // Handle bar
    const handlePole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.85, 6), jackBlack);
    handlePole.position.set(0, 0.75, -0.45);
    handlePole.rotation.x = -0.4;
    jack.add(handlePole);

    group.add(jack);

    this.scene.add(group);
    return group;
  }

  /**
   * Multi-Tiered Flower Display Stand with colorful sunflowers, pink blooms, and pots.
   */
  createFlowerDisplayStand(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const timberMat = new THREE.MeshStandardMaterial({ color: 0xa07855, roughness: 0.8 });
    const potMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.7 }); // terracotta
    const petalYellow = new THREE.MeshStandardMaterial({ color: 0xf1c40f });
    const petalPink = new THREE.MeshStandardMaterial({ color: 0xff6b81 });
    const centerMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2ed573 });

    // 2-tier stepped timber stand
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 0.4), timberMat);
    step1.position.set(0, 0.15, 0.2);
    const step2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.4), timberMat);
    step2.position.set(0, 0.3, -0.2);
    group.add(step1, step2);

    // Flower pots on each step
    const addFlowerPot = (px, py, pz, flowerColor) => {
      const p = new THREE.Group();
      p.position.set(px, py, pz);

      // Terracotta pot
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.18, 8), potMat);
      p.add(pot);

      // Green leaves
      for (let l = 0; l < 4; l++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), leafMat);
        leaf.scale.set(1.4, 0.3, 0.8);
        leaf.position.set(Math.cos(l * 1.57) * 0.08, 0.1, Math.sin(l * 1.57) * 0.08);
        p.add(leaf);
      }

      // Blossoms
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), flowerColor);
      flower.position.set(0, 0.22, 0);
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), centerMat);
      center.position.set(0, 0.25, 0.04);
      p.add(flower, center);

      group.add(p);
    };

    addFlowerPot(-0.45, 0.39, 0.2, petalYellow);
    addFlowerPot(0, 0.39, 0.2, petalPink);
    addFlowerPot(0.45, 0.39, 0.2, petalYellow);

    addFlowerPot(-0.45, 0.69, -0.2, petalPink);
    addFlowerPot(0, 0.69, -0.2, petalYellow);
    addFlowerPot(0.45, 0.69, -0.2, petalPink);

    this.scene.add(group);
    return group;
  }

  update(delta, time) {
    // Gentle wind breeze swaying foliage
    const sway = Math.sin(time * 1.5) * 0.03;
    this.animatedTrees.forEach((t, i) => {
      t.rotation.z = sway * (i % 2 === 0 ? 1 : -0.8);
    });
  }
}

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

function createSafeCanvas(width, height) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

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
    this.animatedProps = [];
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
    ctx.font = 'bold 44px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SEED TO SERVE', 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const textMat = new THREE.MeshBasicMaterial({ map: texture });
    const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 0.9), textMat);
    textPlane.position.z = 0.16;
    group.add(textPlane);

    this.scene.add(group);
    return group;
  }

  // --- 3. PARKING LOT & VEHICLE FLEET (Procedural Low-Poly Three.js) ---

  createSedan(x, z, rotationY = 0, carColor = 0xe74c3c) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const paintMat = new THREE.MeshStandardMaterial({ color: carColor, roughness: 0.25, metalness: 0.2 });
    const darkTrim = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.75 });
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff3838 });

    // Lower aerodynamic body
    const body = new THREE.Mesh(new RoundedBoxGeometry(2.35, 0.44, 1.22, 2, 0.08), paintMat);
    body.position.y = 0.38;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Dark lower bumper & side skirts
    const skirts = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.25), darkTrim);
    skirts.position.y = 0.18;
    group.add(skirts);

    // Front hood bulge & rear trunk
    const hood = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.14, 1.14, 2, 0.04), paintMat);
    hood.position.set(0.72, 0.54, 0);
    group.add(hood);

    const trunk = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.16, 1.14, 2, 0.04), paintMat);
    trunk.position.set(-0.84, 0.53, 0);
    group.add(trunk);

    // Cabin roof structure
    const cabin = new THREE.Mesh(new RoundedBoxGeometry(1.24, 0.48, 1.06, 2, 0.06), paintMat);
    cabin.position.set(-0.06, 0.82, 0);
    cabin.castShadow = true;
    group.add(cabin);

    // Windshield (sloped front)
    const frontWind = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.46), glassMat);
    frontWind.position.set(0.53, 0.78, 0);
    frontWind.rotation.set(0, Math.PI / 2, -0.42);
    group.add(frontWind);

    // Rear window (sloped back)
    const rearWind = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.42), glassMat);
    rearWind.position.set(-0.65, 0.78, 0);
    rearWind.rotation.set(0, -Math.PI / 2, -0.38);
    group.add(rearWind);

    // Side windows
    for (const side of [-0.535, 0.535]) {
      const sideGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.34), glassMat);
      sideGlass.position.set(-0.06, 0.8, side);
      if (side < 0) sideGlass.rotation.y = Math.PI;
      group.add(sideGlass);

      // Side mirror
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.12), paintMat);
      mirror.position.set(0.42, 0.65, side + (side > 0 ? 0.08 : -0.08));
      group.add(mirror);
    }

    // Front Chrome Grille & Headlights
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.52), chromeMat);
    grille.position.set(1.18, 0.38, 0);
    group.add(grille);

    for (const zOff of [-0.4, 0.4]) {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.22), headlightMat);
      hl.position.set(1.17, 0.42, zOff);
      group.add(hl);
    }

    // Taillights
    for (const zOff of [-0.42, 0.42]) {
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.24), taillightMat);
      tl.position.set(-1.17, 0.45, zOff);
      group.add(tl);
    }

    // License plates
    const plateGeo = new THREE.PlaneGeometry(0.24, 0.1);
    const plateCanvas = createSafeCanvas(128, 64);
    let plateMat;
    if (plateCanvas) {
      const pctx = plateCanvas.getContext('2d');
      pctx.fillStyle = '#ffffff'; pctx.fillRect(0, 0, 128, 64);
      pctx.fillStyle = '#2980b9'; pctx.fillRect(0, 0, 24, 64);
      pctx.fillStyle = '#2c3e50'; pctx.font = 'bold 22px sans-serif'; pctx.textAlign = 'center';
      pctx.fillText('34 GBLB', 76, 42);
      const plateTex = new THREE.CanvasTexture(plateCanvas);
      plateMat = new THREE.MeshBasicMaterial({ map: plateTex });
    } else {
      plateMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    }

    const fPlate = new THREE.Mesh(plateGeo, plateMat);
    fPlate.rotation.y = Math.PI / 2;
    fPlate.position.set(1.19, 0.26, 0);
    const rPlate = new THREE.Mesh(plateGeo, plateMat);
    rPlate.rotation.y = -Math.PI / 2;
    rPlate.position.set(-1.19, 0.26, 0);
    group.add(fPlate, rPlate);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.15, 14);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });

    const wheelPos = [
      [0.68, 0.6], [-0.68, 0.6], [0.68, -0.6], [-0.68, -0.6]
    ];
    for (const [wx, wz] of wheelPos) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.23, wz);
      wheel.castShadow = true;

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.16, 8), rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(wx, 0.23, wz);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.17, 6), darkTrim);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(wx, 0.23, wz);

      group.add(wheel, rim, hub);
    }

    this.scene.add(group);
    return group;
  }

  createCar(x, z, rotationY = 0, carColor = 0xe74c3c) {
    return this.createSedan(x, z, rotationY, carColor);
  }

  createDeliveryTruck(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3 });
    const darkChassisMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7, metalness: 0.5 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, roughness: 0.1, transparent: true, opacity: 0.7 });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });

    // Heavy duty ladder frame rails
    const frame = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.24, 1.1), darkChassisMat);
    frame.position.set(0, 0.42, 0);
    frame.castShadow = true;
    group.add(frame);

    // Front Cab Body
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.35, 1.45, 1.48, 2, 0.08), whiteMat);
    cab.position.set(1.4, 1.25, 0);
    cab.castShadow = true;
    group.add(cab);

    // Roof wind deflector (aerodynamic cap)
    const deflector = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.32, 1.35, 2, 0.04), whiteMat);
    deflector.position.set(1.35, 2.12, 0);
    deflector.rotation.z = -0.15;
    group.add(deflector);

    // Windshield
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.55), glassMat);
    windshield.rotation.y = Math.PI / 2;
    windshield.position.set(2.08, 1.45, 0);
    group.add(windshield);

    // Cab side windows & grab handles
    for (const side of [-0.75, 0.75]) {
      const window = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.45), glassMat);
      window.position.set(1.4, 1.45, side);
      if (side < 0) window.rotation.y = Math.PI;
      group.add(window);

      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.08), darkChassisMat);
      mirror.position.set(1.95, 1.35, side + (side > 0 ? 0.12 : -0.12));
      group.add(mirror);
    }

    // Chrome Grill & Bumper
    const grill = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.8), chromeMat);
    grill.position.set(2.08, 0.85, 0);
    group.add(grill);

    const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 1.56), chromeMat);
    bumper.position.set(2.05, 0.42, 0);
    group.add(bumper);

    for (const zOff of [-0.55, 0.55]) {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.2), lightMat);
      hl.position.set(2.09, 0.85, zOff);
      group.add(hl);
    }

    // Cylindrical fuel tank on side
    const fuelTank = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.1, 12), chromeMat);
    fuelTank.rotation.z = Math.PI / 2;
    fuelTank.position.set(-0.15, 0.45, 0.65);
    group.add(fuelTank);

    // Refrigerator unit above cab
    const reefer = new THREE.Mesh(new RoundedBoxGeometry(0.45, 0.35, 0.8, 2, 0.04), darkChassisMat);
    reefer.position.set(0.68, 2.05, 0);
    group.add(reefer);

    // Main Insulated Cargo Box with GBLB STORE billboard
    const boxBody = new THREE.Mesh(new RoundedBoxGeometry(3.1, 1.85, 1.56, 2, 0.06), whiteMat);
    boxBody.position.set(-0.75, 1.48, 0);
    boxBody.castShadow = true;
    group.add(boxBody);

    // Billboard canvas texture for sides
    const sideCanvas = createSafeCanvas(512, 256);
    let sidePlaneMat;
    if (sideCanvas) {
      const sctx = sideCanvas.getContext('2d');
      sctx.fillStyle = '#ffffff'; sctx.fillRect(0, 0, 512, 256);
      sctx.fillStyle = '#27ae60'; sctx.fillRect(0, 0, 512, 60);
      sctx.fillStyle = '#e74c3c'; sctx.fillRect(0, 220, 512, 36);
      sctx.fillStyle = '#ffffff'; sctx.font = 'bold 36px Fredoka, sans-serif'; sctx.textAlign = 'center';
      sctx.fillText('GBLB STORE', 256, 44);
      sctx.fillStyle = '#2c3e50'; sctx.font = 'bold 24px Fredoka, sans-serif';
      sctx.fillText('TAZE & HIZLI TESLİMAT', 256, 120);
      sctx.font = '18px Fredoka, sans-serif'; sctx.fillStyle = '#7f8c8d';
      sctx.fillText('SOĞUK ZİNCİR LOJİSTİK', 256, 165);
      const sideTex = new THREE.CanvasTexture(sideCanvas);
      sidePlaneMat = new THREE.MeshBasicMaterial({ map: sideTex });
    } else {
      sidePlaneMat = new THREE.MeshBasicMaterial({ color: 0x27ae60 });
    }

    const rightSign = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.65), sidePlaneMat);
    rightSign.position.set(-0.75, 1.48, 0.79);
    const leftSign = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.65), sidePlaneMat);
    leftSign.rotation.y = Math.PI;
    leftSign.position.set(-0.75, 1.48, -0.79);
    group.add(rightSign, leftSign);

    // Rear roll-up shutter door
    const shutterCanvas = createSafeCanvas(256, 256);
    let rearDoorMat;
    if (shutterCanvas) {
      const shctx = shutterCanvas.getContext('2d');
      shctx.fillStyle = '#bdc3c7'; shctx.fillRect(0, 0, 256, 256);
      shctx.strokeStyle = '#7f8c8d'; shctx.lineWidth = 4;
      for (let y = 16; y < 256; y += 16) {
        shctx.beginPath(); shctx.moveTo(0, y); shctx.lineTo(256, y); shctx.stroke();
      }
      const shutterTex = new THREE.CanvasTexture(shutterCanvas);
      rearDoorMat = new THREE.MeshStandardMaterial({ map: shutterTex, roughness: 0.4 });
    } else {
      rearDoorMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, roughness: 0.4 });
    }
    const rearDoor = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.55), rearDoorMat);
    rearDoor.rotation.y = -Math.PI / 2;
    rearDoor.position.set(-2.31, 1.45, 0);
    group.add(rearDoor);

    // Rear bumper with hazard stripes
    const rBumper = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 1.52), darkChassisMat);
    rBumper.position.set(-2.32, 0.42, 0);
    group.add(rBumper);

    // 6 Truck Wheels
    const truckWheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 14);
    const truckWheelPos = [
      [1.4, 0.74], [1.4, -0.74],
      [-1.1, 0.76], [-1.1, -0.76],
      [-1.8, 0.76], [-1.8, -0.76]
    ];
    for (const [wx, wz] of truckWheelPos) {
      const wheel = new THREE.Mesh(truckWheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.32, wz);
      wheel.castShadow = true;

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.23, 10), chromeMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(wx, 0.32, wz);
      group.add(wheel, rim);
    }

    this.scene.add(group);
    return group;
  }

  createDeliveryVan(x, z, rotationY = 0, vanColor = 0xffffff) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const paintMat = new THREE.MeshStandardMaterial({ color: vanColor, roughness: 0.25 });
    const blueStripeMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, roughness: 0.1, transparent: true, opacity: 0.7 });

    // High-roof cargo van body
    const body = new THREE.Mesh(new RoundedBoxGeometry(3.2, 1.45, 1.35, 2, 0.08), paintMat);
    body.position.set(0, 1.02, 0);
    body.castShadow = true;
    group.add(body);

    // Sloped front nose
    const nose = new THREE.Mesh(new RoundedBoxGeometry(0.75, 0.58, 1.3, 2, 0.06), paintMat);
    nose.position.set(1.55, 0.62, 0);
    group.add(nose);

    // Livery stripe
    const stripe = new THREE.Mesh(new RoundedBoxGeometry(3.24, 0.16, 1.37, 2, 0.02), blueStripeMat);
    stripe.position.set(0, 0.68, 0);
    group.add(stripe);

    // Windshield
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.62), glassMat);
    windshield.position.set(1.42, 1.25, 0);
    windshield.rotation.set(0, Math.PI / 2, -0.45);
    group.add(windshield);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.18, 14);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.8 });

    for (const [wx, wz] of [[1.1, 0.64], [1.1, -0.64], [-1.0, 0.64], [-1.0, -0.64]]) {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.26, wz);
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.19, 8), rimMat);
      r.rotation.x = Math.PI / 2;
      r.position.set(wx, 0.26, wz);
      group.add(w, r);
    }

    this.scene.add(group);
    return group;
  }

  createPickupTruck(x, z, rotationY = 0, truckColor = 0xd63031) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const paintMat = new THREE.MeshStandardMaterial({ color: truckColor, roughness: 0.35 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.8 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.7 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, roughness: 0.1, transparent: true, opacity: 0.7 });

    // Cab
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.25, 1.05, 1.3, 2, 0.06), paintMat);
    cab.position.set(0.48, 0.92, 0);
    cab.castShadow = true;
    group.add(cab);

    // Front rounded hood
    const hood = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.52, 1.25, 2, 0.06), paintMat);
    hood.position.set(1.42, 0.58, 0);
    group.add(hood);

    // Windshield
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 0.48), glassMat);
    windshield.position.set(1.06, 1.05, 0);
    windshield.rotation.set(0, Math.PI / 2, -0.35);
    group.add(windshield);

    // Open cargo bed
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.42, 1.32), paintMat);
    bed.position.set(-0.85, 0.55, 0);
    bed.castShadow = true;
    group.add(bed);

    // Wooden stake rails along bed
    for (const side of [-0.64, 0.64]) {
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.04), woodMat);
      rail1.position.set(-0.85, 0.85, side);
      const rail2 = rail1.clone();
      rail2.position.y = 0.98;
      group.add(rail1, rail2);
    }

    // Crates of farm harvest in back
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xc28d53, roughness: 0.8 });
    const crate1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.45), crateMat);
    crate1.position.set(-0.6, 0.65, 0.22);
    const crate2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.45), crateMat);
    crate2.position.set(-1.0, 0.65, -0.2);
    group.add(crate1, crate2);

    // 4 Offroad Knobby Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.22, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
    for (const [wx, wz] of [[0.95, 0.65], [0.95, -0.65], [-0.95, 0.65], [-0.95, -0.65]]) {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.3, wz);
      group.add(w);
    }

    this.scene.add(group);
    return group;
  }

  createDeliveryScooter(x, z, rotationY = 0, scooterColor = 0xe74c3c) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const paintMat = new THREE.MeshStandardMaterial({ color: scooterColor, roughness: 0.3 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });

    // Step-through scooter body
    const body = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.35, 0.32, 2, 0.04), paintMat);
    body.position.set(0, 0.32, 0);
    group.add(body);

    // Front steering column and headlight
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.65, 8), paintMat);
    column.rotation.z = -0.28;
    column.position.set(0.38, 0.55, 0);
    group.add(column);

    const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), lightMat);
    headlight.rotation.z = Math.PI / 2;
    headlight.position.set(0.5, 0.82, 0);
    group.add(headlight);

    // Handlebars
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.52, 8), chromeMat);
    bar.position.set(0.44, 0.84, 0);
    group.add(bar);

    // Black saddle seat
    const seat = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.1, 0.24, 2, 0.03), blackMat);
    seat.position.set(-0.06, 0.52, 0);
    group.add(seat);

    // Thermal delivery backpack / cargo box on rear rack
    const thermalBox = new THREE.Mesh(
      new RoundedBoxGeometry(0.46, 0.42, 0.42, 2, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.35 })
    );
    thermalBox.position.set(-0.46, 0.64, 0);
    thermalBox.castShadow = true;
    group.add(thermalBox);

    const reflectTape = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.44), lightMat);
    reflectTape.position.set(-0.46, 0.64, 0);
    group.add(reflectTape);

    // 2 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 12);
    for (const wx of [0.46, -0.42]) {
      const w = new THREE.Mesh(wheelGeo, blackMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.16, 0);
      group.add(w);
    }

    this.scene.add(group);
    return group;
  }

  createModernStreetLamp(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, metalness: 0.8, roughness: 0.3 });
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });

    // Square base anchor
    const base = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.2, 0.38, 2, 0.03), darkMat);
    base.position.y = 0.1;
    group.add(base);

    // Tall pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 4.4, 8), darkMat);
    pole.position.y = 2.3;
    pole.castShadow = true;
    group.add(pole);

    // Dual cantilever horizontal arms
    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 6), darkMat);
      arm.rotation.z = side * (Math.PI / 2.3);
      arm.position.set(side * 0.42, 4.35, 0);
      group.add(arm);

      // Flat LED luminaire head
      const head = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.08, 0.22, 2, 0.02), darkMat);
      head.position.set(side * 0.82, 4.25, 0);
      group.add(head);

      const ledPane = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.16), ledMat);
      ledPane.rotation.x = Math.PI / 2;
      ledPane.position.set(side * 0.82, 4.2, 0);
      group.add(ledPane);
    }

    // Warm downward PointLight
    const pointLight = new THREE.PointLight(0xfffa65, 0.85, 9.0);
    pointLight.position.set(0, 4.1, 0);
    group.add(pointLight);

    this.scene.add(group);
    return group;
  }

  createParkBench(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.6, metalness: 0.7 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.7 });

    // 2 Cast iron legs & armrests
    for (const lx of [-0.68, 0.68]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.5), ironMat);
      leg.position.set(lx, 0.225, 0);
      leg.castShadow = true;
      group.add(leg);

      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), ironMat);
      arm.position.set(lx, 0.52, -0.22);
      group.add(arm);
    }

    // Wooden slats (seat and backrest)
    for (let s = 0; s < 3; s++) {
      const slat = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.04, 0.12, 2, 0.015), woodMat);
      slat.position.set(0, 0.44, -0.12 + s * 0.14);
      slat.castShadow = true;
      group.add(slat);
    }
    for (let b = 0; b < 2; b++) {
      const backSlat = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.12, 0.04, 2, 0.015), woodMat);
      backSlat.position.set(0, 0.65 + b * 0.15, -0.24);
      backSlat.castShadow = true;
      group.add(backSlat);
    }

    this.scene.add(group);
    return group;
  }

  createOutdoorTrashBin(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const metalMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.4 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8), darkMat);
    pole.position.y = 0.42;
    group.add(pole);

    const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.55, 12), metalMat);
    bin.position.y = 0.55;
    bin.castShadow = true;
    group.add(bin);

    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 12), darkMat);
    hood.position.y = 0.84;
    group.add(hood);

    this.scene.add(group);
    return group;
  }

  createEntranceTotem(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.3, metalness: 0.6 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.9 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 });

    // Concrete base pedestal with shrubbery
    const base = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.35, 1.4, 2, 0.06), concreteMat);
    base.position.y = 0.175;
    base.castShadow = true;
    group.add(base);

    // Twin structural steel pylon uprights
    for (const px of [-0.65, 0.65]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.2, 0.22), frameMat);
      pylon.position.set(px, 2.7, 0);
      pylon.castShadow = true;
      group.add(pylon);
    }

    // Main Illuminated Double-Sided Lightbox Sign
    const signBox = new THREE.Mesh(new RoundedBoxGeometry(2.35, 1.85, 0.35, 2, 0.05), redMat);
    signBox.position.set(0, 4.3, 0);
    signBox.castShadow = true;
    group.add(signBox);

    // Canvas texture with store branding
    const canvas = createSafeCanvas(512, 256);
    let planeMat;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 52px Fredoka, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('GBLB STORE', 256, 80);
      ctx.fillStyle = '#f1c40f'; ctx.font = 'bold 28px Fredoka, sans-serif';
      ctx.fillText('SÜPERMARKET', 256, 140);
      ctx.fillStyle = '#2ecc71'; ctx.fillRect(60, 175, 392, 45);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px Fredoka, sans-serif';
      ctx.fillText('7/24 AÇIK • OTOPARK', 256, 206);
      const tex = new THREE.CanvasTexture(canvas);
      planeMat = new THREE.MeshBasicMaterial({ map: tex });
    } else {
      planeMat = new THREE.MeshBasicMaterial({ color: 0xc0392b });
    }

    const fMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), planeMat);
    fMesh.position.set(0, 4.3, 0.185);
    const bMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), planeMat);
    bMesh.rotation.y = Math.PI;
    bMesh.position.set(0, 4.3, -0.185);
    group.add(fMesh, bMesh);

    // Decorative lower info panel (digital fuel/discount board)
    const subSign = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.85, 0.25, 2, 0.04), frameMat);
    subSign.position.set(0, 2.4, 0);
    group.add(subSign);

    const subCanvas = createSafeCanvas(256, 128);
    let subMat;
    if (subCanvas) {
      const sctx = subCanvas.getContext('2d');
      sctx.fillStyle = '#1e272e'; sctx.fillRect(0, 0, 256, 128);
      sctx.fillStyle = '#00ff88'; sctx.font = 'bold 24px monospace'; sctx.textAlign = 'center';
      sctx.fillText('24°C • 12:45', 128, 50);
      sctx.fillStyle = '#fffa65'; sctx.font = 'bold 18px Fredoka, sans-serif';
      sctx.fillText('HOŞ GELDİNİZ', 128, 95);
      const subTex = new THREE.CanvasTexture(subCanvas);
      subMat = new THREE.MeshBasicMaterial({ map: subTex });
    } else {
      subMat = new THREE.MeshBasicMaterial({ color: 0x1e272e });
    }
    const subMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.75), subMat);
    subMesh.position.set(0, 2.4, 0.135);
    group.add(subMesh);

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
   * Creates a rolling wire promo dump bin (tekerlekli indirim sepeti) from Image 1 reference.
   */
  createWireDumpBasket(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.25 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.8 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });

    // 4 small swivel wheels
    for (const [wx, wz] of [[-0.34, -0.34], [0.34, -0.34], [-0.34, 0.34], [0.34, 0.34]]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.04, wz);
      group.add(wheel);

      const castor = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.04), chromeMat);
      castor.position.set(wx, 0.07, wz);
      group.add(castor);
    }

    // Square wire base frame
    const baseFrame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.8), chromeMat);
    baseFrame.position.y = 0.12;
    group.add(baseFrame);

    // 4 corner upright posts
    for (const [cx, cz] of [[-0.38, -0.38], [0.38, -0.38], [-0.38, 0.38], [0.38, 0.38]]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.68, 6), chromeMat);
      post.position.set(cx, 0.46, cz);
      group.add(post);
    }

    // Wire mesh walls
    const wireWallMat = new THREE.MeshStandardMaterial({
      color: 0xc8d6e5,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: true,
    });
    const wireBasket = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.58, 0.76), wireWallMat);
    wireBasket.position.y = 0.44;
    group.add(wireBasket);

    // Top protective perimeter rim
    const topRim = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.82), redMat);
    topRim.position.y = 0.75;
    group.add(topRim);

    // Promo sign banner attached to front side
    const promoCanvas = document.createElement('canvas');
    promoCanvas.width = 256;
    promoCanvas.height = 64;
    const pctx = promoCanvas.getContext('2d');
    pctx.fillStyle = '#e74c3c';
    pctx.fillRect(0, 0, 256, 64);
    pctx.fillStyle = '#ffffff';
    pctx.font = 'bold 26px Fredoka, sans-serif';
    pctx.textAlign = 'center';
    pctx.textBaseline = 'middle';
    pctx.fillText('İNDİRİM • SALE', 128, 32);
    const promoTexture = new THREE.CanvasTexture(promoCanvas);
    promoTexture.colorSpace = THREE.SRGBColorSpace;
    const promoSign = new THREE.Mesh(
      new THREE.PlaneGeometry(0.68, 0.16),
      new THREE.MeshBasicMaterial({ map: promoTexture, toneMapped: false })
    );
    promoSign.position.set(0, 0.75, 0.42);
    group.add(promoSign);

    // Inside items (discount goodies: chips packs, cereal boxes, soda cans, snacks)
    const chipsMat1 = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3, metalness: 0.3 });
    const chipsMat2 = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.3 });
    const sodaMat = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.25, metalness: 0.5 });
    const snackBoxMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.4 });
    const chocoMat = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.6 });

    const items = [
      { geo: new THREE.BoxGeometry(0.18, 0.24, 0.08), mat: chipsMat1, pos: [-0.15, 0.46, -0.12], rot: [0.2, 0.4, 0.1] },
      { geo: new THREE.BoxGeometry(0.18, 0.24, 0.08), mat: chipsMat2, pos: [0.12, 0.48, -0.1], rot: [-0.15, -0.3, 0.2] },
      { geo: new THREE.CylinderGeometry(0.06, 0.06, 0.18, 10), mat: sodaMat, pos: [-0.08, 0.52, 0.15], rot: [0.4, 0.2, -0.3] },
      { geo: new THREE.BoxGeometry(0.16, 0.22, 0.1), mat: snackBoxMat, pos: [0.14, 0.53, 0.12], rot: [0.1, -0.5, 0.15] },
      { geo: new THREE.TorusGeometry(0.08, 0.035, 8, 16), mat: chocoMat, pos: [0.0, 0.62, 0.0], rot: [0.5, 0.2, 0] },
      { geo: new THREE.BoxGeometry(0.16, 0.22, 0.07), mat: chipsMat1, pos: [-0.12, 0.61, 0.05], rot: [-0.3, 0.6, -0.2] },
      { geo: new THREE.CylinderGeometry(0.055, 0.055, 0.16, 10), mat: sodaMat, pos: [0.1, 0.62, -0.05], rot: [0.3, -0.4, 0.2] },
    ];
    for (const it of items) {
      const mesh = new THREE.Mesh(it.geo, it.mat);
      mesh.position.set(...it.pos);
      mesh.rotation.set(...it.rot);
      mesh.castShadow = true;
      group.add(mesh);
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

  // --- 8. FAZ 4: TARIM VE ÇİFTLİK MODEL VE YAPILARI (GBLB FARM & GREENHOUSE) ---

  /**
   * Modern Commercial Glass Greenhouse with aluminum frame, translucent gabled roof,
   * operable roof ventilation louvers, sliding doors, planter seedling tables, misting pipes.
   */
  createGreenhouse(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xd2d7de, roughness: 0.8 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.4, metalness: 0.6 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xd7f1f7,
      transparent: true,
      opacity: 0.42,
      roughness: 0.12,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xa07855, roughness: 0.85 });
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 });
    const sproutMat1 = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.6 });
    const sproutMat2 = new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.6 });
    const potMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.7 });
    const strawberryRed = new THREE.MeshStandardMaterial({ color: 0xe74c3c });

    const width = 4.8;
    const length = 6.4;
    const wallH = 2.2;
    const peakH = 3.5;

    // 1. Concrete Foundation Curb
    const foundation = new THREE.Mesh(new RoundedBoxGeometry(width + 0.2, 0.3, length + 0.2, 2, 0.05), concreteMat);
    foundation.position.y = 0.15;
    foundation.receiveShadow = true;
    group.add(foundation);

    // 2. Structural Aluminium Posts & Framing
    // Corner posts
    for (const px of [-width / 2, width / 2]) {
      for (const pz of [-length / 2, length / 2]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, wallH, 0.1), metalMat);
        post.position.set(px, wallH / 2 + 0.3, pz);
        post.castShadow = true;
        group.add(post);
      }
    }
    // Intermediate side mullions
    for (const pz of [-1.6, 0, 1.6]) {
      for (const px of [-width / 2, width / 2]) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.08, wallH, 0.08), metalMat);
        m.position.set(px, wallH / 2 + 0.3, pz);
        group.add(m);
      }
    }
    // Perimeter Eave Beams
    const beamL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, length), metalMat);
    beamL.position.set(-width / 2, wallH + 0.3, 0);
    const beamR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, length), metalMat);
    beamR.position.set(width / 2, wallH + 0.3, 0);
    group.add(beamL, beamR);

    // Roof Ridge Beam
    const ridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, length), metalMat);
    ridgeBeam.position.set(0, peakH, 0);
    group.add(ridgeBeam);

    // Rafters & Trusses at sections
    for (const pz of [-length / 2, -1.6, 0, 1.6, length / 2]) {
      const rafterGeo = new THREE.BoxGeometry(0.06, 0.06, Math.hypot(width / 2, peakH - wallH - 0.3));
      // Left slope
      const rafterL = new THREE.Mesh(rafterGeo, metalMat);
      rafterL.position.set(-width / 4, (wallH + 0.3 + peakH) / 2, pz);
      rafterL.rotation.y = Math.PI / 2;
      rafterL.rotation.x = Math.atan2(peakH - (wallH + 0.3), width / 2);
      // Right slope
      const rafterR = new THREE.Mesh(rafterGeo, metalMat);
      rafterR.position.set(width / 4, (wallH + 0.3 + peakH) / 2, pz);
      rafterR.rotation.y = Math.PI / 2;
      rafterR.rotation.x = -Math.atan2(peakH - (wallH + 0.3), width / 2);
      // Cross tie beam
      const tie = new THREE.Mesh(new THREE.BoxGeometry(width, 0.05, 0.05), metalMat);
      tie.position.set(0, wallH + 0.3, pz);
      group.add(rafterL, rafterR, tie);
    }

    // 3. Translucent Glass Panels
    // Side Walls
    const sideGlassGeo = new THREE.PlaneGeometry(length, wallH - 0.1);
    const glassLeft = new THREE.Mesh(sideGlassGeo, glassMat);
    glassLeft.position.set(-width / 2, wallH / 2 + 0.3, 0);
    glassLeft.rotation.y = Math.PI / 2;
    const glassRight = new THREE.Mesh(sideGlassGeo, glassMat);
    glassRight.position.set(width / 2, wallH / 2 + 0.3, 0);
    glassRight.rotation.y = -Math.PI / 2;
    group.add(glassLeft, glassRight);

    // Back Gable Wall
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(width, wallH - 0.1), glassMat);
    backWall.position.set(0, wallH / 2 + 0.3, -length / 2);
    group.add(backWall);

    // Roof Glass Slopes
    const roofSlopeLen = Math.hypot(width / 2, peakH - (wallH + 0.3));
    const roofGlassGeo = new THREE.PlaneGeometry(roofSlopeLen, length);
    const roofLeft = new THREE.Mesh(roofGlassGeo, glassMat);
    roofLeft.position.set(-width / 4, (wallH + 0.3 + peakH) / 2, 0);
    roofLeft.rotation.z = -Math.atan2(peakH - (wallH + 0.3), width / 2);
    roofLeft.rotation.y = Math.PI / 2;
    const roofRight = new THREE.Mesh(roofGlassGeo, glassMat);
    roofRight.position.set(width / 4, (wallH + 0.3 + peakH) / 2, 0);
    roofRight.rotation.z = Math.atan2(peakH - (wallH + 0.3), width / 2);
    roofRight.rotation.y = Math.PI / 2;
    group.add(roofLeft, roofRight);

    // 2 Operable Roof Ridge Ventilation Louvers (slightly propped open)
    for (const pz of [-1.0, 1.0]) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 1.2), metalMat);
      vent.position.set(-0.45, peakH - 0.05, pz);
      vent.rotation.z = -0.32;
      group.add(vent);
    }

    // 4. Double Sliding Glass Door Front Entrance
    const doorFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.0, 0.04), metalMat);
    doorFrameL.position.set(-0.5, 1.3, length / 2);
    const doorGlassL = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.9), glassMat);
    doorGlassL.position.set(-0.5, 1.3, length / 2 + 0.025);
    const handleL = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), metalMat);
    handleL.position.set(-0.15, 1.3, length / 2 + 0.05);

    const doorFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 2.0, 0.04), metalMat);
    doorFrameR.position.set(0.5, 1.3, length / 2);
    const doorGlassR = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.9), glassMat);
    doorGlassR.position.set(0.5, 1.3, length / 2 + 0.025);
    const handleR = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), metalMat);
    handleR.position.set(0.15, 1.3, length / 2 + 0.05);

    group.add(doorFrameL, doorGlassL, handleL, doorFrameR, doorGlassR, handleR);

    // 5. Interior Furnishings & Nursery Plant Beds
    // Walkway
    const walkway = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, length - 0.4), concreteMat);
    walkway.position.set(0, 0.32, 0);
    group.add(walkway);

    // Long nursery planting tables (left and right)
    for (const side of [-1.55, 1.55]) {
      const table = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.7, length - 1.2, 2, 0.03), woodMat);
      table.position.set(side, 0.65, 0);
      table.castShadow = true;
      group.add(table);

      // Soil bed on table top
      const soil = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, length - 1.4), soilMat);
      soil.position.set(side, 1.04, 0);
      group.add(soil);

      // Rows of green sprouts and strawberry pots
      for (let zRow = -2.0; zRow <= 2.0; zRow += 0.65) {
        for (let xCol = -0.35; xCol <= 0.35; xCol += 0.35) {
          const sprout = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), ((zRow + xCol) % 2 === 0 ? sproutMat1 : sproutMat2));
          sprout.position.set(side + xCol, 1.12, zRow);
          sprout.scale.set(1, 1.3, 1);
          group.add(sprout);
        }
        // Occasional strawberry pot
        if (Math.abs(zRow) > 0.8) {
          const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.16, 8), potMat);
          pot.position.set(side + (side > 0 ? 0.35 : -0.35), 1.15, zRow);
          const berry = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), strawberryRed);
          berry.position.set(side + (side > 0 ? 0.35 : -0.35), 1.25, zRow);
          group.add(pot, berry);
        }
      }
    }

    // Overhead irrigation misting pipe & nozzles
    const mistPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, length - 0.4, 6), metalMat);
    mistPipe.rotation.x = Math.PI / 2;
    mistPipe.position.set(0, peakH - 0.15, 0);
    group.add(mistPipe);

    // Hanging planters suspended from ceiling
    for (const pz of [-1.5, 0, 1.5]) {
      const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.1, 0.14, 8), potMat);
      basket.position.set((pz === 0 ? 0.4 : -0.4), peakH - 0.7, pz);
      const hangingFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 1), sproutMat1);
      hangingFoliage.position.set((pz === 0 ? 0.4 : -0.4), peakH - 0.65, pz);
      hangingFoliage.scale.set(1.2, 0.8, 1.2);
      // Wire hanger
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.55, 4), metalMat);
      wire.position.set((pz === 0 ? 0.4 : -0.4), peakH - 0.42, pz);
      group.add(basket, hangingFoliage, wire);
    }

    // Exterior hose reel on front right corner
    const hoseReel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.15, 10), new THREE.MeshStandardMaterial({ color: 0x27ae60 }));
    hoseReel.rotation.z = Math.PI / 2;
    hoseReel.position.set(width / 2 + 0.12, 0.8, length / 2 - 0.3);
    group.add(hoseReel);

    this.scene.add(group);
    return group;
  }

  /**
   * Classic American Red Farm Barn with gambrel roof, white cross-buck sliding doors,
   * hay loft hoist beam with pulley, louvered cupola, and proud rooster weather vane.
   */
  createRedBarn(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const barnRed = new THREE.MeshStandardMaterial({ color: 0xa82820, roughness: 0.78 });
    const whiteTrim = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.5 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.65 });
    const stoneBaseMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.9 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.4, metalness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.35, metalness: 0.7 });

    const width = 6.6;
    const length = 7.8;
    const wallH = 3.2;

    // 1. Stone Masonry Plinth Base
    const plinth = new THREE.Mesh(new RoundedBoxGeometry(width + 0.2, 0.35, length + 0.2, 2, 0.06), stoneBaseMat);
    plinth.position.y = 0.175;
    plinth.receiveShadow = true;
    group.add(plinth);

    // 2. Main Red Barn Walls
    const mainWalls = new THREE.Mesh(new THREE.BoxGeometry(width, wallH, length), barnRed);
    mainWalls.position.y = wallH / 2 + 0.35;
    mainWalls.castShadow = true;
    mainWalls.receiveShadow = true;
    group.add(mainWalls);

    // White Corner Pilasters
    for (const px of [-width / 2, width / 2]) {
      for (const pz of [-length / 2, length / 2]) {
        const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.14, wallH + 0.05, 0.14), whiteTrim);
        pilaster.position.set(px, wallH / 2 + 0.35, pz);
        group.add(pilaster);
      }
    }
    // White Eave Frieze Bands
    const eaveBandFront = new THREE.Mesh(new THREE.BoxGeometry(width + 0.15, 0.12, 0.08), whiteTrim);
    eaveBandFront.position.set(0, wallH + 0.35, length / 2 + 0.04);
    const eaveBandBack = new THREE.Mesh(new THREE.BoxGeometry(width + 0.15, 0.12, 0.08), whiteTrim);
    eaveBandBack.position.set(0, wallH + 0.35, -length / 2 - 0.04);
    group.add(eaveBandFront, eaveBandBack);

    // 3. Authentic Gambrel Roof (Double Pitch: Steep lower slope ~60 deg, flatter upper slope ~25 deg)
    const roofLength = length + 0.6; // overhang eaves
    // Lower steep slopes (left and right)
    const lowerSlopeLen = 1.6;
    const lowerSlopeAngle = 1.05; // radians (~60 deg)
    const roofLowerL = new THREE.Mesh(new THREE.BoxGeometry(lowerSlopeLen, 0.1, roofLength), roofMat);
    roofLowerL.position.set(-2.7, 4.05, 0);
    roofLowerL.rotation.z = lowerSlopeAngle;
    roofLowerL.castShadow = true;

    const roofLowerR = new THREE.Mesh(new THREE.BoxGeometry(lowerSlopeLen, 0.1, roofLength), roofMat);
    roofLowerR.position.set(2.7, 4.05, 0);
    roofLowerR.rotation.z = -lowerSlopeAngle;
    roofLowerR.castShadow = true;

    // Upper shallow slopes (meeting at central ridge)
    const upperSlopeLen = 2.45;
    const upperSlopeAngle = 0.44; // radians (~25 deg)
    const roofUpperL = new THREE.Mesh(new THREE.BoxGeometry(upperSlopeLen, 0.1, roofLength), roofMat);
    roofUpperL.position.set(-1.08, 5.25, 0);
    roofUpperL.rotation.z = upperSlopeAngle;
    roofUpperL.castShadow = true;

    const roofUpperR = new THREE.Mesh(new THREE.BoxGeometry(upperSlopeLen, 0.1, roofLength), roofMat);
    roofUpperR.position.set(1.08, 5.25, 0);
    roofUpperR.rotation.z = -upperSlopeAngle;
    roofUpperR.castShadow = true;

    // Ridge cap
    const ridgeCap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, roofLength), ironMat);
    ridgeCap.position.set(0, 5.75, 0);

    group.add(roofLowerL, roofLowerR, roofUpperL, roofUpperR, ridgeCap);

    // Gable End Wall Enclosures (Front & Back)
    for (const pz of [length / 2, -length / 2]) {
      const gable = new THREE.Mesh(new THREE.BoxGeometry(width - 0.2, 2.2, 0.08), barnRed);
      gable.position.set(0, 4.6, pz);
      group.add(gable);
    }

    // 4. Large Sliding Double Barn Doors with Iconic White "X" Cross-bucks
    const doorW = 1.6;
    const doorH = 2.6;
    for (const side of [-1, 1]) {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(side * (doorW / 2 + 0.02), doorH / 2 + 0.35, length / 2 + 0.06);

      // Red door slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.06), barnRed);
      doorGroup.add(slab);

      // White perimeter frame
      const frameT = new THREE.Mesh(new THREE.BoxGeometry(doorW, 0.1, 0.08), whiteTrim);
      frameT.position.y = doorH / 2 - 0.05;
      const frameB = new THREE.Mesh(new THREE.BoxGeometry(doorW, 0.1, 0.08), whiteTrim);
      frameB.position.y = -doorH / 2 + 0.05;
      const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.1, doorH, 0.08), whiteTrim);
      frameL.position.x = -doorW / 2 + 0.05;
      const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.1, doorH, 0.08), whiteTrim);
      frameR.position.x = doorW / 2 - 0.05;
      doorGroup.add(frameT, frameB, frameL, frameR);

      // White diagonal "X" braces
      const diagLen = Math.hypot(doorW - 0.2, doorH - 0.2);
      const diagAngle = Math.atan2(doorH - 0.2, doorW - 0.2);
      const x1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, diagLen, 0.08), whiteTrim);
      x1.rotation.z = diagAngle - Math.PI / 2;
      const x2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, diagLen, 0.08), whiteTrim);
      x2.rotation.z = -diagAngle + Math.PI / 2;
      doorGroup.add(x1, x2);

      // Black iron roller hardware on top
      const roller1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.04), ironMat);
      roller1.position.set(-0.5, doorH / 2 + 0.08, 0.02);
      const roller2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.04), ironMat);
      roller2.position.set(0.5, doorH / 2 + 0.08, 0.02);
      doorGroup.add(roller1, roller2);

      group.add(doorGroup);
    }

    // Heavy overhead sliding door rail track
    const trackRail = new THREE.Mesh(new THREE.BoxGeometry(doorW * 2 + 0.6, 0.08, 0.06), ironMat);
    trackRail.position.set(0, doorH + 0.45, length / 2 + 0.1);
    group.add(trackRail);

    // Warm Gooseneck Barn Lamp above entrance
    const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.45, 6), whiteTrim);
    lampArm.rotation.x = Math.PI / 3;
    lampArm.position.set(0, doorH + 0.72, length / 2 + 0.2);
    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.1, 8), whiteTrim);
    lampShade.position.set(0, doorH + 0.58, length / 2 + 0.35);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfff3b0 }));
    bulb.position.set(0, doorH + 0.54, length / 2 + 0.35);
    const lampLight = new THREE.PointLight(0xffeaa7, 0.8, 8);
    lampLight.position.set(0, doorH + 0.5, length / 2 + 0.4);
    group.add(lampArm, lampShade, bulb, lampLight);

    // 5. Upper Hay Loft Door & Hoist Beam with Pulley
    // Loft door
    const loftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.06), barnRed);
    loftDoor.position.set(0, 4.3, length / 2 + 0.08);
    const loftFrame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.5, 0.04), whiteTrim);
    loftFrame.position.set(0, 4.3, length / 2 + 0.06);
    // White X on loft door
    const loftDiagLen = Math.hypot(1.0, 1.2);
    const loftDiagAngle = Math.atan2(1.2, 1.0);
    const lx1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, loftDiagLen, 0.07), whiteTrim);
    lx1.position.set(0, 4.3, length / 2 + 0.1);
    lx1.rotation.z = loftDiagAngle - Math.PI / 2;
    const lx2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, loftDiagLen, 0.07), whiteTrim);
    lx2.position.set(0, 4.3, length / 2 + 0.1);
    lx2.rotation.z = -loftDiagAngle + Math.PI / 2;
    group.add(loftFrame, loftDoor, lx1, lx2);

    // Hay hoist ridge beam extending 1m outward under peak
    const hoistBeam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 1.3), woodMat);
    hoistBeam.position.set(0, 5.65, length / 2 + 0.5);
    // Pulley wheel and hanging hook
    const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 10), ironMat);
    pulley.rotation.z = Math.PI / 2;
    pulley.position.set(0, 5.48, length / 2 + 0.9);
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.6, 4), new THREE.MeshStandardMaterial({ color: 0xd4a373 }));
    rope.position.set(0, 5.15, length / 2 + 0.9);
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 6, 8, Math.PI * 1.5), ironMat);
    hook.position.set(0, 4.82, length / 2 + 0.9);
    group.add(hoistBeam, pulley, rope, hook);

    // 6. Louvered Cupola & Rooster Weather Vane on Roof Ridge
    const cupolaBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 1.2), whiteTrim);
    cupolaBase.position.set(0, 6.1, 0);
    // Louver slats
    const louverMat = new THREE.MeshStandardMaterial({ color: 0x2c3437, roughness: 0.9 });
    const louverBlock = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.45, 1.0), louverMat);
    louverBlock.position.set(0, 6.1, 0);
    // Cupola hip roof
    const cupolaRoof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.55, 4), copperMat);
    cupolaRoof.position.set(0, 6.72, 0);
    cupolaRoof.rotation.y = Math.PI / 4;
    group.add(cupolaBase, louverBlock, cupolaRoof);

    // Weather Vane Spindle & Proud Rooster Finial
    const weatherVaneGroup = new THREE.Group();
    weatherVaneGroup.position.set(0, 7.3, 0);

    const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 6), copperMat);
    const dirN = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.02), copperMat);
    dirN.position.y = -0.05;
    const dirE = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.5), copperMat);
    dirE.position.y = -0.05;

    const roosterBody = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), copperMat);
    roosterBody.scale.set(1.4, 1.0, 0.4);
    roosterBody.position.y = 0.4;
    const roosterComb = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 4), copperMat);
    roosterComb.position.set(0.1, 0.52, 0);
    const roosterTail = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), copperMat);
    roosterTail.scale.set(0.4, 1.5, 0.3);
    roosterTail.position.set(-0.16, 0.48, 0);
    roosterTail.rotation.z = -0.4;

    weatherVaneGroup.add(spindle, dirN, dirE, roosterBody, roosterComb, roosterTail);
    group.add(weatherVaneGroup);

    this.animatedProps.push((_d, time) => {
      weatherVaneGroup.rotation.y = Math.sin(time * 0.45) * 0.35 + Math.cos(time * 0.18) * 0.2;
    });

    // 7. Attached Lean-To Hay Shed & Golden Hay Bales
    const shedW = 2.4;
    const shedL = 4.4;
    const shedRoof = new THREE.Mesh(new THREE.BoxGeometry(shedW, 0.08, shedL), roofMat);
    shedRoof.position.set(width / 2 + shedW / 2 - 0.1, 2.7, 0);
    shedRoof.rotation.z = -0.32;
    for (const pz of [-shedL / 2 + 0.3, 0, shedL / 2 - 0.3]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.12), woodMat);
      sp.position.set(width / 2 + shedW - 0.18, 1.1, pz);
      group.add(sp);
    }
    group.add(shedRoof);

    // Stacked golden straw/hay bales under shed
    const hayMat = new THREE.MeshStandardMaterial({ color: 0xefc050, roughness: 0.9 });
    const twineMat = new THREE.MeshStandardMaterial({ color: 0xb58900, roughness: 0.8 });
    for (let r = 0; r < 2; r++) {
      for (let zBale = -1.4; zBale <= 1.4; zBale += 0.72) {
        for (let tier = 0; tier < 2; tier++) {
          const bale = new THREE.Mesh(new RoundedBoxGeometry(0.68, 0.42, 0.52, 2, 0.04), hayMat);
          bale.position.set(width / 2 + 0.65 + r * 0.75, 0.21 + tier * 0.44, zBale);
          bale.castShadow = true;
          // Twine banding
          const twine1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.03), twineMat);
          twine1.position.set(width / 2 + 0.65 + r * 0.75, 0.21 + tier * 0.44, zBale - 0.12);
          const twine2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.03), twineMat);
          twine2.position.set(width / 2 + 0.65 + r * 0.75, 0.21 + tier * 0.44, zBale + 0.12);
          group.add(bale, twine1, twine2);
        }
      }
    }

    // 8. Attached Horse Paddock / Corral with Feeding Trough
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });
    const fencePostMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.88 });

    // Wooden post-and-rail corral enclosure: (width/2 to width/2 + 3.8, z = 0.8 to 4.6)
    const padMinX = width / 2;
    const padMaxX = width / 2 + 3.6;
    const padMinZ = 0.6;
    const padMaxZ = 4.6;

    // Posts along paddock boundary
    const postPositions = [
      [padMaxX, padMinZ], [padMaxX, (padMinZ + padMaxZ) / 2], [padMaxX, padMaxZ],
      [padMinX + 1.2, padMaxZ], [padMinX + 2.4, padMaxZ],
      [padMinX + 0.2, padMaxZ],
    ];
    for (const [px, pz] of postPositions) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.25, 0.14), fencePostMat);
      p.position.set(px, 0.62, pz);
      p.castShadow = true;
      group.add(p);
    }
    // Horizontal Rails
    for (const ry of [0.45, 0.88]) {
      // East rail
      const rEast = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, padMaxZ - padMinZ), fenceMat);
      rEast.position.set(padMaxX, ry, (padMinZ + padMaxZ) / 2);
      // South rail (with gate gap)
      const rSouth = new THREE.Mesh(new THREE.BoxGeometry(padMaxX - padMinX, 0.1, 0.08), fenceMat);
      rSouth.position.set((padMinX + padMaxX) / 2, ry, padMaxZ);
      group.add(rEast, rSouth);
    }

    // Wooden Feeding Trough with Straw
    const troughGroup = new THREE.Group();
    troughGroup.position.set(padMinX + 1.8, 0, padMaxZ - 0.45);
    const troughBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.38, 0.6), fencePostMat);
    troughBox.position.y = 0.34;
    troughBox.castShadow = true;
    const troughLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.62), fencePostMat);
    troughLeg1.position.set(-0.7, 0.17, 0);
    const troughLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.62), fencePostMat);
    troughLeg2.position.set(0.7, 0.17, 0);
    const troughHay = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.18, 0.48), hayMat);
    troughHay.position.y = 0.45;
    troughGroup.add(troughBox, troughLeg1, troughLeg2, troughHay);
    group.add(troughGroup);

    // 9. Realistic Animated Pinto Horse in Paddock
    const horseGroup = new THREE.Group();
    horseGroup.position.set(padMinX + 1.8, 0, padMinZ + 1.6);
    horseGroup.rotation.y = 0.2;

    const horseCoat = new THREE.MeshStandardMaterial({ color: 0x824419, roughness: 0.75 });
    const horseWhite = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.7 });
    const horseMuzzleMat = new THREE.MeshStandardMaterial({ color: 0xcca48f, roughness: 0.8 });
    const horseDark = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.85 });
    const horseHoof = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.5 });

    // Torso / Body
    const horseBody = new THREE.Mesh(new RoundedBoxGeometry(0.75, 0.85, 1.65, 2, 0.12), horseCoat);
    horseBody.position.y = 1.35;
    horseBody.castShadow = true;
    // Pinto White Patch on Body
    const horsePatch = new THREE.Mesh(new THREE.BoxGeometry(0.77, 0.6, 0.75), horseWhite);
    horsePatch.position.set(0, 1.38, -0.05);
    horseGroup.add(horseBody, horsePatch);

    // 4 Legs with Knees and Hooves
    const legCoords = [
      [-0.24, 0.35], [0.24, 0.35], // Front legs
      [-0.24, -0.55], [0.24, -0.55], // Hind legs
    ];
    legCoords.forEach(([lx, lz], idx) => {
      const isWhiteSock = idx === 0 || idx === 3;
      const legMat = isWhiteSock ? horseWhite : horseCoat;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.9, 6), legMat);
      leg.position.set(lx, 0.45, lz);
      leg.castShadow = true;
      const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 0.14, 8), horseHoof);
      hoof.position.set(lx, 0.07, lz);
      horseGroup.add(leg, hoof);
    });

    // Neck
    const horseNeck = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.72, 0.5), horseCoat);
    horseNeck.position.set(0, 1.82, 0.65);
    horseNeck.rotation.x = 0.42;
    horseNeck.castShadow = true;
    // Mane along neck crest
    const horseMane = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.68, 0.16), horseDark);
    horseMane.position.set(0, 1.94, 0.55);
    horseMane.rotation.x = 0.42;
    horseGroup.add(horseNeck, horseMane);

    // Animated Head Group (Nods toward trough)
    const horseHeadGroup = new THREE.Group();
    horseHeadGroup.position.set(0, 2.1, 0.9);

    const horseHead = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.38, 0.55, 2, 0.06), horseCoat);
    horseHead.castShadow = true;
    const horseBlaze = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.35, 0.06), horseWhite);
    horseBlaze.position.set(0, 0.04, 0.24);
    const horseMuzzle = new THREE.Mesh(new RoundedBoxGeometry(0.24, 0.22, 0.26, 2, 0.05), horseMuzzleMat);
    horseMuzzle.position.set(0, -0.1, 0.34);
    // Nostrils & Eyes
    const nostrilL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 4), horseDark);
    nostrilL.position.set(-0.06, -0.08, 0.47);
    const nostrilR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 4), horseDark);
    nostrilR.position.set(0.06, -0.08, 0.47);
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.028, 4, 4), horseDark);
    eyeL.position.set(-0.15, 0.08, 0.12);
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.028, 4, 4), horseDark);
    eyeR.position.set(0.15, 0.08, 0.12);

    // Ears
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 4), horseCoat);
    earL.position.set(-0.1, 0.24, -0.06);
    earL.rotation.z = 0.15;
    const earR = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 4), horseCoat);
    earR.position.set(0.1, 0.24, -0.06);
    earR.rotation.z = -0.15;

    horseHeadGroup.add(horseHead, horseBlaze, horseMuzzle, nostrilL, nostrilR, eyeL, eyeR, earL, earR);
    horseGroup.add(horseHeadGroup);

    // Animated Swishing Tail Group
    const horseTailGroup = new THREE.Group();
    horseTailGroup.position.set(0, 1.6, -0.85);
    const horseTail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.14, 0.85, 6), horseDark);
    horseTail.position.y = -0.42;
    horseTail.rotation.x = -0.18;
    horseTailGroup.add(horseTail);
    horseGroup.add(horseTailGroup);

    group.add(horseGroup);

    // Register Horse Living Animation
    this.animatedProps.push((_d, time) => {
      horseHeadGroup.rotation.x = 0.14 + Math.sin(time * 1.5) * 0.11;
      horseHeadGroup.rotation.y = Math.sin(time * 0.65) * 0.09;
      horseTailGroup.rotation.y = Math.sin(time * 3.4) * 0.38;
      horseTailGroup.rotation.z = Math.cos(time * 3.4) * 0.14;
      earL.rotation.z = 0.15 + Math.sin(time * 4.2) * 0.08;
      earR.rotation.z = -0.15 - Math.sin(time * 3.9) * 0.08;
    });

    // 10. Farm Grain Silo (Beside Paddock)
    const siloGroup = new THREE.Group();
    siloGroup.position.set(padMaxX + 1.6, 0, padMinZ + 1.2);

    const siloMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1, roughness: 0.5 });
    const siloCapMat = new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.55 });
    const siloStiltMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });

    // Timber Stilt Support Legs (Elevated base)
    const stiltH = 1.35;
    for (let i = 0; i < 4; i++) {
      const sa = (i * Math.PI) / 2 + Math.PI / 4;
      const legX = Math.cos(sa) * 0.95;
      const legZ = Math.sin(sa) * 0.95;
      const stilt = new THREE.Mesh(new THREE.BoxGeometry(0.12, stiltH, 0.12), siloStiltMat);
      stilt.position.set(legX, stiltH / 2, legZ);
      stilt.castShadow = true;
      siloGroup.add(stilt);
    }
    // Timber base ring
    const stiltRing = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.12, 12), siloStiltMat);
    stiltRing.position.y = stiltH;
    siloGroup.add(stiltRing);

    // Silo Cylinder Tank
    const siloBodyH = 3.6;
    const siloBody = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, siloBodyH, 16), siloMat);
    siloBody.position.y = stiltH + siloBodyH / 2;
    siloBody.castShadow = true;
    siloGroup.add(siloBody);

    // Steel Tension Bands
    for (const bY of [0.6, 1.5, 2.4, 3.2]) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.99, 0.02, 4, 16), ironMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = stiltH + bY;
      siloGroup.add(band);
    }

    // Conical Metal Silo Dome
    const siloRoof = new THREE.Mesh(new THREE.ConeGeometry(1.12, 0.95, 16), siloCapMat);
    siloRoof.position.y = stiltH + siloBodyH + 0.475;
    siloRoof.castShadow = true;
    siloGroup.add(siloRoof);

    // Grain Delivery Pipe running down the side
    const grainPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, siloBodyH + 0.6, 8), siloCapMat);
    grainPipe.position.set(1.04, stiltH + siloBodyH / 2 + 0.2, 0);
    siloGroup.add(grainPipe);

    group.add(siloGroup);

    // 11. Authentic Courtyard Farm Props (from reference art)
    const propGroup = new THREE.Group();
    propGroup.position.set(padMaxX - 0.2, 0, padMaxZ + 0.6);

    // A. Multi-Tiered Hay Bale Pyramid
    const pyramidCoords = [
      [-0.4, 0.2, -0.3], [0.35, 0.2, -0.3],
      [-0.4, 0.2, 0.35], [0.35, 0.2, 0.35],
      [-0.02, 0.62, 0.02], // Top tier
    ];
    for (const [bx, by, bz] of pyramidCoords) {
      const bale = new THREE.Mesh(new RoundedBoxGeometry(0.68, 0.4, 0.52, 2, 0.04), hayMat);
      bale.position.set(bx, by, bz);
      bale.castShadow = true;
      propGroup.add(bale);
    }

    // B. Classic Green Wheelbarrow
    const wbGroup = new THREE.Group();
    wbGroup.position.set(-1.6, 0, 0.6);
    wbGroup.rotation.y = -0.4;
    const wbMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5 });
    const wbWheelMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.9 });
    const wbTub = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.32, 0.55), wbMat);
    wbTub.position.set(0, 0.34, 0);
    const wbWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 12), wbWheelMat);
    wbWheel.rotation.z = Math.PI / 2;
    wbWheel.position.set(-0.46, 0.16, 0);
    for (const hz of [-0.22, 0.22]) {
      const wbHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.95, 4), woodMat);
      wbHandle.rotation.z = -Math.PI / 5;
      wbHandle.position.set(0.32, 0.32, hz);
      wbGroup.add(wbHandle);
    }
    wbGroup.add(wbTub, wbWheel);
    propGroup.add(wbGroup);

    // C. Stainless Steel Milk Cans
    const milkCanMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, roughness: 0.25, metalness: 0.85 });
    for (const [mx, mz] of [[-0.85, 1.1], [-0.5, 1.25]]) {
      const can = new THREE.Group();
      can.position.set(mx, 0, mz);
      const canBody = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.42, 10), milkCanMat);
      canBody.position.y = 0.21;
      const canNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.1, 10), milkCanMat);
      canNeck.position.y = 0.46;
      const canLid = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 10), milkCanMat);
      canLid.position.y = 0.53;
      const canHandle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 4, 8, Math.PI), milkCanMat);
      canHandle.position.set(0, 0.42, 0);
      canHandle.rotation.y = Math.PI / 2;
      can.add(canBody, canNeck, canLid, canHandle);
      propGroup.add(can);
    }

    // D. Burlap Feed Sacks with Green Stamped Wheat
    const sackMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.9 });
    const sackStampMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.7 });
    const sackRopeMat = new THREE.MeshStandardMaterial({ color: 0x90704d, roughness: 0.85 });
    for (const [sx, sz, sRot] of [[0.95, 0.85, 0.2], [1.38, 0.72, -0.3]]) {
      const sack = new THREE.Group();
      sack.position.set(sx, 0, sz);
      sack.rotation.y = sRot;
      const sackBody = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), sackMat);
      sackBody.scale.set(0.9, 1.25, 0.75);
      sackBody.position.y = 0.26;
      const sackTie = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 4, 8), sackRopeMat);
      sackTie.position.y = 0.5;
      sackTie.rotation.x = Math.PI / 2;
      const sackStamp = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.22), sackStampMat);
      sackStamp.position.set(0, 0.26, 0.19);
      sack.add(sackBody, sackTie, sackStamp);
      propGroup.add(sack);
    }

    // E. Wooden Sawbuck Work Bench
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0.65, 0, 1.6);
    benchGroup.rotation.y = 0.15;
    const benchTop = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.08, 0.48, 2, 0.02), woodMat);
    benchTop.position.y = 0.55;
    for (const sideX of [-0.45, 0.45]) {
      const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.62, 0.07), woodMat);
      leg1.position.set(sideX, 0.28, 0.16);
      leg1.rotation.z = -sideX * 0.15;
      const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.62, 0.07), woodMat);
      leg2.position.set(sideX, 0.28, -0.16);
      leg2.rotation.z = -sideX * 0.15;
      benchGroup.add(leg1, leg2);
    }
    benchGroup.add(benchTop);
    propGroup.add(benchGroup);

    // F. Wooden Water Barrel with Rippling Surface
    const waterBarrel = new THREE.Group();
    waterBarrel.position.set(-1.8, 0, 1.5);
    const barrelBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.55, 10), woodMat);
    barrelBody.position.y = 0.28;
    const barrelHoop1 = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.018, 4, 12), ironMat);
    barrelHoop1.rotation.x = Math.PI / 2;
    barrelHoop1.position.y = 0.16;
    const barrelHoop2 = new THREE.Mesh(new THREE.TorusGeometry(0.305, 0.018, 4, 12), ironMat);
    barrelHoop2.rotation.x = Math.PI / 2;
    barrelHoop2.position.y = 0.42;
    const barrelWater = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 10), new THREE.MeshStandardMaterial({
      color: 0x3498db, roughness: 0.1, metalness: 0.3,
    }));
    barrelWater.position.y = 0.48;
    waterBarrel.add(barrelBody, barrelHoop1, barrelHoop2, barrelWater);
    propGroup.add(waterBarrel);

    this.animatedProps.push((_d, time) => {
      barrelWater.scale.set(
        1 + Math.sin(time * 2.2) * 0.02,
        1,
        1 + Math.cos(time * 2.2) * 0.02,
      );
    });

    group.add(propGroup);

    this.scene.add(group);
    return group;
  }

  /**
   * Iconic Cylindrical Stilt Water Tower with octagonal observation deck,
   * cedar wood-stave tank with iron tension hoops, access ladder, and conical roof.
   */
  createWaterTower(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, roughness: 0.8 });
    const woodLegMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });
    const tankStaveMat = new THREE.MeshStandardMaterial({ color: 0xa0714b, roughness: 0.75 });
    const ironBandMat = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.4, metalness: 0.8 });
    const roofConeMat = new THREE.MeshStandardMaterial({ color: 0x27493a, roughness: 0.6 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.35, metalness: 0.7 });
    const valveRed = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });

    const platformY = 4.3;
    const baseSpread = 1.35;
    const topSpread = 0.92;

    // 1. Concrete Pier Footings
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const footing = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), concreteMat);
        footing.position.set(sx * baseSpread, 0.15, sz * baseSpread);
        group.add(footing);
      }
    }

    // 2. 4 Heavy Tapered Support Stilt Legs
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const legLen = Math.hypot(platformY - 0.3, (baseSpread - topSpread) * Math.SQRT2);
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, legLen, 0.18), woodLegMat);
        leg.position.set(sx * (baseSpread + topSpread) / 2, platformY / 2 + 0.15, sz * (baseSpread + topSpread) / 2);
        leg.rotation.z = -sx * Math.atan2(baseSpread - topSpread, platformY);
        leg.rotation.x = sz * Math.atan2(baseSpread - topSpread, platformY);
        leg.castShadow = true;
        group.add(leg);
      }
    }

    // Horizontal tie beams at mid-height
    for (const hY of [1.6, 3.0]) {
      const spread = baseSpread - (baseSpread - topSpread) * (hY / platformY);
      const ring1 = new THREE.Mesh(new THREE.BoxGeometry(spread * 2, 0.1, 0.1), woodLegMat);
      ring1.position.set(0, hY, spread);
      const ring2 = new THREE.Mesh(new THREE.BoxGeometry(spread * 2, 0.1, 0.1), woodLegMat);
      ring2.position.set(0, hY, -spread);
      const ring3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, spread * 2), woodLegMat);
      ring3.position.set(spread, hY, 0);
      const ring4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, spread * 2), woodLegMat);
      ring4.position.set(-spread, hY, 0);
      group.add(ring1, ring2, ring3, ring4);
    }

    // Steel diagonal cross-bracing tension rods (X-bracing)
    for (const face of ['front', 'back', 'left', 'right']) {
      const diagLen = Math.hypot(topSpread * 2, 1.4);
      const rod1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, diagLen, 4), ironBandMat);
      const rod2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, diagLen, 4), ironBandMat);
      const yMid = 2.3;
      if (face === 'front' || face === 'back') {
        const pz = face === 'front' ? 1.1 : -1.1;
        rod1.position.set(0, yMid, pz);
        rod1.rotation.z = 0.55;
        rod2.position.set(0, yMid, pz);
        rod2.rotation.z = -0.55;
      } else {
        const px = face === 'right' ? 1.1 : -1.1;
        rod1.position.set(px, yMid, 0);
        rod1.rotation.x = 0.55;
        rod2.position.set(px, yMid, 0);
        rod2.rotation.x = -0.55;
      }
      group.add(rod1, rod2);
    }

    // 3. Cantilevered Timber Platform & Handrails
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 0.14, 8), woodLegMat);
    platform.position.y = platformY;
    platform.receiveShadow = true;
    group.add(platform);

    // Safety handrail around platform
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const rx = Math.cos(angle) * 1.45;
      const rz = Math.sin(angle) * 1.45;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.85, 4), ironBandMat);
      post.position.set(rx, platformY + 0.45, rz);
      group.add(post);
    }
    const railRing = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.025, 6, 16), ironBandMat);
    railRing.rotation.x = Math.PI / 2;
    railRing.position.y = platformY + 0.85;
    group.add(railRing);

    // 4. Maintenance Access Ladder
    const ladderSide = topSpread;
    const rungsCount = 14;
    for (let r = 0; r < rungsCount; r++) {
      const rungY = 0.4 + r * ((platformY - 0.4) / (rungsCount - 1));
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.38, 4), ironBandMat);
      rung.rotation.z = Math.PI / 2;
      rung.position.set(ladderSide + 0.12, rungY, 0);
      group.add(rung);
    }
    // Ladder stringers
    const stringer1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, platformY - 0.2, 4), ironBandMat);
    stringer1.position.set(ladderSide + 0.12, platformY / 2 + 0.1, -0.19);
    const stringer2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, platformY - 0.2, 4), ironBandMat);
    stringer2.position.set(ladderSide + 0.12, platformY / 2 + 0.1, 0.19);
    group.add(stringer1, stringer2);

    // 5. Cylindrical Cedar Water Tank
    const tankH = 2.2;
    const tankR = 1.18;
    const tankY = platformY + 0.14 + tankH / 2;
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(tankR, tankR, tankH, 16), tankStaveMat);
    tank.position.y = tankY;
    tank.castShadow = true;
    tank.receiveShadow = true;
    group.add(tank);

    // 4 Heavy Iron Tension Bands
    for (let b = 0; b < 4; b++) {
      const bandY = platformY + 0.35 + b * (tankH - 0.5) / 3;
      const band = new THREE.Mesh(new THREE.TorusGeometry(tankR + 0.012, 0.022, 6, 20), ironBandMat);
      band.rotation.x = Math.PI / 2;
      band.position.y = bandY;
      // Tensioner bolt lug block
      const lug = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.06), ironBandMat);
      lug.position.set(0, bandY, tankR + 0.02);
      group.add(band, lug);
    }

    // Stencil Text Canvas Badge on Tank Side
    const canvas = createSafeCanvas(512, 128);
    let badgeTex = null;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GBLB ÇİFTLİĞİ', 256, 42);
      ctx.font = 'bold 24px Fredoka, sans-serif';
      ctx.fillText('SU KULESİ • EST. 1995', 256, 88);
      badgeTex = new THREE.CanvasTexture(canvas);
    }
    const badgeMat = badgeTex
      ? new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true, side: THREE.DoubleSide })
      : new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.45), badgeMat);
    badgeMesh.position.set(0, tankY + 0.1, tankR + 0.035);
    group.add(badgeMesh);

    // 6. Conical Roof with Overhanging Eaves and Finial
    const roofCone = new THREE.Mesh(new THREE.ConeGeometry(tankR + 0.22, 0.95, 16), roofConeMat);
    roofCone.position.y = tankY + tankH / 2 + 0.475;
    roofCone.castShadow = true;
    group.add(roofCone);

    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.05, 0.5, 6), copperMat);
    finial.position.y = tankY + tankH / 2 + 0.95 + 0.25;
    const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), copperMat);
    finialBall.position.y = tankY + tankH / 2 + 0.95 + 0.5;
    group.add(finial, finialBall);

    // 7. Central Iron Water Supply Conduit & Gate Valve
    const mainPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, platformY, 8), ironBandMat);
    mainPipe.position.set(0, platformY / 2, 0);
    // Red valve handwheel near base
    const valveWheel = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 12), valveRed);
    valveWheel.rotation.y = Math.PI / 2;
    valveWheel.position.set(0.12, 1.1, 0);
    group.add(mainPipe, valveWheel);

    this.scene.add(group);
    return group;
  }

  /**
   * Classic Low-Poly Agricultural Farm Tractor with oversized knobby rear tires,
   * small front steering wheels, vertical exhaust stack, engine block, and driver station.
   */
  createFarmTractor(x, z, rotationY = 0, bodyColor = 0x27ae60) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4, metalness: 0.2 });
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4, metalness: 0.3 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
    const engineMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.6, metalness: 0.5 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, roughness: 0.2, metalness: 0.9 });
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffae8 });

    // 1. Cast-Iron Engine Block & Chassis
    const chassis = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.55, 1.8, 2, 0.06), engineMat);
    chassis.position.set(0, 0.65, 0.1);
    chassis.castShadow = true;
    group.add(chassis);

    // Front Hood & Radiator
    const hood = new THREE.Mesh(new RoundedBoxGeometry(0.78, 0.45, 1.25, 3, 0.08), bodyMat);
    hood.position.set(0, 0.98, 0.45);
    hood.castShadow = true;
    group.add(hood);

    // Radiator Grille & Badge
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.38, 0.04), engineMat);
    grille.position.set(0, 0.98, 1.09);
    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.05), yellowMat);
    badge.position.set(0, 1.05, 1.1);
    group.add(grille, badge);

    // Chrome Headlights
    for (const side of [-0.34, 0.34]) {
      const lampHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.12, 8), chromeMat);
      lampHousing.rotation.x = Math.PI / 2;
      lampHousing.position.set(side, 1.02, 1.02);
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), lightMat);
      lens.position.set(side, 1.02, 1.08);
      group.add(lampHousing, lens);
    }

    // Vertical Exhaust Pipe with Rain Flap
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 6), engineMat);
    exhaust.position.set(0.32, 1.6, 0.4);
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.08), chromeMat);
    flap.position.set(0.32, 2.11, 0.4);
    flap.rotation.z = -0.25;
    // Air intake pre-cleaner on other side
    const airIntake = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8), engineMat);
    airIntake.position.set(-0.32, 1.35, 0.5);
    group.add(exhaust, flap, airIntake);

    // 2. Giant Rear Drive Wheels with Chevron Lugs
    const rearR = 0.62;
    const rearW = 0.34;
    for (const side of [-0.68, 0.68]) {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(side, rearR, -0.45);

      // Deep Rubber Tire
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(rearR, rearR, rearW, 16), tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Chevron Mud Cleats / Lugs around tread
      for (let t = 0; t < 12; t++) {
        const angle = (t * Math.PI) / 6;
        const cleat = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.045, rearW - 0.04), tireMat);
        cleat.position.set(Math.cos(angle) * (rearR + 0.02), Math.sin(angle) * (rearR + 0.02), 0);
        cleat.rotation.z = angle;
        wheelGroup.add(cleat);
      }

      // Yellow Steel Rim & Lug Bolts
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, rearW + 0.02, 12), yellowMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, rearW + 0.05, 8), engineMat);
      hubCap.rotation.z = Math.PI / 2;
      wheelGroup.add(hubCap);

      group.add(wheelGroup);

      // Curved Mudguard / Fender over rear tire
      const fender = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.15, 1.2, 2, 0.04), bodyMat);
      fender.position.set(side, 1.25, -0.45);
      group.add(fender);
    }

    // 3. Smaller Front Steering Wheels
    const frontR = 0.32;
    const frontW = 0.18;
    for (const side of [-0.52, 0.52]) {
      const fWheel = new THREE.Mesh(new THREE.CylinderGeometry(frontR, frontR, frontW, 12), tireMat);
      fWheel.rotation.z = Math.PI / 2;
      fWheel.position.set(side, frontR, 0.85);
      fWheel.castShadow = true;

      const fRim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, frontW + 0.02, 8), yellowMat);
      fRim.rotation.z = Math.PI / 2;
      fRim.position.set(side, frontR, 0.85);
      group.add(fWheel, fRim);
    }
    // Front Axle Beam
    const fAxle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 6), engineMat);
    fAxle.rotation.z = Math.PI / 2;
    fAxle.position.set(0, frontR, 0.85);
    group.add(fAxle);

    // 4. Operator Station: Seat, Steering Column, Levers
    // Floor platform
    const floor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.8), engineMat);
    floor.position.set(0, 0.68, -0.2);
    group.add(floor);

    // Spring bucket seat
    const seat = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.35, 0.38, 2, 0.06), seatMat);
    seat.position.set(0, 1.15, -0.42);
    seat.castShadow = true;
    group.add(seat);

    // Angled steering column & wheel
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 6), engineMat);
    column.position.set(0, 1.2, 0.05);
    column.rotation.x = -Math.PI / 6;
    const steeringWheel = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 6, 12), seatMat);
    steeringWheel.position.set(0, 1.45, -0.05);
    steeringWheel.rotation.x = Math.PI / 3;
    group.add(column, steeringWheel);

    // Shift levers
    const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.28, 4), chromeMat);
    lever.position.set(0.14, 0.95, -0.05);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), seatMat);
    knob.position.set(0.14, 1.08, -0.05);
    group.add(lever, knob);

    // Rear 3-Point Tow Hitch Linkage
    const hitch = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 0.25), engineMat);
    hitch.position.set(0, 0.45, -1.0);
    const hitchPin = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 6), chromeMat);
    hitchPin.position.set(0, 0.5, -1.08);
    group.add(hitch, hitchPin);

    this.scene.add(group);
    return group;
  }

  /**
   * Stylized Low-Poly Holstein Dairy Cow with spotted markings, bell collar,
   * gentle snout, horns, pink udder, and grazing/standing poses.
   */
  createDairyCow(x, z, rotationY = 0, isEating = false) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const whiteHide = new THREE.MeshStandardMaterial({ color: 0xfcfcfc, roughness: 0.85 });
    const blackSpot = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
    const muzzlePink = new THREE.MeshStandardMaterial({ color: 0xf8a5c2, roughness: 0.7 });
    const hornCream = new THREE.MeshStandardMaterial({ color: 0xf7d794, roughness: 0.6 });
    const eyeBlack = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });
    const hoofDark = new THREE.MeshStandardMaterial({ color: 0x485460, roughness: 0.8 });
    const bellGold = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.7 });
    const collarBrown = new THREE.MeshStandardMaterial({ color: 0x6e431f, roughness: 0.9 });

    // 1. Torso Barrel Body
    const body = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.82, 1.45, 3, 0.14), whiteHide);
    body.position.y = 0.95;
    body.castShadow = true;
    group.add(body);

    // Black Holstein Spot Patches across body
    const spot1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), blackSpot);
    spot1.scale.set(1.1, 0.4, 1.3);
    spot1.position.set(0.32, 1.1, 0.2);
    const spot2 = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), blackSpot);
    spot2.scale.set(1.1, 0.4, 1.2);
    spot2.position.set(-0.32, 1.05, -0.3);
    const spot3 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), blackSpot);
    spot3.scale.set(1.0, 0.35, 1.0);
    spot3.position.set(0.2, 1.35, -0.1);
    group.add(spot1, spot2, spot3);

    // Pink Udder with 4 Teats
    const udder = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.16, 0.28, 2, 0.05), muzzlePink);
    udder.position.set(0, 0.52, -0.32);
    group.add(udder);
    for (const tx of [-0.08, 0.08]) {
      for (const tz of [-0.08, 0.08]) {
        const teat = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.012, 0.06, 6), muzzlePink);
        teat.position.set(tx, 0.42, -0.32 + tz);
        group.add(teat);
      }
    }

    // 2. 4 Sturdy White Legs with Dark Hooves & Spot Knees
    for (const lx of [-0.25, 0.25]) {
      for (const lz of [-0.48, 0.48]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.65, 8), whiteHide);
        leg.position.set(lx, 0.35, lz);
        leg.castShadow = true;

        const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.08, 0.1, 8), hoofDark);
        hoof.position.set(lx, 0.05, lz);

        group.add(leg, hoof);

        // One knee spot
        if (lx > 0 && lz > 0) {
          const knee = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), blackSpot);
          knee.position.set(lx + 0.04, 0.35, lz);
          group.add(knee);
        }
      }
    }

    // 3. Head, Neck & Face
    const headGroup = new THREE.Group();
    if (isEating) {
      headGroup.position.set(0, 0.55, 0.95);
      headGroup.rotation.x = 0.65; // Head angled down to graze
    } else {
      headGroup.position.set(0, 1.15, 0.85);
      headGroup.rotation.x = -0.15; // Alert upright head
    }

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.45, 8), whiteHide);
    neck.position.set(0, -0.12, -0.12);
    neck.rotation.x = -Math.PI / 4;
    headGroup.add(neck);

    // Head Block
    const head = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.42, 0.48, 3, 0.08), whiteHide);
    head.position.set(0, 0.1, 0.1);
    head.castShadow = true;
    headGroup.add(head);

    // Black Head Spot over one eye
    const eyePatch = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), blackSpot);
    eyePatch.position.set(0.15, 0.15, 0.15);
    eyePatch.scale.set(0.8, 1.0, 0.9);
    headGroup.add(eyePatch);

    // Snout / Muzzle
    const snout = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.22, 0.24, 2, 0.06), muzzlePink);
    snout.position.set(0, -0.06, 0.34);
    // Dark Nostrils
    const nostrilL = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), eyeBlack);
    nostrilL.position.set(-0.07, -0.04, 0.46);
    const nostrilR = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), eyeBlack);
    nostrilR.position.set(0.07, -0.04, 0.46);
    headGroup.add(snout, nostrilL, nostrilR);

    // Expressive Eyes
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), eyeBlack);
    eyeL.position.set(-0.2, 0.14, 0.18);
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), eyeBlack);
    eyeR.position.set(0.2, 0.14, 0.18);
    headGroup.add(eyeL, eyeR);

    // Floppy Ears
    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 6), whiteHide);
      ear.rotation.z = side * 1.35;
      ear.rotation.x = -0.2;
      ear.position.set(side * 0.24, 0.18, -0.02);
      headGroup.add(ear);
    }

    // Curved Horns
    for (const side of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.18, 6), hornCream);
      horn.rotation.z = side * 0.65;
      horn.rotation.x = -0.4;
      horn.position.set(side * 0.14, 0.32, 0.02);
      headGroup.add(horn);
    }

    // Collar & Golden Cowbell
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.03, 6, 12), collarBrown);
    collar.position.set(0, -0.15, 0.05);
    collar.rotation.x = Math.PI / 3;
    const bell = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.11, 6), bellGold);
    bell.position.set(0, -0.32, 0.16);
    headGroup.add(collar, bell);

    group.add(headGroup);

    // 4. Slender Tail with Fluffy Black Brush
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.85, -0.76);
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.55, 6), whiteHide);
    tail.position.y = -0.275;
    tail.rotation.x = 0.25;
    const tailBrush = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), blackSpot);
    tailBrush.scale.set(0.7, 1.6, 0.7);
    tailBrush.position.set(0, -0.54, 0.07);
    tailGroup.add(tail, tailBrush);
    group.add(tailGroup);

    this.animatedProps.push((_d, time) => {
      tailGroup.rotation.y = Math.sin(time * 3.6) * 0.32;
      headGroup.rotation.x = (isGrazing ? 0.8 : 0.0) + Math.sin(time * 1.8) * 0.07;
      headGroup.rotation.y = Math.sin(time * 0.7) * 0.08;
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Stylized Cute Free-Range Chicken with red comb, wattles, yellow beak, and pecking pose.
   */
  createGrazingChicken(x, z, rotationY = 0, isPecking = false) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;
    group.scale.set(0.85, 0.85, 0.85);

    // Materials
    const featherMat = new THREE.MeshStandardMaterial({ color: 0xfffaea, roughness: 0.8 });
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xf5eed3, roughness: 0.85 });
    const combRed = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.6 });
    const beakYellow = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.5 });
    const eyeBlack = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const legOrange = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.7 });

    // Plump Rounded Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), featherMat);
    body.position.set(0, 0.28, 0);
    body.scale.set(0.85, 0.9, 1.1);
    body.castShadow = true;
    group.add(body);

    // Folded Wings
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), wingMat);
      wing.position.set(side * 0.18, 0.28, 0.02);
      wing.scale.set(0.4, 0.85, 1.2);
      group.add(wing);
    }

    // Upright Tail Plumes
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), wingMat);
    tail.position.set(0, 0.38, -0.22);
    tail.scale.set(0.5, 1.3, 0.8);
    tail.rotation.x = -0.5;
    group.add(tail);

    // Head, Beak & Comb
    const headGroup = new THREE.Group();
    if (isPecking) {
      headGroup.position.set(0, 0.16, 0.26);
      headGroup.rotation.x = 0.7; // Tilted down to peck
    } else {
      headGroup.position.set(0, 0.42, 0.15);
      headGroup.rotation.x = 0;
    }

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), featherMat);
    headGroup.add(head);

    // Red Comb
    for (let c = 0; c < 3; c++) {
      const crest = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), combRed);
      crest.position.set(0, 0.12 + (c === 1 ? 0.03 : 0), -0.04 + c * 0.045);
      headGroup.add(crest);
    }

    // Beak & Wattle
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.1, 6), beakYellow);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, -0.01, 0.15);
    const wattle = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), combRed);
    wattle.scale.set(0.7, 1.2, 0.7);
    wattle.position.set(0, -0.08, 0.1);
    headGroup.add(beak, wattle);

    // Eyes
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), eyeBlack);
      eye.position.set(side * 0.08, 0.03, 0.08);
      headGroup.add(eye);
    }
    group.add(headGroup);

    // 2 Orange Spindle Legs with 3 Toes
    for (const side of [-0.07, 0.07]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.14, 5), legOrange);
      leg.position.set(side, 0.07, 0);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.1), legOrange);
      foot.position.set(side, 0.01, 0.03);
      group.add(leg, foot);
    }

    this.animatedProps.push((_d, time) => {
      if (isPecking) {
        headGroup.rotation.x = 0.7 + Math.sin(time * 6.5) * 0.35;
      } else {
        headGroup.rotation.y = Math.sin(time * 1.6) * 0.18;
        headGroup.rotation.x = Math.sin(time * 3.2) * 0.1;
      }
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Rich Undulating Golden Wheat Field with timber border frame,
   * dense swaying amber grain heads, and carved rustic field sign.
   */
  createWheatFieldPatch(x, z, width = 4.2, depth = 3.2) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Materials
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x543c29, roughness: 0.9 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.85 });
    const wheatStemMat = new THREE.MeshStandardMaterial({ color: 0xd4a34b, roughness: 0.7 });
    const wheatGrainMat1 = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.6 });
    const wheatGrainMat2 = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.6 });

    // Raised Soil Bed
    const soil = new THREE.Mesh(new RoundedBoxGeometry(width, 0.22, depth, 2, 0.04), soilMat);
    soil.position.y = 0.11;
    soil.receiveShadow = true;
    group.add(soil);

    // Timber Perimeter Border Logs
    const log1 = new THREE.Mesh(new THREE.BoxGeometry(width + 0.16, 0.14, 0.12), woodMat);
    log1.position.set(0, 0.18, depth / 2 + 0.06);
    const log2 = new THREE.Mesh(new THREE.BoxGeometry(width + 0.16, 0.14, 0.12), woodMat);
    log2.position.set(0, 0.18, -depth / 2 - 0.06);
    const log3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, depth), woodMat);
    log3.position.set(width / 2 + 0.06, 0.18, 0);
    const log4 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, depth), woodMat);
    log4.position.set(-width / 2 - 0.06, 0.18, 0);
    group.add(log1, log2, log3, log4);

    // Dense Matrix of Golden Wheat Stalks
    const wheatStalks = [];
    const rows = 6;
    const cols = 9;
    for (let r = 0; r < rows; r++) {
      const pz = -depth / 2 + 0.35 + r * ((depth - 0.7) / (rows - 1));
      for (let c = 0; c < cols; c++) {
        const px = -width / 2 + 0.35 + c * ((width - 0.7) / (cols - 1)) + ((r % 2) * 0.15 - 0.07);
        const stalkH = 0.7 + ((r * 3 + c * 7) % 5) * 0.05;

        // Thin stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, stalkH, 4), wheatStemMat);
        stem.position.set(px, 0.22 + stalkH / 2, pz);
        stem.rotation.z = Math.sin(r + c) * 0.08;

        // Grain Spike Head
        const grain = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.28, 6), (r + c) % 2 === 0 ? wheatGrainMat1 : wheatGrainMat2);
        grain.position.set(px, 0.22 + stalkH + 0.12, pz);
        grain.rotation.z = stem.rotation.z + 0.05;

        group.add(stem, grain);
        wheatStalks.push({ stem, grain, px, pz });
      }
    }

    this.animatedProps.push((_d, time) => {
      wheatStalks.forEach((w) => {
        const wave = Math.sin(time * 2.8 + w.px * 1.5 + w.pz * 1.2) * 0.09;
        w.stem.rotation.z = wave;
        w.grain.rotation.z = wave * 1.15;
      });
    });

    // Rustic Field Signpost
    const signCanvas = createSafeCanvas(256, 128);
    let signTex = null;
    if (signCanvas) {
      const ctx = signCanvas.getContext('2d');
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(0, 0, 256, 128);
      ctx.strokeStyle = '#5d4037';
      ctx.lineWidth = 6;
      ctx.strokeRect(4, 4, 248, 120);
      ctx.fillStyle = '#f5deb3';
      ctx.font = 'bold 30px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BUĞDAY', 128, 45);
      ctx.font = 'bold 20px Fredoka, sans-serif';
      ctx.fillText('WHEAT FIELD', 128, 88);
      signTex = new THREE.CanvasTexture(signCanvas);
    }
    const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 6), woodMat);
    signPost.position.set(-width / 2 + 0.35, 0.45, depth / 2 + 0.2);
    const signBoardMat = signTex
      ? new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
      : new THREE.MeshBasicMaterial({ color: 0x8d6e63 });
    const signBoard = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.3), signBoardMat);
    signBoard.position.set(-width / 2 + 0.35, 0.7, depth / 2 + 0.2);
    group.add(signPost, signBoard);

    this.scene.add(group);
    return group;
  }

  /**
   * Neat Cedar Raised Garden Vegetable Beds with crisp rows of green lettuce,
   * orange carrots, climbing pea trellis, watering can, and hand trowel.
   */
  createVegetablePlotRaisedBeds(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x9c6644, roughness: 0.85 });
    const richSoilMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.95 });
    const cabbageGreen1 = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.6 });
    const cabbageGreen2 = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.55 });
    const carrotOrange = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.6 });
    const carrotGreens = new THREE.MeshStandardMaterial({ color: 0x1b7a43, roughness: 0.7 });
    const radishPurple = new THREE.MeshStandardMaterial({ color: 0x9b59b6, roughness: 0.6 });
    const radishWhite = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.7 });
    const pumpkinOrange = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.55 });
    const pumpkinBright = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.5 });
    const pumpkinStem = new THREE.MeshStandardMaterial({ color: 0x4a6523, roughness: 0.8 });
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.7 });
    const zincMat = new THREE.MeshStandardMaterial({ color: 0x95a5a6, roughness: 0.4, metalness: 0.7 });
    const woodCrateMat = new THREE.MeshStandardMaterial({ color: 0xaf7a49, roughness: 0.85 });

    const bedW = 1.35;
    const bedL = 3.6;
    const bedH = 0.32;

    // 2 Large Timber Boxes (Bed Left: Cabbages & Carrots; Bed Right: Radishes & Pumpkins)
    const animatedLeaves = [];

    // BED 1 (Left): Cabbages and Carrots
    {
      const side = -0.85;
      const box = new THREE.Mesh(new RoundedBoxGeometry(bedW, bedH, bedL, 2, 0.03), cedarMat);
      box.position.set(side, bedH / 2, 0);
      box.castShadow = true;
      box.receiveShadow = true;
      const soil = new THREE.Mesh(new THREE.BoxGeometry(bedW - 0.12, 0.08, bedL - 0.12), richSoilMat);
      soil.position.set(side, bedH, 0);
      group.add(box, soil);

      // Row A: Ruffled Green Cabbages
      for (let r = -1.35; r <= 1.35; r += 0.54) {
        const cx = side - 0.28;
        const cabbGroup = new THREE.Group();
        cabbGroup.position.set(cx, bedH + 0.04, r);

        // Outer ruffled leaves
        for (let l = 0; l < 5; l++) {
          const la = (l * Math.PI * 2) / 5;
          const outerLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), cabbageGreen1);
          outerLeaf.scale.set(1.4, 0.45, 1.1);
          outerLeaf.position.set(Math.cos(la) * 0.08, 0.04, Math.sin(la) * 0.08);
          outerLeaf.rotation.y = la;
          cabbGroup.add(outerLeaf);
        }
        // Tight central cabbage head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), cabbageGreen2);
        head.position.y = 0.09;
        cabbGroup.add(head);
        cabbGroup.castShadow = true;
        group.add(cabbGroup);
        animatedLeaves.push(cabbGroup);
      }

      // Row B: Carrots with leafy bushy tops
      for (let r = -1.4; r <= 1.4; r += 0.4) {
        const cx = side + 0.28;
        // Orange carrot crown peaking out
        const carrotTip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.02, 0.08, 6), carrotOrange);
        carrotTip.position.set(cx, bedH + 0.03, r);
        // Bushy feathery green foliage top
        const foliage = new THREE.Group();
        foliage.position.set(cx, bedH + 0.07, r);
        for (let f = 0; f < 3; f++) {
          const fr = (f * Math.PI * 2) / 3;
          const feather = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.24, 4), carrotGreens);
          feather.rotation.z = Math.cos(fr) * 0.25;
          feather.rotation.x = Math.sin(fr) * 0.25;
          feather.position.y = 0.12;
          foliage.add(feather);
        }
        group.add(carrotTip, foliage);
        animatedLeaves.push(foliage);
      }
    }

    // BED 2 (Right): Purple/White Radishes and Sprawling Pumpkins
    {
      const side = 0.85;
      const box = new THREE.Mesh(new RoundedBoxGeometry(bedW, bedH, bedL, 2, 0.03), cedarMat);
      box.position.set(side, bedH / 2, 0);
      box.castShadow = true;
      box.receiveShadow = true;
      const soil = new THREE.Mesh(new THREE.BoxGeometry(bedW - 0.12, 0.08, bedL - 0.12), richSoilMat);
      soil.position.set(side, bedH, 0);
      group.add(box, soil);

      // Row A: Purple & White Radishes
      for (let r = -1.4; r <= 1.4; r += 0.46) {
        const rx = side - 0.28;
        // Bulb
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 7, 6), (r < 0 ? radishPurple : radishWhite));
        bulb.position.set(rx, bedH + 0.05, r);
        bulb.scale.set(1.0, 1.25, 1.0);
        // Greens
        const greens = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 5), carrotGreens);
        greens.position.set(rx, bedH + 0.18, r);
        group.add(bulb, greens);
        animatedLeaves.push(greens);
      }

      // Row B: Plump Ribbed Pumpkins on Sprawling Vines
      // Connecting Vine Runners
      for (let v = -1.2; v <= 1.2; v += 0.4) {
        const runner = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.44, 4), vineMat);
        runner.rotation.x = Math.PI / 2;
        runner.position.set(side + 0.28 + Math.sin(v * 4) * 0.08, bedH + 0.02, v);
        group.add(runner);
      }
      // Big broad pumpkin leaves
      for (let lv = -1.3; lv <= 1.3; lv += 0.5) {
        const pLeaf = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.01, 6), cabbageGreen1);
        pLeaf.position.set(side + 0.24 + ((lv * 7) % 3) * 0.07, bedH + 0.04, lv);
        pLeaf.rotation.x = Math.sin(lv * 3) * 0.2;
        group.add(pLeaf);
        animatedLeaves.push(pLeaf);
      }
      // 3 Large Plump Ribbed Pumpkins
      for (const pz of [-1.0, 0.1, 1.1]) {
        const px = side + 0.28 + (pz === 0.1 ? 0.08 : -0.06);
        const pGroup = new THREE.Group();
        pGroup.position.set(px, bedH + 0.14, pz);
        // Ribbed body
        for (let b = 0; b < 6; b++) {
          const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 6), (b % 2 === 0 ? pumpkinOrange : pumpkinBright));
          lobe.scale.set(0.65, 0.85, 1.15);
          lobe.rotation.y = (b * Math.PI) / 3;
          pGroup.add(lobe);
        }
        // Curved green stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 5), pumpkinStem);
        stem.position.y = 0.14;
        stem.rotation.z = 0.25;
        pGroup.add(stem);
        pGroup.castShadow = true;
        group.add(pGroup);
      }
    }

    // Classic Zinc Watering Can between the beds
    const canBody = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.22, 8), zincMat);
    canBody.position.set(0, 0.11, 1.35);
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.26, 6), zincMat);
    spout.position.set(0, 0.18, 1.5);
    spout.rotation.x = Math.PI / 4;
    const canHandle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.015, 6, 10, Math.PI), zincMat);
    canHandle.position.set(0, 0.22, 1.35);
    canHandle.rotation.y = Math.PI / 2;
    group.add(canBody, spout, canHandle);

    // Harvest Crate with Fresh Vegetables
    const crate = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.24, 0.36, 2, 0.02), woodCrateMat);
    crate.position.set(0, 0.12, -1.35);
    crate.rotation.y = 0.2;
    // Carrots inside crate
    const crateCarrot = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.01, 0.18, 6), carrotOrange);
    crateCarrot.position.set(0.02, 0.23, -1.34);
    crateCarrot.rotation.x = 0.4;
    group.add(crate, crateCarrot);

    // Living Wind Breeze Animation
    this.animatedProps.push((_d, time) => {
      const sway = Math.sin(time * 2.2) * 0.04;
      animatedLeaves.forEach((mesh, idx) => {
        mesh.rotation.z = sway * (idx % 2 === 0 ? 1 : -0.85);
      });
    });

    this.scene.add(group);
    return group;
  }

  // --- 9. FAZ 5: ARKA ALAN, DEPO VE LOJİSTİK TESİSLERİ (LOGISTICS & WAREHOUSE) ---

  /**
   * Industrial Yellow Warehouse Forklift with counterweight, ROPS roll-cage canopy,
   * flashing safety amber strobe, driver seat, and 2-stage I-beam lift mast with steel forks.
   */
  createWarehouseForklift(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.4, metalness: 0.3 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2c3437, roughness: 0.6, metalness: 0.5 });
    const steelForkMat = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.3, metalness: 0.85 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.9 });
    const amberStrobeMat = new THREE.MeshStandardMaterial({
      color: 0xff9f1a,
      emissive: 0xff9f1a,
      emissiveIntensity: 0.7,
      roughness: 0.2
    });

    // 1. Heavy Chassis & Body
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.65, 1.45, 3, 0.08), yellowMat);
    body.position.set(0, 0.55, -0.15);
    body.castShadow = true;
    group.add(body);

    // Rear Cast-Iron Counterweight (sloped rear bumper with grille)
    const counterweight = new THREE.Mesh(new RoundedBoxGeometry(1.18, 0.62, 0.45, 3, 0.1), ironMat);
    counterweight.position.set(0, 0.55, -0.85);
    counterweight.castShadow = true;
    group.add(counterweight);

    // Solid Black Rubber Wheels
    // Front drive wheels (larger)
    for (const side of [-0.6, 0.6]) {
      const fWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 16), tireMat);
      fWheel.rotation.z = Math.PI / 2;
      fWheel.position.set(side, 0.28, 0.35);
      fWheel.castShadow = true;
      const fHub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.18, 10), ironMat);
      fHub.rotation.z = Math.PI / 2;
      fHub.position.set(side, 0.28, 0.35);
      group.add(fWheel, fHub);
    }
    // Rear steer wheels (smaller, inside counterweight well)
    for (const side of [-0.48, 0.48]) {
      const rWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.13, 14), tireMat);
      rWheel.rotation.z = Math.PI / 2;
      rWheel.position.set(side, 0.2, -0.65);
      rWheel.castShadow = true;
      group.add(rWheel);
    }

    // 2. Operator Cabin & ROPS Overhead Safety Guard
    const cabinFloor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.8), ironMat);
    cabinFloor.position.set(0, 0.62, -0.05);
    group.add(cabinFloor);

    // Ergonomic Black Seat
    const seat = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.36, 0.4, 2, 0.06), seatMat);
    seat.position.set(0, 1.05, -0.28);
    seat.castShadow = true;
    group.add(seat);

    // Steering Column & Mini Wheel with Spinner Knob
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6), ironMat);
    col.position.set(-0.15, 1.1, 0.15);
    col.rotation.x = -Math.PI / 6;
    const sWheel = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.018, 6, 12), seatMat);
    sWheel.position.set(-0.15, 1.32, 0.05);
    sWheel.rotation.x = Math.PI / 3;
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), seatMat);
    knob.position.set(-0.15, 1.44, 0.05);
    group.add(col, sWheel, knob);

    // 3 Hydraulic Levers (lift, tilt, shift)
    for (let i = 0; i < 3; i++) {
      const lev = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 4), chromeMat);
      lev.position.set(0.15 + i * 0.06, 1.0, 0.1);
      lev.rotation.x = -0.2;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 6), i === 0 ? yellowMat : (i === 1 ? ironMat : chromeMat));
      cap.position.set(0.15 + i * 0.06, 1.1, 0.08);
      group.add(lev, cap);
    }

    // 4 ROPS Steel Canopy Pillars
    const pillarH = 1.35;
    for (const px of [-0.46, 0.46]) {
      for (const pz of [-0.62, 0.25]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.05, pillarH, 0.05), ironMat);
        pillar.position.set(px, 0.9 + pillarH / 2, pz);
        group.add(pillar);
      }
    }
    // Overhead Guard Slotted Roof Grid
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.04, 0.98), ironMat);
    roof.position.set(0, 0.9 + pillarH + 0.02, -0.18);
    // Roof slats for visibility
    for (let sl = -0.35; sl <= 0.35; sl += 0.12) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.025, 0.04), ironMat);
      bar.position.set(0, 0.9 + pillarH + 0.03, -0.18 + sl);
      group.add(bar);
    }
    group.add(roof);

    // Flashing Amber Beacon Strobe on top rear
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 8), amberStrobeMat);
    beacon.position.set(0.38, 0.9 + pillarH + 0.1, -0.58);
    const beaconLight = new THREE.PointLight(0xff9f1a, 0.5, 4);
    beaconLight.position.set(0.38, 0.9 + pillarH + 0.15, -0.58);
    group.add(beacon, beaconLight);

    // 3. Dual-Stage Vertical Lift Mast & Steel Forks
    const mastH = 2.2;
    for (const side of [-0.36, 0.36]) {
      // Outer vertical I-beam channel
      const mastCol = new THREE.Mesh(new THREE.BoxGeometry(0.08, mastH, 0.08), ironMat);
      mastCol.position.set(side, mastH / 2 + 0.15, 0.62);
      mastCol.castShadow = true;
      group.add(mastCol);
    }
    // Mast cross braces
    for (const my of [0.5, 1.3, 2.1]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.06, 0.04), ironMat);
      brace.position.set(0, my, 0.62);
      group.add(brace);
    }

    // Central Hydraulic Lift Cylinder
    const hydCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, mastH - 0.3, 8), chromeMat);
    hydCyl.position.set(0, mastH / 2 + 0.05, 0.6);
    group.add(hydCyl);

    // Fork Carriage & Load Backrest Grid
    const carriage = new THREE.Group();
    carriage.position.set(0, 0.45, 0.68);

    // Carriage crossbar
    const cBar = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.12, 0.05), ironMat);
    carriage.add(cBar);

    // Load backrest safety grid
    for (let by = 0.12; by <= 0.65; by += 0.12) {
      const bGrid = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.025, 0.025), ironMat);
      bGrid.position.set(0, by, 0);
      carriage.add(bGrid);
    }
    const bPostL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.03), ironMat);
    bPostL.position.set(-0.34, 0.36, 0);
    const bPostR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.03), ironMat);
    bPostR.position.set(0.34, 0.36, 0);
    carriage.add(bPostL, bPostR);

    // Two Forged Steel L-Forks (tines)
    for (const fx of [-0.22, 0.22]) {
      // Vertical fork hanger
      const fVert = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.04), steelForkMat);
      fVert.position.set(fx, 0.18, 0.02);
      // Horizontal fork blade tine (1.05m long extending forward)
      const fBlade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 1.05), steelForkMat);
      fBlade.position.set(fx, -0.06, 0.52);
      fBlade.castShadow = true;
      // Tapered tip
      const fTip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), steelForkMat);
      fTip.rotation.x = Math.PI / 2;
      fTip.position.set(fx, -0.06, 1.05);
      carriage.add(fVert, fBlade, fTip);
    }
    group.add(carriage);

    this.scene.add(group);
    return group;
  }

  /**
   * Hydraulic Manual Pallet Jack (Transpalet) in industrial red with dual forks,
   * spring-loaded steering tiller handle, polyurethane load rollers, and pump cylinder.
   */
  createHydraulicPalletJack(x, z, rotationY = 0, color = 0xe74c3c) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const frameMat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.3 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.5, metalness: 0.6 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.9 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });

    // 1. Dual Fork Tines & Connecting Yoke
    for (const side of [-0.18, 0.18]) {
      // Fork tine
      const fork = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.065, 1.15), frameMat);
      fork.position.set(side, 0.08, 0.55);
      fork.castShadow = true;

      // Tapered nose tip
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.035, 0.1), frameMat);
      tip.position.set(side, 0.065, 1.15);

      // Polyurethane front load rollers underneath
      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.1, 10), wheelMat);
      roller.rotation.z = Math.PI / 2;
      roller.position.set(side, 0.038, 1.05);

      group.add(fork, tip, roller);
    }

    // Rear Connecting Bridge Yoke
    const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.18), frameMat);
    yoke.position.set(0, 0.18, 0);
    yoke.castShadow = true;
    group.add(yoke);

    // 2. Hydraulic Pump Cylinder & Dual Steer Wheels
    const pumpCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.35, 10), ironMat);
    pumpCyl.position.set(0, 0.3, -0.15);
    const pumpPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 8), chromeMat);
    pumpPiston.position.set(0, 0.45, -0.15);
    group.add(pumpCyl, pumpPiston);

    // Dual Polyurethane Steer Wheels
    for (const sx of [-0.1, 0.1]) {
      const sWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.06, 12), wheelMat);
      sWheel.rotation.z = Math.PI / 2;
      sWheel.position.set(sx, 0.085, -0.15);
      group.add(sWheel);
    }

    // 3. Spring-Loaded 3D Control Tiller Handle
    const handleGroup = new THREE.Group();
    handleGroup.position.set(0, 0.42, -0.15);
    handleGroup.rotation.x = -0.42; // Tilted back toward operator

    // Main tubular stem
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.85, 6), ironMat);
    stem.position.set(0, 0.42, 0);
    handleGroup.add(stem);

    // Triangular loop grip
    const gripL = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.26, 6), ironMat);
    gripL.position.set(-0.1, 0.85, 0);
    gripL.rotation.z = 0.5;
    const gripR = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.26, 6), ironMat);
    gripR.position.set(0.1, 0.85, 0);
    gripR.rotation.z = -0.5;
    const gripT = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.24, 6), ironMat);
    gripT.position.set(0, 0.95, 0);
    gripT.rotation.z = Math.PI / 2;
    // Release fingertip trigger lever
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.08, 0.02), frameMat);
    lever.position.set(0.04, 0.88, 0);
    handleGroup.add(gripL, gripR, gripT, lever);

    group.add(handleGroup);

    this.scene.add(group);
    return group;
  }

  /**
   * Stacks of standard Euro Pallets with natural pine grain boards, spacer blocks,
   * shrink-wrapped corrugated cardboard shipping cartons, and printed barcode labels.
   */
  createPalletStack(x, z, count = 3, hasBoxes = true, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const pineMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 });
    const boxMat1 = new THREE.MeshStandardMaterial({ color: 0xcda26f, roughness: 0.9 });
    const boxMat2 = new THREE.MeshStandardMaterial({ color: 0xba8c58, roughness: 0.9 });
    const strapMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const wrapMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.2
    });

    const pW = 1.2;
    const pD = 0.8;
    const pH = 0.14;

    // Helper: Single Euro Pallet Mesh
    const buildSinglePallet = (yPos) => {
      const p = new THREE.Group();
      p.position.y = yPos;

      // 5 Top Deck Boards
      for (let i = 0; i < 5; i++) {
        const board = new THREE.Mesh(new THREE.BoxGeometry(pW, 0.022, 0.12), pineMat);
        board.position.set(0, pH - 0.011, -pD / 2 + 0.06 + i * ((pD - 0.12) / 4));
        board.castShadow = true;
        p.add(board);
      }
      // 3 Cross Stringer Boards
      for (const sx of [-pW / 2 + 0.08, 0, pW / 2 - 0.08]) {
        const str = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.022, pD), pineMat);
        str.position.set(sx, pH - 0.033, 0);
        p.add(str);
      }
      // 9 Wooden Spacer Blocks
      for (const bx of [-pW / 2 + 0.08, 0, pW / 2 - 0.08]) {
        for (const bz of [-pD / 2 + 0.08, 0, pD / 2 - 0.08]) {
          const block = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.075, 0.12), pineMat);
          block.position.set(bx, 0.058, bz);
          p.add(block);
        }
      }
      // 3 Bottom Runner Boards
      for (const rx of [-pW / 2 + 0.08, 0, pW / 2 - 0.08]) {
        const runner = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, pD), pineMat);
        runner.position.set(rx, 0.01, 0);
        p.add(runner);
      }
      return p;
    };

    // Build pallet stack
    for (let c = 0; c < count; c++) {
      group.add(buildSinglePallet(c * pH));
    }

    // Stacked Cardboard Cartons on top pallet
    if (hasBoxes) {
      const boxBaseY = count * pH;

      // Barcode shipping label texture
      const labelCanvas = createSafeCanvas(128, 128);
      let labelTex = null;
      if (labelCanvas) {
        const ctx = labelCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 128, 128);
        ctx.fillStyle = '#222222';
        for (let bx = 16; bx < 112; bx += ((bx % 7) + 3)) {
          ctx.fillRect(bx, 20, 2, 55);
        }
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GBLB STORE', 64, 95);
        ctx.fillText('FRAGILE ↑', 64, 114);
        labelTex = new THREE.CanvasTexture(labelCanvas);
      }
      const labelMat = labelTex
        ? new THREE.MeshBasicMaterial({ map: labelTex })
        : new THREE.MeshBasicMaterial({ color: 0xffffff });

      // 4 boxes on tier 1, 2 boxes on tier 2
      const boxPositions = [
        // Tier 1 (4 boxes)
        { x: -0.28, y: boxBaseY + 0.22, z: -0.19, w: 0.52, h: 0.44, d: 0.36, mat: boxMat1 },
        { x: 0.28, y: boxBaseY + 0.22, z: -0.19, w: 0.52, h: 0.44, d: 0.36, mat: boxMat2 },
        { x: -0.28, y: boxBaseY + 0.22, z: 0.19, w: 0.52, h: 0.44, d: 0.36, mat: boxMat2 },
        { x: 0.28, y: boxBaseY + 0.22, z: 0.19, w: 0.52, h: 0.44, d: 0.36, mat: boxMat1 },
        // Tier 2 (2 boxes offset)
        { x: -0.15, y: boxBaseY + 0.62, z: 0, w: 0.56, h: 0.38, d: 0.42, mat: boxMat1 },
        { x: 0.32, y: boxBaseY + 0.6, z: 0.08, w: 0.48, h: 0.34, d: 0.4, mat: boxMat2 },
      ];

      boxPositions.forEach((b, idx) => {
        const boxMesh = new THREE.Mesh(new RoundedBoxGeometry(b.w, b.h, b.d, 2, 0.02), b.mat);
        boxMesh.position.set(b.x, b.y, b.z);
        boxMesh.castShadow = true;
        boxMesh.receiveShadow = true;
        group.add(boxMesh);

        // Apply shipping label on front or side
        const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), labelMat);
        lbl.position.set(b.x, b.y, b.z + b.d / 2 + 0.005);
        group.add(lbl);

        // Strapping bands
        if (idx < 4) {
          const strap = new THREE.Mesh(new THREE.BoxGeometry(b.w + 0.005, 0.018, b.d + 0.005), strapMat);
          strap.position.set(b.x, b.y, b.z);
          group.add(strap);
        }
      });

      // Clear stretch plastic shrink wrap bounding volume
      const shrinkWrap = new THREE.Mesh(new THREE.BoxGeometry(pW + 0.02, 0.9, pD + 0.02), wrapMat);
      shrinkWrap.position.set(0, boxBaseY + 0.45, 0);
      group.add(shrinkWrap);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Elevated Concrete Loading Dock Platform with motorized roll-up overhead shutter doors,
   * hydraulic dock leveler ramp, rubber impact bumpers, yellow safety bollards, and dock traffic light.
   */
  createLoadingDock(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x8a929a, roughness: 0.85 });
    const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x2c3437, roughness: 0.5, metalness: 0.7 });
    const rubberMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.95 });
    const yellowBollardMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4, metalness: 0.3 });
    const shutterMat = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.45, metalness: 0.6 });

    const dockW = 5.8;
    const dockD = 3.6;
    const dockH = 0.95;

    // 1. Reinforced Concrete Dock Platform Slab
    const slab = new THREE.Mesh(new RoundedBoxGeometry(dockW, dockH, dockD, 2, 0.04), concreteMat);
    slab.position.set(0, dockH / 2, 0);
    slab.receiveShadow = true;
    slab.castShadow = true;
    group.add(slab);

    // 2. Hydraulic Dock Leveler Pit & Checkerplate Ramp
    const rampW = 2.2;
    const rampD = 2.4;
    const leveler = new THREE.Mesh(new THREE.BoxGeometry(rampW, 0.08, rampD), darkSteelMat);
    leveler.position.set(0, dockH + 0.04, dockD / 2 - rampD / 2);
    // Beveled lip projecting forward to meet truck bed
    const lip = new THREE.Mesh(new THREE.BoxGeometry(rampW - 0.2, 0.04, 0.4), darkSteelMat);
    lip.position.set(0, dockH + 0.03, dockD / 2 + 0.18);
    lip.rotation.x = 0.15;
    group.add(leveler, lip);

    // Yellow / Black Hazard Stripes along pit edges
    const hazardCanvas = createSafeCanvas(512, 64);
    let hazardTex = null;
    if (hazardCanvas) {
      const ctx = hazardCanvas.getContext('2d');
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(0, 0, 512, 64);
      ctx.fillStyle = '#2d3436';
      for (let hx = -64; hx < 576; hx += 48) {
        ctx.beginPath();
        ctx.moveTo(hx, 0);
        ctx.lineTo(hx + 24, 0);
        ctx.lineTo(hx - 16, 64);
        ctx.lineTo(hx - 40, 64);
        ctx.closePath();
        ctx.fill();
      }
      hazardTex = new THREE.CanvasTexture(hazardCanvas);
      hazardTex.wrapS = THREE.RepeatWrapping;
      hazardTex.repeat.set(4, 1);
    }
    const hazardMat = hazardTex
      ? new THREE.MeshBasicMaterial({ map: hazardTex })
      : new THREE.MeshBasicMaterial({ color: 0xf1c40f });

    // Warning stripe along front dock edge
    const edgeStripe = new THREE.Mesh(new THREE.PlaneGeometry(dockW, 0.16), hazardMat);
    edgeStripe.position.set(0, dockH - 0.08, dockD / 2 + 0.005);
    group.add(edgeStripe);

    // 3. Heavy Heavy-Duty Rubber Dock Bumpers flanking the bay
    for (const bx of [-rampW / 2 - 0.35, rampW / 2 + 0.35]) {
      const bumper = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.65, 0.22, 2, 0.03), rubberMat);
      bumper.position.set(bx, dockH - 0.3, dockD / 2 + 0.11);
      bumper.castShadow = true;
      group.add(bumper);
    }

    // 4. Motorized Overhead Roll-Up Shutter Door on back wall
    const doorW = 3.2;
    const doorH = 2.8;
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(doorW + 0.3, doorH + 0.2, 0.15), darkSteelMat);
    doorFrame.position.set(0, dockH + doorH / 2, -dockD / 2 + 0.1);

    // Slatted corrugated shutter curtain
    const shutter = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.05), shutterMat);
    shutter.position.set(0, dockH + doorH / 2, -dockD / 2 + 0.12);
    // Corrugated horizontal slat lines
    for (let sy = 0.2; sy < doorH; sy += 0.25) {
      const slatLine = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.05, 0.03, 0.02), darkSteelMat);
      slatLine.position.set(0, dockH + sy, -dockD / 2 + 0.15);
      group.add(slatLine);
    }
    group.add(doorFrame, shutter);

    // 5. Heavy Yellow Safety Bollards Guarding Corners
    for (const cornerX of [-dockW / 2 + 0.35, dockW / 2 - 0.35]) {
      const bollard = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.15, 12), yellowBollardMat);
      bollard.position.set(cornerX, 0.575, dockD / 2 + 0.3);
      bollard.castShadow = true;
      const bCap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), yellowBollardMat);
      bCap.position.set(cornerX, 1.15, dockD / 2 + 0.3);
      group.add(bollard, bCap);
    }

    // 6. Dock Status Traffic Light (Red / Green LED Signal)
    const tlHousing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.15), darkSteelMat);
    tlHousing.position.set(-doorW / 2 - 0.4, dockH + 1.8, -dockD / 2 + 0.2);
    // Green light (illuminated = Ready to dock)
    const greenLED = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshBasicMaterial({ color: 0x2ecc71 }));
    greenLED.position.set(-doorW / 2 - 0.4, dockH + 1.7, -dockD / 2 + 0.28);
    // Red light
    const redLED = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.8 }));
    redLED.position.set(-doorW / 2 - 0.4, dockH + 1.9, -dockD / 2 + 0.28);
    group.add(tlHousing, greenLED, redLED);

    this.scene.add(group);
    return group;
  }

  /**
   * Warehouse Logistics Hangar Facade with corrugated steel siding, personnel door,
   * illuminated "MAL KABUL & LOJİSTİK" signage, and exterior LED floodlights.
   */
  createWarehouseHangarBuilding(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const metalCladMat = new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.55, metalness: 0.4 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x95a5a6, roughness: 0.8 });
    const steelDoorMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.7 });
    const floodLightMat = new THREE.MeshBasicMaterial({ color: 0xf1f2f6 });

    const width = 8.5;
    const height = 4.6;
    const depth = 5.2;

    // 1. Concrete Foundation Plinth
    const plinth = new THREE.Mesh(new RoundedBoxGeometry(width + 0.2, 0.35, depth + 0.2, 2, 0.05), concreteMat);
    plinth.position.y = 0.175;
    group.add(plinth);

    // 2. Corrugated Industrial Cladding Walls
    const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), metalCladMat);
    mainBuilding.position.y = height / 2 + 0.35;
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    group.add(mainBuilding);

    // Horizontal architectural banding
    for (const by of [1.6, 3.2, 4.8]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(width + 0.05, 0.08, depth + 0.05), trimMat);
      band.position.y = by;
      group.add(band);
    }

    // 3. Security Receiving Personnel Door with Porthole Window
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.25, 0.1), trimMat);
    doorFrame.position.set(-2.2, 1.45, depth / 2 + 0.05);
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.15, 0.06), steelDoorMat);
    door.position.set(-2.2, 1.45, depth / 2 + 0.07);

    // Round Porthole Window
    const porthole = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 12), trimMat);
    porthole.rotation.x = Math.PI / 2;
    porthole.position.set(-2.2, 1.85, depth / 2 + 0.09);
    const portGlass = new THREE.Mesh(new THREE.CircleGeometry(0.13, 12), new THREE.MeshBasicMaterial({ color: 0x81ecec }));
    portGlass.position.set(-2.2, 1.85, depth / 2 + 0.135);

    // Panic push-bar handle
    const pushBar = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.06), new THREE.MeshStandardMaterial({ color: 0xd63031 }));
    pushBar.position.set(-2.2, 1.3, depth / 2 + 0.12);
    group.add(doorFrame, door, porthole, portGlass, pushBar);

    // 4. Large Illuminated "MAL KABUL & LOJİSTİK" Signboard
    const signCanvas = createSafeCanvas(512, 128);
    let signTex = null;
    if (signCanvas) {
      const ctx = signCanvas.getContext('2d');
      ctx.fillStyle = '#1e272e';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 500, 116);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MAL KABUL & LOJİSTİK', 256, 44);
      ctx.font = 'bold 22px Fredoka, sans-serif';
      ctx.fillStyle = '#00d2d3';
      ctx.fillText('RECEIVING BAY • WAREHOUSE 01', 256, 88);
      signTex = new THREE.CanvasTexture(signCanvas);
    }
    const signMat = signTex
      ? new THREE.MeshBasicMaterial({ map: signTex })
      : new THREE.MeshBasicMaterial({ color: 0x1e272e });
    const signBoard = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), signMat);
    signBoard.position.set(0, 3.8, depth / 2 + 0.08);

    const signFrame = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.05, 0.08), trimMat);
    signFrame.position.set(0, 3.8, depth / 2 + 0.04);
    group.add(signFrame, signBoard);

    // 5. Industrial Wall-Pack Floodlights
    for (const lx of [-2.5, 2.5]) {
      const fixture = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.22), trimMat);
      fixture.position.set(lx, 4.4, depth / 2 + 0.11);
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.14), floodLightMat);
      glass.rotation.x = Math.PI / 4;
      glass.position.set(lx, 4.35, depth / 2 + 0.22);
      const flood = new THREE.PointLight(0xfffae8, 0.9, 10);
      flood.position.set(lx, 4.2, depth / 2 + 0.5);
      group.add(fixture, glass, flood);
    }

    // 6. Rooftop Turbine Vent Hoods
    for (const tx of [-2.0, 2.0]) {
      const ventCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.5, 10), trimMat);
      ventCyl.position.set(tx, height + 0.55, 0);
      const ventCap = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.25, 10), trimMat);
      ventCap.position.set(tx, height + 0.85, 0);
      group.add(ventCyl, ventCap);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Commercial Cold Storage Bunker / Refrigeration Facility with insulated freezer door,
   * rooftop dual-fan condenser unit, coolant piping, and glowing digital temperature display.
   */
  createColdStorageBunker(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    // Materials
    const panelMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1, roughness: 0.35, metalness: 0.15 });
    const steelTrimMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.3, metalness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.9 });
    const copperPipeMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.3, metalness: 0.8 });
    const fanBladeMat = new THREE.MeshStandardMaterial({ color: 0x2c3437, roughness: 0.7 });

    const w = 3.6;
    const d = 3.2;
    const h = 2.8;

    // 1. Insulated Polyurethane Composite Sandwich Box
    const bunker = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, 0.05), panelMat);
    bunker.position.y = h / 2;
    bunker.castShadow = true;
    bunker.receiveShadow = true;
    group.add(bunker);

    // Stainless Steel Corner Edge Extrusions
    for (const px of [-w / 2, w / 2]) {
      for (const pz of [-d / 2, d / 2]) {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(0.08, h + 0.02, 0.08), steelTrimMat);
        edge.position.set(px, h / 2, pz);
        group.add(edge);
      }
    }

    // 2. Heavy Walk-in Freezer Cold Room Door
    const doorW = 1.3;
    const doorH = 2.2;
    const door = new THREE.Mesh(new RoundedBoxGeometry(doorW, doorH, 0.1, 2, 0.03), panelMat);
    door.position.set(0, doorH / 2 + 0.1, d / 2 + 0.05);

    // Heavy Freezer Chrome Latch Handle with Emergency Release Push Button
    const latch = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.12), chromeMat);
    latch.position.set(-doorW / 2 + 0.15, 1.2, d / 2 + 0.12);
    const leverHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 6), chromeMat);
    leverHandle.rotation.x = Math.PI / 2;
    leverHandle.position.set(-doorW / 2 + 0.15, 1.15, d / 2 + 0.2);
    // Heavy Chrome Hinges on other side
    for (const hy of [0.5, 1.9]) {
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.18, 8), chromeMat);
      hinge.position.set(doorW / 2 - 0.05, hy, d / 2 + 0.1);
      group.add(hinge);
    }
    group.add(door, latch, leverHandle);

    // 3. Digital Temperature Display LED Readout (-18.5°C FROZEN)
    const tempCanvas = createSafeCanvas(256, 128);
    let tempTex = null;
    if (tempCanvas) {
      const ctx = tempCanvas.getContext('2d');
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, 256, 128);
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 248, 120);
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 42px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('-18.5°C', 128, 48);
      ctx.font = 'bold 20px Fredoka, sans-serif';
      ctx.fillStyle = '#4cd137';
      ctx.fillText('COLD STORAGE OK', 128, 92);
      tempTex = new THREE.CanvasTexture(tempCanvas);
    }
    const tempMat = tempTex
      ? new THREE.MeshBasicMaterial({ map: tempTex })
      : new THREE.MeshBasicMaterial({ color: 0x0a192f });
    const tempScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.38), tempMat);
    tempScreen.position.set(0.95, 1.8, d / 2 + 0.06);
    const tempBezel = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.44, 0.04), steelTrimMat);
    tempBezel.position.set(0.95, 1.8, d / 2 + 0.04);
    group.add(tempBezel, tempScreen);

    // 4. Rooftop Dual-Fan Industrial Condenser Unit
    const condHousing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 1.4), steelTrimMat);
    condHousing.position.set(0, h + 0.28, 0);
    condHousing.castShadow = true;
    group.add(condHousing);

    // Twin Fan Openings with Protective Wire Mesh Grilles
    for (const fx of [-0.65, 0.65]) {
      const cowl = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.45, 0.16, 12), steelTrimMat);
      cowl.position.set(fx, h + 0.58, 0);
      const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.18, 8), fanBladeMat);
      fanHub.position.set(fx, h + 0.58, 0);
      // Fan blades
      for (let b = 0; b < 4; b++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.08), fanBladeMat);
        blade.position.set(fx, h + 0.58, 0);
        blade.rotation.y = (b * Math.PI) / 2;
        blade.rotation.x = 0.2;
        group.add(blade);
      }
      group.add(cowl, fanHub);
    }

    // 5. Copper Refrigerant Suction & Discharge Piping Lines
    for (const [py, pz] of [[1.2, -d / 2 - 0.05], [1.5, -d / 2 - 0.05]]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 6), copperPipeMat);
      pipe.position.set(w / 2 + 0.05, py, pz);
      pipe.rotation.z = Math.PI / 2;
      group.add(pipe);
    }

    this.scene.add(group);
    return group;
  }

  /**
   * Set of 3 Heavy-Duty Commercial 1100L Industrial Recycling Dumpsters
   * (Green Organic, Blue Cardboard/Paper, Yellow Plastic/Metals) with split hinged lids,
   * garbage truck trunnion lift pins, and 360-degree castor wheels.
   */
  createRecyclingDumpsters(x, z, rotationY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const dumpsterData = [
      { color: 0x27ae60, label: 'ORGANİK ATIK', sub: 'ORGANIC' },
      { color: 0x2980b9, label: 'KAĞIT & KARTON', sub: 'PAPER RECYCLE' },
      { color: 0xf39c12, label: 'PLASTİK & METAL', sub: 'PLASTIC CANS' },
    ];

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const steelPinMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.3, metalness: 0.8 });
    const lidBlack = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.7 });

    const dW = 1.35;
    const dH = 1.05;
    const dD = 0.95;

    dumpsterData.forEach((d, idx) => {
      const dGroup = new THREE.Group();
      dGroup.position.set((idx - 1) * 1.6, 0, 0);

      const bodyMat = new THREE.MeshStandardMaterial({ color: d.color, roughness: 0.65 });

      // 1. Tapered Corrugated Polymer Bin Body
      const bin = new THREE.Mesh(new RoundedBoxGeometry(dW, dH, dD, 2, 0.04), bodyMat);
      bin.position.y = dH / 2 + 0.16;
      bin.castShadow = true;
      dGroup.add(bin);

      // Side Strengthening Ribs
      for (const ry of [0.45, 0.8]) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(dW + 0.03, 0.04, dD + 0.03), bodyMat);
        rib.position.y = ry;
        dGroup.add(rib);
      }

      // Side Steel Trunnion Lift Pins for Garbage Truck Lifting Arms
      for (const px of [-dW / 2 - 0.08, dW / 2 + 0.08]) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.16, 8), steelPinMat);
        pin.rotation.z = Math.PI / 2;
        pin.position.set(px, 0.85, 0);
        dGroup.add(pin);
      }

      // 2. Dual Split Hinged Curved Plastic Lids
      for (const lx of [-dW / 4 + 0.02, dW / 4 - 0.02]) {
        const lid = new THREE.Mesh(new RoundedBoxGeometry(dW / 2 - 0.06, 0.08, dD + 0.05, 2, 0.02), lidBlack);
        lid.position.set(lx, dH + 0.2, 0);
        // Lid grab handle
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.25, 6), lidBlack);
        handle.rotation.z = Math.PI / 2;
        handle.position.set(lx, dH + 0.26, dD / 2 - 0.1);
        dGroup.add(lid, handle);
      }

      // 3. 4 Castor Wheels with Foot Brake Pedals
      for (const wx of [-dW / 2 + 0.18, dW / 2 - 0.18]) {
        for (const wz of [-dD / 2 + 0.18, dD / 2 - 0.18]) {
          const fork = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.08, 6), steelPinMat);
          fork.position.set(wx, 0.12, wz);
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 10), wheelMat);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(wx, 0.075, wz);
          wheel.castShadow = true;
          dGroup.add(fork, wheel);
        }
      }

      // 4. Front Recycling Decal Badge
      const decalCanvas = createSafeCanvas(256, 128);
      let decalTex = null;
      if (decalCanvas) {
        const ctx = decalCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 256, 128);
        ctx.strokeStyle = '#2d3436';
        ctx.lineWidth = 4;
        ctx.strokeRect(4, 4, 248, 120);
        ctx.fillStyle = '#2d3436';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♻', 128, 38);
        ctx.font = 'bold 18px Fredoka, sans-serif';
        ctx.fillText(d.label, 128, 76);
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#636e72';
        ctx.fillText(d.sub, 128, 104);
        decalTex = new THREE.CanvasTexture(decalCanvas);
      }
      const decalMat = decalTex
        ? new THREE.MeshBasicMaterial({ map: decalTex })
        : new THREE.MeshBasicMaterial({ color: 0xffffff });
      const decal = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.28), decalMat);
      decal.position.set(0, 0.72, dD / 2 + 0.015);
      dGroup.add(decal);

      group.add(dGroup);
    });

    this.scene.add(group);
    return group;
  }

  update(delta, time) {
    // Gentle wind breeze swaying foliage
    const sway = Math.sin(time * 1.5) * 0.03;
    this.animatedTrees.forEach((t, i) => {
      t.rotation.z = sway * (i % 2 === 0 ? 1 : -0.8);
    });
    this.animatedProps.forEach((fn) => {
      try {
        fn(delta, time);
      } catch (e) {
        // safeguard
      }
    });
  }
}

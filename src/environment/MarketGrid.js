import * as THREE from 'three';
import { GAME_CONFIG } from '../config/GameConfig.js';
import { EnvironmentProps } from './EnvironmentProps.js';

export class MarketGrid {
  constructor(scene) {
    this.scene = scene;
    this.obstacles = []; // array of { min: {x, z}, max: {x, z} }
    this.props = new EnvironmentProps(scene);
    this.buildEnvironment();
  }

  buildEnvironment() {
    // 1. Huge Lush Green Grass Base Ground (extends to entire horizon x = -70 to +40)
    const baseGeo = new THREE.PlaneGeometry(160, 100);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x2ed573, // Vibrant lush arcade grass
      roughness: 0.75
    });
    const baseGround = new THREE.Mesh(baseGeo, baseMat);
    baseGround.rotation.x = -Math.PI / 2;
    baseGround.position.set(-15, -0.06, 0);
    baseGround.receiveShadow = true;
    this.scene.add(baseGround);

    // 2. Asphalt Road & Parking Lot in Front of Store & Restaurant (z = 10 to 28)
    const roadGeo = new THREE.PlaneGeometry(80, 18);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x2f3640,
      roughness: 0.6
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(-10, -0.04, 19);
    road.receiveShadow = true;
    this.scene.add(road);

    // Parking Lot White Dividing Stripes
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [-24, -17, -10, -3, 4, 11, 18].forEach(x => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5), stripeMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, -0.03, 16);
      this.scene.add(line);
    });

    // Sidewalk curb in front of all zones (z = 9.8)
    const sidewalkGeo = new THREE.PlaneGeometry(74, 2.2);
    const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0xf1f2f6, roughness: 0.4 });
    const sidewalk = new THREE.Mesh(sidewalkGeo, sidewalkMat);
    sidewalk.rotation.x = -Math.PI / 2;
    sidewalk.position.set(-17, -0.02, 10);
    sidewalk.receiveShadow = true;
    this.scene.add(sidewalk);

    // 3. ZONE 1: Supermarket Floor (Warm Cream/Beige Polished Porcelain Tile Grid - Matching Image 6)
    const storeFloorTex = this.createSupermarketFloorTexture();
    const storeGeo = new THREE.PlaneGeometry(18, 18);
    const storeMat = new THREE.MeshStandardMaterial({
      map: storeFloorTex,
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.04
    });
    const storeFloor = new THREE.Mesh(storeGeo, storeMat);
    storeFloor.rotation.x = -Math.PI / 2;
    storeFloor.position.set(5, 0, 0);
    storeFloor.receiveShadow = true;
    this.scene.add(storeFloor);

    // 4. ZONE 2: Organic Garden & Greenhouse Farm Floor (Lush Garden Grass on Left x = -26 to -4)
    const gardenGeo = new THREE.PlaneGeometry(22, 18);
    const gardenMat = new THREE.MeshStandardMaterial({
      color: 0x27ae60,
      roughness: 0.7,
    });
    const gardenFloor = new THREE.Mesh(gardenGeo, gardenMat);
    gardenFloor.rotation.x = -Math.PI / 2;
    gardenFloor.position.set(-15, 0, 0);
    gardenFloor.receiveShadow = true;
    this.scene.add(gardenFloor);

    const waitingArea = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 3.2),
      new THREE.MeshStandardMaterial({ color: 0xc8dcae, roughness: 0.9 }),
    );
    waitingArea.rotation.x = -Math.PI / 2;
    waitingArea.position.set(-23.5, 0.025, -6.7);
    waitingArea.receiveShadow = true;
    this.scene.add(waitingArea);

    const waitingBorder = new THREE.MeshBasicMaterial({ color: 0xe7c465 });
    const borderSegments = [
      { geometry: new THREE.BoxGeometry(3.8, 0.035, 0.07), x: -23.5, z: -8.3 },
      { geometry: new THREE.BoxGeometry(3.8, 0.035, 0.07), x: -23.5, z: -5.1 },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, 3.2), x: -25.4, z: -6.7 },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, 3.2), x: -21.6, z: -6.7 },
    ];
    for (const segment of borderSegments) {
      const stripe = new THREE.Mesh(segment.geometry, waitingBorder);
      stripe.position.set(segment.x, 0.045, segment.z);
      this.scene.add(stripe);
    }

    const waitingLabelCanvas = document.createElement('canvas');
    waitingLabelCanvas.width = 512;
    waitingLabelCanvas.height = 128;
    const waitingLabelContext = waitingLabelCanvas.getContext('2d');
    waitingLabelContext.fillStyle = '#496c4b';
    waitingLabelContext.fillRect(0, 0, waitingLabelCanvas.width, waitingLabelCanvas.height);
    waitingLabelContext.fillStyle = '#ffffff';
    waitingLabelContext.font = 'bold 36px Fredoka, sans-serif';
    waitingLabelContext.textAlign = 'center';
    waitingLabelContext.textBaseline = 'middle';
    waitingLabelContext.fillText('PERSONEL • STAFF', 256, 42);
    waitingLabelContext.font = 'bold 28px Fredoka, sans-serif';
    waitingLabelContext.fillText('BEKLEME • WAIT', 256, 91);
    const waitingLabelTexture = new THREE.CanvasTexture(waitingLabelCanvas);
    waitingLabelTexture.colorSpace = THREE.SRGBColorSpace;
    const waitingLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 0.7),
      new THREE.MeshBasicMaterial({ map: waitingLabelTexture, toneMapped: false }),
    );
    waitingLabel.rotation.x = -Math.PI / 2;
    waitingLabel.position.set(-23.5, 0.055, -8.05);
    this.scene.add(waitingLabel);

    // Main Garden Promenade connecting Supermarket doorway (x = -4) to Restaurant (x = -26)
    this.createPath(-15, 0, 22, 2.8);

    // Branching garden paths to crop plots & orchards
    this.createPath(-10, 3.5, 2.2, 5.0);
    this.createPath(-18, 3.5, 2.2, 5.0);
    this.createPath(-10, -3.5, 2.2, 5.0);
    this.createPath(-18, -3.5, 2.2, 5.0);

    // 5. ZONE 3: Gourmet Restaurant Zone Floor (Rich Warm Timber Wood on Far Left x = -48 to -26)
    const restGeo = new THREE.PlaneGeometry(22, 18);
    const restMat = new THREE.MeshStandardMaterial({
      color: GAME_CONFIG.COLORS.FLOOR_RESTAURANT,
      roughness: 0.3,
    });
    const restFloor = new THREE.Mesh(restGeo, restMat);
    restFloor.rotation.x = -Math.PI / 2;
    restFloor.position.set(-37, 0, 0);
    restFloor.receiveShadow = true;
    this.scene.add(restFloor);

    // 7. Store & Restaurant Walls
    this.createStoreWalls();
    this.createRestaurantWalls();

    // 8. Supermarket Entrance & Fixtures (Directly from Reference Photo!)
    // A. Automatic Sliding Glass Doors at entrance (x = 5, z = 9)
    this.props.createSlidingGlassDoors(5, 9.0, 6.2, 2.7);

    // B. Nested metal wire shopping carts parked outside entrance on sidewalk (x = 9.2, z = 10.2)
    this.props.createCartStack(9.2, 10.2, 4, -Math.PI / 2);

    // C. Stack of red handheld shopping baskets right inside entrance (x = 2.0, z = 7.8)
    this.props.createBasketStack(2.0, 7.8);

    // D. Decorative flower display stand & planters flanking entrance
    this.props.createFlowerDisplayStand(1.0, 9.8, 0);
    this.props.createFlowerDisplayStand(11.8, 9.8, 0);

    // 9. Awning & 3D Signboards
    this.props.createStoreAwning(5, 2.3, 9.1, 10, 1.8);
    this.props.createStoreSign(5, 3.4, 9.0);

    // Restaurant Awning & Signboard
    this.props.createStoreAwning(-37, 2.3, 9.1, 12, 1.8);
    this.createRestaurantSign(-37, 3.4, 9.0);

    // 10. Low-Poly Cars in Parking Lot (Ultra vibrant candy colors)
    this.props.createCar(4, 16.5, -Math.PI / 2, 0xff4757); // Candy Red car
    this.props.createCar(11, 16.5, -Math.PI / 2, 0xffa502); // Bright Gold Taxi
    this.props.createCar(-10, 16.5, -Math.PI / 2, 0x1e90ff); // Electric Blue car
    this.props.createCar(-24, 16.5, -Math.PI / 2, 0xa55eea); // Sweet Lilac/Purple car

    // 11. Street Lamps & Fences
    this.props.createStreetLamp(14, 10.5);
    this.props.createStreetLamp(-4, 10.5);
    this.props.createStreetLamp(-26, 10.5);
    this.props.createStreetLamp(-47, 10.5);

    // Farm Fences (North and South borders)
    this.props.createWoodenFence(-15, 9.0, 22, 0);
    this.props.createWoodenFence(-15, -9.0, 22, 0);
    this.registerObstacle(-15, 9.0, 22, 0.4);
    this.registerObstacle(-15, -9.0, 22, 0.4);

    // 12. Lush Trees
    this.props.createOakTree(-52, 4, 1.3);
    this.props.createOakTree(-51, -6, 1.2);
    this.props.createOakTree(-8, -14, 1.1);
    this.props.createOakTree(2, -14, 1.2);
    this.props.createOakTree(12, -14, 1.0);
    this.props.createPineTree(17, -5, 1.1);
    this.props.createPineTree(18, 4, 1.2);
    this.props.createPineTree(-30, -14, 1.2);
    this.props.createPineTree(-42, -14, 1.1);
  }

  /**
   * Procedurally generates a warm cream porcelain tile floor texture with subtle grout lines.
   */
  createSupermarketFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base warm creamy tile color
    ctx.fillStyle = '#f7f2ea';
    ctx.fillRect(0, 0, 512, 512);

    const tileSize = 64; // 8x8 tiles in 512x512
    for (let y = 0; y < 512; y += tileSize) {
      for (let x = 0; x < 512; x += tileSize) {
        // Subtle organic tile variation
        const shade = ((x + y * 7) % 3 === 0) ? '#fbf7f0' : ((x * 3 + y) % 2 === 0 ? '#f4eee4' : '#f8f3eb');
        ctx.fillStyle = shade;
        ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

        // Crisp grout line
        ctx.strokeStyle = '#e2d9cd';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    return texture;
  }

  createPath(x, z, width, depth) {
    const geo = new THREE.PlaneGeometry(width, depth);
    const mat = new THREE.MeshStandardMaterial({ color: 0xecf0f1, roughness: 0.6 });
    const path = new THREE.Mesh(geo, mat);
    path.rotation.x = -Math.PI / 2;
    path.position.set(x, 0.005, z);
    path.receiveShadow = true;
    this.scene.add(path);
  }

  createStoreWalls() {
    const wallMat = new THREE.MeshStandardMaterial({ color: GAME_CONFIG.COLORS.WALLS, roughness: 0.4 });
    const wallHeight = 1.1;
    const thickness = 0.4;

    // Top Wall (z = -9, x = -4 to 14)
    this.addWall(5, -9, 18, wallHeight, thickness, wallMat);

    // Bottom Wall (z = 9, with door gap at center)
    this.addWall(11.5, 9, 5, wallHeight, thickness, wallMat);
    this.addWall(-1.5, 9, 5, wallHeight, thickness, wallMat);

    // Right Wall (x = 14, z = -9 to 9)
    this.addWall(14, 0, thickness, wallHeight, 18, wallMat);

    // Left Wall facing Organic Garden (x = -4) with a wide doorway at center (z = -1.8 to 1.8)
    this.addWall(-4, -5.4, thickness, wallHeight, 7.2, wallMat); // North section
    this.addWall(-4, 5.4, thickness, wallHeight, 7.2, wallMat);  // South section

    // Architectural Garden Arch & Sign over the door (x = -4, z = 0)
    this.createGardenDoorway(-4, 0);
  }

  createRestaurantWalls() {
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.3 });
    const wallHeight = 1.1;
    const thickness = 0.4;

    // Top Wall (z = -9, x = -48 to -26)
    this.addWall(-37, -9, 22, wallHeight, thickness, wallMat);

    // Bottom Wall (z = 9, with entrance door gap)
    this.addWall(-45, 9, 6, wallHeight, thickness, wallMat);
    this.addWall(-29, 9, 6, wallHeight, thickness, wallMat);

    // Left Wall (x = -48, z = -9 to 9)
    this.addWall(-48, 0, thickness, wallHeight, 18, wallMat);

    // Right Wall facing Organic Garden (x = -26) with doorway at center (z = -1.8 to 1.8)
    this.addWall(-26, -5.4, thickness, wallHeight, 7.2, wallMat);
    this.addWall(-26, 5.4, thickness, wallHeight, 7.2, wallMat);
    this.createRestaurantGardenDoorway(-26, 0);
  }

  createGardenDoorway(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.7 });

    // Sturdy timber door posts flanking the passage
    for (const pz of [-2.0, 2.0]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.7, 0.5), woodMat);
      post.position.set(0, 1.35, pz);
      post.castShadow = true;
      group.add(post);

      const lamp = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18), new THREE.MeshStandardMaterial({
        color: 0xfffa65, emissive: 0xffa502, emissiveIntensity: 0.8,
      }));
      lamp.position.set(0, 2.2, pz + (pz < 0 ? 0.35 : -0.35));
      group.add(lamp);
    }

    // Top overhead timber pergola beam
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 4.6), woodMat);
    lintel.position.set(0, 2.8, 0);
    lintel.castShadow = true;
    group.add(lintel);

    // Garden Arch Signboard
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.8, 3.4), woodMat);
    signBoard.position.set(0, 2.8, 0);
    group.add(signBoard);

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, 0, 512, 128);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#f1c40f';
    ctx.strokeRect(6, 6, 500, 116);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ORGANİK BAHÇE & ÇİFTLİK', 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const signMat = new THREE.MeshBasicMaterial({ map: texture });

    for (const side of [-1, 1]) {
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 0.75), signMat);
      plate.position.set(side * 0.085, 2.8, 0);
      plate.rotation.y = side === 1 ? Math.PI / 2 : -Math.PI / 2;
      group.add(plate);
    }

    // Decorative climbing ivy planters at base
    for (const pz of [-2.35, 2.35]) {
      const planter = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
      planter.position.set(0, 0.25, pz);
      group.add(planter);

      const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 1), new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6 }));
      bush.position.set(0, 0.7, pz);
      group.add(bush);
    }

    this.scene.add(group);
  }

  createRestaurantGardenDoorway(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const darkWood = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5 });
    for (const pz of [-2.0, 2.0]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.7, 0.5), darkWood);
      post.position.set(0, 1.35, pz);
      post.castShadow = true;
      group.add(post);
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 4.6), darkWood);
    lintel.position.set(0, 2.8, 0);
    lintel.castShadow = true;
    group.add(lintel);

    this.scene.add(group);
  }

  createRestaurantSign(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const boardGeo = new THREE.BoxGeometry(6.2, 1.1, 0.3);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.3 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.castShadow = true;
    group.add(board);

    // Gold frame
    const frameGeo = new THREE.BoxGeometry(6.4, 1.25, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8 });
    group.add(new THREE.Mesh(frameGeo, frameMat));

    // Canvas text
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 44px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GOURMET BISTRO', 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const textMat = new THREE.MeshBasicMaterial({ map: texture });
    const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 0.9), textMat);
    textPlane.position.z = 0.16;
    group.add(textPlane);

    this.scene.add(group);
  }

  addWall(x, z, width, height, depth, material) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    this.registerObstacle(x, z, width, depth);
  }

  registerObstacle(x, z, width, depth) {
    this.obstacles.push({
      min: { x: x - width / 2, z: z - depth / 2 },
      max: { x: x + width / 2, z: z + depth / 2 }
    });
  }

  getObstacles() {
    return this.obstacles;
  }

  update(delta, time) {
    if (this.props) {
      this.props.update(delta, time);
    }
  }
}

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GAME_CONFIG } from '../config/GameConfig.js';
import { SHELF_STAGING_AREA } from '../domain/layout.js';
import { EnvironmentProps } from './EnvironmentProps.js';

export class MarketGrid {
  constructor(scene) {
    this.scene = scene;
    this.obstacles = []; // array of { min: {x, z}, max: {x, z} }
    this.restaurantGates = [];
    this.restaurantUnlocked = false;
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
    this.createParkingLotAndRoadways();

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
    this.createShelfStagingArea();

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
      new THREE.PlaneGeometry(2.8, 2.2),
      new THREE.MeshStandardMaterial({ color: 0xc8dcae, roughness: 0.9 }),
    );
    waitingArea.rotation.x = -Math.PI / 2;
    waitingArea.position.set(-23.5, 0.025, -6.7);
    waitingArea.receiveShadow = true;
    this.scene.add(waitingArea);

    const waitingBorder = new THREE.MeshBasicMaterial({ color: 0xe7c465 });
    const borderSegments = [
      { geometry: new THREE.BoxGeometry(2.8, 0.035, 0.07), x: -23.5, z: -7.8 },
      { geometry: new THREE.BoxGeometry(2.8, 0.035, 0.07), x: -23.5, z: -5.6 },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, 2.2), x: -24.9, z: -6.7 },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, 2.2), x: -22.1, z: -6.7 },
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
    waitingLabel.position.set(-23.5, 0.055, -8.18);
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
    this.createInteriorLighting();

    // 8. Supermarket Entrance & Fixtures (Directly from Reference Photo!)
    // A. Automatic Sliding Glass Doors at entrance (x = 5, z = 9)
    this.props.createSlidingGlassDoors(5, 9.0, 6.2, 2.7);
    this.createSupermarketShowcaseWindows();
    this.createEntranceWelcomeMat(5, 7.6);
    this.createAisleCategorySigns();

    // B. Nested metal wire shopping carts parked outside entrance on sidewalk (x = 9.2, z = 10.2)
    this.props.createCartStack(9.2, 10.2, 4, -Math.PI / 2);

    // C. Nested shopping carts & red handheld baskets right inside entrance
    this.props.createCartStack(1.8, 7.8, 3, 0);
    this.props.createBasketStack(3.2, 7.8);

    // D. Rolling wire promo dump basket near main aisle (Image 1 reference)
    this.props.createWireDumpBasket(8.2, 7.5, -0.2);

    // E. Decorative flower display stand & planters flanking entrance
    this.props.createFlowerDisplayStand(1.0, 9.8, 0);
    this.props.createFlowerDisplayStand(11.8, 9.8, 0);

    // 9. Awning & 3D Signboards
    this.props.createStoreAwning(5, 2.3, 9.1, 10, 1.8);
    this.props.createStoreSign(5, 3.4, 9.0);

    // Restaurant Awning & Signboard
    this.props.createStoreAwning(-37, 2.3, 9.1, 12, 1.8);
    this.createRestaurantSign(-37, 3.4, 9.0);

    // 10. Procedural Vehicle Fleet in Parking Lot & Service Bays
    this.props.createDeliveryTruck(-20.5, 16.8, -Math.PI / 2); // Commercial Supermarket Box Truck
    this.props.createSedan(14.5, 16.5, -Math.PI / 2, 0xff4757); // Crimson Red Sedan
    this.props.createSedan(7.5, 16.5, -Math.PI / 2, 0xffa502);  // Taxi Gold Sedan
    this.props.createSedan(-6.5, 16.5, -Math.PI / 2, 0x1e90ff); // Electric Blue Sedan
    this.props.createSedan(-13.5, 16.5, -Math.PI / 2, 0xf1f2f6);// Pearl White Sedan
    this.props.createDeliveryVan(21.5, 16.8, -Math.PI / 2, 0xffffff); // GBLB Express Delivery Van
    this.props.createPickupTruck(-27.5, 16.8, -Math.PI / 2, 0xd63031); // Farm Harvest Pickup
    this.props.createDeliveryScooter(8.6, 10.6, 0.15, 0xe74c3c); // Courier Delivery Scooter near entrance

    // 11. Street Lamps, Outdoor Furniture & Entrance Totem
    this.props.createModernStreetLamp(14, 13.2);
    this.props.createModernStreetLamp(-3, 13.2);
    this.props.createModernStreetLamp(-20, 13.2);
    this.props.createModernStreetLamp(-38, 13.2);

    // Park benches flanking the supermarket entrance on the sidewalk
    this.props.createParkBench(-1.5, 10.5, 0);
    this.props.createParkBench(11.5, 10.5, 0);

    // Outdoor recycling trash bins
    this.props.createOutdoorTrashBin(2.6, 10.4);
    this.props.createOutdoorTrashBin(7.6, 10.4);

    // Grand Entrance Totem Pylon Sign at corner
    this.props.createEntranceTotem(18.5, 14.5);

    // South Farm Fence (Border with sidewalk)
    this.props.createWoodenFence(-15, 9.0, 22, 0);
    this.registerObstacle(-15, 9.0, 22, 0.4);

    // 12. FAZ 4: Tarım ve Çiftlik Bölgesi (Greenhouse, Red Barn, Water Tower, Tractor, Animals, Fields)
    this.createFarmAndAgriculturalZone();

    // 13. FAZ 5: Arka Alan, Depo ve Lojistik Tesisleri (Loading Dock, Forklift, Pallet Stacks, Hangar, Cold Storage)
    this.createLogisticsAndWarehouseZone();

    // 14. Lush Trees & Forest Perimeter
    this.props.createOakTree(-52, 4, 1.3);
    this.props.createOakTree(-51, -6, 1.2);
    this.props.createOakTree(-3.5, -15, 1.1);
    this.props.createOakTree(2, -14, 1.2);
    this.props.createOakTree(12, -14, 1.0);
    this.props.createPineTree(30, -5, 1.1);
    this.props.createPineTree(30, 4, 1.2);
    this.props.createPineTree(-37, -10, 1.2);
    this.props.createPineTree(-41, -16, 1.1);
    this.props.createPineTree(-31, -21, 1.3);
  }

  createShelfStagingArea() {
    const bounds = SHELF_STAGING_AREA.bounds;
    const width = bounds.maxX - bounds.minX;
    const depth = bounds.maxZ - bounds.minZ;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerZ = (bounds.minZ + bounds.maxZ) / 2;
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      new THREE.MeshStandardMaterial({ color: 0xe4eee2, roughness: 0.8 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(centerX, 0.025, centerZ);
    floor.receiveShadow = true;
    this.scene.add(floor);

    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x6f9b79 });
    const border = [
      { geometry: new THREE.BoxGeometry(width, 0.035, 0.07), x: centerX, z: bounds.minZ },
      { geometry: new THREE.BoxGeometry(width, 0.035, 0.07), x: centerX, z: bounds.maxZ },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, depth), x: bounds.minX, z: centerZ },
      { geometry: new THREE.BoxGeometry(0.07, 0.035, depth), x: bounds.maxX, z: centerZ },
    ];
    for (const segment of border) {
      const line = new THREE.Mesh(segment.geometry, borderMaterial);
      line.position.set(segment.x, 0.045, segment.z);
      this.scene.add(line);
    }

    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 96;
    const context = labelCanvas.getContext('2d');
    context.fillStyle = '#355941';
    context.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
    context.fillStyle = '#ffffff';
    context.font = 'bold 34px Fredoka, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('YENİ REYON TESLİM ALANI', 256, 48);
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(width - 0.3, 0.42),
      new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
    );
    label.rotation.x = -Math.PI / 2;
    label.position.set(centerX, 0.055, bounds.maxZ + 0.28);
    this.scene.add(label);
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

  createSupermarketShowcaseWindows() {
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.3, metalness: 0.6 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x81ecec,
      transparent: true,
      opacity: 0.32,
      roughness: 0.08,
      metalness: 0.15,
    });

    // Windows flanking the entrance along front wall (z = 9.0)
    for (const wx of [-1.5, 11.5]) {
      const windowGroup = new THREE.Group();
      windowGroup.position.set(wx, 0, 9.0);

      // Panoramic tinted glass pane
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 1.45), glassMat);
      glass.position.set(0, 1.85, 0);
      windowGroup.add(glass);

      // Top lintel beam
      const topLintel = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.18, 0.35), frameMat);
      topLintel.position.set(0, 2.65, 0);
      windowGroup.add(topLintel);

      // Vertical mullions / dividers
      for (const mx of [-1.6, 0, 1.6]) {
        const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.5, 0.2), frameMat);
        mullion.position.set(mx, 1.85, 0);
        windowGroup.add(mullion);
      }

      this.scene.add(windowGroup);
    }
  }

  createEntranceWelcomeMat(x, z) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Charcoal rubber base with embossed border
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 10;
    ctx.strokeRect(12, 12, 488, 232);

    ctx.fillStyle = '#f1f2f6';
    ctx.font = 'bold 44px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GBLB STORE', 256, 95);

    ctx.font = 'bold 22px Fredoka, sans-serif';
    ctx.fillStyle = '#ced6e0';
    ctx.fillText('HOŞ GELDİNİZ • WELCOME', 256, 165);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.6), mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.015, z);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  createAisleCategorySigns() {
    const signs = [
      { text: 'MANAV • PRODUCE', x: 3.0, z: 0.5, color: '#27ae60' },
      { text: 'İÇECEK • COLD DRINKS', x: 7.5, z: -0.5, color: '#2980b9' },
      { text: 'FIRIN • BAKERY', x: 8.6, z: -3.4, color: '#d35400' },
      { text: 'TEMEL GIDA • GROCERY', x: 11.0, z: 0.5, color: '#c0392b' },
    ];

    const cableMat = new THREE.MeshBasicMaterial({ color: 0x95a5a6 });
    for (const s of signs) {
      const group = new THREE.Group();
      group.position.set(s.x, 2.65, s.z);

      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = s.color;
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 496, 112);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.text, 256, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const signMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), signMat);
      group.add(signMesh);

      // Hanging chrome suspension cables
      for (const cx of [-0.75, 0.75]) {
        const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.7, 4), cableMat);
        cable.position.set(cx, 0.45, 0);
        group.add(cable);
      }

      this.scene.add(group);
    }
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
    this.createRestaurantGate(-37, 9, 10, 'x');

    // Left Wall (x = -48, z = -9 to 9)
    this.addWall(-48, 0, thickness, wallHeight, 18, wallMat);

    // Right Wall facing Organic Garden (x = -26) with doorway at center (z = -1.8 to 1.8)
    this.addWall(-26, -5.4, thickness, wallHeight, 7.2, wallMat);
    this.addWall(-26, 5.4, thickness, wallHeight, 7.2, wallMat);
    this.createRestaurantGardenDoorway(-26, 0);
    this.createRestaurantGate(-26, 0, 3.6, 'z');
  }

  createInteriorLighting() {
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const glowContext = glowCanvas.getContext('2d');
    const gradient = glowContext.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 245, 221, 0.48)');
    gradient.addColorStop(0.45, 'rgba(255, 231, 191, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 221, 176, 0)');
    glowContext.fillStyle = gradient;
    glowContext.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    glowTexture.colorSpace = THREE.SRGBColorSpace;

    this.interiorLights = [];
    for (const centerX of [5, -37]) {
      for (const xOffset of [-4, 4]) {
        for (const z of [-3.5, 3.5]) {
          const lightX = centerX + xOffset;
          const light = new THREE.PointLight(0xfff0d6, 0, 12, 2);
          light.position.set(lightX, 2.95, z);
          this.scene.add(light);

          const glow = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 8),
            new THREE.MeshBasicMaterial({
              map: glowTexture,
              color: 0xfff0d6,
              transparent: true,
              opacity: 0,
              depthWrite: false,
              toneMapped: false,
            }),
          );
          glow.rotation.x = -Math.PI / 2;
          glow.position.set(lightX, 0.018, z);
          this.scene.add(glow);
          this.interiorLights.push({ light, glow });
        }
      }
    }

    this.setDaylight(1);
  }

  setDaylight(daylight) {
    const nightLighting = 1 - THREE.MathUtils.smoothstep(daylight, 0.25, 0.85);
    for (const { light, glow } of this.interiorLights ?? []) {
      light.intensity = 2.6 * nightLighting;
      glow.material.opacity = 0.72 * nightLighting;
    }
  }

  createRestaurantGate(x, z, width, axis) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const doorMat = new THREE.MeshStandardMaterial({ color: 0x55372e, roughness: 0.72 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x9a7045, roughness: 0.48 });
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.72, roughness: 0.3 });
    const height = 2.35;
    const thickness = 0.18;
    const panelWidth = width / 2 - 0.03;
    const leaves = [];

    for (const side of [-1, 1]) {
      const hinge = new THREE.Group();
      if (axis === 'x') hinge.position.set(side * width / 2, 0, 0);
      else hinge.position.set(0, 0, side * width / 2);

      const panel = new THREE.Mesh(
        axis === 'x'
          ? new THREE.BoxGeometry(panelWidth, height, thickness)
          : new THREE.BoxGeometry(thickness, height, panelWidth),
        doorMat,
      );
      if (axis === 'x') panel.position.set(-side * panelWidth / 2, height / 2, 0);
      else panel.position.set(0, height / 2, -side * panelWidth / 2);
      panel.castShadow = true;
      panel.receiveShadow = true;
      hinge.add(panel);

      // Narrow rails make the closed leaves read as a pair of timber doors.
      for (const y of [0.16, height - 0.16]) {
        const rail = new THREE.Mesh(
          axis === 'x'
            ? new THREE.BoxGeometry(panelWidth, 0.11, thickness + 0.035)
            : new THREE.BoxGeometry(thickness + 0.035, 0.11, panelWidth),
          trimMat,
        );
        if (axis === 'x') rail.position.set(-side * panelWidth / 2, y, 0);
        else rail.position.set(0, y, -side * panelWidth / 2);
        rail.castShadow = true;
        hinge.add(rail);
      }

      const handle = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), handleMat);
      if (axis === 'x') handle.position.set(-side * (panelWidth - 0.22), 1.12, -0.13);
      else handle.position.set(-0.13, 1.12, -side * (panelWidth - 0.22));
      hinge.add(handle);

      group.add(hinge);
      leaves.push({
        hinge,
        openRotation: axis === 'x' ? side * Math.PI / 2 : -side * Math.PI / 2,
      });
    }

    this.scene.add(group);
    const obstacleWidth = axis === 'x' ? width : thickness + 0.24;
    const obstacleDepth = axis === 'x' ? thickness + 0.24 : width;
    this.restaurantGates.push({
      group,
      leaves,
      obstacle: {
        min: { x: x - obstacleWidth / 2, z: z - obstacleDepth / 2 },
        max: { x: x + obstacleWidth / 2, z: z + obstacleDepth / 2 },
      },
    });
    this.obstacles.push(this.restaurantGates[this.restaurantGates.length - 1].obstacle);
  }

  setRestaurantUnlocked(unlocked) {
    const isUnlocked = Boolean(unlocked);
    if (this.restaurantUnlocked === isUnlocked) return;
    this.restaurantUnlocked = isUnlocked;

    for (const gate of this.restaurantGates) {
      const obstacleIndex = this.obstacles.indexOf(gate.obstacle);
      if (isUnlocked && obstacleIndex !== -1) this.obstacles.splice(obstacleIndex, 1);
      if (!isUnlocked && obstacleIndex === -1) this.obstacles.push(gate.obstacle);
      for (const leaf of gate.leaves) {
        leaf.hinge.rotation.y = isUnlocked ? leaf.openRotation : 0;
      }
    }
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

  createParkingLotAndRoadways() {
    // 1. Asphalt Roadway & Parking Lot apron (z = 10 to 28)
    const roadGeo = new THREE.PlaneGeometry(80, 18);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x242831,
      roughness: 0.65,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(-10, -0.04, 19);
    road.receiveShadow = true;
    this.scene.add(road);

    // 2. White Stall Dividers & Tire Stop Bumpers for Parking Bays
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.6 });
    const stallXCoords = [-24, -17, -10, -3, 4, 11, 18];

    stallXCoords.forEach(x => {
      // Dividing stripe
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 6.2), stripeMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, -0.03, 16.2);
      this.scene.add(line);

      // Rubber wheel tire-stop bumper near sidewalk end
      const bumper = new THREE.Mesh(new RoundedBoxGeometry(1.8, 0.12, 0.2, 2, 0.03), bumperMat);
      bumper.position.set(x + 3.5, 0.06, 13.5);
      bumper.castShadow = true;
      this.scene.add(bumper);
    });

    // 3. Handicap Accessible Parking Bay at x = 0.5 (Blue zone + Wheelchair icon)
    const handicapCanvas = document.createElement('canvas');
    handicapCanvas.width = 256; handicapCanvas.height = 256;
    const hctx = handicapCanvas.getContext('2d');
    hctx.fillStyle = '#0984e3'; hctx.fillRect(0, 0, 256, 256);
    hctx.strokeStyle = '#ffffff'; hctx.lineWidth = 14; hctx.strokeRect(12, 12, 232, 232);
    hctx.fillStyle = '#ffffff';
    hctx.beginPath(); hctx.arc(135, 75, 24, 0, Math.PI * 2); hctx.fill();
    hctx.lineWidth = 20; hctx.strokeStyle = '#ffffff'; hctx.lineCap = 'round';
    hctx.beginPath(); hctx.moveTo(135, 100); hctx.lineTo(135, 155); hctx.lineTo(175, 155); hctx.lineTo(190, 205); hctx.stroke();
    hctx.beginPath(); hctx.arc(120, 165, 42, -0.3, Math.PI * 1.2); hctx.stroke();

    const handicapTex = new THREE.CanvasTexture(handicapCanvas);
    const handicapMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({ map: handicapTex })
    );
    handicapMesh.rotation.x = -Math.PI / 2;
    handicapMesh.position.set(0.5, -0.03, 16.5);
    this.scene.add(handicapMesh);

    // 4. Yellow Center Road Dashed Line on driving thoroughfare (z = 24.5)
    const yellowStripeMat = new THREE.MeshBasicMaterial({ color: 0xf1c40f });
    for (let x = -48; x <= 26; x += 5.5) {
      const yellowLine = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.22), yellowStripeMat);
      yellowLine.rotation.x = -Math.PI / 2;
      yellowLine.position.set(x, -0.03, 24.5);
      this.scene.add(yellowLine);
    }

    // 5. Pedestrian Zebra Crossing connecting parking to supermarket entrance doors at x = 5
    for (let x = 3.2; x <= 6.8; x += 0.72) {
      const zebra = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 2.6), stripeMat);
      zebra.rotation.x = -Math.PI / 2;
      zebra.position.set(x, -0.03, 11.5);
      this.scene.add(zebra);
    }
  }

  createSafeCanvas(width, height) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  /**
   * FAZ 4: Tarım ve Üretim Çiftliği Bölgesi (GBLB Farm & Greenhouse)
   * Builds the commercial glass greenhouse, red barn, water tower, tractor,
   * dairy cows, free-range chickens, wheat fields, vegetable beds, and pasture fences.
   */
  createFarmAndAgriculturalZone() {
    // 1. Pastoral Farm Ground Extension in North Farm Zone (z = -9 to -25, x = -38 to -4)
    const farmGroundGeo = new THREE.PlaneGeometry(36, 17);
    const farmGroundMat = new THREE.MeshStandardMaterial({
      color: 0x228b22, // Rich pastoral meadow green
      roughness: 0.82
    });
    const farmGround = new THREE.Mesh(farmGroundGeo, farmGroundMat);
    farmGround.rotation.x = -Math.PI / 2;
    farmGround.position.set(-20, -0.015, -17.5);
    farmGround.receiveShadow = true;
    this.scene.add(farmGround);

    // Farm Dirt & Cobblestone Main Courtyard Path (connects garden promenade at z = -6 to barn & greenhouse at z = -17)
    this.createPath(-18, -12, 3.2, 8.5);
    this.createPath(-20, -17, 12, 3.6);

    // 2. Modern Commercial Glass Greenhouse
    this.props.createGreenhouse(-15, -17, 0);
    this.registerObstacle(-15, -17, 5.2, 6.6);

    // 3. Classic American Red Farm Barn with Gambrel Roof & Weather Vane
    this.props.createRedBarn(-26, -17, 0.1);
    this.registerObstacle(-26, -17, 7.0, 8.0);

    // 4. Iconic Cylindrical Stilt Water Tower
    this.props.createWaterTower(-33, -14);
    this.registerObstacle(-33, -14, 3.2, 3.2);

    // 5. Classic Green Farm Tractor (Parked beside farm gateway courtyard)
    this.props.createFarmTractor(-18.5, -10.8, -0.4, 0x27ae60);
    this.registerObstacle(-18.5, -10.8, 2.0, 2.6);

    // 6. Holstein Dairy Cows in Pasture Meadow
    this.props.createDairyCow(-21.5, -8.6, 0.3, true); // Grazing head down on pasture grass
    this.props.createDairyCow(-12.8, -11.5, -0.7, false); // Standing alert near greenhouse

    // 7. Free-Range Grazing Chickens
    this.props.createGrazingChicken(-15.8, -6.8, 0.4, true); // Pecking along garden path
    this.props.createGrazingChicken(-22.2, 5.4, 0.8, true);  // Pecking near coop
    this.props.createGrazingChicken(-24.5, 2.0, -0.5, false); // Alert
    this.props.createGrazingChicken(-19.8, 6.2, 2.1, true);   // Pecking
    this.props.createGrazingChicken(-13.2, -7.5, 1.2, false); // Near garden edge

    // 8. Golden Wheat Field Patches & Organic Raised Vegetable Beds
    this.props.createWheatFieldPatch(-7.5, -15.5, 4.6, 3.4);
    this.registerObstacle(-7.5, -15.5, 4.8, 3.6);

    this.props.createVegetablePlotRaisedBeds(-7.5, -10.5, 0);
    this.registerObstacle(-7.5, -10.5, 3.2, 3.6);

    // 9. Farm Pasture Fencing & Grand Farm Gate
    // South garden fence with open central breezeway gate
    this.props.createWoodenFence(-7.5, -9.0, 7.0, 0);
    this.props.createWoodenFence(-22.5, -9.0, 7.0, 0);
    this.registerObstacle(-7.5, -9.0, 7.0, 0.4);
    this.registerObstacle(-22.5, -9.0, 7.0, 0.4);

    // North & West Pasture Boundary Fences
    this.props.createWoodenFence(-26, -24.5, 22.0, 0);
    this.props.createWoodenFence(-37, -16.5, 16.0, Math.PI / 2);
    this.registerObstacle(-26, -24.5, 22.0, 0.4);
    this.registerObstacle(-37, -16.5, 0.4, 16.0);

    // Grand Rustic Farm Gateway Arch at x = -15, z = -9
    this.createFarmGateArch(-15, -9.0);
  }

  createFarmGateArch(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const timberMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.85 });
    // Left & Right Gate Posts
    const postL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.6, 0.25), timberMat);
    postL.position.set(-2.2, 1.8, 0);
    const postR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.6, 0.25), timberMat);
    postR.position.set(2.2, 1.8, 0);

    // Overhead Header Beam
    const header = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.3, 0.28), timberMat);
    header.position.set(0, 3.4, 0);

    // Hanging Wooden Signboard
    const signCanvas = this.createSafeCanvas(512, 128);
    let signTex = null;
    if (signCanvas) {
      const ctx = signCanvas.getContext('2d');
      ctx.fillStyle = '#4e342e';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#8d6e63';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 500, 116);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GBLB ORGANİK ÇİFTLİK', 256, 44);
      ctx.font = 'bold 24px Fredoka, sans-serif';
      ctx.fillStyle = '#f1c40f';
      ctx.fillText('FRESH HARVEST • TARIM & SERA', 256, 88);
      signTex = new THREE.CanvasTexture(signCanvas);
    }
    const signMat = signTex
      ? new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
      : new THREE.MeshBasicMaterial({ color: 0x5d4037 });
    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), signMat);
    signMesh.position.set(0, 2.7, 0);

    // Decorative lanterns on posts
    for (const px of [-2.2, 2.2]) {
      const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.2), new THREE.MeshStandardMaterial({ color: 0x222222 }));
      lantern.position.set(px, 2.2, 0.22);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.14), new THREE.MeshBasicMaterial({ color: 0xfffae8 }));
      glass.position.set(px, 2.2, 0.22);
      group.add(lantern, glass);
    }

    group.add(postL, postR, header, signMesh);
    this.scene.add(group);
  }

  /**
   * FAZ 5: Arka Alan, Depo ve Lojistik Tesisleri (Logistics, Warehouse & Loading Bay)
   * Builds the industrial concrete service yard, loading dock platform with motorized roll-up shutter,
   * yellow warehouse forklift, red hydraulic pallet jack, Euro pallet stacks, warehouse hangar,
   * cold storage refrigeration bunker, and 3-stream commercial recycling dumpsters.
   */
  createLogisticsAndWarehouseZone() {
    // 1. Industrial Concrete Logistics Service Yard Floor (x = 14 to 30, z = -9 to 9)
    const yardGeo = new THREE.PlaneGeometry(16, 18);
    const yardMat = new THREE.MeshStandardMaterial({
      color: 0x636e72, // Dark industrial slab concrete
      roughness: 0.85
    });
    const yardFloor = new THREE.Mesh(yardGeo, yardMat);
    yardFloor.rotation.x = -Math.PI / 2;
    yardFloor.position.set(22, -0.015, 0);
    yardFloor.receiveShadow = true;
    this.scene.add(yardFloor);

    // Yellow Logistics Safety Boundary Line along sidewalk (z = 9.0, x = 14 to 30)
    const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xf1c40f });
    const safetyLine = new THREE.Mesh(new THREE.PlaneGeometry(16, 0.2), yellowLineMat);
    safetyLine.rotation.x = -Math.PI / 2;
    safetyLine.position.set(22, 0.005, 9.0);
    this.scene.add(safetyLine);

    // 2. Elevated Concrete Loading Dock Platform with Motorized Shutter Door
    this.props.createLoadingDock(16.5, 0, -Math.PI / 2);
    this.registerObstacle(16.5, 0, 3.8, 5.8);

    // 3. Warehouse Logistics Hangar Facade with "MAL KABUL & LOJİSTİK" Sign
    this.props.createWarehouseHangarBuilding(23.5, -6.0, 0);
    this.registerObstacle(23.5, -6.0, 8.5, 5.2);

    // 4. Commercial Walk-In Cold Storage Bunker with Condenser Fans
    this.props.createColdStorageBunker(24.0, 5.8, 0);
    this.registerObstacle(24.0, 5.8, 3.6, 3.2);

    // 5. Industrial Yellow Warehouse Forklift
    this.props.createWarehouseForklift(19.2, 2.8, 0.4);
    this.registerObstacle(19.2, 2.8, 1.4, 2.4);

    // 6. Manual Hydraulic Pallet Jack (Transpalet)
    this.props.createHydraulicPalletJack(18.6, -2.4, -0.3, 0xe74c3c);

    // 7. Euro Pallet Stacks with Shrink-Wrapped Shipping Cartons
    this.props.createPalletStack(19.5, 6.2, 4, true, 0.2);
    this.registerObstacle(19.5, 6.2, 1.4, 1.2);

    this.props.createPalletStack(17.0, 6.2, 3, false, -0.15);
    this.registerObstacle(17.0, 6.2, 1.4, 1.2);

    this.props.createPalletStack(20.5, -1.8, 3, true, 0.1);
    this.registerObstacle(20.5, -1.8, 1.4, 1.2);

    // 8. 3-Stream Commercial Industrial Recycling Dumpsters
    this.props.createRecyclingDumpsters(28.0, 0.8, -Math.PI / 2);
    this.registerObstacle(28.0, 0.8, 1.2, 5.2);
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

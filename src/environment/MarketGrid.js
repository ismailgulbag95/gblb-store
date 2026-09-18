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

    // 3. ZONE 1: Store Zone Floor (Clean Shiny Vibrant White Tile on Right x = -4 to 14)
    const storeGeo = new THREE.PlaneGeometry(18, 18);
    const storeMat = new THREE.MeshStandardMaterial({
      color: GAME_CONFIG.COLORS.FLOOR_STORE,
      roughness: 0.2,
      metalness: 0.05
    });
    const storeFloor = new THREE.Mesh(storeGeo, storeMat);
    storeFloor.rotation.x = -Math.PI / 2;
    storeFloor.position.set(5, 0, 0);
    storeFloor.receiveShadow = true;
    this.scene.add(storeFloor);

    // 4. ZONE 2: Farm & Factory Zone Floor (Rich Soil / Vibrant Pasture on Left x = -26 to -4)
    const farmGeo = new THREE.PlaneGeometry(22, 18);
    const farmMat = new THREE.MeshStandardMaterial({ color: GAME_CONFIG.COLORS.FLOOR_FARM, roughness: 0.8 });
    const farmFloor = new THREE.Mesh(farmGeo, farmMat);
    farmFloor.rotation.x = -Math.PI / 2;
    farmFloor.position.set(-15, 0, 0);
    farmFloor.receiveShadow = true;
    this.scene.add(farmFloor);

    // 5. ZONE 3: Gourmet Restaurant Zone Floor (Rich Warm Timber Wood on Far Left x = -48 to -26)
    const restGeo = new THREE.PlaneGeometry(22, 18);
    const restMat = new THREE.MeshStandardMaterial({
      color: GAME_CONFIG.COLORS.FLOOR_RESTAURANT,
      roughness: 0.3
    });
    const restFloor = new THREE.Mesh(restGeo, restMat);
    restFloor.rotation.x = -Math.PI / 2;
    restFloor.position.set(-37, 0, 0);
    restFloor.receiveShadow = true;
    this.scene.add(restFloor);

    // 6. Connecting Stone Pathways
    this.createPath(-4, 0, 2, 18);
    this.createPath(-26, 0, 2, 18);

    // 7. Store & Restaurant Walls
    this.createStoreWalls();
    this.createRestaurantWalls();

    // 8. Awning & 3D Signboards
    this.props.createStoreAwning(5, 2.3, 9.1, 10, 1.8);
    this.props.createStoreSign(5, 3.4, 9.0);

    // Restaurant Awning & Signboard
    this.props.createStoreAwning(-37, 2.3, 9.1, 12, 1.8);
    this.createRestaurantSign(-37, 3.4, 9.0);

    // 9. Low-Poly Cars in Parking Lot (Ultra vibrant candy colors)
    this.props.createCar(4, 16.5, -Math.PI / 2, 0xff4757); // Candy Red car
    this.props.createCar(11, 16.5, -Math.PI / 2, 0xffa502); // Bright Gold Taxi
    this.props.createCar(-10, 16.5, -Math.PI / 2, 0x1e90ff); // Electric Blue car
    this.props.createCar(-24, 16.5, -Math.PI / 2, 0xa55eea); // Sweet Lilac/Purple car

    // 10. Street Lamps & Fences
    this.props.createStreetLamp(14, 10.5);
    this.props.createStreetLamp(-4, 10.5);
    this.props.createStreetLamp(-26, 10.5);
    this.props.createStreetLamp(-47, 10.5);

    // Farm Fences (North and South borders)
    this.props.createWoodenFence(-15, 9.0, 22, 0);
    this.props.createWoodenFence(-15, -9.0, 22, 0);
    this.registerObstacle(-15, 9.0, 22, 0.4);
    this.registerObstacle(-15, -9.0, 22, 0.4);

    // 11. Lush Trees
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
    ctx.fillText('🍕 GOURMET BISTRO', 256, 64);

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

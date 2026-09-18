import * as THREE from 'three';
import { GAME_CONFIG } from '../config/GameConfig.js';

export class CashRegister {
  constructor(scene, x, z, environment = null) {
    this.scene = scene;
    this.position = new THREE.Vector3(x, 0, z);

    this.cashierZonePos = new THREE.Vector3(x, 0, z - 1.1); // behind counter
    this.serviceQueueStartPos = new THREE.Vector3(x, 0, z + 1.2); // customer front spot

    this.interactionRadius = 1.8;
    this.isCashierPresent = false;
    this.hasHiredCashier = false;
    this.uncollectedMoney = 0;

    this.coins = [];
    this.meshGroup = new THREE.Group();
    this.meshGroup.position.copy(this.position);
    this.scene.add(this.meshGroup);

    // Register Solid Obstacle for counter table
    if (environment) {
      environment.registerObstacle(x, z, 2.4, 1.1);
    }

    this.buildRegisterMesh();
  }

  buildRegisterMesh() {
    // 1. Counter Table Base
    const tableGeo = new THREE.BoxGeometry(2.4, 0.88, 1.1);
    const tableMat = new THREE.MeshStandardMaterial({ color: GAME_CONFIG.COLORS.REGISTER, roughness: 0.6 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = 0.44;
    table.castShadow = true;
    table.receiveShadow = true;
    this.meshGroup.add(table);

    // 1b. Distinct Dark Anthracite Checkout Top Surface (Contrasts with floor)
    const topGeo = new THREE.BoxGeometry(2.32, 0.06, 1.02);
    const topMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5, metalness: 0.2 });
    const topSurface = new THREE.Mesh(topGeo, topMat);
    topSurface.position.y = 0.91;
    topSurface.receiveShadow = true;
    this.meshGroup.add(topSurface);

    // 1c. Checkout Belt / Service Pad on left side
    const beltGeo = new THREE.BoxGeometry(1.2, 0.02, 0.75);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x1a252f, roughness: 0.9 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.set(-0.45, 0.945, 0);
    this.meshGroup.add(belt);

    // 2. POS Terminal & Monitor
    const posGeo = new THREE.BoxGeometry(0.5, 0.35, 0.4);
    const posMat = new THREE.MeshStandardMaterial({ color: 0x1e272e });
    const pos = new THREE.Mesh(posGeo, posMat);
    pos.position.set(0.4, 1.08, 0);
    this.meshGroup.add(pos);

    // 3. Screen display glowing green
    const screenGeo = new THREE.PlaneGeometry(0.35, 0.25);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x2ecc71 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.rotation.x = -Math.PI / 6;
    screen.position.set(0.4, 1.23, -0.15);
    this.meshGroup.add(screen);

    // 4. Cashier Mat on floor
    const matGeo = new THREE.PlaneGeometry(1.6, 1.0);
    const matMat = new THREE.MeshBasicMaterial({ color: 0x34495e });
    const floorMat = new THREE.Mesh(matGeo, matMat);
    floorMat.rotation.x = -Math.PI / 2;
    floorMat.position.set(0, 0.02, -1.1);
    this.meshGroup.add(floorMat);
  }

  getQueuePosition(queueIndex) {
    return new THREE.Vector3(
      this.position.x,
      0,
      this.position.z + 1.2 + queueIndex * 1.2
    );
  }

  spawnCoinBurst(amount, onCustomerPaidCallback, soldItems = []) {
    if (onCustomerPaidCallback && amount > 0) {
      onCustomerPaidCallback(amount, soldItems);
    }

    const coinCount = Math.min(Math.max(Math.floor(amount / 3), 3), 6);
    for (let i = 0; i < coinCount; i++) {
      const geo = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf1c40f,
        metalness: 0.8,
        roughness: 0.2
      });
      const coin = new THREE.Mesh(geo, mat);

      coin.position.set(
        this.position.x + (Math.random() - 0.5) * 0.8,
        1.1,
        this.position.z + (Math.random() - 0.5) * 0.4
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4.0,
        3.5 + Math.random() * 2.0,
        (Math.random() - 0.5) * 4.0
      );

      this.scene.add(coin);
      this.coins.push({
        mesh: coin,
        velocity: velocity,
        isMagnet: false
      });
    }
  }

  update(delta, player) {
    if (this.hasHiredCashier) {
      this.isCashierPresent = true;
    } else if (player) {
      const dist = this.cashierZonePos.distanceTo(player.mesh.position);
      this.isCashierPresent = dist <= this.interactionRadius;
    } else {
      this.isCashierPresent = false;
    }

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i];

      if (!c.isMagnet) {
        c.velocity.y -= delta * 18.0;
        c.mesh.position.addScaledVector(c.velocity, delta);
        c.mesh.rotation.y += delta * 10.0;

        if (c.mesh.position.y <= 0.1) {
          c.mesh.position.y = 0.1;
          c.velocity.y *= -0.4;
          c.velocity.x *= 0.6;
          c.velocity.z *= 0.6;
        }

        if (player) {
          const distToPlayer = c.mesh.position.distanceTo(player.mesh.position);
          if (distToPlayer < (this.hasHiredCashier ? 10.0 : 4.0)) {
            c.isMagnet = true;
          }
        }
      } else if (player) {
        c.mesh.position.lerp(player.mesh.position, delta * 16.0);
        c.mesh.position.y += 0.8 * delta;

        if (c.mesh.position.distanceTo(player.mesh.position) < 0.6) {
          this.scene.remove(c.mesh);
          this.coins.splice(i, 1);
        }
      }
    }
  }
}

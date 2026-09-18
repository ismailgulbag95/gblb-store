import * as THREE from 'three';
import { GAME_CONFIG } from '../config/GameConfig.js';
import { CarryStack } from '../items/CarryStack.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.speed = GAME_CONFIG.PLAYER.speed;
    this.radius = 0.48; // collision radius
    this.walkCycle = 0;

    this.mesh = this.createCharacterMesh();
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);

    this.stack = new CarryStack(this.mesh, GAME_CONFIG.PLAYER.baseStackCapacity);
  }

  createCharacterMesh() {
    const group = new THREE.Group();

    // Body (Apron/Shirt)
    const bodyGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.7, 10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.65;
    body.castShadow = true;
    group.add(body);

    // Green Shop Apron front
    const apronGeo = new THREE.BoxGeometry(0.35, 0.45, 0.1);
    const apronMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    const apron = new THREE.Mesh(apronGeo, apronMat);
    apron.position.set(0, 0.6, 0.22);
    group.add(apron);

    // Head
    const headGeo = new THREE.SphereGeometry(0.3, 12, 10);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.25;
    head.castShadow = true;
    group.add(head);

    // Cap / Hat (Shopkeeper red cap)
    const capGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 10);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.45;
    cap.castShadow = true;

    // Cap Visor
    const visorGeo = new THREE.BoxGeometry(0.28, 0.04, 0.2);
    const visor = new THREE.Mesh(visorGeo, capMat);
    visor.position.set(0, 1.42, 0.22);
    group.add(cap, visor);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
    leftEye.position.set(-0.1, 1.28, 0.26);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.1;
    group.add(leftEye, rightEye);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.35, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    
    this.leftLeg = new THREE.Mesh(legGeo, legMat);
    this.leftLeg.position.set(-0.16, 0.18, 0);
    this.leftLeg.castShadow = true;

    this.rightLeg = new THREE.Mesh(legGeo, legMat);
    this.rightLeg.position.set(0.16, 0.18, 0);
    this.rightLeg.castShadow = true;

    group.add(this.leftLeg, this.rightLeg);
    this.body = body;
    this.head = head;

    return group;
  }

  update(delta, inputVector, obstacles = []) {
    const isMoving = inputVector.lengthSq() > 0.01;

    if (isMoving) {
      // Rotate player smoothly towards movement direction
      const targetAngle = Math.atan2(inputVector.x, inputVector.z);
      this.mesh.rotation.y = THREE.MathUtils.lerp(
        this.mesh.rotation.y,
        targetAngle,
        delta * GAME_CONFIG.PLAYER.turnSpeed
      );

      // Total movement distance this frame
      const totalMoveDist = this.speed * delta;
      
      // Prevent tunneling by sub-stepping fast movements
      const maxSubStep = this.radius * 0.4;
      const numSteps = Math.max(1, Math.ceil(totalMoveDist / maxSubStep));
      const stepDist = totalMoveDist / numSteps;
      const stepDirX = inputVector.x * stepDist;
      const stepDirZ = inputVector.z * stepDist;

      let currentX = this.mesh.position.x;
      let currentZ = this.mesh.position.z;

      for (let s = 0; s < numSteps; s++) {
        currentX += stepDirX;
        currentZ += stepDirZ;

        // Iterative relaxation solver for solid obstacles
        const resolved = this.resolveObstacleCollisions(currentX, currentZ, obstacles);
        currentX = resolved.x;
        currentZ = resolved.z;
      }

      // Map Boundary Constraints
      const minX = -47.2, maxX = 13.6;
      const minZ = -8.5, maxZ = 8.5;
      currentX = Math.max(minX, Math.min(maxX, currentX));
      currentZ = Math.max(minZ, Math.min(maxZ, currentZ));

      // Apply new position
      this.mesh.position.x = currentX;
      this.mesh.position.z = currentZ;

      // Walk cycle animation
      this.walkCycle += delta * 14.0;
      this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.6;
      this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.6;
      this.mesh.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.06;
    } else {
      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, delta * 10);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, delta * 10);
      this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, 0, delta * 10);
    }

    this.stack.update(delta, isMoving);
  }

  /**
   * Circle vs AABB Separation Solver with multiple relaxation passes
   */
  resolveObstacleCollisions(posX, posZ, obstacles, iterations = 3) {
    const r = this.radius;

    for (let iter = 0; iter < iterations; iter++) {
      for (const obs of obstacles) {
        const minX = obs.min.x;
        const maxX = obs.max.x;
        const minZ = obs.min.z !== undefined ? obs.min.z : obs.min.y;
        const maxZ = obs.max.z !== undefined ? obs.max.z : obs.max.y;

        // Find closest point on AABB box to circle center
        const closestX = Math.max(minX, Math.min(maxX, posX));
        const closestZ = Math.max(minZ, Math.min(maxZ, posZ));

        const dx = posX - closestX;
        const dz = posZ - closestZ;
        const distSq = dx * dx + dz * dz;

        // Check if circle touches or is inside the box
        if (distSq < r * r) {
          if (distSq > 0.00001) {
            // Case A: Circle center is outside the box -> Push outward along normal
            const dist = Math.sqrt(distSq);
            const overlap = r - dist;
            const nx = dx / dist;
            const nz = dz / dist;
            posX += nx * overlap;
            posZ += nz * overlap;
          } else {
            // Case B: Circle center is INSIDE the box -> Push out through closest edge
            const dLeft = Math.abs(posX - minX);
            const dRight = Math.abs(maxX - posX);
            const dTop = Math.abs(posZ - minZ);
            const dBottom = Math.abs(maxZ - posZ);

            const minDist = Math.min(dLeft, dRight, dTop, dBottom);
            if (minDist === dLeft) {
              posX = minX - r;
            } else if (minDist === dRight) {
              posX = maxX + r;
            } else if (minDist === dTop) {
              posZ = minZ - r;
            } else {
              posZ = maxZ + r;
            }
          }
        }
      }
    }

    return { x: posX, z: posZ };
  }
}

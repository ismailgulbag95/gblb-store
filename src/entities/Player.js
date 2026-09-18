import * as THREE from 'three';
import { GAME_CONFIG } from '../config/GameConfig.js';
import { CarryStack } from '../items/CarryStack.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.speed = GAME_CONFIG.PLAYER.speed;
    this.radius = 0.48; // collision radius
    this.walkCycle = 0;
    this.characterType = localStorage.getItem('player_character') || 'shopkeeper';

    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    this.mesh = this.rootGroup; // compatibility alias
    this.characterMesh = null;
    this.buildCurrentCharacter();

    this.stack = new CarryStack(this.rootGroup, GAME_CONFIG.PLAYER.baseStackCapacity);
  }

  setCharacterType(type) {
    if (this.characterType === type) return;
    this.characterType = type;
    localStorage.setItem('player_character', type);
    this.buildCurrentCharacter();
  }

  buildCurrentCharacter() {
    if (this.characterMesh) {
      this.rootGroup.remove(this.characterMesh);
    }

    if (this.characterType === 'cat') {
      this.characterMesh = this.createCatMesh();
    } else {
      this.characterMesh = this.createShopkeeperMesh();
    }

    this.rootGroup.add(this.characterMesh);
  }

  createShopkeeperMesh() {
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

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.45, 8);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x3498db });

    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.35, 0.85, 0);
    const lArmMesh = new THREE.Mesh(armGeo, armMat);
    lArmMesh.position.y = -0.2;
    this.leftArm.add(lArmMesh);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.35, 0.85, 0);
    const rArmMesh = new THREE.Mesh(armGeo, armMat);
    rArmMesh.position.y = -0.2;
    this.rightArm.add(rArmMesh);

    group.add(this.leftArm, this.rightArm);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.35, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.16, 0.35, 0);
    const lLegMesh = new THREE.Mesh(legGeo, legMat);
    lLegMesh.position.y = -0.17;
    lLegMesh.castShadow = true;
    this.leftLeg.add(lLegMesh);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.16, 0.35, 0);
    const rLegMesh = new THREE.Mesh(legGeo, legMat);
    rLegMesh.position.y = -0.17;
    rLegMesh.castShadow = true;
    this.rightLeg.add(rLegMesh);

    group.add(this.leftLeg, this.rightLeg);

    this.tailGroup = null;
    this.body = body;
    this.head = head;

    return group;
  }

  /**
   * Builds the 3D Anthropomorphic Ginger Tabby Cat Adventurer
   * Based on cat_character design:
   * Orange Fur, White Chest/Muzzle/Paws, Emerald Eyes, Blue Adventurer Vest,
   * Leather Belt & Pouch, Brown Travel Boots, and Wagging Curved Tail.
   */
  createCatMesh() {
    const group = new THREE.Group();

    // Palette Materials
    const furOrangeMat = new THREE.MeshStandardMaterial({ color: 0xea8c47, roughness: 0.6 });
    const furWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f5fa, roughness: 0.5 });
    const vestBlueMat = new THREE.MeshStandardMaterial({ color: 0x1f5999, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf2bf33, metalness: 0.7, roughness: 0.3 });
    const beltBrownMat = new THREE.MeshStandardMaterial({ color: 0x592e14, roughness: 0.7 });
    const pouchMat = new THREE.MeshStandardMaterial({ color: 0x804724, roughness: 0.8 });
    const pantsNavyMat = new THREE.MeshStandardMaterial({ color: 0x29334d, roughness: 0.6 });
    const bootBrownMat = new THREE.MeshStandardMaterial({ color: 0x613314, roughness: 0.7 });
    const scarfRedMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.5 });
    const nosePinkMat = new THREE.MeshStandardMaterial({ color: 0xeb617a, roughness: 0.4 });
    const earPinkMat = new THREE.MeshStandardMaterial({ color: 0xffaeb8, roughness: 0.6 });
    const eyeGreenMat = new THREE.MeshStandardMaterial({ color: 0x1ec79e, roughness: 0.1 });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x1e1e24 });
    const eyeGlintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const whiskerMat = new THREE.MeshBasicMaterial({ color: 0x2d3436 });

    // 1. Lower Torso & Belt
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.28), pantsNavyMat);
    pelvis.position.y = 0.48;
    group.add(pelvis);

    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), beltBrownMat);
    belt.position.y = 0.58;
    group.add(belt);

    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.04), goldMat);
    buckle.position.set(0, 0.58, 0.22);
    group.add(buckle);

    // Side Potion Pouch
    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.12), pouchMat);
    pouch.position.set(0.24, 0.56, -0.02);
    group.add(pouch);

    // 2. Upper Torso & Adventurer Vest
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.42, 10), furWhiteMat);
    chest.position.y = 0.8;
    chest.castShadow = true;
    group.add(chest);

    // Blue Jacket Vest Sides
    const vestL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.32), vestBlueMat);
    vestL.position.set(-0.14, 0.8, 0.02);
    const vestR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.32), vestBlueMat);
    vestR.position.set(0.14, 0.8, 0.02);
    group.add(vestL, vestR);

    // Gold Vest Buttons
    [-0.08, 0.0, 0.08].forEach(yOff => {
      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), goldMat);
      b1.position.set(-0.06, 0.8 + yOff, 0.16);
      const b2 = b1.clone();
      b2.position.x = 0.06;
      group.add(b1, b2);
    });

    // Red Neckerchief / Scarf
    const scarf = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.08, 10), scarfRedMat);
    scarf.position.y = 1.02;
    group.add(scarf);

    // 3. Stylized Cat Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.26, 0);

    const headBall = new THREE.Mesh(new THREE.SphereGeometry(0.29, 14, 12), furOrangeMat);
    headBall.castShadow = true;
    headGroup.add(headBall);

    // Fluffy Cheeks
    const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), furOrangeMat);
    cheekL.position.set(-0.24, -0.05, 0.05);
    const cheekR = cheekL.clone();
    cheekR.position.x = 0.24;
    headGroup.add(cheekL, cheekR);

    // White Muzzle Puff (Ağız)
    const muzL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), furWhiteMat);
    muzL.position.set(-0.06, -0.1, 0.22);
    const muzR = muzL.clone();
    muzR.position.x = 0.06;
    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), furWhiteMat);
    chin.position.set(0, -0.16, 0.2);
    headGroup.add(muzL, muzR, chin);

    // Cute Pink Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), nosePinkMat);
    nose.position.set(0, -0.06, 0.27);
    headGroup.add(nose);

    // Pointed Ears
    const earGeo = new THREE.ConeGeometry(0.12, 0.22, 4);
    const earInnerGeo = new THREE.ConeGeometry(0.08, 0.16, 4);

    const earL = new THREE.Mesh(earGeo, furOrangeMat);
    earL.position.set(-0.16, 0.26, 0.02);
    earL.rotation.set(0.1, -0.2, 0.3);

    const earInL = new THREE.Mesh(earInnerGeo, earPinkMat);
    earInL.position.set(-0.15, 0.25, 0.04);
    earInL.rotation.set(0.1, -0.2, 0.3);

    const earR = new THREE.Mesh(earGeo, furOrangeMat);
    earR.position.set(0.16, 0.26, 0.02);
    earR.rotation.set(0.1, 0.2, -0.3);

    const earInR = new THREE.Mesh(earInnerGeo, earPinkMat);
    earInR.position.set(0.15, 0.25, 0.04);
    earInR.rotation.set(0.1, 0.2, -0.3);

    headGroup.add(earL, earInL, earR, earInR);

    // Big Emerald Eyes
    [-0.12, 0.12].forEach(xPos => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), eyeGreenMat);
      eye.position.set(xPos, 0.02, 0.24);

      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.08, 0.02), eyePupilMat);
      pupil.position.set(xPos, 0.02, 0.3);

      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), eyeGlintMat);
      glint.position.set(xPos + 0.02, 0.04, 0.31);

      headGroup.add(eye, pupil, glint);
    });

    // Whiskers (Bıyıklar)
    const whiskerGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.18, 4);
    [-1, 1].forEach(side => {
      const w1 = new THREE.Mesh(whiskerGeo, whiskerMat);
      w1.rotation.z = Math.PI / 2 + side * 0.15;
      w1.position.set(side * 0.22, -0.08, 0.22);

      const w2 = new THREE.Mesh(whiskerGeo, whiskerMat);
      w2.rotation.z = Math.PI / 2 - side * 0.15;
      w2.position.set(side * 0.22, -0.12, 0.22);

      headGroup.add(w1, w2);
    });

    group.add(headGroup);

    // 4. Cat Arms & White Paws
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.28, 8);
    const pawGeo = new THREE.SphereGeometry(0.09, 8, 8);

    // Left Arm
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 0.9, 0);
    const lSleeve = new THREE.Mesh(armGeo, vestBlueMat);
    lSleeve.position.y = -0.12;
    const lPaw = new THREE.Mesh(pawGeo, furWhiteMat);
    lPaw.position.y = -0.28;
    this.leftArm.add(lSleeve, lPaw);

    // Right Arm
    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 0.9, 0);
    const rSleeve = new THREE.Mesh(armGeo, vestBlueMat);
    rSleeve.position.y = -0.12;
    const rPaw = new THREE.Mesh(pawGeo, furWhiteMat);
    rPaw.position.y = -0.28;
    this.rightArm.add(rSleeve, rPaw);

    group.add(this.leftArm, this.rightArm);

    // 5. Boots & Legs
    const pantGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.2, 8);
    const bootGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.18, 8);
    const footGeo = new THREE.BoxGeometry(0.16, 0.1, 0.24);

    // Left Leg Group
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.16, 0.38, 0);
    const lPant = new THREE.Mesh(pantGeo, pantsNavyMat);
    lPant.position.y = -0.08;
    const lBoot = new THREE.Mesh(bootGeo, bootBrownMat);
    lBoot.position.y = -0.2;
    const lFoot = new THREE.Mesh(footGeo, bootBrownMat);
    lFoot.position.set(0, -0.28, 0.04);
    lFoot.castShadow = true;
    this.leftLeg.add(lPant, lBoot, lFoot);

    // Right Leg Group
    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.16, 0.38, 0);
    const rPant = new THREE.Mesh(pantGeo, pantsNavyMat);
    rPant.position.y = -0.08;
    const rBoot = new THREE.Mesh(bootGeo, bootBrownMat);
    rBoot.position.y = -0.2;
    const rFoot = new THREE.Mesh(footGeo, bootBrownMat);
    rFoot.position.set(0, -0.28, 0.04);
    rFoot.castShadow = true;
    this.rightLeg.add(rPant, rBoot, rFoot);

    group.add(this.leftLeg, this.rightLeg);

    // 6. Dynamic Wagging Cat Tail
    this.tailGroup = new THREE.Group();
    this.tailGroup.position.set(0, 0.5, -0.16);

    const tailSeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.22, 8), furOrangeMat);
    tailSeg1.position.set(0, 0.1, -0.08);
    tailSeg1.rotation.x = -0.6;

    const tailSeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.24, 8), furOrangeMat);
    tailSeg2.position.set(0, 0.24, -0.18);
    tailSeg2.rotation.x = -1.1;

    const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), furWhiteMat);
    tailTip.position.set(0, 0.36, -0.24);

    this.tailGroup.add(tailSeg1, tailSeg2, tailTip);
    group.add(this.tailGroup);

    this.body = chest;
    this.head = headGroup;

    return group;
  }

  update(delta, inputVector, obstacles = []) {
    const isMoving = inputVector.lengthSq() > 0.01;

    if (isMoving) {
      // Rotate player smoothly towards movement direction
      const targetAngle = Math.atan2(inputVector.x, inputVector.z);
      this.rootGroup.rotation.y = THREE.MathUtils.lerp(
        this.rootGroup.rotation.y,
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

      let currentX = this.rootGroup.position.x;
      let currentZ = this.rootGroup.position.z;

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
      this.rootGroup.position.x = currentX;
      this.rootGroup.position.z = currentZ;

      // Walk cycle animation
      this.walkCycle += delta * 14.0;
      
      // Leg strides
      if (this.leftLeg) this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.65;
      if (this.rightLeg) this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.65;

      // Arm swings (opposite to legs)
      if (this.leftArm) this.leftArm.rotation.x = -Math.sin(this.walkCycle) * 0.5;
      if (this.rightArm) this.rightArm.rotation.x = Math.sin(this.walkCycle) * 0.5;

      // Cat Tail Wagging
      if (this.tailGroup) {
        this.tailGroup.rotation.y = Math.sin(this.walkCycle * 1.2) * 0.35;
        this.tailGroup.rotation.z = Math.cos(this.walkCycle * 0.8) * 0.2;
        this.tailGroup.rotation.x = -0.2 + Math.abs(Math.sin(this.walkCycle)) * 0.15;
      }

      // Body bounce
      this.rootGroup.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.06;
    } else {
      if (this.leftLeg) this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, delta * 10);
      if (this.rightLeg) this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, delta * 10);
      if (this.leftArm) this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, 0, delta * 10);
      if (this.rightArm) this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, 0, delta * 10);
      
      // Idle tail swaying for cat
      if (this.tailGroup) {
        this.walkCycle += delta * 3.0;
        this.tailGroup.rotation.y = Math.sin(this.walkCycle) * 0.2;
        this.tailGroup.rotation.z = Math.cos(this.walkCycle * 0.5) * 0.1;
      }

      this.rootGroup.position.y = THREE.MathUtils.lerp(this.rootGroup.position.y, 0, delta * 10);
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

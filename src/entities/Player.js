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

  get position() {
    return this.rootGroup.position;
  }

  getPosition() {
    return this.rootGroup.position;
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

    // Reset animation part references
    this.leftLeg = null;
    this.rightLeg = null;
    this.leftArm = null;
    this.rightArm = null;
    this.tailGroup = null;
    this.earsGroup = null;
    this.antennaGroup = null;
    this.wingsGroup = null;

    if (this.characterType === 'cat') {
      this.characterMesh = this.createCatMesh();
    } else if (this.characterType === 'robot') {
      this.characterMesh = this.createRobotMesh();
    } else if (this.characterType === 'panda') {
      this.characterMesh = this.createPandaMesh();
    } else if (this.characterType === 'penguin') {
      this.characterMesh = this.createPenguinMesh();
    } else {
      this.characterMesh = this.createShopkeeperMesh();
    }

    this.rootGroup.add(this.characterMesh);
  }

  // 1. SHOPKEEPER (Classic)
  createShopkeeperMesh() {
    const group = new THREE.Group();

    const bodyGeo = new THREE.CylinderGeometry(0.32, 0.28, 0.7, 10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.65;
    body.castShadow = true;
    group.add(body);

    const apronGeo = new THREE.BoxGeometry(0.35, 0.45, 0.1);
    const apronMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    const apron = new THREE.Mesh(apronGeo, apronMat);
    apron.position.set(0, 0.6, 0.22);
    group.add(apron);

    const headGeo = new THREE.SphereGeometry(0.3, 12, 10);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.25;
    head.castShadow = true;
    group.add(head);

    const capGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 10);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.45;
    cap.castShadow = true;

    const visorGeo = new THREE.BoxGeometry(0.28, 0.04, 0.2);
    const visor = new THREE.Mesh(visorGeo, capMat);
    visor.position.set(0, 1.42, 0.22);
    group.add(cap, visor);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x2c3e50 });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), eyeMat);
    leftEye.position.set(-0.1, 1.28, 0.26);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.1;
    group.add(leftEye, rightEye);

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

    return group;
  }

  // 2. CAT ADVENTURER
  createCatMesh() {
    const group = new THREE.Group();

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

    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.28), pantsNavyMat);
    pelvis.position.y = 0.48;
    group.add(pelvis);

    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), beltBrownMat);
    belt.position.y = 0.58;
    group.add(belt);

    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.04), goldMat);
    buckle.position.set(0, 0.58, 0.22);
    group.add(buckle);

    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.12), pouchMat);
    pouch.position.set(0.24, 0.56, -0.02);
    group.add(pouch);

    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.42, 10), furWhiteMat);
    chest.position.y = 0.8;
    chest.castShadow = true;
    group.add(chest);

    const vestL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.32), vestBlueMat);
    vestL.position.set(-0.14, 0.8, 0.02);
    const vestR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.44, 0.32), vestBlueMat);
    vestR.position.set(0.14, 0.8, 0.02);
    group.add(vestL, vestR);

    [-0.08, 0.0, 0.08].forEach(yOff => {
      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), goldMat);
      b1.position.set(-0.06, 0.8 + yOff, 0.16);
      const b2 = b1.clone();
      b2.position.x = 0.06;
      group.add(b1, b2);
    });

    const scarf = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.08, 10), scarfRedMat);
    scarf.position.y = 1.02;
    group.add(scarf);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.26, 0);

    const headBall = new THREE.Mesh(new THREE.SphereGeometry(0.29, 14, 12), furOrangeMat);
    headBall.castShadow = true;
    headGroup.add(headBall);

    const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), furOrangeMat);
    cheekL.position.set(-0.24, -0.05, 0.05);
    const cheekR = cheekL.clone();
    cheekR.position.x = 0.24;
    headGroup.add(cheekL, cheekR);

    const muzL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), furWhiteMat);
    muzL.position.set(-0.06, -0.1, 0.22);
    const muzR = muzL.clone();
    muzR.position.x = 0.06;
    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), furWhiteMat);
    chin.position.set(0, -0.16, 0.2);
    headGroup.add(muzL, muzR, chin);

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), nosePinkMat);
    nose.position.set(0, -0.06, 0.27);
    headGroup.add(nose);

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

    [-0.12, 0.12].forEach(xPos => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), eyeGreenMat);
      eye.position.set(xPos, 0.02, 0.24);

      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.08, 0.02), eyePupilMat);
      pupil.position.set(xPos, 0.02, 0.3);

      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), eyeGlintMat);
      glint.position.set(xPos + 0.02, 0.04, 0.31);

      headGroup.add(eye, pupil, glint);
    });

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

    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.28, 8);
    const pawGeo = new THREE.SphereGeometry(0.09, 8, 8);

    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 0.9, 0);
    const lSleeve = new THREE.Mesh(armGeo, vestBlueMat);
    lSleeve.position.y = -0.12;
    const lPaw = new THREE.Mesh(pawGeo, furWhiteMat);
    lPaw.position.y = -0.28;
    this.leftArm.add(lSleeve, lPaw);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 0.9, 0);
    const rSleeve = new THREE.Mesh(armGeo, vestBlueMat);
    rSleeve.position.y = -0.12;
    const rPaw = new THREE.Mesh(pawGeo, furWhiteMat);
    rPaw.position.y = -0.28;
    this.rightArm.add(rSleeve, rPaw);
    group.add(this.leftArm, this.rightArm);

    const pantGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.2, 8);
    const bootGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.18, 8);
    const footGeo = new THREE.BoxGeometry(0.16, 0.1, 0.24);

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

    return group;
  }

  // 3. CYBER LOGISTICS ROBOT
  createRobotMesh() {
    const group = new THREE.Group();

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xebf0f5, metalness: 0.3, roughness: 0.3 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2e3342, metalness: 0.6, roughness: 0.4 });
    const neonBlueMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const neonAmberMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf2bf33, metalness: 0.8 });

    // Pelvis
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.28), darkMat);
    pelvis.position.y = 0.48;
    group.add(pelvis);

    // Torso & Arc Core
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.34), whiteMat);
    torso.position.y = 0.78;
    torso.castShadow = true;
    group.add(torso);

    const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.3, 0.06), darkMat);
    chestPlate.position.set(0, 0.78, 0.18);
    group.add(chestPlate);

    const arcCore = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12), neonBlueMat);
    arcCore.rotation.x = Math.PI / 2;
    arcCore.position.set(0, 0.78, 0.21);
    group.add(arcCore);

    // Head & Digital Screen Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);

    const headBlock = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.36, 0.34), whiteMat);
    headBlock.castShadow = true;
    headGroup.add(headBlock);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.04), darkMat);
    visor.position.set(0, 0, 0.18);
    headGroup.add(visor);

    // Digital Pixel Eyes
    [-0.09, 0.09].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), neonBlueMat);
      eye.position.set(ex, 0, 0.2);
      headGroup.add(eye);
    });

    // Antenna
    this.antennaGroup = new THREE.Group();
    this.antennaGroup.position.set(0.18, 0.18, 0);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6), goldMat);
    rod.position.y = 0.11;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), neonAmberMat);
    tip.position.y = 0.22;
    this.antennaGroup.add(rod, tip);
    headGroup.add(this.antennaGroup);

    group.add(headGroup);

    // Mechanical Arms
    const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.26, 8);
    const clawGeo = new THREE.BoxGeometry(0.08, 0.1, 0.09);

    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 0.9, 0);
    const lShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), darkMat);
    const lArm = new THREE.Mesh(armGeo, whiteMat);
    lArm.position.y = -0.12;
    const lClaw = new THREE.Mesh(clawGeo, darkMat);
    lClaw.position.y = -0.26;
    this.leftArm.add(lShoulder, lArm, lClaw);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 0.9, 0);
    const rShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), darkMat);
    const rArm = new THREE.Mesh(armGeo, whiteMat);
    rArm.position.y = -0.12;
    const rClaw = new THREE.Mesh(clawGeo, darkMat);
    rClaw.position.y = -0.26;
    this.rightArm.add(rShoulder, rArm, rClaw);
    group.add(this.leftArm, this.rightArm);

    // Mechanical Legs & Thruster Feet
    const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.22, 8);
    const footGeo = new THREE.BoxGeometry(0.16, 0.08, 0.24);

    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.16, 0.38, 0);
    const lLeg = new THREE.Mesh(legGeo, whiteMat);
    lLeg.position.y = -0.1;
    const lFoot = new THREE.Mesh(footGeo, darkMat);
    lFoot.position.set(0, -0.22, 0.02);
    lFoot.castShadow = true;
    const lGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 8), neonBlueMat);
    lGlow.position.set(0, -0.26, 0.02);
    this.leftLeg.add(lLeg, lFoot, lGlow);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.16, 0.38, 0);
    const rLeg = new THREE.Mesh(legGeo, whiteMat);
    rLeg.position.y = -0.1;
    const rFoot = new THREE.Mesh(footGeo, darkMat);
    rFoot.position.set(0, -0.22, 0.02);
    rFoot.castShadow = true;
    const rGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 8), neonBlueMat);
    rGlow.position.set(0, -0.26, 0.02);
    this.rightLeg.add(rLeg, rFoot, rGlow);
    group.add(this.leftLeg, this.rightLeg);

    return group;
  }

  // 4. CHEF PANDA
  createPandaMesh() {
    const group = new THREE.Group();

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.7 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.8 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5 });
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.6 });

    // Plump Body & Red Baker Apron
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 12), whiteMat);
    body.position.y = 0.65;
    body.castShadow = true;
    group.add(body);

    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.35, 0.1), redMat);
    apron.position.set(0, 0.6, 0.26);
    group.add(apron);

    // Panda Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.2, 0);

    const headBall = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 12), whiteMat);
    headBall.castShadow = true;
    headGroup.add(headBall);

    // Black Ears
    [-0.22, 0.22].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), blackMat);
      ear.position.set(ex, 0.24, 0);
      headGroup.add(ear);
    });

    // Eye Patches & Eyes
    [-0.11, 0.11].forEach(px => {
      const patch = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), blackMat);
      patch.position.set(px, 0.02, 0.22);

      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      eye.position.set(px, 0.02, 0.28);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      pupil.position.set(px, 0.02, 0.3);

      headGroup.add(patch, eye, pupil);
    });

    // Muzzle & Black Nose
    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), whiteMat);
    muzzle.position.set(0, -0.08, 0.24);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), noseMat);
    nose.position.set(0, -0.05, 0.32);
    headGroup.add(muzzle, nose);

    // Baker Hat / Chef Bandana
    const hatRim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), redMat);
    hatRim.position.y = 0.26;
    const hatPuff = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), whiteMat);
    hatPuff.position.y = 0.38;
    headGroup.add(hatRim, hatPuff);

    group.add(headGroup);

    // Black Arms & Paws
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.28, 8);
    const pawGeo = new THREE.SphereGeometry(0.09, 8, 8);

    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.34, 0.85, 0);
    const lArm = new THREE.Mesh(armGeo, blackMat);
    lArm.position.y = -0.12;
    const lPaw = new THREE.Mesh(pawGeo, whiteMat);
    lPaw.position.y = -0.28;
    this.leftArm.add(lArm, lPaw);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.34, 0.85, 0);
    const rArm = new THREE.Mesh(armGeo, blackMat);
    rArm.position.y = -0.12;
    const rPaw = new THREE.Mesh(pawGeo, whiteMat);
    rPaw.position.y = -0.28;
    this.rightArm.add(rArm, rPaw);
    group.add(this.leftArm, this.rightArm);

    // Black Chubby Legs
    const legGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.25, 8);
    const footGeo = new THREE.BoxGeometry(0.18, 0.1, 0.26);

    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.16, 0.35, 0);
    const lLeg = new THREE.Mesh(legGeo, blackMat);
    lLeg.position.y = -0.1;
    const lFoot = new THREE.Mesh(footGeo, blackMat);
    lFoot.position.set(0, -0.22, 0.04);
    lFoot.castShadow = true;
    this.leftLeg.add(lLeg, lFoot);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.16, 0.35, 0);
    const rLeg = new THREE.Mesh(legGeo, blackMat);
    rLeg.position.y = -0.1;
    const rFoot = new THREE.Mesh(footGeo, blackMat);
    rFoot.position.set(0, -0.22, 0.04);
    rFoot.castShadow = true;
    this.rightLeg.add(rLeg, rFoot);
    group.add(this.leftLeg, this.rightLeg);

    return group;
  }

  // 5. KING PENGUIN
  createPenguinMesh() {
    const group = new THREE.Group();

    const tuxBlackMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.4 });
    const beakYellowMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 });
    const bowtieRedMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf39c12, metalness: 0.8, roughness: 0.2 });

    // Tuxedo Oval Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.7, 12), tuxBlackMat);
    body.position.y = 0.65;
    body.castShadow = true;
    group.add(body);

    const belly = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.27, 0.66, 12), whiteMat);
    belly.position.set(0, 0.65, 0.08);
    group.add(belly);

    // Red Bowtie & Buttons
    const bowtie = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 0.05), bowtieRedMat);
    bowtie.position.set(0, 0.95, 0.26);
    group.add(bowtie);

    [-0.08, -0.18].forEach(yOff => {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), tuxBlackMat);
      btn.position.set(0, 0.8 + yOff, 0.28);
      group.add(btn);
    });

    // Penguin Head & Beak
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.2, 0);

    const headBall = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), tuxBlackMat);
    headBall.castShadow = true;
    headGroup.add(headBall);

    // Beak
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.18, 4), beakYellowMat);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, -0.04, 0.3);
    headGroup.add(beak);

    // Big Cartoon Eyes
    [-0.1, 0.1].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      eye.position.set(ex, 0.05, 0.22);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      pupil.position.set(ex, 0.05, 0.26);

      headGroup.add(eye, pupil);
    });

    // Golden King Crown
    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 10), goldMat);
    crownBase.position.y = 0.26;
    headGroup.add(crownBase);

    for (let c = 0; c < 5; c++) {
      const ang = (c / 5) * Math.PI * 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 4), goldMat);
      spike.position.set(Math.cos(ang) * 0.13, 0.32, Math.sin(ang) * 0.13);
      headGroup.add(spike);
    }

    group.add(headGroup);

    // Flippers / Wings
    const wingGeo = new THREE.BoxGeometry(0.08, 0.45, 0.2);

    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 0.85, 0);
    const lWing = new THREE.Mesh(wingGeo, tuxBlackMat);
    lWing.position.y = -0.18;
    lWing.rotation.z = 0.2;
    this.leftArm.add(lWing);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 0.85, 0);
    const rWing = new THREE.Mesh(wingGeo, tuxBlackMat);
    rWing.position.y = -0.18;
    rWing.rotation.z = -0.2;
    this.rightArm.add(rWing);
    group.add(this.leftArm, this.rightArm);

    // Yellow Feet
    const footGeo = new THREE.BoxGeometry(0.18, 0.06, 0.26);

    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.14, 0.16, 0);
    const lFoot = new THREE.Mesh(footGeo, beakYellowMat);
    lFoot.position.set(0, 0, 0.05);
    lFoot.castShadow = true;
    this.leftLeg.add(lFoot);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.14, 0.16, 0);
    const rFoot = new THREE.Mesh(footGeo, beakYellowMat);
    rFoot.position.set(0, 0, 0.05);
    rFoot.castShadow = true;
    this.rightLeg.add(rFoot);
    group.add(this.leftLeg, this.rightLeg);

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
      this.walkCycle += delta * (this.characterType === 'penguin' ? 16.0 : 14.0);
      
      // Leg strides
      if (this.leftLeg) this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.65;
      if (this.rightLeg) this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.65;

      // Arm swings (opposite to legs)
      if (this.leftArm) this.leftArm.rotation.x = -Math.sin(this.walkCycle) * 0.5;
      if (this.rightArm) this.rightArm.rotation.x = Math.sin(this.walkCycle) * 0.5;

      // Special Animations per Character
      if (this.characterType === 'cat' && this.tailGroup) {
        this.tailGroup.rotation.y = Math.sin(this.walkCycle * 1.2) * 0.35;
        this.tailGroup.rotation.z = Math.cos(this.walkCycle * 0.8) * 0.2;
        this.tailGroup.rotation.x = -0.2 + Math.abs(Math.sin(this.walkCycle)) * 0.15;
      } else if (this.characterType === 'penguin') {
        // Penguin cute waddle (side-to-side body tilt)
        this.rootGroup.rotation.z = Math.sin(this.walkCycle) * 0.18;
        if (this.leftArm) this.leftArm.rotation.z = 0.3 + Math.abs(Math.sin(this.walkCycle)) * 0.25;
        if (this.rightArm) this.rightArm.rotation.z = -0.3 - Math.abs(Math.sin(this.walkCycle)) * 0.25;
      } else if (this.characterType === 'robot' && this.antennaGroup) {
        this.antennaGroup.rotation.z = Math.sin(this.walkCycle * 2.0) * 0.2;
      }

      // Body bounce
      this.rootGroup.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.06;
    } else {
      if (this.leftLeg) this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, delta * 10);
      if (this.rightLeg) this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, delta * 10);
      if (this.leftArm) this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, 0, delta * 10);
      if (this.rightArm) this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, 0, delta * 10);
      this.rootGroup.rotation.z = THREE.MathUtils.lerp(this.rootGroup.rotation.z, 0, delta * 10);
      
      // Idle animations
      if (this.characterType === 'cat' && this.tailGroup) {
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

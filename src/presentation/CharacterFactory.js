import * as THREE from 'three';
import { createPlayerAvatar } from './PlayerAvatarModel.js';
import { makeHumanoid, STAFF_PROFESSIONS, STAFF_PROFESSION_KEYS } from './HumanoidFactory.js';

// Low-poly player avatars share an articulated silhouette and the existing walk animation.
export class CharacterFactory {
  constructor(type = 'shopkeeper') {
    this.type = type;
    this.walkCycle = 0;
    this.leftLeg = null;
    this.rightLeg = null;
    this.leftArm = null;
    this.rightArm = null;
    this.tailGroup = null;
    this.antennaGroup = null;
    this.group = this.#build(type);
  }

  #build(type) {
    if (STAFF_PROFESSION_KEYS.includes(type)) {
      return this.createStaffMesh(type);
    }
    const builders = {
      shopkeeper: this.createShopkeeperMesh,
      cat: this.createCatMesh,
      robot: this.createRobotMesh,
      panda: this.createPandaMesh,
      penguin: this.createPenguinMesh,
    };
    return (builders[type] ?? builders.shopkeeper).call(this);
  }

  createStaffMesh(profession) {
    const group = new THREE.Group();
    const prof = STAFF_PROFESSIONS[profession] ?? STAFF_PROFESSIONS.cashier;
    const body = makeHumanoid(group, prof.uniformColor, 0x4a2c11, profession.length, profession);
    this.leftLeg = body.legs[0];
    this.rightLeg = body.legs[1];
    this.leftArm = body.arms[0];
    this.rightArm = body.arms[1];
    return group;
  }

  animate(delta, moving) {
    if (moving) {
      this.walkCycle += delta * (this.type === 'penguin' ? 16 : 14);
      if (this.leftLeg) this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.65;
      if (this.rightLeg) this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.65;
      if (this.leftArm) this.leftArm.rotation.x = -Math.sin(this.walkCycle) * 0.5;
      if (this.rightArm) this.rightArm.rotation.x = Math.sin(this.walkCycle) * 0.5;
      if (this.type === 'cat' && this.tailGroup) {
        this.tailGroup.rotation.y = Math.sin(this.walkCycle * 1.2) * 0.35;
        this.tailGroup.rotation.z = Math.cos(this.walkCycle * 0.8) * 0.2;
        this.tailGroup.rotation.x = -0.2 + Math.abs(Math.sin(this.walkCycle)) * 0.15;
      }
      if (this.type === 'penguin') {
        if (this.leftArm) this.leftArm.rotation.z = 0.3 + Math.abs(Math.sin(this.walkCycle)) * 0.25;
        if (this.rightArm) this.rightArm.rotation.z = -0.3 - Math.abs(Math.sin(this.walkCycle)) * 0.25;
      }
      if (this.type === 'robot' && this.antennaGroup) this.antennaGroup.rotation.z = Math.sin(this.walkCycle * 2) * 0.2;
      this.group.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.06;
    } else {
      for (const limb of [this.leftLeg, this.rightLeg, this.leftArm, this.rightArm]) {
        if (limb) limb.rotation.x = THREE.MathUtils.lerp(limb.rotation.x, 0, delta * 10);
      }
      this.group.rotation.z = THREE.MathUtils.lerp(this.group.rotation.z, 0, delta * 10);
      if (this.type === 'cat' && this.tailGroup) {
        this.walkCycle += delta * 3;
        this.tailGroup.rotation.y = Math.sin(this.walkCycle) * 0.2;
        this.tailGroup.rotation.z = Math.cos(this.walkCycle * 0.5) * 0.1;
      }
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, 0, delta * 10);
    }
  }
  #createAvatar(type) {
    const model = createPlayerAvatar(type);
    [this.leftLeg, this.rightLeg] = model.legs;
    [this.leftArm, this.rightArm] = model.arms;
    this.tailGroup = model.tailGroup;
    this.antennaGroup = model.antennaGroup;
    return model.group;
  }

  createShopkeeperMesh() { return this.#createAvatar('shopkeeper'); }
  createCatMesh() { return this.#createAvatar('cat'); }
  createRobotMesh() { return this.#createAvatar('robot'); }
  createPandaMesh() { return this.#createAvatar('panda'); }
  createPenguinMesh() { return this.#createAvatar('penguin'); }
}

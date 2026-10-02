import * as THREE from 'three';
import { customerExpression } from './CustomerExpressions.js';

const DOWN = new THREE.Vector3(0, -1, 0);
const clamp = THREE.MathUtils.clamp;
const smooth = (t) => { const x = clamp(t, 0, 1); return x * x * (3 - 2 * x); };
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

// One frame-driven owner for each procedural rig. No repeating tween or timer
// survives an action, pause, task cancellation, or removal of the actor.
export class CharacterAnimator {
  constructor(actor, itemFactory, kind) {
    this.actor = actor;
    this.factory = itemFactory;
    this.kind = kind;
    this.pending = [];
    this.action = null;
    this.path = [];
    this.clock = 0;
    this.initialized = false;
    this.disposed = false;
    this.lastCue = null;
    this.held = kind === 'customer' ? actor.inspectMesh : actor.cargo;
    this.home = this.held?.position.clone();
    this.cargoHomes = kind === 'customer' ? actor.cargo.map((mesh) => mesh.position.clone()) : [];
    this.eyes = actor.head?.children.filter(mesh => mesh.name === 'expressive-eye') ?? [];
    this.target = new THREE.Vector3();
    this.temp = new THREE.Vector3();
  }

  update(entity, delta, context = {}) {
    if (this.disposed) return;
    const dt = clamp(Number.isFinite(delta) ? delta : 0, 0, 0.1);
    this.entity = entity;
    this.context = context;
    if (!this.initialized) {
      this.initialized = true;
      this.actor.group.position.set(entity.x ?? 0, 0, entity.z ?? 0);
      this.actor.group.rotation.y = entity.facing ?? 0;
      this.lastPosition = { x: entity.x ?? 0, z: entity.z ?? 0 };
      this.lastCue = entity.animationCues?.at(-1)?.id;
      this.offset = [...entity.id].reduce((sum, char) => sum * 1.07 + char.charCodeAt(0), 0) % 20;
    }
    this.clock += dt;
    const cues = entity.animationCues ?? [];
    const previousIndex = cues.findIndex((cue) => cue.id === this.lastCue);
    for (const cue of cues.slice(previousIndex + 1)) {
      if (cue.id === this.lastCue) continue;
      this.lastCue = cue.id;
      if (this.kind === 'worker' && cue.type === 'pickup' && !entity.task
        && !(context.items?.[cue.item] > 0)) continue;
      if (this.pending.length >= 6) this.cancel();
      this.pending.push({ ...cue, target: context.resolveTarget?.(cue) });
      if (!this.path.some((point) => Math.hypot(point.x - cue.x, point.z - cue.z) < 0.02)
        && Math.hypot(this.actor.group.position.x - cue.x, this.actor.group.position.z - cue.z) > 0.08) {
        this.path.push({ x: cue.x, z: cue.z });
      }
    }
    if (entity.x !== this.lastPosition.x || entity.z !== this.lastPosition.z) {
      this.path.push({ x: entity.x, z: entity.z });
      this.lastPosition = { x: entity.x, z: entity.z };
    }
    // A removed/replaced job must not leave its source interaction running.
    if (this.kind === 'worker' && this.action?.type === 'pickup'
      && (!entity.task || entity.waitingForSalary)) {
      this.release();
      this.action = null;
    }
    if (this.action?.target.isValid && !this.action.target.isValid()) this.cancel();
    this.syncCargo();
    for (const cue of this.pending) if (cue.type === 'deliver' && cue.target?.mesh) cue.target.mesh.visible = false;
    if (this.action?.target.mesh && !this.action.released) this.action.target.mesh.visible = false;
    if (dt === 0) return;
    const distance = this.move(dt);
    this.pose(dt, distance);
    if (this.action && dt > 0) this.interact(dt);
    this.syncEquipment();
    this.syncFace(distance);
  }

  move(dt) {
    const actor = this.actor;
    if (this.action || dt === 0) return 0;
    const next = this.pending[0];
    if (next && Math.hypot(next.x - actor.group.position.x, next.z - actor.group.position.z) < 0.08) {
      if (next.target?.waitForDelivery?.()) return 0;
      this.action = { ...this.pending.shift(), elapsed: 0 };
      if (!this.action.target?.point) {
        this.action.target = { point: actor.group.localToWorld(new THREE.Vector3(0, 0.72, 0.42)) };
      }
      this.action.duration = this.action.type === 'shop' ? 2.2
        : this.action.type === 'deliver' && this.action.shelf ? 1.9
          : ['deliver', 'return', 'receive'].includes(this.action.type) ? 1 : 0.7;
      return 0;
    }
    // Preserve simulation route corners, including while an interaction holds
    // the actor at its source. Consume distance rather than walking on the spot.
    let remaining = dt * (this.path.length > 8 ? 5.2 : 3.6) * (this.context.speed ?? 1);
    let travelled = 0;
    while (remaining > 0 && this.path.length) {
      const point = this.path[0];
      const dx = point.x - actor.group.position.x;
      const dz = point.z - actor.group.position.z;
      const length = Math.hypot(dx, dz);
      if (length < 0.0001) { this.path.shift(); continue; }
      const step = Math.min(remaining, length);
      const turnSpeed = clamp((Math.cos(angleDelta(actor.group.rotation.y, Math.atan2(dx, dz))) + 0.3) / 1.3, 0.12, 1);
      const advance = step * turnSpeed;
      actor.group.position.x += dx / length * advance;
      actor.group.position.z += dz / length * advance;
      this.travelFacing = Math.atan2(dx, dz);
      travelled += advance;
      remaining -= step;
      if (advance >= length - 0.00001) {
        this.path.shift();
        if (next && Math.hypot(next.x - point.x, next.z - point.z) < 0.08) break;
      }
    }
    actor.walkCycle += travelled * Math.PI * 2 / 0.64;
    return travelled;
  }

  pose(dt, distance) {
    const a = this.actor;
    const blend = 1 - Math.exp(-dt * 14);
    const time = this.clock + this.offset;
    const moving = distance > 0.0001;
    const wave = Math.sin(a.walkCycle);
    const onBreak = this.kind === 'worker' && this.entity.break?.phase === 'resting'
      && !this.action && !moving && this.path.length === 0;
    const sitting = (['waiting-meal', 'eating', 'ready-tip'].includes(this.entity.phase)
      && (!this.action || this.action.type === 'receive'))
      || onBreak && this.entity.break.facilityId === 'rest';
    const fatigue = this.kind === 'worker' && !onBreak
      ? clamp((20 - (this.entity.energy ?? 100)) / 20, 0, 1) : 0;
    let facing = moving ? this.travelFacing : this.entity.facing ?? 0;
    if (this.action) {
      const point = this.action.target.point;
      facing = Math.atan2(point.x - a.group.position.x, point.z - a.group.position.z);
    } else if (!moving && this.entity.phase === 'waiting-stock' && this.context.lookTarget) {
      const point = this.context.lookTarget;
      facing = Math.atan2(point.x - a.group.position.x, point.z - a.group.position.z);
    }
    a.group.rotation.y += angleDelta(a.group.rotation.y, facing) * (1 - Math.exp(-dt * 10));
    a.group.rotation.x = THREE.MathUtils.lerp(a.group.rotation.x, 0, blend);
    a.group.rotation.z = THREE.MathUtils.lerp(a.group.rotation.z, 0, blend);
    a.group.position.y = THREE.MathUtils.lerp(a.group.position.y, sitting ? 0.11 : 0, blend);
    a.torso.rotation.x = THREE.MathUtils.lerp(a.torso.rotation.x, this.action ? 0.16 : fatigue * 0.07, blend);
    a.torso.position.z = THREE.MathUtils.lerp(a.torso.position.z, this.action ? 0.08 : 0, blend);
    for (let i = 0; i < 2; i++) {
      const sign = i ? -1 : 1;
      a.legs[i].rotation.x = THREE.MathUtils.lerp(a.legs[i].rotation.x,
        sitting ? -1.4 : moving ? sign * wave * 0.48 : 0, blend);
      a.knees[i].rotation.x = THREE.MathUtils.lerp(a.knees[i].rotation.x,
        sitting ? 1.45 : moving ? Math.max(0, -sign * wave) * 0.48 : 0, blend);
      const carrying = this.kind === 'worker' && Boolean(Object.values(this.context.items ?? {}).some((n) => n > 0));
      let armX = moving ? -sign * wave * 0.32 : 0.04;
      let elbowX = 0.06;
      if (carrying || a.hasCart) { armX = -0.55; elbowX = -0.35; }
      if (a.hasBasket && i === 1) { armX = 0.05; elbowX = -0.08; }
      if (sitting) {
        armX = this.entity.phase === 'eating' ? -0.65 + sign * Math.sin(time * 4) * 0.12 : -0.55;
        elbowX = -0.45;
      }
      a.arms[i].rotation.x = THREE.MathUtils.lerp(a.arms[i].rotation.x, armX, blend);
      a.arms[i].rotation.y = THREE.MathUtils.lerp(a.arms[i].rotation.y, 0, blend);
      a.arms[i].rotation.z = THREE.MathUtils.lerp(a.arms[i].rotation.z, sign * 0.08, blend);
      a.elbows[i].rotation.x = THREE.MathUtils.lerp(a.elbows[i].rotation.x, elbowX, blend);
      a.elbows[i].rotation.y = THREE.MathUtils.lerp(a.elbows[i].rotation.y, 0, blend);
      a.elbows[i].rotation.z = THREE.MathUtils.lerp(a.elbows[i].rotation.z, 0, blend);
      a.wrists[i].rotation.set(0, 0, Math.sin(time * 1.3) * 0.018);
    }
    a.head.rotation.x = THREE.MathUtils.lerp(a.head.rotation.x, sitting ? 0.14 : 0.02 + fatigue * 0.09, blend);
    a.head.rotation.y = THREE.MathUtils.lerp(a.head.rotation.y, Math.sin(time * 0.7) * 0.055, blend);
    a.head.rotation.z = THREE.MathUtils.lerp(a.head.rotation.z, 0, blend);
    if (onBreak && this.entity.break.facilityId === 'kitchen') {
      a.arms[1].rotation.x = THREE.MathUtils.lerp(a.arms[1].rotation.x, -0.74, blend);
      a.elbows[1].rotation.x = THREE.MathUtils.lerp(a.elbows[1].rotation.x, -1.25, blend);
    }
    if (this.kind === 'worker' && this.context.paying && !this.entity.break && !this.action && !moving) {
      a.arms[1].rotation.x = THREE.MathUtils.lerp(a.arms[1].rotation.x, -0.6, blend);
      a.elbows[1].rotation.x = -0.45;
      a.head.rotation.x = 0.12;
    }
  }

  // Two-bone IK in the shoulder parent's space; the wrist and all attached
  // equipment follow the same hierarchy. Bound unreachable goals to arm length.
  reach(index, worldTarget, blend = 1) {
    const a = this.actor;
    a.group.updateMatrixWorld(true);
    const parent = a.arms[index].parent;
    const goal = parent.worldToLocal(worldTarget.clone());
    const shoulder = a.arms[index].position;
    const direction = goal.sub(shoulder);
    const length = clamp(direction.length(), 0.035, 0.479);
    direction.normalize();
    const pole = new THREE.Vector3(index ? 0.55 : -0.55, -1, 0.35);
    pole.addScaledVector(direction, -pole.dot(direction)).normalize();
    const elbow = direction.clone().multiplyScalar(length / 2)
      .addScaledVector(pole, Math.sqrt(Math.max(0, 0.24 ** 2 - (length / 2) ** 2)));
    const upper = new THREE.Quaternion().setFromUnitVectors(DOWN, elbow.clone().normalize());
    const lowerDirection = direction.multiplyScalar(length).sub(elbow).applyQuaternion(upper.clone().invert()).normalize();
    const lower = new THREE.Quaternion().setFromUnitVectors(DOWN, lowerDirection);
    a.arms[index].quaternion.slerp(upper, blend);
    a.elbows[index].quaternion.slerp(lower, blend);
    a.group.updateMatrixWorld(true);
  }

  showHeld(item) {
    if (!this.held) return;
    if (this.held.geometry !== this.factory.getItemGeometry(item)) {
      if (!this.held.geometry.userData.sharedAsset) this.held.geometry.dispose();
      if (!this.held.material.userData.sharedAsset) this.held.material.dispose();
      this.held.geometry = this.factory.getItemGeometry(item);
      this.held.material = this.factory.getItemMaterial(item);
    }
    this.held.visible = true;
  }

  putInHand(index) {
    const wrist = this.actor.wrists[index];
    if (this.held.parent !== wrist) {
      wrist.add(this.held);
      this.held.position.set(0, 0, 0.035);
      this.held.rotation.set(0, 0, 0);
    }
  }

  interact(dt) {
    const action = this.action;
    action.elapsed += dt;
    const t = action.elapsed;
    const a = this.actor;
    const point = action.target.point;
    const hand = this.kind === 'customer' ? 0 : 1;
    if (action.type === 'shop') {
      // A finite look between neighbouring products and chin gesture before
      // reaching. Only real, successful shelf acquisitions trigger this action.
      if (t < 0.4) {
        a.head.rotation.y = Math.sin(t / 0.4 * Math.PI * 2) * 0.22;
        const chin = a.head.localToWorld(new THREE.Vector3(-0.05, -0.15, 0.22));
        this.reach(0, chin, smooth(t / 0.18));
      } else if (t < 0.9) {
        this.showHeld(action.item);
        if (this.held.parent !== a.group) a.group.add(this.held);
        this.held.position.copy(a.group.worldToLocal(point.clone()));
        this.reach(hand, point, smooth((t - 0.4) / 0.4));
      } else if (t < 1.45) {
        this.showHeld(action.item);
        const eye = a.group.localToWorld(new THREE.Vector3(-0.13, 1.12, 0.32));
        this.target.copy(point).lerp(eye, smooth((t - 0.9) / 0.25));
        this.reach(hand, this.target);
        this.putInHand(hand);
        a.wrists[hand].rotation.z = Math.sin((t - 0.9) * 8) * 0.16;
        a.head.rotation.x = 0.14;
      } else if (t < 2) {
        const destination = a.group.localToWorld(this.cargoHomes[action.basketIndex]?.clone() ?? new THREE.Vector3(0, 0.5, 0.35));
        const eye = a.group.localToWorld(new THREE.Vector3(-0.13, 1.12, 0.32));
        this.target.copy(eye).lerp(destination, smooth((t - 1.45) / 0.5));
        this.reach(hand, this.target);
        this.putInHand(hand);
        if (t >= 1.95) this.release();
      }
    } else if (action.type === 'pickup') {
      this.showHeld(action.item);
      if (t < 0.32) {
        a.group.add(this.held);
        this.held.position.copy(a.group.worldToLocal(point.clone()));
        this.reach(hand, point, smooth(t / 0.28));
      } else {
        const carry = a.group.localToWorld(new THREE.Vector3(0, 0.75, 0.34));
        this.target.copy(point).lerp(carry, smooth((t - 0.32) / 0.3));
        this.reach(hand, this.target);
        this.putInHand(hand);
      }
    } else if (action.type === 'deliver' || action.type === 'return') {
      if (t < 0.8) {
        this.showHeld(action.item);
        if (action.target.mesh) action.target.mesh.visible = false;
        const carry = a.group.localToWorld(new THREE.Vector3(0, 0.76, 0.34));
        this.target.copy(carry).lerp(point, smooth((t - 0.22) / 0.5));
        this.reach(hand, this.target);
        this.putInHand(hand);
        if (a.propObjects.box && t < 0.45) a.propObjects.box.visible = true;
      } else {
        this.release();
        if (action.shelf && t < 1.3) {
          // Push/facing stops at the shelf surface; small wrist rotation aligns
          // the item rather than making it oscillate through the shelf.
          this.reach(hand, point);
          a.wrists[hand].rotation.z = Math.sin((t - 0.8) * Math.PI * 2) * 0.12;
        } else if (action.shelf && t < 1.75) {
          a.propObjects.terminal.visible = true;
          const crouch = smooth((t - 1.3) / 0.22) * (1 - smooth((t - 1.6) / 0.15));
          a.group.position.y = -0.115 * crouch;
          for (let i = 0; i < 2; i++) { a.legs[i].rotation.x = -0.8 * crouch; a.knees[i].rotation.x = 1.6 * crouch; }
          const barcode = action.target.barcode ?? point.clone().setY(0.34);
          this.target.copy(point).lerp(barcode, smooth((t - 1.3) / 0.22));
          this.reach(1, this.target);
          a.head.rotation.x = 0.3;
        }
      }
    } else if (action.type === 'receive') {
      const reception = a.group.localToWorld(new THREE.Vector3(-0.12, 0.85, 0.35));
      this.reach(0, reception, smooth(t / 0.25));
      a.head.rotation.x = 0.12;
    }
    if (t >= action.duration) {
      this.release();
      this.action = null;
      this.syncCargo();
    }
  }

  release() {
    if (this.action?.target.mesh && !this.action.released) {
      this.action.target.mesh.visible = true;
      this.action.target.release?.();
    }
    if (this.action) this.action.released = true;
    if (this.held) {
      this.actor.group.add(this.held);
      this.held.position.copy(this.home);
      this.held.rotation.set(0, 0, 0);
      this.held.visible = false;
    }
    if (this.actor.propObjects.terminal) this.actor.propObjects.terminal.visible = false;
  }

  syncCargo() {
    const a = this.actor;
    if (this.kind === 'customer') {
      for (const bag of a.shoppingBags ?? []) bag.visible = Boolean(this.context.paid);
      if (a.cartMesh) a.cartMesh.visible = !this.context.paid;
      if (a.basketMesh) a.basketMesh.visible = !this.context.paid;
      a.cargo.forEach((mesh, index) => {
        const item = this.entity.basket?.[index];
        const inFlight = [this.action, ...this.pending].some((cue) =>
          cue?.type === 'shop' && cue.basketIndex === index && (cue.elapsed ?? 0) < 1.95);
        mesh.visible = Boolean(item) && !inFlight && !this.context.paid;
        if (item) { mesh.geometry = this.factory.getItemGeometry(item); mesh.material = this.factory.getItemMaterial(item); }
      });
    } else if (!this.action) {
      const item = Object.keys(this.context.items ?? {}).find((key) => this.context.items[key] > 0)
        ?? this.pending.find((cue) => cue.type === 'deliver')?.item;
      a.cargo.visible = Boolean(item) && !this.pending.some((cue) => cue.type === 'pickup');
      if (item) {
        a.group.add(a.cargo);
        a.cargo.position.copy(this.home);
        a.cargo.geometry = this.factory.getItemGeometry(item);
        a.cargo.material = this.factory.getItemMaterial(item);
      }
    }
  }

  syncEquipment() {
    const a = this.actor;
    if (a.propObjects.breakMug) {
      a.propObjects.breakMug.visible = this.kind === 'worker'
        && this.entity.break?.phase === 'resting' && this.entity.break.facilityId === 'kitchen'
        && !this.action && this.path.length === 0;
    }
    if (a.propObjects.box) {
      a.propObjects.box.visible = this.kind === 'worker'
        && (Boolean(Object.values(this.context.items ?? {}).some((n) => n > 0))
          || this.action?.type === 'deliver' && this.action.elapsed < 0.45);
    }
    if (!this.action && this.kind === 'worker' && a.propObjects.box?.visible) {
      for (let i = 0; i < 2; i++) {
        const grip = a.group.localToWorld(new THREE.Vector3(i ? 0.18 : -0.18, 0.68, 0.34));
        this.reach(i, grip);
      }
    }
    if (a.cartMesh) a.cartMesh.visible = !this.context.paid;
    if (a.basketMesh) a.basketMesh.visible = !this.context.paid;
    for (const bag of a.shoppingBags ?? []) bag.visible = Boolean(this.context.paid);
    if (a.cartMesh && !this.context.paid) {
      for (let i = 0; i < 2; i++) {
        if (this.action && i === 0) continue;
        const grip = a.cartMesh.localToWorld(new THREE.Vector3(-0.31, 0.78, i ? -0.2 : 0.2));
        this.reach(i, grip);
      }
    }
    if (a.propObjects.tray) {
      const tray = a.propObjects.tray;
      a.group.updateMatrixWorld(true);
      const parentRotation = tray.parent.getWorldQuaternion(new THREE.Quaternion());
      tray.quaternion.copy(parentRotation.invert()).multiply(a.group.getWorldQuaternion(new THREE.Quaternion()));
    }
    if (a.basketMesh && !this.context.paid) {
      a.group.updateMatrixWorld(true);
      const grip = a.wrists[1].getWorldPosition(this.temp);
      grip.y -= 0.29 * a.group.scale.y;
      a.basketMesh.position.copy(a.group.worldToLocal(grip));
      a.basketMesh.rotation.z = Math.sin(a.walkCycle) * 0.025;
      a.cargo.forEach((mesh, index) => {
        mesh.position.copy(a.basketMesh.position).add(new THREE.Vector3(0, 0.06 + index * 0.07, 0));
        this.cargoHomes[index].copy(mesh.position);
      });
    }
  }

  syncFace(distance) {
    const expression = customerExpression(this.entity, this.action);
    const blink = !this.context.reducedMotion && ((this.clock + this.offset) % (4 + this.offset % 2)) < 0.12;
    for (const eye of this.eyes) {
      eye.scale.y = blink ? 0.08 : expression === 'happy' ? 0.45 : 1;
      eye.rotation.z = expression === 'happy' ? eye.userData.side * -0.28 : 0;
    }
    const shadow = this.actor.group.contactShadow;
    if (shadow) {
      shadow.position.y = 0.015 - this.actor.group.position.y / this.actor.group.scale.y;
      const pulse = distance > 0 ? 1 + Math.sin(this.actor.walkCycle * 2) * 0.035 : 1;
      shadow.scale.x = shadow.userData.baseWidth * pulse;
    }
    if (!this.action && distance === 0 && expression === 'waiting') {
      this.actor.arms[0].rotation.x = -0.7;
      this.actor.elbows[0].rotation.x = -0.75;
      this.actor.head.rotation.x = 0.2;
    }
    if (!this.action && distance === 0 && this.kind === 'worker' && this.entity.type === 'cashier' && !this.context.paying && !this.entity.break) {
      this.actor.arms[1].rotation.x = -0.3 + Math.sin(this.clock * 1.5) * 0.12;
      this.actor.head.rotation.y = Math.sin(this.clock * 0.8) * 0.12;
    }
  }

  cancel() {
    this.release();
    for (const cue of this.pending) {
      if (cue.target?.mesh) { cue.target.mesh.visible = true; cue.target.release?.(); }
    }
    this.action = null;
    this.pending.length = 0;
    if (this.entity) this.syncCargo();
  }

  dispose() {
    this.cancel();
    this.path.length = 0;
    this.disposed = true;
  }
}

import * as THREE from 'three';
import { stationPosition } from '../domain/layout.js';
import { addContactShadow } from '../presentation/ContactShadow.js';

const BIRD_PATCHES = [{ x: -8, z: -10.5 }, { x: -13, z: -10.5 }, { x: -6, z: -12 }, { x: -17, z: -11 }];

export function birdIsStartled(bird, player, workers = []) {
  if (Math.hypot(bird.x - player.x, bird.z - player.z) < 2) return true;
  return workers.some(worker => Math.hypot(bird.x - worker.x, bird.z - worker.z) < 2);
}

function part(parent, geometry, material, x, y, z) {
  const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z);
  parent.add(mesh); return mesh;
}

export class AmbientLife {
  constructor(scene) {
    this.group = new THREE.Group(); this.group.name = 'ambient-life'; scene.add(this.group);
    this.time = 0;
    this.nextCatSoundAt = 0;
    const grey = new THREE.MeshStandardMaterial({ color: 0x8e9ba5, roughness: 0.9 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xe6ded0, roughness: 0.9 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x35434c });
    const amber = new THREE.MeshStandardMaterial({ color: 0xe8b16a });
    const sphere = new THREE.IcosahedronGeometry(1, 0);
    const ellipsoid = (parent, material, pos, scale) => {
      const mesh = part(parent, sphere, material, ...pos); mesh.scale.set(...scale); return mesh;
    };
    this.birds = BIRD_PATCHES.map((patch, index) => {
      const group = new THREE.Group(); group.position.set(patch.x, 0, patch.z); this.group.add(group);
      ellipsoid(group, grey, [0, 0.2, 0], [0.14, 0.17, 0.22]);
      const head = ellipsoid(group, dark, [0, 0.36, 0.1], [0.09, 0.1, 0.1]);
      const beak = part(group, new THREE.ConeGeometry(0.045, 0.13, 4), amber, 0, 0.35, 0.23); beak.rotation.x = Math.PI / 2;
      const wings = [-1, 1].map(side => {
        const pivot = new THREE.Group(); pivot.position.set(side * 0.11, 0.26, 0); group.add(pivot);
        const wing = ellipsoid(pivot, grey, [side * 0.1, 0, 0], [0.15, 0.035, 0.2]);
        return pivot;
      });
      for (const side of [-1, 1]) part(group, new THREE.BoxGeometry(0.025, 0.09, 0.06), amber, side * 0.055, 0.06, 0.025);
      const shadow = addContactShadow(group, 0.6, 0.55);
      return { group, head, wings, shadow, index, x: patch.x, z: patch.z, phase: 'ground', elapsed: 0, cooldown: 0, destination: index };
    });
    this.cat = new THREE.Group(); this.cat.position.set(0.2, 0, 10.4); this.group.add(this.cat);
    this.catBody = ellipsoid(this.cat, amber, [0, 0.18, 0], [0.35, 0.18, 0.23]);
    this.catHead = new THREE.Group(); this.catHead.position.set(0.25, 0.3, 0.1); this.cat.add(this.catHead);
    ellipsoid(this.catHead, amber, [0, 0, 0], [0.16, 0.16, 0.15]);
    for (const side of [-1, 1]) {
      part(this.catHead, new THREE.ConeGeometry(0.065, 0.15, 3), amber, side * 0.09, 0.15, 0);
      part(this.catHead, new THREE.BoxGeometry(0.05, 0.015, 0.025), dark, side * 0.06, 0, 0.14);
    }
    ellipsoid(this.catHead, cream, [0, -0.065, 0.11], [0.08, 0.04, 0.04]);
    this.catTail = new THREE.Group(); this.catTail.position.set(-0.25, 0.19, 0); this.cat.add(this.catTail);
    ellipsoid(this.catTail, amber, [-0.19, 0, 0.04], [0.25, 0.055, 0.055]);
    for (const x of [-0.12, 0, 0.12]) part(this.cat, new THREE.BoxGeometry(0.05, 0.06, 0.35), dark, x, 0.3, 0);
    addContactShadow(this.cat, 1.1, 0.75);
    this.insects = Array.from({ length: 3 }, (_, index) => {
      const group = new THREE.Group(); this.group.add(group);
      const material = new THREE.MeshBasicMaterial({ color: [0xffb3bd, 0xffd76f, 0x8bd8f0][index], side: THREE.DoubleSide });
      const wings = [-1, 1].map(side => part(group, new THREE.CircleGeometry(0.1, 5), material, side * 0.07, 0, 0));
      const glow = part(group, new THREE.SphereGeometry(0.045, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffec8c }), 0, 0, 0);
      return { group, wings, glow, index };
    });
  }

  update(state, delta, daylight, reducedMotion = false) {
    const dt = state.paused || reducedMotion ? 0 : Math.min(Math.max(delta, 0), 0.1);
    this.time += dt;
    for (const bird of this.birds) {
      if (dt > 0) {
        bird.cooldown = Math.max(0, bird.cooldown - dt);
        bird.checkElapsed = (bird.checkElapsed ?? 0.25) + dt;
        if (bird.phase === 'ground' && bird.cooldown === 0 && bird.checkElapsed >= 0.25 && birdIsStartled(bird, state.player, state.workers)) {
          bird.phase = 'flying'; bird.elapsed = 0; bird.destination = (bird.destination + 1) % BIRD_PATCHES.length;
          bird.originX = bird.x; bird.originZ = bird.z;
        }
        if (bird.checkElapsed >= 0.25) bird.checkElapsed = 0;
        if (bird.phase === 'flying') {
          bird.elapsed += dt;
          const t = Math.min(1, bird.elapsed / 5); const target = BIRD_PATCHES[bird.destination];
          bird.x = THREE.MathUtils.lerp(bird.originX, target.x, t); bird.z = THREE.MathUtils.lerp(bird.originZ, target.z, t);
          bird.group.position.set(bird.x, Math.sin(t * Math.PI) * 2.6, bird.z);
          bird.group.rotation.y = Math.atan2(target.x - bird.originX, target.z - bird.originZ);
          bird.wings.forEach((wing, index) => wing.rotation.z = (index ? -1 : 1) * Math.sin(this.time * 22) * 0.9);
          bird.shadow.visible = false;
          if (t === 1) { bird.phase = 'ground'; bird.cooldown = 3; bird.shadow.visible = true; bird.group.position.y = 0; }
        } else {
          bird.head.position.y = 0.36 + Math.sin(this.time * 3 + bird.index) * 0.025;
          bird.wings.forEach(wing => wing.rotation.z = 0);
        }
      }
    }
    if (dt > 0) {
      const near = Math.hypot(state.player.x - this.cat.position.x, state.player.z - this.cat.position.z) < 3;
      if (near && this.time > this.nextCatSoundAt && state.settings?.sound) { this.onSound?.('ambient-cat'); this.nextCatSoundAt = this.time + 20; }
      this.catHead.rotation.y = near ? Math.atan2(state.player.x - this.cat.position.x, state.player.z - this.cat.position.z) * 0.35 : 0;
      this.catBody.scale.y = 0.18 + Math.sin(this.time * 1.5) * 0.008;
      this.catTail.rotation.y = Math.sin(this.time * (near ? 3 : 0.7)) * (near ? 0.35 : 0.08);
    }
    const farms = Object.keys(state.farms ?? {});
    this.insects.forEach(insect => {
      const id = farms[insect.index % Math.max(1, farms.length)];
      const position = id ? stationPosition(state, id) : null;
      insect.group.visible = Boolean(position);
      if (!position) return;
      const phase = this.time * 0.6 + insect.index * 2;
      insect.group.position.set(position.x + Math.sin(phase) * 0.75, 0.9 + Math.sin(phase * 1.6) * 0.22, position.z + Math.cos(phase) * 0.65);
      insect.wings.forEach((wing, i) => { wing.visible = daylight > 0.35; wing.rotation.y = Math.sin(this.time * 18) * (i ? -1 : 1); });
      insect.glow.visible = daylight <= 0.35;
    });
  }
}

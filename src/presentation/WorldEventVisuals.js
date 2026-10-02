import { stationPosition, registerCashPosition } from '../domain/layout.js';
import * as THREE from 'three';
import { activeWorldEvent, hasWorldBuff } from '../domain/worldEvents.js';
import { addContactShadow } from './ContactShadow.js';

// Fixed geometry budget: no per-frame model creation, lights, or collision boxes.
export class WorldEventVisuals {
  constructor(scene) {
    this.group = new THREE.Group(); this.group.name = 'world-event-visuals'; scene.add(this.group);
    this.time = 0;
    const colors = [0xffcb40, 0x263a48, 0xf4f6ed, 0xe94444, 0x69878f, 0xf4b875, 0x603c2b];
    const materials = colors.map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.8 }));
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const box = (parent, color, position, size) => {
      const mesh = new THREE.Mesh(boxGeometry, materials[color]); mesh.position.set(...position); mesh.scale.set(...size); parent.add(mesh); return mesh;
    };
    const root = name => { const group = new THREE.Group(); group.name = name; this.group.add(group); group.visible = false; return group; };
    this.bus = root('tour-bus'); this.bus.position.set(10, 0, 18.8);
    box(this.bus, 0, [0, 1, 0], [2.1, 1.7, 5.5]);
    box(this.bus, 1, [0, 1.62, 0], [2.14, 0.64, 4.6]);
    box(this.bus, 0, [0, 2, 0], [2.2, 0.15, 5.6]);
    for (const z of [-1.7, 1.7]) for (const x of [-1.03, 1.03]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.18, 8), materials[1]);
      wheel.rotation.z = Math.PI / 2; wheel.position.set(x, 0.44, z); this.bus.add(wheel);
    }
    for (const x of [-0.65, 0.65]) box(this.bus, 2, [x, 0.88, 2.77], [0.35, 0.2, 0.06]);
    for (const z of [-1.65, -0.8, 0.1, 1]) for (const x of [-1.08, 1.08]) box(this.bus, 0, [x, 1.6, z], [0.03, 0.67, 0.09]);
    addContactShadow(this.bus, 3, 6);
    this.truck = root('flash-cargo-truck'); this.truck.position.set(22, 0, 9.5);
    box(this.truck, 2, [0, 1.1, 0], [2.3, 2, 3.6]);
    box(this.truck, 0, [0, 0.8, 2.25], [2.15, 1.5, 1.5]);
    box(this.truck, 1, [0, 1.3, 3.02], [1.75, 0.55, 0.04]);
    for (const z of [-1.2, 2.3]) for (const x of [-1.12, 1.12]) box(this.truck, 1, [x, 0.35, z], [0.25, 0.65, 0.65]);
    addContactShadow(this.truck, 3, 6);

    const person = (name, shirt) => {
      const group = root(name);
      box(group, shirt, [0, 0.8, 0], [0.55, 0.65, 0.35]);
      const head = box(group, 5, [0, 1.43, 0], [0.63, 0.59, 0.55]);
      box(group, 6, [0, 1.73, 0], [0.67, 0.19, 0.6]);
      for (const x of [-0.16, 0.16]) box(group, 1, [x, 1.45, 0.29], [0.055, 0.11, 0.035]);
      const legs = [-0.16, 0.16].map(x => box(group, 1, [x, 0.29, 0], [0.24, 0.5, 0.25]));
      for (const x of [-0.39, 0.39]) box(group, 5, [x, 0.77, 0], [0.2, 0.6, 0.24]);
      addContactShadow(group);
      return { group, legs, head };
    };
    this.thief = person('shoplifter', 1);
    box(this.thief.group, 1, [0, 1.83, 0], [0.7, 0.27, 0.63]);
    for (const y of [1.76, 1.86]) box(this.thief.group, 2, [0, y, 0], [0.71, 0.045, 0.64]);
    box(this.thief.group, 0, [0.4, 0.66, 0.3], [0.28, 0.28, 0.25]);
    this.inspector = person('health-inspector', 4);
    box(this.inspector.group, 6, [0.4, 0.82, 0.28], [0.38, 0.48, 0.07]);
    box(this.inspector.group, 2, [0.4, 0.82, 0.33], [0.29, 0.35, 0.02]);
    this.marker = root('event-target-ring');
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 4, 24), materials[0]); ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.07; this.marker.add(ring);
    this.wrench = root('jam-wrench');
    box(this.wrench, 0, [0, 3.4, 0], [0.14, 0.65, 0.1]);
    for (const x of [-0.14, 0.14]) box(this.wrench, 0, [x, 3.8, 0], [0.13, 0.25, 0.1]);
    box(this.wrench, 0, [0, 3.7, 0], [0.39, 0.12, 0.1]);
    this.smoke = Array.from({ length: 4 }, (_, i) => {
      const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), new THREE.MeshBasicMaterial({ color: 0x3c3f46, transparent: true, opacity: 0.5, depthWrite: false }));
      this.wrench.add(puff); return puff;
    });
    this.breaker = root('register-breaker');
    box(this.breaker, 4, [0, 0.95, 0], [0.55, 0.6, 0.18]);
    box(this.breaker, 3, [0, 1, 0.14], [0.2, 0.27, 0.18]);
    box(this.breaker, 4, [0, 0.4, 0], [0.09, 0.8, 0.09]);
    this.vip = root('vip-star');
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI / 5 + Math.PI / 2, r = i % 2 ? 0.14 : 0.3;
      if (!i) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    shape.closePath(); const starGeometry = new THREE.ShapeGeometry(shape);
    this.vip.add(new THREE.Mesh(starGeometry, new THREE.MeshBasicMaterial({ color: 0xffcf35, side: THREE.DoubleSide, toneMapped: false })));
    this.harvest = root('golden-harvest-stars');
    this.stars = Array.from({ length: 12 }, () => { const star = new THREE.Mesh(starGeometry, this.vip.children[0].material); this.harvest.add(star); return star; });
    this.certificate = root('hygiene-certificate'); this.certificate.position.set(12.8, 2.8, -6);
    this.cashBag = root('billionaire-cash-bag');
    const bag = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 1), materials[0]);
    bag.scale.set(0.85, 1.2, 0.85); bag.position.y = 0.55; this.cashBag.add(bag);
    box(this.cashBag, 1, [0, 0.92, 0], [0.3, 0.065, 0.3]);
    box(this.certificate, 0, [0, 0, 0], [1.2, 0.85, 0.1]);
    box(this.certificate, 2, [0, 0, 0.07], [1.05, 0.7, 0.03]);
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 128;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff9e9'; ctx.fillRect(0, 0, 256, 128);
      ctx.fillStyle = '#23744b'; ctx.textAlign = 'center'; ctx.font = 'bold 68px sans-serif'; ctx.fillText('A+', 128, 82);
      ctx.font = 'bold 17px sans-serif'; ctx.fillText('HIJYEN / HYGIENE', 128, 113);
      const label = new THREE.Mesh(new THREE.PlaneGeometry(1.03, 0.65), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), toneMapped: false }));
      label.position.z = 0.1; this.certificate.add(label);
    }
  }
  update(state, delta, camera, cat, reducedMotion = false) {
    if (!state.paused && !reducedMotion) this.time += delta;
    const active = state.worldEvents?.active, type = active?.type;
    this.bus.visible = type === 'tourBus'; this.truck.visible = type === 'flashCargo';
    this.thief.group.visible = type === 'shoplifter'; this.inspector.group.visible = type === 'inspection';
    this.wrench.visible = type === 'machineJam'; this.breaker.visible = type === 'blackout';
    this.vip.visible = type === 'critic' || type === 'billionaire';
    this.marker.visible = ['machineJam', 'blackout', 'strayCat', 'shoplifter'].includes(type);
    for (const group of [this.thief.group, this.marker, this.wrench, this.breaker]) {
      if (group.visible) group.position.set(active.x, 0, active.z);
    }
    this.inspector.group.position.set(9, 0, 9.8);
    if (this.thief.group.visible) {
      const point = active.route?.[active.routeIndex];
      if (point) this.thief.group.rotation.y = Math.atan2(point.x - active.x, point.z - active.z);
      this.thief.legs.forEach((leg, i) => { leg.rotation.x = Math.sin(this.time * 7 + i * Math.PI) * 0.22; });
    }
    if (this.vip.visible) { this.vip.position.set(active.x, 2.75, active.z); if (camera) this.vip.quaternion.copy(camera.quaternion); }
    this.smoke.forEach((puff, i) => {
      const phase = (this.time * 0.6 + i / 4) % 1;
      puff.position.set(Math.sin(i) * phase * 0.3, 1.8 + phase * 1.5, 0);
      puff.scale.setScalar(0.3 + phase); puff.material.opacity = (1 - phase) * 0.5;
    });
    this.harvest.visible = Boolean(activeWorldEvent(state, 'goldenHarvest'));
    const farms = Object.keys(state.farms).map(id => stationPosition(state, id)).filter(Boolean);
    this.stars.forEach((star, i) => {
      const farm = farms[i % farms.length]; star.visible = Boolean(farm);
      if (farm) star.position.set(farm.x + Math.sin(i * 2.1) * 1.5, 1 + ((this.time * 0.3 + i / 12) % 1), farm.z + Math.cos(i * 2.1) * 1.5);
      if (camera) star.quaternion.copy(camera.quaternion);
    });
    this.certificate.visible = hasWorldBuff(state, 'certificate');
    const result = state.worldEvents?.lastResult;
    this.cashBag.visible = result?.type === 'billionaire' && result.success && result.until > state.worldEvents.activeTicks
      && (state.cashAtRegisters[result.registerId ?? 'register'] ?? 0) > 0;
    if (this.cashBag.visible) {
      const point = stationPosition(state, result.registerId ?? 'register');
      if (point) { const cash = registerCashPosition(point); this.cashBag.position.set(cash.x, 0, cash.z); }
    }
    if (cat && type === 'strayCat') cat.position.set(active.x, 0, active.z);
    else if (cat && state.worldEvents?.mascot) cat.position.set(5 + Math.sin(this.time * 0.3) * 0.8, 0, 10.4 + Math.cos(this.time * 0.3) * 0.5);
    else if (cat) cat.position.set(0.2, 0, 10.4);
  }
}

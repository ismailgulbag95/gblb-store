import * as THREE from 'three';
import { UPGRADES } from '../domain/catalog.js';
import { getAllStationIds, getStationDimensions, isStationUnlocked, stationPosition } from '../domain/layout.js';

export const CONSTRUCTION_SITES = [
  { id: 'restaurant', title: 'PİZZA ALANI', x: -37, z: 0, width: 20, depth: 16, stations: ['burgerKitchen', 'pizzaKitchen'], color: 0xe99a65 },
  { id: 'logisticsOffice', title: 'DEPO VE LOJİSTİK', x: 21, z: 0, width: 10, depth: 14, unlock: 'managerOffice', color: 0x69baca },
];

export function constructionStatus(state, site) {
  const purchased = state.completedUpgrades?.includes(site.id) || state.unlocked?.[site.unlock ?? site.id];
  if (purchased) return site.stations?.some(id => !stationPosition(state, id)) ? 'waiting' : 'open';
  return state.availableUpgrades?.includes(site.id) ? 'ready' : 'locked';
}

export function constructionPlotOccupied(state, site) {
  return getAllStationIds(state).some(id => {
    if (!isStationUnlocked(state, id)) return false;
    const position = stationPosition(state, id);
    if (!position) return false;
    const { width, depth } = getStationDimensions(id, position.rotation ?? 0);
    return Math.abs(position.x - site.x) < (site.width + width) / 2
      && Math.abs(position.z - site.z) < (site.depth + depth) / 2;
  }) || (state.decorations ?? []).some(decor => Math.abs(decor.x - site.x) < site.width / 2 + 1
    && Math.abs(decor.z - site.z) < site.depth / 2 + 1);
}

// Visual screens leave the front approach open and add no navigation obstacles.
export class ConstructionSites {
  constructor(scene) {
    this.entries = CONSTRUCTION_SITES.map(site => {
      const group = new THREE.Group();
      group.name = `construction:${site.id}`;
      group.position.set(site.x, 0, site.z);
      const wood = new THREE.MeshStandardMaterial({ color: 0xaa754b, roughness: 0.9 });
      const tarp = new THREE.MeshStandardMaterial({ color: site.color, roughness: 0.95 });
      const addBox = (w, h, d, x, y, z, material) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
        mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
        group.add(mesh); return mesh;
      };
      for (const side of [-1, 1]) {
        for (const z of [-site.depth / 2, site.depth / 2]) addBox(0.16, 1.25, 0.16, side * site.width / 2, 0.625, z, wood);
        addBox(0.1, 0.72, site.depth, side * site.width / 2, 0.7, 0, tarp);
        for (let z = -site.depth / 2 + 0.3; z < site.depth / 2; z += 0.6) {
          addBox(0.14, 0.5, 0.25, side * site.width / 2, 0.25, z, wood);
        }
      }
      addBox(site.width, 0.72, 0.1, 0, 0.7, -site.depth / 2, tarp);
      for (let x = -site.width / 2 + 0.3; x < site.width / 2; x += 0.6) {
        addBox(0.25, 0.5, 0.14, x, 0.25, -site.depth / 2, wood);
      }
      // Covered silhouettes hint at the future destination without exposing its contents.
      const cover = addBox(site.width * 0.76, 1.8, site.depth * 0.65, 0, 0.95, -0.6, tarp);
      const foldedTop = addBox(site.width * 0.79, 0.18, site.depth * 0.68, 0, 1.95, -0.6, tarp);
      foldedTop.rotation.z = -0.035;
      for (const side of [-1, 1]) {
        addBox(site.width * 0.13, 0.85, site.depth * 0.18, side * site.width * 0.31, 0.46, site.depth * 0.26, tarp);
      }
      cover.rotation.z = 0.025;
      const gold = new THREE.MeshStandardMaterial({ color: 0xffcf52, roughness: 0.4, metalness: 0.3 });
      const lock = addBox(0.36, 0.3, 0.13, 0, 1.48, site.depth / 2, gold);
      const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 5, 10, Math.PI), gold);
      shackle.position.set(0, 1.68, site.depth / 2); group.add(shackle);
      const sign = new THREE.Sprite(new THREE.SpriteMaterial({ depthTest: true }));
      sign.position.set(0, 2.15, site.depth / 2); sign.scale.set(3.5, 0.85, 1); group.add(sign);
      scene.add(group);
      return { site, group, sign, lock, shackle, status: null, elapsed: 0, particles: null };
    });
  }

  setLabel(entry, status, language) {
    if (typeof document === 'undefined') return;
    const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 192;
    const ctx = canvas.getContext('2d');
    const en = language === 'en';
    ctx.fillStyle = status === 'ready' ? '#27634b' : '#79563d'; ctx.fillRect(0, 0, 768, 192);
    ctx.fillStyle = '#fff5dc'; ctx.textAlign = 'center'; ctx.font = 'bold 40px sans-serif';
    ctx.fillText(status === 'locked' ? '?' : entry.site.title, 384, 65);
    ctx.font = 'bold 30px sans-serif';
    const price = UPGRADES.find(upgrade => upgrade.id === entry.site.id)?.price;
    ctx.fillText(status === 'waiting' ? (en ? 'WAITING FOR PLACEMENT' : 'YERLEŞTİRME BEKLİYOR')
      : status === 'ready' ? `${en ? 'READY TO BUILD' : 'İNŞAATA HAZIR'} • $${price}`
        : (en ? 'WHAT WILL OPEN HERE?' : 'BURADA NE AÇILACAK?'), 384, 135);
    entry.sign.material.map?.dispose();
    entry.sign.material.map = new THREE.CanvasTexture(canvas);
    entry.sign.material.map.colorSpace = THREE.SRGBColorSpace;
    entry.sign.material.needsUpdate = true;
  }

  sync(state, delta, reducedMotion = false) {
    for (const entry of this.entries) {
      const status = constructionStatus(state, entry.site);
      const language = state.settings?.language ?? 'tr';
      if (status !== entry.status || entry.language !== language) {
        // Initial hydration skips celebration, including previously purchased saves.
        if (!reducedMotion && status === 'open' && entry.status && entry.status !== 'open') this.startReveal(entry);
        if (status !== 'open') this.setLabel(entry, status, language);
        entry.status = status; entry.language = language;
        entry.lock.visible = entry.shackle.visible = status === 'ready';
      }
      if (status !== 'open') {
        entry.group.visible = !constructionPlotOccupied(state, entry.site); entry.group.scale.y = 1;
      } else if (entry.particles) {
        entry.elapsed += Math.min(Math.max(delta, 0), 0.1);
        entry.group.scale.y = Math.max(0.001, 1 - entry.elapsed / 0.55);
        entry.group.visible = entry.elapsed < 0.55;
        entry.particles.children.forEach((mesh, i) => {
          const angle = i * 2.399;
          mesh.position.set(Math.cos(angle) * entry.elapsed * 2, 1 + entry.elapsed * 3 - entry.elapsed ** 2 * 3, Math.sin(angle) * entry.elapsed * 2);
          mesh.rotation.x += delta * 3; mesh.rotation.z += delta * 2;
        });
        if (entry.elapsed > 1.3 || reducedMotion) {
          entry.particles.removeFromParent();
          entry.particles.children.forEach(mesh => { mesh.geometry.dispose(); mesh.material.dispose(); });
          entry.particles = null;
        }
      } else entry.group.visible = false;
    }
  }

  startReveal(entry) {
    entry.elapsed = 0;
    const particles = new THREE.Group(); particles.position.copy(entry.group.position);
    for (let i = 0; i < 18; i++) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.04, 0.07), new THREE.MeshBasicMaterial({ color: [0xffd04f, 0x65cdae, 0xff8a80][i % 3] }));
      particles.add(mesh);
    }
    entry.group.parent.add(particles); entry.particles = particles;
  }
}


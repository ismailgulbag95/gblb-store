import * as THREE from 'three';
import { ITEMS } from '../domain/catalog.js';

export class Item3DFactory {
  constructor() {
    this.itemGeometry = new Map();
    this.itemMaterials = new Map();
  }

  getItemGeometry(itemId) {
    if (!this.itemGeometry.has(itemId)) {
      const tomatoProfile = [
        new THREE.Vector2(0.015, -0.15),
        new THREE.Vector2(0.12, -0.145),
        new THREE.Vector2(0.185, -0.06),
        new THREE.Vector2(0.19, 0.05),
        new THREE.Vector2(0.15, 0.135),
        new THREE.Vector2(0.025, 0.15),
      ];
      const canProfile = [
        new THREE.Vector2(0.01, -0.175),
        new THREE.Vector2(0.122, -0.175),
        new THREE.Vector2(0.128, -0.16),
        new THREE.Vector2(0.12, -0.145),
        new THREE.Vector2(0.12, 0.145),
        new THREE.Vector2(0.128, 0.16),
        new THREE.Vector2(0.122, 0.175),
        new THREE.Vector2(0.01, 0.175),
      ];
      const orangeProfile = [
        new THREE.Vector2(0.015, -0.17),
        new THREE.Vector2(0.12, -0.15),
        new THREE.Vector2(0.18, -0.05),
        new THREE.Vector2(0.182, 0.06),
        new THREE.Vector2(0.125, 0.15),
        new THREE.Vector2(0.02, 0.17),
      ];
      const juiceBottleProfile = [
        new THREE.Vector2(0.01, -0.19),
        new THREE.Vector2(0.095, -0.19),
        new THREE.Vector2(0.098, 0.10),
        new THREE.Vector2(0.055, 0.15),
        new THREE.Vector2(0.048, 0.20),
        new THREE.Vector2(0.01, 0.20),
      ];
      const cornProfile = [
        new THREE.Vector2(0.02, -0.18),
        new THREE.Vector2(0.095, -0.14),
        new THREE.Vector2(0.118, 0.02),
        new THREE.Vector2(0.08, 0.15),
        new THREE.Vector2(0.03, 0.20),
        new THREE.Vector2(0.01, 0.21),
      ];
      const popcornProfile = [
        new THREE.Vector2(0.01, -0.18),
        new THREE.Vector2(0.095, -0.18),
        new THREE.Vector2(0.142, 0.11),
        new THREE.Vector2(0.152, 0.13),
        new THREE.Vector2(0.14, 0.17),
        new THREE.Vector2(0.085, 0.22),
        new THREE.Vector2(0.01, 0.23),
      ];
      const sackProfile = [
        new THREE.Vector2(0.02, -0.19),
        new THREE.Vector2(0.135, -0.17),
        new THREE.Vector2(0.165, -0.04),
        new THREE.Vector2(0.085, 0.11),
        new THREE.Vector2(0.128, 0.18),
        new THREE.Vector2(0.02, 0.19),
      ];
      const eggProfile = [
        new THREE.Vector2(0.01, -0.17),
        new THREE.Vector2(0.10, -0.12),
        new THREE.Vector2(0.14, -0.02),
        new THREE.Vector2(0.125, 0.09),
        new THREE.Vector2(0.065, 0.16),
        new THREE.Vector2(0.01, 0.19),
      ];
      const wheatProfile = [
        new THREE.Vector2(0.03, -0.18),
        new THREE.Vector2(0.065, -0.04),
        new THREE.Vector2(0.055, 0.02),
        new THREE.Vector2(0.135, 0.16),
        new THREE.Vector2(0.02, 0.22),
      ];
      const loafProfile = [
        new THREE.Vector2(0.02, -0.12),
        new THREE.Vector2(0.11, -0.13),
        new THREE.Vector2(0.16, -0.06),
        new THREE.Vector2(0.17, 0.04),
        new THREE.Vector2(0.12, 0.13),
        new THREE.Vector2(0.02, 0.15),
      ];
      const burgerProfile = [
        new THREE.Vector2(0.02, -0.14),
        new THREE.Vector2(0.16, -0.13),
        new THREE.Vector2(0.175, -0.03),
        new THREE.Vector2(0.165, 0.08),
        new THREE.Vector2(0.02, 0.14),
      ];
      const pizzaProfile = [
        new THREE.Vector2(0.01, -0.04),
        new THREE.Vector2(0.20, -0.04),
        new THREE.Vector2(0.21, 0.03),
        new THREE.Vector2(0.17, 0.02),
        new THREE.Vector2(0.01, 0.02),
      ];

      const geometry = {
        TOMATO: new THREE.LatheGeometry(tomatoProfile, 16),
        TOMATO_PASTE: new THREE.LatheGeometry(canProfile, 16),
        ORANGE: new THREE.LatheGeometry(orangeProfile, 16),
        ORANGE_JUICE: new THREE.LatheGeometry(juiceBottleProfile, 14),
        CORN: new THREE.LatheGeometry(cornProfile, 12),
        POPCORN: new THREE.LatheGeometry(popcornProfile, 16),
        CHICKEN_FEED: new THREE.LatheGeometry(sackProfile, 14),
        EGG: new THREE.LatheGeometry(eggProfile, 16),
        WHEAT: new THREE.LatheGeometry(wheatProfile, 10),
        BREAD: new THREE.LatheGeometry(loafProfile, 16),
        BURGER: new THREE.LatheGeometry(burgerProfile, 16),
        PIZZA: new THREE.LatheGeometry(pizzaProfile, 20),
      }[itemId] ?? new THREE.DodecahedronGeometry(0.17, 1);

      geometry.userData.sharedAsset = true;
      this.itemGeometry.set(itemId, geometry);
    }
    return this.itemGeometry.get(itemId);
  }

  getItemMaterial(itemId) {
    if (!this.itemMaterials.has(itemId)) {
      let material;

      if (itemId === 'TOMATO_PASTE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#bdc3c7'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 36, 256, 184);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 34, 256, 5); ctx.fillRect(0, 217, 256, 5);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('SALÇA', 128, 115);
        ctx.font = 'bold 28px Fredoka, sans-serif'; ctx.fillText('EV YAPIMI', 128, 165);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35, metalness: 0.3 });
      } else if (itemId === 'POPCORN') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        for (let x = 0; x < 256; x += 32) {
          ctx.fillStyle = (x / 32) % 2 === 0 ? '#e74c3c' : '#ffffff';
          ctx.fillRect(x, 48, 32, 208);
        }
        ctx.fillStyle = '#f5cd79'; ctx.fillRect(0, 0, 256, 55);
        ctx.fillStyle = '#f1c40f';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath(); ctx.arc(i * 34 + 17, 26, 18, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#2980b9'; ctx.beginPath(); ctx.arc(128, 140, 48, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f1c40f'; ctx.font = 'bold 22px Fredoka, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('POPCORN', 128, 140);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'ORANGE_JUICE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 256);
        grad.addColorStop(0, '#f39c12'); grad.addColorStop(1, '#f1c40f');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(128, 130, 45, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e67e22'; ctx.beginPath(); ctx.arc(128, 130, 40, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('MEYVE', 128, 60); ctx.fillText('SUYU', 128, 205);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35 });
      } else if (itemId === 'BURGER') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e58e26'; ctx.fillRect(0, 0, 256, 95);
        ctx.fillStyle = '#fffdf0';
        for (let i = 0; i < 20; i++) ctx.fillRect(20 + (i * 37) % 216, 20 + (i * 23) % 65, 4, 3);
        ctx.fillStyle = '#2ecc71'; ctx.fillRect(0, 95, 256, 24);
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 119, 256, 22);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 141, 256, 20);
        ctx.fillStyle = '#4a2711'; ctx.fillRect(0, 161, 256, 42);
        ctx.fillStyle = '#e58e26'; ctx.fillRect(0, 203, 256, 53);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'PIZZA') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#d35400'; ctx.beginPath(); ctx.arc(128, 128, 126, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f9f6e8'; ctx.beginPath(); ctx.arc(128, 128, 98, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#96281b';
        for (let i = 0; i < 6; i++) {
          const angle = i * Math.PI / 3;
          ctx.beginPath(); ctx.arc(128 + Math.cos(angle) * 55, 128 + Math.sin(angle) * 55, 18, 0, Math.PI * 2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(128, 128, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#27ae60';
        for (let i = 0; i < 14; i++) ctx.fillRect(50 + (i * 47) % 156, 50 + (i * 39) % 156, 6, 6);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.45 });
      } else if (itemId === 'CHICKEN_FEED') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#d4a373'; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#c29263'; ctx.lineWidth = 2;
        for (let p = 0; p < 256; p += 16) {
          ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(256, p); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 256); ctx.stroke();
        }
        ctx.fillStyle = '#5c3a21'; ctx.fillRect(0, 185, 256, 16);
        ctx.fillStyle = '#3e2723'; ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('TAVUK YEMİ', 128, 120);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.85 });
      } else if (itemId === 'BREAD') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const bg = ctx.createLinearGradient(0, 0, 256, 0);
        bg.addColorStop(0, '#c27c38'); bg.addColorStop(0.5, '#e09852'); bg.addColorStop(1, '#c27c38');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f8f9fa'; ctx.fillRect(0, 30, 256, 8); ctx.fillRect(0, 120, 256, 12);
        ctx.fillStyle = '#7a3e14';
        for (let i = 0; i < 4; i++) ctx.fillRect(30 + i * 55, 60, 35, 130);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7 });
      } else if (itemId === 'CORN') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f39c12';
        for (let r = 0; r < 256; r += 16) {
          for (let c = 0; c < 256; c += 16) if ((r / 16 + c / 16) % 2 === 0) ctx.fillRect(c, r, 15, 15);
        }
        ctx.fillStyle = '#27ae60';
        ctx.beginPath(); ctx.moveTo(0, 256); ctx.lineTo(60, 120); ctx.lineTo(0, 0); ctx.fill();
        ctx.beginPath(); ctx.moveTo(256, 256); ctx.lineTo(196, 120); ctx.lineTo(256, 0); ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.55 });
      } else if (itemId === 'TOMATO') {
        material = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.22, metalness: 0.05 });
      } else if (itemId === 'ORANGE') {
        material = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.42 });
      } else if (itemId === 'EGG') {
        material = new THREE.MeshStandardMaterial({ color: 0xfffcf2, roughness: 0.35 });
      } else if (itemId === 'WHEAT') {
        material = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.65 });
      } else {
        material = new THREE.MeshStandardMaterial({ color: ITEMS[itemId]?.color ?? 0x58cc02, roughness: 0.5 });
      }

      material.userData.sharedAsset = true;
      this.itemMaterials.set(itemId, material);
    }
    return this.itemMaterials.get(itemId);
  }
}

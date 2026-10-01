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
      const tartProfile = [
        new THREE.Vector2(0.01, -0.06),
        new THREE.Vector2(0.165, -0.06),
        new THREE.Vector2(0.19, 0.035),
        new THREE.Vector2(0.175, 0.05),
        new THREE.Vector2(0.13, 0.07),
        new THREE.Vector2(0.01, 0.075),
      ];
      const appleProfile = [
        new THREE.Vector2(0.015, -0.14),
        new THREE.Vector2(0.11, -0.13),
        new THREE.Vector2(0.17, -0.02),
        new THREE.Vector2(0.175, 0.08),
        new THREE.Vector2(0.12, 0.15),
        new THREE.Vector2(0.02, 0.13),
      ];
      const bananaProfile = [
        new THREE.Vector2(0.01, -0.22),
        new THREE.Vector2(0.045, -0.18),
        new THREE.Vector2(0.08, -0.04),
        new THREE.Vector2(0.082, 0.06),
        new THREE.Vector2(0.045, 0.16),
        new THREE.Vector2(0.01, 0.22),
      ];
      const strawberryProfile = [
        new THREE.Vector2(0.01, -0.17),
        new THREE.Vector2(0.07, -0.10),
        new THREE.Vector2(0.13, 0.02),
        new THREE.Vector2(0.14, 0.10),
        new THREE.Vector2(0.08, 0.16),
        new THREE.Vector2(0.01, 0.17),
      ];
      const watermelonProfile = [
        new THREE.Vector2(0.01, -0.20),
        new THREE.Vector2(0.14, -0.17),
        new THREE.Vector2(0.21, -0.02),
        new THREE.Vector2(0.21, 0.05),
        new THREE.Vector2(0.14, 0.18),
        new THREE.Vector2(0.01, 0.20),
      ];
      const carrotProfile = [
        new THREE.Vector2(0.01, -0.22),
        new THREE.Vector2(0.04, -0.15),
        new THREE.Vector2(0.08, 0.05),
        new THREE.Vector2(0.09, 0.14),
        new THREE.Vector2(0.03, 0.19),
        new THREE.Vector2(0.01, 0.21),
      ];
      const potatoProfile = [
        new THREE.Vector2(0.02, -0.14),
        new THREE.Vector2(0.12, -0.11),
        new THREE.Vector2(0.16, 0.02),
        new THREE.Vector2(0.14, 0.12),
        new THREE.Vector2(0.02, 0.14),
      ];
      const lettuceProfile = [
        new THREE.Vector2(0.02, -0.14),
        new THREE.Vector2(0.15, -0.10),
        new THREE.Vector2(0.20, 0.02),
        new THREE.Vector2(0.18, 0.12),
        new THREE.Vector2(0.08, 0.16),
        new THREE.Vector2(0.02, 0.16),
      ];
      const colaProfile = [
        new THREE.Vector2(0.01, -0.20),
        new THREE.Vector2(0.08, -0.19),
        new THREE.Vector2(0.085, -0.06),
        new THREE.Vector2(0.075, 0.02),
        new THREE.Vector2(0.085, 0.08),
        new THREE.Vector2(0.045, 0.15),
        new THREE.Vector2(0.035, 0.20),
        new THREE.Vector2(0.01, 0.21),
      ];
      const waterProfile = [
        new THREE.Vector2(0.01, -0.20),
        new THREE.Vector2(0.075, -0.19),
        new THREE.Vector2(0.08, 0.08),
        new THREE.Vector2(0.04, 0.15),
        new THREE.Vector2(0.035, 0.20),
        new THREE.Vector2(0.01, 0.21),
      ];
      const baguetteProfile = [
        new THREE.Vector2(0.01, -0.26),
        new THREE.Vector2(0.05, -0.23),
        new THREE.Vector2(0.065, 0.0),
        new THREE.Vector2(0.05, 0.23),
        new THREE.Vector2(0.01, 0.26),
      ];
      const muffinProfile = [
        new THREE.Vector2(0.01, -0.12),
        new THREE.Vector2(0.09, -0.11),
        new THREE.Vector2(0.13, 0.02),
        new THREE.Vector2(0.16, 0.06),
        new THREE.Vector2(0.14, 0.13),
        new THREE.Vector2(0.01, 0.15),
      ];
      const jamProfile = [
        new THREE.Vector2(0.01, -0.14),
        new THREE.Vector2(0.11, -0.14),
        new THREE.Vector2(0.11, 0.08),
        new THREE.Vector2(0.09, 0.11),
        new THREE.Vector2(0.115, 0.13),
        new THREE.Vector2(0.01, 0.14),
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
        FLOUR: new THREE.BoxGeometry(0.24, 0.32, 0.18),
        BREAD: new THREE.LatheGeometry(loafProfile, 16),
        ORANGE_TART: new THREE.LatheGeometry(tartProfile, 18),
        BURGER: new THREE.LatheGeometry(burgerProfile, 16),
        PIZZA: new THREE.LatheGeometry(pizzaProfile, 20),
        MILK: new THREE.BoxGeometry(0.2, 0.36, 0.2),
        CEREAL: new THREE.BoxGeometry(0.24, 0.36, 0.12),
        CHIPS: new THREE.BoxGeometry(0.22, 0.32, 0.14),
        CANNED_SOUP: new THREE.LatheGeometry(canProfile, 16),
        JAM: new THREE.LatheGeometry(jamProfile, 16),
        APPLE: new THREE.LatheGeometry(appleProfile, 16),
        BANANA: new THREE.LatheGeometry(bananaProfile, 14),
        STRAWBERRY: new THREE.LatheGeometry(strawberryProfile, 16),
        WATERMELON: new THREE.LatheGeometry(watermelonProfile, 18),
        CARROT: new THREE.LatheGeometry(carrotProfile, 14),
        POTATO: new THREE.LatheGeometry(potatoProfile, 14),
        LETTUCE: new THREE.LatheGeometry(lettuceProfile, 16),
        STEAK: new THREE.BoxGeometry(0.28, 0.06, 0.2),
        CHEESE: new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16),
        DETERGENT: new THREE.BoxGeometry(0.22, 0.32, 0.15),
        COLA: new THREE.LatheGeometry(colaProfile, 16),
        WATER: new THREE.LatheGeometry(waterProfile, 16),
        BAGUETTE: new THREE.LatheGeometry(baguetteProfile, 14),
        CHOCO_DONUT: new THREE.TorusGeometry(0.12, 0.055, 12, 24),
        STRAWBERRY_DONUT: new THREE.TorusGeometry(0.12, 0.055, 12, 24),
        MUFFIN: new THREE.LatheGeometry(muffinProfile, 16),
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
      } else if (itemId === 'FLOUR') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f5deb3'; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#2980b9'; ctx.lineWidth = 6;
        ctx.strokeRect(16, 16, 224, 224);
        ctx.fillStyle = '#2980b9';
        ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('UN • FLOUR', 128, 100);
        ctx.font = 'bold 24px Fredoka, sans-serif';
        ctx.fillText('100% DOĞAL', 128, 155);
        ctx.font = '18px Fredoka, sans-serif';
        ctx.fillText('1 KG', 128, 195);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
      } else if (itemId === 'ORANGE_TART') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e67e22'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f39c12'; ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          ctx.beginPath(); ctx.arc(128 + Math.cos(a) * 60, 128 + Math.sin(a) * 60, 14, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#d35400'; ctx.beginPath(); ctx.arc(128, 128, 28, 0, Math.PI * 2); ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35 });
      } else if (itemId === 'MILK') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#3498db'; ctx.fillRect(0, 0, 256, 90); ctx.fillRect(0, 220, 256, 36);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('SÜT', 128, 55);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 24px Fredoka, sans-serif';
        ctx.fillText('TAZE PASTEURİZE', 128, 140);
        ctx.font = 'bold 20px Fredoka, sans-serif'; ctx.fillText('1 LİTRE', 128, 180);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 });
      } else if (itemId === 'CEREAL') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 20, 256, 70);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('MISIR GEVREĞİ', 128, 65);
        ctx.fillStyle = '#e67e22'; ctx.beginPath(); ctx.arc(128, 160, 50, 0, Math.PI); ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.4 });
      } else if (itemId === 'CHIPS') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f39c12'; ctx.fillRect(0, 100, 256, 60);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 38px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('CİPS', 128, 142);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.25, metalness: 0.4 });
      } else if (itemId === 'JAM') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#8e1b1b'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(20, 70, 216, 116);
        ctx.fillStyle = '#c0392b'; ctx.font = 'bold 28px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('ÇİLEK REÇELİ', 128, 135);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.2 });
      } else if (itemId === 'DETERGENT') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2980b9'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#2ecc71'; ctx.fillRect(0, 130, 256, 80);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 32px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('DETERJAN', 128, 90);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35 });
      } else if (itemId === 'COLA') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2c1e14'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#e74c3c'; ctx.fillRect(0, 90, 256, 75);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('COLA', 128, 142);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.25 });
      } else if (itemId === 'WATER') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#74b9ff'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#0984e3'; ctx.fillRect(0, 100, 256, 60);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 36px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('SU • WATER', 128, 142);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.15, transparent: true, opacity: 0.85 });
      } else if (itemId === 'CHOCO_DONUT') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#4a2711'; ctx.fillRect(0, 0, 256, 256);
        const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#ffffff'];
        for (let i = 0; i < 40; i++) {
          ctx.fillStyle = colors[i % colors.length];
          ctx.fillRect((i * 37) % 240, (i * 29) % 240, 8, 4);
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 });
      } else if (itemId === 'STRAWBERRY_DONUT') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff7675'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 30; i++) ctx.fillRect((i * 43) % 240, (i * 31) % 240, 6, 4);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.25 });
      } else if (itemId === 'WATERMELON') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        for (let x = 0; x < 256; x += 32) {
          ctx.fillStyle = (x / 32) % 2 === 0 ? '#1b4d3e' : '#2ecc71';
          ctx.fillRect(x, 0, 32, 256);
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35 });
      } else if (itemId === 'TOMATO') {
        material = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.22, metalness: 0.05 });
      } else if (itemId === 'ORANGE') {
        material = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.42 });
      } else if (itemId === 'EGG') {
        material = new THREE.MeshStandardMaterial({ color: 0xfffcf2, roughness: 0.35 });
      } else if (itemId === 'WHEAT') {
        material = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.65 });
      } else if (itemId === 'CANNED_SOUP') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#bdc3c7'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 32, 256, 96);
        ctx.fillStyle = '#f8f9fa'; ctx.fillRect(0, 128, 256, 96);
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 30, 256, 4); ctx.fillRect(0, 222, 256, 4);
        ctx.fillStyle = '#f1c40f'; ctx.beginPath(); ctx.arc(128, 128, 24, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 30px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('ÇORBA', 128, 90);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px Fredoka, sans-serif';
        ctx.fillText('SOUP', 128, 185);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35, metalness: 0.3 });
      } else if (itemId === 'STEAK') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1f2f6'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#96281b'; ctx.beginPath();
        ctx.roundRect(24, 24, 208, 208, 32); ctx.fill();
        ctx.strokeStyle = '#fadbd8'; ctx.lineWidth = 6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(45, 70); ctx.bezierCurveTo(90, 80, 140, 60, 200, 85); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(55, 140); ctx.bezierCurveTo(110, 130, 150, 160, 210, 145); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(80, 180); ctx.bezierCurveTo(120, 195, 160, 180, 195, 190); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.fillRect(130, 160, 95, 65);
        ctx.fillStyle = '#27ae60'; ctx.fillRect(130, 160, 95, 14);
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('100% DANA ETİ', 177, 171);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 12px sans-serif';
        ctx.fillText('GBLB KASAP', 177, 190);
        ctx.font = '9px sans-serif'; ctx.fillText('280 G • FRESH', 177, 206);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.4, metalness: 0.1 });
      } else if (itemId === 'CHEESE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f39c12'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#c0392b'; ctx.fillRect(0, 0, 256, 22); ctx.fillRect(0, 234, 256, 22);
        const holes = [[60, 70, 18], [180, 65, 24], [120, 130, 22], [50, 180, 26], [190, 175, 20], [130, 200, 14], [90, 100, 12]];
        for (const [hx, hy, hr] of holes) {
          ctx.fillStyle = '#d68910'; ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#b9770e'; ctx.beginPath(); ctx.arc(hx - 2, hy - 2, hr * 0.7, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(128, 128, 38, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#d35400'; ctx.beginPath(); ctx.arc(128, 128, 34, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 14px Fredoka, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('GOUDA', 128, 124);
        ctx.font = '10px Fredoka, sans-serif'; ctx.fillText('CHEESE', 128, 138);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'BAGUETTE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const bg = ctx.createLinearGradient(0, 0, 256, 0);
        bg.addColorStop(0, '#b9770e'); bg.addColorStop(0.5, '#e59866'); bg.addColorStop(1, '#b9770e');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#f5cba7'; ctx.strokeStyle = '#7e5109'; ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
          const y = 35 + i * 46;
          ctx.beginPath();
          ctx.ellipse(128, y, 70, 14, -0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let i = 0; i < 50; i++) {
          ctx.fillRect((i * 37) % 250, (i * 29) % 250, 4, 3);
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
      } else if (itemId === 'APPLE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(100, 100, 20, 128, 128, 128);
        grad.addColorStop(0, '#ff4757'); grad.addColorStop(0.7, '#c0392b'); grad.addColorStop(1, '#781515');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = 'rgba(241, 196, 15, 0.25)';
        for (let i = 0; i < 8; i++) ctx.fillRect(30 + i * 26, 0, 8, 256);
        ctx.fillStyle = '#27ae60'; ctx.beginPath();
        ctx.ellipse(140, 30, 22, 10, 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#4a2711'; ctx.fillRect(124, 10, 8, 25);
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.22, metalness: 0.05 });
      } else if (itemId === 'BANANA') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f1c40f'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#2ecc71'; ctx.fillRect(0, 0, 256, 32); ctx.fillRect(0, 226, 256, 30);
        ctx.fillStyle = '#5c3d2e'; ctx.fillRect(0, 0, 256, 16); ctx.fillRect(0, 244, 256, 12);
        ctx.fillStyle = 'rgba(92, 61, 46, 0.6)';
        for (let i = 0; i < 25; i++) {
          ctx.beginPath();
          ctx.arc((i * 47) % 240 + 8, (i * 31) % 180 + 38, (i % 3) + 2, 0, Math.PI * 2);
          ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.45 });
      } else if (itemId === 'CARROT') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#e67e22'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#27ae60'; ctx.fillRect(0, 0, 256, 42);
        ctx.strokeStyle = '#d35400'; ctx.lineWidth = 3;
        for (let y = 60; y < 240; y += 22) {
          ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(236, y); ctx.stroke();
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5 });
      } else if (itemId === 'LETTUCE') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#27ae60'; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#abebc6'; ctx.lineWidth = 5; ctx.lineCap = 'round';
        for (let i = 0; i < 6; i++) {
          const x = 35 + i * 36;
          ctx.beginPath(); ctx.moveTo(x, 240); ctx.quadraticCurveTo(x + 20, 120, x, 20); ctx.stroke();
        }
        ctx.fillStyle = '#58d68d';
        for (let i = 0; i < 16; i++) {
          ctx.beginPath(); ctx.arc((i * 41) % 240 + 8, (i * 33) % 240 + 8, 18, 0, Math.PI * 2); ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.65 });
      } else if (itemId === 'POTATO') {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#a0522d'; ctx.fillRect(0, 0, 256, 256);
        ctx.fillStyle = '#873600';
        for (let i = 0; i < 30; i++) {
          ctx.beginPath(); ctx.arc((i * 43) % 240 + 8, (i * 29) % 240 + 8, (i % 4) + 2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = '#4a235a';
        const eyes = [[60, 80], [170, 70], [120, 140], [70, 190], [180, 180]];
        for (const [ex, ey] of eyes) {
          ctx.beginPath(); ctx.ellipse(ex, ey, 7, 3, 0.3, 0, Math.PI * 2); ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);
        material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
      } else if (itemId === 'STRAWBERRY') {
        material = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.35 });
      } else if (itemId === 'MUFFIN') {
        material = new THREE.MeshStandardMaterial({ color: 0xc27c38, roughness: 0.65 });
      } else {
        material = new THREE.MeshStandardMaterial({ color: ITEMS[itemId]?.color ?? 0x58cc02, roughness: 0.5 });
      }

      material.userData.sharedAsset = true;
      this.itemMaterials.set(itemId, material);
    }
    return this.itemMaterials.get(itemId);
  }
}

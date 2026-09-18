import * as THREE from 'three';
import { ITEM_TYPES } from '../config/GameConfig.js';

export class CarryStack {
  constructor(parentMesh, maxCapacity = 6) {
    this.parentMesh = parentMesh;
    this.maxCapacity = maxCapacity;
    this.items = []; // array of { type: ITEM_TYPES.*, mesh: THREE.Mesh }
    this.wobbleAngle = 0;
    this.itemSpacing = 0.42;

    this.group = new THREE.Group();
    this.group.position.set(0, 0.8, -0.35); // positioned behind player's back
    this.parentMesh.add(this.group);
  }

  attachToParent(newParentMesh) {
    if (this.parentMesh && this.group) {
      this.parentMesh.remove(this.group);
    }
    this.parentMesh = newParentMesh;
    if (this.parentMesh && this.group) {
      this.parentMesh.add(this.group);
    }
  }

  canAdd() {
    return this.items.length < this.maxCapacity;
  }

  getCount() {
    return this.items.length;
  }

  addItem(itemType) {
    if (!this.canAdd()) return false;

    const mesh = this.createItemMesh(itemType);
    const index = this.items.length;
    mesh.position.set(0, index * this.itemSpacing, 0);

    // Spawn pop animation
    mesh.scale.set(0.1, 0.1, 0.1);
    this.group.add(mesh);
    this.items.push({ type: itemType, mesh });

    // Animate scale up
    let progress = 0;
    const animatePop = () => {
      progress += 0.15;
      const s = 1.0 + Math.sin(progress * Math.PI) * 0.3;
      mesh.scale.set(s, s, s);
      if (progress < 1) {
        requestAnimationFrame(animatePop);
      } else {
        mesh.scale.set(1, 1, 1);
      }
    };
    animatePop();

    return true;
  }

  popItem(filterType = null) {
    if (this.items.length === 0) return null;

    if (!filterType) {
      const top = this.items.pop();
      this.group.remove(top.mesh);
      return top.type;
    }

    const index = this.items.findIndex(i => i.type.id === filterType.id);
    if (index !== -1) {
      const [removed] = this.items.splice(index, 1);
      this.group.remove(removed.mesh);
      this.repositionItems();
      return removed.type;
    }

    return null;
  }

  repositionItems() {
    this.items.forEach((item, idx) => {
      item.mesh.position.y = idx * this.itemSpacing;
    });
  }

  createItemMesh(itemType) {
    const group = new THREE.Group();

    if (itemType.id === 'TOMATO') {
      const geo = new THREE.SphereGeometry(0.2, 8, 8);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.3 });
      const tomato = new THREE.Mesh(geo, mat);
      tomato.castShadow = true;

      // Green stem
      const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 5);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.18;
      group.add(tomato, stem);
    } else if (itemType.id === 'TOMATO_PASTE') {
      // Tin can / glass jar
      const geo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 12);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.4 });
      const jar = new THREE.Mesh(geo, mat);
      jar.castShadow = true;

      // Gold lid
      const lidGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.06, 12);
      const lidMat = new THREE.MeshStandardMaterial({ color: itemType.accentColor, metalness: 0.6 });
      const lid = new THREE.Mesh(lidGeo, lidMat);
      lid.position.y = 0.18;
      group.add(jar, lid);
    } else if (itemType.id === 'ORANGE') {
      const geo = new THREE.SphereGeometry(0.2, 8, 8);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.4 });
      const orange = new THREE.Mesh(geo, mat);
      orange.castShadow = true;
      group.add(orange);
    } else if (itemType.id === 'ORANGE_JUICE') {
      // Bottle
      const geo = new THREE.CylinderGeometry(0.14, 0.16, 0.4, 10);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.2 });
      const bottle = new THREE.Mesh(geo, mat);
      bottle.castShadow = true;

      // Cap
      const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 8);
      const capMat = new THREE.MeshStandardMaterial({ color: itemType.accentColor });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 0.22;
      group.add(bottle, cap);
    } else {
      const geo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color });
      const box = new THREE.Mesh(geo, mat);
      box.castShadow = true;
      group.add(box);
    }

    return group;
  }

  update(delta, isMoving) {
    if (isMoving && this.items.length > 0) {
      this.wobbleAngle += delta * 9.0;
      const sway = Math.sin(this.wobbleAngle) * 0.08;
      this.group.rotation.z = sway;
      this.group.rotation.x = Math.abs(Math.cos(this.wobbleAngle)) * 0.05;
    } else {
      this.group.rotation.z = THREE.MathUtils.lerp(this.group.rotation.z, 0, delta * 8);
      this.group.rotation.x = THREE.MathUtils.lerp(this.group.rotation.x, 0, delta * 8);
    }
  }
}

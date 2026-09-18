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
    } else if (itemType.id === 'CORN') {
      const geo = new THREE.CylinderGeometry(0.1, 0.12, 0.38, 6);
      const mat = new THREE.MeshStandardMaterial({ color: itemType.color, roughness: 0.3 });
      const corn = new THREE.Mesh(geo, mat);
      corn.castShadow = true;

      const huskGeo = new THREE.ConeGeometry(0.14, 0.22, 4);
      const huskMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
      const husk = new THREE.Mesh(huskGeo, huskMat);
      husk.position.y = -0.15;
      group.add(corn, husk);
    } else if (itemType.id === 'POPCORN') {
      const boxGeo = new THREE.BoxGeometry(0.28, 0.32, 0.28);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.castShadow = true;

      const popTop = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf6e58d }));
      popTop.position.y = 0.16;
      group.add(box, popTop);
    } else if (itemType.id === 'CHICKEN_FEED') {
      const bagGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.36, 8);
      const bagMat = new THREE.MeshStandardMaterial({ color: 0xd4ac0d, roughness: 0.8 }); // Burlap / grain bag
      const bag = new THREE.Mesh(bagGeo, bagMat);
      bag.castShadow = true;

      const tie = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 6, 12), new THREE.MeshStandardMaterial({ color: 0x795548 }));
      tie.rotation.x = Math.PI / 2;
      tie.position.y = 0.14;
      group.add(bag, tie);
    } else if (itemType.id === 'EGG') {
      const geo = new THREE.SphereGeometry(0.15, 8, 8);
      geo.scale(1, 1.3, 1);
      const mat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.2 });
      const egg = new THREE.Mesh(geo, mat);
      egg.castShadow = true;
      group.add(egg);
    } else if (itemType.id === 'WHEAT') {
      const geo = new THREE.ConeGeometry(0.16, 0.45, 6);
      const mat = new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.6 });
      const wheat = new THREE.Mesh(geo, mat);
      wheat.castShadow = true;
      group.add(wheat);
    } else if (itemType.id === 'BREAD') {
      const geo = new THREE.BoxGeometry(0.36, 0.22, 0.28);
      const mat = new THREE.MeshStandardMaterial({ color: 0xcd6133, roughness: 0.5 });
      const bread = new THREE.Mesh(geo, mat);
      bread.castShadow = true;
      group.add(bread);
    } else if (itemType.id === 'BURGER') {
      const bunMat = new THREE.MeshStandardMaterial({ color: 0xe67e22 });
      const meatMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
      const saladMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71 });

      const bunBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 10), bunMat);
      const meat = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.05, 10), meatMat);
      meat.position.y = 0.06;
      const salad = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 8), saladMat);
      salad.position.y = 0.1;
      const bunTop = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), bunMat);
      bunTop.position.y = 0.12;

      group.add(bunBottom, meat, salad, bunTop);
    } else if (itemType.id === 'PIZZA') {
      const plateMat = new THREE.MeshStandardMaterial({ color: 0xd63031 });
      const crustMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f });
      const crust = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 12), crustMat);
      const cheese = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12), plateMat);
      cheese.position.y = 0.01;
      group.add(crust, cheese);
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

import * as THREE from 'three';
import { CarryStack } from '../items/CarryStack.js';
import { ITEM_TYPES } from '../config/GameConfig.js';

export const WORKER_TYPES = {
  CASHIER: 'CASHIER',
  HARVESTER: 'HARVESTER',
  FACTORY_FEEDER: 'FACTORY_FEEDER',
  FARM_CARETAKER: 'FARM_CARETAKER',
  CHEF: 'CHEF',
  WAITER: 'WAITER'
};

export class Worker {
  constructor(scene, type = WORKER_TYPES.CASHIER, startPos = new THREE.Vector3(0, 0, 0)) {
    this.scene = scene;
    this.type = type;
    this.position = startPos.clone();
    this.speed = 5.0;

    this.state = 'IDLE';
    this.target = null;
    this.walkCycle = 0;

    this.mesh = this.createWorkerMesh();
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);

    this.stack = new CarryStack(this.mesh, 6);
  }

  createWorkerMesh() {
    const group = new THREE.Group();

    let uniformColor = 0x3498db; // Blue for Cashier
    let hatColor = 0x2980b9;

    if (this.type === WORKER_TYPES.HARVESTER) {
      uniformColor = 0x27ae60; // Green farmer
      hatColor = 0x1e824c;
    } else if (this.type === WORKER_TYPES.FACTORY_FEEDER) {
      uniformColor = 0xe67e22; // Orange engineer
      hatColor = 0xd35400;
    } else if (this.type === WORKER_TYPES.FARM_CARETAKER) {
      uniformColor = 0xf39c12; // Gold caretaker
      hatColor = 0xe67e22;
    } else if (this.type === WORKER_TYPES.CHEF) {
      uniformColor = 0xffffff; // White chef coat
      hatColor = 0xffffff;
    } else if (this.type === WORKER_TYPES.WAITER) {
      uniformColor = 0x2c3e50; // Black/Navy tuxedo
      hatColor = 0x34495e;
    }

    // 1. Body
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.26, 0.65, 10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: uniformColor, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.6;
    body.castShadow = true;
    group.add(body);

    // 2. Head
    const headGeo = new THREE.SphereGeometry(0.28, 10, 10);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.18;
    head.castShadow = true;
    group.add(head);

    // 3. Hat
    if (this.type === WORKER_TYPES.CHEF) {
      // Tall Chef Toque
      const toqueGeo = new THREE.CylinderGeometry(0.3, 0.26, 0.45, 10);
      const toqueMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const toque = new THREE.Mesh(toqueGeo, toqueMat);
      toque.position.y = 1.55;
      group.add(toque);
    } else {
      // Cap
      const capGeo = new THREE.CylinderGeometry(0.3, 0.32, 0.12, 10);
      const capMat = new THREE.MeshStandardMaterial({ color: hatColor });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 1.4;
      group.add(cap);
    }

    // 4. Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
    this.leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.32, 6), legMat);
    this.leftLeg.position.set(-0.14, 0.16, 0);
    this.leftLeg.castShadow = true;

    this.rightLeg = this.leftLeg.clone();
    this.rightLeg.position.x = 0.14;

    group.add(this.leftLeg, this.rightLeg);
    return group;
  }

  update(delta, context = {}) {
    const { farmPlots = [], shelves = [], machines = [], coops = [], ovens = [], kitchens = [], tables = [], register = null } = context;

    switch (this.type) {
      case WORKER_TYPES.CASHIER:
        this.updateCashier(delta, register);
        break;
      case WORKER_TYPES.HARVESTER:
        this.updateHarvester(delta, farmPlots, shelves);
        break;
      case WORKER_TYPES.FACTORY_FEEDER:
        this.updateFactoryFeeder(delta, farmPlots, machines, ovens, shelves);
        break;
      case WORKER_TYPES.FARM_CARETAKER:
        this.updateFarmCaretaker(delta, farmPlots, coops, shelves);
        break;
      case WORKER_TYPES.CHEF:
        this.updateChef(delta, kitchens, ovens);
        break;
      case WORKER_TYPES.WAITER:
        this.updateWaiter(delta, kitchens, tables);
        break;
    }
  }

  updateCashier(delta, register) {
    if (!register) return;
    this.mesh.position.lerp(register.cashierZonePos, delta * 8.0);
    this.mesh.rotation.y = 0;
    register.isCashierPresent = true;

    this.walkCycle += delta * 4.0;
    this.mesh.position.y = Math.abs(Math.sin(this.walkCycle)) * 0.04;
  }

  updateHarvester(delta, farmPlots, shelves) {
    let isMoving = false;

    if (this.stack.getCount() >= 4) {
      // Go deliver to shelf
      const top = this.stack.items[this.stack.items.length - 1]?.type;
      const targetShelf = shelves.find(s => s.acceptedType.id === top?.id && s.stock.length < s.capacity);
      if (targetShelf) {
        isMoving = true;
        this.walkTowards(targetShelf.position, delta, () => {
          const item = this.stack.popItem(targetShelf.acceptedType);
          if (item) targetShelf.addItem(item);
        });
      }
    } else {
      // Find ripe farm plot
      const ripeFarm = farmPlots.find(f => f.ripeCount > 0);
      if (ripeFarm) {
        isMoving = true;
        this.walkTowards(ripeFarm.position, delta, () => {
          ripeFarm.harvest({ stack: this.stack });
        });
      } else if (this.stack.getCount() > 0) {
        const top = this.stack.items[this.stack.items.length - 1]?.type;
        const targetShelf = shelves.find(s => s.acceptedType.id === top?.id && s.stock.length < s.capacity);
        if (targetShelf) {
          isMoving = true;
          this.walkTowards(targetShelf.position, delta, () => {
            const item = this.stack.popItem(targetShelf.acceptedType);
            if (item) targetShelf.addItem(item);
          });
        }
      }
    }

    this.animateLegs(isMoving, delta);
  }

  updateFactoryFeeder(delta, farmPlots, machines, ovens, shelves) {
    let isMoving = false;

    // 1. Check if holding finished product to shelf
    if (this.stack.getCount() > 0) {
      const top = this.stack.items[this.stack.items.length - 1]?.type;
      // Is it a raw material for machine?
      const needyMachine = machines.find(m => m.inputType.id === top?.id && m.inputStock < m.inputRequired * 2);
      if (needyMachine) {
        isMoving = true;
        this.walkTowards(needyMachine.inputZonePos, delta, () => {
          const item = this.stack.popItem(needyMachine.inputType);
          if (item) needyMachine.inputStock++;
        });
      } else {
        // Shelf delivery
        const targetShelf = shelves.find(s => s.acceptedType.id === top?.id && s.stock.length < s.capacity);
        if (targetShelf) {
          isMoving = true;
          this.walkTowards(targetShelf.position, delta, () => {
            const item = this.stack.popItem(targetShelf.acceptedType);
            if (item) targetShelf.addItem(item);
          });
        }
      }
    } else {
      // Collect from machine output or harvest raw goods
      const machineWithOutput = machines.find(m => m.outputStock.length > 0);
      if (machineWithOutput) {
        isMoving = true;
        this.walkTowards(machineWithOutput.outputZonePos, delta, () => {
          const item = machineWithOutput.outputStock.pop();
          const mesh = machineWithOutput.outputMeshes.pop();
          if (mesh) machineWithOutput.meshGroup.remove(mesh);
          if (item) this.stack.addItem(item);
        });
      } else {
        // Harvest tomato or orange for machine
        const rawFarm = farmPlots.find(f => (f.itemType.id === 'TOMATO' || f.itemType.id === 'ORANGE') && f.ripeCount > 0);
        if (rawFarm) {
          isMoving = true;
          this.walkTowards(rawFarm.position, delta, () => {
            rawFarm.harvest({ stack: this.stack });
          });
        }
      }
    }

    this.animateLegs(isMoving, delta);
  }

  updateFarmCaretaker(delta, farmPlots, coops, shelves) {
    let isMoving = false;

    if (this.stack.getCount() > 0) {
      const top = this.stack.items[this.stack.items.length - 1]?.type;
      if (top?.id === 'CORN') {
        const needyCoop = coops.find(c => c.feedStock < 4);
        if (needyCoop) {
          isMoving = true;
          this.walkTowards(needyCoop.inputZonePos, delta, () => {
            const c = this.stack.popItem(ITEM_TYPES.CORN);
            if (c) needyCoop.feedStock++;
          });
        }
      } else {
        // Shelf (Egg, Popcorn, Corn)
        const targetShelf = shelves.find(s => s.acceptedType.id === top?.id && s.stock.length < s.capacity);
        if (targetShelf) {
          isMoving = true;
          this.walkTowards(targetShelf.position, delta, () => {
            const item = this.stack.popItem(targetShelf.acceptedType);
            if (item) targetShelf.addItem(item);
          });
        }
      }
    } else {
      // Check coop egg output first
      const coopWithEggs = coops.find(c => c.eggStock.length > 0);
      if (coopWithEggs) {
        isMoving = true;
        this.walkTowards(coopWithEggs.outputZonePos, delta, () => {
          const egg = coopWithEggs.eggStock.pop();
          const mesh = coopWithEggs.eggMeshes.pop();
          if (mesh) coopWithEggs.meshGroup.remove(mesh);
          if (egg) this.stack.addItem(egg);
        });
      } else {
        // Harvest corn
        const cornFarm = farmPlots.find(f => f.itemType.id === 'CORN' && f.ripeCount > 0);
        if (cornFarm) {
          isMoving = true;
          this.walkTowards(cornFarm.position, delta, () => {
            cornFarm.harvest({ stack: this.stack });
          });
        }
      }
    }

    this.animateLegs(isMoving, delta);
  }

  updateChef(delta, kitchens, ovens) {
    // Stands near Kitchen grill station
    if (kitchens.length > 0) {
      const k = kitchens[0];
      this.mesh.position.lerp(new THREE.Vector3(k.position.x, 0, k.position.z - 1.2), delta * 8.0);
      this.mesh.rotation.y = 0;
      this.walkCycle += delta * 6.0;
      this.mesh.position.y = Math.abs(Math.sin(this.walkCycle)) * 0.05;
    }
  }

  updateWaiter(delta, kitchens, tables) {
    let isMoving = false;

    if (this.stack.getCount() > 0) {
      // Find table needing what waiter is carrying
      const top = this.stack.items[this.stack.items.length - 1]?.type;
      const targetTable = tables.find(t => t.isOccupied && !t.isEating && t.desiredMeal?.id === top?.id);
      if (targetTable) {
        isMoving = true;
        this.walkTowards(targetTable.position, delta, () => {
          const meal = this.stack.popItem(targetTable.desiredMeal);
          if (meal) targetTable.serveMeal(meal);
        });
      }
    } else {
      // Check if kitchen has ready meals
      const kWithMeal = kitchens.find(k => k.mealStock.length > 0);
      if (kWithMeal) {
        isMoving = true;
        this.walkTowards(kWithMeal.outputZonePos, delta, () => {
          const meal = kWithMeal.mealStock.pop();
          const mesh = kWithMeal.mealMeshes.pop();
          if (mesh) kWithMeal.meshGroup.remove(mesh);
          if (meal) this.stack.addItem(meal);
        });
      }
    }

    this.animateLegs(isMoving, delta);
  }

  animateLegs(isMoving, delta) {
    if (isMoving) {
      this.walkCycle += delta * 14.0;
      this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.6;
      this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.6;
      this.mesh.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.06;
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.mesh.position.y = 0;
    }
    this.stack.update(delta, isMoving);
  }

  walkTowards(targetPos, delta, onReached) {
    const dir = new THREE.Vector3().subVectors(targetPos, this.mesh.position);
    dir.y = 0;
    const dist = dir.length();

    if (dist < 0.4) {
      if (onReached) onReached();
      return;
    }

    dir.normalize();
    this.mesh.position.addScaledVector(dir, Math.min(this.speed * delta, dist));

    const targetAngle = Math.atan2(dir.x, dir.z);
    this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, targetAngle, delta * 12);
  }
}

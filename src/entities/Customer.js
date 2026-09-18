import * as THREE from 'three';
import { GAME_CONFIG, ITEM_TYPES } from '../config/GameConfig.js';
import { CarryStack } from '../items/CarryStack.js';

export const CUSTOMER_STATES = {
  IDLE: 'IDLE',
  ENTERING: 'ENTERING',
  BROWSING: 'BROWSING',
  PICKING: 'PICKING',
  QUEUEING: 'QUEUEING',
  PAYING: 'PAYING',
  GOING_TO_TABLE: 'GOING_TO_TABLE',
  SEATED: 'SEATED',
  LEAVING: 'LEAVING'
};

export class Customer {
  constructor(scene, startPos, desiredItemTypes = [], isRestaurantGuest = false) {
    this.scene = scene;
    this.desiredItemTypes = [...desiredItemTypes];
    this.isRestaurantGuest = isRestaurantGuest;
    this.targetShelf = null;
    this.targetTable = null;
    this.state = CUSTOMER_STATES.ENTERING;
    this.speed = GAME_CONFIG.CUSTOMER.walkSpeed;
    this.payDuration = GAME_CONFIG.CUSTOMER.payTime;
    this.payTimer = 0;
    this.queueIndex = 0;

    this.mesh = this.createCustomerMesh();
    this.mesh.position.copy(startPos);
    this.scene.add(this.mesh);

    this.stack = new CarryStack(this.mesh, 4);
    this.isFinished = false;
    this.walkCycle = 0;
  }

  createCustomerMesh() {
    const group = new THREE.Group();

    const shirtColors = [0x9b59b6, 0x1abc9c, 0xf39c12, 0xe84393, 0x00cec9, 0xd63031];
    const chosenColor = shirtColors[Math.floor(Math.random() * shirtColors.length)];

    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.26, 0.65, 10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: chosenColor, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.6;
    body.castShadow = true;
    group.add(body);

    const headGeo = new THREE.SphereGeometry(0.28, 10, 10);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.18;
    head.castShadow = true;
    group.add(head);

    const hairGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const hairColors = [0x2c3e50, 0x6d4c41, 0xdfe6e9, 0xf1c40f];
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColors[Math.floor(Math.random() * hairColors.length)] });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 1.25, -0.04);
    group.add(hair);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
    this.leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.32, 6), legMat);
    this.leftLeg.position.set(-0.14, 0.16, 0);
    this.leftLeg.castShadow = true;

    this.rightLeg = this.leftLeg.clone();
    this.rightLeg.position.x = 0.14;

    group.add(this.leftLeg, this.rightLeg);
    return group;
  }

  update(delta, shelves = [], register = null, tables = [], onCustomerPaidCallback) {
    const isMoving = this.state !== CUSTOMER_STATES.PAYING && this.state !== CUSTOMER_STATES.PICKING && this.state !== CUSTOMER_STATES.SEATED;

    switch (this.state) {
      case CUSTOMER_STATES.ENTERING:
        if (this.isRestaurantGuest && tables.length > 0) {
          // Walk to restaurant door (x = -37, z = 7)
          const restDoor = new THREE.Vector3(-37, 0, 7);
          this.walkTowards(restDoor, delta, () => {
            this.state = CUSTOMER_STATES.GOING_TO_TABLE;
          });
        } else {
          // Walk to supermarket door (x = 5, z = 7)
          const storeDoor = new THREE.Vector3(5, 0, 7);
          this.walkTowards(storeDoor, delta, () => {
            this.state = CUSTOMER_STATES.BROWSING;
          });
        }
        break;

      case CUSTOMER_STATES.GOING_TO_TABLE:
        // Find empty dining table
        const emptyTable = tables.find(t => !t.isOccupied);
        if (emptyTable) {
          this.targetTable = emptyTable;
          this.walkTowards(emptyTable.seatPos, delta, () => {
            this.state = CUSTOMER_STATES.SEATED;
            const desired = Math.random() > 0.5 ? ITEM_TYPES.BURGER : ITEM_TYPES.PIZZA;
            emptyTable.seatGuest(this, desired);
          });
        } else {
          // Wait near restaurant entrance or browse store
          this.state = CUSTOMER_STATES.BROWSING;
        }
        break;

      case CUSTOMER_STATES.SEATED:
        // Seated on chair facing table
        this.mesh.rotation.y = 0;
        break;

      case CUSTOMER_STATES.BROWSING:
        if (this.desiredItemTypes.length > 0) {
          const targetType = this.desiredItemTypes[0];
          const shelf = shelves.find(s => s.acceptedType.id === targetType.id && s.hasStock());
          if (shelf) {
            this.targetShelf = shelf;
            const approachPos = new THREE.Vector3(shelf.position.x, 0, shelf.position.z + 1.3);
            this.walkTowards(approachPos, delta, () => {
              this.state = CUSTOMER_STATES.PICKING;
            });
          } else {
            if (this.stack.getCount() > 0) {
              this.state = CUSTOMER_STATES.QUEUEING;
            }
          }
        } else {
          this.state = CUSTOMER_STATES.QUEUEING;
        }
        break;

      case CUSTOMER_STATES.PICKING:
        if (this.targetShelf && this.targetShelf.hasStock()) {
          const item = this.targetShelf.takeItem();
          if (item) {
            this.stack.addItem(item);
            this.desiredItemTypes.shift();
          }
        }
        if (this.desiredItemTypes.length > 0) {
          this.state = CUSTOMER_STATES.BROWSING;
        } else {
          this.state = CUSTOMER_STATES.QUEUEING;
        }
        break;

      case CUSTOMER_STATES.QUEUEING:
        if (!register) break;
        const queuePos = register.getQueuePosition(this.queueIndex);
        this.walkTowards(queuePos, delta, () => {
          if (this.queueIndex === 0) {
            this.state = CUSTOMER_STATES.PAYING;
          }
        });
        break;

      case CUSTOMER_STATES.PAYING:
        this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, Math.PI, delta * 8);

        if (register && register.isCashierPresent) {
          this.payTimer += delta;
          if (this.payTimer >= this.payDuration) {
            let totalAmount = 0;
            while (this.stack.getCount() > 0) {
              const item = this.stack.popItem();
              totalAmount += item.price;
            }

            register.spawnCoinBurst(totalAmount, onCustomerPaidCallback);
            this.state = CUSTOMER_STATES.LEAVING;
          }
        }
        break;

      case CUSTOMER_STATES.LEAVING:
        const exitX = this.isRestaurantGuest ? -37 : 5;
        const exitPos = new THREE.Vector3(exitX, 0, 16);
        this.walkTowards(exitPos, delta, () => {
          this.isFinished = true;
          this.scene.remove(this.mesh);
        });
        break;
    }

    // Legs animation
    if (isMoving) {
      this.walkCycle += delta * 12.0;
      this.leftLeg.rotation.x = Math.sin(this.walkCycle) * 0.5;
      this.rightLeg.rotation.x = -Math.sin(this.walkCycle) * 0.5;
      this.mesh.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.05;
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

    if (dist < 0.25) {
      if (onReached) onReached();
      return;
    }

    dir.normalize();
    this.mesh.position.addScaledVector(dir, Math.min(this.speed * delta, dist));

    const targetAngle = Math.atan2(dir.x, dir.z);
    this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, targetAngle, delta * 12);
  }
}

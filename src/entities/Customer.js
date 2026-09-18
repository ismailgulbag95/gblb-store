import * as THREE from 'three';
import { GAME_CONFIG, ITEM_TYPES } from '../config/GameConfig.js';
import { CarryStack } from '../items/CarryStack.js';

export const CUSTOMER_STATES = {
  IDLE: 'IDLE',
  ENTERING: 'ENTERING',
  GOING_TO_SHELF: 'GOING_TO_SHELF',
  WAITING_FOR_STOCK: 'WAITING_FOR_STOCK',
  PICKING: 'PICKING',
  QUEUEING: 'QUEUEING',
  PAYING: 'PAYING',
  GOING_TO_TABLE: 'GOING_TO_TABLE',
  WAITING_FOR_TABLE: 'WAITING_FOR_TABLE',
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
    this.shelfWaitIndex = 0;
    this.tableWaitIndex = 0;

    this.mesh = this.createCustomerMesh();
    this.mesh.position.copy(startPos);
    this.scene.add(this.mesh);

    this.stack = new CarryStack(this.mesh, 4);
    this.isFinished = false;
    this.walkCycle = 0;

    // Thought/Wish Bubble for current item
    this.thoughtBubble = this.createThoughtBubble();
    this.mesh.add(this.thoughtBubble);
    this.updateThoughtBubble();
  }

  createCustomerMesh() {
    const group = new THREE.Group();

    // Vibrant candy customer shirts
    const shirtColors = [
      0xff4757, // Bright Coral Red
      0xffa502, // Vivid Orange Gold
      0x2ed573, // Fresh Duo Green
      0x1e90ff, // Electric Blue
      0xa55eea, // Sweet Lilac Purple
      0xff6b81, // Bubblegum Pink
      0x00d2d3, // Bright Cyan
      0xffc048  // Sun Gold
    ];
    const chosenColor = shirtColors[Math.floor(Math.random() * shirtColors.length)];

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.26, 0.65, 10);
    const bodyMat = new THREE.MeshStandardMaterial({ color: chosenColor, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.6;
    body.castShadow = true;
    group.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.28, 10, 10);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.18;
    head.castShadow = true;
    group.add(head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const hairColors = [0x2c3e50, 0x6d4c41, 0xdfe6e9, 0xf1c40f, 0xb33939];
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColors[Math.floor(Math.random() * hairColors.length)] });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 1.25, -0.04);
    group.add(hair);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2d3436 });
    this.leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.32, 6), legMat);
    this.leftLeg.position.set(-0.14, 0.16, 0);
    this.leftLeg.castShadow = true;

    this.rightLeg = this.leftLeg.clone();
    this.rightLeg.position.x = 0.14;

    group.add(this.leftLeg, this.rightLeg);
    return group;
  }

  createThoughtBubble() {
    const group = new THREE.Group();
    group.position.set(0, 1.75, 0);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    this.bubbleCanvas = canvas;
    this.bubbleCtx = canvas.getContext('2d');

    this.bubbleTexture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: this.bubbleTexture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.65, 0.65, 0.65);
    group.add(sprite);

    group.visible = false;
    return group;
  }

  updateThoughtBubble() {
    if (!this.thoughtBubble || !this.bubbleCtx) return;

    if (this.desiredItemTypes.length === 0 || this.state === CUSTOMER_STATES.LEAVING || this.state === CUSTOMER_STATES.SEATED) {
      this.thoughtBubble.visible = false;
      return;
    }

    const currentItem = this.desiredItemTypes[0];
    const ctx = this.bubbleCtx;

    // Draw Thought Bubble on Canvas
    ctx.clearRect(0, 0, 128, 128);

    // Background circle
    ctx.beginPath();
    ctx.arc(64, 60, 48, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#2c3e50';
    ctx.stroke();

    // Small trail dots
    ctx.beginPath();
    ctx.arc(42, 114, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();

    // Item Emoji
    ctx.font = '52px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentItem.icon || '🛍️', 64, 62);

    this.bubbleTexture.needsUpdate = true;
    this.thoughtBubble.visible = true;
  }

  update(delta, shelves = [], register = null, tables = [], allCustomers = [], onCustomerPaidCallback) {
    const isMoving = this.state !== CUSTOMER_STATES.PAYING && 
                     this.state !== CUSTOMER_STATES.WAITING_FOR_STOCK && 
                     this.state !== CUSTOMER_STATES.WAITING_FOR_TABLE && 
                     this.state !== CUSTOMER_STATES.SEATED;

    // Soft Crowd Separation to avoid intersecting with other customers
    this.applyCrowdSeparation(allCustomers, delta);

    switch (this.state) {
      case CUSTOMER_STATES.ENTERING:
        if (this.isRestaurantGuest && tables.length > 0) {
          const restDoor = new THREE.Vector3(-37, 0, 6.5);
          this.walkTowards(restDoor, delta, () => {
            this.state = CUSTOMER_STATES.GOING_TO_TABLE;
          });
        } else {
          // Supermarket entrance door
          const storeDoor = new THREE.Vector3(5, 0, 6.5);
          this.walkTowards(storeDoor, delta, () => {
            this.chooseNextShelf(shelves);
          });
        }
        break;

      case CUSTOMER_STATES.GOING_TO_TABLE:
        const emptyTable = tables.find(t => !t.isOccupied);
        if (emptyTable) {
          this.targetTable = emptyTable;
          this.walkTowards(emptyTable.seatPos, delta, () => {
            this.state = CUSTOMER_STATES.SEATED;
            const desired = Math.random() > 0.5 ? ITEM_TYPES.BURGER : ITEM_TYPES.PIZZA;
            emptyTable.seatGuest(this, desired);
            this.thoughtBubble.visible = false;
          });
        } else {
          // Wait in line outside restaurant door
          this.state = CUSTOMER_STATES.WAITING_FOR_TABLE;
        }
        break;

      case CUSTOMER_STATES.WAITING_FOR_TABLE:
        // Stand in restaurant wait line
        const waitPos = new THREE.Vector3(-37, 0, 7.5 + this.tableWaitIndex * 0.85);
        this.walkTowards(waitPos, delta);

        // Check if a table opened up
        const freeTable = tables.find(t => !t.isOccupied);
        if (freeTable && this.tableWaitIndex === 0) {
          this.state = CUSTOMER_STATES.GOING_TO_TABLE;
        }
        break;

      case CUSTOMER_STATES.SEATED:
        this.mesh.rotation.y = 0;
        break;

      case CUSTOMER_STATES.GOING_TO_SHELF:
      case CUSTOMER_STATES.WAITING_FOR_STOCK:
        if (this.desiredItemTypes.length === 0) {
          this.state = CUSTOMER_STATES.QUEUEING;
          break;
        }

        const currentDesired = this.desiredItemTypes[0];
        const shelf = shelves.find(s => s.acceptedType.id === currentDesired.id);

        if (shelf) {
          this.targetShelf = shelf;
          // Stand at shelf queue position according to shelfWaitIndex
          const shelfQueuePos = shelf.getWaitQueuePosition(this.shelfWaitIndex);
          
          this.walkTowards(shelfQueuePos, delta, () => {
            // Reached shelf wait spot
            this.state = CUSTOMER_STATES.WAITING_FOR_STOCK;
            // Face the shelf (towards negative Z)
            this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, Math.PI, delta * 8);
          });

          // If shelf has stock and customer is first in line -> Pick item!
          if (shelf.hasStock() && this.shelfWaitIndex === 0) {
            const item = shelf.takeItem();
            if (item) {
              this.stack.addItem(item);
              this.desiredItemTypes.shift();
              this.updateThoughtBubble();

              if (this.desiredItemTypes.length > 0) {
                this.chooseNextShelf(shelves);
              } else {
                this.state = CUSTOMER_STATES.QUEUEING;
              }
            }
          }
        } else {
          // No shelf for this product yet, move to checkout if has items
          if (this.stack.getCount() > 0) {
            this.state = CUSTOMER_STATES.QUEUEING;
          } else {
            this.state = CUSTOMER_STATES.LEAVING;
          }
        }
        break;

      case CUSTOMER_STATES.QUEUEING:
        if (!register) break;
        this.thoughtBubble.visible = false;
        const registerQueuePos = register.getQueuePosition(this.queueIndex);
        this.walkTowards(registerQueuePos, delta, () => {
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
            const soldItems = [];
            while (this.stack.getCount() > 0) {
              const item = this.stack.popItem();
              totalAmount += item.price;
              soldItems.push(item);
            }

            register.spawnCoinBurst(totalAmount, onCustomerPaidCallback, soldItems);
            this.state = CUSTOMER_STATES.LEAVING;
          }
        }
        break;

      case CUSTOMER_STATES.LEAVING:
        this.thoughtBubble.visible = false;
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
      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, delta * 10);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, delta * 10);
      this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, 0, delta * 10);
    }

    this.stack.update(delta, isMoving);
  }

  chooseNextShelf(shelves) {
    if (this.desiredItemTypes.length === 0) {
      this.state = CUSTOMER_STATES.QUEUEING;
      return;
    }

    this.updateThoughtBubble();
    this.state = CUSTOMER_STATES.GOING_TO_SHELF;
  }

  applyCrowdSeparation(allCustomers, delta) {
    if (this.state === CUSTOMER_STATES.SEATED) return;

    const minSeparation = 0.72; // minimum distance between customers
    const myPos = this.mesh.position;

    for (const other of allCustomers) {
      if (other === this || other.state === CUSTOMER_STATES.SEATED) continue;

      const otherPos = other.mesh.position;
      const dx = myPos.x - otherPos.x;
      const dz = myPos.z - otherPos.z;
      const distSq = dx * dx + dz * dz;

      if (distSq < minSeparation * minSeparation && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const pushFactor = (minSeparation - dist) / dist * 1.5 * delta;
        
        myPos.x += dx * pushFactor;
        myPos.z += dz * pushFactor;
      }
    }
  }

  walkTowards(targetPos, delta, onReached) {
    const dir = new THREE.Vector3().subVectors(targetPos, this.mesh.position);
    dir.y = 0;
    const dist = dir.length();

    if (dist < 0.2) {
      if (onReached) onReached();
      return;
    }

    dir.normalize();
    this.mesh.position.addScaledVector(dir, Math.min(this.speed * delta, dist));

    const targetAngle = Math.atan2(dir.x, dir.z);
    this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, targetAngle, delta * 12);
  }
}

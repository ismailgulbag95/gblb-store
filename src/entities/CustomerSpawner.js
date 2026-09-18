import * as THREE from 'three';
import { Customer } from './Customer.js';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';

export class CustomerSpawner {
  constructor(scene, unlockedProducts = [ITEM_TYPES.TOMATO]) {
    this.scene = scene;
    this.unlockedProducts = unlockedProducts;
    this.customers = [];
    this.spawnTimer = 0;
    this.spawnInterval = GAME_CONFIG.CUSTOMER.spawnInterval;
    this.maxActive = GAME_CONFIG.CUSTOMER.maxActive;
    this.hasRestaurant = false;
  }

  setUnlockedProducts(products) {
    this.unlockedProducts = products;
  }

  setRestaurantUnlocked(status = true) {
    this.hasRestaurant = status;
  }

  update(delta, shelves = [], register = null, tables = [], onCustomerPaidCallback) {
    // 1. Spawn timer
    if (this.customers.length < this.maxActive) {
      this.spawnTimer += delta;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnCustomer(tables);
      }
    }

    // 2. Compute Checkout Register Queues
    const checkoutCustomers = this.customers.filter(c => c.state === 'QUEUEING' || c.state === 'PAYING');
    checkoutCustomers.forEach((c, index) => {
      c.queueIndex = index;
    });

    // 3. Compute Per-Shelf Waiting Queues
    shelves.forEach(shelf => {
      const waitingForThisShelf = this.customers.filter(c => 
        (c.state === 'GOING_TO_SHELF' || c.state === 'WAITING_FOR_STOCK') &&
        c.desiredItemTypes.length > 0 &&
        c.desiredItemTypes[0].id === shelf.acceptedType.id
      );

      waitingForThisShelf.forEach((c, index) => {
        c.shelfWaitIndex = index;
      });
    });

    // 4. Compute Restaurant Waiting Queue
    const restaurantWaiting = this.customers.filter(c => c.state === 'WAITING_FOR_TABLE');
    restaurantWaiting.forEach((c, index) => {
      c.tableWaitIndex = index;
    });

    // 5. Update All Customers with Crowd Separation
    for (let i = this.customers.length - 1; i >= 0; i--) {
      const c = this.customers[i];
      c.update(delta, shelves, register, tables, this.customers, onCustomerPaidCallback);

      if (c.isFinished) {
        this.customers.splice(i, 1);
      }
    }
  }

  spawnCustomer(tables = []) {
    // 35% chance for restaurant guest if unlocked and empty table exists
    const hasEmptyTable = tables.some(t => !t.isOccupied);
    const isRestaurantGuest = this.hasRestaurant && hasEmptyTable && Math.random() < 0.35;

    // Stagger spawn X position to prevent initial overlaps
    const baseSpawnX = isRestaurantGuest ? -37 : 5;
    const randomizedX = baseSpawnX + (Math.random() - 0.5) * 3.0;
    const doorSpawnPos = new THREE.Vector3(randomizedX, 0, 16 + Math.random() * 2.0);

    const listCount = 1 + Math.floor(Math.random() * 2);
    const shoppingList = [];
    for (let i = 0; i < listCount; i++) {
      const item = this.unlockedProducts[Math.floor(Math.random() * this.unlockedProducts.length)];
      shoppingList.push(item);
    }

    const customer = new Customer(this.scene, doorSpawnPos, shoppingList, isRestaurantGuest);
    this.customers.push(customer);
  }
}

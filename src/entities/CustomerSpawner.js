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

  update(delta, shelves, register, tables = [], onCustomerPaidCallback) {
    if (this.customers.length < this.maxActive) {
      this.spawnTimer += delta;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnCustomer(tables);
      }
    }

    const queueingCustomers = this.customers.filter(c => c.state === 'QUEUEING' || c.state === 'PAYING');
    queueingCustomers.forEach((c, index) => {
      c.queueIndex = index;
    });

    for (let i = this.customers.length - 1; i >= 0; i--) {
      const c = this.customers[i];
      c.update(delta, shelves, register, tables, onCustomerPaidCallback);

      if (c.isFinished) {
        this.customers.splice(i, 1);
      }
    }
  }

  spawnCustomer(tables = []) {
    // 30% chance to spawn restaurant guest if restaurant is unlocked and empty table exists
    const hasEmptyTable = tables.some(t => !t.isOccupied);
    const isRestaurantGuest = this.hasRestaurant && hasEmptyTable && Math.random() < 0.35;

    const spawnX = isRestaurantGuest ? -37 : 5;
    const doorSpawnPos = new THREE.Vector3(spawnX, 0, 16);

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

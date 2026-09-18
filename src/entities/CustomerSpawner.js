import * as THREE from 'three';
import { Customer } from './Customer.js';
import { ITEM_TYPES, GAME_CONFIG } from '../config/GameConfig.js';

export class CustomerSpawner {
  constructor(scene, unlockedProducts = [ITEM_TYPES.TOMATO]) {
    this.scene = scene;
    this.unlockedProducts = [...unlockedProducts];
    this.customers = [];
    this.spawnTimer = 0;
    this.spawnInterval = GAME_CONFIG.CUSTOMER.spawnInterval;
    this.maxActive = GAME_CONFIG.CUSTOMER.maxActive;
    this.hasRestaurant = false;
    this.demandBag = []; // Dengeli ve karışık ürün dağıtımı için torba sistemi
  }

  setUnlockedProducts(products) {
    this.unlockedProducts = [...products];
    this.demandBag = []; // Yeni ürün açıldığında dağıtım torbasını sıfırla
  }

  setRestaurantUnlocked(status = true) {
    this.hasRestaurant = status;
  }

  // Mevcut üretimler arasında dönüşümlü ve dengeli ana ürün seçimi
  getBalancedNextProduct(availablePool) {
    if (!availablePool || availablePool.length === 0) {
      return ITEM_TYPES.TOMATO;
    }

    // Torbada kalanları mevcut havuza göre filtrele
    this.demandBag = this.demandBag.filter(item => availablePool.some(p => p.id === item.id));

    if (this.demandBag.length === 0) {
      // Havuzdaki tüm ürünleri ekle ve karıştır (shuffle)
      this.demandBag = [...availablePool].sort(() => Math.random() - 0.5);
    }

    return this.demandBag.pop() || availablePool[0];
  }

  update(delta, shelves = [], register = null, tables = [], onCustomerPaidCallback) {
    // 1. Spawn timer
    if (this.customers.length < this.maxActive) {
      this.spawnTimer += delta;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnCustomer(tables, shelves);
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

  spawnCustomer(tables = [], shelves = []) {
    // 35% chance for restaurant guest if unlocked and empty table exists
    const hasEmptyTable = tables.some(t => !t.isOccupied);
    const isRestaurantGuest = this.hasRestaurant && hasEmptyTable && Math.random() < 0.35;

    // Stagger spawn X position to prevent initial overlaps
    const baseSpawnX = isRestaurantGuest ? -37 : 5;
    const randomizedX = baseSpawnX + (Math.random() - 0.5) * 3.0;
    const doorSpawnPos = new THREE.Vector3(randomizedX, 0, 16 + Math.random() * 2.0);

    // Mevcut üretim ve reyon durumuna göre aktif satılabilir ürün havuzunu belirle
    let availableProducts = [];
    if (shelves && shelves.length > 0) {
      const shelfTypesMap = new Map();
      shelves.forEach(s => {
        if (s.acceptedType && !shelfTypesMap.has(s.acceptedType.id)) {
          shelfTypesMap.set(s.acceptedType.id, s.acceptedType);
        }
      });
      availableProducts = Array.from(shelfTypesMap.values());
    }

    if (availableProducts.length === 0) {
      availableProducts = this.unlockedProducts.length > 0 ? this.unlockedProducts : [ITEM_TYPES.TOMATO];
    }

    // Mevcut üretime göre karışık alışveriş sepeti oluştur
    const shoppingList = [];
    if (!isRestaurantGuest) {
      // Açık olan çeşit sayısına göre 1-3 arası farklı ürün talep et
      const maxVariety = availableProducts.length;
      let targetCount = 1;
      if (maxVariety >= 3) {
        const rnd = Math.random();
        targetCount = rnd < 0.35 ? 1 : (rnd < 0.70 ? 2 : 3);
      } else if (maxVariety === 2) {
        targetCount = Math.random() < 0.5 ? 1 : 2;
      }

      // İlk ürün dengeli torbadan seçilir (böylece tüm reyonlara eşit dağılım sağlanır)
      const primaryItem = this.getBalancedNextProduct(availableProducts);
      shoppingList.push(primaryItem);

      // İkinci ve üçüncü ürünler için sepete farklı (karışık) ürünler ekle
      if (targetCount > 1) {
        const otherPool = availableProducts.filter(p => p.id !== primaryItem.id).sort(() => Math.random() - 0.5);
        for (let i = 0; i < targetCount - 1 && i < otherPool.length; i++) {
          shoppingList.push(otherPool[i]);
        }
      }
    }

    const customer = new Customer(this.scene, doorSpawnPos, shoppingList, isRestaurantGuest);
    this.customers.push(customer);
  }
}

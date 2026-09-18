import * as THREE from 'three';
import { Engine } from './core/Engine.js';
import { InputManager } from './core/InputManager.js';
import { MarketGrid } from './environment/MarketGrid.js';
import { Player } from './entities/Player.js';
import { Worker, WORKER_TYPES } from './entities/Worker.js';
import { FarmPlot } from './production/FarmPlot.js';
import { Shelf } from './production/Shelf.js';
import { ProcessingMachine } from './production/ProcessingMachine.js';
import { ChickenCoop } from './production/ChickenCoop.js';
import { BakeryOven } from './production/BakeryOven.js';
import { RestaurantKitchen } from './production/RestaurantKitchen.js';
import { DiningTable } from './production/DiningTable.js';
import { CashRegister } from './production/CashRegister.js';
import { CustomerSpawner } from './entities/CustomerSpawner.js';
import { UpgradeZone } from './production/UpgradeZone.js';
import { HUD } from './ui/HUD.js';
import { AdsManager } from './monetization/AdsManager.js';
import { ITEM_TYPES } from './config/GameConfig.js';
import { i18n } from './i18n/LanguageManager.js';

class Game {
  constructor() {
    this.engine = new Engine('game-container');
    this.input = new InputManager();
    this.hud = new HUD();
    this.ads = new AdsManager(this.hud);

    this.playerMoney = 0;
    this.debugSpeedMultiplier = 1.0;
    this.clock = new THREE.Clock();

    this.environment = new MarketGrid(this.engine.scene);
    this.player = new Player(this.engine.scene);

    // Systems Arrays
    this.farmPlots = [];
    this.shelves = [];
    this.machines = [];
    this.coops = [];
    this.ovens = [];
    this.kitchens = [];
    this.tables = [];
    this.upgradeZones = [];
    this.workers = [];

    // 1. Initial Tomato Farm & Shelf
    this.tomatoFarm = new FarmPlot(this.engine.scene, -10, 5, ITEM_TYPES.TOMATO, 'Domates Tarlası', this.environment);
    this.farmPlots.push(this.tomatoFarm);

    this.tomatoShelf = new Shelf(this.engine.scene, 3, 2, ITEM_TYPES.TOMATO, 8, 'Taze Domates Reyonu', this.environment);
    this.shelves.push(this.tomatoShelf);

    // 2. Cash Register
    this.register = new CashRegister(this.engine.scene, 5, -4, this.environment);

    // 3. Customer Spawner
    this.unlockedProducts = [ITEM_TYPES.TOMATO];
    this.spawner = new CustomerSpawner(this.engine.scene, this.unlockedProducts);

    // 4. Setup Progressive Unlock Chain
    this.setupUnlockProgression();

    // 5. Connect Debug & Character Actions
    this.hud.bindDebugActions(this);
    this.hud.setupCharacterEvents(this.player);

    // Start UI
    this.hud.updateMoney(this.playerMoney);
    this.hud.updateStack(0, this.player.stack.maxCapacity);
    this.hud.setQuest(i18n.t('initial_quest'));

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupUnlockProgression() {
    // --- STAGE 1: CASHIER AUTOMATION (35$) ---
    const cashierZone = new UpgradeZone(this.engine.scene, 8.5, -4, 35, i18n.t('hire_cashier'), () => {
      const cashier = new Worker(this.engine.scene, WORKER_TYPES.CASHIER, this.register.cashierZonePos);
      this.workers.push(cashier);
      this.register.hasHiredCashier = true;

      this.hud.showToast('👨‍💼 Kasiyer İşe Alındı! Kasa otomatik çalışıyor!', '#3498db');
      this.hud.setQuest('🥫 Salça İmalat Kazanını aç ve kazancını 4 katına çıkar!');

      this.spawnPasteMachineZone();
    }, '👨‍💼');
    this.upgradeZones.push(cashierZone);

    // Backpack +4 Zone (25$)
    const bagZone = new UpgradeZone(this.engine.scene, -4, 4, 25, i18n.t('upgrade_backpack'), () => {
      this.player.stack.maxCapacity += 4;
      this.hud.updateStack(this.player.stack.getCount(), this.player.stack.maxCapacity);
      this.hud.showToast('🎒 Çanta Kapasitesi +4 Artırıldı!', '#3498db');
    }, '🎒');
    this.upgradeZones.push(bagZone);
  }

  spawnPasteMachineZone() {
    // --- STAGE 2: PASTE VAT & ORANGE (45$) ---
    const pasteZone = new UpgradeZone(this.engine.scene, 0, -4, 45, i18n.t('unlock_paste'), () => {
      const pasteMachine = new ProcessingMachine(
        this.engine.scene,
        -10,
        -1,
        ITEM_TYPES.TOMATO,
        ITEM_TYPES.TOMATO_PASTE,
        'Salça Kazanı',
        this.environment
      );
      this.machines.push(pasteMachine);

      const pasteShelf = new Shelf(this.engine.scene, 7.5, 2, ITEM_TYPES.TOMATO_PASTE, 6, 'Salça Reyonu', this.environment);
      this.shelves.push(pasteShelf);

      this.unlockedProducts.push(ITEM_TYPES.TOMATO_PASTE);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🥫 Salça Kazanı ve Reyonu Açıldı! (4x Gelir!)', '#e67e22');
      this.hud.setQuest('🧑‍🌾 Tarla İşçisi işe alarak otomatik hasat başlat!');

      this.spawnHarvesterWorkerZone();
    }, '🥫');
    this.upgradeZones.push(pasteZone);
  }

  spawnHarvesterWorkerZone() {
    // --- STAGE 2B: HARVESTER WORKER (60$) ---
    const harvZone = new UpgradeZone(this.engine.scene, -5, -4, 60, i18n.t('hire_harvester'), () => {
      const harvester = new Worker(this.engine.scene, WORKER_TYPES.HARVESTER, new THREE.Vector3(-10, 0, 0));
      this.workers.push(harvester);

      this.hud.showToast('🧑‍🌾 Tarla İşçisi İşe Alındı! Tarlayı ve rafları o yönetecek!', '#2ecc71');
      this.hud.setQuest('🍊 Portakal Bahçesini aç ve marketini büyüt!');

      this.spawnOrangeGardenZone();
    }, '🧑‍🌾');
    this.upgradeZones.push(harvZone);
  }

  spawnOrangeGardenZone() {
    // --- STAGE 3: ORANGE & JUICE (85$) ---
    const orangeZone = new UpgradeZone(this.engine.scene, -10, -7, 85, i18n.t('unlock_orange'), () => {
      const orangeFarm = new FarmPlot(this.engine.scene, -10, -7, ITEM_TYPES.ORANGE, 'Portakal Bahçesi', this.environment);
      this.farmPlots.push(orangeFarm);

      const orangeShelf = new Shelf(this.engine.scene, 3, -1, ITEM_TYPES.ORANGE, 8, 'Portakal Reyonu', this.environment);
      this.shelves.push(orangeShelf);

      this.unlockedProducts.push(ITEM_TYPES.ORANGE);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🍊 Portakal Bahçesi ve Reyonu Açıldı!', '#f39c12');
      this.hud.setQuest('🧑‍🔧 Fabrika Lojistikçisi alarak makineleri tam otomatik yap!');

      this.spawnFactoryWorkerZone();
    }, '🍊');
    this.upgradeZones.push(orangeZone);
  }

  spawnFactoryWorkerZone() {
    // --- STAGE 3B: FACTORY FEEDER WORKER (90$) ---
    const feederZone = new UpgradeZone(this.engine.scene, -8, -1, 90, i18n.t('hire_factory_worker'), () => {
      const feeder = new Worker(this.engine.scene, WORKER_TYPES.FACTORY_FEEDER, new THREE.Vector3(-10, 0, 0));
      this.workers.push(feeder);

      this.hud.showToast('🧑‍🔧 Fabrika Lojistikçisi İşe Alındı! Kazanları o besleyecek!', '#e67e22');
      this.hud.setQuest('🌽 Mısır Tarlası ve 🐔 Tavuk Kümesini kur!');

      this.spawnCornAndCoopZone();
    }, '🧑‍🔧');
    this.upgradeZones.push(feederZone);
  }

  spawnCornAndCoopZone() {
    // --- STAGE 4: CORN & CHICKEN COOP (130$) ---
    const cornZone = new UpgradeZone(this.engine.scene, -18, 5, 130, i18n.t('unlock_coop'), () => {
      const cornFarm = new FarmPlot(this.engine.scene, -18, 5, ITEM_TYPES.CORN, 'Mısır Tarlası', this.environment);
      this.farmPlots.push(cornFarm);

      const coop = new ChickenCoop(this.engine.scene, -18, -1, this.environment);
      this.coops.push(coop);

      const eggShelf = new Shelf(this.engine.scene, 11, 2, ITEM_TYPES.EGG, 6, 'Çiftlik Yumurtası', this.environment);
      this.shelves.push(eggShelf);

      this.unlockedProducts.push(ITEM_TYPES.EGG);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🐔 Tavuk Kümesi & Çiftlik Yumurtası Açıldı!', '#f1c40f');
      this.hud.setQuest('🧑‍🌾 Çiftlik Bakıcısı işe alarak kümesi otomatik besle!');

      this.spawnFarmCaretakerZone();
    }, '🐔');
    this.upgradeZones.push(cornZone);
  }

  spawnFarmCaretakerZone() {
    // --- STAGE 4B: FARM CARETAKER (140$) ---
    const careZone = new UpgradeZone(this.engine.scene, -18, 2, 140, i18n.t('hire_farm_caretaker'), () => {
      const caretaker = new Worker(this.engine.scene, WORKER_TYPES.FARM_CARETAKER, new THREE.Vector3(-18, 0, 0));
      this.workers.push(caretaker);

      this.hud.showToast('🧑‍🌾 Çiftlik Bakıcısı İşe Alındı! Tavukları besleyip yumurta toplayacak!', '#2ecc71');
      this.hud.setQuest('🌾 Buğday Tarlası ve 🍞 Taş Fırını kur!');

      this.spawnWheatAndBakeryZone();
    }, '🧑‍🌾');
    this.upgradeZones.push(careZone);
  }

  spawnWheatAndBakeryZone() {
    // --- STAGE 5: WHEAT & BAKERY OVEN (180$) ---
    const bakeryZone = new UpgradeZone(this.engine.scene, -23, 0, 180, i18n.t('unlock_bakery'), () => {
      const wheatFarm = new FarmPlot(this.engine.scene, -18, -7, ITEM_TYPES.WHEAT, 'Buğday Tarlası', this.environment);
      this.farmPlots.push(wheatFarm);

      const oven = new BakeryOven(this.engine.scene, -23, 0, this.environment);
      this.ovens.push(oven);

      const breadShelf = new Shelf(this.engine.scene, 11, -1, ITEM_TYPES.BREAD, 6, 'Taş Fırın Ekmek', this.environment);
      this.shelves.push(breadShelf);

      this.unlockedProducts.push(ITEM_TYPES.BREAD);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🍞 Taş Fırın & Taze Ekmek Üretimi Başladı!', '#cd6133');
      this.hud.setQuest('🍕 GURME RESTORAN Kompleksini aç ve imparatorluğunu taçlandır!');

      this.spawnRestaurantZone();
    }, '🍞');
    this.upgradeZones.push(bakeryZone);
  }

  spawnRestaurantZone() {
    // --- STAGE 6: GOURMET RESTAURANT COMPLEX (250$) ---
    const restZone = new UpgradeZone(this.engine.scene, -30, 0, 250, i18n.t('unlock_restaurant'), () => {
      // 1. Burger Grill
      const burgerKitchen = new RestaurantKitchen(this.engine.scene, -30, 4, ITEM_TYPES.BURGER, this.environment);
      this.kitchens.push(burgerKitchen);

      // 2. Pizza Oven
      const pizzaKitchen = new RestaurantKitchen(this.engine.scene, -30, -4, ITEM_TYPES.PIZZA, this.environment);
      this.kitchens.push(pizzaKitchen);

      // 3. 4 Dining Tables
      const t1 = new DiningTable(this.engine.scene, -38, 4, 1, this.environment);
      const t2 = new DiningTable(this.engine.scene, -38, -4, 2, this.environment);
      const t3 = new DiningTable(this.engine.scene, -44, 4, 3, this.environment);
      const t4 = new DiningTable(this.engine.scene, -44, -4, 4, this.environment);
      this.tables.push(t1, t2, t3, t4);

      // 4. Enable restaurant guests in spawner
      this.spawner.setRestaurantUnlocked(true);

      this.hud.showToast('👑 GURME RESTORAN AÇILDI! Masalardan büyük bahşiş topla!', '#9b59b6');
      this.hud.setQuest('🧑‍🍳 Restoran Şefi ve 🧑‍💼 Garson alarak restoranı tam otomatik yap!');

      this.spawnChefAndWaiterZone();
    }, '👑');
    this.upgradeZones.push(restZone);
  }

  spawnChefAndWaiterZone() {
    // --- STAGE 6B: CHEF & WAITER (220$) ---
    const chefZone = new UpgradeZone(this.engine.scene, -34, 0, 220, i18n.t('hire_waiter'), () => {
      const chef = new Worker(this.engine.scene, WORKER_TYPES.CHEF, new THREE.Vector3(-30, 0, 0));
      const waiter = new Worker(this.engine.scene, WORKER_TYPES.WAITER, new THREE.Vector3(-35, 0, 0));
      this.workers.push(chef, waiter);

      this.hud.showToast('🧑‍🍳 Şef & 🧑‍💼 Garson İşe Alındı! Restoran tam otomatik işliyor!', '#2ecc71');
      this.hud.setQuest('🏆 TEBRİKLER! Tüm Mega Mart & Restoran İmparatorluğunu Tamamladın!');
    }, '🧑‍🍳');
    this.upgradeZones.push(chefZone);
  }

  animate() {
    requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1) * this.debugSpeedMultiplier;
    const time = this.clock.getElapsedTime();
    const speedMult = this.ads.getSpeedMultiplier();

    // 1. Inputs & Player with solid obstacles
    const inputVec = this.input.getMovementVector();
    const obstacles = this.environment.getObstacles();
    this.player.update(delta, inputVec, obstacles);

    // 2. Camera follow player
    this.engine.followTarget(this.player.mesh.position, delta);

    // 3. Environment animations (swaying trees)
    this.environment.update(delta, time);

    // 4. Farm plots
    this.farmPlots.forEach(fp => fp.update(delta, this.player, speedMult));

    // 5. Processing Machines
    this.machines.forEach(pm => pm.update(delta, this.player, time, speedMult));

    // 6. Chicken Coops
    this.coops.forEach(cp => cp.update(delta, this.player, time, speedMult));

    // 7. Bakery Ovens
    this.ovens.forEach(ov => ov.update(delta, this.player, time, speedMult));

    // 8. Restaurant Kitchens
    this.kitchens.forEach(kt => kt.update(delta, this.player, time, speedMult));

    // 9. Dining Tables
    this.tables.forEach(tb => tb.update(delta, this.player, time, (tipEarned) => {
      this.playerMoney += tipEarned;
      this.hud.updateMoney(this.playerMoney);
      this.hud.showToast(`+${tipEarned} 💵 ${i18n.t('tip_toast')}`, '#f1c40f');
    }));

    // 10. Shelves
    this.shelves.forEach(sh => sh.update(delta, this.player, time));

    // 11. Cash Register & Coins
    this.register.update(delta, this.player);

    // 12. Automated Workers (Cashier, Harvester, Feeder, Caretaker, Chef, Waiter)
    const workerContext = {
      farmPlots: this.farmPlots,
      shelves: this.shelves,
      machines: this.machines,
      coops: this.coops,
      ovens: this.ovens,
      kitchens: this.kitchens,
      tables: this.tables,
      register: this.register
    };
    this.workers.forEach(w => w.update(delta, workerContext));

    // 13. Customers & Spawner
    this.spawner.update(delta, this.shelves, this.register, this.tables, (earnedAmount) => {
      this.playerMoney += earnedAmount;
      this.hud.updateMoney(this.playerMoney);
      this.hud.showToast(`+${earnedAmount} 💵 ${i18n.t('sale_toast')}`, '#2ecc71');
    });

    // 14. Upgrade zones
    this.upgradeZones.forEach(uz => {
      uz.update(delta, this.player, this.playerMoney, (spent) => {
        this.playerMoney -= spent;
        this.hud.updateMoney(this.playerMoney);
      });
    });

    // 15. Ads Boost
    this.ads.update(delta);

    // 16. HUD Stack Update
    this.hud.updateStack(this.player.stack.getCount(), this.player.stack.maxCapacity);

    // 17. Render
    this.engine.render();
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});

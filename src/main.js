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
    this.ads = new AdsManager(this, this.engine.scene, this.hud);

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

    // 4. Tracking Player Manual Actions (Manual-First Flow)
    this.manualStats = {
      tomatoSold: 0,
      pasteProduced: 0,
      pasteSold: 0,
      orangeHarvested: 0,
      juiceProduced: 0,
      juiceSold: 0,
      cornSold: 0,
      popcornProduced: 0,
      popcornSold: 0,
      feedProduced: 0,
      eggCollected: 0,
      eggSold: 0,
      breadProduced: 0,
      breadSold: 0,
      burgerCooked: 0,
      burgerCollected: 0,
      tablesServed: 0,
      tipsCollected: 0
    };

    // Stage Unlocks Flags to prevent duplicate zone spawning
    this.unlockedStages = {
      cashierZone: false,
      pasteZone: false,
      harvesterZone: false,
      orangeZone: false,
      feederZone: false,
      cornZone: false,
      popcornZone: false,
      feedZone: false,
      coopZone: false,
      chickenUpgrades: false,
      caretakerZone: false,
      bakeryZone: false,
      restaurantZone: false,
      chefAndWaiterZone: false
    };

    this.setupUnlockProgression();

    // 5. Connect Debug & Character Actions
    this.hud.bindDebugActions(this);
    this.hud.setupCharacterEvents(this.player);

    // Start UI
    this.hud.updateMoney(this.playerMoney);
    this.hud.updateStack(0, this.player.stack.maxCapacity);
    this.hud.setQuest('🍅 Domates topla, reyon rafına diz ve kasada ilk satışını yap!');

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupUnlockProgression() {
    // --- STAGE 1A: 2ND TOMATO FIELD (25$) ---
    const tomatoFarm2Zone = new UpgradeZone(this.engine.scene, -6.5, 5, 25, i18n.t('unlock_tomato_farm_2'), () => {
      const tomatoFarm2 = new FarmPlot(this.engine.scene, -6.5, 5, ITEM_TYPES.TOMATO, '2. Domates Tarlası', this.environment);
      this.farmPlots.push(tomatoFarm2);
      this.hud.showToast('🍅 2. Domates Tarlası Açıldı! (2x Üretim Hızı)', '#e74c3c');
    }, '🍅');
    this.upgradeZones.push(tomatoFarm2Zone);
  }

  // --- STAGE 1B: CASHIER AUTOMATION (35$) & STAGE 2 PASTE ZONE ---
  checkFirstTomatoSold() {
    if (!this.unlockedStages.cashierZone) {
      this.unlockedStages.cashierZone = true;

      const cashierZone = new UpgradeZone(this.engine.scene, 8.5, -4, 35, i18n.t('hire_cashier'), () => {
        const cashier = new Worker(this.engine.scene, WORKER_TYPES.CASHIER, this.register.cashierZonePos);
        this.workers.push(cashier);
        this.register.hasHiredCashier = true;

        this.hud.showToast('👨‍💼 Kasiyer İşe Alındı! Kasa artık otomatik!', '#3498db');
      }, '👨‍💼');
      this.upgradeZones.push(cashierZone);

      this.spawnPasteMachineZone();
    }
  }

  // --- STAGE 2: PASTE VAT & SHELF (45$) ---
  spawnPasteMachineZone() {
    if (this.unlockedStages.pasteZone) return;
    this.unlockedStages.pasteZone = true;

    const pasteZone = new UpgradeZone(this.engine.scene, 0, -4, 45, i18n.t('unlock_paste'), () => {
      const pasteMachine = new ProcessingMachine(
        this.engine.scene,
        -10,
        1.8,
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

      this.hud.showToast('🥫 Salça Kazanı ve Reyonu Açıldı!', '#e67e22');
      this.hud.setQuest('🥫 Kazana 2 domates bırak, üretilen salçayı alıp reyonuna diz ve müşteriye sat!');
    }, '🥫');
    this.upgradeZones.push(pasteZone);
  }

  // --- STAGE 2B: HARVESTER WORKER (60$) ---
  checkFirstPasteSold() {
    if (!this.unlockedStages.harvesterZone) {
      this.unlockedStages.harvesterZone = true;

      const harvZone = new UpgradeZone(this.engine.scene, -5, -4, 60, i18n.t('hire_harvester'), () => {
        const harvester = new Worker(this.engine.scene, WORKER_TYPES.HARVESTER, new THREE.Vector3(-10, 0, 0));
        this.workers.push(harvester);

        this.hud.showToast('🧑‍🌾 Tarla İşçisi İşe Alındı! Domatesleri o toplayacak!', '#2ecc71');
      }, '🧑‍🌾');
      this.upgradeZones.push(harvZone);

      this.spawnOrangeGardenZone();
    }
  }

  // --- STAGE 3: ORANGE & JUICE (85$) ---
  spawnOrangeGardenZone() {
    if (this.unlockedStages.orangeZone) return;
    this.unlockedStages.orangeZone = true;

    const orangeZone = new UpgradeZone(this.engine.scene, -10, -7, 85, i18n.t('unlock_orange'), () => {
      const orangeFarm = new FarmPlot(this.engine.scene, -10, -7, ITEM_TYPES.ORANGE, 'Portakal Bahçesi', this.environment);
      this.farmPlots.push(orangeFarm);

      const orangeShelf = new Shelf(this.engine.scene, 3, -1, ITEM_TYPES.ORANGE, 8, 'Portakal Reyonu', this.environment);
      this.shelves.push(orangeShelf);

      const juiceMachine = new ProcessingMachine(
        this.engine.scene,
        -10,
        -1.8,
        ITEM_TYPES.ORANGE,
        ITEM_TYPES.ORANGE_JUICE,
        'Meyve Sıkacağı',
        this.environment
      );
      this.machines.push(juiceMachine);

      const juiceShelf = new Shelf(this.engine.scene, 7.5, -1, ITEM_TYPES.ORANGE_JUICE, 6, 'Portakal Suyu Reyonu', this.environment);
      this.shelves.push(juiceShelf);

      this.unlockedProducts.push(ITEM_TYPES.ORANGE, ITEM_TYPES.ORANGE_JUICE);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🍊 Portakal Bahçesi & Meyve Sıkacağı Açıldı!', '#f39c12');
      this.hud.setQuest('🍊 Portakal topla, sıkma makinesine bırak ve taze suyu reyonuna dizip sat!');
    }, '🍊');
    this.upgradeZones.push(orangeZone);
  }

  // --- STAGE 3B: FACTORY WORKER (90$) ---
  checkFirstJuiceSold() {
    if (!this.unlockedStages.feederZone) {
      this.unlockedStages.feederZone = true;

      const feederZone = new UpgradeZone(this.engine.scene, -8, -1, 90, i18n.t('hire_factory_worker'), () => {
        const feeder = new Worker(this.engine.scene, WORKER_TYPES.FACTORY_FEEDER, new THREE.Vector3(-10, 0, 0));
        this.workers.push(feeder);

        const orangeFarm2Zone = new UpgradeZone(this.engine.scene, -6.5, -7, 45, i18n.t('unlock_orange_farm_2'), () => {
          const orangeFarm2 = new FarmPlot(this.engine.scene, -6.5, -7, ITEM_TYPES.ORANGE, '2. Portakal Bahçesi', this.environment);
          this.farmPlots.push(orangeFarm2);
          this.hud.showToast('🍊 2. Portakal Bahçesi Açıldı! (2x Hasat)', '#f39c12');
        }, '🍊');
        this.upgradeZones.push(orangeFarm2Zone);

        this.hud.showToast('🧑‍🔧 Fabrika Lojistikçisi İşe Alındı! Kazan ve sıkıcıyı o besleyecek!', '#e67e22');
      }, '🧑‍🔧');
      this.upgradeZones.push(feederZone);

      this.spawnCornFarmZone();
    }
  }

  // --- STAGE 4A: CORN FARM (110$) ---
  spawnCornFarmZone() {
    if (this.unlockedStages.cornZone) return;
    this.unlockedStages.cornZone = true;

    const cornZone = new UpgradeZone(this.engine.scene, -18, 5, 110, i18n.t('unlock_corn'), () => {
      const cornFarm = new FarmPlot(this.engine.scene, -18, 5, ITEM_TYPES.CORN, 'Mısır Tarlası', this.environment);
      this.farmPlots.push(cornFarm);

      const cornShelf = new Shelf(this.engine.scene, 11, 2, ITEM_TYPES.CORN, 8, 'Taze Mısır Reyonu', this.environment);
      this.shelves.push(cornShelf);

      this.unlockedProducts.push(ITEM_TYPES.CORN);
      this.spawner.setUnlockedProducts(this.unlockedProducts);

      this.hud.showToast('🌽 Taze Mısır Tarlası ve Reyonu Açıldı!', '#f1c40f');
      this.hud.setQuest('🌽 Tarladan mısır topla, reyonuna diz ve müşteriye sat!');
    }, '🌽');
    this.upgradeZones.push(cornZone);
  }

  // --- STAGE 4B: POPCORN MACHINE (125$) ---
  checkFirstCornSold() {
    if (!this.unlockedStages.popcornZone) {
      this.unlockedStages.popcornZone = true;

      const popZone = new UpgradeZone(this.engine.scene, -18, 1.8, 125, i18n.t('unlock_popcorn'), () => {
        const popcornMachine = new ProcessingMachine(
          this.engine.scene,
          -18,
          1.8,
          ITEM_TYPES.CORN,
          ITEM_TYPES.POPCORN,
          'Popcorn Makinesi',
          this.environment
        );
        this.machines.push(popcornMachine);

        const popShelf = new Shelf(this.engine.scene, 11, 0, ITEM_TYPES.POPCORN, 6, 'Sıcak Popcorn Reyonu', this.environment);
        this.shelves.push(popShelf);

        this.unlockedProducts.push(ITEM_TYPES.POPCORN);
        this.spawner.setUnlockedProducts(this.unlockedProducts);

        this.hud.showToast('🍿 Sıcak Popcorn Makinesi & Reyonu Açıldı!', '#e74c3c');
        this.hud.setQuest('🍿 Mısırları makineye at, sıcak popcorn üret ve reyonuna dizip sat!');
      }, '🍿');
      this.upgradeZones.push(popZone);
    }
  }

  // --- STAGE 4C: FEED GRINDER MACHINE (135$) ---
  checkFirstPopcornSold() {
    if (!this.unlockedStages.feedZone) {
      this.unlockedStages.feedZone = true;

      const feedZone = new UpgradeZone(this.engine.scene, -18, -1.8, 135, i18n.t('unlock_feed_machine'), () => {
        const feedMachine = new ProcessingMachine(
          this.engine.scene,
          -18,
          -1.8,
          ITEM_TYPES.CORN,
          ITEM_TYPES.CHICKEN_FEED,
          'Yem Değirmeni',
          this.environment
        );
        this.machines.push(feedMachine);

        this.hud.showToast('🌾 Yem Değirmeni Kuruldu!', '#27ae60');
        this.hud.setQuest('🌾 Mısır öğüterek ilk tavuk yemi çuvalını üret ve teslim al!');
      }, '🌾');
      this.upgradeZones.push(feedZone);
    }
  }

  // --- STAGE 4D: CHICKEN COOP (150$) ---
  checkFirstFeedProduced() {
    if (!this.unlockedStages.coopZone) {
      this.unlockedStages.coopZone = true;

      const coopZone = new UpgradeZone(this.engine.scene, -23, 3.5, 150, i18n.t('unlock_coop'), () => {
        const coop = new ChickenCoop(this.engine.scene, -23, 3.5, this.environment);
        this.coops.push(coop);

        const eggShelf = new Shelf(this.engine.scene, 11, -2, ITEM_TYPES.EGG, 6, 'Çiftlik Yumurtası', this.environment);
        this.shelves.push(eggShelf);

        this.unlockedProducts.push(ITEM_TYPES.EGG);
        this.spawner.setUnlockedProducts(this.unlockedProducts);

        this.hud.showToast('🐔 Tavuk Kümesi Açıldı! (1. Tavuk devrede)', '#f39c12');
        this.hud.setQuest('🐔 Kümese yem çuvalı bırak, çıkan taze yumurtayı alıp reyonuna diz ve sat!');
      }, '🐔');
      this.upgradeZones.push(coopZone);
    }
  }

  // --- STAGE 4E/F/G: CHICKEN 2, 3 & CARETAKER ---
  checkFirstEggSold() {
    if (!this.unlockedStages.chickenUpgrades) {
      this.unlockedStages.chickenUpgrades = true;

      const coop = this.coops[0];
      if (coop) {
        const chk2Zone = new UpgradeZone(this.engine.scene, -23, 6.2, 70, i18n.t('buy_chicken_2'), () => {
          coop.addChicken();
          this.hud.showToast('🐔 2. Tavuk Kümese Katıldı! (2x Hızlı Yumurtlama)', '#f1c40f');
          
          const chk3Zone = new UpgradeZone(this.engine.scene, -23, 6.2, 95, i18n.t('buy_chicken_3'), () => {
            coop.addChicken();
            this.hud.showToast('🐔 3. Tavuk Kümese Katıldı! (Süper Hızlı Yumurtlama)', '#e67e22');
          }, '🐔');
          this.upgradeZones.push(chk3Zone);
        }, '🐔');
        this.upgradeZones.push(chk2Zone);
      }

      const careZone = new UpgradeZone(this.engine.scene, -18, 0, 150, i18n.t('hire_farm_caretaker'), () => {
        const caretaker = new Worker(this.engine.scene, WORKER_TYPES.FARM_CARETAKER, new THREE.Vector3(-18, 0, 0));
        this.workers.push(caretaker);
        this.hud.showToast('🧑‍🌾 Çiftlik Bakıcısı İşe Alındı! Yem değirmeni ve kümesi o besleyecek!', '#2ecc71');
      }, '🧑‍🌾');
      this.upgradeZones.push(careZone);

      this.spawnWheatAndBakeryZone();
    }
  }

  // --- STAGE 5: WHEAT & BAKERY OVEN (180$) ---
  spawnWheatAndBakeryZone() {
    if (this.unlockedStages.bakeryZone) return;
    this.unlockedStages.bakeryZone = true;

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
      this.hud.setQuest('🍞 Fırına 2 buğday ve 1 yumurta bırak, pişen ekmeği reyonuna diz ve müşteriye sat!');
    }, '🍞');
    this.upgradeZones.push(bakeryZone);
  }

  // --- STAGE 6: GOURMET RESTAURANT COMPLEX (250$) ---
  checkFirstBreadSold() {
    if (!this.unlockedStages.restaurantZone) {
      this.unlockedStages.restaurantZone = true;

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

        this.hud.showToast('👑 GURME RESTORAN AÇILDI!', '#9b59b6');
        this.hud.setQuest('🍔 Mutfak tezgahına Ekmek ve Domates koyup ilk Gurme Burgerini pişir!');
      }, '👑');
      this.upgradeZones.push(restZone);
    }
  }

  // --- STAGE 6B: CHEF & WAITER AUTOMATION (220$) ---
  checkFirstTableServedAndTipped() {
    if (!this.unlockedStages.chefAndWaiterZone) {
      this.unlockedStages.chefAndWaiterZone = true;

      const chefZone = new UpgradeZone(this.engine.scene, -34, 0, 220, i18n.t('hire_waiter'), () => {
        const chef = new Worker(this.engine.scene, WORKER_TYPES.CHEF, new THREE.Vector3(-30, 0, 0));
        const waiter = new Worker(this.engine.scene, WORKER_TYPES.WAITER, new THREE.Vector3(-35, 0, 0));
        this.workers.push(chef, waiter);

        this.hud.showToast('🧑‍🍳 Şef & 🧑‍💼 Garson İşe Alındı! Restoran tam otomatik!', '#2ecc71');
        this.hud.setQuest('🏆 TEBRİKLER! Tüm Mega Mart & Gurme Restoran İmparatorluğunu Tamamladın!');
      }, '🧑‍🍳');
      this.upgradeZones.push(chefZone);

      this.hud.setQuest('🧑‍🍳 Restoran Şefi ve 🧑‍💼 Garsonu ($220) işe alarak tam otomasyona geç!');
    }
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

    // 5. Processing Machines with output callback
    this.machines.forEach(pm => pm.update(delta, this.player, time, speedMult, (item, outputType) => {
      if (outputType.id === 'TOMATO_PASTE') {
        this.manualStats.pasteProduced++;
        this.hud.setQuest('🥫 Salçayı alıp Salça Reyonuna diz ve müşteriye sat!');
      } else if (outputType.id === 'ORANGE_JUICE') {
        this.manualStats.juiceProduced++;
        this.hud.setQuest('🧃 Taze portakal suyunu reyonuna diz ve müşteriye sat!');
      } else if (outputType.id === 'POPCORN') {
        this.manualStats.popcornProduced++;
        this.hud.setQuest('🍿 Sıcak popcorn kutusunu reyonuna diz ve müşteriye sat!');
      } else if (outputType.id === 'CHICKEN_FEED') {
        this.manualStats.feedProduced++;
        this.hud.setQuest('🐔 Tavuk Kümesini ($150) inşa et!');
        this.checkFirstFeedProduced();
      }
    }));

    // 6. Chicken Coops with egg collect callback
    this.coops.forEach(cp => cp.update(delta, this.player, time, speedMult, (egg) => {
      this.manualStats.eggCollected++;
      this.hud.setQuest('🥚 Yumurtaları Yumurta Reyonuna diz ve müşteriye sat!');
    }));

    // 7. Bakery Ovens with bread collect callback
    this.ovens.forEach(ov => ov.update(delta, this.player, time, speedMult, (bread) => {
      this.manualStats.breadProduced++;
      this.hud.setQuest('🍞 Taze ekmeği reyonuna diz ve müşteriye sat!');
    }));

    // 8. Restaurant Kitchens with burger/pizza cook & collect callbacks
    this.kitchens.forEach(kt => kt.update(
      delta,
      this.player,
      time,
      speedMult,
      (meal) => {
        // Meal collected to player stack
        this.manualStats.burgerCollected++;
        this.hud.showToast(`${meal.icon} ${meal.id === 'BURGER' ? 'Burger' : 'Pizza'} Alındı! Masaya götür!`, '#9b59b6');
        this.hud.setQuest('🍽️ Yemeği masada sipariş bekleyen müşteriye bizzat servis et!');
      },
      (ingredient, mealType) => {
        this.hud.showToast(`+1 ${ingredient.icon} Mutfak Tezgahına Eklendi!`, '#3498db');
      }
    ));

    // 9. Dining Tables with tip & meal served callback
    this.tables.forEach(tb => tb.update(
      delta,
      this.player,
      time,
      (tipEarned) => {
        this.playerMoney += tipEarned;
        this.hud.updateMoney(this.playerMoney);
        this.hud.showToast(`+${tipEarned} 💵 ${i18n.t('tip_toast')}`, '#f1c40f');

        this.manualStats.tipsCollected++;
        this.checkFirstTableServedAndTipped();
      },
      (servedItem, tableIndex) => {
        this.manualStats.tablesServed++;
        this.hud.showToast(`🍽️ Masa #${tableIndex}'e ${servedItem.icon} servis edildi! Müşteri yiyor...`, '#2ecc71');
        this.hud.setQuest('💵 Müşteri yemeğini bitirince masada bıraktığı bahşişi topla!');
      }
    ));

    // 10. Shelves
    this.shelves.forEach(sh => sh.update(delta, this.player, time));

    // 11. Cash Register & Coins
    this.register.update(delta, this.player);

    // 12. Automated Workers
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

    // 13. Customers & Checkout Sales callback with sold items list
    this.spawner.update(delta, this.shelves, this.register, this.tables, (earnedAmount, soldItems = []) => {
      this.playerMoney += earnedAmount;
      this.hud.updateMoney(this.playerMoney);
      this.hud.showToast(`+${earnedAmount} 💵 ${i18n.t('sale_toast')}`, '#2ecc71');

      // Process sold item types for quest triggers
      soldItems.forEach(item => {
        if (item.id === 'TOMATO') {
          this.manualStats.tomatoSold++;
          if (this.manualStats.tomatoSold === 1) {
            this.checkFirstTomatoSold();
          }
        } else if (item.id === 'TOMATO_PASTE') {
          this.manualStats.pasteSold++;
          if (this.manualStats.pasteSold === 1) {
            this.checkFirstPasteSold();
          }
        } else if (item.id === 'ORANGE_JUICE' || item.id === 'ORANGE') {
          this.manualStats.juiceSold++;
          if (this.manualStats.juiceSold === 1) {
            this.checkFirstJuiceSold();
          }
        } else if (item.id === 'CORN') {
          this.manualStats.cornSold++;
          if (this.manualStats.cornSold === 1) {
            this.checkFirstCornSold();
          }
        } else if (item.id === 'POPCORN') {
          this.manualStats.popcornSold++;
          if (this.manualStats.popcornSold === 1) {
            this.checkFirstPopcornSold();
          }
        } else if (item.id === 'EGG') {
          this.manualStats.eggSold++;
          if (this.manualStats.eggSold === 1) {
            this.checkFirstEggSold();
          }
        } else if (item.id === 'BREAD') {
          this.manualStats.breadSold++;
          if (this.manualStats.breadSold === 1) {
            this.checkFirstBreadSold();
          }
        }
      });
    });

    // 14. Upgrade zones
    this.upgradeZones.forEach(uz => {
      uz.update(delta, this.player, this.playerMoney, (spent) => {
        this.playerMoney -= spent;
        this.hud.updateMoney(this.playerMoney);
      });
    });

    // 15. Ads Boost & Lucky Reward Drops
    if (this.player && this.player.mesh) {
      this.ads.update(delta, this.player.mesh.position);
    }

    // 16. HUD Stack Update
    this.hud.updateStack(this.player.stack.getCount(), this.player.stack.maxCapacity);

    // 17. Render
    this.engine.render();
  }
}

// Bootstrap
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    new Game();
  });
} else {
  new Game();
}



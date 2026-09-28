import { ITEMS, RECIPES, SHELVES, STATIONS, UPGRADES } from '../domain/catalog.js';
import { EconomyLedger } from '../domain/ledger.js';
import { canTransfer, makeLocation, quantityAt, transferStock } from '../domain/inventory.js';
import { createInitialState, hydrateState } from '../domain/state.js';
import { advanceSimulation } from '../domain/simulation.js';
import { syncFarmHarvest } from '../domain/farm.js';

function clone(value) {
  return structuredClone(value);
}

const UPGRADE_MESSAGES = {
  tomatoFarm2: 'İkinci domates tarlası açıldı. Hasat kapasiten arttı.',
  cashier: 'Kasiyer işe alındı. Ödemeler daha hızlı işleniyor.',
  paste: 'Salça kazanı ve yeni reyon açıldı.',
  harvester: 'Hasat işçisi rafları otomatik dolduruyor.',
  orange: 'Portakal bahçesi ve meyve sıkacağı açıldı.',
  factoryFeeder: 'Fabrika lojistikçisi üretim hatlarını besliyor.',
  orangeFarm2: 'İkinci portakal bahçesi açıldı.',
  corn: 'Mısır tarlası ve reyon açıldı.',
  popcorn: 'Popcorn makinesi ve reyon açıldı.',
  feed: 'Yem değirmeni kuruldu.',
  coop: 'Tavuk kümesi ve yumurta reyonu açıldı.',
  chicken2: 'İkinci tavuk kümese katıldı.',
  chicken3: 'Üçüncü tavuk kümese katıldı.',
  caretaker: 'Çiftlik bakıcısı işe alındı.',
  bakery: 'Buğday tarlası ve taş fırın açıldı.',
  restaurant: 'Gurme restoran ve masalar açıldı.',
  chefWaiter: 'Şef ve garson işe alındı. Restoran otomasyona geçti.',
};

const CASHIER_POSITION = { x: STATIONS.register.x, z: STATIONS.register.z - 1.75 };

export class GameApplication {
  constructor(saveService, seed) {
    this.saveService = saveService;
    const loaded = saveService.load();
    this.state = loaded.state ?? createInitialState(seed);
    const legacyCharacter = saveService.storage?.getItem('player_character');
    const validCharacter = ['shopkeeper', 'cat', 'robot', 'panda', 'penguin'].includes(legacyCharacter);
    const migrateLegacyCharacter = validCharacter && this.state.player.character === 'shopkeeper' && legacyCharacter !== 'shopkeeper';
    if (migrateLegacyCharacter) {
      this.state.player.character = legacyCharacter;
    }
    const previousAvailableUpgrades = this.state.availableUpgrades.join(',');
    this.#refreshUpgrades(this.state);
    const needsUnlockRefresh = previousAvailableUpgrades !== this.state.availableUpgrades.join(',');
    const movedCashier = this.state.workers.some((worker) => worker.type === 'cashier'
      && (worker.x !== CASHIER_POSITION.x || worker.z !== CASHIER_POSITION.z));
    if (movedCashier) {
      for (const worker of this.state.workers) {
        if (worker.type === 'cashier') Object.assign(worker, CASHIER_POSITION, { facing: 0 });
      }
    }
    this.recovered = loaded.recovered;
    this.onEvent = () => {};
    this.lastDurableTick = this.state.tick;
    if (!loaded.state) this.#persist('new-game');
    else if (migrateLegacyCharacter || needsUnlockRefresh || movedCashier) {
      this.#persist(`migration:${this.state.tick}:${legacyCharacter ?? 'none'}:${this.state.availableUpgrades.join(',')}`);
    }
    if (loaded.recovered) this.onEvent({ type: 'toast', message: 'Yedek kayıttan devam edildi.' });
  }

  setEventHandler(handler) {
    this.onEvent = handler;
  }

  getState() {
    return this.state;
  }

  getBalance() {
    return this.state.economy.balanceAtoms / 10_000;
  }

  getAvailableUpgrades() {
    return UPGRADES.filter((upgrade) => this.state.availableUpgrades.includes(upgrade.id)
      && !this.state.completedUpgrades.includes(upgrade.id));
  }

  #persist(transactionId, draft = this.state) {
    this.saveService.commit(draft, transactionId);
    this.state = draft;
    this.lastDurableTick = draft.tick;
  }

  #command(transactionId, action) {
    const draft = clone(this.state);
    try {
      const result = action(draft);
      if (!result?.ok) return result ?? { ok: false, reason: 'rejected' };
      draft.revision += 1;
      this.#persist(transactionId, draft);
      if (result.message) this.onEvent({ type: 'toast', message: result.message });
      return { ...result, state: this.state };
    } catch (error) {
      this.onEvent({ type: 'toast', message: error.message, tone: 'error' });
      return { ok: false, reason: 'command-failed', error };
    }
  }

  buyUpgrade(upgradeId) {
    const upgrade = UPGRADES.find((entry) => entry.id === upgradeId);
    if (!upgrade) return { ok: false, reason: 'unknown-upgrade' };
    return this.#command(`upgrade:${upgradeId}:${this.state.revision + 1}`, (draft) => {
      if (!draft.availableUpgrades.includes(upgradeId) || draft.completedUpgrades.includes(upgradeId)) {
        return { ok: false, reason: 'locked' };
      }
      new EconomyLedger(draft.economy).debit(`purchase:${upgradeId}`, upgrade.price, `upgrade:${upgradeId}`);
      draft.completedUpgrades.push(upgradeId);
      for (const unlockedId of upgrade.unlocks) draft.unlocked[unlockedId] = true;
      this.#applyUpgrade(draft, upgradeId);
      draft.quest = this.#questFor(draft);
      return { ok: true, message: UPGRADE_MESSAGES[upgradeId] };
    });
  }

  #applyUpgrade(state, upgradeId) {
    const shelfFor = (itemId) => {
      const definition = SHELVES[itemId];
      if (!definition) return;
      makeLocation(state.stock, definition.id, definition.capacity);
      state.unlocked[`${itemId.toLowerCase()}Shelf`] = true;
    };
    const addMachine = (id) => {
      const station = STATIONS[id];
      const recipe = RECIPES[station.recipe];
      state.machines[id] = { progressTicks: 0, recipe: station.recipe, blocked: false };
      makeLocation(state.stock, `machine:${id}:input`, 12);
      makeLocation(state.stock, `machine:${id}:output`, 8);
      if (recipe.output !== 'CHICKEN_FEED') shelfFor(recipe.output);
    };
    const addFarm = (id) => {
      const station = STATIONS[id];
      state.farms[id] = { progressTicks: 0, harvestCount: 0, readyCount: 0 };
      makeLocation(state.stock, `farm:${station.item}`, 60);
    };
    const unlockProduct = (itemId) => {
      if (!state.unlockedProducts.includes(itemId)) state.unlockedProducts.push(itemId);
      shelfFor(itemId);
    };

    if (upgradeId === 'tomatoFarm2') addFarm('tomatoFarm2');
    if (upgradeId === 'cashier') this.#hire(state, 'cashier');
    if (upgradeId === 'paste') { addMachine('paste'); unlockProduct('TOMATO_PASTE'); }
    if (upgradeId === 'harvester') this.#hire(state, 'harvester');
    if (upgradeId === 'orange') {
      addFarm('orangeFarm'); addMachine('juice');
      unlockProduct('ORANGE'); unlockProduct('ORANGE_JUICE');
    }
    if (upgradeId === 'factoryFeeder') this.#hire(state, 'factoryFeeder');
    if (upgradeId === 'orangeFarm2') addFarm('orangeFarm2');
    if (upgradeId === 'corn') { addFarm('cornFarm'); unlockProduct('CORN'); }
    if (upgradeId === 'popcorn') { addMachine('popcorn'); unlockProduct('POPCORN'); }
    if (upgradeId === 'feed') addMachine('feed');
    if (upgradeId === 'coop') {
      makeLocation(state.stock, 'coop:feed', 20);
      makeLocation(state.stock, 'coop:eggs', 20);
      state.coops.coop = { chickens: 1, progressTicks: 0 };
      unlockProduct('EGG');
    }
    if (upgradeId === 'chicken2') state.coops.coop.chickens = 2;
    if (upgradeId === 'chicken3') state.coops.coop.chickens = 3;
    if (upgradeId === 'caretaker') this.#hire(state, 'caretaker');
    if (upgradeId === 'bakery') {
      addFarm('wheatFarm'); addMachine('bakery'); unlockProduct('BREAD');
    }
    if (upgradeId === 'restaurant') {
      addMachine('burgerKitchen'); addMachine('pizzaKitchen');
      state.unlockedProducts.push('BURGER', 'PIZZA');
      state.diningTables = Object.fromEntries(['table1', 'table2', 'table3', 'table4'].map((id) => [id, {
        customerId: null, meal: null, tipAtoms: 0, eatTicks: 0,
      }]));
    }
    if (upgradeId === 'chefWaiter') {
      this.#hire(state, 'chefWaiter');
      this.#hire(state, 'waiter');
    }
    this.#refreshUpgrades(state);
  }

  #hire(state, type) {
    const positions = {
      cashier: [CASHIER_POSITION.x, CASHIER_POSITION.z], harvester: [-10, 5], factoryFeeder: [-10, 0],
      caretaker: [-18, 0], chefWaiter: [-30, 0], waiter: [-35, 0],
    };
    const [x, z] = positions[type] ?? [-8, 0];
    state.workers.push({ id: `worker-${state.nextEntityId++}`, type, x, z, facing: 0, task: null });
  }

  #refreshUpgrades(state) {
    const statRequirements = {
      cashier: state.stats.tomatoSold > 0,
      paste: state.stats.tomatoSold > 0,
      harvester: state.stats.pasteSold > 0,
      orange: state.stats.pasteSold > 0,
      factoryFeeder: state.stats.juiceSold > 0,
      orangeFarm2: state.stats.juiceSold > 0,
      corn: state.stats.juiceSold > 0,
      popcorn: state.stats.cornSold > 0,
      feed: state.stats.popcornSold > 0,
      coop: state.stats.feedProduced > 0,
      chicken2: state.stats.eggSold > 0,
      caretaker: state.stats.eggSold > 0,
      bakery: state.stats.eggSold > 0,
      chicken3: state.completedUpgrades.includes('chicken2'),
      restaurant: state.stats.breadSold > 0,
      chefWaiter: state.stats.tipsCollected > 0,
    };
    for (const [id, available] of Object.entries(statRequirements)) {
      if (available && !state.completedUpgrades.includes(id) && !state.availableUpgrades.includes(id)) {
        state.availableUpgrades.push(id);
      }
    }
  }

  #questFor(state) {
    if (!state.unlocked.paste) return state.stats.tomatoSold > 0 ? 'Salça kazanı ve reyonu aç.' : 'İlk domates satışını yap.';
    if (state.stats.pasteSold === 0) return '2 domatesi salça kazanına bırak, salçayı rafa taşı ve sat.';
    if (!state.unlocked.orange) return 'Portakal bahçesi ve meyve sıkacağını aç.';
    if (state.stats.juiceSold === 0) return 'Portakalları sıkıp meyve suyunu rafa taşı.';
    if (!state.unlocked.corn) return 'Mısır tarlasını ve reyonunu aç.';
    if (state.stats.cornSold === 0) return 'Mısır hasat et, reyona koy ve sat.';
    if (!state.unlocked.popcorn) return 'Popcorn makinesini aç.';
    if (state.stats.popcornSold === 0) return 'Mısırı popcorn makinesine yükle; popcorn üretip sat.';
    if (!state.unlocked.feed) return 'Yem değirmenini aç.';
    if (state.stats.feedProduced === 0) return 'Mısırı değirmene yükle ve tavuk yemi üret.';
    if (!state.unlocked.coop) return 'Tavuk kümesini aç.';
    if (state.stats.eggSold === 0) return 'Yemi kümese bırak, yumurtaları toplayıp sat.';
    if (!state.unlocked.bakery) return 'Buğday tarlası ve taş fırını aç.';
    if (state.stats.breadSold === 0) return '2 buğday ve 1 yumurtayı fırına yükle; ekmek üretip sat.';
    if (!state.unlocked.restaurant) return 'Gurme restoranı aç.';
    if (!state.unlocked.chefWaiter) return 'Burger veya pizza pişir, müşteriye servis et ve bahşiş topla.';
    return 'Tebrikler! GBLB STORE ve Gurme Restoran işletmen tamamlandı.';
  }

  interact(targetId) {
    const state = this.state;
    const player = state.player;
    const upgrade = UPGRADES.find((entry) => entry.id === targetId);
    if (upgrade && !state.completedUpgrades.includes(targetId)) return this.buyUpgrade(targetId);
    const station = STATIONS[targetId];
    if (!station) return { ok: false, reason: 'unknown-station' };
    const isUnlocked = station.kind === 'farm' ? Boolean(state.farms[targetId])
      : station.kind === 'machine' ? Boolean(state.machines[targetId])
        : station.kind === 'shelf' ? state.unlockedProducts.includes(station.item)
          : station.kind === 'coop' ? Boolean(state.coops.coop)
            : station.kind === 'table' ? Boolean(state.diningTables[targetId])
              : Boolean(state.unlocked.register);
    if (!isUnlocked) return { ok: false, reason: 'locked' };
    const distance = Math.hypot(player.x - station.x, player.z - station.z);
    if (distance > 2.2) return { ok: false, reason: 'too-far' };

    return this.#command(`interact:${targetId}:${state.revision + 1}`, (draft) => {
      let moved = 0;
      if (station.kind === 'farm') {
        syncFarmHarvest(draft);
        const from = `farm:${station.item}`;
        moved += this.#transferUpTo(draft, from, 'player', station.item, draft.farms[targetId].readyCount);
        draft.farms[targetId].readyCount -= moved;
        return moved ? { ok: true, message: `${ITEMS[station.item].icon} ${moved} ürün alındı.` } : { ok: false, reason: 'empty' };
      }
      if (station.kind === 'machine') {
        const machine = draft.machines[targetId];
        if (!machine) return { ok: false, reason: 'locked' };
        const recipe = RECIPES[station.recipe];
        const output = `machine:${targetId}:output`;
        const outputItem = recipe.output;
        moved = this.#transferUpTo(draft, output, 'player', outputItem, draft.player.capacity);
        if (moved) return { ok: true, message: `${ITEMS[outputItem].icon} ${moved} ${ITEMS[outputItem].name} alındı.` };
        if (!moved) {
          const input = `machine:${targetId}:input`;
          for (const [itemId] of Object.entries(recipe.inputs)) {
            const amount = quantityAt(draft.stock, 'player', itemId);
            if (amount > 0) moved += this.#transferUpTo(draft, 'player', input, itemId, amount);
          }
        }
        return moved ? { ok: true, message: `${moved} malzeme ${station.title} girişine yüklendi.` } : { ok: false, reason: 'no-compatible-stock' };
      }
      if (station.kind === 'coop') {
        moved += this.#transferUpTo(draft, 'coop:eggs', 'player', 'EGG', draft.player.capacity);
        if (!moved) moved += this.#transferUpTo(draft, 'player', 'coop:feed', 'CHICKEN_FEED', draft.player.capacity);
        return moved ? { ok: true, message: 'Kümes stoğu aktarıldı.' } : { ok: false, reason: 'no-compatible-stock' };
      }
      if (station.kind === 'shelf') {
        const shelf = SHELVES[station.item];
        const location = shelf.id;
        const carried = quantityAt(draft.stock, 'player', station.item);
        if (carried > 0) {
          moved = this.#transferUpTo(draft, 'player', location, station.item, carried);
          return moved ? { ok: true, message: `${ITEMS[station.item].icon} Reyon dolduruldu.` } : { ok: false, reason: 'destination-full' };
        }
        moved = this.#transferUpTo(draft, location, 'player', station.item, draft.player.capacity);
        return moved ? { ok: true, message: `${ITEMS[station.item].icon} ${moved} ürün alındı.` } : { ok: false, reason: 'empty' };
      }
      if (station.kind === 'table') return this.#serveOrCollectTip(draft, targetId);
      if (station.kind === 'register') return { ok: false, reason: 'passive-station' };
      return { ok: false, reason: 'no-action' };
    });
  }

  #transferUpTo(state, from, to, item, requested) {
    const available = quantityAt(state.stock, from, item) - (state.stock[from].reserved?.[item] ?? 0);
    const space = state.stock[to].capacity - Object.values(state.stock[to].items).reduce((a, b) => a + b, 0)
      - (state.stock[to].reservedCapacity ?? 0);
    const count = Math.min(available, Math.max(0, space), requested);
    if (count < 1 || !canTransfer(state, from, to, item, count)) return 0;
    const id = `transfer:${state.tick}:${state.revision}:${from}:${to}:${item}`;
    return transferStock(state, { transactionId: id, from, to, item, quantity: count }).ok ? count : 0;
  }

  #serveOrCollectTip(state, tableId) {
    const table = state.diningTables[tableId];
    if (!table) return { ok: false, reason: 'locked' };
    if (table.tipAtoms > 0) {
      const ledger = new EconomyLedger(state.economy);
      ledger.credit(`tip:${tableId}:${state.tick}`, table.tipAtoms / 10_000, 'restaurant-tip');
      const diner = state.customers.find((entry) => entry.id === table.customerId);
      if (diner) {
        diner.phase = 'leaving';
        diner.route = [{ x: -37, z: 7 }, { x: -37, z: 10.4 }, { x: -37, z: 16 }];
        diner.routeIndex = 0;
        diner.tableId = null;
      }
      table.customerId = null;
      table.meal = null;
      table.tipAtoms = 0;
      state.stats.tipsCollected += 1;
      this.#refreshUpgrades(state);
      return { ok: true, message: '💵 Bahşiş alındı.' };
    }
    if (!table.customerId) return { ok: false, reason: 'table-empty' };
    const customer = state.customers.find((entry) => entry.id === table.customerId);
    if (!customer || customer.phase !== 'waiting-meal') return { ok: false, reason: 'customer-not-waiting' };
    const meal = customer.demand;
    if (quantityAt(state.stock, 'player', meal) < 1) return { ok: false, reason: 'meal-needed', item: meal };
    const transfer = transferStock(state, {
      transactionId: `serve:${customer.id}:${state.tick}`,
      from: 'player', to: `customer:${customer.id}`, item: meal, quantity: 1,
    });
    if (!transfer.ok) return { ok: false, reason: 'meal-transfer-failed' };
    customer.phase = 'eating';
    customer.eatTicks = 0;
    customer.meal = meal;
    table.meal = meal;
    table.eatTicks = 0;
    table.customerId = customer.id;
    state.stats.tablesServed += 1;
    return { ok: true, message: `${ITEMS[meal].icon} Yemek servis edildi.` };
  }

  setPlayerMove(vector, delta) {
    const player = { ...this.state.player };
    const speed = 7.5 * (this.state.speedMultiplier || 1);
    let dx = vector.x * speed * delta;
    let dz = vector.z * speed * delta;
    const length = Math.hypot(dx, dz);
    if (length > speed * delta) { dx *= speed * delta / length; dz *= speed * delta / length; }
    const obstacles = this.obstacles ?? [];
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.18));
    const stepX = dx / steps;
    const stepZ = dz / steps;
    const blocked = (x, z) => obstacles.some((o) => (
      x > o.min.x - 0.45 && x < o.max.x + 0.45 && z > o.min.z - 0.45 && z < o.max.z + 0.45
    ));
    for (let index = 0; index < steps; index += 1) {
      const nextX = player.x + stepX;
      const nextZ = player.z + stepZ;
      if (!blocked(nextX, player.z)) player.x = nextX;
      if (!blocked(player.x, nextZ)) player.z = nextZ;
    }
    if (vector.x || vector.z) player.facing = Math.atan2(vector.x, vector.z);
    player.x = Math.max(-49, Math.min(13.2, player.x));
    player.z = Math.max(-8.2, Math.min(11.8, player.z));
    this.state.player = player;
  }

  setPlayerTarget(x, z) {
    this.target = { x, z };
  }

  clearPlayerTarget() {
    this.target = null;
  }

  updateTargetMove(delta) {
    if (!this.target) return;
    const dx = this.target.x - this.state.player.x;
    const dz = this.target.z - this.state.player.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.25) { this.target = null; return; }
    const step = Math.min(distance, 7.5 * (this.state.speedMultiplier || 1) * delta);
    this.setPlayerMove({ x: dx / distance, z: dz / distance }, step / (7.5 * (this.state.speedMultiplier || 1)));
  }

  getNearbyAction() {
    const player = this.state.player;
    const candidates = [];
    for (const [id, station] of Object.entries(STATIONS)) {
      const unlocked = station.kind === 'farm' ? Boolean(this.state.farms[id])
        : station.kind === 'machine' ? Boolean(this.state.machines[id])
          : station.kind === 'shelf' ? this.state.unlockedProducts.includes(station.item)
          : station.kind === 'coop' ? Boolean(this.state.coops.coop)
            : station.kind === 'table' ? Boolean(this.state.diningTables[id])
              : true;
      if (unlocked) candidates.push({ id, ...station, distance: Math.hypot(player.x - station.x, player.z - station.z) });
    }
    for (const upgrade of this.getAvailableUpgrades()) {
      candidates.push({ ...upgrade, kind: 'upgrade', distance: Math.hypot(player.x - upgrade.x, player.z - upgrade.z) });
    }
    candidates.sort((a, b) => a.distance - b.distance);
    const nearest = candidates[0];
    if (!nearest || nearest.distance > 2.2) return null;
    if (nearest.kind === 'upgrade') return { ...nearest, label: `${nearest.title} · $${nearest.price}` };
    const state = this.state;
    if (nearest.kind === 'farm') return { ...nearest, label: `Hasat et · ${nearest.title}` };
    if (nearest.kind === 'machine') {
      const recipe = RECIPES[nearest.recipe];
      const output = quantityAt(state.stock, `machine:${nearest.id}:output`, recipe.output);
      const input = Object.keys(recipe.inputs).some((item) => quantityAt(state.stock, 'player', item) > 0);
      const missing = Object.entries(recipe.inputs).filter(([item, count]) => quantityAt(state.stock, `machine:${nearest.id}:input`, item) < count);
      const label = output > 0 ? `${ITEMS[recipe.output].icon} ${output} ürün hazır · al`
        : input ? 'Malzemeleri makineye yükle'
          : missing.length ? `Gerekli: ${missing.map(([item, count]) => `${count} ${ITEMS[item].name}`).join(' + ')}`
            : `Üretiliyor · ${Math.round((state.machines[nearest.id].progressTicks / (recipe.seconds * 10)) * 100)}%`;
      return { ...nearest, label, actionable: output > 0 || input };
    }
    if (nearest.kind === 'shelf') {
      const carried = quantityAt(state.stock, 'player', nearest.item);
      const stocked = quantityAt(state.stock, SHELVES[nearest.item].id, nearest.item);
      return { ...nearest, label: carried > 0 ? 'Reyonu doldur' : stocked > 0 ? `${ITEMS[nearest.item].icon} Ürünü al` : 'Reyon boş' };
    }
    if (nearest.kind === 'coop') return { ...nearest, label: quantityAt(state.stock, 'coop:eggs', 'EGG') ? '🥚 Yumurtaları al' : 'Kümese yem bırak' };
    if (nearest.kind === 'table') {
      const table = state.diningTables[nearest.id];
      return { ...nearest, label: table.tipAtoms ? '💵 Bahşişi al' : table.customerId ? 'Yemeği servis et' : nearest.title };
    }
    return { ...nearest, label: 'Müşteriler kasada ödeme yapıyor', actionable: false };
  }

  tick() {
    const draft = clone(this.state);
    const { events, durable } = advanceSimulation(draft);
    draft.tick += 1;
    this.#refreshUpgrades(draft);
    draft.quest = this.#questFor(draft);
    if (durable) {
      draft.revision += 1;
      try { this.#persist(`simulation:${draft.tick}`, draft); }
      catch (error) {
        this.onEvent({ type: 'save-error', message: error.message });
        return;
      }
    } else {
      this.state = draft;
    }
    for (const event of events) this.onEvent(event);
    if (draft.tick - this.lastDurableTick >= 300) {
      try { this.#persist(`checkpoint:${draft.tick}:${this.saveService.sequence + 1}`, this.state); }
      catch (error) { this.onEvent({ type: 'save-error', message: error.message }); }
    }
  }

  setObstacles(obstacles) {
    this.obstacles = obstacles;
  }

  setPaused(paused) {
    this.state.paused = paused;
  }

  checkpoint() {
    const draft = clone(this.state);
    draft.revision += 1;
    this.#persist(`checkpoint:${draft.tick}:${this.saveService.sequence + 1}`, draft);
  }

  setLanguage(language) {
    if (!['tr', 'en'].includes(language)) return { ok: false, reason: 'unsupported-language' };
    return this.#command(`language:${language}:${this.state.revision + 1}`, (draft) => {
      draft.settings.language = language;
      return { ok: true };
    });
  }

  setSetting(key, value) {
    if (!['sound', 'haptics'].includes(key)) return;
    return this.#command(`setting:${key}:${this.state.revision + 1}`, (draft) => {
      draft.settings[key] = Boolean(value);
      return { ok: true };
    });
  }

  setCharacter(character) {
    if (!['shopkeeper', 'cat', 'robot', 'panda', 'penguin'].includes(character)) return { ok: false, reason: 'unsupported-character' };
    const result = this.#command(`character:${character}:${this.state.revision + 1}`, (draft) => {
      draft.player.character = character;
      return { ok: true };
    });
    if (result.ok) {
      try { this.saveService.storage?.setItem('player_character', character); } catch { /* the committed game save is authoritative */ }
    }
    return result;
  }

  setSpeedMultiplier(multiplier) {
    if (![1, 2, 5].includes(multiplier)) return;
    this.state.speedMultiplier = multiplier;
  }

  debugCredit(amount) {
    return this.#command(`debug-credit:${this.state.revision + 1}`, (draft) => {
      new EconomyLedger(draft.economy).credit(`debug-credit:${draft.revision + 1}`, amount, 'debug');
      return { ok: true, message: `$${amount.toLocaleString('tr-TR')} eklendi.` };
    });
  }

  debugCapacity(amount) {
    return this.#command(`debug-capacity:${this.state.revision + 1}`, (draft) => {
      draft.player.capacity = amount;
      draft.stock.player.capacity = amount;
      return { ok: true, message: `🎒 Taşıma kapasitesi ${amount} oldu.` };
    });
  }

  reset() {
    this.saveService.clear();
    this.state = createInitialState();
    this.target = null;
    this.#persist('new-game');
    this.onEvent({ type: 'reset' });
  }
}

import { activeWorldEvent, advanceWorldEvents, hasWorldBuff } from './worldEvents.js';
import { ITEMS, MONEY_ATOMS, RECIPES, SHELVES, STATIONS } from './catalog.js';
import { getDecorationDimensions, getMarketCollisionBoxes, getShelfLocations, getStationDimensions, registerCashPosition, registerCashierPosition, stationPosition, getStaffFacilityAccess, getStaffFacilityCollisionBoxes } from './layout.js';
import { chooseStaffFacility, tickWorkerNeeds, workerWorkSpeed, recoverWorker } from './staff.js';
import { EconomyLedger } from './ledger.js';
import { decorBonus, decorScore } from './decorCatalog.js';
import { FARM_CAPACITY, ensureFarmState, removeFarmReady, syncFarmHarvest } from './farm.js';
import { adjustCustomerSatisfaction, customerMood, customerSpawnIntervalTicks, missedOpportunityAmount, saleMoodMultiplier, tipForMood } from './customerExperience.js';
import { nextOrder } from './orders.js';
import { cancelReservation, capacityAt, makeLocation, pickUpReservedStock, quantityAt, reserveStock, totalAt, transferStock } from './inventory.js';
import { staffSpeedMultiplier } from './progression.js';
import { STAFF_WAITING_AREA } from './dayCycle.js';
import { advanceProcurement } from './procurement.js';
import { findAvailableSlot, createTrafficVehicle, createDriveByVehicle, getVehicleByCustomer, stepTraffic } from './traffic.js';

const TICKS_PER_SECOND = 10;
const CHECKOUT_BASE_SECONDS = 1;
const CHECKOUT_SECONDS_PER_ITEM = 1;
const MAX_CUSTOMERS = 8;
const CUSTOMER_SPEED = 0.36;
const CUSTOMER_RADIUS = 0.32;
const WORKER_RADIUS = 0.3;
const CUSTOMER_WALLS = [
  { min: { x: -4.2, z: 8.8 }, max: { x: 0.9, z: 9.2 } },
  { min: { x: 9.1, z: 8.8 }, max: { x: 14.2, z: 9.2 } },
  { min: { x: -4.2, z: -9.2 }, max: { x: 14.2, z: -8.8 } },
  { min: { x: 13.8, z: -9.2 }, max: { x: 14.2, z: 9.2 } },
  { min: { x: -48.2, z: 8.8 }, max: { x: -42.2, z: 9.2 } },
  { min: { x: -31.8, z: 8.8 }, max: { x: -25.8, z: 9.2 } },
  { min: { x: -48.2, z: -9.2 }, max: { x: -25.8, z: -8.8 } },
  { min: { x: -48.2, z: -9.2 }, max: { x: -47.8, z: 9.2 } },
];
const WORKER_WALLS = [
  ...CUSTOMER_WALLS,
  { min: { x: -4.2, z: -9.0 }, max: { x: -3.8, z: -1.8 } },
  { min: { x: -4.2, z: 1.8 }, max: { x: -3.8, z: 9.0 } },
  { min: { x: -26.2, z: -9.0 }, max: { x: -25.8, z: -1.8 } },
  { min: { x: -26.2, z: 1.8 }, max: { x: -25.8, z: 9.0 } },
];

function random(state) {
  // Mulberry32: deterministic across save/load and independent of render FPS.
  let value = state.rng += 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  state.rng >>>= 0;
  return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
}

function move(state, from, to, item, quantity, key) {
  if (!state.stock[from] || !state.stock[to]) return 0;
  const free = capacityAt(state.stock, to) - totalAt(state.stock, to);
  const available = quantityAt(state.stock, from, item) - (state.stock[from].reserved?.[item] ?? 0);
  const amount = Math.min(quantity, free, available);
  if (amount <= 0) return 0;
  const reservationId = `reservation:${state.tick}:${key}`;
  const reservation = reserveStock(state, { reservationId, from, to, item, quantity: amount });
  if (!reservation.ok) return 0;
  const result = transferStock(state, {
    transactionId: `sim:${state.tick}:${key}`,
    from, to, item, quantity: amount, reservationId,
  });
  if (!result.ok) cancelReservation(state, reservationId);
  return result.ok ? amount : 0;
}

function produceFarm(state, events) {
  let durable = false;
  const farmTick = state.tick + 1;
  for (const [farmId, farm] of Object.entries(state.farms).filter(([id]) => stationPosition(state, id))) {
    const station = STATIONS[farmId] ?? state.customStations?.[farmId];
    const item = farm.item ?? station?.item;
    if (!item) continue;
    ensureFarmState(farm, state.tick, farmId);
    const location = `farm:${item}`;
    const golden = Boolean(activeWorldEvent(state, 'goldenHarvest'));
    if (golden) for (const plant of farm.plants) if (!plant.ready) plant.nextReadyTick -= 2;
    for (const plant of farm.plants) {
      if (plant.ready || plant.nextReadyTick > farmTick) continue;
      if (farm.readyCount >= FARM_CAPACITY || capacityAt(state.stock, location) - totalAt(state.stock, location) < 1) {
        plant.nextReadyTick += (Math.floor((farmTick - plant.nextReadyTick) / plant.cycleTicks) + 1) * plant.cycleTicks;
        continue;
      }
      state.stock[location].items[item] = quantityAt(state.stock, location, item) + 1;
      plant.ready = true;
      plant.nextReadyTick += plant.cycleTicks;
      farm.readyCount += 1;
      farm.harvestCount += 1;
      if (golden && farm.readyCount < FARM_CAPACITY && capacityAt(state.stock, location) - totalAt(state.stock, location) >= 1) {
        const extra = farm.plants.find(p => !p.ready);
        if (extra) {
          extra.ready = true;
          extra.nextReadyTick = Math.max(farmTick + 1, extra.nextReadyTick) + extra.cycleTicks;
          farm.readyCount += 1; farm.harvestCount += 1;
          state.stock[location].items[item] += 1;
        }
      }
      events.push({ type: 'production', item, farmId, message: `${ITEMS[item].name} hazır.` });
      durable = true;
    }
  }
  return durable;
}

function produceMachines(state, events) {
  let durable = false;
  for (const [machineId, machine] of Object.entries(state.machines).filter(([id]) => stationPosition(state, id))) {
    if (activeWorldEvent(state, 'machineJam')?.targetId === machineId) { machine.blocked = 'event-jam'; continue; }
    const station = STATIONS[machineId] ?? state.customStations?.[machineId];
    const recipeKey = machine.recipe ?? station?.recipe;
    const recipe = RECIPES[recipeKey];
    if (!recipe) continue;
    const inputId = `machine:${machineId}:input`;
    const outputId = `machine:${machineId}:output`;
    const outputFree = capacityAt(state.stock, outputId) - totalAt(state.stock, outputId)
      - (state.stock[outputId]?.reservedCapacity ?? 0);
    const hasInputs = Object.entries(recipe.inputs).every(([item, amount]) => quantityAt(state.stock, inputId, item) >= amount);
    if (outputFree < 1) {
      machine.blocked = 'output-full';
      machine.progressTicks = 0;
      machine.blockedTicks = 0;
      machine.blockedSinceTick = null;
      continue;
    }
    if (!hasInputs) {
      machine.blocked = 'missing-input';
      machine.progressTicks = 0;
      machine.blockedSinceTick ??= state.tick;
      machine.blockedTicks = (machine.blockedTicks ?? 0) + 1;
      continue;
    }
    machine.blocked = false;
    machine.blockedTicks = 0;
    machine.blockedSinceTick = null;
    machine.progressTicks += (Number.isFinite(machine.speedModifier) ? machine.speedModifier : 1) * (hasWorldBuff(state, 'maintenance', machineId) ? 1.25 : 1);
    const productionThreshold = recipe.seconds * TICKS_PER_SECOND;
    if (machine.progressTicks < productionThreshold) continue;
    machine.progressTicks -= productionThreshold;
    for (const [item, amount] of Object.entries(recipe.inputs)) {
      state.stock[inputId].items[item] -= amount;
      if (state.stock[inputId].items[item] === 0) delete state.stock[inputId].items[item];
    }
    state.stock[outputId].items[recipe.output] = quantityAt(state.stock, outputId, recipe.output) + 1;
    const producedStat = {
      TOMATO_PASTE: 'pasteProduced', ORANGE_JUICE: 'juiceProduced', POPCORN: 'popcornProduced',
      CHICKEN_FEED: 'feedProduced', FLOUR: 'flourProduced', BREAD: 'breadProduced',
      ORANGE_TART: 'orangeTartProduced', BURGER: 'burgerCooked', PIZZA: 'pizzaCooked',
    }[recipe.output];
    if (producedStat) state.stats[producedStat] = (state.stats[producedStat] ?? 0) + 1;
    events.push({ type: 'production', item: recipe.output, message: `${ITEMS[recipe.output].name} hazır.` });
    durable = true;
  }
  return durable;
}

function locationPosition(state, locationId) {
  if (locationId === 'dock:incoming') return STATIONS.loadingDock.access;
  if (locationId === 'warehouse:main') return STATIONS.warehouse.access;
  if (locationId.startsWith('farm:')) {
    const item = locationId.slice('farm:'.length);
    // Önce custom farm'lara bak, sonra sabit STATIONS'a
    const customEntry = Object.entries(state.farms).filter(([id]) => stationPosition(state, id)).find(([id]) => {
      const cs = state.customStations?.[id];
      return cs?.item === item;
    });
    if (customEntry) {
      const [farmId] = customEntry;
      const pos = state.layout?.[farmId] ?? state.customStations?.[farmId];
      if (pos) return { x: pos.x, z: pos.z };
    }
    const station = Object.entries(state.farms).filter(([id]) => stationPosition(state, id))
      .map(([id]) => STATIONS[id]).find((entry) => entry?.item === item);
    return station ? { x: station.x, z: station.z } : { x: -10, z: 5 };
  }
  if (locationId.startsWith('shelf:')) {
    // Önce custom shelf id'yi ara (format: shelf:tomatoShelf_5)
    const rest = locationId.slice('shelf:'.length);
    const shelf = getShelfLocations(state, rest).find((entry) => entry.stockId === locationId);
    if (shelf) return { x: shelf.x, z: shelf.z };
    if (SHELVES[rest]) return { x: SHELVES[rest].x, z: SHELVES[rest].z };
    // custom shelf id (e.g. tomatoShelf_5)
    const pos = state.layout?.[rest] ?? state.customStations?.[rest];
    if (pos) return { x: pos.x, z: pos.z };
    return null;
  }
  if (locationId.startsWith('machine:')) {
    const machineId = locationId.slice('machine:'.length).split(':')[0];
    const station = STATIONS[machineId] ?? state.customStations?.[machineId];
    if (station) return { x: station.x, z: station.z };
    // Custom machine
    const pos = state.layout?.[machineId] ?? state.customStations?.[machineId];
    return pos ? { x: pos.x, z: pos.z } : null;
  }
  if (locationId.startsWith('customer:')) {
    const customer = state.customers.find((entry) => entry.id === locationId.slice('customer:'.length));
    return customer ? { x: customer.x, z: customer.z } : null;
  }
  if (locationId.startsWith('coop:')) {
    const coop = stationPosition(state, 'coop');
    return coop ? { x: coop.x, z: coop.z } : null;
  }
  return null;
}

function chooseShelfLocation(state, item, preferredId = null, requireCapacity = false, selectionIndex = 0) {
  const shelves = getShelfLocations(state, item);
  const preferred = shelves.find((shelf) => shelf.id === preferredId);
  if (requireCapacity) {
    const available = shelves.filter((shelf) => capacityAt(state.stock, shelf.stockId)
      > totalAt(state.stock, shelf.stockId) + (state.stock[shelf.stockId]?.reservedCapacity ?? 0));
    if (preferred && available.includes(preferred)) return preferred;
    return available.sort((a, b) => {
      const aFill = (totalAt(state.stock, a.stockId) + (state.stock[a.stockId]?.reservedCapacity ?? 0)) / Math.max(1, capacityAt(state.stock, a.stockId));
      const bFill = (totalAt(state.stock, b.stockId) + (state.stock[b.stockId]?.reservedCapacity ?? 0)) / Math.max(1, capacityAt(state.stock, b.stockId));
      return aFill - bFill;
    })[0] ?? null;
  }
  if (preferred && quantityAt(state.stock, preferred.stockId, item) > 0) return preferred;
  const stocked = shelves.filter((shelf) => quantityAt(state.stock, shelf.stockId, item) > 0);
  if (stocked.length) return stocked[Math.abs(selectionIndex) % stocked.length];
  if (preferred) return preferred;
  return shelves
    .filter((shelf) => capacityAt(state.stock, shelf.stockId)
      > totalAt(state.stock, shelf.stockId) + (state.stock[shelf.stockId]?.reservedCapacity ?? 0))
    .sort((a, b) => {
      const aFill = totalAt(state.stock, a.stockId) / Math.max(1, capacityAt(state.stock, a.stockId));
      const bFill = totalAt(state.stock, b.stockId) / Math.max(1, capacityAt(state.stock, b.stockId));
      return aFill - bFill;
    })[0] ?? shelves[0] ?? null;
}

function shelfTargets(state, item = null) {
  const items = item ? [item] : [...new Set([
    ...(state.unlockedProducts ?? []),
    ...Object.values(state.customStations ?? []).filter((station) => station.kind === 'shelf').map((station) => station.item),
  ])];
  const targets = [];
  const seen = new Set();
  for (const shelfItem of items) {
    for (const shelf of getShelfLocations(state, shelfItem)) {
      if (seen.has(shelf.stockId)) continue;
      seen.add(shelf.stockId);
      const capacity = capacityAt(state.stock, shelf.stockId);
      const reservedCapacity = state.stock[shelf.stockId]?.reservedCapacity ?? 0;
      const filled = totalAt(state.stock, shelf.stockId) + reservedCapacity;
      if (capacity > filled) targets.push({ ...shelf, item: shelfItem, capacity, filled });
    }
  }
  return targets;
}

function hasShelfRestockDemand(state, item) {
  return shelfTargets(state, item).length > 0;
}

function restockSources(state, item) {
  const sources = [];
  const farm = `farm:${item}`;
  if (state.stock[farm] && Object.entries(state.farms ?? {}).some(([id, entry]) => {
    const station = STATIONS[id] ?? state.customStations?.[id];
    return (entry.item ?? station?.item) === item;
  })) sources.push(farm);
  if (item === 'EGG' && state.coops?.coop && state.stock['coop:eggs']) sources.push('coop:eggs');
  for (const [machineId, machine] of Object.entries(state.machines ?? {}).filter(([id]) => stationPosition(state, id))) {
    const station = STATIONS[machineId] ?? state.customStations?.[machineId];
    const recipe = RECIPES[machine.recipe ?? station?.recipe];
    const output = `machine:${machineId}:output`;
    if (recipe?.output === item && state.stock[output]) sources.push(output);
  }
  return [...new Set(sources)];
}

function farmIdForItem(state, item) {
  return Object.entries(state.farms ?? {}).find(([id, farm]) => {
    const station = STATIONS[id] ?? state.customStations?.[id];
    return (farm.item ?? station?.item) === item && farm.readyCount > 0;
  })?.[0];
}

function shelfRestockCandidate(state, item = null) {
  const targets = shelfTargets(state, item).sort((a, b) => {
    const aFromFarm = restockSources(state, a.item).some((source) => source.startsWith('farm:')) ? 0 : 1;
    const bFromFarm = restockSources(state, b.item).some((source) => source.startsWith('farm:')) ? 0 : 1;
    return aFromFarm - bFromFarm || a.filled / a.capacity - b.filled / b.capacity;
  });
  for (const target of targets) {
    for (const from of restockSources(state, target.item)) {
      if (!canMoveOne(state, from, target.stockId, target.item)) continue;
      return {
        from,
        to: target.stockId,
        item: target.item,
        purpose: 'shelf-restock',
        farmId: from.startsWith('farm:') ? farmIdForItem(state, target.item) : undefined,
      };
    }
  }
  return null;
}

function machineInputSources(state, item) {
  const farm = `farm:${item}`;
  const sources = state.stock[farm] ? [farm] : [];
  for (const [sourceId, sourceMachine] of Object.entries(state.machines ?? {}).filter(([id]) => stationPosition(state, id))) {
    const station = STATIONS[sourceId] ?? state.customStations?.[sourceId];
    const recipe = RECIPES[sourceMachine.recipe ?? station?.recipe];
    const output = `machine:${sourceId}:output`;
    if (recipe?.output === item && state.stock[output]) sources.push(output);
  }
  if (item === 'EGG' && state.stock['coop:eggs']) sources.push('coop:eggs');
  return [...new Set(sources)];
}

function workerCandidate(state, worker) {
  if (worker.type === 'warehouseOperator' && state.unlocked.managerOffice) {
    for (const shelf of shelfTargets(state)) {
      for (const from of ['dock:incoming', 'warehouse:main']) {
        if (canMoveOne(state, from, shelf.stockId, shelf.item)) return { from, to: shelf.stockId, item: shelf.item, purpose: 'shelf-restock' };
      }
    }
    for (const item of Object.keys(state.stock['dock:incoming'].items)) {
      if (canMoveOne(state, 'dock:incoming', 'warehouse:main', item)) return { from: 'dock:incoming', to: 'warehouse:main', item, purpose: 'warehouse-store' };
    }
  }
  if (worker.type === 'harvester') {
    for (const [farmId, farm] of Object.entries(state.farms).filter(([id]) => stationPosition(state, id))) {
      // Custom farm ya da sabit STATIONS'dan item'ı al
      const item = STATIONS[farmId]?.item ?? state.customStations?.[farmId]?.item ?? farm.item;
      if (!item) continue;
      const shelf = chooseShelfLocation(state, item, null, true);
      const to = shelf?.stockId;
      const pending = state.workers.filter((entry) => entry.task?.farmId === farmId && entry.task.phase === 'to-source').length;
      if (to && farm.readyCount > pending && canMoveOne(state, `farm:${item}`, to, item)) {
        return { from: `farm:${item}`, to, item, farmId };
      }
    }
  }
  if (worker.type === 'factoryFeeder' || worker.type === 'harvester') {
    const shelfTask = shelfRestockCandidate(state);
    if (shelfTask) return shelfTask;
    const machines = Object.entries(state.machines).filter(([id]) => stationPosition(state, id));
    for (const [sourceId, sourceMachine] of machines) {
      const sourceStation = STATIONS[sourceId] ?? state.customStations?.[sourceId];
      const item = RECIPES[sourceMachine.recipe ?? sourceStation?.recipe]?.output;
      const from = `machine:${sourceId}:output`;
      for (const [targetId, targetMachine] of machines) {
        const targetStation = STATIONS[targetId] ?? state.customStations?.[targetId];
        const required = RECIPES[targetMachine.recipe ?? targetStation?.recipe]?.inputs[item];
        const to = `machine:${targetId}:input`;
        if (required && !hasShelfRestockDemand(state, item)
          && quantityAt(state.stock, to, item) < required && canMoveOne(state, from, to, item)) {
          return { from, to, item, purpose: 'machine-input' };
        }
      }
    }
    const offset = Math.floor(state.tick / 8) % Math.max(1, machines.length);
    const orderedMachines = [...machines.slice(offset), ...machines.slice(0, offset)];
    for (const [machineId, machine] of orderedMachines) {
      const station = STATIONS[machineId] ?? state.customStations?.[machineId];
      const recipe = RECIPES[machine.recipe ?? station?.recipe];
      const input = `machine:${machineId}:input`;
      for (const [item, required] of Object.entries(recipe.inputs)) {
        if (hasShelfRestockDemand(state, item)) continue;
        const inTransit = Object.values(state.reservations).filter((entry) => entry.to === input && entry.item === item)
          .reduce((total, entry) => total + entry.quantity, 0);
        if (quantityAt(state.stock, input, item) + inTransit >= required) continue;
        const from = machineInputSources(state, item).find((source) => canMoveOne(state, source, input, item));
        if (from) return { from, to: input, item, purpose: 'machine-input',
          farmId: from.startsWith('farm:') ? farmIdForItem(state, item) : undefined };
      }
    }
  }
  if (worker.type === 'caretaker') {
    const eggShelf = getShelfLocations(state, 'EGG').find((shelf) => canMoveOne(state, 'coop:eggs', shelf.stockId, 'EGG'));
    if (eggShelf) {
      return { from: 'coop:eggs', to: eggShelf.stockId, item: 'EGG' };
    }
    if (canMoveOne(state, 'machine:feed:output', 'coop:feed', 'CHICKEN_FEED')) {
      return { from: 'machine:feed:output', to: 'coop:feed', item: 'CHICKEN_FEED' };
    }
  }
  if (worker.type === 'chefWaiter') {
    const shelfTask = shelfRestockCandidate(state);
    if (shelfTask) return shelfTask;
    for (const machineId of ['burgerKitchen', 'pizzaKitchen']) {
      const machine = state.machines[machineId];
      if (!machine) continue;
      const station = STATIONS[machineId] ?? state.customStations?.[machineId];
      const recipe = RECIPES[machine.recipe ?? station?.recipe];
      const input = `machine:${machineId}:input`;
      for (const [item, required] of Object.entries(recipe.inputs)) {
        if (hasShelfRestockDemand(state, item)) continue;
        const inTransit = Object.values(state.reservations).filter((entry) => entry.to === input && entry.item === item)
          .reduce((total, entry) => total + entry.quantity, 0);
        if (quantityAt(state.stock, input, item) + inTransit >= required) continue;
        const from = machineInputSources(state, item).find((source) => canMoveOne(state, source, input, item));
        if (from) return { from, to: input, item, purpose: 'machine-input',
          farmId: from.startsWith('farm:') ? farmIdForItem(state, item) : undefined };
      }
    }
  }
  if (worker.type === 'waiter') {
    for (const [tableId, table] of Object.entries(state.diningTables)) {
      const customer = state.customers.find((entry) => entry.id === table.customerId && entry.phase === 'waiting-meal');
      if (!customer) continue;
      const machineId = customer.demand === 'BURGER' ? 'burgerKitchen' : 'pizzaKitchen';
      const output = `machine:${machineId}:output`;
      if (quantityAt(state.stock, output, customer.demand) > 0) {
        return { from: output, to: `customer:${customer.id}`, item: customer.demand, tableId, customerId: customer.id };
      }
    }
  }
  return null;
}

function canMoveOne(state, from, to, item) {
  const source = state.stock[from];
  const target = state.stock[to];
  return Boolean(source && target
    && quantityAt(state.stock, from, item) - (source.reserved?.[item] ?? 0) > 0
    && capacityAt(state.stock, to) - totalAt(state.stock, to) - (target.reservedCapacity ?? 0) > 0);
}

function assignWorkerTask(state, worker) {
  const candidate = workerCandidate(state, worker);
  if (!candidate) return false;
  const reservationId = `worker-task:${worker.id}:${state.nextEntityId++}`;
  const reservation = reserveStock(state, { reservationId, ...candidate, quantity: 1 });
  if (!reservation.ok) return false;
  const carrier = `worker:${worker.id}`;
  makeLocation(state.stock, carrier, 6);
  worker.task = { ...candidate, reservationId, carrier, quantity: 1, phase: 'to-source' };
  return true;
}

function prioritizeShelfRestock(state, worker) {
  const task = worker.task;
  const targetsMachine = task?.to?.startsWith('machine:') && task.to.endsWith(':input');
  if (!targetsMachine || !hasShelfRestockDemand(state, task.item)) return false;
  if (task.phase === 'to-source') {
    cancelReservation(state, task.reservationId);
    worker.task = null;
    return true;
  }
  if (task.phase !== 'to-target') return false;
  const shelf = chooseShelfLocation(state, task.item, null, true);
  if (!shelf) return false;

  cancelReservation(state, task.reservationId);
  const reservationId = `worker-task:${worker.id}:${state.nextEntityId++}`;
  const reservation = reserveStock(state, {
    reservationId,
    from: task.carrier,
    to: shelf.stockId,
    item: task.item,
    quantity: task.quantity,
  });
  if (!reservation.ok) {
    reserveStock(state, {
      reservationId: task.reservationId,
      from: task.carrier,
      to: task.to,
      item: task.item,
      quantity: task.quantity,
    });
    return false;
  }

  task.from = task.carrier;
  task.to = shelf.stockId;
  task.reservationId = reservationId;
  task.phase = 'to-target';
  task.purpose = 'shelf-restock';
  clearWorkerRoute(task);
  delete task.farmId;
  return true;
}

function clearWorkerRoute(task) {
  delete task.route;
  delete task.routeIndex;
  delete task.routeTarget;
  delete task.routeObstacles;
}

function getWorkerObstacles(state, environmentObstacles) {
  const walls = environmentObstacles.length ? environmentObstacles.map((obstacle, index) => ({
    id: `environment-wall:${index}`,
    minX: obstacle.min.x,
    maxX: obstacle.max.x,
    minZ: obstacle.min.z,
    maxZ: obstacle.max.z,
  })) : WORKER_WALLS.map((wall, index) => ({
    id: `wall:${index}`,
    minX: wall.min.x,
    maxX: wall.max.x,
    minZ: wall.min.z,
    maxZ: wall.max.z,
  }));
  const boxes = [...getMarketCollisionBoxes(state), ...getStaffFacilityCollisionBoxes(state), ...walls];
  const stations = { ...STATIONS, ...(state.customStations ?? {}) };
  for (const [id, station] of Object.entries(stations)) {
    const active = station.kind === 'machine' ? Boolean(state.machines?.[id])
      : station.kind === 'table' ? Boolean(state.diningTables?.[id])
        : station.kind === 'coop' ? Boolean(state.coops?.coop) : false;
    if (!active) continue;
    const position = stationPosition(state, id);
    if (!position) continue;
    const dimensions = getStationDimensions(id, position.rotation ?? 0);
    boxes.push({
      id,
      minX: position.x - dimensions.width / 2,
      maxX: position.x + dimensions.width / 2,
      minZ: position.z - dimensions.depth / 2,
      maxZ: position.z + dimensions.depth / 2,
    });
  }
  for (const decoration of state.decorations ?? []) {
    if (decoration.type === 'welcomeMat') continue;
    const dimensions = getDecorationDimensions(decoration.type, decoration.rotation ?? 0);
    boxes.push({
      id: decoration.id,
      minX: decoration.x - dimensions.width / 2,
      maxX: decoration.x + dimensions.width / 2,
      minZ: decoration.z - dimensions.depth / 2,
      maxZ: decoration.z + dimensions.depth / 2,
    });
  }
  return boxes.map((box) => ({
    id: box.id,
    minX: box.minX - WORKER_RADIUS,
    maxX: box.maxX + WORKER_RADIUS,
    minZ: box.minZ - WORKER_RADIUS,
    maxZ: box.maxZ + WORKER_RADIUS,
  }));
}

function isWorkerPointBlocked(point, obstacles) {
  return obstacles.some((box) => point.x >= box.minX && point.x <= box.maxX
    && point.z >= box.minZ && point.z <= box.maxZ);
}

function workerStationAccessPoint(state, stationId, worker, obstacles) {
  const station = stationPosition(state, stationId);
  if (!station) return null;
  const dimensions = getStationDimensions(stationId, station.rotation ?? 0);
  const offset = WORKER_RADIUS + 0.12;
  const candidates = [
    { x: station.x - dimensions.width / 2 - offset, z: station.z },
    { x: station.x + dimensions.width / 2 + offset, z: station.z },
    { x: station.x, z: station.z - dimensions.depth / 2 - offset },
    { x: station.x, z: station.z + dimensions.depth / 2 + offset },
  ];
  return candidates.filter((point) => !isWorkerPointBlocked(point, obstacles))
    .sort((a, b) => Math.hypot(a.x - worker.x, a.z - worker.z) - Math.hypot(b.x - worker.x, b.z - worker.z))[0] ?? null;
}

function workerTaskTarget(state, worker, task, obstacles) {
  if (task.phase === 'to-source' && task.farmId) {
    const farm = stationPosition(state, task.farmId);
    if (farm) return { x: farm.x, z: farm.z };
  }
  const locationId = task.phase === 'to-source' ? task.from : task.to;
  if (locationId.startsWith('shelf:')) {
    const shelf = getShelfLocations(state, task.item).find((entry) => entry.stockId === locationId);
    if (shelf) return workerStationAccessPoint(state, shelf.id, worker, obstacles);
  }
  if (locationId.startsWith('machine:')) {
    const machineId = locationId.slice('machine:'.length).split(':')[0];
    return workerStationAccessPoint(state, machineId, worker, obstacles);
  }
  if (locationId.startsWith('coop:')) return workerStationAccessPoint(state, 'coop', worker, obstacles);
  return locationPosition(state, locationId);
}

function workerObstacleSignature(obstacles) {
  return obstacles.map((box) => `${box.id}:${box.minX},${box.maxX},${box.minZ},${box.maxZ}`).join('|');
}

function findWorkerRoute(start, target, obstacles) {
  if (!obstacles.some((box) => segmentIntersectsBox(start, target, box))) return [{ x: target.x, z: target.z }];

  const cellSize = 0.5;
  const margin = 8;
  const minX = Math.floor((Math.min(start.x, target.x) - margin) / cellSize) * cellSize;
  const maxX = Math.ceil((Math.max(start.x, target.x) + margin) / cellSize) * cellSize;
  const minZ = Math.floor((Math.min(start.z, target.z) - margin) / cellSize) * cellSize;
  const maxZ = Math.ceil((Math.max(start.z, target.z) + margin) / cellSize) * cellSize;
  const cols = Math.round((maxX - minX) / cellSize) + 1;
  const rows = Math.round((maxZ - minZ) / cellSize) + 1;
  const toCol = (x) => Math.max(0, Math.min(cols - 1, Math.round((x - minX) / cellSize)));
  const toRow = (z) => Math.max(0, Math.min(rows - 1, Math.round((z - minZ) / cellSize)));
  const toX = (column) => minX + column * cellSize;
  const toZ = (row) => minZ + row * cellSize;
  const key = (column, row) => row * cols + column;
  const startKey = key(toCol(start.x), toRow(start.z));
  const targetKey = key(toCol(target.x), toRow(target.z));
  const blocked = new Uint8Array(cols * rows);
  for (let row = 0; row < rows; row += 1) {
    const z = toZ(row);
    for (let column = 0; column < cols; column += 1) {
      const point = { x: toX(column), z };
      if (isWorkerPointBlocked(point, obstacles)) blocked[key(column, row)] = 1;
    }
  }
  blocked[startKey] = 0;
  blocked[targetKey] = 0;

  const open = new Set([startKey]);
  const previous = new Map();
  const cost = new Float32Array(cols * rows).fill(Infinity);
  const estimate = new Float32Array(cols * rows).fill(Infinity);
  cost[startKey] = 0;
  estimate[startKey] = Math.hypot(start.x - target.x, start.z - target.z);
  const directions = [[0, 1, 1], [0, -1, 1], [1, 0, 1], [-1, 0, 1],
    [1, 1, 1.414], [-1, 1, 1.414], [1, -1, 1.414], [-1, -1, 1.414]];
  let current = null;
  while (open.size) {
    let bestEstimate = Infinity;
    for (const entry of open) {
      if (estimate[entry] < bestEstimate) {
        current = entry;
        bestEstimate = estimate[entry];
      }
    }
    if (current === targetKey) break;
    open.delete(current);
    const column = current % cols;
    const row = Math.floor(current / cols);
    for (const [dc, dr, stepCost] of directions) {
      const nextColumn = column + dc;
      const nextRow = row + dr;
      if (nextColumn < 0 || nextColumn >= cols || nextRow < 0 || nextRow >= rows) continue;
      const next = key(nextColumn, nextRow);
      if (blocked[next]) continue;
      if (dc && dr && (blocked[key(column + dc, row)] || blocked[key(column, row + dr)])) continue;
      const nextCost = cost[current] + stepCost * cellSize;
      if (nextCost >= cost[next]) continue;
      previous.set(next, current);
      cost[next] = nextCost;
      estimate[next] = nextCost + Math.hypot(toX(nextColumn) - target.x, toZ(nextRow) - target.z);
      open.add(next);
    }
  }
  if (current !== targetKey) return [];

  const gridPath = [];
  for (let cursor = targetKey; cursor !== undefined; cursor = previous.get(cursor)) {
    gridPath.push({ x: toX(cursor % cols), z: toZ(Math.floor(cursor / cols)) });
  }
  gridPath.reverse();
  const points = [start, ...gridPath, target];
  const route = [];
  let index = 0;
  while (index < points.length - 1) {
    let farthest = index + 1;
    for (let candidate = points.length - 1; candidate > index; candidate -= 1) {
      if (!obstacles.some((box) => segmentIntersectsBox(points[index], points[candidate], box))) {
        farthest = candidate;
        break;
      }
    }
    if (obstacles.some((box) => segmentIntersectsBox(points[index], points[farthest], box))) return [];
    route.push({ x: points[farthest].x, z: points[farthest].z });
    index = farthest;
  }
  return route;
}

function moveWorkerAlongRoute(worker, task, distance) {
  let remaining = distance;
  while (remaining > 0 && task.routeIndex < task.route.length) {
    const point = task.route[task.routeIndex];
    const dx = point.x - worker.x;
    const dz = point.z - worker.z;
    const length = Math.hypot(dx, dz);
    if (length > 0.0001) worker.facing = Math.atan2(dx, dz);
    if (length <= remaining) {
      worker.x = point.x;
      worker.z = point.z;
      task.routeIndex += 1;
      remaining -= length;
    } else {
      worker.x += dx / length * remaining;
      worker.z += dz / length * remaining;
      remaining = 0;
    }
  }
  return task.routeIndex >= task.route.length;
}

function workerWaitingPosition(index) {
  const column = index % STAFF_WAITING_AREA.columns;
  const row = Math.floor(index / STAFF_WAITING_AREA.columns);
  return {
    x: STAFF_WAITING_AREA.minX + column * STAFF_WAITING_AREA.spacing,
    z: STAFF_WAITING_AREA.minZ + row * STAFF_WAITING_AREA.spacing,
  };
}

function moveWorkerToWaitingArea(worker, target, obstacles, obstacleSignature) {
  if (Math.hypot(worker.x - target.x, worker.z - target.z) < 0.08) {
    worker.salaryWaitRoute = null;
    worker.salaryWaitRouteIndex = 0;
    worker.salaryWaitTarget = target;
    worker.salaryWaitObstacles = obstacleSignature;
    return;
  }

  const routeIsCurrent = Array.isArray(worker.salaryWaitRoute) && worker.salaryWaitRoute.length > 0
    && worker.salaryWaitTarget?.x === target.x && worker.salaryWaitTarget?.z === target.z
    && worker.salaryWaitObstacles === obstacleSignature;
  if (!routeIsCurrent) {
    worker.salaryWaitRoute = findWorkerRoute(worker, target, obstacles);
    worker.salaryWaitRouteIndex = 0;
    worker.salaryWaitTarget = target;
    worker.salaryWaitObstacles = obstacleSignature;
  }
  if (!worker.salaryWaitRoute.length) return;

  const speedModifier = Math.min(1.2, Math.max(1, Number.isFinite(worker.speedModifier)
    ? worker.speedModifier : staffSpeedMultiplier(worker.upgradeLevel ?? 0)));
  const route = { route: worker.salaryWaitRoute, routeIndex: worker.salaryWaitRouteIndex ?? 0 };
  moveWorkerAlongRoute(worker, route, 0.34 * speedModifier);
  worker.salaryWaitRouteIndex = route.routeIndex;
}

function workerTick(state, environmentObstacles) {
  let durable = false;
  const obstacles = getWorkerObstacles(state, environmentObstacles);
  const obstacleSignature = workerObstacleSignature(obstacles);
  for (const [workerIndex, worker] of state.workers.entries()) {
    tickWorkerNeeds(worker, Boolean(worker.task || worker.type === 'security' || worker.type === 'cashier'
      && state.customers.some(customer => ['queueing', 'paying'].includes(customer.phase)
        && (customer.targetRegisterId ?? 'register') === (worker.registerId ?? 'register'))
      || worker.type === 'chefWaiter' && Object.entries(state.machines).filter(([id]) => stationPosition(state, id)).some(([id, machine]) =>
        ['burgerKitchen', 'pizzaKitchen'].includes(id) && machine.blocked === false)));
    if (worker.waitingForSalary) {
      worker.break = null;
      if (worker.task?.phase === 'to-source') {
        cancelReservation(state, worker.task.reservationId);
        worker.task = null;
        durable = true;
      }
      if (worker.task) clearWorkerRoute(worker.task);
      moveWorkerToWaitingArea(worker, workerWaitingPosition(workerIndex), obstacles, obstacleSignature);
      continue;
    }
    // A carrier finishes its reservation before taking a break. Unpicked jobs can be safely released.
    if (!worker.break && worker.task?.phase !== 'to-target' && (worker.breakCooldownUntil ?? 0) <= state.tick) {
      const facility = chooseStaffFacility(state, worker);
      if (facility) {
        if (worker.task) { cancelReservation(state, worker.task.reservationId); worker.task = null; }
        const occupiedSlots = new Set(state.workers.filter(other => other.break?.facilityId === facility.id
          && other.break.phase !== 'returning').map(other => other.break.slot ?? 0));
        const slot = occupiedSlots.has(0) ? 1 : 0;
        worker.break = { facilityId: facility.id, phase: 'to-facility', ticks: 0, slot,
          returnTo: { x: worker.x, z: worker.z } };
        durable = true;
      }
    }
    if (worker.break) {
      const rest = worker.break;
      const access = getStaffFacilityAccess(state, rest.facilityId, rest.slot ?? 0);
      if (!access) { worker.break = null; worker.breakCooldownUntil = state.tick + 80; durable = true; }
      else if (rest.phase === 'resting') {
        worker.facing = 0;
        if (recoverWorker(worker, rest.facilityId)) {
          rest.phase = 'returning'; clearWorkerRoute(rest); durable = true;
        }
        continue;
      } else {
        const register = stationPosition(state, worker.registerId ?? 'register') ?? STATIONS.register;
        const home = worker.type === 'cashier' ? registerCashierPosition(register) : rest.returnTo;
        const target = rest.phase === 'returning' ? home : access;
        if (!rest.route || rest.routeObstacles !== obstacleSignature || rest.routeTarget?.x !== target.x || rest.routeTarget?.z !== target.z) {
          rest.route = findWorkerRoute(worker, target, obstacles); rest.routeIndex = 0;
          rest.routeTarget = { ...target }; rest.routeObstacles = obstacleSignature;
        }
        if (!rest.route.length) { worker.break = null; worker.breakCooldownUntil = state.tick + 80; durable = true; }
        else if (moveWorkerAlongRoute(worker, rest, 0.34 * workerWorkSpeed(worker))) {
          if (rest.phase === 'returning') {
            worker.break = null; worker.breakCooldownUntil = state.tick + 100;
            if (worker.type === 'cashier') worker.facing = home.facing;
          }
          else { rest.phase = 'resting'; rest.ticks = 0; worker.facing = 0; }
          durable = true;
        }
        continue;
      }
    }
    if (prioritizeShelfRestock(state, worker)) {
      durable = true;
      if (!worker.task && assignWorkerTask(state, worker)) durable = true;
    }
    if (!worker.task) {
      if (state.tick % 8 === 0 && assignWorkerTask(state, worker)) durable = true;
      if (!worker.task) continue;
    }
    const task = worker.task;
    const target = workerTaskTarget(state, worker, task, obstacles);
    if (!target) continue;
    if (!Array.isArray(task.route) || task.routeTarget?.x !== target.x || task.routeTarget?.z !== target.z
      || task.routeObstacles !== obstacleSignature) {
      task.route = findWorkerRoute(worker, target, obstacles);
      task.routeIndex = 0;
      task.routeTarget = { x: target.x, z: target.z };
      task.routeObstacles = obstacleSignature;
    }
    const speedModifier = workerWorkSpeed(worker);
    if (!task.route.length || !moveWorkerAlongRoute(worker, task, 0.34 * speedModifier)) continue;
    if (task.phase === 'to-source') {
      const picked = pickUpReservedStock(state, task.reservationId, task.carrier);
      if (picked.ok) {
        recordAnimationCue(worker, state, 'pickup', { id: `${task.reservationId}:pickup`,
          item: task.item, location: task.from });
        if (task.farmId && state.farms[task.farmId]) removeFarmReady(state.farms[task.farmId], task.quantity, state.tick);
        task.phase = 'to-target';
        clearWorkerRoute(task);
        durable = true;
      }
      continue;
    }
    const delivered = transferStock(state, {
      transactionId: `worker-delivery:${task.reservationId}`,
      from: task.carrier,
      to: task.to,
      item: task.item,
      quantity: task.quantity,
      reservationId: task.reservationId,
    });
    if (!delivered.ok) continue;
    recordAnimationCue(worker, state, 'deliver', { id: `${task.reservationId}:deliver`,
      item: task.item, location: task.to, shelf: task.to.startsWith('shelf:') });
    if (task.customerId) {
      const customer = state.customers.find((entry) => entry.id === task.customerId);
      const table = state.diningTables[task.tableId];
      if (customer && table) {
        recordAnimationCue(customer, state, 'receive', { id: `${task.reservationId}:receive`,
          item: task.item, location: `customer:${customer.id}` });
        customer.phase = 'eating';
        customer.meal = task.item;
        customer.eatTicks = 0;
        table.meal = task.item;
        table.eatTicks = 0;
        state.stats.tablesServed += 1;
      }
    }
    worker.task = null;
    durable = true;
  }
  return durable;
}

// Presentation-only receipts: inventory and AI timing remain authoritative.
// Keep several receipts so a render following multiple simulation ticks does
// not miss a pickup/delivery. No unbounded per-character event history.
function recordAnimationCue(entity, state, type, details) {
  entity.animationCues ??= [];
  entity.animationCues.push({ type, tick: state.tick, x: entity.x, z: entity.z, ...details });
  if (entity.animationCues.length > 8) entity.animationCues.shift();
}

function moveToward(customer, targetX, targetZ, distance) {
  const dx = targetX - customer.x;
  const dz = targetZ - customer.z;
  const length = Math.hypot(dx, dz);
  if (length > 0.0001) customer.facing = Math.atan2(dx, dz);
  if (length <= distance) {
    customer.x = targetX;
    customer.z = targetZ;
    return true;
  }
  customer.x += dx / length * distance;
  customer.z += dz / length * distance;
  return false;
}

function segmentIntersectsBox(p1, p2, box) {
  let tmin = 0;
  let tmax = 1;
  const dx = p2.x - p1.x;
  const dz = p2.z - p1.z;

  if (Math.abs(dx) < 1e-8) {
    if (p1.x < box.minX || p1.x > box.maxX) return false;
  } else {
    const invD = 1 / dx;
    let t1 = (box.minX - p1.x) * invD;
    let t2 = (box.maxX - p1.x) * invD;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return false;
  }

  if (Math.abs(dz) < 1e-8) {
    if (p1.z < box.minZ || p1.z > box.maxZ) return false;
  } else {
    const invD = 1 / dz;
    let t1 = (box.minZ - p1.z) * invD;
    let t2 = (box.maxZ - p1.z) * invD;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return false;
  }

  return true;
}

function getMarketObstacles(state) {
  const allBoxes = getMarketCollisionBoxes(state);
  const obstacles = [];
  for (const box of allBoxes) {
    obstacles.push({
      id: box.id,
      minX: box.minX - CUSTOMER_RADIUS - 0.06,
      maxX: box.maxX + CUSTOMER_RADIUS + 0.06,
      minZ: box.minZ - CUSTOMER_RADIUS - 0.06,
      maxZ: box.maxZ + CUSTOMER_RADIUS + 0.06,
    });
  }
  return obstacles;
}

export function findCustomerMarketRoute(state, start, target, targetItem = null) {
  const obstacles = getMarketObstacles(state);
  const targetPoint = { x: target.x, z: target.z };

  if (!obstacles.some((box) => segmentIntersectsBox(start, targetPoint, box))) {
    return [targetPoint];
  }

  const navStart = { x: start.x, z: start.z };

  const gridMinX = -3.0;
  const gridMaxX = 13.0;
  const gridMinZ = -8.0;
  const gridMaxZ = 8.0;
  const cellSize = 0.5;
  const cols = Math.round((gridMaxX - gridMinX) / cellSize) + 1;
  const rows = Math.round((gridMaxZ - gridMinZ) / cellSize) + 1;

  const toCol = (x) => Math.max(0, Math.min(cols - 1, Math.round((x - gridMinX) / cellSize)));
  const toRow = (z) => Math.max(0, Math.min(rows - 1, Math.round((z - gridMinZ) / cellSize)));
  const toX = (c) => gridMinX + c * cellSize;
  const toZ = (r) => gridMinZ + r * cellSize;
  const cellKey = (c, r) => r * cols + c;

  const startC = toCol(navStart.x);
  const startR = toRow(navStart.z);
  const targetC = toCol(targetPoint.x);
  const targetR = toRow(targetPoint.z);

  const blocked = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r += 1) {
    const cz = toZ(r);
    for (let c = 0; c < cols; c += 1) {
      const cx = toX(c);
      for (const box of obstacles) {
        if (cx >= box.minX && cx <= box.maxX && cz >= box.minZ && cz <= box.maxZ) {
          blocked[cellKey(c, r)] = 1;
          break;
        }
      }
    }
  }
  blocked[cellKey(startC, startR)] = 0;
  blocked[cellKey(targetC, targetR)] = 0;

  const startKey = cellKey(startC, startR);
  let targetKey = cellKey(targetC, targetR);
  const openSet = new Set([startKey]);
  const cameFrom = new Map();
  const gScore = new Float32Array(cols * rows).fill(Infinity);
  const fScore = new Float32Array(cols * rows).fill(Infinity);

  gScore[startKey] = 0;
  fScore[startKey] = Math.hypot(navStart.x - targetPoint.x, navStart.z - targetPoint.z);

  const dirs = [
    [0, 1, 1], [0, -1, 1], [1, 0, 1], [-1, 0, 1],
    [1, 1, 1.414], [-1, 1, 1.414], [1, -1, 1.414], [-1, -1, 1.414],
  ];

  let currentKey = null;
  while (openSet.size > 0) {
    let best = null;
    let bestF = Infinity;
    for (const k of openSet) {
      if (fScore[k] < bestF) {
        bestF = fScore[k];
        best = k;
      }
    }
    currentKey = best;
    if (currentKey === targetKey) break;
    openSet.delete(currentKey);

    const c = currentKey % cols;
    const r = Math.floor(currentKey / cols);

    for (const [dc, dr, dist] of dirs) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
      const nk = cellKey(nc, nr);
      if (blocked[nk]) continue;
      if (dc !== 0 && dr !== 0) {
        if (blocked[cellKey(c + dc, r)] || blocked[cellKey(c, r + dr)]) continue;
      }

      const tentativeG = gScore[currentKey] + dist * cellSize;
      if (tentativeG < gScore[nk]) {
        cameFrom.set(nk, currentKey);
        gScore[nk] = tentativeG;
        fScore[nk] = tentativeG + Math.hypot(toX(nc) - targetPoint.x, toZ(nr) - targetPoint.z);
        openSet.add(nk);
      }
    }
  }

  if (currentKey !== targetKey) {
    let closestVisited = null;
    let closestDist = Infinity;
    for (const k of cameFrom.keys()) {
      const d = Math.hypot(toX(k % cols) - targetPoint.x, toZ(Math.floor(k / cols)) - targetPoint.z);
      if (d < closestDist) {
        closestDist = d;
        closestVisited = k;
      }
    }
    if (closestVisited !== null && closestDist <= 2.5) {
      targetKey = closestVisited;
    } else {
      return [];
    }
  }

  const path = [];
  let curr = targetKey;
  while (curr !== undefined) {
    path.push({ x: toX(curr % cols), z: toZ(Math.floor(curr / cols)) });
    curr = cameFrom.get(curr);
  }
  path.reverse();

  const allPoints = [navStart, ...path, targetPoint];
  const smoothed = [];
  let currIdx = 0;
  while (currIdx < allPoints.length - 1) {
    let farthest = currIdx + 1;
    for (let testIdx = allPoints.length - 1; testIdx > currIdx; testIdx -= 1) {
      const pA = allPoints[currIdx];
      const pB = allPoints[testIdx];
      const blockedLine = obstacles.some((b) => segmentIntersectsBox(pA, pB, b));
      if (!blockedLine) {
        farthest = testIdx;
        break;
      }
    }
    if (obstacles.some((box) => segmentIntersectsBox(allPoints[currIdx], allPoints[farthest], box))) return [];
    smoothed.push(allPoints[farthest]);
    currIdx = farthest;
  }

  return smoothed;
}

function routeTo(customer, points, phase) {
  customer.route = (points ?? []).map(({ x, z }) => ({ x, z }));
  customer.routeIndex = 0;
  customer.routeBlocked = customer.route.length === 0;
  customer.phase = phase;
}

function registerQueuePosition(register, distance) {
  const rotation = register.rotation ?? 0;
  return {
    x: register.x + Math.sin(rotation) * distance,
    z: register.z + Math.cos(rotation) * distance,
  };
}

function moveAlongRoute(customer) {
  if (customer.routeBlocked) return false;
  if (!customer.route || customer.routeIndex >= customer.route.length) return true;
  const point = customer.route[customer.routeIndex];
  if (moveToward(customer, point.x, point.z, CUSTOMER_SPEED)) {
    customer.routeIndex += 1;
    if (customer.routeIndex >= customer.route.length) return true;
  }
  return false;
}

function resolveCustomerPosition(customer, state) {
  if (customer.phase === 'waiting-meal' || customer.phase === 'eating' || customer.phase === 'ready-tip') {
    return;
  }
  const radius = CUSTOMER_RADIUS;
  for (const wall of CUSTOMER_WALLS) {
    const closestX = Math.max(wall.min.x, Math.min(wall.max.x, customer.x));
    const closestZ = Math.max(wall.min.z, Math.min(wall.max.z, customer.z));
    const dx = customer.x - closestX;
    const dz = customer.z - closestZ;
    const distanceSq = dx * dx + dz * dz;
    if (distanceSq >= radius * radius) continue;
    if (distanceSq > 0.0001) {
      const distance = Math.sqrt(distanceSq);
      customer.x += dx / distance * (radius - distance);
      customer.z += dz / distance * (radius - distance);
    } else {
      const edges = [
        { d: Math.abs(customer.x - wall.min.x), x: wall.min.x - radius, z: customer.z },
        { d: Math.abs(wall.max.x - customer.x), x: wall.max.x + radius, z: customer.z },
        { d: Math.abs(customer.z - wall.min.z), x: customer.x, z: wall.min.z - radius },
        { d: Math.abs(wall.max.z - customer.z), x: customer.x, z: wall.max.z + radius },
      ].sort((a, b) => a.d - b.d)[0];
      customer.x = edges.x;
      customer.z = edges.z;
    }
  }
  const marketBoxes = getMarketCollisionBoxes(state);
  for (const box of marketBoxes) {
    const minX = box.minX;
    const maxX = box.maxX;
    const minZ = box.minZ;
    const maxZ = box.maxZ;
    if (customer.x > minX - radius && customer.x < maxX + radius && customer.z > minZ - radius && customer.z < maxZ + radius) {
      const dLeft = Math.abs(customer.x - (minX - radius));
      const dRight = Math.abs(customer.x - (maxX + radius));
      const dTop = Math.abs(customer.z - (minZ - radius));
      const dBottom = Math.abs(customer.z - (maxZ + radius));
      const minD = Math.min(dLeft, dRight, dTop, dBottom);
      if (minD === dBottom) customer.z = maxZ + radius;
      else if (minD === dTop) customer.z = minZ - radius;
      else if (minD === dLeft) customer.x = minX - radius;
      else customer.x = maxX + radius;
    }
  }
  if (state?.diningTables) {
    for (const tableId of Object.keys(state.diningTables)) {
      const station = stationPosition(state, tableId);
      if (!station) continue;
      const minX = station.x - 0.92;
      const maxX = station.x + 0.92;
      const minZ = station.z - 0.65;
      const maxZ = station.z + 0.65;
      if (customer.x > minX - radius && customer.x < maxX + radius && customer.z > minZ - radius && customer.z < maxZ + radius) {
        const dLeft = Math.abs(customer.x - (minX - radius));
        const dRight = Math.abs(customer.x - (maxX + radius));
        const dTop = Math.abs(customer.z - (minZ - radius));
        const dBottom = Math.abs(customer.z - (maxZ + radius));
        const minD = Math.min(dLeft, dRight, dTop, dBottom);
        if (minD === dBottom) customer.z = maxZ + radius;
        else if (minD === dTop) customer.z = minZ - radius;
        else if (minD === dLeft) customer.x = minX - radius;
        else customer.x = maxX + radius;
      }
    }
  }
  customer.x = Math.max(-52, Math.min(18, customer.x));
  customer.z = Math.max(-8.6, Math.min(22, customer.z));
}

function separateCustomerCrowd(state, customer) {
  if (customer.phase === 'waiting-meal' || customer.phase === 'eating' || customer.phase === 'ready-tip') return;
  for (const other of state.customers) {
    if (other === customer || other.phase === 'waiting-meal' || other.phase === 'eating' || other.phase === 'ready-tip') continue;
    const dx = customer.x - other.x;
    const dz = customer.z - other.z;
    const distance = Math.hypot(dx, dz);
    if (distance >= 0.72) continue;
    const angle = distance > 0.0001 ? Math.atan2(dz, dx) : (Number(customer.id.split('-').at(-1)) % 2 ? 0 : Math.PI);
    const push = (0.72 - distance) * 0.42;
    customer.x += Math.cos(angle) * push;
    customer.z += Math.sin(angle) * push;
  }
  resolveCustomerPosition(customer, state);
}

function shelfQueuePosition(item, index, state, shelfId = null) {
  const shelf = getShelfLocations(state, item).find((entry) => entry.id === shelfId)
    ?? chooseShelfLocation(state, item);
  if (!shelf) return { x: 5, z: 1.3 + index * 0.85 };
  const dims = getStationDimensions(shelf.id, shelf.rotation ?? 0);
  const halfW = dims.width / 2;
  const halfD = dims.depth / 2;
  const forward = { x: Math.sin(shelf.rotation ?? 0), z: Math.cos(shelf.rotation ?? 0) };
  // Check front, back, left, right with appropriate distances for each axis
  const candidates = [
    // Local front
    { x: shelf.x + forward.x * (halfD + 0.55 + index * 0.7), z: shelf.z + forward.z * (halfD + 0.55 + index * 0.7) },
    // Local back
    { x: shelf.x - forward.x * (halfD + 0.55 + index * 0.7), z: shelf.z - forward.z * (halfD + 0.55 + index * 0.7) },
    // Local left (into aisle)
    { x: shelf.x - forward.z * (halfW + 0.55 + index * 0.7), z: shelf.z + forward.x * (halfW + 0.55 + index * 0.7) },
    // Local right
    { x: shelf.x + forward.z * (halfW + 0.55 + index * 0.7), z: shelf.z - forward.x * (halfW + 0.55 + index * 0.7) },
  ];
  const obstacles = getMarketObstacles(state);
  const found = candidates.find((pos) => !obstacles.some((box) => pos.x >= box.minX && pos.x <= box.maxX
    && pos.z >= box.minZ && pos.z <= box.maxZ));
  return found ?? candidates[2] ?? candidates[0];
}

export function routeCustomerToShelf(state, customer, item, queueIndex = 0) {
  const preferred = chooseShelfLocation(state, item, customer.targetShelfId, false, customer.checkoutOrder ?? 0);
  const shelves = getShelfLocations(state, item);
  const ordered = [preferred,
    ...shelves.filter((shelf) => shelf.id !== preferred?.id && quantityAt(state.stock, shelf.stockId, item) > 0),
    ...shelves.filter((shelf) => shelf.id !== preferred?.id && quantityAt(state.stock, shelf.stockId, item) === 0)]
    .filter(Boolean);
  for (const shelf of ordered) {
    const position = shelfQueuePosition(item, queueIndex, state, shelf.id);
    const path = findCustomerMarketRoute(state, customer, position, item);
    if (!path.length) continue;
    if (shelf.id === customer.targetShelfId && (customer.phase === 'waiting-stock'
      || (customer.phase === 'to-shelf' && customer.shelfQueueIndex === queueIndex
        && customer.route?.length && !customer.routeBlocked))) return;
    customer.targetShelfId = shelf.id;
    customer.shelfQueueIndex = queueIndex;
    routeTo(customer, path, 'to-shelf');
    return;
  }
  customer.targetShelfId = preferred?.id ?? null;
  customer.shelfQueueIndex = queueIndex;
  routeTo(customer, [], 'to-shelf');
}

function pickBalancedItem(state, pool) {
  state.customerDemandBag = (state.customerDemandBag ?? []).filter((item) => pool.includes(item));
  if (!state.customerDemandBag.length) {
    state.customerDemandBag = [...pool];
    for (let index = state.customerDemandBag.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random(state) * (index + 1));
      [state.customerDemandBag[index], state.customerDemandBag[swap]] = [state.customerDemandBag[swap], state.customerDemandBag[index]];
    }
  }
  return state.customerDemandBag.pop() ?? pool[0];
}

function addCustomer(state, options = {}) {
  const retailItems = state.unlockedProducts.filter((item) => SHELVES[item]);
  if (!retailItems.length) return;
  const id = `customer-${state.nextEntityId++}`;
  const restaurantUnlocked = Boolean(state.unlocked.restaurant && Object.keys(state.diningTables).length);
  const diner = options.kind ? options.kind === 'diner' : restaurantUnlocked && random(state) < 0.35;

  let vehicle = null;
  let slot = null;
  if (state.traffic && random(state) < 0.38) {
    const kind = random(state) < 0.35 ? 'two-wheeler' : 'car';
    slot = findAvailableSlot(state.traffic, kind);
    if (slot) {
      vehicle = createTrafficVehicle(state.traffic, id, slot);
    } else {
      createDriveByVehicle(state.traffic);
    }
  }

  if (diner) {
    const startPos = slot ? slot.disembark : { x: -37 + (random(state) - 0.5) * 1.8, z: 16 + random(state) * 2 };
    const customer = {
      id, kind: 'diner', x: startPos.x, z: startPos.z,
      phase: 'entering', demand: options.item ?? (random(state) < 0.5 ? 'BURGER' : 'PIZZA'), tableId: null,
      eventRole: options.eventRole, archetype: options.eventRole ? 'business' : undefined,
      eatTicks: 0, waitTicks: 0, mealWaitTicks: 0, missedItems: 0, checkoutWaitTicks: 0, facing: Math.PI,
      vehicleId: vehicle?.id ?? null,
      vehicleSlotId: slot?.id ?? null,
      disembarkPoint: slot?.disembark ?? null,
    };
    if (slot) {
      routeTo(customer, [{ x: slot.disembark.x, z: 10.4 }, { x: -37, z: 10.4 }, { x: -37, z: 6.6 }], 'entering');
    } else {
      routeTo(customer, [{ x: -37, z: 10.4 }, { x: -37, z: 6.6 }], 'entering');
    }
    state.customers.push(customer);
    return customer;
  }

  const premium = ['tourist', 'billionaire'].includes(options.eventRole);
  const firstItem = options.item ?? (premium ? [...retailItems].sort((a,b) => ITEMS[b].price - ITEMS[a].price)[0] : pickBalancedItem(state, retailItems));
  const basketSize = retailItems.length >= 3
    ? (random(state) < 0.35 ? 1 : random(state) < 0.54 ? 2 : 3)
    : retailItems.length === 2 && random(state) < 0.5 ? 2 : 1;
  const alternatives = retailItems.filter((item) => item !== firstItem);
  for (let index = alternatives.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random(state) * (index + 1));
    [alternatives[index], alternatives[swap]] = [alternatives[swap], alternatives[index]];
  }
  const shoppingList = options.item ? [firstItem] : premium ? [...retailItems].sort((a,b) => ITEMS[b].price - ITEMS[a].price).slice(0, 3) : [firstItem, ...alternatives.slice(0, basketSize - 1)];
  const startPos = slot ? slot.disembark : { x: 5 + (random(state) - 0.5) * 1.4, z: 16 + random(state) * 2 };
  const customer = {
    id, kind: 'shopper', eventRole: options.eventRole, archetype: options.eventRole === 'tourist' ? 'tourist' : options.eventRole ? 'business' : undefined,
    x: startPos.x, z: startPos.z,
    phase: 'entering', shoppingList, shoppingIndex: 0, demand: firstItem, basket: [],
    payTicks: 0, waitTicks: 0, missedItems: 0, checkoutWaitTicks: 0, mealWaitTicks: 0, checkoutOrder: state.nextEntityId,
    facing: Math.PI,
    vehicleId: vehicle?.id ?? null,
    vehicleSlotId: slot?.id ?? null,
    disembarkPoint: slot?.disembark ?? null,
  };
  if (slot) {
    routeTo(customer, [{ x: slot.disembark.x, z: 10.4 }, { x: 5, z: 6.6 }], 'entering');
  } else {
    routeTo(customer, [{ x: customer.x, z: 10.4 }, { x: 5, z: 6.6 }], 'entering');
  }
  makeLocation(state.stock, `customer:${id}`, 4);
  state.customers.push(customer);
  return customer;
}

function getCustomerCarPoint(customer) {
  if (customer.disembarkPoint) return customer.disembarkPoint;
  const hash = Math.abs(customer.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  if (customer.kind === 'diner') {
    return hash % 2 === 0 ? { x: -24, z: 16.5 } : { x: -10, z: 16.5 };
  }
  return hash % 2 === 0 ? { x: 4, z: 16.5 } : { x: 11, z: 16.5 };
}

function leaveShopper(customer, state = null) {
  const car = getCustomerCarPoint(customer);
  const exitDoor = { x: 5, z: 6.6 };
  const insideMarket = customer.z < 6.6 && customer.x >= -3.5 && customer.x <= 13.5;
  const path = insideMarket && state ? findCustomerMarketRoute(state, customer, exitDoor)
    : [{ x: 5, z: customer.z }, { x: 5, z: 3.5 }];
  if (insideMarket && state && !path.length) {
    customer.route = [];
    customer.routeIndex = 0;
    customer.routeBlocked = true;
    customer.phase = 'leaving';
    return;
  }
  routeTo(customer, [
    ...path,
    { x: 5, z: 8.5 },
    { x: 5, z: 10.4 },
    { x: car.x, z: 12.8 },
    { x: car.x, z: car.z },
  ], 'leaving');
}

export function getAvailableRegisters(state) {
  const registers = [];
  const defaultPos = state.layout?.register ?? STATIONS.register;
  registers.push({
    id: 'register',
    x: defaultPos.x,
    z: defaultPos.z,
    rotation: defaultPos.rotation ?? 0,
    isSelfCheckout: false,
  });

  for (const [id, register] of Object.entries(state.checkoutRegisters ?? {})) {
    const pos = state.layout?.[id] ?? register;
    registers.push({
      id,
      x: pos.x,
      z: pos.z,
      rotation: pos.rotation ?? 0,
      number: register.number,
      isSelfCheckout: false,
    });
  }

  for (const [id, reg] of Object.entries(state.selfRegisters ?? {})) {
    const pos = state.layout?.[id] ?? reg;
    registers.push({
      id,
      x: pos.x,
      z: pos.z,
      rotation: pos.rotation ?? 0,
      isSelfCheckout: true,
    });
  }
  return registers;
}

function queueForCheckout(state, customer) {
  customer.checkoutOrder = state.nextEntityId++;
  customer.registerAisleReached = false;

  const registers = getAvailableRegisters(state);
  const queueCounts = new Map();
  for (const reg of registers) queueCounts.set(reg.id, 0);

  for (const other of state.customers) {
    if (other !== customer && other.kind === 'shopper' && ['to-register', 'queueing', 'paying'].includes(other.phase) && other.targetRegisterId) {
      queueCounts.set(other.targetRegisterId, (queueCounts.get(other.targetRegisterId) ?? 0) + 1);
    }
  }

  const ordered = [...registers].sort((a, b) => (queueCounts.get(a.id) ?? 0) - (queueCounts.get(b.id) ?? 0));
  let bestReg = ordered[0];
  let path = [];
  for (const register of ordered) {
    const candidate = findCustomerMarketRoute(state, customer, registerQueuePosition(register, 2), register.id);
    if (!candidate.length) continue;
    bestReg = register;
    path = candidate;
    break;
  }
  customer.targetRegisterId = bestReg.id;
  routeTo(customer, path, 'to-register');
}

function leaveDiner(state, customer) {
  const table = customer.tableId ? state.diningTables[customer.tableId] : null;
  if (table?.customerId === customer.id) table.customerId = null;
  customer.tableId = null;
  const car = getCustomerCarPoint(customer);
  routeTo(customer, [
    { x: customer.x, z: customer.z + 1.2 },
    { x: -37, z: 7 },
    { x: -37, z: 10.4 },
    { x: car.x, z: 12.8 },
    { x: car.x, z: car.z },
  ], 'leaving');
}

function claimTable(state, customer) {
  const entry = Object.entries(state.diningTables).find(([tableId, table]) => !table.customerId && stationPosition(state, tableId));
  if (!entry) {
    routeTo(customer, [{ x: -37, z: 10.8 + (customer.tableWaitIndex ?? 0) * 0.85 }], 'waiting-table');
    return false;
  }
  const [tableId, table] = entry;
  customer.tableId = tableId;
  table.customerId = customer.id;
  makeLocation(state.stock, `customer:${customer.id}`, 4);
  const station = stationPosition(state, tableId);
  const rotation = station.rotation ?? 0;
  const toSeat = (distance) => ({
    x: station.x + Math.sin(rotation) * distance,
    z: station.z + Math.cos(rotation) * distance,
  });
  routeTo(customer, [toSeat(2.0), toSeat(0.95)], 'to-table');
  return true;
}

function completeShopperSale(state, customer, regId, events) {
        const soldItems = [...customer.basket];
        let saleAmountAtoms = 0;
        for (let itemIndex = 0; itemIndex < soldItems.length; itemIndex += 1) {
          const item = soldItems[itemIndex];
          const stock = state.stock[`customer:${customer.id}`];
          if (quantityAt(state.stock, `customer:${customer.id}`, item) < 1) continue;
          stock.items[item] -= 1;
          if (!stock.items[item]) delete stock.items[item];
          const unitPriceAtoms = Math.round(ITEMS[item].price * (1 + decorBonus(state)) * saleMoodMultiplier(customer) * MONEY_ATOMS);
          saleAmountAtoms += unitPriceAtoms;
          const statMap = {
            TOMATO: 'tomatoSold', TOMATO_PASTE: 'pasteSold', ORANGE_JUICE: 'juiceSold', CORN: 'cornSold',
            POPCORN: 'popcornSold', EGG: 'eggSold', FLOUR: 'flourSold', BREAD: 'breadSold',
            ORANGE_TART: 'orangeTartSold',
          };
          if (statMap[item]) state.stats[statMap[item]] += 1;
        }
        if (saleAmountAtoms) {
          adjustCustomerSatisfaction(state, 1);
          const registerId = state.checkoutRegisters?.[regId] || state.selfRegisters?.[regId] ? regId : 'register';
          state.cashAtRegisters ??= { register: 0 };
          state.cashAtRegisters[registerId] = (state.cashAtRegisters[registerId] ?? 0) + saleAmountAtoms;
          state.cashBundleCounts ??= { register: 0 };
          state.cashBundleCounts[registerId] = (state.cashBundleCounts[registerId] ?? 0) + 1;
          const saleAmount = saleAmountAtoms / MONEY_ATOMS;
          const mood = customerMood(customer);
          state.stats[mood < 85 ? 'customersUnhappy' : 'customersSatisfied'] += 1;
          customer.reaction = mood < 85 ? 'unhappy' : 'happy';
          const firstItem = soldItems[0];
          events.push({ type: 'sale', item: firstItem, items: soldItems, amount: saleAmount,
            mood,
            message: 'Kasada $' + saleAmount.toFixed(2) + ' birikti · ' + soldItems.map((item) => ITEMS[item].name).join(', ') + ' satıldı.',
            decorationScore: decorScore(state), decorationBonus: decorBonus(state) });
          customer.eventPaid = true;
        }
        leaveShopper(customer, state);
}

function customerTick(state, events) {
  let durable = false;
  state.customerSpawnTicks += 1;
  if (state.customerSpawnTicks >= customerSpawnIntervalTicks(state.customerSatisfaction) / (hasWorldBuff(state, 'popularity') ? 1.5 : 1)) {
    state.customerSpawnTicks = 0;
    if (state.customers.length < MAX_CUSTOMERS) addCustomer(state);
  }

  const shelfQueues = new Map();
  for (const customer of state.customers) {
    if (customer.kind !== 'shopper' || !['to-shelf', 'waiting-stock'].includes(customer.phase)) continue;
    const shelfId = customer.targetShelfId;
    if (!shelfId) continue;
    const queue = shelfQueues.get(shelfId) ?? [];
    queue.push(customer);
    shelfQueues.set(shelfId, queue);
  }
  for (const queue of shelfQueues.values()) queue.sort((a, b) => a.checkoutOrder - b.checkoutOrder);

  const registers = getAvailableRegisters(state);
  const registerQueues = new Map();
  for (const reg of registers) registerQueues.set(reg.id, []);
  for (const customer of state.customers) {
    if (customer.kind !== 'shopper' || !['to-register', 'queueing', 'paying'].includes(customer.phase)) continue;
    const regId = customer.targetRegisterId ?? 'register';
    const queue = registerQueues.get(regId) ?? registerQueues.get('register');
    if (queue) queue.push(customer);
  }
  for (const queue of registerQueues.values()) {
    queue.sort((a, b) => a.checkoutOrder - b.checkoutOrder);
    for (let i = 0; i < queue.length; i += 1) queue[i].queueIndex = i;
  }

  const tableQueue = state.customers.filter((customer) => customer.kind === 'diner' && customer.phase === 'waiting-table');
  tableQueue.forEach((customer, index) => { customer.tableWaitIndex = index; });

  for (let index = state.customers.length - 1; index >= 0; index -= 1) {
    const customer = state.customers[index];
    if (customer.phase === 'leaving' && !Array.isArray(customer.route)) {
      if (customer.kind === 'diner') leaveDiner(state, customer);
      else leaveShopper(customer, state);
    }
    if (activeWorldEvent(state, 'blackout') && ['to-register', 'queueing', 'paying'].includes(customer.phase)) continue;
    separateCustomerCrowd(state, customer);
    if (customer.kind === 'diner') {
      if (customer.phase === 'entering' && moveAlongRoute(customer)) durable = claimTable(state, customer) || durable;
      else if (customer.phase === 'waiting-table') {
        customer.waitTicks = (customer.waitTicks ?? 0) + 1;
        const targetZ = 10.8 + (customer.tableWaitIndex ?? 0) * 0.85;
        if (moveToward(customer, -37, targetZ, CUSTOMER_SPEED)) customer.phase = 'waiting-table';
        if ((customer.tableWaitIndex ?? 0) === 0 && claimTable(state, customer)) durable = true;
        else if (customer.waitTicks > (customer.eventRole === 'critic' ? 600 : 450)) {
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          leaveDiner(state, customer);
          durable = true;
        }
      } else if (customer.phase === 'to-table' && moveAlongRoute(customer)) {
        customer.phase = 'waiting-meal';
        customer.waitTicks = 0;
        customer.facing = Math.PI;
      } else if (customer.phase === 'waiting-meal') {
        customer.waitTicks = (customer.waitTicks ?? 0) + 1;
        customer.mealWaitTicks = (customer.mealWaitTicks ?? 0) + 1;
        const mealInTransit = Object.values(state.reservations).some((reservation) => (
          reservation.to === `customer:${customer.id}` && reservation.item === customer.demand
        ));
        if (customer.waitTicks > (customer.eventRole === 'critic' ? 600 : 300) && !mealInTransit) {
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          leaveDiner(state, customer);
          durable = true;
        }
      } else if (customer.phase === 'eating') {
        customer.eatTicks += 1;
        const table = state.diningTables[customer.tableId];
        if (table) table.eatTicks = customer.eatTicks;
        if (customer.eatTicks >= 80 && table && table.tipAtoms === 0) {
          const roll = random(state);
          const tip = Math.round(tipForMood(customer, roll) * (customer.vipTip ? 10 : 1) * (hasWorldBuff(state, 'certificate') ? 1.25 : 1));
          table.tipAtoms = tip * 10_000;
          state.stats[customerMood(customer) < 85 ? 'customersUnhappy' : 'customersSatisfied'] += 1;
          adjustCustomerSatisfaction(state, 1);
          customer.reaction = customerMood(customer) < 85 ? 'unhappy' : 'happy';
          customer.phase = 'ready-tip';
          const stock = state.stock[`customer:${customer.id}`];
          if (stock?.items?.[customer.meal]) {
            stock.items[customer.meal] -= 1;
            if (!stock.items[customer.meal]) delete stock.items[customer.meal];
          }
          const tipMsg = tip >= 30 ? '🔥 JACKPOT BAHŞİŞ! Müşteri cömert bir bahşiş bıraktı!' : 'Müşterinin bahşişi hazır.';
          events.push({ type: 'tip-ready', tipAmount: tip, isJackpot: tip >= 30, message: tipMsg });
          durable = true;
        }
      } else if (customer.phase === 'leaving' && moveAlongRoute(customer)) {
        if (customer.vehicleSlotId && state.traffic) {
          const vehicle = getVehicleByCustomer(state.traffic, customer.id);
          if (vehicle) vehicle.state = 'boarding';
        }
        delete state.stock[`customer:${customer.id}`];
        state.customers.splice(index, 1);
      }
      continue;
    }

    if (customer.phase === 'entering' && moveAlongRoute(customer)) {
      const item = customer.shoppingList[customer.shoppingIndex];
      routeCustomerToShelf(state, customer, item);
    } else if (customer.phase === 'to-next-shelf' && moveAlongRoute(customer)) {
      const item = customer.shoppingList[customer.shoppingIndex];
      routeCustomerToShelf(state, customer, item);
    } else if (customer.phase === 'to-shelf') {
      const item = customer.shoppingList[customer.shoppingIndex] ?? customer.demand;
      const queueIndex = shelfQueues.get(customer.targetShelfId)?.indexOf(customer) ?? 0;
      const shelf = chooseShelfLocation(state, item, customer.targetShelfId);
      if (shelf?.id !== customer.targetShelfId || customer.shelfQueueIndex !== Math.max(0, queueIndex)
        || !Array.isArray(customer.route) || !customer.route.length) {
        routeCustomerToShelf(state, customer, item, Math.max(0, queueIndex));
      }
      const position = shelfQueuePosition(item, Math.max(0, queueIndex), state, customer.targetShelfId);
      const reachedEnd = moveAlongRoute(customer);
      if (customer.routeBlocked) {
        customer.routeBlockedTicks = (customer.routeBlockedTicks ?? 0) + 1;
        if (customer.routeBlockedTicks > 180) {
          customer.missedItems = (customer.missedItems ?? 0) + 1;
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          leaveShopper(customer, state);
          durable = true;
        }
        continue;
      }
      customer.routeBlockedTicks = 0;
      if (reachedEnd) {
        if (moveToward(customer, position.x, position.z, CUSTOMER_SPEED)) {
          customer.phase = 'waiting-stock';
          customer.waitTicks = 0;
        }
      }
    } else if (customer.phase === 'waiting-stock') {
      const item = customer.shoppingList[customer.shoppingIndex] ?? customer.demand;
      const queue = shelfQueues.get(customer.targetShelfId) ?? [];
      const queueIndex = queue.indexOf(customer);
      let shelf = chooseShelfLocation(state, item, customer.targetShelfId);
      if (shelf?.id !== customer.targetShelfId) {
        routeCustomerToShelf(state, customer, item, Math.max(0, queueIndex));
        if (customer.phase === 'to-shelf') continue;
        shelf = getShelfLocations(state, item).find((entry) => entry.id === customer.targetShelfId);
      }
      const position = shelfQueuePosition(item, Math.max(0, queueIndex), state, customer.targetShelfId);
      moveToward(customer, position.x, position.z, CUSTOMER_SPEED);
      if (shelf) customer.facing = Math.atan2(shelf.x - customer.x, shelf.z - customer.z);
      customer.waitTicks += 1;
      if (queueIndex === 0 && shelf && quantityAt(state.stock, shelf.stockId, item) > 0) {
        const moved = move(state, shelf.stockId, `customer:${customer.id}`, item, 1, `customer-pickup:${customer.id}:${customer.shoppingIndex}`);
        if (moved) {
          recordAnimationCue(customer, state, 'shop', { id: `shop:${customer.id}:${customer.shoppingIndex}`,
            item, location: shelf.stockId, basketIndex: customer.basket.length });
          customer.basket.push(item);
          customer.shoppingIndex += 1;
          customer.waitTicks = 0;
          durable = true;
          if (customer.shoppingIndex < customer.shoppingList.length) {
            customer.demand = customer.shoppingList[customer.shoppingIndex];
            const nextItem = customer.shoppingList[customer.shoppingIndex];
            routeCustomerToShelf(state, customer, nextItem);
          } else {
            customer.demand = customer.basket[0];
            queueForCheckout(state, customer);
          }
        }
      } else if (customer.waitTicks > (customer.eventRole === 'critic' ? 600 : 180)) {
        if (customer.basket.length) {
          customer.missedItems = (customer.missedItems ?? 0) + 1;
          adjustCustomerSatisfaction(state, -3);
          customer.demand = customer.basket[0];
          queueForCheckout(state, customer);
          durable = true;
        } else {
          customer.missedItems = (customer.missedItems ?? 0) + 1;
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          const lostAmount = missedOpportunityAmount(customer);
          events.push({ type: 'customer-lost', customerId: customer.id, lostAmount,
            message: `⚠️ Müşteri eli boş ayrıldı! Kaçan ciro: -$${lostAmount.toFixed(2)}` });
          leaveShopper(customer, state);
          durable = true;
        }
      }
    } else if (customer.phase === 'to-register' || customer.phase === 'queueing') {
      customer.checkoutWaitTicks = (customer.checkoutWaitTicks ?? 0) + 1;
      if (customer.phase === 'to-register' && customer.routeBlocked) {
        if (customer.checkoutWaitTicks % 30 === 0) queueForCheckout(state, customer);
        if (customer.routeBlocked && customer.checkoutWaitTicks > 180) {
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          leaveShopper(customer, state);
          durable = true;
        }
        continue;
      }
      const regId = customer.targetRegisterId ?? 'register';
      const reg = registers.find((r) => r.id === regId) ?? registers[0];
      const slot = registerQueuePosition(reg, 1.35 + (customer.queueIndex ?? 0) * 1.1);
      if (customer.phase === 'to-register' && !customer.registerAisleReached) {
        if (!Array.isArray(customer.route)) queueForCheckout(state, customer);
        if (moveAlongRoute(customer)) customer.registerAisleReached = true;
      }
      if (customer.registerAisleReached || customer.phase === 'queueing') {
        const reached = moveToward(customer, slot.x, slot.z, CUSTOMER_SPEED);
        if (reached || Math.hypot(customer.x - slot.x, customer.z - slot.z) <= 0.35) {
          customer.phase = customer.queueIndex === 0 ? 'paying' : 'queueing';
          customer.payTicks = 0;
          customer.facing = Math.atan2(reg.x - customer.x, reg.z - customer.z);
        }
      }
    } else if (customer.phase === 'paying') {
      const regId = customer.targetRegisterId ?? 'register';
      const reg = registers.find((r) => r.id === regId) ?? registers[0];
      if (customer.queueIndex !== 0) {
        customer.checkoutWaitTicks = (customer.checkoutWaitTicks ?? 0) + 1;
        customer.phase = 'queueing';
      }
      customer.facing = Math.atan2(reg.x - customer.x, reg.z - customer.z);
      const isSelfCheckout = reg.isSelfCheckout;
      const activeCashier = state.workers.find((worker) => worker.type === 'cashier'
        && (worker.registerId ?? 'register') === reg.id && !worker.break && !worker.waitingForSalary);
      const playerAtRegister = Math.hypot(state.player.x - registerQueuePosition(reg, -1.1).x,
          state.player.z - registerQueuePosition(reg, -1.1).z) <= 1.8;
      const cashier = isSelfCheckout || Boolean(activeCashier) || playerAtRegister;
      if (customer.queueIndex === 0 && cashier) {
        customer.payTicks = (customer.payTicks ?? 0) + 1;
      }
      if (customer.queueIndex === 0 && !cashier) {
        customer.checkoutWaitTicks = (customer.checkoutWaitTicks ?? 0) + 1;
        if (customer.checkoutWaitTicks > 450) {
          state.stats.customersUnhappy += 1;
          adjustCustomerSatisfaction(state, -5);
          customer.reaction = 'unhappy';
          leaveShopper(customer, state);
          durable = true;
        }
      }
      const itemCount = customer.basket?.length ?? 0;
      const payThreshold = TICKS_PER_SECOND * (CHECKOUT_BASE_SECONDS + CHECKOUT_SECONDS_PER_ITEM * itemCount) / (customer.eventRole === 'tourist' ? 2 : 1);
      if (cashier && customer.queueIndex === 0 && customer.payTicks >= payThreshold) {
        completeShopperSale(state, customer, regId, events);
        durable = true;
      }
    } else if (customer.phase === 'leaving' && customer.routeBlocked) {
      customer.routeBlockedTicks = (customer.routeBlockedTicks ?? 0) + 1;
      if (customer.routeBlockedTicks > 180) {
        delete state.stock[`customer:${customer.id}`];
        state.customers.splice(index, 1);
      } else if (customer.routeBlockedTicks % 20 === 0) leaveShopper(customer, state);
    } else if (customer.phase === 'leaving' && moveAlongRoute(customer)) {
      if (customer.vehicleSlotId && state.traffic) {
        const vehicle = getVehicleByCustomer(state.traffic, customer.id);
        if (vehicle) vehicle.state = 'boarding';
      }
      delete state.stock[`customer:${customer.id}`];
      state.customers.splice(index, 1);
    }
  }
  return durable;
}

function collectRegisterCash(state, events) {
  let durable = false;
  state.cashAtRegisters ??= { register: 0 };
  state.cashBundleCounts ??= { register: 0 };
  for (const register of getAvailableRegisters(state)) {
    const amountAtoms = state.cashAtRegisters[register.id] ?? 0;
    if (!Number.isSafeInteger(amountAtoms) || amountAtoms <= 0) continue;
    const pickup = registerCashPosition(register);
    if (Math.hypot(state.player.x - pickup.x, state.player.z - pickup.z) > 1.35) continue;
    const transactionId = `register-cash:${register.id}:${state.nextEntityId++}`;
    new EconomyLedger(state.economy).credit(transactionId, amountAtoms / MONEY_ATOMS, `register-cash:${register.id}`);
    state.cashAtRegisters[register.id] = 0;
    state.cashBundleCounts[register.id] = 0;
    events.push({ type: 'cash-collected', registerId: register.id, amountAtoms,
      message: `Kasadan $${(amountAtoms / MONEY_ATOMS).toFixed(2)} toplandı.` });
    durable = true;
  }
  return durable;
}

function coopTick(state) {
  const coop = state.coops.coop;
  if (!coop) return false;
  const feedAvailable = quantityAt(state.stock, 'coop:feed', 'CHICKEN_FEED');
  if (feedAvailable < 1) { coop.progressTicks = 0; return false; }
  coop.progressTicks += 1;
  const interval = Math.max(60, Math.round(180 / coop.chickens));
  if (coop.progressTicks < interval) return false;
  const free = capacityAt(state.stock, 'coop:eggs') - totalAt(state.stock, 'coop:eggs');
  if (free < 1) return false;
  coop.progressTicks = 0;
  state.stock['coop:feed'].items.CHICKEN_FEED -= 1;
  if (!state.stock['coop:feed'].items.CHICKEN_FEED) delete state.stock['coop:feed'].items.CHICKEN_FEED;
  state.stock['coop:eggs'].items.EGG = quantityAt(state.stock, 'coop:eggs', 'EGG') + 1;
  return true;
}

export function advanceSimulation(state, environmentObstacles = []) {
  const events = [];
  if (state.paused) return { events, durable: false };
  const hooks = {
    spawnCustomer: options => addCustomer(state, options),
    shelfPoint: (item, id) => shelfQueuePosition(item, 0, state, id),
    escapeRoute: actor => [...findCustomerMarketRoute(state, actor, { x: 5, z: 6.6 }), { x: 5, z: 10.4 }],
    payQueue: regId => {
      for (const customer of state.customers) {
        if (customer.kind === 'shopper' && ['to-register', 'queueing', 'paying'].includes(customer.phase)
          && (customer.targetRegisterId ?? 'register') === regId) completeShopperSale(state, customer, regId, events);
      }
    },
  };
  const eventDurable = advanceWorldEvents(state, hooks, events);
  syncFarmHarvest(state);
  let durable = produceFarm(state, events);
  durable = produceMachines(state, events) || durable;
  durable = coopTick(state) || durable;
  durable = advanceProcurement(state, events) || durable;
  durable = workerTick(state, environmentObstacles) || durable;
  syncFarmHarvest(state);
  durable = customerTick(state, events) || durable;
  if (state.traffic) stepTraffic(state.traffic, 0.05);
  durable = collectRegisterCash(state, events) || durable;
  if (!state.activeOrder) {
    state.activeOrder = nextOrder(state);
    if (state.activeOrder) durable = true;
  }
  return { events, durable: durable || eventDurable };
}


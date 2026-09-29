import { ITEMS, RECIPES, SHELVES, STATIONS } from './catalog.js';
import { getMarketCollisionBoxes, getShelfLocations, stationPosition } from './layout.js';
import { EconomyLedger } from './ledger.js';
import { decorBonus, decorScore } from './decorCatalog.js';
import { FARM_YIELD, syncFarmHarvest } from './farm.js';
import { customerMood, saleMoodMultiplier, tipForMood } from './customerExperience.js';
import { nextOrder } from './orders.js';
import { cancelReservation, capacityAt, makeLocation, pickUpReservedStock, quantityAt, reserveStock, totalAt, transferStock } from './inventory.js';

const TICKS_PER_SECOND = 10;
const FARM_GROW_TICKS = 22;
const CUSTOMER_SPAWN_TICKS = 40;
const MAX_CUSTOMERS = 8;
const CUSTOMER_SPEED = 0.36;
const CUSTOMER_RADIUS = 0.32;
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

function produceFarm(state) {
  let durable = false;
  for (const [farmId, farm] of Object.entries(state.farms)) {
    const station = STATIONS[farmId] ?? state.customStations?.[farmId];
    const item = farm.item ?? station?.item;
    if (!item) continue;
    const location = `farm:${item}`;
    if (farm.readyCount > 0) {
      farm.progressTicks = 0;
      continue;
    }
    if (capacityAt(state.stock, location) - totalAt(state.stock, location) < 1) continue;
    farm.progressTicks += 1;
    if (farm.progressTicks < FARM_GROW_TICKS) continue;
    farm.progressTicks -= FARM_GROW_TICKS;
    const produced = Math.min(FARM_YIELD, capacityAt(state.stock, location) - totalAt(state.stock, location));
    state.stock[location].items[item] = quantityAt(state.stock, location, item) + produced;
    farm.harvestCount += produced;
    farm.readyCount = produced;
    durable = true;
  }
  return durable;
}

function produceMachines(state, events) {
  let durable = false;
  for (const [machineId, machine] of Object.entries(state.machines)) {
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
      continue;
    }
    if (!hasInputs) {
      machine.blocked = 'missing-input';
      machine.progressTicks = 0;
      continue;
    }
    machine.blocked = false;
    machine.progressTicks += 1;
    if (machine.progressTicks < Math.round(recipe.seconds * TICKS_PER_SECOND)) continue;
    machine.progressTicks = 0;
    for (const [item, amount] of Object.entries(recipe.inputs)) {
      state.stock[inputId].items[item] -= amount;
      if (state.stock[inputId].items[item] === 0) delete state.stock[inputId].items[item];
    }
    state.stock[outputId].items[recipe.output] = quantityAt(state.stock, outputId, recipe.output) + 1;
    const producedStat = {
      TOMATO_PASTE: 'pasteProduced', ORANGE_JUICE: 'juiceProduced', POPCORN: 'popcornProduced',
      CHICKEN_FEED: 'feedProduced', BREAD: 'breadProduced', BURGER: 'burgerCooked', PIZZA: 'pizzaCooked',
    }[recipe.output];
    if (producedStat) state.stats[producedStat] = (state.stats[producedStat] ?? 0) + 1;
    events.push({ type: 'production', item: recipe.output, message: `${ITEMS[recipe.output].icon} ${ITEMS[recipe.output].name} hazır.` });
    durable = true;
  }
  return durable;
}

function locationPosition(state, locationId) {
  if (locationId.startsWith('farm:')) {
    const item = locationId.slice('farm:'.length);
    // Önce custom farm'lara bak, sonra sabit STATIONS'a
    const customEntry = Object.entries(state.farms).find(([id]) => {
      const cs = state.customStations?.[id];
      return cs?.item === item;
    });
    if (customEntry) {
      const [farmId] = customEntry;
      const pos = state.layout?.[farmId] ?? state.customStations?.[farmId];
      if (pos) return { x: pos.x, z: pos.z };
    }
    const station = Object.entries(state.farms)
      .map(([id]) => STATIONS[id]).find((entry) => entry?.item === item);
    return station ? { x: station.x, z: station.z } : { x: -10, z: 5 };
  }
  if (locationId.startsWith('shelf:')) {
    // Önce custom shelf id'yi ara (format: shelf:tomatoShelf_5)
    const rest = locationId.slice('shelf:'.length);
    if (SHELVES[rest]) return { x: SHELVES[rest].x, z: SHELVES[rest].z };
    // custom shelf id (e.g. tomatoShelf_5)
    const pos = state.layout?.[rest] ?? state.customStations?.[rest];
    if (pos) return { x: pos.x, z: pos.z };
    return null;
  }
  if (locationId.startsWith('machine:')) {
    const machineId = locationId.slice('machine:'.length).split(':')[0];
    const station = STATIONS[machineId];
    if (station) return { x: station.x, z: station.z };
    // Custom machine
    const pos = state.layout?.[machineId] ?? state.customStations?.[machineId];
    return pos ? { x: pos.x, z: pos.z } : null;
  }
  if (locationId.startsWith('customer:')) {
    const customer = state.customers.find((entry) => entry.id === locationId.slice('customer:'.length));
    return customer ? { x: customer.x, z: customer.z } : null;
  }
  if (locationId.startsWith('coop:')) return { x: STATIONS.coop.x, z: STATIONS.coop.z };
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
  for (const [machineId, machine] of Object.entries(state.machines ?? {})) {
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
  for (const [sourceId, sourceMachine] of Object.entries(state.machines ?? {})) {
    const station = STATIONS[sourceId] ?? state.customStations?.[sourceId];
    const recipe = RECIPES[sourceMachine.recipe ?? station?.recipe];
    const output = `machine:${sourceId}:output`;
    if (recipe?.output === item && state.stock[output]) sources.push(output);
  }
  if (item === 'EGG' && state.stock['coop:eggs']) sources.push('coop:eggs');
  return [...new Set(sources)];
}

function workerCandidate(state, worker) {
  if (worker.type === 'harvester') {
    for (const [farmId, farm] of Object.entries(state.farms)) {
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
    const machines = Object.entries(state.machines);
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
  delete task.farmId;
  return true;
}

function workerTick(state) {
  let durable = false;
  for (const worker of state.workers) {
    if (prioritizeShelfRestock(state, worker)) {
      durable = true;
      if (!worker.task && assignWorkerTask(state, worker)) durable = true;
    }
    if (!worker.task) {
      if (state.tick % 8 === 0 && assignWorkerTask(state, worker)) durable = true;
      if (!worker.task) continue;
    }
    const task = worker.task;
    const targetLocation = task.phase === 'to-source' ? task.from : task.to;
    const target = task.phase === 'to-source' && task.farmId
      ? (STATIONS[task.farmId] ?? state.layout?.[task.farmId] ?? state.customStations?.[task.farmId]) : locationPosition(state, targetLocation);
    if (!target) continue;
    worker.facing = Math.atan2(target.x - worker.x, target.z - worker.z);
    if (!moveToward(worker, target.x, target.z, 0.34)) continue;
    if (task.phase === 'to-source') {
      const picked = pickUpReservedStock(state, task.reservationId, task.carrier);
      if (picked.ok) {
        if (task.farmId && state.farms[task.farmId]) state.farms[task.farmId].readyCount -= task.quantity;
        task.phase = 'to-target';
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
    if (task.customerId) {
      const customer = state.customers.find((entry) => entry.id === task.customerId);
      const table = state.diningTables[task.tableId];
      if (customer && table) {
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
  const targetKey = cellKey(targetC, targetR);
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
    return [];
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
  const distance = 1.3 + index * 0.85;
  return {
    x: shelf.x + Math.sin(shelf.rotation) * distance,
    z: shelf.z + Math.cos(shelf.rotation) * distance,
  };
}

function routeCustomerToShelf(state, customer, item, queueIndex = 0) {
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

function addCustomer(state) {
  const retailItems = state.unlockedProducts.filter((item) => SHELVES[item]);
  if (!retailItems.length) return;
  const id = `customer-${state.nextEntityId++}`;
  const restaurantUnlocked = Boolean(state.unlocked.restaurant && Object.keys(state.diningTables).length);
  const diner = restaurantUnlocked && random(state) < 0.35;
  if (diner) {
    const customer = {
      id, kind: 'diner', x: -37 + (random(state) - 0.5) * 1.8, z: 16 + random(state) * 2,
      phase: 'entering', demand: random(state) < 0.5 ? 'BURGER' : 'PIZZA', tableId: null,
      eatTicks: 0, waitTicks: 0, mealWaitTicks: 0, missedItems: 0, checkoutWaitTicks: 0, facing: Math.PI,
    };
    routeTo(customer, [{ x: -37, z: 10.4 }, { x: -37, z: 6.6 }], 'entering');
    state.customers.push(customer);
    return;
  }

  const firstItem = pickBalancedItem(state, retailItems);
  const basketSize = retailItems.length >= 3
    ? (random(state) < 0.35 ? 1 : random(state) < 0.54 ? 2 : 3)
    : retailItems.length === 2 && random(state) < 0.5 ? 2 : 1;
  const alternatives = retailItems.filter((item) => item !== firstItem);
  for (let index = alternatives.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random(state) * (index + 1));
    [alternatives[index], alternatives[swap]] = [alternatives[swap], alternatives[index]];
  }
  const shoppingList = [firstItem, ...alternatives.slice(0, basketSize - 1)];
  const customer = {
    id, kind: 'shopper', x: 5 + (random(state) - 0.5) * 1.4, z: 16 + random(state) * 2,
    phase: 'entering', shoppingList, shoppingIndex: 0, demand: firstItem, basket: [],
    payTicks: 0, waitTicks: 0, missedItems: 0, checkoutWaitTicks: 0, mealWaitTicks: 0, checkoutOrder: state.nextEntityId,
    facing: Math.PI,
  };
  routeTo(customer, [{ x: customer.x, z: 10.4 }, { x: 5, z: 6.6 }], 'entering');
  makeLocation(state.stock, `customer:${id}`, 4);
  state.customers.push(customer);
}

function getCustomerCarPoint(customer) {
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
    { x: car.x, z: 16.5 },
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
    { x: car.x, z: 16.5 },
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

function customerTick(state, events) {
  let durable = false;
  state.customerSpawnTicks += 1;
  if (state.customerSpawnTicks >= CUSTOMER_SPAWN_TICKS) {
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
    separateCustomerCrowd(state, customer);
    if (customer.kind === 'diner') {
      if (customer.phase === 'entering' && moveAlongRoute(customer)) durable = claimTable(state, customer) || durable;
      else if (customer.phase === 'waiting-table') {
        customer.waitTicks = (customer.waitTicks ?? 0) + 1;
        const targetZ = 10.8 + (customer.tableWaitIndex ?? 0) * 0.85;
        if (moveToward(customer, -37, targetZ, CUSTOMER_SPEED)) customer.phase = 'waiting-table';
        if ((customer.tableWaitIndex ?? 0) === 0 && claimTable(state, customer)) durable = true;
        else if (customer.waitTicks > 450) {
          state.stats.customersUnhappy += 1;
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
        if (customer.waitTicks > 300 && !mealInTransit) {
          state.stats.customersUnhappy += 1;
          customer.reaction = 'unhappy';
          leaveDiner(state, customer);
          durable = true;
        }
      } else if (customer.phase === 'eating') {
        customer.eatTicks += 1;
        const table = state.diningTables[customer.tableId];
        if (table) table.eatTicks = customer.eatTicks;
        if (customer.eatTicks >= 80 && table && table.tipAtoms === 0) {
          table.tipAtoms = tipForMood(customer) * 10_000;
          state.stats[customerMood(customer) < 85 ? 'customersUnhappy' : 'customersSatisfied'] += 1;
          customer.reaction = customerMood(customer) < 85 ? 'unhappy' : 'happy';
          customer.phase = 'ready-tip';
          const stock = state.stock[`customer:${customer.id}`];
          if (stock?.items?.[customer.meal]) {
            stock.items[customer.meal] -= 1;
            if (!stock.items[customer.meal]) delete stock.items[customer.meal];
          }
          events.push({ type: 'tip-ready', message: '💵 Müşterinin bahşişi hazır.' });
          durable = true;
        }
      } else if (customer.phase === 'leaving' && moveAlongRoute(customer)) {
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
      const shelf = chooseShelfLocation(state, item, customer.targetShelfId);
      if (shelf?.id !== customer.targetShelfId) {
        routeCustomerToShelf(state, customer, item, Math.max(0, queueIndex));
        continue;
      }
      const position = shelfQueuePosition(item, Math.max(0, queueIndex), state, customer.targetShelfId);
      moveToward(customer, position.x, position.z, CUSTOMER_SPEED);
      customer.waitTicks += 1;
      if (queueIndex === 0 && shelf && quantityAt(state.stock, shelf.stockId, item) > 0) {
        const moved = move(state, shelf.stockId, `customer:${customer.id}`, item, 1, `customer-pickup:${customer.id}:${customer.shoppingIndex}`);
        if (moved) {
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
      } else if (customer.waitTicks > 180) {
        if (customer.basket.length) {
          customer.missedItems = (customer.missedItems ?? 0) + 1;
          customer.demand = customer.basket[0];
          queueForCheckout(state, customer);
        } else {
          customer.missedItems = (customer.missedItems ?? 0) + 1;
          state.stats.customersUnhappy += 1;
          customer.reaction = 'unhappy';
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
      const cashier = isSelfCheckout
        || state.workers.some((worker) => worker.type === 'cashier')
        || Math.hypot(state.player.x - registerQueuePosition(reg, -1.1).x,
          state.player.z - registerQueuePosition(reg, -1.1).z) <= 1.8;
      if (customer.queueIndex === 0 && cashier) {
        customer.payTicks += 1;
      } else if (customer.queueIndex === 0 && !cashier) {
        customer.checkoutWaitTicks = (customer.checkoutWaitTicks ?? 0) + 1;
        if (customer.checkoutWaitTicks > 450) {
          state.stats.customersUnhappy += 1;
          customer.reaction = 'unhappy';
          leaveShopper(customer, state);
          durable = true;
        }
      }
      const payThreshold = isSelfCheckout ? 7 : (state.workers.some((worker) => worker.type === 'cashier') ? 5 : 14);
      if (customer.payTicks >= payThreshold) {
        const ledger = new EconomyLedger(state.economy);
        const soldItems = [...customer.basket];
        let saleAmount = 0;
        for (let itemIndex = 0; itemIndex < soldItems.length; itemIndex += 1) {
          const item = soldItems[itemIndex];
          const stock = state.stock[`customer:${customer.id}`];
          if (quantityAt(state.stock, `customer:${customer.id}`, item) < 1) continue;
          stock.items[item] -= 1;
          if (!stock.items[item]) delete stock.items[item];
          const unitPrice = Math.round(ITEMS[item].price * (1 + decorBonus(state)) * saleMoodMultiplier(customer) * 10_000) / 10_000;
          ledger.credit(`sale:${customer.id}:${itemIndex}`, unitPrice, `sale:${item}`);
          saleAmount += unitPrice;
          const statMap = { TOMATO: 'tomatoSold', TOMATO_PASTE: 'pasteSold', ORANGE_JUICE: 'juiceSold', CORN: 'cornSold', POPCORN: 'popcornSold', EGG: 'eggSold', BREAD: 'breadSold' };
          if (statMap[item]) state.stats[statMap[item]] += 1;
        }
        if (saleAmount) {
          const mood = customerMood(customer);
          state.stats[mood < 85 ? 'customersUnhappy' : 'customersSatisfied'] += 1;
          customer.reaction = mood < 85 ? 'unhappy' : 'happy';
          const firstItem = soldItems[0];
          events.push({ type: 'sale', item: firstItem, items: soldItems, amount: saleAmount,
            mood,
            message: '+ $' + saleAmount.toFixed(2) + ' · ' + soldItems.map((item) => ITEMS[item].icon).join(' ') + ' satıldı.',
            decorationScore: decorScore(state), decorationBonus: decorBonus(state) });
          durable = true;
        }
        leaveShopper(customer, state);
      }
    } else if (customer.phase === 'leaving' && customer.routeBlocked) {
      customer.routeBlockedTicks = (customer.routeBlockedTicks ?? 0) + 1;
      if (customer.routeBlockedTicks > 180) {
        delete state.stock[`customer:${customer.id}`];
        state.customers.splice(index, 1);
      } else if (customer.routeBlockedTicks % 20 === 0) leaveShopper(customer, state);
    } else if (customer.phase === 'leaving' && moveAlongRoute(customer)) {
      delete state.stock[`customer:${customer.id}`];
      state.customers.splice(index, 1);
    }
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

export function advanceSimulation(state) {
  const events = [];
  syncFarmHarvest(state);
  let durable = produceFarm(state);
  durable = produceMachines(state, events) || durable;
  durable = coopTick(state) || durable;
  durable = workerTick(state) || durable;
  syncFarmHarvest(state);
  durable = customerTick(state, events) || durable;
  if (!state.activeOrder) {
    state.activeOrder = nextOrder(state);
    if (state.activeOrder) durable = true;
  }
  return { events, durable };
}


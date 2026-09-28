import { ITEMS, RECIPES, SHELVES, STATIONS } from './catalog.js';
import { EconomyLedger } from './ledger.js';
import { syncFarmHarvest } from './farm.js';
import { cancelReservation, capacityAt, makeLocation, pickUpReservedStock, quantityAt, reserveStock, totalAt, transferStock } from './inventory.js';

const TICKS_PER_SECOND = 10;
const FARM_GROW_TICKS = 22;
const CUSTOMER_SPAWN_TICKS = 40;
const MAX_CUSTOMERS = 8;
const CUSTOMER_SPEED = 0.36;
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
    const station = STATIONS[farmId];
    if (!station) continue;
    const location = `farm:${station.item}`;
    if (farm.readyCount > 0) {
      farm.progressTicks = 0;
      continue;
    }
    if (capacityAt(state.stock, location) - totalAt(state.stock, location) < 1) continue;
    farm.progressTicks += 1;
    if (farm.progressTicks < FARM_GROW_TICKS) continue;
    farm.progressTicks -= FARM_GROW_TICKS;
    const produced = Math.min(3, capacityAt(state.stock, location) - totalAt(state.stock, location));
    state.stock[location].items[station.item] = quantityAt(state.stock, location, station.item) + produced;
    farm.harvestCount += produced;
    farm.readyCount = produced;
    durable = true;
  }
  return durable;
}

function produceMachines(state, events) {
  let durable = false;
  for (const [machineId, machine] of Object.entries(state.machines)) {
    const station = STATIONS[machineId];
    const recipe = RECIPES[machine.recipe];
    if (!station || !recipe) continue;
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
    const station = Object.values(state.farms).length && Object.entries(state.farms)
      .map(([id]) => STATIONS[id]).find((entry) => entry?.item === item);
    return station ? { x: station.x, z: station.z } : { x: -10, z: 5 };
  }
  if (locationId.startsWith('shelf:')) {
    const item = locationId.slice('shelf:'.length);
    return SHELVES[item] ? { x: SHELVES[item].x, z: SHELVES[item].z } : null;
  }
  if (locationId.startsWith('machine:')) {
    const machineId = locationId.slice('machine:'.length).split(':')[0];
    const station = STATIONS[machineId];
    return station ? { x: station.x, z: station.z } : null;
  }
  if (locationId.startsWith('customer:')) {
    const customer = state.customers.find((entry) => entry.id === locationId.slice('customer:'.length));
    return customer ? { x: customer.x, z: customer.z } : null;
  }
  if (locationId.startsWith('coop:')) return { x: STATIONS.coop.x, z: STATIONS.coop.z };
  return null;
}

function workerCandidate(state, worker) {
  if (worker.type === 'harvester') {
    for (const [farmId, farm] of Object.entries(state.farms)) {
      const item = STATIONS[farmId]?.item;
      const to = SHELVES[item]?.id;
      const pending = state.workers.filter((entry) => entry.task?.farmId === farmId && entry.task.phase === 'to-source').length;
      if (to && farm.readyCount > pending && canMoveOne(state, `farm:${item}`, to, item)) {
        return { from: `farm:${item}`, to, item, farmId };
      }
    }
  }
  if (worker.type === 'factoryFeeder') {
    const machines = Object.entries(state.machines);
    for (const [sourceId, sourceMachine] of machines) {
      const item = RECIPES[sourceMachine.recipe]?.output;
      const from = `machine:${sourceId}:output`;
      for (const [targetId, targetMachine] of machines) {
        const required = RECIPES[targetMachine.recipe]?.inputs[item];
        const to = `machine:${targetId}:input`;
        if (required && quantityAt(state.stock, to, item) < required && canMoveOne(state, from, to, item)) {
          return { from, to, item };
        }
      }
    }
    const offset = Math.floor(state.tick / 8) % Math.max(1, machines.length);
    const orderedMachines = [...machines.slice(offset), ...machines.slice(0, offset)];
    for (const [machineId, machine] of orderedMachines) {
      const recipe = RECIPES[machine.recipe];
      const input = `machine:${machineId}:input`;
      const output = `machine:${machineId}:output`;
      const shelf = SHELVES[recipe.output]?.id;
      const downstreamNeedsOutput = Object.entries(state.machines).some(([otherId, otherMachine]) =>
        otherId !== machineId && RECIPES[otherMachine.recipe]?.inputs[recipe.output]
        && quantityAt(state.stock, `machine:${otherId}:input`, recipe.output)
          < RECIPES[otherMachine.recipe].inputs[recipe.output]);
      if (!downstreamNeedsOutput && shelf && quantityAt(state.stock, output, recipe.output) > 0
        && canMoveOne(state, output, shelf, recipe.output)) {
        return { from: output, to: shelf, item: recipe.output };
      }
      for (const [item, required] of Object.entries(recipe.inputs)) {
        const inTransit = Object.values(state.reservations).filter((entry) => entry.to === input && entry.item === item).length;
        if (quantityAt(state.stock, input, item) + inTransit >= required) continue;
        const farm = `farm:${item}`;
        const sources = [farm, ...Object.entries(state.machines)
          .filter(([, sourceMachine]) => RECIPES[sourceMachine.recipe]?.output === item)
          .map(([sourceId]) => `machine:${sourceId}:output`), SHELVES[item]?.id];
        const from = sources.find((source) => source && canMoveOne(state, source, input, item));
        if (from) return { from, to: input, item,
          farmId: from === farm ? Object.keys(state.farms).find((id) => STATIONS[id]?.item === item && state.farms[id].readyCount > 0) : undefined };
      }
    }
  }
  if (worker.type === 'caretaker') {
    if (canMoveOne(state, 'coop:eggs', SHELVES.EGG.id, 'EGG')) {
      return { from: 'coop:eggs', to: SHELVES.EGG.id, item: 'EGG' };
    }
    if (canMoveOne(state, 'machine:feed:output', 'coop:feed', 'CHICKEN_FEED')) {
      return { from: 'machine:feed:output', to: 'coop:feed', item: 'CHICKEN_FEED' };
    }
  }
  if (worker.type === 'chefWaiter') {
    for (const machineId of ['burgerKitchen', 'pizzaKitchen']) {
      const machine = state.machines[machineId];
      if (!machine) continue;
      const recipe = RECIPES[machine.recipe];
      const input = `machine:${machineId}:input`;
      for (const [item, required] of Object.entries(recipe.inputs)) {
        if (quantityAt(state.stock, input, item) >= required) continue;
        const farm = `farm:${item}`;
        const shelf = SHELVES[item]?.id;
        const from = quantityAt(state.stock, farm, item) > 0 ? farm : shelf;
        if (from && quantityAt(state.stock, from, item) > 0) return { from, to: input, item,
          farmId: from === farm ? Object.keys(state.farms).find((id) => STATIONS[id]?.item === item && state.farms[id].readyCount > 0) : undefined };
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

function workerTick(state) {
  let durable = false;
  for (const worker of state.workers) {
    if (!worker.task) {
      if (state.tick % 8 === 0 && assignWorkerTask(state, worker)) durable = true;
      if (!worker.task) continue;
    }
    const task = worker.task;
    const targetLocation = task.phase === 'to-source' ? task.from : task.to;
    const target = task.phase === 'to-source' && task.farmId
      ? STATIONS[task.farmId] : locationPosition(state, targetLocation);
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

function routeTo(customer, points, phase) {
  customer.route = points.map(({ x, z }) => ({ x, z }));
  customer.routeIndex = 0;
  customer.phase = phase;
}

function moveAlongRoute(customer) {
  while (customer.routeIndex < (customer.route?.length ?? 0)) {
    const point = customer.route[customer.routeIndex];
    if (moveToward(customer, point.x, point.z, CUSTOMER_SPEED)) return false;
    customer.routeIndex += 1;
  }
  return true;
}

function resolveCustomerPosition(customer) {
  const radius = 0.32;
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
  customer.x = Math.max(-52, Math.min(18, customer.x));
  customer.z = Math.max(-8.6, Math.min(22, customer.z));
}

function separateCustomerCrowd(state, customer) {
  if (customer.phase === 'seated' || customer.phase === 'eating' || customer.phase === 'ready-tip') return;
  for (const other of state.customers) {
    if (other === customer || other.phase === 'seated' || other.phase === 'eating' || other.phase === 'ready-tip') continue;
    const dx = customer.x - other.x;
    const dz = customer.z - other.z;
    const distance = Math.hypot(dx, dz);
    if (distance >= 0.72) continue;
    const angle = distance > 0.0001 ? Math.atan2(dz, dx) : (Number(customer.id.split('-').at(-1)) % 2 ? 0 : Math.PI);
    const push = (0.72 - distance) * 0.42;
    customer.x += Math.cos(angle) * push;
    customer.z += Math.sin(angle) * push;
  }
  resolveCustomerPosition(customer);
}

function shelfQueuePosition(item, index) {
  const shelf = SHELVES[item];
  return { x: shelf.x, z: shelf.z + 1.3 + index * 0.85 };
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
      eatTicks: 0, waitTicks: 0, facing: Math.PI,
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
    payTicks: 0, waitTicks: 0, checkoutOrder: state.nextEntityId,
    facing: Math.PI,
  };
  routeTo(customer, [{ x: customer.x, z: 10.4 }, { x: 5, z: 6.6 }], 'entering');
  makeLocation(state.stock, `customer:${id}`, 4);
  state.customers.push(customer);
}

function leaveShopper(customer) {
  routeTo(customer, [
    { x: 5, z: customer.z }, { x: 5, z: 3.5 }, { x: 5, z: 8 }, { x: 5, z: 10.4 }, { x: 5, z: 16 },
  ], 'leaving');
}

function queueForCheckout(state, customer) {
  customer.checkoutOrder = state.nextEntityId++;
  customer.registerAisleReached = false;
  routeTo(customer, [{ x: 5, z: customer.z }, { x: 5, z: 3.5 }], 'to-register');
}

function leaveDiner(state, customer) {
  const table = customer.tableId ? state.diningTables[customer.tableId] : null;
  if (table?.customerId === customer.id) table.customerId = null;
  customer.tableId = null;
  routeTo(customer, [{ x: -37, z: 7 }, { x: -37, z: 10.4 }, { x: -37, z: 16 }], 'leaving');
}

function claimTable(state, customer) {
  const entry = Object.entries(state.diningTables).find(([, table]) => !table.customerId);
  if (!entry) {
    routeTo(customer, [{ x: -37, z: 10.8 + (customer.tableWaitIndex ?? 0) * 0.85 }], 'waiting-table');
    return false;
  }
  const [tableId, table] = entry;
  customer.tableId = tableId;
  table.customerId = customer.id;
  makeLocation(state.stock, `customer:${customer.id}`, 4);
  const station = STATIONS[tableId];
  routeTo(customer, [{ x: station.x, z: station.z }], 'to-table');
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
    const item = customer.shoppingList?.[customer.shoppingIndex ?? 0] ?? customer.demand;
    const queue = shelfQueues.get(item) ?? [];
    queue.push(customer);
    shelfQueues.set(item, queue);
  }
  for (const queue of shelfQueues.values()) queue.sort((a, b) => a.checkoutOrder - b.checkoutOrder);

  const checkoutQueue = state.customers
    .filter((customer) => customer.kind === 'shopper' && ['to-register', 'queueing', 'paying'].includes(customer.phase))
    .sort((a, b) => a.checkoutOrder - b.checkoutOrder);
  for (let index = 0; index < checkoutQueue.length; index += 1) checkoutQueue[index].queueIndex = index;

  const tableQueue = state.customers.filter((customer) => customer.kind === 'diner' && customer.phase === 'waiting-table');
  tableQueue.forEach((customer, index) => { customer.tableWaitIndex = index; });

  for (let index = state.customers.length - 1; index >= 0; index -= 1) {
    const customer = state.customers[index];
    if (customer.phase === 'leaving' && !Array.isArray(customer.route)) {
      if (customer.kind === 'diner') leaveDiner(state, customer);
      else leaveShopper(customer);
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
          leaveDiner(state, customer);
          durable = true;
        }
      } else if (customer.phase === 'to-table' && moveAlongRoute(customer)) {
        customer.phase = 'waiting-meal';
        customer.waitTicks = 0;
      } else if (customer.phase === 'waiting-meal') {
        customer.waitTicks = (customer.waitTicks ?? 0) + 1;
        const mealInTransit = Object.values(state.reservations).some((reservation) => (
          reservation.to === `customer:${customer.id}` && reservation.item === customer.demand
        ));
        if (customer.waitTicks > 300 && !mealInTransit) {
          leaveDiner(state, customer);
          durable = true;
        }
      } else if (customer.phase === 'eating') {
        customer.eatTicks += 1;
        const table = state.diningTables[customer.tableId];
        if (table) table.eatTicks = customer.eatTicks;
        if (customer.eatTicks >= 80 && table && table.tipAtoms === 0) {
          table.tipAtoms = 12 * 10_000;
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
      const position = shelfQueuePosition(item, shelfQueues.get(item)?.indexOf(customer) ?? 0);
      routeTo(customer, [{ x: 5, z: 3.5 }, position], 'to-shelf');
    } else if (customer.phase === 'to-next-shelf' && moveAlongRoute(customer)) {
      const item = customer.shoppingList[customer.shoppingIndex];
      const position = shelfQueuePosition(item, shelfQueues.get(item)?.indexOf(customer) ?? 0);
      routeTo(customer, [position], 'to-shelf');
    } else if (customer.phase === 'to-shelf') {
      const item = customer.shoppingList[customer.shoppingIndex] ?? customer.demand;
      const queueIndex = shelfQueues.get(item)?.indexOf(customer) ?? 0;
      const position = shelfQueuePosition(item, Math.max(0, queueIndex));
      if (moveToward(customer, position.x, position.z, CUSTOMER_SPEED)) {
        customer.phase = 'waiting-stock';
        customer.waitTicks = 0;
      }
    } else if (customer.phase === 'waiting-stock') {
      const item = customer.shoppingList[customer.shoppingIndex] ?? customer.demand;
      const queue = shelfQueues.get(item) ?? [];
      const queueIndex = queue.indexOf(customer);
      const position = shelfQueuePosition(item, Math.max(0, queueIndex));
      moveToward(customer, position.x, position.z, CUSTOMER_SPEED);
      customer.waitTicks += 1;
      const shelfId = SHELVES[item]?.id;
      if (queueIndex === 0 && quantityAt(state.stock, shelfId, item) > 0) {
        const moved = move(state, shelfId, `customer:${customer.id}`, item, 1, `customer-pickup:${customer.id}:${customer.shoppingIndex}`);
        if (moved) {
          customer.basket.push(item);
          customer.shoppingIndex += 1;
          customer.waitTicks = 0;
          durable = true;
          if (customer.shoppingIndex < customer.shoppingList.length) {
            customer.demand = customer.shoppingList[customer.shoppingIndex];
            routeTo(customer, [{ x: 5, z: customer.z }, { x: 5, z: 3.5 }], 'to-next-shelf');
          } else {
            customer.demand = customer.basket[0];
            queueForCheckout(state, customer);
          }
        }
      } else if (customer.waitTicks > 180) {
        if (customer.basket.length) {
          customer.demand = customer.basket[0];
          queueForCheckout(state, customer);
        } else leaveShopper(customer);
      }
    } else if (customer.phase === 'to-register' || customer.phase === 'queueing') {
      const slot = { x: 5, z: -2.8 + (customer.queueIndex ?? 0) * 1.1 };
      if (customer.phase === 'to-register' && !customer.registerAisleReached) {
        if (!Array.isArray(customer.route)) queueForCheckout(state, customer);
        if (moveAlongRoute(customer)) customer.registerAisleReached = true;
      } else if (moveToward(customer, slot.x, slot.z, CUSTOMER_SPEED)) {
        customer.phase = customer.queueIndex === 0 ? 'paying' : 'queueing';
        customer.payTicks = 0;
      }
    } else if (customer.phase === 'paying') {
      const cashier = state.workers.some((worker) => worker.type === 'cashier')
        || Math.hypot(state.player.x - STATIONS.register.x, state.player.z - (STATIONS.register.z - 1.1)) <= 1.8;
      if (customer.queueIndex === 0 && cashier) customer.payTicks += 1;
      if (customer.payTicks >= (state.workers.some((worker) => worker.type === 'cashier') ? 5 : 14)) {
        const ledger = new EconomyLedger(state.economy);
        const soldItems = [...customer.basket];
        let saleAmount = 0;
        for (let itemIndex = 0; itemIndex < soldItems.length; itemIndex += 1) {
          const item = soldItems[itemIndex];
          const stock = state.stock[`customer:${customer.id}`];
          if (quantityAt(state.stock, `customer:${customer.id}`, item) < 1) continue;
          stock.items[item] -= 1;
          if (!stock.items[item]) delete stock.items[item];
          ledger.credit(`sale:${customer.id}:${itemIndex}`, ITEMS[item].price, `sale:${item}`);
          saleAmount += ITEMS[item].price;
          const statMap = { TOMATO: 'tomatoSold', TOMATO_PASTE: 'pasteSold', ORANGE_JUICE: 'juiceSold', CORN: 'cornSold', POPCORN: 'popcornSold', EGG: 'eggSold', BREAD: 'breadSold' };
          if (statMap[item]) state.stats[statMap[item]] += 1;
        }
        if (saleAmount) {
          const firstItem = soldItems[0];
          events.push({ type: 'sale', item: firstItem, items: soldItems, amount: saleAmount,
            message: `+ $${saleAmount} · ${soldItems.map((item) => ITEMS[item].icon).join(' ')} satıldı.` });
          durable = true;
        }
        leaveShopper(customer);
      }
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
  return { events, durable };
}


const MAX_STOCK = 500;

export function makeLocation(stock, id, capacity = MAX_STOCK) {
  if (!stock[id]) stock[id] = { capacity, items: {}, reserved: {}, reservedCapacity: 0 };
  else {
    stock[id].capacity = capacity;
    stock[id].reserved ??= {};
    stock[id].reservedCapacity ??= 0;
  }
  return stock[id];
}

export function quantityAt(stock, locationId, itemId) {
  return stock[locationId]?.items?.[itemId] ?? 0;
}

export function capacityAt(stock, locationId) {
  return stock[locationId]?.capacity ?? 0;
}

export function totalAt(stock, locationId) {
  return Object.values(stock[locationId]?.items ?? {}).reduce((total, amount) => total + amount, 0);
}

export function transferStock(state, { transactionId, from, to, item, quantity, reservationId }) {
  if (typeof transactionId !== 'string' || !transactionId) return { ok: false, reason: 'invalid-transaction-id' };
  const prior = state.stockTransactions.find((entry) => (typeof entry === 'string' ? entry : entry.id) === transactionId);
  if (prior) {
    const matches = typeof prior === 'string'
      || (prior.from === from && prior.to === to && prior.item === item && prior.quantity === quantity);
    return matches ? { ok: true, duplicate: true } : { ok: false, reason: 'transaction-id-conflict' };
  }
  if (!Number.isInteger(quantity) || quantity <= 0 || !state.stock[from] || !state.stock[to]) {
    return { ok: false, reason: 'invalid-transfer' };
  }
  const source = state.stock[from];
  const target = state.stock[to];
  const ownReservation = reservationId ? state.reservations[reservationId] : null;
  if (reservationId && (!ownReservation || ownReservation.from !== from || ownReservation.to !== to || ownReservation.item !== item || ownReservation.quantity !== quantity)) {
    return { ok: false, reason: 'invalid-reservation' };
  }
  const reservedAmount = ownReservation?.from === from && ownReservation.item === item ? ownReservation.quantity : 0;
  const available = (source.items[item] ?? 0) - (source.reserved?.[item] ?? 0) + reservedAmount;
  if (available < quantity) return { ok: false, reason: 'insufficient-stock' };
  const reservedSpace = target.reservedCapacity ?? 0;
  const ownSpace = ownReservation?.to === to ? ownReservation.quantity : 0;
  const destinationFree = target.capacity - totalAt(state.stock, to) - reservedSpace + ownSpace;
  if (destinationFree < quantity) return { ok: false, reason: 'destination-full' };
  source.items[item] = (source.items[item] ?? 0) - quantity;
  if (source.items[item] <= 0) delete source.items[item];
  target.items[item] = (target.items[item] ?? 0) + quantity;
  if (ownReservation) cancelReservation(state, reservationId);
  state.stockTransactions.push({ id: transactionId, from, to, item, quantity });
  if (state.stockTransactions.length > 4_000) state.stockTransactions.splice(0, 1);
  return { ok: true, duplicate: false, quantity };
}

export function canTransfer(state, from, to, item, quantity = 1) {
  const available = quantityAt(state.stock, from, item) - (state.stock[from]?.reserved?.[item] ?? 0);
  return available >= quantity
    && capacityAt(state.stock, to) - totalAt(state.stock, to) - (state.stock[to]?.reservedCapacity ?? 0) >= quantity;
}

export function reserveStock(state, { reservationId, from, to, item, quantity }) {
  if (typeof reservationId !== 'string' || !reservationId) return { ok: false, reason: 'invalid-reservation-id' };
  const source = state.stock[from];
  const target = state.stock[to];
  if (!source || !target || !Number.isInteger(quantity) || quantity < 1) return { ok: false, reason: 'invalid-reservation' };
  if (state.reservations[reservationId]) {
    const existing = state.reservations[reservationId];
    const matches = existing.from === from && existing.to === to && existing.item === item && existing.quantity === quantity;
    return matches ? { ok: true, duplicate: true } : { ok: false, reason: 'reservation-id-conflict' };
  }
  const available = (source.items[item] ?? 0) - (source.reserved?.[item] ?? 0);
  if (available < quantity) return { ok: false, reason: 'insufficient-stock' };
  const free = target.capacity - totalAt(state.stock, to) - (target.reservedCapacity ?? 0);
  if (free < quantity) return { ok: false, reason: 'destination-full' };
  source.reserved ??= {};
  target.reservedCapacity ??= 0;
  source.reserved[item] = (source.reserved[item] ?? 0) + quantity;
  target.reservedCapacity += quantity;
  state.reservations[reservationId] = { from, to, origin: from, item, quantity };
  return { ok: true, duplicate: false };
}

export function pickUpReservedStock(state, reservationId, carrierLocationId) {
  const reservation = state.reservations[reservationId];
  const carrier = state.stock[carrierLocationId];
  if (!reservation || !carrier) return { ok: false, reason: 'missing-reservation-or-carrier' };
  if (reservation.from === carrierLocationId) return { ok: true, duplicate: true };
  const source = state.stock[reservation.from];
  if (!source || (source.reserved?.[reservation.item] ?? 0) < reservation.quantity
    || quantityAt(state.stock, reservation.from, reservation.item) < reservation.quantity) {
    return { ok: false, reason: 'reserved-stock-missing' };
  }
  const carrierFree = carrier.capacity - totalAt(state.stock, carrierLocationId) - (carrier.reservedCapacity ?? 0);
  if (carrierFree < reservation.quantity) return { ok: false, reason: 'carrier-full' };
  source.items[reservation.item] -= reservation.quantity;
  if (!source.items[reservation.item]) delete source.items[reservation.item];
  source.reserved[reservation.item] -= reservation.quantity;
  if (!source.reserved[reservation.item]) delete source.reserved[reservation.item];
  carrier.items[reservation.item] = (carrier.items[reservation.item] ?? 0) + reservation.quantity;
  carrier.reserved[reservation.item] = (carrier.reserved[reservation.item] ?? 0) + reservation.quantity;
  reservation.from = carrierLocationId;
  return { ok: true, duplicate: false };
}

export function cancelReservation(state, reservationId) {
  const reservation = state.reservations[reservationId];
  if (!reservation) return false;
  const source = state.stock[reservation.from];
  const target = state.stock[reservation.to];
  source.reserved[reservation.item] -= reservation.quantity;
  if (source.reserved[reservation.item] <= 0) delete source.reserved[reservation.item];
  target.reservedCapacity = Math.max(0, (target.reservedCapacity ?? 0) - reservation.quantity);
  delete state.reservations[reservationId];
  return true;
}

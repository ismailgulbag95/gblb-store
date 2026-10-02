/**
 * Dynamic Traffic & Customer Transport System
 * Manages parking bays, bicycle racks, vehicle lifecycles, and customer arrival/departure loops.
 */

export const PARKING_BAYS = Object.freeze([
  { id: 'bay-0', x: -24, z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: -24, z: 14.5 } },
  { id: 'bay-1', x: -17, z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: -17, z: 14.5 } },
  { id: 'bay-2', x: -10, z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: -10, z: 14.5 } },
  { id: 'bay-3', x: -3,  z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: -3,  z: 14.5 } },
  { id: 'bay-4', x: 4,   z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: 4,   z: 14.5 } },
  { id: 'bay-5', x: 11,  z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: 11,  z: 14.5 } },
  { id: 'bay-6', x: 18,  z: 16.5, kind: 'car', rot: -Math.PI / 2, disembark: { x: 18,  z: 14.5 } },
  // 4 bicycle & scooter parking rack slots on sidewalk next to entrance (x: 13.5 to 16.5, z: 10.6)
  { id: 'rack-0', x: 13.5, z: 10.8, kind: 'two-wheeler', rot: 0, disembark: { x: 13.5, z: 10.0 } },
  { id: 'rack-1', x: 14.5, z: 10.8, kind: 'two-wheeler', rot: 0, disembark: { x: 14.5, z: 10.0 } },
  { id: 'rack-2', x: 15.5, z: 10.8, kind: 'two-wheeler', rot: 0, disembark: { x: 15.5, z: 10.0 } },
  { id: 'rack-3', x: 16.5, z: 10.8, kind: 'two-wheeler', rot: 0, disembark: { x: 16.5, z: 10.0 } },
]);

export const VEHICLE_PALETTES = Object.freeze({
  sedan: [0xff4757, 0xffa502, 0x1e90ff, 0xf1f2f6, 0x2ed573, 0x576574],
  pickup: [0xd63031, 0xe67e22, 0x0984e3],
  motorcycle: [0x2ed573, 0x2d3436, 0xff4757, 0x0984e3],
  bicycle: [0x3b82f6, 0xff4757, 0xfacc15, 0x2ed573, 0xa55eea],
  scooter: [0xe74c3c, 0x2ecc71, 0xf1c40f, 0x3498db],
});

export const ROAD_Z = 24.5;
export const ROAD_SPAWN_X_WEST = -46;
export const ROAD_SPAWN_X_EAST = 34;

export function initTrafficState() {
  return {
    slots: Object.fromEntries(PARKING_BAYS.map((bay) => [bay.id, {
      ...bay,
      occupiedByCustomerId: null,
      vehicleId: null,
    }])),
    vehicles: [],
    nextVehicleId: 1,
  };
}

export function findAvailableSlot(traffic, kind) {
  if (!traffic || !traffic.slots) return null;
  const candidates = Object.values(traffic.slots).filter(
    (slot) => slot.kind === kind && !slot.occupiedByCustomerId && !slot.vehicleId
  );
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function chooseVehicleType(kind) {
  if (kind === 'two-wheeler') {
    const roll = Math.random();
    if (roll < 0.4) return 'bicycle';
    if (roll < 0.75) return 'motorcycle';
    return 'scooter';
  }
  return Math.random() < 0.8 ? 'sedan' : 'pickup';
}

export function pickVehicleColor(type) {
  const palette = VEHICLE_PALETTES[type] ?? VEHICLE_PALETTES.sedan;
  return palette[Math.floor(Math.random() * palette.length)];
}

export function createTrafficVehicle(traffic, customerId, slot, vehicleType = null, color = null) {
  const type = vehicleType ?? chooseVehicleType(slot.kind);
  const col = color ?? pickVehicleColor(type);
  const id = `veh-${traffic.nextVehicleId++}`;

  // Start from road edge
  const spawnFromEast = Math.random() < 0.5;
  const startX = spawnFromEast ? ROAD_SPAWN_X_EAST : ROAD_SPAWN_X_WEST;
  const startRot = spawnFromEast ? -Math.PI : 0;

  const vehicle = {
    id,
    type,
    kind: slot.kind,
    color: col,
    slotId: slot.id,
    customerId,
    state: 'arriving', // 'arriving' -> 'parking' -> 'parked' -> 'boarding' -> 'departing' -> 'departed'
    x: startX,
    z: ROAD_Z,
    rotationY: startRot,
    targetX: slot.x,
    targetZ: slot.z,
    slotRot: slot.rot,
    speed: type === 'bicycle' ? 7.5 : 12.0,
    parkSpeed: 4.5,
    waitTicks: 0,
    disembarkPoint: slot.disembark,
    wheelsMoving: true,
  };

  slot.occupiedByCustomerId = customerId;
  slot.vehicleId = id;
  traffic.vehicles.push(vehicle);
  return vehicle;
}

export function createDriveByVehicle(traffic) {
  if (!traffic || !traffic.vehicles) return null;
  const driveBys = traffic.vehicles.filter((v) => v.state === 'driveby');
  if (driveBys.length >= 2) return null;

  const type = chooseVehicleType(Math.random() < 0.25 ? 'two-wheeler' : 'car');
  const col = pickVehicleColor(type);
  const id = `veh-cruise-${traffic.nextVehicleId++}`;
  const fromEast = Math.random() < 0.5;
  const startX = fromEast ? ROAD_SPAWN_X_EAST : ROAD_SPAWN_X_WEST;
  const targetX = fromEast ? ROAD_SPAWN_X_WEST - 10 : ROAD_SPAWN_X_EAST + 10;
  const dir = fromEast ? -1 : 1;

  const vehicle = {
    id,
    type,
    kind: type === 'sedan' || type === 'pickup' ? 'car' : 'two-wheeler',
    color: col,
    slotId: null,
    customerId: null,
    state: 'driveby',
    x: startX,
    z: ROAD_Z + (fromEast ? -0.8 : 0.8),
    rotationY: fromEast ? -Math.PI : 0,
    targetX,
    targetZ: ROAD_Z,
    speed: type === 'bicycle' ? 8.0 : 14.0,
    wheelsMoving: true,
    exitDir: dir,
  };
  traffic.vehicles.push(vehicle);
  return vehicle;
}

export function getVehicleByCustomer(traffic, customerId) {
  if (!traffic || !traffic.vehicles) return null;
  return traffic.vehicles.find((v) => v.customerId === customerId && v.state !== 'departed') ?? null;
}

export function stepTraffic(traffic, deltaSeconds = 0.05) {
  if (!traffic || !traffic.vehicles) return;

  for (let i = traffic.vehicles.length - 1; i >= 0; i -= 1) {
    const v = traffic.vehicles[i];

    if (v.state === 'driveby') {
      v.x += (v.exitDir ?? 1) * v.speed * deltaSeconds;
      v.wheelsMoving = true;
      if ((v.exitDir > 0 && v.x >= v.targetX) || (v.exitDir < 0 && v.x <= v.targetX)) {
        v.state = 'departed';
        traffic.vehicles.splice(i, 1);
      }
    } else if (v.state === 'arriving') {
      // Move along road towards slot X
      const dirX = Math.sign(v.targetX - v.x);
      const dist = Math.abs(v.targetX - v.x);
      v.rotationY = dirX > 0 ? 0 : -Math.PI;

      if (dist <= v.speed * deltaSeconds) {
        v.x = v.targetX;
        v.state = 'parking';
      } else {
        v.x += dirX * v.speed * deltaSeconds;
      }
    } else if (v.state === 'parking') {
      // Turn and drive from ROAD_Z to targetZ
      const dirZ = Math.sign(v.targetZ - v.z);
      const dist = Math.abs(v.targetZ - v.z);
      v.rotationY = v.slotRot;

      if (dist <= v.parkSpeed * deltaSeconds) {
        v.z = v.targetZ;
        v.x = v.targetX;
        v.state = 'parked';
        v.wheelsMoving = false;
      } else {
        v.z += dirZ * v.parkSpeed * deltaSeconds;
      }
    } else if (v.state === 'boarding') {
      // Customer is boarding; start departing
      v.state = 'departing';
      v.wheelsMoving = true;
      v.exitDir = Math.random() < 0.5 ? 1 : -1;
    } else if (v.state === 'departing') {
      // First reverse/drive back out to ROAD_Z
      if (Math.abs(v.z - ROAD_Z) > 0.4) {
        v.z += Math.sign(ROAD_Z - v.z) * v.parkSpeed * deltaSeconds;
        v.rotationY = v.slotRot;
      } else {
        // Now drive along the road towards exit
        v.z = ROAD_Z;
        const exitX = (v.exitDir ?? 1) > 0 ? ROAD_SPAWN_X_EAST + 6 : ROAD_SPAWN_X_WEST - 6;
        v.rotationY = (v.exitDir ?? 1) > 0 ? 0 : -Math.PI;
        v.x += (v.exitDir ?? 1) * v.speed * deltaSeconds;

        // Check if departed
        if ((v.exitDir > 0 && v.x >= exitX) || (v.exitDir < 0 && v.x <= exitX)) {
          v.state = 'departed';
          // Release slot
          if (traffic.slots[v.slotId]) {
            traffic.slots[v.slotId].occupiedByCustomerId = null;
            traffic.slots[v.slotId].vehicleId = null;
          }
          traffic.vehicles.splice(i, 1);
        }
      }
    }
  }
}

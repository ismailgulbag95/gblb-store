import test from 'node:test';
import assert from 'node:assert/strict';
import {
  initTrafficState,
  findAvailableSlot,
  createTrafficVehicle,
  getVehicleByCustomer,
  stepTraffic,
  PARKING_BAYS,
} from '../src/domain/traffic.js';

test('Traffic system initializes parking bays and bicycle racks correctly', () => {
  const traffic = initTrafficState();
  assert.ok(traffic.slots, 'Slots should exist');
  assert.equal(Object.keys(traffic.slots).length, PARKING_BAYS.length);

  const carSlots = Object.values(traffic.slots).filter((s) => s.kind === 'car');
  const bikeSlots = Object.values(traffic.slots).filter((s) => s.kind === 'two-wheeler');
  assert.equal(carSlots.length, 7, 'Should have 7 car parking slots');
  assert.equal(bikeSlots.length, 4, 'Should have 4 bicycle/scooter rack slots');
});

test('Slot reservation and vehicle assignment work properly', () => {
  const traffic = initTrafficState();
  const slot = findAvailableSlot(traffic, 'car');
  assert.ok(slot, 'Car slot should be available');

  const vehicle = createTrafficVehicle(traffic, 'customer-1', slot, 'sedan', 0xff0000);
  assert.ok(vehicle, 'Vehicle should be created');
  assert.equal(vehicle.customerId, 'customer-1');
  assert.equal(vehicle.state, 'arriving');
  assert.equal(slot.occupiedByCustomerId, 'customer-1');

  const found = getVehicleByCustomer(traffic, 'customer-1');
  assert.equal(found, vehicle);
});

test('Full parking returns null and does not crash', () => {
  const traffic = initTrafficState();
  // Occupy all 7 car bays
  for (let i = 0; i < 7; i += 1) {
    const slot = findAvailableSlot(traffic, 'car');
    assert.ok(slot, `Slot ${i} should be available`);
    createTrafficVehicle(traffic, `cust-${i}`, slot, 'sedan');
  }

  const overflowSlot = findAvailableSlot(traffic, 'car');
  assert.equal(overflowSlot, null, 'No car slots should be free when full');

  // Bike slots should still be available
  const bikeSlot = findAvailableSlot(traffic, 'two-wheeler');
  assert.ok(bikeSlot, 'Bike rack should still have free slots');
});

test('Vehicle advances through arriving -> parking -> parked -> boarding -> departing -> departed lifecycle', () => {
  const traffic = initTrafficState();
  const slot = traffic.slots['bay-4'];
  const vehicle = createTrafficVehicle(traffic, 'cust-10', slot, 'sedan', 0xffffff);

  assert.equal(vehicle.state, 'arriving');

  // Step while arriving along road
  for (let i = 0; i < 200 && vehicle.state === 'arriving'; i += 1) {
    stepTraffic(traffic, 0.05);
  }
  assert.equal(vehicle.state, 'parking', 'Vehicle should transition to parking once at slot X');

  // Step while parking into bay
  for (let i = 0; i < 200 && vehicle.state === 'parking'; i += 1) {
    stepTraffic(traffic, 0.05);
  }
  assert.equal(vehicle.state, 'parked', 'Vehicle should park in bay');
  assert.equal(vehicle.wheelsMoving, false);
  assert.equal(vehicle.z, slot.z);

  // Customer finishes shopping, boards vehicle
  vehicle.state = 'boarding';
  stepTraffic(traffic, 0.05);
  assert.equal(vehicle.state, 'departing', 'Vehicle should transition to departing after boarding');
  assert.equal(vehicle.wheelsMoving, true);

  // Step while departing to highway exit
  for (let i = 0; i < 400 && vehicle.state === 'departing'; i += 1) {
    stepTraffic(traffic, 0.05);
  }

  // Once departed, vehicle is removed and slot is freed
  assert.equal(slot.occupiedByCustomerId, null, 'Slot should be freed when vehicle departs');
  assert.equal(slot.vehicleId, null);
  assert.equal(traffic.vehicles.length, 0, 'Vehicle should be removed from active fleet');
});

test('Drive-by vehicles cruise along the road and despawn cleanly', async () => {
  const { createDriveByVehicle } = await import('../src/domain/traffic.js');
  const traffic = initTrafficState();
  const cruise = createDriveByVehicle(traffic);
  assert.ok(cruise, 'Drive-by vehicle should be created');
  assert.equal(cruise.state, 'driveby');
  assert.equal(cruise.slotId, null);

  // Step until it departs
  for (let i = 0; i < 300 && traffic.vehicles.length > 0; i += 1) {
    stepTraffic(traffic, 0.05);
  }
  assert.equal(traffic.vehicles.length, 0, 'Driveby vehicle should despawn cleanly after crossing road');
});

test('Simulation integrates vehicle transportation loop for customers', async () => {
  const { createInitialState } = await import('../src/domain/state.js');
  const { advanceSimulation } = await import('../src/domain/simulation.js');

  const state = createInitialState();
  assert.ok(state.traffic, 'State should have traffic initialized');

  // Spawn several customers until at least one arrives with vehicle
  let vehicleCustomer = null;
  for (let i = 0; i < 20; i += 1) {
    advanceSimulation(state);
    vehicleCustomer = state.customers.find((c) => c.vehicleId && c.vehicleSlotId);
    if (vehicleCustomer) break;
  }

  if (vehicleCustomer) {
    assert.ok(vehicleCustomer.vehicleId, 'Customer should have assigned vehicleId');
    assert.ok(vehicleCustomer.disembarkPoint, 'Customer should have disembarkPoint');
    const slot = state.traffic.slots[vehicleCustomer.vehicleSlotId];
    assert.ok(slot, 'Customer slot should exist in traffic state');
    assert.equal(slot.occupiedByCustomerId, vehicleCustomer.id);
  }
});


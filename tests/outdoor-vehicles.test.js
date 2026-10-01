import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';

test('EnvironmentProps instantiates all Faz 3 vehicles and outdoor props properly', () => {
  const scene = new THREE.Scene();
  const props = new EnvironmentProps(scene);

  const sedan = props.createSedan(0, 0, 0, 0xff0000);
  assert.ok(sedan, 'Sedan should be created');
  assert.ok(scene.children.includes(sedan), 'Sedan should be added to scene');

  const truck = props.createDeliveryTruck(5, 5, 0);
  assert.ok(truck, 'Delivery truck should be created');
  assert.ok(scene.children.includes(truck), 'Truck should be added to scene');

  const van = props.createDeliveryVan(10, 5, 0);
  assert.ok(van, 'Delivery van should be created');
  assert.ok(scene.children.includes(van), 'Van should be added to scene');

  const pickup = props.createPickupTruck(15, 5, 0);
  assert.ok(pickup, 'Pickup truck should be created');
  assert.ok(scene.children.includes(pickup), 'Pickup should be added to scene');

  const scooter = props.createDeliveryScooter(20, 5, 0);
  assert.ok(scooter, 'Delivery scooter should be created');
  assert.ok(scene.children.includes(scooter), 'Scooter should be added to scene');

  const lamp = props.createModernStreetLamp(0, 10);
  assert.ok(lamp, 'Modern street lamp should be created');

  const bench = props.createParkBench(5, 10);
  assert.ok(bench, 'Park bench should be created');

  const trash = props.createOutdoorTrashBin(10, 10);
  assert.ok(trash, 'Outdoor trash bin should be created');

  const totem = props.createEntranceTotem(15, 10);
  assert.ok(totem, 'Entrance totem sign should be created');
});

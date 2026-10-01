import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';

test('EnvironmentProps instantiates all Faz 5 logistics and warehouse models properly', () => {
  const scene = new THREE.Scene();
  const props = new EnvironmentProps(scene);

  const forklift = props.createWarehouseForklift(0, 0, 0);
  assert.ok(forklift, 'Warehouse forklift should be created');
  assert.ok(scene.children.includes(forklift), 'Forklift should be in scene');

  const palletJack = props.createHydraulicPalletJack(5, 0, 0);
  assert.ok(palletJack, 'Hydraulic pallet jack should be created');
  assert.ok(scene.children.includes(palletJack), 'Pallet jack should be in scene');

  const pallets = props.createPalletStack(10, 0, 4, true);
  assert.ok(pallets, 'Pallet stack should be created');
  assert.ok(scene.children.includes(pallets), 'Pallet stack should be in scene');

  const dock = props.createLoadingDock(0, 10, 0);
  assert.ok(dock, 'Loading dock should be created');
  assert.ok(scene.children.includes(dock), 'Loading dock should be in scene');

  const hangar = props.createWarehouseHangarBuilding(10, 10, 0);
  assert.ok(hangar, 'Warehouse hangar should be created');
  assert.ok(scene.children.includes(hangar), 'Hangar should be in scene');

  const coldStorage = props.createColdStorageBunker(20, 10, 0);
  assert.ok(coldStorage, 'Cold storage bunker should be created');
  assert.ok(scene.children.includes(coldStorage), 'Cold storage should be in scene');

  const dumpsters = props.createRecyclingDumpsters(0, 20, 0);
  assert.ok(dumpsters, 'Recycling dumpsters should be created');
  assert.ok(scene.children.includes(dumpsters), 'Dumpsters should be in scene');
});

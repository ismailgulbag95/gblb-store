import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';

test('EnvironmentProps instantiates all Faz 4 farm models properly', () => {
  const scene = new THREE.Scene();
  const props = new EnvironmentProps(scene);

  const greenhouse = props.createGreenhouse(0, 0, 0);
  assert.ok(greenhouse, 'Greenhouse should be created');
  assert.ok(scene.children.includes(greenhouse), 'Greenhouse should be in scene');

  const barn = props.createRedBarn(10, 0, 0);
  assert.ok(barn, 'Red Barn should be created');
  assert.ok(scene.children.includes(barn), 'Red Barn should be in scene');

  const waterTower = props.createWaterTower(20, 0);
  assert.ok(waterTower, 'Water tower should be created');
  assert.ok(scene.children.includes(waterTower), 'Water tower should be in scene');

  const tractor = props.createFarmTractor(0, 10, 0);
  assert.ok(tractor, 'Tractor should be created');
  assert.ok(scene.children.includes(tractor), 'Tractor should be in scene');

  const cowGrazing = props.createDairyCow(10, 10, 0, true);
  assert.ok(cowGrazing, 'Grazing dairy cow should be created');
  assert.ok(scene.children.includes(cowGrazing), 'Grazing cow should be in scene');

  const cowAlert = props.createDairyCow(15, 10, 0, false);
  assert.ok(cowAlert, 'Alert dairy cow should be created');
  assert.ok(scene.children.includes(cowAlert), 'Alert cow should be in scene');

  const chickenPecking = props.createGrazingChicken(20, 10, 0, true);
  assert.ok(chickenPecking, 'Pecking chicken should be created');
  assert.ok(scene.children.includes(chickenPecking), 'Pecking chicken should be in scene');

  const chickenAlert = props.createGrazingChicken(22, 10, 0, false);
  assert.ok(chickenAlert, 'Alert chicken should be created');
  assert.ok(scene.children.includes(chickenAlert), 'Alert chicken should be in scene');

  const wheatPatch = props.createWheatFieldPatch(0, 20, 4.2, 3.2);
  assert.ok(wheatPatch, 'Wheat field patch should be created');
  assert.ok(scene.children.includes(wheatPatch), 'Wheat field should be in scene');

  const vegBeds = props.createVegetablePlotRaisedBeds(10, 20, 0);
  assert.ok(vegBeds, 'Raised vegetable beds should be created');
  assert.ok(scene.children.includes(vegBeds), 'Raised beds should be in scene');

  // Verify all meshes in scene have valid THREE.Material instances with customProgramCacheKey
  scene.traverse((child) => {
    if (child.isMesh) {
      assert.ok(child.material, 'Mesh must have a material assigned');
      assert.equal(typeof child.material.customProgramCacheKey, 'function',
        `Mesh material must be a THREE.Material instance, got ${child.material?.type || typeof child.material}`);
    }
  });
});


import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createProductionBuildModel } from '../src/presentation/ProductionBuildModel.js';

test('createProductionBuildModel builds all 9 machines with anchors and animations', () => {
  const machineIds = [
    'paste',
    'juice',
    'popcorn',
    'feed',
    'flourMill',
    'bakery',
    'orangeTartKitchen',
    'burgerKitchen',
    'pizzaKitchen',
  ];

  for (const id of machineIds) {
    const group = new THREE.Group();
    const result = createProductionBuildModel(group, id);

    assert.ok(result, `Machine ${id} must return a build result`);
    assert.ok(result.input instanceof THREE.Group, `Machine ${id} must have an input anchor`);
    assert.ok(result.output instanceof THREE.Group, `Machine ${id} must have an output anchor`);
    assert.ok(result.lamp instanceof THREE.Mesh, `Machine ${id} must have a status lamp`);
    assert.strictEqual(typeof result.badgeY, 'number', `Machine ${id} must specify badgeY`);
    assert.ok(result.badgeY >= 2.5, `Machine ${id} badgeY must be above machine height`);
    assert.ok(group.children.length > 5, `Machine ${id} must create rich procedural geometry`);

    // Verify animation update function
    assert.strictEqual(typeof result.update, 'function', `Machine ${id} must provide update callback`);

    // Run idle animation step
    assert.doesNotThrow(() => {
      result.update(1.0, 0.016, false);
    }, `Machine ${id} update should succeed in idle mode`);

    // Run active working animation step
    assert.doesNotThrow(() => {
      result.update(1.5, 0.016, true);
    }, `Machine ${id} update should succeed in working mode`);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { LightingManager } from '../src/presentation/LightingManager.js';

test('LightingManager instantiates correctly and sets up lights without ReferenceError', () => {
  const scene = new THREE.Scene();
  const lighting = new LightingManager(scene);

  assert.ok(lighting.dirLight, 'dirLight should be initialized');
  assert.ok(lighting.hemiLight, 'hemiLight should be initialized');
  assert.ok(lighting.storeLight, 'storeLight should be initialized');
  assert.equal(scene.children.length, 4, 'scene should contain 4 lights');
});

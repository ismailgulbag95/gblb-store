import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createWorkerMesh, STAFF_PROFESSION_KEYS } from '../src/presentation/HumanoidFactory.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { CharacterAnimator } from '../src/presentation/CharacterAnimator.js';

test('every profession and simulation alias retains articulated joints and finite walking poses', () => {
  const factory = new Item3DFactory();
  for (const type of STAFF_PROFESSION_KEYS) {
    const actor = createWorkerMesh(type, factory), animator = new CharacterAnimator(actor, factory, 'worker');
    const worker = { id: `worker-${type}`, type, x: 0, z: 0, facing: 0, task: null };
    assert.equal(actor.profession, type);
    for (const joints of [actor.arms, actor.elbows, actor.wrists, actor.legs, actor.knees]) {
      assert.equal(joints.length, 2);
      assert.ok(joints.every(joint => joint instanceof THREE.Group && joint.parent));
    }
    animator.update(worker, 1 / 60, { items: {} });
    for (let i = 1; i <= 30; i++) {
      worker.x = i * 0.015; animator.update(worker, 1 / 60, { items: {} });
    }
    actor.group.updateMatrixWorld(true);
    actor.group.traverse(node => assert.ok(node.matrixWorld.elements.every(Number.isFinite), `${type}: invalid transform`));
    assert.ok(actor.cargo instanceof THREE.Mesh && actor.cargo.parent === actor.group);
    animator.dispose();
  }
});

test('profession gear remains attached to its animated wrist after the body redesign', () => {
  const factory = new Item3DFactory();
  for (const [type, tool] of [['cashier', 'scanner'], ['security', 'radio'], ['chef', 'pan'], ['technician', 'wrench'], ['storeManager', 'briefcase'], ['butcher', 'cleaver']]) {
    const actor = createWorkerMesh(type, factory), prop = actor.propObjects[tool];
    assert.ok(prop, `${type}: missing ${tool}`);
    assert.ok(actor.wrists.some(wrist => {
      let node = prop; while (node) { if (node === wrist) return true; node = node.parent; } return false;
    }), `${type}: tool detached from wrist`);
  }
});

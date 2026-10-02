import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { CharacterFactory } from '../src/presentation/CharacterFactory.js';
import { PLAYER_CHARACTER_IDS } from '../src/domain/characters.js';

for (const type of PLAYER_CHARACTER_IDS) {
  test(`${type}: bounded geometry and independent walk/idle pivots`, () => {
    const actor = new CharacterFactory(type);
    const other = new CharacterFactory(type);
    let triangles = 0;
    actor.group.traverse((mesh) => {
      if (!mesh.isMesh) return;
      triangles += (mesh.geometry.index?.count ?? mesh.geometry.attributes.position.count) / 3;
      assert.ok([...mesh.geometry.attributes.position.array].every(Number.isFinite));
    });
    assert.ok(triangles <= 3000, `${triangles} triangles exceeds the avatar budget`);
    for (let frame = 0; frame < 60; frame++) actor.animate(1 / 60, true);
    assert.notEqual(actor.leftLeg.rotation.x, 0);
    assert.equal(other.leftLeg.rotation.x, 0);
    for (let frame = 0; frame < 60; frame++) actor.animate(1 / 60, false);
    assert.ok(Math.abs(actor.leftLeg.rotation.x) < 0.001);
    assert.ok(new THREE.Box3().setFromObject(actor.group).min.y > -0.05);
    if (type === 'cat') assert.ok(actor.tailGroup?.parent);
    if (type === 'robot') assert.ok(actor.antennaGroup?.parent);
  });
}

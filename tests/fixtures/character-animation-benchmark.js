import * as THREE from 'three';
import { CharacterAnimator } from '../../src/presentation/CharacterAnimator.js';
import { createCustomerMesh, createWorkerMesh } from '../../src/presentation/HumanoidFactory.js';
import { Item3DFactory } from '../../src/presentation/Item3DFactory.js';
import { EnvironmentProps } from '../../src/environment/EnvironmentProps.js';

// Measures procedural animation CPU cost, not WebGL/GPU scene performance.
const factory = new Item3DFactory();
const environment = { props: new EnvironmentProps() };
const fixtures = Array.from({ length: 40 }, (_, i) => {
  const entity = { id: `benchmark-${i}`, kind: 'shopper', x: i * 0.65, z: 0, facing: 0, basket: [], phase: 'queueing' };
  const actor = i < 32 ? createCustomerMesh({ ...entity, archetype: i % 2 ? 'shopperBasket' : 'shopperCart' }, environment, factory)
    : createWorkerMesh('stockClerk', factory);
  const animation = new CharacterAnimator(actor, factory, i < 32 ? 'customer' : 'worker');
  const context = { items: {}, resolveTarget: (cue) => ({ point: new THREE.Vector3(cue.x, 0.75, cue.z + 0.5), mesh: new THREE.Mesh() }) };
  animation.update(entity, 1 / 60, context);
  return { entity, animation, context };
});
const samples = [];
for (let frame = 0; frame < 600; frame++) {
  const start = performance.now();
  fixtures.forEach((f, i) => {
    if (frame === 60 + i * 2) {
      f.entity.basket = i < 32 ? ['TOMATO'] : [];
      f.entity.animationCues = [{ id: `receipt-${i}`, type: i < 32 ? 'shop' : 'deliver', item: 'TOMATO', basketIndex: 0,
        x: f.entity.x, z: f.entity.z, shelf: i >= 32 }];
    }
    if (frame > 300 && frame % 6 === 0) f.entity.z += 0.36;
    f.animation.update(f.entity, 1 / 60, f.context);
  });
  if (frame > 60) samples.push(performance.now() - start);
}
samples.sort((a, b) => a - b);
console.log(JSON.stringify({ characters: 40, measuredFrames: samples.length,
  medianAnimationCpuMs: +samples[Math.floor(samples.length / 2)].toFixed(3),
  p95AnimationCpuMs: +samples[Math.floor(samples.length * 0.95)].toFixed(3),
  pendingActions: fixtures.reduce((n, f) => n + f.animation.pending.length, 0),
  activeActions: fixtures.filter((f) => f.animation.action).length,
}, null, 2));
fixtures.forEach((f) => f.animation.dispose());

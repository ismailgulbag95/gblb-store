import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  STAFF_PROFESSIONS,
  STAFF_PROFESSION_KEYS,
  CUSTOMER_ARCHETYPES,
  CUSTOMER_SKINS,
  CUSTOMER_HAIR,
  CUSTOMER_SHIRTS,
  CUSTOMER_PANTS,
  makeHumanoid,
  createWorkerMesh,
  createCustomerMesh
} from '../src/presentation/HumanoidFactory.js';
import { CharacterFactory } from '../src/presentation/CharacterFactory.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { EnvironmentProps } from '../src/environment/EnvironmentProps.js';

test('STAFF_PROFESSIONS contains all 10 distinct supermarket staff professions', () => {
  const expectedProfessions = [
    'cashier',
    'stockClerk',
    'warehouseOperator',
    'storeManager',
    'janitor',
    'security',
    'chef',
    'technician',
    'courier',
    'gardener'
  ];

  for (const profKey of expectedProfessions) {
    assert.ok(STAFF_PROFESSIONS[profKey], `Profession ${profKey} should be defined in STAFF_PROFESSIONS`);
    assert.ok(STAFF_PROFESSIONS[profKey].title.tr, `Profession ${profKey} should have a Turkish title`);
    assert.ok(STAFF_PROFESSIONS[profKey].title.en, `Profession ${profKey} should have an English title`);
    assert.ok(typeof STAFF_PROFESSIONS[profKey].uniformColor === 'number', `Profession ${profKey} should have numeric uniformColor`);
  }
});

test('createWorkerMesh builds complete 3D models for all 10 professions and aliases', () => {
  const itemFactory = new Item3DFactory();
  const testProfessions = [
    'cashier',
    'stockClerk',
    'warehouseOperator',
    'storeManager',
    'janitor',
    'security',
    'chef',
    'technician',
    'courier',
    'gardener',
    // Backwards compatibility aliases
    'factoryFeeder',
    'harvester',
    'caretaker',
    'chefWaiter',
    'waiter'
  ];

  for (const profession of testProfessions) {
    const worker = createWorkerMesh(profession, itemFactory);
    assert.ok(worker.group instanceof THREE.Group, `Worker ${profession} should have a THREE.Group root`);
    assert.ok(worker.group.children.length > 0, `Worker ${profession} group should contain meshes`);
    assert.ok(Array.isArray(worker.legs) && worker.legs.length === 2, `Worker ${profession} should have 2 animated legs`);
    assert.ok(Array.isArray(worker.arms) && worker.arms.length === 2, `Worker ${profession} should have 2 animated arms`);
    assert.ok(worker.cargo instanceof THREE.Mesh, `Worker ${profession} should have a cargo slot`);
    assert.equal(typeof worker.walkCycle, 'number', `Worker ${profession} should have numeric walkCycle`);
  }
});

test('CharacterFactory supports all 10 staff professions as player avatar options with walk animation', () => {
  const professions = [
    'cashier',
    'stockClerk',
    'warehouseOperator',
    'storeManager',
    'janitor',
    'security',
    'chef',
    'technician',
    'courier',
    'gardener'
  ];

  for (const prof of professions) {
    const char = new CharacterFactory(prof);
    assert.ok(char.group instanceof THREE.Group, `CharacterFactory(${prof}) should return a THREE.Group`);
    assert.ok(char.leftLeg, `CharacterFactory(${prof}) should have leftLeg`);
    assert.ok(char.rightLeg, `CharacterFactory(${prof}) should have rightLeg`);
    assert.ok(char.leftArm, `CharacterFactory(${prof}) should have leftArm`);
    assert.ok(char.rightArm, `CharacterFactory(${prof}) should have rightArm`);

    // Verify walk animation executes without error
    char.animate(0.016, true);
    assert.notEqual(char.leftLeg.rotation.x, 0, `Walking animation should rotate leftLeg for ${prof}`);
    assert.notEqual(char.rightLeg.rotation.x, 0, `Walking animation should rotate rightLeg for ${prof}`);

    // Verify idle transition
    char.animate(0.016, false);
  }
});

test('CUSTOMER_ARCHETYPES contains 10 lifestyle archetypes with rich demographic palettes', () => {
  assert.equal(CUSTOMER_ARCHETYPES.length, 10, 'Should have exactly 10 customer archetype definitions');
  assert.ok(CUSTOMER_SKINS.length >= 6, 'Should have at least 6 diverse realistic skin tones');
  assert.ok(CUSTOMER_HAIR.length >= 8, 'Should have at least 8 hair color options');
  assert.ok(CUSTOMER_SHIRTS.length >= 10, 'Should have at least 10 clothing colors');
  assert.ok(CUSTOMER_PANTS.length >= 6, 'Should have at least 6 trouser colors');
});

test('createCustomerMesh produces 20+ distinct demographic and archetype variations', () => {
  const itemFactory = new Item3DFactory();
  const envProps = new EnvironmentProps();
  const mockEnvironment = { props: envProps };

  const seenArchetypes = new Set();
  const createdCustomers = [];

  // Generate 25 distinct customers with varied IDs and archetypes
  for (let index = 0; index < 25; index += 1) {
    const customerData = {
      id: `customer-test-id-${index * 137 + 19}`,
      kind: index % 3 === 0 ? 'diner' : 'shopper',
      archetypeIndex: index % CUSTOMER_ARCHETYPES.length,
      archetype: CUSTOMER_ARCHETYPES[index % CUSTOMER_ARCHETYPES.length]
    };

    const customerMesh = createCustomerMesh(customerData, mockEnvironment, itemFactory);
    assert.ok(customerMesh.group instanceof THREE.Group, `Customer #${index} must have a valid group`);
    assert.ok(customerMesh.legs.length === 2, `Customer #${index} must have 2 legs`);
    assert.ok(customerMesh.arms.length === 2, `Customer #${index} must have 2 arms`);
    assert.ok(customerMesh.cargo.length === 3, `Customer #${index} must have cargo slots`);
    assert.ok(customerMesh.archetype, `Customer #${index} must have an assigned archetype`);

    seenArchetypes.add(customerMesh.archetype);
    createdCustomers.push(customerMesh);

    // Verify child scale adjustment
    if (customerMesh.archetype === 'child') {
      assert.equal(customerMesh.group.scale.x, 0.72, 'Child archetype should be scaled to 0.72x');
    }
  }

  // Verify all 10 archetypes were successfully instantiated in the sample
  assert.equal(seenArchetypes.size, 10, 'All 10 distinct archetypes should be represented');
  assert.equal(createdCustomers.length, 25, '25 unique customers generated successfully');
});

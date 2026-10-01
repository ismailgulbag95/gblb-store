import test from 'node:test';
import assert from 'node:assert/strict';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';

test('Item3DFactory caches and provides valid geometry for all Faz 2 product categories', () => {
  const factory = new Item3DFactory();
  const testItems = [
    'TOMATO', 'ORANGE', 'CORN', 'APPLE', 'BANANA', 'CARROT', 'POTATO', 'LETTUCE', 'WATERMELON',
    'MILK', 'CEREAL', 'CHIPS', 'CANNED_SOUP', 'JAM', 'STEAK', 'CHEESE', 'DETERGENT',
    'COLA', 'WATER', 'ORANGE_JUICE', 'BREAD', 'BAGUETTE', 'CHOCO_DONUT', 'STRAWBERRY_DONUT',
    'MUFFIN', 'FLOUR', 'ORANGE_TART', 'BURGER', 'PIZZA'
  ];

  for (const id of testItems) {
    const geo1 = factory.getItemGeometry(id);
    const geo2 = factory.getItemGeometry(id);
    assert.ok(geo1, `Geometry should exist for ${id}`);
    assert.strictEqual(geo1, geo2, `Geometry instance must be strictly cached for identity check on ${id}`);
    assert.strictEqual(geo1.userData.sharedAsset, true, `sharedAsset flag must be true for ${id}`);
  }
});

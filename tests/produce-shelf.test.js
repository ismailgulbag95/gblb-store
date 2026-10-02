import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createShelfModel } from '../src/presentation/ShelfModel.js';
import { Item3DFactory } from '../src/presentation/Item3DFactory.js';
import { SHELVES } from '../src/domain/catalog.js';

const fixtureColors = new Set([0x784421, 0xa06233, 0xd4a373, 0xba8c5a,
  0xe5dec9, 0x78e08f, 0x1e272e, 0xffffff, 0x2f3640, 0x61696e, 0xffd763]);
for (const item of ['TOMATO', 'ORANGE', 'CORN']) {
  test(`${item} produce shelf contains only inventory-controlled food`, () => {
    const factory = new Item3DFactory();
    // Corn's material paints a browser canvas; the shelf contract only needs
    // its material identity, so supply it for this headless geometry test.
    if (item === 'CORN') factory.itemMaterials.set(item, new THREE.MeshStandardMaterial({ color: 0xf1c40f }));
    const { group, productMeshes } = createShelfModel(item, SHELVES[item], factory);
    const geometry = factory.getItemGeometry(item);
    const material = factory.getItemMaterial(item);
    assert.equal(productMeshes.length, SHELVES[item].capacity);
    group.traverse((mesh) => {
      if (!mesh.isMesh || mesh.material.map) return;
      if (productMeshes.includes(mesh)) {
        assert.equal(mesh.geometry, geometry);
        assert.equal(mesh.material, material);
      } else {
        assert.ok(fixtureColors.has(mesh.material.color.getHex()), 'Unmanaged decorative food remains');
        assert.notEqual(mesh.geometry.type, 'SphereGeometry', 'Unmanaged fruit remains');
      }
    });
    assert.equal(productMeshes.filter(mesh => mesh.visible).length, 0);
    for (const count of [3, SHELVES[item].capacity, 0]) {
      productMeshes.forEach((mesh, index) => { mesh.visible = index < count; });
      assert.equal(productMeshes.filter(mesh => mesh.visible).length, count);
    }
    group.updateMatrixWorld(true);
    const positions = productMeshes.map(mesh => mesh.getWorldPosition(mesh.position.clone()).toArray().join(','));
    assert.equal(new Set(positions).size, positions.length);
  });
}

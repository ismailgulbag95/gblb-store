import * as THREE from 'three';
import { MONEY_ATOMS } from '../domain/catalog.js';

const BUNDLES_PER_Z_LAYER = 4;
const LEGACY_BUNDLE_VALUE_ATOMS = 5 * MONEY_ATOMS;
const BUNDLE_SCALE = 1.1;
const BUNDLE_X_SPACING = 0.32;
const BUNDLE_Y_SPACING = 0.11;
const BUNDLE_Z_SPACING = 0.21;

export function createCashPileModel() {
  const group = new THREE.Group();
  group.visible = false;
  return {
    group,
    bundles: [],
    visibleBundleCount: 0,
    billGeometry: new THREE.BoxGeometry(0.26, 0.08, 0.16),
    bandGeometry: new THREE.BoxGeometry(0.055, 0.09, 0.165),
    billMaterial: new THREE.MeshStandardMaterial({ color: 0x4ca66d, roughness: 0.72 }),
    bandMaterial: new THREE.MeshStandardMaterial({ color: 0xf4e6bb, roughness: 0.82 }),
  };
}

function createBundle(pile, index) {
  const bundle = new THREE.Group();
  const bill = new THREE.Mesh(pile.billGeometry, pile.billMaterial);
  bill.position.y = 0.04;
  bill.castShadow = true;
  const band = new THREE.Mesh(pile.bandGeometry, pile.bandMaterial);
  band.position.y = 0.045;
  bundle.add(bill, band);

  const xSlot = index % 2;
  const ySlot = Math.floor(index / 2) % 2;
  const zLayer = Math.floor(index / BUNDLES_PER_Z_LAYER);
  bundle.position.set((xSlot - 0.5) * BUNDLE_X_SPACING, ySlot * BUNDLE_Y_SPACING, zLayer * BUNDLE_Z_SPACING);
  bundle.scale.setScalar(BUNDLE_SCALE);
  bundle.visible = false;
  pile.group.add(bundle);
  pile.bundles.push(bundle);
  return bundle;
}

export function updateCashPileModel(pile, amountAtoms, savedBundleCount) {
  const amount = Number.isSafeInteger(amountAtoms) && amountAtoms > 0 ? amountAtoms : 0;
  const bundleCount = Number.isSafeInteger(savedBundleCount) && savedBundleCount >= 0
    ? savedBundleCount
    : Math.ceil(amount / LEGACY_BUNDLE_VALUE_ATOMS);

  while (pile.bundles.length < bundleCount) createBundle(pile, pile.bundles.length);
  pile.group.visible = bundleCount > 0;
  if (bundleCount > pile.visibleBundleCount) {
    for (let index = pile.visibleBundleCount; index < bundleCount; index += 1) pile.bundles[index].visible = true;
  } else if (bundleCount < pile.visibleBundleCount) {
    for (let index = bundleCount; index < pile.visibleBundleCount; index += 1) pile.bundles[index].visible = false;
  }
  pile.visibleBundleCount = bundleCount;
}

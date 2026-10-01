import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createShelfModel(itemId, shelfDef, itemFactory) {
  const group = new THREE.Group();
  group.position.set(shelfDef.x, 0, shelfDef.z);

  const type = shelfDef.displayType ?? 'gondola';
  const productMeshes = [];

  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Mesh(new THREE.PlaneGeometry(1.58, 0.34), new THREE.MeshBasicMaterial({ map: labelTexture, toneMapped: false }));

  if (type === 'produce') {
    const woodDark = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });
    const woodLight = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.75 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xc28d53, roughness: 0.8 });
    const greenTrim = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.4 });

    for (const lx of [-0.95, 0.95]) for (const lz of [-0.5, 0.5]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), woodDark);
      leg.position.set(lx, 0.4, lz);
      leg.castShadow = true;
      group.add(leg);
    }

    const deck = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.08, 1.35), woodLight);
    deck.position.set(0, 0.78, 0);
    deck.rotation.x = 0.18;
    deck.castShadow = true;
    group.add(deck);

    for (let c = 0; c < 3; c++) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 1.25), crateMat);
      crate.position.set(-0.75 + c * 0.75, 0.86, 0);
      crate.rotation.x = 0.18;
      crate.castShadow = true;
      group.add(crate);
    }

    for (const px of [-1.05, 1.05]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.05, 8), woodDark);
      post.position.set(px, 1.02, -0.48);
      post.castShadow = true;
      group.add(post);
    }

    const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.28, 0.42, 0.12, 2, 0.04), greenTrim);
    canopy.position.set(0, 2.05, -0.42);
    canopy.castShadow = true;
    group.add(canopy);

    label.position.set(0, 2.05, -0.34);
    group.add(label);

    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      const cx = -0.75 + col * 0.75;
      const cz = 0.28 - row * 0.38;
      const cy = 0.84 + (row === 0 ? 0.02 : 0.12) + (index >= 6 ? 0.15 : 0);
      mesh.position.set(cx, cy, cz);
      mesh.rotation.x = 0.18;
      mesh.scale.setScalar(itemId === 'CORN' ? 1.15 : 0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else if (type === 'cooler') {
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f2f6, roughness: 0.25 });
    const blueTrim = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.35 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x81ecec, transparent: true, opacity: 0.45, roughness: 0.08, metalness: 0.2 });

    const body = new THREE.Mesh(new RoundedBoxGeometry(2.28, 0.92, 1.25, 3, 0.08), whiteMat);
    body.position.y = 0.46;
    body.castShadow = true;
    group.add(body);

    const stripe = new THREE.Mesh(new RoundedBoxGeometry(2.32, 0.1, 1.29, 2, 0.04), blueTrim);
    stripe.position.y = 0.76;
    group.add(stripe);

    const kickplate = new THREE.Mesh(new RoundedBoxGeometry(2.34, 0.12, 1.31, 2, 0.04), darkMat);
    kickplate.position.y = 0.06;
    group.add(kickplate);

    const glassLid1 = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.03, 1.1), glassMat);
    glassLid1.position.set(-0.54, 0.94, 0);
    const glassLid2 = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.03, 1.1), glassMat);
    glassLid2.position.set(0.54, 0.95, 0);
    group.add(glassLid1, glassLid2);

    for (const hx of [-0.54, 0.54]) {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 0.06), chromeMat);
      handle.position.set(hx, 0.97, 0.38);
      group.add(handle);
    }

    for (const ax of [-0.98, 0.98]) {
      const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.2, 8), chromeMat);
      arch.position.set(ax, 1.45, 0);
      group.add(arch);
    }

    const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.1, 0.4, 0.12, 3, 0.06), blueTrim);
    canopy.position.set(0, 2.05, 0);
    canopy.castShadow = true;
    group.add(canopy);

    label.position.set(0, 2.05, 0.08);
    group.add(label);

    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      mesh.position.set(-0.62 + col * 0.62, 0.72 + (itemId === 'EGG' ? 0.08 : 0.14), (row === 0 ? 0.26 : -0.26));
      mesh.scale.setScalar(itemId === 'EGG' ? 1.05 : 0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else if (type === 'bakery') {
    const woodDark = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.85 });
    const woodWarm = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
    const wicker = new THREE.MeshStandardMaterial({ color: 0xc29263, roughness: 0.9 });
    const goldTrim = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.7, roughness: 0.25 });

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(2.28, 2.05, 0.12), woodDark);
    backWall.position.set(0, 1.05, -0.32);
    backWall.castShadow = true;
    group.add(backWall);

    for (const px of [-1.1, 1.1]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.1, 0.16), woodDark);
      pillar.position.set(px, 1.05, -0.28);
      pillar.castShadow = true;
      group.add(pillar);
    }

    const bakeryRows = [0.65, 1.25];
    for (const y of bakeryRows) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.08, 0.78), woodWarm);
      shelf.position.set(0, y, 0.08);
      shelf.rotation.x = 0.12;
      shelf.castShadow = true;
      group.add(shelf);

      const lip = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.09, 0.04), goldTrim);
      lip.position.set(0, y + 0.06, 0.46);
      group.add(lip);
    }

    const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.65, 12), wicker);
    basket.position.set(0.85, 0.62, 0.15);
    group.add(basket);

    const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.42, 0.14, 3, 0.06), woodDark);
    canopy.position.set(0, 2.05, -0.15);
    canopy.castShadow = true;
    group.add(canopy);

    label.position.set(0, 2.05, -0.06);
    group.add(label);

    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      mesh.position.set(-0.58 + col * 0.58, bakeryRows[row % bakeryRows.length] + 0.18, 0.12);
      mesh.scale.setScalar(0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else {
    const whiteSteel = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.35, metalness: 0.1 });
    const uprightSteel = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.3, metalness: 0.65 });
    const bumperDark = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.7 });
    const goldTrim = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.8, roughness: 0.2 });
    const priceRailMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 });

    const base = new THREE.Mesh(new RoundedBoxGeometry(1.82, 0.22, 0.95, 3, 0.06), whiteSteel);
    base.position.set(0, 0.13, 0);
    base.castShadow = true;
    group.add(base);

    const bumper = new THREE.Mesh(new RoundedBoxGeometry(1.86, 0.09, 0.98, 2, 0.03), bumperDark);
    bumper.position.set(0, 0.055, 0);
    group.add(bumper);

    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(1.72, 1.85, 0.08), whiteSteel);
    backPanel.position.set(0, 1.05, -0.18);
    backPanel.castShadow = true;
    group.add(backPanel);

    for (const x of [-0.78, 0.78]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.88, 0.12), uprightSteel);
      post.position.set(x, 1.05, -0.16);
      post.castShadow = true;
      group.add(post);

      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.14), goldTrim);
      cap.position.set(x, 2.01, -0.16);
      group.add(cap);
    }

    const rows = [];
    for (const y of [0.52, 0.98, 1.45]) {
      const shelfPlank = new THREE.Mesh(new RoundedBoxGeometry(1.68, 0.07, 0.72, 2, 0.03), whiteSteel);
      shelfPlank.position.set(0, y, 0.08);
      shelfPlank.castShadow = true;
      shelfPlank.receiveShadow = true;
      group.add(shelfPlank);

      const priceRail = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.045, 0.035), priceRailMat);
      priceRail.position.set(0, y + 0.025, 0.45);
      group.add(priceRail);

      rows.push(y + 0.16);
    }

    const canopy = new THREE.Mesh(new RoundedBoxGeometry(1.72, 0.42, 0.14, 3, 0.06), bumperDark);
    canopy.position.set(0, 2.05, 0.02);
    canopy.castShadow = true;
    group.add(canopy);

    const goldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.46, 0.06), goldTrim);
    goldBorder.position.set(0, 2.05, -0.02);
    group.add(goldBorder);

    label.position.set(0, 2.05, 0.1);
    group.add(label);

    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const row = Math.floor(index / 3);
      const column = index % 3;
      mesh.position.set(-0.5 + column * 0.5, rows[row % rows.length], 0.12);
      mesh.scale.setScalar(0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }
  }

  return { group, productMeshes, labelCanvas, labelTexture };
}

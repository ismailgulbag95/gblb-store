import * as THREE from 'three';
import { addShelfWobbler } from './ShelfFeedback.js';
import { addContactShadow } from './ContactShadow.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createShelfModel(itemId, shelfDef, itemFactory) {
  const group = new THREE.Group();
  group.position.set(shelfDef.x, 0, shelfDef.z);

  const type = shelfDef.displayType ?? 'gondola';
  addContactShadow(group, type === 'produce' ? 3.7 : 2.5, type === 'produce' ? 2.1 : 1.5);
  const productMeshes = [];

  const labelCanvas = typeof document !== 'undefined'
    ? document.createElement('canvas')
    : { width: 512, height: 128, getContext: () => ({ fillText: () => {}, fillRect: () => {} }) };
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1.58, 0.34),
    new THREE.MeshBasicMaterial({ map: labelTexture, toneMapped: false })
  );

  // Reusable Materials
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.6, metalness: 0.4 });
  const chalkboardMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.85 });
  const priceTagMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  if (type === 'produce') {
    // -------------------------------------------------------------
    // 11. EĞİMLİ AHŞAP MANAV TEZGÂHI (Produce Shelf - 3-Tier Stepped)
    // -------------------------------------------------------------
    const woodDark = new THREE.MeshStandardMaterial({ color: 0x784421, roughness: 0.85 });
    const woodMedium = new THREE.MeshStandardMaterial({ color: 0xa06233, roughness: 0.8 });
    const woodLight = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.75 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xba8c5a, roughness: 0.8 });
    const stoneBaseMat = new THREE.MeshStandardMaterial({ color: 0xe5dec9, roughness: 0.9 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x78e08f, roughness: 0.6 });

    // Ground platform slab with beveled edges and corner grass tufts
    const basePlinth = new THREE.Mesh(new RoundedBoxGeometry(2.6, 0.08, 1.8, 3, 0.03), stoneBaseMat);
    basePlinth.position.set(0, 0.04, 0);
    basePlinth.receiveShadow = true;
    group.add(basePlinth);

    for (const [gx, gz] of [[-1.25, -0.85], [1.25, -0.85], [-1.25, 0.85], [1.25, 0.85]]) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 5), grassMat);
      tuft.position.set(gx, 0.1, gz);
      tuft.rotation.y = Math.random() * Math.PI;
      group.add(tuft);
    }

    // Stepped Diagonal Wooden Side Frames
    for (const sx of [-1.02, 1.02]) {
      const sidePanel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.05, 1.45), woodDark);
      sidePanel.position.set(sx, 0.58, 0.05);
      sidePanel.castShadow = true;
      group.add(sidePanel);

      const frontLeg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), woodMedium);
      frontLeg.position.set(sx, 0.25, 0.72);
      frontLeg.castShadow = true;
      group.add(frontLeg);

      const rearLeg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.15, 0.1), woodMedium);
      rearLeg.position.set(sx, 0.58, -0.62);
      rearLeg.castShadow = true;
      group.add(rearLeg);
    }

    // 3 Stepped Inclined Tiers (Bottom, Middle, Top)
    const tiers = [
      { y: 0.36, z: 0.48, rotX: 0.22, crateW: 0.62, crateD: 0.44 },
      { y: 0.66, z: 0.1, rotX: 0.22, crateW: 0.62, crateD: 0.44 },
      { y: 0.96, z: -0.28, rotX: 0.22, crateW: 0.62, crateD: 0.44 },
    ];

    tiers.forEach((tier, tierIdx) => {
      // Support cross beam
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.46), woodDark);
      beam.position.set(0, tier.y, tier.z);
      beam.rotation.x = tier.rotX;
      beam.castShadow = true;
      group.add(beam);

      // 3 slatted wooden crates per tier (9 crates total)
      for (let c = 0; c < 3; c++) {
        const crateX = -0.66 + c * 0.66;
        const crateGroup = new THREE.Group();
        crateGroup.position.set(crateX, tier.y + 0.05, tier.z);
        crateGroup.rotation.x = tier.rotX;

        // Crate bottom
        const bottom = new THREE.Mesh(new THREE.BoxGeometry(tier.crateW, 0.03, tier.crateD), woodLight);
        crateGroup.add(bottom);

        // Slats front, back, left, right
        const frontSlat = new THREE.Mesh(new THREE.BoxGeometry(tier.crateW, 0.14, 0.02), crateMat);
        frontSlat.position.set(0, 0.07, tier.crateD / 2);
        frontSlat.castShadow = true;
        crateGroup.add(frontSlat);

        const backSlat = new THREE.Mesh(new THREE.BoxGeometry(tier.crateW, 0.14, 0.02), crateMat);
        backSlat.position.set(0, 0.07, -tier.crateD / 2);
        crateGroup.add(backSlat);

        for (const endX of [-tier.crateW / 2, tier.crateW / 2]) {
          const endSlat = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, tier.crateD), crateMat);
          endSlat.position.set(endX, 0.07, 0);
          crateGroup.add(endSlat);
        }

        // Miniature chalkboard price tag on front lip of crate
        const miniTag = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 0.015), chalkboardMat);
        miniTag.position.set(0, 0.07, tier.crateD / 2 + 0.015);
        crateGroup.add(miniTag);

        const chalkLine = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.018), priceTagMat);
        chalkLine.position.set(0, 0.07, tier.crateD / 2 + 0.016);
        crateGroup.add(chalkLine);

        group.add(crateGroup);
      }
    });

    // Top Timber Uprights and Chalkboard Signboard
    for (const px of [-0.62, 0.62]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), woodDark);
      post.position.set(px, 1.55, -0.45);
      post.castShadow = true;
      group.add(post);
    }

    const signBoardFrame = new THREE.Mesh(new RoundedBoxGeometry(1.68, 0.44, 0.08, 2, 0.03), woodMedium);
    signBoardFrame.position.set(0, 1.82, -0.42);
    signBoardFrame.castShadow = true;
    group.add(signBoardFrame);

    const chalkPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.54, 0.36), chalkboardMat);
    chalkPlane.position.set(0, 1.82, -0.375);
    group.add(chalkPlane);

    label.position.set(0, 1.82, -0.37);
    group.add(label);

    // Empty side barrel: saleable produce belongs exclusively to stock slots.
    const barrelGroup = new THREE.Group();
    barrelGroup.position.set(-1.42, 0.04, 0.32);

    const barrelBody = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.58, 14), woodDark);
    barrelBody.position.y = 0.29;
    barrelBody.castShadow = true;
    barrelGroup.add(barrelBody);

    // Dark iron barrel hoops
    for (const hy of [0.12, 0.46]) {
      const hoop = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.04, 14), darkMetalMat);
      hoop.position.y = hy;
      barrelGroup.add(hoop);
    }

    group.add(barrelGroup);

    // Empty side crate (no decorative food outside inventory).
    const rightBasket = new THREE.Group();
    rightBasket.position.set(1.38, 0.04, 0.32);
    const crateSide = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.34), woodLight);
    crateSide.position.y = 0.21;
    crateSide.castShadow = true;
    rightBasket.add(crateSide);

    group.add(rightBasket);

    // Dynamic Product Slots (for player interaction & shelf capacity)
    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      const tier = tiers[Math.min(row, 2)];
      mesh.position.set(-0.66 + col * 0.66, tier.y + 0.18, tier.z);
      mesh.rotation.x = tier.rotX;
      mesh.scale.setScalar(itemId === 'CORN' ? 1.05 : 0.9);
      mesh.castShadow = true;
      mesh.visible = false;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else if (type === 'cooler') {
    // -------------------------------------------------------------
    // 13. CAM KAPAKLI İÇECEK DOLABI (3-Door Commercial Reach-in Cooler)
    // -------------------------------------------------------------
    const cabinetDark = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5, metalness: 0.2 });
    const interiorWhite = new THREE.MeshStandardMaterial({
      color: 0xf0f8ff,
      roughness: 0.25,
      emissive: 0x81ecec,
      emissiveIntensity: 0.25,
    });
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.5 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x70a1ff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.7,
      ior: 1.45,
    });
    const marqueeBlue = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 });
    const wireShelfMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.7, roughness: 0.3 });
    const canRed = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.2, metalness: 0.4 });
    const canBlue = new THREE.MeshStandardMaterial({ color: 0x1e90ff, roughness: 0.2, metalness: 0.4 });
    const canYellow = new THREE.MeshStandardMaterial({ color: 0xffa502, roughness: 0.2, metalness: 0.4 });
    const bottleOrange = new THREE.MeshStandardMaterial({ color: 0xff7f50, roughness: 0.2 });
    const bottleGreen = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.2 });
    const bottleWater = new THREE.MeshStandardMaterial({ color: 0x70a1ff, roughness: 0.15, transparent: true, opacity: 0.85 });

    // Outer Cabinet Shell
    const cabinet = new THREE.Mesh(new RoundedBoxGeometry(2.5, 2.3, 0.94, 3, 0.08), cabinetDark);
    cabinet.position.set(0, 1.15, -0.02);
    cabinet.castShadow = true;
    group.add(cabinet);

    // Illuminated Interior Cavity
    const interior = new THREE.Mesh(new RoundedBoxGeometry(2.36, 1.76, 0.78, 2, 0.04), interiorWhite);
    interior.position.set(0, 1.12, 0.02);
    group.add(interior);

    // Bottom Compressor Ventilation Grille (Kickplate)
    const kickplate = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.22, 0.92), cabinetDark);
    kickplate.position.set(0, 0.11, 0.01);
    group.add(kickplate);

    for (let slot = 0; slot < 6; slot++) {
      const grilleSlot = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.018, 0.02), darkMetalMat);
      grilleSlot.position.set(0, 0.05 + slot * 0.028, 0.47);
      group.add(grilleSlot);
    }

    // Top Illuminated Marquee Header
    const topCanopy = new THREE.Mesh(new RoundedBoxGeometry(2.46, 0.34, 0.94, 2, 0.04), marqueeBlue);
    topCanopy.position.set(0, 2.12, 0);
    topCanopy.castShadow = true;
    group.add(topCanopy);

    // Snowflake / Beverage Brand Emblem
    const snowflakeBadge = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.02), priceTagMat);
    snowflakeBadge.position.set(0, 2.12, 0.475);
    group.add(snowflakeBadge);

    label.position.set(0, 2.12, 0.485);
    group.add(label);

    // 4 Internal Wire Shelves
    const shelfYLevels = [0.48, 0.88, 1.28, 1.68];
    for (const sy of shelfYLevels) {
      const shelfGrate = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.02, 0.68), wireShelfMat);
      shelfGrate.position.set(0, sy, 0.04);
      group.add(shelfGrate);

      // Chrome front retainer wire
      const guardRail = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 2.28, 6), chromeMat);
      guardRail.rotation.z = Math.PI / 2;
      guardRail.position.set(0, sy + 0.035, 0.37);
      group.add(guardRail);
    }

    // Chilled Beverage Stock (Dense, Colorful Display Rows)
    // Row 4 (Top): Mineral Waters
    for (let w = 0; w < 12; w++) {
      const water = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.24, 8), bottleWater);
      water.position.set(-1.0 + w * 0.18, 0.48 + 0.12, (w % 2 === 0 ? 0.18 : 0.04));
      water.castShadow = true;
      group.add(water);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8), canBlue);
      cap.position.set(-1.0 + w * 0.18, 0.48 + 0.25, (w % 2 === 0 ? 0.18 : 0.04));
      group.add(cap);
    }

    // Row 3: Orange, Mango, and Smoothie Bottles
    for (let j = 0; j < 12; j++) {
      const mat = j % 3 === 0 ? bottleOrange : (j % 3 === 1 ? canYellow : bottleGreen);
      const juice = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.25, 8), mat);
      juice.position.set(-1.0 + j * 0.18, 0.88 + 0.125, (j % 2 === 0 ? 0.18 : 0.04));
      juice.castShadow = true;
      group.add(juice);
    }

    // Row 2: Soda Bottles (Red Cola & Lime)
    for (let s = 0; s < 12; s++) {
      const mat = s % 2 === 0 ? canRed : bottleGreen;
      const soda = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.042, 0.25, 8), mat);
      soda.position.set(-1.0 + s * 0.18, 1.28 + 0.125, (s % 2 === 0 ? 0.18 : 0.04));
      soda.castShadow = true;
      group.add(soda);
    }

    // Row 1: Soda Cans & Juice Cartons
    for (let c = 0; c < 12; c++) {
      const mat = c % 3 === 0 ? canRed : (c % 3 === 1 ? canBlue : canYellow);
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.18, 10), mat);
      can.position.set(-1.0 + c * 0.18, 1.68 + 0.09, (c % 2 === 0 ? 0.18 : 0.04));
      can.castShadow = true;
      group.add(can);
    }

    // 3 Clear Glass Swing Doors with Long Chrome Pull Handles
    const doorWidth = 0.77;
    const doorCenters = [-0.78, 0, 0.78];

    doorCenters.forEach((dx) => {
      // Outer door perimeter frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, 1.68, 0.035), doorFrameMat);
      frame.position.set(dx, 1.12, 0.45);
      group.add(frame);

      // Clear Glass Panel
      const glass = new THREE.Mesh(new THREE.BoxGeometry(doorWidth - 0.07, 1.58, 0.015), glassMat);
      glass.position.set(dx, 1.12, 0.455);
      group.add(glass);

      // Long vertical brushed chrome pull handle
      const handleX = dx + (dx > 0 ? -doorWidth * 0.36 : doorWidth * 0.36);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.64, 8), chromeMat);
      handle.position.set(handleX, 1.12, 0.495);
      group.add(handle);

      // Handle standoffs
      for (const hy of [-0.28, 0.28]) {
        const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 6), chromeMat);
        standoff.rotation.x = Math.PI / 2;
        standoff.position.set(handleX, 1.12 + hy, 0.475);
        group.add(standoff);
      }
    });

    // Dynamic Product Slots
    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      mesh.position.set(-0.76 + col * 0.76, shelfYLevels[row % shelfYLevels.length] + 0.18, 0.18);
      mesh.scale.setScalar(0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else if (type === 'bakery') {
    // -------------------------------------------------------------
    // 14. FIRIN & PASTANE TEZGÂHI (Curved Glass Patisserie Counter)
    // -------------------------------------------------------------
    const woodCabinet = new THREE.MeshStandardMaterial({ color: 0x844a23, roughness: 0.75 });
    const woodTrim = new THREE.MeshStandardMaterial({ color: 0x5a2f14, roughness: 0.85 });
    const marbleTop = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.3 });
    const curvedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff9fb,
      transparent: true,
      opacity: 0.35,
      roughness: 0.06,
      metalness: 0.1,
      transmission: 0.65,
    });
    const cakeChocolate = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.4 });
    const cakeFrostingPink = new THREE.MeshStandardMaterial({ color: 0xff9ff3, roughness: 0.4 });
    const cakeFrostingWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const pastryGolden = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.6 });
    const berryRed = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.2 });
    const berryBlue = new THREE.MeshStandardMaterial({ color: 0x341f97, roughness: 0.2 });
    const breadCrust = new THREE.MeshStandardMaterial({ color: 0xba7c3a, roughness: 0.85 });
    const crateWood = new THREE.MeshStandardMaterial({ color: 0xc28d53, roughness: 0.8 });
    const plantGreen = new THREE.MeshStandardMaterial({ color: 0x26de81, roughness: 0.5 });
    const plantPot = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.5 });

    // Lower Cabinet Base (Rich Warm Wood with Recessed Groove Lines)
    const baseCabinet = new THREE.Mesh(new RoundedBoxGeometry(2.5, 0.68, 1.18, 3, 0.05), woodCabinet);
    baseCabinet.position.set(0, 0.34, 0);
    baseCabinet.castShadow = true;
    group.add(baseCabinet);

    const kickplate = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.08, 1.2), woodTrim);
    kickplate.position.set(0, 0.04, 0);
    group.add(kickplate);

    // Decorative wood horizontal slats on front
    for (let slat = 0; slat < 3; slat++) {
      const woodSlat = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.04, 0.02), woodTrim);
      woodSlat.position.set(0, 0.18 + slat * 0.16, 0.6);
      group.add(woodSlat);
    }

    // White Solid-Surface / Marble Countertop Slab
    const counterSlab = new THREE.Mesh(new RoundedBoxGeometry(2.54, 0.08, 1.22, 2, 0.03), marbleTop);
    counterSlab.position.set(0, 0.72, 0);
    counterSlab.castShadow = true;
    group.add(counterSlab);

    // Slanted / Curved Glass Showcase Display (Front and Sides)
    const showcaseH = 0.85;
    const showcaseW = 2.44;
    const showcaseD = 0.86;

    // Slanted Front Glass Panel
    const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(showcaseW, showcaseH), curvedGlassMat);
    frontGlass.position.set(0, 1.16, 0.52);
    frontGlass.rotation.x = -0.16;
    group.add(frontGlass);

    // Top Flat Glass Deck
    const topGlass = new THREE.Mesh(new THREE.BoxGeometry(showcaseW, 0.02, 0.42), curvedGlassMat);
    topGlass.position.set(0, 1.56, 0.22);
    group.add(topGlass);

    // Side Glass Panels
    for (const gx of [-showcaseW / 2, showcaseW / 2]) {
      const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.02, showcaseH, showcaseD * 0.75), curvedGlassMat);
      sideGlass.position.set(gx, 1.16, 0.28);
      group.add(sideGlass);
    }

    // Corner Chrome Pillars
    for (const px of [-showcaseW / 2, showcaseW / 2]) {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, showcaseH, 8), chromeMat);
      pillar.position.set(px, 1.16, 0.56);
      group.add(pillar);
    }

    // 3 Internal Glass Shelves with Pastries & Cakes
    const glassShelvesY = [0.82, 1.08, 1.34];

    glassShelvesY.forEach((gy, tierIdx) => {
      const shelfGlass = new THREE.Mesh(new THREE.BoxGeometry(showcaseW - 0.08, 0.02, 0.48 - tierIdx * 0.08), curvedGlassMat);
      shelfGlass.position.set(0, gy, 0.26 - tierIdx * 0.04);
      group.add(shelfGlass);

      // Gold shelf lip
      const shelfLip = new THREE.Mesh(new THREE.BoxGeometry(showcaseW - 0.08, 0.02, 0.02), chromeMat);
      shelfLip.position.set(0, gy, 0.5 - tierIdx * 0.08);
      group.add(shelfLip);

      // Tier Items:
      if (tierIdx === 2) {
        // Top Tier: Gourmet Frosted Cupcakes
        for (let c = 0; c < 8; c++) {
          const cup = new THREE.Group();
          cup.position.set(-0.85 + c * 0.24, gy + 0.02, 0.22);

          const liner = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.05, 10), woodTrim);
          liner.position.y = 0.025;
          cup.add(liner);

          const frostingMat = c % 2 === 0 ? cakeFrostingPink : cakeFrostingWhite;
          const swirl = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.065, 8), frostingMat);
          swirl.position.y = 0.07;
          cup.add(swirl);

          const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.016, 6, 6), berryRed);
          cherry.position.y = 0.11;
          cup.add(cherry);

          group.add(cup);
        }
      } else if (tierIdx === 1) {
        // Middle Tier: Cakes & Colorful Ring Donuts
        // Chocolate Layer Cake (Left)
        const chocCake = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), cakeChocolate);
        chocCake.position.set(-0.72, gy + 0.06, 0.24);
        chocCake.castShadow = true;
        group.add(chocCake);

        const chocBerry = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), berryRed);
        chocBerry.position.set(-0.72, gy + 0.14, 0.24);
        group.add(chocBerry);

        // White Strawberry Celebration Cake (Center)
        const whiteCake = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.13, 16), cakeFrostingWhite);
        whiteCake.position.set(0, gy + 0.065, 0.24);
        whiteCake.castShadow = true;
        group.add(whiteCake);

        for (let sb = 0; sb < 5; sb++) {
          const berry = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), berryRed);
          berry.position.set(
            Math.cos((sb * Math.PI * 2) / 5) * 0.12,
            gy + 0.14,
            0.24 + Math.sin((sb * Math.PI * 2) / 5) * 0.12
          );
          group.add(berry);
        }

        // Donuts (Right)
        for (let d = 0; d < 4; d++) {
          const donut = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.028, 8, 16), d % 2 === 0 ? cakeFrostingPink : pastryGolden);
          donut.rotation.x = Math.PI / 2;
          donut.position.set(0.55 + (d % 2) * 0.18, gy + 0.03, 0.18 + Math.floor(d / 2) * 0.15);
          donut.castShadow = true;
          group.add(donut);
        }
      } else {
        // Bottom Tier: Croissants, Danishes, and Fruit Tarts
        // Croissants (Left)
        for (let cr = 0; cr < 5; cr++) {
          const croissant = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.03, 8, 14, Math.PI * 1.3), pastryGolden);
          croissant.rotation.x = Math.PI / 2;
          croissant.rotation.z = 0.4 + cr * 0.15;
          croissant.position.set(-0.95 + cr * 0.18, gy + 0.035, 0.28);
          croissant.castShadow = true;
          group.add(croissant);
        }

        // Fruit Tarts with Berries (Right)
        for (let tr = 0; tr < 4; tr++) {
          const tart = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.035, 12), pastryGolden);
          tart.position.set(0.35 + (tr % 2) * 0.22, gy + 0.02, 0.22 + Math.floor(tr / 2) * 0.16);
          group.add(tart);

          const tartBerry = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), tr % 2 === 0 ? berryRed : berryBlue);
          tartBerry.position.set(0.35 + (tr % 2) * 0.22, gy + 0.045, 0.22 + Math.floor(tr / 2) * 0.16);
          group.add(tartBerry);
        }
      }
    });

    // Top Countertop Accessories:
    // Left Bread Crate with Baguettes
    const breadCrate1 = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.22, 0.36), crateWood);
    breadCrate1.position.set(-0.78, 0.88, -0.28);
    breadCrate1.castShadow = true;
    group.add(breadCrate1);

    for (let bg = 0; bg < 4; bg++) {
      const baguette = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.52, 8), breadCrust);
      baguette.rotation.x = 0.35;
      baguette.rotation.z = (bg - 1.5) * 0.18;
      baguette.position.set(-0.9 + bg * 0.08, 1.08, -0.26);
      baguette.castShadow = true;
      group.add(baguette);
    }

    // Right Bread Crate with Sourdough Boules
    const breadCrate2 = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.22, 0.36), crateWood);
    breadCrate2.position.set(-0.16, 0.88, -0.28);
    breadCrate2.castShadow = true;
    group.add(breadCrate2);

    for (let bl = 0; bl < 3; bl++) {
      const boule = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), breadCrust);
      boule.scale.set(1.1, 0.75, 1.1);
      boule.position.set(-0.24 + bl * 0.09, 0.98, -0.28);
      boule.castShadow = true;
      group.add(boule);
    }

    // Counter Chalkboard Sign on Easel
    const easelSign = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.26, 0.025, 2, 0.01), woodCabinet);
    easelSign.position.set(0.55, 0.94, -0.28);
    easelSign.rotation.y = -0.15;
    group.add(easelSign);

    const easelBoard = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.22), chalkboardMat);
    easelBoard.position.set(0.55, 0.94, -0.265);
    easelBoard.rotation.y = -0.15;
    group.add(easelBoard);

    // Potted Green Plant
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.05, 0.14, 10), plantPot);
    pot.position.set(0.95, 0.84, -0.28);
    group.add(pot);

    const plantFoliage = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), plantGreen);
    plantFoliage.position.set(0.95, 0.95, -0.28);
    group.add(plantFoliage);

    // Label on front upper counter trim
    label.position.set(0, 0.72, 0.63);
    group.add(label);

    // Dynamic Product Slots
    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const col = index % 3;
      const row = Math.floor(index / 3);
      mesh.position.set(-0.6 + col * 0.6, glassShelvesY[row % glassShelvesY.length] + 0.12, 0.26);
      mesh.scale.setScalar(0.9);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }

  } else {
    // -------------------------------------------------------------
    // 12. GONDOL REYON RAFLARI (Supermarket Gondola Shelving)
    // -------------------------------------------------------------
    const steelDark = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.5, metalness: 0.4 });
    const steelWhite = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.35, metalness: 0.1 });
    const woodEndcapMat = new THREE.MeshStandardMaterial({ color: 0xb57c48, roughness: 0.75 });
    const redPriceRailMat = new THREE.MeshStandardMaterial({ color: 0xe84118, roughness: 0.35 });
    const boxYellow = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5 });
    const boxRed = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5 });
    const boxBlue = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.5 });
    const boxTeal = new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.5 });
    const canSilver = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, metalness: 0.7, roughness: 0.3 });
    const chipBagOrange = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.4 });
    const chipBagGreen = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.4 });

    // Heavy-duty Dark Base Foundation
    const base = new THREE.Mesh(new RoundedBoxGeometry(2.0, 0.16, 0.88, 3, 0.04), steelDark);
    base.position.set(0, 0.08, 0);
    base.castShadow = true;
    group.add(base);

    // Warm Oak Wood Endcap Panels with Rounded Corners
    for (const ex of [-1.02, 1.02]) {
      const endcap = new THREE.Mesh(new RoundedBoxGeometry(0.08, 1.95, 0.92, 3, 0.04), woodEndcapMat);
      endcap.position.set(ex, 1.05, 0);
      endcap.castShadow = true;
      group.add(endcap);

      // Dark steel upright edge border
      const border = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.96, 0.04), steelDark);
      border.position.set(ex, 1.05, 0.45);
      group.add(border);
    }

    // Rear Central Steel Backboard
    const backboard = new THREE.Mesh(new THREE.BoxGeometry(1.94, 1.88, 0.04), steelDark);
    backboard.position.set(0, 1.06, -0.16);
    group.add(backboard);

    // 4 Multi-Tier Shelves with Bright Red Price-Tag Rails
    const gondolaLevels = [0.36, 0.74, 1.14, 1.54];
    const shelfRows = [];

    gondolaLevels.forEach((gy, lIdx) => {
      // White/Steel Shelf Deck
      const shelfDeck = new THREE.Mesh(new RoundedBoxGeometry(1.92, 0.05, 0.62, 2, 0.02), steelWhite);
      shelfDeck.position.set(0, gy, 0.16);
      shelfDeck.castShadow = true;
      shelfDeck.receiveShadow = true;
      group.add(shelfDeck);

      // Signature Red Price Channel Rail running full width
      const priceRail = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.045, 0.03), redPriceRailMat);
      priceRail.position.set(0, gy + 0.02, 0.48);
      group.add(priceRail);

      // Mini white price tags inserted in the red rail
      for (let pt = 0; pt < 7; pt++) {
        const tag = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.035), priceTagMat);
        tag.position.set(-0.75 + pt * 0.25, gy + 0.02, 0.485);
        group.add(tag);
      }

      shelfRows.push(gy + 0.15);

      // Populate shelf with rich grocery items:
      if (lIdx === 3) {
        // Shelf 4 (Top): Bottles & Tall Pasta Boxes
        for (let b = 0; b < 9; b++) {
          const isBottle = b % 2 === 0;
          if (isBottle) {
            const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.24, 8), canSilver);
            bottle.position.set(-0.75 + b * 0.19, gy + 0.14, 0.15);
            bottle.castShadow = true;
            group.add(bottle);
          } else {
            const box = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.1), boxYellow);
            box.position.set(-0.75 + b * 0.19, gy + 0.15, 0.15);
            box.castShadow = true;
            group.add(box);
          }
        }
      } else if (lIdx === 2) {
        // Shelf 3: Colorful Cereal & Snack Boxes
        for (let bx = 0; bx < 10; bx++) {
          const colors = [boxRed, boxYellow, boxBlue, boxTeal];
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, 0.11), colors[bx % colors.length]);
          box.position.set(-0.78 + bx * 0.17, gy + 0.14, 0.16);
          box.castShadow = true;
          group.add(box);
        }
      } else if (lIdx === 1) {
        // Shelf 2: Glass Jars with Colorful Caps
        for (let j = 0; j < 11; j++) {
          const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.16, 10), boxTeal);
          jar.position.set(-0.8 + j * 0.16, gy + 0.1, 0.16);
          jar.castShadow = true;
          group.add(jar);

          const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 10), boxRed);
          lid.position.set(-0.8 + j * 0.16, gy + 0.19, 0.16);
          group.add(lid);
        }
      } else {
        // Shelf 1 (Bottom): Metal Cans in Rows
        for (let cn = 0; cn < 11; cn++) {
          const can = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.15, 10), canSilver);
          can.position.set(-0.8 + cn * 0.16, gy + 0.095, 0.16);
          can.castShadow = true;
          group.add(can);
        }
      }
    });

    // Side Hanging Wire Snack-Bag Display Rack (Mounted on right wood endcap)
    const wireRackGroup = new THREE.Group();
    wireRackGroup.position.set(1.08, 0.5, 0);

    const wireSpine = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.25, 6), steelDark);
    wireSpine.position.set(0, 0.65, 0);
    wireRackGroup.add(wireSpine);

    for (let tier = 0; tier < 3; tier++) {
      const wireArm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.28, 6), steelDark);
      wireArm.rotation.x = Math.PI / 2;
      wireArm.position.set(0, 0.35 + tier * 0.32, 0.08);
      wireRackGroup.add(wireArm);

      // Hanging Snack Pouches / Chip Bags with crimped edges
      for (const [bx, bagMat] of [[-0.08, chipBagOrange], [0.08, chipBagGreen]]) {
        const bag = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.18, 0.05, 2, 0.01), bagMat);
        bag.position.set(bx, 0.28 + tier * 0.32, 0.16);
        bag.rotation.z = (bx > 0 ? 0.08 : -0.08);
        bag.castShadow = true;
        wireRackGroup.add(bag);
      }
    }
    group.add(wireRackGroup);

    // Top Category Header Canopy
    const canopy = new THREE.Mesh(new RoundedBoxGeometry(1.96, 0.38, 0.22, 2, 0.04), steelDark);
    canopy.position.set(0, 2.05, 0.04);
    canopy.castShadow = true;
    group.add(canopy);

    const goldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.42, 0.04), redPriceRailMat);
    goldBorder.position.set(0, 2.05, 0.155);
    group.add(goldBorder);

    label.position.set(0, 2.05, 0.18);
    group.add(label);

    // Dynamic Product Meshes
    for (let index = 0; index < shelfDef.capacity; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry(itemId), itemFactory.getItemMaterial(itemId));
      const row = Math.floor(index / 3);
      const column = index % 3;
      mesh.position.set(-0.55 + column * 0.55, shelfRows[row % shelfRows.length], 0.22);
      mesh.scale.setScalar(0.95);
      mesh.castShadow = true;
      group.add(mesh);
      productMeshes.push(mesh);
    }
  }

  const wobbler = addShelfWobbler(group, type === 'produce');
  return { group, productMeshes, labelCanvas, labelTexture, wobbler };
}

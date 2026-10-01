import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function buildDecorationModel(group, type) {
  if (type === 'trashBin') {
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.72, metalness: 0.18 });
    const lidMaterial = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.42, metalness: 0.28 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x17212b, roughness: 0.9 });
    const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.24, 0.68, 18), bodyMaterial);
    bin.position.y = 0.38;
    bin.castShadow = true;
    bin.receiveShadow = true;
    group.add(bin);

    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.33, 0.08, 18), lidMaterial);
    lid.position.y = 0.76;
    lid.castShadow = true;
    group.add(lid);
    const opening = new THREE.Mesh(new THREE.CircleGeometry(0.15, 18), darkMaterial);
    opening.rotation.x = -Math.PI / 2;
    opening.position.y = 0.805;
    group.add(opening);

    const pedal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.12), lidMaterial);
    pedal.position.set(0, 0.08, 0.31);
    group.add(pedal);

    const badgeCanvas = document.createElement('canvas');
    badgeCanvas.width = 128;
    badgeCanvas.height = 128;
    const badgeContext = badgeCanvas.getContext('2d');
    badgeContext.fillStyle = '#d1fae5';
    badgeContext.beginPath();
    badgeContext.arc(64, 64, 60, 0, Math.PI * 2);
    badgeContext.fill();
    badgeContext.fillStyle = '#15803d';
    badgeContext.font = 'bold 78px sans-serif';
    badgeContext.textAlign = 'center';
    badgeContext.textBaseline = 'middle';
    badgeContext.lineWidth = 8;
    badgeContext.lineCap = 'round';
    badgeContext.lineJoin = 'round';
    badgeContext.strokeStyle = '#15803d';
    for (let index = 0; index < 3; index += 1) {
      badgeContext.save();
      badgeContext.translate(64, 64);
      badgeContext.rotate(index * Math.PI * 2 / 3);
      badgeContext.beginPath();
      badgeContext.moveTo(-16, -22);
      badgeContext.lineTo(10, -22);
      badgeContext.lineTo(10, -8);
      badgeContext.stroke();
      badgeContext.beginPath();
      badgeContext.moveTo(10, -8);
      badgeContext.lineTo(0, -14);
      badgeContext.moveTo(10, -8);
      badgeContext.lineTo(15, -20);
      badgeContext.stroke();
      badgeContext.restore();
    }
    const badgeTexture = new THREE.CanvasTexture(badgeCanvas);
    badgeTexture.colorSpace = THREE.SRGBColorSpace;
    const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshBasicMaterial({ map: badgeTexture }));
    badge.position.set(0, 0.48, 0.299);
    group.add(badge);
  } else if (type === 'welcomeMat') {
    const aluminumFrame = new THREE.Mesh(
      new RoundedBoxGeometry(1.65, 0.04, 1.05, 3, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.8, roughness: 0.25 })
    );
    aluminumFrame.position.y = 0.02;
    group.add(aluminumFrame);

    const rubberMat = new THREE.Mesh(
      new RoundedBoxGeometry(1.52, 0.045, 0.92, 2, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.9 })
    );
    rubberMat.position.y = 0.025;
    group.add(rubberMat);

    const matCanvas = document.createElement('canvas');
    matCanvas.width = 512;
    matCanvas.height = 256;
    const ctx = matCanvas.getContext('2d');
    ctx.fillStyle = '#c0392b';
    ctx.beginPath();
    ctx.roundRect(16, 16, 480, 224, 28);
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#f1c40f';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GBLB SUPERMARKET', 256, 95);
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 28px Fredoka, sans-serif';
    ctx.fillText('HOŞ GELDİNİZ • WELCOME', 256, 160);

    const matTexture = new THREE.CanvasTexture(matCanvas);
    matTexture.colorSpace = THREE.SRGBColorSpace;
    const matPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.6),
      new THREE.MeshBasicMaterial({ map: matTexture, toneMapped: false })
    );
    matPlate.rotation.x = -Math.PI / 2;
    matPlate.position.set(0, 0.05, 0);
    group.add(matPlate);

  } else if (type === 'farmhouseSign') {
    const blackMetal = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.4 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, metalness: 0.85, roughness: 0.2 });

    for (const [side, angle] of [[-1, 0.22], [1, -0.22]]) {
      const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.25, 0.05), blackMetal);
      boardFrame.position.set(0, 0.72, side * 0.22);
      boardFrame.rotation.x = angle;
      boardFrame.castShadow = true;
      group.add(boardFrame);

      const posterCanvas = document.createElement('canvas');
      posterCanvas.width = 256;
      posterCanvas.height = 384;
      const pCtx = posterCanvas.getContext('2d');
      pCtx.fillStyle = '#ff4757';
      pCtx.fillRect(0, 0, 256, 384);
      pCtx.fillStyle = '#f1c40f';
      pCtx.fillRect(12, 12, 232, 70);
      pCtx.fillStyle = '#ffffff';
      pCtx.font = 'bold 36px Fredoka, sans-serif';
      pCtx.textAlign = 'center';
      pCtx.fillText('FIRSAT!', 128, 62);
      pCtx.fillStyle = '#ffffff';
      pCtx.font = 'bold 54px Fredoka, sans-serif';
      pCtx.fillText('%50', 128, 175);
      pCtx.font = 'bold 30px Fredoka, sans-serif';
      pCtx.fillText('İNDİRİM', 128, 225);
      pCtx.fillStyle = '#2f3542';
      pCtx.fillRect(20, 260, 216, 90);
      pCtx.fillStyle = '#2ed573';
      pCtx.font = 'bold 24px sans-serif';
      pCtx.fillText('SÜPER FİYAT', 128, 315);

      const posterTexture = new THREE.CanvasTexture(posterCanvas);
      posterTexture.colorSpace = THREE.SRGBColorSpace;
      const poster = new THREE.Mesh(
        new THREE.PlaneGeometry(0.72, 1.08),
        new THREE.MeshBasicMaterial({ map: posterTexture, toneMapped: false })
      );
      poster.position.set(0, 0.72, side * 0.25);
      poster.rotation.x = angle;
      if (side === 1) poster.rotation.y = Math.PI;
      group.add(poster);
    }

    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8), chromeMat);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 1.34, 0);
    group.add(hinge);

    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 12), chromeMat);
    handle.position.set(0, 1.42, 0);
    group.add(handle);

  } else if (type === 'petalPlanter') {
    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, roughness: 0.15 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffc048, metalness: 0.8, roughness: 0.2 });
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.9 });
    const palmLeafMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5, side: THREE.DoubleSide });

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.65, 16), ceramicMat);
    pot.position.y = 0.45;
    pot.castShadow = true;
    group.add(pot);

    const goldRing = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.025, 6, 24), goldMat);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = 0.75;
    group.add(goldRing);

    for (let i = 0; i < 3; i++) {
      const angle = i * Math.PI * 2 / 3;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.45, 8), goldMat);
      leg.position.set(Math.cos(angle) * 0.34, 0.2, Math.sin(angle) * 0.34);
      leg.castShadow = true;
      group.add(leg);
    }

    const soil = new THREE.Mesh(new THREE.CircleGeometry(0.38, 14), soilMat);
    soil.rotation.x = -Math.PI / 2;
    soil.position.y = 0.74;
    group.add(soil);

    for (let i = 0; i < 9; i++) {
      const angle = i * 2.399;
      const y = 0.82 + (i % 3) * 0.18;
      const length = 0.42 + (i % 3) * 0.12;
      const palm = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 7), palmLeafMat);
      palm.scale.set(0.18, length, 0.025);
      palm.position.set(Math.cos(angle) * 0.22, y, Math.sin(angle) * 0.22);
      palm.rotation.z = Math.cos(angle) * 0.65;
      palm.rotation.x = Math.sin(angle) * 0.65;
      palm.castShadow = true;
      group.add(palm);
    }

    for (const [ox, oy, oz] of [[-0.12, 1.15, 0.14], [0.15, 1.25, -0.1], [0.05, 1.35, 0.12]]) {
      const blossom = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshStandardMaterial({ color: 0xff7675 }));
      blossom.position.set(ox, oy, oz);
      group.add(blossom);
    }

  } else if (type === 'orchardLantern') {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.3, metalness: 0.6 });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xfff7d6,
      emissive: 0xffda79,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xeccc68, metalness: 0.75, roughness: 0.3 });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.32, 0.18, 12), poleMat);
    base.position.y = 0.09;
    group.add(base);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 1.8, 12), poleMat);
    pole.position.y = 1.08;
    pole.castShadow = true;
    group.add(pole);

    const lanternHead = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.38, 8), glowMat);
    lanternHead.position.y = 2.05;
    group.add(lanternHead);

    const lanternRoof = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.18, 8), brassMat);
    lanternRoof.position.y = 2.31;
    group.add(lanternRoof);

    const pointLight = new THREE.PointLight(0xffda79, 1.2, 5);
    pointLight.position.y = 2.05;
    group.add(pointLight);
  }
}

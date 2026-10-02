import * as THREE from 'three';

const GRASS_TEXTURE_SIZE = 512;
let grassCanvas;
let sidewalkCanvas;
let parquetCanvas;
const sidewalkTextures = new Map();
const parquetTextures = new Map();

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x1_0000_0000;
  };
}

function drawWrapped(ctx, size, x, y, margin, draw) {
  const xOffsets = [0];
  const yOffsets = [0];
  if (x < margin) xOffsets.push(size);
  if (x > size - margin) xOffsets.push(-size);
  if (y < margin) yOffsets.push(size);
  if (y > size - margin) yOffsets.push(-size);

  for (const xOffset of xOffsets) {
    for (const yOffset of yOffsets) draw(x + xOffset, y + yOffset);
  }
}

function getGrassCanvas() {
  if (grassCanvas) return grassCanvas;
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = GRASS_TEXTURE_SIZE;
  canvas.height = GRASS_TEXTURE_SIZE;
  const ctx = canvas.getContext('2d', { alpha: false });
  const random = seededRandom(0x51a55);
  ctx.fillStyle = '#e7e7df';
  ctx.fillRect(0, 0, GRASS_TEXTURE_SIZE, GRASS_TEXTURE_SIZE);

  // Soft mottling gives the grass depth without forming a visible repeating pattern.
  for (let index = 0; index < 260; index += 1) {
    const x = random() * GRASS_TEXTURE_SIZE;
    const y = random() * GRASS_TEXTURE_SIZE;
    const radius = 7 + random() * 27;
    const rotation = random() * Math.PI;
    ctx.fillStyle = random() > 0.52 ? 'rgba(92, 105, 81, 0.07)' : 'rgba(255, 255, 255, 0.13)';
    drawWrapped(ctx, GRASS_TEXTURE_SIZE, x, y, radius * 2, (cx, cy) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.58, rotation, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Short, low-contrast strokes read as grass blades at the game's camera distance.
  ctx.lineCap = 'round';
  for (let index = 0; index < 1_050; index += 1) {
    const x = random() * GRASS_TEXTURE_SIZE;
    const y = random() * GRASS_TEXTURE_SIZE;
    const angle = random() * Math.PI * 2;
    const length = 4 + random() * 8;
    const color = random() > 0.5 ? 'rgba(79, 95, 69, 0.19)' : 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8 + random() * 0.8;
    drawWrapped(ctx, GRASS_TEXTURE_SIZE, x, y, 12, (cx, cy) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(
        cx + Math.cos(angle) * length * 0.55 - Math.sin(angle) * 2,
        cy + Math.sin(angle) * length * 0.55 + Math.cos(angle) * 2,
        cx + Math.cos(angle) * length,
        cy + Math.sin(angle) * length,
      );
      ctx.stroke();
    });
  }

  grassCanvas = canvas;
  return grassCanvas;
}

export function createGrassMaterial(color, repeatX = 1, repeatY = 1) {
  const canvas = getGrassCanvas();
  if (!canvas) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.97,
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);

  return new THREE.MeshStandardMaterial({
    map: texture,
    color,
    roughness: 0.97,
  });
}

function getSidewalkCanvas() {
  if (sidewalkCanvas) return sidewalkCanvas;
  if (typeof document === 'undefined') return null;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { alpha: false });
  const random = seededRandom(0x51de7a1);
  const rowHeight = 64;
  const paverWidth = 128;

  ctx.fillStyle = '#77756f';
  ctx.fillRect(0, 0, size, size);

  // A running-bond paver pattern reads as a footpath without competing with the scene.
  for (let row = 0; row < size / rowHeight; row += 1) {
    const offset = row % 2 === 0 ? 0 : paverWidth / 2;
    for (let column = -1; column <= size / paverWidth; column += 1) {
      const x = column * paverWidth + offset;
      const y = row * rowHeight;
      const shade = Math.floor(random() * 13) - 6;
      const base = [157 + shade, 153 + shade, 144 + shade];
      const color = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;

      ctx.fillStyle = color;
      ctx.fillRect(x + 3, y + 3, paverWidth - 6, rowHeight - 6);

      const wash = ctx.createLinearGradient(x + 4, y + 4, x + paverWidth - 4, y + rowHeight - 4);
      wash.addColorStop(0, 'rgba(255, 255, 255, 0.075)');
      wash.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
      wash.addColorStop(1, 'rgba(52, 50, 46, 0.055)');
      ctx.fillStyle = wash;
      ctx.fillRect(x + 4, y + 4, paverWidth - 8, rowHeight - 8);

      for (let fleck = 0; fleck < 5; fleck += 1) {
        const speckX = x + 8 + random() * (paverWidth - 16);
        const speckY = y + 8 + random() * (rowHeight - 16);
        ctx.fillStyle = random() > 0.5 ? 'rgba(55, 53, 49, 0.09)' : 'rgba(238, 234, 222, 0.12)';
        ctx.fillRect(speckX, speckY, 1 + random() * 2, 1 + random() * 2);
      }
    }
  }

  sidewalkCanvas = canvas;
  return sidewalkCanvas;
}

export function createSidewalkMaterial(repeatX = 1, repeatY = 1) {
  const canvas = getSidewalkCanvas();
  if (!canvas) {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.94,
      metalness: 0,
    });
  }

  const textureKey = `${repeatX.toFixed(2)}:${repeatY.toFixed(2)}`;
  let texture = sidewalkTextures.get(textureKey);
  if (!texture) {
    texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    sidewalkTextures.set(textureKey, texture);
  }

  return new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xffffff,
    roughness: 0.94,
    metalness: 0,
  });
}

function getParquetCanvas() {
  if (parquetCanvas) return parquetCanvas;
  if (typeof document === 'undefined') return null;

  const width = 1024;
  const height = 512;
  const plankWidth = 256;
  const rowHeight = 64;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#4f3829';
  ctx.fillRect(0, 0, width, height);

  // Long boards in alternating courses create a warm, understated parquet floor.
  for (let row = 0; row < height / rowHeight; row += 1) {
    const offset = row % 2 === 0 ? 0 : plankWidth / 2;
    for (let column = -1; column <= width / plankWidth; column += 1) {
      const x = column * plankWidth + offset;
      const y = row * rowHeight;
      const stableColumn = ((column % (width / plankWidth)) + (width / plankWidth)) % (width / plankWidth);
      const random = seededRandom((((row + 1) * 73856093) ^ ((stableColumn + 1) * 19349663)) >>> 0);
      const shade = Math.floor(random() * 13) - 6;
      const red = 139 + shade;
      const green = 97 + shade;
      const blue = 68 + shade;

      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillRect(x + 3, y + 3, plankWidth - 6, rowHeight - 6);

      const wash = ctx.createLinearGradient(x + 4, y + 4, x + plankWidth - 4, y + rowHeight - 4);
      wash.addColorStop(0, 'rgba(255, 220, 186, 0.075)');
      wash.addColorStop(0.48, 'rgba(255, 220, 186, 0)');
      wash.addColorStop(1, 'rgba(37, 22, 13, 0.09)');
      ctx.fillStyle = wash;
      ctx.fillRect(x + 4, y + 4, plankWidth - 8, rowHeight - 8);

      ctx.save();
      ctx.beginPath();
      ctx.rect(x + 4, y + 4, plankWidth - 8, rowHeight - 8);
      ctx.clip();
      for (let grain = 0; grain < 5; grain += 1) {
        const lineY = y + 9 + random() * (rowHeight - 18);
        const bend = (random() - 0.5) * 5;
        ctx.strokeStyle = random() > 0.55
          ? 'rgba(55, 33, 20, 0.105)'
          : 'rgba(255, 218, 183, 0.11)';
        ctx.lineWidth = 0.7 + random() * 0.8;
        ctx.beginPath();
        ctx.moveTo(x + 5, lineY);
        ctx.quadraticCurveTo(x + plankWidth * 0.52, lineY + bend, x + plankWidth - 5, lineY - bend * 0.35);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  parquetCanvas = canvas;
  return parquetCanvas;
}

export function createParquetMaterial(repeatX = 1, repeatY = 1) {
  const canvas = getParquetCanvas();
  if (!canvas) {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.88,
      metalness: 0,
    });
  }

  const textureKey = `${repeatX.toFixed(2)}:${repeatY.toFixed(2)}`;
  let texture = parquetTextures.get(textureKey);
  if (!texture) {
    texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = 4;
    parquetTextures.set(textureKey, texture);
  }

  return new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xffffff,
    roughness: 0.88,
    metalness: 0,
  });
}

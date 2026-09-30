const ATLAS_URL = '/assets/ui-icon-atlas.png';
const ATLAS_WIDTH = 1448;
const ATLAS_HEIGHT = 1086;

// Each crop points to an illustration in the user's supplied asset board.
// The outer pale tile is kept so the illustrations stay crisp and consistent
// when reduced to HUD size.
export const ASSET_ICON_CROPS = Object.freeze({
  goal: { x: 22, y: 58, width: 108, height: 96 },
  money: { x: 139, y: 58, width: 108, height: 96 },
  capacity: { x: 257, y: 58, width: 108, height: 96 },
  orders: { x: 375, y: 58, width: 108, height: 96 },
  upgrade: { x: 495, y: 58, width: 108, height: 96 },
  decoration: { x: 610, y: 58, width: 108, height: 96 },
  settings: { x: 724, y: 58, width: 108, height: 96 },
  business: { x: 22, y: 201, width: 108, height: 96 },
  customers: { x: 139, y: 201, width: 108, height: 96 },
  staff: { x: 257, y: 201, width: 108, height: 96 },
  stock: { x: 375, y: 201, width: 108, height: 96 },
  satisfied: { x: 495, y: 201, width: 108, height: 96 },
  unhappy: { x: 610, y: 201, width: 108, height: 96 },
  decorScore: { x: 724, y: 201, width: 108, height: 96 },
  interact: { x: 22, y: 346, width: 108, height: 96 },
  warning: { x: 139, y: 346, width: 108, height: 96 },
  tip: { x: 257, y: 346, width: 108, height: 96 },
  clock: { x: 375, y: 346, width: 108, height: 96 },

  tomato: { x: 861, y: 58, width: 106, height: 96 },
  tomatoPaste: { x: 977, y: 58, width: 106, height: 96 },
  orange: { x: 1093, y: 58, width: 106, height: 96 },
  orangeJuice: { x: 1209, y: 58, width: 106, height: 96 },
  corn: { x: 1325, y: 58, width: 106, height: 96 },
  popcorn: { x: 861, y: 201, width: 106, height: 96 },
  chickenFeed: { x: 977, y: 201, width: 106, height: 96 },
  wheat: { x: 1093, y: 201, width: 106, height: 96 },
  flour: { x: 1209, y: 201, width: 106, height: 96 },
  egg: { x: 1325, y: 201, width: 106, height: 96 },
  bread: { x: 861, y: 346, width: 106, height: 96 },
  orangeTart: { x: 977, y: 346, width: 106, height: 96 },
  burger: { x: 1093, y: 346, width: 106, height: 96 },
  pizza: { x: 1209, y: 346, width: 106, height: 96 },

  cashier: { x: 20, y: 538, width: 118, height: 120 },
  chef: { x: 140, y: 538, width: 118, height: 120 },
  farm: { x: 260, y: 538, width: 158, height: 120 },
  coop: { x: 420, y: 538, width: 136, height: 120 },
  table: { x: 558, y: 538, width: 158, height: 120 },
  trashBin: { x: 20, y: 691, width: 118, height: 135 },
  shelf: { x: 140, y: 691, width: 118, height: 135 },
  register: { x: 260, y: 691, width: 158, height: 135 },
  machine: { x: 420, y: 691, width: 136, height: 135 },
  pallet: { x: 558, y: 691, width: 158, height: 135 },

  organicSign: { x: 735, y: 538, width: 135, height: 120 },
  recyclingBin: { x: 877, y: 538, width: 118, height: 120 },
  shoppingCart: { x: 1002, y: 538, width: 126, height: 120 },
  planter: { x: 1132, y: 538, width: 152, height: 120 },
  farmSign: { x: 1290, y: 538, width: 146, height: 120 },
  lamp: { x: 735, y: 691, width: 72, height: 135 },
  welcomeMat: { x: 805, y: 691, width: 120, height: 135 },
  pennant: { x: 927, y: 691, width: 99, height: 135 },
  flowers: { x: 1028, y: 691, width: 126, height: 135 },
  securityBarrier: { x: 1156, y: 691, width: 122, height: 135 },
  warningSign: { x: 1278, y: 691, width: 82, height: 135 },
  extinguisher: { x: 1361, y: 691, width: 76, height: 135 },

  playerAvatar: { x: 955, y: 914, width: 108, height: 120 },
  customerAvatar: { x: 1065, y: 914, width: 102, height: 120 },
  workerAvatar: { x: 1167, y: 914, width: 100, height: 120 },
  courierAvatar: { x: 1269, y: 914, width: 102, height: 120 },
  chefAvatar: { x: 1370, y: 914, width: 70, height: 120 },
});

let atlasImage = null;
let atlasPromise = null;

export function preloadAssetAtlas() {
  if (atlasImage) return Promise.resolve(atlasImage);
  if (atlasPromise) return atlasPromise;

  atlasPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      atlasImage = image;
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = ATLAS_URL;
  });
  return atlasPromise;
}

function iconStyle(id, size) {
  const crop = ASSET_ICON_CROPS[id] ?? ASSET_ICON_CROPS.decorScore;
  const scale = size / Math.max(crop.width, crop.height);
  return {
    width: `${crop.width * scale}px`,
    height: `${crop.height * scale}px`,
    backgroundSize: `${ATLAS_WIDTH * scale}px ${ATLAS_HEIGHT * scale}px`,
    backgroundPosition: `${-crop.x * scale}px ${-crop.y * scale}px`,
  };
}

function styleAttribute(style) {
  return Object.entries(style).map(([key, value]) => {
    const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    return `${cssKey}:${value}`;
  }).join(';');
}

export function assetIconMarkup(id, size = 32, className = '') {
  const style = styleAttribute(iconStyle(id, size));
  return `<span class="illustrated-icon${className ? ` ${className}` : ''}" aria-hidden="true" style="${style}"></span>`;
}

export function hydrateAssetIcons(root = document) {
  root.querySelectorAll('[data-asset-icon]').forEach((element) => {
    const id = element.dataset.assetIcon;
    const size = Number(element.dataset.assetSize) || 32;
    element.classList.add('illustrated-icon');
    element.setAttribute('aria-hidden', 'true');
    Object.assign(element.style, iconStyle(id, size));
  });
}

export function drawAssetIcon(context, id, x, y, width, height = width) {
  const crop = ASSET_ICON_CROPS[id];
  if (!crop || !atlasImage) return false;
  context.drawImage(atlasImage, crop.x, crop.y, crop.width, crop.height, x, y, width, height);
  return true;
}

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Safe canvas helper for headless Node.js unit test environments
export function createSafeCanvas(width, height) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// 6 Diverse Realistic Skin Tones
export const CUSTOMER_SKINS = [
  0xffdfc4, // 0: Fair porcelain
  0xfad7bd, // 1: Warm peach
  0xf1c19b, // 2: Tanned honey
  0xd49a73, // 3: Golden bronze
  0x8d5524, // 4: Rich warm brown
  0x54321d, // 5: Deep espresso
];

// 8 Natural & Expressive Hair Colors
export const CUSTOMER_HAIR = [
  0x1e272e, // 0: Jet black
  0x4a2c11, // 1: Deep chocolate brown
  0x6d4c41, // 2: Chestnut brown
  0x8d4004, // 3: Auburn copper
  0xf1c40f, // 4: Golden honey blonde
  0xdfe6e9, // 5: Silver slate grey
  0xb2bec3, // 6: Tweed grey
  0xa55eea, // 7: Pastel lilac violet
];

// 10 Vibrant Clothing Colors
export const CUSTOMER_SHIRTS = [
  0xff4757, // Crimson coral
  0xffa502, // Bright marigold orange
  0x2ed573, // Fresh emerald green
  0x1e90ff, // Royal dodger blue
  0xa55eea, // Vibrant amethyst purple
  0xff6b81, // Flamingo rose
  0x00d2d3, // Caribbean cyan
  0xffc048, // Warm sunshine yellow
  0x2f3542, // Sleek midnight slate
  0x70a1ff, // Soft denim azure
];

// 6 Trouser Colors
export const CUSTOMER_PANTS = [
  0x465b78, // Classic blue denim
  0x2f3542, // Charcoal navy
  0x57606f, // Heather grey slacks
  0x55624b, // Forest olive chino
  0x795548, // Warm earth brown
  0x1e272e, // Deep obsidian black
];

// 14 Distinct Staff Professions matching the reference image with uniforms, hats, and gear
export const STAFF_PROFESSIONS = Object.freeze({
  cashier: {
    id: 'cashier',
    title: { tr: 'Kasiyer (Kadın)', en: 'Cashier' },
    uniformColor: 0xe74c3c, // Supermarket red
    trimColor: 0x27ae60,    // Fresh green apron
    hat: 'visor',
    tool: 'scanner',
  },
  stockClerk: {
    id: 'stockClerk',
    title: { tr: 'Reyon Görevlisi', en: 'Stock Clerk' },
    uniformColor: 0x1e90ff, // Retail royal blue
    trimColor: 0xf1c40f,    // Gold utility accents
    hat: 'retailCap',
    tool: 'barcodeTerminal',
  },
  warehouseOperator: {
    id: 'warehouseOperator',
    title: { tr: 'Depocu', en: 'Warehouse Operator' },
    uniformColor: 0xff793f, // Safety orange
    trimColor: 0xecf0f1,    // Reflective silver
    hat: 'hardHat',
    tool: 'heavyGloves',
  },
  forkliftDriver: {
    id: 'forkliftDriver',
    title: { tr: 'Forklift Operatörü', en: 'Forklift Driver' },
    uniformColor: 0xf1c40f, // High-vis yellow
    trimColor: 0x2980b9,    // Navy blue
    hat: 'retailCap',
    tool: 'heavyGloves',
  },
  storeManager: {
    id: 'storeManager',
    title: { tr: 'Müdür', en: 'Store Manager' },
    uniformColor: 0xf8f9fa, // Crisp white collared shirt
    trimColor: 0x800020,    // Silk burgundy necktie
    hat: 'none',
    tool: 'clipboard',
  },
  janitor: {
    id: 'janitor',
    title: { tr: 'Temizlikçi', en: 'Janitor' },
    uniformColor: 0x00b894, // Seafoam teal overalls
    trimColor: 0xfbc531,    // Yellow rubber cleaning gloves
    hat: 'serviceCap',
    tool: 'mop',
  },
  security: {
    id: 'security',
    title: { tr: 'Güvenlik', en: 'Security Guard' },
    uniformColor: 0x2980b9, // Security police blue
    trimColor: 0xf1c40f,    // Gold star badge
    hat: 'peakedCap',
    tool: 'dutyRadio',
  },
  gardener: {
    id: 'gardener',
    title: { tr: 'Bahçıvan', en: 'Gardener' },
    uniformColor: 0x27ae60, // Green gardener dungarees
    trimColor: 0xd4a373,    // Straw hat
    hat: 'strawHat',
    tool: 'seedlingPot',
  },
  driver: {
    id: 'driver',
    title: { tr: 'Şoför', en: 'Driver' },
    uniformColor: 0x3498db, // Light blue shirt
    trimColor: 0x2c3e50,    // Dark cap
    hat: 'retailCap',
    tool: 'clipboard',
  },
  butcher: {
    id: 'butcher',
    title: { tr: 'Kasap', en: 'Butcher' },
    uniformColor: 0xffffff, // White shirt
    trimColor: 0xd63031,    // Red apron
    hat: 'serviceCap',
    tool: 'cleaver',
  },
  baker: {
    id: 'baker',
    title: { tr: 'Fırıncı', en: 'Baker' },
    uniformColor: 0xfafafa, // White baker coat
    trimColor: 0xd4a373,    // Wooden peel
    hat: 'toqueBlanche',
    tool: 'breadPeel',
  },
  chef: {
    id: 'chef',
    title: { tr: 'Aşçı', en: 'Chef' },
    uniformColor: 0xfafafa, // Double-breasted chef coat white
    trimColor: 0xd63031,    // Red neckerchief ascot
    hat: 'toqueBlanche',
    tool: 'fryingPan',
  },
  waiter: {
    id: 'waiter',
    title: { tr: 'Garson', en: 'Waiter' },
    uniformColor: 0x2f3542, // Black waistcoat
    trimColor: 0xd63031,    // Red bowtie
    hat: 'none',
    tool: 'servingTray',
  },
  technician: {
    id: 'technician',
    title: { tr: 'Teknisyen', en: 'Maintenance Technician' },
    uniformColor: 0x2980b9, // Mechanic blue jumpsuit
    trimColor: 0xe74c3c,    // Red toolbox
    hat: 'retailCap',
    tool: 'toolbox',
  },
  courier: {
    id: 'courier',
    title: { tr: 'Hızlı Kurye', en: 'Express Courier' },
    uniformColor: 0x2ed573, // High-vis neon courier green
    trimColor: 0x2f3542,    // Obsidian strap trim
    hat: 'courierHelmet',
    tool: 'thermalBackpack',
  },
  // Simulation Backwards Compatibility Aliases
  factoryFeeder: {
    id: 'factoryFeeder',
    title: { tr: 'Fabrika Lojistikçisi', en: 'Factory Logistics' },
    uniformColor: 0x1e90ff,
    trimColor: 0xf1c40f,
    hat: 'retailCap',
    tool: 'barcodeTerminal',
  },
  harvester: {
    id: 'harvester',
    title: { tr: 'Hasatçı', en: 'Harvester' },
    uniformColor: 0x465b78,
    trimColor: 0xd4a373,
    hat: 'strawHat',
    tool: 'gardenTrowel',
  },
  caretaker: {
    id: 'caretaker',
    title: { tr: 'Çiftlik Bakıcısı', en: 'Farm Caretaker' },
    uniformColor: 0x465b78,
    trimColor: 0xd4a373,
    hat: 'strawHat',
    tool: 'gardenTrowel',
  },
  chefWaiter: {
    id: 'chefWaiter',
    title: { tr: 'Aşçı Garson', en: 'Chef Waiter' },
    uniformColor: 0xfafafa,
    trimColor: 0xd63031,
    hat: 'toqueBlanche',
    tool: 'cookingSpoon',
  },
});

export const STAFF_PROFESSION_KEYS = Object.keys(STAFF_PROFESSIONS);

// 10 Core Customer Archetypes for backwards compatibility
export const CUSTOMER_ARCHETYPES = [
  'shopperCart',    // 0: Pushing wire shopping cart
  'shopperBasket',  // 1: Holding red supermarket basket
  'elderly',        // 2: Senior with wire glasses, silver hair, and wooden walking cane
  'child',          // 3: Playful youngster (0.72x scale, backwards cap, holding snack)
  'business',       // 4: Executive in formal suit holding leather briefcase
  'teen',           // 5: Casual teen with hoodie, headphones, and backpack
  'paperBag',       // 6: Carrying brown kraft grocery bag with leafy greens
  'winterScarf',    // 7: Wearing warm beanie hat with pom-pom and wool scarf
  'stylish',        // 8: Fashionable shopper with dark sunglasses and beret
  'sporty',         // 9: Active athlete with #23 jersey, sports duffel bag
];

// 14 Extended Customer Archetypes matching reference image
export const EXTENDED_CUSTOMER_ARCHETYPES = [
  ...CUSTOMER_ARCHETYPES,
  'tourist',        // 10: Safari sunhat, Hawaiian shirt, camera around neck
  'student',        // 11: Backwards cap, green backpack, stack of textbooks
  'youngWoman',     // 12: Pink jacket, sunglasses, smartphone, shopping bag
  'influencer',     // 13: Blonde hair, sunglasses, crop top, selfie smartphone
];

function customerVariantHash(customerId, variant) {
  let value = 2166136261;
  for (const char of `${customerId}:${variant}`) {
    value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  }
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d);
  value ^= value >>> 15;
  value = Math.imul(value, 0x846ca68b);
  value ^= value >>> 16;
  return value >>> 0;
}

/**
 * Builds a highly stylized, expressive low-poly humanoid character with
 * role-specific uniforms, hats, accessories, and customizable archetypes.
 */
export function makeHumanoid(group, shirtColor, hairColor, style = 0, profession = '', options = {}) {
  const skinColor = options.skinColor ?? CUSTOMER_SKINS[style % CUSTOMER_SKINS.length];
  const pantsColor = options.pantsColor ?? CUSTOMER_PANTS[style % CUSTOMER_PANTS.length];
  const archetype = options.archetype ?? (profession ? null : CUSTOMER_ARCHETYPES[style % CUSTOMER_ARCHETYPES.length]);

  const skin = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.76 });
  const shirt = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.58 });
  const trim = new THREE.MeshStandardMaterial({
    color: profession && STAFF_PROFESSIONS[profession] ? STAFF_PROFESSIONS[profession].trimColor : CUSTOMER_SHIRTS[(style + 2) % CUSTOMER_SHIRTS.length],
    roughness: 0.52
  });
  const trousers = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.78 });
  const shoe = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.84 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.7, roughness: 0.3 });
  const silver = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, metalness: 0.8, roughness: 0.25 });

  const propObjects = {};

  const part = (geometry, material, x, y, z, scale = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  };

  // 1. Torso & Upper Body
  part(new THREE.SphereGeometry(0.31, 14, 11), shirt, 0, 0.77, 0, [0.88, 1.12, 0.65]);
  part(new THREE.SphereGeometry(0.255, 14, 11), shirt, 0, 0.57, 0, [0.91, 0.74, 0.7]);
  part(new THREE.SphereGeometry(0.065, 10, 8), skin, 0, 1.04, 0, [0.85, 1.4, 0.9]);

  const collar = part(new THREE.SphereGeometry(0.105, 10, 7), trim, 0, 0.985, 0.171, [1.7, 0.48, 0.3]);
  collar.rotation.z = Math.PI;
  part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.78, 0.197, [0.58, 1.4, 0.42]);
  part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.66, 0.195, [0.58, 1.4, 0.42]);

  // 2. Legs & Footwear
  let leftLeg;
  let rightLeg;
  const knees = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.135, 0.43, 0);
    const pants = new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.09, 4, 8), trousers);
    pants.position.y = -0.09;
    pants.castShadow = true;
    const knee = new THREE.Group();
    knee.position.y = -0.19;
    const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.082, 0.07, 4, 8), trousers);
    shin.position.y = -0.06;
    shin.castShadow = true;

    const boot = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.12, 0.3, 3, 0.055), shoe);
    boot.position.set(0, -0.12, 0.065);
    boot.castShadow = true;
    const sole = new THREE.Mesh(new RoundedBoxGeometry(0.2, 0.03, 0.32, 2, 0.015), dark);
    sole.position.set(0, -0.175, 0.065);
    knee.add(shin, boot, sole);
    leg.add(pants, knee);
    knees.push(knee);
    group.add(leg);

    if (side < 0) leftLeg = leg;
    else rightLeg = leg;
  }

  // 3. Arms, Hands & Sleeves
  const arms = [];
  const elbows = [];
  const wrists = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.26, 0.91, 0);
    arm.rotation.z = side * -0.08;

    const sleeve = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 9), shirt);
    sleeve.scale.set(0.88, 1.7, 0.8);
    sleeve.position.y = -0.14;

    const cuff = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), trim);
    cuff.scale.set(0.8, 0.48, 0.75);
    cuff.position.y = -0.23;
    const elbow = new THREE.Group();
    elbow.position.y = -0.24;

    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.16, 3, 8), skin);
    forearm.position.y = -0.12;
    forearm.rotation.z = -side * 0.12;

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.082, 10, 8), skin);
    const wrist = new THREE.Group();
    wrist.position.y = -0.24;
    hand.position.set(0, 0, 0.035);

    const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), skin);
    thumb.position.set(side * -0.045, 0.05, 0.095);

    wrist.add(hand, thumb);
    elbow.add(forearm, wrist);
    arm.add(sleeve, cuff, elbow);
    arm.userData.rigParts = [sleeve, cuff, elbow];
    group.add(arm);
    arms.push(arm);
    elbows.push(elbow);
    wrists.push(wrist);
  }

  // 4. Detailed Stylized Head
  const head = new THREE.Group();
  head.position.set(0, 1.31, 0.015);

  function partInHead(geometry, material, x, y, z, scale = [1, 1, 1]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    head.add(mesh);
    return mesh;
  }

  // Head base
  partInHead(new THREE.SphereGeometry(0.245, 16, 13), skin, 0, 0, 0, [0.92, 1.08, 0.9]);

  // Eyes, Ears, Cheeks & Brows
  for (const side of [-1, 1]) {
    partInHead(new THREE.SphereGeometry(0.054, 9, 7), skin, side * 0.224, -0.01, 0, [0.64, 0.9, 0.55]);
    partInHead(new THREE.SphereGeometry(0.059, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffaaa1, roughness: 0.9 }), side * 0.135, -0.06, 0.187, [1, 0.62, 0.24]);
    partInHead(new THREE.SphereGeometry(0.053, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfffaf1 }), side * 0.086, 0.034, 0.213, [0.83, 1, 0.42]);
    partInHead(new THREE.SphereGeometry(0.027, 8, 6), new THREE.MeshBasicMaterial({ color: 0x1e272e }), side * 0.081, 0.031, 0.234, [0.82, 1, 0.45]);
    const browCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.14, 0.11, 0.21),
      new THREE.Vector3(side * 0.085, 0.13, 0.225),
      new THREE.Vector3(side * 0.04, 0.115, 0.22)
    ]);
    head.add(new THREE.Mesh(new THREE.TubeGeometry(browCurve, 6, 0.014, 5, false), dark));
  }

  // Nose & Cheerful Smile
  partInHead(new THREE.SphereGeometry(0.048, 9, 7), skin, 0, -0.015, 0.232, [0.72, 0.64, 0.7]);
  const smile = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.052, -0.105, 0.211),
    new THREE.Vector3(0, -0.129, 0.226),
    new THREE.Vector3(0.052, -0.105, 0.211)
  ]);
  head.add(new THREE.Mesh(new THREE.TubeGeometry(smile, 8, 0.012, 5, false), dark));

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: (archetype === 'elderly') ? 0xdfe6e9 : hairColor,
    roughness: 0.92
  });

  // Base hairstyle
  const hairCap = partInHead(new THREE.SphereGeometry(0.205, 12, 9), hairMaterial, 0, 0.14, -0.035, [1.15, 0.7, 1.1]);
  hairCap.rotation.z = style % 2 ? 0.12 : -0.08;
  for (const side of [-1, 1]) {
    partInHead(new THREE.SphereGeometry(0.09, 9, 7), hairMaterial, side * (0.16 + (style % 2) * 0.025), -0.055, -0.025, [0.72, 1.45, 0.85]);
  }
  if (style % 3 === 0) {
    partInHead(new THREE.SphereGeometry(0.11, 10, 8), hairMaterial, 0.16, -0.12, -0.02, [0.8, 1.1, 0.8]);
  }

  group.add(head);

  // -------------------------------------------------------------
  // 5. Profession Specific Uniforms, Hats & Distinct Props
  // -------------------------------------------------------------
  if (profession === 'cashier') {
    // 1. KASİYER: Red shirt, green apron, gold badge, visor, barcode scanner
    const apron = part(new RoundedBoxGeometry(0.36, 0.38, 0.055, 3, 0.04), trim, 0, 0.58, 0.185);
    part(new RoundedBoxGeometry(0.08, 0.045, 0.02, 2, 0.01), gold, 0.16, 0.76, 0.21);
    const visorBrim = partInHead(new THREE.CylinderGeometry(0.26, 0.27, 0.035, 12, 1, false, 0, Math.PI), shirt, 0, 0.17, 0.08, [1, 0.4, 1.35]);
    visorBrim.rotation.x = 0.18;
    partInHead(new THREE.TorusGeometry(0.23, 0.04, 8, 16), shirt, 0, 0.16, 0.01);
    // Ponytail hair
    partInHead(new THREE.SphereGeometry(0.09, 8, 6), hairMaterial, 0, 0.05, -0.22, [0.8, 1.3, 0.8]);

    // Handheld scanner in right hand
    const scanner = new THREE.Group();
    scanner.position.set(0.04, -0.48, 0.08);
    const scBody = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.1, 0.05, 2, 0.01), dark);
    const scLaser = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.02), new THREE.MeshBasicMaterial({ color: 0x2ed573 }));
    scLaser.position.set(0, 0.04, 0.025);
    scanner.add(scBody, scLaser);
    arms[1].add(scanner);
    propObjects.scanner = scanner;
    propObjects.laser = scLaser;

  } else if (profession === 'stockClerk' || profession === 'factoryFeeder') {
    // 2. REYON GÖREVLİSİ: Royal blue vest, reflective stripe, cap, cardboard box in hands
    const vest = part(new RoundedBoxGeometry(0.38, 0.46, 0.27, 2, 0.04), new THREE.MeshStandardMaterial({ color: 0x1e90ff, roughness: 0.5 }), 0, 0.72, 0);
    vest.scale.set(0.95, 0.88, 0.85);
    part(new RoundedBoxGeometry(0.24, 0.03, 0.02, 1, 0.01), gold, 0, 0.75, 0.2);
    // Blue retail service cap
    partInHead(new THREE.SphereGeometry(0.24, 12, 8), new THREE.MeshStandardMaterial({ color: 0x1e90ff }), 0, 0.18, -0.01, [1.05, 0.65, 1.05]);
    const capBrim = partInHead(new RoundedBoxGeometry(0.22, 0.025, 0.14, 2, 0.01), new THREE.MeshStandardMaterial({ color: 0x0984e3 }), 0, 0.12, 0.22);
    capBrim.rotation.x = -0.15;

    // Cardboard stocking box held in hands
    const boxGroup = new THREE.Group();
    boxGroup.position.set(0, 0.68, 0.32);
    const cardboard = new THREE.MeshStandardMaterial({ color: 0xc28d53, roughness: 0.85 });
    for (const [w, h, d, x, y, z] of [
      [0.34, 0.025, 0.24, 0, -0.12, 0],
      [0.025, 0.26, 0.24, -0.16, 0, 0], [0.025, 0.26, 0.24, 0.16, 0, 0],
      [0.34, 0.26, 0.025, 0, 0, -0.11], [0.34, 0.26, 0.025, 0, 0, 0.11],
    ]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cardboard);
      wall.position.set(x, y, z);
      boxGroup.add(wall);
    }
    group.add(boxGroup);
    propObjects.box = boxGroup;

  } else if (profession === 'warehouseOperator' || profession === 'forkliftDriver') {
    // 3. DEPO & FORKLİFT: High-vis orange/yellow vest, reflective stripes, hard hat
    const vestColor = profession === 'forkliftDriver' ? 0xf1c40f : 0xff793f;
    const safetyVest = part(new RoundedBoxGeometry(0.39, 0.44, 0.28, 2, 0.03), new THREE.MeshStandardMaterial({ color: vestColor, roughness: 0.6 }), 0, 0.72, 0);
    safetyVest.scale.set(0.95, 0.88, 0.85);
    part(new RoundedBoxGeometry(0.32, 0.035, 0.02, 1, 0.01), silver, 0, 0.79, 0.2);
    part(new RoundedBoxGeometry(0.32, 0.035, 0.02, 1, 0.01), silver, 0, 0.65, 0.2);

    // Industrial hard hat
    const hardHatMat = new THREE.MeshStandardMaterial({ color: 0xfbc531, roughness: 0.35, metalness: 0.1 });
    partInHead(new THREE.SphereGeometry(0.25, 14, 10), hardHatMat, 0, 0.2, 0, [1.06, 0.75, 1.06]);
    partInHead(new THREE.CylinderGeometry(0.27, 0.28, 0.04, 14), hardHatMat, 0, 0.14, 0);
    partInHead(new RoundedBoxGeometry(0.04, 0.05, 0.38, 2, 0.015), hardHatMat, 0, 0.26, 0);

  } else if (profession === 'janitor') {
    // 4. TEMİZLİKÇİ: Mint teal jumpsuit, yellow gloves, mop in hand, yellow bucket beside
    partInHead(new THREE.CylinderGeometry(0.24, 0.25, 0.09, 12), new THREE.MeshStandardMaterial({ color: 0x00b894 }), 0, 0.19, -0.01);
    const janitorVisor = partInHead(new RoundedBoxGeometry(0.2, 0.02, 0.12, 2, 0.01), dark, 0, 0.14, 0.19);
    janitorVisor.rotation.x = -0.12;

    // Floor Mop attached to right arm
    const mopGroup = new THREE.Group();
    mopGroup.position.set(0.04, -0.45, 0.06);
    const mopStick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.95, 6), new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.6 }));
    mopStick.position.y = -0.25;
    const mopHead = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }));
    mopHead.position.y = -0.7;
    mopHead.rotation.x = Math.PI;
    mopGroup.add(mopStick, mopHead);
    arms[1].add(mopGroup);
    propObjects.mop = mopGroup;

    // Yellow Wet-Floor Mop Bucket
    const bucketGroup = new THREE.Group();
    bucketGroup.position.set(0.42, 0.16, 0.1);
    const bucket = new THREE.Mesh(new RoundedBoxGeometry(0.24, 0.28, 0.22, 2, 0.02), new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }));
    const bSymbol = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    bSymbol.position.set(0, 0, 0.115);
    bucketGroup.add(bucket, bSymbol);
    group.add(bucketGroup);
    propObjects.bucket = bucketGroup;

  } else if (profession === 'chef' || profession === 'chefWaiter') {
    // 5. AŞÇI: Toque blanche, mustache, frying pan with sizzling egg
    const ascotMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.5 });
    part(new THREE.SphereGeometry(0.045, 8, 6), ascotMat, 0, 0.97, 0.18, [1.4, 0.8, 0.6]);
    // Mustache
    const stache = partInHead(new RoundedBoxGeometry(0.12, 0.03, 0.02, 1, 0.005), dark, 0, -0.07, 0.23);
    stache.rotation.z = 0.05;
    // Tall Chef Toque
    const toqueMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });
    partInHead(new THREE.CylinderGeometry(0.22, 0.21, 0.18, 14), toqueMat, 0, 0.22, 0);
    partInHead(new THREE.SphereGeometry(0.16, 10, 8), toqueMat, 0, 0.35, 0);

    // Frying pan in right hand
    const panGroup = new THREE.Group();
    panGroup.position.set(0.04, -0.48, 0.15);
    const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.035, 14), dark);
    pan.position.set(0, 0, 0.12);
    const panHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6), dark);
    panHandle.rotation.x = Math.PI / 2;
    panHandle.position.set(0, 0, 0.02);
    // Fried Egg inside pan
    const eggGroup = new THREE.Group();
    eggGroup.position.set(0, 0.02, 0.12);
    const eggWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const eggYolk = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), new THREE.MeshBasicMaterial({ color: 0xf1c40f }));
    eggYolk.position.set(0, 0.01, 0);
    eggGroup.add(eggWhite, eggYolk);
    panGroup.add(pan, panHandle, eggGroup);
    arms[1].add(panGroup);
    propObjects.pan = panGroup;
    propObjects.egg = eggGroup;

  } else if (profession === 'butcher') {
    // 6. KASAP: Butcher cap, red apron, meat cleaver and T-bone steak
    const butcherApron = part(new RoundedBoxGeometry(0.36, 0.4, 0.055, 3, 0.04), new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.5 }), 0, 0.58, 0.185);
    partInHead(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0, 0.18, 0);

    // Meat Cleaver in right hand
    const cleaver = new THREE.Group();
    cleaver.position.set(0.04, -0.48, 0.06);
    const clBlade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.08), silver);
    const clHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 6), new THREE.MeshStandardMaterial({ color: 0x795548 }));
    clHandle.position.y = -0.08;
    cleaver.add(clBlade, clHandle);
    arms[1].add(cleaver);
    propObjects.cleaver = cleaver;

    // Fresh T-Bone Steak held in left hand
    const steak = new THREE.Mesh(new RoundedBoxGeometry(0.18, 0.12, 0.035, 2, 0.01), new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.4 }));
    steak.position.set(-0.04, -0.48, 0.08);
    arms[0].add(steak);
    propObjects.steak = steak;

  } else if (profession === 'baker') {
    // 7. FIRINCI: White baker coat, toque, wooden peel with golden baguettes
    partInHead(new THREE.CylinderGeometry(0.22, 0.21, 0.16, 14), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0, 0.22, 0);
    partInHead(new THREE.SphereGeometry(0.15, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0, 0.34, 0);

    // Baker's wooden peel holding bread
    const peelGroup = new THREE.Group();
    peelGroup.position.set(0, 0.58, 0.32);
    const peelBoard = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.38), new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 }));
    const bread1 = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.18, 3, 6), new THREE.MeshStandardMaterial({ color: 0xc27c38, roughness: 0.8 }));
    bread1.rotation.z = Math.PI / 2;
    bread1.position.set(0, 0.04, -0.06);
    const bread2 = bread1.clone();
    bread2.position.set(0, 0.04, 0.08);
    peelGroup.add(peelBoard, bread1, bread2);
    group.add(peelGroup);
    propObjects.peel = peelGroup;

  } else if (profession === 'waiter') {
    // 8. GARSON: Black vest, red bowtie, round silver serving tray with coffee cups
    part(new THREE.SphereGeometry(0.04, 8, 6), new THREE.MeshStandardMaterial({ color: 0xd63031 }), 0, 0.95, 0.185, [1.5, 0.7, 0.5]);
    part(new RoundedBoxGeometry(0.36, 0.4, 0.24, 2, 0.03), dark, 0, 0.7, 0, [0.94, 0.88, 0.8]);

    // Serving tray balanced on right hand
    const trayGroup = new THREE.Group();
    trayGroup.position.set(0.04, -0.48, 0.12);
    const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.015, 16), silver);
    const cup1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.05, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    cup1.position.set(0.05, 0.03, 0);
    const cup2 = cup1.clone();
    cup2.position.set(-0.05, 0.03, 0);
    trayGroup.add(tray, cup1, cup2);
    arms[1].add(trayGroup);
    propObjects.tray = trayGroup;

  } else if (profession === 'security') {
    // 9. GÜVENLİK: Tactical navy uniform, peaked cap, gold shield, radio in hand
    partInHead(new THREE.CylinderGeometry(0.26, 0.24, 0.1, 14), dark, 0, 0.2, 0.02);
    const visor = partInHead(new RoundedBoxGeometry(0.24, 0.02, 0.12, 2, 0.01), dark, 0, 0.14, 0.21);
    visor.rotation.x = -0.22;
    partInHead(new THREE.OctahedronGeometry(0.028), gold, 0, 0.22, 0.24, [1, 1.2, 0.5]);
    part(new THREE.OctahedronGeometry(0.04), gold, 0.15, 0.82, 0.19, [1.1, 1.2, 0.4]);

    // Walkie-talkie held in right hand
    const radio = new THREE.Group();
    radio.position.set(0.04, -0.46, 0.06);
    const rBody = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.1, 0.035, 1, 0.01), dark);
    const rAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.08, 6), dark);
    rAntenna.position.y = 0.08;
    radio.add(rBody, rAntenna);
    arms[1].add(radio);
    propObjects.radio = radio;

  } else if (profession === 'gardener' || profession === 'harvester' || profession === 'caretaker') {
    // 10. BAHÇIVAN: Straw hat, denim overalls, potted green seedling
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 });
    partInHead(new THREE.CylinderGeometry(0.38, 0.4, 0.03, 16), strawMat, 0, 0.16, 0);
    partInHead(new THREE.SphereGeometry(0.2, 12, 8), strawMat, 0, 0.22, 0, [1, 0.65, 1]);
    partInHead(new THREE.CylinderGeometry(0.205, 0.21, 0.035, 14), new THREE.MeshStandardMaterial({ color: 0x27ae60 }), 0, 0.18, 0);

    // Terracotta pot with green plant held in hands
    const plantGroup = new THREE.Group();
    plantGroup.position.set(0, 0.62, 0.28);
    const potMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.14, 10), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
    const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
    foliage.position.y = 0.11;
    foliage.scale.set(1.1, 0.85, 1.1);
    plantGroup.add(potMesh, foliage);
    group.add(plantGroup);
    propObjects.seedling = plantGroup;

  } else if (profession === 'storeManager' || profession === 'driver') {
    // 11. MÜDÜR / ŞOFÖR: Suit vest, tie, briefcase in left hand
    part(new RoundedBoxGeometry(0.055, 0.24, 0.02, 1, 0.01), new THREE.MeshStandardMaterial({ color: 0x800020 }), 0, 0.78, 0.19);
    // Glasses
    for (const side of [-1, 1]) {
      partInHead(new THREE.TorusGeometry(0.04, 0.006, 6, 12), dark, side * 0.085, 0.034, 0.225);
    }
    // Leather Briefcase
    const briefcase = new THREE.Group();
    briefcase.position.set(-0.04, -0.48, 0.05);
    const bBox = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.2, 0.26, 2, 0.015), new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.6 }));
    const bHandle = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 5, 8, Math.PI), gold);
    bHandle.position.y = 0.11;
    briefcase.add(bBox, bHandle);
    arms[0].add(briefcase);
    propObjects.briefcase = briefcase;

  } else if (profession === 'technician') {
    // 12. TEKNİSYEN: Blue mechanic jumpsuit, crescent wrench in right hand, red toolbox on ground
    partInHead(new THREE.SphereGeometry(0.24, 12, 8), new THREE.MeshStandardMaterial({ color: 0x2980b9 }), 0, 0.18, -0.01, [1.05, 0.65, 1.05]);

    // Crescent wrench in right hand
    const wrench = new THREE.Group();
    wrench.position.set(0.04, -0.48, 0.06);
    const wHandle = new THREE.Mesh(new RoundedBoxGeometry(0.02, 0.18, 0.015, 1, 0.005), silver);
    const wHead = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.016, 8), silver);
    wHead.position.y = 0.09;
    wrench.add(wHandle, wHead);
    arms[1].add(wrench);
    propObjects.wrench = wrench;

    // Red Metal Toolbox
    const toolbox = new THREE.Group();
    toolbox.position.set(-0.35, 0.12, 0.1);
    const tbBox = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.14, 0.24, 2, 0.015), new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 }));
    const tbLatch = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.02, 0.04), silver);
    toolbox.add(tbBox, tbLatch);
    group.add(toolbox);
    propObjects.toolbox = toolbox;
  }

  // -------------------------------------------------------------
  // 6. Rich Customer Archetypes & Lifestyle Props (When not staff)
  // -------------------------------------------------------------
  let inspectMesh = null;

  if (!profession) {
    if (archetype === 'tourist') {
      // Turist: Safari hat, Hawaiian shirt, camera around neck
      const safariMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.85 });
      partInHead(new THREE.CylinderGeometry(0.36, 0.38, 0.03, 16), safariMat, 0, 0.16, 0);
      partInHead(new THREE.SphereGeometry(0.2, 12, 8), safariMat, 0, 0.22, 0, [1, 0.65, 1]);
      // Camera around neck
      const camera = new THREE.Group();
      camera.position.set(0, 0.72, 0.22);
      const cBody = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.08, 0.06, 2, 0.01), dark);
      const cLens = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 10), silver);
      cLens.rotation.x = Math.PI / 2;
      cLens.position.z = 0.04;
      camera.add(cBody, cLens);
      group.add(camera);
      propObjects.camera = camera;

    } else if (archetype === 'student') {
      // Öğrenci: Backwards cap, green backpack, textbooks under arm
      partInHead(new THREE.SphereGeometry(0.24, 12, 8), new THREE.MeshStandardMaterial({ color: 0x2c3e50 }), 0, 0.17, -0.01, [1.06, 0.7, 1.06]);
      // Textbooks under left arm
      const books = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.18, 0.22, 1, 0.01), new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.6 }));
      books.position.set(-0.04, -0.42, 0.05);
      arms[0].add(books);
      propObjects.books = books;

    } else if (archetype === 'youngWoman' || archetype === 'influencer') {
      // Genç Kadın & Influencer: Sunglasses, chic hairstyle, smartphone
      const shades = partInHead(new RoundedBoxGeometry(0.22, 0.045, 0.02, 1, 0.008), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 }), 0, 0.034, 0.225);
      // Smartphone in right hand
      const phone = new THREE.Mesh(new RoundedBoxGeometry(0.045, 0.09, 0.008, 1, 0.002), new THREE.MeshStandardMaterial({ color: 0xd4a373, metalness: 0.8 }));
      phone.position.set(0.04, -0.48, 0.06);
      phone.rotation.x = 0.3;
      arms[1].add(phone);
      propObjects.phone = phone;

      // Shopping bag in left hand
      const bag = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.2, 0.12, 1, 0.01), new THREE.MeshStandardMaterial({ color: 0xff6b81, roughness: 0.6 }));
      bag.position.set(-0.04, -0.48, 0.06);
      arms[0].add(bag);
      propObjects.bag = bag;

    } else if (archetype === 'sporty') {
      // Sporcu: Athletic jersey #23, headphones, duffel bag
      const hpColor = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.4 });
      partInHead(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8), hpColor, -0.21, -0.06, 0.08);
      partInHead(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8), hpColor, 0.21, -0.06, 0.08);
      // Sports duffel bag
      const duffel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.3, 10), new THREE.MeshStandardMaterial({ color: 0x2980b9, roughness: 0.6 }));
      duffel.rotation.z = Math.PI / 2;
      duffel.position.set(-0.32, 0.52, 0.08);
      group.add(duffel);
      propObjects.duffel = duffel;

    } else if (archetype === 'elderly') {
      // Yaşlı: Spectacles, wooden cane
      for (const side of [-1, 1]) {
        partInHead(new THREE.TorusGeometry(0.042, 0.007, 6, 12), gold, side * 0.085, 0.034, 0.225);
      }
      const cane = new THREE.Group();
      cane.position.set(0.04, -0.46, 0.05);
      const cShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.012, 0.72, 8), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
      cShaft.position.y = -0.2;
      const cHandle = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.015, 6, 12, Math.PI), gold);
      cHandle.rotation.z = Math.PI;
      cHandle.position.y = 0.16;
      cane.add(cShaft, cHandle);
      arms[1].add(cane);
      propObjects.cane = cane;

    } else if (archetype === 'child') {
      // Çocuk: Backwards cap, small candy snack in hand
      partInHead(new THREE.SphereGeometry(0.24, 12, 8), new THREE.MeshStandardMaterial({ color: 0xe74c3c }), 0, 0.17, -0.01, [1.06, 0.7, 1.06]);
      const candy = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.09, 0.04, 1, 0.005), new THREE.MeshStandardMaterial({ color: 0xf1c40f }));
      candy.position.set(0.04, -0.48, 0.06);
      arms[1].add(candy);
      propObjects.candy = candy;

    } else if (archetype === 'business') {
      // Ofis Çalışanı: Glasses, briefcase
      for (const side of [-1, 1]) {
        partInHead(new THREE.TorusGeometry(0.04, 0.006, 6, 12), dark, side * 0.085, 0.034, 0.225);
      }
      const briefcase = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.18, 0.24, 2, 0.015), new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.6 }));
      briefcase.position.set(-0.04, -0.48, 0.05);
      arms[0].add(briefcase);
      propObjects.briefcase = briefcase;

    } else if (archetype === 'teen') {
      // Genç Erkek: Headphones around neck
      const hpColor = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.4 });
      partInHead(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8), hpColor, -0.21, -0.06, 0.08);
      partInHead(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8), hpColor, 0.21, -0.06, 0.08);
    }

    // Shelf Product Inspection Prop (appears when examining products)
    inspectMesh = new THREE.Mesh(
      new RoundedBoxGeometry(0.12, 0.16, 0.09, 2, 0.01),
      new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 })
    );
    inspectMesh.position.set(0, 0.78, 0.32);
    inspectMesh.visible = false;
    group.add(inspectMesh);
  }

  // Keep profession/archetype tools at their existing grip, now under a wrist.
  group.updateMatrixWorld(true);
  arms.forEach((arm, index) => {
    for (const tool of [...arm.children]) {
      if (!arm.userData.rigParts.includes(tool)) wrists[index].attach(tool);
    }
  });
  const torso = new THREE.Group();
  torso.position.y = 0.43;
  group.add(torso);
  group.updateMatrixWorld(true);
  const equipment = new Set([leftLeg, rightLeg, torso, inspectMesh, propObjects.box, propObjects.bucket]);
  for (const child of [...group.children]) if (!equipment.has(child)) torso.attach(child);

  return {
    legs: [leftLeg, rightLeg],
    arms,
    elbows,
    wrists,
    knees,
    torso,
    head,
    archetype,
    propObjects,
    profession,
    inspectMesh
  };
}

/**
 * Creates a complete animated 3D worker mesh representing one of the 14
 * staff professions with official uniforms, tools, and cargo holding capability.
 */
export function createWorkerMesh(type, itemFactory) {
  const group = new THREE.Group();
  const professionKey = STAFF_PROFESSIONS[type] ? type : 'cashier';
  const prof = STAFF_PROFESSIONS[professionKey];
  const uniformColor = prof.uniformColor;

  const body = makeHumanoid(group, uniformColor, 0x4a2c11, professionKey.length, professionKey);

  // Small hand terminal for an actual completed shelf delivery's barcode check.
  const terminal = new THREE.Group();
  const terminalBody = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.14, 0.05, 2, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.6 }));
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.08, 0.006),
    new THREE.MeshBasicMaterial({ color: 0x2ed573 }));
  screen.position.z = 0.029;
  terminal.add(terminalBody, screen);
  terminal.position.z = 0.055;
  terminal.visible = false;
  body.wrists[1].add(terminal);
  body.propObjects.terminal = terminal;

  const mug = new THREE.Group();
  const mugMaterial = new THREE.MeshStandardMaterial({ color: 0xf1eee3, roughness: 0.65 });
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.04, 0.08, 10), mugMaterial);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.007, 5, 9), mugMaterial);
  handle.position.x = 0.045;
  mug.add(cup, handle);
  mug.position.set(0, -0.02, 0.06);
  mug.visible = false;
  body.wrists[1].add(mug);
  body.propObjects.breakMug = mug;

  const energyGroup = new THREE.Group();
  energyGroup.name = 'worker-energy';
  energyGroup.position.y = 1.55;
  const energyBack = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.085),
    new THREE.MeshBasicMaterial({ color: 0x253b40, depthTest: false, toneMapped: false }));
  const energyFill = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.045),
    new THREE.MeshBasicMaterial({ color: 0x72c75c, depthTest: false, toneMapped: false }));
  energyBack.renderOrder = 10;
  energyFill.renderOrder = 11;
  energyFill.position.z = 0.002;
  energyGroup.add(energyBack, energyFill);
  group.add(energyGroup);
  const energyBar = { group: energyGroup, fill: energyFill, rotation: new THREE.Quaternion() };

  // Dedicated handheld cargo mesh
  let cargo = null;
  if (itemFactory && itemFactory.getItemGeometry) {
    cargo = new THREE.Mesh(itemFactory.getItemGeometry('TOMATO'), itemFactory.getItemMaterial('TOMATO'));
    cargo.name = 'worker-cargo';
    cargo.position.set(0, 0.72, 0.32);
    cargo.scale.setScalar(0.8);
    group.add(cargo);
  }

  return {
    group,
    cargo,
    energyBar,
    legs: body.legs,
    arms: body.arms,
    elbows: body.elbows,
    wrists: body.wrists,
    knees: body.knees,
    torso: body.torso,
    head: body.head,
    profession: professionKey,
    propObjects: body.propObjects,
    walkCycle: 0,
    actionTimer: 0,
    actionState: 'idle'
  };
}

export function updateWorkerEnergyBar(actor, worker, cameraQuaternion) {
  const bar = actor.energyBar;
  if (!bar) return;
  const fraction = THREE.MathUtils.clamp(Number.isFinite(worker.energy) ? worker.energy : 100, 0, 100) / 100;
  bar.fill.scale.x = fraction;
  bar.fill.position.x = -0.25 + 0.25 * fraction;
  bar.fill.material.color.setHex(fraction <= 0.2 ? 0xef5350 : fraction <= 0.5 ? 0xf0ba4a : 0x72c75c);
  if (cameraQuaternion) {
    actor.group.getWorldQuaternion(bar.rotation);
    bar.group.quaternion.copy(bar.rotation.invert()).multiply(cameraQuaternion);
  }
}

/**
 * Creates an animated 3D customer with diverse demographics, realistic skins,
 * distinct lifestyle archetypes, and shopping equipment (wire carts or baskets).
 */
export function createCustomerMesh(customer, environment, itemFactory) {
  const group = new THREE.Group();
  const customerId = customer.id ?? 'cust-0';
  const hash = [...customerId].reduce((value, char) => (Math.imul(value, 31) + char.charCodeAt(0)) >>> 0, 7);

  // Archetype & Demographic Variation (supports all 14 extended archetypes)
  const archetypeIndex = customer.archetypeIndex ?? (hash % EXTENDED_CUSTOMER_ARCHETYPES.length);
  const archetype = customer.archetype ?? EXTENDED_CUSTOMER_ARCHETYPES[archetypeIndex];
  const skinColor = CUSTOMER_SKINS[hash % CUSTOMER_SKINS.length];
  const hairColor = CUSTOMER_HAIR[(hash >>> 3) % CUSTOMER_HAIR.length];
  const outfitStyle = customerVariantHash(customerId, 'style');
  const shirtColor = CUSTOMER_SHIRTS[customerVariantHash(customerId, 'shirt') % CUSTOMER_SHIRTS.length];
  const pantsColor = CUSTOMER_PANTS[customerVariantHash(customerId, 'pants') % CUSTOMER_PANTS.length];

  const body = makeHumanoid(group, shirtColor, hairColor, outfitStyle, '', {
    archetype,
    skinColor,
    pantsColor
  });

  const legs = body.legs;
  const arms = body.arms;

  // Scale adjustment for children
  const isChild = (archetype === 'child');
  if (isChild) {
    group.scale.setScalar(0.72);
  }

  // Equipment: Shopping Cart or Handheld Basket
  const isShopper = customer.kind === 'shopper';
  const hasCart = isShopper && (archetype === 'shopperCart' || (!['shopperBasket', 'elderly', 'child'].includes(archetype) && hash % 2 === 0));
  const hasBasket = isShopper && !hasCart;

  let cartMesh = null;
  let basketMesh = null;

  if (hasCart && environment?.props?.createShoppingCartModel) {
    cartMesh = environment.props.createShoppingCartModel(0.92);
    // Cart model travels along local X; characters face local +Z.
    cartMesh.rotation.y = -Math.PI / 2;
    cartMesh.position.set(0, 0, 0.62);
    group.add(cartMesh);
    arms[0].rotation.set(-0.55, 0, 0.08);
    arms[1].rotation.set(-0.55, 0, -0.08);
  } else if (hasBasket && environment?.props?.createRedBasketModel) {
    basketMesh = environment.props.createRedBasketModel(0.85);
    basketMesh.position.set(0.3, 0.38, 0.08);
    group.add(basketMesh);
    arms[1].rotation.set(0.12, 0, -0.15);
  }

  // Headless Safe Speech / Item Wish Bubble
  const bubble = new THREE.Group();
  bubble.position.set(0, isChild ? 2.5 : 2.08, 0);

  const bubbleCanvas = createSafeCanvas(128, 128);
  let bubbleTexture = null;
  let sprite = null;

  if (bubbleCanvas) {
    bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);
    sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture, transparent: true }));
    sprite.scale.set(0.65, 0.65, 1);
    bubble.add(sprite);
  }
  group.add(bubble);

  // Multi-item basket/cart payload cargo
  const cargo = [];
  if (itemFactory && itemFactory.getItemGeometry) {
    for (let index = 0; index < 3; index += 1) {
      const mesh = new THREE.Mesh(itemFactory.getItemGeometry('TOMATO'), itemFactory.getItemMaterial('TOMATO'));
      if (hasCart) {
        mesh.scale.setScalar(0.7);
        mesh.position.set((index === 1 ? 0.12 : index === 2 ? -0.12 : 0), 0.52 + Math.floor(index / 2) * 0.16, 0.58 + (index % 2 ? 0.08 : -0.06));
      } else if (hasBasket) {
        mesh.scale.setScalar(0.6);
        mesh.position.set(0.3, 0.44 + index * 0.13, 0.08);
      } else {
        mesh.scale.setScalar(0.58);
        mesh.position.set(-0.22 + index * 0.2, 0.48 + index * 0.12, 0.36);
      }
      mesh.visible = false;
      cargo.push(mesh);
      group.add(mesh);
    }
  }

  return {
    group,
    legs,
    arms,
    elbows: body.elbows,
    wrists: body.wrists,
    knees: body.knees,
    torso: body.torso,
    head: body.head,
    bubble,
    bubbleCanvas,
    bubbleTexture,
    cargo,
    walkCycle: 0,
    lastWish: null,
    hasCart,
    hasBasket,
    cartMesh,
    basketMesh,
    archetype,
    propObjects: body.propObjects,
    inspectMesh: body.inspectMesh,
    inspectTimer: 0,
    reachTimer: 0
  };
}

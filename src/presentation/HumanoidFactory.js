import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const CUSTOMER_SHIRTS = [0xff4757, 0xffa502, 0x2ed573, 0x1e90ff, 0xa55eea, 0xff6b81, 0x00d2d3, 0xffc048];
export const CUSTOMER_HAIR = [0x2c3e50, 0x6d4c41, 0xdfe6e9, 0xf1c40f, 0xb33939];

export function makeHumanoid(group, shirtColor, hairColor, style, profession = '') {
  const skin = new THREE.MeshStandardMaterial({ color: [0xffdfc4, 0xf1c19b, 0xd49a73, 0x9e684f][style % 4], roughness: 0.78 });
  const shirt = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.58 });
  const trim = new THREE.MeshStandardMaterial({ color: [0xf8e6c4, 0xffd35e, 0x57c1b8, 0xf48e7a][style % 4], roughness: 0.52 });
  const trousers = new THREE.MeshStandardMaterial({ color: [0x465b78, 0x55624b, 0x795c72, 0x59616a][style % 4], roughness: 0.76 });
  const shoe = new THREE.MeshStandardMaterial({ color: 0x75503e, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x543c34, roughness: 0.84 });
  const part = (geometry, material, x, y, z, scale = [1, 1, 1]) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  };

  part(new THREE.SphereGeometry(0.31, 14, 11), shirt, 0, 0.77, 0, [0.88, 1.12, 0.65]);
  part(new THREE.SphereGeometry(0.255, 14, 11), shirt, 0, 0.57, 0, [0.91, 0.74, 0.7]);
  part(new THREE.SphereGeometry(0.065, 10, 8), skin, 0, 1.04, 0, [0.85, 1.4, 0.9]);
  const collar = part(new THREE.SphereGeometry(0.105, 10, 7), trim, 0, 0.985, 0.171, [1.7, 0.48, 0.3]);
  collar.rotation.z = Math.PI;
  part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.78, 0.197, [0.58, 1.4, 0.42]);
  part(new THREE.SphereGeometry(0.036, 8, 6), trim, -0.048, 0.66, 0.195, [0.58, 1.4, 0.42]);
  const pocket = part(new RoundedBoxGeometry(0.12, 0.12, 0.045, 2, 0.025), trim, 0.16, 0.75, 0.17);
  pocket.rotation.z = -0.12;
  let leftLeg;
  let rightLeg;
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.135, 0.43, 0);
    const pants = new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.25, 4, 8), trousers);
    pants.position.y = -0.15;
    pants.castShadow = true;
    const boot = new THREE.Mesh(new RoundedBoxGeometry(0.19, 0.12, 0.3, 3, 0.055), shoe);
    boot.position.set(0, -0.31, 0.065);
    boot.castShadow = true;
    leg.add(pants, boot);
    group.add(leg);
    if (side < 0) leftLeg = leg;
    else rightLeg = leg;
  }
  const arms = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.26, 0.91, 0);
    arm.rotation.z = side * -0.08;
    const sleeve = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 9), shirt);
    sleeve.scale.set(0.88, 1.7, 0.8);
    sleeve.position.y = -0.14;
    const cuff = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), trim);
    cuff.scale.set(0.8, 0.48, 0.75);
    cuff.position.y = -0.28;
    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.16, 3, 8), skin);
    forearm.position.y = -0.36;
    forearm.rotation.z = -side * 0.12;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.082, 10, 8), skin);
    hand.position.set(0, -0.48, 0.035);
    const thumb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), skin);
    thumb.position.set(side * -0.045, -0.43, 0.095);
    arm.add(sleeve, cuff, forearm, hand, thumb);
    group.add(arm);
    arms.push(arm);
  }
  const head = new THREE.Group();
  head.position.set(0, 1.31, 0.015);
  partInHead(new THREE.SphereGeometry(0.245, 16, 13), skin, 0, 0, 0, [0.92, 1.08, 0.9]);
  function partInHead(geometry, material, x, y, z, scale = [1, 1, 1]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    head.add(mesh);
    return mesh;
  }
  for (const side of [-1, 1]) {
    partInHead(new THREE.SphereGeometry(0.054, 9, 7), skin, side * 0.224, -0.01, 0, [0.64, 0.9, 0.55]);
    partInHead(new THREE.SphereGeometry(0.059, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffaaa1, roughness: 0.9 }), side * 0.135, -0.06, 0.187, [1, 0.62, 0.24]);
    partInHead(new THREE.SphereGeometry(0.053, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfffaf1 }), side * 0.086, 0.034, 0.213, [0.83, 1, 0.42]);
    partInHead(new THREE.SphereGeometry(0.027, 8, 6), new THREE.MeshBasicMaterial({ color: 0x39404d }), side * 0.081, 0.031, 0.234, [0.82, 1, 0.45]);
    const browCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(side * 0.14, 0.11, 0.21), new THREE.Vector3(side * 0.085, 0.13, 0.225), new THREE.Vector3(side * 0.04, 0.115, 0.22)]);
    head.add(new THREE.Mesh(new THREE.TubeGeometry(browCurve, 6, 0.014, 5, false), dark));
  }
  partInHead(new THREE.SphereGeometry(0.048, 9, 7), skin, 0, -0.015, 0.232, [0.72, 0.64, 0.7]);
  const smile = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.052, -0.105, 0.211), new THREE.Vector3(0, -0.129, 0.226), new THREE.Vector3(0.052, -0.105, 0.211)]);
  head.add(new THREE.Mesh(new THREE.TubeGeometry(smile, 8, 0.012, 5, false), dark));
  const hairMaterial = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.92 });
  if (profession === 'chefWaiter') {
    for (const [x, y, radius] of [[0, 0.25, 0.145], [-0.09, 0.21, 0.11], [0.09, 0.21, 0.11], [0, 0.34, 0.11]]) {
      partInHead(new THREE.SphereGeometry(radius, 10, 8), new THREE.MeshStandardMaterial({ color: 0xfff9e9, roughness: 0.86 }), x, y, 0);
    }
    partInHead(new THREE.SphereGeometry(0.19, 10, 6), trim, 0, 0.18, 0, [1, 0.18, 1]);
  } else if (profession === 'harvester' || profession === 'caretaker') {
    partInHead(new THREE.SphereGeometry(0.26, 12, 8), trim, 0, 0.19, -0.015, [1.35, 0.15, 1.05]);
    const crown = partInHead(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshStandardMaterial({ color: profession === 'harvester' ? 0xc79850 : 0x58bba0 }), 0, 0.22, -0.025, [1, 0.55, 0.95]);
    crown.rotation.z = 0.04;
  } else {
    const cap = partInHead(new THREE.SphereGeometry(0.205, 12, 9), hairMaterial, 0, 0.14, -0.035, [1.15, 0.7, 1.1]);
    cap.rotation.z = style % 2 ? 0.15 : -0.08;
    for (const side of [-1, 1]) partInHead(new THREE.SphereGeometry(0.09, 9, 7), hairMaterial, side * (0.16 + (style % 2) * 0.025), -0.055, -0.025, [0.72, 1.45, 0.85]);
    if (style % 3 === 0) partInHead(new THREE.SphereGeometry(0.11, 10, 8), hairMaterial, 0.16, -0.12, -0.02, [0.8, 1.1, 0.8]);
  }
  group.add(head);
  if (profession === 'cashier') {
    const apron = part(new RoundedBoxGeometry(0.35, 0.36, 0.055, 3, 0.045), trim, 0, 0.59, 0.184);
    apron.rotation.z = 0.015;
    part(new THREE.SphereGeometry(0.055, 9, 7), new THREE.MeshStandardMaterial({ color: 0xf8f5e8, metalness: 0.35, roughness: 0.4 }), 0.19, 0.62, 0.2, [1, 0.78, 0.25]);
  } else if (profession === 'waiter' || profession === 'chefWaiter') {
    part(new THREE.SphereGeometry(0.16, 10, 8), trim, 0, 0.61, 0.186, [0.98, 0.95, 0.22]);
    part(new THREE.SphereGeometry(0.06, 8, 6), trim, 0, 0.96, 0.205, [1.25, 0.65, 0.35]);
  } else if (!profession) {
    const outfit = style % 4;
    if (outfit === 0) part(new RoundedBoxGeometry(0.34, 0.31, 0.05, 2, 0.035), trim, 0, 0.62, 0.183);
    if (outfit === 1) {
      part(new THREE.TorusGeometry(0.23, 0.045, 7, 16), trim, 0, 0.94, 0.015);
    }
    if (outfit === 2) {
      const vest = part(new THREE.SphereGeometry(0.255, 12, 9), trim, 0, 0.75, 0.035, [0.72, 0.94, 0.63]);
      vest.scale.z = 0.44;
    }
  }
  return { legs: [leftLeg, rightLeg], arms };
}

export function createWorkerMesh(type, itemFactory) {
  const group = new THREE.Group();
  const uniforms = {
    cashier: [0xff4757, 0xff3838],
    harvester: [0x2ed573, 0x26af5f],
    factoryFeeder: [0xff9600, 0xe58500],
    caretaker: [0xffc800, 0xe5b200],
    chefWaiter: [0xfaf5e8, 0x6d4c41],
    waiter: [0x2f3640, 0xa55eea],
  };
  const [uniformColor] = uniforms[type] ?? uniforms.cashier;
  const body = makeHumanoid(group, uniformColor, 0x6d4c41, type.length, type);
  const cargo = new THREE.Mesh(itemFactory.getItemGeometry('TOMATO'), itemFactory.getItemMaterial('TOMATO'));
  cargo.name = 'worker-cargo';
  cargo.position.set(0.36, 0.68, 0.18);
  cargo.scale.setScalar(0.8);
  group.add(cargo);
  return { group, cargo, legs: body.legs, arms: body.arms, walkCycle: 0 };
}

export function createCustomerMesh(customer, environment, itemFactory) {
  const group = new THREE.Group();
  const hash = [...customer.id].reduce((value, char) => (Math.imul(value, 31) + char.charCodeAt(0)) >>> 0, 7);
  const body = makeHumanoid(group, CUSTOMER_SHIRTS[hash % CUSTOMER_SHIRTS.length], CUSTOMER_HAIR[(hash >>> 4) % CUSTOMER_HAIR.length], hash >>> 7);
  const legs = body.legs;
  const arms = body.arms;

  const isShopper = customer.kind === 'shopper';
  const hasCart = isShopper && (hash % 2 === 0);
  const hasBasket = isShopper && !hasCart;

  let cartMesh = null;
  let basketMesh = null;

  if (hasCart) {
    cartMesh = environment.props.createShoppingCartModel(0.92);
    cartMesh.position.set(0, 0, 0.58);
    group.add(cartMesh);
    arms[0].rotation.set(-0.55, 0, 0.08);
    arms[1].rotation.set(-0.55, 0, -0.08);
  } else if (hasBasket) {
    basketMesh = environment.props.createRedBasketModel(0.85);
    basketMesh.position.set(0.3, 0.38, 0.08);
    group.add(basketMesh);
    arms[1].rotation.set(0.12, 0, -0.15);
  }

  const bubble = new THREE.Group();
  bubble.position.set(0, 2.08, 0);
  const bubbleCanvas = document.createElement('canvas');
  bubbleCanvas.width = 128;
  bubbleCanvas.height = 128;
  const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: bubbleTexture, transparent: true }));
  sprite.scale.set(0.65, 0.65, 1);
  bubble.add(sprite);

  const cargo = [];
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
  group.add(bubble);
  return { group, legs, arms, bubble, bubbleCanvas, bubbleTexture, cargo, walkCycle: 0, lastWish: null, hasCart, hasBasket, cartMesh, basketMesh };
}

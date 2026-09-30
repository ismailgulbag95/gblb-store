import * as THREE from 'three';
import { PLAYER_CHARACTER_IDS } from '../domain/characters.js';
import { CharacterFactory } from './CharacterFactory.js';

const PREVIEW_WIDTH = 112;
const PREVIEW_HEIGHT = 128;

function disposeGroup(group) {
  group.traverse((object) => {
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => material.dispose());
  });
}

function renderPreview(renderer, scene, camera, type) {
  const character = new CharacterFactory(type);
  const group = character.group;
  const bounds = new THREE.Box3().setFromObject(group);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  group.position.sub(center);
  group.rotation.y = 0.18;
  scene.add(group);

  const frameHeight = Math.max(size.y * 1.16, 1.85);
  const aspect = PREVIEW_WIDTH / PREVIEW_HEIGHT;
  camera.left = -(frameHeight * aspect) / 2;
  camera.right = (frameHeight * aspect) / 2;
  camera.top = frameHeight / 2;
  camera.bottom = -frameHeight / 2;
  camera.position.set(1.7, 1.25, 4.8);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
  const image = renderer.domElement.toDataURL('image/png');
  scene.remove(group);
  disposeGroup(group);
  return image;
}

export function mountCharacterPreviews(root = document) {
  const images = [...root.querySelectorAll('[data-character-preview]')];
  const sources = {};
  if (!images.length) return sources;

  let renderer;
  try {
    const canvas = document.createElement('canvas');
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(PREVIEW_WIDTH, PREVIEW_HEIGHT, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x789780, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 6, 5);
    scene.add(keyLight);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 30);

    for (const image of images) {
      const type = image.dataset.characterPreview;
      if (!PLAYER_CHARACTER_IDS.includes(type)) continue;
      sources[type] = renderPreview(renderer, scene, camera, type);
      image.src = sources[type];
      image.dataset.previewReady = 'true';
    }
  } catch {
    images.forEach((image) => image.classList.add('preview-fallback'));
  } finally {
    renderer?.dispose();
    renderer?.forceContextLoss();
  }
  return sources;
}

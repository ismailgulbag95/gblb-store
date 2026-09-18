import * as THREE from 'three';

export class Engine {
  constructor(containerId = 'game-container') {
    this.container = document.getElementById(containerId);
    
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0e2ff);
    this.scene.fog = new THREE.Fog(0xa0e2ff, 35, 65);

    // Camera (Isometric Arcade View)
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 1000);
    this.cameraOffset = new THREE.Vector3(14, 18, 14);
    this.camera.position.copy(this.cameraOffset);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    this.setupLights();
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLights() {
    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    // Main Sunlight with soft shadows
    const sunLight = new THREE.DirectionalLight(0xfff7e6, 0.9);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    const d = 25;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);
    this.sunLight = sunLight;
  }

  followTarget(targetPosition, delta = 0.1) {
    const desiredPosition = targetPosition.clone().add(this.cameraOffset);
    this.camera.position.lerp(desiredPosition, delta * 6);
    this.camera.lookAt(targetPosition.x, targetPosition.y + 0.5, targetPosition.z);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

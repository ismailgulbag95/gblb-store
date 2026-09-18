import * as THREE from 'three';

export class Engine {
  constructor(containerId = 'game-container') {
    this.container = document.getElementById(containerId);
    
    // Scene - Vibrant clean sky blue
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x70d6ff);
    this.scene.fog = new THREE.Fog(0x70d6ff, 40, 75);

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
    // Soft vibrant ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    // Sky & Ground Hemisphere light for colorful fill and vibrant tones
    const hemiLight = new THREE.HemisphereLight(0x70d6ff, 0x2ed573, 0.45);
    hemiLight.position.set(0, 40, 0);
    this.scene.add(hemiLight);

    // Main Sunlight with crisp warm illumination
    const sunLight = new THREE.DirectionalLight(0xfffae8, 1.15);
    sunLight.position.set(22, 32, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 85;
    const d = 26;
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

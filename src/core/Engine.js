import * as THREE from 'three';

export class Engine {
  constructor(containerId = 'game-container') {
    this.container = document.getElementById(containerId);
    
    // Scene - Vibrant clean sky blue
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x70d6ff);
    this.scene.fog = new THREE.Fog(0x70d6ff, 40, 75);

    // Isometric camera with a stable world scale across desktop and portrait screens.
    const aspect = window.innerWidth / window.innerHeight;
    const viewHeight = window.innerHeight > window.innerWidth ? 29 : 24;
    this.camera = new THREE.OrthographicCamera(
      -(viewHeight * aspect) / 2,
      (viewHeight * aspect) / 2,
      viewHeight / 2,
      -viewHeight / 2,
      0.1,
      1000,
    );
    this.cameraOffset = new THREE.Vector3(14, 18, 14);
    this.cameraZoomLimits = { min: 0.65, max: 2.1 };
    this.camera.position.copy(this.cameraOffset);
    this.camera.lookAt(0, 0, 0);
    this.cameraTarget = new THREE.Vector3();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.qualityScale = 1;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.lastFrameAt = performance.now();
    this.frameTimeSum = 0;
    this.frameCount = 0;
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
    const easing = Math.min(1, delta * 6);
    this.camera.position.lerp(desiredPosition, easing);
    this.cameraTarget.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y + 0.5, targetPosition.z), easing);
    this.camera.lookAt(this.cameraTarget);
  }

  zoomBy(factor) {
    if (!Number.isFinite(factor) || factor <= 0) return;
    this.camera.zoom = THREE.MathUtils.clamp(
      this.camera.zoom * factor,
      this.cameraZoomLimits.min,
      this.cameraZoomLimits.max,
    );
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const viewHeight = window.innerHeight > window.innerWidth ? 29 : 24;
    this.camera.left = -(viewHeight * aspect) / 2;
    this.camera.right = (viewHeight * aspect) / 2;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5) * this.qualityScale);
  }

  render() {
    const now = performance.now();
    const elapsed = now - this.lastFrameAt;
    this.lastFrameAt = now;
    if (!document.hidden && elapsed < 2000) {
      this.frameTimeSum += elapsed;
      this.frameCount += 1;
    }
    if (this.frameTimeSum >= 2500 && this.frameCount > 0) {
      const fps = this.frameCount * 1000 / this.frameTimeSum;
      const nextScale = fps < 22 ? 0.7 : fps < 34 ? Math.min(this.qualityScale, 0.85)
        : fps > 52 ? Math.min(1, this.qualityScale + 0.15) : this.qualityScale;
      if (Math.abs(nextScale - this.qualityScale) > 0.01) {
        this.qualityScale = nextScale;
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5) * this.qualityScale);
      }
      if (fps < 22 && this.renderer.shadowMap.enabled) this.renderer.shadowMap.enabled = false;
      if (fps > 48 && !this.renderer.shadowMap.enabled) this.renderer.shadowMap.enabled = true;
      this.frameTimeSum = 0;
      this.frameCount = 0;
    }
    this.renderer.render(this.scene, this.camera);
  }
}

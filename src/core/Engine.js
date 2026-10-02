import * as THREE from 'three';

export class Engine {
  constructor(containerId = 'game-container') {
    this.container = document.getElementById(containerId);
    
    // Scene - Vibrant clean sky blue
    this.scene = new THREE.Scene();
    this.daySky = new THREE.Color(0x70d6ff);
    this.nightSky = new THREE.Color(0x111d38);
    this.dayGround = new THREE.Color(0x2ed573);
    this.nightGround = new THREE.Color(0x162c32);
    this.daySun = new THREE.Color(0xfffae8);
    this.nightSun = new THREE.Color(0x8695c2);
    this.scene.background = this.daySky.clone();
    this.scene.fog = new THREE.Fog(this.daySky, 40, 75);

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
    this.desiredPosition = new THREE.Vector3();
    this.targetLookAt = new THREE.Vector3();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
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
    // Scene lighting is managed authoritatively by LightingManager in WorldScene.
  }

  setDaylight(amount) {
    const daylight = THREE.MathUtils.clamp(amount, 0, 1);
    this.scene.background.lerpColors(this.nightSky, this.daySky, daylight);
    this.scene.fog.color.lerpColors(this.nightSky, this.daySky, daylight);
  }

  followTarget(targetPosition, delta = 0.1) {
    this.desiredPosition.copy(targetPosition).add(this.cameraOffset);
    const easing = Math.min(1, delta * 6);
    this.camera.position.lerp(this.desiredPosition, easing);
    this.targetLookAt.set(targetPosition.x, targetPosition.y + 0.5, targetPosition.z);
    this.cameraTarget.lerp(this.targetLookAt, easing);
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}


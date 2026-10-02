import * as THREE from 'three';

export class LightingManager {
  constructor(scene) {
    this.scene = scene;
    this.dirLight = null;
    this.hemiLight = null;
    this.storeLight = null;
    this.#init();
  }

  #init() {
    this.hemiLight = new THREE.HemisphereLight(0xfff7e6, 0x4a6572, 1.45);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xfff5ea, 2.3);
    this.dirLight.position.set(22, 34, 18);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 1024;
    this.dirLight.shadow.mapSize.height = 1024;
    this.dirLight.shadow.camera.near = 1;
    this.dirLight.shadow.camera.far = 85;
    this.dirLight.shadow.camera.left = -34;
    this.dirLight.shadow.camera.right = 34;
    this.dirLight.shadow.camera.top = 34;
    this.dirLight.shadow.camera.bottom = -34;
    this.dirLight.shadow.bias = -0.00035;
    this.dirLight.shadow.normalBias = 0.035;
    this.scene.add(this.dirLight);

    this.storeLight = new THREE.PointLight(0xffecd1, 1.1, 35);
    this.storeLight.position.set(-17, 7, 0);
    this.scene.add(this.storeLight);

    this.rimLight = new THREE.DirectionalLight(0xc4e4ff, 0.55);
    this.rimLight.position.set(-20, 25, -20);
    this.rimLight.castShadow = false;
    this.scene.add(this.rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(ambientLight);
  }

  updateDaylight(gameDaylightFn, dayMinute, THREE) {
    const daylight = gameDaylightFn(dayMinute);
    const sunColor = new THREE.Color().lerpColors(new THREE.Color(0xff7744), new THREE.Color(0xfff5ea), daylight);
    const hemiSky = new THREE.Color().lerpColors(new THREE.Color(0x35495e), new THREE.Color(0xfff7e6), daylight);
    const hemiGround = new THREE.Color().lerpColors(new THREE.Color(0x1a252f), new THREE.Color(0x4a6572), daylight);
    
    this.rimLight.intensity = 0.16 + daylight * 0.39;
    this.dirLight.color.copy(sunColor);
    this.dirLight.intensity = 0.6 + daylight * 1.7;
    this.hemiLight.color.copy(hemiSky);
    this.hemiLight.groundColor.copy(hemiGround);
    this.hemiLight.intensity = 0.65 + daylight * 0.8;
    this.storeLight.intensity = 0.7 + (1 - daylight) * 1.4;
  }
}

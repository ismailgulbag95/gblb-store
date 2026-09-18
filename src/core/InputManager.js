import * as THREE from 'three';

export class InputManager {
  constructor() {
    this.moveVector = new THREE.Vector2(0, 0);
    this.keys = {};
    this.isJoystickActive = false;
    this.touchStartPos = { x: 0, y: 0 };
    
    this.setupKeyboard();
    this.setupVirtualJoystick();
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  setupVirtualJoystick() {
    const zone = document.getElementById('joystick-zone');
    const thumb = document.getElementById('joystick-thumb');
    if (!zone || !thumb) return;

    const maxRadius = 45;

    const onStart = (clientX, clientY) => {
      this.isJoystickActive = true;
      const rect = zone.getBoundingClientRect();
      this.touchStartPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      onMove(clientX, clientY);
    };

    const onMove = (clientX, clientY) => {
      if (!this.isJoystickActive) return;
      const dx = clientX - this.touchStartPos.x;
      const dy = clientY - this.touchStartPos.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      const clampedDist = Math.min(dist, maxRadius);
      const thumbX = Math.cos(angle) * clampedDist;
      const thumbY = Math.sin(angle) * clampedDist;

      thumb.style.transform = `translate(calc(-50% + ${thumbX}px), calc(-50% + ${thumbY}px))`;

      this.moveVector.set(thumbX / maxRadius, thumbY / maxRadius);
    };

    const onEnd = () => {
      this.isJoystickActive = false;
      thumb.style.transform = 'translate(-50%, -50%)';
      this.moveVector.set(0, 0);
    };

    // Touch events
    zone.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      onStart(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isJoystickActive) {
        const touch = e.touches[0];
        onMove(touch.clientX, touch.clientY);
      }
    }, { passive: false });

    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);

    // Mouse fallback for joystick dragging
    zone.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => {
      if (this.isJoystickActive) onMove(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', onEnd);
  }

  getMovementVector() {
    let x = 0;
    let y = 0;

    // Keyboard inputs
    if (this.keys['KeyW'] || this.keys['ArrowUp']) y -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) y += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) x += 1;

    let vec = new THREE.Vector2(x, y);
    if (vec.lengthSq() > 0) {
      vec.normalize();
    } else if (this.isJoystickActive) {
      vec.copy(this.moveVector);
    }

    if (vec.lengthSq() === 0) {
      return new THREE.Vector3(0, 0, 0);
    }

    // Convert Screen/Camera isometric space to World space (-45 degrees rotation)
    const angle = -Math.PI / 4;
    const worldX = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
    const worldZ = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);

    return new THREE.Vector3(worldX, 0, worldZ).normalize().multiplyScalar(Math.min(vec.length(), 1.0));
  }
}

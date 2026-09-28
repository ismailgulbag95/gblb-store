const KEY_VECTORS = {
  KeyW: { x: 0, z: -1 }, ArrowUp: { x: 0, z: -1 },
  KeyS: { x: 0, z: 1 }, ArrowDown: { x: 0, z: 1 },
  KeyA: { x: -1, z: 0 }, ArrowLeft: { x: -1, z: 0 },
  KeyD: { x: 1, z: 0 }, ArrowRight: { x: 1, z: 0 },
};

export class InputManager {
  constructor(canvas, world, app, onInteract) {
    this.canvas = canvas;
    this.world = world;
    this.app = app;
    this.onInteract = onInteract;
    this.enabled = true;
    this.keys = new Set();
    this.joystick = { active: false, pointerId: null, x: 0, z: 0 };
    this.joystickBase = document.getElementById('joystick-base');
    this.joystickZone = document.getElementById('joystick-zone');
    this.joystickThumb = document.getElementById('joystick-thumb');
    this.pointerStart = null;
    this.#bindKeyboard();
    this.#bindJoystick();
    this.#bindWorldTap();
  }

  #bindKeyboard() {
    window.addEventListener('keydown', (event) => {
      if (KEY_VECTORS[event.code]) {
        event.preventDefault();
        this.keys.add(event.code);
      }
      if (this.enabled && (event.code === 'KeyE' || event.code === 'Space') && !event.repeat) {
        event.preventDefault();
        this.onInteract();
      }
    });
    window.addEventListener('keyup', (event) => this.keys.delete(event.code));
    window.addEventListener('blur', () => this.reset());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.reset();
    });
  }

  #bindJoystick() {
    this.joystickZone.addEventListener('pointerdown', (event) => {
      if (this.joystick.active) return;
      event.preventDefault();
      this.joystick.active = true;
      this.joystick.pointerId = event.pointerId;
      this.joystickZone.setPointerCapture(event.pointerId);
      this.#updateJoystick(event);
    });
    this.joystickZone.addEventListener('pointermove', (event) => {
      if (this.joystick.active && event.pointerId === this.joystick.pointerId) {
        event.preventDefault();
        this.#updateJoystick(event);
      }
    });
    const finish = (event) => {
      if (this.joystick.active && (event.pointerId === undefined || event.pointerId === this.joystick.pointerId)) this.#resetJoystick();
    };
    this.joystickZone.addEventListener('pointerup', finish);
    this.joystickZone.addEventListener('pointercancel', finish);
    this.joystickZone.addEventListener('lostpointercapture', finish);
  }

  #updateJoystick(event) {
    const rect = this.joystickBase.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width * 0.36;
    let dx = event.clientX - centerX;
    let dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    if (distance > radius) {
      dx *= radius / distance;
      dy *= radius / distance;
    }
    this.joystick.x = dx / radius;
    this.joystick.z = dy / radius;
    this.joystickThumb.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  #resetJoystick() {
    this.joystick.active = false;
    this.joystick.pointerId = null;
    this.joystick.x = 0;
    this.joystick.z = 0;
    this.joystickThumb.style.transform = 'translate(0, 0)';
  }

  #bindWorldTap() {
    this.canvas.addEventListener('pointerdown', (event) => {
      if (!this.enabled || event.target.closest('[data-ui]')) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this.pointerStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    });
    this.canvas.addEventListener('pointerup', (event) => {
      if (!this.enabled || !this.pointerStart || this.pointerStart.pointerId !== event.pointerId) return;
      const distance = Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y);
      this.pointerStart = null;
      if (distance > 18 || event.target.closest('[data-ui]')) return;
      const target = this.world.screenToWorld(event.clientX, event.clientY);
      if (target && target.x > -55 && target.x < 18 && target.z > -16 && target.z < 30) this.app.setPlayerTarget(target.x, target.z);
    });
    this.canvas.addEventListener('pointercancel', () => { this.pointerStart = null; });
  }

  getMovementVector() {
    if (!this.enabled) return { x: 0, z: 0 };
    let x = this.joystick.x;
    let z = this.joystick.z;
    for (const code of this.keys) {
      const vector = KEY_VECTORS[code];
      if (vector) { x += vector.x; z += vector.z; }
    }
    const length = Math.hypot(x, z);
    if (length > 1) { x /= length; z /= length; }
    return { x, z };
  }

  reset() {
    this.keys.clear();
    this.pointerStart = null;
    this.#resetJoystick();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) this.reset();
  }
}

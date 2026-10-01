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
    this.touchPointers = new Map();
    this.pinchDistance = null;
    this.multiTouchGesture = false;
    this.layoutMode = false;
    this.selectedStation = null;
    this.#bindKeyboard();
    this.#bindJoystick();
    this.#bindCameraZoom();
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
      if (this.enabled && event.code === 'KeyR' && !event.repeat) {
        if (this.layoutMode && this.selectedStation) {
          event.preventDefault();
          this.rotateCurrentSelection();
        }
      }
      if (this.enabled && event.code === 'Escape' && !event.repeat) {
        if (this.layoutMode && this.selectedStation) {
          event.preventDefault();
          this.cancelCurrentSelection();
        }
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

  #bindCameraZoom() {
    this.canvas.addEventListener('wheel', (event) => {
      if (!this.enabled) return;
      event.preventDefault();
      const deltaScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.canvas.clientHeight : 1;
      this.world.engine.zoomBy(Math.exp(-event.deltaY * deltaScale * 0.001));
    }, { passive: false });

    this.canvas.addEventListener('pointerdown', (event) => {
      if (!this.enabled || event.pointerType !== 'touch') return;
      this.touchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touchPointers.size >= 2) {
        this.multiTouchGesture = true;
        this.pointerStart = null;
        this.pinchDistance = this.#getPinchDistance();
      }
    });

    this.canvas.addEventListener('pointermove', (event) => {
      if (!this.enabled || !this.touchPointers.has(event.pointerId)) return;
      this.touchPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touchPointers.size < 2) return;
      const distance = this.#getPinchDistance();
      if (this.pinchDistance && distance > 0) this.world.engine.zoomBy(distance / this.pinchDistance);
      this.pinchDistance = distance;
    });

    const finishTouch = (event) => {
      if (!this.touchPointers.delete(event.pointerId)) return;
      if (this.touchPointers.size >= 2) this.pinchDistance = this.#getPinchDistance();
      else this.pinchDistance = null;
      if (this.touchPointers.size === 0) this.multiTouchGesture = false;
    };
    this.canvas.addEventListener('pointerup', finishTouch);
    this.canvas.addEventListener('pointercancel', finishTouch);
  }

  #getPinchDistance() {
    const [first, second] = [...this.touchPointers.values()];
    return first && second ? Math.hypot(second.x - first.x, second.y - first.y) : 0;
  }

  #bindWorldTap() {
    this.canvas.addEventListener('pointerdown', (event) => {
      if (!this.enabled || this.multiTouchGesture || event.target.closest('[data-ui]')) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this.pointerStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    });
    this.canvas.addEventListener('pointerup', (event) => {
      if (!this.enabled || !this.pointerStart || this.pointerStart.pointerId !== event.pointerId) return;
      const distance = Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y);
      this.pointerStart = null;
      if (distance > 18 || event.target.closest('[data-ui]')) return;
      if (!this.layoutMode && this.world.terminalAtScreen?.(event.clientX, event.clientY, this.app.getState())) {
        this.app.openProcurement();
        return;
      }
      const target = this.world.screenToWorld(event.clientX, event.clientY);
      if (this.layoutMode) {
        if (!target) return;
        if (!this.selectedStation) {
          const state = this.app.getState();
          const decorationId = this.world.decorationAt(state, target.x, target.z);
          this.selectedStation = decorationId
            ? 'decor:' + decorationId
            : this.world.stationAt(state, target.x, target.z);
          this.world.selectStation(this.selectedStation, state);
          this.onLayoutMessage?.(this.selectedStation ? 'Yeni konum için dokun veya R ile döndür.' : 'Taşımak için bir yapıya dokun.');
          this.onSelectionChange?.(this.selectedStation);
        } else {
          const result = this.selectedStation.startsWith('decor:')
            ? this.app.moveDecoration(this.selectedStation.slice(6), target.x, target.z)
            : this.app.moveStation(this.selectedStation, target.x, target.z);
          this.onLayoutMessage?.(result.ok ? 'Yerleşim kaydedildi. Başka bir yapı seçebilirsin.' : 'Bu kare dolu veya alanın dışında. Başka bir kare seç.');
          if (result.ok) {
            this.selectedStation = null;
            this.world.selectStation(null);
            this.onSelectionChange?.(null);
          }
        }
        return;
      }
      if (target && target.x > -55 && target.x < (this.app.getState().unlocked.managerOffice ? 27 : 18) && target.z > -16 && target.z < 30) this.app.setPlayerTarget(target.x, target.z);
    });
    this.canvas.addEventListener('pointercancel', () => { this.pointerStart = null; });
    this.canvas.addEventListener('pointermove', (event) => {
      if (!this.enabled || this.multiTouchGesture || !this.layoutMode || !this.selectedStation) return;
      const target = this.world.screenToWorld(event.clientX, event.clientY);
      if (target) this.world.previewPlacement(this.app.getState(), target.x, target.z);
    });
  }

  setLayoutMode(enabled) {
    this.layoutMode = enabled;
    this.selectedStation = null;
    this.world.selectStation(null);
    this.app.clearPlayerTarget();
    this.world.setLayoutMode(enabled);
    this.onSelectionChange?.(null);
  }

  rotateCurrentSelection() {
    if (!this.layoutMode || !this.selectedStation) return;
    const result = this.app.rotateSelected(this.selectedStation);
    this.onLayoutMessage?.(result.ok ? 'Döndürüldü (90°). Yeni konumu seçebilirsin.' : 'Döndürülemedi.');
    if (result.ok) {
      this.world.refreshPreview(this.app.getState());
    }
  }

  cancelCurrentSelection() {
    if (!this.layoutMode || !this.selectedStation) return;
    this.selectedStation = null;
    this.world.selectStation(null);
    this.onSelectionChange?.(null);
    this.onLayoutMessage?.('Seçim iptal edildi. Taşımak istediğin yapıya dokun.');
  }

  getMovementVector() {
    if (!this.enabled || this.layoutMode) return { x: 0, z: 0 };
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
    this.touchPointers.clear();
    this.pinchDistance = null;
    this.multiTouchGesture = false;
    this.#resetJoystick();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) this.reset();
  }
}

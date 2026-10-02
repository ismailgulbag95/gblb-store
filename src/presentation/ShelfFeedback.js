import * as THREE from 'three';

export function addShelfWobbler(group, produce = false) {
  const pivot = new THREE.Group(); pivot.name = 'shelf-wobbler'; pivot.position.set(0.7, 1.15, produce ? 0.82 : 0.42);
  const stem = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.18, 0.035), new THREE.MeshStandardMaterial({ color: 0x61696e, metalness: 0.6, roughness: 0.35 }));
  stem.position.y = 0.1; pivot.add(stem);
  const material = new THREE.MeshBasicMaterial({ color: 0xffd763, toneMapped: false });
  const tag = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.025), material); tag.position.y = 0.24; pivot.add(tag);
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas'); canvas.width = 192; canvas.height = 96;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#ffdc73'; ctx.fillRect(0, 0, 192, 96);
    ctx.fillStyle = '#384638'; ctx.font = 'bold 38px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(produce ? 'TAZE' : 'MARKET', 96, 48);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.22), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
    face.position.set(0, 0.24, 0.015); pivot.add(face);
  }
  group.add(pivot); return pivot;
}

export function updateShelfFeedback(shelf, count, capacity, delta, time, near, reducedMotion) {
  const changed = shelf.lastFeedbackCount !== undefined && count > shelf.lastFeedbackCount;
  const full = changed && count >= capacity && shelf.lastFeedbackCount < capacity;
  shelf.lastFeedbackCount = count;
  if (changed && !reducedMotion) shelf.feedbackAge = 0;
  if (shelf.feedbackAge !== undefined) {
    shelf.feedbackAge += Math.max(0, delta);
    const t = Math.min(1, shelf.feedbackAge / 0.38);
    shelf.group.scale.y = reducedMotion ? 1 : 1 + Math.sin(t * Math.PI * 2) * Math.sin(t * Math.PI) * 0.055;
    if (t === 1 || reducedMotion) { shelf.group.scale.y = 1; delete shelf.feedbackAge; }
  }
  if (shelf.wobbler && !reducedMotion) shelf.wobbler.rotation.z = near ? Math.sin(time * 9) * 0.08 : 0;
  return full && !reducedMotion;
}

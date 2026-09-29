// Interacción 3D: arrastra para girar el modelo; gira solo hasta que lo tocas.
window.Scene3D = {
  attach(stage) {
    const rig = stage.querySelector('.rig');
    let ry = -28, rx = 8, drag = false, lx = 0, ly = 0, auto = true, raf;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paint = () => rig.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    const tick = () => { if (auto && !reduce) { ry += 0.35; paint(); } raf = requestAnimationFrame(tick); };
    const down = e => { drag = true; auto = false; lx = e.clientX; ly = e.clientY; stage.setPointerCapture(e.pointerId); stage.classList.add('grab'); };
    const move = e => { if (!drag) return; ry += (e.clientX - lx) * 0.6; rx = Math.max(-40, Math.min(40, rx - (e.clientY - ly) * 0.4)); lx = e.clientX; ly = e.clientY; paint(); };
    const up = () => { drag = false; stage.classList.remove('grab'); setTimeout(() => auto = true, 2500); };
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    paint(); tick();
    return () => cancelAnimationFrame(raf);
  }
};
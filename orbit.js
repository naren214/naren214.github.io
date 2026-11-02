/* Orbital study — a dependency-free, decorative Canvas sculpture. */
(() => {
  'use strict';

  const canvas = document.getElementById('orbit-canvas');
  if (!canvas || !canvas.getContext) return;
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;

  canvas.setAttribute('aria-hidden', 'true');
  const control = document.getElementById('orbit-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 1;
  let height = 1;
  let scale = 1;
  let frame = 0;
  let previous = 0;
  let rotation = 0.36;
  let paused = motionPreference.matches;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let easedX = 0;
  let easedY = 0;
  let rendered = false;
  const TAU = Math.PI * 2;
  const depthBuckets = 8;
  const vertices = [];
  const lines = [];
  const nodes = [];
  const meridians = 64;
  const parallels = 40;

  // A subtly rippled torus: its regular surface produces the woven sculpture.
  for (let u = 0; u < meridians; u += 1) {
    const angle = (u / meridians) * TAU;
    for (let v = 0; v < parallels; v += 1) {
      const tube = (v / parallels) * TAU;
      const minor = 0.32 + Math.sin(angle * 3 + tube * 2) * 0.012;
      const radius = 0.66 + minor * Math.cos(tube);
      vertices.push([
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        minor * Math.sin(tube),
      ]);
      const index = u * parallels + v;
      lines.push([index, u * parallels + ((v + 1) % parallels), 0]);
      if (v % 2 === 0) {
        lines.push([index, ((u + 1) % meridians) * parallels + v, 1]);
      }
      if (u % 8 === 0 && v % 10 === 0) nodes.push(index);
    }
  }

  const transform = (point, spin) => {
    // The tilt reveals the aperture and keeps the silhouette asymmetrical.
    const cx = Math.cos(0.91 + easedY * 0.11);
    const sx = Math.sin(0.91 + easedY * 0.11);
    const cy = Math.cos(spin * 0.31 + easedX * 0.13);
    const sy = Math.sin(spin * 0.31 + easedX * 0.13);
    const cz = Math.cos(-0.42 + spin * 0.13);
    const sz = Math.sin(-0.42 + spin * 0.13);
    const x1 = point[0] * cy + point[2] * sy;
    const z1 = -point[0] * sy + point[2] * cy;
    const y2 = point[1] * cx - z1 * sx;
    const z2 = point[1] * sx + z1 * cx;
    const x3 = x1 * cz - y2 * sz;
    const y3 = x1 * sz + y2 * cz;
    const perspective = 4.3 / (4.3 - z2);
    return [width * 0.5 + x3 * scale * perspective,
      height * 0.49 + y3 * scale * perspective, z2];
  };

  function drawOrbit(front) {
    const count = 180;
    let last = null;
    context.lineWidth = 0.65;
    context.strokeStyle = front ? 'rgba(205,225,180,.33)' : 'rgba(205,225,180,.10)';
    context.beginPath();
    for (let i = 0; i <= count; i += 1) {
      const angle = (i / count) * TAU;
      const p = transform([
        Math.cos(angle) * 1.27,
        Math.sin(angle) * 0.72,
        Math.sin(angle) * 0.36,
      ], rotation * 0.19 - 0.54);
      if ((p[2] >= 0) === front && last) {
        context.moveTo(last[0], last[1]);
        context.lineTo(p[0], p[1]);
      }
      last = p;
    }
    context.stroke();
    for (let n = 0; n < 3; n += 1) {
      const a = n * TAU / 3 + rotation * 0.22 + 0.2;
      const p = transform([Math.cos(a) * 1.27,
        Math.sin(a) * 0.72, Math.sin(a) * 0.36], rotation * 0.19 - 0.54);
      if ((p[2] >= 0) !== front) continue;
      context.fillStyle = '#d3f391';
      context.beginPath();
      context.arc(p[0], p[1], n === 0 ? 2.9 : 1.7, 0, TAU);
      context.fill();
      if (n === 0) {
        context.strokeStyle = 'rgba(211,243,145,.22)';
        context.beginPath();
        context.arc(p[0], p[1], 8, 0, TAU);
        context.stroke();
      }
    }
  }

  function render() {
    context.clearRect(0, 0, width, height);
    easedX += (pointerX - easedX) * 0.04;
    easedY += (pointerY - easedY) * 0.04;

    const glow = context.createRadialGradient(width * .5, height * .49, 0,
      width * .5, height * .49, scale * 1.2);
    glow.addColorStop(0, 'rgba(170,196,133,.035)');
    glow.addColorStop(.6, 'rgba(170,196,133,.018)');
    glow.addColorStop(1, 'rgba(170,196,133,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    drawOrbit(false);
    const projected = vertices.map((point) => transform(point, rotation));
    const buckets = Array.from({ length: depthBuckets }, () => [[], []]);
    for (const [a, b, family] of lines) {
      const p = projected[a];
      const q = projected[b];
      const depth = (p[2] + q[2]) * .5;
      const bucket = Math.max(0, Math.min(depthBuckets - 1,
        Math.floor((depth + 1.05) / 2.1 * depthBuckets)));
      buckets[bucket][family].push(p[0], p[1], q[0], q[1]);
    }
    for (let depth = 0; depth < depthBuckets; depth += 1) {
      for (let family = 0; family < 2; family += 1) {
        const segments = buckets[depth][family];
        const frontness = depth / (depthBuckets - 1);
        const alpha = .065 + frontness * (family === 0 ? .31 : .22);
        context.strokeStyle = family === 0
          ? `rgba(210,231,178,${alpha})`
          : `rgba(180,167,128,${alpha})`;
        context.lineWidth = frontness > .65 ? .72 : .55;
        context.beginPath();
        for (let n = 0; n < segments.length; n += 4) {
          context.moveTo(segments[n], segments[n + 1]);
          context.lineTo(segments[n + 2], segments[n + 3]);
        }
        context.stroke();
      }
    }
    for (const index of nodes) {
      const p = projected[index];
      if (p[2] < -.25) continue;
      const alpha = .26 + (p[2] + .25) * .45;
      context.fillStyle = `rgba(226,241,199,${Math.min(.9, alpha)})`;
      context.beginPath();
      context.arc(p[0], p[1], p[2] > .5 ? 1.45 : .85, 0, TAU);
      context.fill();
    }
    drawOrbit(true);
    rendered = true;
  }

  function animate(time) {
    frame = 0;
    if (paused || !visible || document.hidden || motionPreference.matches) return;
    const interval = width < 500 ? 1000 / 30 : 1000 / 40;
    if (time - previous >= interval) {
      const delta = previous ? Math.min(time - previous, 80) : interval;
      rotation += delta * .000105;
      render();
      previous = time;
    }
    frame = requestAnimationFrame(animate);
  }

  function start() {
    if (!rendered) render();
    if (!frame && !paused && visible && !document.hidden && !motionPreference.matches) {
      previous = 0;
      frame = requestAnimationFrame(animate);
    }
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = Math.min(width, height) * .365;
    render();
    start();
  }

  function updateControl() {
    if (!control) return;
    const running = !paused && !motionPreference.matches;
    control.setAttribute('aria-pressed', String(paused));
    control.setAttribute('aria-label', running ? 'Pause orbital animation' : 'Resume orbital animation');
    const label = control.querySelector('[data-orbit-label]');
    if (label) label.textContent = running ? 'Pause motion' : 'Resume motion';
    else control.textContent = running ? 'Pause motion' : 'Resume motion';
    control.disabled = motionPreference.matches;
    if (motionPreference.matches) {
      control.setAttribute('aria-label', 'Animation disabled by your reduced motion preference');
      if (label) label.textContent = 'Motion reduced';
      else control.textContent = 'Motion reduced';
    }
  }

  control?.addEventListener('click', () => {
    paused = !paused;
    updateControl();
    if (paused) stop(); else start();
  });
  canvas.parentElement?.addEventListener('pointermove', (event) => {
    if (motionPreference.matches || paused || event.pointerType === 'touch') return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
  }, { passive: true });
  canvas.parentElement?.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
  motionPreference.addEventListener('change', () => {
    paused = motionPreference.matches;
    updateControl();
    if (paused) { stop(); render(); } else start();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: '60px' }).observe(canvas);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize, { passive: true });
  updateControl();
  resize();
})();

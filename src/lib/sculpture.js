// The original canvas renderer, scoped to the React component's lifetime.
export function createSculpture(canvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ctx = canvas.getContext("2d");
  let w = 500,
    h = 430,
    angle = 0.55,
    tilt = -0.75,
    pointerX = 0,
    pointerY = 0;
  let exploded = 0,
    targetExploded = 0,
    visible = true,
    animationId = 0,
    lastFrame = 0;
  function resizeSculpture() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    if (ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawSculpture();
    }
  }
  function projectPoint(u, v) {
    const radius = 1.5 + 0.53 * Math.cos(v);
    let x = radius * Math.cos(u);
    let y = radius * Math.sin(u);
    let z = 0.53 * Math.sin(v) + 0.32 * Math.sin(3 * u);
    z += exploded * 0.7 * Math.sin(u * 2);
    x *= 1 + exploded * 0.14;
    const a = angle + pointerX * 0.23;
    const xa = x * Math.cos(a) - y * Math.sin(a);
    const ya = x * Math.sin(a) + y * Math.cos(a);
    const t = tilt + pointerY * 0.13;
    const yb = ya * Math.cos(t) - z * Math.sin(t);
    const zb = ya * Math.sin(t) + z * Math.cos(t);
    const rotation = -0.45;
    const xc = xa * Math.cos(rotation) - yb * Math.sin(rotation);
    const yc = xa * Math.sin(rotation) + yb * Math.cos(rotation);
    const perspective = 5.5 / (5.5 + zb);
    const scale = Math.min(w / 5.6, h / 4.8);
    return {
      x: w / 2 + xc * scale * perspective,
      y: h / 2 + yc * scale * perspective,
      z: zb,
    };
  }
  function drawSculpture() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    const shadow = ctx.createRadialGradient(
      w * 0.5,
      h * 0.89,
      1,
      w * 0.5,
      h * 0.89,
      w * 0.25,
    );
    shadow.addColorStop(0, "rgba(73,83,46,.08)");
    shadow.addColorStop(1, "rgba(73,83,46,0)");
    ctx.fillStyle = shadow;
    ctx.translate(0, h * 0.72);
    ctx.scale(1, 0.23);
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
    const paths = [];
    // Cross-sections create the visible mesh without a solid, opaque surface.
    for (let i = 0; i < 84; i++) {
      const u = (i / 84) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 38; j++)
        points.push(projectPoint(u, (j / 38) * Math.PI * 2));
      paths.push({
        points,
        z: points.reduce((s, p) => s + p.z, 0) / points.length,
        heavy: false,
      });
    }
    for (let j = 0; j < 22; j++) {
      const points = [];
      for (let i = 0; i <= 168; i++)
        points.push(
          projectPoint((i / 168) * Math.PI * 2, (j / 22) * Math.PI * 2),
        );
      paths.push({
        points,
        z: points.reduce((s, p) => s + p.z, 0) / points.length,
        heavy: true,
      });
    }
    paths
      .sort((a, b) => b.z - a.z)
      .forEach(({ points, z, heavy }) => {
        const opacity = Math.min(0.76, Math.max(0.13, 0.42 - z * 0.12));
        ctx.strokeStyle = `rgba(48,59,31,${opacity})`;
        ctx.lineWidth = heavy ? 0.65 : 0.55;
        ctx.beginPath();
        points.forEach((p, i) =>
          i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
        );
        ctx.stroke();
      });
    const marker = projectPoint(1.1, 1.2);
    ctx.beginPath();
    ctx.arc(marker.x, marker.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#d9f64b";
    ctx.fill();
    ctx.strokeStyle = "#536139";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(marker.x, marker.y, 11, 0, Math.PI * 2);
    ctx.strokeStyle = "#53613955";
    ctx.stroke();
  }
  function animateSculpture(time) {
    animationId = 0;
    if (!visible || document.hidden || !ctx) return;
    if (time - lastFrame > 32) {
      angle += 0.0028;
      exploded += (targetExploded - exploded) * 0.065;
      drawSculpture();
      lastFrame = time;
    }
    if (!reducedMotion.matches)
      animationId = requestAnimationFrame(animateSculpture);
  }
  function resumeSculpture() {
    if (visible && !document.hidden && !animationId && !reducedMotion.matches)
      animationId = requestAnimationFrame(animateSculpture);
  }

  function pointerMove(event) {
    if (event.pointerType !== "mouse" || reducedMotion.matches) return;
    const rect = canvas.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  }
  function pointerLeave() {
    pointerX = 0;
    pointerY = 0;
  }
  function motionChange() {
    if (reducedMotion.matches && animationId) {
      cancelAnimationFrame(animationId);
      animationId = 0;
    } else resumeSculpture();
  }
  canvas.addEventListener("pointermove", pointerMove, { passive: true });
  canvas.addEventListener("pointerleave", pointerLeave);
  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(resizeSculpture) : null;
  if (resizeObserver) resizeObserver.observe(canvas);
  else window.addEventListener("resize", resizeSculpture);
  const intersectionObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          visible = entries[0].isIntersecting;
          if (!visible && animationId) {
            cancelAnimationFrame(animationId);
            animationId = 0;
          } else resumeSculpture();
        })
      : null;
  intersectionObserver?.observe(canvas);
  document.addEventListener("visibilitychange", resumeSculpture);
  reducedMotion.addEventListener("change", motionChange);
  resizeSculpture();
  resumeSculpture();

  return {
    setExpanded(expanded) {
      const next = expanded ? 1 : 0;
      if (targetExploded === next) return;
      targetExploded = next;
      if (reducedMotion.matches) {
        exploded = targetExploded;
        angle += 0.7;
        drawSculpture();
      } else resumeSculpture();
    },
    destroy() {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resizeSculpture);
      document.removeEventListener("visibilitychange", resumeSculpture);
      reducedMotion.removeEventListener("change", motionChange);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
    },
  };
}

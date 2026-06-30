/**
 * Frame-sequence configuration + the procedural renderer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  SWAPPING IN REAL FRAMES (Blender / After Effects export)
 * ─────────────────────────────────────────────────────────────────────────
 *  1. Export a 90–120 frame image sequence (JPG ~82% quality, 1920×1080).
 *  2. Name them frame_0001.jpg … frame_0120.jpg
 *  3. Drop them in   public/frames/
 *  4. Set USE_IMAGE_FRAMES = true and FRAME_COUNT to your real count.
 *
 *  Until then the hero runs a self-contained procedural "frame sequence"
 *  (a rotating particle form) so the engine is fully live with no assets.
 */

export const USE_IMAGE_FRAMES = false;
export const FRAME_COUNT = 120;

export const framePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

const ACCENT: [number, number, number] = [140, 255, 60];

// Cache of base unit-sphere points (Fibonacci distribution). Computed once.
let basePoints: Array<[number, number, number]> | null = null;

function getBasePoints(count = 900) {
  if (basePoints) return basePoints;
  const pts: Array<[number, number, number]> = [];
  const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1 → -1
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  basePoints = pts;
  return pts;
}

/**
 * Draw a single procedural frame into a 2D context.
 *
 * Coordinates are in CSS pixels: the caller is responsible for DPR scaling
 * (ctx.setTransform with devicePixelRatio) before calling this.
 *
 * @param frame  0 .. FRAME_COUNT-1 — drives rotation, so scrolling "plays" it.
 * @param zoom   1 on desktop, ~1.3 on mobile to read better on small screens.
 */
export function drawProceduralFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frame: number,
  zoom = 1
) {
  // Background — subtle radial charcoal vignette.
  ctx.clearRect(0, 0, w, h);
  const bg = ctx.createRadialGradient(
    w / 2,
    h * 0.45,
    0,
    w / 2,
    h * 0.45,
    Math.max(w, h) * 0.75
  );
  bg.addColorStop(0, "#161719");
  bg.addColorStop(1, "#0c0d0f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h * 0.46;
  const radius = Math.min(w, h) * 0.32 * zoom;

  const t = frame / FRAME_COUNT;
  const ay = t * Math.PI * 3; // ~1.5 full turns across the scroll
  const ax = Math.sin(t * Math.PI * 2) * 0.4;

  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);

  const pts = getBasePoints();
  const projected: Array<[number, number, number, number]> = []; // x,y,depth,scale

  for (let i = 0; i < pts.length; i++) {
    let [x, y, z] = pts[i];
    // rotate Y
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    // rotate X
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    x = x1;
    y = y1;
    z = z2;

    const perspective = 1 / (1.8 - z * 0.7); // depth 0..1-ish
    const sx = cx + x * radius * perspective;
    const sy = cy + y * radius * perspective;
    const depth = (z + 1) / 2; // 0 (back) .. 1 (front)
    projected.push([sx, sy, depth, perspective]);
  }

  // Painter's algorithm — far points first.
  projected.sort((a, b) => a[2] - b[2]);

  for (let i = 0; i < projected.length; i++) {
    const [sx, sy, depth, perspective] = projected[i];
    const size = (0.6 + depth * 1.8) * perspective * zoom;
    const alpha = 0.15 + depth * 0.85;

    // Front points trend toward accent green, back points stay zinc.
    const mix = Math.max(0, depth - 0.45) / 0.55;
    const r = Math.round(120 + (ACCENT[0] - 120) * mix);
    const g = Math.round(125 + (ACCENT[1] - 125) * mix);
    const b = Math.round(135 + (ACCENT[2] - 135) * mix);

    ctx.beginPath();
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.arc(sx, sy, Math.max(0.4, size), 0, Math.PI * 2);
    ctx.fill();
  }

  // Accent core glow.
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.9);
  glow.addColorStop(0, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.12)`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
  ctx.fill();
}

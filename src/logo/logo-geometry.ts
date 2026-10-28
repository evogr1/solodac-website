import { logoGlyphs, logoKerning } from "./logo-glyphs";
import type { LogoLook, LogoSettings } from "./logo-settings";

// Layout works in font units (1000 per em) with the baseline at y = 0, then
// centers the mark on the scene origin and scales it to the chosen size.

export type LogoPaint = Readonly<{
  fill: string | null;
  opacity: number;
  stroke: string | null;
  strokeWidth: number;
}>;

export type LogoShape =
  // Path data stays in font units; draw it at (x, y) scaled by the scene scale.
  | Readonly<{ kind: "path"; d: string; paint: LogoPaint; role: string; x: number; y: number }>
  | Readonly<{ kind: "circle"; cx: number; cy: number; paint: LogoPaint; r: number; role: string }>
  | Readonly<{
      kind: "rect";
      height: number;
      paint: LogoPaint;
      radius: number;
      role: string;
      width: number;
      x: number;
      y: number;
    }>;

export type LogoRect = Readonly<{ height: number; width: number; x: number; y: number }>;

export type LogoScene = Readonly<{
  bounds: LogoRect;
  scale: number;
  shapes: readonly LogoShape[];
}>;

const letterSpacing = -50;
// Vertical center of a one-em line box, used to align marks beside the word.
const lineCenter = -330;

function fill(color: string, opacity = 1): LogoPaint {
  return { fill: color, opacity, stroke: null, strokeWidth: 0 };
}

function outline(color: string, width: number, opacity: number): LogoPaint {
  return { fill: null, opacity, stroke: color, strokeWidth: width };
}

type Builder = {
  extend(x0: number, y0: number, x1: number, y1: number): void;
  push(shape: LogoShape): void;
  shapes: LogoShape[];
  word(text: string, x: number, paint: LogoPaint, role?: string, dx?: number, dy?: number): number;
};

function createBuilder(): Builder & { box: [number, number, number, number] } {
  const box: [number, number, number, number] = [Infinity, Infinity, -Infinity, -Infinity];
  const builder = {
    box,
    extend(x0: number, y0: number, x1: number, y1: number) {
      box[0] = Math.min(box[0], x0);
      box[1] = Math.min(box[1], y0);
      box[2] = Math.max(box[2], x1);
      box[3] = Math.max(box[3], y1);
    },
    push(shape: LogoShape) {
      builder.shapes.push(shape);
      const pad = shape.paint.stroke ? shape.paint.strokeWidth / 2 : 0;
      if (shape.kind === "circle") {
        builder.extend(shape.cx - shape.r, shape.cy - shape.r, shape.cx + shape.r, shape.cy + shape.r);
      } else if (shape.kind === "rect") {
        builder.extend(shape.x, shape.y, shape.x + shape.width, shape.y + shape.height);
      } else {
        const glyph = logoGlyphs[shape.role.split(":")[1] ?? ""];
        if (glyph) {
          const [x0, y0, x1, y1] = glyph.bounds;
          builder.extend(shape.x + x0 - pad, shape.y + y0 - pad, shape.x + x1 + pad, shape.y + y1 + pad);
        }
      }
    },
    shapes: [] as LogoShape[],
    word(text: string, x: number, paint: LogoPaint, role = "word", dx = 0, dy = 0) {
      let cursor = x;
      let previous = "";
      for (const char of text) {
        const glyph = logoGlyphs[char];
        if (!glyph) continue;
        cursor += logoKerning[previous + char] ?? 0;
        builder.push({ d: glyph.path, kind: "path", paint, role: `${role}:${char}`, x: cursor + dx, y: dy });
        cursor += glyph.advance + letterSpacing;
        previous = char;
      }
      return cursor;
    },
  };
  return builder;
}

function advanceOf(char: string) {
  return (logoGlyphs[char]?.advance ?? 0) + letterSpacing;
}

const eyeSpots: Record<LogoLook, readonly [number, number]> = {
  cross: [0.36, 0.36],
  down: [0.22, 0.42],
  left: [0.04, 0.2],
  right: [0.42, 0.2],
  up: [0.22, 0.04],
};

function buildSoloDot(b: Builder, s: LogoSettings) {
  const d = 520 * (s.dotSize / 100);
  let x = advanceOf("s");
  b.word("s", 0, fill(s.ink));
  x += 10;
  b.push({ cx: x + d / 2, cy: -d / 2, kind: "circle", paint: fill(s.accent), r: d / 2, role: "dot" });
  x += d + 35 + letterSpacing;
  b.word("lodac", x, fill(s.ink));
}

function buildEyeballs(b: Builder, s: LogoSettings) {
  const d = 520 * (s.dotSize / 100);
  const [px, py] = eyeSpots[s.look];
  const eye = (x: number, index: number) => {
    b.push({ cx: x + d / 2, cy: -d / 2, kind: "circle", paint: fill(s.ink), r: d / 2, role: `eye-${index}` });
    b.push({
      cx: x + px * d + d / 4,
      cy: -d + py * d + d / 4,
      kind: "circle",
      paint: fill(s.accent),
      r: d / 4,
      role: `pupil-${index}`,
    });
  };
  let x = b.word("s", 0, fill(s.ink)) + 10;
  eye(x, 1);
  x += d + 35 + letterSpacing;
  x = b.word("l", x, fill(s.ink)) + 10;
  eye(x, 2);
  x += d + 35 + letterSpacing;
  b.word("dac", x, fill(s.ink));
}

function buildSpotlight(b: Builder, s: LogoSettings) {
  const dot = 167;
  const gap = 125;
  const grid = dot * 5 + gap * 4;
  const top = lineCenter - grid / 2;
  for (let index = 0; index < 25; index += 1) {
    const lit = index === s.litDot - 1;
    const column = index % 5;
    const row = Math.floor(index / 5);
    b.push({
      cx: column * (dot + gap) + dot / 2,
      cy: top + row * (dot + gap) + dot / 2,
      kind: "circle",
      paint: lit ? fill(s.accent) : fill(s.ink, 0.16),
      r: dot / 2,
      role: lit ? "lit-dot" : `grid-dot-${index + 1}`,
    });
  }
  b.word("solodac", grid + 375, fill(s.ink));
}

const barPattern = [0.3, 0.55, 0.4, 1, 0.65, 0.35, 0.5];

function buildWaveform(b: Builder, s: LogoSettings) {
  const width = 115;
  const gap = 67;
  const full = 1154;
  for (let index = 0; index < 7; index += 1) {
    const peak = index === s.peakBar - 1;
    const height = full * barPattern[(index - (s.peakBar - 1) + 3 + 7) % 7]!;
    b.push({
      height,
      kind: "rect",
      paint: fill(peak ? s.accent : s.ink),
      radius: width / 2,
      role: peak ? "peak-bar" : `bar-${index + 1}`,
      width,
      x: index * (width + gap),
      y: lineCenter - height / 2,
    });
  }
  b.word("solodac", 7 * width + 6 * gap + 288, fill(s.ink));
}

function buildEcho(b: Builder, s: LogoSettings) {
  const paints = [fill(s.accent), outline(s.accent, 18, 0.6), outline(s.accent, 18, 0.35)];
  for (let layer = s.echoCount; layer >= 1; layer -= 1) {
    b.word("solodac", 0, paints[layer - 1]!, `echo-${layer}`, 80 * layer, 160 * layer);
  }
  b.word("solodac", 0, fill(s.ink));
}

function buildPlayhead(b: Builder, s: LogoSettings) {
  const text = "solodac";
  const unit = 1000 / 112;
  let x = b.word(text.slice(0, s.playheadSlot), 0, fill(s.ink));
  x += 20;
  const top = 200 - 1000;
  const head = [
    [0, 0],
    [28, 0],
    [28, 14],
    [14, 26],
    [0, 14],
  ]
    .map(([px, py], index) => `${index === 0 ? "M" : "L"}${x + px! * unit} ${top + py! * unit}`)
    .join("") + "Z";
  b.push({ d: head, kind: "path", paint: fill(s.accent), role: "playhead-flag", x: 0, y: 0 });
  b.extend(x, top, x + 28 * unit, top + 26 * unit);
  b.push({
    height: 92 * unit,
    kind: "rect",
    paint: fill(s.accent),
    radius: 0,
    role: "playhead-line",
    width: 4 * unit,
    x: x + 12 * unit,
    y: top + 20 * unit,
  });
  x += 250 + 40 + letterSpacing;
  b.word(text.slice(s.playheadSlot), x, fill(s.ink));
}

const builders = {
  echo: buildEcho,
  eyeballs: buildEyeballs,
  playhead: buildPlayhead,
  "solo-dot": buildSoloDot,
  spotlight: buildSpotlight,
  waveform: buildWaveform,
} as const;

export function buildLogoScene(settings: LogoSettings): LogoScene {
  const builder = createBuilder();
  builders[settings.direction](builder, settings);
  const [x0, y0, x1, y1] = builder.box;
  const scale = settings.size / 1000;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const shapes = builder.shapes.map((shape): LogoShape => {
    const paint = { ...shape.paint, strokeWidth: shape.paint.strokeWidth * scale };
    if (shape.kind === "circle") {
      return { ...shape, cx: (shape.cx - cx) * scale, cy: (shape.cy - cy) * scale, paint, r: shape.r * scale };
    }
    if (shape.kind === "rect") {
      return {
        ...shape,
        height: shape.height * scale,
        paint,
        radius: shape.radius * scale,
        width: shape.width * scale,
        x: (shape.x - cx) * scale,
        y: (shape.y - cy) * scale,
      };
    }
    // Path strokes scale with the path transform, so keep font-unit widths.
    return { ...shape, x: (shape.x - cx) * scale, y: (shape.y - cy) * scale };
  });
  return {
    bounds: {
      height: (y1 - y0) * scale,
      width: (x1 - x0) * scale,
      x: (x0 - cx) * scale,
      y: (y0 - cy) * scale,
    },
    scale,
    shapes,
  };
}

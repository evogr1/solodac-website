import type { LogoPaint, LogoScene, LogoShape } from "./logo-geometry";

type SvgElementSpec = Readonly<{
  attributes: Readonly<Record<string, string>>;
  tag: "circle" | "path" | "rect";
}>;

function round(value: number) {
  return String(Math.round(value * 1000) / 1000);
}

function paintAttributes(paint: LogoPaint): Record<string, string> {
  return {
    fill: paint.fill ?? "none",
    ...(paint.opacity < 1 ? { opacity: round(paint.opacity) } : {}),
    ...(paint.stroke
      ? { stroke: paint.stroke, "stroke-linejoin": "round", "stroke-width": round(paint.strokeWidth) }
      : {}),
  };
}

/** One shared SVG description used by the live preview and the SVG export. */
export function describeLogoShape(shape: LogoShape, scale: number): SvgElementSpec {
  const role = { "data-logo-part": shape.role };
  if (shape.kind === "circle") {
    return {
      attributes: { ...role, cx: round(shape.cx), cy: round(shape.cy), r: round(shape.r), ...paintAttributes(shape.paint) },
      tag: "circle",
    };
  }
  if (shape.kind === "rect") {
    return {
      attributes: {
        ...role,
        height: round(shape.height),
        width: round(shape.width),
        x: round(shape.x),
        y: round(shape.y),
        ...(shape.radius > 0 ? { rx: round(shape.radius) } : {}),
        ...paintAttributes(shape.paint),
      },
      tag: "rect",
    };
  }
  return {
    attributes: {
      ...role,
      d: shape.d,
      transform: `translate(${round(shape.x)} ${round(shape.y)}) scale(${round(scale)})`,
      ...paintAttributes(shape.paint),
    },
    tag: "path",
  };
}

const svgNamespace = "http://www.w3.org/2000/svg";

// Follows the documented svgExportRenderer pattern (setup-export.md, SVG Export).
export function appendLogoSvg(container: SVGGElement, scene: LogoScene) {
  for (const shape of scene.shapes) {
    const spec = describeLogoShape(shape, scene.scale);
    const element = container.ownerDocument.createElementNS(svgNamespace, spec.tag);
    for (const [name, value] of Object.entries(spec.attributes)) {
      element.setAttribute(name, value);
    }
    container.append(element);
  }
}

function applyPaint(context: CanvasRenderingContext2D, path: Path2D, paint: LogoPaint, strokeScale: number) {
  context.globalAlpha = paint.opacity;
  if (paint.fill) {
    context.fillStyle = paint.fill;
    context.fill(path);
  }
  if (paint.stroke) {
    context.strokeStyle = paint.stroke;
    context.lineJoin = "round";
    context.lineWidth = paint.strokeWidth * strokeScale;
    context.stroke(path);
  }
}

/** Draws the logo in scene coordinates on a runtime-supplied 2D context. */
export function drawLogo(context: CanvasRenderingContext2D, scene: LogoScene) {
  for (const shape of scene.shapes) {
    context.save();
    if (shape.kind === "circle") {
      const path = new Path2D();
      path.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
      applyPaint(context, path, shape.paint, 1);
    } else if (shape.kind === "rect") {
      const path = new Path2D();
      path.roundRect(shape.x, shape.y, shape.width, shape.height, shape.radius);
      applyPaint(context, path, shape.paint, 1);
    } else {
      context.translate(shape.x, shape.y);
      context.scale(scene.scale, scene.scale);
      applyPaint(context, new Path2D(shape.d), shape.paint, 1);
    }
    context.restore();
  }
}

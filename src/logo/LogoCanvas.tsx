import * as React from "react";

import { useToolcraftProductSceneFrame, useToolcraftSelector } from "@/toolcraft/runtime/react";

import { buildLogoScene } from "./logo-geometry";
import { describeLogoShape } from "./logo-render";
import { readLogoSettings } from "./logo-settings";
import styles from "./logo-canvas.module.css";

const reactAttributeNames: Record<string, string> = {
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
};

function toReactProps(attributes: Readonly<Record<string, string>>) {
  return Object.fromEntries(
    Object.entries(attributes).map(([name, value]) => [reactAttributeNames[name] ?? name, value]),
  );
}

export function LogoCanvas() {
  const frame = useToolcraftProductSceneFrame();
  const values = useToolcraftSelector((state) => state.values);
  const settings = React.useMemo(() => readLogoSettings(values), [values]);
  const scene = React.useMemo(() => buildLogoScene(settings), [settings]);

  if (frame.kind !== "ready") return null;
  const { rect } = frame;

  return (
    <svg
      aria-label="SoloDac logo"
      className={styles.output}
      data-logo-direction={settings.direction}
      data-testid="logo-output"
      data-toolcraft-product-output=""
      height={rect.height}
      role="img"
      viewBox={`${rect.x} ${rect.y} ${rect.width} ${rect.height}`}
      width={rect.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {scene.shapes.map((shape, index) => {
        const spec = describeLogoShape(shape, scene.scale);
        const props = { key: `${shape.role}-${index}`, ...toReactProps(spec.attributes) };
        if (spec.tag === "circle") return <circle {...props} />;
        if (spec.tag === "rect") return <rect {...props} />;
        return <path {...props} />;
      })}
    </svg>
  );
}

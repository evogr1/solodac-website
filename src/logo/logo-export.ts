import type {
  ToolcraftProductExportRenderer,
  ToolcraftProductSceneBoundsProvider,
  ToolcraftProductSvgExportRenderer,
} from "@/toolcraft/runtime";

import { buildLogoScene } from "./logo-geometry";
import { appendLogoSvg, drawLogo } from "./logo-render";
import { readLogoSettingsFromState } from "./logo-settings";

export const logoSceneBounds: ToolcraftProductSceneBoundsProvider = ({ state }) => [
  buildLogoScene(readLogoSettingsFromState(state)).bounds,
];

export const logoRasterExport: ToolcraftProductExportRenderer = {
  baseFileName: "solodac-logo",
  renderFrame: ({ context, signal, state }) => {
    signal.throwIfAborted();
    drawLogo(context, buildLogoScene(readLogoSettingsFromState(state)));
  },
};

export const logoSvgExport: ToolcraftProductSvgExportRenderer = {
  baseFileName: "solodac-logo",
  renderFrame: ({ container, signal, state }) => {
    signal.throwIfAborted();
    appendLogoSvg(container, buildLogoScene(readLogoSettingsFromState(state)));
  },
};

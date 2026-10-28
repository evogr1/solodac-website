import { composeToolcraftApp } from "@/toolcraft/runtime/react";

import { LogoCanvas } from "../logo/LogoCanvas";
import { logoRasterExport, logoSceneBounds, logoSvgExport } from "../logo/logo-export";
import { appSchema } from "./app-schema";

export const appComposition = composeToolcraftApp(appSchema, {
  scene: {
    canvasContent: <LogoCanvas />,
    rasterFrameRenderer: logoRasterExport,
    renderDefaultCanvasMedia: false,
    sceneBoundsProvider: logoSceneBounds,
    vectorFrameRenderer: logoSvgExport,
  },
});

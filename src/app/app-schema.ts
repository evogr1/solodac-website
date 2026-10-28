import {
  canvasEditingModule,
  defineToolcraft,
  imageExportModule,
  svgExportModule,
} from "@/toolcraft/runtime";

import { backgroundControls, logoControls } from "../logo/logo-controls";
import appDefaults from "./app-defaults.json" with { type: "json" };
import { appIdentity } from "./app-identity";

export const appSchema = defineToolcraft({
  defaults: appDefaults,
  base: {
    canvas: {
      draggable: true,
      enabled: true,
      size: { height: 1080, unit: "px", width: 1920 },
      sizing: { mode: "editable-output" },
      upload: false,
    },
    identity: appIdentity,
    panels: {
      controls: {
        sections: [
          { controls: backgroundControls, id: "background", title: "Background" },
          { controls: logoControls, id: "logo", title: "Logo" },
        ],
        title: "Controls",
      },
    },
    toolbar: {
      history: true,
      radar: true,
      theme: true,
      zoom: true,
    },
  },
  modules: [canvasEditingModule(), imageExportModule(), svgExportModule()],
});

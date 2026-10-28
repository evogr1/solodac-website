import type {
  ToolcraftComponentAcceptance,
  ToolcraftControlSectionInventoryEntry,
  ToolcraftProductReadiness,
  ToolcraftTransferMode,
} from "./acceptance/types";
import { appSchema } from "./app-schema";
import { logoControls } from "../logo/logo-controls";
import { logoReadiness, logoSectionInventory, logoTransferMode } from "../logo/logo-inventory";

export const appTransferMode: ToolcraftTransferMode = logoTransferMode;

export const appProductReadiness: ToolcraftProductReadiness = logoReadiness;

// Product entries use the same explicit stable section IDs as appSchema.
export const appControlSectionInventory: readonly ToolcraftControlSectionInventoryEntry[] =
  logoSectionInventory;

type Budget = "extended-io" | "standard";

function browser(testName: string, file: string, budget: Budget = "standard") {
  return { budget, file: file as `e2e/${string}.spec.ts`, testName };
}

const controlsSpec = "e2e/product-logo-controls.spec.ts";
const exportSpec = "e2e/product-logo-export.spec.ts";
const workspaceSpec = "e2e/product-logo-workspace.spec.ts";

const optionCoverage: Partial<Record<string, readonly string[]>> = {
  "logo.direction": logoControls.direction.options.map((option) => option.value),
  "logo.look": logoControls.look.options.map((option) => option.value),
};

const controlRows: ToolcraftComponentAcceptance[] = Object.values(logoControls).map((control) => ({
  automated: true,
  automatedTestName: `logo control ${control.target} changes the logo`,
  browser: browser(`browser: logo control ${control.target}`, controlsSpec),
  componentType: control.type,
  evidence: "product-output",
  expectedObservable: "The logo vector output on the canvas changes to match the new value.",
  fixture: "Default Solo dot logo, switched to the direction that shows this control.",
  id: control.target,
  interactionId: `${control.target}-property`,
  kind: "control",
  target: control.target,
  userAction: `Change ${control.label} through the real control.`,
  ...(optionCoverage[control.target] ? { optionCoverage: optionCoverage[control.target] } : {}),
}));

export const appAcceptance: readonly ToolcraftComponentAcceptance[] = [
  ...controlRows,
  {
    automated: true,
    automatedTestName: "logo background color reaches the runtime background",
    browser: browser("browser: logo background color changes output", workspaceSpec),
    componentType: "color",
    evidence: "product-output",
    expectedObservable: "The canvas background behind the logo changes color.",
    fixture: "Default logo on the default ink background.",
    id: "appearance.background",
    interactionId: "appearance.background-property",
    kind: "control",
    target: "appearance.background",
    userAction: "Type a new Background color.",
  },
  {
    automated: true,
    automatedTestName: "logo background switch controls output alpha",
    backgroundOutputCoverage: "all-required-background-output",
    browser: browser("browser: logo background output follows runtime semantics", workspaceSpec, "extended-io"),
    componentType: "switch",
    evidence: "product-output",
    expectedObservable: "Turning Background off removes the preview fill and makes PNG export transparent.",
    fixture: "Default logo with a 2K PNG export.",
    id: "background.output",
    interactionId: "export.includeBackground-property",
    kind: "control",
    target: "export.includeBackground",
    userAction: "Toggle Background and export PNG.",
  },
  ...(["format", "resolution"] as const).map(
    (key): ToolcraftComponentAcceptance => ({
      automated: true,
      automatedTestName: "logo export renderers draw every direction",
      browser: browser("browser: logo image export delivers all formats and sizes", exportSpec, "extended-io"),
      componentType: "select",
      evidence: "exported-bytes",
      expectedObservable: "Each format and resolution downloads a decodable file of the selected type and size.",
      fixture: "Default Solo dot logo.",
      id: `export.image.${key}`,
      kind: "control",
      optionCoverage: key === "format" ? ["png", "jpg", "svg"] : ["2k", "4k", "8k"],
      target: `export.image.${key}`,
      userAction: `Pick every ${key} option and export.`,
    }),
  ),
  {
    actionCoverage: ["export.png"],
    automated: true,
    automatedTestName: "logo export renderers draw every direction",
    browser: browser("browser: logo image export delivers all formats and sizes", exportSpec, "extended-io"),
    componentType: "panelActions",
    evidence: "exported-bytes",
    exportArtifactCoverage: "all-required-image-export-behavior",
    expectedObservable: "PNG and JPG downloads contain the logo at the selected size.",
    fixture: "Default Solo dot logo.",
    id: "export.image",
    infinityCanvasCoverage: "scene-bounds-image-export",
    kind: "runtime",
    target: "export.image",
    userAction: "Click Export PNG and Export JPG.",
  },
  {
    actionCoverage: ["export.svg"],
    automated: true,
    automatedTestName: "logo svg export appends outlined vector shapes",
    browser: browser("browser: logo svg export delivers outlined vectors", exportSpec, "extended-io"),
    componentType: "panelActions",
    evidence: "exported-bytes",
    exportArtifactCoverage: "all-required-svg-export-behavior",
    expectedObservable: "The SVG download holds outlined logo paths with no fonts, images or scripts.",
    fixture: "Default Solo dot logo.",
    id: "export.svg",
    kind: "runtime",
    target: "export.svg",
    userAction: "Select SVG and click Export SVG.",
  },
  {
    automated: true,
    automatedTestName: "logo scene bounds follow the logo size",
    browser: browser("browser: logo canvas sizing keeps the logo centered", workspaceSpec),
    componentType: "canvas-size",
    evidence: "product-output",
    expectedObservable: "Changing the canvas width changes the artboard while the logo stays centered.",
    fixture: "Default logo in finite mode.",
    id: "canvas.size",
    kind: "runtime",
    target: "canvas.size.width",
    userAction: "Edit Canvas width.",
  },
  {
    automated: true,
    automatedTestName: "logo scene bounds follow the logo size",
    browser: browser("browser: logo infinity preserves scene and viewport", workspaceSpec, "extended-io"),
    componentType: "switch",
    evidence: "viewport-side-effect",
    expectedObservable: "Infinity canvas keeps the logo, view and renderer identity, and restores the artboard when turned off.",
    fixture: "Default logo.",
    id: "canvas.infinity",
    infinityCanvasCoverage: "mode-continuity-and-restoration",
    kind: "runtime",
    target: "canvas.infinity",
    userAction: "Toggle Infinity canvas, pan, reload, undo and redo.",
  },
  {
    automated: true,
    automatedTestName: "logo settings read persisted values",
    browser: browser("browser: logo restores settings and workspace after reload", workspaceSpec, "extended-io"),
    componentType: "persistence",
    evidence: "persistence-state",
    expectedObservable: "Logo settings, canvas size, zoom and the Controls panel position survive a reload.",
    fixture: "Edited logo and workspace.",
    id: "persistence.reload",
    kind: "runtime",
    persistenceCoverage: "reload",
    persistenceSlices:
      appSchema.persistence.storage === "localStorage" ? appSchema.persistence.include : [],
    target: "canvas.size.width",
    userAction: "Edit the logo and workspace, wait for the save, and reload.",
  },
];

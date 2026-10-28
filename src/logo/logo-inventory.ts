import type {
  ToolcraftControlSectionInventoryEntry,
  ToolcraftProductReadiness,
  ToolcraftTransferMode,
} from "../app/acceptance/types";
import { logoControlTargets } from "./logo-controls";
import { logoTargets } from "./logo-settings";

const svgRequest = {
  messageRef:
    "https://claude.ai/code/session_01FRUWwX2dUTqrzCwFucLUDV (user reply to the logo builder offer that listed PNG and SVG export)",
  messageText: "build it",
  quote: "build it",
  source: "user-message",
} as const;

export const logoSectionInventory = [
  {
    entity: "Output background",
    entityId: "background",
    finiteSelectors: [
      {
        reason: "Controls the preview fill and PNG/SVG transparency; the color stays editable in both states.",
        role: "parameter",
        target: "export.includeBackground",
      },
    ],
    groupingReason: "One output background; runtime relocates this source pair into Settings.",
    id: "background",
    targets: ["export.includeBackground", logoTargets.background],
    title: "Background",
  },
  {
    entity: "SoloDac logo",
    entityId: "logo",
    finiteSelectors: [
      {
        affectedTargets: [logoTargets.size, logoTargets.ink, logoTargets.accent],
        reason: "Direction swaps the logo construction and the parameter that tunes it.",
        role: "branch",
        target: logoTargets.direction,
      },
      {
        reason: "Moves the pupils inside both eyes without gating any other control.",
        role: "parameter",
        target: logoTargets.look,
      },
      {
        reason: "Picks which grid dot is lit.",
        role: "parameter",
        target: logoTargets.litDot,
      },
      {
        reason: "Picks which waveform bar peaks.",
        role: "parameter",
        target: logoTargets.peakBar,
      },
      {
        reason: "Sets how many echo copies trail the wordmark.",
        role: "parameter",
        target: logoTargets.echoCount,
      },
      {
        reason: "Moves the playhead between letters.",
        role: "parameter",
        target: logoTargets.playheadSlot,
      },
    ],
    groupingReason:
      "Every control edits the one logo on the canvas and shares one reset scope; each direction shows only the parameter that tunes it.",
    id: "logo",
    targets: logoControlTargets,
    title: "Logo",
  },
  {
    entity: "Image and SVG output",
    entityId: "image-export",
    finiteSelectors: [
      { reason: "Selects PNG alpha, opaque JPEG or editable SVG output.", role: "parameter", target: "export.image.format" },
      { reason: "Selects the raster long-edge size.", role: "parameter", target: "export.image.resolution" },
    ],
    groupingReason: "Runtime-owned format and resolution govern one exported artifact.",
    id: "runtime.image-export",
    targets: ["export.image.format", "export.image.resolution"],
    title: "Image Export",
  },
] as const satisfies readonly ToolcraftControlSectionInventoryEntry[];

const panelTargets = ["export.includeBackground", logoTargets.background, ...logoControlTargets];

export const logoReadiness: ToolcraftProductReadiness = {
  exportIntent: {
    image: { mode: "toolcraft-default" },
    svg: { evidence: svgRequest, mode: "user-requested" },
    video: { mode: "not-requested" },
  },
  interactionOwnership: panelTargets.map((target) => ({
    alternative: {
      reason: "On-canvas chrome would cover the logo being judged.",
      surface: "canvas" as const,
    },
    capability: "property-edit" as const,
    evidence: {
      detail: "The logo is a single global entity; every setting is a whole-logo property with no spatial handle.",
      source: "usability-analysis" as const,
    },
    id: `${target}-property`,
    reason: "Panel controls keep the canvas clean for judging the mark.",
    selectionScope: { mode: "global" as const },
    surface: "panel" as const,
    target,
  })),
  mode: "product",
  productName: "SoloDac Logo Builder",
  productSummary:
    "Tune the six shortlisted SoloDac logo directions and export them as PNG, JPG or outlined SVG.",
  requestedBehavior:
    "One canvas with a switch between the logo directions, sliders for the mark details, wordmark and accent colors, a background toggle, and PNG and SVG export.",
  viewInteraction: {
    mode: "non-spatial",
    reason: "The logo is flat two-dimensional vector artwork with no three-dimensional scene.",
  },
};

export const logoTransferMode: ToolcraftTransferMode = {
  animationIntent: { mode: "none" },
  mode: "new-toolcraft-app",
  referenceInputs: [],
};

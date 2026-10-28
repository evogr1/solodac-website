import type { ToolcraftControlSchema } from "@/toolcraft/runtime";

import { logoDefaults, logoDirections, logoLimits, logoLooks, logoTargets, type LogoDirection } from "./logo-settings";

const responsive = {
  keyframeable: false,
  performanceReason: "Rebuilds a few dozen vector shapes; cost does not grow with the value.",
  performanceRole: "responsiveness",
} as const;

const always = { applicability: { mode: "always" } } as const;

function onlyFor(...directions: LogoDirection[]) {
  return {
    applicability: {
      all: [{ oneOf: directions, target: logoTargets.direction }],
      mode: "conditional",
    },
  } as const;
}

export const backgroundControls = {
  color: {
    ...responsive,
    ...always,
    defaultValue: logoDefaults.background,
    label: "Background color",
    target: logoTargets.background,
    type: "color",
  },
  include: {
    ...responsive,
    ...always,
    defaultValue: true,
    label: "Background",
    target: "export.includeBackground",
    type: "switch",
  },
} as const satisfies Record<string, ToolcraftControlSchema>;

export const logoControls = {
  direction: {
    ...responsive,
    ...always,
    defaultValue: logoDefaults.direction,
    label: "Direction",
    options: logoDirections,
    target: logoTargets.direction,
    type: "select",
  },
  size: {
    ...responsive,
    ...always,
    defaultValue: logoDefaults.size,
    label: "Size",
    max: logoLimits.size.max,
    min: logoLimits.size.min,
    sliderValueKind: "continuous",
    step: 1,
    target: logoTargets.size,
    type: "slider",
    unit: "px",
  },
  ink: {
    ...responsive,
    ...always,
    defaultValue: logoDefaults.ink,
    label: "Wordmark",
    semanticGroup: "logo-colors",
    target: logoTargets.ink,
    type: "color",
  },
  accent: {
    ...responsive,
    ...always,
    defaultValue: logoDefaults.accent,
    label: "Accent",
    semanticGroup: "logo-colors",
    target: logoTargets.accent,
    type: "color",
  },
  dotSize: {
    ...responsive,
    ...onlyFor("solo-dot", "eyeballs"),
    defaultValue: logoDefaults.dotSize,
    description: "Size of the dot or eyes relative to the brand default.",
    label: "Dot size",
    max: logoLimits.dotSize.max,
    min: logoLimits.dotSize.min,
    sliderValueKind: "continuous",
    step: 1,
    target: logoTargets.dotSize,
    type: "slider",
    unit: "%",
  },
  look: {
    ...responsive,
    ...onlyFor("eyeballs"),
    defaultValue: logoDefaults.look,
    label: "Pupils",
    options: logoLooks,
    target: logoTargets.look,
    type: "select",
  },
  litDot: {
    ...responsive,
    ...onlyFor("spotlight"),
    defaultValue: logoDefaults.litDot,
    description: "Which of the 25 grid dots is lit, counted left to right, top to bottom.",
    label: "Lit dot",
    max: logoLimits.litDot.max,
    min: logoLimits.litDot.min,
    sliderValueKind: "discrete",
    step: 1,
    target: logoTargets.litDot,
    type: "slider",
    variant: "discrete",
  },
  peakBar: {
    ...responsive,
    ...onlyFor("waveform"),
    defaultValue: logoDefaults.peakBar,
    description: "Which of the seven bars peaks in the accent color.",
    label: "Peak bar",
    max: logoLimits.peakBar.max,
    min: logoLimits.peakBar.min,
    sliderValueKind: "discrete",
    step: 1,
    target: logoTargets.peakBar,
    type: "slider",
    variant: "discrete",
  },
  echoCount: {
    ...responsive,
    ...onlyFor("echo"),
    defaultValue: logoDefaults.echoCount,
    description: "How many offset copies trail behind the wordmark.",
    label: "Echoes",
    max: logoLimits.echoCount.max,
    min: logoLimits.echoCount.min,
    sliderValueKind: "discrete",
    step: 1,
    target: logoTargets.echoCount,
    type: "slider",
    variant: "discrete",
  },
  playheadSlot: {
    ...responsive,
    ...onlyFor("playhead"),
    defaultValue: logoDefaults.playheadSlot,
    description: "How many letters come before the playhead.",
    label: "Playhead",
    max: logoLimits.playheadSlot.max,
    min: logoLimits.playheadSlot.min,
    sliderValueKind: "discrete",
    step: 1,
    target: logoTargets.playheadSlot,
    type: "slider",
    variant: "discrete",
  },
} as const satisfies Record<string, ToolcraftControlSchema>;

export const logoControlTargets = Object.values(logoControls).map((control) => control.target);

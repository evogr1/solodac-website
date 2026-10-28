export const logoTargets = {
  accent: "logo.accent",
  background: "appearance.background",
  direction: "logo.direction",
  dotSize: "logo.dotSize",
  echoCount: "logo.echoCount",
  ink: "logo.ink",
  litDot: "logo.litDot",
  look: "logo.look",
  peakBar: "logo.peakBar",
  playheadSlot: "logo.playheadSlot",
  size: "logo.size",
} as const;

export const logoDirections = [
  { label: "Solo dot", value: "solo-dot" },
  { label: "Eyeballs", value: "eyeballs" },
  { label: "Spotlight", value: "spotlight" },
  { label: "The DAC", value: "waveform" },
  { label: "Repost echo", value: "echo" },
  { label: "Playhead", value: "playhead" },
] as const;

export type LogoDirection = (typeof logoDirections)[number]["value"];

export const logoLooks = [
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
  { label: "Up", value: "up" },
  { label: "Down", value: "down" },
  { label: "Cross-eyed", value: "cross" },
] as const;

export type LogoLook = (typeof logoLooks)[number]["value"];

export const logoDefaults = {
  accent: "#FF5A1F",
  background: "#0B0B0C",
  direction: "solo-dot" as LogoDirection,
  dotSize: 100,
  echoCount: 3,
  ink: "#F4F1EA",
  litDot: 19,
  look: "right" as LogoLook,
  peakBar: 4,
  playheadSlot: 4,
  size: 240,
} as const;

export const logoLimits = {
  dotSize: { max: 140, min: 60 },
  echoCount: { max: 3, min: 1 },
  litDot: { max: 25, min: 1 },
  peakBar: { max: 7, min: 1 },
  playheadSlot: { max: 6, min: 1 },
  size: { max: 600, min: 40 },
} as const;

export type LogoSettings = Readonly<{
  accent: string;
  direction: LogoDirection;
  dotSize: number;
  echoCount: number;
  ink: string;
  litDot: number;
  look: LogoLook;
  peakBar: number;
  playheadSlot: number;
  size: number;
}>;

function readString(values: Readonly<Record<string, unknown>>, target: string, fallback: string) {
  const value = values[target];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function readNumber(
  values: Readonly<Record<string, unknown>>,
  target: string,
  fallback: number,
  limits: Readonly<{ max: number; min: number }>,
) {
  const value = values[target];
  const number = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.min(limits.max, Math.max(limits.min, number));
}

function readOption<T extends string>(
  values: Readonly<Record<string, unknown>>,
  target: string,
  options: readonly Readonly<{ value: T }>[],
  fallback: T,
): T {
  const value = values[target];
  return options.some((option) => option.value === value) ? (value as T) : fallback;
}

export function readLogoSettings(values: Readonly<Record<string, unknown>>): LogoSettings {
  return {
    accent: readString(values, logoTargets.accent, logoDefaults.accent),
    direction: readOption(values, logoTargets.direction, logoDirections, logoDefaults.direction),
    dotSize: readNumber(values, logoTargets.dotSize, logoDefaults.dotSize, logoLimits.dotSize),
    echoCount: Math.round(
      readNumber(values, logoTargets.echoCount, logoDefaults.echoCount, logoLimits.echoCount),
    ),
    ink: readString(values, logoTargets.ink, logoDefaults.ink),
    litDot: Math.round(readNumber(values, logoTargets.litDot, logoDefaults.litDot, logoLimits.litDot)),
    look: readOption(values, logoTargets.look, logoLooks, logoDefaults.look),
    peakBar: Math.round(readNumber(values, logoTargets.peakBar, logoDefaults.peakBar, logoLimits.peakBar)),
    playheadSlot: Math.round(
      readNumber(values, logoTargets.playheadSlot, logoDefaults.playheadSlot, logoLimits.playheadSlot),
    ),
    size: readNumber(values, logoTargets.size, logoDefaults.size, logoLimits.size),
  };
}

export function readLogoSettingsFromState(state: Readonly<{ values: Readonly<Record<string, unknown>> }>): LogoSettings {
  return readLogoSettings(state.values);
}

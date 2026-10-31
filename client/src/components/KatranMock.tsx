// A drawn editor window used on Home and the Katran page. Pure markup, no screenshots.
const tracks = [
  { label: "V1", clips: [[0, 22], [23, 41], [42, 70], [71, 100]], tone: "bg-signal/80" },
  { label: "CC", clips: [[2, 18], [20, 38], [40, 58], [60, 79], [81, 98]], tone: "bg-paper/70" },
  { label: "A1", clips: [[0, 100]], tone: "bg-paper/20" },
  { label: "M1", clips: [[0, 64], [66, 100]], tone: "bg-signal-soft/40" },
];

export default function KatranMock() {
  return (
    <div className="relative rounded-2xl border border-paper/10 bg-ink-2 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-4">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/15" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">katran · long-form</div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" /> rendering
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-ink-3 via-ink to-ink-3">
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="glow absolute -bottom-10 left-1/3 h-40 w-40" />
          <div className="absolute inset-x-0 bottom-5 text-center">
            <span className="rounded bg-ink/80 px-2 py-1 font-display text-sm text-paper sm:text-lg">
              He sold it for <span className="text-signal">₹40 crore</span>.
            </span>
          </div>
          <div className="absolute left-3 top-3 font-mono text-[10px] text-paper/40">00:04:12 / 00:11:38</div>
        </div>

        <div className="hidden flex-col gap-2 sm:flex">
          {["Script matched", "Footage found · 64 clips", "Captions synced", "Music ducked", "Style: Documentary"].map((step, index) => (
            <div key={step} className="flex items-center gap-2 rounded-lg border border-paper/10 px-3 py-2 text-xs text-paper/70">
              <span className={index < 4 ? "text-signal" : "text-paper/30"}>{index < 4 ? "✓" : "○"}</span>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-3 space-y-1.5 overflow-hidden rounded-xl bg-ink p-3">
        {tracks.map((track) => (
          <div key={track.label} className="flex items-center gap-2">
            <span className="w-6 font-mono text-[9px] text-paper/35">{track.label}</span>
            <div className="relative h-4 flex-1">
              {track.clips.map(([start, end]) => (
                <span
                  key={start}
                  className={`absolute top-0 h-full rounded-[3px] ${track.tone}`}
                  style={{ left: `${start}%`, width: `${end - start}%` }}
                />
              ))}
            </div>
          </div>
        ))}
        <span className="scan-head pointer-events-none absolute bottom-0 left-11 top-0 w-px bg-paper" style={{ ["--scan-distance" as string]: "min(80vw, 640px)" }} />
      </div>
    </div>
  );
}

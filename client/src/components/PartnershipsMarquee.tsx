import { useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

export type Partner = {
  name: string;
  role: string;
  stat: string;
  statLabel: string;
  image?: string;
  imageFit?: "cover" | "logo";
  video?: string;
  href?: string;
};

function PartnerCard({ partner }: { partner: Partner }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setPlaying(true);
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  const handleClick = () => {
    if (partner.video) {
      if (playing) stop();
      else play();
    } else if (partner.href) {
      window.open(partner.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={handleClick}
      className="group relative aspect-[3/4] w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#15181a] sm:w-[260px]"
    >
      {partner.video ? (
        <video
          ref={videoRef}
          src={partner.video}
          poster={partner.image}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : partner.image ? (
        partner.imageFit === "logo" ? (
          <div className="absolute inset-0 grid place-items-center">
            <img src={partner.image} alt="" className="h-28 w-28 rounded-full object-cover shadow-[0_0_60px_rgba(204,255,42,0.15)] transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32" />
          </div>
        ) : (
          <img src={partner.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(204,255,42,0.16),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,118,95,0.14),transparent_55%)]" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

      {!playing && partner.video && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-black/60 text-paper backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={16} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 px-4 pt-4">
        <div className="text-sm font-bold text-paper">
          {partner.name} <span className="font-medium text-white/50">- {partner.role}</span>
        </div>
        {partner.href && <ArrowUpRight size={16} className="shrink-0 text-white/40 transition-colors group-hover:text-lime" />}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
        <div className="font-display text-2xl font-black tracking-[-0.03em] text-paper sm:text-3xl">{partner.stat}</div>
        <div className="mt-1 text-[11px] font-medium text-white/60">{partner.statLabel}</div>
      </div>
    </div>
  );
}

export default function PartnershipsMarquee({ partners }: { partners: Partner[] }) {
  const track = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24" />
      <div className="marquee-track flex w-max gap-4 px-5 sm:gap-5 sm:px-8 lg:px-12">
        {track.map((partner, index) => (
          <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

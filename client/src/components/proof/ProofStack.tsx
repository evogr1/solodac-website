import { indianNumber } from "@/lib/format";
import { millionViewReels } from "@/lib/reels";
import { networkPages } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Three of our million-view reels, fanned out. Real covers, real counts. */
export function ReelFan({ className, order = [3, 2, 0] }: { className?: string; order?: [number, number, number] }) {
  const picks = order.map((index) => millionViewReels[index]!);
  const tilt = ["-rotate-[7deg] translate-y-3", "z-10", "rotate-[7deg] translate-y-3"];
  return (
    <figure className={cn("flex items-end justify-center", className)}>
      {picks.map((reel, index) => (
        <div key={reel.id} className={cn("-ml-8 w-[34%] max-w-[190px] first:ml-0", tilt[index])}>
          <div className="aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] ring-[3px] ring-ink">
            <img src={reel.poster} alt="" decoding="async" className="h-full w-full object-cover object-[50%_46%]" />
          </div>
          <div className="mt-3 text-center text-[13px] leading-snug text-paper/60 sm:text-[14px]">
            <span className="block font-semibold text-paper">{indianNumber(reel.views)}</span>
            views
          </div>
        </div>
      ))}
      <figcaption className="sr-only">Three reels from our own pages, with their view counts.</figcaption>
    </figure>
  );
}

/** The six named pages' logos, overlapping. */
export function LogoRow({ size = "md", className }: { size?: "md" | "lg"; className?: string }) {
  const box = size === "lg" ? "h-16 w-16 sm:h-24 sm:w-24 -ml-4 sm:-ml-6" : "h-12 w-12 -ml-3";
  return (
    <div className={cn("flex", className)}>
      {networkPages.map((page) => (
        <img key={page.handle} src={page.logo} alt={`${page.name} logo`} className={cn("rounded-full object-cover ring-[3px] ring-ink first:ml-0", box)} />
      ))}
    </div>
  );
}

// Every public page, with what search engines and link previews should show for it.
// Used by the app (document title and canonical link) and by scripts/prerender-meta.ts,
// which writes one HTML file per page so the right preview shows before any JavaScript runs.

export const siteUrl = "https://solodac.com";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Path of the 1200x630 preview image in client/public. */
  image: string;
};

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "SoloDac | We grow pages, channels and brands",
    description: "SoloDac grows YouTube channels, Instagram pages, newsletters and founder brands. We run our own pages every day, so we know what works. Now we run yours.",
    image: "/og.png",
  },
  {
    path: "/work",
    title: "Our work | SoloDac",
    description: "Successful Arcs, Archive of CEOs, Lucre, Indian Pragati and Bourse India. Pages SoloDac built and still runs, with their followers and their million-view reels.",
    image: "/og.png",
  },
  {
    path: "/services",
    title: "Services | SoloDac",
    description: "YouTube channels, Instagram pages, newsletters, editing, personal branding, partnerships, brand identity and websites. Everything a page needs, from one team.",
    image: "/og.png",
  },
  {
    path: "/network",
    title: "Our pages | SoloDac",
    description: "Successful Arcs, Archive of CEOs, Indian Pragati, Bourse India and Lucre. The pages SoloDac puts its name on, and how brands can reach their audiences.",
    image: "/og.png",
  },
  {
    path: "/katran",
    title: "Katran by SoloDac | The editor behind 12 crore views",
    description: "Katran turns long videos, voiceovers and topics into reels, YouTube videos and carousels. Our own pages post with it every day. Get early access.",
    image: "/og-katran.png",
  },
  {
    path: "/about",
    title: "About | SoloDac",
    description: "SoloDac is a media company that grows pages, channels and brands. Corporate office in Indore, regional offices in Chandigarh and Noida. We're hiring.",
    image: "/og.png",
  },
  {
    path: "/contact",
    title: "Book a call | SoloDac",
    description: "Tell us about your page, channel or brand. We reply within one working day with a time for a call.",
    image: "/og.png",
  },
  { path: "/privacy", title: "Privacy policy | SoloDac", description: "How SoloDac collects, uses and protects your personal information when you use solodac.com, hire us or join the Katran waitlist.", image: "/og.png" },
  { path: "/terms", title: "Terms of service | SoloDac", description: "The terms for using solodac.com, hiring SoloDac for services and using Katran, our editing software.", image: "/og.png" },
  { path: "/refunds", title: "Refunds and cancellation | SoloDac", description: "SoloDac's refund and cancellation policy for monthly services and for Katran, including how to ask for a refund.", image: "/og.png" },
];

export const pageByPath = (path: string) => pages.find((page) => page.path === path);

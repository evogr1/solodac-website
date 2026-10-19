import { Bot, Clapperboard, Code2, Megaphone, Palette, Search, Target, UserRound, Youtube } from "lucide-react";

export type Service = {
  number: string;
  slug: string;
  icon: typeof Bot;
  title: string;
  description: string;
  more: string;
  includes: string;
  tags: string[];
  color: string;
  href?: string;
};

const baseServices: Omit<Service, "number">[] = [
  {
    slug: "youtube-channels",
    icon: Youtube,
    title: "YouTube channel building",
    description: "Long-form channels for business owners: positioning, proper shoots, proper edits, and a funnel into your business.",
    more: "We build the channel end to end and point every video at your business.",
    includes: "Positioning · Shoot days · Editing · Packaging · Funnel",
    tags: ["Long-form", "Shoot & edit", "Funnel"],
    color: "coral",
    href: "/youtube",
  },
  {
    slug: "personal-branding",
    icon: UserRound,
    title: "Personal branding",
    description: "Founders are the most trusted channel a company has. We turn yours into one people actually follow.",
    more: "We find what you're genuinely worth listening to, then build it into a consistent presence across LinkedIn, X, Instagram and YouTube: positioning, content, ghostwriting, shoots and a posting rhythm you can keep. The goal isn't fame. It's being the obvious name when your market thinks about your category.",
    includes: "Positioning · Founder story · LinkedIn & X ghostwriting · Shoot days · Short & long-form video · Speaking & PR · Monthly reporting",
    tags: ["Founders", "LinkedIn", "Video"],
    color: "lime",
  },
  {
    slug: "rebranding",
    icon: Palette,
    title: "Rebranding & identity",
    description: "When the company has grown and the brand hasn't, people notice. We rebuild it so the outside matches what's inside.",
    more: "Strategy first, then the visible parts: name and messaging, logo and visual identity, brand guidelines, and a rollout across your website, socials and decks so the new brand actually lands instead of just existing in a PDF.",
    includes: "Brand strategy · Naming & messaging · Logo & identity · Brand guidelines · Website refresh · Social rollout · Pitch deck design",
    tags: ["Strategy", "Identity", "Rollout"],
    color: "violet",
  },
  {
    slug: "social-media-management",
    icon: Megaphone,
    title: "Social media systems",
    description:
      "Someone has to post the right thing, at the right time, in the right voice, every single day. That's the job we take off your plate.",
    more:
      "Most accounts go quiet because posting became a chore nobody owned. We own it: the calendar, the captions, the replies, the awkward Tuesday-afternoon Reel. You get a channel that actually looks run by someone, across Instagram, YouTube, and X, with a monthly read on what's working and what we're cutting.",
    includes: "Social strategy · Instagram management · YouTube channels · X / Twitter · Reels · Shorts · Community engagement · Reporting",
    tags: ["Instagram", "YouTube", "X / Twitter"],
    color: "lime",
  },
  {
    slug: "content-production",
    icon: Clapperboard,
    title: "Content production",
    description:
      "The clip that stops the scroll isn't luck. It's shot, cut, and paced to earn the next three seconds, over and over.",
    more:
      "A good idea filmed badly gets skipped. We shoot, edit, and pace content the way the platform actually rewards: hook first, no wasted frames, format matched to where it's going. Short-form, long-form, talking-head, campaign cutdowns: built to be watched, not just uploaded.",
    includes: "Reels · Shorts · YouTube videos · Social campaigns · Video editing · Motion graphics · Scripts · Content repurposing",
    tags: ["Video", "Reels", "Campaigns"],
    color: "blue",
  },
  {
    slug: "ai-content-generation",
    icon: Bot,
    title: "AI content studio",
    description:
      "AI writes the fast first draft. A person makes sure it still sounds like you and not like every other AI-written page on the internet.",
    more:
      "We use AI where it actually helps (speed, variations, first drafts, research) and a real editor everywhere else, so nothing ships with that flattened, slightly-off AI voice. Articles, website copy, captions, campaign lines: more output, same brand, no tell.",
    includes: "AI blog articles · Website copy · Social captions · SEO strategy · Campaign messaging · Brand voice · Repurposing",
    tags: ["AI workflows", "SEO content", "Brand voice"],
    color: "coral",
  },
  {
    slug: "web-development",
    icon: Code2,
    title: "Web & digital builds",
    description:
      "A site that loads fast, says one clear thing, and makes the next click obvious. Nothing fancier than that, nothing less either.",
    more:
      "Most sites fail at the basics: slow, unclear what they're selling, no obvious next step. We build ones that don't: fast pages, one clear message per screen, and a path to the thing you actually want visitors to do, whether that's a launch site, a landing page, or a full rebuild.",
    includes: "Business websites · Landing pages · Campaign microsites · Portfolio sites · Redesigns · Mobile UX · SEO-ready structure",
    tags: ["Websites", "Landing pages", "UX"],
    color: "paper",
  },
  {
    slug: "seo-search-visibility",
    icon: Search,
    title: "Search & visibility",
    description:
      "Most people don't discover brands by accident. They search for them. We make sure you show up as the answer.",
    more:
      "Traffic is easy to fake with the wrong keywords. We'd rather get you found by the people already looking to buy: through search, local listings, your Google Business Profile, and content built to answer the exact question someone typed in.",
    includes: "SEO strategy · Keyword research · Local SEO · Google Business Profile · On-page SEO · SEO content · Reporting",
    tags: ["SEO", "Local search", "Google"],
    color: "violet",
  },
  {
    slug: "performance-marketing",
    icon: Target,
    title: "Performance marketing",
    description:
      "Ads that get judged on revenue, not reach. We kill what isn't working fast and put the budget behind what is.",
    more:
      "A dashboard full of impressions doesn't pay rent. We plan and run paid campaigns on Meta and Google with the creative and the tracking built by the same team, so when a hook stops converting we know within days, not at the end of the quarter.",
    includes: "Campaign strategy · Meta ads · Google ads · Creative testing · Conversion tracking · Targeting · Landing-page optimization",
    tags: ["Meta", "Google", "Reporting"],
    color: "orange",
  },
];

const order = ["youtube-channels", "personal-branding", "rebranding", "web-development", "social-media-management", "content-production", "ai-content-generation", "seo-search-visibility", "performance-marketing"];

export const services: Service[] = order.map((slug, index) => {
  const service = baseServices.find((item) => item.slug === slug)!;
  return { ...service, number: String(index + 1).padStart(2, "0") };
});

export const servicePath = (service: Pick<Service, "slug" | "href">) => service.href ?? `/services/${service.slug}`;

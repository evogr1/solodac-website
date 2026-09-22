import { Bot, Clapperboard, Code2, Megaphone, Search, Target } from "lucide-react";

export const services = [
  {
    number: "01",
    slug: "social-media-management",
    icon: Megaphone,
    title: "Social media systems",
    description:
      "Someone has to post the right thing, at the right time, in the right voice, every single day. That's the job we take off your plate.",
    more:
      "Most accounts go quiet because posting became a chore nobody owned. We own it — the calendar, the captions, the replies, the awkward Tuesday-afternoon Reel. You get a channel that actually looks run by someone, across Instagram, YouTube, and X, with a monthly read on what's working and what we're cutting.",
    includes: "Social strategy · Instagram management · YouTube channels · X / Twitter · Reels · Shorts · Community engagement · Reporting",
    tags: ["Instagram", "YouTube", "X / Twitter"],
    color: "lime",
  },
  {
    number: "02",
    slug: "content-production",
    icon: Clapperboard,
    title: "Content production",
    description:
      "The clip that stops the scroll isn't luck. It's shot, cut, and paced to earn the next three seconds — over and over.",
    more:
      "A good idea filmed badly gets skipped. We shoot, edit, and pace content the way the platform actually rewards — hook first, no wasted frames, format matched to where it's going. Short-form, long-form, talking-head, campaign cutdowns: built to be watched, not just uploaded.",
    includes: "Reels · Shorts · YouTube videos · Social campaigns · Video editing · Motion graphics · Scripts · Content repurposing",
    tags: ["Video", "Reels", "Campaigns"],
    color: "blue",
  },
  {
    number: "03",
    slug: "ai-content-generation",
    icon: Bot,
    title: "AI content studio",
    description:
      "AI writes the fast first draft. A person makes sure it still sounds like you and not like every other AI-written page on the internet.",
    more:
      "We use AI where it actually helps — speed, variations, first drafts, research — and a real editor everywhere else, so nothing ships with that flattened, slightly-off AI voice. Articles, website copy, captions, campaign lines: more output, same brand, no tell.",
    includes: "AI blog articles · Website copy · Social captions · SEO strategy · Campaign messaging · Brand voice · Repurposing",
    tags: ["AI workflows", "SEO content", "Brand voice"],
    color: "coral",
  },
  {
    number: "04",
    slug: "web-development",
    icon: Code2,
    title: "Web & digital builds",
    description:
      "A site that loads fast, says one clear thing, and makes the next click obvious. Nothing fancier than that, nothing less either.",
    more:
      "Most sites fail at the basics: slow, unclear what they're selling, no obvious next step. We build ones that don't — fast pages, one clear message per screen, and a path to the thing you actually want visitors to do, whether that's a launch site, a landing page, or a full rebuild.",
    includes: "Business websites · Landing pages · Campaign microsites · Portfolio sites · Redesigns · Mobile UX · SEO-ready structure",
    tags: ["Websites", "Landing pages", "UX"],
    color: "paper",
  },
  {
    number: "05",
    slug: "seo-search-visibility",
    icon: Search,
    title: "Search & visibility",
    description:
      "Most people don't discover brands by accident — they search for them. We make sure you show up as the answer.",
    more:
      "Traffic is easy to fake with the wrong keywords. We'd rather get you found by the people already looking to buy — through search, local listings, your Google Business Profile, and content built to answer the exact question someone typed in.",
    includes: "SEO strategy · Keyword research · Local SEO · Google Business Profile · On-page SEO · SEO content · Reporting",
    tags: ["SEO", "Local search", "Google"],
    color: "violet",
  },
  {
    number: "06",
    slug: "performance-marketing",
    icon: Target,
    title: "Performance marketing",
    description:
      "Ads that get judged on revenue, not reach. We kill what isn't working fast and put the budget behind what is.",
    more:
      "A dashboard full of impressions doesn't pay rent. We plan and run paid campaigns on Meta and Google with the creative and the tracking built by the same team, so when a hook stops converting we know within days — not at the end of the quarter.",
    includes: "Campaign strategy · Meta ads · Google ads · Creative testing · Conversion tracking · Targeting · Landing-page optimization",
    tags: ["Meta", "Google", "Reporting"],
    color: "orange",
  },
];

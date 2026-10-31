import saLogo from "../assets/partners/successfularcs.jpg";
import aocLogo from "../assets/partners/archiveofceos.jpg";
import virodhLogo from "../assets/partners/virodh.jpg";
import bourseLogo from "../assets/partners/bourse.jpg";
import lucreLogo from "../assets/partners/lucre.jpg";

export const company = {
  tradeName: "SOLODAC",
  proprietor: "Harshil Rekhi",
  constitution: "Proprietorship",
  gstin: "23FNWPR3444D1ZO",
  email: "info@solodac.com",
  founderEmail: "harshil@solodac.com",
  locations: [
    { city: "Chandigarh", role: "Main base" },
    { city: "Noida", role: "Office" },
    { city: "Indore", role: "Registered office, Madhya Pradesh" },
  ],
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Network", href: "/network" },
  { label: "Katran", href: "/katran" },
  { label: "About", href: "/about" },
];

export type NetworkPage = {
  name: string;
  handle: string;
  category: string;
  tagline: string;
  followers: string;
  posts: string;
  logo: string;
};

// Real follower counts. These are the pages we put our name on, not the full roster.
export const networkPages: NetworkPage[] = [
  { name: "Successful Arcs", handle: "successfularcs", category: "Business", tagline: "Built for entrepreneurs and future leaders.", followers: "280.6K", posts: "380", logo: saLogo },
  { name: "Archive of CEOs", handle: "archiveofceos", category: "Leadership", tagline: "What great CEOs actually said and did.", followers: "265.4K", posts: "283", logo: aocLogo },
  { name: "Indian Pragati", handle: "indianpragati", category: "GenZ and culture", tagline: "Run by GenZ, for GenZ. Made for Bharat.", followers: "35K", posts: "194", logo: virodhLogo },
  { name: "Bourse India", handle: "bourseindiaa", category: "Markets and news", tagline: "India's business news, decoded.", followers: "29.1K", posts: "766", logo: bourseLogo },
  { name: "Lucre", handle: "lucreindia", category: "Founders", tagline: "Stories behind India's biggest founders.", followers: "15.9K", posts: "92", logo: lucreLogo },
];

export const igUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

export type Service = {
  id: string;
  number: string;
  title: string;
  line: string;
  body: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "youtube",
    number: "01",
    title: "YouTube channels",
    line: "From empty channel to a schedule that runs itself.",
    body: "We pick the niche with real data, write the scripts, voice them, edit them and package them. We have run long-form channels across finance, history, travel and documentary formats, faceless and on-camera. You get a channel that posts on time and gets watched.",
    includes: ["Niche and competitor research", "Scripts and voiceover", "Long-form and Shorts editing", "Thumbnails and titles", "Upload, SEO and analytics"],
  },
  {
    id: "instagram",
    number: "02",
    title: "Instagram pages",
    line: "The same playbook that grew our own pages.",
    body: "Reels, carousels and daily posting for founders, brands and media pages. We source the stories, cut the reels, design the carousels and post on schedule. It is the exact system we run on our own pages every day.",
    includes: ["Content calendar and sourcing", "Reels with synced captions", "Carousels and one-pagers", "Daily posting and community", "Monthly growth reports"],
  },
  {
    id: "editing",
    number: "03",
    title: "Editing",
    line: "Send raw footage. Get back something you're proud of.",
    body: "A team of editors for long-form YouTube, reels and podcasts. You send the raw file. We handle cuts, captions, B-roll, music and graphics. Fast turnarounds, and no edits that look like AI made them.",
    includes: ["Long-form YouTube edits", "Reels and Shorts", "Podcast clips", "Motion graphics and captions", "Monthly retainers or per video"],
  },
];

export const alsoDo = ["Brand partnerships on our pages", "Personal branding for founders", "Brand identity and websites"];

export const katranTools = [
  {
    name: "Long-form editor",
    input: "Voiceover in",
    output: "Edited YouTube video out",
    body: "Drop in a voiceover. It finds the footage, cuts to the script, adds captions and music, and hands back a finished 16:9 video. Teach it a channel's style once and every video after looks like that channel.",
  },
  {
    name: "Reel agent",
    input: "Reference reel in",
    output: "Finished reel out",
    body: "Point it at a reel you like. It finds the original source, cuts the strongest part and syncs captions to the word. The output is ready to post in your page's own style.",
  },
  {
    name: "Carousel studio",
    input: "Topic in",
    output: "Carousel out",
    body: "Give it a story or a topic. It researches it, writes the slides, finds proper photos and renders a carousel in your brand. It checks its own work before you see it.",
  },
];

export const serviceOptions = [
  "YouTube channel",
  "Instagram page",
  "Editing",
  "Brand partnership",
  "Personal branding",
  "Brand identity or website",
  "Something else",
];

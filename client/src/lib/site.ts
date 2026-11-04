import saLogo from "../assets/partners/successfularcs.jpg";
import aocLogo from "../assets/partners/archiveofceos.jpg";
import pragatiLogo from "../assets/partners/indianpragati.svg";
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
    { city: "Indore", role: "Corporate office, Madhya Pradesh" },
    { city: "Chandigarh", role: "Regional office" },
    { city: "Noida", role: "Regional office" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Network", href: "/network" },
  { label: "Katran", href: "/katran" },
  { label: "About", href: "/about" },
];

export type NetworkPage = {
  /** Anchor on /work. */
  slug: string;
  name: string;
  handle: string;
  category: string;
  tagline: string;
  followers: string;
  posts: string;
  logo: string;
  platforms: string[];
};

// Real follower counts. These are the pages we put our name on, not the full roster.
export const networkPages: NetworkPage[] = [
  { slug: "successful-arcs", name: "Successful Arcs", handle: "successfularcs", category: "Global business", tagline: "Business stories from outside India. The founders, companies and decisions behind them, cut into short reels for people who want to build something.", followers: "280.1K", posts: "413", logo: saLogo, platforms: ["Instagram"] },
  { slug: "archive-of-ceos", name: "Archive of CEOs", handle: "archiveofceos", category: "Global leadership", tagline: "What the world's best-known CEOs said and did. We cut interviews and talks into short lessons on leadership, money and work.", followers: "275.1K", posts: "297", logo: aocLogo, platforms: ["Instagram"] },
  { slug: "indian-pragati", name: "Indian Pragati", handle: "indianpragati", category: "Indian news", tagline: "Indian news in short reels: policy, infrastructure, space and the economy. We report the facts and leave the opinion to the reader.", followers: "34.6K", posts: "230", logo: pragatiLogo, platforms: ["Instagram"] },
  { slug: "bourse-india", name: "Bourse India", handle: "bourseindiaa", category: "Indian politics", tagline: "India's political events, explained. Elections, policy fights and the people behind them, in posts anyone can follow.", followers: "29K", posts: "804", logo: bourseLogo, platforms: ["Instagram"] },
  { slug: "lucre", name: "Lucre", handle: "lucreindia", category: "Indian founders", tagline: "How India's biggest founders started, what went wrong and how they built companies worth crores. On Instagram and YouTube.", followers: "17.9K", posts: "104", logo: lucreLogo, platforms: ["Instagram", "YouTube"] },
];

export const igUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

export type Service = {
  id: string;
  title: string;
  line: string;
  body: string;
  includes: string[];
  /** The matching option in the contact form's "What do you need?" list. */
  enquiry: string;
};

export const services: Service[] = [
  {
    id: "youtube",
    title: "YouTube channels",
    line: "From empty channel to a schedule that runs itself.",
    body: "We pick the niche with real data, write the scripts, voice them, edit them and package them. We have run long-form channels across finance, history, travel and documentary formats, faceless and on-camera. You get a channel that posts on time and gets watched.",
    includes: ["Niche and competitor research", "Scripts and voiceover", "Long-form and Shorts editing", "Thumbnails and titles", "Upload, SEO and analytics"],
    enquiry: "YouTube channel",
  },
  {
    id: "instagram",
    title: "Instagram pages",
    line: "The same playbook that grew our own pages.",
    body: "Reels, carousels and daily posting for founders, brands and media pages. We source the stories, cut the reels, design the carousels and post on schedule. It is the exact system we run on our own pages every day.",
    includes: ["Content calendar and sourcing", "Reels with synced captions", "Carousels and one-pagers", "Daily posting and community", "Monthly growth reports"],
    enquiry: "Instagram page",
  },
  {
    id: "newsletter",
    title: "Newsletter marketing",
    line: "An audience in the inbox that you own outright.",
    body: "We plan, write, design and send newsletters for founders and brands, and grow the list behind them from your pages and your site. It is the same way we run our own newsletters, which reach 150,000+ readers with an average open rate of 43%.",
    includes: ["Newsletter strategy and format", "Writing and design for every issue", "List growth from your pages and site", "Sending, testing and deliverability", "Monthly open and click reports"],
    enquiry: "Newsletter",
  },
  {
    id: "editing",
    title: "Editing",
    line: "Send raw footage. Get back something you're proud of.",
    body: "A team of editors for long-form YouTube, reels and podcasts. You send the raw file. We handle cuts, captions, B-roll, music and graphics. Fast turnarounds, and no edits that look like AI made them.",
    includes: ["Long-form YouTube edits", "Reels and Shorts", "Podcast clips", "Motion graphics and captions", "Monthly retainers or per video"],
    enquiry: "Editing",
  },
  {
    id: "personal-branding",
    title: "Personal branding",
    line: "Your interviews and ideas, posted every day under your name.",
    body: "For founders who want to be known for what they know. We cut your interviews and podcasts into reels, write posts in your voice and run the page on schedule. It is the same work we do every day for Archive of CEOs.",
    includes: ["Reels cut from your interviews and podcasts", "Posts written in your voice", "A page that posts on schedule", "Monthly growth reports"],
    enquiry: "Personal branding",
  },
  {
    id: "partnerships",
    title: "Brand partnerships",
    line: "Reach people who already trust the page.",
    body: "Sponsored posts, story features and launch pushes across our pages. Each one is written in the page's own voice, so it doesn't read like an ad.",
    includes: ["Sponsored reels and carousels", "Founder and company story features", "Launch pushes across several pages"],
    enquiry: "Brand partnership",
  },
  {
    id: "identity",
    title: "Brand identity and websites",
    line: "A look and a website that match the work.",
    body: "Logos, brand systems and websites for founders and companies. We designed and built this site the same way.",
    includes: ["Logo and brand system", "Templates for posts and reels", "Websites"],
    enquiry: "Brand identity or website",
  },
];

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
  "Newsletter",
  "Editing",
  "Brand partnership",
  "Personal branding",
  "Brand identity or website",
  "Something else",
];

/** "280.1K" → 280100. */
const followerUnits: Record<string, number> = { K: 1_000, M: 1_000_000 };
export const followerCount = (page: NetworkPage) => Math.round(parseFloat(page.followers) * (followerUnits[page.followers.slice(-1)] ?? 1));

/** Followers across the network pages. */
export const totalFollowers = networkPages.reduce((sum, page) => sum + followerCount(page), 0);
export const totalFollowersInThousands = Math.floor(totalFollowers / 1000);

/** Readers across our newsletters, and their average open rate. */
export const newsletterReaders = 150_000;
export const newsletterOpenRate = "43%";

/** Clients, named as the owner gave them (worked with directly or through partners). Spellings checked against company records. */
export const clients = [
  "Aditya Birla Group",
  "Masters' Union",
  "Tetr College of Business",
  "Varahe Analytics",
  "Kaidra Media",
];

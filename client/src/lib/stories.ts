import saSnapclips from "../assets/stories/sa-snapclips.jpg";
import saRoadster from "../assets/stories/sa-roadster.jpg";
import saButtercloth from "../assets/stories/sa-buttercloth.jpg";
import saAtlas from "../assets/stories/sa-atlas.jpg";
import saBlueorigin from "../assets/stories/sa-blueorigin.jpg";
import saSubcom from "../assets/stories/sa-subcom.jpg";
import saUndercover from "../assets/stories/sa-undercover.jpg";
import saSpacex from "../assets/stories/sa-spacex.jpg";
import saRowling from "../assets/stories/sa-rowling.jpg";
import aocRoadster from "../assets/stories/aoc-roadster.jpg";
import aocIphone from "../assets/stories/aoc-iphone.jpg";
import aocStripe from "../assets/stories/aoc-stripe.jpg";
import aocCardone from "../assets/stories/aoc-cardone.jpg";
import aocMadoff from "../assets/stories/aoc-madoff.jpg";
import aocFraud from "../assets/stories/aoc-fraud.jpg";
import aocSuleyman from "../assets/stories/aoc-suleyman.jpg";
import aocNegotiator from "../assets/stories/aoc-negotiator.jpg";
import aocStockmarket from "../assets/stories/aoc-stockmarket.jpg";
import aocSnapclips from "../assets/stories/aoc-snapclips.jpg";
import lucreJio from "../assets/stories/lucre-jio.jpg";
import lucreAshneer from "../assets/stories/lucre-ashneer.jpg";

import { articles } from "./articles";

export type Story = {
  slug: string;
  body: string[];
  code: string;
  title: string;
  excerpt: string;
  category: string;
  ip: string;
  date: string;
  views: string;
  readTime: string;
  founder?: { name: string; line: string };
  image: string;
  href: string;
};

const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

type StoryInput = Omit<Story, "slug" | "body" | "code">;

const storyInputs: StoryInput[] = [
  { title: "A Small YouTuber Handed Elon Musk A Fix For SpaceX's Booster", excerpt: "During a chat with Everyday Astronaut, Musk realised a Starship booster change could carry over to another part of the design.", category: "Space & Tech", ip: "Successful Arcs", date: "13 Oct'26", views: "794.8K", readTime: "26 sec", image: saSpacex, href: reel("Dea8TEIBako") },
  { title: "J.K. Rowling Went From Welfare To One Of History's Best-Selling Authors", excerpt: "Before Harry Potter, she was a single mother writing in Edinburgh cafes while her daughter slept.", category: "Founders", ip: "Successful Arcs", date: "11 Oct'26", views: "287.1K", readTime: "110 sec", image: saRowling, href: reel("DeXvJmrEt_n") },
  { title: "How Ambani Changed The Future Of India With Jio", excerpt: "One bet on cheap data put the internet in hundreds of millions of Indian pockets, and rewrote how the country lives online.", category: "Founders", ip: "Lucre", date: "17 Oct'26", views: "172K", readTime: "Reel", image: lucreJio, href: reel("Del8wEsutna"), founder: { name: "Mukesh Ambani", line: "Bet big on cheap data with Jio, and changed how hundreds of millions of Indians get online." } },
  { title: "Ashneer Grover: Stop Building Your Personal Brand", excerpt: "The BharatPe co-founder's case against chasing a personal brand before you've built the business.", category: "Startups", ip: "Lucre", date: "15 Oct'26", views: "107K", readTime: "Reel", image: lucreAshneer, href: reel("Def0SOMorWD"), founder: { name: "Ashneer Grover", line: "Built BharatPe, became a household name on Shark Tank India, and says stop chasing a personal brand." } },
  { title: "The Man Who Used Calculus To Expose A $65 Bn Ponzi Scheme", excerpt: "Harry Markopolos spotted Bernie Madoff's returns didn't add up in 1999, and kept warning the SEC for years.", category: "Markets", ip: "Archive of CEOs", date: "16 Oct'26", views: "57.7K", readTime: "49 sec", image: aocMadoff, href: reel("Deje6VcBmj-") },
  { title: "He Invented A $1 Mn Gym Product While Still In High School", excerpt: "Martin Dimitrov built SnapClips, a lightweight barbell collar that started as a slap-wristband prototype.", category: "Startups", ip: "Archive of CEOs", date: "18 Oct'26", views: "51.3K", readTime: "55 sec", image: aocSnapclips, href: reel("DeoNDL6BOdg"), founder: { name: "Martin Dimitrov", line: "Started SnapClips in high school and turned an everyday gym annoyance into a real business." } },
  { title: "What A Former FBI Negotiator Says Gets Hostages Released", excerpt: "Chris Voss on the one thing you should never do if you're ever taken captive.", category: "Leadership", ip: "Archive of CEOs", date: "15 Oct'26", views: "31K", readTime: "78 sec", image: aocNegotiator, href: reel("DegDTu8IQ9U") },
  { title: "Only One Shark Believed In Buttercloth. That Was Enough", excerpt: "Most of the Sharks passed. Robert Herjavec put in $250,000 for 25% of the company.", category: "Startups", ip: "Successful Arcs", date: "15 Oct'26", views: "14K", readTime: "44 sec", image: saButtercloth, href: reel("DehtjEjR6QK") },
  { title: "Musk Promised The Tesla Roadster In 2017. It Finally Showed Up", excerpt: "\"I specialise in going from the impossible to the merely late,\" and the Roadster proved it.", category: "Auto", ip: "Successful Arcs", date: "16 Oct'26", views: "27K", readTime: "60 sec", image: saRoadster, href: reel("Dej9qb9sbWV"), founder: { name: "Elon Musk", line: "Specialises, in his own words, in going from the impossible to the merely late." } },
  { title: "Elon Musk Was Laughed At For Explaining The Roadster In 2018", excerpt: "Years later, Tesla's next-generation Roadster is the punchline that turned out to be real.", category: "Auto", ip: "Archive of CEOs", date: "16 Oct'26", views: "26.4K", readTime: "37 sec", image: aocRoadster, href: reel("DekI86yu0XC") },
  { title: "He Took Out Two Loans Just To Attend A Grant Cardone Event", excerpt: "No money for a hotel, two nights in his car, and a bet that being in the room would pay off.", category: "Founders", ip: "Archive of CEOs", date: "16 Oct'26", views: "26.1K", readTime: "85 sec", image: aocCardone, href: reel("DekxFvEIily") },
  { title: "The Entire Stock Market Explained In 111 Seconds", excerpt: "A 1952 animated film breaks down why stock markets exist, and it still holds up.", category: "Markets", ip: "Archive of CEOs", date: "14 Oct'26", views: "25.3K", readTime: "111 sec", image: aocStockmarket, href: reel("DefNlriP2DW") },
  { title: "Undercover Boss: A CEO Got Fired From His Own Company", excerpt: "Buffets Inc. CEO Anthony Wedo went undercover and didn't make it through the shift.", category: "Leadership", ip: "Successful Arcs", date: "12 Oct'26", views: "21.1K", readTime: "130 sec", image: saUndercover, href: reel("DeZPGH0OLjm") },
  { title: "Inside Jeff Bezos' 750,000 Sq Ft Rocket Factory", excerpt: "Forget the launches. Blue Origin's factory floor is where the real work happens.", category: "Space & Tech", ip: "Successful Arcs", date: "15 Oct'26", views: "15.4K", readTime: "41 sec", image: saBlueorigin, href: reel("Def6eBgB7dl") },
  { title: "They Turned Down $1 Mn To Stay Independent", excerpt: "Vegan fried chicken brand Atlas Monroe reportedly rejected a $1 Mn buyout in 2019. Was it the right call?", category: "Startups", ip: "Successful Arcs", date: "15 Oct'26", views: "15K", readTime: "74 sec", image: saAtlas, href: reel("DehXp86xp5l") },
  { title: "Who Really Benefits From Your Hard-Earned Taxes", excerpt: "A Senate hearing on how much government fraud quietly costs taxpayers every year.", category: "Policy", ip: "Archive of CEOs", date: "16 Oct'26", views: "11.4K", readTime: "63 sec", image: aocFraud, href: reel("DejDh2PBO_R") },
  { title: "Microsoft's AI Chief On When We Should Shut AI Down", excerpt: "Mustafa Suleyman lists the four capabilities that should be a hard stop.", category: "AI", ip: "Archive of CEOs", date: "15 Oct'26", views: "9K", readTime: "84 sec", image: aocSuleyman, href: reel("Deg6LS3hSrJ") },
  { title: "The Hidden Undersea Cables That Keep The Internet Running", excerpt: "SubCom has laid enough cable to circle the planet many times over.", category: "Space & Tech", ip: "Successful Arcs", date: "14 Oct'26", views: "8.1K", readTime: "84 sec", image: saSubcom, href: reel("DefE73BRm8Q") },
  { title: "The Moment Apple Ended The Era Of Keypad Phones", excerpt: "Before 2007 phones meant keyboards and styluses. Steve Jobs had a different idea.", category: "Tech", ip: "Archive of CEOs", date: "17 Oct'26", views: "7.3K", readTime: "111 sec", image: aocIphone, href: reel("DemDwjlBb_7"), founder: { name: "Steve Jobs", line: "Killed the keypad phone by putting everything on a single sheet of glass in 2007." } },
  { title: "Stripe Had Only 50 Users After Two Years", excerpt: "John Collison on how slow the start was, and why they kept going.", category: "Startups", ip: "Archive of CEOs", date: "17 Oct'26", views: "5.6K", readTime: "72 sec", image: aocStripe, href: reel("DeloV_2hTm8"), founder: { name: "John Collison", line: "Co-founded Stripe, which spent about two years building before launching with roughly 50 users." } },
  { title: "A High Schooler's Barbell Clip Became A Real Business", excerpt: "SnapClips started with slap-wristband prototypes and a simple gym frustration.", category: "Startups", ip: "Successful Arcs", date: "18 Oct'26", views: "5.8K", readTime: "59 sec", image: saSnapclips, href: reel("Deo7vrqPGTR") },
];

export const stories: Story[] = storyInputs.map((story) => {
  const code = story.href.match(/reel\/([^/]+)/)![1];
  const article = articles[code];
  const words = article.body.join(" ").split(/\s+/).length;
  return { ...story, code, ...article, readTime: `${Math.max(2, Math.ceil(words / 120))} min read` };
});

export const storyPath = (story: Story) => `/stories/${story.slug}`;

const WEEK = 7 * 24 * 60 * 60 * 1000;
const FIRST_MONDAY = Date.UTC(2026, 0, 5);

export function founderOfTheWeek(now = Date.now()) {
  const pool = stories.filter((story) => story.founder);
  const week = Math.floor((now - FIRST_MONDAY) / WEEK);
  return pool[((week % pool.length) + pool.length) % pool.length];
}

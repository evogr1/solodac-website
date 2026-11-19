import arizona from "@/assets/katran/DccTI1AhTDB.webp";
import boseman from "@/assets/katran/DXkwIYQImSx.webp";
import sharkTank from "@/assets/katran/DFQGZ_vPojE.webp";
import huawei from "@/assets/katran/DKGAuS3TKAe.webp";
import bharatpe from "@/assets/katran/RL3VW4gj7_w.webp";
import workweek from "@/assets/katran/ksM-TrcSDvo.webp";
import aamir from "@/assets/katran/6ugLsJ-hzW8.webp";
import spoon from "@/assets/katran/JEUnd8cqbx4.webp";
import kalam from "@/assets/katran/DKMdtFnuTI0.webp";
import breakfast from "@/assets/katran/RiI45n9g4lQ.webp";
import jio from "@/assets/katran/rBuPStnYrTM.webp";
import iphones from "@/assets/katran/vM34jRuFrXs.webp";
import type { ReelData } from "@/components/katran/Reel";

// Reels Katran made that crossed a million views. Instagram counts as of 31 October 2026, Lucre (YouTube) counts as of 19 November 2026.
// The first six stay in this order: other pages pick from them by position.
export const millionViewReels: ReelData[] = [
  { id: "DccTI1AhTDB", platform: "instagram", title: "Why AriZona Iced Tea won't raise its price", poster: arizona, page: "Archive of CEOs", views: 29208763 },
  { id: "DXkwIYQImSx", platform: "instagram", title: "Chadwick Boseman's speech", poster: boseman, page: "Archive of CEOs", views: 25630317 },
  { id: "DKGAuS3TKAe", platform: "instagram", title: "Huawei's MateBook Fold", poster: huawei, page: "Successful Arcs", views: 40992678 },
  { id: "DFQGZ_vPojE", platform: "instagram", title: "The founder who came to Shark Tank for exposure", poster: sharkTank, page: "Successful Arcs", views: 21471328 },
  { id: "ksM-TrcSDvo", title: "The ad mocking India's 70-hour workweek", poster: workweek, page: "Lucre", views: 6045258 },
  { id: "RL3VW4gj7_w", title: "Ashneer Grover: how Salman Khan and 11 cricketers built BharatPe", poster: bharatpe, page: "Lucre", views: 7610170 },
  { id: "6ugLsJ-hzW8", title: "The Aamir Khan ad that hid its twist until the end", poster: aamir, page: "Lucre", views: 5028668 },
  { id: "JEUnd8cqbx4", title: "Told not to redesign a spoon, he got ₹3.3 crore on Shark Tank", poster: spoon, page: "Lucre", views: 3670893 },
  { id: "DKMdtFnuTI0", title: "A class 7 student asks Dr Kalam about India's biggest weakness", poster: kalam, page: "Lucre", views: 3164260 },
  { id: "RiI45n9g4lQ", title: "A Harvard scientist says breakfast was Kellogg's marketing", poster: breakfast, page: "Lucre", views: 1460423 },
  { id: "rBuPStnYrTM", title: "Before Jio, India couldn't afford the internet", poster: jio, page: "Lucre", views: 6577374 },
  { id: "vM34jRuFrXs", title: "A Guwahati car shop owner gifts his staff iPhones for Diwali", poster: iphones, page: "Lucre", views: 1751746 },
];

/** How many reels are on the list, as a word for copy: "ten". */
const countWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];
export const reelCountWord = countWords[millionViewReels.length] ?? String(millionViewReels.length);

// All the reels' views together, said the way our readers count it (lakh below a crore).
const reelViewSum = millionViewReels.reduce((sum, reel) => sum + reel.views, 0);
export const totalReelViews = reelViewSum >= 10_000_000 ? `${Math.floor(reelViewSum / 10_000_000)} crore` : `${Math.floor(reelViewSum / 100_000)} lakh`;

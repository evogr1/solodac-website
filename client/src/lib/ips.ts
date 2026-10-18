import saLogo from "../assets/partners/successfularcs.jpg";
import aocLogo from "../assets/partners/archiveofceos.jpg";
import virodhLogo from "../assets/partners/virodh.jpg";
import bourseLogo from "../assets/partners/bourse.jpg";
import lucreLogo from "../assets/partners/lucre.jpg";

export type Ip = {
  name: string;
  handle: string;
  category: string;
  tagline: string;
  followers: string;
  posts: string;
  logo: string;
  verified: boolean;
};

export const ips: Ip[] = [
  { name: "Successful Arcs", handle: "successfularcs", category: "Business", tagline: "Built for entrepreneurs and future leaders.", followers: "280.6K", posts: "380", logo: saLogo, verified: true },
  { name: "Archive of CEOs", handle: "archiveofceos", category: "Leadership", tagline: "Preserving the wisdom of great CEOs.", followers: "265.4K", posts: "283", logo: aocLogo, verified: true },
  { name: "Virodh", handle: "virodhindia", category: "GenZ & Culture", tagline: "Run by GenZ, for GenZ. Made for Bharat.", followers: "35K", posts: "194", logo: virodhLogo, verified: false },
  { name: "Bourse India", handle: "bourseindiaa", category: "News & Events", tagline: "India's events, decoded.", followers: "29.1K", posts: "766", logo: bourseLogo, verified: false },
  { name: "Lucre", handle: "lucreindia", category: "Founders", tagline: "Stories behind India's biggest founders.", followers: "15.9K", posts: "92", logo: lucreLogo, verified: false },
];

export const igUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

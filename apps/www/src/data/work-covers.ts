import { participationMedia } from "@/data/participationMedia";
import { portfolioPhotos } from "@/data/photography";

export type WorkCover = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  kind: "photograph" | "screenshot" | "graphic";
  fit?: "cover" | "contain";
  objectPosition?: string;
};

const workCovers = {
  "harry-j-epstein": {
    src: "/artifacts/hje/public-site.png",
    width: 1178,
    height: 785,
    alt: "Harry J. Epstein Company storefront showing product search, editorial artwork, video, navigation, and commerce controls.",
    caption:
      "The live successor storefront provides present-day business context; the documented Thick Arts engagement ran from 2009 through 2015.",
    credit: "Successor website capture, July 2026; not presented as Jamie's current implementation.",
    kind: "screenshot"
  },
  "fair-rent-nyc": {
    src: participationMedia.marketHotelTownHall.src,
    width: participationMedia.marketHotelTownHall.width,
    height: participationMedia.marketHotelTownHall.height,
    alt: participationMedia.marketHotelTownHall.alt,
    caption: participationMedia.marketHotelTownHall.caption,
    credit: participationMedia.marketHotelTownHall.credit,
    kind: "photograph",
    objectPosition: "50% 45%"
  },
  "kc-spaces-fund": {
    src: "/artifacts/kc-spaces-fund/public-site.webp",
    width: 1425,
    height: 950,
    alt: "KC Spaces Fund website with a blue campaign masthead, Donate action, Support section, and photographs of Kansas City arts and culture spaces.",
    caption:
      "The restored campaign surface pairs a clear public identity with donation, coalition, application, contact, and funded-space pathways.",
    credit: "KC Spaces Fund public website capture, August 20, 2026.",
    kind: "screenshot"
  },
  callnyc: {
    src: "/artifacts/callnyc/original-launch-2016.webp",
    width: 1800,
    height: 1200,
    alt: "Original CallNYC launch interface showing resident issue guidance, ranked Council member service profiles, and topic-based navigation.",
    caption:
      "The original public interface translated civic data into issue pathways, district context, and resident guidance.",
    credit: "Archived public launch capture, May 4, 2016, via the Internet Archive.",
    kind: "screenshot"
  },
  wowlist: {
    src: "/artifacts/wowlist/public-threshold.webp",
    width: 1600,
    height: 1000,
    alt: "WOW List landing page over a photograph of people gathered around a table, with the words being there changes everything.",
    caption:
      "WOW List's current threshold pairs its returning interface with a photographic scene of people gathering.",
    credit: "Public website capture, August 13, 2026.",
    kind: "screenshot"
  },
  "196-sunday-dinner": {
    src: portfolioPhotos.sundayDinnerSharedMap.src,
    width: portfolioPhotos.sundayDinnerSharedMap.width,
    height: portfolioPhotos.sundayDinnerSharedMap.height,
    alt: portfolioPhotos.sundayDinnerSharedMap.alt,
    caption: portfolioPhotos.sundayDinnerSharedMap.caption,
    credit: portfolioPhotos.sundayDinnerSharedMap.credit,
    kind: "photograph",
    objectPosition: "50% 44%"
  },
  "kc-town-hall": {
    src: portfolioPhotos.kcTownHallRoofWork.src,
    width: portfolioPhotos.kcTownHallRoofWork.width,
    height: portfolioPhotos.kcTownHallRoofWork.height,
    alt: portfolioPhotos.kcTownHallRoofWork.alt,
    caption: portfolioPhotos.kcTownHallRoofWork.caption,
    credit: portfolioPhotos.kcTownHallRoofWork.credit,
    kind: "photograph",
    objectPosition: "50% 42%"
  }
} as const satisfies Record<string, WorkCover>;

export function getWorkCover(slug: string): WorkCover {
  const cover = workCovers[slug as keyof typeof workCovers];
  if (!cover) throw new Error(`Missing project cover for ${slug}`);
  return cover;
}

export const publicWorkCovers = Object.values(workCovers);

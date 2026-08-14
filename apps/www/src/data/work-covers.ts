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
      "The maintained public storefront brings discovery, editorial voice, customer guidance, and ordering into one system.",
    credit: "Public website capture, July 2026.",
    kind: "screenshot"
  },
  "fair-rent-nyc": {
    src: portfolioPhotos.nycacMarketHotelBanner.src,
    width: portfolioPhotos.nycacMarketHotelBanner.width,
    height: portfolioPhotos.nycacMarketHotelBanner.height,
    alt: portfolioPhotos.nycacMarketHotelBanner.alt,
    caption: portfolioPhotos.nycacMarketHotelBanner.caption,
    credit: portfolioPhotos.nycacMarketHotelBanner.credit,
    kind: "photograph",
    objectPosition: "50% 45%"
  },
  callnyc: {
    src: "/artifacts/callnyc/archived-prototype.png",
    width: 1185,
    height: 790,
    alt: "Archived CallNYC prototype showing issue navigation, resident guidance, and a Council member service profile.",
    caption:
      "The archived prototype translated civic data into issue pathways, district context, and resident guidance.",
    credit: "Archived public prototype capture, July 2026.",
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

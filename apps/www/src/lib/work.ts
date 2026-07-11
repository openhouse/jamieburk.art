import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import CallNYC from "@/content/work/callnyc.mdx";
import { callNYCCitationOrder } from "@/content/work/callnyc.citations";
import FairRentNYC from "@/content/work/fair-rent-nyc.mdx";
import HarryJEpstein from "@/content/work/harry-j-epstein.mdx";
import KCTownHall from "@/content/work/kc-town-hall.mdx";
import SundayDinner from "@/content/work/196-sunday-dinner.mdx";
import WOWList from "@/content/work/wowlist.mdx";
import { workItems, type WorkSlug } from "@/data/work";

type WorkContent = {
  Content: ComponentType<{ components?: MDXComponents }>;
  citationOrder?: readonly string[];
};

export const workContentBySlug: Record<WorkSlug, WorkContent> = {
  "196-sunday-dinner": { Content: SundayDinner },
  callnyc: { Content: CallNYC, citationOrder: callNYCCitationOrder },
  "fair-rent-nyc": { Content: FairRentNYC },
  "harry-j-epstein": { Content: HarryJEpstein },
  "kc-town-hall": { Content: KCTownHall },
  wowlist: { Content: WOWList }
};

export function getWorkBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getFeaturedWork() {
  return workItems.filter((item) => item.featured);
}

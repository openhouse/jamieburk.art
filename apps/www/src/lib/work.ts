import type { ComponentType } from "react";
import CallNYC from "@/content/work/callnyc.mdx";
import FairRentNYC from "@/content/work/fair-rent-nyc.mdx";
import HarryJEpstein from "@/content/work/harry-j-epstein.mdx";
import KCTownHall from "@/content/work/kc-town-hall.mdx";
import SundayDinner from "@/content/work/196-sunday-dinner.mdx";
import WOWList from "@/content/work/wowlist.mdx";
import { workItems, type WorkSlug } from "@/data/work";

export const workContentBySlug = {
  "196-sunday-dinner": SundayDinner,
  callnyc: CallNYC,
  "fairrentnyc-commercial-rent-stabilization": FairRentNYC,
  "harry-j-epstein": HarryJEpstein,
  "kc-town-hall": KCTownHall,
  wowlist: WOWList
} satisfies Record<WorkSlug, ComponentType>;

export function getWorkBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getFeaturedWork() {
  return workItems.filter((item) => item.featured);
}

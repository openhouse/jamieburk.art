import type { ComponentType } from "react";

import SundayDinner, {
  metadata as sundayDinnerMetadata
} from "../../content/work/196-sunday-dinner.mdx";
import CallNYC, { metadata as callNYCMetadata } from "../../content/work/callnyc.mdx";
import FairRentNYC, {
  metadata as fairRentNYCMetadata
} from "../../content/work/fair-rent-nyc.mdx";
import HarryJEpstein, {
  metadata as harryJEpsteinMetadata
} from "../../content/work/harry-j-epstein.mdx";
import KCTownHall, {
  metadata as kcTownHallMetadata
} from "../../content/work/kc-town-hall.mdx";
import SourceBackedTeamMemory, {
  metadata as sourceBackedTeamMemoryMetadata
} from "../../content/work/source-backed-team-memory.mdx";
import WOWList, { metadata as wowListMetadata } from "../../content/work/wowlist.mdx";

export type WorkMetadata = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  dates: string;
  context: string;
  contentState: string;
  featured: boolean;
  priority: number;
  visibility: string;
  accentColor: string;
  tags: string[];
  skills?: string[];
  proof?: string[];
  publicSafety?: string;
  known?: string[];
  open?: string[];
  protected?: string[];
};

export type WorkEntry = WorkMetadata & {
  Component: ComponentType;
};

const entries: WorkEntry[] = [
  withComponent(harryJEpsteinMetadata, HarryJEpstein),
  withComponent(fairRentNYCMetadata, FairRentNYC),
  withComponent(callNYCMetadata, CallNYC),
  withComponent(wowListMetadata, WOWList),
  withComponent(sundayDinnerMetadata, SundayDinner),
  withComponent(kcTownHallMetadata, KCTownHall),
  withComponent(sourceBackedTeamMemoryMetadata, SourceBackedTeamMemory)
];

export const workEntries = entries.sort((a, b) => a.priority - b.priority);
export const featuredWork = workEntries.filter((entry) => entry.featured);

export function getWorkBySlug(slug: string) {
  return workEntries.find((entry) => entry.slug === slug);
}

function withComponent(metadata: Record<string, unknown>, Component: ComponentType): WorkEntry {
  return {
    ...(metadata as WorkMetadata),
    Component
  };
}

import { workItems } from "@/content/work-data";
import type { WorkItem } from "@/lib/types";

export function getAllWork() {
  return [...workItems].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
}

export function getFeaturedWork() {
  return getAllWork().filter((item) => item.featured);
}

export function getFullCaseStudies() {
  return getAllWork().filter((item) => item.status === "Full case study");
}

export function getWorkBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getWorkGroups() {
  return getAllWork().reduce<Record<string, WorkItem[]>>((groups, item) => {
    groups[item.category] = groups[item.category] ?? [];
    groups[item.category].push(item);
    return groups;
  }, {});
}

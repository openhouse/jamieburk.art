import { workItems } from "@/data/work";

export function getWorkItems() {
  return workItems;
}

export function getWorkItemBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getWorkGroups() {
  return Array.from(new Set(workItems.map((item) => item.group)));
}

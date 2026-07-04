import type { WorkItem, WorkModule } from "@/lib/types";

const workModules = {
  "harry-j-epstein": () => import("@/content/work/harry-j-epstein.mdx") as Promise<WorkModule>,
  "fair-rent-nyc": () => import("@/content/work/fair-rent-nyc.mdx") as Promise<WorkModule>,
  callnyc: () => import("@/content/work/callnyc.mdx") as Promise<WorkModule>,
  wowlist: () => import("@/content/work/wowlist.mdx") as Promise<WorkModule>,
  "196-sunday-dinner": () => import("@/content/work/196-sunday-dinner.mdx") as Promise<WorkModule>,
  "kc-town-hall": () => import("@/content/work/kc-town-hall.mdx") as Promise<WorkModule>
};

export function getWorkSlugs() {
  return Object.keys(workModules).map((slug) => ({ slug }));
}

export async function getWorkItem(slug: string): Promise<(WorkItem & { Content: WorkModule["default"] }) | null> {
  const load = workModules[slug as keyof typeof workModules];

  if (!load) {
    return null;
  }

  const mod = await load();

  if (mod.metadata.visibility !== "public") {
    return null;
  }

  return {
    ...mod.metadata,
    Content: mod.default
  };
}

export async function getWorkItems(): Promise<WorkItem[]> {
  const modules = await Promise.all(Object.values(workModules).map((load) => load()));

  return modules
    .map((mod) => mod.metadata)
    .filter((item) => item.visibility === "public")
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.title.localeCompare(b.title));
}

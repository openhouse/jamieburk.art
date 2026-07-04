import Link from "next/link";
import type { WorkEntry } from "@/lib/types";
import { WorkCard } from "./WorkCard";

type SelectedSystemsGridProps = {
  entries: WorkEntry[];
};

export function SelectedSystemsGrid({ entries }: SelectedSystemsGridProps) {
  return (
    <section className="site-shell py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Selected systems</p>
          <h2 className="text-3xl font-semibold">Proof across civic, business, community, and knowledge systems.</h2>
        </div>
        <Link className="font-semibold" href="/work">View all work</Link>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {entries.map((entry) => (
          <WorkCard compact entry={entry} key={entry.slug} />
        ))}
      </div>
    </section>
  );
}

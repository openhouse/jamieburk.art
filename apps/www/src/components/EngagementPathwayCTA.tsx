import Link from "next/link";
import type { Route } from "next";
import engagementPathway from "@/data/engagement-pathway.json";

export function EngagementPathwayCTA() {
  const cta = engagementPathway.supportingEntryCta;

  return (
    <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-jb-green">
        {cta.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-jb-ink">{cta.heading}</h2>
      <p className="mt-3 leading-7 text-jb-ink/72">{cta.description}</p>
      <Link
        className="mt-5 inline-flex min-h-11 items-center rounded-md bg-jb-blue px-5 py-3 font-semibold text-white hover:bg-jb-green"
        href={cta.destination as Route}
      >
        {cta.label}
      </Link>
    </aside>
  );
}

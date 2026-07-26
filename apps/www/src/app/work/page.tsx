import Link from "next/link";
import type { Metadata } from "next";
import { WorkCard } from "@/components/WorkCard";
import { workGroups, workItems } from "@/data/work";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Selected Work - Jamie Burkart",
  description:
    "Selected public-safe case studies showing technical project management, product operations, civic technology, documentation systems, and implementation work.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="jb-section-label">Portfolio index</p>
          <h1 className="mt-3 text-5xl leading-none text-jb-ink sm:text-6xl">
            Selected work
          </h1>
        </div>
        <div className="max-w-3xl">
          <p className="text-xl leading-8 text-jb-ink/76">
            Real needs become clearer requirements, usable systems,
            public-facing tools, decision trails, documentation, and durable
            handoffs.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
          <Link className="text-jb-blue hover:text-jb-green" href="/work/technical-operations">
            Technical Operations proof page
          </Link>
          <Link className="text-jb-blue hover:text-jb-green" href="/lab/source-backed-team-memory">
            Source-backed memory lab
          </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 space-y-16">
        {workGroups.map((group, groupIndex) => {
          const groupedItems = workItems.filter((item) => item.group === group);

          if (group === "Source-backed memory / AI lab") {
            return (
              <section className="grid gap-6 lg:grid-cols-[0.24fr_0.76fr]" key={group}>
                <div>
                  <p className="jb-section-label">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-jb-ink">{group}</h2>
                </div>
                <div className="border-y border-jb-ink/15 py-6">
                  <h3 className="text-2xl font-semibold text-jb-ink">
                    Source-Backed Team Memory / Noting.us
                  </h3>
                  <p className="mt-3 leading-7 text-jb-ink/76">
                    A lab / proof-of-practice exploring source-backed operating
                    memory, decision lineage, onboarding context, and
                    human-correctable AI workflows for knowledge-heavy teams.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-jb-green">
                    Early research / method / consulting practice. Not a
                    finished production SaaS.
                  </p>
                  <Link
                    className="mt-5 inline-block font-semibold text-jb-blue hover:text-jb-green"
                    href="/lab/source-backed-team-memory"
                  >
                    Read lab page
                  </Link>
                </div>
              </section>
            );
          }

          if (!groupedItems.length) return null;

          return (
            <section key={group}>
              <div className="grid gap-3 lg:grid-cols-[0.24fr_0.76fr]">
                <p className="jb-section-label">
                  {String(groupIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="text-3xl font-semibold text-jb-ink">{group}</h2>
              </div>
              <div className="mt-5">
                {groupedItems.map((item) => (
                  <WorkCard item={item} key={item.slug} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

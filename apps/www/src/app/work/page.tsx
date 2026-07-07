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
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Selected work</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          These case studies show a recurring pattern: under-structured situations
          becoming usable systems, public-facing tools, documentation, decision
          trails, and durable handoffs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="text-jb-blue hover:text-jb-green" href="/work/technical-operations">
            Technical Operations proof page
          </Link>
          <Link className="text-jb-blue hover:text-jb-green" href="/lab/source-backed-team-memory">
            Source-backed memory lab
          </Link>
        </div>
      </div>
      <div className="mt-12 space-y-14">
        {workGroups.map((group) => {
          const groupedItems = workItems.filter((item) => item.group === group);

          if (group === "Source-backed memory / AI lab") {
            return (
              <section key={group}>
                <h2 className="text-3xl font-semibold text-jb-ink">{group}</h2>
                <div className="mt-5 rounded-lg border border-jb-ink/15 bg-jb-warm/88 p-5">
                  <h3 className="text-2xl font-semibold text-jb-ink">
                    Source-Backed Team Memory
                  </h3>
                  <p className="mt-3 leading-7 text-jb-ink/76">
                    A lab / proof-of-practice exploring source-backed operating
                    memory, useful ideas, decision lineage, open questions,
                    onboarding context, and human-correctable AI workflows for
                    knowledge-heavy teams.
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
              <h2 className="text-3xl font-semibold text-jb-ink">{group}</h2>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
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

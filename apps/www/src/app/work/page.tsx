import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { WorkCard } from "@/components/WorkCard";
import {
  getPhotoOccurrenceId,
  photographs,
  photoDisplayBoundary
} from "@/data/photography";
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
    <div>
      <header className="jb-frame py-12">
        <div className="jb-reading">
          <p className="jb-label text-sm text-jb-blue">Case studies</p>
          <h1 className="mt-3 text-5xl font-bold text-jb-ink">Selected work</h1>
          <p className="mt-5 text-xl leading-8 text-jb-ink/76">
            These case studies show a recurring pattern: real needs becoming
            clearer requirements, usable systems, public-facing tools,
            documentation, decision trails, and durable handoffs.
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
      </header>
      <figure
        className="bg-jb-graphite text-white"
        data-photo-occurrence={getPhotoOccurrenceId(
          photographs.nightlifeTownHall,
          "work-index.hero"
        )}
      >
        <div className="jb-frame py-5">
          <div className="relative aspect-[16/7] overflow-hidden max-md:aspect-[4/3]">
            <Image
              alt={photographs.nightlifeTownHall.alt}
              fill
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              src={photographs.nightlifeTownHall.src}
              style={{
                objectFit: "cover",
                objectPosition: photographs.nightlifeTownHall.objectPosition
              }}
            />
          </div>
          <figcaption className="mt-3 grid gap-1 text-sm leading-6 text-white/70 md:grid-cols-[1fr_auto]">
            <span>{photographs.nightlifeTownHall.caption}</span>
            <span>{photographs.nightlifeTownHall.credit}</span>
          </figcaption>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70">
            {photoDisplayBoundary}
          </p>
        </div>
      </figure>
      <div className="jb-frame mt-14 space-y-16">
        {workGroups.map((group) => {
          const groupedItems = workItems.filter((item) => item.group === group);

          if (group === "Source-backed memory / AI lab") {
            return (
              <section key={group}>
                <h2 className="text-3xl font-semibold text-jb-ink">{group}</h2>
                <div className="mt-5 rounded-lg border border-jb-green/30 bg-jb-warm p-6">
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
              <h2 className="text-3xl font-semibold text-jb-ink">{group}</h2>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {groupedItems.map((item) => (
                  <WorkCard
                    item={item}
                    key={item.slug}
                    placementContext="work-index.work-card"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

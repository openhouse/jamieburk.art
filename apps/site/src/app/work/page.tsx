import type { Metadata } from "next";
import { WorkCard } from "@/components/WorkCard";
import { getWorkGroups } from "@/lib/work";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected proof of technical operations, implementation, civic technology, documentation, and public-facing systems work."
};

export default function WorkIndexPage() {
  const groups = getWorkGroups();

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="measure mb-10">
          <p className="eyebrow mb-3">Selected proof</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Work</h1>
          <p className="mt-5 text-xl leading-9 text-[color:var(--jamie-muted)]">
            A selected proof system, not everything. The organizing question is what became usable.
          </p>
        </div>
        <div className="grid gap-12">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-4 text-2xl font-black">{group.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map((item) => (
                  <WorkCard item={item} key={item.slug} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

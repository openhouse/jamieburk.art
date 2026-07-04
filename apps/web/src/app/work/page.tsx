import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getWorkGroups } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Selected Work",
  description: "Selected proof of technical operations, implementation, documentation, civic technology, and public-facing systems work.",
  path: "/work"
});

export default function WorkIndexPage() {
  const groups = getWorkGroups();

  return (
    <div className="page-shell py-14">
      <SectionHeading
        eyebrow="Selected proof"
        title="Work"
        body="A selected proof system for technical operations, implementation, civic technology, documentation, public-facing systems, and durable handoffs."
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Technical Operations", "Product Operations", "Implementation", "Documentation", "Civic Technology", "Web Systems", "Knowledge Systems", "AI Readiness"].map((filter) => (
          <span className="rounded-[0.382rem] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-2 text-sm font-semibold" key={filter}>
            {filter}
          </span>
        ))}
      </div>
      <div className="mt-12 space-y-14">
        {Object.entries(groups).map(([group, items]) => (
          <section key={group}>
            <h2 className="text-2xl font-bold">{group}</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {items.map((item) => (
                <ProjectCard item={item} key={item.slug} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

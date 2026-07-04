import type { Metadata } from "next";

import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { workGroups, workItems } from "@/lib/work";

export const metadata: Metadata = createMetadata({
  title: "Selected Work",
  description:
    "Selected proof of technical project management, product operations, implementation, documentation, civic technology, and public-facing systems work.",
  path: "/work"
});

const filters = [
  "All",
  "Technical Operations",
  "Product Operations",
  "Implementation",
  "Documentation",
  "Civic Technology",
  "Web Systems",
  "Knowledge Systems",
  "Community Systems",
  "AI Readiness"
];

export default function WorkIndexPage() {
  return (
    <div>
      <header className="section">
        <div className="container">
          <SectionHeading eyebrow="Selected work" title="Selected proof, not everything">
            <p>
              Work grouped by the systems it made usable: business operations,
              civic/public-facing tools, community infrastructure, and
              source-backed team memory.
            </p>
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <span className="tag" key={filter}>
                {filter}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="container grid gap-12 pb-20">
        {workGroups.map((group) => {
          const items = workItems.filter((item) => item.group === group);

          return (
            <section key={group}>
              <h2 className="h3 mb-5">{group}</h2>
              <div className="grid gap-5">
                {items.map((item) => (
                  <ProjectCard compact item={item} key={item.slug} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

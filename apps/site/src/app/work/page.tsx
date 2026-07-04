import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected proof of technical project management, product operations, implementation, documentation, civic technology, and public-facing systems work.",
};

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
  "AI Readiness",
] as const;

export default async function WorkPage() {
  const work = await getAllWork();

  return (
    <section className="container-page section-pad">
      <SectionHeading
        eyebrow="Selected proof"
        title="Work"
        body="A focused index of systems, case studies, and public-safe summaries. Not everything belongs on the first version; the goal is to make the professional proof legible fast."
      />
      <div className="mt-8">
        <TagList tags={filters} tone="quiet" />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {work.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllWorkItems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Selected Systems",
  description: "Selected public-safe work by Jamie Burkart, organized by role fit, proof, and artifact type.",
  path: "/work"
});

export default function WorkPage() {
  const workItems = getAllWorkItems();

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Work</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Selected systems</h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-muted)]">
            A compact proof surface for selected systems, role fit, public-safety state, and
            artifacts. This is not a comprehensive archive.
          </p>
        </div>
        <div className="balanced-grid mt-10">
          {workItems.map((item) => (
            <ProjectCard item={item} key={item.meta.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

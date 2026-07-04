import type { WorkItem } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

type StartHereProps = {
  items: WorkItem[];
};

export function StartHere({ items }: StartHereProps) {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Start here"
        title="The quickest path through the portfolio"
        body="New to Jamie's work? These pages show the role fit, proof pattern, and public-safe case studies first."
      />
      <div className="project-grid">
        {items.slice(0, 5).map((item) => (
          <ProjectCard item={item} key={item.slug} />
        ))}
      </div>
    </section>
  );
}

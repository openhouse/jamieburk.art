import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

import { featuredWorkItems } from "@/lib/work";

export function SelectedSystems() {
  return (
    <section className="section rule-top bg-base-200/60">
      <div className="container">
        <SectionHeading eyebrow="Selected systems" title="Proof you can scan">
          <p>
            The work is grouped as systems because the strongest proof is not a
            single artifact. It is what became clearer, repeatable, and usable
            afterward.
          </p>
        </SectionHeading>
        <div className="mt-10 grid gap-5">
          {featuredWorkItems.map((item) => (
            <ProjectCard item={item} key={item.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

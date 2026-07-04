import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { groupWorkByPractice } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Selected Work",
  description:
    "Selected public-safe systems, case studies, and proof pages across technical operations, civic technology, implementation, documentation, and community infrastructure.",
  pathname: "/work"
});

export default function WorkIndexPage() {
  const groups = groupWorkByPractice();

  return (
    <div className="plain-stack">
      <header className="plain-page">
        <p className="eyebrow">Selected systems</p>
        <h1>Selected work</h1>
        <p>
          Grouped by practice body, not chronology. Each card names the result, role, proof, what was unclear, and what became usable.
        </p>
      </header>
      {[...groups.entries()].map(([practiceBody, items]) => (
        <section className="page-section" key={practiceBody}>
          <SectionHeading title={practiceBody} />
          <div className="project-grid">
            {items.map((item) => (
              <ProjectCard item={item} key={item.slug} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

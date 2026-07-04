import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/Tag";
import { getWorkGroups, getWorkItems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Selected Systems",
  "Selected public-safe proof of Jamie Burkart's technical operations, civic technology, product operations, documentation, and implementation work."
);

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

export default function WorkPage() {
  const groups = getWorkGroups();
  const items = getWorkItems();

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Selected proof, not everything</p>
        <h1>Selected systems</h1>
        <p className="lede">
          Work that shows a recurring pattern: unclear context becomes requirements,
          workflows, documentation, tools, implementation support, and durable handoffs.
        </p>
        <div className="role-tags" aria-label="Suggested filters">
          {filters.map((filter) => (
            <Tag key={filter}>{filter}</Tag>
          ))}
        </div>
      </section>

      <section aria-labelledby="work-groups" className="section-block">
        <p className="eyebrow">Index</p>
        <h2 id="work-groups">Work groups</h2>
        <div className="work-group-grid">
          {groups.map((group) => (
            <article className="work-group" key={group}>
              <h3>{group}</h3>
              <ul>
                {items
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <li key={item.slug}>
                      <a href={item.route}>{item.shortTitle}</a>
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="all-work" className="section-block">
        <p className="eyebrow">Cards</p>
        <h2 id="all-work">All selected work</h2>
        <div className="project-grid">
          {items.map((item) => (
            <ProjectCard item={item} key={item.slug} />
          ))}
        </div>
      </section>
    </>
  );
}

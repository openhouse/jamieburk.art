import Link from "next/link";
import type { WorkItem } from "@jamie/site-content/types";

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="tag-list" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

export function WorkCard({ work }: { work: WorkItem }) {
  return (
    <article className={`card ${work.featured ? "card-featured" : ""}`}>
      <div className="cluster">
        <span className="status">{work.status}</span>
        <span className="status">{work.visibility}</span>
      </div>
      <div className="stack">
        <h3>{work.title}</h3>
        <p>{work.subtitle}</p>
      </div>
      <p className="copy">{work.summary}</p>
      <div className="stack">
        <p>
          <strong>What was unclear:</strong> {work.whatWasUnclear}
        </p>
        <p>
          <strong>What became usable:</strong> {work.whatBecameUsable}
        </p>
      </div>
      <TagList tags={work.tags.slice(0, 4)} />
      <Link className="subtle-link" href={`/work/${work.slug}`}>
        Read proof page
      </Link>
    </article>
  );
}

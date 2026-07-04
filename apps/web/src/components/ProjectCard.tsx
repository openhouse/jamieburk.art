import Link from "next/link";
import type { WorkItem } from "@/lib/types";
import { TagList } from "@/components/TagList";

type ProjectCardProps = {
  item: WorkItem;
};

export function ProjectCard({ item }: ProjectCardProps) {
  const proof = item.proof?.[0] ?? item.underlyingSystem;

  return (
    <article className="project-card">
      <div className="project-card-header">
        <p className="badge badge-outline">{item.contentState}</p>
        <p className="practice-label">{item.practiceBody}</p>
      </div>
      <h3>
        <Link href={`/work/${item.slug}`}>{item.title}</Link>
      </h3>
      <p>{item.summary}</p>
      <dl className="project-meta">
        <div>
          <dt>Role</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt>Years</dt>
          <dd>{item.dates}</dd>
        </div>
        {proof ? (
          <div>
            <dt>Primary proof</dt>
            <dd>{proof}</dd>
          </div>
        ) : null}
      </dl>
      {item.unclear || item.usable ? (
        <div className="unclear-usable">
          {item.unclear ? <p><strong>Unclear:</strong> {item.unclear}</p> : null}
          {item.usable ? <p><strong>Usable:</strong> {item.usable}</p> : null}
        </div>
      ) : null}
      <TagList tags={item.tags} />
      <Link className="text-link" href={`/work/${item.slug}`}>
        View proof
      </Link>
    </article>
  );
}

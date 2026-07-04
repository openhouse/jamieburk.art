import type { WorkItem } from "@/lib/types";
import { ButtonLink } from "@/components/ButtonLink";
import { Tag } from "@/components/Tag";

type ProjectCardProps = {
  item: WorkItem;
};

export function ProjectCard({ item }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div>
        <p className="eyebrow">{item.group}</p>
        <h3>{item.shortTitle}</h3>
        <p>{item.summary}</p>
      </div>
      <dl className="card-facts">
        <div>
          <dt>Role</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt>Primary proof</dt>
          <dd>{item.primaryProof}</dd>
        </div>
        <div>
          <dt>What was unclear?</dt>
          <dd>{item.unclear}</dd>
        </div>
        <div>
          <dt>What became usable?</dt>
          <dd>{item.becameUsable}</dd>
        </div>
      </dl>
      <div className="tag-row">
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <ButtonLink href={item.route} variant="quiet">
        {item.ctaLabel}
      </ButtonLink>
    </article>
  );
}

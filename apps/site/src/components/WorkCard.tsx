import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import type { WorkItem } from "@/lib/types";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="work-card">
      <div className="work-card-header">
        <p>{item.year}</p>
        <StatusBadge state={item.contentState} />
      </div>
      <h3>
        <Link href={`/work/${item.slug}`}>{item.title}</Link>
      </h3>
      <p>{item.summary}</p>
      <dl className="before-after">
        <div>
          <dt>What was unclear</dt>
          <dd>{item.whatWasUnclear}</dd>
        </div>
        <div>
          <dt>What became usable</dt>
          <dd>{item.whatBecameUsable}</dd>
        </div>
      </dl>
      <TagList tags={item.tags.slice(0, 4)} />
    </article>
  );
}

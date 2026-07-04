import { ButtonLink } from "@/components/ButtonLink";
import { TagList } from "@/components/TagList";
import { formatStatus, formatVisibility, getWorkHref } from "@/lib/content";
import type { WorkContent } from "@/lib/types";

type ProjectCardProps = {
  item: WorkContent;
};

export function ProjectCard({ item }: ProjectCardProps) {
  const href = getWorkHref(item);

  return (
    <article className="surface flex h-full flex-col p-5">
      <div className="flex flex-wrap gap-2">
        <span className="badge badge-primary">{formatStatus(item.meta.status)}</span>
        <span className="badge badge-secondary">{formatVisibility(item.meta.visibility)}</span>
      </div>
      <h3 className="mt-5 text-2xl font-black leading-tight">{item.meta.title}</h3>
      <p className="mt-3 text-sm font-bold text-[color:var(--color-muted)]">
        {item.meta.role} - {item.meta.years}
      </p>
      <p className="mt-4 leading-7">{item.meta.summary}</p>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="font-black">What was unclear</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.meta.whatWasUnclear}</dd>
        </div>
        <div>
          <dt className="font-black">What became usable</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.meta.whatBecameUsable}</dd>
        </div>
        <div>
          <dt className="font-black">Selected proof</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.meta.selectedProof}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <TagList tags={item.meta.tags} />
      </div>
      <div className="mt-auto pt-6">
        <ButtonLink href={href}>View proof</ButtonLink>
      </div>
    </article>
  );
}

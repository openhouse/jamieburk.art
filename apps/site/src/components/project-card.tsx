import Link from "next/link";
import type { Route } from "next";
import type { WorkEntry } from "@/lib/content";
import { TagList } from "./tag-list";

type ProjectCardProps = {
  project: WorkEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const href = `/work/${project.slug}` as Route;

  return (
    <article className="card h-full rounded-md border border-base-300 bg-base-100 shadow-none">
      <div className="card-body gap-4">
        <div className="artifact-panel" aria-hidden="true">
          <span className="artifact-line w-11/12" />
          <span className="artifact-line" />
          <span className="artifact-line" />
          <span className="artifact-line" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {project.status}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight">
            <Link className="hover:text-primary" href={href}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-neutral">
            {project.summary}
          </p>
        </div>
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-semibold">Role</dt>
            <dd className="text-neutral">{project.role}</dd>
          </div>
          {project.underlyingSystem ? (
            <div>
              <dt className="font-semibold">Underlying system</dt>
              <dd className="text-neutral">{project.underlyingSystem}</dd>
            </div>
          ) : null}
        </dl>
        <TagList tags={project.tags.slice(0, 5)} tone="quiet" />
        <div className="card-actions mt-auto">
          <Link className="btn btn-primary btn-sm rounded-md" href={href}>
            View proof
          </Link>
        </div>
      </div>
    </article>
  );
}

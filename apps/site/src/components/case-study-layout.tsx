import { CaveatBox } from "@/components/caveat-box";
import { MarkdownBody } from "@/components/markdown-body";
import { TagList } from "@/components/tag-list";
import type { WorkEntry } from "@/lib/content";

type CaseStudyLayoutProps = {
  work: WorkEntry;
};

export function CaseStudyLayout({ work }: CaseStudyLayoutProps) {
  return (
    <article className="container-case section-pad">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {work.status}
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">
        {work.title}
      </h1>
      <p className="mt-5 text-xl leading-9 text-neutral">{work.summary}</p>
      <div className="mt-8 rounded-md border border-base-300 bg-base-100 p-5">
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-base-content">Role</dt>
            <dd className="mt-1 text-sm leading-6 text-neutral">{work.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-base-content">Years</dt>
            <dd className="mt-1 text-sm leading-6 text-neutral">
              {work.dates}
            </dd>
          </div>
          {work.format ? (
            <div>
              <dt className="text-sm font-semibold text-base-content">
                Format
              </dt>
              <dd className="mt-1 text-sm leading-6 text-neutral">
                {work.format}
              </dd>
            </div>
          ) : null}
          {work.underlyingSystem ? (
            <div>
              <dt className="text-sm font-semibold text-base-content">
                Underlying system
              </dt>
              <dd className="mt-1 text-sm leading-6 text-neutral">
                {work.underlyingSystem}
              </dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-5">
          <TagList tags={work.tags} />
        </div>
      </div>
      {work.caveat ? <CaveatBox>{work.caveat}</CaveatBox> : null}
      <MarkdownBody body={work.body} />
    </article>
  );
}

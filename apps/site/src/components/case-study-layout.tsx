import { ArtifactList } from "@/components/artifact-list";
import { AtAGlance } from "@/components/at-a-glance";
import { CareNote } from "@/components/care-note";
import { ContentBody } from "@/components/content-body";
import { CreditsList } from "@/components/credits-list";
import { KnownOpenProtected } from "@/components/known-open-protected";
import { SourceLayer } from "@/components/source-layer";
import { TagList } from "@/components/tag-list";
import { VisibilityNote } from "@/components/visibility-note";
import type { ContentDocument, WorkMeta } from "@/lib/content";

type CaseStudyLayoutProps = {
  document: ContentDocument<WorkMeta>;
};

export function CaseStudyLayout({ document }: CaseStudyLayoutProps) {
  const { meta, body } = document;

  return (
    <article className="section">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{meta.series}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{meta.title}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-8 text-base-content/75">{meta.subtitle}</p>
          <div className="mt-5">
            <TagList tags={meta.tags} />
          </div>
          <div className="mt-10">
            <ContentBody body={body} />
          </div>
        </div>
        <aside className="grid gap-4">
          <AtAGlance work={meta} />
          <ArtifactList artifacts={meta.artifactTypes} />
          <VisibilityNote note={meta.publicSafety?.note} />
          <CareNote note={meta.careNote} />
          <SourceLayer sourceLayer={meta.sourceLayer} />
          <CreditsList credits={meta.credits} />
          <KnownOpenProtected
            known="The public page names the role, artifact types, and safe outcomes."
            open="More source-backed artifacts can be added after review."
            protectedText="Private records, credentials, and sensitive collaborator materials stay out of the public site."
          />
        </aside>
      </div>
    </article>
  );
}

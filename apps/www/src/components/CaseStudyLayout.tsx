import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  BoundaryNote,
  CreditsList,
  KnownOpenProtected,
  LinksList,
  SourceLayer,
} from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { References } from "@/components/citations";
import { site } from "@/data/site";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

function SupplementalEvidence({
  item,
  idPrefix = "",
  includeCredits = true
}: {
  item: WorkMeta;
  idPrefix?: string;
  includeCredits?: boolean;
}) {
  return (
    <div className="space-y-12">
      <ArtifactList idPrefix={idPrefix} item={item} />
      <ArtifactGallery idPrefix={idPrefix} item={item} />
      <KnownOpenProtected idPrefix={idPrefix} item={item} />
      <div className="grid gap-4 md:grid-cols-2">
        <BoundaryNote item={item} />
        <SourceLayer item={item} />
      </div>
      <LinksList idPrefix={idPrefix} item={item} />
      {includeCredits ? <CreditsList idPrefix={idPrefix} item={item} /> : null}
    </div>
  );
}

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  return (
    <article className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <header className="min-w-0">
          <StatusBadge status={item.status} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78 lg:hidden">{item.summary}</p>
          <p className="mt-5 hidden text-xl leading-8 text-jb-ink/78 lg:block">{item.summary}</p>
        </header>
        <aside className="space-y-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-28 lg:self-start">
          <AtAGlance item={item} />
          <div className="flex flex-wrap gap-3">
            <JBButton href={site.resumePath} variant="secondary" download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </aside>
        <div className="prose max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink lg:col-start-1 lg:row-start-2">
          {children}
          <References pageId={item.slug} />
        </div>
      </div>
      <div className="mt-12">
        <CreditsList idPrefix="primary-" item={item} />
        <div className="mt-8 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} variant="secondary" download>
            Download resume PDF
          </JBButton>
          <JBButton href="/contact" variant="ghost">
            Contact Jamie
          </JBButton>
        </div>
        <details className="mt-10">
          <summary className="cursor-pointer text-lg font-semibold text-jb-blue hover:text-jb-green">
            Supporting evidence, boundaries, artifacts, and public links
          </summary>
          <div className="mt-8">
            <SupplementalEvidence
              idPrefix="supplemental-"
              includeCredits={false}
              item={item}
            />
          </div>
        </details>
      </div>
    </article>
  );
}

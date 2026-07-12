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

function SupplementalEvidence({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
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
      <CreditsList idPrefix={idPrefix} item={item} />
    </div>
  );
}

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  return (
    <article className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <header className="min-w-0">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
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
      {item.slug === "callnyc" ? (
        <>
          <details className="mt-12 lg:hidden">
            <summary className="cursor-pointer text-lg font-semibold text-jb-blue hover:text-jb-green">
              Supplemental evidence, boundaries, sources, and credits
            </summary>
            <div className="mt-8"><SupplementalEvidence idPrefix="mobile-" item={item} /></div>
          </details>
          <div className="mt-14 hidden lg:block">
            <SupplementalEvidence idPrefix="desktop-" item={item} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} variant="secondary" download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </>
      ) : (
        <div className="mt-14"><SupplementalEvidence item={item} /></div>
      )}
    </article>
  );
}

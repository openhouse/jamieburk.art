import type { ReactNode } from "react";
import { AtAGlance, ArtifactGallery, ArtifactList, CareNote, CreditsList, KnownOpenProtected, PublicSafetyNote, SourceLayer, VisibilityNote } from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const topDisclaimer =
    item.slug === "callnyc"
      ? "Archived civic-data prototype. Not an official or current City Council service."
      : undefined;

  return (
    <article className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
          {topDisclaimer ? (
            <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-4 text-sm font-semibold leading-6 text-jb-ink">
              {topDisclaimer}
            </div>
          ) : null}
          <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
          </div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <AtAGlance item={item} />
          <VisibilityNote item={item} />
          <div className="flex flex-wrap gap-3">
            <JBButton href="/resume" variant="secondary">
              Download resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </aside>
      </div>
      <div className="mt-14 space-y-12">
        <KnownOpenProtected item={item} />
        <div className="grid gap-4 md:grid-cols-2">
          <PublicSafetyNote item={item} />
          <CareNote item={item} />
          <SourceLayer item={item} />
        </div>
        <ArtifactList item={item} />
        <ArtifactGallery item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}

import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  CreditsList,
  EvidenceAndLimits,
  LinksList,
} from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { References } from "@/components/citations";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
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
          <div className="mt-10">
            <ArtifactGallery item={item} />
          </div>
          <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
          </div>
          <div className="prose mt-12 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            <References pageId={item.slug} />
          </div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <AtAGlance item={item} />
          <div className="flex flex-wrap gap-3">
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </aside>
      </div>
      <div className="mt-14 space-y-12">
        <ArtifactList item={item} />
        <EvidenceAndLimits item={item} />
        <LinksList item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}

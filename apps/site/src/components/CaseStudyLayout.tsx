import type { ReactNode } from "react";
import { ArtifactGallery } from "@/components/ArtifactGallery";
import { AtAGlance } from "@/components/AtAGlance";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SourceTrail } from "@/components/SourceTrail";
import { TagList } from "@/components/TagList";
import type { WorkItem } from "@/lib/types";

type CaseStudyLayoutProps = {
  item: WorkItem;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  return (
    <article className="case-study">
      <header className="case-hero">
        <div className="site-shell case-hero-grid">
          <div>
            <p className="eyebrow">{item.subtitle}</p>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
            <TagList tags={item.tags} />
          </div>
          <AtAGlance item={item} />
        </div>
      </header>
      <div className="site-shell case-body-grid">
        <div className="case-content">{children}</div>
        <aside className="case-aside">
          <PublicSafetyNote />
          <ArtifactGallery artifacts={item.metrics} />
          <SourceTrail items={item.sourceTrail} />
        </aside>
      </div>
    </article>
  );
}

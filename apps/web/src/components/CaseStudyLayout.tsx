import type { WorkItem } from "@/lib/types";
import { AtAGlance } from "@/components/AtAGlance";
import { CaveatBox } from "@/components/CaveatBox";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { TagList } from "@/components/TagList";

type CaseStudyLayoutProps = {
  item: WorkItem;
};

export function CaseStudyLayout({ item }: CaseStudyLayoutProps) {
  return (
    <article className="case-study">
      <header className="case-hero">
        <p className="eyebrow">{item.contentState}</p>
        <h1>{item.title}</h1>
        <p>{item.summary}</p>
        <TagList tags={item.tags} />
      </header>
      <div className="case-grid">
        <main className="case-main">
          {item.unclear || item.usable ? (
            <section className="signature-pair" aria-label="What was unclear and what became usable">
              {item.unclear ? (
                <div>
                  <h2>What was unclear?</h2>
                  <p>{item.unclear}</p>
                </div>
              ) : null}
              {item.usable ? (
                <div>
                  <h2>What became usable?</h2>
                  <p>{item.usable}</p>
                </div>
              ) : null}
            </section>
          ) : null}
          <MarkdownBody body={item.body} />
        </main>
        <div className="case-side">
          <AtAGlance item={item} />
          {item.caveat ? <CaveatBox>{item.caveat}</CaveatBox> : <PublicSafetyNote />}
        </div>
      </div>
    </article>
  );
}

import { AtAGlance } from "@/components/AtAGlance";
import { ButtonLink } from "@/components/ButtonLink";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SourceLayer } from "@/components/SourceLayer";
import type { WorkItem } from "@/lib/types";

type CaseStudyLayoutProps = {
  item: WorkItem;
};

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyLayout({ item }: CaseStudyLayoutProps) {
  return (
    <article className="case-study">
      <header className="page-hero case-hero">
        <p className="eyebrow">{item.group}</p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>
        <p>{item.result}</p>
        <div className="hero-actions">
          <ButtonLink href="/work" variant="secondary">
            View all work
          </ButtonLink>
          <ButtonLink href="/contact" variant="quiet">
            Contact Jamie
          </ButtonLink>
        </div>
      </header>

      <div className="case-grid">
        <AtAGlance items={item.glance} />
        <div className="case-main">
          <section className="case-section">
            <h2>One-line summary</h2>
            <p>{item.summary}</p>
          </section>
          <ListSection items={item.content.role} title="Role" />
          <ListSection items={item.content.context} title="Context" />
          <section className="case-section">
            <h2>What was unclear</h2>
            <p>{item.unclear}</p>
          </section>
          <ListSection items={item.content.did} title="What I did" />
          <section className="case-section">
            <h2>What became usable</h2>
            <p>{item.becameUsable}</p>
          </section>
          <ListSection items={item.content.artifacts} title="Selected artifacts" />
          <ListSection items={item.content.tools} title="Tools and systems" />
          <ListSection items={item.content.outcomes} title="Outcomes / impact" />
          <ListSection items={item.content.proves} title="What this proves" />
          {item.content.sourceLayer ? (
            <SourceLayer>
              <p>{item.content.sourceLayer}</p>
            </SourceLayer>
          ) : null}
          {item.content.publicSafety ? (
            <PublicSafetyNote>
              <p>{item.content.publicSafety}</p>
            </PublicSafetyNote>
          ) : null}
          {item.content.caveat ? (
            <PublicSafetyNote>
              <p>{item.content.caveat}</p>
            </PublicSafetyNote>
          ) : null}
        </div>
      </div>
      <KnownOpenProtected items={item.knownOpenProtected} />
    </article>
  );
}

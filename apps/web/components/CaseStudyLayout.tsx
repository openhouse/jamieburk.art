import { AtAGlance } from "./AtAGlance";
import { ArtifactList } from "./ArtifactList";
import { CaveatBox } from "./CaveatBox";
import { KnownOpenProtected } from "./KnownOpenProtected";
import { PublicSafetyNote } from "./PublicSafetyNote";
import { SourceLayer } from "./SourceLayer";
import { TagList } from "./TagList";

import type { WorkItem } from "@/lib/types";

type CaseStudyLayoutProps = {
  item: WorkItem;
};

export function CaseStudyLayout({ item }: CaseStudyLayoutProps) {
  return (
    <article>
      <header className="section">
        <div className="container golden-split">
          <div>
            <p className="eyebrow mb-4">{item.status}</p>
            <h1 className="h1">{item.title}</h1>
            <p className="lead mt-6">{item.summary}</p>
            <div className="mt-6">
              <TagList tags={item.tags} />
            </div>
          </div>
          <AtAGlance item={item} />
        </div>
      </header>

      <div className="container grid gap-10 pb-20">
        <SourceLayer proof={item.proof} />

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="h3">What was unclear?</h2>
            <p className="mt-4 text-muted">{item.unclear}</p>
          </div>
          <div className="card p-6">
            <h2 className="h3">What became usable?</h2>
            <p className="mt-4 text-muted">{item.usable}</p>
          </div>
        </section>

        <section className="copy">
          <h2 className="h3">Context</h2>
          <p className="mt-4 text-muted">{item.body.context}</p>
        </section>

        <section className="copy">
          <h2 className="h3">What I did</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-muted">
            {item.body.did.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <ArtifactList items={item.body.artifacts} />

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="h3">Tools and systems</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {item.body.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">Outcomes / impact</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {item.body.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-md bg-base-200 p-6">
          <h2 className="h3">What this proves</h2>
          <p className="mt-4 text-muted">{item.body.proves}</p>
        </section>

        <KnownOpenProtected value={item.knownOpenProtected} />

        <div className="grid gap-5 md:grid-cols-2">
          <PublicSafetyNote>
            <p>{item.caveat}</p>
          </PublicSafetyNote>
          <CaveatBox>
            <p>Selected public-safe materials available on request.</p>
          </CaveatBox>
        </div>
      </div>
    </article>
  );
}

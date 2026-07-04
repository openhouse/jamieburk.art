import type { ReactNode } from "react";
import type { WorkItem } from "@jamie/site-content/types";
import { TagList } from "@/components/work";

export function CaseStudyLayout({ work }: { work: WorkItem }) {
  return (
    <article>
      <section className="section">
        <div className="container stack-lg case-header">
          <div className="prose-container stack">
            <p className="eyebrow">{work.series}</p>
            <h1>{work.title}</h1>
            <p className="lead">{work.summary}</p>
          </div>
          <TagList tags={work.tags} />
        </div>
      </section>

      <section className="section">
        <div className="container golden-split">
          <div className="stack-lg">
            <AtAGlance work={work} />
            <MdxBody body={work.body} />
          </div>
          <aside className="stack-lg">
            <SystemProduced value={work.systemProduced} />
            <KnownOpenProtected
              known={work.known}
              openQuestions={work.openQuestions}
              protectedItems={work.protected}
            />
            <ArtifactList artifacts={work.artifactTypes} />
            {work.sourceLayer ? <SourceLayer value={work.sourceLayer} /> : null}
            {work.careNote ? <CareNote>{work.careNote}</CareNote> : null}
            <VisibilityNote>{work.publicSafety.note}</VisibilityNote>
            <CreditsList credits={work.credits} />
          </aside>
        </div>
      </section>
    </article>
  );
}

function AtAGlance({ work }: { work: WorkItem }) {
  const rows = [
    ["Role", work.role],
    ["Years", work.years],
    ["Status", work.status],
    ["Visibility", work.visibility],
    ["Reading time", `${work.readingMinutes} min`]
  ];

  return (
    <section className="card">
      <h2>At a glance</h2>
      <dl className="metadata-grid">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SystemProduced({ value }: { value: string }) {
  return (
    <section className="note">
      <p>
        <strong>System produced:</strong> {value}
      </p>
    </section>
  );
}

function ArtifactList({ artifacts }: { artifacts: string[] }) {
  return (
    <section className="card">
      <h2>Selected artifacts</h2>
      <ul className="artifact-list">
        {artifacts.map((artifact) => (
          <li key={artifact}>{artifact}</li>
        ))}
      </ul>
    </section>
  );
}

function CareNote({ children }: { children: ReactNode }) {
  return (
    <section className="note">
      <p>{children}</p>
    </section>
  );
}

function VisibilityNote({ children }: { children: ReactNode }) {
  return (
    <section className="note warning-note">
      <p>{children}</p>
    </section>
  );
}

function SourceLayer({ value }: { value: string }) {
  return (
    <section className="card">
      <h2>Source layer</h2>
      <p>{value}</p>
    </section>
  );
}

function CreditsList({ credits }: { credits: string[] }) {
  if (credits.length === 0) {
    return null;
  }

  return (
    <section className="card">
      <h2>Credits</h2>
      <ul className="artifact-list">
        {credits.map((credit) => (
          <li key={credit}>{credit}</li>
        ))}
      </ul>
    </section>
  );
}

function KnownOpenProtected({
  known,
  openQuestions,
  protectedItems
}: {
  known: string[];
  openQuestions: string[];
  protectedItems: string[];
}) {
  return (
    <section className="card">
      <h2>Known / Open / Protected</h2>
      <div className="kop">
        <KopColumn title="Known" items={known} />
        <KopColumn title="Open" items={openQuestions} />
        <KopColumn title="Protected" items={protectedItems} />
      </div>
    </section>
  );
}

function KopColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function MdxBody({ body }: { body: string }) {
  const blocks = body
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mdx-body">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function renderBlock(block: string, index: number) {
  if (block.startsWith("### ")) {
    return <h3 key={index}>{block.replace(/^### /, "")}</h3>;
  }

  if (block.startsWith("## ")) {
    return <h2 key={index}>{block.replace(/^## /, "")}</h2>;
  }

  if (block.split("\n").every((line) => line.startsWith("- "))) {
    return (
      <ul key={index}>
        {block.split("\n").map((line) => (
          <li key={line}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  return <p key={index}>{block}</p>;
}

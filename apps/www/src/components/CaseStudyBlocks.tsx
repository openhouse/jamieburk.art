import type { ReactNode } from "react";
import { JBCard } from "@/components/JBCard";
import { TagList } from "@/components/TagList";
import type { WorkMeta } from "@/types/work";

export function AtAGlance({ item }: { item: WorkMeta }) {
  const rows = [
    ["Role", item.role],
    ["Years", item.years],
    ["Context", item.series],
    ["Status", item.status],
    ["Visibility", item.visibility],
    ["Role fit", item.roleFit]
  ];

  return (
    <section aria-labelledby="at-a-glance" className="rounded-lg bg-jb-blue p-5 text-jb-paper">
      <h2 className="text-xl font-semibold" id="at-a-glance">
        At a glance
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase text-jb-paper/70">
              {label}
            </dt>
            <dd className="mt-1 leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase text-jb-paper/70">
          Tags
        </p>
        <div className="mt-3">
          <TagList compact tags={item.tags} />
        </div>
      </div>
    </section>
  );
}

export function ArtifactList({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
  const headingId = `${idPrefix}artifact-list`;
  return (
    <section aria-labelledby={headingId}>
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        Primary artifacts
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {item.artifactTypes.map((artifact) => (
          <li
            className="rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-sm font-medium text-jb-ink"
            key={artifact}
          >
            {artifact}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArtifactGallery({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
  const headingId = `${idPrefix}artifact-gallery`;
  return (
    <section aria-labelledby={headingId}>
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        Representative outputs
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {item.artifacts.map((artifact, index) => (
          <JBCard className="jb-artifact-surface min-h-56" key={artifact.title}>
            <p className="text-xs font-semibold uppercase text-jb-blue">
              {artifact.type} / 0{index + 1}
            </p>
            <h3 className="mt-10 text-xl font-semibold text-jb-ink">{artifact.title}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">{artifact.description}</p>
          </JBCard>
        ))}
      </div>
    </section>
  );
}

export function KnownOpenProtected({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
  const headingId = `${idPrefix}known-open-protected`;
  const blocks = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section aria-labelledby={headingId}>
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        Known / Open / Protected
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {blocks.map(([label, text]) => (
          <JBCard key={label}>
            <h3 className="text-lg font-semibold text-jb-blue">{label}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">{text}</p>
          </JBCard>
        ))}
      </div>
    </section>
  );
}

function NoteBlock({
  title,
  children,
  tone = "blue"
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "green" | "ochre";
}) {
  const styles = {
    blue: "border-jb-blue/30 bg-jb-sky/15",
    green: "border-jb-green/30 bg-jb-green/[0.08]",
    ochre: "border-jb-ochre/50 bg-jb-lemon/25"
  }[tone];

  return (
    <section className={`rounded-lg border p-5 ${styles}`}>
      <h2 className="text-xl font-semibold text-jb-ink">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-jb-ink/76">{children}</div>
    </section>
  );
}

export function CareNote({ item }: { item: WorkMeta }) {
  if (!item.careNote) return null;
  return (
    <NoteBlock title="Care note / limits" tone="ochre">
      <p>{item.careNote}</p>
    </NoteBlock>
  );
}

export function VisibilityNote({ item }: { item: WorkMeta }) {
  return (
    <NoteBlock title="Visibility" tone="blue">
      <p>
        This page is marked <strong>{item.visibility}</strong>. Current status:
        {" "}
        {item.currentStatus}
      </p>
    </NoteBlock>
  );
}

export function PublicSafetyNote({ item }: { item: WorkMeta }) {
  if (!item.publicSafety?.note) return null;
  return (
    <NoteBlock title="Public-safety note" tone="ochre">
      <p>{item.publicSafety.note}</p>
    </NoteBlock>
  );
}

export function BoundaryNote({ item }: { item: WorkMeta }) {
  if (!item.careNote && !item.publicSafety?.note) return null;
  return (
    <NoteBlock title="Boundaries" tone="ochre">
      {item.careNote ? <p>{item.careNote}</p> : null}
      {item.publicSafety?.note ? (
        <p className={item.careNote ? "mt-3" : undefined}>{item.publicSafety.note}</p>
      ) : null}
    </NoteBlock>
  );
}

export function SourceLayer({ item }: { item: WorkMeta }) {
  if (!item.sourceLayer) return null;
  return (
    <NoteBlock title="Source layer" tone="green">
      <p>{item.sourceLayer}</p>
    </NoteBlock>
  );
}

export function CreditsList({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
  if (!item.credits?.length) return null;
  const headingId = `${idPrefix}credits-list`;
  return (
    <section aria-labelledby={headingId}>
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        Credits
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-jb-ink/76">
        {item.credits.map((credit) => (
          <li key={credit}>{credit}</li>
        ))}
      </ul>
    </section>
  );
}

export function LinksList({ item, idPrefix = "" }: { item: WorkMeta; idPrefix?: string }) {
  if (!item.links?.length) return null;
  const headingId = `${idPrefix}links-list`;
  return (
    <section aria-labelledby={headingId}>
      <h2 className="text-2xl font-semibold text-jb-ink" id={headingId}>
        Public links
      </h2>
      <ul className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
        {item.links.map((link) => (
          <li key={link.url}>
            <a
              className="inline-flex rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-jb-blue hover:border-jb-blue/40 hover:text-jb-green"
              href={link.url}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

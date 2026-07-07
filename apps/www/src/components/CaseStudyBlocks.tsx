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

export function ArtifactList({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="artifact-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-list">
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

export function ArtifactGallery({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="artifact-gallery">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-gallery">
        Representative artifacts
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-jb-ink/72">
        Representative artifacts are recreated, redacted, or public-safe
        examples. They show the shape of the system without exposing private
        source material.
      </p>
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

export function KnownOpenProtected({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section aria-labelledby="known-open-protected">
      <h2 className="text-2xl font-semibold text-jb-ink" id="known-open-protected">
        Known / Open / Protected
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-jb-ink/72">
        Known is public, confirmed, or safe to say. Open remains unresolved,
        evolving, or pending review. Protected exists but should not be
        published.
      </p>
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

export function EvidenceList({ item }: { item: WorkMeta }) {
  if (!item.evidence.length) return null;

  return (
    <section aria-labelledby="evidence-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="evidence-list">
        Selected proof
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-jb-ink/72">
        These public-safe claims are selected from a maintained proof bank. They
        are intentionally bounded so the site can show real accomplishments
        without publishing protected source material.
      </p>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {item.evidence.map((evidence) => (
          <li
            className="rounded-lg border border-jb-ink/12 bg-jb-warm px-4 py-3 text-sm leading-6 text-jb-ink/76"
            key={evidence}
          >
            {evidence}
          </li>
        ))}
      </ul>
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

export function SourceLayer({ item }: { item: WorkMeta }) {
  if (!item.sourceLayer) return null;
  return (
    <NoteBlock title="Source layer" tone="green">
      <p>{item.sourceLayer}</p>
    </NoteBlock>
  );
}

export function CreditsList({ item }: { item: WorkMeta }) {
  if (!item.credits?.length) return null;
  return (
    <section aria-labelledby="credits-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="credits-list">
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

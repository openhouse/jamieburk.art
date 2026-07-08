import type { ReactNode } from "react";
import { JBCard } from "@/components/JBCard";
import { TagList } from "@/components/TagList";
import type { WorkMeta } from "@/types/work";

export function AtAGlance({ item }: { item: WorkMeta }) {
  const rows = [
    ["Role", item.role],
    ["Years", item.years],
    ["Context", item.series],
    ["Useful for", item.roleFit]
  ];

  return (
    <section aria-labelledby="at-a-glance" className="rounded-lg bg-jb-blue p-5 text-jb-paper">
      <h2 className="text-xl font-semibold" id="at-a-glance">
        At a glance
      </h2>
      <dl className="mt-5 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="jb-meta-label text-xs text-jb-paper/70">
              {label}
            </dt>
            <dd className="mt-1 leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <p className="jb-meta-label text-xs text-jb-paper/70">
          Tags
        </p>
        <div className="mt-3">
          <TagList compact tags={item.tags} />
        </div>
      </div>
    </section>
  );
}

export function ProjectChange({ item }: { item: WorkMeta }) {
  return (
    <section
      aria-labelledby="project-change"
      className="rounded-lg border border-jb-blue/20 bg-jb-paper p-5 sm:p-6"
    >
      <h2 className="text-2xl font-semibold text-jb-ink" id="project-change">
        What changed
      </h2>
      <dl className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <dt className="jb-meta-label text-xs text-jb-blue">Starting material</dt>
          <dd className="mt-2 leading-7 text-jb-ink/76">{item.whatWasUnclear}</dd>
        </div>
        <div>
          <dt className="jb-meta-label text-xs text-jb-green">Structure created</dt>
          <dd className="mt-2 leading-7 text-jb-ink/76">{item.whatBecameUsable}</dd>
        </div>
      </dl>
    </section>
  );
}

export function EvidenceList({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="evidence-list" className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
      <h2 className="text-xl font-semibold text-jb-ink" id="evidence-list">
        Evidence
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-jb-ink/76">
        {item.evidence.map((evidence) => (
          <li className="flex gap-3" key={evidence}>
            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-jb-ochre" />
            <span>{evidence}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArtifactList({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="artifact-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-list">
        Work produced
      </h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {item.artifactTypes.map((artifact) => (
          <li
            className="rounded-full border border-jb-ink/12 bg-jb-paper px-4 py-2 text-sm font-medium text-jb-ink"
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
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {item.artifacts.map((artifact, index) => (
          <JBCard
            className={`jb-artifact-surface min-h-52 ${
              index === 0 && item.artifacts.length > 1 ? "md:col-span-2" : ""
            }`}
            key={artifact.title}
          >
            <p className="jb-meta-label text-xs text-jb-blue">
              {artifact.type}
            </p>
            <h3 className="mt-8 text-xl font-semibold text-jb-ink">{artifact.title}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">{artifact.description}</p>
          </JBCard>
        ))}
      </div>
    </section>
  );
}

export function ClaimBoundaries({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Can be said plainly", item.knownOpenProtected.known],
    ["Needs approval to show", item.knownOpenProtected.open],
    ["Stays offline", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section aria-labelledby="claim-boundaries">
      <h2 className="text-2xl font-semibold text-jb-ink" id="claim-boundaries">
        Claim boundaries
      </h2>
      <div className="mt-5 divide-y divide-jb-ink/12 rounded-lg border border-jb-ink/12 bg-jb-paper">
        {blocks.map(([label, text]) => (
          <div className="grid gap-2 p-4 md:grid-cols-[220px_1fr]" key={label}>
            <h3 className="font-semibold text-jb-blue">{label}</h3>
            <p className="text-sm leading-6 text-jb-ink/72">{text}</p>
          </div>
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
    <NoteBlock title="Boundary" tone="ochre">
      <p>{item.careNote}</p>
    </NoteBlock>
  );
}

export function EvidenceScopeNote({ item }: { item: WorkMeta }) {
  return (
    <NoteBlock title="Scope" tone="blue">
      <p>
        This page describes {item.title} through claims that can be shared
        plainly today. More detailed records stay out of the public site unless
        they are approved for release.
      </p>
    </NoteBlock>
  );
}

export function PublicSafetyNote({ item }: { item: WorkMeta }) {
  if (!item.publicSafety?.note) return null;
  return (
    <NoteBlock title="Claim discipline" tone="ochre">
      <p>{item.publicSafety.note}</p>
    </NoteBlock>
  );
}

export function SourceLayer({ item }: { item: WorkMeta }) {
  if (!item.sourceLayer) return null;
  return (
    <NoteBlock title="Evidence basis" tone="green">
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

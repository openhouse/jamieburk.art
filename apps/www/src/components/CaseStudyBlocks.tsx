import type { ReactNode } from "react";
import { TagList } from "@/components/TagList";
import type { WorkMeta } from "@/types/work";

export function AtAGlance({ item }: { item: WorkMeta }) {
  const rows = [
    ["Role", item.role],
    ["Years", item.years],
    ["Context", item.series],
    ["Role fit", item.roleFit]
  ];

  return (
    <section
      aria-labelledby="at-a-glance"
      className="border-y border-jb-ink/14 py-5"
    >
      <h2 className="text-xl font-semibold text-jb-ink" id="at-a-glance">
        At a glance
      </h2>
      <dl className="mt-5 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm font-semibold text-jb-blue">{label}</dt>
            <dd className="mt-1 leading-6 text-jb-ink/76">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <p className="text-sm font-semibold text-jb-blue">Tags</p>
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
        Operating materials
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-jb-ink/76">
        These are the kinds of public-safe materials this work produced or made
        easier to maintain. Private source files, raw notes, and sensitive
        records are not published.
      </p>
      <ul className="mt-5 flex flex-wrap gap-3">
        {item.artifactTypes.map((artifact) => (
          <li
            className="rounded-full border border-jb-blue/25 bg-jb-paper px-4 py-2 text-sm font-semibold text-jb-blue"
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
        Representative evidence
      </h2>
      <div className="mt-6 grid gap-x-8 gap-y-7 md:grid-cols-3">
        {item.artifacts.map((artifact) => (
          <article className="border-t border-jb-ink/15 pt-4" key={artifact.title}>
            <p className="text-sm font-semibold text-jb-blue">{artifact.type}</p>
            <h3 className="mt-4 text-xl font-semibold text-jb-ink">
              {artifact.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/76">
              {artifact.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function KnownOpenProtected({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Public proof", item.knownOpenProtected.known],
    ["Not shown here", item.knownOpenProtected.protected],
    ["Care standard", item.careNote ?? item.knownOpenProtected.open]
  ] as const;

  return (
    <section aria-labelledby="known-open-protected">
      <h2 className="text-2xl font-semibold text-jb-ink" id="known-open-protected">
        Evidence and boundaries
      </h2>
      <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-3">
        {blocks.map(([label, text]) => (
          <div className="border-t border-jb-ink/15 pt-4" key={label}>
            <h3 className="text-lg font-semibold text-jb-blue">{label}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/76">{text}</p>
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
    <NoteBlock title="Care boundaries" tone="ochre">
      <p>{item.careNote}</p>
    </NoteBlock>
  );
}

export function PublicSafetyNote({ item }: { item: WorkMeta }) {
  if (!item.publicSafety?.note) return null;
  return (
    <NoteBlock title="Publishing boundary" tone="ochre">
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

export function PublicLinks({ item }: { item: WorkMeta }) {
  if (!item.links?.length) return null;

  return (
    <section aria-labelledby="public-links">
      <h2 className="text-2xl font-semibold text-jb-ink" id="public-links">
        Public links
      </h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {item.links.map((link) => (
          <li key={link.url}>
            <a
              className="inline-flex min-h-11 items-center rounded-lg border border-jb-blue/25 px-4 font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
              href={link.url}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
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

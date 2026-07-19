import Image from "next/image";
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
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase text-jb-paper">
              {label}
            </dt>
            <dd className="mt-1 leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase text-jb-paper">
          Tags
        </p>
        <div className="mt-3">
          <TagList compact tags={item.tags} tone="inverted" />
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
        Artifact gallery
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {item.artifacts.map((artifact, index) => {
          if (artifact.media) {
            return (
              <figure
                className="overflow-hidden rounded-lg border border-jb-ink/15 bg-jb-paper shadow-sm md:col-span-2"
                key={artifact.title}
              >
                <a className="block" href={artifact.media.href}>
                  <Image
                    alt={artifact.media.alt}
                    className="aspect-[3/2] w-full object-cover object-top"
                    height={800}
                    sizes="(min-width: 768px) 66vw, 100vw"
                    src={artifact.media.src}
                    width={1200}
                  />
                </a>
                <figcaption className="border-t border-jb-ink/10 p-5">
                  <p className="text-xs font-semibold uppercase text-jb-blue">
                    {artifact.type} / 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-jb-ink">
                    {artifact.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-jb-ink/74">
                    {artifact.description}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-jb-ink/76">
                    {artifact.media.caption}
                  </p>
                  <a
                    className="mt-3 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
                    href={artifact.media.href}
                  >
                    View {artifact.media.sourceLabel}
                  </a>
                </figcaption>
              </figure>
            );
          }

          return (
            <JBCard className="jb-artifact-surface min-h-56" key={artifact.title}>
              <p className="text-xs font-semibold uppercase text-jb-blue">
                {artifact.type} / 0{index + 1}
              </p>
              <h3 className="mt-10 text-xl font-semibold text-jb-ink">
                {artifact.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">
                {artifact.description}
              </p>
            </JBCard>
          );
        })}
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
    <section aria-labelledby="scope-and-sources">
      <h2 className="text-2xl font-semibold text-jb-ink" id="scope-and-sources">
        Scope and sources
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {blocks.map(([label, text]) => (
          <JBCard key={label}>
            <h3 className="text-lg font-semibold text-jb-blue">{label}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">{text}</p>
          </JBCard>
        ))}
      </div>
      {item.sourceLayer ? (
        <p className="mt-5 max-w-4xl text-sm leading-6 text-jb-ink/72">
          <strong className="text-jb-ink">Source basis:</strong> {item.sourceLayer}
        </p>
      ) : null}
      {item.careNote || item.publicSafety?.note ? (
        <details className="mt-4 max-w-4xl border-l-4 border-jb-ochre bg-jb-lemon/20 px-4 py-3 text-sm text-jb-ink/76">
          <summary className="cursor-pointer font-semibold text-jb-blue">
            Claim and care limits
          </summary>
          <div className="mt-3 space-y-2 leading-6">
            {item.careNote ? <p>{item.careNote}</p> : null}
            {item.publicSafety?.note ? <p>{item.publicSafety.note}</p> : null}
          </div>
        </details>
      ) : null}
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

export function LinksList({ item }: { item: WorkMeta }) {
  if (!item.links?.length) return null;
  return (
    <section aria-labelledby="links-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="links-list">
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

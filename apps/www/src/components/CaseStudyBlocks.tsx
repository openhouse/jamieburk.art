import Image from "next/image";
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
          <TagList compact tags={item.tags} tone="inverse" />
        </div>
      </div>
    </section>
  );
}

export function ArtifactGallery({ item }: { item: WorkMeta }) {
  const visualArtifacts = item.artifacts.filter((artifact) => artifact.asset);
  const mappedArtifacts = item.artifacts.filter((artifact) => !artifact.asset);

  return (
    <section aria-labelledby="artifact-gallery">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-gallery">
        {visualArtifacts.length ? "Public artifacts" : "Artifact map"}
      </h2>
      {visualArtifacts.length ? (
        <div
          className={
            visualArtifacts.length === 1
              ? "mt-5 max-w-4xl"
              : "mt-5 grid gap-5 lg:grid-cols-2"
          }
        >
          {visualArtifacts.map((artifact) => (
            <figure
              className="overflow-hidden rounded-lg border border-jb-ink/14 bg-jb-paper"
              key={artifact.title}
            >
              <a href={artifact.asset?.sourceUrl}>
                <Image
                  alt={artifact.asset?.alt ?? ""}
                  className="h-auto w-full border-b border-jb-ink/12"
                  height={artifact.asset?.height ?? 1}
                  src={artifact.asset?.src ?? ""}
                  width={artifact.asset?.width ?? 1}
                />
              </a>
              <figcaption className="p-5">
                <p className="text-xs font-semibold uppercase text-jb-blue">
                  {artifact.type} / {artifact.asset?.evidenceScope} evidence
                </p>
                <h3 className="mt-3 text-xl font-semibold text-jb-ink">
                  {artifact.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-jb-ink/76">
                  {artifact.asset?.caption}
                </p>
                <p className="mt-3 text-xs leading-5 text-jb-ink/64">
                  Captured {artifact.asset?.capturedAt} from a public web surface.
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      {mappedArtifacts.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {mappedArtifacts.map((artifact, index) => (
            <JBCard className="jb-artifact-surface min-h-56" key={artifact.title}>
              <p className="text-xs font-semibold uppercase text-jb-blue">
                {artifact.type} / 0{index + 1}
              </p>
              <h3 className="mt-10 text-xl font-semibold text-jb-ink">{artifact.title}</h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">{artifact.description}</p>
            </JBCard>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function EvidenceAndLimits({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section aria-labelledby="evidence-and-limits">
      <h2 className="text-2xl font-semibold text-jb-ink" id="evidence-and-limits">
        Evidence and limits
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
        <p className="mt-5 text-sm leading-6 text-jb-ink/72">
          <strong className="text-jb-ink">Source basis:</strong> {item.sourceLayer}
        </p>
      ) : null}
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

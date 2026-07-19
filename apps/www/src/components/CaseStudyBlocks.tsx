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

export function EvidenceAndLimits({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section
      aria-labelledby="evidence-and-limits"
      className="border-t border-jb-ink/15 pt-8"
    >
      <h2 className="text-2xl font-semibold text-jb-ink" id="evidence-and-limits">
        Evidence and limits
      </h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {item.sourceLayer ? (
          <div>
            <h3 className="text-sm font-semibold uppercase text-jb-blue">
              Source basis
            </h3>
            <p className="mt-2 leading-7 text-jb-ink/76">{item.sourceLayer}</p>
          </div>
        ) : null}
        {item.careNote ? (
          <div>
            <h3 className="text-sm font-semibold uppercase text-jb-blue">
              Scope
            </h3>
            <p className="mt-2 leading-7 text-jb-ink/76">{item.careNote}</p>
          </div>
        ) : null}
      </div>
      <details className="mt-6 border-t border-jb-ink/10 pt-4">
        <summary className="cursor-pointer font-semibold text-jb-blue">
          Known, open, and protected
        </summary>
        <dl className="mt-4 grid gap-5 md:grid-cols-3">
          {blocks.map(([label, text]) => (
            <div key={label}>
              <dt className="font-semibold text-jb-ink">{label}</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/72">{text}</dd>
            </div>
          ))}
        </dl>
      </details>
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

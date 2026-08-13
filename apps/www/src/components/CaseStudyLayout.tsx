import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  CreditsList,
  KnownOpenProtected,
  LinksList,
} from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { FieldPhoto } from "@/components/FieldPhoto";
import { References } from "@/components/citations";
import { StatusBadge } from "@/components/StatusBadge";
import { portfolioPhotos } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

function FairRentBrief({ item }: { item: WorkMeta }) {
  return (
    <aside className="jb-fair-rent-brief" aria-labelledby="fair-rent-brief">
      <h2 id="fair-rent-brief">Briefing</h2>
      <dl>
        <div><dt>Documented role</dt><dd>{item.role}</dd></div>
        <div><dt>Evidence period</dt><dd>{item.years}</dd></div>
        <div><dt>Current contribution</dt><dd>Report review, public argument, campaign systems, and coalition continuity.</dd></div>
        <div><dt>Hiring signal</dt><dd>{item.roleFit}</dd></div>
      </dl>
    </aside>
  );
}

function FairRentEvidence({ item }: { item: WorkMeta }) {
  const boundaries = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <div className="jb-fair-rent-evidence">
      <section aria-labelledby="fair-rent-working-evidence">
        <h2 id="fair-rent-working-evidence">Working evidence</h2>
        <div className="jb-fair-rent-evidence-rows">
          {item.artifacts.map((artifact) => (
            <article key={artifact.title}>
              <h3>{artifact.title}</h3>
              <p>{artifact.description}</p>
              <p className="jb-fair-rent-evidence-type">{artifact.type}</p>
              {artifact.media ? (
                <a href={artifact.media.href}>Inspect the public surface <span aria-hidden="true">→</span></a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="fair-rent-evidence-boundaries">
        <h2 id="fair-rent-evidence-boundaries">Evidence boundaries</h2>
        <dl className="jb-fair-rent-boundaries">
          {boundaries.map(([label, text]) => (
            <div key={label}><dt>{label}</dt><dd>{text}</dd></div>
          ))}
        </dl>
        <p className="jb-fair-rent-source"><strong>Source basis:</strong> {item.sourceLayer}</p>
        <details>
          <summary>Claim and care limits</summary>
          <p>{item.careNote}</p>
          <p>{item.publicSafety?.note}</p>
        </details>
      </section>

      {item.links?.length ? (
        <nav aria-label="Fair Rent public links">
          <h2>Public links</h2>
          <ul>{item.links.map((link) => <li key={link.url}><a href={link.url}>{link.label}</a></li>)}</ul>
        </nav>
      ) : null}

      {item.credits?.length ? (
        <section aria-labelledby="fair-rent-credits">
          <h2 id="fair-rent-credits">Credits</h2>
          <ul>{item.credits.map((credit) => <li key={credit}>{credit}</li>)}</ul>
        </section>
      ) : null}
    </div>
  );
}

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const isFairRent = item.slug === "fair-rent-nyc";
  const casePhoto =
    isFairRent
      ? portfolioPhotos.fairRentMaterials
      : item.slug === "callnyc"
        ? portfolioPhotos.callNycInterface
        : null;

  return (
    <article className={`jb-frame py-12 ${isFairRent ? "jb-case-study-folio" : ""}`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
          <h1 className="text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
          <div className="mt-5"><StatusBadge status={item.status} visibility={item.visibility} /></div>
          {casePhoto ? (
            <FieldPhoto
              className="mt-8"
              imageClassName="max-h-[34rem] object-cover"
              photo={casePhoto}
              priority
              sizes="(max-width: 1023px) 100vw, 66vw"
            />
          ) : null}
          <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
            <References pageId={item.slug} />
          </div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          {isFairRent ? <FairRentBrief item={item} /> : <AtAGlance item={item} />}
          <div className="flex flex-wrap gap-3">
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </aside>
      </div>
      {isFairRent ? (
        <FairRentEvidence item={item} />
      ) : (
        <div className="mt-14 space-y-12">
          <ArtifactList item={item} />
          <ArtifactGallery item={item} />
          <KnownOpenProtected item={item} />
          <LinksList item={item} />
          <CreditsList item={item} />
        </div>
      )}
    </article>
  );
}

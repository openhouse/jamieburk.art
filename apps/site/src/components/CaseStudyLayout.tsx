import Link from "next/link";
import type { WorkEntry } from "@/lib/types";
import type { WorkItem } from "@/lib/work";
import { ContentStateBadge } from "@/components/ContentStateBadge";
import { ArtifactGallery } from "./ArtifactGallery";
import { AtAGlance } from "@/components/AtAGlance";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { MdxBody } from "./MdxBody";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SourceLayer } from "./SourceLayer";
import { TagList } from "@/components/TagList";

type CaseStudyLayoutProps = {
  entry?: WorkEntry;
  item?: WorkItem;
};

function renderBody(body: string) {
  return body.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();

    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("## ")) {
      return <h2 key={trimmed}>{trimmed.replace(/^## /, "")}</h2>;
    }

    if (trimmed.startsWith("- ")) {
      const items = trimmed
        .split("\n")
        .map((value) => value.replace(/^- /, "").trim())
        .filter(Boolean);

      return (
        <ul key={trimmed}>
          {items.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      );
    }

    return <p key={trimmed}>{trimmed}</p>;
  });
}

export function CaseStudyLayout({ entry, item }: CaseStudyLayoutProps) {
  if (item) {
    return (
      <article className="section-pad">
        <div className="container-page golden-grid">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ContentStateBadge state={item.contentState} />
              <span className="badge badge-ghost">{item.visibility}</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[color:var(--jamie-muted)]">
              {item.summary}
            </p>
            <div className="mt-6">
              <TagList tags={item.tags} />
            </div>
          </div>
          <AtAGlance
            rows={[
              { label: "Role", value: item.role },
              { label: "Years", value: item.dates },
              { label: "Format", value: item.format },
              { label: "Status", value: item.contentState },
              { label: "Underlying system", value: item.underlyingSystem }
            ]}
          />
        </div>
        <div className="container-page mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="content-flow measure-wide">{renderBody(item.body)}</div>
          <div className="grid h-fit gap-4">
            {item.publicSafety ? <PublicSafetyNote note={item.publicSafety.note} /> : null}
            {item.proof?.length ? (
              <aside className="editorial-card p-5">
                <h2 className="text-xl font-black">Primary proof</h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-[color:var(--jamie-muted)]">
                  {item.proof.map((proof) => (
                    <li key={proof}>{proof}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
        <div className="container-page mt-10">
          <KnownOpenProtected known={item.known} open={item.open} protectedItems={item.protected} />
        </div>
      </article>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <article className="site-shell py-14">
      <Link className="text-sm font-semibold" href="/work">Back to work</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.62fr]">
        <div>
          <p className="eyebrow">{entry.series}</p>
          <h1 className="mt-2 text-4xl font-semibold">{entry.title}</h1>
          <p className="mt-3 text-xl text-[var(--color-muted)]">{entry.subtitle}</p>
          <p className="mt-6 text-lg">{entry.summary}</p>
          <div className="mt-6">
            <TagList tags={entry.tags} />
          </div>
        </div>
        <AtAGlance entry={entry} />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="paper-panel p-5">
          <h2 className="text-xl font-semibold">What was unclear?</h2>
          <p className="mt-2 text-[var(--color-muted)]">{entry.whatWasUnclear}</p>
        </section>
        <section className="paper-panel p-5">
          <h2 className="text-xl font-semibold">What became usable?</h2>
          <p className="mt-2 text-[var(--color-muted)]">{entry.whatBecameUsable}</p>
        </section>
      </div>
      <div className="content-column">
        <MdxBody body={entry.body} />
        <ArtifactGallery artifacts={entry.artifactTypes} />
        <SourceLayer source={entry.sourceLayer} />
        <KnownOpenProtected items={entry.knownOpenProtected} />
        <PublicSafetyNote note={entry.publicSafety.note} />
      </div>
    </article>
  );
}

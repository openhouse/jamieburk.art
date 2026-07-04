import type { WorkItem } from "@/lib/types";
import { AtAGlance } from "@/components/AtAGlance";
import { CaveatBox } from "@/components/CaveatBox";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { TagList } from "@/components/TagList";

type CaseStudyLayoutProps = {
  item: WorkItem;
};

function BulletSection({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-4 space-y-3 leading-7 text-[color:var(--color-muted)]">
        {items.map((item) => (
          <li className="border-l-2 border-[color:var(--color-primary)] pl-4" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyLayout({ item }: CaseStudyLayoutProps) {
  return (
    <article>
      <header className="page-shell py-14">
        <p className="small-caps text-[color:var(--color-primary)]">{item.status}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{item.title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-[color:var(--color-muted)]">{item.summary}</p>
        <div className="mt-6">
          <TagList tags={item.tags} />
        </div>
      </header>
      <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <section>
            <h2 className="text-2xl font-bold">One-line summary</h2>
            <p className="mt-4 leading-8 text-[color:var(--color-muted)]">{item.cardResult}</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Role</h2>
            <p className="mt-4 leading-8 text-[color:var(--color-muted)]">{item.role}</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Context</h2>
            <p className="mt-4 leading-8 text-[color:var(--color-muted)]">{item.underlyingSystem}</p>
          </section>
          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="surface p-5">
              <h2 className="text-xl font-bold">What was unclear?</h2>
              <p className="mt-3 leading-7 text-[color:var(--color-muted)]">{item.whatWasUnclear}</p>
            </div>
            <div className="surface p-5">
              <h2 className="text-xl font-bold">What became usable?</h2>
              <p className="mt-3 leading-7 text-[color:var(--color-muted)]">{item.whatBecameUsable}</p>
            </div>
          </section>
          <BulletSection items={item.whatIDid} title="What I did" />
          <BulletSection items={item.selectedArtifacts} title="Selected artifacts" />
          <BulletSection items={item.toolsAndSystems} title="Tools and systems" />
          <BulletSection items={item.outcomes} title="Outcomes / impact" />
          <BulletSection items={item.whatThisProves} title="What this proves" />
          <KnownOpenProtected items={item.knownOpenProtected} />
        </div>
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <AtAGlance item={item} />
          {item.publicSafetyNote ? (
            <PublicSafetyNote>
              <p>{item.publicSafetyNote}</p>
            </PublicSafetyNote>
          ) : null}
          {item.caveat ? (
            <CaveatBox>
              <p>{item.caveat}</p>
            </CaveatBox>
          ) : null}
        </div>
      </div>
    </article>
  );
}

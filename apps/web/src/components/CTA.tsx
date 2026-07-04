import { site } from "@/data/site";
import { LinkButton } from "@/components/LinkButton";

export function CTA() {
  return (
    <section className="section-band">
      <div className="page-shell">
        <div className="bg-[color:var(--color-ink)] px-6 py-10 text-[color:var(--color-bg)] md:px-10">
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
            Looking for someone who can bring structure, documentation, and implementation discipline to ambiguous work?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/resume" variant="primary">
              Download resume
            </LinkButton>
            <LinkButton href={`mailto:${site.email}`}>Email Jamie</LinkButton>
            <LinkButton href="/work">View selected work</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

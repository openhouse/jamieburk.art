import type { Metadata } from "next";
import { LinkButton } from "@/components/LinkButton";
import { SectionHeading } from "@/components/SectionHeading";
import { roleTags } from "@/data/capabilities";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "About Jamie Burkart's technical project management, implementation, documentation, civic technology, and community systems work.",
  path: "/about"
});

const values = [
  "Clarify what is known.",
  "Name what is open.",
  "Protect what should remain private.",
  "Build what helps people act.",
  "Leave behind something maintainable."
];

export default function AboutPage() {
  return (
    <div className="page-shell py-14">
      <SectionHeading
        eyebrow="About"
        title="I help translate ambiguity into usable systems."
        body="I am Jamie Burkart, a technical project manager and implementation lead based in Brooklyn."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6 text-lg leading-8 text-[color:var(--color-muted)]">
          <p>
            For 14+ years, I have worked across web systems, e-commerce, civic technology, public-facing guidance, small-business operations, cultural infrastructure, community systems, and source-backed knowledge practices.
          </p>
          <p>
            My work is strongest in under-structured environments: places where the need is real, but the requirements, workflows, documentation, ownership, and handoffs are not yet clear.
          </p>
          <p className="font-semibold text-[color:var(--color-ink)]">
            I am interested in the strange, practical work of helping people know what happened, what matters, and what to do next.
          </p>
        </div>
        <aside className="surface p-5">
          <h2 className="text-xl font-bold">Roles / Verbs</h2>
          <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{roleTags.slice(0, 6).join(" · ")}</p>
          <p className="mt-5 text-sm font-bold text-[color:var(--color-primary)]">Clarify · Coordinate · Document · Build · Onboard · Transfer · Maintain</p>
        </aside>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-bold">How I work</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {values.map((value) => (
            <div className="surface p-4 text-sm font-bold leading-6" key={value}>
              {value}
            </div>
          ))}
        </div>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <LinkButton href="/resume" variant="primary">
          Resume
        </LinkButton>
        <LinkButton href="/contact">Contact</LinkButton>
      </div>
    </div>
  );
}

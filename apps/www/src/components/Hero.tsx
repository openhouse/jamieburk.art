import { JBButton } from "@/components/JBButton";

export function Hero() {
  return (
    <section className="border-b-4 jb-rule">
      <div className="jb-frame grid gap-10 py-16 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-20">
        <div className="jb-reading">
          <p className="font-display text-sm font-semibold uppercase text-jb-blue">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] text-jb-ink sm:text-6xl">
            Jamie Burkart
          </h1>
          <p className="mt-6 text-2xl font-semibold leading-snug text-jb-green">
            I turn ambiguous work into usable operating systems.
          </p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">
            I help teams clarify requirements, coordinate delivery, document
            decisions, onboard people, report status honestly, and leave behind
            workflows, runbooks, public-facing tools, and handoffs they can keep
            using.
          </p>
          <p className="mt-4 leading-7 text-jb-ink/72">
            My work is strongest in under-structured environments: places where
            the need is real, but requirements, ownership, documentation,
            planning rhythms, and handoffs are not yet clear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href="/work">View selected work</JBButton>
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-6 text-sm font-medium text-jb-ink/64">
            Brooklyn, NY / Civic technology / Product operations / Knowledge
            systems / Public-facing tools
          </p>
        </div>
        <div
          aria-label="Representative operating-structure diagram"
          className="jb-artifact-surface rounded-lg border border-jb-ink/15 p-5 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-jb-ink">
            {[
              "Requirements",
              "Planning Rhythms",
              "Decision Logs",
              "Risk Notes",
              "Runbooks",
              "Durable Handoffs"
            ].map((label, index) => (
              <div
                className="min-h-22 rounded-lg border border-jb-ink/12 bg-jb-paper/76 p-4"
                key={label}
              >
                <span className="text-xs text-jb-blue">0{index + 1}</span>
                <p className="mt-5">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-jb-ink/68">
            Scattered context becomes shared records, public guidance,
            maintainable workflows, and materials people can use after the
            meeting is over.
          </p>
        </div>
      </div>
    </section>
  );
}

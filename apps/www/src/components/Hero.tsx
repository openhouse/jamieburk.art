import { JBButton } from "@/components/JBButton";

export function Hero() {
  const trail = [
    ["Listen", "Stakeholder context, constraints, risks"],
    ["Structure", "Requirements, workflows, decision records"],
    ["Transfer", "Launch support, onboarding, durable handoffs"]
  ];

  return (
    <section className="border-b-4 jb-rule">
      <div className="jb-frame grid gap-10 py-16 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-20">
        <div className="jb-reading">
          <p className="text-sm font-semibold text-jb-blue">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] text-jb-ink sm:text-6xl">
            Jamie Burkart
          </h1>
          <p className="mt-6 text-2xl font-semibold leading-snug text-jb-green">
            I create operating structure for complex public-facing teams.
          </p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">
            I help teams turn emerging, loosely defined work into usable
            systems: requirements, workflows, documentation, decision trails,
            launch support, onboarding, and durable handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href="/work">View selected work</JBButton>
            <JBButton href="/resume" variant="secondary">
              Download resume
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
          aria-label="Representative operating-structure trail"
          className="rounded-lg border border-jb-ink/15 bg-jb-warm p-5"
        >
          <p className="text-sm font-semibold text-jb-blue">Operating trail</p>
          <ol className="mt-5 space-y-5">
            {trail.map(([step, text]) => (
              <li className="border-t border-jb-ink/14 pt-4" key={step}>
                <p className="text-xl font-semibold text-jb-ink">{step}</p>
                <p className="mt-1 text-sm leading-6 text-jb-ink/76">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-6 text-jb-ink/76">
            The handoff is the artifact: a shared record people can use after
            the meeting, launch, or transition is over.
          </p>
        </div>
      </div>
    </section>
  );
}

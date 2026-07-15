import Link from "next/link";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="border-b-4 jb-rule">
      <div className="jb-frame grid gap-8 py-10 sm:py-14 md:grid-cols-[1.25fr_0.75fr] md:items-end md:py-20">
        <div className="jb-reading">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] text-jb-ink sm:mt-5 sm:text-6xl">
            Jamie Burkart
          </h1>
          <p className="mt-5 text-xl font-semibold leading-snug text-jb-green sm:mt-6 sm:text-2xl">
            I turn emerging work into clear plans, shared decisions, and durable handoffs.
          </p>
          <p className="mt-4 text-lg leading-7 text-jb-ink/78 sm:mt-5 sm:text-xl sm:leading-8">
            When requirements and ownership are still forming, I clarify
            decisions, coordinate implementation, support launch, and leave
            public-facing teams with documentation they can use.
          </p>
          <div className="mt-6 sm:mt-8">
            <JBButton href="/work/technical-operations">See technical operations</JBButton>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a className="text-jb-blue hover:text-jb-green" download href={site.resumePath}>
                Resume PDF
              </a>
              <Link className="text-jb-blue hover:text-jb-green" href="/contact">
                Contact
              </Link>
              <Link className="text-jb-blue hover:text-jb-green" href="/work">
                All work
              </Link>
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-jb-ink/64 sm:mt-6">
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
              "Workflows",
              "Decision Trails",
              "Launch Support",
              "Onboarding",
              "Handoffs"
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

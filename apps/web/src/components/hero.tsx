import Image from "next/image";
import { currentFocus, site } from "@/lib/site";
import { CTAButton } from "./cta-button";

const proofBoard = [
  {
    label: "unclear",
    body: "Scattered context, stakeholder needs, public data, and launch pressure"
  },
  {
    label: "structure",
    body: "Requirements, decision trails, source maps, QA notes, and handoff materials"
  },
  {
    label: "usable",
    body: "Tools, workflows, documentation, and operating memory teams can keep using"
  }
];

export function Hero() {
  return (
    <section className="section-y border-b border-base-300">
      <div className="page-shell">
        <div className="max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-primary">
            {site.location} · Technical operations · Civic technology · Product operations · Knowledge systems
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.02] md:text-7xl">Jamie Burkart</h1>
          <p className="mt-4 text-2xl font-black leading-tight text-primary md:text-3xl">{site.role}</p>
          <p className="mt-8 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            I turn under-structured work into usable systems.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-base-content/75">
            Requirements, workflows, documentation, decision trails, public tools, launch support,
            onboarding, and durable handoffs for civic, cultural, small-business, community, and
            public-facing teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/work">View selected work</CTAButton>
            <CTAButton href="/resume" variant="secondary">Download resume</CTAButton>
            <CTAButton href="/contact" variant="quiet">Contact Jamie</CTAButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {currentFocus.slice(0, 5).map((focus) => (
              <li className="rounded border border-base-300 bg-base-200 px-3 py-1 text-sm font-bold" key={focus}>
                {focus}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 overflow-hidden rounded border border-base-300 bg-base-200">
          <Image
            alt="Diagram connecting unclear context to structured workflows and usable handoffs."
            className="h-auto w-full"
            height={260}
            priority
            src="/images/work/proof-system-map.svg"
            width={1180}
          />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {proofBoard.map((item, index) => (
            <div className="rounded border border-base-300 bg-base-200 p-4" key={item.label}>
              <p className="text-xs font-black text-primary">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-base-content/55">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-base-content/75">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

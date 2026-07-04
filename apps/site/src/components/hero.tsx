import { CtaButton } from "@/components/cta-button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="section">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{site.title}</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.95] text-base-content md:text-7xl">{site.name}</h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-base-content">
            I build operating structure for ambiguous public-facing technical work.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/75">
            I help civic, cultural, small-business, public-interest, and technical teams turn under-structured
            work into usable systems: requirements, workflows, documentation, decision trails, launch support,
            onboarding, public-facing tools, source-backed memory, and durable handoffs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaButton href="/work">View selected work</CtaButton>
            <a className="btn btn-outline rounded-lg" href={site.resumePath}>
              Download resume
            </a>
            <CtaButton href="/contact" variant="quiet">
              Contact Jamie
            </CtaButton>
          </div>
          <p className="mt-6 text-sm text-base-content/60">{site.locationLine}</p>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-lg border quiet-rule bg-base-200 p-5">
          <div className="grid h-full min-h-64 grid-cols-5 grid-rows-5 gap-2" aria-hidden="true">
            <div className="col-span-3 row-span-2 rounded-md bg-[#fce1d1]" />
            <div className="col-span-2 row-span-3 rounded-md bg-[#74c2e5]" />
            <div className="col-span-2 row-span-2 rounded-md bg-[#beebc7]" />
            <div className="col-span-3 row-span-1 rounded-md bg-[#f7ec86]" />
            <div className="col-span-1 row-span-2 rounded-md bg-[#018c85]" />
            <div className="col-span-4 row-span-1 rounded-md bg-[#0b5f81]" />
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-lg bg-base-100/90 p-4 shadow-sm">
            <p className="text-sm font-semibold text-base-content">Clarify - Structure - Build - Document - Transfer</p>
            <p className="mt-1 text-xs leading-5 text-base-content/65">
              Plain claim first. Beautiful sentence second. Proof nearby.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export function Hero() {
  return (
    <section className="section border-b hairline bg-base-100/72">
      <div className="main-field grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="measure">
          <h1 className="text-5xl font-semibold leading-tight text-jamie-ink sm:text-6xl">
            Jamie Burkart
          </h1>
          <p className="mt-5 text-xl font-medium text-broadway-blue">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-7 text-3xl font-semibold leading-tight text-jamie-ink sm:text-4xl">
            I build operating structure for ambiguous public-facing technical work.
          </p>
          <p className="mt-6 text-lg leading-8 text-jamie-muted">
            I help civic, cultural, small-business, public-interest, and technical teams turn
            under-structured work into usable systems: requirements, workflows, documentation,
            decision trails, launch support, onboarding, public-facing tools, source-backed memory,
            and durable handoffs.
          </p>
          <p className="mt-5 text-lg font-medium text-jamie-ink">
            I make messy public systems easier to enter, remember, and repair.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/work">
              View selected work
            </Link>
            <Link className="btn btn-outline" href="/resume">
              Download resume
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Contact Jamie
            </Link>
          </div>
        </div>
        <div className="system-diagram rounded-lg p-5" aria-label="Clarify, structure, build, document, transfer">
          <ol className="grid gap-3">
            {["Clarify", "Structure", "Build", "Document", "Transfer"].map((step, index) => (
              <li
                className="flex items-center justify-between rounded border border-jamie-line/60 bg-base-100/80 px-4 py-3"
                key={step}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-jamie-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold text-jamie-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const links = [
  {
    href: "/work/technical-operations",
    title: "Technical Operations & Implementation",
    copy:
      "The current professional frame: operating systems, documentation, delivery, onboarding, and handoffs."
  },
  {
    href: "/work/harry-j-epstein",
    title: "Harry J. Epstein Company",
    copy:
      "Business-facing proof: e-commerce, analytics, operations, implementation, and measurable value."
  },
  {
    href: "/work/fairrentnyc-commercial-rent-stabilization",
    title: "FairRentNYC / NYC Artist Coalition",
    copy:
      "Civic proof: campaign memory, stakeholder coordination, source maps, public-data framing."
  },
  {
    href: "/work/callnyc",
    title: "CallNYC.org",
    copy:
      "Civic-data proof: public-facing resident guidance from open data."
  },
  {
    href: "/resume",
    title: "Résumé",
    copy: "Download the current résumé."
  }
];

export function StartHere() {
  return (
    <section className="section rule-top bg-base-200/60">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.382fr_0.618fr]">
          <div>
            <p className="eyebrow mb-3">Start here</p>
            <h2 className="h2">Quickest path through the work</h2>
            <p className="lead mt-5">
              New to my work? These pages give the fastest, clearest route
              through the portfolio.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {links.map((item) => (
              <Link
                className="card block p-5 text-base-content no-underline transition hover:border-primary"
                href={item.href}
                key={item.href}
              >
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

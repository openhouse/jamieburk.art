import Link from "next/link";

const startLinks = [
  {
    title: "Technical Operations & Implementation",
    href: "/work/technical-operations",
    body: "The current professional frame: operating systems, documentation, delivery, onboarding, and handoffs.",
  },
  {
    title: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    body: "Business-facing proof: e-commerce, analytics, operations, implementation, and measurable value.",
  },
  {
    title: "FairRentNYC / NYC Artist Coalition",
    href: "/work/fairrentnyc-commercial-rent-stabilization",
    body: "Civic proof: campaign memory, stakeholder coordination, source maps, public-data framing.",
  },
  {
    title: "CallNYC.org",
    href: "/work/callnyc",
    body: "Civic-data proof: public-facing resident guidance from open data.",
  },
  {
    title: "Resume",
    href: "/resume",
    body: "A concise role summary and downloadable PDF path.",
  },
] as const;

export function StartHere() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {startLinks.map((item) => (
        <Link
          className="rounded-md border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:bg-base-200"
          href={item.href}
          key={item.href}
        >
          <h3 className="font-bold leading-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral">{item.body}</p>
        </Link>
      ))}
    </div>
  );
}

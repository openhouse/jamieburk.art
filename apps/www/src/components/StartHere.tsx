import Link from "next/link";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation"
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company"
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization"
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org"
  },
  {
    href: "/resume",
    label: "Resume"
  }
] as const;

export function StartHere() {
  return (
    <section className="border-y border-jb-ink/10 bg-jb-paper" aria-labelledby="start-here-title">
      <div className="jb-frame grid gap-5 py-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-jb-ink" id="start-here-title">
            Start here
          </h2>
          <p className="mt-2 max-w-md leading-7 text-jb-ink/72">
            New to my work? These pages give the quickest path through the portfolio.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {startHereLinks.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-lg border border-jb-ink/12 bg-jb-warm px-4 py-3 font-semibold text-jb-blue hover:border-jb-blue/35 hover:bg-jb-sky/18 hover:text-jb-green"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

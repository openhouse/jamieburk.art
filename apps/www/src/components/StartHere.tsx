import Link from "next/link";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations proof page"
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein"
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization"
  },
  {
    href: "/work/callnyc",
    label: "CallNYC"
  },
  {
    href: "/resume",
    label: "Resume"
  },
  {
    href: "/contact",
    label: "Contact"
  }
] as const;

export function StartHere() {
  return (
    <section className="border-b border-jb-ink/12 bg-jb-warm/75">
      <div className="jb-frame grid gap-5 py-8 lg:grid-cols-[0.4fr_1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-jb-blue">Start here</p>
          <h2 className="mt-2 text-2xl font-semibold text-jb-ink">
            Fast paths for referral readers
          </h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {startHereLinks.map((item) => (
            <li key={item.href}>
              <Link
                className="block rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-sm font-semibold text-jb-blue hover:border-jb-blue/35 hover:text-jb-green"
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

import Link from "next/link";

const startLinks = [
  ["Technical Operations proof page", "/work/technical-operations"],
  ["Harry J. Epstein Company", "/work/harry-j-epstein"],
  ["FairRentNYC / Commercial Rent Stabilization", "/work/fair-rent-nyc"],
  ["CallNYC", "/work/callnyc"],
  ["Resume", "/resume"],
  ["Contact", "/contact"]
] as const;

export function StartHere() {
  return (
    <section aria-labelledby="start-here" className="border-b border-jb-ink/10 bg-jb-warm/72">
      <div className="jb-frame py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-jb-blue">Start here</p>
            <h2 className="mt-1 text-2xl font-semibold text-jb-ink" id="start-here">
              A fast path for hiring readers and warm referrers
            </h2>
          </div>
          <nav aria-label="Start here links">
            <ul className="flex flex-wrap gap-2">
              {startLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    className="inline-flex rounded-lg border border-jb-ink/12 bg-jb-paper px-3 py-2 text-sm font-semibold text-jb-blue hover:text-jb-green"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

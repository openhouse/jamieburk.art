import { selectedProofGroups } from "@/data/proofs";

export function ProofBankProjection() {
  return (
    <section className="jb-frame py-16" aria-labelledby="selected-proof">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">
          Selected proof
        </p>
        <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="selected-proof">
          Strong claims, shaped for hiring clarity
        </h2>
        <p className="mt-4 leading-8 text-jb-ink/76">
          The public story is narrower than the archive: a set of defensible
          claims that show Jamie creating operating structure across technical,
          civic, community, and knowledge-system work.
        </p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {selectedProofGroups.map((group) => (
          <article
            className="rounded-lg border border-jb-ink/15 bg-jb-warm/86 p-5 shadow-sm"
            key={group.area}
          >
            <p className="text-xs font-semibold uppercase text-jb-blue">
              {group.area}
            </p>
            <h3 className="mt-4 text-xl font-semibold text-jb-ink">
              {group.signal}
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-jb-ink/74">
              {group.claims.map((claim) => (
                <li className="flex gap-3" key={claim}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 flex-none rounded-full bg-jb-ochre"
                  />
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

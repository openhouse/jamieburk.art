const proofs = [
  "14+ years building operating structure",
  "30+ pages of civic campaign-memory infrastructure",
  "2x revenue growth contribution for legacy e-commerce business",
  "35 city ecosystems reached through WOWList.org",
  "300+ hosted gatherings / 20+ resident artists supported"
];

export function ProofStrip() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="site-shell grid gap-3 py-6 md:grid-cols-5">
        {proofs.map((proof) => (
          <p className="text-sm font-semibold text-[var(--color-ink)]" key={proof}>{proof}</p>
        ))}
      </div>
    </section>
  );
}

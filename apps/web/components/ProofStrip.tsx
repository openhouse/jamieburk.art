const proofs = [
  "14+ years creating operating structure",
  "30+ pages of civic campaign-memory infrastructure",
  "2x revenue growth contribution for legacy e-commerce business",
  "35 city ecosystems reached through WOWList.org",
  "300+ gatherings / 20+ resident artists supported"
];

export function ProofStrip() {
  return (
    <section className="rule-top bg-base-100">
      <div className="container grid gap-px overflow-hidden rounded-lg border border-base-300 bg-base-300 md:grid-cols-5">
        {proofs.map((proof) => (
          <div className="bg-base-200 p-5" key={proof}>
            <p className="text-sm font-black leading-snug">{proof}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

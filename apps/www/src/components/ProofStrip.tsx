const proofItems = [
  "14+ years building operating structure",
  "Built e-commerce, catalog, and checkout systems for HJE",
  "WOWList reached 1,800+ users and 16,000+ posts/events",
  "Built Commercial Rent Stabilization campaign-memory infrastructure",
  "Public-record proof across CallNYC and KC Town Hall"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item}>
            <p className="text-base font-semibold leading-6">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

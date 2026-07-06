const proofItems = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Contributed to a period of e-commerce revenue growth for a legacy business",
  "Built and stewarded shared civic campaign-memory infrastructure",
  "Co-built community web systems for multi-city creative ecosystems",
  "Created repeatable hosting and continuity systems for long-running gatherings and resident-artist support"
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

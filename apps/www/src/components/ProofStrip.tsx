const proofItems = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Helped a legacy tool business move paper-and-phone operations into e-commerce workflows",
  "Built 30+ pages of shared Commercial Rent Stabilization campaign memory",
  "Co-built WOWList across 35+ active city scenes and 16,000+ archived posts/events",
  "Documented 300+ gatherings and supported 20+ resident artists"
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

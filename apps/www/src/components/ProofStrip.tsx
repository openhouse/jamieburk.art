const proofItems = [
  "14+ years creating operating structure",
  "Contributed to a period of 2x online/e-commerce revenue growth",
  "30+ pages of shared civic campaign documentation",
  "Roughly 35 city-based arts and music communities reached",
  "300+ gatherings / 20+ resident artists supported"
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

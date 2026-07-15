const proofItems = [
  "14+ years building operating structure",
  "Contributed to 2x revenue growth for a legacy e-commerce business",
  "Helped build and steward 30+ pages of civic campaign-memory infrastructure",
  "Co-built community web systems that reached roughly 35 city ecosystems",
  "Supported 300+ gatherings and 20+ resident artists"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-32 bg-jb-blue px-5 py-6" key={item}>
            <p className="font-display text-base font-semibold leading-6">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

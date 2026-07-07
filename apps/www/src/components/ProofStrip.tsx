const proofItems = [
  "14+ years building operating structure across public-facing work",
  "Contributed to 2x revenue growth for a legacy e-commerce business",
  "Helped structure 30+ pages of shared civic campaign memory",
  "Co-built community calendar systems across roughly 35 city ecosystems",
  "Created participation systems across 300+ gatherings and 20+ resident artists"
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

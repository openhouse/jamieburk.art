const proofItems = [
  "14+ years building operating structure",
  "Legacy e-commerce transformation and online-growth contribution",
  "30+ pages of CRS campaign memory plus legislative and data materials",
  "WOWList archive: 1,800+ users, 16,000+ events, 35+ active city scenes",
  "Sunday Dinner / 196: 300+ gatherings and 20+ resident artists"
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

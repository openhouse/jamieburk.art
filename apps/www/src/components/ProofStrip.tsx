const proofItems = [
  "14+ years building operating structure",
  "2x revenue growth contribution for legacy e-commerce business",
  "30+ pages of civic campaign-memory infrastructure",
  "35 city ecosystems reached through WOWList.org",
  "300+ hosted gatherings / 20+ resident artists supported"
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

const proofItems = [
  "14+ years building operating structure",
  "Contributed to 2x revenue growth for a legacy e-commerce business",
  "Built and stewarded 30+ pages of civic campaign-memory infrastructure",
  "WOWList.org reached roughly 35 city ecosystems",
  "300+ hosted gatherings / 20+ resident artists supported"
];

export function ProofStrip() {
  return (
    <section aria-label="Selected proof points" className="bg-jb-blue text-jb-paper">
      <div className="jb-frame grid gap-px py-px sm:grid-cols-2 lg:grid-cols-5">
        {proofItems.map((item) => (
          <div className="min-h-36 bg-jb-blue px-5 py-6" key={item}>
            <p className="jb-display text-base font-semibold leading-6">{item}</p>
            <p className="mt-4 text-xs font-medium leading-5 text-jb-paper/68">
              TODO: Jamie approval required before launch.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

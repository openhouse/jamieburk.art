const proofItems = [
  "14+ years building operating structure",
  "2x revenue growth contribution for legacy e-commerce business",
  "30+ pages of civic campaign-memory infrastructure",
  "35 city ecosystems reached through WOWList.org",
  "300+ hosted gatherings and 20+ resident artists supported"
];

export function ProofStrip() {
  return (
    <section className="border-y quiet-rule bg-base-200">
      <div className="main grid gap-3 py-6 md:grid-cols-5">
        {proofItems.map((item) => (
          <div className="rounded-lg border quiet-rule bg-base-100 p-4" key={item}>
            <p className="text-sm font-semibold leading-6 text-base-content">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

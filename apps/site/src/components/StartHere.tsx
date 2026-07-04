const starts = [
  ["For hiring managers", "read Technical Operations, then Harry J. Epstein, FairRentNYC, and CallNYC."],
  ["For warm referrers", "use the referral sentence on Contact."],
  ["For civic / cultural peers", "start with FairRentNYC, 196 / Sunday Dinner, and Source-Backed Team Memory."]
];

export function StartHere() {
  return (
    <section className="site-shell pb-12">
      <div className="paper-panel p-6">
        <p className="eyebrow">Start here</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {starts.map(([title, copy]) => (
            <div key={title}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

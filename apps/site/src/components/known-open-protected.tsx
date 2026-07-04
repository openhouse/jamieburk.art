type KnownOpenProtectedProps = {
  known: string;
  open: string;
  protectedText: string;
};

export function KnownOpenProtected({ known, open, protectedText }: KnownOpenProtectedProps) {
  const items = [
    ["Known", known],
    ["Open", open],
    ["Protected", protectedText]
  ];

  return (
    <section className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">Known / Open / Protected</h2>
      <dl className="mt-4 grid gap-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-bold uppercase tracking-wide text-base-content/50">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-base-content/75">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

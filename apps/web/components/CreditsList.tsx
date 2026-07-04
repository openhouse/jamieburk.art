export function CreditsList({ credits }: { credits?: string[] }) {
  if (!credits?.length) {
    return null;
  }

  return (
    <section className="system-card p-5">
      <h2 className="text-lg font-semibold text-jamie-ink">Credits</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-jamie-muted">
        {credits.map((credit) => (
          <li key={credit}>{credit}</li>
        ))}
      </ul>
    </section>
  );
}

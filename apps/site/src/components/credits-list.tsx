type CreditsListProps = {
  credits: string[];
};

export function CreditsList({ credits }: CreditsListProps) {
  if (credits.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">Credits</h2>
      <ul className="mt-4 grid gap-2">
        {credits.map((credit) => (
          <li className="text-sm leading-6 text-base-content/75" key={credit}>
            {credit}
          </li>
        ))}
      </ul>
    </section>
  );
}

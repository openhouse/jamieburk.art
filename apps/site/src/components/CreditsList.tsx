export function CreditsList({ credits }: { credits: string[] }) {
  return (
    <ul className="mt-4 list-disc pl-6">
      {credits.map((credit) => (
        <li key={credit}>{credit}</li>
      ))}
    </ul>
  );
}

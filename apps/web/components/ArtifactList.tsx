type ArtifactListProps = {
  title?: string;
  items: string[];
};

export function ArtifactList({ title = "Selected artifacts", items }: ArtifactListProps) {
  return (
    <section>
      <h2 className="h3">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li className="rounded-md border border-base-300 bg-base-200 p-4 text-sm font-bold" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

type KnownOpenProtectedProps = {
  known: string[];
  open: string[];
  protectedItems: string[];
};

export function KnownOpenProtected({ known, open, protectedItems }: KnownOpenProtectedProps) {
  const columns = [
    { title: "Known", items: known, tone: "border-primary/35" },
    { title: "Open", items: open, tone: "border-accent/50" },
    { title: "Protected", items: protectedItems, tone: "border-secondary/35" }
  ];

  return (
    <section className="mt-12 grid gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <article className={`rounded border bg-base-200 p-5 ${column.tone}`} key={column.title}>
          <h2 className="text-xl font-black">{column.title}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-base-content/75">
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

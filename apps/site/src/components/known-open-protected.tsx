type KnownOpenProtectedProps = {
  known: string[];
  open: string[];
  protectedItems: string[];
};

export function KnownOpenProtected({
  known,
  open,
  protectedItems,
}: KnownOpenProtectedProps) {
  const groups = [
    { title: "Known", items: known },
    { title: "Open", items: open },
    { title: "Protected", items: protectedItems },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {groups.map((group) => (
        <section
          className="rounded-md border border-base-300 bg-base-100 p-5"
          key={group.title}
        >
          <h3 className="font-bold">{group.title}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

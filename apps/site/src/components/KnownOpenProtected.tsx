type KnownOpenProtectedProps = {
  known: string[];
  open: string[];
  protectedItems: string[];
};

export function KnownOpenProtected({ known, open, protectedItems }: KnownOpenProtectedProps) {
  const groups = [
    { title: "Known", items: known },
    { title: "Open", items: open },
    { title: "Protected", items: protectedItems }
  ];

  return (
    <div className="kop-grid">
      {groups.map((group) => (
        <section key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

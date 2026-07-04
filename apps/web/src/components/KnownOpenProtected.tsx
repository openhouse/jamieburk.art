import type { KnownOpenProtected as KnownOpenProtectedType } from "@/lib/types";

type KnownOpenProtectedProps = {
  items: KnownOpenProtectedType;
};

const sections = [
  { key: "known", title: "Known" },
  { key: "open", title: "Open" },
  { key: "protected", title: "Protected" }
] as const;

export function KnownOpenProtected({ items }: KnownOpenProtectedProps) {
  return (
    <section aria-labelledby="known-open-protected" className="section-block">
      <p className="eyebrow">Claim discipline</p>
      <h2 id="known-open-protected">Known / Open / Protected</h2>
      <div className="kop-grid">
        {sections.map((section) => (
          <article className="kop-card" key={section.key}>
            <h3>{section.title}</h3>
            <ul>
              {items[section.key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

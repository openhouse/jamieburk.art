import { getFeaturedWork } from "@/lib/content";
import { LinkButton } from "@/components/LinkButton";

const startSlugs = [
  "technical-operations",
  "harry-j-epstein",
  "fairrentnyc-commercial-rent-stabilization",
  "callnyc",
  "resume"
] as const;

const fallback = {
  "technical-operations": {
    title: "Technical Operations & Implementation",
    body: "The current professional frame: operating systems, documentation, delivery, onboarding, and handoffs.",
    href: "/work/technical-operations"
  },
  resume: {
    title: "Resume",
    body: "Download the current resume and scan role-fit highlights.",
    href: "/resume"
  }
};

export function StartHere() {
  const featured = getFeaturedWork();
  const items = startSlugs.map((slug) => {
    if (slug in fallback) {
      return fallback[slug as keyof typeof fallback];
    }

    const work = featured.find((item) => item.slug === slug);
    return {
      title: work?.title ?? slug,
      body: work?.cardResult ?? "",
      href: `/work/${slug}`
    };
  });

  return (
    <section className="section-band">
      <div className="page-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="measure">
            <p className="small-caps text-[color:var(--color-primary)]">Start here</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">New to my work?</h2>
            <p className="mt-4 text-lg leading-8 text-[color:var(--color-muted)]">
              These pages give the quickest path through the portfolio.
            </p>
          </div>
          <LinkButton href="/work">View all selected work</LinkButton>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {items.map((item) => (
            <a className="surface block p-5 no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--color-primary)]" href={item.href} key={item.href}>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">{item.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

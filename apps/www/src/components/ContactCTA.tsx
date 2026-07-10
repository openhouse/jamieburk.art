import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section className="rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
      <h2 className="text-2xl font-semibold text-jb-ink">
        Looking for technical project management, product operations,
        implementation, or knowledge-systems support?
      </h2>
      <p className="mt-3 leading-7 text-jb-ink/74">
        Email Jamie about roles, referrals, bounded consulting work, or
        collaboration.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <JBButton href="/resume" variant="secondary">
          Download resume
        </JBButton>
        <JBButton href={site.emailHref}>
          Email Jamie
        </JBButton>
      </div>
    </section>
  );
}

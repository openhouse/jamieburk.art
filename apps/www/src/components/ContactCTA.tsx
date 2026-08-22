import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ContactCTA({
  showResumeLink = true
}: {
  showResumeLink?: boolean;
} = {}) {
  return (
    <section className="border-y border-jb-ink/20 py-7">
      <p className="jb-section-label">Next conversation</p>
      <h2 className="mt-3 text-3xl leading-tight text-jb-ink">
        Looking for technical project management, product operations,
        implementation, or knowledge-systems support?
      </h2>
      <p className="mt-3 leading-7 text-jb-ink/74">
        Email Jamie about roles, referrals, focused consulting work, or
        collaboration.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {showResumeLink ? (
          <JBButton href="/resume" variant="secondary">
            View resume
          </JBButton>
        ) : null}
        <JBButton href={site.emailHref}>
          Email Jamie
        </JBButton>
      </div>
    </section>
  );
}

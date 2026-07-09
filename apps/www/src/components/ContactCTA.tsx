import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section className="rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
      <h2 className="text-2xl font-semibold text-jb-ink">
        Looking for technical project management, product operations,
        implementation, or knowledge-systems support?
      </h2>
      <div className="mt-5 flex flex-wrap gap-3">
        <JBButton href="/resume" variant="secondary">
          Download resume
        </JBButton>
        <JBButton href={site.emailHref}>
          Contact Jamie
        </JBButton>
      </div>
    </section>
  );
}

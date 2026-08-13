import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";

type ContactCTAProps = {
  compact?: boolean;
};

export function ContactCTA({ compact = false }: ContactCTAProps) {
  return (
    <section className="border-y border-jb-ink/20 py-7">
      {compact ? null : (
        <>
          <h2 className="text-3xl leading-tight text-jb-ink">
            Let’s talk about the public product work.
          </h2>
        </>
      )}
      <p className={`${compact ? "" : "mt-3"} leading-7 text-jb-ink/74`}>
        Email Jamie about senior product roles, technical delivery, referrals,
        or a mission-aligned collaboration.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <JBButton href="/resume" variant="secondary">
          View resume
        </JBButton>
        <JBButton href={site.emailHref}>
          Email Jamie
        </JBButton>
      </div>
    </section>
  );
}

import { ButtonLink } from "@/components/ButtonLink";

export function ContactCTA() {
  return (
    <div className="surface callout-band p-6">
      <h2 className="text-2xl font-black">For roles, referrals, consulting, or collaboration</h2>
      <p className="mt-3 leading-7 text-[color:var(--color-muted)]">
        Best-fit conversations: technical project management, product operations, implementation,
        documentation systems, civic technology, govtech, knowledge systems, and public-facing
        tools.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href="/contact" icon="mail">
          Contact Jamie
        </ButtonLink>
        <ButtonLink href="/resume" icon="download" variant="secondary">
          Resume
        </ButtonLink>
      </div>
    </div>
  );
}

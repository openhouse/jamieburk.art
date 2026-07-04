import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Roles, referrals, consulting conversations, and collaborations.</h2>
        <p>
          Best-fit conversations: technical project management, product operations, implementation, documentation
          systems, civic technology, govtech, knowledge systems, and public-facing tools.
        </p>
      </div>
      <ButtonLink href={`mailto:${site.email}`}>Email Jamie</ButtonLink>
    </section>
  );
}

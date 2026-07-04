import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="section-band">
      <div className="site-shell">
        <p className="eyebrow">Not found</p>
        <h1>This page is not in the public room.</h1>
        <p className="hero-support">It may be private, unfinished, or intentionally omitted from the V1 portfolio.</p>
        <ButtonLink href="/work">Return to selected systems</ButtonLink>
      </div>
    </section>
  );
}

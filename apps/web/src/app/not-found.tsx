import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>
        This room is not framed yet. The useful public paths are the homepage, selected work,
        resume, and contact.
      </p>
      <div className="hero-actions">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          View selected work
        </ButtonLink>
      </div>
    </section>
  );
}

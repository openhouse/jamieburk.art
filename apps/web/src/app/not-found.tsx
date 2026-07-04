import { CTAButton } from "../components";

export default function NotFound() {
  return (
    <section className="section-band">
      <div className="section-inner">
        <p className="eyebrow">404</p>
        <h1 className="page-title">Room not found.</h1>
        <p className="lead">
          This page is not part of the public house yet, or it moved while the structure was being
          cleaned up.
        </p>
        <div className="action-row">
          <CTAButton href="/work">View selected work</CTAButton>
          <CTAButton href="/" variant="ghost">
            Return home
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

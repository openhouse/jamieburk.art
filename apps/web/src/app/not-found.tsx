import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container stack-lg">
        <div className="prose-container stack">
          <p className="eyebrow">Not found</p>
          <h1>This page is not available.</h1>
          <p className="lead">
            The V1 site is intentionally narrow. Start with selected work, resume, or contact.
          </p>
        </div>
        <div className="cluster">
          <Link className="button button-primary" href="/work">
            View work
          </Link>
          <Link className="button button-secondary" href="/contact">
            Contact Jamie
          </Link>
        </div>
      </div>
    </section>
  );
}

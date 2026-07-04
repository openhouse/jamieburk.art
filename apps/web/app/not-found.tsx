import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="main-field measure">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-broadway-blue">
          Not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold">This page is not in the public map.</h1>
        <p className="mt-4 text-lg leading-8 text-jamie-muted">
          The site is intentionally selected, not exhaustive. Try the work index or contact page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/work">
            View work
          </Link>
          <Link className="btn btn-outline" href="/contact">
            Contact Jamie
          </Link>
        </div>
      </div>
    </section>
  );
}

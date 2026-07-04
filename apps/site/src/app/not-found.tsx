import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-reading section-pad">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-lg text-neutral">
        This page may have moved, or it may belong to a later room of the site.
      </p>
      <Link className="btn btn-primary mt-8 rounded-md" href="/work">
        View selected work
      </Link>
    </section>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="page-shell">
        <div className="prose-measure">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-primary">404</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Page not found</h1>
          <p className="mt-5 text-lg leading-8 text-base-content/75">
            This page is not part of the V1 public proof surface.
          </p>
          <Link className="btn btn-primary mt-8 rounded" href="/work">
            View selected work
          </Link>
        </div>
      </div>
    </section>
  );
}

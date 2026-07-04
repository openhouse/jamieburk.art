import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-shell py-20">
      <div className="content-column">
        <p className="eyebrow">404</p>
        <h1 className="text-4xl font-semibold">This page is not part of the selected proof site.</h1>
        <p className="mt-5 text-[var(--color-muted)]">Try the work index, resume, or contact page.</p>
        <Link className="btn mt-6 bg-[var(--color-accent)] text-white hover:bg-[#08445d]" href="/work">
          View selected work
        </Link>
      </div>
    </section>
  );
}

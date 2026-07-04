import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">404</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-base-content/70">
          This page is not part of the public portfolio scaffold.
        </p>
        <Link className="btn btn-primary mt-6 rounded-lg" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}

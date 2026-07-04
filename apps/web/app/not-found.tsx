import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section">
      <div className="container copy">
        <p className="eyebrow mb-4">404</p>
        <h1 className="h1">Page not found</h1>
        <p className="lead mt-6">
          That page is not part of the public V1 portfolio.
        </p>
        <Link className="mt-8 inline-flex font-black" href="/work">
          View selected work
        </Link>
      </div>
    </div>
  );
}

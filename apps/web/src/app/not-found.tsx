import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="golden-shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold">That page is not available.</h1>
      <p className="mt-4 max-w-xl text-base-content/75">The public site may have moved a route or held back private material.</p>
      <Link className="btn btn-primary mt-8" href="/work">
        View selected work
      </Link>
    </div>
  );
}


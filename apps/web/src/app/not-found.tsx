import Link from "next/link";

export default function NotFound() {
  return (
    <div className="plain-page">
      <p className="eyebrow">Not found</p>
      <h1>Page not found</h1>
      <p>The page you are looking for is not available in this public-safe V1 scaffold.</p>
      <Link className="btn btn-primary" href="/work">View selected work</Link>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell py-20">
      <p className="small-caps text-[color:var(--color-primary)]">404</p>
      <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-xl leading-7 text-[color:var(--color-muted)]">
        This page is not part of the V1 portfolio scaffold.
      </p>
      <Link className="btn btn-primary mt-8 min-h-11 rounded-[0.382rem] normal-case" href="/work">
        View selected work
      </Link>
    </div>
  );
}

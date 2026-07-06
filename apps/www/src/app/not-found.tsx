import Link from "next/link";

export default function NotFound() {
  return (
    <div className="jb-frame py-20">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Page not found</h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          The page may have moved, or it may not be part of the public V1
          surface.
        </p>
        <Link className="mt-8 inline-block font-semibold text-jb-blue hover:text-jb-green" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}

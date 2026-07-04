import { site } from "@/data/site";

export function ResumeCta() {
  return (
    <aside className="rounded-lg border quiet-rule bg-base-100 p-5">
      <h2 className="text-xl font-bold">Resume</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/70">
        Web resume now, downloadable PDF placeholder in the public asset path for V1.
      </p>
      <a className="btn btn-primary btn-sm mt-4 rounded-lg" href={site.resumePath}>
        Download resume
      </a>
    </aside>
  );
}

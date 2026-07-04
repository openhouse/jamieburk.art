import { site } from '@/data/site';

export function ResumeDownload() {
  return (
    <div className="border border-base-content/10 bg-base-200 p-6">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <p className="mt-3 text-base-content/75">
        Download the technical project management resume, focused on product operations, implementation, documentation, and public-facing systems.
      </p>
      <a className="btn btn-primary mt-5" href={site.resumePath}>
        Download resume
      </a>
    </div>
  );
}

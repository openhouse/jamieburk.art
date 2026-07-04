import Link from "next/link";

export function ResumeCTA() {
  return (
    <div className="system-card p-5">
      <h2 className="text-xl font-semibold text-jamie-ink">Resume</h2>
      <p className="mt-3 leading-7 text-jamie-muted">
        Web resume and downloadable placeholder PDF are available while the final resume file is
        confirmed.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="btn btn-primary" href="/resume">
          View resume
        </Link>
        <a
          className="btn btn-outline"
          href="/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

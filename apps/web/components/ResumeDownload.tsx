import { ButtonLink } from "./ButtonLink";

import { site } from "@/lib/site";

export function ResumeDownload() {
  return (
    <div className="card p-5">
      <h2 className="text-xl font-black">Résumé PDF</h2>
      <p className="mt-2 text-sm text-muted">
        Current public resume file for technical project management, technical
        operations, product operations, implementation, civic technology, and
        knowledge-systems roles.
      </p>
      <div className="mt-5">
        <ButtonLink download href={site.resumePath}>
          Download résumé PDF
        </ButtonLink>
      </div>
    </div>
  );
}

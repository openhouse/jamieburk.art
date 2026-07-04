import { Download } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { site } from "@/data/site";

export function ResumeDownload() {
  return (
    <div className="rounded-md border border-base-300 bg-base-100 p-5">
      <h2 className="text-2xl font-bold">Resume</h2>
      <p className="mt-3 text-sm leading-6 text-neutral">
        Download the current resume PDF path for technical project management,
        product operations, implementation, civic technology, knowledge systems,
        and public-facing digital delivery roles.
      </p>
      <div className="mt-5">
        <LinkButton href={site.resumePath}>
          <Download aria-hidden size={18} />
          Download resume PDF
        </LinkButton>
      </div>
    </div>
  );
}

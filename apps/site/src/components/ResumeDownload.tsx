import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function ResumeDownload() {
  return (
    <div className="resume-download">
      <div>
        <h2>Resume</h2>
        <p>{site.title}</p>
      </div>
      <ButtonLink href={site.links.resume}>Download PDF</ButtonLink>
    </div>
  );
}

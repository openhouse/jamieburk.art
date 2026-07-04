import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/data/site";

export function ResumeDownload() {
  return (
    <div className="resume-download">
      <ButtonLink href={site.resumePath}>Download resume PDF</ButtonLink>
      <p>Current PDF placeholder included for the scaffold; replace it with Jamie&apos;s approved resume before production launch.</p>
    </div>
  );
}

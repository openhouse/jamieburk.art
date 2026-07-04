import { ResumeDownload } from "@/components/ResumeDownload";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume and impact highlights for Jamie Burkart, technical project manager for product operations and implementation.",
  pathname: "/resume"
});

export default function ResumePage() {
  return (
    <div className="plain-page">
      <p className="eyebrow">Resume</p>
      <h1>Technical Project Manager</h1>
      <p>
        Product operations and implementation lead creating operating structure across public-facing tools, civic technology, documentation systems, and small-business digital transformation.
      </p>
      <ResumeDownload />
      <section className="plain-stack">
        <h2>Selected impact highlights</h2>
        <ul>
          <li>14+ years creating operating structure for public-facing, civic, cultural, and business systems.</li>
          <li>Contributed to 2x revenue growth for a legacy e-commerce business through web, analytics, content, and operational workflow improvements.</li>
          <li>Built and stewarded 30+ pages of civic campaign-memory infrastructure for Commercial Rent Stabilization work.</li>
          <li>Supported 300+ gatherings and 20+ resident artists through repeatable hosting, onboarding, facilitation, and continuity systems.</li>
        </ul>
      </section>
      <section className="plain-stack">
        <h2>Links</h2>
        <p><a href={site.linkedin}>LinkedIn</a></p>
        <p><a href={site.github}>GitHub</a></p>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </section>
    </div>
  );
}

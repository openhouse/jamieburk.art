import type { Metadata } from "next";
import { ResumeDownload } from "@/components/resume-download";
import { TagList } from "@/components/tag-list";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Jamie Burkart's resume for technical project management, product operations, implementation, civic technology, and knowledge systems roles.",
};

const highlights = [
  "Technical project management",
  "Technical operations",
  "Product operations",
  "Implementation",
  "Business analysis",
  "Civic technology",
  "Knowledge systems",
  "Public-sector-adjacent digital delivery",
];

export default function ResumePage() {
  return (
    <section className="container-reading section-pad">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        Resume
      </p>
      <h1 className="mt-3 text-4xl font-bold md:text-6xl">Resume</h1>
      <p className="mt-5 text-xl leading-9 text-neutral">
        Download Jamie Burkart resume materials for Technical Project Manager,
        Technical Operations, Product Operations, Implementation, Business
        Analysis, Civic Technology, Knowledge Systems, and
        public-sector-adjacent digital delivery roles.
      </p>
      <div className="mt-8">
        <ResumeDownload />
      </div>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Selected role fit</h2>
        <div className="mt-4">
          <TagList tags={highlights} />
        </div>
      </section>
      <section className="mt-10 rounded-md border border-base-300 bg-base-100 p-5">
        <h2 className="text-2xl font-bold">Links</h2>
        <ul className="mt-4 space-y-2 text-neutral">
          <li>
            <a
              className="link-hover link text-primary"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </li>
          <li>
            <a className="link-hover link text-primary" href={site.githubUrl}>
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}

import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const highlights = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Contributed to 2x revenue growth for a legacy e-commerce business",
  "Built and stewarded 30+ pages of civic campaign-memory infrastructure",
  "Co-built community web systems that reached roughly 35 city ecosystems",
  "Created repeatable hosting and continuity systems across 300+ gatherings and 20+ resident artists"
];

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager &mdash; Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I create operating structure for complex public-facing teams,
            turning ambiguous work into requirements, workflows, documentation,
            decision trails, launch support, onboarding materials, and durable
            handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-4 text-sm text-jb-ink/62">
            Production blocker: replace the placeholder PDF with Jamie&apos;s
            approved final resume before launch.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {highlights.map((highlight) => (
              <li className="flex gap-3" key={highlight}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-2xl font-semibold text-jb-ink">Contact</h2>
          <dl className="mt-5 space-y-4 text-sm text-jb-ink/76">
            <div>
              <dt className="font-semibold text-jb-ink">Email</dt>
              <dd className="mt-1">
                <a className="font-semibold text-jb-blue hover:text-jb-green" href={site.emailHref}>
                  {site.emailLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">Location</dt>
              <dd className="mt-1">{site.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">LinkedIn</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.linkedinUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">GitHub</dt>
              <dd className="mt-1">
                <a
                  className="font-semibold text-jb-blue hover:text-jb-green"
                  href={site.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

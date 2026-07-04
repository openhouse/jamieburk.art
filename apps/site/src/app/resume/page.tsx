import type { Metadata } from "next";
import { ResumeDownload } from "@/components/ResumeDownload";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Download Jamie Burkart's resume and review role focus for technical project management, product operations, and implementation work.",
  path: "/resume"
});

export default function ResumePage() {
  return (
    <section className="site-shell py-14">
      <div className="content-column">
        <p className="eyebrow">Resume</p>
        <h1 className="text-4xl font-semibold">Technical Project Manager - Product Operations & Implementation</h1>
        <p className="mt-5 text-lg text-[var(--color-muted)]">
          Focused on technical project management, product operations, implementation, civic technology, documentation systems, public-facing web systems, and knowledge operations.
        </p>
        <ResumeDownload />
      </div>
    </section>
  );
}

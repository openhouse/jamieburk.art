import type { Metadata } from "next";
import { LinkButton } from "@/components/LinkButton";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contact Jamie Burkart for roles, referrals, consulting conversations, and collaborations.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="page-shell py-14">
      <SectionHeading
        eyebrow="Contact"
        title="For roles, referrals, consulting conversations, or collaborations."
        body="Best-fit conversations: technical project management, technical operations, product operations, implementation, civic/govtech delivery, documentation, knowledge systems, public-facing tools, and source-backed team memory."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="surface p-6">
          <h2 className="text-2xl font-bold">Email</h2>
          <p className="mt-4 text-lg font-semibold text-[color:var(--color-primary)]">{site.email}</p>
          <div className="mt-6">
            <LinkButton href={`mailto:${site.email}`} variant="primary">
              Email Jamie
            </LinkButton>
          </div>
        </div>
        <div className="surface p-6">
          <h2 className="text-2xl font-bold">Location and links</h2>
          <p className="mt-4 leading-7 text-[color:var(--color-muted)]">{site.location}</p>
          <p className="mt-4 leading-7 text-[color:var(--color-muted)]">
            LinkedIn and GitHub URLs are intentionally left pending until Jamie confirms the exact public profiles.
          </p>
        </div>
      </div>
    </div>
  );
}

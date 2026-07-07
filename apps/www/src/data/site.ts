import { SITE_URL } from "@/lib/site-url";

const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "";

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: publicEmail,
  emailHref: publicEmail ? `mailto:${publicEmail}` : "",
  contactLinks: [
    publicEmail ? { label: "Email", href: `mailto:${publicEmail}` } : null,
    linkedInUrl ? { label: "LinkedIn", href: linkedInUrl } : null,
    githubUrl ? { label: "GitHub", href: githubUrl } : null
  ].filter((link): link is { label: string; href: string } => Boolean(link)),
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

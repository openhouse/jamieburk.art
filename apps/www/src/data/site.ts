import { SITE_URL } from "@/lib/site-url";

const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null;
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? null;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? null;
const resumePdfApproved = process.env.NEXT_PUBLIC_RESUME_PDF_APPROVED === "true";

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  publicEmail,
  linkedInUrl,
  githubUrl,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  resumePdfApproved,
  location: "Brooklyn, NY"
} as const;

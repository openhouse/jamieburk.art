import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "";

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail || "Direct contact details in resume PDF",
  emailHref: contactEmail ? `mailto:${contactEmail}` : "/resume",
  hasPublicEmail: Boolean(contactEmail),
  linkedinLabel: "LinkedIn",
  linkedinHref: linkedInUrl || "",
  githubLabel: "GitHub",
  githubHref: githubUrl || "",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

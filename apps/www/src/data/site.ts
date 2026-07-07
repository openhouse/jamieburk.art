import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "";

export const site = {
  name: "Jamie Burkart",
  location: "Brooklyn, NY",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail,
  emailHref: contactEmail ? `mailto:${contactEmail}` : "",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  linkedinLabel: linkedinUrl ? "LinkedIn" : "",
  linkedinHref: linkedinUrl,
  githubLabel: githubUrl ? "GitHub" : "",
  githubHref: githubUrl
} as const;

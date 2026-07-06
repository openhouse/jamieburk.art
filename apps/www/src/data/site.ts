import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jamie.burkart@gmail.com";
const linkedInUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/jamie-burkart";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/openhouse";

export const site = {
  name: "Jamie Burkart",
  location: "Brooklyn, NY",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  emailLabel: contactEmail,
  emailHref: `mailto:${contactEmail}`,
  linkedinLabel: "LinkedIn",
  linkedinHref: linkedInUrl,
  githubLabel: "GitHub",
  githubHref: githubUrl,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools."
} as const;

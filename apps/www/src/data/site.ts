import { SITE_URL } from "@/lib/site-url";

const contactEmail = "jamie.burkart@gmail.com";

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager and implementation lead creating operating structure across technical operations, product operations, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail,
  emailHref: `mailto:${contactEmail}`,
  hasPublicEmail: true,
  linkedinLabel: "LinkedIn",
  linkedinHref: "https://linkedin.com/in/jamie-burkart",
  githubLabel: "GitHub",
  githubHref: "https://github.com/openhouse",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

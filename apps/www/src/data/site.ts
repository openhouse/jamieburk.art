import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;
const contactEmailLabel =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL_LABEL?.trim() || contactEmail;
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || null;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || null;

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmailLabel,
  emailHref: contactEmail ? `mailto:${contactEmail}` : null,
  linkedinUrl,
  githubUrl,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  resumeReady: false,
  location: "Brooklyn, NY"
} as const;

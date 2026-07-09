import { SITE_URL } from "@/lib/site-url";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "jamie.burkart@gmail.com";
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "";
const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || "https://github.com/openhouse";

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager building operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail,
  emailHref: `mailto:${contactEmail}`,
  hasPublicEmail: true,
  linkedinLabel: linkedInUrl ? "LinkedIn" : "LinkedIn link not published",
  linkedinHref: linkedInUrl || "",
  githubLabel: githubUrl ? "GitHub" : "GitHub link not published",
  githubHref: githubUrl || "",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

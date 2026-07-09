import { SITE_URL } from "@/lib/site-url";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "";

const defaultContactEmail = "jamie.burkart@gmail.com";
const defaultLinkedInUrl = "https://linkedin.com/in/jamie-burkart";
const defaultGithubUrl = "https://github.com/openhouse";

const publicContactEmail = contactEmail || defaultContactEmail;
const publicLinkedInUrl = linkedInUrl || defaultLinkedInUrl;
const publicGithubUrl = githubUrl || defaultGithubUrl;

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart — Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: publicContactEmail,
  emailHref: `mailto:${publicContactEmail}`,
  hasPublicEmail: true,
  linkedinLabel: "linkedin.com/in/jamie-burkart",
  linkedinHref: publicLinkedInUrl,
  githubLabel: "github.com/openhouse",
  githubHref: publicGithubUrl,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

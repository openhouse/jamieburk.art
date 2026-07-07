import { SITE_URL } from "@/lib/site-url";

const readEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "";
};

const optionalHttpsUrl = (value: string | undefined) => {
  const candidate = readEnv(value);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
};

const publicEmail = readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const linkedInUrl = optionalHttpsUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const githubUrl = optionalHttpsUrl(process.env.NEXT_PUBLIC_GITHUB_URL);

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  heroLine: "I turn under-structured work into usable systems.",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contact: {
    publicEmail,
    emailLabel: publicEmail || "Contact details pending",
    emailHref: publicEmail ? `mailto:${publicEmail}` : "",
    linkedInUrl,
    githubUrl
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

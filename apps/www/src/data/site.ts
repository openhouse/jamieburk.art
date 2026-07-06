import { SITE_URL } from "@/lib/site-url";

const readEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "";
};

const optionalUrl = (value: string | undefined) => {
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
const linkedInUrl = optionalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const githubUrl = optionalUrl(process.env.NEXT_PUBLIC_GITHUB_URL);

export const site = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  coreSentence: "Jamie turns under-structured work into usable systems.",
  supportSentence:
    "Jamie creates operating structure for complex public-facing teams.",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager who turns under-structured work into usable systems across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contact: {
    publicEmail,
    emailLabel: publicEmail || "Public email pending approval",
    emailHref: publicEmail ? `mailto:${publicEmail}` : "",
    linkedInUrl,
    githubUrl
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

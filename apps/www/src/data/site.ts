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
  heroLine: "I turn ambiguous work into usable systems.",
  supportSentence:
    "I create operating structure for public-facing teams: requirements, workflows, documentation, decision trails, launch support, onboarding materials, stakeholder updates, and durable handoffs.",
  referrerSentence:
    "Jamie Burkart is a technical project manager and implementation lead who helps civic, cultural, small-business, public-facing, and technical teams turn ambiguous work into usable systems: workflows, documentation, decision records, public-facing tools, onboarding materials, stakeholder updates, and durable handoffs.",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager and implementation lead who turns ambiguous work into usable systems across technical operations, product operations, implementation, documentation, civic technology, web systems, and knowledge systems.",
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

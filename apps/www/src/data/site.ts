import { SITE_URL } from "@/lib/site-url";

type SiteConfig = {
  name: string;
  role: string;
  url: string;
  title: string;
  description: string;
  emailLabel: string;
  emailHref: string;
  linkedinLabel: string;
  linkedinUrl: string | null;
  githubLabel: string;
  githubUrl: string | null;
  resumePath: string;
  location: string;
};

export const site: SiteConfig = {
  name: "Jamie Burkart",
  role: "Technical Project Manager — Product Operations & Implementation",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager who turns under-structured work into usable systems across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "TODO: Jamie approval required before launch",
  emailHref: "/contact",
  linkedinLabel: "TODO: Jamie approval required before launch",
  linkedinUrl: null,
  githubLabel: "TODO: Jamie approval required if public-ready",
  githubUrl: null,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
};

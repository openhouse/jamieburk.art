import { SITE_URL } from "@/lib/site-url";

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager helping teams turn ambiguous, loosely defined work into usable systems across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  contact: {
    emailLabel: "jamie.burkart@gmail.com",
    emailHref: "mailto:jamie.burkart@gmail.com",
    linkedInLabel: "linkedin.com/in/jamie-burkart",
    linkedInHref: "https://linkedin.com/in/jamie-burkart",
    githubLabel: "github.com/openhouse",
    githubHref: "https://github.com/openhouse"
  },
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;

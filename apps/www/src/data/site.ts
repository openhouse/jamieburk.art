import { SITE_URL } from "@/lib/site-url";

export const site = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager turning under-structured work into usable systems for complex public-facing teams.",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY",
  contactLinks: [
    {
      label: "Public email",
      value: "jamie.burkart@gmail.com",
      href: "mailto:jamie.burkart@gmail.com"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/jamie-burkart",
      href: "https://linkedin.com/in/jamie-burkart"
    },
    {
      label: "GitHub",
      value: "github.com/openhouse",
      href: "https://github.com/openhouse"
    }
  ]
} as const;

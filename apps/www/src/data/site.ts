import { SITE_URL } from "@/lib/site-url";

type SiteConfig = {
  name: string;
  url: string;
  title: string;
  description: string;
  emailLabel: string | null;
  emailHref: string | null;
  resumePath: string;
  resumeReady: boolean;
  location: string;
};

export const site: SiteConfig = {
  name: "Jamie Burkart",
  url: SITE_URL,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: null,
  emailHref: null,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  resumeReady: false,
  location: "Brooklyn, NY"
};

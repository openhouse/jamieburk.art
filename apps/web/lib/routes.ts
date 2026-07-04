export const navRoutes = [
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

export const primaryRoutes = [
  { href: "/", label: "Home" },
  ...navRoutes,
  { href: "/work/technical-operations", label: "Technical Operations" },
  { href: "/lab/source-backed-team-memory", label: "Source-Backed Team Memory Lab" }
] as const;

export const futureRoutes = [
  "/writing",
  "/patterns",
  "/field-notes",
  "/artifacts",
  "/library",
  "/images",
  "/rooms",
  "/archive",
  "/now",
  "/colophon",
  "/work-with-me"
] as const;

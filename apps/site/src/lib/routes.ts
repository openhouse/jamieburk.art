import { site } from "@/data/site";

export const staticRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/lab",
  "/lab/source-backed-team-memory",
  "/about",
  "/resume",
  "/contact"
] as const;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, site.url).toString();
}

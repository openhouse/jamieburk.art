import type { MDXComponents } from "mdx/types";
import { CaveatBox } from "@/components/CaveatBox";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CaveatBox,
    PublicSafetyNote
  };
}

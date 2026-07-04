import type { MDXComponents } from "mdx/types";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SourceLayer } from "@/components/SourceLayer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PublicSafetyNote,
    SourceLayer,
    ...components
  };
}

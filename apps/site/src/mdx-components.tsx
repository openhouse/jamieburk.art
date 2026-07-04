import type { MDXComponents } from "mdx/types";
import { KnownOpenProtected } from "./components/KnownOpenProtected";
import { PublicSafetyNote } from "./components/PublicSafetyNote";
import { SourceLayer } from "./components/SourceLayer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    KnownOpenProtected,
    PublicSafetyNote,
    SourceLayer,
    ...components
  };
}

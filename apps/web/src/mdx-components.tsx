import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { MDXComponents } from "./components";

export function useMDXComponents(components: MDXComponentsType): MDXComponentsType {
  return {
    ...MDXComponents,
    ...components
  };
}

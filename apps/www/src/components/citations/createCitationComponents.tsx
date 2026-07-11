import type { MDXComponents } from "mdx/types";
import type { ResolvedCitationPage } from "@/lib/knowledge-bank/resolve-page-citations";
import { Cite } from "./Cite";
import { References } from "./References";
import type { CiteProps } from "./types";

export function createCitationComponents(page: ResolvedCitationPage): MDXComponents {
  return {
    Cite: (props: CiteProps) => <Cite page={page} {...props} />,
    References: () => <References page={page} />
  };
}

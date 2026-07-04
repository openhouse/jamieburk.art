declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const metadata: Record<string, unknown>;
  const MDXContent: ComponentType;
  export default MDXContent;
}

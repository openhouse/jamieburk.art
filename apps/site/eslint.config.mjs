import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "next-env.d.ts",
      "src/components/ArchivedPrototypeNote.tsx",
      "src/components/ButtonLink.tsx",
      "src/components/CareNote.tsx",
      "src/components/CollectiveWorkNote.tsx",
      "src/components/ContentStateBadge.tsx",
      "src/components/GoldenFrame.tsx",
      "src/components/MetadataPanel.tsx",
      "src/components/ProjectCard.tsx",
      "src/components/Section.tsx",
      "src/components/SectionHeading.tsx",
      "src/components/SourceToMemoryLoop.tsx",
      "src/data/**",
      "src/lib/mdx.ts",
      "src/lib/work.ts"
    ]
  }
];

export default eslintConfig;

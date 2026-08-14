import Link from "next/link";
import type { Route } from "next";

type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "inverted";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const toneClasses = tone === "inverted"
    ? "border-white/45 text-white hover:border-white hover:bg-white hover:text-jb-blue focus-visible:outline-white"
    : "border-jb-blue/35 text-jb-blue hover:border-jb-blue hover:bg-jb-blue hover:text-white focus-visible:outline-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            className={`inline-flex min-h-11 items-center border px-3 py-2 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${toneClasses}`}
            href={`/work?tag=${encodeURIComponent(tag)}#work-index` as Route}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

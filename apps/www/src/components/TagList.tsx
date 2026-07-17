type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "inverse";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const toneClasses =
    tone === "inverse"
      ? "border-jb-paper/45 bg-jb-paper/12 text-jb-paper"
      : "border-jb-blue/30 bg-jb-sky/15 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`rounded-full border px-3 py-1 font-medium ${toneClasses}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

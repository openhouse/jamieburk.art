type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "on-dark";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const tagStyle =
    tone === "on-dark"
      ? "border-jb-paper/50 bg-jb-paper text-jb-ink"
      : "border-jb-blue/30 bg-jb-sky/15 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`rounded-full border px-3 py-1 font-medium ${tagStyle}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

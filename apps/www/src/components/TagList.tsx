type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "light" | "dark";
};

export function TagList({ tags, compact = false, tone = "light" }: TagListProps) {
  const tagClass =
    tone === "dark"
      ? "border-jb-paper/35 bg-jb-paper/12 text-jb-paper"
      : "border-jb-blue/30 bg-jb-sky/15 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`rounded-full border px-3 py-1 font-medium ${tagClass}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

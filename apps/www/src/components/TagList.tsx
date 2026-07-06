type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "onBlue";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const itemClass =
    tone === "onBlue"
      ? "border-jb-paper/28 bg-jb-paper/10 text-jb-paper"
      : "border-jb-blue/30 bg-jb-sky/15 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`rounded-full border px-3 py-1 font-medium ${itemClass}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

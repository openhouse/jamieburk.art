type TagListProps = {
  tags: readonly string[];
  tone?: "default" | "quiet";
};

export function TagList({ tags, tone = "default" }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          className={`badge rounded-md ${
            tone === "quiet"
              ? "border-base-300 bg-base-100 text-base-content"
              : "border-primary/20 bg-primary/10 text-primary"
          }`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

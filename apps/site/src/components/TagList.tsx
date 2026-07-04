type TagListProps = {
  tags: string[];
  tone?: "default" | "quiet";
};

export function TagList({ tags, tone = "default" }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <span className={tone === "quiet" ? "badge badge-outline" : "badge badge-secondary"}>
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

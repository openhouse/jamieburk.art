export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li
          className="rounded border border-jamie-line/70 bg-base-200 px-2.5 py-1 text-sm text-jamie-muted"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

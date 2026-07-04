type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          className="rounded border border-base-300 bg-base-200 px-2.5 py-1 text-xs font-bold text-base-content/75"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

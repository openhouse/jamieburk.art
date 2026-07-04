type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag} className="badge badge-outline border-base-content/20 bg-base-200 text-base-content/75">
          {tag}
        </li>
      ))}
    </ul>
  );
}


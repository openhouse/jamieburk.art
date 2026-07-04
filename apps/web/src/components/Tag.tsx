type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return <span className="badge badge-outline tag">{children}</span>;
}

function inlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code className="rounded bg-[var(--color-accent-soft)] px-1" key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export function MdxBody({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="mt-8 space-y-5">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return <h2 className="pt-4 text-2xl font-semibold" key={index}>{block.replace(/^## /, "")}</h2>;
        }

        if (block.startsWith("- ")) {
          const items = block.split("\n").map((item) => item.replace(/^- /, ""));
          return (
            <ul className="list-disc space-y-2 pl-6" key={index}>
              {items.map((item) => (
                <li key={item}>{inlineCode(item)}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{inlineCode(block)}</p>;
      })}
    </div>
  );
}

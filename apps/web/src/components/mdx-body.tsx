type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  }

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.replace(/^## /, "") });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.replace(/^### /, "") });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^- /, ""));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

export function MdxBody({ source }: { source: string }) {
  return (
    <div className="case-body prose-measure">
      {parseBlocks(source).map((block, index) => {
        if (block.type === "h2") {
          return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
        }

        if (block.type === "h3") {
          return <h3 key={`${block.text}-${index}`}>{block.text}</h3>;
        }

        if (block.type === "ul") {
          return (
            <ul key={`list-${index}`}>
              {block.items.map((item) => (
                <li key={item}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.text}-${index}`}>
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

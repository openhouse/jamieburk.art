function flushList(listItems: string[], key: string) {
  if (listItems.length === 0) {
    return null;
  }

  return (
    <ul key={key}>
      {listItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function MarkdownBody({ body }: { body: string }) {
  const nodes: React.ReactNode[] = [];
  const listItems: string[] = [];

  body.split("\n").forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      const list = flushList(listItems.splice(0), `list-${index}`);
      if (list) {
        nodes.push(list);
      }
      return;
    }

    if (line.startsWith("## ")) {
      const list = flushList(listItems.splice(0), `list-${index}`);
      if (list) {
        nodes.push(list);
      }
      nodes.push(<h2 key={`h2-${index}`}>{line.replace("## ", "")}</h2>);
      return;
    }

    if (line.startsWith("### ")) {
      const list = flushList(listItems.splice(0), `list-${index}`);
      if (list) {
        nodes.push(list);
      }
      nodes.push(<h3 key={`h3-${index}`}>{line.replace("### ", "")}</h3>);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.replace("- ", ""));
      return;
    }

    const list = flushList(listItems.splice(0), `list-${index}`);
    if (list) {
      nodes.push(list);
    }
    nodes.push(<p key={`p-${index}`}>{line}</p>);
  });

  const tailList = flushList(listItems, "list-tail");
  if (tailList) {
    nodes.push(tailList);
  }

  return <div className="markdown-body">{nodes}</div>;
}

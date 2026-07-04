type KnownOpenProtectedProps = {
  known: string;
  open: string;
  protectedText: string;
};

export function KnownOpenProtected({ known, open, protectedText }: KnownOpenProtectedProps) {
  return (
    <section className="kop-grid" aria-label="Known, open, protected">
      <article>
        <h3>Known</h3>
        <p>{known}</p>
      </article>
      <article>
        <h3>Open</h3>
        <p>{open}</p>
      </article>
      <article>
        <h3>Protected</h3>
        <p>{protectedText}</p>
      </article>
    </section>
  );
}

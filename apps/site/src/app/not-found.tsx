import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-page golden-frame text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl font-black">That page is not in the public room.</h1>
        <p className="mt-4 text-lg leading-8 text-[color:var(--color-muted)]">
          The route may be private, still being drafted, or intentionally omitted from V1.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/work">View selected systems</ButtonLink>
        </div>
      </div>
    </section>
  );
}

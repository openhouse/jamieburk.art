import Image from "next/image";
import type { ReactNode } from "react";

type PublicArtifactFigureProps = {
  alt: string;
  boundary: string;
  children: ReactNode;
  sourceHref: string;
  sourceLabel: string;
  src: string;
  title: string;
};

export function PublicArtifactFigure({
  alt,
  boundary,
  children,
  sourceHref,
  sourceLabel,
  src,
  title
}: PublicArtifactFigureProps) {
  return (
    <figure className="my-10 grid gap-5 border-y border-jb-ink/15 py-6 sm:grid-cols-[12rem_1fr] sm:items-center">
      <Image
        alt={alt}
        className="aspect-square h-auto w-40 border border-jb-ink/15 object-cover sm:w-48"
        height={192}
        src={src}
        width={192}
      />
      <figcaption>
        <p className="text-xs font-semibold uppercase text-jb-blue">
          Public project artifact
        </p>
        <h3 className="mt-2 text-xl font-semibold text-jb-ink">{title}</h3>
        <div className="mt-3 leading-7 text-jb-ink/80">{children}</div>
        <p className="mt-3 text-sm leading-6 text-jb-ink/65">{boundary}</p>
        <a
          className="mt-4 inline-flex font-semibold text-jb-blue underline decoration-jb-blue/35 underline-offset-4 hover:text-jb-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jb-blue"
          href={sourceHref}
        >
          {sourceLabel}
          <span aria-hidden="true"> ↗</span>
        </a>
      </figcaption>
    </figure>
  );
}

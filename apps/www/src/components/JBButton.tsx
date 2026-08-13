import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type JBButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  download?: boolean;
};

export function JBButton({
  href,
  children,
  variant = "primary",
  download = false
}: JBButtonProps) {
  const className = {
    primary:
      "btn btn-primary h-auto min-h-11 max-w-full whitespace-normal rounded-none px-5 py-3 text-center leading-5 normal-case tracking-normal",
    secondary:
      "btn btn-outline h-auto min-h-11 max-w-full whitespace-normal rounded-none border-jb-blue px-5 py-3 text-center leading-5 text-jb-blue normal-case tracking-normal hover:border-jb-blue hover:bg-jb-blue hover:text-jb-paper",
    ghost:
      "btn btn-ghost h-auto min-h-11 max-w-full whitespace-normal rounded-none px-5 py-3 text-center leading-5 text-jb-ink normal-case tracking-normal hover:bg-jb-sky/20",
    inverse:
      "btn h-auto min-h-11 max-w-full whitespace-normal rounded-none border-jb-paper bg-jb-paper px-5 py-3 text-center leading-5 text-jb-ink normal-case tracking-normal hover:border-jb-lemon hover:bg-jb-lemon hover:text-jb-ink"
  }[variant];

  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href as Route} download={download}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} download={download}>
      {children}
    </a>
  );
}

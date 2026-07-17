import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type JBButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  download?: boolean;
};

export function JBButton({
  href,
  children,
  variant = "primary",
  download = false
}: JBButtonProps) {
  const className = {
    primary: "btn btn-primary h-auto min-h-11 max-w-full whitespace-normal rounded-lg px-5 py-3 text-center normal-case tracking-normal",
    secondary:
      "btn btn-outline h-auto min-h-11 max-w-full whitespace-normal rounded-lg border-jb-blue px-5 py-3 text-center text-jb-blue normal-case tracking-normal hover:border-jb-blue hover:bg-jb-blue hover:text-jb-paper",
    inverse:
      "btn h-auto min-h-11 max-w-full whitespace-normal rounded-lg border-jb-paper bg-jb-paper px-5 py-3 text-center text-jb-blue normal-case tracking-normal hover:border-jb-lemon hover:bg-jb-lemon hover:text-jb-ink",
    ghost:
      "btn btn-ghost h-auto min-h-11 max-w-full whitespace-normal rounded-lg px-5 py-3 text-center text-jb-ink normal-case tracking-normal hover:bg-jb-sky/20"
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

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type JBButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
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
      "btn btn-primary min-h-11 max-w-full whitespace-normal break-words rounded-lg px-5 text-center normal-case tracking-normal",
    secondary:
      "btn btn-outline min-h-11 max-w-full whitespace-normal break-words rounded-lg border-jb-blue px-5 text-center text-jb-blue normal-case tracking-normal hover:border-jb-blue hover:bg-jb-blue hover:text-jb-paper",
    ghost:
      "btn btn-ghost min-h-11 max-w-full whitespace-normal break-words rounded-lg px-5 text-center text-jb-ink normal-case tracking-normal hover:bg-jb-sky/20"
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

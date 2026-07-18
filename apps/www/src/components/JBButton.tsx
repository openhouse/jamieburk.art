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
  const baseClassName =
    "btn min-h-11 h-auto max-w-full whitespace-normal rounded-lg px-5 text-center normal-case tracking-normal";
  const variantClassName = {
    primary: "btn-primary",
    secondary:
      "btn-outline border-jb-blue text-jb-blue hover:border-jb-blue hover:bg-jb-blue hover:text-jb-paper",
    ghost:
      "btn-ghost text-jb-ink hover:bg-jb-sky/20"
  }[variant];
  const className = `${baseClassName} ${variantClassName}`;

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

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
};

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-outline",
  quiet: "inline-flex items-center gap-2 font-medium text-[var(--color-link)] underline-offset-4 hover:underline"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  const classes = `${variants[variant]} ${className}`.trim();
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href as Route}>
      {children}
    </Link>
  );
}

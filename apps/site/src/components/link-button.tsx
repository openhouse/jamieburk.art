import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost border border-base-300 bg-base-100",
} as const;

export function LinkButton({
  href,
  children,
  variant = "primary",
}: LinkButtonProps) {
  const className = `btn rounded-md ${variants[variant]}`;
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href as Route}>
      {children}
    </Link>
  );
}

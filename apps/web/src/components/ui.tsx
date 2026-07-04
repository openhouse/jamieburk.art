import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function CTAButton({ children, href, variant = "primary" }: CTAButtonProps) {
  const className = `button ${variant === "primary" ? "button-primary" : "button-secondary"}`;
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

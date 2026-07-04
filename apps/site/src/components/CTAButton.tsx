import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function CTAButton({ href, children, variant = "primary" }: CTAButtonProps) {
  const className =
    variant === "primary"
      ? "btn bg-[var(--color-accent)] text-white hover:bg-[#08445d]"
      : "btn btn-outline border-[var(--color-accent)] text-[var(--color-accent)]";

  return (
    <Link className={className} href={href as Route}>
      {children}
    </Link>
  );
}

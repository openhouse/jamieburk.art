import Link from "next/link";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
};

const variants = {
  primary: "btn btn-primary",
  secondary: "btn border-primary text-primary hover:bg-primary hover:text-primary-content",
  quiet: "btn btn-ghost text-primary"
};

export function CTAButton({ href, children, variant = "primary" }: CTAButtonProps) {
  return (
    <Link className={`${variants[variant]} min-h-11 rounded`} href={href}>
      {children}
    </Link>
  );
}

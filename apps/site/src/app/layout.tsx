import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createMetadata } from "@/lib/seo";
import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import "@fontsource/karla/800.css";
import "./globals.css";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="jamie">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(site.url)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell flex min-h-screen flex-col">
          <SiteHeader />
          <main className="grow" id="main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

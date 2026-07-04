import type { Metadata, Viewport } from "next";
import { siteConfig } from "@jamie/site-content/site";
import { SiteFooter, SiteHeader } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Technical Project Manager | Product Operations & Implementation`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: "I create operating structure for complex public-facing teams.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  }
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b5f81",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="jamie">
      <body>
        <a className="button button-primary skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main className="main" id="main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
    template: "%s | Jamie Burkart"
  },
  description: site.description,
  alternates: {
    canonical: site.url
  },
  openGraph: {
    title: "Jamie Burkart",
    description: "Technical Project Manager - Product Operations & Implementation",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/og/default.svg",
        width: 1200,
        height: 630,
        alt: "Jamie Burkart portfolio source map graphic"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link btn btn-primary btn-sm" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

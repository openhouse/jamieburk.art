import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteMetadata } from "@/lib/metadata";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`
  },
  description: siteMetadata.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteMetadata.title,
    description: "Jamie Burkart turns under-structured work into usable systems.",
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    images: [
      {
        url: "/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Jamie Burkart, Technical Project Manager - Product Operations and Implementation"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
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
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd])
          }}
        />
      </body>
    </html>
  );
}

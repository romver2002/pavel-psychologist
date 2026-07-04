import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { buildSiteJsonLd } from "@/lib/jsonLd";
import { siteConfig, seo } from "@/lib/content";
import { isSet } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `${siteConfig.url}/`,
    siteName: `${siteConfig.name} — психолог онлайн (КПТ)`,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — психолог-консультант (КПТ)`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  category: "health",
  ...(isSet(siteConfig.verification.yandex) || isSet(siteConfig.verification.google)
    ? {
        verification: {
          ...(isSet(siteConfig.verification.yandex)
            ? { yandex: siteConfig.verification.yandex }
            : {}),
          ...(isSet(siteConfig.verification.google)
            ? { google: siteConfig.verification.google }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#7c9a82",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <CookieConsent />
        <Analytics />
        <JsonLd data={buildSiteJsonLd()} />
      </body>
    </html>
  );
}

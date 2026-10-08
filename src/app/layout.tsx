import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Screensaver } from "@/components/Screensaver";
import { site } from "@/data/site";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brianyoung.dev"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Brian Young, frontend developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  // Unlisted on purpose: people get a link, search engines do not.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  other: {
    "prod-build": process.env.NEXT_PUBLIC_PROD_BUILD ?? "dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body data-prod-build={process.env.NEXT_PUBLIC_PROD_BUILD ?? "dev"}>
        {children}
        <Screensaver />
        <Analytics />
      </body>
    </html>
  );
}

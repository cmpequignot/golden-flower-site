import type { Metadata } from "next";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/site";
import { musicGroupJsonLd, webSiteJsonLd } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Serif that echoes the album wordmark — reserved for the brand name.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

/** Kept under ~160 characters so search engines show it without truncating. */
const description =
  "Progressive jazz band from Orlando, Florida — prog rock, funk, and South American and South Asian influences. Debut album Are You Even Awake? out now.";

const ogImage = {
  url: "/og-band.jpg",
  width: 1200,
  height: 630,
  alt: "Golden Flower, a five-piece progressive jazz band from Orlando, Florida",
};

export const metadata: Metadata = {
  // Lets every other metadata field below use a relative path.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Golden Flower — Orlando Progressive Jazz Band",
    template: "%s — Golden Flower",
  },
  description,
  applicationName: "Golden Flower",
  keywords: [
    "Golden Flower",
    "progressive jazz",
    "prog jazz",
    "jazz fusion",
    "Orlando jazz",
    "Orlando live music",
    "Florida jazz band",
    "Are You Even Awake?",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Golden Flower",
    locale: "en_US",
    url: "/",
    title: "Golden Flower — Orlando Progressive Jazz Band",
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Flower — Orlando Progressive Jazz Band",
    description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    // Let Google use a full-size image and an unclipped snippet — both feed
    // rich results and AI overviews.
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site-wide entity data: who the band is, and what this site is. */}
        <JsonLd data={musicGroupJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

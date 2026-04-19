import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Forsyth County Schools Sports & Clubs Fundraiser",
  description:
    "Support every high school athlete and club member in Forsyth County Schools. 100% of every donation is split equally among all 8 official high schools.",
  metadataBase: new URL("https://fundraiser.forsythk12.tech"),
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Forsyth County Schools fundraiser",
    "Forsyth high schools donation",
    "Georgia school athletics fundraiser",
    "Forsyth clubs fundraiser",
    "district-wide equal split donation"
  ],
  category: "education",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Forsyth County Schools Sports & Clubs Fundraiser",
    description:
      "100% of every donation is split equally among all 8 Forsyth County high schools for sports and clubs.",
    url: "https://fundraiser.forsythk12.tech",
    siteName: "Forsyth County Schools Fundraiser",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://resources.finalsite.net/images/v1707727554/forsythk12gaus/pttpmvhjxsaocbkbxcay/header-logo-colored.svg",
        width: 1200,
        height: 630,
        alt: "Forsyth County Schools Sports and Clubs Fundraiser"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Forsyth County Schools Sports & Clubs Fundraiser",
    description: "Fueling every athlete and club equally across all 8 Forsyth County high schools.",
    images: [
      "https://resources.finalsite.net/images/v1707727554/forsythk12gaus/pttpmvhjxsaocbkbxcay/header-logo-colored.svg"
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codecore-cc.com"),
  title: {
    default: "CodeCore",
    template: "%s | CodeCore",
  },
  description: "We build modern web & mobile solutions.",
  applicationName: "CodeCore",
  keywords: [
    "CodeCore",
    "software development",
    "web development",
    "mobile apps",
    "Next.js",
    "React",
    "UI/UX",
  ],
  alternates: {
    canonical: "https://www.codecore-cc.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.codecore-cc.com",
    siteName: "CodeCore",
    title: "CodeCore",
    description: "We build modern web & mobile solutions.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CodeCore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCore",
    description: "We build modern web & mobile solutions.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

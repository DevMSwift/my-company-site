import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-figtree",
});

const zalandoExpanded = localFont({
  variable: "--font-zalando-expanded",
  display: "swap",
  src: [
    { path: "./fonts/ZalandoSansExpanded/ZalandoSansExpanded-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ZalandoSansExpanded/ZalandoSansExpanded-Medium.woff2",  weight: "500", style: "normal" },
    { path: "./fonts/ZalandoSansExpanded/ZalandoSansExpanded-Bold.woff2",    weight: "700", style: "normal" },
    { path: "./fonts/ZalandoSansExpanded/ZalandoSansExpanded-Black.woff2", weight: "900", style: "normal" },
  ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${zalandoExpanded.variable}`}>
      <body>{children}</body>
    </html>
  );
}

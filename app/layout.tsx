import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const unlock = localFont({
  src: "./fonts/Unlock.ttf",
  variable: "--font-display",
  weight: "400",
  display: "optional",
  adjustFontFallback: "Times New Roman",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
});

const DESCRIPTION =
  "Kian Malakooti is a documentary, travel, and commercial photographer. Selected work spanning Africa, Las Vegas, road trips, portraits, and live music.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shotbykian.com"),
  title: {
    default: "shotbykian — Kian Malakooti Photography",
    template: `%s | shotbykian`,
  },
  description: DESCRIPTION,
  applicationName: "shotbykian",
  authors: [{ name: "Kian Malakooti", url: "https://shotbykian.com" }],
  creator: "Kian Malakooti",
  publisher: "Kian Malakooti",
  category: "photography",
  keywords: [
    "Kian Malakooti",
    "shotbykian",
    "photography",
    "photographer",
    "documentary photography",
    "travel photography",
    "commercial photography",
    "portrait photography",
    "concert photography",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "rvQgj1CclLzInBp5kF-GazAiLvv_BOslxYXuDgmq8HA",
  },
  openGraph: {
    title: "shotbykian — Kian Malakooti Photography",
    description: DESCRIPTION,
    url: "https://shotbykian.com",
    siteName: "shotbykian",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shotbykian — Kian Malakooti Photography",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${unlock.variable} ${inter.variable} font-sans antialiased bg-ink text-bone`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

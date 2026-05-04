import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shotbykian.com"),
  title: {
    default: "shotbykian",
    template: `%s | shotbykian`,
  },
  description: "Photography by Kian Malakooti",
  openGraph: {
    title: "shotbykian",
    description: "Photography by Kian Malakooti",
    url: "https://shotbykian.com",
    siteName: "shotbykian",
    locale: "en_US",
    type: "website",
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

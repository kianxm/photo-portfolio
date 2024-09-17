import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const unlock = localFont({
  src: "./fonts/Unlock.ttf",
  variable: "--font-unlock",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shotbykian.com"),
  title: {
    default: "shotbykian",
    template: `%s | ${"shotbykian"}`,
  },
  description: "Portfolio by Kian Malakooti",
  openGraph: {
    title: "shotbykian",
    description: "Portfolio by Kian Malakooti",
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
    <html lang="en">
      <body className={`${unlock.variable} antialiased bg-gray-200`}>
        {children}
      </body>
    </html>
  );
}

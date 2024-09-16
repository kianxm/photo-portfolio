import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const unlock = localFont({
  src: "./fonts/Unlock.ttf",
  variable: "--font-unlock",
  weight: "400",
});

export const metadata: Metadata = {
  title: "shotbykian",
  description: "Portfolio by Kian Malakooti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unlock.variable} antialiased bg-zinc-900`}>
        {children}
      </body>
    </html>
  );
}

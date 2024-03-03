import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Higher Lower NHL",
  description: "Created by Goose",
};

// Main layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.png' sizes='any'></link>
      </head>
      <body className={`${inter.className} antialiased selection:bg-main`}>{children}</body>
    </html>
  );
}

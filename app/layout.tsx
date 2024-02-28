import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Higher Lower NHL",
  description: "Created by Goose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-main`}>{children}</body>
    </html>
  );
}

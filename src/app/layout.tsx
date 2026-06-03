import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hijrahfood Sales Dashboard",
  description: "Retail Sales Dashboard - Technical Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

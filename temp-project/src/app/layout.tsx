import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darts Game",
  description: "A collection of dart games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}

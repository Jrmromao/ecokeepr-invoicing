import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoKeepr - Simple Invoicing",
  description: "Invoicing that doesn't suck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

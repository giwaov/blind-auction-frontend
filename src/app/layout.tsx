import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blind Auctions | Arcium MPC on Solana",
  description: "Private, encrypted auctions powered by Arcium multi-party computation on Solana. Place confidential bids that remain hidden until auction close.",
  keywords: ["Solana", "Arcium", "MPC", "blind auction", "encrypted", "privacy", "blockchain"],
  openGraph: {
    title: "Blind Auctions | Arcium MPC on Solana",
    description: "Private, encrypted auctions powered by Arcium multi-party computation on Solana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

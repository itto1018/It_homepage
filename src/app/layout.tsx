import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Itのホームページ",
  description: "Itのホームページへようこそ"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="row-start-1 flex h-12 items-center justify-center gap-[24px] bg-gray-100">
          <h1 className="items-left text-[20px] font-bold">It Page</h1>
        </header>
        {children}
        <footer className="row-start-3 flex h-12 flex-wrap items-center justify-center gap-[24px] bg-gray-100">
          <p className="text-[16px] text-gray-600">
            © 2025 It All rights reserved.
          </p>
          <div className="flex gap-[16px]">
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

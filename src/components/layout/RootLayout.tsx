import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import React from "react";
import AuthProvider from "@/components/auth/AuthProvider";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itのホームページ",
  description: "Itのホームページへようこそ",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-xl font-bold text-gray-900 hover:text-[#00a497] transition-colors"
              >
                It.dev
              </Link>
            </div>
            <div>
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="#profile-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="#services-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#contact-title"
                  className="text-gray-600 hover:text-[#00a497] transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </>
  );
}

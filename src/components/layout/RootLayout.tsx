import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import React from "react";
import AuthProvider from "@/components/auth/AuthProvider";
import Link from "next/link";
import { Footer } from "./Footer";
import Header from "./Header";

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
      <Header />
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
      <Footer />
    </>
  );
}

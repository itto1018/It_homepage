import React from "react";
import type { Metadata } from "next";
import "../../app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
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

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
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
};

export default RootLayout;

import type { NextConfig } from "next";

const STORAGE_BUCKET =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "central-list-461606-e7.appspot.com";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: `/v0/b/${STORAGE_BUCKET}/o/**`,
			},
			{
				protocol: "https",
				hostname: "**.firebasestorage.app",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "**.web.app",
				port: "",
				pathname: "/**",
			},
		],
		domains: ["firebasestorage.googleapis.com"],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

export default nextConfig;

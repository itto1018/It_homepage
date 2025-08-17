import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
				pathname: "/v0/b/**",
			},
			{
				protocol: "https",
				hostname: "**.firebasestorage.app",
				port: "",
				pathname: "/o/**",
			},
			{
				protocol: "https",
				hostname: "**.web.app",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;

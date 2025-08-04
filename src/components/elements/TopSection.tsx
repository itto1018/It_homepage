"use client";

import React, { useEffect } from "react";
import type { Top } from "@/types/top";
import { getTop } from "@/lib/firebase/store/top";

const TopSection = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	// トップセクションのデータ取得(Read)
	const [top, setTop] = React.useState<Top | null>(null);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getTop();
				setTop(data);
			} catch (error) {
				console.error("プロフィール取得エラー:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProfile();
	}, []);

	// ローディング中の表示
	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<>
			<div className="relative z-10 flex flex-col items-center text-center px-5">
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5">
					<span className="bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
						Welcome to
					</span>
					<br />
					<span className="mt-2 inline-block">It.dev</span>
				</h1>
				<div className="w-4/5 mt-8 relative">
					<div className="absolute -inset-1 bg-gradient-to-r from-[#00a497] to-[#45b7af] rounded-lg blur opacity-20"></div>
					<article className="relative bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 text-gray-600 text-sm md:text-base lg:text-xl">
						{top?.article}{" "}
						<span className="text-[#00a497] font-medium">It（イット）</span>{" "}
						です。
					</article>
				</div>
			</div>
		</>
	);
};

export default TopSection;

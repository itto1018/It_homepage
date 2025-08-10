"use client";

import Image from "next/image";
import Link from "next/link";
import type { Works } from "@/types/works";
import { getWorks } from "@/lib/firebase/store/works";
import React, { useEffect } from "react";

export const WorksSection = () => {
	const [works, setWorks] = React.useState<Works[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);

	// データの取得(Read)
	const handleReadWorks = async () => {
		try {
			setIsLoading(true);
			const worksData = await getWorks();
			if (worksData) {
				// 最新の6件のみを表示
				setWorks(worksData.slice(0, 6));
			} else {
				setWorks([]);
			}
		} catch (error) {
			console.error("Error fetching works:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleReadWorks();
	}, []);

	if (isLoading) {
		return <div className="text-center">Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
				{works.length === 0 ? (
					<div className="text-center col-span-full">作品がありません</div>
				) : (
					works.map((work) => (
						<div
							key={work.id}
							className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
						>
							<a
								href={work.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block h-full"
							>
								{/* サムネイル画像 */}
								<div className="relative aspect-video">
									<Image
										src={work.imageUrl ?? "/images/no-image.png"}
										alt={work.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover"
									/>
								</div>

								{/* 作品情報 */}
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-800">
										{work.title}
									</h3>
									<p className="mt-1 text-sm text-gray-600 line-clamp-2">
										{work.description}
									</p>
									<p className="mt-4 text-sm text-gray-600 line-clamp-2">
										投稿日:{" "}
										{work.createdAt.toLocaleDateString("ja-JP", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
										})}
									</p>
								</div>
							</a>
						</div>
					))
				)}
			</div>

			{/* More...ボタン */}
			<Link
				href="/works"
				className="mt-8 inline-flex items-center px-6 py-3 border border-[#00a497] text-[#00a497] rounded-md hover:bg-[#00a497] hover:text-white transition-colors duration-200"
			>
				More...
			</Link>
		</div>
	);
};

export default WorksSection;

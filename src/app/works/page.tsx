"use client";

import { useEffect, useState } from "react";
import type { Works } from "@/types/works";
import { getWorks } from "@/lib/firebase/store/works";
import Image from "next/image";

export default function WorksPage() {
	const [works, setWorks] = useState<Works[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;

	useEffect(() => {
		const fetchWorks = async () => {
			try {
				setIsLoading(true);
				const worksData = await getWorks();
				if (worksData) {
					setWorks(worksData);
				}
			} catch (error) {
				console.error("Error fetching works:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchWorks();
	}, []);

	// 現在のページの作品を取得
	const getCurrentWorks = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return works.slice(startIndex, endIndex);
	};

	// 総ページ数を計算
	const totalPages = Math.ceil(works.length / itemsPerPage);

	if (isLoading) {
		return <div className="text-center py-10">Loading...</div>;
	}

	return (
		<main className="w-4/5 mx-auto px-5 py-10 lg:px-10 lg:py-15">
			<h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent text-center mb-10">
				Works
			</h1>

			<div className="flex flex-col items-center">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
					{getCurrentWorks().length === 0 ? (
						<div className="text-center col-span-full">作品がありません</div>
					) : (
						getCurrentWorks().map((work) => (
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

				{/* ページネーション */}
				{totalPages > 1 && (
					<div className="flex gap-2 mt-8">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							前へ
						</button>
						<div className="flex items-center px-4">
							{currentPage} / {totalPages}
						</div>
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							次へ
						</button>
					</div>
				)}
			</div>
		</main>
	);
}

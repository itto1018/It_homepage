"use client";

import { TopSection } from "@/types/top-section";
import React, { useState } from "react";

interface Props {
	initialTopSection: TopSection;
}

export const TopSectionEditor: React.FC<Props> = ({ initialTopSection }) => {
	// articleの内容を直接状態として管理
	const [content, setContent] = useState<string>(
		initialTopSection?.article || ""
	);

	// サービスの更新(Update)
	const handleTopSectionChange = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/top-section", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ article: content }),
			});

			if (response.ok) {
				alert("更新が完了しました");
			}
		} catch (error) {
			console.error("Error updating top section:", error);
			alert("更新に失敗しました");
		}
	};
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4"></h1>
			<form onSubmit={handleTopSectionChange}>
				<textarea
					className="w-full h-32 p-2 border rounded"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="トップセクションの内容を入力"
				/>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-[#00a497] text-white rounded hover:bg-[#45b7af]"
				>
					更新
				</button>
			</form>
		</div>
	);
};

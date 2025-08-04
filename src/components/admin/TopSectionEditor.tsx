"use client";

import { Top } from "@/types/top";
import Link from "next/link";
import React, { useState } from "react";
import { AdminLayout } from "../layout/AdminLayout";
import { getCurrentUser } from "@/lib/firebase/auth";
import toast from "react-hot-toast";

interface Props {
	initialTop: Top;
}

export const TopSectionEditor: React.FC<Props> = ({ initialTop }) => {
	const [isLoading, setIsLoading] = useState(false);

	// 文字数制限（バリデーション）
	const MAX_LENGTH = 100;

	// 取得したarticleを状態管理
	const [content, setContent] = useState<string>(initialTop?.article || "");

	// Topメッセージの更新(Update)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// バリデーションチェック
		if (content.length > MAX_LENGTH) {
			toast.error(`メッセージは${MAX_LENGTH}文字以内で入力してください`);
			return;
		}

		setIsLoading(true);

		try {
			//firebase auth認証
			const auth = getCurrentUser();
			const token = await auth?.getIdToken();

			if (!token) {
				toast.error("認証が必要です");
				return;
			}

			// トップの更新
			const response = await fetch("/api/top", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ article: content }),
			});

			if (response.ok) {
				toast.success("トップメッセージの保存が完了しました");
			}
		} catch (error) {
			console.error("Error updating top section:", error);
			toast.error("トップメッセージの保存に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	// ローディング画面
	if (isLoading) {
		return (
			<AdminLayout>
				<div className="flex h-64 items-center justify-center">
					<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
				</div>
			</AdminLayout>
		);
	}

	return (
		<div className="p-8">
			<label className="block text-sm font-medium text-gray-600 mb-2">
				トップメッセージ
			</label>
			<form onSubmit={handleSubmit}>
				<div id="top-message" className="space-y-6 mb-5">
					<textarea
						className="w-full h-20 p-2 border rounded"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="トップのメッセージを入力"
						maxLength={MAX_LENGTH}
					/>
					<div className="flex justify-between items-center">
						<p>
							{" "}
							<span className="text-[#00a497] font-medium">
								It（イット）
							</span>{" "}
							です。
						</p>
						<div className="justify-end text-sm text-gray-500 text-right">
							{content.length}/{MAX_LENGTH}文字
						</div>
					</div>
				</div>
				<div className="border-t border-gray-200 pt-6">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
						{" "}
						<Link
							href="/admin"
							className="w-full sm:w-auto rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none text-center cursor-pointer"
						>
							キャンセル
						</Link>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 cursor-pointer"
						>
							{isLoading ? "保存中..." : "保存する"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

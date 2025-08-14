"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import { ProfileLink } from "@/types/profile";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib/auth";
import Loading from "@/components/elements/Loading";

interface Props {
	initialProfileLink: ProfileLink;
}

export const ProfileLinkEditor: React.FC<Props> = ({ initialProfileLink }) => {
	const [isLoading, setIsLoading] = useState(true);

	// SNSリンクの状態
	const [links, setLinks] = useState(initialProfileLink);
	const [editingKey, setEditingKey] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	useEffect(() => {
		const fetchLinks = async () => {
			try {
				if (initialProfileLink) {
					setLinks(initialProfileLink);
				}
			} catch (error) {
				console.error("SNSリンクの取得に失敗:", error);
				toast.error("SNSリンクの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchLinks();
	}, [initialProfileLink]);

	// SNSリンクの更新処理
	const handleEdit = async (key: string, newValue: string) => {
		try {
			const user = getCurrentUser();
			if (!user) {
				toast.error("認証が必要です");
				return;
			}
			const updatedLinks = {
				...links,
				[key]: newValue,
			};

			const docRef = doc(db, "profiles", "link");
			await updateDoc(docRef, updatedLinks);

			setLinks(updatedLinks);
			setEditingKey(null);
			toast.success("更新しました");
		} catch (error) {
			console.error("Error updating link:", error);
			toast.error("更新に失敗しました");
		}
	};

	const startEditing = (key: string, value: string) => {
		setEditingKey(key);
		setEditValue(value);
	};

	// ローディング中の表示
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="editor-container">
			<div className="space-y-4">
				{Object.entries(links).map(([key, value]) => (
					<div key={key} className="rounded-lg bg-gray-50 p-4 sm:p-6">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							<strong className="w-24 text-gray-700 text-base font-bold">
								{key}:
							</strong>
							{editingKey === key ? (
								<div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
									<input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
										autoComplete="url"
										className="flex-1 rounded-lg border-gray-300 p-2.5 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
									/>
									<div className="flex items-center gap-2">
										<button
											onClick={() => handleEdit(key, editValue)}
											className="w-24 rounded-lg bg-blue-600 px-2 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none cursor-pointer"
										>
											保存
										</button>
										<button
											onClick={() => setEditingKey(null)}
											className="w-24 rounded-lg border border-red-300 px-2 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none cursor-pointer"
										>
											キャンセル
										</button>
									</div>
								</div>
							) : (
								<div className="flex flex-col sm:flex-row items-center gap-3 w-full">
									<span className="flex-1 text-gray-600 break-all">
										{value}
									</span>
									<button
										onClick={() => startEditing(key, value)}
										className="w-24 rounded-lg border border-gray-300 px-2 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none cursor-pointer"
									>
										編集
									</button>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

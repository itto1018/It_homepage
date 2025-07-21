"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ProfileLink } from "@/types/profile";
import toast from "react-hot-toast";

interface Props {
	initialProfileLink: ProfileLink;
}

export const ProfileLinkEditor: React.FC<Props> = ({ initialProfileLink }) => {
	const [links, setLinks] = useState(initialProfileLink);
	const [isLoading, setIsLoading] = useState(true);

	const [message, setMessage] = useState("");
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

	const handleEdit = async (key: string, newValue: string) => {
		try {
			const updatedLinks = {
				...links,
				[key]: newValue,
			};

			const docRef = doc(db, "profile", "links");
			await updateDoc(docRef, updatedLinks);

			setLinks(updatedLinks);
			setEditingKey(null);
			setMessage("更新しました");
		} catch (error) {
			console.error("Error updating link:", error);
			setMessage("更新に失敗しました");
		}
	};

	const startEditing = (key: string, value: string) => {
		setEditingKey(key);
		setEditValue(value);
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6">SNSリンク編集</h2>

			<div className="space-y-4">
				{Object.entries(links).map(([key, value]) => (
					<div key={key} className="border rounded-lg p-4 bg-white shadow-sm">
						<div className="flex items-center justify-between">
							<strong className="text-gray-700">{key}:</strong>
							{editingKey === key ? (
								<div className="flex items-center gap-2">
									<input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
										className="border rounded px-3 py-1 flex-1 min-w-[200px]"
									/>
									<button
										onClick={() => handleEdit(key, editValue)}
										className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
									>
										保存
									</button>
									<button
										onClick={() => setEditingKey(null)}
										className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
									>
										キャンセル
									</button>
								</div>
							) : (
								<div className="flex items-center gap-4">
									<span className="text-gray-600">{value}</span>
									<button
										onClick={() => startEditing(key, value)}
										className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
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

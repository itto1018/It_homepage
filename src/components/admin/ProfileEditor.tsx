"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Profile, Career, PROFILE_CONSTRAINTS } from "@/types/profile";
import { uploadProfileImage } from "@/lib/firebase/storage/uploadImage";
import { validateProfile } from "@/utils/validateProfile";
import { AdminLayout } from "@/components/layout/AdminLayout";

interface Props {
	initialProfile: Profile;
}

export const ProfileEditor: React.FC<Props> = ({ initialProfile }) => {
	const [isLoading, setIsLoading] = useState(true);

	const [name, setName] = useState(initialProfile.name);
	const [nickname, setNickname] = useState(initialProfile.nickname);
	const [bio, setBio] = useState(initialProfile.bio);
	const [imageUrl, setImageUrl] = useState<string | null>(
		initialProfile.imageUrl || null
	);
	const [careers, setCareers] = useState<Career[]>([]);
	const [imageFile, setImageFile] = useState<File | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (initialProfile) {
					setName(initialProfile.name);
					setNickname(initialProfile.nickname || "");
					setBio(initialProfile.bio || "");
					setImageUrl(initialProfile.imageUrl || null);
					setCareers(initialProfile.careers || []);
				}
			} catch (error) {
				console.error("プロフィールの取得に失敗:", error);
				toast.error("プロフィールの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [initialProfile]);

	const handleAddCareer = () => {
		setCareers([...careers, { period: "", description: "" }]);
	};

	const handleRemoveCareer = (index: number) => {
		setCareers(careers.filter((_, i) => i !== index));
	};

	const handleCareerChange = (
		index: number,
		field: keyof Career,
		value: string
	) => {
		const newCareers = [...careers];
		newCareers[index] = { ...newCareers[index], [field]: value };
		setCareers(newCareers);
	};

	// 画像アップロードのハンドラー
	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.[0]) return;

		const file = e.target.files[0];
		setImageFile(file);

		try {
			setIsLoading(true);
			// 画像をアップロード（Firebase Storageを使用）
			const uploadedUrl = await uploadProfileImage(file);
			setImageUrl(uploadedUrl);
			toast.success("画像をアップロードしました");
		} catch (error) {
			console.error("画像アップロードエラー:", error);
			toast.error("画像のアップロードに失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const validationErrors = validateProfile({
				name,
				nickname,
				bio,
				careers,
			});

			if (validationErrors.length > 0) {
				validationErrors.forEach((error) => toast.error(error.message));
				return;
			}

			const response = await fetch("/api/profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					nickname,
					bio,
					careers,
					imageUrl,
				}),
			});

			if (!response.ok) {
				throw new Error("保存に失敗しました");
			}
			toast.success("プロフィールを保存しました");
		} catch (error) {
			console.error(error);
			toast.error("エラーが発生しました");
		} finally {
			setIsLoading(false);
		}
	};

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
		<div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
			<form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
				<div id="profile-image" className="rounded-lg bg-gray-50 p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full shadow-md ring-4 ring-white mx-auto sm:mx-0">
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt="プロフィール画像"
									fill
									sizes="(max-width: 768px) 96px, 128px"
									className="object-cover"
								/>
							) : (
								<div className="h-full w-full bg-blue-50" />
							)}
						</div>
						<div className="text-center sm:text-left">
							{" "}
							{/* テキストアライメントを調整 */}
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
								id="profile-image-upload"
							/>
							<label
								htmlFor="profile-image-upload"
								className="inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none w-full sm:w-auto"
							>
								画像を選択
							</label>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div>
						<label
							htmlFor="nickname"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							ニックネーム
						</label>
						<input
							type="text"
							id="nickname"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							className="block w-full rounded-lg border-gray-300 p-4 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
							placeholder="ニックネームを入力"
							required
							maxLength={PROFILE_CONSTRAINTS.nickname.maxLength}
						/>
					</div>

					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							名前
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="block w-full rounded-lg border-gray-300 p-4 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
							placeholder="名前を入力"
							required
							maxLength={PROFILE_CONSTRAINTS.name.maxLength}
						/>
					</div>

					<div>
						<label
							htmlFor="bio"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							自己紹介
						</label>
						<textarea
							id="bio"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							rows={4}
							className="block w-full rounded-lg border-gray-300 p-4 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
							placeholder="自己紹介を入力"
						/>
					</div>

					{/* 経歴セクション */}
					<div className="space-y-4">
						{careers.map((career, index) => (
							<div key={index} className="rounded-lg bg-gray-50 p-4">
								<div className="flex flex-col sm:flex-row gap-4">
									{" "}
									{/* レイアウトを調整 */}
									<div className="w-full sm:w-1/5">
										<input
											type="text"
											id={`career-period-${index}`}
											placeholder="2020 - 2024"
											value={career.period}
											onChange={(e) =>
												handleCareerChange(index, "period", e.target.value)
											}
											className="block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
										/>
									</div>
									<div className="flex-1">
										<textarea
											id={`career-description-${index}`}
											placeholder="経歴の詳細（50文字以内）"
											value={career.description}
											onChange={(e) =>
												handleCareerChange(index, "description", e.target.value)
											}
											maxLength={50}
											className="block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
										/>
										<div className="mt-1 text-right text-sm text-gray-500">
											{career.description.length}/50
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* フッターのボタン */}
					<div className="border-t border-gray-200 pt-6">
						<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
							{" "}
							{/* レイアウトを調整 */}
							<Link
								href="/admin"
								className="w-full sm:w-auto rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none text-center"
							>
								キャンセル
							</Link>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
							>
								{isLoading ? "保存中..." : "保存する"}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

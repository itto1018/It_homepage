"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { PROFILE_CONSTRAINTS } from "@/types/profile";
import { getProfile } from "@/lib/firebase/profile";
import { uploadProfileImage } from "@/lib/firebase/storage/uploadImage";
import { useRouter } from "next/navigation";

interface Career {
	period: string;
	description: string;
}

// バリデーション用の型
interface ValidationError {
	field: string;
	message: string;
}

// バリデーション関数
const validateProfile = (data: {
	name: string;
	nickname: string;
	bio: string;
	careers: Career[];
}): ValidationError[] => {
	const errors: ValidationError[] = [];

	// 名前の検証
	if (!data.name.trim()) {
		errors.push({ field: "name", message: "名前は必須項目です" });
	} else if (data.name.length > PROFILE_CONSTRAINTS.name.maxLength) {
		errors.push({
			field: "name",
			message: `名前は${PROFILE_CONSTRAINTS.name.maxLength}文字以内で入力してください`,
		});
	}

	// ニックネームの検証
	if (!data.nickname.trim()) {
		errors.push({ field: "nickname", message: "ニックネームは必須項目です" });
	} else if (data.nickname.length > PROFILE_CONSTRAINTS.nickname.maxLength) {
		errors.push({
			field: "nickname",
			message: `ニックネームは${PROFILE_CONSTRAINTS.nickname.maxLength}文字以内で入力してください`,
		});
	}

	// 自己紹介の検証
	if (data.bio && data.bio.length > PROFILE_CONSTRAINTS.bio.maxLength) {
		errors.push({
			field: "bio",
			message: `自己紹介は${PROFILE_CONSTRAINTS.bio.maxLength}文字以内で入力してください`,
		});
	}

	return errors;
};

export default function EditProfilePage() {
	const router = useRouter(); // 追加
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	const [bio, setBio] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [careers, setCareers] = useState<Career[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const profiles = await getProfile();
				if (profiles && profiles.length > 0) {
					const profile = profiles[0]; // 最初のプロフィールを使用
					setName(profile.name || "");
					setNickname(profile.nickname || "");
					setBio(profile.bio || "");
					setImageUrl(profile.imageUrl || null);
					setCareers(profile.careers || []);
				}
			} catch (error) {
				console.error("プロフィール取得エラー:", error);
				toast.error("プロフィールの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, []);

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
					imageUrl, // 既にアップロード済みの画像URLを使用
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
		<AdminLayout>
			<div className="mx-auto max-w-3xl">
				{/* パンくずリスト */}
				<nav className="mb-6 flex items-center text-sm text-gray-500">
					<Link href="/admin" className="hover:text-gray-700">
						管理画面
					</Link>
					<HiChevronRight className="mx-2" />
					<span className="text-gray-900">プロフィール編集</span>
				</nav>

				<div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
					<h1 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-gray-800">
						プロフィール編集
					</h1>
					<form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
						<div
							id="profile-image"
							className="rounded-lg bg-gray-50 p-4 sm:p-6"
						>
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
														handleCareerChange(
															index,
															"description",
															e.target.value
														)
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
			</div>
		</AdminLayout>
	);
}

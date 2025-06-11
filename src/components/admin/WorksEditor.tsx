"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import type { Works } from "@/types/works";
import { uploadImage, deleteImage } from "@/lib/firebase/storage/works";
import { getWorks, updateWorks, deleteWork } from "@/lib/firebase/store/works";
import toast from "react-hot-toast";

interface Props {
	initialWorks: Works[] | null;
}

export const WorksEditor: React.FC<Props> = ({ initialWorks }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [workForm, setWorkForm] = useState<Works>({
		id: "",
		title: "",
		description: "",
		imageUrl: null, // 空文字列から null に変更
		url: "",
		createdAt: new Date(),
	});
	const [tempFile, setTempFile] = useState<File | null>(null);
	const [tempImagePreview, setTempImagePreview] = useState<string | null>(null);

	const [works, setWorks] = useState<Works[]>(() => {
		// 初期データがある場合はそれを使用
		return initialWorks || [];
	});

	// 初期データの取得(Read)
	const handleReadWorks = async () => {
		try {
			setIsLoading(true);
			const worksData = await getWorks();
			if (worksData) {
				setWorks(worksData);
			} else {
				setWorks([]);
			}
		} catch (error) {
			console.error("Error fetching works:", error);
			toast.error("作品情報の取得に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	// 初期データの読み込み
	useEffect(() => {
		handleReadWorks();
	}, []);

	// 作品の追加(Create)
	const handleAddWork = (workId: string) => {
		const newWork = {
			...workForm,
			id: workId,
			createdAt: new Date(),
		};
		setWorks((prevWorks) => [...prevWorks, newWork]);
	};

	// 作品の更新(Update)
	const handleUpdateWork = (updatedWork: Works) => {
		const newWork = {
			...updatedWork,
			imageUrl: workForm.imageUrl || updatedWork.imageUrl,
		};
		setWorks((prevWorks) =>
			prevWorks.map((work) => (work.id === newWork.id ? newWork : work))
		);
	};

	// 作品の削除(Delete)
	const handleDeleteWork = (workId: string) => {
		setWorks((prevWorks) => prevWorks.filter((work) => work.id !== workId));
	};

	// 画像アップロード処理
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;

		const file = e.target.files[0];

		// ファイルサイズチェック（5MB以下）
		if (file.size > 5 * 1024 * 1024) {
			toast.error("ファイルサイズは5MB以下にしてください");
			return;
		}

		// 画像ファイルのみ許可
		if (!file.type.startsWith("image/")) {
			toast.error("画像ファイルのみアップロード可能です");
			return;
		}

		// ファイルを一時保存し、プレビューを表示
		setTempFile(file);
		const previewUrl = URL.createObjectURL(file);
		setTempImagePreview(previewUrl);
	};

	//画像削除処理
	const handleImageDelete = async (imageUrl: string) => {
		if (imageUrl) return;
		try {
			setIsLoading(true);
			await deleteImage(imageUrl);
			setWorkForm({ ...workForm, imageUrl: null });
			toast.success("画像を削除しました");
		} catch (error) {
			console.error("Error deleting image:", error);
			toast.error("画像の削除に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	// 編集モーダルを開く
	const handleEdit = (work: Works) => {
		setWorkForm(work);
		setIsModalOpen(true);
	};

	// 削除モーダルを開く
	const handleDeleteModal = (workId: string) => {
		setSelectedWorkId(workId);
		setIsDeleteModalOpen(true);
	};

	// 作品の削除を確定
	const handleConfirmDelete = async () => {
		if (!selectedWorkId) return;

		try {
			setIsLoading(true);
			await deleteWork(selectedWorkId);
			// 画像の削除
			await handleImageDelete(selectedWorkId);
			handleDeleteWork(selectedWorkId);
			toast.success("作品を削除しました");
		} catch (error) {
			console.error("Error deleting work:", error);
			toast.error("作品の削除に失敗しました");
		} finally {
			setIsLoading(false);
			setIsDeleteModalOpen(false);
			setSelectedWorkId(null);
		}
	};

	// モーダルのタイトルを動的に設定
	const modalTitle = workForm.id ? "作品を編集" : "作品を追加";

	// フォーム送信処理
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoading) return;

		// バリデーション
		if (!workForm.title || !workForm.description) {
			toast.error("必須項目を入力してください");
			return;
		}

		try {
			setIsLoading(true);
			const workId = workForm.id || crypto.randomUUID();
			
			// 画像がある場合はアップロード
			let imageUrl = workForm.imageUrl;
			if (tempFile) {
				imageUrl = await uploadImage(tempFile, workId);
			}

			const newWork = {
				...workForm,
				id: workId,
				imageUrl,
				createdAt: workForm.id ? workForm.createdAt : new Date(),
			};

			const updatedWorks = workForm.id
				? works.map((work) => (work.id === workId ? newWork : work))
				: [...works, newWork];

			await updateWorks(updatedWorks);
			setWorks(updatedWorks);
			toast.success("作品情報を保存しました");
			setIsModalOpen(false);
			
			// リセット
			setTempFile(null);
			setTempImagePreview(null);
		} catch (error) {
			console.error("Error saving work:", error);
			toast.error("作品情報の保存に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* 作品追加ボタン */}
			<div className="flex justify-end">
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center gap-2 rounded-lg bg-[#00a497] px-4 py-2 text-white hover:bg-[#00a497]/90 cursor-pointer disabled:cursor-not-allowed"
					disabled={isLoading}
				>
					<FaPlus className="h-4 w-4" />
					作品を追加
				</button>
			</div>

			{/* 作品一覧 */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{works.map((work) => (
					<div
						key={work.id}
						className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
					>
						{/* サムネイル画像 */}
						<div className="relative aspect-video">
							<Image
								src={work.imageUrl || "/images/no-image.png"} // フォールバック画像を追加
								alt={work.title || "No image"}
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
								作成日: {work.createdAt.toLocaleDateString("ja-JP", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								})}
							</p>
						</div>

						{/* 編集・削除ボタン */}
						<div className="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
							<button
								onClick={() => handleEdit(work)}
								className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:text-[#00a497] cursor-pointer"
							>
								<FaEdit className="h-4 w-4" />
							</button>
							<button
								onClick={() => handleDeleteModal(work.id)}
								className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:text-red-500 cursor-pointer"
							>
								<FaTrash className="h-4 w-4" />
							</button>
						</div>
					</div>
				))}
			</div>

			{/* 作品追加/編集モーダル */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-full max-w-md rounded-lg bg-white p-6">
						<h2 className="mb-4 text-xl font-bold">{modalTitle}</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									タイトル*
								</label>
								<input
									type="text"
									value={workForm.title}
									onChange={(e) =>
										setWorkForm({ ...workForm, title: e.target.value })
									}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
									maxLength={30}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									説明文*
								</label>
								<textarea
									value={workForm.description}
									onChange={(e) =>
										setWorkForm({ ...workForm, description: e.target.value })
									}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
									maxLength={30}
									rows={2}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									URL
								</label>
								<input
									type="url"
									value={workForm.url}
									onChange={(e) =>
										setWorkForm({ ...workForm, url: e.target.value })
									}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									サムネイル画像*
								</label>
								<div className="mt-1 flex items-center gap-4">
									<input
										type="file"
										ref={fileInputRef}
										className="hidden"
										accept="image/*"
										onChange={handleImageUpload}
									/>
									<button
										type="button"
										className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
										onClick={() => fileInputRef.current?.click()}
										disabled={isLoading}
									>
										<FaUpload className="h-4 w-4" />
										{isLoading ? "アップロード中..." : "アップロード"}
									</button>
									{tempImagePreview ? (
										<div className="relative h-20 w-32">
											<Image
												src={tempImagePreview}
												alt="プレビュー"
												fill
												className="rounded-md object-cover"
											/>
										</div>
									) : workForm.imageUrl ? (
										<div className="relative h-20 w-32">
											<Image
												src={workForm.imageUrl}
												alt="プレビュー"
												fill
												className="rounded-md object-cover"
											/>
										</div>
									) : null}
								</div>
							</div>

							<div className="flex justify-end gap-4 pt-4">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="rounded-md px-4 py-2 text-gray-500 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed"
									disabled={isLoading}
								>
									キャンセル
								</button>
								<button
									type="submit"
									className="rounded-md bg-[#00a497] px-4 py-2 text-white hover:bg-[#00a497]/90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
									disabled={isLoading}
								>
									{isLoading ? "保存中..." : "保存"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 削除確認モーダル */}
			{isDeleteModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-full max-w-sm rounded-lg bg-white p-6">
						<h2 className="mb-4 text-xl font-bold">作品を削除</h2>
						<p className="mb-4">この作品を削除してもよろしいですか？</p>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className="rounded-md px-4 py-2 text-gray-500 hover:bg-gray-50"
							>
								キャンセル
							</button>
							<button
								onClick={handleConfirmDelete}
								className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
							>
								削除
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

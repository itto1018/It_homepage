import { storage } from "@/lib/firebase/client";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

export const uploadImage = async (
	file: File,
	workId: string
): Promise<string> => {
	try {
		// 拡張子を取得
		const extension = file.name.split(".").pop();
		// workIdをファイル名として使用
		const fileName = `${workId}.${extension}`;
		const storageRef = ref(storage, `works/${fileName}`);

		// 画像をアップロード
		const snapshot = await uploadBytes(storageRef, file);

		// ダウンロードURLを取得
		const downloadUrl = await getDownloadURL(snapshot.ref);

		return downloadUrl;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw new Error("画像のアップロードに失敗しました");
	}
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
	// Validation
	try {
		if (!imageUrl || typeof imageUrl !== "string") {
			throw new Error("無効な画像URLです");
		}

		const url = new URL(imageUrl);
		if (!url.pathname.includes("firebasestorage.googleapis.com")) {
			throw new Error("無効なFirebase Storage URLの形式です");
		}

		const fullPath = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
		if (!fullPath.startsWith("works/")) {
			throw new Error("無効な画像パスです");
		}

		const imageRef = ref(storage, fullPath);
		await deleteObject(imageRef);
	} catch (error) {
		console.error("Error deleting image:", error);
		throw new Error("画像の削除に失敗しました");
	}
};

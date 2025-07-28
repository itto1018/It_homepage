import { storage } from "@/lib/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadProfileImage = async (
	file: File | Blob
): Promise<string> => {
	try {
		// ファイル名を生成
		const fileName = "profile_image.jpg";

		// プロフィール画像用のパスを設定
		const storageRef = ref(storage, `profiles/image/${fileName}`);

		// ファイルをアップロード
		const snapshot = await uploadBytes(storageRef, file);

		// アップロードされたファイルのURLを取得
		const downloadURL = await getDownloadURL(snapshot.ref);

		return downloadURL;
	} catch (error: any) {
		console.error("Error uploading profile image:", error);
		throw new Error(`画像のアップロードに失敗しました: ${error.message}`);
	}
};

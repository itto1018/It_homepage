import { storage } from "@/lib/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // ファイル名をUUIDに変換
    const fileName = `${crypto.randomUUID()}-${file.name}`;
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

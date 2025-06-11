import { storage } from "@/lib/firebase/client";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadImage = async (file: File, workId: string): Promise<string> => {
  try {
    // 拡張子を取得
    const extension = file.name.split('.').pop();
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
  try {
    // URLからworks/以降のパスを抽出
    const fullPath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
    const imageRef = ref(storage, fullPath);

    // 画像を削除
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("画像の削除に失敗しました");
  }
};

import { storage } from "@/lib/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadProfileImage = async (file: File): Promise<string> => {
  if (!file) throw new Error("ファイルが選択されていません");

  try {
    const storageRef = ref(storage, `profiles/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    throw error;
  }
};

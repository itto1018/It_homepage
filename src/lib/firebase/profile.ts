import db from "./client";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "./client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Profile } from "@/types/profile";
import { auth } from "@/auth";

export const getProfile = async (): Promise<Profile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "profiles"));

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Profile[];
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

// 画像をGCSにアップロードする関数
export const uploadProfileImage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("ファイルが選択されていません");
  }

  // Auth.jsのセッションを確認
  const session = await auth();
  if (!session) {
    throw new Error("認証されていません。ログインしてください。");
  }

  try {
    const storageRef = ref(
      storage,
      `it_homepage/profile/image/profile_image.jpg`,
    );

    const metadata = {
      contentType: file.type,
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    return await getDownloadURL(snapshot.ref);
  } catch (error: any) {
    console.error("Error uploading profile image:", error);
    throw new Error(`アップロードエラー: ${error.message}`);
  }
};

// プロフィール画像のURLを取得する関数
export const getProfileImageUrl = async (): Promise<string | null> => {
  try {
    const imageRef = ref(
      storage,
      "it_homepage/profile/image/profile_image.jpg",
    );
    return await getDownloadURL(imageRef);
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      return null;
    }
    console.error("Error fetching profile image:", error);
    return null;
  }
};

// 認証状態を確認する関数
export const checkAuthState = async (): Promise<boolean> => {
  const session = await auth();
  console.log(
    "Current auth state:",
    session ? "authenticated" : "not authenticated",
  );
  return !!session;
};

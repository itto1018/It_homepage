import { db, storage } from "../client";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Profile } from "@/types/profile";


export const getProfile = async (): Promise<Profile> => {
	try {
		const profilesRef = doc(db, "profiles", "main");
		const docSnap = await getDoc(profilesRef);
		
		if (!docSnap.exists()) {
			throw new Error("プロフィールデータが見つかりません");
		}

		// 既存のデータから必要なフィールドのみを抽出
		const data = docSnap.data();
		return {
			name: data.name,
      		nickname: data.nickname,
      		bio: data.bio,
      		imageUrl: data.imageUrl,
      		careers: data.careers || [],
		} as Profile;
	} catch (error) {
		console.error("Error fetching profiles:", error);
		throw error;
	}
};

export async function getPublicProfile(): Promise<Profile | null> {
	try {
		const docRef = doc(db, "profiles", "main");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data() as Profile;
		}
		return null;
	} catch (error) {
		console.error("Error fetching profile:", error);
		throw error;
	}
}

// 画像をGCSにアップロードする関数
export const uploadProfileImage = async (file: File): Promise<string> => {
	if (!file) {
		throw new Error("ファイルが選択されていません");
	}

	try {
		const storageRef = ref(
			storage,
			`it_homepage/profile/image/profile_image.jpg`
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
			"it_homepage/profile/image/profile_image.jpg"
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

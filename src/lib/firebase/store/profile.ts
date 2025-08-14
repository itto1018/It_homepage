import { db, storage } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import type { Profile, ProfileLink } from "@/types/profile";

// プロフィールを取得する関数
export const getProfile = async (): Promise<Profile> => {
	try {
		// プロフィールを取得
		const docRef = doc(db, "profiles", "main");
		const docSnap = await getDoc(docRef);

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

// プロフィールリンクを取得する関数
export const getProfileLink = async (): Promise<ProfileLink> => {
	try {
		const docRef = doc(db, "profiles", "link");
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("プロフィールデータが見つかりません");
		}

		const data = docSnap.data();

		return {
			twitter: data.twitter,
			github: data.github,
			wantedly: data.wantedly,
			zenn: data.zenn,
			mail: data.mail,
		} as ProfileLink;
	} catch (error) {
		console.error("Error fetching profile-link:", error);
		throw error;
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
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			if (error.code === "storage/object-not-found") {
				return null;
			}
			console.error("Error fetching profile image:", error);
			throw new Error(`プロフィール画像の取得に失敗しました: ${error.message}`);
		}
		console.error("Unknown error occurred:", error);
		throw new Error("予期せぬエラーが発生しました");
	}
};

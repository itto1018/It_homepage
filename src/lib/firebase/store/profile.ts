import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import type { Profile, ProfileLink } from "@/types/profile";

// プロフィールを取得する関数
export const getProfile = async (): Promise<Profile> => {
	try {
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
export const getProfileSocialLink = async (): Promise<ProfileLink> => {
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

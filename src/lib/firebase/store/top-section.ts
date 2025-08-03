import { db, storage } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import type { Profile, ProfileLink } from "@/types/profile";
import { TopSection } from "@/types/top-section";

// トップセクションを取得する関数
export const getTopSection = async (): Promise<TopSection> => {
	try {
		// トップセクションを取得
		const docRef = doc(db, "top-section", "main");
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("トップセクションデータが見つかりません");
		}

		// 既存のデータから必要なフィールドのみを抽出
		const data = docSnap.data();
		return {
			article: data.article,
		} as TopSection;
	} catch (error) {
		console.error("Error fetching top section:", error);
		throw error;
	}
};

import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { Top } from "@/types/top";

// トップセクションを取得する関数
export const getTop = async (): Promise<Top> => {
	try {
		// トップセクションを取得
		const docRef = doc(db, "top", "main");
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			throw new Error("トップデータが見つかりません");
		}

		// 既存のデータから必要なフィールドのみを抽出
		const data = docSnap.data();
		return {
			article: data.article,
		} as Top;
	} catch (error) {
		console.error("Error fetching top section:", error);
		throw error;
	}
};

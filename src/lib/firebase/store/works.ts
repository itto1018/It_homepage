import { db } from "@/lib/firebase/client";
import {
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import type { Works } from "@/types/works";
import { deleteImage } from "../storage/works";

// Firestoreから取得（Read)
export const getWorks = async (): Promise<Works[]> => {
	try {
		const worksRef = doc(db, "works", "default");
		const docSnap = await getDoc(worksRef);

		if (!docSnap.exists()) {
			await setDoc(worksRef, { works: [] });
			return [];
		}

		// Timestampを Date に変換
        return (docSnap.data().works as Array<Works & { createdAt: Timestamp }>).map((work) => ({
            ...work,
            createdAt: work.createdAt?.toDate() || new Date(),
        }));
	} catch (error) {
		console.error("Error fetching works:", error);
		throw new Error("作品情報の取得に失敗しました");
	}
};

// 新規作品を追加（Create)
export const addWork = async (
	work: Omit<Works, "id" | "createdAt">
): Promise<Works> => {
	try {
		const worksRef = doc(db, "works", "default");
		const docSnap = await getDoc(worksRef);

		// 既存の作品データを取得
		const currentWorks = docSnap.exists() ? docSnap.data().works || [] : [];

		// 新規作品のデータを作成
		const newWork = {
			...work,
			id: crypto.randomUUID(),
			title: work.title,
			description: work.description,
			url: work.url || "",
			createdAt: serverTimestamp(),
		};

		// 既存の作品一覧に新規作品を追加
		const updatedWorks = [...currentWorks, newWork];

		// Firestoreに保存
		await setDoc(worksRef, {
			works: updatedWorks,
			updatedAt: serverTimestamp(),
		});

		return {
			...newWork,
			createdAt: new Date(),
		};
	} catch (error) {
		console.error("Error adding work:", error);
		throw new Error("作品の追加に失敗しました");
	}
};

// 作品情報を更新（Update）
export const updateWorks = async (works: Works[]): Promise<void> => {
	try {
		const worksRef = doc(db, "works", "default");
		const formattedWorks = works.map((work) => ({
			...work,
			createdAt:
				work.createdAt instanceof Date
					? Timestamp.fromDate(work.createdAt)
					: serverTimestamp(),
		}));

		await setDoc(worksRef, {
			works: formattedWorks,
			updatedAt: serverTimestamp(),
		});
	} catch (error) {
		console.error("Error updating works:", error);
		throw new Error("作品情報の更新に失敗しました");
	}
};

// 作品を削除（Delete）
export const deleteWork = async (workId: string): Promise<void> => {
	try {
		const worksRef = doc(db, "works", "default");
		const docSnap = await getDoc(worksRef);

		if (!docSnap.exists()) {
			throw new Error("作品が見つかりません");
		}

		const currentWorks = docSnap.data().works || [];
		const workToDelete = currentWorks.find((work: Works) => work.id === workId);

		if (workToDelete?.imageUrl) {
			await deleteImage(workToDelete.imageUrl);
		}

		const updatedWorks = currentWorks.filter(
			(work: Works) => work.id !== workId
		);

		await setDoc(worksRef, {
			works: updatedWorks,
			updatedAt: serverTimestamp(),
		});
	} catch (error) {
		console.error("Error deleting work:", error);
		throw new Error("作品の削除に失敗しました");
	}
};

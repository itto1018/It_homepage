import { db } from "../client";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import type { Works } from "@/types/works";

// Firestoreから取得
export const getWorks = async (): Promise<Works[]> => {
  try {
    const worksRef = doc(db, "works", "default");
    const docSnap = await getDoc(worksRef);

    if (!docSnap.exists()) {
      // 存在しない場合は空配列を返す
      await setDoc(worksRef, { works: [] });
      return [];
    }

    // Timestampを Date に変換
    return docSnap.data().works.map((work: any) => ({
      ...work,
      createdAt: work.createdAt?.toDate() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching works:", error);
    throw new Error("作品情報の取得に失敗しました");
  }
};

// 作品情報を更新
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

// 新規作品を追加
export const addWork = async (
  work: Omit<Works, "id" | "createdAt">,
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

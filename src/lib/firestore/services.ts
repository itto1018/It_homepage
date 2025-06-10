import { db } from "@/lib/firebase/client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { Service } from "@/types/service";
import type { Skill } from "@/types/serviceSkill";
import { DEFAULT_SERVICES } from "@/constants/services";

// サービス一覧を取得（定数から取得）
export const getServices = async (): Promise<Service[]> => {
  return DEFAULT_SERVICES;
};

// スキル一覧を取得（Firestoreから取得）
export const getSkills = async (): Promise<Skill[]> => {
  try {
    const skillsRef = doc(db, "skills", "default");
    const docSnap = await getDoc(skillsRef);

    if (!docSnap.exists()) {
      // スキルが存在しない場合は空配列を返す
      await setDoc(skillsRef, { skills: [] });
      return [];
    }

    return docSnap.data().skills as Skill[];
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("スキル情報の取得に失敗しました");
  }
};

// スキルを更新
export const updateSkills = async (skills: Skill[]): Promise<void> => {
  try {
    const skillsRef = doc(db, "skills", "default");

    // スキルの形式を確認
    const formattedSkills = skills.map((skill) => ({
      id: skill.id,
      serviceId: skill.serviceId,
      name: skill.name,
      level: skill.level,
    }));

    await setDoc(skillsRef, { skills: formattedSkills }, { merge: true });
  } catch (error) {
    console.error("Error updating skills:", error);
    throw new Error("スキル情報の更新に失敗しました");
  }
};

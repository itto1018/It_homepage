import { db } from "../client";
import { collection, doc, getDocs } from "firebase/firestore";
import type { Service, Skill } from "@/types/services";

// サービス一覧を取得(Read)
export const getServices = async (): Promise<Service[]> => {
	try {
		const servicesRef = doc(db, "services", "main");
		const itemsRef = collection(servicesRef, "items");
		const docSnap = await getDocs(itemsRef);

		if (docSnap.empty) {
			throw new Error("サービスデータが見つかりません");
		}

		const services = docSnap.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				title: data.title,
				items: data.items,
			};
		});

		return services;
	} catch (error) {
		console.error("Error fetching services:", error);
		throw new Error("サービス情報の取得に失敗しました");
	}
};

// スキル一覧を取得(Read)
export const getSkills = async (): Promise<Skill[]> => {
	try {
		const skillsRef = doc(db, "services", "skills");
		const itemsRef = collection(skillsRef, "items");
		const docSnap = await getDocs(itemsRef);

		if (docSnap.empty) {
			throw new Error("スキルデータが見つかりません");
		}

		// 既存のデータから必要なフィールドのみを抽出
		const skills = docSnap.docs.map((doc) => {
			const data = doc.data();
			return {
				skillId: data.skillId,
				serviceId: data.serviceId,
				skillName: data.skillName,
				skillLevel: data.skillLevel,
				skillDescription: data.skillDescription || "",
			};
		});
		return skills;
	} catch (error) {
		console.error("Error fetching skills:", error);
		throw new Error("スキル情報の取得に失敗しました");
	}
};

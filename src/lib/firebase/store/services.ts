import { db } from "../client";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import type { Service, Skill } from "@/types/services";

// サービス一覧を取得
export const getServices = async (): Promise<Service[]> => {
	try {
		const servicesRef = doc(db, "services", "default");
		const docSnap = await getDoc(servicesRef);

		if (!docSnap.exists()) {
			return [];
		}

		// 既存のデータから必要なフィールドのみを抽出
		const data = docSnap.data();
		const services = (data.services || []).map((service: any) => ({
			id: service.id,
			title: service.title,
			items: service.items,
		}));
		return services;
	} catch (error) {
		console.error("Error fetching services:", error);
		return [];
	}
};

// サービスを更新
export const updateServices = async (services: Service[]): Promise<void> => {
	try {
		const servicesRef = doc(db, "services", "default");

		const formattedServices = services.map((service) => ({
			serviceId: service.id,
			title: service.title,
			items: service.items,
		}));

		await setDoc(servicesRef, { services: formattedServices }, { merge: true });
	} catch (error) {
		console.error("Error updating services:", error);
		throw new Error("サービス情報の更新に失敗しました");
	}
};

// スキル一覧を取得（Firestoreから取得）
export const getSkills = async (): Promise<Skill[]> => {
	try {
		const skillsRef = doc(db, "skills", "default");
		const docSnap = await getDoc(skillsRef);

		if (!docSnap.exists()) {
			return [];
		}

		// 既存のデータから必要なフィールドのみを抽出
		const data = docSnap.data();
		return (data.skills || []).map((skill: any) => ({
			id: skill.id,
			serviceId: skill.serviceId,
			name: skill.name,
			level: skill.level,
		}));
	} catch (error) {
		console.error("Error fetching skills:", error);
		return []; // エラー時は空配列を返す
	}
};

// スキルを更新
export const updateSkills = async (skills: Skill[]): Promise<void> => {
	try {
		const skillsRef = doc(db, "skills", "default");

		// スキルの形式を確認
		const formattedSkills = skills.map((skill) => ({
			skillId: skill.skillId,
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

// タイムスタンプ以外の全てのサービスを取得
export async function getAllServices(): Promise<Service[]> {
	const servicesRef = collection(db, "services");
	const snapshot = await getDocs(servicesRef);

	return snapshot.docs.map((doc) => {
		const data = doc.data();
		// 必要なデータのみを抽出
		return {
			id: doc.id,
			title: data.title,
			items:
				data.items?.map((item: any) => ({
					id: item.id,
					name: item.name,
					level: item.level,
				})) || [],
		};
	});
}

// タイムスタンプ以外の全てのスキルを取得
export async function getAllSkills(): Promise<Skill[]> {
	const skillsRef = collection(db, "skills");
	const snapshot = await getDocs(skillsRef);

	return snapshot.docs.map((doc) => {
		const data = doc.data();
		// 必要なデータのみを抽出
		return {
			skillId: doc.id,
			serviceId: data.serviceId,
			name: data.name,
			level: data.level,
		};
	});
}

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/store/admin";
import { Service, Skill } from "@/types/services"; // 既存の型定義をインポート

// リクエストの型定義
interface ServiceRequest {
	services: Service[];
	skills: Skill[];
	deletedSkillIds: string[];
}

export async function POST(request: Request) {
	try {
		const { services, skills, deletedSkillIds }: ServiceRequest =
			await request.json();
		const batch = adminDb.batch();

		if (deletedSkillIds.length > 0) {
			await Promise.all(
				deletedSkillIds.map((skillId) =>
					adminDb
						.collection("services")
						.doc("skills")
						.collection("items")
						.doc(skillId)
						.delete()
				)
			);
		}
		// サービスの更新
		for (const service of services) {
			const docRef = adminDb
				.collection("services")
				.doc("main")
				.collection("items")
				.doc(service.id);
			batch.update(docRef, service);
		}

		// スキルの更新
		for (const skill of skills) {
			const docRef = adminDb
				.collection("services")
				.doc("skills")
				.collection("items")
				.doc(skill.skillId);
			batch.set(docRef, skill, { merge: true });
		}

		await batch.commit();
		return NextResponse.json({ message: "保存が完了しました" });
	} catch (error) {
		console.error("Error updating services:", error);
		return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
	}
}

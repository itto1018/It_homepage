import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/types/services";
import { serverTimestamp } from "firebase/firestore";
import { authenticateRequest } from "@/middleware/authMiddleware";
import { adminDb } from "@/lib/firebase/store/admin";

export async function PUT(request: Request) {
	try {
		// リクエストボディからデータを取得
		const data: Partial<Skill> = await request.json();

		// 更新日時と作成日時を設定
		const now = new Date();
		const skillData = {
			...data,
			skillId: data.skillId,
			serviceId: data.serviceId,
			name: data.name,
			level: data.level,
			updatedAt: now,
			createdAt: now,
		};

		const docRef = adminDb.collection("skills").doc("default");
		await docRef.set(skillData, { merge: true });

		return NextResponse.json({
			message: "保存しました",
			data: skillData,
		});
	} catch (error) {
		console.error("Error saving skill:", error);
		return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
	}
}

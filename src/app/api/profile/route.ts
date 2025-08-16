import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/store/admin";
import type { Profile, Career } from "@/types/profile";

export async function POST(request: Request) {
	try {
		// リクエストボディからデータを取得
		const data: Partial<Profile> = await request.json();

		// バリデーション
		if (data.careers) {
			const validCareers = data.careers.filter(
				(career: Career) =>
					career.period && career.description && career.description.length <= 50
			);
			data.careers = validCareers;
		}

		// 更新日時と作成日時を設定
		const now = new Date();
		const profileData = {
			...data,
			careers: data.careers || [],
			updatedAt: now,
			createdAt: now,
		};

		// プロフィール画像URLがある場合は保存
		if (data.imageUrl) {
			profileData.imageUrl = data.imageUrl;
		}

		const docRef = adminDb.collection("profiles").doc("main");
		await docRef.set(profileData, { merge: true });

		return NextResponse.json({
			message: "保存しました",
			data: profileData,
		});
	} catch (error) {
		console.error("Error saving profile:", error);
		return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
	}
}

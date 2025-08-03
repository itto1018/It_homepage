import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/store/admin";
import { TopSection } from "@/types/top-section";

export async function POST(request: Request) {
	try {
		// リクエストボディからデータを取得
		const data: Partial<TopSection> = await request.json();

		// バリデーション

		// 更新日時を設定
		const now = new Date();
		const topSectionData = {
			...data,
			article: data.article || "",
			updatedAt: now,
		};

		const docRef = adminDb.collection("topsection").doc("main");
		await docRef.set(topSectionData, { merge: true });

		return NextResponse.json({
			message: "保存しました",
			data: topSectionData,
		});
	} catch (error) {
		console.error("Error saving top section:", error);
		return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
	}
}

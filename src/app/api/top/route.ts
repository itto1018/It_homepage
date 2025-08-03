import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/store/admin";
import { Top } from "@/types/top";

// 文字数制限の定数
const MAX_LENGTH = 100;

export async function POST(request: Request) {
	try {
		// リクエストボディからデータを取得
		const data: Partial<Top> = await request.json();

		// バリデーション
		if (!data.article) {
            return NextResponse.json(
                { error: "メッセージは必須です" },
                { status: 400 }
            );
        }
        
		if (data.article.length > MAX_LENGTH) {
            return NextResponse.json(
                { error: `メッセージは${MAX_LENGTH}文字以内で入力してください` },
                { status: 400 }
            );
        }

		// 更新日時を設定
		const now = new Date();
		const topData = {
			...data,
			article: data.article || "",
			updatedAt: now,
		};

		const docRef = adminDb.collection("top").doc("main");
		await docRef.set(topData, { merge: true });

		return NextResponse.json({
			message: "保存しました",
			data: topData,
		});
	} catch (error) {
		console.error("Error saving top section:", error);
		return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
	}
}

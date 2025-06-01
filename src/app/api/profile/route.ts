import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { auth } from "@/auth";

export async function POST(request: Request) {
    try {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
      } 
      const data = await request.json();
      const now = new Date();   
      const profileData = {
        ...data,
        updatedAt: now,
        ...(data.id ? {} : { createdAt: now })
      };    
      const docRef = adminDb.collection("profiles").doc("main");
      await docRef.set(profileData, { merge: true });   
      return NextResponse.json({ message: "保存しました" });
    } 
    catch (error) {
        console.error("Error saving profile:", error);
        return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
    }
}

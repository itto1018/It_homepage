import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    await getAuth().verifyIdToken(token);
    return true;
  } catch (error) {
    console.error("Auth error:", error);
    return false;
  }
}
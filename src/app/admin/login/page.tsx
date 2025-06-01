"use client";

import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "認証に失敗しました。承認されたアカウントでログインしてください。";
      case "true":
        return "認証に失敗しました。もう一度お試しください。";
      default:
        return "";
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/admin",
      });
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">管理者ログイン</h1>
          <p className="text-gray-600">管理画面にアクセスするにはログインが必要です</p>
        </div>

        {getErrorMessage(error) && <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">{getErrorMessage(error)}</div>}

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors hover:cursor-pointer"
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span className="text-gray-700 font-medium">Googleアカウントでログイン</span>
        </button>
      </div>
    </div>
  );
}

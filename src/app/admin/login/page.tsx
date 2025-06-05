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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            管理者ログイン
          </h1>
          <p className="text-gray-600">
            管理画面にアクセスするにはログインが必要です
          </p>
        </div>

        {getErrorMessage(error) && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
            {getErrorMessage(error)}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50"
        >
          <FaGoogle className="h-5 w-5 text-red-500" />
          <span className="font-medium text-gray-700">
            Googleアカウントでログイン
          </span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { auth } from "@/lib/auth/firebase";
import {
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push("/admin");
			}
		});

		return () => unsubscribe();
	}, [router]);

	const handleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			if (error instanceof FirebaseError) {
				switch (error.code) {
					case "auth/popup-closed-by-user":
						toast.error("ログインがキャンセルされました。再度お試しください。");
						break;
					case "auth/popup-blocked":
						toast.error(
							"ポップアップがブロックされました。ブラウザの設定を確認してください。"
						);
						break;
					default:
						toast.error("ログインエラーが発生しました。");
						console.error("ログインエラー:", error);
				}
			}
		}
	};

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
					onClick={handleSignIn}
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

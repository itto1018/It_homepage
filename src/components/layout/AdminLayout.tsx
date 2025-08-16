"use client";

import Loading from "@/components/elements/Loading";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthGuard } from "../admin/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { onAuthStateChanged } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export function AdminLayout({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((user) => {
			try {
				if (!loading && !user) {
					router.push("/admin/login");
				}
			} catch (error) {
				if (error instanceof FirebaseError) {
					if (error.code === "auth/popup-closed-by-user") {
						toast.error("ログインがキャンセルされました。再度お試しください。");
					}
				} else {
					toast.error("認証エラーが発生しました。");
					console.error("認証エラー:", error);
				}
			}
		});
		return () => unsubscribe();
	}, [user, loading, router]);

	if (loading) {
		return <Loading />;
	}

	return (
		<AuthGuard>
			<div className="min-h-screen flex flex-col bg-gray-50">
				<div className="flex flex-1">
					<Sidebar />
					<div className="flex-1 md:pl-64">
						<main className="py-5">{children}</main>
					</div>
				</div>
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						duration: 3000,
						style: {
							background: "#363636",
							color: "#fff",
							padding: "16px",
							borderRadius: "8px",
						},
						success: {
							iconTheme: {
								primary: "#4CAF50",
								secondary: "#fff",
							},
						},
						error: {
							iconTheme: {
								primary: "#f44336",
								secondary: "#fff",
							},
						},
					}}
				/>
			</div>
		</AuthGuard>
	);
}

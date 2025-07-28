"use client";

import { Toaster } from "react-hot-toast";
import { AuthGuard } from "../admin/AuthGuard";
import { Sidebar } from "@/components/admin/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((user) => {
			if (!user) {
				router.push("/auth/signin");
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [router]);

	if (isLoading) {
		return <div>Loading...</div>;
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

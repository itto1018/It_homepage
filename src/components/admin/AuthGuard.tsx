"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { status } = useSession();

	if (status === "loading") {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (status === "unauthenticated") {
		redirect("/admin/login");
	}

	return <>{children}</>;
}

"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { redirect } from "next/navigation";
import Loading from "@/components/elements/Loading";

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { user, loading } = useAuth();
	// ローディング中の表示
	if (loading) {
		return <Loading />;
	}

	if (!user) {
		redirect("/admin/login");
	}

	return <>{children}</>;
}

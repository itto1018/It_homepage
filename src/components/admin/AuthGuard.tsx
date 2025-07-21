"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { redirect } from "next/navigation";

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { user, loading } = useAuth();
	if (loading) {
	  return (
	    <div className="flex min-h-screen items-center justify-center">
	      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
	    </div>
	  );
	}

	if (!user) {
	  redirect("/admin/login");
	}
	
	return <>{children}</>;
}

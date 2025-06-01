"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/admin/login");
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                管理画面
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 text-sm text-gray-600 rounded-md
                                         transition-all duration-200 ease-in-out
                                         hover:bg-red-50 hover:text-red-600 hover:shadow-sm
                                         active:bg-red-100 active:text-red-700
                                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:cursor-pointer"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="p-4">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

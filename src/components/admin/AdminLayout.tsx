"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

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
                It Admin
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
              <Link
                href="/"
                className="px-3 py-1.5 text-sm text-gray-600 rounded-md
                            transition-all duration-200 ease-in-out
                            hover:bg-grey-50 hover:text-gray-500 hover:shadow-sm
                            active:bg-grey-100 active:text-grey-700
                            focus:outline-none focus:ring-2 focus:ring-grey-900 focus:ring-opacity-50 hover:cursor-pointer"
              >
                表示画面
              </Link>
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
      <main className="flex-1 p-6">
        {children}
      </main>
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
  );
}

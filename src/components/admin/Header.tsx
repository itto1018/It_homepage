"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-900">
              It Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session?.user?.email}
            </span>
            <Link
              href="/"
              className="hover:bg-grey-50 active:bg-grey-100 active:text-grey-700 focus:ring-grey-900 focus:ring-opacity-50 rounded-md px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-gray-500 hover:shadow-sm focus:ring-2 focus:outline-none"
            >
              表示画面
            </Link>
            <button
              onClick={handleSignOut}
              className="focus:ring-opacity-50 rounded-md px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-red-50 hover:text-red-600 hover:shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none active:bg-red-100 active:text-red-700"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
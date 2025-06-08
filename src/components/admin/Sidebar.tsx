"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUser,
  FaClipboard,
  FaSignOutAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: "ホーム", href: "/admin", icon: FaHome },
    { name: "プロフィール編集", href: "/admin/edit/profile", icon: FaUser },
    { name: "作品集管理", href: "/admin/edit/services", icon: FaClipboard },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-xl">
      <div className="flex h-full flex-col justify-between">
        {/* ヘッダー部分 */}
        <div>
          <div className="flex h-16 items-center justify-center border-b border-[#00a497]/10 bg-gradient-to-r from-[#00a497]/5 to-transparent">
            <h1 className="text-xl font-bold text-[#00a497]">It.dev Admin</h1>
          </div>

          {/* ナビゲーション */}
          <nav className="p-6">
            <ul className="space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#00a497] to-[#45b7af] text-white shadow-md"
                          : "text-gray-600 hover:bg-[#00a497]/5 hover:text-[#00a497] hover:shadow-sm"
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 transition-transform duration-200 ${
                          isActive ? "" : "group-hover:scale-110"
                        }`}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* フッター部分 */}
        <div className="border-t border-[#00a497]/10 bg-gradient-to-r from-[#00a497]/5 to-transparent p-6">
          {/* パブリック画面へのリンク */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-[#00a497]/5 hover:text-[#00a497] transition-all duration-200 hover:cursor-pointer"
          >
            <FaExternalLinkAlt className="mr-3 h-5 w-5" />
            パブリック画面を表示
          </Link>

          {/* ユーザー情報 */}
          <div className="border-t border-[#00a497]/10 pt-4 mb-4 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#00a497] text-white flex items-center justify-center">
              {session?.user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {session?.user?.email}
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 hover:cursor-pointer"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            ログアウト
          </button>
        </div>
      </div>
    </aside>
  );
};

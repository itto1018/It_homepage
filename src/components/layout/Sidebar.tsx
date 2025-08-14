"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FaHome,
	FaUser,
	FaToolbox,
	FaClipboard,
	FaSignOutAlt,
	FaExternalLinkAlt,
	FaBars,
	FaTimes,
} from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { auth } from "@/lib/auth/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@/components/auth/AuthProvider";

export const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const { user } = useAuth();

	const navigation = [
		{ name: "ホーム", href: "/admin", icon: FaHome },
		{
			name: "トップページ管理",
			href: "/admin/edit/top",
			icon: BsChatLeftTextFill,
		},
		{ name: "プロフィール管理", href: "/admin/edit/profile", icon: FaUser },
		{ name: "サービス管理", href: "/admin/edit/services", icon: FaToolbox },
		{ name: "作品集管理", href: "/admin/edit/works", icon: FaClipboard },
	];

	const handleSignOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("ログアウトエラー:", error);
		}
	};

	return (
		<>
			{/* オーバーレイ（モバイルでメニュー表示時のみ表示） */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-30 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* サイドバー */}
			<aside
				className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex h-full flex-col justify-between">
					<div>
						<nav className="mt-16 p-6">
							<ul className="space-y-3">
								{navigation.map((item) => {
									const isActive = pathname === item.href;
									return (
										<li key={item.name}>
											<Link
												href={item.href}
												onClick={() => setIsOpen(false)} // モバイルでリンククリック時にメニューを閉じる
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
					<div className="border-t border-[#00a497]/10 bg-gradient-to-r from-[#00a497]/5 to-transparent p-6 pb-25">
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
								{user?.email?.[0]?.toUpperCase() || "U"}
							</div>
							<span className="text-sm text-gray-600 font-medium">
								{user?.email}
							</span>
						</div>
						<button
							onClick={handleSignOut}
							className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 hover:cursor-pointer"
						>
							<FaSignOutAlt className="mr-3 h-5 w-5" />
							ログアウト
						</button>
					</div>
				</div>
			</aside>
			{/* ハンバーガーメニューボタン（モバイルのみ表示） */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-30 left-5 z-50 rounded-lg p-2 bg-white shadow-md md:hidden"
			>
				{isOpen ? (
					<FaTimes className="h-6 w-6 text-[#00a497]" />
				) : (
					<FaBars className="h-6 w-6 text-[#00a497]" />
				)}
			</button>
		</>
	);
};

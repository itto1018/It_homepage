"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaClipboard, FaToolbox } from "react-icons/fa";
import type { IconType } from "react-icons";
import { BsChatLeftTextFill } from "react-icons/bs";
import { useAuth } from "@/components/auth/AuthProvider";

interface AdminMenu {
	id: string;
	href: string;
	title: string;
	description: string;
	icon: IconType;
}

const ADMIN_MENUS: AdminMenu[] = [
	{
		id: "profile",
		href: "/admin/edit/top-section",
		title: "トップセクション編集",
		description: "トップページの最上部の内容を編集",
		icon: BsChatLeftTextFill,
	},
	{
		id: "profile",
		href: "/admin/edit/profile",
		title: "プロフィール管理",
		description: "プロフィール情報の編集",
		icon: FaUser,
	},
	{
		id: "services",
		href: "/admin/edit/services",
		title: "サービス管理",
		description: "サービスとスキル情報の編集",
		icon: FaToolbox,
	},
	{
		id: "works",
		href: "/admin/edit/works",
		title: "作品集管理",
		description: "作品情報の追加・編集",
		icon: FaClipboard,
	},
];

export default function AdminPage() {
	// サーバーサイドで認証チェック
	const router = useRouter();
	const { user, loading } = useAuth();
	// 認証状態をチェック
	if (loading) {
		return (
			<AdminLayout>
				<div className="flex min-h-screen items-center justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
				</div>
			</AdminLayout>
		);
	}
	// 未認証の場合はログインページへリダイレクト
	if (!user) {
		router.replace("/admin/login");
		return null;
	}

	return (
		<AdminLayout>
			<div className="p-6 md:p-10">
				{" "}
				{/* マージンをパディングに変更 */}
				<h1 className="mb-8 text-2xl font-bold text-gray-800">管理画面</h1>
				<div className="grid grid-cols-1 gap-8">
					{ADMIN_MENUS.map((menu) => (
						<Link
							key={menu.id}
							href={menu.href}
							className="group rounded-xl border border-[#00a497]/10 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#00a497]/30"
						>
							<div className="flex items-center space-x-6">
								<div className="rounded-lg bg-[#00a497]/5 p-4 transition-colors group-hover:bg-[#00a497]/10">
									<menu.icon className="h-8 w-8 text-[#00a497]" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-[#00a497]">
										{menu.title}
									</h2>
									<p className="mt-1 text-gray-500">{menu.description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</AdminLayout>
	);
}

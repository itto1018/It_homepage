import { AdminLayout } from "@/components/layout/AdminLayout";
import { FaUser, FaClipboard } from "react-icons/fa";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminPage() {
  // サーバーサイドで認証チェック
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-800">管理画面</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Link
            href="/admin/edit/profile"
            className="group rounded-xl border border-[#00a497]/10 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#00a497]/30"
          >
            <div className="flex items-center space-x-6">
              <div className="rounded-lg bg-[#00a497]/5 p-4 transition-colors group-hover:bg-[#00a497]/10">
                <FaUser className="h-8 w-8 text-[#00a497]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-[#00a497]">
                  プロフィール管理
                </h2>
                <p className="mt-1 text-gray-500">プロフィール情報の編集</p>
              </div>
            </div>
          </Link>
          <Link
            href="/admin/edit/works"
            className="group rounded-xl border border-[#00a497]/10 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#00a497]/30"
          >
            <div className="flex items-center space-x-6">
              <div className="rounded-lg bg-[#00a497]/5 p-4 transition-colors group-hover:bg-[#00a497]/10">
                <FaClipboard className="h-8 w-8 text-[#00a497]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-[#00a497]">
                  作品集管理
                </h2>
                <p className="mt-1 text-gray-500">作品情報の追加・編集</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

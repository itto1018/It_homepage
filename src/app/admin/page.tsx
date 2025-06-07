import { AdminLayout } from "@/components/admin/AdminLayout";
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
            className="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-6">
              <div className="rounded-lg bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                <FaUser className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                  プロフィール管理
                </h2>
                <p className="mt-1 text-gray-500">プロフィール情報の編集</p>
              </div>
            </div>
          </Link>
          <Link
            href="/admin/edit/works"
            className="group rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-6">
              <div className="rounded-lg bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                <FaClipboard className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
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

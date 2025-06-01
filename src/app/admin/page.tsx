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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">管理画面</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/admin/edit/profile" className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FaUser className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">プロフィール管理</h2>
                <p className="text-gray-500 mt-1">プロフィール情報の編集</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/edit/works" className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FaClipboard className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">作品集管理</h2>
                <p className="text-gray-500 mt-1">作品情報の追加・編集</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

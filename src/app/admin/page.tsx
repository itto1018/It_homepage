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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    href="/admin/profile"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <FaUser className="h-8 w-8 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold">プロフィール管理</h2>
                      <p className="text-gray-600">プロフィール情報の編集</p>
                    </div>
                  </div>
                </Link>
                <Link 
                    href="/admin/works"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <FaClipboard className="h-8 w-8 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold">作品集管理</h2>
                      <p className="text-gray-600">作品情報の追加・編集</p>
                    </div>
                  </div>
                </Link>
            </div>
        </AdminLayout>
    );
}

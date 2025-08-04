import { TopSectionEditor } from "@/components/admin/TopSectionEditor";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { getTop } from "@/lib/firebase/store/top";

export default async function EditTopPage() {
	const top = await getTop();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<h1 className="mb-8 text-2xl font-bold bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
					トップページ管理
				</h1>
				<TopSectionEditor initialTop={top} />
			</div>
		</AdminLayout>
	);
}

import { CoverEditor } from "@/components/admin/CoverEditor";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { getTop } from "@/lib/firebase/store/top";

export default async function EditTopPage() {
	const top = await getTop();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<div className="admin-title-container">
					<h1 className="admin-title-text">トップページ管理</h1>
				</div>
				<CoverEditor initialTop={top} />
			</div>
		</AdminLayout>
	);
}

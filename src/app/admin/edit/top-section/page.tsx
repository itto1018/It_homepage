import { TopSectionEditor } from "@/components/admin/TopSectionEditor";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { getTopSection } from "@/lib/firebase/store/top-section";

export default async function TopSection() {
	const topSection = await getTopSection();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<h1 className="mb-8 text-2xl font-bold bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
					トップセクション編集
				</h1>
				<TopSectionEditor initialTopSection={topSection} />
			</div>
		</AdminLayout>
	);
}

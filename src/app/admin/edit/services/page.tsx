import { AdminLayout } from "@/components/layout/AdminLayout";
import { getServices, getSkills } from "@/lib/firebase/store/services";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

export default async function EditServicesPage() {
	// サービスとスキルを並行で取得
	const [services] = await Promise.all([getServices()]);
	const [skills] = await Promise.all([getSkills()]);

	return (
		<AdminLayout>
			<div className="mx-auto max-w-4xl p-6">
				<h1 className="mb-8 text-2xl font-bold bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
					サービス編集
				</h1>
				<ServicesEditor initialServices={services} initialSkills={skills} />
			</div>
		</AdminLayout>
	);
}

import { AdminLayout } from "@/components/layout/AdminLayout";
import { getServices, getSkills } from "@/lib/firebase/store/services";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

export default async function EditServicesPage() {
	// サービスとスキルを並行で取得
	const services = await getServices();
	const skills = await getSkills();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-4xl p-6">
				<div className="admin-title-container">
					<h1 className="admin-title-text">サービス編集</h1>
				</div>
				<ServicesEditor initialServices={services} initialSkills={skills} />
			</div>
		</AdminLayout>
	);
}

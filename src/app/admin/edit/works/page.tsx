import React from "react";
import { getWorks } from "@/lib/firebase/store/works";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { WorksEditor } from "@/components/admin/WorksEditor";

export default async function EditWorksPage() {
	const initialWorks = await getWorks();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<div className="admin-title-container">
					<h1 className="admin-title-text">作品集管理</h1>
				</div>
				<WorksEditor initialWorks={initialWorks} />
			</div>
		</AdminLayout>
	);
}

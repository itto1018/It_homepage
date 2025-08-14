import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { WorksEditor } from "@/components/admin/WorksEditor";

export default async function EditWorksPage() {
	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<div className="admin-title-container">
					<h1 className="admin-title-text">作品集管理</h1>
				</div>
				<WorksEditor initialWorks={null} />
			</div>
		</AdminLayout>
	);
}

import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { WorksEditor } from "@/components/admin/WorksEditor";

export default async function EditWorksPage() {
	return (
		<AdminLayout>
			<div className="mx-auto max-w-5xl p-6">
				<h1 className="mb-8 text-2xl font-bold bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
					作品集管理
				</h1>
				<WorksEditor initialWorks={null} />
			</div>
		</AdminLayout>
	);
}

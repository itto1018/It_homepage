import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { getProfile } from "@/lib/firebase/store/profile";

export default async function ProfilePage() {
	const profile = await getProfile();
	
  	return (
  	  <AdminLayout>
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-gray-800">
					プロフィール編集
				</h1>
				<ProfileEditor initialProfile={profile} />
			</div>
		</AdminLayout>
  	);
}
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { getProfile, getProfileLink } from "@/lib/firebase/store/profile";
import { ProfileLinkEditor } from "@/components/admin/ProfileLinkEditor";

export default async function ProfilePage() {
	const profile = await getProfile();
	const profileLinks = await getProfileLink();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-gray-800">
					プロフィール編集
				</h1>
				<ProfileEditor initialProfile={profile} />
				<ProfileLinkEditor initialProfileLink={profileLinks} />
			</div>
		</AdminLayout>
	);
}

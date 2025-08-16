import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProfileEditor } from "@/components/admin/ProfileEditor";
import { getProfile, getProfileSocialLink } from "@/lib/firebase/store/profile";
import { ProfileLinkEditor } from "@/components/admin/ProfileLinkEditor";

export default async function ProfilePage() {
	const profile = await getProfile();
	const profileLinks = await getProfileSocialLink();

	return (
		<AdminLayout>
			<div className="mx-auto max-w-3xl mb-16">
				<div className="admin-title-container">
					<h1 className="admin-title-text">プロフィール編集</h1>
				</div>
				<ProfileEditor initialProfile={profile} />
			</div>
			<div className="mx-auto max-w-3xl">
				<div className="admin-title-container">
					<h1 className="admin-title-text">プロフィールリンク編集</h1>
				</div>
				<ProfileLinkEditor initialProfileLink={profileLinks} />
			</div>
		</AdminLayout>
	);
}

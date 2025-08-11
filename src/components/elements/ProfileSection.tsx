"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile, getProfileLink } from "@/lib/firebase/store/profile";
import SocialLinkIcon from "@/components/elements/SocialLinkIcon";
import type { Profile, ProfileLink } from "@/types/profile";
import Loading from "@/components/elements/Loading";

export const ProfileSection = () => {
	const [isLoading, setIsLoading] = useState(true);

	// プロフィールの状態
	const [profile, setProfile] = useState<Profile | null>(null);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfile();
				setProfile(data);
			} catch (error) {
				console.error("プロフィール取得エラー:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProfile();
	}, []);

	// プロフィールリンクの状態
	const [profileLink, setProfileLink] = useState<ProfileLink | null>(null);
	useEffect(() => {
		const fetchProfileLink = async () => {
			try {
				const data = await getProfileLink();
				setProfileLink(data);
			} catch (error) {
				console.error("プロフィールリンク取得エラー:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProfileLink();
	}, []);

	// ローディング中の表示
	if (isLoading) {
		return (
			<Loading />
		);
	}

	return (
		<div
			id="profile-section"
			className="w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#e5f4f3] p-6 sm:p-8 lg:p-10 shadow-lg transition-shadow duration-300"
		>
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
				<div className="flex-1 flex flex-col gap-8">
					<div className="flex items-center justify-center">
						<div className="relative h-36 w-36 sm:h-48 sm:w-48 lg:h-64 lg:w-64 group">
							<Image
								src={profile?.imageUrl || "/images/profile.jpg"}
								alt="Profile Image"
								fill
								sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 256px"
								className="rounded-full object-cover shadow-lg ring-4 ring-[#00a497]/10 transition-transform duration-300"
								priority
							/>
						</div>
					</div>
					<div className="text-center">
						<h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl mb-2">
							{profile?.nickname || ""}
						</h3>
						<p className="text-sm text-gray-600 sm:text-base lg:text-lg">
							{profile?.name || ""}
						</p>
					</div>
					<div className="mx-auto max-w-2xl lg:mx-0">
						<p className="text-sm text-gray-600 sm:text-base lg:text-lg leading-relaxed">
							{profile?.bio || ""}
						</p>
					</div>
					<div className="my-4 w-full sm:my-0 sm:w-auto">
						<div className="flex flex-wrap justify-center gap-2">
							<div className="flex gap-2">
								<SocialLinkIcon
									type="Twitter"
									url={profileLink?.twitter || ""}
								/>
								<SocialLinkIcon type="GitHub" url={profileLink?.github || ""} />
								<SocialLinkIcon
									type="Wantedly"
									url={profileLink?.wantedly || ""}
								/>
							</div>
							<div className="flex gap-2">
								<SocialLinkIcon type="Zenn" url={profileLink?.zenn || ""} />
								<SocialLinkIcon type="Mail" url={profileLink?.mail || ""} />
							</div>
						</div>
					</div>
				</div>
				<div className="lg:w-1/2 lg:border-l lg:border-[#00a497]/10 lg:pl-8">
					<h4 className="text-lg font-semibold text-gray-800 sm:text-xl lg:text-2xl mb-4 text-center lg:text-left">
						経歴
					</h4>
					<div className="space-y-4">
						{profile?.careers?.map((career, index) => (
							<div
								key={index}
								className={`rounded-lg p-4 transition-all duration-300 border 
									${
										career.period.includes("現在")
											? "bg-[#00a497]/10 border-[#00a497]/20 animate-pulse-subtle shadow-lg"
											: "bg-[#00a497]/5 border-[#00a497]/10"
									}`}
							>
								<p
									className={`text-sm font-bold sm:text-base mb-1 transition-colors duration-300
									${
										career.period.includes("現在")
											? "text-[#00a497] animate-bounce-subtle"
											: "text-gray-600"
									}`}
								>
									{career.period}
								</p>
								<p className="text-sm text-gray-600 sm:text-base">
									{career.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSection;

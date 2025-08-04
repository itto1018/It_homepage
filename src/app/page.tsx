import TopSection from "@/components/elements/TopSection";
import ProfileSection from "@/components/elements/ProfileSection";
import ServiceSection from "@/components/elements/ServiceSection";
import WorksSection from "@/components/elements/WorksSection";

export default function Home() {
	return (
		<>
			<main className="w-full">
				{/* トップセクション */}
				<div className="absolute w-full inset-0 bg-gradient-to-br from-[#00a497]/5 to-transparent" />
				<div className="relative w-full min-h-[50vh] md:min-h-[75vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden">
					<TopSection />
				</div>

				{/* コンテンツセクション */}
				<div className="w-4/5 mx-auto px-5 py-10 lg:px-10 lg:py-15">
					<div className="flex flex-col items-center gap-2 lg:gap-7">
						{/* Profile */}
						<div
							id="profile-title"
							className="flex flex-col items-center my-4 scroll-mt-header"
						>
							<h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
								Profile
							</h2>
						</div>
						<div className="mb-12 w-full md:mb-15">
							<ProfileSection />
						</div>

						{/* Services */}
						<div
							id="services-title"
							className="flex flex-col items-center my-4 scroll-mt-header"
						>
							<h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
								Services
							</h2>
						</div>
						<div className="mb-12 w-full md:mb-15">
							<ServiceSection initialServices={[]} initialSkills={[]} />
						</div>

						{/* Works */}
						<div
							id="works-title"
							className="flex flex-col items-center my-4 scroll-mt-header"
						>
							<h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
								Works
							</h2>
						</div>
						<div className="mb-12 w-full md:mb-15">
							<WorksSection />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

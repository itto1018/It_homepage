import Cover from "@/components/elements/TopSection";
import ProfileSection from "@/components/elements/ProfileSection";
import ServiceSection from "@/components/elements/ServiceSection";
import WorksSection from "@/components/elements/WorksSection";

export default function Home() {
	return (
		<>
			<main className="w-full">
				<div id="cover">
					<div className="absolute w-full inset-0 bg-gradient-to-br from-[#00a497]/5 to-transparent" />
					<Cover />
				</div>
				<div id="contents" className="lp-contents-container">
					<div className="flex flex-col items-center gap-2 lg:gap-7">
						{/* Profile */}
						<div id="profile-title" className="lp-title-container">
							<h1 className="title-h1">Profile</h1>
						</div>
						<div className="lp-section-container">
							<ProfileSection />
						</div>

						{/* Services */}
						<div id="services-title" className="lp-title-container">
							<h1 className="title-h1">Services</h1>
						</div>
						<div className="lp-section-container">
							<ServiceSection />
						</div>

						{/* Works */}
						<div id="works-title" className="lp-title-container">
							<h1 className="title-h1">Works</h1>
						</div>
						<div className="lp-section-container">
							<WorksSection />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

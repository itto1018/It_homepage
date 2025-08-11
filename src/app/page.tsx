import TopSection from "@/components/elements/TopSection";
import ProfileSection from "@/components/elements/ProfileSection";
import ServiceSection from "@/components/elements/ServiceSection";
import WorksSection from "@/components/elements/WorksSection";

export default function Home() {
	return (
		<>
			<main className="w-full">
				{/* トップセクション */}
				<div id="top-section">
					<div className="absolute w-full inset-0 bg-gradient-to-br from-[#00a497]/5 to-transparent" />
					<div className="relative w-full min-h-[50vh] md:min-h-[75vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden">
						<TopSection />
					</div>
				</div>

                {/* コンテンツセクション */}
                <div className="container-section">
                    <div className="flex flex-col items-center gap-2 lg:gap-7">
                        {/* Profile */}
                        <div id="profile-title" className="section-title">
                            <h2 className="heading-gradient">Profile</h2>
                        </div>
                        <div className="section-content">
                            <ProfileSection />
                        </div>

                        {/* Services */}
                        <div id="services-title" className="section-title">
                            <h2 className="heading-gradient">Services</h2>
                        </div>
                        <div className="section-content">
                            <ServiceSection initialServices={[]} initialSkills={[]} />
                        </div>

                        {/* Works */}
                        <div id="works-title" className="section-title">
                            <h2 className="heading-gradient">Works</h2>
                        </div>
                        <div className="section-content">
                            <WorksSection />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

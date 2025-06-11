import SocialLinkIcon from "@/components/elements/SocialLinkIcon";
import ProfileSection from "@/components/elements/ProfileSection";
import ServiceSection from "@/components/elements/ServiceSection";
import WorksSection from "@/components/elements/WorksSection";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main className="w-full">
				{/* Hero Section */}
				<div className="relative w-full min-h-[50vh] md:min-h-[75vh] lg:min-h-[100vh] flex items-center justify-center overflow-hidden">
					<div className="absolute w-full inset-0 bg-gradient-to-br from-[#00a497]/5 to-transparent" />
					<div className="relative z-10 flex flex-col items-center text-center px-5">
						<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5">
							<span className="bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
								Welcome to
							</span>
							<br />
							<span className="mt-2 inline-block">It.dev</span>
						</h1>
						<div className="w-4/5 mt-8 relative">
							<div className="absolute -inset-1 bg-gradient-to-r from-[#00a497] to-[#45b7af] rounded-lg blur opacity-20"></div>
							<article className="relative bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 text-gray-600 text-sm md:text-base lg:text-xl">
								普段はデータエンジニアとして働きつつ、Webアプリケーション開発やデータサイエンスに興味のある{" "}
								<span className="text-[#00a497] font-medium">It（イット）</span>{" "}
								です。
							</article>
						</div>
					</div>
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
							<ServiceSection />
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

						{/* Contact */}
						<div
							id="contact-title"
							className="flex flex-col items-center my-4 scroll-mt-header"
						>
							<h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
								Contact
							</h2>
						</div>
						<div className="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-between">
							<p className="text-center text-sm text-gray-600 lg:text-xl">
								ご相談等はこちらからお願いします！
								<br />
							</p>
							<div className="my-4 flex w-full justify-center gap-4 sm:my-0 sm:w-auto">
								<SocialLinkIcon type="X" url={"https://x.com/itto1018"} />
								<SocialLinkIcon
									type="Wantedly"
									url={"https://www.wantedly.com/id/Itto_Okmr"}
								/>
								<SocialLinkIcon
									type="Mail"
									url={"mailto:itto.mura@gmail.com"}
								/>
								<SocialLinkIcon
									type="LinkedIn"
									url={
										"https://www.linkedin.com/in/%E4%B8%80%E5%A4%A7-%E5%A5%A5%E6%9D%91-8ba11225b/"
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

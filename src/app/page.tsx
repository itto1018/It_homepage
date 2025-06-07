import SocialLinkIcon from "@/components/SocialLinkIcon";
import { ProfileSection } from "@/components/ProfileSection";
import ServiceSection from "@/components/ServiceSection";

export default function Home() {
  return (
    <>
      <main className="pt-16 max-w-full justify-items-center gap-5 px-5 py-10 font-[family-name:var(--font-geist-sans)] lg:gap-10 lg:px-10 lg:py-15">
        <div className="row-start-2 flex w-4/5 flex-col items-start gap-2 lg:gap-7">
          {/* top */}
          <div className="flex flex-col gap-5 py-5 lg:px-5 lg:py-10">
            <div className="mb-2 text-start text-5xl font-bold sm:text-6xl md:text-7xl lg:mb-4 lg:text-8xl">
              <h1 className="pb-2 sm:pb-3 lg:pb-4">Welcome to</h1>
              <h1>It Page</h1>
            </div>
            <article className="text-xs text-gray-600 md:text-base lg:text-2xl">
              <p>データ分析やWeb開発を中心に活動しているIt（イット）です。</p>
            </article>
          </div>

          {/* Profile */}
          <div id="profile-title" className="flex flex-col items-start my-4 scroll-mt-header">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
              Profile
            </h2>
          </div>
          <div className="mb-12 flex w-full flex-col items-start md:mb-15">
            <ProfileSection />
          </div>

          {/* Services */}
          <div id="services-title" className="flex w-full flex-col items-start my-4 scroll-mt-header">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
              Services
            </h2>
          </div>
          <div className="mb-12 flex w-full flex-col items-start md:mb-15">
            <ServiceSection />
          </div>

          {/* Contact */}
          <div id="contact-title" className="flex w-full flex-col items-start my-4 scroll-mt-header">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#00a497] to-[#45b7af] bg-clip-text text-transparent">
              Contact
            </h2>
          </div>
          <div className="flex w-full flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600 lg:text-xl">
              ご相談等はこちらからお願いします！
              <br />
            </p>
            <div className="my-4 flex w-full justify-between gap-4 sm:my-0 sm:w-auto sm:justify-start">
              <SocialLinkIcon type="X" url={"https://x.com/itto1018"} />
              <SocialLinkIcon
                type="Wantedly"
                url={"https://www.wantedly.com/id/Itto_Okmr"}
              />
              <SocialLinkIcon type="Mail" url={"mailto:itto.mura@gmail.com"} />
              <SocialLinkIcon
                type="LinkedIn"
                url={
                  "https://www.linkedin.com/in/%E4%B8%80%E5%A4%A7-%E5%A5%A5%E6%9D%91-8ba11225b/"
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

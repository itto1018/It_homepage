import Image from "next/image";
import ServiceModalCard from "@/components/ServiceModalCard";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import MenuLinkCard from "@/components/MenuLinkCard";

export default function Home() {
  return (
    <div className="justify-items-center gap-5 px-5 py-5 font-[family-name:var(--font-geist-sans)] lg:gap-10 lg:px-30 lg:py-10">
      <main className="row-start-2 flex flex-col gap-2 items-start lg:gap-7">
        {/* top */}
        <div className="flex flex-col gap-5 px-0 py-5 lg:py-10 lg:px-5">
          <div className="mb-2 text-5xl font-bold text-start lg:mb-4 lg:text-8xl">
            <h1 className="pb-2 lg:pb-4">Welcome to</h1>
            <h1>It Page</h1>
          </div>
          <article className="text-xs text-gray-600 lg:text-2xl">
            <p>
              データ分析やWeb開発を行っているItのポートフォリオサイトです。
              <br />
              ご依頼・ご相談はお気軽にご連絡ください。
            </p>
          </article>
        </div>
        {/* Menu */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold lg:text-5xl">Menu</h2>
        </div>
        <div className="my-5 flex w-full flex-col gap-8 md:gap-10">
          <MenuLinkCard title="Profile" discript="Itのプロフィール" url="/" />
          <MenuLinkCard title="Works" discript="これまでに作成した作品集" url="/" />
        </div>
        {/* Services */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold lg:text-5xl">Services</h2>
        </div>
        <div className="my-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-between gap-5">
          <ServiceModalCard title="データ基盤構築" discript="DBの基盤構築, SQLクエリの作成" />
          <ServiceModalCard title="Webサイト開発" discript="Next.jsを用いたフロントエンド開発" />
          <ServiceModalCard title="データ分析" discript="PythonやRを用いた統計分析" />
          <ServiceModalCard
            title="ダッシュボード開発"
            discript="Tableauを用いたダッシュボード開発"
          />
        </div>
        {/* Contact */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold lg:text-5xl">Contact</h2>
        </div>
        <div className="flex w-full flex-col items-start lg:flex-row lg:justify-between lg:items-center">
          <div className="pb-5 lg:pb-0">
            <p className="text-sm font-bold text-gray-600 lg:text-xl">
              ご依頼・ご相談はこちらからお願いします
            </p>
          </div>
          <div className="flex my-5 w-full gap-4 lg:w-auto lg:gap-6">
            <SocialLinkIcon type="X" url={"https://x.com/itto1018"} />
            <SocialLinkIcon type="Wantedly" url={"https://www.wantedly.com/id/Itto_Okmr"} />
            <SocialLinkIcon type="Mail" url={"mailto:itto.mura@gmail.com"} />
            <SocialLinkIcon
              type="LinkedIn"
              url={"https://www.linkedin.com/in/%E4%B8%80%E5%A4%A7-%E5%A5%A5%E6%9D%91-8ba11225b/"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

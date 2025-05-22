import Image from "next/image";
import ServiceModalCard from "@/components/ServiceModalCard";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import MenuLinkCard from "@/components/MenuLinkCard";

export default function Home() {
  return (
    <div className="justify-items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        {/* top */}
        <div className="my-10 px-30 flex w-full flex-col gap-[20px]">
          <div className="mb-4 text-8xl font-bold">
            <h1 className="pb-4 text-start">Welcome to</h1>
            <h1 className="text-end">It Page</h1>
          </div>
          <article className="text-2xl text-gray-600">
            <p>
              データ分析やWeb開発を行っているItのポートフォリオサイトです。
              <br />
              ご依頼・ご相談はお気軽にご連絡ください。
            </p>
          </article>
        </div>
        {/* Menu */}
        <div className="w-full">
          <div className="flex flex-col items-start my-10">
            <h2 className="text-6xl font-bold">Menu</h2>
          </div>
          <div className="my-5 flex w-full flex-col gap-5">
            <MenuLinkCard title="Profile" discript="Itのプロフィール" url="/" />
            <MenuLinkCard title="Link" discript="ブログ・SNSのリンク" url="/" />
            <MenuLinkCard title="Works" discript="開発物" url="/" />
          </div>
        </div>
        {/* Services */}
        <div className="flex flex-col items-start">
          <h2 className="text-5xl font-bold">Services</h2>
        </div>
        <div className="my-4 flex gap-10">
          <ServiceModalCard
            title="データ基盤構築"
            discript="DWHの基盤構築・SQLクエリの作成"
          />
          <ServiceModalCard
            title="Webサイト開発"
            discript="Next.jsを用いたフロントエンド開発"
          />
          <ServiceModalCard
            title="データ分析"
            discript="PythonやRを用いた統計分析"
          />
          <ServiceModalCard
            title="ダッシュボード開発"
            discript="Tableauを用いたダッシュボードの作成や改善支援"
          />
        </div>
        {/* Contact */}
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-bold">Contact</h2>
        </div>
        <div className="flex w-full gap-10">
          <div className="flex w-3/5 items-center">
            <p className="text-xl font-bold">
              ご依頼・ご相談はこちらからお願いします
            </p>
          </div>
          <div className="my-4 flex gap-10">
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
      </main>
    </div>
  );
}

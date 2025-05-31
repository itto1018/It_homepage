import Image from "next/image";
import SocialLinkIcon from "@/components/SocialLinkIcon";
import MenuLinkCard from "@/components/MenuLinkCard";
import { FaDatabase, FaLaptopCode, FaHtml5, FaCss3Alt, FaPython, FaNodeJs, FaAws } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";
import { ServiceCard } from "@/components/ServiceCard";
import { SiPostgresql, SiSnowflake, SiAmazonredshift, SiDbt, SiNextdotjs } from "react-icons/si";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";

export default function Home() {
  return (
    <div className="justify-items-center max-w-full gap-5 px-5 py-10 font-[family-name:var(--font-geist-sans)] lg:gap-10 lg:px-10 lg:py-15">
      <main className="w-4/5 row-start-2 flex flex-col gap-2 items-start lg:gap-7">
        {/* top */}
        <div className="flex flex-col gap-5 py-5 lg:py-10 lg:px-5">
          <div className="mb-2 text-5xl sm:text-6xl md:text-7xl font-bold text-start lg:mb-4 lg:text-8xl">
            <h1 className="pb-2 sm:pb-3 lg:pb-4">Welcome to</h1>
            <h1>It Page</h1>
          </div>
          <article className="text-xs md:text-base text-gray-600 lg:text-2xl">
            <p>データ分析やWeb開発を中心に活動しているIt（イット）です。</p>
          </article>
        </div>
        {/* Menu */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Menu</h2>
        </div>
        <div className="pb-2">
          <p className="text-sm text-gray-600 lg:text-xl">ご依頼・ご相談はこちらからお願いします</p>
        </div>
        <div className="mb-12 md:mb-15 flex w-full flex-col gap-4 md:gap-6">
          <MenuLinkCard title="Profile" discript="Itのプロフィール" url="/" />
          <MenuLinkCard title="Works" discript="これまでに作成した作品集" url="/" />
        </div>
        {/* Services */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl font-bold lg:text-5xl">Services</h2>
        </div>
        <div className="mb-12 md:mb-15 w-full grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <ServiceCard title="データ基盤構築" Icon={FaDatabase} items={["データ基盤設計", "SQLクエリ最適化", "データパイプライン構築"]} />
          <ServiceCard title="Webサイト開発" Icon={FaLaptopCode} items={["要件定義", "開発・テスト", "運用・保守"]} />
          <ServiceCard title="データ分析・可視化" Icon={IoAnalyticsSharp} items={["要件定義", "ダッシュボード開発", "統計分析・機械学習"]} />
        </div>
        {/* Contact */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Contact</h2>
        </div>
        <div className="flex w-full flex-col items-start sm:flex-row sm:justify-between sm:items-center">
          <p className="text-sm text-gray-600 lg:text-xl">
            ご相談等はこちらからお願いします！
            <br />
          </p>
          <div className="flex my-4 sm:my-0 w-full gap-4 sm:w-auto justify-between sm:justify-start">
            <SocialLinkIcon type="X" url={"https://x.com/itto1018"} />
            <SocialLinkIcon type="Wantedly" url={"https://www.wantedly.com/id/Itto_Okmr"} />
            <SocialLinkIcon type="Mail" url={"mailto:itto.mura@gmail.com"} />
            <SocialLinkIcon type="LinkedIn" url={"https://www.linkedin.com/in/%E4%B8%80%E5%A4%A7-%E5%A5%A5%E6%9D%91-8ba11225b/"} />
          </div>
        </div>
      </main>
    </div>
  );
}

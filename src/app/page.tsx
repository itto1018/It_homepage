import Image from "next/image";
import { Card } from "@/components/Card";
import LinkCard from "@/components/LinkCard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* top */}
        <div className="flex flex-col gap-[20px] w-full my-10">
          <div className="text-8xl font-bold mb-4">
            <h1 className="text-start pb-4">
              Welcome to
            </h1>
            <h2 className="text-end">
              It Page
            </h2>
          </div>
          <article className="text-2xl text-gray-600">It（イット）のポートフォリオサイトです</article>
        </div>
        {/* Menu */}
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-bold">Menu</h2>
        </div>
        <div className="flex flex-col my-4 gap-10 w-full">
          <LinkCard title = "Profile" discript="Itのプロフィール" />
          <LinkCard title = "Link" discript="ブログ・SNSのリンク" />
          <LinkCard title = "Works" discript="開発物" />
        </div>
        {/* Services */}
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-bold">Services</h2>
        </div>
        <div className="flex my-4 gap-10">
          <title>Services</title>
          <Card title = "ダッシュボード開発" discript="Tableauを用いたダッシュボードの作成や改善支援" />
          <Card title = "データ分析" discript="PythonやRを用いた統計分析" />
          <Card title = "Webページ作成" discript="スクリプト言語を用いたフロントエンド開発" />
        </div>
        <div>
          <title>Skill Set</title>
          <ul>
            <li>統計検定2級</li>
            <li>Tableau DATASaber</li>
            <li>基本情報技術者試験</li>
          </ul>
        </div>
        <div>
          <title>Contact</title>
          <a href="">Twitter</a>
          <a href="">GitHub</a>
          <a href="">LinkedIn</a>
          <a href="">Wantedly</a>
        </div>
      </main>
    </div>
  );
}
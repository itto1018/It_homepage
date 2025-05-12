import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-[16px] items-center">
          <h2 className="text-[20px] font-bold">Welcome to the It Page</h2>
          <article className="text-[16px] text-gray-600">This is a simple page layout using Tailwind CSS.</article>
        </div>
        <div className="flex ">
          <section>
            <a href="">profile</a>
          </section>
          <section>
            <a href="">Media</a>
          </section>
          <section>
            <a href="">Works</a>
          </section>
        </div>
        <div>
          <title>Services</title>
          <a href="">ダッシュボード作成・支援</a>
          <a href="">データ分析</a>
          <a href="">Webページ作成</a>
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
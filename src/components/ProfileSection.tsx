import Image from "next/image";
import { FaGithub, FaCode, FaChartLine, FaDatabase } from "react-icons/fa";

export const ProfileSection = () => {
  return (
    <div id="profile-section" className="w-full">
      <div id="profile-title" className="flex flex-col items-start mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold lg:text-5xl">Profile</h2>
      </div>
      <div id="profile-detail" className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-lg shadow-lg border border-gray-100">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div id="profile-image" className="flex items-center justify-center">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
              <Image src="/images/profile.jpg" alt="Profile Image" fill className="rounded-full object-cover shadow-lg" priority />
            </div>
          </div>
          <div id="profile-content" className="flex-1 space-y-6">
            <div>
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">It</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">Itto Okumura / 奥村 一大</p>
              </div>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm lg:text-base text-gray-600">データ分析・Web開発を中心に活動しているフリーランスエンジニアです。</p>
                <div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">経歴</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base font-medium">2020 - 2024</p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">大学では経済学部で統計学を専攻。統計分析やPython, Rを用いたデータ分析を行い、論文大会で入賞。</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm lg:text-base font-medium">2023 - 現在</p>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">事業会社でデータ分析基盤の構築やBIツールを用いたダッシュボード開発を担当。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

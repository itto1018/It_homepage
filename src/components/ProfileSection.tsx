import Image from "next/image";
import { FaGithub, FaCode, FaChartLine, FaDatabase } from "react-icons/fa";

export const ProfileSection = () => {
  return (
    <div id="profile-section" className="w-full">
      <div id="profile-title" className="mb-6 flex flex-col items-start">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Profile</h2>
      </div>
      <div
        id="profile-detail"
        className="rounded-lg border border-gray-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg"
      >
        <div className="flex flex-col gap-6 lg:gap-8">
          <div id="profile-image" className="flex items-center justify-center">
            <div className="relative h-32 w-32 sm:h-48 sm:w-48 lg:h-64 lg:w-64">
              <Image
                src="/images/profile.jpg"
                alt="Profile Image"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>
          </div>
          <div id="profile-content" className="flex-1 space-y-6">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                  It
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                  Itto Okumura / 奥村 一大
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                  データ分析・Web開発を中心に活動しているフリーランスエンジニアです。
                </p>
                <div>
                  <h4 className="mb-2 text-sm font-semibold sm:text-base lg:text-lg">
                    経歴
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium sm:text-sm lg:text-base">
                        2020 - 2024
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                        大学では経済学部で統計学を専攻。統計分析やPython,
                        Rを用いたデータ分析を行い、論文大会で入賞。
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium sm:text-sm lg:text-base">
                        2023 - 現在
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                        事業会社でデータ分析基盤の構築やBIツールを用いたダッシュボード開発を担当。
                      </p>
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

"use client";

import Image from "next/image";
import { FaGithub, FaCode, FaChartLine, FaDatabase } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getPublicProfile } from "@/lib/firebase/profile";
import type { Profile } from "@/types/profile";

export const ProfileSection = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getPublicProfile();
        setProfile(data);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div id="profile-section" className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#e5f4f3] p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* プロフィール画像部分 */}
            <div className="flex items-center justify-center">
              <div className="relative h-36 w-36 sm:h-48 sm:w-48 lg:h-64 lg:w-64 group">
                <Image
                  src={profile?.imageUrl || "/images/profile.jpg"}
                  alt="Profile Image"
                  fill
                  sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 256px"
                  className="rounded-full object-cover shadow-lg ring-4 ring-[#00a497]/10 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* プロフィール情報部分 */}
            <div className="flex-1 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl mb-2">
                  {profile?.nickname || ""}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
                  {profile?.name || ""}
                </p>
              </div>

              {/* 自己紹介文 */}
              <div className="mx-auto max-w-2xl">
                <p className="text-sm text-gray-600 sm:text-base lg:text-lg leading-relaxed">
                  {profile?.bio || ""}
                </p>
              </div>

              {/* 経歴セクション */}
              <div className="max-w-3xl mx-auto">
                <h4 className="text-lg font-semibold text-[#00a497] sm:text-xl lg:text-2xl mb-4 text-center">
                  経歴
                </h4>
                <div className="space-y-4">
                  {profile?.careers?.map((career, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-[#00a497]/5 p-4 hover:bg-[#00a497]/10 transition-colors duration-200 border border-[#00a497]/10"
                    >
                      <p className="text-sm font-medium text-[#00a497] sm:text-base mb-1">
                        {career.period}
                      </p>
                      <p className="text-sm text-gray-600 sm:text-base">
                        {career.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

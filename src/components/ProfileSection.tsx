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
      <div id="profile-title" className="mb-6 flex flex-col items-start">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Profile</h2>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex items-center justify-center">
            <div className="relative h-32 w-32 sm:h-48 sm:w-48 lg:h-64 lg:w-64">
              <Image
                src={profile?.imageUrl || "/images/profile.jpg"}
                alt="Profile Image"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                  {profile?.nickname || ""}
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                  {profile?.name || ""}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                  {profile?.bio || ""}
                </p>
                <div>
                  <h4 className="mb-2 text-sm font-semibold sm:text-base lg:text-lg">
                    経歴
                  </h4>
                  <div className="space-y-2">
                    {profile?.careers?.map((career, index) => (
                      <div key={index}>
                        <p className="text-xs font-medium sm:text-sm lg:text-base">
                          {career.period}
                        </p>
                        <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
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
    </div>
  );
};

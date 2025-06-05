"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { PROFILE_CONSTRAINTS } from "@/types/profile";
import { getProfile } from "@/lib/firebase/profile";
import { uploadProfileImage } from "@/lib/storage/uploadImage";
import { useRouter } from "next/navigation"; // 追加

interface Career {
  period: string;
  description: string;
}

// バリデーション用の型
interface ValidationError {
  field: string;
  message: string;
}

// バリデーション関数
const validateProfile = (data: { name: string; nickname: string; bio: string; careers: Career[] }): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 名前の検証
  if (!data.name.trim()) {
    errors.push({ field: "name", message: "名前は必須項目です" });
  } else if (data.name.length > PROFILE_CONSTRAINTS.name.maxLength) {
    errors.push({
      field: "name",
      message: `名前は${PROFILE_CONSTRAINTS.name.maxLength}文字以内で入力してください`,
    });
  }

  // ニックネームの検証
  if (!data.nickname.trim()) {
    errors.push({ field: "nickname", message: "ニックネームは必須項目です" });
  } else if (data.nickname.length > PROFILE_CONSTRAINTS.nickname.maxLength) {
    errors.push({
      field: "nickname",
      message: `ニックネームは${PROFILE_CONSTRAINTS.nickname.maxLength}文字以内で入力してください`,
    });
  }

  // 自己紹介の検証
  if (data.bio && data.bio.length > PROFILE_CONSTRAINTS.bio.maxLength) {
    errors.push({
      field: "bio",
      message: `自己紹介は${PROFILE_CONSTRAINTS.bio.maxLength}文字以内で入力してください`,
    });
  }

  return errors;
};

export default function ProfilePage() {
  const router = useRouter(); // 追加
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profiles = await getProfile();
        if (profiles && profiles.length > 0) {
          const profile = profiles[0]; // 最初のプロフィールを使用
          setName(profile.name || "");
          setNickname(profile.nickname || "");
          setBio(profile.bio || "");
          setImageUrl(profile.imageUrl || null);
          setCareers(profile.careers || []);
        }
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
        toast.error("プロフィールの取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAddCareer = () => {
    setCareers([...careers, { period: "", description: "" }]);
  };

  const handleRemoveCareer = (index: number) => {
    setCareers(careers.filter((_, i) => i !== index));
  };

  const handleCareerChange = (index: number, field: keyof Career, value: string) => {
    const newCareers = [...careers];
    newCareers[index] = { ...newCareers[index], [field]: value };
    setCareers(newCareers);
  };
  
    // 画像アップロードのハンドラー
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setImageFile(file);
    
    try {
      setIsLoading(true);
      // 画像をアップロード（Firebase Storageを使用）
      const uploadedUrl = await uploadProfileImage(file);
      setImageUrl(uploadedUrl);
      toast.success("画像をアップロードしました");
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      toast.error('画像のアップロードに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validationErrors = validateProfile({
        name,
        nickname,
        bio,
        careers,
      });

      if (validationErrors.length > 0) {
        validationErrors.forEach(error => toast.error(error.message));
        return;
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nickname,
          bio,
          careers,
          imageUrl, // 既にアップロード済みの画像URLを使用
        }),
      });

      if (!response.ok) {
        throw new Error("保存に失敗しました");
      }

      toast.success("プロフィールを保存しました");
      // 保存成功後、1秒待ってから管理者メニューに遷移
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* パンくずリスト */}
        <nav className="mb-6 flex items-center text-sm text-gray-500">
          <Link href="/admin" className="hover:text-gray-700">
            管理画面
          </Link>
          <HiChevronRight className="mx-2" />
          <span className="text-gray-900">プロフィール編集</span>
        </nav>

        <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">プロフィール編集</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div id="profile-image" className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-md">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="プロフィール画像"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-50" />
                  )}
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profile-image-upload" />
                  <label
                    htmlFor="profile-image-upload"
                    className="inline-flex items-center mr-4 px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    画像を選択
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
      ニックネーム
    </label>
    <input
      type="text"
      id="nickname"
      value={nickname}
      onChange={e => setNickname(e.target.value)}
      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors p-4"
      placeholder="ニックネームを入力"
      required
      maxLength={PROFILE_CONSTRAINTS.nickname.maxLength}
    />
  </div>

  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
      名前
    </label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={e => setName(e.target.value)}
      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors p-4"
      placeholder="名前を入力"
      required
      maxLength={PROFILE_CONSTRAINTS.name.maxLength}
    />
  </div>

  <div>
    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
      自己紹介
    </label>
    <textarea
      id="bio"
      value={bio}
      onChange={e => setBio(e.target.value)}
      rows={4}
      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors p-4"
      placeholder="自己紹介を入力"
    />
  </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">経歴</label>
                <div className="space-y-4">
                  {careers.map((career, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex gap-4 items-start">
                        <div className="w-1/3">
                          <input
                            type="text"
                            id={`career-period-${index}`}
                            placeholder="2020 - 2024"
                            value={career.period}
                            onChange={e => handleCareerChange(index, "period", e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            id={`career-description-${index}`}
                            placeholder="経歴の詳細（50文字以内）"
                            value={career.description}
                            onChange={e => handleCareerChange(index, "description", e.target.value)}
                            maxLength={50}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
                          />
                          <div className="mt-1 text-sm text-gray-500 text-right">{career.description.length}/50</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCareer(index)}
                          className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="削除"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddCareer}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    経歴を追加
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/admin"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  キャンセル
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "保存中..." : "保存する"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

"use client";

import Loading from "@/components/elements/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Service } from "@/types/services";
import { Skill } from "@/types/services";
import { auth } from "@/lib/auth/firebase";
import Link from "next/link";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Props {
	initialServices: Service[];
	initialSkills: Skill[];
	deletedSkillIds?: string[];
}

export const ServicesEditor = ({ initialServices, initialSkills }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	// サービスの状態取得（Read)
	const [services, setServices] = useState<Service[]>(initialServices);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				if (initialServices) {
					setServices(initialServices);
				}
			} catch (error) {
				console.error("サービス情報取得エラー:", error);
				toast.error("サービス情報の取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchServices();
	}, [initialServices]);

	// サービスの状態更新
	const handleServiceChange = (
		serviceId: string,
		field: "title" | "items",
		value: string | string[]
	) => {
		setServices(
			services.map((service) => {
				if (service.id !== serviceId) return service;
				return {
					...service,
					[field]: value,
				};
			})
		);
	};

	// スキルの状態取得（Read）
	const [skills, setSkills] = useState<Skill[]>(initialSkills);
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				if (initialSkills) {
					setSkills(initialSkills);
				}
			} catch (error) {
				console.error("スキル情報取得エラー:", error);
				toast.error("スキル情報の取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchSkills();
	}, [initialSkills]);

	// スキルの状態更新
	const handleSkillChange = (
		serviceId: string,
		skillId: string,
		field: "name" | "level" | "description",
		value: string | number
	) => {
		setSkills((prevSkills) =>
			prevSkills.map((skill) => {
				if (skill.skillId !== skillId) return skill;
				return {
					...skill,
					serviceId: serviceId,
					[field === "name"
						? "skillName"
						: field === "level"
							? "skillLevel"
							: "skillDescription"]:
						field === "level" ? Number(value) || 1 : value || "",
				};
			})
		);
	};

	// スキルの追加(Create)
	const handleAddSkill = (serviceId: string) => {
		const newSkill: Skill = {
			skillId: crypto.randomUUID(),
			serviceId: serviceId,
			skillName: "",
			skillLevel: 1,
			skillDescription: "",
		};

		setSkills([...skills, newSkill]);
	};

	// サービスの表示順
	const serviceOrder = [
		"data-infrastructure",
		"web-development",
		"data-analytics",
	];

	// スキルの削除(Delete)
	const [deletedSkillIds, setDeletedSkillIds] = useState<string[]>([]);

	const handleRemoveSkill = (skillId: string) => {
		setSkills(skills.filter((skill) => skill.skillId !== skillId));
		setDeletedSkillIds([...deletedSkillIds, skillId]);
	};

	// 保存処理(Update)
	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const currentUser = auth.currentUser;
			if (!currentUser) {
				toast.error("認証が必要です");
				return;
			}
			const token = await currentUser.getIdToken();

			// サービスとスキルを更新(Update)
			const response = await fetch("/api/services", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					services: services.map((service) => ({
						id: service.id,
						title: service.title,
						items: service.items,
					})),
					skills: skills.map((skill) => ({
						skillId: skill.skillId,
						serviceId: skill.serviceId,
						skillName: skill.skillName,
						skillLevel: Number(skill.skillLevel),
						skillDescription: skill.skillDescription,
					})),
					deletedSkillIds: deletedSkillIds.filter((id) => id),
				}),
			});
			if (!response.ok) {
				throw new Error("APIエラーが発生しました");
			}
			toast.success("保存しました");
		} catch (error) {
			console.error("Error saving data:", error);
			toast.error("保存に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	// ローディング中の表示
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="space-y-8">
			{services
				.sort((a, b) => {
					const indexA = serviceOrder.indexOf(a.id);
					const indexB = serviceOrder.indexOf(b.id);
					return indexA - indexB;
				})
				.map((service) => {
					// 各サービスに紐づくスキルをフィルタリング
					const serviceSkills = skills.filter(
						(skill) => skill.serviceId === service.id
					);
					return (
						<div
							key={`service-${service.id}`}
							className="rounded-lg border border-[#00a497]/10 bg-white p-6 shadow-sm"
						>
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-600 mb-2">
									サービス名
								</label>
								<input
									type="text"
									value={service.title}
									onChange={(e) =>
										handleServiceChange(service.id, "title", e.target.value)
									}
									className="w-full text-xl font-semibold text-gray-800 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#00a497] focus:ring-2 focus:ring-[#00a497]/20 transition-all duration-200"
									placeholder="サービス名を入力"
									disabled={isLoading}
								/>
							</div>
							<div className="mb-8">
								<label className="block text-sm font-medium text-gray-600 mb-2">
									サービス説明
								</label>
								<textarea
									value={service.items.join("\n")}
									onChange={(e) =>
										handleServiceChange(
											service.id,
											"items",
											e.target.value.split("\n").filter((item) => item.trim())
										)
									}
									className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#00a497] focus:ring-2 focus:ring-[#00a497]/20 transition-all duration-200"
									placeholder="サービスの説明（各行が1つの項目になります）"
									rows={3}
									disabled={isLoading}
								/>
							</div>
							<div className="space-y-4">
								<label className="block text-sm font-medium text-gray-600 mb-2">
									スキル一覧
								</label>
								{serviceSkills.map((skill) => (
									<div
										key={`skill-${skill.skillId}`}
										className="flex flex-col gap-2 rounded-lg border border-gray-100 p-4"
									>
										<div className="flex items-center gap-4">
											<input
												type="text"
												value={skill.skillName}
												onChange={(e) =>
													handleSkillChange(
														service.id,
														skill.skillId,
														"name",
														e.target.value
													)
												}
												className="flex-1 rounded-lg border border-gray-200 px-4 py-2"
												placeholder="スキル名"
												disabled={isLoading}
											/>
											<select
												value={skill.skillLevel}
												onChange={(e) =>
													handleSkillChange(
														service.id,
														skill.skillId,
														"level",
														e.target.value
													)
												}
												className="w-24 rounded-lg border border-gray-200 px-4 py-2"
												disabled={isLoading}
											>
												{[1, 2, 3, 4, 5].map((level) => (
													<option
														key={`level-${level}-${skill.skillId}`}
														value={level}
													>
														Lv{level}
													</option>
												))}
											</select>
											<button
												onClick={() => handleRemoveSkill(skill.skillId)}
												className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50 hover:cursor-pointer"
												disabled={isLoading}
											>
												<FaTrash className="h-4 w-4" />
											</button>
										</div>
										<div className="text-sm text-gray-500 italic pl-2">
											<input
												type="text"
												value={skill.skillDescription || ""}
												onChange={(e) =>
													handleSkillChange(
														service.id,
														skill.skillId,
														"description",
														e.target.value
													)
												}
												className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm italic"
												placeholder="スキルレベルの説明を入力"
												disabled={isLoading}
											/>
										</div>
									</div>
								))}
								<button
									onClick={() => handleAddSkill(service.id)}
									className="flex items-center gap-2 text-sm rounded-lg p-2 text-[#00a497] hover:text-[#00a497]/80 hover:bg-[#00a497]/10 hover:cursor-pointer"
									disabled={isLoading}
								>
									<FaPlus className="h-4 w-4" />
									スキルを追加
								</button>
							</div>
						</div>
					);
				})}
			{/* キャンセルボタン */}
			<div className="mt-8 flex justify-between items-center w-full">
				<Link
					href="/admin"
					className="w-32 text-center rounded-lg bg-red-100 px-6 py-2 text-red-700 hover:bg-red-200 transition-colors duration-200 hover:cursor-pointer"
				>
					キャンセル
				</Link>
				<button
					onClick={handleSubmit}
					className="w-32 text-center rounded-lg bg-[#00a497] px-6 py-2 text-white hover:bg-[#00a497]/90 disabled:opacity-50 hover:cursor-pointer"
					disabled={isLoading}
				>
					{isLoading ? "保存中..." : "保存"}
				</button>
			</div>
		</div>
	);
};

"use client";

import { useState } from "react";
import { Service } from "@/types/services";
import { getSkillLevelDescription, Skill, SkillLevel } from "@/types/services";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import router from "next/router";
import Link from "next/link";
import { auth } from "@/lib/firebase";

interface Props {
	initialServices: Service[] | null;
	initialSkills: Skill[] | null;
}

export const ServicesEditor: React.FC<Props> = ({
	initialServices,
	initialSkills,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	// サービス一覧を取得(Read)
	const [services, setServices] = useState<Service[]>(() => {
		if (!initialServices) return [];
		return initialServices.map((service) => ({
			...service,
			id: service.id,
			title: service.title,
			items: service.items,
		}));
	});

	// サービスの更新(Update)
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

	// スキルの取得(Read)
	const [skills, setSkills] = useState<Skill[]>(() => {
		if (!initialSkills) return [];

		return initialSkills.map((skill) => ({
			...skill,
			skillId: skill.skillId || crypto.randomUUID(),
			serviceId: skill.serviceId,
			name: skill.name,
			level: skill.level as SkillLevel,
		}));
	});

	// スキルの追加(Create)
	const handleAddSkill = (serviceId: string) => {
		const newSkill: Skill = {
			skillId: crypto.randomUUID(),
			serviceId: serviceId,
			name: "",
			level: 1,
		};

		setSkills([...skills, newSkill]);
	};

	// スキルの更新(Update)
	const handleSkillChange = (
		serviceId: string,
		id: string,
		field: "name" | "level",
		value: string | number
	) => {
		setSkills(
			skills.map((skill) => {
				if (skill.skillId !== id) return skill;
				return {
					...skill,
					[field]:
						field === "level" ? (Number(value) as SkillLevel) : String(value),
				};
			})
		);
	};

	// スキルの削除(Delete)
	const handleRemoveSkill = (skillId: string) => {
		setSkills(skills.filter((skill) => skill.skillId !== skillId));
	};

	// 保存処理
	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			const currentUser = auth.currentUser;
			if (!currentUser) {
				toast.error("認証が必要です");
				return;
			}

			const token = await currentUser.getIdToken();
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};

			await Promise.all([
				fetch("/api/services/skills", {
					method: "PUT",
					headers,
					body: JSON.stringify({ skills }),
				}),
				fetch("/api/services/services", {
					method: "PUT",
					headers,
					body: JSON.stringify({ services }),
				}),
			]);

			toast.success("保存しました");
		} catch (error) {
			console.error("Error saving data:", error);
			toast.error("保存に失敗しました");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			{services.map((service) => {
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
											value={skill.name}
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
											value={skill.level}
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
										{getSkillLevelDescription(skill.level)}
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

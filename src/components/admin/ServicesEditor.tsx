"use client";

import { useState } from "react";
import { Service } from "@/types/service";
import {
	getSkillLevelDescription,
	Skill,
	SkillLevel,
} from "@/types/serviceSkill";
import { FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { DEFAULT_SERVICES } from "@/constants/services";

interface Props {
	initialSkills: Skill[] | null;
}

export const ServicesEditor: React.FC<Props> = ({ initialSkills }) => {
	const [isLoading, setIsLoading] = useState(false);

	// サービスは定数から取得
	const [services] = useState<Service[]>(DEFAULT_SERVICES);

	// スキルはFirestoreから取得した初期値を使用(Read)
	const [skills, setSkills] = useState<Skill[]>(() => {
		// 初期スキルがない場合は空配列を返す
		if (!initialSkills) return [];

		// 既存のスキルデータを各サービスに紐付ける
		return initialSkills.map((skill) => ({
			...skill,
			// サービスIDが不正な場合は修正
			serviceId: DEFAULT_SERVICES.some((s) => s.id === skill.serviceId)
				? skill.serviceId
				: DEFAULT_SERVICES[0].id,
		}));
	});

	// スキルの追加(Create)
	const handleAddSkill = (serviceId: string) => {
		const newSkill: Skill = {
			id: crypto.randomUUID(),
			serviceId,
			name: "",
			level: 1,
		};

		setSkills([...skills, newSkill]);
	};

	// スキルの更新(Update)
	const handleSkillChange = (
		serviceId: string,
		skillId: string,
		field: "name" | "level",
		value: string | number
	) => {
		setSkills(
			skills.map((skill) => {
				if (skill.id !== skillId) return skill;

				return {
					...skill,
					[field]:
						field === "level" ? (Number(value) as SkillLevel) : String(value),
				};
			})
		);
	};

	// スキルの削除(Delete)
	const handleRemoveSkill = (serviceId: string, skillId: string) => {
		setSkills(skills.filter((skill) => skill.id !== skillId));
	};

	// 保存処理
	const handleSubmit = async () => {
		if (skills.some((skill) => !skill.name.trim())) {
			toast.error("スキル名を入力してください");
			return;
		}

		try {
			setIsLoading(true);
			await fetch("/api/services/skills", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ skills }),
			});
			toast.success("スキルを保存しました");
		} catch (error) {
			console.error("Error saving skills:", error);
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
						key={service.id}
						className="rounded-lg border border-[#00a497]/10 bg-white p-6 shadow-sm"
					>
						<h2 className="mb-4 text-xl font-semibold text-gray-800">
							{service.title}
						</h2>
						<div className="space-y-4">
							{/* スキル一覧を表示 */}
							{serviceSkills.map((skill) => (
								<div
									key={`${service.id}-${skill.id}`}
									className="flex flex-col gap-2 rounded-lg border border-gray-100 p-4"
								>
									<div className="flex items-center gap-4">
										<input
											type="text"
											value={skill.name}
											onChange={(e) =>
												handleSkillChange(
													service.id,
													skill.id,
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
													skill.id,
													"level",
													e.target.value
												)
											}
											className="w-24 rounded-lg border border-gray-200 px-4 py-2"
											disabled={isLoading}
										>
											{[1, 2, 3, 4, 5].map((level) => (
												<option
													key={`${service.id}-${skill.id}-${level}`}
													value={level}
												>
													Lv{level}
												</option>
											))}
										</select>
										<button
											onClick={() => handleRemoveSkill(service.id, skill.id)}
											className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
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
								className="flex items-center gap-2 text-sm text-[#00a497] hover:text-[#00a497]/80"
								disabled={isLoading}
							>
								<FaPlus className="h-4 w-4" />
								スキルを追加
							</button>
						</div>
					</div>
				);
			})}
			{/* 保存ボタン */}
			<div className="flex justify-end">
				<button
					onClick={handleSubmit}
					className="rounded-lg bg-[#00a497] px-6 py-2 text-white hover:bg-[#00a497]/90 disabled:opacity-50"
					disabled={isLoading}
				>
					{isLoading ? "保存中..." : "保存"}
				</button>
			</div>
		</div>
	);
};

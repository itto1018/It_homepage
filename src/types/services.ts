export type Service = {
	id: string;
	title: string;
	items: string[];
};

export interface Skill {
	skillId: string;
	serviceId: string;
	level: SkillLevel;
	name: string;
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;
export const getSkillLevelDescription = (level: SkillLevel): string => {
	switch (level) {
		case 1:
			return "現在学習中で、理解するまでの時間が必要です";
		case 2:
			return "基礎的な知識があり、サポートがあれば実践できます";
		case 3:
			return "実務経験があり、自立して作業を進められます";
		case 4:
			return "豊富な経験があり、他者への指導も可能です";
		case 5:
			return "マネージャーの経験があり、チーム全体をリードできます";
		default:
			return "";
	}
};

export type SkillLevel = 1 | 2 | 3 | 4 | 5;
export interface Skill {
	id: string;
	serviceId: string; // サービスIDを追加
	name: string;
	level: SkillLevel;
}

export const getSkillLevelDescription = (level: SkillLevel): string => {
	switch (level) {
		case 1:
			return "基礎的な知識があり、サポートがあれば実践できます";
		case 2:
			return "実務経験があり、自立して作業を進められます";
		case 3:
			return "豊富な経験があり、他者への指導も可能です";
		case 4:
			return "豊富な経験があり、他者への指導も可能です";
		case 5:
			return "豊富な経験があり、他者への指導も可能です";
		default:
			return "";
	}
};

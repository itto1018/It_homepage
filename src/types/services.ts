export type Service = {
	id: string;
	title: string;
	items: string[];
};

export interface Skill {
	skillId: string;
	serviceId: string;
	skillLevel: SkillLevel;
	skillName: string;
	skillDescription?: string;
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;
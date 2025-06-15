export type ServiceId =
	| "data_infrastructure"
	| "web_development"
	| "data_analytics";

export type Service = {
	id: ServiceId;
	title: string;
	type: "データ基盤構築" | "Webサイト開発" | "データ分析・可視化";
	items: string[];
	skills: {
		name: string;
		level: number;
	}[];
	createdAt: Date;
	updatedAt: Date;
};

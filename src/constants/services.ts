import { FirestoreService } from "@/types/services";

export const DEFAULT_SERVICES: FirestoreService[] = [
	{
		id: "data-infrastructure",
		title: "データ基盤構築",
		items: ["データ基盤設計", "SQLクエリ最適化", "データパイプライン構築"],
		createdAt: new Date("2025-06-01 00:00:00"),
		updatedAt: new Date("2025-06-01 00:00:00"),
	},
	{
		id: "web-development",
		title: "Webサイト開発",
		items: ["要件定義", "開発・テスト", "運用・保守"],
		createdAt: new Date("2025-06-01 00:00:00"),
		updatedAt: new Date("2025-06-01 00:00:00"),
	},
];

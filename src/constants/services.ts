import { Service } from "@/types/service";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "data-infrastructure",
    title: "データ基盤構築",
    items: ["データ基盤設計", "SQLクエリ最適化", "データパイプライン構築"],
  },
  {
    id: "web-development",
    title: "Webサイト開発",
    items: ["要件定義", "開発・テスト", "運用・保守"],
  },
  {
    id: "data-analytics",
    title: "データ分析・可視化",
    items: ["要件定義", "ダッシュボード開発", "統計分析・機械学習"],
  },
];

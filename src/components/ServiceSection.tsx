import React from "react";
import { ServiceCard } from "./ServiceCard";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";

const ServiceSection = () => {
  return (
    <div className="mb-12 grid w-full grid-cols-1 gap-4 sm:gap-6 md:mb-15 xl:grid-cols-3">
      <ServiceCard
        title="データ基盤構築"
        Icon={FaDatabase}
        items={["データ基盤設計", "SQLクエリ最適化", "データパイプライン構築"]}
      />
      <ServiceCard
        title="Webサイト開発"
        Icon={FaLaptopCode}
        items={["要件定義", "開発・テスト", "運用・保守"]}
      />
      <ServiceCard
        title="データ分析・可視化"
        Icon={IoAnalyticsSharp}
        items={["要件定義", "ダッシュボード開発", "統計分析・機械学習"]}
      />
    </div>
  );
};

export default ServiceSection;

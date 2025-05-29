"use client";

import React, { FC, useEffect, useState } from "react";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";
import { Modal } from "./Modal";

export type Props = {
  title: string;
  discript: string;
};

const iconMap = {
  データ基盤構築: <FaDatabase className="h-5 md:h-8 w-5 md:w-8" />,
  webサイト開発: <FaLaptopCode className="h-5 md:h-8 w-5 md:w-8" />,
  データ分析: <IoAnalyticsSharp className="h-5 md:h-8 w-5 md:w-8" />,
  ダッシュボード開発: <TbFileAnalytics className="h-5 md:h-8 w-5 md:w-8" />,
};

export const ServiceModalCard: FC<Props> = props => {
  const { title, discript } = props;
  const icon = iconMap[title.toLowerCase() as keyof typeof iconMap];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayText, setDisplayText] = useState(discript);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex h-24 w-full sm:h-60 sm:w-50 md:h-80 md:w-65 lg:h-65 lg:w-45 xl:h-70 xl:w-60 2xl:w-80 sm:flex-col items-center justify-center gap-4 md:gap-6 rounded-lg bg-white px-4 py-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex-shrink-0 p-2 md:p-4 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gray-200">
          {icon}
        </div>
        <div className="flex flex-col items-start sm:items-center w-full overflow-hidden">
          <h1 className="text-sm md:text-base font-bold truncate w-full sm:text-center sm:mb-2">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line sm:text-center">
            {displayText}
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            {icon}
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">サービス詳細</h3>
            <p className="text-gray-600">{discript}</p>
            {/* 追加の詳細情報をここに記述 */}
            <div className="mt-6 space-y-2">
              <h4 className="font-semibold">主な提供内容：</h4>
              <ul className="list-disc list-inside text-gray-600">
                {title === "データ基盤構築" && (
                  <>
                    <li>データベース設計</li>
                    <li>SQLクエリ最適化</li>
                    <li>データパイプライン構築</li>
                  </>
                )}
                {/* 他のサービスの詳細情報も同様に追加 */}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ServiceModalCard;

import React, { FC } from "react";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";

export type Props = {
  title: string;
  discript: string;
};

const iconMap = {
  データ基盤構築: <FaDatabase size={40} />,
  webサイト開発: <FaLaptopCode size={40} />,
  データ分析: <IoAnalyticsSharp size={40} />,
  ダッシュボード開発: <TbFileAnalytics size={40} />,
};

export const ServiceModalCard: FC<Props> = props => {
  const { title, discript } = props;
  const icon = iconMap[title.toLowerCase() as keyof typeof iconMap];

  return (
    <div className="flex h-80 w-64 flex-col items-center gap-4 rounded-lg bg-white p-10 shadow-md">
      <div className="mb-4 flex h-25 w-25 items-center justify-center rounded-full bg-gray-200">
        {icon}
      </div>
      <h1 className="text-base font-bold">{title}</h1>
      <p>{discript}</p>
    </div>
  );
};

export default ServiceModalCard;

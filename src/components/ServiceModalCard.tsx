import React, { FC } from "react";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";

export type Props = {
  title: string;
  discript: string;
};

const iconMap = {
  データ基盤構築: <FaDatabase className="h-8 w-8" />,
  webサイト開発: <FaLaptopCode className="h-8 w-8" />,
  データ分析: <IoAnalyticsSharp className="h-8 w-8" />,
  ダッシュボード開発: <TbFileAnalytics className="h-8 w-8" />,
};

// バイト数を計算する関数
const getByteLength = (str: string): number => {
  return new TextEncoder().encode(str).length;
};

// 指定バイト数で改行を挿入する関数
const insertLineBreaksByBytes = (text: string, byteLimit: number = 24): string => {
  let result = "";
  let currentBytes = 0;
  let currentChunk = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charBytes = getByteLength(char);

    if (currentBytes + charBytes > byteLimit) {
      result += currentChunk + "\n";
      currentChunk = char;
      currentBytes = charBytes;
    } else {
      currentChunk += char;
      currentBytes += charBytes;
    }
  }

  return result + currentChunk;
};

export const ServiceModalCard: FC<Props> = props => {
  const { title, discript } = props;
  const icon = iconMap[title.toLowerCase() as keyof typeof iconMap];
  const formattedDiscript = insertLineBreaksByBytes(discript, 24);

  return (
    <div className="flex h-60 w-40 md:h-80 md:w-65 lg:h-65 lg:w-45 flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 py-6 shadow-md">
      <div className="mb-2 flex h-15 w-15 items-center justify-center rounded-full bg-gray-200">
        {icon}
      </div>
      <h1 className="text-sm md:text-base font-bold">{title}</h1>
      <p className="text-xs md:text-sm whitespace-pre-line text-gray-600">{formattedDiscript}</p>
    </div>
  );
};

export default ServiceModalCard;

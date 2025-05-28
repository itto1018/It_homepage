"use client";

import React, { FC, useEffect, useState } from "react";
import { FaDatabase, FaLaptopCode } from "react-icons/fa";
import { IoAnalyticsSharp } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";

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
  const [displayText, setDisplayText] = useState(discript);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // smブレークポイント
      setDisplayText(window.innerWidth < 640 ? discript : insertLineBreaksByBytes(discript, 24));
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [discript]);

  return (
    <div className="flex h-24 w-full sm:h-60 sm:w-50 md:h-80 md:w-65 lg:h-65 lg:w-45 sm:flex-col items-center justify-center gap-4 md:gap-6 rounded-lg bg-white px-4 py-4 shadow-md">
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
  );
};

export default ServiceModalCard;

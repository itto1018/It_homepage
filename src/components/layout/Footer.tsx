"use client";

import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto bg-white border-t border-[#00a497]/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} It.dev All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-[#00a497] transition-colors hover:cursor-pointer"
          >
            <FaArrowUp className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
            <span className="sr-only">ページトップへ戻る</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

import { FaQuestionCircle } from "react-icons/fa";

export const SkillLevelGuide = () => {
  const levels = [
    { level: 1, description: "基礎知識レベル" },
    { level: 2, description: "実務経験あり" },
    { level: 3, description: "実務で活用可能" },
    { level: 4, description: "高度な知識と経験" },
    { level: 5, description: "エキスパート" },
  ];

  return (
    <div className="relative group inline-block">
      <FaQuestionCircle className="text-[#00a497] w-5 h-5 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block animate-fadeIn z-10">
        <div className="bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg min-w-[200px]">
          <p className="mb-2 font-medium">スキルレベルの基準</p>
          <div className="space-y-1">
            {levels.map(({ level, description }) => (
              <div key={level} className="flex items-center gap-2">
                <span className="text-[#00a497] font-medium">Lv{level}:</span>
                <span className="text-gray-200 text-sm">{description}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800" />
        </div>
      </div>
    </div>
  );
};
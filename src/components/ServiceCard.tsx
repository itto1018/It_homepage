import { IconType } from "react-icons";
import {
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaNodeJs,
  FaAws,
  FaRProject,
  FaGithub,
  FaLinux,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiSnowflake,
  SiAmazonredshift,
  SiDbt,
  SiNextdotjs,
  SiTableau,
  SiMysql,
  SiRuby,
  SiRubyonrails,
} from "react-icons/si";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";
import { BsFiletypeSql } from "react-icons/bs";

type TechStack = {
  Icon: IconType;
  color: string;
  name: string;
};

type SkillLevel = {
  name: string;
  level: number;
  description?: string;
};

type Props = {
  title: string;
  Icon: IconType;
  items: string[];
  skills: SkillLevel[];
};

const getTechStacks = (title: string): TechStack[] => {
  switch (title) {
    case "データ基盤構築":
      return [
        { Icon: FaAws, color: "text-[#FF9900]", name: "AWS" },
        { Icon: SiAmazonredshift, color: "text-[#2088FF]", name: "Redshift" },
        { Icon: SiSnowflake, color: "text-[#29B5E8]", name: "Snowflake" },
        { Icon: SiDbt, color: "text-[#FF694A]", name: "dbt" },
        { Icon: FaLinux, color: "text-black", name: "Linux" },
        { Icon: FaGithub, color: "text-black", name: "GitHub" },
      ];
    case "Webサイト開発":
      return [
        { Icon: FaHtml5, color: "text-orange-500", name: "HTML" },
        { Icon: FaCss3Alt, color: "text-blue-500", name: "CSS" },
        {
          Icon: BiLogoJavascript,
          color: "text-yellow-400",
          name: "JavaScript",
        },
        { Icon: BiLogoTypescript, color: "text-blue-600", name: "TypeScript" },
        { Icon: SiNextdotjs, color: "text-black", name: "Next.js" },
        { Icon: FaNodeJs, color: "text-green-600", name: "Node.js" },
        { Icon: FaPython, color: "text-[#306998]", name: "Python" },
        { Icon: SiRuby, color: "text-[#CC342D]", name: "Ruby" },
        { Icon: SiRubyonrails, color: "text-[#CC0000]", name: "Ruby on Rails" },
        { Icon: FaGithub, color: "text-black", name: "GitHub" },
      ];
    case "データ分析・可視化":
      return [
        { Icon: BsFiletypeSql, color: "text-blue-600", name: "SQL" },
        { Icon: SiPostgresql, color: "text-[#336791]", name: "PostgreSQL" },
        { Icon: SiMysql, color: "text-[#4479A1]", name: "MySQL" },
        { Icon: SiTableau, color: "text-[#1C94E0]", name: "Tableau" },
        { Icon: FaPython, color: "text-[#FFD43B]", name: "Python" },
        { Icon: FaRProject, color: "text-[#276DC3]", name: "R" },
      ];
    default:
      return [];
  }
};

export const ServiceCard = ({ title, Icon, items, skills }: Props) => {
  const techStacks = getTechStacks(title);

  return (
    <div className="flex flex-col rounded-lg border border-gray-100 bg-gradient-to-br from-white to-[#e5f4f3] p-6 shadow-lg transition-all duration-300">
      <div className="mb-6 flex items-center gap-3 sm:gap-4">
        <div className="rounded-full bg-gradient-to-br from-[#00a497]/10 to-[#e5f4f3] p-2 shadow-inner sm:p-3">
          <Icon className="h-4 w-4 text-[#00a497] sm:h-6 sm:w-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 sm:text-xl">{title}</h3>
      </div>
      <ul className="mb-3 ml-3 space-y-3 gap-y-3 text-gray-600 sm:mb-6 sm:ml-5 lg:flex lg:flex-wrap lg:space-y-0 lg:gap-x-8 xl:ml-5 xl:flex-col xl:space-y-3 xl:gap-y-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 transition-colors duration-200 sm:gap-3"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-[#00a497] sm:h-2 sm:w-2 lg:h-3 lg:w-3"></div>
            <p className="text-sm sm:text-base lg:text-lg">{item}</p>
          </li>
        ))}
      </ul>

      {/* スキルレベルセクション */}
      <div className="my-4 space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{skill.name}</span>
              <span>{skill.description}</span>
              <span className="text-[#00a497]">{skill.level}/5</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < skill.level ? "bg-[#00a497]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {techStacks.length > 0 && (
        <div className="mt-auto h-15 border-t border-[#00a497]/10 pt-4 sm:h-10 xl:h-20">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:max-w-full lg:gap-4">
            {techStacks.map((tech, index) => (
              <div key={index} className="relative group">
                <tech.Icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 xl:h-6 xl:w-6 ${tech.color} transition-transform duration-300 group-hover:scale-110`}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block animate-fadeIn">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {tech.name}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

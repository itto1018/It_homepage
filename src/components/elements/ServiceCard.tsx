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
import { getSkillLevelDescription } from "@/types/services";
import type { Service, Skill } from "@/types/services";

type TechStack = {
	Icon: IconType;
	color: string;
	name: string;
};

type SkillLevel = {
	name: string;
	level: 1 | 2 | 3 | 4 | 5;
	description?: string;
};

type Props = {
	title: string;
	Icon: IconType;
	items: string[];
	skills: SkillLevel[];
};


export const ServiceCard = ({ title, Icon, items, skills }: Props) => {

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
						<div className="flex justify-between text-sm font-bold text-gray-600">
							<span>{skill.name}</span>
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
						<p className="text-xs text-gray-600">
							{getSkillLevelDescription(skill.level)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

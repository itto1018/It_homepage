import React, { FC } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiWantedly, SiZenn } from "react-icons/si";

export type Props = {
	type: "Twitter" | "Zenn" | "Mail" | "Wantedly" | "GitHub";
	url: string;
};

const iconMap = {
	Wantedly: (
		<SiWantedly className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
	),
	Zenn: ( 
		<SiZenn className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
	),
	Twitter: ( 
		<FaXTwitter className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
	),
	GitHub: (
		<FaGithub className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
	),
	Mail: (
		<BiLogoGmail className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
	),
};

const SocialLinkIcon: FC<Props> = (props) => {
	const { type, url } = props;
	const icon = iconMap[type];

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#00a497] bg-opacity-90 transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg hover:scale-110"
			aria-label={type}
		>
			{icon}
		</a>
	);
};

export default SocialLinkIcon;

import React, { FC } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { SiWantedly } from "react-icons/si";

export type Props = {
	type: "X" | "Wantedly" | "Mail" | "LinkedIn";
	url: string;
};

const iconMap = {
	X: <FaXTwitter className="h-6 w-6 md:h-8 md:w-8 text-white" />,
	Wantedly: <SiWantedly className="h-6 w-6 md:h-8 md:w-8 text-white" />,
	Mail: <BiLogoGmail className="h-6 w-6 md:h-8 md:w-8 text-white" />,
	LinkedIn: <FaLinkedinIn className="h-6 w-6 md:h-8 md:w-8 text-white" />,
};

const SocialLinkCard: FC<Props> = (props) => {
	const { type, url } = props;
	const icon = iconMap[type];

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00a497] bg-opacity-90 transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg hover:scale-110 md:h-16 md:w-16"
			aria-label={type}
		>
			{icon}
		</a>
	);
};

export default SocialLinkCard;

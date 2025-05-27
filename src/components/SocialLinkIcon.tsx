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
  X: <FaXTwitter className="w-6 h-6 md:w-8 md:h-8" />,
  Wantedly: <SiWantedly className="w-6 h-6 md:w-8 md:h-8" />,
  Mail: <BiLogoGmail className="w-6 h-6 md:w-8 md:h-8" />,
  LinkedIn: <FaLinkedinIn className="w-6 h-6 md:w-8 md:h-8" />,
};

const SocialLinkCard: FC<Props> = props => {
  const { type, url } = props;
  const icon = iconMap[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-2 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300"
      aria-label={type}
    >
      {icon}
    </a>
  );
};

export default SocialLinkCard;

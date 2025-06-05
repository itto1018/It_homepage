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
  X: <FaXTwitter className="h-6 w-6 md:h-8 md:w-8" />,
  Wantedly: <SiWantedly className="h-6 w-6 md:h-8 md:w-8" />,
  Mail: <BiLogoGmail className="h-6 w-6 md:h-8 md:w-8" />,
  LinkedIn: <FaLinkedinIn className="h-6 w-6 md:h-8 md:w-8" />,
};

const SocialLinkCard: FC<Props> = (props) => {
  const { type, url } = props;
  const icon = iconMap[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300 md:h-16 md:w-16"
      aria-label={type}
    >
      {icon}
    </a>
  );
};

export default SocialLinkCard;

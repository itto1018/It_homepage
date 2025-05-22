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
  X: <FaXTwitter size={30} />,
  Wantedly: <SiWantedly size={30} />,
  Mail: <BiLogoGmail size={30} />,
  LinkedIn: <FaLinkedinIn size={30} />
};

const SocialLinkCard: FC<Props> = (props) => {
  const { type, url } = props;
  const icon = iconMap[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300"
      aria-label={type}
    >
      {icon}
    </a>
  );
};

export default SocialLinkCard;

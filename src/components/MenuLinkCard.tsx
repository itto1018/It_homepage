import React, { FC } from "react";
import { FaLaptopCode, FaRss } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

export type Props = {
  title: string;
  discript: string;
  url: string;
};

const iconMap = {
  profile: <RiUser3Fill size={30} />,
  link: <FaRss size={30} />,
  works: <FaLaptopCode size={30} />,
};

export const MenuLinkCard: FC<Props> = props => {
  const { title, discript, url } = props;
  const icon = iconMap[title.toLowerCase() as keyof typeof iconMap];

  return (
    <a
      className="flex w-full transform items-center gap-4 rounded-lg bg-white p-6 shadow-md transition hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
      href={url}
      aria-label={title}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300">
        {icon}
      </div>
      <h1 className="w-40 text-4xl font-bold">{title}</h1>
      <p className="text-xl">{discript}</p>
    </a>
  );
};

export default MenuLinkCard;

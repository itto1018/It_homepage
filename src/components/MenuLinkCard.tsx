import React, { FC } from "react";
import { FaLaptopCode, FaRss } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

export type Props = {
  title: string;
  discript: string;
  url: string;
};

const iconMap = {
  profile: <RiUser3Fill className="w-5 h-5 md:w-8 md:h-8" />,
  works: <FaLaptopCode className="w-5 h-5 md:w-8 md:h-8" />,
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
      <div className="p-2 md:p-4 flex items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300">
        {icon}
      </div>
      <h1 className="w-2/6 text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="w-3/6 text-base md:text-lg text-gray-600">{discript}</p>
    </a>
  );
};

export default MenuLinkCard;

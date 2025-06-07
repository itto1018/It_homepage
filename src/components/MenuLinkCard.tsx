import React, { FC } from "react";
import { FaLaptopCode, FaRss } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

export type Props = {
  title: string;
  discript: string;
  url: string;
};

const iconMap = {
  profile: <RiUser3Fill className="h-5 w-5 md:h-8 md:w-8" />,
  works: <FaLaptopCode className="h-5 w-5 md:h-8 md:w-8" />,
};

export const MenuLinkCard: FC<Props> = (props) => {
  const { title, discript, url } = props;
  const icon = iconMap[title.toLowerCase() as keyof typeof iconMap];

  return (
    <a
      className="flex w-full transform items-center gap-4 rounded-lg bg-white p-4 shadow-md transition hover:scale-105 hover:bg-gray-100 hover:shadow-xl md:p-5 lg:p-6"
      href={url}
      aria-label={title}
    >
      <div className="flex items-center justify-center rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 md:p-4">
        {icon}
      </div>
      <h2 className="w-2/6 text-2xl font-bold md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="w-4/6 text-xs text-gray-600 sm:text-sm md:text-lg">
        {discript}
      </p>
    </a>
  );
};

export default MenuLinkCard;

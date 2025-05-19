import React, { FC } from 'react'
import { FaLaptopCode, FaRss } from 'react-icons/fa';
import { RiUser3Fill } from "react-icons/ri";

export type Props = {
    title: string;
    discript: string;
};

const iconMap = {
    profile: <RiUser3Fill />,
    link: <FaRss />,
    works: <FaLaptopCode />,
};

export const LinkCard: FC<Props> = (props) => {
    const { title, discript } = props;
    const icon = iconMap[title.toLowerCase() as keyof typeof iconMap] || <RiUser3Fill />;

    return (
        <div className="flex gap-4 items-center bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
                { icon }
            </div>
            <h1 className='font-bold text-4xl'>{title}</h1>
            <p>{discript}</p>
        </div>
    )
}

export default LinkCard
import React, { FC } from 'react'
import { FaLaptopCode, FaRss } from 'react-icons/fa';
import { RiUser3Fill } from "react-icons/ri";

export type Props = {
    title: string;
    discript: string;
};

const iconMap = {
    "ダッシュボード開発": <FaLaptopCode />,
    "データ分析": <FaRss />,
    "Webページ作成": <FaLaptopCode />,
};

export const Card: FC<Props> = (props) => {
    const { title, discript } = props;
    const icon = iconMap[title.toLowerCase() as keyof typeof iconMap] || <RiUser3Fill />;

    return (
        <div className="flex flex-col gap-4 items-center bg-white shadow-md rounded-lg p-10 w-64 h-80">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                { icon }
            </div>
            <h1 className='font-bold text-base'>{title}</h1>
            <p>{discript}</p>
        </div>
    )
}

export default Card
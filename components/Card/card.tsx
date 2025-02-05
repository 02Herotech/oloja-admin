import React from "react";

type CardProps = {
    title: string;
    value: string;
    percentage: number;
    description?: string;
    icon: React.JSX.Element;
};

const Card: React.FC<CardProps> = ({ title, value, percentage, description, icon }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between w-full min-w-[150px] border-[1px] border-[#381F8C]">
            <div className="flex justify-between items-center">
                <h3 className="text-[#716F78] text-xs lg:text-lg font-semibold">{title}</h3>
                <div className="rounded-full">{icon}</div>
            </div>
            <div className="mt-2 relative">
                <h2 className="text-4xl font-bold text-[#381F8C] inline-block">{value}</h2>
                <span
                    className={`text-xs font-semibold absolute -top-1 ml-1 ${
                        percentage > 0 ? "text-green-500" : percentage < 0 ? "text-red-500" : "text-gray-400"
                    }`}
                >
                    {percentage > 0 ? `↑ ${percentage}%` : percentage < 0 ? `↓ ${Math.abs(percentage)}%` : ""}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 min-h-[16px]">{description || "\u00A0"}</p>
        </div>
    );
};

export default Card;
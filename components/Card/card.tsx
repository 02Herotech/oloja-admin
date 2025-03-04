// Card.tsx
import React from "react";
type BackgroundStyles = {
    backgroundImage?: string;
    backgroundImageTwo?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    backgroundPositionX?: string;
    backgroundPositionY?: string;
};

type CardProps = {
    title: string;
    value: number | string;
    percentage: number;
    description?: number | string;
    icon: React.JSX.Element;
    backgroundStyles?: BackgroundStyles;
};

const Card: React.FC<CardProps> = ({ title, value, percentage, description, icon, backgroundStyles }) => {
    // const valueStr = typeof value === 'number' ? value.toString() : value;

    // const calculateFontSize = (length: number) => {
    //     const baseSize = 40;
    //     const minSize = 12;
    //     const scaleFactor = 2.5;
    //     const fontSize = Math.max(minSize, baseSize - length * scaleFactor);
    //     return `${fontSize}px`;
    // };

    const bgStyles = {
        backgroundImage: backgroundStyles?.backgroundImage ? `url(${backgroundStyles.backgroundImage}), url(${backgroundStyles.backgroundImageTwo})` : undefined,
        backgroundSize: backgroundStyles?.backgroundSize || "cover",
        backgroundPosition: backgroundStyles?.backgroundPosition || "center",
        backgroundPositionX: backgroundStyles?.backgroundPositionX,
        backgroundPositionY: backgroundStyles?.backgroundPositionY,
    };

    return (
        <div
            className="bg-white shadow-md rounded-2xl p-2 flex flex-col justify-between w-full min-w-[150px] border border-[#381F8C] relative overflow-hidden"
        >
            <div className="absolute w-full h-full bg-no-repeat object-fill
        bg-[length:auto_70px]" style={bgStyles}></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#716F78] text-xs lg:text-lg font-semibold">{title}</h3>
                    <div className="rounded-full">{icon}</div>
                </div>

                <div className="mt-2 flex justify-between">
                    <h2
                        className="text-[#381F8C] text-xl md:text-2xl lg:text-3xl">

                    {/*// style={{*/}
                    {/*    //     fontSize: calculateFontSize(valueStr.length),*/}
                    {/*    //     transition: "font-size 0.3s ease-in-out",*/}
                    {/*    //     whiteSpace: "nowrap",*/}
                    {/*    // }}*/}
                        {value}
                        <sup
                            className={`text-xs ml-1 font-satoshi m-0  whitespace-nowrap ${percentage > 0 ? "text-green-500" : percentage < 0 ? "text-red-500" : "text-gray-400"
                            }`}
                            style={{ verticalAlign: "super", fontSize: "11px" }}
                        >
                            {percentage > 0 ? `↑ ${percentage}%` : percentage < 0 ? `↓ ${Math.abs(percentage)}%` : ""}
                        </sup>
                    </h2>
                </div>

                <p className="text-xs text-gray-500 mt-1 min-h-[16px]">{description || "\u00A0"}</p>
            </div>
        </div>
    );
};

export default Card;
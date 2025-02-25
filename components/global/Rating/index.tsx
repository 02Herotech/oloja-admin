import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React from "react";
interface RatingProps {
    value: number;
    size?: number;
    color?: string;
    style?: string;
}
export const Rating:React.FC<RatingProps> = ({ value, size = 16, color = "#EEB951", style }) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
        if (value >= i) {
            stars.push(<FaStar key={i} size={size} color={color} />);
        } else if (value >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} size={size} color={color} />);
        } else {
            stars.push(<FaRegStar key={i} size={size} color={color} />);
        }
    }

    return <div className={`flex gap-1 ${style}`}>{stars}</div>;
};
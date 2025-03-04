"use client"

import {
    ReviewDetail,
} from "@/types/services/users/service-providers";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Comment from "@/components/users/providers/ProviderReviews/Comment";

interface ProviderReviewsProps {
    reviews: ReviewDetail[];
}

export const ProviderReviews: React.FC<ProviderReviewsProps> = ({ reviews }) => {
    const [openReviews, setOpenReviews] = React.useState<{ [key: string]: boolean }>({});

    const toggleReview = (id: number) => {
        setOpenReviews((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="py-4">
            <h2 className="font-satoshi mb-4 font-bold">List of Services</h2>
            <div className="ml-3">
                {reviews.map((review) => (
                    <div className="mb-10" key={review.id}>
                        <div className="flex justify-between items-center text-primary border-b border-primary border-b-1">
                            <p className="font-satoshiBold">{review.serviceCategory.categoryName}</p>
                            <button onClick={() => toggleReview(review.id)}>
                                {openReviews[review.id] ? <GoTriangleUp /> : <GoTriangleDown />}
                            </button>
                        </div>
                        {openReviews[review.id] && (
                            <div className="mt-5 flex flex-col gap-4">
                                <Comment review={review} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
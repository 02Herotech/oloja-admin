import React from 'react';
import {Rating} from "@/components/global/Rating";
import Image from "next/image";
import {ReviewDetail} from '@/types/services/users/service-providers';
import {formatDate} from "@/lib/utils";

interface RatingComment {
    review: ReviewDetail;
}

const Comment: React.FC<RatingComment> = ({review}) => {
    return (
        <>
            <div className="flex gap-1 justify-start">
                <Rating value={review.rating}/>
            </div >
            <p className={'text-primary font-satoshi'}>{review.comment}</p >

            <div className="flex items-center gap-3">
                {review.customer.user.profileImage ? (
                    <Image
                        src={review.customer.user.profileImage}
                        alt={review.customer.user.profileImage}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                                <span
                                    className="text-sm text-gray-600"
                                >{review.customer.user.firstName.charAt(0)}</span >
                    </div >
                )}
                <div >
                    <div className={'flex flex-col'}>
                         <span
                             className="text-sm lg:text-base text-[#221354] font-satoshiBold truncate">
                        {review.customer.user.firstName}
                    </span >
                        <span className={'font-satoshi text-[#55535A]'}>
                            {formatDate(review.createdAt)}
                        </span>
                    </div>

                </div >

            </div >
        </ >
    );
};


export default Comment;
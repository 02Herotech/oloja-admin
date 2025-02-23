import {ServiceProviderListing} from "@/types/services/users/service-providers";
import {Star, MoreVertical} from "lucide-react";
import Image from "next/image";
import React, {useState} from "react";
import DefaultImage from "/public/assets/images/defaultTaskImage.png";
import { GoStarFill } from "react-icons/go";
import {Rating} from "@/components/global/Rating";

interface ServiceCardProps {
    listing: ServiceProviderListing,
    onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({listing, onClick}) => {
    const {
        listingTitle,
        planOnePrice,
        serviceProvider,
        reviews,
        businessPictures
    } = listing;
    const [showOptions, setShowOptions] = useState(false);

    const averageRating = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const handleMoreOptionsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOptions(false);
    };

    return (
        <div
            onClick={onClick}
            className="bg-white p-4 md:p-6 rounded-3xl shadow-lg w-full max-w-xs md:max-w-lg lg:max-w-[48%] mb-5 flex flex-col lg:flex-col cursor-pointer"
        >
            <div
                className="relative  w-28 h-24  lg:w-full lg:h-56 rounded-xl flex-shrink-0"
            >
                <Image
                    src={businessPictures.length > 0 ? businessPictures[0] : DefaultImage}
                    alt={listingTitle}
                    layout="fill"
                    objectFit="cover"
                />
            </div >

            <div
                className="flex flex-1 flex-col justify-between mt-4 md:mt-0 md:ml-4 lg:ml-0 lg:mt-4"
            >
                <div className="flex justify-between items-start relative gap-2">
                    <h2 className="text-lg lg:text-xl font-extrabold">{listingTitle}</h2 >

                    <div className="relative">
                        <button
                            onClick={handleMoreOptionsClick}
                            className="text-white bg-primary p-[4.5px] rounded-xl"
                        >
                            <MoreVertical size={20}/>
                        </button >

                        {showOptions && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                            >
                                <div className="py-1">
                                    <button
                                        className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100"
                                    >
                                        View Service
                                    </button >
                                    <button
                                        onClick={handleOptionClick}
                                        className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100"
                                    >
                                        Pause Service
                                    </button >
                                    <button
                                        onClick={handleOptionClick}
                                        className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100"
                                    >
                                        Remove Service
                                    </button >
                                </div >
                            </div >
                        )}
                    </div >
                </div >

                <p className="text-purple-600 font-medium text-md lg:text-lg">From
                                                                              ${planOnePrice}</p >

                <div className="lg:flex lg:justify-between items-center mt-3 md:flex md:flex-row md:gap-4">
                    <div className="flex items-center gap-2">
                        {serviceProvider.user.profileImage ? (
                            <Image
                                src={serviceProvider.user.profileImage}
                                alt={serviceProvider.user.fullName}
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
                                >{serviceProvider.user.fullName.charAt(0)}</span >
                            </div >
                        )}
                        <span
                            className="text-sm lg:text-base text-gray-700 truncate"
                        >{serviceProvider.user.fullName}</span >
                    </div >

                    <div className="flex gap-1 justify-end">
                        {/*{Array.from({length: 5}, (_, i) => (*/}
                        {/*    <Star*/}
                        {/*        key={i} size={16}*/}
                        {/*        className={i < Math.round(averageRating) ? "bg:yellow-500 text-yellow-500" : "text-gray-300"}*/}
                        {/*    />*/}
                        {/*))}*/}
                        <Rating value={averageRating}/>
                    </div >
                </div >
            </div >
        </div >
    );
};
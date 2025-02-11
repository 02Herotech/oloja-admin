"use client";
import React from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import DefaultImage from "/public/assets/images/defaultTaskImage.png";
import Button from "@/components/global/Button";
import { ServiceProviderListing } from "@/types/services/users/service-providers";

interface ServiceCardProps {
    service: ServiceProviderListing;
    onClose: () => void;
}

export const ViewService: React.FC<ServiceCardProps> = ({ service, onClose }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const imageArray = service.businessPictures.length ? service.businessPictures : [DefaultImage];

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % imageArray.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    const fullAddress = [service.suburb, service.state].filter(Boolean).join(" ");


    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl border">
            <button onClick={onClose} className="text-primary font-bold mb-4">← Back to Services</button>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="lg:w-2/3 flex flex-col justify-between gap-6">
                    <h2 className="text-2xl font-bold text-primary">{service.listingTitle}</h2>
                    <p className="text-gray-600 mt-2">
                        <span className="font-semibold text-primary">Service Description:</span> {service.listingDescription}
                    </p>
                    <div className="mt-4 p-2 border border-primary rounded-xl w-full max-w-[400px] flex justify-center items-center gap-2">
                        <span className="text-primary font-extrabold">{service.category.categoryName}</span>
                    </div>
                    <div className="flex flex-col text-sm text-gray-700 mt-4">
                        <div className="flex items-center space-x-2">
                            <FiMapPin className="text-gray-500" />
                            <span>{fullAddress || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <FiCalendar className="text-gray-500" />
                            <span>{formatDate(service.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-primary font-semibold mb-2 text-sm lg:text-base">Service Portfolio:</h3>
                    <div className="flex justify-between items-center my-2">
                        <button onClick={prevImage} className="p-2 bg-[#EBE9F4] shadow-md rounded-xl">
                            <ArrowLeft className="h-5 w-5 text-primary" />
                        </button>
                        <button onClick={nextImage} className="p-2 bg-primary shadow-md rounded-xl">
                            <ArrowRight className="h-5 w-5 text-white" />
                        </button>
                    </div>
                    <div className="relative w-full max-w-md mx-auto">
                        <Image src={imageArray[currentIndex]} alt="Service Portfolio" width={300} height={200} className="rounded-lg w-full" />
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Button className="text-sm rounded-full bg-secondary whitespace-nowrap" theme="secondary">Hold/Pause Service</Button>
                        <Button className="text-sm rounded-full bg-[#FCF4E6] whitespace-nowrap border border-secondary text-secondary" theme="secondary">Cancel Service</Button>
                    </div>
                </div>
            </div>
            <div className="mt-1">
                <p className="text-primary font-extrabold text-lg">Service pricing plans:</p>
                <div className="grid grid-cols-2 gap-4 mt-2 font-extrabold">
                    <div>
                        <p className="text-xl text-primary font-extrabold">$ {service.planOnePrice}</p>
                        <p className="text-gray-600 text-sm">{service.planOneDescription}</p>
                    </div>
                    {
                        service.planTwoPrice &&
                        <div>
                            <p className="text-xl text-primary font-extrabold">$ {service.planTwoPrice}</p>
                            <p className="text-gray-600 text-sm">{service.planTwoDescription}</p>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

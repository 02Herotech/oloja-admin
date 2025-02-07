"use client"
import React from "react";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import DefaultImage from "/public/assets/images/defaultTaskImage.png";


export const ReferenceImageCarousel: React.FC<{ images: string | string[] | null }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageArray = Array.isArray(images) ? images : [images];

    const normalizedImages = imageArray.map((img) => img || DefaultImage);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);

    if (normalizedImages.length === 0) {
        return (
            <div className="relative w-full max-w-md mx-auto my-4">
                <Image
                    src={DefaultImage}
                    alt="Default Reference"
                    width={300}
                    height={200}
                    className="rounded-lg w-full"
                />
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-md mx-auto my-4">
            <button onClick={prevImage} className="absolute left-0 p-2 bg-[#EBE9F4] shadow-md rounded-xl">
                <ArrowLeft className="h-5 w-5 text-primary" />
            </button>
            <button onClick={nextImage} className="absolute right-0 p-2 bg-primary shadow-md rounded-xl">
                <ArrowRight className="h-5 w-5 text-white" />
            </button>
            <Image
                src={normalizedImages[currentIndex]}
                alt="Reference"
                width={300}
                height={200}
                className="rounded-lg w-full"
            />
        </div>
    );
};
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackToPreviousTabButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
      <ArrowLeft onClick={handleBack} className="size-2 bg-black text-white rounded-[5px] w-[50px] h-[40px] mb-5 cursor-pointer" />
  );
};

export default BackToPreviousTabButton;
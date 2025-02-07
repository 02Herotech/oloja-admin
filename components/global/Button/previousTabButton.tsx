"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/global/Button";
import { ArrowLeft } from "lucide-react";

const BackToPreviousTabButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleBack} className="text-sm rounded-full bg-primary border border-primary text-white mb-5">
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
};

export default BackToPreviousTabButton;
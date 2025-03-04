import Button from "@/components/global/Button";
import React from "react";

export const ActionButtons: React.FC = () => {
    return (
        <div className="flex items-center justify-center lg:justify-end gap-4 mt-4">
            <Button className=" text-sm rounded-full bg-secondary lg:whitespace-nowrap" theme="secondary">
                Hold/Pause Task
            </Button>
            <Button className="text-sm rounded-full bg-[#FCF4E6] border border-secondary text-secondary" theme="secondary">
                Cancel Task
            </Button>
        </div>
    );
};
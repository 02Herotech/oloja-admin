import React, { useState } from "react";
import { FiMoreVertical, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { CustomerTask } from "@/types/services/users/customers";
import { formatDate } from "@/lib/utils";
import Image from 'next/image';
import DefaultImage from "/public/assets/images/defaultTaskImage.png";

interface TaskData {
    taskData: CustomerTask;
    onClick: () => void;
}

export const TaskPosted: React.FC<TaskData> = ({ taskData, onClick }) => {
    const [showOptions, setShowOptions] = useState(false);
    const fullAddress = [taskData.state, taskData.suburb].filter(Boolean).join(" ");
    const src = taskData.taskImage;

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
            className="flex flex-wrap items-start bg-[#EBE9F4] rounded-2xl p-4 shadow-md gap-4 w-full relative cursor-pointer hover:bg-[#DAD7E6] transition"
        >
            <div className="w-24 h-24 flex-shrink-0">
                <Image
                    src={src || DefaultImage}
                    alt={taskData.taskBriefDescription}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="absolute top-3 right-3">
                    <button
                        onClick={handleMoreOptionsClick}
                        className="text-white bg-primary p-2 rounded-xl"
                    >
                        <FiMoreVertical size={20} />
                    </button>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1 text-white">
                                <button className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100">View task</button>
                                <button onClick={handleOptionClick} className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100">Hold/pause task</button>
                                <button onClick={handleOptionClick} className="block w-full px-4 py-2 text-sm text-primary hover:bg-gray-100">Cancel task</button>
                            </div>
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-[#2A1769] truncate mb-2">
                    {taskData.taskBriefDescription}
                </h3>

                <p className="text-sm text-primary truncate max-w-full mb-2">
                    {taskData.taskDescription}
                </p>

                <div className="flex flex-wrap justify-between items-center text-sm text-[#716F78] mt-2">
                    <div className="flex items-center space-x-2 truncate">
                        <FiMapPin className="text-gray-500" />
                        <span className="truncate">{fullAddress || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-1 truncate">
                        <FiClock className="text-[#716F78]" />
                        <span className="font-medium">{formatDate(taskData.taskTime)}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-2">
                        <FiCalendar className="text-gray-500" />
                        <span>On {formatDate(taskData.createdAt)}</span>
                    </div>
                    <span className="text-[#FE9B07] font-bold text-xl">${taskData.customerBudget}</span>
                </div>
            </div>
        </div>
    );
};
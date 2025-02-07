import React from "react";
import { FiMoreVertical, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { CustomerTask } from "@/types/services/users/customers";
import { formatDate } from "@/lib/utils";
import Image from 'next/image';


interface TaskData {
    taskData: CustomerTask;
}

export const TaskPosted: React.FC<TaskData> = ({ taskData }) => {
    const fullAddress = [taskData.state, taskData.suburb]
        .filter(Boolean)
        .join(" ");
    const src = taskData.taskImage;
    return (
        <div className="flex items-start bg-[#EBE9F4] rounded-2xl p-4 shadow-md gap-4 w-full relative">
            {src ? (
                <Image src={src} alt={taskData.taskBriefDescription} width={100} height={100} />
            ) : (
                <p>No Image Available</p>
            )}
            <div className="flex-1">
                <div className="absolute top-3 right-3">
                    <button className="text-white bg-primary p-2 rounded-xl">
                        <FiMoreVertical size={20} />
                    </button>
                </div>

                <h3 className="text-lg font-semibold text-indigo-900 truncate">
                    {taskData.taskBriefDescription}
                </h3>
                <p className="text-sm text-gray-500 truncate w-64">
                    {taskData.taskDescription}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div className="flex items-center space-x-2">
                        <FiMapPin className="text-gray-500" />
                        <span>{fullAddress || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiClock className="text-gray-500" />
                        <span className="font-medium">{formatDate(taskData.taskTime)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-2">
                        <FiCalendar className="text-gray-500" />
                        <span>{`On ${formatDate(taskData.createdAt)}`}</span>
                    </div>
                    <span className="text-[#FE9B07] font-bold text-xl">${taskData.customerBudget}</span>
                </div>
            </div>
        </div>
    );
};
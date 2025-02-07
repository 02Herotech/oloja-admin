import React from "react";
import { CustomerTask } from "@/types/services/users/customers";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import { ActionButtons } from "@/components/users/customers/CustomerTasks/view-task/actionButtons";
import {
    ReferenceImageCarousel
} from "@/components/users/customers/CustomerTasks/view-task/referenceImage";

export const TaskDescription: React.FC<{ task: CustomerTask }> = ({ task }) => {
    const fullAddress = [task.state, task.suburb].filter(Boolean).join(" ");

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl lg:max-w-5xl">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="lg:w-2/3">
                    <h2 className="text-xl lg:text-2xl text-primary font-semibold mb-2">
                        {task.taskBriefDescription}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-primary mr-2">Task Description:</span>
                        {task.taskDescription}
                    </p>

                    <div className="mt-4 p-2 border border-primary rounded-xl max-w-[300px] flex justify-center items-center gap-2">
                        <span className="text-primary font-extrabold">{task.category.categoryName}</span>
                    </div>

                    <div className="flex flex-col text-sm text-gray-700 mt-4">
                        <div className="flex items-center space-x-2">
                            <FiMapPin className="text-gray-500"/>
                            <span>{fullAddress || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <FiCalendar className="text-gray-500"/>
                            <span>{formatDate(task.taskDate)}</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-primary font-bold text-lg">Budget</p>
                        <p className="text-xl lg:text-2xl text-primary font-bold">$ {task.customerBudget}</p>
                    </div>
                </div>

                <div className="lg:w-1/3 mt-6 lg:mt-0">
                    <h3 className="text-primary font-semibold mb-2 text-sm lg:text-base">Reference Images</h3>
                    <ReferenceImageCarousel images={task.taskImage} />
                </div>
            </div>

            <ActionButtons />
        </div>
    );
};
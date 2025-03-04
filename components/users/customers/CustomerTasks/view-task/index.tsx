import { CustomerTask } from "@/types/services/users/customers";
import React from "react";
import { TaskDescription } from "@/components/users/customers/CustomerTasks/view-task/taskDescription";
import {ArrowLeft} from "lucide-react";

interface TaskCardProps {
    task: CustomerTask;
    onBack: () => void;
}

export const ViewTask: React.FC<TaskCardProps> = ({ task, onBack }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
            <button onClick={onBack} className="mb-4 text-primary hover:underline"><ArrowLeft/></button>
            <div className={'max-w-[70px] text-center'}>
                <span className={'bg-primary block p-1 text-white border rounded-full '}>{task.taskStatus
                    .split(" ")
                    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
                    .join(" ")}</span>
            </div>
            <TaskDescription task={task} />
        </div>
    );
};
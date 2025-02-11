import { CustomerTask } from "@/types/services/users/customers";
import React from "react";
import { TaskDescription } from "@/components/users/customers/CustomerTasks/view-task/taskDescription";

interface TaskCardProps {
    task: CustomerTask;
    onBack: () => void;
}

export const ViewTask: React.FC<TaskCardProps> = ({ task, onBack }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
            <button onClick={onBack} className="mb-4 text-primary hover:underline">← Back to Tasks</button>
            <TaskDescription task={task} />
        </div>
    );
};
'use client'

import React from "react";
import Icons from "@/components/icons";

type Activity = {
    user: string;
    action: string;
    details: string;
    daysAgo: number;
    icon: React.JSX.Element;
};

const activities: Activity[] = [
    {
        user: "Jane Doe",
        action: "sent a report",
        details: "Incomplete Task",
        daysAgo: 3,
        icon: <Icons.ActivityIcon />,
    },
    {
        user: "Jane Doe",
        action: "requested a revision",
        details: "Not Satisfied",
        daysAgo: 3,
        icon: <Icons.ActivityIcon />,
    },
    {
        user: "Jane Doe",
        action: "updated their profile",
        details: "Verification Document",
        daysAgo: 3,
        icon: <Icons.ActivityIcon />,
    },

];

const ActivityLog: React.FC = () => {
    return (
        <div className="w-full px-5 py-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold text-[#140B31]">Activity Log</h2>
                <div className="text-xs flex space-x-1 text-[#60667D]">
                    <p className={'px-1 py-1'}>Sort:</p>
                    <button className="px-3 py-1 rounded-2xl border-[0.5px] border-[#381F8C]">
                        Priority
                    </button>
                    <button className="px-3 py-1 rounded-2xl border-[0.5px] border-[#381F8C]">
                        Date
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px] overflow-y-auto">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-2xl p-4 flex justify-between items-start mb-3"
                    >
                        <div className="flex items-start">
                            <div className="text-white text-sm font-bold p-2 rounded-full">
                                {activity.icon}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm mb-1 text-[#381F8C]">
                                    <span className="font-semibold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-[#9B9FB0] mb-2">{activity.details}</p>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                            <p className="mb-2 text-[#C7C7C7]">{activity.daysAgo} days ago</p>
                            <span className="text-[#381F8C] cursor-pointer">View Report</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
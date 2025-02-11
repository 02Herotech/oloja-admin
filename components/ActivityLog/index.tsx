'use client'

import React from "react";
import Icons from "@/components/icons";
import {useGetActivityLogQuery} from "@/services/adminAnalysis";
import {Loader2} from "lucide-react";

const ActivityLog: React.FC = () => {
    const { data: activities, error, isLoading } = useGetActivityLogQuery();

    const getDaysAgo = (notificationTime: number[]) => {
        if (!notificationTime || notificationTime.length < 3) return 0;

        const [year, month, day, hour, minute, second] = notificationTime;
        const notificationDate = new Date(year, month - 1, day, hour, minute, second);
        const currentDate = new Date();

        const timeDifference = currentDate.getTime() - notificationDate.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    if (isLoading) {
        return <div className={'flex justify-center items-center'}>
            <Loader2 className="animate-spin size-20 text-primary" />
        </div>;
    }

    if (error) {
        return<div className={'flex justify-center items-center'}>
        <p className="text-center text-red-500">Error loading activity log</p>;
        </div>
    }

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
                {activities?.map((activity, index) => (
                    <div
                        key={activity.id || index}
                        className="border border-gray-200 rounded-2xl p-4 flex justify-between items-start mb-3"
                    >
                        <div className="flex items-start">
                            <div className="text-white text-sm font-bold p-2 rounded-full">
                                <Icons.ActivityIcon />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm mb-1 text-[#381F8C]">
                                    <span className="font-semibold">{activity.type}</span>
                                </p>
                                <p className="text-xs text-[#9B9FB0] mb-2">{activity.message}</p>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right whitespace-nowrap">
                            <p className="mb-2 text-[#C7C7C7]">
                                {(() => {
                                    const daysAgo = getDaysAgo(activity.notificationTime);
                                    return daysAgo === 0 ? 'Today' : `${daysAgo} day(s) ago`;
                                })()}
                            </p>
                            {/*<span className="text-[#381F8C] cursor-pointer">View Report</span>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
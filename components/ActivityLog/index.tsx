'use client'

import React, { useState } from "react";
import Icons from "@/components/icons";
import {
    useGetActivityLogQuery,
    useGetNotificationTypesQuery
} from "@/services/adminAnalysis";
import { Loader2 } from "lucide-react";

const ActivityLog: React.FC = () => {
    const { data: activities, error, isLoading } = useGetActivityLogQuery();
    const { data: types, error: typesError, isLoading: isTypesLoading } = useGetNotificationTypesQuery();
    const [sortBy, setSortBy] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const getDaysAgo = (notificationTime: number[]) => {
        if (!notificationTime || notificationTime.length < 3) return 0;
        const [year, month, day, hour, minute, second] = notificationTime;
        const notificationDate = new Date(year, month - 1, day, hour, minute, second);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - notificationDate.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(Number(event.target.value));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value || null);
    };

    const filteredActivities = activities
        ?.filter(activity => (sortBy !== null ? getDaysAgo(activity.notificationTime) <= sortBy : true))
        .filter(activity => (selectedType ? activity.type === selectedType : true))
        .sort((a, b) =>
            sortBy !== null
                ? getDaysAgo(b.notificationTime) - getDaysAgo(a.notificationTime)
                : getDaysAgo(a.notificationTime) - getDaysAgo(b.notificationTime)
        );

    return (
        <div className="w-full px-5 py-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-extrabold text-[#140B31]">Activity Log</h2>
                <div className="text-xs flex space-x-2 text-[#60667D]">
                    <p className="px-1 py-1">Sort:</p>
                    <select
                        onChange={handleTypeChange}
                        className="px-3 py-1 rounded-2xl border-[0.5px] border-[#381F8C] bg-white cursor-pointer appearance-none focus:outline-none"
                        disabled={isTypesLoading || !!typesError}
                    >
                        <option value="">All Types</option>
                        {types?.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        onChange={handleSortChange}
                        className="px-3 py-1 rounded-2xl border-[0.5px] border-[#381F8C] bg-white cursor-pointer appearance-none focus:outline-none"
                    >
                        <option value="">Date</option>
                        <option value="0">Today</option>
                        <option value="7">1 week ago</option>
                        <option value="14">2 weeks ago</option>
                        <option value="21">3 weeks ago</option>
                        <option value="28">4 weeks ago</option>
                        <option value="35">5 weeks ago</option>
                        <option value="42">6 weeks ago</option>
                        <option value="49">7 weeks ago</option>
                        <option value="56">8 weeks ago</option>
                        <option value="63">9 weeks ago</option>
                        <option value="70">10 weeks ago</option>
                        <option value="77">11 weeks ago</option>
                        <option value="84">12 weeks ago</option>
                    </select>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px] overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin size-20 text-primary" />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center text-red-500">Error loading activity log</p>
                    </div>
                ) : (
                    filteredActivities?.map((activity, index) => (
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
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
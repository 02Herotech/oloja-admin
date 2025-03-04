'use client';

import Card from "./card";
import Icons from '@/components/icons';
import {
    useGetTaskAnalysisQuery,
    useGetIncomeAnalysisQuery,
    useGetOngoingTaskAnalysisQuery,
    useGetCompletedTaskAnalysisQuery
} from '@/services/adminAnalysis';
import React from "react";
import {formatValue} from "@/lib/utils";

const DashboardCards: React.FC = () => {
    const { data: taskData, isLoading: isTaskLoading } = useGetTaskAnalysisQuery();
    const { data: incomeData, isLoading: isIncomeLoading } = useGetIncomeAnalysisQuery();
    const { data: ongoingData, isLoading: isOngoingLoading } = useGetOngoingTaskAnalysisQuery();
    const { data: completedData, isLoading: isCompletedLoading } = useGetCompletedTaskAnalysisQuery();

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 p-4">
            <Card
                title="All Tasks"
                value={isTaskLoading ? '...' : taskData?.totalTasks ?? 0}
                percentage={isTaskLoading ? 0 : parseFloat(taskData?.percentageChange.toFixed(2) ?? "0")}
                description={isTaskLoading ? '' : `${taskData?.tasksToday ?? 0} Today · ${taskData?.tasksYesterday ?? 0} Yesterday`}
                icon={<Icons.CartIcon />}
                backgroundStyles={{
                    backgroundImage: "/assets/images/dashboard/all-task.png",
                    backgroundSize: "45px",
                    backgroundPosition: "center bottom",
                    backgroundPositionX:"90%",
                    backgroundPositionY:"80%"
                }}
            />
            <Card
                title="Ongoing Tasks"
                value={isOngoingLoading ? '...' : ongoingData ?? 0}
                percentage={0}
                description=""
                icon={<Icons.OngoingTask />}
                backgroundStyles={{
                    backgroundImage: "/assets/images/dashboard/ongoing-task.png",
                    backgroundSize: "115px",
                    backgroundPosition: "right",
                    backgroundPositionX:"90%",
                    backgroundPositionY:"80%"
                }}
            />
            <Card
                title="Completed Tasks"
                value={isCompletedLoading ? '...' : completedData?.totalCompletedJobs ?? 0}
                percentage={isCompletedLoading ? 0 : parseFloat(completedData?.percentageChange.toFixed(2) ?? "0")}
                description={isTaskLoading ? '' : `${completedData?.completedJobsToday ?? 0} Today · ${completedData?.completedJobsYesterday ?? 0} Yesterday`}
                icon={<Icons.CompletedTaskIcon />}
                backgroundStyles={{
                    backgroundImage: "/assets/images/dashboard/completed-task.png",
                    backgroundSize: "85px",
                    backgroundPosition: "right",
                    backgroundPositionX:"98%",
                    backgroundPositionY:"40%"
                }}
            />
            <Card
                title="Total Income"
                value={isIncomeLoading ? '...' : `$${formatValue(incomeData?.totalIncome as number) ?? "0"}`}
                percentage={isIncomeLoading ? 0 : parseFloat(incomeData?.percentageChange.toFixed(2) ?? "0")}
                description={isIncomeLoading ? '' : `$${formatValue(incomeData?.todayIncome as number) ?? "0"} Today · $${formatValue(incomeData?.yesterdayIncome as number) ?? 0} Yesterday`}
                icon={<Icons.TotalIncome />}
                backgroundStyles={{
                    backgroundImage: "/assets/images/dashboard/total-income.png",
                    backgroundImageTwo: "/assets/images/dashboard/total-income-2.png",
                    backgroundSize: "150px, 50px",
                    backgroundPosition: "right, right",
                    backgroundPositionX:"95%,81%",
                    backgroundPositionY:"40%, 70%"
                }}
            />
        </div>
    );
};

export default DashboardCards;
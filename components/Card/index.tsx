'use client';

import Card from "./card";
import Icons from '@/components/icons';
import {
    useGetTaskAnalysisQuery,
    useGetIncomeAnalysisQuery,
    useGetOngoingTaskAnalysisQuery, useGetCompletedTaskAnalysisQuery
} from '@/services/adminAnalysis';

const DashboardCards: React.FC = () => {
    const { data: taskData, isLoading: isTaskLoading } = useGetTaskAnalysisQuery();
    const { data: incomeData, isLoading: isIncomeLoading } = useGetIncomeAnalysisQuery();
    const { data: ongoingData, isLoading: isOngoingLoading } = useGetOngoingTaskAnalysisQuery();
    const { data: completedData, isLoading: isCompletedLoading } = useGetCompletedTaskAnalysisQuery();
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <Card
                title="All Tasks"
                value={isTaskLoading ? '...' : taskData?.totalTasks ?? 0}
                percentage={isTaskLoading ? 0 : parseFloat(taskData?.percentageChange.toFixed(2) ?? "0")}
                description={isTaskLoading ? '' : `${taskData?.tasksToday ?? 0} Today · ${taskData?.tasksYesterday ?? 0} Yesterday`}
                icon={<Icons.CartIcon />}
            />
            <Card
                title="Ongoing Tasks"
                value={isOngoingLoading ? '...' : ongoingData ?? 0}
                percentage={0}
                description=""
                icon={<Icons.OngoingTask />}
            />
            <Card
                title="Completed Tasks"
                value={isCompletedLoading ? '...' : completedData?.totalCompletedJobs ?? 0}
                percentage={isCompletedLoading ? 0 : parseFloat(completedData?.percentageChange.toFixed(2) ?? "0")}
                description={isTaskLoading ? '' : `${completedData?.completedJobsToday ?? 0} Today · ${completedData?.completedJobsYesterday?? 0} Yesterday`}
                icon={<Icons.CompletedTaskIcon />}
            />
            <Card
                title="Total Income"
                value={isIncomeLoading ? '...' : `$${incomeData?.totalIncome ?? 0}`}
                percentage={ isIncomeLoading ? 0 : parseFloat(incomeData?.percentageChange.toFixed(2) ?? "0")}
                description={isIncomeLoading ? '' : `$${incomeData?.todayIncome ?? 0} Today · $${incomeData?.yesterdayIncome ?? 0} Yesterday`}
                icon={<Icons.TotalIncome />}
            />
        </div>
    );
};

export default DashboardCards;
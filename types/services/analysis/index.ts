export interface UserAnalyticsResponse {
    day: string;
    serviceProvidersCount: number;
    customersCount: number;
}

export interface TaskAnalyticsResponse {
    percentageChange: number;
    totalTasks: number;
    tasksToday: number;
    tasksYesterday: number;
}

export interface IncomeAnalyticsResponse {
    percentageChange: number;
    totalIncome: number;
    todayIncome: number;
    yesterdayIncome: number;
}

export interface CompletedAnalyticsResponse {
    completedJobsToday: number;
    percentageChange: number;
    totalCompletedJobs: number;
    completedJobsYesterday: number;
}

export interface ActivityLog{
    message: string,
    id: number,
    type: string,
    subType: string,
    notificationTime: [number, number, number, number, number, number, number]
}

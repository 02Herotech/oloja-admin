export interface UserAnalyticsResponse {
    day: string;
    serviceProvidersCount: number;
    customersCount: number;
}

export interface AnalyticsResponse {
    percentageChange: number;
    total: number;
    today: number;
    yesterday: number;
}

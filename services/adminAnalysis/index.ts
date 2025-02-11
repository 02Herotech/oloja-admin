import {
    CompletedAnalyticsResponse,
    IncomeAnalyticsResponse,
    TaskAnalyticsResponse,
    UserAnalyticsResponse
} from "@/types/services/analysis";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// const postRequest = (url: string, details: unknown) => ({
//     url,
//     method: "POST",
//     body: details,
// });

const getRequest = (url: string) => ({
    url,
    method: "GET",
});

export const analysis = createApi({
    reducerPath: "analysis",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = (session as any)?.user.accessToken; // eslint-disable-line @typescript-eslint/no-explicit-any

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");
            headers.set("Accept", "application/json");

            return headers;
        },
    }),
    // tagTypes: ['Analysis'],
    endpoints: (builder) => ({
        getUserAnalytics: builder.query<UserAnalyticsResponse[], void>({
            query: () => getRequest("/user-analytics"),
        }),
        getTaskAnalysis: builder.query<TaskAnalyticsResponse, void>({
            query: () => getRequest("/all-tasks-stats"),
        }),
        getIncomeAnalysis: builder.query<IncomeAnalyticsResponse, void>({
            query: () => getRequest("/income"),
        }),
        getOngoingTaskAnalysis: builder.query<number, void>({
            query: () => getRequest("/ongoing-jobs-count"),
        }),
        getCompletedTaskAnalysis: builder.query<CompletedAnalyticsResponse, void>({
            query: () => getRequest("/completed-jobs-stats"),
        }),
    }),
});

export const {
    useGetUserAnalyticsQuery,
    useGetTaskAnalysisQuery,
    useGetIncomeAnalysisQuery,
    useGetOngoingTaskAnalysisQuery,
    useGetCompletedTaskAnalysisQuery,
} = analysis;

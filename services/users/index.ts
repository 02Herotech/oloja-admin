import {
    FetchAllUsersResponse,
    User,
} from "@/types/services/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: unknown) => ({
    url,
    method: "POST",
    body: details,
});

const getRequest = (url: string) => ({
    url,
    method: "GET",
});

export const users = createApi({
    reducerPath: "users",
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
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.mutation<FetchAllUsersResponse, number>({
            query: (pageNumber) => postRequest(`/users/${pageNumber}`, {}),
        }),
        getAllCustomers: builder.query<FetchAllUsersResponse, number>({
            query: (pageNumber) => getRequest(`/all-customers/${pageNumber}`),
            providesTags: ['Users'],
        }),
        getAllServiceProviders: builder.query<FetchAllUsersResponse, number>({
            query: (pageNumber) => getRequest(`/all-service-providers/${pageNumber}`),
            providesTags: ['Users'],
        }),
        getAllAdmins: builder.query<FetchAllUsersResponse, number>({
            query: (pageNumber) => getRequest(`/all-admins/${pageNumber}`),
            providesTags: ['Users'],
        }),
        getUserByID: builder.query<User, number>({
            query: (userId) => getRequest(`/user/user-profile/${userId}`),

            transformErrorResponse: (response) => {
                console.log({response})
                return response;
            }
        }),
    }),
});

export const {
    useGetAllUsersMutation,
    useGetAllCustomersQuery,
    useGetAllServiceProvidersQuery, 
    useGetAllAdminsQuery,
    useGetUserByIDQuery,
} = users;

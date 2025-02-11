import {
    FetchAllUsersResponse, GetCustomerByIdResponse,
} from "@/types/services/users/customers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import {
    GetServiceProviderByIdResponse
} from "@/types/services/users/service-providers";
import {AdminResponse} from "@/types/services/users/admin";

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
        getAdminByID: builder.query<AdminResponse, number>({
            query: (userId) => getRequest(`/admin/${userId}`),
        }),
        getCustomerById: builder.query<GetCustomerByIdResponse, number>({
            query: (customerId) => getRequest(`/customer/${customerId}`),
            transformErrorResponse: (response) => {
                console.log({response})
                return response;
            }
        }),
        getServiceProviderById: builder.query<GetServiceProviderByIdResponse, number>({
            query: (userId) => getRequest(`/service-provider/${userId}`),
        }),
        getUsersByName: builder.query<FetchAllUsersResponse, { name: string; page?: number }>({
            query: ({ name, page = 0 }) =>
                getRequest(`/users/search/${page}?name=${name}`),
        }),
    }),
});

export const {
    useGetAllUsersMutation,
    useGetAllCustomersQuery,
    useGetAllServiceProvidersQuery, 
    useGetAllAdminsQuery,
    useGetAdminByIDQuery,
    useGetCustomerByIdQuery,
    useGetServiceProviderByIdQuery,
    useGetUsersByNameQuery,
} = users;

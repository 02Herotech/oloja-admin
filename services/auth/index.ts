import {
    ChangePasswordRequest,
    ChangePasswordResponse,
    SignInRequest,
    SignInResponse,
} from "@/types/services/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: unknown) => ({
    url,
    method: "POST",
    body: details,
});

export const auth = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = session?.user?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Content-Type", "application/json-patch+json");
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        signin: builder.mutation<SignInResponse, SignInRequest>({
            query: (credentials) => postRequest("/login", credentials),
        }),
        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (credentials) => postRequest(`/change-password?email=${credentials.email}`, credentials),
        })
    }),
});

export const {
    useSigninMutation,
    useChangePasswordMutation
} = auth;

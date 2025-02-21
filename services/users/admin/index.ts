
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import {
    UpdatePricingFeeRequest,
} from "@/types/services/users/admin";

const postRequest = (url: string, details: unknown) => ({
    url,
    method: "POST",
    body: details,
});

// const getRequest = (url: string) => ({
//     url,
//     method: "GET",
// });

export const admin = createApi({
    reducerPath: "admin",
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
    endpoints: (builder) => ({
        updatePricingFee: builder.mutation<string, UpdatePricingFeeRequest>({
            query: (data: UpdatePricingFeeRequest) => postRequest(`/charges`, data),
        }),
    }),
});

export const {
    useUpdatePricingFeeMutation,
} = admin;

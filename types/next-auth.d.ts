/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        data: {
            user: {
                id: number;
                enabled: boolean;
                emailAddress: string;
                roles: string[];
                accountState: string;
                firstName: string;
                lastName: string;
            },
            accessToken: string;
            refreshToken: string;
        };
    }
}

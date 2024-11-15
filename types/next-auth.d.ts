/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            accessToken: string;
            exp: number;
            iat: number;
            jti: string;
            message: string;
            refreshToken: string;
            id: number;
            firstName: string;
            lastName: string;
            emailAddress: string;
            enabled: boolean | null;
            roles: string[];
            firstLogin: boolean | string;
        };
    }
}

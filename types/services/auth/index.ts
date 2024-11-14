export type SignInRequest = {
    emailAddress: string;
    password: string;
};

export type SignInResponse = {
    data: {
        user: {
            id: number;
            enabled: boolean;
            emailAddress: string;
            roles: string[];
            accountState: string;
            firstName: string;
            lastName: string;
        };
        accessToken: string;
        refreshToken: string;
        message: string;
    };
    message: string;
    successful: boolean;
};

export type ChangePasswordRequest = {
    email: string | undefined;
    newPassword: string;
    confirmPassword: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ChangePasswordResponse = any

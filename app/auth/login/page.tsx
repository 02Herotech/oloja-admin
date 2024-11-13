import Login from "@/components/auth/Login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Oloja Admin | Sign In",
};

const SignInPage = () => {
    return (
        <Suspense>
            <Login />
        </Suspense>
    );
};

export default SignInPage;

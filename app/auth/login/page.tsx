import Login from "@/components/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Oloja Admin | Sign In",
};

const SignInPage = () => {
    return <Login />;
};

export default SignInPage;

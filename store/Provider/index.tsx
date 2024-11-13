"use client";

import { Provider as ProviderWrapper } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { store } from "..";

type ProviderProps = {
    children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
    return (
        <>
            <SessionProvider>
                <ToastContainer />
                <ProgressBar
                    color='#381F8C'
                    height='2px'
                    options={{ showSpinner: false }}
                    shallowRouting
                />
                <ProviderWrapper store={store}>{children}</ProviderWrapper>
            </SessionProvider>
        </>
    );
};

export default Provider;

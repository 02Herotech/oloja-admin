"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import { useSigninMutation } from "@/services/auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type SignInRequest = {
    emailAddress: string;
    password: string;
};

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            emailAddress: "",
            password: "",
        },
    });

    const {
        formState: { isValid },
    } = methods;

    const searchParams = useSearchParams();

    const from = searchParams.get("from");

    const [_signin, { isLoading }] = useSigninMutation();

    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        setError(null)
        try {
            const result = await _signin(payload).unwrap();

            const signInResult = await signIn("credentials", {
                redirect: false,
                token: result?.data?.accessToken,
                user: {
                    id: result?.data?.user?.id,
                    enabled: result?.data?.user?.enabled,
                    firstName: result?.data?.user?.firstName,
                    lastName: result?.data?.user?.lastName,
                    emailAddress: result?.data?.user?.emailAddress,
                    roles: result?.data?.user?.roles[0],
                },
            });

            if (signInResult?.ok) {
                if (from) router.push(decodeURIComponent(from));
                else router.push("/dashboard");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.data?.message);
        }
    };

    return (
        <section className="h-screen flex">
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/assets/images/auth/auth-bg.png"
                    alt="Login visual"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 bg-cover bg-center lg:hidden">
                <Image
                    src="/assets/images/auth/auth-bg.png"
                    alt="Login visual"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                    priority
                />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-evenly relative">
                <div className="w-full max-w-3xl space-y-8 p-5 max-lg:bg-white/70 relative z-10 m-2">
                    <div className="relative z-10 p-4">
                        <h2 className="text-3xl text-gray-800 font-clashSemiBold text-start">Welcome to <span className="font-bold text-primary">Oló<span className="text-secondary">jà</span> Admin</span></h2>
                        <p className="mt-2 mb-6 font-clashMedium text-status-grey text-lg">Login to access your dashboard and features.</p>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <Input
                                    name="emailAddress"
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email"
                                    rules={["email", "required"]}
                                    required
                                    className="w-full"
                                />
                                <Input
                                    name="password"
                                    label="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    rules={["required"]}
                                    required
                                    className="w-full"
                                />
                                {error && (
                                    <div className="my-1 text-base font-semibold text-status-error-100">
                                        {error}
                                    </div>
                                )}
                                <div className="flex items-center justify-end !mt-3">
                                    <Link href="/forgot-password" className="text-sm text-primary hover:underline font-satoshiBold font-bold underline underline-offset-2">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Button
                                    disabled={!isValid}
                                    type="submit"
                                    className="w-[150px] rounded-full"
                                    loading={isLoading}
                                >
                                    Log in
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

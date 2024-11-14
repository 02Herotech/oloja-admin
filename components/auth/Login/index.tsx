"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Icons from "@/components/icons";
import { useSigninMutation } from "@/services/auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

    // const searchParams = useSearchParams();

    // const from = searchParams.get("from");

    const [_signin, { isLoading }] = useSigninMutation();

    const onSubmit: SubmitHandler<SignInRequest> = async (payload) => {
        setError(null)
        try {
            const result = await _signin(payload).unwrap();

            const signInResult = await signIn("credentials", {
                redirect: false,
                accessToken: result?.data?.accessToken,
                email: result?.data.user.emailAddress,
                id: result.data.user.id,
                enabled: result?.data?.user?.enabled,
                firstName: result?.data?.user?.firstName,
                lastName: result?.data?.user?.lastName,
                roles: result?.data?.user?.roles[0],
            });

            if (signInResult?.ok) {
                // if (from) router.push(decodeURIComponent(from));
                router.push(`/dashboard`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.data?.message);
            console.log("err", err)
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
                    src="/assets/images/auth/auth-bg-mobile.png"
                    alt="Login visual"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                    priority
                />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
                <div className="lg:hidden flex items-center justify-center mb-10">
                    <Icons.Logo />
                </div>
                <div className="w-full max-w-xl space-y-8 p-5 bg-white lg:bg-transparent rounded-3xl relative z-10 m-2">
                    <div className="relative z-10 p-4">
                        <h2 className="text-3xl text-gray-800 font-clashMedium text-start">Welcome to <span className="text-primary">Oló<span className="text-secondary">jà</span> Admin</span></h2>
                        <p className="mt-2 mb-6 font-clashMedium text-status-grey text-lg">Login to access your dashboard and features.</p>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(onSubmit)}
                                className="space-y-6 w-full"
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
                                <div className="w-full !mt-8">
                                    <Button
                                        disabled={!isValid}
                                        type="submit"
                                        className="w-full lg:w-[150px] rounded-full"
                                        loading={isLoading}
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

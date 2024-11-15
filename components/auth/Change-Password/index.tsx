"use client";

import Button from "@/components/global/Button";
import Input from "@/components/global/Input";
import Modal from "@/components/global/Modal";
import Icons from "@/components/icons";
import { useChangePasswordMutation } from "@/services/auth";
import { signOut, useSession } from "next-auth/react";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type ChangePasswordModalProps = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
};

type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};

const ChangePasswordModal = ({
    showModal,
    setShowModal,
}: ChangePasswordModalProps) => {
    const session = useSession();
    const [step, setStep] = useState<"start" | "change" | "success">("start");
    const [changePassword, { isLoading, error }] = useChangePasswordMutation();
    const email = session.data?.user.emailAddress

    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const {
        formState: { isValid },
        reset,
    } = methods;

    const onSubmit: SubmitHandler<ChangePasswordRequest> = async (payload) => {
        const body = {
            email,
            newPassword: payload.password,
            confirmPassword: payload.confirmPassword
        }

        const result = await changePassword(body).unwrap();

        console.log("result", result)
        console.log("error", error)
        setStep("success")
    };

    const handleLogout = async () => {
        await signOut()
    }

    const stepProps = {
        start: {
            width: "!w-[600px]",
        },
        change: {
            title: "Change password",
            description: "Enter a new password below to change your password.",
            width: "!w-[600px]",
        },
        success: {
            width: "!w-[600px]",
        },
    } as {
        [key: string]: {
            title?: string;
            width?: string;
            description?: string;
        };
    };

    return (
        <Modal
            title={stepProps[step].title}
            description={stepProps[step].description}
            show={showModal}
            width={stepProps[step].width}
            onRequestClose={() => {
                setShowModal(false);
                setTimeout(() => {
                    reset();
                    setStep("change");
                }, 1000);
            }}
            allowClose={false}
        >
            {step === "start" && (
                <section className='flex flex-col h-full justify-center items-center space-y-4'>
                    <Icons.WelcomeIcon />
                    <h2 className="text-3xl text-tc-primary font-clashMedium text-center">Welcome to Oloja admin</h2>
                    <p className='text-center text-status-grey font-satoshiMedium text-xl'>
                        Before using the Oloja dashboard, please update your password. Click the button below to continue.
                    </p>
                    <div className='lg:col-span-2 flex justify-center py-4'>
                        <Button
                            type='submit'
                            disabled={!isValid}
                            className='w-full lg:w-[240px] rounded-full font-satoshiBold'
                            onClick={() => setStep("change")}
                        >
                            Change password
                        </Button>
                    </div>
                </section>
            )}

            {step === "change" && (
                <section className='w-full'>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className="space-y-2 w-full"
                        >
                            <Input
                                label='Password'
                                name='password'
                                type='password'
                                className=" placeholder:text-dark"
                                placeholder="**********"
                                rules={["required", "password"]}
                            />
                            <Input
                                label='Confirm Password'
                                name='confirmPassword'
                                type='password'
                                className=" placeholder:text-dark"
                                placeholder="**********"
                                rules={["required", "confirmPassword"]}
                            />
                            <div className='lg:col-span-2 flex justify-center py-4 !mt-8'>
                                <Button
                                    type='submit'
                                    disabled={!isValid}
                                    loading={isLoading}
                                    className='w-full lg:w-[240px] rounded-full font-satoshiBold'>
                                    Update password
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </section>
            )}

            {step === "success" && (
                <section className='flex flex-col h-full justify-center items-center space-y-4'>
                    <Icons.WelldoneIcon />
                    <h2 className="text-3xl text-tc-primary font-clashMedium text-center">Well Done!</h2>
                    <p className='text-center text-status-grey font-satoshiMedium text-xl'>
                        Your password has been successfully changed. please use your new password to login!
                    </p>
                    <div className='lg:col-span-2 flex justify-center py-4'>
                        <Button
                            type='submit'
                            disabled={!isValid}
                            className='w-full lg:w-[240px] rounded-full font-satoshiBold'
                            onClick={handleLogout}
                        >
                            Proceed to Login
                        </Button>
                    </div>
                </section>
            )}
        </Modal>
    );
};

export default ChangePasswordModal;

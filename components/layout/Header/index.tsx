"use client";

import Dropdown from "@/components/global/Dropdown";
import Input from "@/components/global/Input";
import Icons from "@/components/icons";
import { ChevronDown, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

const Header = () => {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            search: "",
        },
    });

    const dropdownButtons = [
        {
            label: "Create Expenses",
            onClick: () => { },
        },
    ];

    return (
        <>
            <header className='max-lg:container bg-white lg:px-10 py-4 w-full fixed z-50 top-0 right-0 lg:w-screen border border-b'>
                <div className='flex items-center justify-between w-full space-x-8 lg:space-x-6'>
                    <Link
                        href='/dashboard'
                        className='flex justify-center items-center'>
                        <Icons.SmallLogo />
                    </Link>

                    <div className="hidden lg:flex">
                        <FormProvider {...methods}>
                            <form className='max-lg:max-w-[650px] lg:!ml-0'>
                                <div className='lg:w-[650px]'>
                                    <Input
                                        name='search'
                                        placeholder='Search'
                                        paddingLeft='pl-11'
                                        type='search'
                                        className="bg-[#F1F1F2] border-none rounded-full w-full"
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </div>


                    <div className='flex items-center space-x-10 lg:space-x-20 pr-5'>
                        <div className="flex items-center space-x-4 lg:space-x-8">
                            <button className='hidden lg:flex justify-center items-center p-2 rounded-full bg-primary text-white'>
                                <PlusIcon color="#FFFFFF" className="size-7" />
                            </button>
                            <button className='flex max-lg:!ml-0 justify-center items-center '>
                                <Icons.NotificationIcon />
                            </button>
                            <button className='flex max-lg:!ml-0 justify-center items-center '>
                                <Icons.MessageIcon />
                            </button>
                        </div>
                        <Dropdown
                            trigger={() => (
                                <div className="flex cursor-pointer items-center space-x-1">
                                    <Image
                                        src="/assets/images/placeholder.jpeg"
                                        alt="Profile"
                                        className="size-[46px] rounded-full object-cover"
                                        width={100}
                                        height={100}
                                    />
                                    <ChevronDown className="size-6" />
                                </div>
                            )}
                            className='-left-10 top-14'>
                            <div className='w-[240px] bg-white rounded-md'>
                                {dropdownButtons.map((button, index) => (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className='flex w-full dropdown-item hover:bg-[#d2d4ff] transition-all text-sm items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]'>
                                        {button.label}
                                    </button>
                                ))}
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;

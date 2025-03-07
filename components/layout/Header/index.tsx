"use client";

import Dropdown from "@/components/global/Dropdown";
import Input from "@/components/global/Input";
import Icons from "@/components/icons";
import { ChevronDown, PlusIcon, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";

const Header = () => {
    const router = useRouter();
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            search: "",
        },
    });

    const { watch } = methods;
    const searchQuery = watch("search");

    const dropdownButtons = [
        {
            label: "Logout",
            onClick: () => signOut(),
        },
    ];

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/users?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <header className='max-lg:container bg-white lg:px-10 py-4 w-full fixed z-30 top-0 right-0 lg:w-screen border border-b'>
                <div className='flex items-center justify-between w-full space-x-8 lg:space-x-6'>
                    <Link
                        href='/dashboard'
                        className='flex justify-center items-center'>
                        <Icons.SmallLogo />
                    </Link>

                    <div className="hidden lg:flex flex-1 max-w-[650px]">
                        <FormProvider {...methods}>
                            <form className='w-full relative' onSubmit={handleSearch}>
                                <div className="relative">
                                    <Input
                                        name='search'
                                        placeholder='Search'
                                        paddingRight='pr-11'
                                        type='search'
                                        className="w-full border border-gray-200 rounded-full bg-gray-50 focus:bg-white transition-colors py-2.5"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSearch()}
                                        className="absolute right-11 bottom-1 -translate-y-1/2 hover:text-gray-600"
                                    >
                                        <Search className="size-5 text-[#D3D2D5]" />
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>

                    <div className='flex items-center justify-end gap-4 lg:gap-12'>
                        <div className="flex items-center gap-4">
                            <button onClick={()=> router.push("/create-admin")} className='hidden lg:flex justify-center items-center p-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors'>
                                <PlusIcon color="#FFFFFF" className="size-6" />
                            </button>
                            <button onClick={() => router.push("/messages")} className='flex max-lg:!ml-0 justify-center items-center lg:shadow lg:p-2 rounded-full'>
                                <Icons.MessageIcon />
                            </button>
                            <button onClick={() => router.push("/notifications")} className='flex max-lg:!ml-0 justify-center items-center lg:shadow lg:p-2 rounded-full'>
                                <Icons.NotificationIcon />
                            </button>
                            <button onClick={() => router.push("/settings")} className='flex max-lg:!ml-0 justify-center items-center lg:hidden rounded-full'>
                                <Icons.SettingsIcon />
                            </button>
                        </div>

                        <Dropdown
                            trigger={() => (
                                <div className="hidden lg:flex cursor-pointer items-center gap-2 p-1 ">
                                    <Image
                                        src="/assets/images/placeholder.jpeg"
                                        alt="Profile"
                                        className="size-10 lg:size-11 rounded-full object-cover"
                                        width={100}
                                        height={100}
                                    />
                                    <ChevronDown className="size-5" />
                                </div>
                            )}
                            className='-right-4 top-14'>
                            <div className='w-[240px] bg-white rounded-lg shadow-lg border border-gray-100'>
                                {dropdownButtons.map((button, index) => (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className='flex w-full dropdown-item hover:bg-gray-50 transition-colors text-sm items-center justify-between px-4 py-3 border-b last:border-b-0 border-gray-100'>
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
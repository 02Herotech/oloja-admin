"use client";

import Icons from "@/components/icons";
import NavigationLink from "../NavigationLink";
import Dropdown from "@/components/global/Dropdown";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import {useRouter} from "next/navigation";

const Navigation = () => {
    const router = useRouter();

    const links = [
        {
            name: "Dashboard",
            to: "/dashboard",
            icon: <Icons.DashboardIcon className='fill-inherit' />,
        },
        {
            name: "User Management",
            to: "/users",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Bonus Credits",
            to: "/bonus-credits",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Rewards",
            to: "/rewards",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Bookings",
            to: "/bookings",
            icon: <Icons.BookingIcon className='fill-inherit' />,
        },

        {
            name: "Messages",
            to: "/messages",
            icon: <Icons.MessageIcon className='fill-inherit' />,
        },
        {
            name: "Notifications",
            to: "/notifications",
            icon: <Icons.NotificationIcon className='fill-inherit' />,
        },
        {
            name: "Payments",
            to: "/payments",
            icon: <Icons.PaymentIcon className='fill-inherit' />,
        },
        {
            name: "Settings",
            to: "/settings",
            icon: <Icons.SettingsIcon className='fill-inherit' />,
        },
    ];

    const mobileLinks = [
        {
            name: "Dashboard",
            to: "/dashboard",
            icon: <Icons.DashboardIcon className='fill-inherit' />,
        },
        {
            name: "User Management",
            to: "/users",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Bonus Credits",
            to: "/bonus-credits",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Rewards",
            to: "/rewards",
            icon: <Icons.UserIcon className='fill-inherit' />,
        },
        {
            name: "Bookings",
            to: "/bookings",
            icon: <Icons.BookingIcon className='fill-inherit' />,
        },
        
        // {
        //     name: "Messages",
        //     to: "/messages",
        //     icon: <Icons.MessageIcon className='fill-inherit' />,
        // },
        {
            name: "Settings",
            to: "/settings",
            icon: <Icons.SettingsIcon className='fill-inherit' />,
        },
    ];

    const dropdownButtons = [
        {
            label: "Create New User",
            onClick: ()=>router.push("/create-user"),
        },
    ];

    return (
        <>
            <nav className='hidden lg:block w-[278px] min-h-[calc(100vh-70px)] py-2 mt-[70px] px-2 max-lg:pb-20 fixed bg-white border border-r'>
                <div className='flex flex-col h-[calc(100%-198px)] justify-between'>
                    <ul className='px-2.5 space-y-2 mt-8'>
                        {links.map((link) => {
                            return <NavigationLink key={link.name} link={link} />;
                        })}
                    </ul>
                </div>
            </nav>
            <div className='relative'>
                <nav className='lg:hidden bg-white w-screen fixed z-50 bottom-0 left-0 right-0 border border-t'>
                    <div className='flex items-center justify-between py-1'>
                        {/* First half of links */}
                        <div className='flex-1 flex justify-center'>
                            <ul className='flex items-center justify-evenly w-full'>
                                {mobileLinks.slice(0, 2).map((link) => (
                                    <NavigationLink key={link.name} link={link} />
                                ))}
                            </ul>
                        </div>

                        {/* Spacer for center button */}
                        <div className='w-14'></div>

                        {/* Second half of links */}
                        <div className='flex-1 flex justify-center'>
                            <ul className='flex items-center justify-evenly w-full'>
                                {mobileLinks.slice(2, 4).map((link) => (
                                    <NavigationLink key={link.name} link={link} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Center Plus Button with Dropdown */}
                    <div className='absolute -top-5 left-1/2 transform -translate-x-1/2'>
                        <Dropdown
                            trigger={(open) => (
                                <button className='flex justify-center items-center bg-primary border-2 border-primary size-14 rounded-full shadow-lg'>
                                    <PlusIcon
                                        color="#FFFFFF"
                                        className={cn("transition-all size-7", {
                                            "rotate-[135deg]": open,
                                        })}
                                    />
                                </button>
                            )}
                            position='top'
                            className='-left-[90px] bottom-20 rounded-md'>
                            <div className='w-[180px] bg-white rounded-md'>
                                {dropdownButtons.map((button, index) => (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className='flex text-[#2B2B29] w-full dropdown-item hover:bg-[#FFE2D2] transition-all text-xs items-center justify-between p-3 border-b last:border-b-0 border-[#CBCFD3]'>
                                        {button.label}
                                    </button>
                                ))}
                            </div>
                        </Dropdown>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navigation;

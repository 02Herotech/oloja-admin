"use client";

import Icons from "@/components/icons";
import NavigationLink from "../NavigationLink";

const Navigation = () => {
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
            name: "Settings",
            to: "/settings",
            icon: <Icons.SettingsIcon className='fill-inherit' />,
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
                <nav className='lg:hidden bg-white border border-t w-screen fixed z-50 bottom-0 left-0 right-0'>
                    <div className='flex items-center justify-between py-2 px-6'>
                        {mobileLinks.map((link) => {
                            return <NavigationLink key={link.name} link={link} />
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navigation;
